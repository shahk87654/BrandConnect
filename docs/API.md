# BrandConnect API Documentation

## Overview

Base URL: `https://api.brandconnect.local/api/v1` (staging: `https://staging-api.brandconnect.local/api/v1`)

All endpoints require authentication except `/auth/*` endpoints.

## Authentication Endpoints

### POST /auth/signup

Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "role": "influencer" | "brand_admin",
  "name": "John Doe",
  "country": "GB",
  "timezone": "Europe/London"
}
```

**Response (201 Created):**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "role": "influencer",
  "email_verification_sent": true
}
```

**Errors:**
- `409 Conflict`: Email already registered
- `400 Bad Request`: Validation failed

---

### POST /auth/login

Authenticate and receive JWT tokens.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "refresh_token_value",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "influencer"
  }
}
```

**Note:** Refresh token is returned in httpOnly secure cookie.

---

### POST /auth/refresh

Refresh an expired access token.

**Request:**
```
Header: Cookie: refresh_token=...
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600
}
```

---

### POST /auth/oauth/:provider

Initiate OAuth flow (Google, LinkedIn).

**Request:**
```json
{
  "code": "authorization_code",
  "state": "random_state_value"
}
```

**Supported Providers:** `google`, `linkedin`

**Response (200 OK):**
```json
{
  "access_token": "jwt_token",
  "user": { ... },
  "is_new_user": false
}
```

---

### POST /auth/2fa/verify

Verify 2FA code (TOTP or SMS).

**Request:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "code": "123456",
  "method": "totp" | "sms"
}
```

**Response (200 OK):**
```json
{
  "verified": true,
  "access_token": "jwt_token"
}
```

---

## Users Endpoints

### GET /users/me

Get authenticated user profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "role": "influencer",
  "profile": {
    "display_name": "John Creator",
    "bio": "Lifestyle & Fashion",
    "avatar_url": "https://...",
    "handles": {
      "instagram": {
        "username": "john_creator",
        "followers": 150000,
        "verified": true
      }
    },
    "audience_demographics": {
      "age_groups": { "18-24": 0.35, "25-34": 0.45, ... },
      "gender": { "female": 0.65, "male": 0.35 },
      "locations": ["GB", "US", "CA", ...]
    }
  },
  "kyc_status": "verified",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### PATCH /users/me

Update user profile.

**Request:**
```json
{
  "display_name": "John Creator",
  "bio": "Lifestyle & Fashion",
  "timezone": "Europe/London",
  "country": "GB"
}
```

**Response (200 OK):**
```json
{
  "id": "...",
  "profile": { ... },
  "updated_at": "2024-01-15T10:35:00Z"
}
```

---

### POST /profiles/:id/connect-social

Connect social media accounts.

**Request:**
```json
{
  "provider": "instagram" | "tiktok" | "youtube",
  "access_token": "platform_access_token",
  "refresh_token": "optional_refresh_token"
}
```

**Response (201 Created):**
```json
{
  "provider": "instagram",
  "username": "john_creator",
  "followers": 150000,
  "connected_at": "2024-01-15T10:30:00Z",
  "last_synced": "2024-01-15T10:30:00Z"
}
```

---

### POST /profiles/:id/kyc

Submit KYC documentation.

**Request (Multipart):**
```
POST /profiles/550e8400-e29b-41d4-a716-446655440000/kyc
Content-Type: multipart/form-data

id_document: <file>
proof_of_address: <file>
selfie: <file>
```

**Response (201 Created):**
```json
{
  "kyc_status": "pending_verification",
  "kyc_reference_id": "kyc_1234567890",
  "onfido_id": "check_1234567890",
  "submitted_at": "2024-01-15T10:30:00Z"
}
```

---

## Discovery Endpoints

### GET /influencers/search

Search and filter influencers.

