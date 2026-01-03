# Stripe Integration Quick Reference

Quick reference for the Stripe payment integration in Stories 0.11-0.12.

## Files Created

```
src/
├── lib/
│   ├── stripe.ts                          # Stripe client config
│   └── stripe/
│       └── fulfillment.ts                 # Order fulfillment pipeline
├── server/
│   └── api/
│       └── routers/
│           └── checkout.ts                # Checkout session creation
├── app/
│   └── api/
│       ├── trpc/[trpc]/route.ts          # tRPC API handler
│       └── webhooks/
│           └── stripe/
│               └── route.ts               # Webhook handler
├── trpc/
│   ├── react.tsx                          # Client-side tRPC
│   └── server.ts                          # Server-side tRPC
└── components/
    └── checkout-button.tsx                # Checkout UI components

docs/
├── stripe-integration.md                  # Full documentation
└── testing/
    └── stripe-testing-guide.md           # Testing guide
```

## Environment Variables

```bash
# Required
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_URL=http://localhost:3000

# Already configured
DATABASE_URL=...
RESEND_API_KEY=...
```

## Key Functions

### Create Checkout Session

```typescript
import { api } from '@/trpc/react';

const createSession = api.checkout.createSession.useMutation();

createSession.mutate({
  productId: 'clu_xxx',
  priceId: 'clu_yyy',
});
```

### Use Checkout Button

```tsx
import { CheckoutButton } from '@/components/checkout-button';

<CheckoutButton
  productId={product.id}
  priceId={price.id}
  productName={product.name}
  price={price.amount}
  currency={price.currency}
/>;
```

## Webhook Events Handled

- `checkout.session.completed` → Fulfill order
- `checkout.session.async_payment_succeeded` → Fulfill order
- `charge.refunded` → Revoke entitlements

## Database Tables Used

- **Product** - Product catalog
- **Price** - Pricing with Stripe IDs
- **Order** - Order records
- **OrderItem** - Line items
- **Entitlement** - User access
- **StripeEvent** - Webhook idempotency
- **EmailLog** - Email tracking
- **AuditLog** - Refund auditing

## Local Development

```bash
# 1. Login to Stripe CLI
stripe login

# 2. Forward webhooks to local
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe

# 3. Copy webhook secret to .env.local
STRIPE_WEBHOOK_SECRET=whsec_...

# 4. Start dev server
pnpm dev

# 5. Trigger test events
stripe trigger checkout.session.completed
stripe trigger charge.refunded
```

## Test Cards

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

## Common Commands

```bash
# View webhook events
stripe events list

# Resend webhook
stripe events resend evt_xxx

# View logs
stripe logs tail

# Test webhook
stripe trigger checkout.session.completed
```

## Database Queries

```sql
-- Check recent orders
SELECT * FROM "Order" ORDER BY "createdAt" DESC LIMIT 5;

-- Check active entitlements
SELECT * FROM "Entitlement" WHERE active = true;

-- Check webhook processing
SELECT * FROM "StripeEvent" ORDER BY "createdAt" DESC LIMIT 10;

-- Check email logs
SELECT * FROM "EmailLog" ORDER BY "createdAt" DESC LIMIT 5;

-- Check failed webhooks
SELECT * FROM "StripeEvent" WHERE "processingError" IS NOT NULL;
```

## Troubleshooting

### Checkout fails

- Check product.status = 'published'
- Check price.active = true
- Check price.stripePriceId is set
- Check STRIPE_SECRET_KEY is valid

### Webhook not received

- Check stripe listen is running
- Check STRIPE_WEBHOOK_SECRET is correct
- Check webhook endpoint is accessible

### Order not created

- Check StripeEvent table for errors
- Check server logs for fulfillment errors
- Verify metadata in session

### Email not sent

- Check EmailLog table for errors
- Check RESEND_API_KEY is valid
- Check email address format

## Security Checklist

- ✅ Webhook signature verification
- ✅ Idempotency via StripeEvent table
- ✅ Server-side product validation
- ✅ Transaction-based fulfillment
- ✅ No client-side access grants
- ✅ Stripe customer ID mapping
- ✅ Audit logging for refunds

## API Endpoints

### tRPC Procedures

```typescript
// Create checkout session
api.checkout.createSession.mutate({ productId, priceId });

// Get session details
api.checkout.getSession.query({ sessionId });
```

### Webhook Endpoint

```
POST /api/webhooks/stripe
Headers:
  - stripe-signature: <signature>
Body: Raw Stripe event JSON
```

## Integration Flow

```
User → CheckoutButton
  → api.checkout.createSession
    → Validates product/price
    → Creates Stripe customer (if needed)
    → Creates checkout session
      → Redirects to Stripe
        → User pays
          → Stripe webhook
            → Verifies signature
            → Checks idempotency
            → Fulfills order (transaction)
              → Creates Order + OrderItem
              → Grants Entitlement
              → Sends email
```

## Error Codes

- `UNAUTHORIZED` - Not authenticated
- `BAD_REQUEST` - Invalid input or already purchased
- `NOT_FOUND` - Product/price not found
- `FORBIDDEN` - Admin access required
- `INTERNAL_SERVER_ERROR` - Stripe API or database error

## Next Steps

1. Set up Stripe products in Dashboard
2. Copy price IDs to database
3. Test locally with Stripe CLI
4. Configure production webhook
5. Switch to live keys for production

## Support Resources

- Full docs: `docs/stripe-integration.md`
- Testing guide: `docs/testing/stripe-testing-guide.md`
- Stripe Dashboard: https://dashboard.stripe.com
- Stripe Docs: https://stripe.com/docs

## Story Completion

Stories 0.11-0.12 implement:

- ✅ Stripe client configuration
- ✅ Checkout session endpoint with validation
- ✅ Webhook endpoint with signature verification
- ✅ Idempotent webhook processing
- ✅ Fulfillment pipeline with transactions
- ✅ Refund handling
- ✅ Email notifications
- ✅ Comprehensive error logging
- ✅ Frontend checkout components
- ✅ Complete documentation
