# BrandConnect Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      User Layer                              │
│  (Web Browser, Mobile, Desktop Apps)                        │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│                   Frontend (Next.js 14)                      │
│  ├─ Public Marketing Site                                   │
│  ├─ Authentication & Flows                                  │
│  ├─ Influencer Dashboard                                    │
│  ├─ Brand Dashboard                                         │
│  └─ Admin Dashboard                                         │
│                                                              │
│  Technologies:                                               │
│  ├─ React 18 + TypeScript                                  │
│  ├─ TailwindCSS + Design Tokens                            │
│  ├─ React Query + Zustand                                  │
│  ├─ Framer Motion + Lottie                                 │
│  └─ Sentry Error Tracking                                  │
└───────────────────┬─────────────────────────────────────────┘
                    │ HTTPS/WSS
                    ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway / CDN                          │
│  ├─ CloudFront (CDN)                                        │
│  ├─ Application Load Balancer                               │
│  ├─ Rate Limiting & DDoS Protection                         │
│  └─ WAF & SSL/TLS Termination                               │
└───────────────────┬─────────────────────────────────────────┘
                    │ REST/GraphQL
                    ▼
┌─────────────────────────────────────────────────────────────┐
│         Backend API Layer (NestJS + Kubernetes)             │
│                                                              │
│  Modules:                                                    │
│  ├─ Auth Module (JWT + OAuth)                               │
│  ├─ Users Module (Profiles, Social Connects)                │
│  ├─ Campaigns Module (Creation, Management)                 │
│  ├─ Offers Module (Negotiation, Contracts)                  │
│  ├─ Payments Module (Stripe, Escrow, Payouts)               │
│  ├─ Metrics Module (Ingestion, Verification)                │
│  ├─ KYC Module (Onfido, Trulioo Integration)                │
│  ├─ Discovery Module (Search, Filtering, Ranking)           │
│  └─ Admin Module (Moderation, Disputes, Config)             │
│                                                              │
│  Cross-Cutting Concerns:                                    │
│  ├─ Authentication Guards & Decorators                      │
│  ├─ Authorization (RBAC)                                    │
│  ├─ Request/Response Interceptors                           │
│  ├─ Exception Filters                                       │
│  ├─ Global Error Handling                                   │
│  ├─ Request Logging & Correlation IDs                       │
│  └─ Rate Limiting                                           │
│                                                              │
│  Deployment:                                                 │
│  ├─ Kubernetes (EKS) with 3+ replicas                       │
│  ├─ Horizontal Pod Autoscaling (CPU/Memory)                 │
│  ├─ Service Mesh optional (Istio)                           │
│  └─ Pod Disruption Budgets                                  │
└───────────────────┬─────────────────────────────────────────┘
                    │
         ┌──────────┼──────────┐
         │          │          │
         ▼          ▼          ▼
    ┌────────┐ ┌───────┐ ┌─────────┐
    │PostgreSQL│ │Redis  │ │ClickHouse│
    │(Primary) │ │(Cache)│ │(Analytics)│
    └────────┘ └───────┘ └─────────┘
         │
         ▼
    ┌──────────────────┐
    │   MongoDB        │
    │  (Documents)     │
    │  (Backups)       │
    └──────────────────┘

    ┌──────────────────┐
    │    S3 Bucket     │
    │  (File Storage)  │
    │  (Document KYC)  │
    └──────────────────┘
```

## Service Components

### Frontend Architecture

```
src/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public routes
│   │   └── page.tsx         # Landing page
│   ├── auth/                # Auth flows
│   │   ├── login/
│   │   ├── signup/
│   │   └── oauth/[provider]/
│   ├── dashboard/           # Role-based dashboards
│   │   ├── influencer/
│   │   ├── brand/
│   │   └── admin/
│   ├── api/                 # API route handlers
│   │   └── auth/[...nextauth]/
│   └── layout.tsx           # Root layout
│
├── components/              # Atomic Design
│   ├── atoms/              # Buttons, inputs, etc
│   ├── molecules/          # Cards, modals, etc
│   └── organisms/          # Forms, sections, etc
│
├── lib/
│   ├── api/                # API clients
│   │   └── client.ts
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Zustand state
│   └── utils/              # Utilities, types
│
└── styles/                 # Global styles & tokens
    └── tokens/             # Color, spacing, typography
