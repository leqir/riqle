# Reliability Patterns Guide

## Overview

This document describes the reliability patterns implemented in the Riqle platform. These patterns ensure the system remains stable, responsive, and user-friendly even when external services fail or experience degraded performance.

## Core Principles

1. **Fail Gracefully**: Non-critical features should degrade without impacting core functionality
2. **Isolate Failures**: Errors should be contained to prevent cascading failures
3. **Provide Feedback**: Users should always understand what's happening
4. **Recover Automatically**: System should self-heal when services recover

## Pattern Catalog

### 1. Circuit Breaker

**Purpose**: Prevent cascading failures by "opening the circuit" when a service fails repeatedly.

**When to use**:
- External API calls (Stripe, email services, etc.)
- Third-party integrations
- Services with known reliability issues
- Any service where repeated failures could overwhelm the system

**Location**: `lib/reliability/circuit-breaker.ts`

**Example**:
```typescript
import { circuitBreakers } from '@/lib/reliability/circuit-breaker';

// Create or get circuit breaker for Stripe API
const breaker = circuitBreakers.getOrCreate('stripe-api', {
  failureThreshold: 3,    // Open after 3 failures
  successThreshold: 2,     // Close after 2 successes in half-open
  timeout: 30000,          // Wait 30s before trying half-open
});

try {
  const result = await breaker.execute(async () => {
    return await stripe.customers.retrieve(customerId);
  });
} catch (error) {
  if (error instanceof CircuitBreakerError) {
    // Circuit is open, use cached data or show message
    return getCachedCustomerData(customerId);
  }
  throw error;
}
```

**States**:
- **CLOSED**: Normal operation, requests pass through
- **OPEN**: Service is failing, requests fail immediately (use fallback)
- **HALF_OPEN**: Testing if service has recovered

### 2. Retry with Exponential Backoff

**Purpose**: Automatically retry failed operations with increasing delays.

**When to use**:
- Network requests that may fail transiently
- API calls that may be rate-limited (429 errors)
- Database operations that may experience transient failures
- Any operation where temporary failures are expected

**Location**: `lib/reliability/retry.ts`

**Example**:
```typescript
import { retry, retryFetch } from '@/lib/reliability/retry';

// Retry with custom configuration
const data = await retry(
  () => fetchExternalAPI(),
  {
    maxAttempts: 3,
    initialDelayMs: 1000,    // Start with 1s delay
    maxDelayMs: 10000,       // Cap at 10s
    backoffMultiplier: 2,    // Double delay each time
  }
);

// Retry fetch requests
const response = await retryFetch(
  'https://api.example.com/data',
  { method: 'GET' },
  { maxAttempts: 3 }
);
```

**Retry Schedule**:
- Attempt 1: Immediate
- Attempt 2: ~1s delay
- Attempt 3: ~2s delay
- Attempt 4: ~4s delay (if maxAttempts > 3)
- Jitter (±25%) prevents thundering herd

**Retryable Errors**:
- Network errors (fetch failures)
- HTTP 5xx (server errors)
- HTTP 429 (rate limits)

**Non-Retryable Errors**:
- HTTP 4xx (except 429) - client errors
- Validation errors
- Authentication errors

### 3. Graceful Degradation

**Purpose**: Allow non-critical features to fail without impacting core functionality.

**When to use**:
- Recommendations, suggestions, related content
- Analytics and tracking
- Social features (sharing, comments)
- Enhancement features that aren't core to the page

**Location**: `lib/reliability/graceful-degradation.ts`

**Examples**:

**A. With Fallback**:
```typescript
import { withFallback } from '@/lib/reliability/graceful-degradation';

// Load recommendations with empty array fallback
const recommendations = await withFallback(
  () => fetchRecommendations(userId),
  [], // Fallback value
  { serviceName: 'recommendations' }
);

// Page still renders with or without recommendations
return (
  <div>
    <MainContent />
    {recommendations.length > 0 && <Recommendations items={recommendations} />}
  </div>
);
```

**B. Optional Operations**:
```typescript
import { optional } from '@/lib/reliability/graceful-degradation';

// Track page view - nice to have but not critical
await optional(
  () => analytics.trackPageView(pageId),
  { serviceName: 'analytics' }
);
```