**Query Parameters:**
```
GET /influencers/search?q=fashion&platform=instagram&minFollowers=10000&maxFollowers=1000000&minER=2.5&maxER=8&country=GB&tags=fashion,lifestyle&sortBy=match_score&page=1&limit=20
```

| Parameter | Type | Description |
|-----------|------|---|
| `q` | string | Search query (name, username, bio) |
| `platform` | enum | Filter by platform: `instagram`, `tiktok`, `youtube` |
| `minFollowers` | number | Minimum follower count |
| `maxFollowers` | number | Maximum follower count |
| `minER` | number | Minimum engagement rate (%) |
| `maxER` | number | Maximum engagement rate (%) |
| `country` | string | ISO country code |
| `tags` | string[] | Niche tags (comma-separated) |
| `authenticity_score_min` | number | Minimum authenticity score (0-100) |
| `sortBy` | enum | `match_score`, `engagement_rate`, `followers`, `relevance` |
| `page` | number | Pagination (default: 1) |
| `limit` | number | Results per page (default: 20, max: 100) |

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "display_name": "John Creator",
      "profile": { ... },
      "platforms": [
        {
          "platform": "instagram",
          "followers": 150000,
          "engagement_rate": 5.2,
          "verified": true
        }
      ],
      "match_score": 0.87,
      "authenticity_score": 0.92,
      "suggested_price": {
        "min": 500,
        "max": 2000,
        "currency": "GBP"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 3450,
    "pages": 173
  }
}
```

---

### GET /influencers/:id

Get detailed influencer profile.

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "display_name": "John Creator",
  "bio": "Lifestyle & Fashion",
  "profile": { ... },
  "platforms": [
    {
      "platform": "instagram",
      "followers": 150000,
      "engagement_rate": 5.2,
      "verified": true,
      "top_posts": [
        {
          "id": "post_123",
          "url": "https://instagram.com/p/...",
          "engagement": 8500,
          "likes": 8000,
          "comments": 500
        }
      ]
    }
  ],
  "demographics": {
    "age_groups": { ... },
    "locations": [ ... ]
  },
  "past_campaigns": [
    {
      "brand": "Nike",
      "deliverables": 3,
      "completion_rate": 1.0,
      "rating": 4.8
    }
  ],
  "authenticity_score": 0.92,
  "rate_card": {
    "instagram_post": { "min": 500, "max": 2000 },
    "instagram_reel": { "min": 800, "max": 3000 },
    "tiktok_video": { "min": 300, "max": 1500 }
  }
}
```

---

## Campaigns Endpoints

### POST /campaigns

Create a new campaign.