```

### Backend Architecture (Modular)

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
│
├── modules/                # Feature modules
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── local.strategy.ts
│   │   │   └── oauth.strategy.ts
│   │   └── guards/
│   │       ├── jwt.guard.ts
│   │       └── oauth.guard.ts
│   │
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   ├── campaigns/
│   │   ├── campaigns.controller.ts
│   │   ├── campaigns.service.ts
│   │   ├── offers.controller.ts
│   │   ├── offers.service.ts
│   │   ├── campaigns.module.ts
│   │   └── dto/
│   │       └── create-campaign.dto.ts
│   │
│   ├── payments/
│   │   ├── payments.controller.ts
│   │   ├── payments.service.ts
│   │   ├── stripe.service.ts
│   │   ├── escrow.service.ts
│   │   └── payments.module.ts
│   │
│   ├── metrics/
│   │   ├── metrics.controller.ts
│   │   ├── metrics.service.ts
│   │   ├── metrics.module.ts
│   │   └── workers/
│   │       ├── metric-ingestion.worker.ts
│   │       └── metric-reconciliation.worker.ts
│   │
│   ├── kyc/
│   │   ├── kyc.controller.ts
│   │   ├── kyc.service.ts
│   │   ├── onfido.service.ts
│   │   └── kyc.module.ts
│   │
│   ├── discovery/
│   │   ├── discovery.controller.ts
│   │   ├── discovery.service.ts
│   │   ├── search.service.ts
│   │   ├── ranking.service.ts
│   │   └── discovery.module.ts
│   │
│   └── admin/
│       ├── admin.controller.ts
│       ├── admin.service.ts
│       └── admin.module.ts
│
├── database/
│   ├── entities/            # TypeORM entities
│   │   ├── user.entity.ts
│   │   ├── campaign.entity.ts
│   │   ├── offer.entity.ts
│   │   ├── payment.entity.ts
│   │   └── ...
│   │
│   ├── migrations/          # TypeORM migrations
│   │   └── 1700000000000_InitialSchema.ts
│   │
│   └── seeds/               # Seed scripts
│       └── seed.ts
│
├── common/
│   ├── decorators/
│   │   ├── auth.decorator.ts
│   │   └── roles.decorator.ts
│   │
│   ├── guards/
│   │   ├── roles.guard.ts
│   │   └── auth.guard.ts
│   │
│   ├── filters/
│   │   └── exception.filter.ts
│   │
│   ├── interceptors/
│   │   ├── logging.interceptor.ts
│   │   └── response.interceptor.ts
│   │
│   ├── pipes/
│   │   └── validation.pipe.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── utils/
│       ├── encryption.ts
│       └── validation.ts
│
└── config/
    ├── database.config.ts
    ├── redis.config.ts
    ├── stripe.config.ts
    └── env.validation.ts
```

## Data Flow Examples

### 1. Campaign Creation Flow

```
Brand User
    │
    ▼
Frontend: Campaign Wizard Form (5 steps)
    │ (validate locally)
    ▼
Backend: POST /api/v1/campaigns
    │
    ├─▶ CampaignsService.create()
    │   ├─▶ Validate & create entity
    │   ├─▶ Save to PostgreSQL
    │   └─▶ Publish CampaignCreated event
    │
    ├─▶ Kafka Producer: campaign.created
    │   └─▶ Workers pick up event
    │
    ├─▶ Frontend: Optimistic UI update
    │   └─▶ Show loading state
    │
    ▼
Response: { campaign_id, status: 'draft' }
    │
    ▼
Frontend: Redirect to Campaign Details
    └─▶ Display campaign with offer invitations
```

### 2. Offer Acceptance & Payment Flow

```
Influencer Accepts Offer
    │
    ▼
Backend: POST /api/v1/offers/:id/accept
    │
    ├─▶ OffersService.accept()
    │   ├─▶ Update offer status to 'accepted'
    │   └─▶ Publish OfferAccepted event
    │
    ├─▶ Kafka: Create Contract async job
    │
    ▼
Brand Funds Escrow
    │
    ▼
Backend: POST /api/v1/payments/escrow
    │
    ├─▶ PaymentsService.createEscrow()
    │   ├─▶ Call Stripe CreatePaymentIntent
    │   ├─▶ Authorize charge
    │   └─▶ Hold funds in escrow (platform account)
    │
    ├─▶ Kafka: EscrowFunded event
    │
    ▼
WebSocket: Real-time notification to influencer
    └─▶ "Start creating content"
```

