# Deployment & Operations Guide

## Prerequisites

- AWS Account with appropriate IAM permissions
- Kubectl configured for EKS
- Helm 3.x installed
- Terraform 1.0+
- Docker installed locally
- GitHub repository set up

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourorgs/brandconnect.git
cd brandconnect
```

### 2. Environment Setup

```bash
# Copy environment templates
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env.local

# Edit with your local config
nano frontend/.env.local
nano backend/.env.local
```

### 3. Start Services with Docker Compose

```bash
# Start all services (frontend, backend, postgres, redis, clickhouse)
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down
```

### 4. Run Database Migrations

```bash
cd backend

# Generate new migration
npm run typeorm migration:generate -- -n AddNewTable

# Run pending migrations
npm run typeorm migration:run

# Revert last migration if needed
npm run typeorm migration:revert

# Seed sample data
npm run seed
```

### 5. Access Services

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api
- **API Documentation:** http://localhost:3001/api/docs
- **PostgreSQL:** localhost:5432 (postgres/postgres)
- **Redis:** localhost:6379
- **ClickHouse:** http://localhost:8123

## Staging Deployment

### 1. Infrastructure Setup (One-time)

```bash
cd infra/terraform

# Initialize Terraform
terraform init

# Plan infrastructure
terraform plan -var="environment=staging" -var="aws_region=eu-west-2"

# Apply infrastructure
terraform apply -var="environment=staging" -var="aws_region=eu-west-2"

# Save outputs
terraform output > outputs.txt
```

### 2. Build and Push Docker Images

```bash
# Authenticate with ECR
aws ecr get-login-password --region eu-west-2 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.eu-west-2.amazonaws.com

# Build backend
docker build -f infra/docker/Dockerfile.backend \
  -t <account-id>.dkr.ecr.eu-west-2.amazonaws.com/brandconnect/backend:staging \
  ./backend
docker push <account-id>.dkr.ecr.eu-west-2.amazonaws.com/brandconnect/backend:staging

# Build frontend
docker build -f infra/docker/Dockerfile.frontend \
  -t <account-id>.dkr.ecr.eu-west-2.amazonaws.com/brandconnect/frontend:staging \
  ./frontend
docker push <account-id>.dkr.ecr.eu-west-2.amazonaws.com/brandconnect/frontend:staging
```

### 3. Deploy to Kubernetes

```bash
# Get kubeconfig
aws eks update-kubeconfig \
  --name brandconnect-cluster-staging \
  --region eu-west-2

# Create namespace & base config
kubectl apply -f infra/kubernetes/base-config.yaml

# Deploy backend
kubectl apply -f infra/kubernetes/backend-deployment.yaml

# Deploy frontend
kubectl apply -f infra/kubernetes/frontend-deployment.yaml

# Check rollout status
kubectl rollout status deployment/backend -n brandconnect
kubectl rollout status deployment/frontend -n brandconnect

# Get service URLs
kubectl get svc -n brandconnect
```

### 4. Configure DNS & Load Balancer

```bash
# Get ALB DNS
ALB_DNS=$(aws elbv2 describe-load-balancers \
  --region eu-west-2 \
  --query "LoadBalancers[?contains(DNSName, 'brandconnect-staging')].DNSName" \
  --output text)

# Point DNS to ALB
# Update Route53 CNAME records:
# staging-api.brandconnect.local -> ALB_DNS
# staging.brandconnect.local -> ALB_DNS
```

## Production Deployment

### 1. Infrastructure Setup

```bash
cd infra/terraform

# Plan for production
terraform plan -var="environment=prod" \
  -var="aws_region=eu-west-2" \
  -var="eks_node_desired_size=5" \
  -var="database_instance_class=db.t3.small"

# Apply with approval
terraform apply -var="environment=prod" \
  -var="aws_region=eu-west-2" \
  -var="eks_node_desired_size=5"
```

### 2. Pre-deployment Checklist

- [ ] All tests passing (unit, integration, e2e)
- [ ] Security scan (Snyk) shows no critical issues
- [ ] API documentation updated
- [ ] Database migrations tested
- [ ] Monitoring & alerts configured
- [ ] Backup procedures documented
- [ ] Incident runbooks prepared
- [ ] Team trained on deployment

### 3. Canary Deployment

```bash
# Update image in deployment
kubectl set image deployment/backend \
  backend=<image>:prod \
  -n brandconnect \
  --record

# Watch rollout (5% → 25% → 50% → 100%)
kubectl rollout status deployment/backend -n brandconnect --timeout=15m

# Monitor metrics during rollout
# - Error rate should stay < 1%
# - P95 latency should stay < 300ms
# - CPU/Memory should be stable

# If issues detected, rollback immediately
kubectl rollout undo deployment/backend -n brandconnect

# Verify previous version
kubectl rollout status deployment/backend -n brandconnect
```

### 4. Post-deployment Validation

```bash
# Health checks
curl -s https://api.brandconnect.local/api/health | jq .

# Smoke tests
npm run test:e2e -- --smoke-tests-only

# Monitor logs for errors
kubectl logs -f deployment/backend -n brandconnect --tail=100

# Check metrics in Prometheus
curl -s http://prometheus:9090/api/v1/query?query=up | jq .
```

## Database Maintenance

### Backups

```bash
# Create automated snapshots (AWS RDS)
aws rds create-db-snapshot \
  --db-instance-identifier brandconnect-prod \
  --db-snapshot-identifier brandconnect-prod-$(date +%Y%m%d-%H%M%S) \
  --region eu-west-2

