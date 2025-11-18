# Incident Runbooks

## Table of Contents
1. [Payment Processing Failure](#payment-processing-failure)
2. [Metric Ingestion Lag](#metric-ingestion-lag)
3. [Database Connection Pool Exhaustion](#database-connection-pool-exhaustion)
4. [Authentication Service Down](#authentication-service-down)
5. [Data Breach Suspected](#data-breach-suspected)
6. [High API Latency](#high-api-latency)
7. [Stripe Webhook Failures](#stripe-webhook-failures)

---

## Payment Processing Failure

**Severity:** CRITICAL  
**Estimated Impact:** Users cannot fund campaigns or receive payouts  
**SLA:** P1 - Resolve within 1 hour

### Symptoms

- Error logs: `StripeAPIError: ...`
- Monitoring alert: "Payment failure rate > 5%"
- User reports: "Payment declined" or "Timed out"
- Grafana dashboard: Payment endpoint error rate spike

### Diagnosis

1. **Check Stripe Status**
   ```bash
   curl -s https://status.stripe.com/api/v2/incidents.json | jq '.incidents'
   ```
   - If Stripe is down: This is expected. Wait for recovery and retry failed payments.

2. **Check API Logs**
   ```bash
   kubectl logs -f deployment/backend -n brandconnect | grep -i stripe
   ```
   Look for:
   - Rate limit errors → Reduce request frequency
   - Authentication errors → Check STRIPE_SECRET_KEY
   - Timeout errors → Increase timeout setting

3. **Check Rate Limiting**
   ```bash
   # Check recent API calls to Stripe
   kubectl exec -it pod/backend-xxxxx -- \
     psql -h postgres.default.svc.cluster.local -U postgres -d brandconnect \
     -c "SELECT COUNT(*), DATE_TRUNC('minute', created_at) FROM audit_logs \
         WHERE action LIKE '%payment%' AND DATE(created_at) = CURRENT_DATE \
         GROUP BY DATE_TRUNC('minute', created_at) \
         ORDER BY date_trunc DESC LIMIT 10;"
   ```

### Remediation

**If Stripe is operational:**

1. **Check Payment Intent Status**
   ```bash
   # For specific payment
   curl -s https://api.stripe.com/v1/payment_intents/pi_xxxxx \
     -u sk_test_...:
   ```

2. **Retry Failed Payments**
   ```bash
   # Manual retry job
   kubectl exec -it pod/backend-xxxxx -- \
     npm run jobs:retry-failed-payments --since=1hour
   ```

3. **Update Rate Limits if Necessary**
   ```bash
   # In backend .env
   STRIPE_RATE_LIMIT_PER_SECOND=10  # Reduce from 100
   kubectl rollout restart deployment/backend -n brandconnect
   ```

4. **Monitor Recovery**
   ```bash
   # Watch payment success rate
   kubectl port-forward svc/prometheus 9090:9090 -n monitoring
   # Query: rate(stripe_payment_success_total[5m])
   ```

### Communication

- **User notification:** "We're experiencing temporary payment processing delays. Please try again in 5 minutes."
- **Internal:** Post in #incidents Slack channel with severity and ETA
- **Dashboard:** Update status page: https://status.brandconnect.local

### Post-Incident

1. Review Stripe API logs for rate limit patterns
2. Increase timeout if timeouts were common
3. Add alert for payment failure rate > 2%

---

## Metric Ingestion Lag

**Severity:** MEDIUM  
**Estimated Impact:** Dashboard metrics up to 2 hours old  
**SLA:** P2 - Resolve within 4 hours

### Symptoms

- Grafana shows: "Last metric: 2 hours ago"
- Metric worker logs: "API rate limit exceeded" or timeouts
- ClickHouse: No new data in last hour
- User complaint: "Dashboard metrics not updating"

### Diagnosis

1. **Check Metric Worker Status**
   ```bash
   kubectl logs -l app=metric-worker -n brandconnect --tail=100
   ```
   Look for:
   - `rate_limit_exceeded` → Social platform rate limiting
   - `connection_timeout` → Network issue or API down
   - `invalid_token` → OAuth token expired/revoked

2. **Verify Social Platform APIs**
   ```bash
   # Test Meta Graph API
   curl -s "https://graph.instagram.com/me?access_token=token" | jq .

   # Test TikTok API
   curl -s "https://business-api.tiktok.com/open_api/v1.3/campaign/list" \
     -H "Access-Token: token" | jq .

   # Test YouTube API
   curl -s "https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=username" \
     -H "Authorization: Bearer token" | jq .
   ```

3. **Check ClickHouse Disk Space**
   ```bash
   curl -s "http://clickhouse:8123/?query=SELECT%20disk%20usage" | jq .
   ```

### Remediation

**If Social Platform is Rate Limited:**

1. **Reduce Ingestion Frequency**
   ```bash
   # In metric worker config
   METRIC_INGESTION_INTERVAL=3600  # 1 hour instead of 30 min
   kubectl set env deployment/metric-worker \
     METRIC_INGESTION_INTERVAL=3600 -n brandconnect
   ```

2. **Add Exponential Backoff**
   ```typescript
   // In metrics.worker.ts
   const backoff = Math.min(300, 30 * Math.pow(2, retryCount));
   await sleep(backoff * 1000);
   ```

3. **Trigger Manual Sync**
   ```bash
   # Force sync for active campaigns
   kubectl exec -it pod/backend-xxxxx -- \
     npm run jobs:sync-metrics --campaigns=active --force
   ```

**If ClickHouse is Full:**

1. **Identify Large Partitions**
   ```bash
   curl -X POST "http://clickhouse:8123/" \
     -d "SELECT table, sum(bytes) FROM system.parts \
         WHERE database='analytics' GROUP BY table ORDER BY sum(bytes) DESC"
   ```

2. **Archive Old Data**
   ```bash
   curl -X POST "http://clickhouse:8123/" \
     -d "ALTER TABLE metric_snapshots DELETE WHERE created_at < toDate('2024-01-01')"
   ```

### Communication

- No user-facing alert needed (background metrics)
- Notify analytics team if archiving data

### Post-Incident

1. Increase ClickHouse volume size
2. Implement automatic data pruning for >30 days old
3. Add alert for ClickHouse disk usage > 80%

---

## Database Connection Pool Exhaustion

**Severity:** CRITICAL  
**Estimated Impact:** Complete API failure  
**SLA:** P1 - Resolve within 15 minutes

### Symptoms

- Error logs: "Error: connect ECONNREFUSED 127.0.0.1:5432"
- Monitoring: "DB pool idle connections: 0"
- Prometheus: `pg_stat_connections_count > 95` (out of 100 max)
- All API endpoints returning 503

### Diagnosis

1. **Check Connection Count**
   ```bash
   kubectl exec -it pod/postgres-xxxxx -- \
     psql -U postgres -d brandconnect \
     -c "SELECT COUNT(*), state FROM pg_stat_activity GROUP BY state;"
   ```

2. **Find Long-Running Queries**
   ```bash
   kubectl exec -it pod/postgres-xxxxx -- \
     psql -U postgres -d brandconnect \
     -c "SELECT pid, now() - query_start, state, query FROM pg_stat_activity \
         WHERE state != 'idle' AND query_start < now() - INTERVAL '5 minutes';"
   ```

3. **Check Backend Connection Settings**
   ```bash
   kubectl exec -it pod/backend-xxxxx -- \
     ps aux | grep node | head -1
   # Check NODE_OPTIONS and TYPEORM_POOL_SIZE
   ```

### Remediation

**Immediate (Stabilize):**

1. **Kill Idle Connections**
   ```bash
   kubectl exec -it pod/postgres-xxxxx -- \
     psql -U postgres -d brandconnect \
     -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity \
         WHERE state = 'idle' AND query_start < now() - INTERVAL '10 minutes';"
   ```

2. **Restart Backend Pods**
   ```bash
   kubectl delete pod -l app=backend -n brandconnect
   kubectl wait --for=condition=Ready pod -l app=backend -n brandconnect --timeout=5m
   ```

**Short-term (Increase Capacity):**

1. **Increase Connection Pool Size**
   ```bash
   kubectl set env deployment/backend \
     TYPEORM_POOL_SIZE=50 \
     TYPEORM_POOL_MAX=100 \
     -n brandconnect
   kubectl rollout restart deployment/backend -n brandconnect
   ```

2. **Add PgBouncer Connection Proxy** (if issue persists)
   ```yaml
   # infra/kubernetes/pgbouncer-deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: pgbouncer
   spec:
     replicas: 2
     template:
       spec:
         containers:
         - name: pgbouncer
           image: pgbouncer:latest
           env:
           - name: PGBOUNCER_POOL_MODE
             value: "transaction"
           - name: PGBOUNCER_MAX_CLIENT_CONN
             value: "10000"
   ```

### Communication

- **Critical:** Page on-call engineer immediately
- **User notification:** "Experiencing temporary API issues. Working on fix now."
- **Status page:** Set to "Major Outage"

### Post-Incident

1. Increase backend pool size (was too low)
2. Implement PgBouncer for connection pooling
3. Add alert for connection usage > 80%
4. Review and optimize long-running queries

---

## Authentication Service Down

**Severity:** CRITICAL  
**Estimated Impact:** Users cannot login  
**SLA:** P1 - Resolve within 30 minutes

### Symptoms

- Login failures: "Invalid credentials" / "Server error"
- JWT validation failures in all services
- Error logs: "Redis ECONNREFUSED" or JWT secret missing
- Monitoring: Auth endpoint 500 errors

### Diagnosis

1. **Check Redis Connection**
   ```bash
   kubectl logs -f deployment/backend -n brandconnect | grep -i redis
   kubectl exec -it pod/redis-master-xxxxx -- redis-cli ping
   ```

2. **Check Auth Module**
   ```bash
   kubectl exec -it pod/backend-xxxxx -- npm run typeorm query "SELECT COUNT(*) FROM users;"
   ```

3. **Verify JWT Secret**
   ```bash
   kubectl get secret jwt-secret -n brandconnect -o yaml | grep JWT_SECRET
   ```

### Remediation

**If Redis is Down:**

1. **Restart Redis**
   ```bash
   kubectl rollout restart statefulset/redis -n brandconnect
   kubectl rollout status statefulset/redis -n brandconnect --timeout=5m
   ```

2. **If Redis needs recovery:**
   ```bash
   # Check persistence
   kubectl exec -it pod/redis-master-0 -n brandconnect -- \
     ls -la /data/
   ```

**If JWT Secret is Missing:**

1. **Restore from Vault**
   ```bash
   kubectl get secret jwt-secret -n brandconnect -o yaml | grep -A1 JWT_SECRET
   # If missing, restore from backup
   ```

2. **Restart Auth Services**
   ```bash
   kubectl delete pod -l app=backend -n brandconnect
   ```

### Communication

- **Critical:** Page on-call immediately
- **Users:** "Authentication temporarily unavailable. Please try again in 2 minutes."
- **Status page:** "Authentication Down"

---

## Data Breach Suspected

**Severity:** CRITICAL  
**Estimated Impact:** PII, payment data potentially exposed  
**SLA:** P0 - Immediate escalation to CISO

### Symptoms

- Unexpected data access patterns in audit logs
- Alert: "Possible data exfiltration detected"
- AWS GuardDuty alert
- User reports: Unauthorized account activity

### Immediate Actions (First 5 minutes)

1. **Page Security Team**
   ```bash
   # Trigger PagerDuty escalation
   curl -X POST https://api.pagerduty.com/incidents \
     -H "Authorization: Token token=xxx" \
     -H "Content-Type: application/json" \
     -d '{
       "incident": {
         "type": "incident",
         "title": "SECURITY: Suspected data breach",
         "urgency": "high",
         "service": {"id": "security-service"}
       }
     }'
   ```

2. **Isolate Affected Systems** (Do NOT shut down - preserve evidence)
   ```bash
   # Revoke all active sessions
   kubectl exec -it pod/backend-xxxxx -- \
     redis-cli FLUSHALL  # LAST RESORT - invalidates all user sessions

   # Or more surgical: revoke suspect tokens
   kubectl exec -it pod/backend-xxxxx -- npm run jobs:revoke-tokens --since=1hour
   ```

3. **Preserve Evidence**
   ```bash
   # Snapshot logs
   kubectl logs deployment/backend -n brandconnect > /tmp/backend-logs-$(date +%s).txt
   kubectl exec -it pod/postgres-xxxxx -- \
     pg_dump -U postgres brandconnect > /tmp/database-snapshot-$(date +%s).sql

   # Snapshot audit trail
   kubectl exec -it pod/postgres-xxxxx -- \
     psql -U postgres -d brandconnect -c "SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10000" \
     > /tmp/audit-trail-$(date +%s).csv
   ```

### Investigation (Next 30 minutes)

1. **Determine Breach Scope**
   ```sql
   -- What data was accessed?
   SELECT DISTINCT resource_type FROM audit_logs 
   WHERE created_at > NOW() - INTERVAL '2 hours' 
   AND action LIKE '%select%' OR action LIKE '%read%'
   ORDER BY created_at DESC;

   -- How many records?
   SELECT COUNT(*) FROM audit_logs 
   WHERE created_at > NOW() - INTERVAL '2 hours';

   -- Which users affected?
   SELECT DISTINCT actor_id, COUNT(*) FROM audit_logs
   WHERE created_at > NOW() - INTERVAL '2 hours'
   GROUP BY actor_id;
   ```

2. **Check Unauthorized Access**
   ```bash
   # Identify suspicious IPs
   kubectl exec -it pod/postgres-xxxxx -- \
     psql -U postgres -d brandconnect \
     -c "SELECT ip_address, COUNT(*), ARRAY_AGG(DISTINCT action) FROM audit_logs \
         WHERE created_at > NOW() - INTERVAL '2 hours' \
         GROUP BY ip_address HAVING COUNT(*) > 100 \
         ORDER BY COUNT(*) DESC;"
   ```

### Containment (Within 1 hour)

1. **Reset User Credentials**
   ```bash
   # Send password reset emails to all affected users
   kubectl exec -it pod/backend-xxxxx -- \
     npm run jobs:send-password-resets --affected-users=all
   ```

2. **Enable 2FA Requirement**
   ```bash
   kubectl exec -it pod/backend-xxxxx -- \
     npm run jobs:require-2fa-for-all-users
   ```

3. **Revoke OAuth Tokens**
   ```typescript
   // Force re-authentication for social accounts
   await socialAuthService.revokeAllTokens();
   ```

### External Notifications (Within 72 hours)

- **ICO (UK):** Report to Information Commissioner's Office
- **Customers:** Email template:
  ```
  Subject: URGENT: Security Incident Notification

  We discovered unauthorized access to [data type] affecting [count] users.
  
  Actions we took immediately:
  1. Isolated affected systems
  2. Reset all passwords
  3. Revoked all OAuth sessions
  
  Your action required:
  - Set new password: [reset link]
  - Enable 2FA at: [settings link]
  - Monitor accounts for suspicious activity
  - Contact security@brandconnect.local
  ```

### Post-Incident Recovery

1. Root cause analysis (RFC)
2. Security audit & penetration testing
3. Update security controls
4. Legal review & potential regulatory fines
5. PR/reputation management

---

## High API Latency

**Severity:** MEDIUM  
**Estimated Impact:** Slow user experience  
**SLA:** P2 - Resolve within 2 hours

### Symptoms

- Monitoring alert: "API p95 latency > 500ms"
- User reports: "App is slow"
- Grafana: Spike in response times
- No errors, just slow

### Diagnosis

1. **Identify Slow Endpoints**
   ```bash
   # Query Prometheus
   curl -G http://prometheus:9090/api/v1/query \
     --data-urlencode 'query=rate(http_request_duration_seconds_bucket{le="0.5"}[5m])'

   # Or from logs
   kubectl logs -f deployment/backend -n brandconnect | grep "duration:"
   ```

2. **Check Database Performance**
   ```bash
   # Slow queries
   kubectl exec -it pod/postgres-xxxxx -- \
     psql -U postgres -d brandconnect \
     -c "SELECT query, calls, mean_time FROM pg_stat_statements \
         ORDER BY mean_time DESC LIMIT 10;"

   # Check connection count
   kubectl exec -it pod/postgres-xxxxx -- \
     psql -U postgres -d brandconnect \
     -c "SELECT COUNT(*) FROM pg_stat_activity;"
   ```

3. **Check Infrastructure**
   ```bash
   # CPU usage
   kubectl top nodes
   kubectl top pods -n brandconnect

   # Memory
   kubectl get hpa -n brandconnect
   kubectl describe hpa backend -n brandconnect

   # Disk
   kubectl exec -it pod/postgres-xxxxx -- df -h
   ```

### Remediation

**If Slow Queries:**

1. **Add Index**
   ```sql
   CREATE INDEX CONCURRENTLY idx_campaigns_status_date 
   ON campaigns(status, created_at DESC);
   ```

2. **Optimize Query**
   ```typescript
   // Before
   const campaigns = await orm.em.find(Campaign, {});
   for (const campaign of campaigns) {
     campaign.offers = await orm.em.find(Offer, { campaign });
   }

   // After: Use eager loading
   const campaigns = await orm.em.find(Campaign, {}, { populate: ['offers'] });
   ```

3. **Increase Connection Pool**
   ```bash
   kubectl set env deployment/backend TYPEORM_POOL_SIZE=50 -n brandconnect
   kubectl rollout restart deployment/backend -n brandconnect
   ```

**If Resource Constrained:**

1. **Scale Horizontally**
   ```bash
   kubectl scale deployment backend --replicas=5 -n brandconnect
   ```

2. **Enable Caching**
   ```bash
   # Cache frequently accessed data in Redis
   const cacheKey = `campaigns:${campaignId}`;
   let campaign = await redis.get(cacheKey);
   if (!campaign) {
     campaign = await db.campaigns.findById(campaignId);
     await redis.set(cacheKey, campaign, 'EX', 3600);
   }
   ```

---

## Stripe Webhook Failures

**Severity:** MEDIUM  
**Estimated Impact:** Payment status not updating, user confused  
**SLA:** P2 - Resolve within 4 hours

### Symptoms

- Webhook delivery failures in Stripe dashboard
- Payments stuck in "pending" status
- Error logs: "Failed to verify webhook signature"
- Payment events not appearing in audit logs

### Diagnosis

1. **Check Webhook Endpoint**
   ```bash
   # Is endpoint responding?
   curl -X POST http://localhost:3001/api/webhooks/stripe \
     -H "Content-Type: application/json" \
     -d '{"type": "test"}' \
     -v
   ```

2. **Check Webhook Secret**
   ```bash
   # Verify signature secret is correct
   kubectl get secret stripe-keys -n brandconnect -o yaml | grep WEBHOOK_SECRET
   ```

3. **Review Stripe Dashboard**
   - Go to https://dashboard.stripe.com/webhooks
   - Check endpoint status: "Endpoint is healthy" or "Endpoint is failing"
   - View recent events and responses

### Remediation

1. **Verify Endpoint Configuration**
   ```bash
   # Backend listening on correct port?
   kubectl get svc backend -n brandconnect

   # URL accessible from internet?
   curl -s https://api.brandconnect.local/api/health
   ```

2. **Check Webhook Handler**
   ```typescript
   // Ensure error handling
   @Post('webhooks/stripe')
   async handleWebhook(@Req() request) {
     try {
       // Verify signature
       const sig = request.headers['stripe-signature'];
       const event = stripe.webhooks.constructEvent(
         request.rawBody,
         sig,
         process.env.STRIPE_WEBHOOK_SECRET
       );

       // Process event
       return await this.paymentsService.handleStripeWebhook(event);
     } catch (error) {
       console.error('Webhook error:', error);
       throw new BadRequestException(error.message);
     }
   }
   ```

3. **Replay Failed Events**
   ```bash
   # In Stripe dashboard: Webhooks > Events > Filter by status "Failed"
   # Click event > "Attempt delivery" to retry
   ```

4. **Monitor Webhook Delivery**
   ```bash
   # Add monitoring
   kubectl logs -f deployment/backend | grep -i webhook
   ```

### Communication

- Notify payments team
- May need to manually update payment statuses if events were missed

---

## Post-Incident Actions

**For all incidents:**

1. Create incident report within 24 hours
2. Schedule blameless post-mortem within 48 hours
3. Identify action items and assign owners
4. Update monitoring/alerting to catch earlier next time
5. Document lessons learned

**Incident Report Template:**
```markdown
# Incident Report: [Title]

**Date:** YYYY-MM-DD  
**Duration:** HH:MM - HH:MM (X minutes)  
**Severity:** P[1-4]

## Timeline
- HH:MM - Alert triggered
- HH:MM - Team paged
- HH:MM - Root cause identified
- HH:MM - Mitigation applied
- HH:MM - Service restored

## Root Cause
[What actually went wrong]

## Impact
- [Users affected]
- [Data at risk]
- [Revenue impact]

## Actions Taken
- [Mitigation 1]
- [Mitigation 2]

## Follow-up Items
- [ ] Action 1 - Owner: @person, Due: DATE
- [ ] Action 2 - Owner: @person, Due: DATE
```
