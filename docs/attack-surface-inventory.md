# Attack Surface Inventory

## Overview

This document catalogs all entry points into the system where untrusted data can enter, ranked by risk level.

**Last Updated:** 2024-01-27
**Next Review:** 2024-02-27

---

## Public Endpoints (Highest Risk)

### Authentication

#### `POST /api/auth/signin`
- **Purpose**: Email magic link request
- **Input**: Email address
- **Trust Boundary**: PUBLIC
- **Validation**: Email format, length
- **Rate Limiting**: 5 requests/minute per IP
- **Risks**:
  - Email enumeration (partially mitigated by same response for valid/invalid)
  - Email spam/abuse
  - DoS through email sending
- **Mitigations**:
  - Rate limiting
  - Email validation
  - Generic success response
  - Monitor failed attempts

#### `GET /api/auth/callback`
- **Purpose**: Magic link verification
- **Input**: Token from email
- **Trust Boundary**: PUBLIC
- **Validation**: Token format, signature, expiry
- **Rate Limiting**: 10 requests/minute per IP
- **Risks**:
  - Token brute forcing (mitigated by crypto-random tokens)
  - Token theft/replay
- **Mitigations**:
  - Cryptographically random tokens
  - Short expiry (15 minutes)
  - One-time use
  - Secure transmission (HTTPS only)

### Public Pages

#### `GET /` - Homepage
#### `GET /about` - About page
#### `GET /work` - Work page
#### `GET /writing` - Writing page
#### `GET /resources` - Resources page
- **Purpose**: Public content display
- **Input**: URL parameters (if any)
- **Trust Boundary**: PUBLIC
- **Validation**: Minimal (static pages)
- **Rate Limiting**: None (CDN cached)
- **Risks**: Minimal (static content)
- **Mitigations**: CDN caching, static generation

#### `GET /writing/[slug]` - Blog post view
#### `GET /work/[slug]` - Project view
- **Purpose**: Dynamic content display
- **Input**: Slug parameter
- **Trust Boundary**: PUBLIC
- **Validation**: Slug format (alphanumeric, hyphens)
- **Rate Limiting**: None (ISR cached)
- **Risks**:
  - Path traversal (mitigated by slug validation)
  - SQL injection (mitigated by Prisma)
- **Mitigations**:
  - Slug validation regex
  - Prisma parameterized queries
  - ISR caching

### Commerce

#### `POST /api/checkout`
- **Purpose**: Create Stripe checkout session
- **Input**: Product ID, success/cancel URLs
- **Trust Boundary**: PUBLIC
- **Validation**:
  - Product ID format (CUID)
  - Product exists and is active
  - URLs are valid and same-origin
- **Rate Limiting**: 10 requests/minute per IP
- **Risks**:
  - Price manipulation (mitigated by server-side lookup)
  - Inventory manipulation
  - Abuse/fake sessions
  - Open redirect (mitigated by URL validation)
- **Mitigations**:
  - Server-side product/price lookup
  - Stripe handles payment security
  - Rate limiting
  - URL validation (same-origin only)
  - Monitor for abuse patterns

#### `POST /api/webhooks/stripe`
- **Purpose**: Handle Stripe webhook events
- **Input**: Stripe event payload
- **Trust Boundary**: PUBLIC (but verified)
- **Validation**:
  - Stripe signature verification (required)
  - Event type validation
  - Idempotency key
- **Rate Limiting**: None (Stripe controlled)
- **Risks**:
  - Replay attacks (mitigated by signature + idempotency)
  - Data corruption (mitigated by validation)
  - Unauthorized webhooks (mitigated by signature)
- **Mitigations**:
  - **CRITICAL**: Stripe signature verification
  - Idempotency tracking
  - Event type validation
  - Error handling
  - Logging all events

---

## Authenticated Endpoints (Medium Risk)

### Access

#### `GET /access/[productSlug]`
- **Purpose**: Access product with token
- **Input**: Access token (URL query parameter)
- **Trust Boundary**: AUTHENTICATED (token-based)
- **Validation**:
  - Token format
  - Token signature
  - Token expiry
  - Entitlement check
