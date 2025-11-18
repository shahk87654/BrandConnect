# BrandConnect - Influencer Marketing Platform

A production-ready two-sided marketplace connecting **Brands ⇄ Influencers** with comprehensive Admin oversight.

**Target Markets:** UK & USA  
**Theme:** Dark with neon accents (#357BFF, #24E8D4, #A76BFF)  
**Status:** MVP Development

---

## 📁 Project Structure

```
Brand_Connect/
├── frontend/              # Next.js 14 + TypeScript + TailwindCSS
│   ├── app/              # App Router pages
│   ├── components/       # Atomic design (atoms, molecules, organisms)
│   ├── lib/              # Hooks, API clients, store, utilities
│   ├── styles/           # Design tokens, global styles
│   ├── __tests__/        # Jest tests
│   └── .storybook/       # Storybook config
├── backend/              # NestJS + TypeScript
│   ├── src/
│   │   ├── modules/      # Auth, Users, Campaigns, Payments, Metrics, KYC, Admin, Discovery
│   │   ├── database/     # Entity definitions, migrations
│   │   └── common/       # Guards, filters, decorators, interceptors
│   ├── migrations/       # TypeORM migrations
│   └── test/             # Integration & e2e tests
├── infra/                # Infrastructure as Code
│   ├── terraform/        # Terraform modules (VPC, RDS, EKS, monitoring)
│   ├── kubernetes/       # Helm charts & k8s manifests
│   └── docker/           # Dockerfile configs
├── ml-models/            # Python models
│   ├── fake-follower-detector/
│   ├── match-scorer/
│   └── price-suggester/
├── .github/workflows/    # CI/CD pipelines
└── docs/                 # Architecture, APIs, runbooks
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 15+
- Python 3.10+ (for ML models)
- AWS CLI configured (for cloud deployment)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Storybook: npm run storybook
# Tests: npm run test
```

### Backend Setup
```bash
cd backend
npm install
npm run typeorm migration:run
npm run start:dev
# API Docs: http://localhost:3000/api
# Tests: npm run test
```

### Using Docker Compose
```bash
docker-compose up -d
# Services: frontend (3000), backend (3001), postgres, redis, clickhouse
```

---

## 🏗️ Architecture Overview

### Frontend Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS + CSS variables (design tokens)
- **State:** Zustand
- **Data Fetching:** React Query (TanStack)
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion + Lottie
- **Testing:** Jest + React Testing Library
- **Components:** Storybook
- **Error Tracking:** Sentry

### Backend Stack
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL (primary), MongoDB (documents), ClickHouse (analytics)
- **Caching:** Redis
- **Events:** Kafka
- **Payments:** Stripe Connect
- **KYC:** Onfido / Trulioo integration
- **Testing:** Jest + Supertest

### Infrastructure
- **Cloud:** AWS (EKS, RDS, ElastiCache, S3)
- **IaC:** Terraform
- **Orchestration:** Kubernetes + Helm
- **Monitoring:** Prometheus + Grafana + OpenSearch
- **Logging:** ELK Stack + OpenTelemetry
- **CI/CD:** GitHub Actions

---

## 📋 Core Features

### Public Site
- Landing page with animated hero
- Features carousel, testimonials, pricing tiers, FAQ
- OAuth authentication (Google, LinkedIn)

### Authentication & Authorization
- Email/password + 2FA (TOTP/SMS)
- OAuth2 + JWT flows
- Role-based access control (RBAC)
- Social provider connections (Instagram, TikTok, YouTube)

### Influencer Dashboard
- KPI metrics (balance, pending payouts, active campaigns)
- Earnings graphs with animated counters
- Offers inbox with accept/counter/decline flows
- Campaign deliverables with drag-drop content upload
- Profile management with portfolio & audience insights
- Payout management (Stripe Connect onboarding)
- Privacy & DSAR center

### Brand Dashboard
- Overview (spend, campaigns, ROI estimation)
- Influencer discovery with smart filtering:
  - Filters: platform, followers, ER, price, location, niche, authenticity score
  - AI-powered match scoring
  - Influencer profile modal with top posts carousel
- Campaign builder (5-step wizard)
- Offer management with negotiation & versioning
- Campaign live view with real-time metrics
- Escrow & payment management
- Team management with RBAC

### Admin Dashboard (Internal)
- Overview (revenue, disputes, KYC queue, health)
- KYC verification queue with Onfido/Trulioo integration
- Fraud detection & suspicious metrics flagging
- Campaign moderation & dispute resolution
- Payment reconciliation & manual payouts
- User management & suspension
- Platform configuration

---

## 🔐 Security & Compliance

- **GDPR/UK Data Protection:** Data mapping, DSAR handling, retention policies
- **CCPA/CPRA:** Opt-out flagging, data subject requests
- **PCI-DSS:** Tokenized payments (Stripe), no card storage
- **SCA/PSD2:** Strong Customer Authentication support
- **Transport:** TLS 1.2+, HSTS, secure cookies, CSP headers
- **Secrets:** Hashicorp Vault integration
- **Audit Logging:** Immutable, hashed audit trails with correlation IDs

---

## 📊 Database Schema

### Core Entities
- `users` - authentication & accounts
- `organizations` - brands & teams
- `profiles` - user profiles with social handles
- `campaigns` - influencer marketing campaigns
- `deliverables` - campaign content requirements
- `offers` - brand-influencer offers with negotiation
- `contracts` - signed campaign agreements
- `payments` - transaction records
- `metric_snapshots` - historical performance data (ClickHouse)
- `audit_logs` - immutable event log

See `docs/DATABASE.md` for full schema and ERD.

---

## 🔌 API Documentation

All endpoints documented in OpenAPI 3.0 format.

**Staging API:** `https://staging-api.brandconnect.local/api/v1`  
**Swagger UI:** `/api/docs`

Key endpoint groups:
- `POST /api/v1/auth/*` - Authentication
- `GET/PATCH /api/v1/users/*` - User management
- `GET /api/v1/influencers/search` - Discovery
- `POST /api/v1/campaigns` - Campaign creation
- `POST /api/v1/payments/escrow` - Escrow funding
- `GET /api/v1/admin/*` - Admin operations

See `docs/API.md` and `postman-collection.json` for full details.

---

## 🧪 Testing

### Frontend
```bash
npm run test              # Jest unit tests
npm run test:e2e         # Cypress E2E tests
npm run test:coverage    # Coverage report
npm run a11y             # Accessibility audit (axe-core)
```

### Backend
```bash
npm run test              # Jest unit tests
npm run test:integration  # Supertest integration tests
npm run test:e2e         # Full flow tests
npm run test:load        # k6 load tests
```

### Critical E2E Flows (Cypress)
- User signup & email verification
- Social OAuth connections
- Campaign creation & offer flow
- Escrow funding & content submission
- Payout release workflow

---

## 🚀 Deployment

### Staging
```bash
git push origin develop
# GitHub Actions automatically deploys to staging via Terraform + Helm
```

### Production
```bash
git tag v1.0.0
git push origin --tags
# Blue/green deployment with canary release support
```

### Monitoring Deployment
```bash
# Check Prometheus metrics
# https://grafana.staging.brandconnect.local

# View logs in OpenSearch
# https://opensearch.staging.brandconnect.local

# Alerts via PagerDuty/Slack
```

See `docs/DEPLOYMENT.md` for detailed runbooks.

---

## 📈 Performance Targets

- **API Latency:** p95 < 300ms for discovery/search
- **Availability:** 99.9% uptime (multi-AZ setup)
- **Search:** <200ms for filtered influencer queries
- **Metric Ingestion:** 10k metrics/sec throughput
- **Scalability:** Horizontal scaling on Kubernetes

---

## 🔄 Development Workflow

### Local Development
```bash
# 1. Install dependencies
npm install  # both frontend & backend

# 2. Start Docker services
docker-compose up -d

# 3. Run migrations
cd backend && npm run typeorm migration:run

# 4. Seed sample data
npm run seed

# 5. Start development servers
npm run dev  # frontend on 3000, backend on 3001
```

### Git Flow
- `main` - Production releases (stable)
- `develop` - Staging integration branch
- `feature/*` - Feature branches (PR required)
- `hotfix/*` - Production fixes

### Code Quality
```bash
npm run lint              # ESLint + Prettier
npm run type-check        # TypeScript strict mode
npm run test             # All tests
npm run security-audit   # Snyk + Dependabot
```

---

## 📚 Documentation

- **[Architecture](docs/ARCHITECTURE.md)** - System design & component diagrams
- **[API Specification](docs/API.md)** - OpenAPI docs + endpoint details
- **[Database Schema](docs/DATABASE.md)** - ER diagrams & migrations
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Cloud setup & CI/CD
- **[Security & Compliance](docs/SECURITY.md)** - GDPR, CCPA, PCI-DSS, SCA
- **[Runbooks](docs/RUNBOOKS.md)** - Incident response procedures
- **[ML Models](ml-models/README.md)** - Fake follower detection, match scoring, pricing

---

## 🛠️ Development Tools

### Environment Variables
Copy `.env.example` to `.env.local` in both frontend & backend:

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SENTRY_DSN=https://...
```

**Backend (.env.local)**
```
DATABASE_URL=postgresql://user:pass@localhost:5432/brandconnect
REDIS_URL=redis://localhost:6379
STRIPE_SECRET_KEY=sk_test_...
```

### Useful Commands

```bash
# Database
npm run typeorm migration:generate -- -n <name>  # Generate migration
npm run typeorm migration:run                     # Run migrations
npm run seed                                      # Seed sample data

# Code generation
npm run generate:api-client                       # Generate API types
npm run generate:schema                           # Generate DB schema docs

# Performance
npm run analyze                                   # Bundle analysis
npm run lighthouse                                # Lighthouse audit

# Security
npm run snyk test                                 # Snyk vulnerability scan
npm run audit:deps                                # Dependency audit
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and write tests
3. Run `npm run lint && npm run test`
4. Create Pull Request to `develop`
5. After review, merge and CI/CD deploys to staging

---

## 📞 Support & Contact

- **Email:** support@brandconnect.local
- **Slack:** #engineering-channel
- **Issues:** GitHub Issues
- **Runbooks:** See `docs/RUNBOOKS.md`

---

## 📄 License

Proprietary - BrandConnect Internal Use Only

---

**Last Updated:** November 2025  
**Version:** 0.1.0 (MVP Phase)