**C. Parallel Non-Critical Operations**:
```typescript
import { allSettledWithFallbacks } from '@/lib/reliability/graceful-degradation';

const [recommendations, comments, relatedPosts] = await allSettledWithFallbacks([
  {
    name: 'recommendations',
    fn: () => fetchRecommendations(postId),
    fallback: [],
  },
  {
    name: 'comments',
    fn: () => fetchComments(postId),
    fallback: [],
  },
  {
    name: 'relatedPosts',
    fn: () => fetchRelatedPosts(postId),
    fallback: [],
  },
]);
```

**D. Feature Flags**:
```typescript
import { featureFlags, whenFeatureEnabled } from '@/lib/reliability/graceful-degradation';

// Execute only if feature is enabled
const analytics = await whenFeatureEnabled(
  'analytics',
  () => trackUserBehavior(userId)
);

// Check feature status
if (featureFlags.isEnabled('socialSharing')) {
  // Show social sharing buttons
}
```

### 4. Fault Isolation

**Purpose**: Contain errors to specific boundaries to prevent propagation.

**When to use**:
- Component boundaries (isolate component failures)
- Service boundaries (isolate external service failures)
- Database boundaries (isolate query failures)
- Module boundaries (isolate feature module failures)

**Location**: `lib/reliability/fault-isolation.ts`

**Examples**:

**A. Component Boundary**:
```typescript
import { componentBoundary } from '@/lib/reliability/fault-isolation';

export default async function BlogPage({ slug }) {
  // Critical: must succeed
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) notFound();

  // Non-critical: isolated from main content
  const recommendations = await componentBoundary(
    'Recommendations',
    () => fetchRecommendations(post.id),
    [] // Fallback
  );

  return (
    <div>
      <Article post={post} /> {/* Always renders */}
      {recommendations.length > 0 && <Recommendations items={recommendations} />}
    </div>
  );
}
```

**B. Service Boundary**:
```typescript
import { serviceBoundary } from '@/lib/reliability/fault-isolation';

const customerData = await serviceBoundary(
  'stripe',
  () => stripe.customers.retrieve(customerId),
  null // Fallback to null if Stripe is down
);

if (customerData) {
  // Show Stripe data
} else {
  // Show cached data or basic info
}
```

**C. Bulkhead Pattern** (Limit Concurrent Operations):
```typescript
import { bulkheads } from '@/lib/reliability/fault-isolation';

// Limit concurrent API calls to prevent overwhelming the service
const apiBulkhead = bulkheads.getOrCreate('external-api', 5); // Max 5 concurrent

const result = await apiBulkhead.execute(() =>
  fetch('https://api.example.com/data')
);

// Check utilization
const stats = apiBulkhead.getStats();
console.log(`Active: ${stats.activeCount}/${stats.maxConcurrent}`);
```

**D. Isolation Zone** (Auto-Disable on Excessive Errors):
```typescript
import { IsolationZone } from '@/lib/reliability/fault-isolation';

// Create zone that disables after 10 errors in 1 minute
const searchZone = new IsolationZone('search', 10, 60000);

const searchResults = await searchZone.execute(
  () => performSearch(query),
  [] // Fallback to empty results
);

if (searchZone.isDisabled()) {
  // Show message: "Search is temporarily unavailable"
}
```

## Combining Patterns

Real-world operations often benefit from combining multiple patterns:

```typescript
import { circuitBreakers, CircuitBreakerError } from '@/lib/reliability/circuit-breaker';
import { retry } from '@/lib/reliability/retry';
import { withFallback } from '@/lib/reliability/graceful-degradation';

async function fetchUserRecommendations(userId: string) {
  const breaker = circuitBreakers.getOrCreate('recommendations-api');

  return withFallback(
    async () => {
      return await breaker.execute(async () => {
        return await retry(
          () => fetch(`/api/recommendations/${userId}`).then(r => r.json()),
          { maxAttempts: 2 }
        );
      });
    },
    [], // Empty array fallback
    { serviceName: 'recommendations' }
  );
}
```

**Pattern Stack**:
1. **Graceful Degradation** (outermost): Non-critical feature, use fallback
2. **Circuit Breaker** (middle): Prevent cascading failures
3. **Retry** (innermost): Handle transient failures

## Monitoring

### Health Check Endpoints

**Database Health**:
```bash
curl https://your-domain.com/api/health/db
```

**Reliability Stats** (Admin Only):
```bash
curl https://your-domain.com/api/admin/reliability
```

