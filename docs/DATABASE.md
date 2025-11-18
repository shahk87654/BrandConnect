# Database Schema & Design

## Entity-Relationship Diagram

```
User (1) ────────────── (N) Organization
  │                         │
  ├─ Profile                ├─ Team Members
  ├─ Social Accounts        └─ Billing Info
  └─ Auth Tokens

Organization (1) ────────────── (N) Campaign
                                    │
                                    ├─ Deliverables
                                    ├─ Offers
                                    ├─ Contracts
                                    ├─ Payments
                                    └─ Metrics

User (1) ────────────── (N) Offer
Campaign (1) ────────────── (N) Offer

Campaign (1) ────────────── (N) MetricSnapshot
Offer (1) ────────────── (1) Contract

AuditLog (N) ────────────── Records all changes
```

## Core Tables

### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'brand_admin', 'brand_member', 'influencer', 'support')),
  status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  two_fa_enabled BOOLEAN DEFAULT FALSE,
  two_fa_secret VARCHAR(255),
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
```

### organizations
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  website VARCHAR(255),
  country VARCHAR(2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
  timezone VARCHAR(50) NOT NULL DEFAULT 'Europe/London',
  kyc_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected', 'suspended')),
  kyc_verified_at TIMESTAMP,
  kyc_provider VARCHAR(50), -- 'onfido', 'trulioo'
  kyc_reference_id VARCHAR(255),
  logo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_organizations_country ON organizations(country);
CREATE INDEX idx_organizations_kyc_status ON organizations(kyc_status);
```

### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(255),
  handles JSONB, -- { instagram: { username, followers, verified }, tiktok: {...}, youtube: {...} }
  country VARCHAR(2),
  timezone VARCHAR(50),
  audience_demographics JSONB, -- { age_groups: {...}, gender: {...}, locations: [...] }
  verified BOOLEAN DEFAULT FALSE,
  verification_method VARCHAR(50), -- 'email', 'sms', 'kyc'
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_verified ON profiles(verified);
```

### campaigns
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  brief JSONB, -- campaign objectives, tone, key messages
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'active', 'paused', 'completed', 'disputed', 'cancelled')),
  budget_min DECIMAL(19,2),
  budget_max DECIMAL(19,2),
  budget_spent DECIMAL(19,2) DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  deliverable_deadline TIMESTAMP,
  submission_deadline TIMESTAMP,
  content_approval_required BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE INDEX idx_campaigns_org_id ON campaigns(organization_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_start_date ON campaigns(start_date);
```

### deliverables
```sql
CREATE TABLE deliverables (
  id UUID PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES campaigns(id),
  type VARCHAR(50) NOT NULL CHECK (type IN ('static_post', 'carousel', 'reel', 'story', 'video_ad', 'unboxing', 'review')),
  count INTEGER NOT NULL DEFAULT 1,
  price_min DECIMAL(19,2),
  price_max DECIMAL(19,2),
  price_suggested DECIMAL(19,2),
  instructions TEXT,
  guidelines JSONB, -- brand guidelines, hashtags, @ mentions
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_deliverables_campaign_id ON deliverables(campaign_id);
```

### offers
```sql
CREATE TABLE offers (
  id UUID PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES campaigns(id),
  influencer_id UUID NOT NULL REFERENCES users(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  price DECIMAL(19,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
  terms JSONB, -- payment terms, milestones, deliverables
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'counter', 'expired', 'completed')),
  version INTEGER DEFAULT 1,
  counter_by VARCHAR(50), -- 'brand' or 'influencer'
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  accepted_at TIMESTAMP,
  rejected_at TIMESTAMP
);

CREATE INDEX idx_offers_campaign_id ON offers(campaign_id);
CREATE INDEX idx_offers_influencer_id ON offers(influencer_id);
CREATE INDEX idx_offers_status ON offers(status);
CREATE UNIQUE INDEX idx_offers_active_per_influencer ON offers(campaign_id, influencer_id) WHERE status IN ('pending', 'counter', 'accepted');
```

### contracts
```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES campaigns(id),
  offer_id UUID NOT NULL REFERENCES offers(id),
  influencer_id UUID NOT NULL REFERENCES users(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'signed', 'active', 'completed', 'disputed', 'terminated')),
  content JSONB NOT NULL, -- full contract terms
  signed_by JSONB, -- { brand: { signer_id, signed_at }, influencer: { signer_id, signed_at } }
  signed_at TIMESTAMP,
  dispute_status VARCHAR(50), -- null, 'pending', 'resolved', 'escalated'
  dispute_reason TEXT,
  dispute_evidence JSONB,
  dispute_resolution JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contracts_campaign_id ON contracts(campaign_id);
CREATE INDEX idx_contracts_influencer_id ON contracts(influencer_id);
CREATE INDEX idx_contracts_status ON contracts(status);
```

### payments
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES campaigns(id),
  contract_id UUID REFERENCES contracts(id),
  payer_id UUID NOT NULL REFERENCES organizations(id),
  payee_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(19,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
  stripe_payment_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'authorized', 'captured', 'released', 'failed', 'refunded', 'disputed')),
  payment_method VARCHAR(50), -- 'card', 'bank_transfer', 'wallet'
  escrow_status VARCHAR(50) DEFAULT 'held' CHECK (escrow_status IN ('held', 'released', 'refunded')),
  escrow_released_at TIMESTAMP,
  metadata JSONB, -- milestone tracking, notes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  failed_at TIMESTAMP
);

