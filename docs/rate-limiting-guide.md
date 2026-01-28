# Rate Limiting Implementation Guide

## Overview

Rate limiting prevents abuse by restricting the number of requests a user can make within a time window. This protects the platform from brute force attacks, DoS attempts, and resource exhaustion.

**Last Updated:** 2024-01-27

---

## Rate Limit Configuration

### Current Limits

| Endpoint Type | Limit | Window | Purpose |
|--------------|-------|--------|---------|
| **Auth** | 5 requests | 1 minute | Prevent brute force attacks on authentication |
| **Recovery** | 3 requests | 1 hour | Prevent email spam on access recovery |
| **Checkout** | 10 requests | 1 minute | Prevent checkout session abuse |
| **API** | 100 requests | 1 minute | General API protection |
| **Admin** | 50 requests | 1 minute | Admin API protection |
| **Download** | 10 requests | 1 hour | Prevent bandwidth abuse |

### Configuration Location

Rate limits are defined in `lib/security/rate-limit.ts`:

```typescript
export const RATE_LIMITS = {
  auth: { requests: 5, window: '1 m' },
  recovery: { requests: 3, window: '1 h' },
  checkout: { requests: 10, window: '1 m' },
  api: { requests: 100, window: '1 m' },
  admin: { requests: 50, window: '1 m' },
  download: { requests: 10, window: '1 h' },
} as const;
```

---

## Implementation

### Setup

Rate limiting uses Upstash Redis for production. Configure environment variables:

```bash
# .env.local
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

**Development Mode**: If Redis is not configured in development, rate limiting is automatically disabled with a warning. This allows local development without Redis.

**Production Mode**: Redis is required. The application will throw an error if Redis credentials are missing.

---

## Usage Patterns

### Pattern 1: Manual Rate Limiting

Use this when you need custom logic or error handling:

```typescript
// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/security/rate-limit';

export async function POST(request: NextRequest) {
  // Check rate limit
  const rateLimitResult = await rateLimit(request, 'auth');

  if (!rateLimitResult.success) {
    return rateLimitResult.response; // Returns 429 with Retry-After header
  }

  // Process request
  // ...
}
```

### Pattern 2: HOC Wrapper

Use this for simple endpoints where you want automatic rate limiting:

```typescript
// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '@/lib/security/rate-limit';