### 3. Metrics Ingestion Pipeline

```
Scheduled Worker (every 1 hour)
    │
    ▼
MetricsIngestionWorker.run()
    │
    ├─▶ For each active campaign:
    │   ├─▶ Call Meta Graph API (Instagram followers, ER)
    │   ├─▶ Call YouTube Data API (subscribers, views)
    │   ├─▶ Call TikTok for Business API (followers, engagement)
    │   │
    │   ├─▶ Store raw snapshot in ClickHouse
    │   │   └─▶ With provenance { source: 'api', token_id, pull_time }
    │   │
    │   ├─▶ Compare with influencer-submitted proof
    │   │   └─▶ Flag if anomalies detected
    │   │
    │   └─▶ Publish MetricsUpdated event to Kafka
    │
    ▼
MetricsReconciliationWorker
    │
    ├─▶ Compare platform data vs claimed metrics
    ├─▶ Run ML model: FakeFollowerDetector
    ├─▶ Update authenticity_score
    └─▶ Alert if risk > threshold

    ▼
Dashboard WebSocket
    └─▶ Real-time metric charts update
```

## API Communication Patterns

### Request/Response
```
Client
    │ POST /api/v1/campaigns
    │ { title, brief, budget_min, budget_max, ... }
    │ Authorization: Bearer <token>
    ▼
Backend
    ├─ Validate JWT token (JwtGuard)
    ├─ Validate request body (ValidationPipe, Zod)
    ├─ Authorize user role (RolesGuard)
    ├─ Process business logic (Service)
    ├─ Save to database (TypeORM)
    ├─ Publish events (Kafka)
    └─ Log to audit trail
    │
    ▼ Response
    { campaign_id, status, created_at, ... }
    HTTP 201 Created
```

### WebSocket (Real-time)
```
Frontend
    │ Socket.io connection
    ▼
Backend
    ├─ Authenticate socket
    ├─ Join rooms (e.g., "campaign:123")
    └─ Handle subscriptions

Events:
    ├─ offer:created → notify brand
    ├─ content:approved → notify influencer
    ├─ metric:updated → update dashboard
    └─ payment:released → update balance
```

## Scalability Considerations

### Horizontal Scaling
- **Stateless API servers**: Can scale to N replicas
- **Load balancing**: ALB distributes traffic
- **Auto-scaling**: Kubernetes HPA based on CPU/memory
- **Database**: Read replicas for scaling reads

### Data Layer Optimization
- **Caching**: Redis for sessions, tokens, hot queries
- **Connection pooling**: PgBouncer for Postgres
- **Query optimization**: Indices, query plans
- **Time-series**: ClickHouse for metrics (columnar)

### Async Processing
- **Kafka topics**: Separate queues by priority
- **Worker scaling**: Independent consumer groups
- **Circuit breakers**: Graceful degradation on API failure
- **Dead letter queues**: Retry failed messages

## Security Architecture

### Data Encryption
- **Transport**: TLS 1.2+ everywhere
- **At Rest**: S3 encryption, RDS encryption
- **In Transit**: Secure cookies (httpOnly, SameSite)
- **PII**: Encrypted at database level (optional)

### Authentication & Authorization
- **OAuth2 + JWT**: Industry standard
- **Refresh tokens**: Httponly cookies for security
- **2FA**: TOTP/SMS for sensitive operations
- **RBAC**: Fine-grained permissions per resource

### API Security
- **Rate limiting**: Per user/IP
- **CORS**: Strict origin policies
- **CSRF protection**: SameSite cookies
- **Input validation**: Zod schemas
- **SQL injection prevention**: Parameterized queries (TypeORM)

## Monitoring & Observability

### Metrics (Prometheus)
- Request latency distribution
- Error rates by endpoint
- Database query performance
- Worker job duration & success rates

### Logs (ELK Stack)
- Structured JSON logging
- Correlation IDs for tracing requests
- PII redaction
- Immutable audit logs

### Traces (OpenTelemetry)
- Distributed tracing across services
- Jaeger visualization
- Database query tracing
- API call waterfall analysis

### Alerts (PagerDuty + Slack)
- High error rates
- P95 latency > threshold
- Database disk space
- Payment processing failures