Returns:
```json
{
  "timestamp": "2024-01-27T12:00:00.000Z",
  "circuitBreakers": [
    { "name": "stripe-api", "state": "CLOSED" },
    { "name": "email-service", "state": "OPEN" }
  ],
  "bulkheads": [
    {
      "name": "external-api",
      "maxConcurrent": 5,
      "activeCount": 2,
      "queueSize": 0,
      "utilizationPercent": 40
    }
  ],
  "featureFlags": {
    "analytics": true,
    "recommendations": false
  },
  "summary": {
    "totalCircuitBreakers": 2,
    "openCircuits": 1,
    "disabledFeatures": ["recommendations"]
  }
}
```

### Reset Circuit Breakers

```bash
# Reset specific circuit
curl -X POST "https://your-domain.com/api/admin/reliability?action=reset&circuit=stripe-api"

# Reset all circuits
curl -X POST "https://your-domain.com/api/admin/reliability?action=reset&circuit=all"
```

### Toggle Feature Flags

```bash
# Disable feature
curl -X POST "https://your-domain.com/api/admin/reliability?action=toggle-feature&feature=analytics&enabled=false"

# Enable feature
curl -X POST "https://your-domain.com/api/admin/reliability?action=toggle-feature&feature=analytics&enabled=true"
```

## Decision Tree

**Use this flowchart to choose the right pattern:**

```
Is the operation critical to page rendering?
├─ YES → No reliability pattern needed (let it throw)
└─ NO → Is it an external service call?
    ├─ YES → Use Circuit Breaker + Retry + Graceful Degradation
    └─ NO → Is it a database query?
        ├─ YES → Use Timeout + Graceful Degradation
        └─ NO → Is it a component/module?
            └─ YES → Use Fault Isolation + Graceful Degradation
```

## Best Practices

### ✅ DO

- **Use multiple patterns together** for robust error handling
- **Set appropriate timeouts** (3-5s for API endpoints, 10s for admin)
- **Provide fallback values** for all non-critical operations
- **Monitor circuit breaker states** in production
- **Log degradations** so you can fix underlying issues
- **Test failure scenarios** during development

```typescript
// Good: Multiple patterns, appropriate timeouts, fallback
const data = await withFallback(
  async () => {
    const breaker = circuitBreakers.getOrCreate('api');
    return await breaker.execute(async () => {
      return await retry(
        () => fetchWithTimeout('/api/data', 3000),
        { maxAttempts: 2 }
      );
    });
  },
  defaultData,
  { serviceName: 'external-api' }
);
```

### ❌ DON'T

- **Don't wrap critical operations** in graceful degradation
- **Don't ignore circuit breaker warnings** - fix the underlying issue
- **Don't set timeouts too low** (causes false positives)
- **Don't use retry for user errors** (4xx responses)
- **Don't disable features permanently** - investigate and fix

```typescript
// Bad: Critical operation with fallback (should throw)
const user = await withFallback(
  () => prisma.user.findUnique({ where: { id } }),
  null, // BAD: User data is critical
  { serviceName: 'user-fetch' }
);
```

## Testing Reliability

### Simulate Failures

```typescript
// In development, temporarily break a service
if (process.env.NODE_ENV === 'development') {
  if (Math.random() < 0.5) {
    throw new Error('Simulated failure');
  }
}
```

### Monitor Logs

```bash
# Watch for degradation warnings
tail -f logs/app.log | grep "Graceful Degradation"

# Watch for circuit breaker state changes
tail -f logs/app.log | grep "Circuit Breaker"
```

### Load Testing

Use the bulkhead stats to ensure resource limits are appropriate:

```typescript
const stats = bulkheads.getAllStats();
stats.forEach(bulkhead => {
  if (bulkhead.utilizationPercent > 80) {
    console.warn(`Bulkhead ${bulkhead.name} is at ${bulkhead.utilizationPercent}% capacity`);
  }
});
```

## Additional Resources

- [Netflix Hystrix (Circuit Breaker inspiration)](https://github.com/Netflix/Hystrix/wiki)
- [Microsoft - Cloud Design Patterns](https://docs.microsoft.com/en-us/azure/architecture/patterns/)
- [Release It! by Michael Nygard](https://pragprog.com/titles/mnee2/release-it-second-edition/)
