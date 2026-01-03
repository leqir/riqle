# Observability Quick Reference

## Quick Start

### 1. Import Logger

```typescript
import { logEvent, createRequestLogger, logBusinessEvent } from '@/lib/logger';
```

### 2. Use in API Route

```typescript
export async function POST(req: NextRequest) {
  const requestId = req.headers.get('x-request-id');
  const logger = createRequestLogger(requestId || '');

  try {
    logger.info('processing', { action: 'checkout' });
    // ... do work ...
    logger.businessEvent('checkout_created', { checkoutId: 'ch-123' });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error, {
      action: 'checkout',
      metadata: { requestId },
    });
  }
}
```

### 3. Use in Server Action

```typescript
'use server';

export async function processPayment(data: PaymentData) {
  setUserContext(data.userId);

  try {
    const result = await stripe.charges.create({...});
    logBusinessEvent('payment_succeeded', {
      userId: data.userId,
      metadata: { amount: data.amount },
    });
    return result;
  } catch (error) {
    logErrorEvent(error, {
      userId: data.userId,
      action: 'processPayment',
    });
    throw error;
  }
}
```

## Most Common Functions

### Log an Info Event

```typescript
logEvent({ type: 'my_event', userId: 'user-123' }, 'info');
```

### Log a Business Event

```typescript
logBusinessEvent('payment_succeeded', {
  userId: 'user-123',
  stripeEventId: 'evt_123',
  metadata: { amount: 9999 },
});
```

### Log an Error

```typescript
logErrorEvent(error, {
  userId: 'user-123',
  action: 'processPayment',
});
```

### Create Request Logger

```typescript
const logger = createRequestLogger(requestId, userId);
logger.info('event_name', { key: 'value' });
logger.businessEvent('checkout_created', { orderId: 'ord-123' });
```

## Business Events to Log

```typescript
// Checkout created
logBusinessEvent('checkout_created', {
  userId: 'user-123',
  metadata: { amount: 9999, items: ['prod-1', 'prod-2'] },
});

// Payment succeeded
logBusinessEvent('payment_succeeded', {
  userId: 'user-123',
  stripeEventId: 'pi_123',
  metadata: { amount: 9999 },
});

// Entitlement granted
logBusinessEvent('entitlement_granted', {
  userId: 'user-123',
  metadata: { productId: 'prod-456', expiresAt: '2025-12-31' },
});

// Download link issued
logBusinessEvent('download_link_issued', {
  userId: 'user-123',
  metadata: { fileId: 'file-123', expiresAt: '2025-01-10' },
});
```

## Imports by Use Case

### For API Routes

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createRequestLogger } from '@/lib/logger';
import { handleApiError } from '@/lib/api-error-handler';
import { getRequestId } from '@/lib/request-id';
```

### For Server Actions

```typescript
import { logEvent, logBusinessEvent, logErrorEvent, setUserContext } from '@/lib/logger';
```

### For Components (Client-side)

```typescript
// Error boundaries handled by SentryErrorBoundary
import { SentryClientProvider, SentryErrorBoundary } from '@/lib/sentry-client-provider';
```

## Common Patterns

### Pattern: API Handler with Error Handling

```typescript
export async function POST(req: NextRequest) {
  const requestId = req.headers.get('x-request-id');
  const logger = createRequestLogger(requestId || '', userId);

  try {
    logger.info('started');
    const result = await doWork();
    logger.businessEvent('success', { ... });
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error, { userId, action: 'create', metadata: { requestId } });
  }
}
```

### Pattern: Server Action with Events

```typescript
export async function myAction(userId: string) {
  setUserContext(userId);
  const logger = createRequestLogger('', userId);

  try {
    logger.info('started');
    const result = await doWork();
    logger.businessEvent('completed', { ... });
    return result;
  } catch (error) {
    logErrorEvent(error, { userId, action: 'myAction' });
    throw error;
  }
}
```

### Pattern: Webhook Handler

```typescript
export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(...);
  const logger = createRequestLogger(req.headers.get('x-request-id') || '');

  if (event.type === 'charge.succeeded') {
    logBusinessEvent('payment_succeeded', {
      userId: event.data.object.metadata.userId,
      stripeEventId: event.id,
      metadata: { chargeId: event.data.object.id },
    });
  }

  return NextResponse.json({ received: true });
}
```

## Configuration

### Environment Variables (Optional)

```bash
# In .env.local
SENTRY_DSN=https://key@sentry.io/project
NEXT_PUBLIC_SENTRY_DSN=https://key@sentry.io/project
```

### Required (Already Set)

```bash
NEXT_PUBLIC_URL=http://localhost:3000
NODE_ENV=development
```

## Debugging

### View Logs in Terminal

```bash
npm run dev  # All logs in JSON format
```

### Filter Logs by Type

```bash
npm run dev 2>&1 | jq 'select(.type=="payment_succeeded")'
```

### Find User's Activity

```bash
npm run dev 2>&1 | jq 'select(.userId=="user-123")'
```

### Find Request's Events

```bash
npm run dev 2>&1 | jq 'select(.requestId=="abc-123")'
```

## Files Reference

### Logging

- `src/lib/logger.ts` - Main logging utility
- `src/lib/request-id.ts` - Request ID utilities
- `src/lib/api-error-handler.ts` - Error handling for APIs

### Configuration

- `sentry.server.config.ts` - Server setup
- `sentry.client.config.ts` - Client setup
- `sentry.edge.config.ts` - Edge setup
- `instrumentation.ts` - Next.js initialization

### Middleware & Handlers

- `src/middleware.ts` - Request ID injection
- `src/app/api/health/route.ts` - Example with logging

### Documentation

- `src/lib/OBSERVABILITY.md` - Full usage guide
- `src/lib/TESTING_OBSERVABILITY.md` - Testing guide
- `src/lib/QUICK_REFERENCE.md` - This file

## Type Signatures

```typescript
// Logger
logEvent(event: LogEventData, level?: LogLevel): void
logBusinessEvent(type: string, data: BusinessEventData): void
logErrorEvent(error: Error, context: ErrorContext): void
createRequestLogger(requestId: string, userId?: string): RequestLogger

// Request ID
generateRequestId(): string
getRequestId(): Promise<string | null>
getOrCreateRequestId(): Promise<string>

// Error Handler
handleApiError(error: unknown, options?: ErrorOptions): NextResponse
validateRequest(req: NextRequest, options?: ValidationOptions): {valid, error?}

// Sentry
setUserContext(userId: string, context?: Record<string, unknown>): void
clearUserContext(): void
addSentryContext(key: string, value: Record<string, unknown>): void
addBreadcrumb(message: string, category: string, level?: LogLevel, data?: Record): void
```

## Troubleshooting

**Logs not showing?**

- Check `NODE_ENV` is set
- Ensure middleware is running
- Verify no errors in instrumentation.ts

**Request IDs missing?**

- Check middleware is enabled
- Ensure getRequestId() is called early
- Verify not filtered by matcher

**Errors not in Sentry?**

- Set SENTRY_DSN env var
- Check error is not filtered by beforeSend()
- Verify in browser DevTools network tab

**Too many logs?**

- Filter with jq: `jq 'select(.level=="error")'`
- Adjust sampling in sentry configs
- Only log errors in production

## Next Integration

Add logging to all new:

- [ ] API routes → use `handleApiError`
- [ ] Server actions → use `createRequestLogger`
- [ ] Webhooks → use `logBusinessEvent`
- [ ] Database operations → log errors
- [ ] External API calls → add breadcrumbs
