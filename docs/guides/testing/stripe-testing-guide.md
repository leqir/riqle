# Stripe Integration Testing Guide

This guide provides step-by-step instructions for testing the Stripe payment integration locally and in staging.

## Prerequisites

- [ ] Stripe account created
- [ ] Stripe CLI installed
- [ ] Test API keys configured
- [ ] Webhook secret configured
- [ ] Database migrated with Prisma

## Local Development Setup

### 1. Install Stripe CLI

**macOS:**

```bash
brew install stripe/stripe-cli/stripe
```

**Linux:**

```bash
wget https://github.com/stripe/stripe-cli/releases/latest/download/stripe_linux_amd64.tar.gz
tar -xvf stripe_linux_amd64.tar.gz
sudo mv stripe /usr/local/bin/
```

**Windows:**
Download from [Stripe CLI releases](https://github.com/stripe/stripe-cli/releases)

### 2. Login to Stripe CLI

```bash
stripe login
```

This will open your browser to authenticate.

### 3. Configure Environment Variables

Create `.env.local` with test keys:

```bash
# Stripe Test Keys
STRIPE_SECRET_KEY=sk_test_51xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx

# Webhook Secret (from stripe listen command)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App URL
NEXT_PUBLIC_URL=http://localhost:3000
```

### 4. Start Local Webhook Forwarding

In a separate terminal, run:

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

This will output a webhook signing secret like:

```
> Ready! Your webhook signing secret is whsec_xxxxx
```

Copy this and update your `.env.local` file.

### 5. Start Development Server

```bash
pnpm dev
```

## Test Scenarios

### Scenario 1: Successful Purchase Flow

**Objective:** Verify complete purchase flow from checkout to fulfillment

**Steps:**

1. **Setup Test Product**

   ```bash
   # Run Prisma Studio to create test data
   pnpm db:studio
   ```

   Create a test product:
   - Name: "Test Product"
   - Slug: "test-product"
   - Status: "published"
   - Description: "Test product for Stripe integration"

2. **Create Price in Stripe**

   Go to Stripe Dashboard > Products > Create Product
   - Name: "Test Product"
   - Price: $10.00
   - One-time payment
   - Copy the Price ID (starts with `price_`)

3. **Update Database**

   In Prisma Studio, update the Price record:
   - Set `stripePriceId` to the copied price ID
   - Set `active` to `true`

4. **Test Checkout**

   Navigate to product page and click "Purchase" button

5. **Complete Payment**

   Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any valid ZIP

6. **Verify Success**

   Check console logs for:

   ```
   Received webhook event: checkout.session.completed
   Fulfilling checkout session cs_test_xxxxx
   Successfully fulfilled order clu_xxxxx
   ```

7. **Verify Database**

   Check tables in Prisma Studio:
   - `Order`: New record with status "completed"
   - `OrderItem`: Line item created
   - `Entitlement`: Active entitlement granted
   - `StripeEvent`: Event marked as processed
   - `EmailLog`: Confirmation email sent

**Expected Results:**

- ✅ Checkout session created
- ✅ Payment completed successfully
- ✅ Order created with correct amount
- ✅ Entitlement granted to user
- ✅ Confirmation email sent
- ✅ Webhook processed once (no duplicates)

### Scenario 2: Duplicate Webhook Prevention

**Objective:** Verify idempotency prevents duplicate orders

**Steps:**

1. **Trigger Checkout Event**

   ```bash
   stripe trigger checkout.session.completed
   ```

2. **Note Event ID**

   Check logs for event ID (evt_xxxxx)

3. **Replay Same Event**

   ```bash
   stripe events resend evt_xxxxx
   ```

4. **Verify Idempotency**

   Check logs for:

   ```
   Event evt_xxxxx already processed at 2024-01-03...
   ```

5. **Verify Database**

   Confirm:
   - Only ONE order exists for that session
   - `StripeEvent` shows processed = true

**Expected Results:**

- ✅ First event creates order
- ✅ Replay returns 200 without processing
- ✅ No duplicate orders created

### Scenario 3: Refund Processing

**Objective:** Verify refund revokes entitlements

**Steps:**

1. **Complete a Purchase**

   Follow Scenario 1 to create an order

2. **Process Refund**

   Go to Stripe Dashboard > Payments
   - Find the payment
   - Click "Refund"
   - Refund full amount

3. **Verify Webhook Received**

   Check logs for:

   ```
   Processing charge.refunded for charge ch_xxxxx
   Successfully processed refund for order clu_xxxxx
   ```

4. **Verify Database**

   Check in Prisma Studio:
   - `Order`: status = "refunded", refundedAt set
   - `Entitlement`: active = false, revokedAt set, revokeReason = "refund"
   - `AuditLog`: Refund logged
   - `EmailLog`: Refund notification sent

**Expected Results:**

- ✅ Refund webhook processed
- ✅ Order status updated to "refunded"
- ✅ Entitlement revoked
- ✅ Refund email sent
- ✅ Audit log created

### Scenario 4: Invalid Product Validation

**Objective:** Verify server-side validation prevents invalid purchases

**Test Cases:**

**A. Non-existent Product**

```typescript
// Should fail with NOT_FOUND
api.checkout.createSession.mutate({
  productId: 'invalid_id',
  priceId: 'clu_validprice',
});
```

**B. Inactive Price**

```typescript
// Set price.active = false in database
// Should fail with BAD_REQUEST
```

**C. Unpublished Product**

```typescript
// Set product.status = 'draft'
// Should fail with BAD_REQUEST
```

**D. Already Purchased**

```typescript
// Purchase product once
// Try to purchase again
// Should fail with BAD_REQUEST: "You already have access"
```

**E. Mismatched Product/Price**

```typescript
// Use price from different product
// Should fail with BAD_REQUEST
```

**Expected Results:**

- ✅ All invalid requests rejected
- ✅ Clear error messages returned
- ✅ No checkout sessions created

### Scenario 5: Webhook Signature Verification

**Objective:** Verify invalid signatures are rejected

**Steps:**

1. **Send Request with Invalid Signature**

   ```bash
   curl -X POST http://localhost:3000/api/webhooks/stripe \
     -H "Content-Type: application/json" \
     -H "stripe-signature: invalid_signature" \
     -d '{"type":"checkout.session.completed"}'
   ```

2. **Verify Rejection**

   Check logs for:

   ```
   Webhook signature verification failed
   ```

   Response should be:

   ```json
   { "error": "Invalid signature" }
   ```

   Status: 400

**Expected Results:**

- ✅ Invalid signature rejected
- ✅ 400 status returned
- ✅ No event processing attempted

### Scenario 6: Async Payment Success

**Objective:** Verify delayed payment methods are handled

**Steps:**

1. **Trigger Async Payment Event**

   ```bash
   stripe trigger checkout.session.async_payment_succeeded
   ```

2. **Verify Fulfillment**

   Same checks as Scenario 1

**Expected Results:**

- ✅ Order fulfilled after async payment success

### Scenario 7: Payment Failure

**Objective:** Verify failed payments don't create orders

**Steps:**

1. **Use Declined Test Card**

   Card: `4000 0000 0000 0002`

2. **Complete Checkout**

   Payment should fail

3. **Verify No Fulfillment**

   Check:
   - No order created
   - No entitlement granted
   - Webhook may receive failed event (logged but not processed)

**Expected Results:**

- ✅ No order created on payment failure
- ✅ User can retry purchase

### Scenario 8: Email Delivery

**Objective:** Verify purchase confirmation emails

**Steps:**

1. **Complete Purchase**

   Follow Scenario 1

2. **Check Email Logs**

   ```sql
   SELECT * FROM "EmailLog"
   WHERE status = 'sent'
   ORDER BY "createdAt" DESC
   LIMIT 1;
   ```

3. **Verify Content**

   Email should contain:
   - Customer name
   - Product name
   - Order ID
   - Amount paid
   - Link to orders page

**Expected Results:**

- ✅ Email sent to customer
- ✅ Email logged in database
- ✅ Correct formatting and content

## Manual Testing Checklist

### Pre-Launch Checklist

- [ ] Test successful purchase flow end-to-end
- [ ] Verify webhook idempotency (no duplicate orders)
- [ ] Test refund processing and entitlement revocation
- [ ] Validate product/price combinations
- [ ] Test already-purchased product rejection
- [ ] Verify webhook signature validation
- [ ] Test email delivery (purchase + refund)
- [ ] Verify transaction rollback on errors
- [ ] Test with various test cards (success, decline, 3DS)
- [ ] Verify correct error messages shown to users
- [ ] Test checkout cancellation flow
- [ ] Verify Stripe customer creation/reuse
- [ ] Test with guest vs authenticated users
- [ ] Verify metadata passed to Stripe correctly
- [ ] Test success/cancel redirect URLs

### Production Checklist

- [ ] Switch to production API keys
- [ ] Update webhook endpoint in Stripe Dashboard
- [ ] Configure production webhook secret
- [ ] Test with real test cards before going live
- [ ] Set up monitoring for webhook failures
- [ ] Configure alerts for failed orders
- [ ] Review error handling in production logs
- [ ] Test failover scenarios
- [ ] Verify SSL/TLS on webhook endpoint
- [ ] Document support procedures

## Automated Testing

### Unit Tests (Future)

```typescript
// Example test structure
describe('Checkout Router', () => {
  it('should create checkout session for valid product', async () => {
    // Test implementation
  });

  it('should reject invalid product ID', async () => {
    // Test implementation
  });

  it('should prevent duplicate purchases', async () => {
    // Test implementation
  });
});

describe('Webhook Handler', () => {
  it('should verify signature', async () => {
    // Test implementation
  });

  it('should prevent duplicate processing', async () => {
    // Test implementation
  });

  it('should fulfill order on checkout complete', async () => {
    // Test implementation
  });
});

describe('Fulfillment Pipeline', () => {
  it('should create order and grant entitlement', async () => {
    // Test implementation
  });

  it('should rollback on failure', async () => {
    // Test implementation
  });

  it('should revoke entitlement on refund', async () => {
    // Test implementation
  });
});
```

## Troubleshooting Tests

### Webhook Not Received

```bash
# Check if stripe listen is running
ps aux | grep stripe

# Restart webhook forwarding
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

### Database Connection Issues

```bash
# Check DATABASE_URL is set
echo $DATABASE_URL

# Reset database if needed
pnpm db:migrate:reset
```

### Stripe API Errors

```bash
# Check logs for specific error
tail -f .next/server/*.log

# Verify API keys
stripe config --list
```

### Email Not Sending

```bash
# Check Resend API key
echo $RESEND_API_KEY

# Check email logs
pnpm db:studio
# Navigate to EmailLog table
```

## Performance Testing

### Webhook Processing Time

Monitor webhook processing time:

```typescript
// Add to webhook handler
const startTime = Date.now();
// ... processing
const duration = Date.now() - startTime;
console.log(`Webhook processed in ${duration}ms`);
```

Target: < 500ms for webhook processing

### Load Testing (Advanced)

```bash
# Install k6 for load testing
brew install k6

# Create load test script
cat > load-test.js << 'EOF'
import http from 'k6/http';

export default function() {
  http.post('http://localhost:3000/api/webhooks/stripe', {
    headers: { 'stripe-signature': 'test' }
  });
}
EOF

# Run load test
k6 run --vus 10 --duration 30s load-test.js
```

## Test Data Cleanup

After testing, clean up test data:

```sql
-- Delete test orders
DELETE FROM "OrderItem" WHERE "orderId" IN (
  SELECT id FROM "Order" WHERE "customerEmail" LIKE '%test%'
);
DELETE FROM "Entitlement" WHERE "orderId" IN (
  SELECT id FROM "Order" WHERE "customerEmail" LIKE '%test%'
);
DELETE FROM "Order" WHERE "customerEmail" LIKE '%test%';

-- Delete processed webhook events
DELETE FROM "StripeEvent" WHERE processed = true;

-- Delete email logs
DELETE FROM "EmailLog" WHERE "to" LIKE '%test%';
```

## Resources

- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe CLI Reference](https://stripe.com/docs/cli)
- [Webhook Testing](https://stripe.com/docs/webhooks/test)
- [Test Cards](https://stripe.com/docs/testing#cards)
