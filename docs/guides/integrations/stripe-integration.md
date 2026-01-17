# Stripe Integration Documentation

This document provides comprehensive documentation for the Stripe payment integration implemented in Stories 0.11-0.12.

## Overview

The Stripe integration provides:

- **Secure Checkout**: Stripe-hosted checkout sessions for PCI compliance
- **Webhook-Driven Fulfillment**: Idempotent webhook processing with transaction safety
- **Order Management**: Complete order and entitlement tracking
- **Refund Handling**: Automatic entitlement revocation on refunds
- **Email Notifications**: Purchase confirmations and refund notifications

## Architecture

### Data Flow

```
User clicks "Purchase"
  → tRPC checkout.createSession
    → Validates product/price
    → Creates/retrieves Stripe customer
    → Creates Stripe Checkout Session
      → User redirects to Stripe
        → User completes payment
          → Stripe sends webhook (checkout.session.completed)
            → Webhook verifies signature
            → Checks idempotency (StripeEvent table)
            → Fulfills order (transaction)
              → Creates Order
              → Creates OrderItem
              → Grants Entitlement
              → Sends confirmation email
```

### Database Tables

- **Product**: Product catalog
- **Price**: Pricing tiers with Stripe price IDs
- **Order**: Order records with Stripe references
- **OrderItem**: Line items for orders
- **Entitlement**: User access grants
- **StripeEvent**: Webhook idempotency tracking
- **EmailLog**: Email delivery tracking

## Implementation Files

### Core Configuration

**`src/lib/stripe.ts`**

- Stripe client initialization
- API version: `2024-12-18.acacia`
- Server-only module

### API Layer

**`src/server/api/routers/checkout.ts`**

- `createSession`: Creates Stripe Checkout Session
  - Product/price validation
  - Duplicate purchase check
  - Customer creation/retrieval
  - Session metadata for webhook processing
- `getSession`: Retrieves session details for success page

**`src/server/api/trpc.ts`**

- tRPC context creation
- Procedure helpers: `publicProcedure`, `protectedProcedure`, `adminProcedure`

**`src/server/api/root.ts`**

- Main tRPC router combining all sub-routers

### Webhook Processing

**`src/app/api/webhooks/stripe/route.ts`**

- Webhook signature verification
- Event idempotency checking
- Event handling for:
  - `checkout.session.completed`
  - `checkout.session.async_payment_succeeded`
  - `charge.refunded`
- Error logging and retry handling

### Fulfillment Pipeline

**`src/lib/stripe/fulfillment.ts`**

- `fulfillCheckoutSession()`: Complete order fulfillment
  - Transaction-based order creation
  - Entitlement granting
  - Purchase confirmation email
- `handleRefund()`: Refund processing
  - Order status update
  - Entitlement revocation
  - Refund notification email
- Email templates with HTML formatting

### Frontend Components

**`src/components/checkout-button.tsx`**

- `CheckoutButton`: Full-featured checkout button with loading states
- `CheckoutButtonMinimal`: Compact variant for inline usage
- Error handling and user feedback

**`src/trpc/react.tsx`**

- Client-side tRPC setup with React Query
- Query client configuration

**`src/trpc/server.ts`**

- Server-side tRPC caller for RSC

## Environment Variables

Required environment variables:

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_...           # Stripe secret API key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Stripe publishable key
STRIPE_WEBHOOK_SECRET=whsec_...         # Webhook signing secret

# App URL
NEXT_PUBLIC_URL=http://localhost:3000   # Base URL for redirects
```

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed in package.json:

- `stripe@^17.5.0`
- `@trpc/server@^11.0.0-rc.632`
- `@tanstack/react-query@^5.62.11`

### 2. Configure Stripe Dashboard

1. **Create Products and Prices**:
   - Go to Products in Stripe Dashboard
   - Create product with pricing
   - Copy price ID (starts with `price_`)

2. **Update Database**:

   ```sql
   UPDATE prices SET stripe_price_id = 'price_xxxxx' WHERE id = 'your_price_id';
   ```

3. **Configure Webhook Endpoint**:
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `checkout.session.async_payment_succeeded`
     - `charge.refunded`
   - Copy webhook signing secret

4. **Set Environment Variables**:
   ```bash
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

### 3. Local Development with Stripe CLI

Install Stripe CLI:

```bash
brew install stripe/stripe-cli/stripe
```

Login to Stripe:

```bash
stripe login
```

Forward webhooks to local:

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

This will output a webhook signing secret for local development.

Trigger test events:

```bash
stripe trigger checkout.session.completed
stripe trigger charge.refunded
```

### 4. Database Migration

Ensure Prisma schema is synchronized:

```bash
pnpm db:push
# or
pnpm db:migrate:dev
```

## Usage Examples

### Basic Product Purchase Button

```tsx
import { CheckoutButton } from '@/components/checkout-button';

export function ProductPage({ product, price }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>

      <CheckoutButton
        productId={product.id}
        priceId={price.id}
        productName={product.name}
        price={price.amount}
        currency={price.currency}
      />
    </div>
  );
}
```

### Minimal Inline Button

```tsx
import { CheckoutButtonMinimal } from '@/components/checkout-button';

export function ProductCard({ product, price }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <CheckoutButtonMinimal productId={product.id} priceId={price.id} label="Buy Now" />
    </div>
  );
}
```

### Server-Side Session Retrieval

```tsx
import { api } from '@/trpc/server';

export async function SuccessPage({ searchParams }) {
  const session = await api.checkout.getSession({
    sessionId: searchParams.session_id,
  });

  return (
    <div>
      <h1>Purchase Successful!</h1>
      <p>Amount: ${session.amountTotal / 100}</p>
    </div>
  );
}
```

