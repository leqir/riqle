# Testing Observability Features

This document describes how to test the Sentry error tracking, logging, and request ID tracing features.

## Manual Testing

### Test 1: Request ID Injection

**Objective:** Verify request IDs are generated and propagated

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Make a request to any endpoint:

   ```bash
   curl -v http://localhost:3000/api/health
   ```

3. Verify response headers include:

   ```
   x-request-id: [generated-id]
   ```

4. Check logs for structured output:
   ```json
   {
     "timestamp": "2025-01-03T...",
     "level": "info",
     "type": "health_check_started",
     "requestId": "[same-id]"
   }
   ```

### Test 2: Error Tracking

**Objective:** Verify errors are captured in Sentry and logged

1. Create a test error in an API route:

   ```typescript
   // src/app/api/test-error/route.ts
   export async function GET() {
     throw new Error('Test error - This should appear in Sentry');
   }
   ```

2. Call the endpoint:

   ```bash
   curl http://localhost:3000/api/test-error
   ```

3. Verify:
   - Error appears in console logs with request ID
   - If SENTRY_DSN is configured, error appears in Sentry dashboard
   - Response includes `requestId` for user support

### Test 3: Business Event Logging

**Objective:** Verify business events are logged and traced

1. Create a test endpoint:

   ```typescript
   // src/app/api/test-event/route.ts
   import { logBusinessEvent, createRequestLogger } from '@/lib/logger';
   import { getRequestId } from '@/lib/request-id';
   import { NextRequest, NextResponse } from 'next/server';

   export async function GET(req: NextRequest) {
     const requestId = req.headers.get('x-request-id');
     const logger = createRequestLogger(requestId || '');

     logger.businessEvent('payment_succeeded', {
       metadata: {
         userId: 'user-123',
         amount: 9999,
         currency: 'USD',
       },
     });

     return NextResponse.json({ ok: true });
   }
   ```

2. Call the endpoint:

   ```bash
   curl http://localhost:3000/api/test-event
   ```

3. Check logs for structured event:
   ```json
   {
     "timestamp": "2025-01-03T...",
     "level": "info",
     "type": "business_event:payment_succeeded",
     "requestId": "..."
   }
   ```

### Test 4: Request-Scoped Logger

**Objective:** Verify request-scoped logger includes context automatically

1. Create a test endpoint:

   ```typescript
   // src/app/api/test-logger/route.ts
   import { createRequestLogger } from '@/lib/logger';
   import { NextRequest, NextResponse } from 'next/server';

   export async function GET(req: NextRequest) {
     const requestId = req.headers.get('x-request-id');
     const userId = 'user-123';
     const logger = createRequestLogger(requestId || '', userId);

     logger.info('starting_process', { action: 'checkout' });
     logger.warn('missing_data', { field: 'email' });

     return NextResponse.json({ ok: true });
   }
   ```

2. Call the endpoint and verify logs include both `requestId` and `userId`

### Test 5: Error Context

**Objective:** Verify error context is captured for debugging

1. Create a test endpoint with error context:

   ```typescript
   // src/app/api/test-error-context/route.ts
   import { logErrorEvent } from '@/lib/logger';
   import { NextResponse } from 'next/server';

   export async function GET() {
     try {
       const result = parseInt('not-a-number');
       if (isNaN(result)) {
         throw new Error('Invalid input');
       }
     } catch (error) {
       logErrorEvent(error as Error, {
         userId: 'user-123',
         action: 'parse_input',
         metadata: {
           input: 'not-a-number',
           expectedType: 'number',
         },
       });

       return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
     }
   }
   ```

2. Verify logs include error details and metadata

### Test 6: User Context in Sentry

**Objective:** Verify user context is attached to Sentry errors

1. Create a test endpoint:

   ```typescript
   // src/app/api/test-user-context/route.ts
   import { setUserContext } from '@/lib/logger';
   import { NextResponse } from 'next/server';

   export async function GET() {
     setUserContext('user-123', {
       email: 'user@example.com',
       plan: 'pro',
     });

     throw new Error('Test error with user context');
   }
   ```

2. In Sentry, verify error shows user info in the sidebar

## Automated Testing

### Test Health Check Endpoint

```bash
# Should return 200 with structured logging
curl -i http://localhost:3000/api/health
```