**Request:**
```json
{
  "title": "Summer Fashion Campaign 2024",
  "description": "Looking for fashion influencers for summer collection",
  "brief": {
    "objectives": ["brand awareness", "product launch"],
    "tone": "aspirational, modern",
    "key_messages": ["sustainability", "diversity", "innovation"],
    "brand_values": ["eco-friendly", "inclusive"]
  },
  "budget_min": 5000,
  "budget_max": 15000,
  "currency": "GBP",
  "start_date": "2024-06-01T00:00:00Z",
  "end_date": "2024-08-31T23:59:59Z",
  "deliverable_deadline": "2024-07-15T23:59:59Z",
  "deliverables": [
    {
      "type": "static_post",
      "count": 2,
      "price_min": 500,
      "price_max": 1500,
      "instructions": "Fashion product photos with lifestyle context"
    },
    {
      "type": "reel",
      "count": 1,
      "price_min": 1000,
      "price_max": 3000,
      "instructions": "15-30 second trending format video"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "campaign_id": "camp_550e8400-e29b-41d4-a716-446655440000",
  "status": "draft",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### GET /campaigns/:id

Get campaign details.

**Response (200 OK):**
```json
{
  "campaign_id": "camp_550e8400-e29b-41d4-a716-446655440000",
  "organization_id": "org_...",
  "title": "Summer Fashion Campaign 2024",
  "status": "active",
  "budget": {
    "min": 5000,
    "max": 15000,
    "spent": 8500,
    "currency": "GBP"
  },
  "deliverables": [ ... ],
  "offers": {
    "pending": 5,
    "accepted": 12,
    "completed": 8,
    "total": 25
  },
  "metrics": {
    "total_impressions": 2500000,
    "total_engagement": 125000,
    "average_engagement_rate": 5.0,
    "estimated_roi": 3.2
  },
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### POST /campaigns/:id/offers

Send offer(s) to influencer(s).

**Request:**
```json
{
  "influencer_ids": [
    "infl_550e8400-e29b-41d4-a716-446655440000",
    "infl_550e8400-e29b-41d4-a716-446655440001"
  ],
  "price": 1500,
  "currency": "GBP",
  "terms": {
    "payment_terms": "50% upfront, 50% on approval",
    "deliverable_timeline": "14 days",
    "revision_rounds": 2,
    "usage_rights": "6 months exclusive social posting"
  },
  "expires_in_days": 7
}
```

**Response (201 Created):**
```json
{
  "offers": [
    {
      "offer_id": "offer_550e8400-e29b-41d4-a716-446655440000",
      "influencer_id": "infl_...",
      "campaign_id": "camp_...",
      "status": "pending",
      "price": 1500,
      "expires_at": "2024-01-22T10:30:00Z",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## Offers Endpoints

### POST /offers/:id/accept

Accept a campaign offer.

**Request:**
```json
{
  "accept_terms": true
}
```

**Response (200 OK):**
```json
{
  "offer_id": "offer_...",
  "status": "accepted",
  "contract_id": "contract_...",
  "contract_status": "pending_signature",
  "accepted_at": "2024-01-15T10:30:00Z"
}
```

---

### POST /offers/:id/counter

Send counter offer.

**Request:**
```json
{
  "price": 2000,
  "terms": {
    "payment_terms": "100% upfront after approval",
    "deliverable_timeline": "7 days"
  }
}
```

**Response (201 Created):**
```json
{
  "offer_id": "offer_...",
  "status": "counter",
  "version": 2,
  "counter_by": "influencer",
  "counter_at": "2024-01-15T10:30:00Z"
}
```

---

### POST /offers/:id/reject

Reject an offer.

**Request:**
```json
{
  "reason": "Not aligned with my audience"
}
```

**Response (200 OK):**
```json
{
  "offer_id": "offer_...",
  "status": "rejected",
  "rejected_at": "2024-01-15T10:30:00Z"
}
```

---

## Payments Endpoints

### POST /payments/escrow

Fund campaign escrow.

**Request:**
```json
{
  "campaign_id": "camp_...",
  "contract_id": "contract_...",
  "amount": 1500,
  "currency": "GBP",
  "payment_method_id": "pm_...",
  "idempotency_key": "uuid-for-retry-safety"
}
```

**Response (201 Created):**
```json
{
  "payment_id": "pay_...",
  "status": "authorized",
  "escrow_status": "held",
  "amount": 1500,
  "currency": "GBP",
  "stripe_payment_intent_id": "pi_...",
  "created_at": "2024-01-15T10:30:00Z",
  "expires_at": "2024-01-25T10:30:00Z"
}
```

---

### GET /payments/:id/status

Check payment/escrow status.

**Response (200 OK):**
```json
{
  "payment_id": "pay_...",
  "campaign_id": "camp_...",
  "status": "captured",
  "escrow_status": "held",
  "amount": 1500,
  "released_amount": 0,
  "refunded_amount": 0,
  "timeline": [
    {
      "status": "authorized",
      "timestamp": "2024-01-15T10:30:00Z"
    },
    {
      "status": "captured",
      "timestamp": "2024-01-16T10:30:00Z"
    }
  ]
}
```

---

### POST /payments/:id/release

Release escrowed funds to influencer.

**Request (Brand Admin):**
```json
{
  "amount": 1500,
  "reason": "Content approved"
}
```

**Response (200 OK):**
```json
{
  "payment_id": "pay_...",
  "escrow_status": "released",
  "released_amount": 1500,
  "released_at": "2024-01-20T10:30:00Z",
  "payout_id": "po_..."
}
```

---

### POST /payouts

Request withdrawal/payout.

**Request (Influencer):**
```json
{
  "amount": 5000,
  "currency": "GBP",
  "method": "bank_transfer" | "stripe_payout",
  "bank_account_id": "ba_..." // if method is bank_transfer
}
```

**Response (201 Created):**
```json
{
  "payout_id": "po_...",
  "status": "pending",
  "amount": 5000,
  "currency": "GBP",
  "method": "bank_transfer",
  "estimated_arrival": "2024-01-20",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

## Metrics Endpoints

### GET /campaigns/:id/metrics

Get campaign performance metrics.

**Query Parameters:**
```
GET /campaigns/:id/metrics?platform=instagram&since=2024-01-01&until=2024-01-31&granularity=daily
```

**Response (200 OK):**
```json
{
  "campaign_id": "camp_...",
  "platform": "instagram",
  "period": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
  "metrics": [
    {
      "date": "2024-01-01",
      "impressions": 50000,
      "engagement": 2500,
      "engagement_rate": 5.0,
      "clicks": 1200,
      "reach": 45000,
      "saves": 300,
      "shares": 150
    }
  ],
  "summary": {
    "total_impressions": 1500000,
    "total_engagement": 75000,
    "average_engagement_rate": 5.0,
    "total_reach": 1350000
  }
}
```

---

## Admin Endpoints

### GET /admin/kyc/pending

List pending KYC verifications.

**Response (200 OK):**
```json
{
  "data": [
    {
      "kyc_id": "kyc_...",
      "user_id": "user_...",
      "display_name": "John Doe",
      "submitted_at": "2024-01-15T10:30:00Z",
      "onfido_status": "pending_review",
      "onfido_id": "check_...",
      "documents": {
        "id_document": "uploaded",
        "proof_of_address": "uploaded"
      }
    }
  ]
}
```

---

### POST /admin/kyc/:id/verify

Approve or reject KYC.

**Request:**
```json
{
  "status": "verified" | "rejected",
  "reason": "Optional reason if rejected",
  "verified_by": "admin_user_id"
}
```

**Response (200 OK):**
```json
{
  "kyc_id": "kyc_...",
  "status": "verified",
  "verified_at": "2024-01-15T10:30:00Z"
}
```

---

## Error Handling

All endpoints return consistent error responses:

**Error Response Format:**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request body is invalid",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "trace_id": "req_550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Common Error Codes:**
| Code | HTTP | Description |
|------|------|---|
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | User lacks permission for action |
| `INVALID_REQUEST` | 400 | Validation failed |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Business logic conflict |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Rate Limiting

API implements token bucket rate limiting:

- **Default:** 1000 requests/hour per user
- **Discovery endpoints:** 100 requests/minute
- **Payment endpoints:** 10 requests/minute

**Headers:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 998
X-RateLimit-Reset: 1705330200
```

---

## Webhooks

Supported webhook events:

```
campaign.created
campaign.published
offer.accepted
offer.rejected
contract.signed
payment.authorized
payment.captured
payment.released
content.submitted
content.approved
payout.completed
kyc.verified
dispute.opened
```

**Webhook Payload:**
```json
{
  "event": "payment.released",
  "timestamp": "2024-01-15T10:30:00Z",
  "id": "evt_...",
  "data": {
    "payment_id": "pay_...",
    "campaign_id": "camp_...",
    "amount": 1500,
    "status": "released"
  }
}
```

Verify webhook signature using `X-Signature` header (HMAC-SHA256).

---

For full OpenAPI specification, visit `/api/docs` or `https://api.brandconnect.local/api`
