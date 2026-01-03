# Observability Guide - Sentry, Logging, and Error Tracking

This document describes how to use the observability infrastructure for error tracking, logging, and business event monitoring.

## Architecture Overview

The observability system consists of three layers:

1. **Sentry** - Cloud-based error tracking and performance monitoring
2. **Structured Logging** - JSON-based logging with context and tracing
3. **Request ID Tracking** - End-to-end request tracing across services

## Components

### 1. Sentry Configuration

Three configuration files handle Sentry initialization for different runtime contexts:

- **sentry.server.config.ts** - Server-side Sentry (API routes, server actions)
- **sentry.client.config.ts** - Client-side Sentry (browser errors, session replay)
- **sentry.edge.config.ts** - Edge runtime Sentry (middleware, edge functions)

### 2. Logger Utility (`src/lib/logger.ts`)

Core logging functions for structured event logging:

#### Basic Event Logging

```typescript
import { logEvent } from '@/lib/logger';

// Log an informational event
logEvent(
  {
    type: 'user_signup',
    userId: 'user-123',
    data: {
      email: 'user@example.com',
      source: 'signup_form',
    },
  },
  'info'
);

// Log a warning
logEvent(
  {
    type: 'high_latency_detected',
    requestId: 'req-xyz',
  },
  'warn'
);

// Log an error
logEvent(
  {
    type: 'payment_processing_failed',
    userId: 'user-123',
    error: new Error('Stripe API unavailable'),
  },
  'error'
);
```

#### Business Event Logging

Track critical business events for audit and analysis:

```typescript
import { logBusinessEvent } from '@/lib/logger';

// Log checkout creation
logBusinessEvent('checkout_created', {
  userId: 'user-123',
  stripeEventId: 'evt_123',
  requestId: 'req-abc',
  metadata: {
    amount: 9999,
    currency: 'USD',
    items: ['item-1', 'item-2'],
  },
});

// Log payment success
logBusinessEvent('payment_succeeded', {
  userId: 'user-123',
  stripeEventId: 'evt_456',
  requestId: 'req-def',
  metadata: {
    transactionId: 'pi_123',
    amount: 9999,
  },
});

// Log entitlement granted
logBusinessEvent('entitlement_granted', {
  userId: 'user-123',
  requestId: 'req-ghi',
  metadata: {
    entitlementId: 'ent-123',
    productId: 'prod-456',
    expiresAt: '2025-12-31T23:59:59Z',
  },
});

// Log download link issued
logBusinessEvent('download_link_issued', {
  userId: 'user-123',
  requestId: 'req-jkl',
  metadata: {
    fileId: 'file-123',
    productId: 'prod-456',
    expiresAt: '2025-01-10T23:59:59Z',
  },
});
```

#### Request-Scoped Logger

Create a logger with automatic request context:

```typescript
import { createRequestLogger } from '@/lib/logger';

const requestId = 'req-xyz';
const userId = 'user-123';
const logger = createRequestLogger(requestId, userId);

// All logs automatically include requestId and userId
logger.info('checkout_started', { orderId: 'order-456' });
logger.warn('payment_slow', { duration: 5000 });
logger.error('payment_failed', paymentError, { gateway: 'stripe' });
logger.businessEvent('payment_succeeded', { amount: 9999 });
```

#### Error Logging

Log errors with full context:

```typescript
import { logErrorEvent } from '@/lib/logger';

try {
  // some async operation
  await processPayment(payment);
} catch (error) {
  logErrorEvent(error as Error, {
    userId: 'user-123',
    requestId: 'req-xyz',
    action: 'process_payment',
    metadata: {
      paymentId: payment.id,
      gateway: 'stripe',
    },
  });
}
```

### 3. Request ID Tracking (`src/lib/request-id.ts`)

Request IDs enable end-to-end tracing of requests across services:

```typescript
import { getRequestId, generateRequestId, setRequestIdContext } from '@/lib/request-id';

// Get the request ID from current request headers
const requestId = await getRequestId();

// Generate a new request ID
const newId = generateRequestId();

// Set request ID context for use in server actions
setRequestIdContext(requestId);
```

The middleware automatically injects request IDs into all requests.

### 4. Middleware (`src/middleware.ts`)

Automatically adds request IDs to all requests for tracing.

### 5. API Error Handler (`src/lib/api-error-handler.ts`)

Provides utilities for consistent error handling in API routes:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { handleApiError, validateRequest } from '@/lib/api-error-handler';
import { createRequestLogger } from '@/lib/logger';
import { getRequestId } from '@/lib/request-id';

export async function POST(req: NextRequest) {
  const requestId = req.headers.get('x-request-id') || (await getRequestId());
  const logger = createRequestLogger(requestId, userId);

  // Validate request
  const validation = await validateRequest(req, {
    method: 'POST',
    contentType: 'application/json',
  });

  if (!validation.valid) {
    return validation.error!;
  }

  try {
    logger.info('processing_request', { action: 'create_checkout' });
    // Process request
    const result = await checkout(body);
    logger.businessEvent('checkout_created', { checkoutId: result.id });
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error, {
      userId,
      action: 'create_checkout',
      metadata: { requestId },
    });
  }
}
```

### 6. Sentry Context Management (`src/lib/logger.ts`)

Set user context for all subsequent errors:

```typescript
import { setUserContext, clearUserContext, addSentryContext } from '@/lib/logger';

// Set user context
setUserContext('user-123', {
  email: 'user@example.com',
  plan: 'pro',
});

// Add custom context
addSentryContext('payment_info', {
  provider: 'stripe',
  accountId: 'acct_123',
});

// Clear user context (e.g., on logout)
clearUserContext();
```

### 7. Breadcrumbs for Debugging

Add breadcrumbs to create an audit trail:

```typescript
import { addBreadcrumb } from '@/lib/logger';

addBreadcrumb('User clicked checkout button', 'user_action', 'info', { orderId: 'order-123' });

addBreadcrumb('Stripe API call initiated', 'api_call', 'info', {
  endpoint: '/v1/checkout/sessions',
  method: 'POST',
});

// Breadcrumbs are attached to all subsequent errors
```

## Usage Patterns

### Pattern 1: API Route with Error Handling

```typescript
// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRequestLogger } from '@/lib/logger';
import { getRequestId } from '@/lib/request-id';
import { handleApiError } from '@/lib/api-error-handler';