Expected output:

```json
{
  "status": "healthy",
  "timestamp": "2025-01-03T...",
  "requestId": "...",
  "checks": {
    "api": "ok",
    "database": "pending"
  }
}
```

### Test Error Response Includes Request ID

```bash
# Create a test error endpoint first
# Then call it
curl -i http://localhost:3000/api/test-error

# Response should include requestId in error body
```

Expected output:

```json
{
  "error": {
    "message": "Internal server error",
    "requestId": "..."
  }
}
```

## Log Parsing and Analysis

### View all logs from a request

```bash
# Extract and pretty-print logs for a specific requestId
npm run dev 2>&1 | jq 'select(.requestId=="your-request-id")'
```

### Find all business events

```bash
npm run dev 2>&1 | jq 'select(.type | startswith("business_event:"))'
```

### Find errors for a user

```bash
npm run dev 2>&1 | jq 'select(.userId=="user-123" and .level=="error")'
```

### Timeline of events for a user

```bash
npm run dev 2>&1 | jq 'select(.userId=="user-123") | {timestamp, type, level}' | sort -k1
```

## Sentry Integration Testing

### Configure Sentry DSN (Optional for Testing)

1. Create a Sentry account at https://sentry.io
2. Create a new Next.js project
3. Copy DSN to `.env.local`:

   ```bash
   SENTRY_DSN=https://your-key@sentry.io/project-id
   NEXT_PUBLIC_SENTRY_DSN=https://your-key@sentry.io/project-id
   ```

4. Restart the app
5. Trigger errors - they should appear in Sentry dashboard

### Verify Sentry Features

- [ ] Error capturing works
- [ ] Stack traces are included
- [ ] Source maps are available (production builds)
- [ ] User context is attached
- [ ] Custom tags are indexed
- [ ] Breadcrumbs are recorded
- [ ] Session replay works (client-side)

## Performance Testing

### Measure Logging Overhead

```typescript
// src/app/api/bench-logging/route.ts
import { logEvent } from '@/lib/logger';
import { NextResponse } from 'next/server';

export async function GET() {
  const iterations = 1000;
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    logEvent(
      {
        type: 'bench_event',
        data: {
          iteration: i,
          timestamp: new Date().toISOString(),
        },
      },
      'info'
    );
  }

  const duration = performance.now() - start;
  const avgTime = duration / iterations;

  return NextResponse.json({
    iterations,
    totalDuration: duration,
    averageTime: avgTime,
  });
}
```

Expected: < 1ms per log event

### Verify Request ID Generation Performance

```typescript
// src/app/api/bench-request-id/route.ts
import { generateRequestId } from '@/lib/request-id';
import { NextResponse } from 'next/server';

export async function GET() {
  const iterations = 10000;
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    generateRequestId();
  }

  const duration = performance.now() - start;
  const avgTime = duration / iterations;

  return NextResponse.json({
    iterations,
    totalDuration: duration,
    averageTime: avgTime,
  });
}
```

Expected: < 0.1ms per generation

## Checklist for Story Completion

- [ ] Request IDs are generated and included in all requests
- [ ] Structured logs appear in console with correct format
- [ ] Errors are logged with full context
- [ ] Business events (checkout, payment, entitlement) are logged
- [ ] Sentry captures errors when configured
- [ ] Request IDs appear in all log messages
- [ ] User context is attached to errors
- [ ] Breadcrumbs are recorded for debugging
- [ ] API error handler returns errors with request ID
- [ ] Health check endpoint logs and returns request ID
- [ ] No TypeScript errors in logger or sentry configs
- [ ] Performance overhead is minimal (< 1ms per log)

## Debugging Tips

### Enable Debug Logging

Set `NODE_ENV=development` and Sentry will log debug info:

```bash
NODE_ENV=development npm run dev
```

### Check Sentry Initialization

Add to `sentry.server.config.ts`:

```typescript
console.log('Sentry initialized with DSN:', env.SENTRY_DSN);
```

### Monitor Network Requests

In browser DevTools, check Network tab for:

- Sentry requests to `https://o[number].ingest.sentry.io`
- Proper request ID headers

### Verify Middleware is Running

Add to `src/middleware.ts`:

```typescript
console.log('Middleware intercepted:', request.nextUrl.pathname);
```
