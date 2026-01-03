# Inngest Setup - Background Jobs & Retries

## Overview

Story 0.13 implements background job processing for the Riqle platform using Inngest. This enables async email sending and heavy operations without blocking HTTP requests.

## Files Created

### 1. `src/lib/inngest.ts`

Configures the Inngest client with exponential backoff retry strategy.

**Key Features:**

- Client ID: `riqle`
- Exponential backoff: 1s → 2s → 4s → 8s → 16s for retries
- Server-only module for security

### 2. `src/inngest/functions.ts`

Defines all background job functions with retry configurations.

**Job Functions:**

#### `sendPurchaseConfirmation` (3 retries)

- **Event:** `email/purchase-confirmation`
- **Data:** `{ orderId: string, customerEmail: string }`
- **Steps:**
  1. Fetch order with items and products
  2. Render and send confirmation email
  3. Mark order as fulfilled (`fulfilledAt`)
- **Use Case:** Called when Stripe checkout completes

#### `sendRefundNotification` (2 retries)

- **Event:** `email/refund-notification`
- **Data:** `{ orderId: string, customerEmail: string, refundReason?: string }`
- **Steps:**
  1. Fetch order details
  2. Render and send refund email
  3. Mark order as refunded (`refundedAt`)
- **Use Case:** Called when a charge is refunded

#### `sendWelcomeEmail` (1 retry)

- **Event:** `email/welcome`
- **Data:** `{ userId: string, email: string, name?: string }`
- **Steps:**
  1. Send welcome email to new user
- **Use Case:** Called when user signs up

### 3. `src/app/api/inngest/route.ts`

Exposes the Inngest webhook endpoint for job execution and event handling.

**Methods:**

- `GET` - Health check and function sync
- `POST` - Webhook from Inngest infrastructure
- `PUT` - Function sync and status updates

### 4. `src/lib/inngest-client.ts`

Helper functions to enqueue jobs from anywhere in the application.

**Functions:**

- `enqueuePurchaseConfirmation()`
- `enqueueRefundNotification()`
- `enqueueWelcomeEmail()`

### 5. `src/lib/inngest-webhook-example.ts`

Reference documentation showing how to integrate Inngest with webhook handlers.

## Retry Strategy

### Exponential Backoff Formula

```
delay = 2^attempt * 1000ms
```

**Timeline:**

- Attempt 1: Immediate
- Attempt 2: 1 second delay
- Attempt 3: 2 seconds delay
- Attempt 4: 4 seconds delay
- Max: 3 retries per job

### Failure Handling

1. Job fails → Wait (backoff delay) → Retry
2. After max retries → Move to dead-letter queue
3. Dead-letter queue monitored via Inngest UI
4. Manual replay possible from Inngest dashboard

## Integration with Webhooks

### Pattern

```typescript
// In webhook handler (e.g., Stripe checkout)
export async function POST(req: NextRequest) {
  const event = parseWebhookEvent(req);

  // Fast: Update database immediately
  await db.order.update({
    where: { id: orderId },
    data: { status: 'processing' },
  });

  // Non-blocking: Queue email job
  // Don't await this - let Inngest handle it
  enqueuePurchaseConfirmation({
    orderId,
    customerEmail,
  });

  // Return immediately (< 500ms)
  return NextResponse.json({ received: true });
}
```

### Benefits

- **Fast Webhooks:** Database update only (< 50ms)
- **Reliable Delivery:** Inngest retries with exponential backoff
- **Async Processing:** Heavy work (email, API calls) happens in background
- **Monitoring:** Full visibility in Inngest UI

## Environment Variables

These are already in `src/env.ts`:

```
INNGEST_EVENT_KEY=optional
INNGEST_SIGNING_KEY=optional
```

For local development, Inngest provides a dev server. For production, connect to Inngest cloud at https://app.inngest.com.

## Testing

### Test via Inngest UI

1. Go to https://app.inngest.com
2. Select your Riqle app
3. Find function (e.g., `send-purchase-confirmation`)
4. Click "Run" and provide test data
5. Watch execution in real-time

### Test via Code

```typescript
import { inngest } from '@/lib/inngest';
import { enqueuePurchaseConfirmation } from '@/lib/inngest-client';

// Trigger event
await enqueuePurchaseConfirmation({
  orderId: 'test-order-123',
  customerEmail: 'test@example.com',
});

// Check Inngest UI for execution
```

### Test Retries

1. Modify job to throw error intentionally
2. Trigger event
3. Watch Inngest UI show retries with backoff timing
4. Verify email logs in database

## Next Steps

### For Story 0.14 (Transactional Email Setup)

- Set up DKIM/SPF for riqle.com email domain
- Configure email templates (Resend templates or React Email)
- Enhance email rendering with better HTML templates

### For Future Stories

- Add job queue monitoring/alerting
- Implement dead-letter queue processor
- Add rate limiting for email sends
- Create job analytics dashboard

## Database Integration

All jobs log to `EmailLog` table via `src/lib/email.ts`:

- `status: "sent" | "failed" | "pending"`
- `provider: "resend"`
- `messageId: string` - Provider message ID
- `error: string` - Error message if failed

Jobs also update order status:

- `fulfilledAt: DateTime` - When purchase confirmation sent
- `refundedAt: DateTime` - When refund notification sent

## Monitoring

### Inngest Dashboard

- Function status and success rate
- Retry history and backoff timing
- Dead-letter queue with failed jobs
- Error logs and stack traces
- Per-function metrics and latency

### Database Logs

Check `EmailLog` table for:

```sql
SELECT * FROM "EmailLog"
WHERE status = 'failed'
ORDER BY createdAt DESC;
```

## Troubleshooting

### Job Not Executing

1. Check Inngest dashboard for function sync
2. Verify environment variables set correctly
3. Check API route is accessible at `/api/inngest`
4. Review function definition in `src/inngest/functions.ts`

### Retries Not Happening

1. Verify job throws error (not returning error)
2. Check retry count in function config
3. Review exponential backoff timing in `inngest.ts`
4. Check dead-letter queue in Inngest UI

### Email Not Sending

1. Check `EmailLog` table for failed status
2. Review error message in log
3. Verify Resend API key in environment
4. Check sender email domain is verified in Resend