- **Rate Limiting**: 20 requests/minute per token
- **Risks**:
  - Token theft/sharing
  - Token replay
  - Unauthorized access
- **Mitigations**:
  - Cryptographically signed tokens
  - 24-hour expiry
  - Entitlement verification
  - One-time or time-limited use
  - HTTPS only

#### `POST /api/access/recover`
- **Purpose**: Request new access link via email
- **Input**: Email, product slug
- **Trust Boundary**: PUBLIC
- **Validation**:
  - Email format
  - Product slug format
  - Entitlement exists
- **Rate Limiting**: 3 requests/hour per IP per product
- **Risks**:
  - Email spam
  - Email enumeration
  - Entitlement enumeration
- **Mitigations**:
  - Strict rate limiting
  - Generic responses
  - Email validation
  - Monitor for abuse

#### `GET /api/products/[productId]/download`
- **Purpose**: Download product files
- **Input**: Product ID, access token
- **Trust Boundary**: AUTHENTICATED
- **Validation**:
  - Token verification
  - Entitlement check
  - Product exists
- **Rate Limiting**: 10 downloads/hour per entitlement
- **Risks**:
  - Unauthorized downloads
  - Token sharing
  - Bandwidth abuse
- **Mitigations**:
  - Entitlement verification
  - Signed URLs (1-hour expiry)
  - Rate limiting
  - Download tracking

---

## Admin Endpoints (Protected, High Value)

### Authentication

#### `GET /admin/*`
- **Purpose**: Admin dashboard and management
- **Input**: Session cookie
- **Trust Boundary**: ADMIN
- **Validation**:
  - Session authentication (required)
  - Role check (ADMIN only)
- **Rate Limiting**: 50 requests/minute
- **Risks**:
  - Unauthorized access (HIGH IMPACT)
  - Privilege escalation
  - CSRF attacks
- **Mitigations**:
  - **CRITICAL**: Server-side authentication
  - **CRITICAL**: Role-based access control
  - Short-lived sessions (1 hour)
  - CSRF protection
  - Re-authentication for sensitive actions

### Content Management

#### `POST /api/admin/posts`
#### `PUT /api/admin/posts/[id]`
#### `DELETE /api/admin/posts/[id]`
- **Purpose**: Create/update/delete blog posts
- **Input**: Post data (title, slug, content, metadata)
- **Trust Boundary**: ADMIN
- **Validation**:
  - Authentication required
  - Admin role required
  - Input validation (Zod schema)
  - Content sanitization
- **Rate Limiting**: 50 requests/minute
- **Risks**:
  - XSS through content injection
  - Unauthorized modifications
  - Data corruption
- **Mitigations**:
  - HTML sanitization (if rendering user HTML)
  - Schema validation
  - Authorization checks
  - Audit logging

#### `POST /api/admin/products`
#### `PUT /api/admin/products/[id]`
#### `DELETE /api/admin/products/[id]`
- **Purpose**: Manage products
- **Input**: Product data (title, description, price, etc.)
- **Trust Boundary**: ADMIN
- **Validation**:
  - Authentication required
  - Admin role required
  - Price validation (prevent negative/excessive prices)
  - Slug validation
- **Rate Limiting**: 50 requests/minute
- **Risks**:
  - **HIGH**: Price manipulation
  - Unauthorized product creation
  - Data corruption
- **Mitigations**:
  - Price range validation (0 - $10,000)
  - Authorization checks
  - Audit logging
  - Re-authentication for price changes

### Commerce Management

#### `POST /api/admin/orders/[orderId]/refund`
- **Purpose**: Issue refund for order
- **Input**: Order ID, refund reason (optional)
- **Trust Boundary**: ADMIN
- **Validation**:
  - Authentication required
  - Admin role required
  - Order exists
  - Order is refundable (not already refunded)
- **Rate Limiting**: 20 requests/minute
- **Risks**:
  - **HIGH**: Unauthorized refunds
  - Financial loss
- **Mitigations**:
  - **CRITICAL**: Re-authentication required
  - Authorization checks
  - Confirmation dialog
  - Stripe API validation
  - Audit logging with reason
  - Irreversible action warning