export const POST = withRateLimit('checkout', async (request: NextRequest) => {
  // Handler automatically rate limited
  // ...
  return NextResponse.json({ success: true });
});
```

### Pattern 3: User-Based Rate Limiting

Use this when you want to rate limit by user ID instead of IP (more accurate):

```typescript
// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/security/rate-limit';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  // Rate limit by user ID instead of IP
  const rateLimitResult = await rateLimit(
    request,
    'admin',
    session?.user?.id // User ID for more accurate limiting
  );

  if (!rateLimitResult.success) {
    return rateLimitResult.response;
  }

  // Process request
  // ...
}
```

---

## Where to Apply Rate Limiting

### ✅ Critical Endpoints (Must Implement)

#### Authentication Endpoints
- `POST /api/auth/signin` - **Rate Limit: auth** (5/min)
- `GET /api/auth/callback` - **Rate Limit: auth** (5/min)
- Reason: Prevent brute force attacks

#### Commerce Endpoints
- `POST /api/checkout` - **Rate Limit: checkout** (10/min)
- `POST /api/webhooks/stripe` - **No rate limit** (Stripe controls this)
- Reason: Prevent abuse, fake sessions

#### Access Recovery
- `POST /api/access/recover` - **Rate Limit: recovery** (3/hour)
- Reason: Prevent email spam, enumeration attacks

#### Download Endpoints
- `GET /api/products/[id]/download` - **Rate Limit: download** (10/hour per entitlement)
- Reason: Prevent bandwidth abuse, download scraping

### ⚠️ Important Endpoints (Should Implement)

#### Admin Endpoints
- All `/api/admin/*` routes - **Rate Limit: admin** (50/min)
- Reason: Even admins shouldn't make excessive requests

#### Public API Endpoints
- General API routes - **Rate Limit: api** (100/min)
- Reason: General protection against abuse

### ❌ Don't Rate Limit

- Static assets (handled by CDN)
- Public pages (GET requests for content)
- Health check endpoints
- Webhooks with signature verification (provider-controlled)

---

## Response Format

When rate limited, the API returns:

```json
{
  "error": "Too many requests",
  "message": "You are making requests too quickly. Please slow down.",
  "retryAfter": 60
}
```

**HTTP Status**: 429 Too Many Requests

**Headers**:
- `Retry-After`: Seconds until reset (e.g., "60")
- `X-RateLimit-Limit`: Total requests allowed (e.g., "5")
- `X-RateLimit-Remaining`: Requests remaining (e.g., "0")
- `X-RateLimit-Reset`: Unix timestamp of reset (e.g., "1706380800")

---

## Client-Side Handling

### Exponential Backoff

Implement exponential backoff in client code:

```typescript
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);

    if (response.status !== 429) {
      return response;
    }

    // Rate limited, wait and retry
    const retryAfter = parseInt(response.headers.get('Retry-After') || '60', 10);
    const backoff = Math.min(retryAfter * Math.pow(2, i), 300); // Max 5 minutes

    console.warn(`Rate limited. Retrying in ${backoff}s...`);
    await new Promise(resolve => setTimeout(resolve, backoff * 1000));
  }

  throw new Error('Max retries exceeded');
}
```

### User Feedback

Show clear error messages:

```typescript
try {
  const response = await fetch('/api/auth/signin', { method: 'POST', body });

  if (response.status === 429) {
    const data = await response.json();
    alert(`Too many requests. Please wait ${data.retryAfter} seconds and try again.`);
    return;
  }

  // Handle success
} catch (error) {
  // Handle error
}
```

---

## Monitoring

### Check Rate Limit Stats

```typescript
import { getRateLimitStats } from '@/lib/security/rate-limit';

// Get current rate limit status for a user
const stats = await getRateLimitStats('admin', 'user:abc123');

if (stats) {
  console.log(`Limit: ${stats.limit}`);
  console.log(`Remaining: ${stats.remaining}`);
  console.log(`Resets at: ${new Date(stats.reset)}`);
}
```

### Monitor Rate Limit Violations

Add logging for 429 responses:

```typescript
// In API route
const rateLimitResult = await rateLimit(request, 'auth');

if (!rateLimitResult.success) {
  console.warn('[Rate Limit] Violation', {
    type: 'auth',
    identifier: getRateLimitIdentifier(request),
    timestamp: new Date().toISOString(),
  });

  // Optional: Send to monitoring service (Sentry, DataDog)

  return rateLimitResult.response;
}
```

### Dashboard Metrics

Track rate limit violations in admin dashboard:

- Number of 429 responses per endpoint
- Top violators (IP/user)
- Time series of violations
- Alert on sustained high rate

---

## Testing

### Manual Testing

```bash
# Test auth rate limit (should block after 5 requests)
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/auth/signin \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com"}' \
    -w "\nStatus: %{http_code}\n"
  sleep 1
done
```

### Automated Testing

```typescript
// tests/rate-limit.test.ts
import { checkRateLimit } from '@/lib/security/rate-limit';

describe('Rate Limiting', () => {
  it('should allow requests within limit', async () => {
    const result = await checkRateLimit('auth', 'test-user-1');
    expect(result.success).toBe(true);
  });

  it('should block requests exceeding limit', async () => {
    const identifier = 'test-user-2';

    // Make 5 requests (at limit)
    for (let i = 0; i < 5; i++) {
      await checkRateLimit('auth', identifier);
    }

    // 6th request should be blocked
    const result = await checkRateLimit('auth', identifier);
    expect(result.success).toBe(false);
  });
});
```

---

## Troubleshooting

### Issue: "Redis not configured" in production

**Solution**: Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` environment variables in Vercel.

### Issue: Rate limiting too aggressive

**Solution**: Adjust limits in `lib/security/rate-limit.ts`:

```typescript
export const RATE_LIMITS = {
  auth: {
    requests: 10, // Increase from 5 to 10
    window: '1 m',
  },
  // ...
};
```

### Issue: Legitimate users getting rate limited

**Solution**:
1. Use user ID instead of IP for authenticated endpoints
2. Increase limits for authenticated users
3. Implement allowlist for known good IPs

### Issue: Rate limiting not working

**Solution**:
1. Check Redis connection: `console.log(process.env.UPSTASH_REDIS_REST_URL)`
2. Check rate limiter is called: Add logging in `rateLimit()` function
3. Verify Redis dashboard shows requests

---

## Best Practices

### ✅ Do

- Rate limit all authentication endpoints
- Rate limit all endpoints that send emails
- Rate limit all expensive operations (downloads, searches)
- Use user ID for authenticated endpoints (more accurate than IP)
- Provide clear error messages with `retryAfter`
- Log rate limit violations for monitoring
- Test rate limits in staging before production

### ❌ Don't

- Rate limit static assets (use CDN)
- Rate limit health checks
- Rate limit webhooks with signature verification
- Use aggressive limits that hurt legitimate users
- Forget to set `Retry-After` header
- Block requests forever (use time windows)

---

## Gradual Escalation

Instead of hard blocks, consider gradual escalation:

```typescript
// Soft limit: Warning after 80% of limit
if (result.remaining < result.limit * 0.2) {
  console.warn(`[Rate Limit] User approaching limit: ${result.remaining} remaining`);
  // Could show warning to user
}

// Hard limit: Block at 100%
if (!result.success) {
  return rateLimitResult.response;
}
```

---

## Future Enhancements

1. **Dynamic Rate Limits**
   - Adjust limits based on user reputation
   - Increase limits for paid users
   - Decrease limits for suspicious behavior

2. **IP Allowlist**
   - Bypass rate limiting for trusted IPs
   - Useful for CI/CD, monitoring services

3. **Advanced Monitoring**
   - Real-time dashboard of rate limit stats
   - Alerts for sustained violations
   - Automatic temporary bans

4. **CAPTCHA Integration**
   - Show CAPTCHA after multiple violations
   - Only for public endpoints
   - Gradual escalation approach

---

## References

- [Upstash Rate Limit](https://github.com/upstash/ratelimit)
- [HTTP 429 Spec](https://httpwg.org/specs/rfc6585.html#status-429)
- [OWASP Rate Limiting](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html#rate-limiting)

---

Last Updated: 2024-01-27
