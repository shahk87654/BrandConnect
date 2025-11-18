# Security & Compliance Documentation

## GDPR Compliance

### Data Processing

**Data Controller:** BrandConnect Ltd (Brand account holders)  
**Data Processors:** AWS (infrastructure), Stripe (payments), Onfido (KYC)

### Data Inventory

| Data Type | Purpose | Retention | Legal Basis |
|-----------|---------|-----------|-------------|
| Email, password hash | Authentication | Account lifetime | Contractual |
| Profile info (name, bio) | Platform functionality | Account lifetime | Contractual |
| Social media handles | Campaign targeting | Account lifetime | Contractual |
| Audience demographics | Influencer matching | 2 years | Legitimate interest |
| KYC documents | Regulatory compliance | 7 years | Legal obligation |
| Payment history | Financial/tax records | 7 years | Legal obligation |
| Audit logs | Security/compliance | 3 years | Legitimate interest |
| Metrics (follower count, ER) | Analytics | 1 year hot, 2 years archive | Legitimate interest |

### Rights Implementation

#### 1. Right of Access (Data Subject Request)

**Endpoint:**
```bash
POST /api/v1/users/me/dsar/access
```

**Response:** User receives downloadable JSON with all personal data within 15 days.

#### 2. Right to Erasure (Right to be Forgotten)

```bash
POST /api/v1/users/me/dsar/erasure
{
  "reason": "User wants account deletion",
  "confirmation": true
}
```

**Implementation:**
- Marks user account as deleted (soft delete)
- Removes PII from profiles table
- Anonymizes audit logs (keeps 30-day records for disputes)
- Keeps KYC/payment records for 7-year tax retention
- Removes from Redis cache immediately

#### 3. Right to Rectification

**Endpoint:**
```bash
PATCH /api/v1/users/me
```

User can update own personal data anytime.

#### 4. Right to Restrict Processing

```bash
POST /api/v1/users/me/dsar/restrict
{
  "purpose": "marketing"
}
```

Prevents marketing communications and non-essential processing.

#### 5. Right to Data Portability

```bash
POST /api/v1/users/me/dsar/export
```

**Response:** User receives structured JSON export of personal data in machine-readable format.

### Cookie & Consent Management

**Cookies Used:**
```javascript
// Essential (no consent needed)
- _auth_token: JWT access token (httpOnly, SameSite=Strict)
- _refresh_token: Refresh token (httpOnly, SameSite=Strict)
- session_id: Session tracking (httpOnly)

// Marketing (requires consent)
- _ga: Google Analytics
- _fbp: Facebook Pixel

// Preference (requires consent)
- theme: UI theme preference
- notifications_enabled: Notification preference
```

**Consent Mechanism:**
```bash
# On first visit
POST /api/v1/consent
{
  "analytics": false,
  "marketing": false,
  "preferences": true
}

# Stored in database & cookie
# Updated via settings page
```

### Data Protection Impact Assessment (DPIA)

**Completed for:**
- Influencer profiling (authenticity scoring)
- Automated offer matching
- Payment fraud detection

**Risk Mitigation:**
- All automated decisions can be overridden manually
- Users notified of scoring logic
- Regular bias audits (quarterly)

---

## CCPA/CPRA Compliance (California Residents)

### Sale of Personal Information: NO

BrandConnect **does not sell personal information**. All data shared with third parties is for contractual purposes:
- Stripe (payment processing)
- Onfido (identity verification)
- AWS (infrastructure)

Users can verify this at: `/api/v1/ccpa/do-not-sell`

### Consumer Rights

#### Right to Know
```bash
GET /api/v1/ccpa/access
```

#### Right to Delete
```bash
DELETE /api/v1/ccpa/delete
```

#### Right to Opt-Out (of any future sales - not applicable)
```bash
POST /api/v1/ccpa/opt-out
```

#### Right to Non-Discrimination
- No price differentiation for exercising rights
- No reduced service quality
- No advertising discrimination

---

## PCI-DSS Compliance (Payment Card Security)

### Scope

BrandConnect uses **Stripe Connect** for all payment processing. **No credit card data is stored, processed, or transmitted by our servers.**

### Safeguards

✅ **Level 1 Service Provider** - Stripe handles PCI compliance  
✅ **Tokenized payments** - Only Stripe tokens stored  
✅ **SSL/TLS** - All payment endpoints encrypted  
✅ **No logs** - Payment data never logged  
✅ **Access control** - Payment endpoints require authentication  
✅ **Vulnerability scanning** - Monthly with Snyk  

### Implementation

```typescript
// Backend: Never touch raw card data
const paymentIntent = await stripe.paymentIntents.create({
  amount: 1500_00, // cents
  currency: 'gbp',
  payment_method_types: ['card'],
  payment_method: paymentMethodId, // Stripe token, not card
  capture_method: 'manual', // Manual capture for escrow
});

// Frontend: Stripe.js Elements for card input
<CardElement />

// Never send raw card to backend
```

---

## SCA/PSD2 Compliance (UK/EU Payments)

### Strong Customer Authentication

**Triggers for SCA:**
- First-time payment method
- Large payment amount (> £500)
- Unusual location/IP
- High-risk transaction

**Implementation:**
```typescript
if (payment.requiresAction) {
  // Redirect to 3D Secure challenge
  const nextAction = payment.next_action;
  window.location.href = nextAction.redirect_to_url;
}
```

### Regulatory Scope

- UK: Subject to PSD2 rules (post-Brexit alignment)
- EU: Full PSD2 compliance
- US: Not subject to SCA

---

## Data Encryption

### Transit

```
HTTPS/TLS 1.3
├─ All API endpoints
├─ WebSocket connections (WSS)
└─ External API calls to Stripe, Onfido, Meta Graph
```