export async function POST(req: NextRequest) {
  const requestId = req.headers.get('x-request-id') || (await getRequestId());
  const logger = createRequestLogger(requestId, userId);

  try {
    logger.info('checkout_api_called', { userId });

    const body = await req.json();
    const session = await createCheckout(body);

    logger.businessEvent('checkout_created', {
      metadata: {
        sessionId: session.id,
        amount: session.amount_total,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return handleApiError(error, {
      userId,
      action: 'create_checkout',
      metadata: { requestId },
    });
  }
}
```

### Pattern 2: Server Action with Logging

```typescript
// src/app/actions/payment.ts
'use server';

import { logBusinessEvent, logErrorEvent } from '@/lib/logger';
import { setUserContext } from '@/lib/logger';

export async function processPayment(userId: string, paymentData: PaymentData) {
  setUserContext(userId);

  try {
    const result = await stripe.paymentIntents.create({
      amount: paymentData.amount,
      currency: 'usd',
    });

    logBusinessEvent('payment_succeeded', {
      userId,
      stripeEventId: result.id,
      metadata: {
        amount: paymentData.amount,
        customerId: paymentData.customerId,
      },
    });

    return { success: true, paymentId: result.id };
  } catch (error) {
    logErrorEvent(error as Error, {
      userId,
      action: 'processPayment',
      metadata: {
        amount: paymentData.amount,
      },
    });

    throw error;
  }
}
```

### Pattern 3: Webhook Handler with Event Logging

```typescript
// src/app/api/webhooks/stripe/route.ts
import { logBusinessEvent, createRequestLogger } from '@/lib/logger';
import { getRequestId } from '@/lib/request-id';

export async function POST(req: NextRequest) {
  const requestId = req.headers.get('x-request-id') || (await getRequestId());
  const logger = createRequestLogger(requestId);

  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature')!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  logger.info('webhook_received', {
    eventType: event.type,
    eventId: event.id,
  });

  switch (event.type) {
    case 'charge.succeeded': {
      const charge = event.data.object;
      logBusinessEvent('payment_succeeded', {
        userId: charge.metadata.userId,
        stripeEventId: event.id,
        metadata: {
          chargeId: charge.id,
          amount: charge.amount,
        },
      });
      break;
    }

    case 'charge.failed': {
      const charge = event.data.object;
      logBusinessEvent('payment_failed', {
        userId: charge.metadata.userId,
        stripeEventId: event.id,
        metadata: {
          chargeId: charge.id,
          failure_reason: charge.failure_message,
        },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

## Environment Variables

Ensure these are configured in your `.env.local`:

```bash
# Sentry (optional, errors still logged locally if not configured)
SENTRY_DSN=https://your-key@sentry.io/project-id
NEXT_PUBLIC_SENTRY_DSN=https://your-key@sentry.io/project-id

# App URL (for Sentry source maps)
NEXT_PUBLIC_URL=https://localhost:3000
NEXT_PUBLIC_VERCEL_ENV=development
```

## Best Practices

1. **Always include context**
   - Add userId when available
   - Include requestId for traceability
   - Add meaningful metadata

2. **Log business-critical events**
   - Checkout creation
   - Payment processing
   - Entitlement grants
   - Download access

3. **Use appropriate log levels**
   - `debug` - Development-only details
   - `info` - Normal application flow
   - `warn` - Unexpected conditions
   - `error` - Errors that impact users

4. **Avoid logging sensitive data**
   - Never log full payment methods
   - Never log passwords or tokens
   - Filter PII in Sentry configuration

5. **Use request IDs for tracing**
   - Pass requestId between services
   - Include in log messages
   - Use for customer support correlation

6. **Add breadcrumbs before errors**
   - Create audit trail
   - Help debugging
   - Improve Sentry grouping

## Monitoring and Alerts

Configure Sentry alerts for:

1. **Critical Errors**
   - Payment failures
   - Database errors
   - Authentication failures

2. **Rate Thresholds**
   - 10+ errors in 5 minutes
   - 50+ 500 errors in 1 hour

3. **Custom Rules**
   - Specific error types
   - Business event anomalies
   - Performance regressions

## Local Development

In development mode:

- All logs are printed to console with JSON formatting
- Request IDs are generated automatically
- Debug logs are included
- Sentry sends errors to Sentry project (if configured)

Use `tail` or log aggregation tools to monitor:

```bash
# Watch logs in real time
tail -f logs/app.log | jq '.'

# Filter by event type
cat logs/app.log | jq 'select(.type=="payment_succeeded")'

# Find errors for a user
cat logs/app.log | jq 'select(.userId=="user-123" and .level=="error")'
```

## Troubleshooting

### Logs not appearing

1. Check environment variables are set correctly
2. Verify `src/middleware.ts` is not being skipped
3. Ensure `instrumentation.ts` is being loaded (check Next.js build output)

### Request IDs not consistent

1. Verify middleware is running on all routes
2. Check that request ID is being passed between services
3. Use `getRequestId()` early in request handlers

### Errors not in Sentry

1. Verify `SENTRY_DSN` is set in production
2. Check that errors are not filtered by `beforeSend()`
3. Ensure Sentry.captureException is being called

### Performance impact

- The logging system uses JSON serialization which is fast
- Sentry network requests are queued and sent asynchronously
- Request ID generation adds <1ms overhead