## Security Considerations

### Webhook Signature Verification

All webhooks are verified using Stripe's signature verification:

```typescript
event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
```

Invalid signatures return `400 Bad Request`.

### Idempotency

Duplicate webhook events are prevented using the `StripeEvent` table:

1. Check if event ID exists
2. If processed, return `200 OK` without reprocessing
3. If not processed, create event record and process
4. Mark as processed on success

This ensures orders are never duplicated, even if Stripe retries the webhook.

### Product Validation

Server-side validation prevents:

- Invalid product/price combinations
- Inactive products or prices
- Purchases of already-owned products
- Missing Stripe price IDs

### Transaction Safety

All database operations use Prisma transactions:

```typescript
await db.$transaction(async (tx) => {
  // Create order
  // Create order items
  // Grant entitlement
});
```

If any step fails, all changes are rolled back.

## Error Handling

### Checkout Errors

Common errors:

- `BAD_REQUEST`: Invalid product/price, already purchased
- `NOT_FOUND`: Product or price not found
- `UNAUTHORIZED`: User not authenticated
- `INTERNAL_SERVER_ERROR`: Stripe API failure

All errors are caught and returned to the client with descriptive messages.

### Webhook Errors

Webhook processing errors:

1. Log error to console
2. Update `StripeEvent.processingError`
3. Return `500` to trigger Stripe retry

Stripe will retry failed webhooks with exponential backoff.

### Email Failures

Email failures don't fail fulfillment:

- Logged to `EmailLog` table
- Console error logged
- Order fulfillment continues

## Testing

### Test Mode

Use Stripe test keys (prefix `sk_test_` and `pk_test_`) for development.

### Test Cards

Common test cards:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Authentication: `4000 0025 0000 3155`

### Testing Checklist

- [ ] Create checkout session with valid product/price
- [ ] Complete payment with test card
- [ ] Verify order created in database
- [ ] Verify entitlement granted
- [ ] Verify confirmation email sent
- [ ] Test duplicate webhook (verify no duplicate order)
- [ ] Process refund in Stripe Dashboard
- [ ] Verify entitlement revoked
- [ ] Verify refund email sent
- [ ] Test invalid product/price rejection
- [ ] Test already-purchased product rejection
- [ ] Test webhook signature verification
- [ ] Test checkout cancellation flow

### Local Testing with Stripe CLI

```bash
# Listen for webhooks
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe

# Trigger test payment
stripe trigger checkout.session.completed

# Trigger test refund
stripe trigger charge.refunded
```

## Monitoring and Observability

### Key Metrics to Monitor

1. **Checkout Session Creation**:
   - Success rate
   - Failure reasons
   - Average creation time

2. **Webhook Processing**:
   - Processing time (should be < 500ms)
   - Success rate
   - Retry counts

3. **Order Fulfillment**:
   - Success rate
   - Failed fulfillments
   - Email delivery rate

4. **Refunds**:
   - Refund volume
   - Entitlement revocation success

### Database Queries for Monitoring

```sql
-- Failed webhook events
SELECT * FROM "StripeEvent"
WHERE processed = false
OR "processingError" IS NOT NULL;

-- Recent orders
SELECT * FROM "Order"
ORDER BY "createdAt" DESC
LIMIT 10;

-- Failed emails
SELECT * FROM "EmailLog"
WHERE status = 'failed'
ORDER BY "createdAt" DESC;

-- Active entitlements
SELECT COUNT(*) FROM "Entitlement" WHERE active = true;
```

## Troubleshooting

### Checkout Session Creation Fails

1. Check product/price exist in database
2. Verify price has `stripePriceId` set
3. Verify product status is `published`
4. Check Stripe API keys are correct
5. Review server logs for errors

### Webhook Not Received

1. Verify webhook endpoint is configured in Stripe
2. Check webhook signing secret is correct
3. Ensure endpoint is publicly accessible
4. Review Stripe Dashboard > Webhooks > Events for failures
5. Check server logs for signature verification errors

### Order Not Fulfilled

1. Check `StripeEvent` table for processing errors
2. Verify webhook was received (`StripeEvent.processed = true`)
3. Review server logs for fulfillment errors
4. Check database transaction failures
5. Verify product/price IDs in session metadata

### Duplicate Orders Created

This should never happen due to idempotency checks. If it does:

1. Check `StripeEvent` table for duplicate event IDs
2. Verify idempotency logic is working
3. Check for race conditions in webhook processing

### Email Not Sent

1. Check `EmailLog` table for error details
2. Verify Resend API key is correct
3. Check email address validity
4. Review rate limits on Resend account

## Future Enhancements

### Planned Features

1. **Subscription Support**:
   - Recurring billing
   - Subscription lifecycle management
   - Proration handling

2. **Background Jobs** (Story 0.13):
   - Inngest integration
   - Async email sending
   - Retry logic for failed operations

3. **Advanced Features**:
   - Coupon codes
   - Bundle pricing
   - Volume discounts
   - Trial periods

4. **Admin Dashboard**:
   - Order management
   - Refund processing
   - Revenue analytics
   - Customer support tools

## References

- [Stripe API Documentation](https://stripe.com/docs/api)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [tRPC Documentation](https://trpc.io/)

## Support

For issues or questions:

1. Check this documentation
2. Review Stripe Dashboard events
3. Check application logs
4. Review database state
5. Test with Stripe CLI locally