### At Rest

```
PostgreSQL
├─ Connection encryption: SSL
├─ Backup encryption: AWS RDS encryption
└─ Optional: Per-row encryption for sensitive fields

S3
├─ SSE-S3 (server-side encryption)
└─ Optional: SSE-KMS with customer-managed keys

Secrets (Vault)
├─ Master key in AWS KMS
├─ Sealed storage
└─ Access logs for all reads
```

### Field-Level Encryption (Sensitive Data)

```typescript
// For highly sensitive PII
@Column()
@Encrypted()
user_ssn: string; // Encrypted before storage

// Implementation: typeorm-encrypted
```

---

## Audit Logging

### What's Logged

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  actor_id UUID,
  action VARCHAR(100), -- 'create_campaign', 'accept_offer', 'release_payment'
  resource_type VARCHAR(50),
  resource_id UUID,
  old_value JSONB, -- Previous state (if update)
  new_value JSONB, -- New state
  ip_address INET,
  user_agent TEXT,
  correlation_id UUID, -- Links to request logs
  timestamp TIMESTAMP DEFAULT NOW()
);
```

### Immutability

```typescript
// No updates to audit_logs - only inserts
// Hash-based integrity checking
hash = SHA256(previous_hash + new_record)

// Quarterly export to immutable storage (AWS S3 with Glacier archive)
```

### Retention

- **Active**: 30 days in PostgreSQL (hot access)
- **Archive**: 3 years in S3 Glacier
- **Purge**: After 3 years (unless legal hold)

### Sensitive Data Redaction

```typescript
// Before logging, redact:
- Credit card numbers (last 4 only: ****1234)
- API keys (first 4 + ****)
- Passwords (never logged)
- Social security numbers (never logged)
- Authentication tokens (token_id only)

LOG.info(`Payment ${payment.stripe_payment_id} processed for user ${user.id}`);
// Never: LOG.info(stripe_payment_intent);
```

---

## Third-Party Risk Management

### Vendor Assessment

| Vendor | Purpose | Data Shared | Risk Mitigation |
|--------|---------|-------------|---|
| Stripe | Payments | Payment method tokens, amounts | PCI-DSS L1, signed DPA, quarterly audits |
| Onfido | KYC | ID documents, selfies | ISO 27001, GDPR compliant, encrypted at rest |
| Trulioo | KYC Alt | ID documents | ISO 27001, GDPR compliant, AES-256 encryption |
| AWS | Infrastructure | All application data | SOC 2 Type II, HIPAA-eligible, business associate agreement |
| SendGrid | Email | User email addresses | SOC 2 Type II, GDPR compliant, no PII in logs |
| Twilio | SMS | Phone numbers | SOC 2 Type II, GDPR compliant |

### Data Processing Agreements (DPA)

- ✅ Stripe: Standard data processing addendum
- ✅ Onfido: GDPR-compliant DPA signed
- ✅ AWS: Customer agreement includes data processing terms
- ✅ All other vendors: GDPR addendums in place

---

## Incident Response

### Breach Detection

**Monitoring for:**
- Unauthorized database access attempts
- Unusual API call patterns
- Failed authentication attempts (> 10 in 1 min)
- Data exfiltration patterns
- Integrity check failures

**Tools:**
- AWS GuardDuty
- Snyk vulnerability scanning
- OWASP ZAP penetration testing
- Manual monthly security audits

### Breach Notification

**Procedure:**
1. **Detection** → Alert security team immediately
2. **Assessment** → Determine scope, data involved, affected users
3. **Containment** → Stop ongoing breach, isolate affected systems
4. **Notification** → Inform users within 72 hours (GDPR requirement)
5. **Documentation** → Log incident details, actions taken
6. **Post-Incident** → Review and improve defenses

**Notification Template:**
```
Subject: Security Incident Notification - Action Required

Dear User,

On [date], we discovered [type] breach affecting [count] users. 
[Description of what happened]

Actions we took:
- [mitigation 1]
- [mitigation 2]

Your action:
- Reset your password immediately: [link]
- Monitor accounts for suspicious activity
- Contact support@brandconnect.local with questions

This incident has been reported to [ICO/relevant authority].
```

---

## Security Testing

### Automated

```bash
# Dependency scanning
npm audit
snyk test

# Code scanning
npm run eslint
semgrep --config=p/security-audit

# SAST (Static Application Security Testing)
sonarqube scan

# Container scanning
trivy image brandconnect/backend:latest

# Infrastructure scanning
aws accessanalyzer validate-policy
```

### Manual

```bash
# Quarterly penetration testing with external firm
# - OWASP Top 10 testing
# - API security testing
# - Access control testing

# Monthly security review
# - Code review of new features
# - Dependency updates
# - Configuration review
```

---

## Compliance Certifications

**Target Certifications:**
- [ ] ISO 27001 (Information Security Management)
- [ ] SOC 2 Type II (Security, availability, processing integrity)
- [ ] GDPR compliance (self-assessment, ongoing)

**Timeline:** Year 1 self-assessments, Year 2 external certifications

---

## Privacy Policy & Terms

- **Privacy Policy:** `/legal/privacy.pdf` (updated 2024-01-15)
- **Terms of Service:** `/legal/terms.pdf` (updated 2024-01-15)
- **DPA:** Available upon request to contracts@brandconnect.local
- **Cookie Policy:** `/legal/cookies.html` (interactive consent)

---

## References

- GDPR: https://gdpr-info.eu/
- CCPA: https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180AB375
- PCI-DSS: https://www.pcisecuritystandards.org/
- Stripe compliance: https://stripe.com/gb/guides/compliance
- OWASP Top 10: https://owasp.org/www-project-top-ten/