#### `POST /api/admin/entitlements/[id]/revoke`
- **Purpose**: Revoke access to product
- **Input**: Entitlement ID, reason (optional)
- **Trust Boundary**: ADMIN
- **Validation**:
  - Authentication required
  - Admin role required
  - Entitlement exists
- **Rate Limiting**: 20 requests/minute
- **Risks**:
  - Unauthorized revocation
  - Customer impact
- **Mitigations**:
  - **CRITICAL**: Re-authentication required
  - Authorization checks
  - Confirmation dialog
  - Audit logging with reason
  - Reversible action

### System Management

#### `POST /api/admin/cache/revalidate`
- **Purpose**: Trigger ISR revalidation
- **Input**: Tag or path to revalidate
- **Trust Boundary**: ADMIN
- **Validation**:
  - Authentication required
  - Admin role required
  - Valid revalidation target
- **Rate Limiting**: 10 requests/minute
- **Risks**:
  - Cache flooding
  - Performance impact
- **Mitigations**:
  - Rate limiting
  - Authorization checks
  - Validate revalidation target

#### `GET /api/admin/logs`
- **Purpose**: View system logs
- **Input**: Filter parameters (date range, level, etc.)
- **Trust Boundary**: ADMIN
- **Validation**:
  - Authentication required
  - Admin role required
- **Rate Limiting**: 50 requests/minute
- **Risks**:
  - Information disclosure
  - Log tampering (if writable)
- **Mitigations**:
  - Read-only access
  - No sensitive data in logs
  - Authorization checks

---

## API Endpoints Summary

| Endpoint | Method | Risk Level | Auth Required | Rate Limit |
|----------|--------|-----------|---------------|-----------|
| `/api/auth/signin` | POST | High | No | 5/min |
| `/api/auth/callback` | GET | High | No | 10/min |
| `/api/checkout` | POST | High | No | 10/min |
| `/api/webhooks/stripe` | POST | Critical | Signature | None |
| `/access/[slug]` | GET | Medium | Token | 20/min |
| `/api/access/recover` | POST | Medium | No | 3/hour |
| `/api/products/[id]/download` | GET | Medium | Token | 10/hour |
| `/admin/*` | * | Critical | Session | 50/min |
| `/api/admin/*` | * | Critical | Session + Role | 50/min |

---

## Minimization Actions Taken

### ✅ Removed

- User registration (email-only auth reduces attack surface)
- Public API (no unnecessary endpoints)
- Webhooks except Stripe (fewer integrations = fewer risks)
- Third-party integrations except essentials (Stripe, Resend, Sentry)
- Password authentication (magic links eliminate password risks)
- User profiles (no unnecessary PII storage)
- Comments/forums (no UGC = no XSS/spam)
- Search functionality (no complex query injection)

### ✅ Implemented

- Email-only authentication (simpler, more secure)
- Server-side authorization (no client-only checks)
- Minimal data collection (email, orders, entitlements only)
- Rate limiting on critical endpoints
- Stripe signature verification
- Token-based access control
- Admin-only management interface

---

## High-Risk Areas (Priority Monitoring)

1. **Stripe Webhook** - Critical financial endpoint, MUST verify signatures
2. **Admin Authentication** - Full system access, MUST be secure
3. **Product Downloads** - Paid content, MUST verify entitlements
4. **Checkout Flow** - Financial transactions, MUST validate inputs
5. **Admin Refunds/Revocations** - Financial impact, MUST re-authenticate

---

## Regular Review Actions

### Monthly
- [ ] Review failed authentication attempts
- [ ] Check rate limit violations
- [ ] Review Stripe webhook logs
- [ ] Monitor download patterns

### Quarterly
- [ ] Re-assess attack surface changes
- [ ] Review new endpoints added
- [ ] Update risk assessments
- [ ] Penetration test critical paths

### Annually
- [ ] Comprehensive security audit
- [ ] Third-party penetration test
- [ ] Review all mitigation strategies
- [ ] Update this document

---

## Reporting Security Issues

**Contact**: security@riqle.com
**Response Time**: 48 hours
**Security Policy**: /.well-known/security.txt

---

Last Updated: 2024-01-27
Next Review: 2024-02-27