CREATE INDEX idx_payments_campaign_id ON payments(campaign_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_payer_id ON payments(payer_id);
CREATE INDEX idx_payments_payee_id ON payments(payee_id);
```

### influencer_stats_history
```sql
CREATE TABLE influencer_stats_history (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  platform VARCHAR(50) NOT NULL CHECK (platform IN ('instagram', 'tiktok', 'youtube', 'twitter')),
  followers INTEGER,
  following INTEGER,
  posts INTEGER,
  engagement_rate DECIMAL(5,2),
  engagement_count INTEGER,
  average_likes INTEGER,
  average_comments INTEGER,
  reach INTEGER,
  impressions INTEGER,
  audience_growth DECIMAL(5,2),
  authenticity_score DECIMAL(3,2), -- 0-1, from ML model
  fake_follower_risk VARCHAR(50) DEFAULT 'low' CHECK (fake_follower_risk IN ('low', 'medium', 'high')),
  fake_follower_risk_score DECIMAL(3,2), -- 0-100
  last_sync TIMESTAMP,
  snapshot_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_source VARCHAR(50), -- 'platform_api', 'user_submitted'
  data_hash VARCHAR(255) -- for tamper detection
);

CREATE INDEX idx_influencer_stats_user_platform_date ON influencer_stats_history(user_id, platform, snapshot_at DESC);
CREATE INDEX idx_influencer_stats_authenticity ON influencer_stats_history(authenticity_score);
CREATE INDEX idx_influencer_stats_fake_follower_risk ON influencer_stats_history(fake_follower_risk_score DESC);
```

### metric_snapshots (ClickHouse)
```sql
CREATE TABLE metric_snapshots (
  id UUID,
  campaign_id UUID,
  platform String,
  metric_type String, -- 'impressions', 'clicks', 'engagement', etc
  metric_value Float32,
  data JSON,
  provenance JSON, -- { source: 'platform_api', token_id: '...', pull_time: '...' }
  created_at DateTime
)
ENGINE = MergeTree()
ORDER BY (campaign_id, created_at)
PARTITION BY toYYYYMM(created_at);
```

### audit_logs
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  actor_id UUID NOT NULL REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- 'create_campaign', 'accept_offer', 'release_payment', etc
  resource_type VARCHAR(50) NOT NULL, -- 'campaign', 'offer', 'payment', etc
  resource_id UUID NOT NULL,
  metadata JSONB, -- changes, context
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  correlation_id UUID -- for request tracing
);

CREATE INDEX idx_audit_logs_actor_id ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_correlation_id ON audit_logs(correlation_id);
```

## Indexing Strategy

- **Composite indices** for common WHERE + ORDER BY combinations
- **Partial indices** for status-specific queries (e.g., `WHERE status = 'active'`)
- **Foreign key indices** for joins (automatic)
- **Full-text search indices** on bio, descriptions (TSVECTOR)

## Partitioning

- `metric_snapshots` partitioned by month (YYYY-MM) for efficient pruning
- `audit_logs` partitioned by year if exceeds 100M rows
- Historical metrics older than 2 years moved to archive schema

## Retention Policies

| Table | Default Retention | Configurable |
|-------|------------------|---|
| audit_logs | 3 years | Yes (per region) |
| influencer_stats_history | 2 years | Yes |
| metric_snapshots | 1 year (hot) + archive | Yes |
| payments | 7 years (tax) | No |
| contracts | Indefinite | No |
| profiles | Until account deletion | No (GDPR DSAR) |

## Views

```sql
-- Active campaigns with metrics
CREATE VIEW v_active_campaigns AS
SELECT c.*, COUNT(DISTINCT o.id) as offer_count,
       SUM(p.amount) as total_spent
FROM campaigns c
LEFT JOIN offers o ON c.id = o.campaign_id AND o.status IN ('accepted', 'completed')
LEFT JOIN payments p ON c.id = p.campaign_id AND p.status = 'captured'
WHERE c.status IN ('active', 'paused')
GROUP BY c.id;

-- Influencer leaderboard
CREATE VIEW v_influencer_leaderboard AS
SELECT u.id, p.display_name, COUNT(DISTINCT c.id) as completed_campaigns,
       AVG(ish.engagement_rate) as avg_engagement,
       SUM(p2.amount) as total_earnings
FROM users u
JOIN profiles p ON u.id = p.user_id
LEFT JOIN contracts c ON u.id = c.influencer_id AND c.status = 'completed'
LEFT JOIN influencer_stats_history ish ON u.id = ish.user_id
LEFT JOIN payments p2 ON c.campaign_id = p2.campaign_id AND p2.payee_id = u.id
WHERE u.role = 'influencer'
GROUP BY u.id, p.display_name
ORDER BY total_earnings DESC;
```

## Migrations

All schema changes managed with TypeORM migrations:

```bash
npm run typeorm migration:generate -- -n AddNewField
npm run typeorm migration:run  # Apply pending
npm run typeorm migration:revert  # Rollback last
```

Migration naming convention: `<timestamp>_<DescriptiveAction>.ts`