# List snapshots
aws rds describe-db-snapshots \
  --region eu-west-2 \
  --query "DBSnapshots[?DBInstanceIdentifier=='brandconnect-prod']"

# Test restore procedure monthly
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier brandconnect-restore-test \
  --db-snapshot-identifier brandconnect-prod-20240115-103000 \
  --region eu-west-2
```

### Maintenance Windows

```bash
# Scheduled maintenance (low traffic windows)
# Monthly: Tuesday 03:00-04:00 UTC
# Includes: OS patches, DB engine updates, security patches

# Monitor maintenance progress
aws rds describe-db-instances \
  --db-instance-identifier brandconnect-prod \
  --region eu-west-2 \
  --query "DBInstances[0].PendingModifiedValues"
```

## Scaling

### Horizontal Scaling

```bash
# Scale backend manually
kubectl scale deployment backend \
  --replicas=5 \
  -n brandconnect

# Or configure HPA (Horizontal Pod Autoscaler)
kubectl autoscale deployment backend \
  --min=3 --max=10 \
  --cpu-percent=70 \
  -n brandconnect
```

### Database Scaling

```bash
# Scale RDS instance
aws rds modify-db-instance \
  --db-instance-identifier brandconnect-prod \
  --db-instance-class db.t3.large \
  --apply-immediately \
  --region eu-west-2

# Monitor scaling progress
aws rds describe-db-instances \
  --db-instance-identifier brandconnect-prod \
  --region eu-west-2
```

## Monitoring & Alerting

### Prometheus Metrics

```bash
# Port forward to Prometheus
kubectl port-forward svc/prometheus 9090:9090 -n monitoring

# Visit http://localhost:9090
# Query examples:
# - up{job="backend"}
# - rate(http_requests_total[5m])
# - http_request_duration_seconds{quantile="0.95"}
```

### Grafana Dashboards

```bash
# Port forward to Grafana
kubectl port-forward svc/grafana 3000:3000 -n monitoring

# Default credentials: admin/admin
# Create dashboards for:
# - API latency & throughput
# - Database performance
# - Error rates by endpoint
# - Infrastructure utilization
```

### PagerDuty Alerts

Configure notification channels in Prometheus:

```yaml
global:
  resolve_timeout: 5m

route:
  receiver: 'pagerduty'
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 3h

receivers:
- name: 'pagerduty'
  pagerduty_configs:
  - service_key: '<PAGERDUTY_SERVICE_KEY>'
    description: '{{ .GroupLabels.alertname }}: {{ .GroupLabels.instance }}'
```

## Incident Response

### Payment Processing Failure

**Symptoms:** PaymentError in logs, failed Stripe API calls

**Steps:**
1. Check Stripe API status: https://status.stripe.com
2. Verify webhook signatures in audit logs
3. Check rate limits: `kubectl logs -f svc/backend | grep rate_limit`
4. Increase payment processing timeout if necessary
5. Trigger manual reconciliation:

```bash
kubectl exec -it pod/backend-xxxxx -- npm run jobs:reconcile-payments
```

### Metric Ingestion Lag

**Symptoms:** Metrics > 1 hour old, outdated dashboard

**Steps:**
1. Check metric worker pod logs
2. Verify social platform API connectivity
3. Check ClickHouse disk space
4. Restart metric worker:

```bash
kubectl delete pod -l app=metric-worker -n brandconnect
```

### Database Connection Pool Exhausted

**Symptoms:** "Connection pool exhausted" errors in logs

**Steps:**
1. Check active connections: `SELECT count(*) FROM pg_stat_activity;`
2. Increase connection pool size in backend config
3. Restart backend deployment
4. Monitor for long-running queries

## Rollback Procedures

### Kubernetes Rollback

```bash
# View rollout history
kubectl rollout history deployment/backend -n brandconnect

# Rollback to previous version
kubectl rollout undo deployment/backend -n brandconnect

# Rollback to specific revision
kubectl rollout undo deployment/backend --to-revision=3 -n brandconnect

# Verify rollback
kubectl rollout status deployment/backend -n brandconnect
```

### Database Rollback

```bash
# Revert last migration
cd backend
npm run typeorm migration:revert

# Or restore from snapshot
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier brandconnect-prod \
  --db-snapshot-identifier brandconnect-prod-pre-migration \
  --region eu-west-2
```

## Security Maintenance

### Certificate Renewal

```bash
# Certificates auto-renew via Let's Encrypt/ACM
# Monitor certificate expiry
aws acm describe-certificate \
  --certificate-arn arn:aws:acm:eu-west-2:account-id:certificate/xxx \
  --region eu-west-2
```

### Security Patches

```bash
# Check for vulnerable dependencies
npm audit --production

# Update dependencies securely
npm update
npm audit fix

# Rebuild and redeploy containers
docker build -t brandconnect/backend:latest .
docker push brandconnect/backend:latest

# Rolling update in Kubernetes
kubectl set image deployment/backend \
  backend=brandconnect/backend:latest \
  -n brandconnect \
  --record
```

## Disaster Recovery

### RTO: 4 hours, RPO: 1 hour

```bash
# Restore from latest snapshot
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier brandconnect-prod-restored \
  --db-snapshot-identifier brandconnect-prod-latest \
  --region eu-west-2

# Update backend to connect to restored DB
# Run any pending migrations
# Validate data integrity

# Switch traffic to restored environment
aws elbv2 modify-target-group \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets "Id=i-xxxxx"
```
