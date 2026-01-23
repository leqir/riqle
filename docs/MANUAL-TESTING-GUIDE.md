# Manual Testing Guide: Complete Payment Flow

**Date Created:** 2026-01-21
**Purpose:** Step-by-step guide to manually test the complete payment and commerce flow before production deployment

---

## Prerequisites

### 1. Environment Setup

Ensure your `.env` file has these configured:

```bash
# Database (required)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Stripe TEST keys (required)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # Get this from Stripe CLI

# Email (required for confirmations)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@riqle.com

# NextAuth (required)
NEXTAUTH_SECRET=... (min 32 characters)
NEXTAUTH_URL=http://localhost:3000

# App (required)
NEXT_PUBLIC_URL=http://localhost:3000
```

### 2. Install Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# This will open browser to authenticate
```

### 3. Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Seed test data (creates admin user + test product)
npx prisma db seed

# Verify data
npx prisma studio
```

### 4. Start Development Server

```bash
npm run dev
# Server running at http://localhost:3000
```

### 5. Start Stripe Webhook Listener (CRITICAL!)

In a **separate terminal window**:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# You'll see output like:
# > Ready! Your webhook signing secret is whsec_...
#
# Copy the whsec_... secret to your .env file as STRIPE_WEBHOOK_SECRET
```

**IMPORTANT:** Keep this terminal running during all tests. This forwards Stripe events to your local server.

---

## Test Suite

### ✅ TEST 1: User Registration & Login

**Objective:** Verify authentication system works

**Steps:**

1. Open browser to `http://localhost:3000`
2. Click "Sign In" or "Get Started"
3. If using Google OAuth:
   - Click "Sign in with Google"
   - Complete Google auth flow
   - Verify redirect back to homepage
4. Verify header shows your user name/avatar
5. Click user avatar → "My Account"
6. Verify account page loads with your email

**Expected Result:**

- ✅ User can register/login successfully
- ✅ Session persists on page refresh
- ✅ User profile displayed correctly

**Troubleshooting:**

- If Google OAuth fails, check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
- Check NextAuth callback URLs in Google Cloud Console

---

### ✅ TEST 2: Browse Products/Resources

**Objective:** Verify product listing and details

**Steps:**

1. Navigate to `/resources`
2. Verify you see the test product: "1984 Common Module Exemplar Essay"
3. Click on the product
4. Verify product detail page shows:
   - Title
   - Description
   - Price ($59.00 AUD)
   - "Purchase" or "Buy Now" button

**Expected Result:**

- ✅ Products display correctly
- ✅ Product detail page accessible
- ✅ Price formatted properly

**Database Check:**

```bash
npx prisma studio
# Navigate to Product table
# Verify: published = true, price = 5900 (in cents)
```

---

### ✅ TEST 3: Initiate Checkout

**Objective:** Verify Stripe Checkout session creation

**Steps:**

1. From product detail page, click "Purchase" button
2. Verify redirect to Stripe Checkout page (checkout.stripe.com)
3. Verify checkout shows:
   - Product name
   - Price in AUD
   - Email field pre-filled (if logged in)
   - Test mode banner

**Expected Result:**

- ✅ Redirects to Stripe Checkout
- ✅ Product details correct
- ✅ Test mode banner visible

**Troubleshooting:**

- Check browser console for errors
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` starts with `pk_test_`
- Check server logs for API errors

---

### ✅ TEST 4: Complete Payment

**Objective:** Test successful payment with test card

**Steps:**

1. On Stripe Checkout page, enter:
   - **Email:** your-email@example.com
   - **Card Number:** `4242 4242 4242 4242`
   - **Expiry:** Any future date (e.g., 12/34)
   - **CVC:** Any 3 digits (e.g., 123)
   - **Postal Code:** Any code (e.g., 2000)

2. Click "Pay"
3. Wait for processing (5-10 seconds)
4. Verify redirect to success page

**Expected Result:**

- ✅ Payment processes successfully
- ✅ Redirects to `/checkout/success` or similar
- ✅ Success message displayed

**Watch Stripe CLI Terminal:**
You should see webhook events coming through:

```
checkout.session.completed [evt_xxx] (200)
payment_intent.succeeded [evt_xxx] (200)
```

**Database Check:**

```sql
-- In Prisma Studio or psql:
SELECT * FROM "Order" ORDER BY "createdAt" DESC LIMIT 1;
-- Verify: status = 'completed', total = 5900

SELECT * FROM "Entitlement" ORDER BY "createdAt" DESC LIMIT 1;
-- Verify: active = true, userId matches your account
```

**Troubleshooting:**

- If webhook doesn't fire: Check Stripe CLI is running and forwarding
- If payment fails: Check `STRIPE_SECRET_KEY` in `.env`
- Check server logs: `npm run dev` terminal for errors

---

### ✅ TEST 5: Webhook Processing & Order Fulfillment

**Objective:** Verify webhooks create orders and grant entitlements

**Steps:**

1. After payment completes, check Stripe CLI terminal
2. Verify you see:

   ```
   2026-01-21 10:30:45   --> checkout.session.completed [evt_...]
   2026-01-21 10:30:45   <-- [200] POST http://localhost:3000/api/webhooks/stripe [evt_...]
   ```

3. Check your email inbox for purchase confirmation

4. Check database in Prisma Studio:
   - **Order table:** 1 new order with status='completed'
   - **OrderItem table:** 1 item linked to your order
   - **Entitlement table:** 1 entitlement with active=true
   - **StripeEvent table:** Event recorded with processed=true

**Expected Result:**

- ✅ Order created with correct details
- ✅ Entitlement granted to user
- ✅ Confirmation email sent
- ✅ StripeEvent recorded for idempotency

**Detailed Database Checks:**

```sql
-- Order Details
SELECT o.id, o.status, o.total, o."stripeSessionId",
       u.email as customer_email
FROM "Order" o
JOIN "User" u ON o."userId" = u.id
ORDER BY o."createdAt" DESC LIMIT 1;

-- Order Items
SELECT oi.quantity, oi.price, p.title
FROM "OrderItem" oi
JOIN "Product" p ON oi."productId" = p.id
WHERE oi."orderId" = 'YOUR_ORDER_ID';

-- Entitlement
SELECT e.id, e.active, e."createdAt",
       u.email as user_email, p.title as product_title
FROM "Entitlement" e
JOIN "User" u ON e."userId" = u.id
JOIN "Product" p ON e."productId" = p.id
WHERE e."orderId" = 'YOUR_ORDER_ID';

-- Stripe Events
SELECT "eventId", "eventType", processed, "createdAt"
FROM "StripeEvent"
ORDER BY "createdAt" DESC LIMIT 3;
```

---

### ✅ TEST 6: Access Purchased Content

**Objective:** Verify customers can download purchased products

**Steps:**

1. Navigate to `/account` or `/account/purchases`
2. Verify you see:
   - Purchase history with your order
   - Product title
   - Purchase date
   - "Download" button or access link

3. Click "Download" button
4. Verify file downloads successfully

**Expected Result:**

- ✅ Purchased products visible in account
- ✅ Download button accessible
- ✅ File downloads correctly

**API Check:**

```bash
# Test the download API directly (replace IDs)
curl -X GET http://localhost:3000/api/products/YOUR_PRODUCT_ID/download \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"

# Should return 200 with download URL
# Or redirect to file
```

---

### ✅ TEST 7: Unauthorized Access Prevention

**Objective:** Verify non-purchasers cannot access paid content

**Steps:**

1. **Test Unauthenticated Access:**
   - Open private/incognito browser window
   - Try to access `/api/products/YOUR_PRODUCT_ID/download` directly
   - Expected: 401 Unauthorized

2. **Test Unauthorized User:**
   - Create a second test account (different email)
   - Login with new account
   - Try to download the product
   - Expected: 403 Forbidden (no entitlement)

3. **Verify in database:**
   ```sql
   -- Check user has NO entitlement
   SELECT * FROM "Entitlement"
   WHERE "userId" = 'NEW_USER_ID'
   AND "productId" = 'PRODUCT_ID';
   -- Should return 0 rows
   ```

**Expected Result:**

- ✅ Unauthenticated users blocked (401)
- ✅ Authenticated users without entitlement blocked (403)
- ✅ Only purchasers can download

---

### ✅ TEST 8: Webhook Idempotency (Replay Protection)

**Objective:** Verify duplicate webhooks don't create duplicate orders

**Steps:**

1. After Test 4 completes, get the Stripe event ID:

   ```sql
   SELECT "eventId" FROM "StripeEvent"
   WHERE "eventType" = 'checkout.session.completed'
   ORDER BY "createdAt" DESC LIMIT 1;
   ```

2. Replay the webhook using Stripe CLI:

   ```bash
   stripe events resend evt_YOUR_EVENT_ID
   ```

3. Watch Stripe CLI terminal - should see 200 response

4. Check database:

   ```sql
   -- Count orders for your session
   SELECT COUNT(*) FROM "Order"
   WHERE "stripeSessionId" = 'cs_test_...';
   -- Should still be 1, not 2

   -- Count entitlements
   SELECT COUNT(*) FROM "Entitlement"
   WHERE "userId" = 'YOUR_USER_ID'
   AND "productId" = 'PRODUCT_ID'
   AND active = true;
   -- Should be 1, not 2

   -- Check StripeEvent table
   SELECT COUNT(*) FROM "StripeEvent"
   WHERE "eventId" = 'evt_YOUR_EVENT_ID';
   -- Should be 1 (same event recorded once)
   ```

**Expected Result:**

- ✅ Replay webhook returns 200 (acknowledged)
- ✅ NO duplicate Order created
- ✅ NO duplicate Entitlement created
- ✅ Idempotency working correctly

---

### ✅ TEST 9: Refund Flow

**Objective:** Verify refunds revoke access

**Steps:**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/payments)
2. Find your test payment
3. Click "⋯" menu → "Refund payment"
4. Refund full amount
5. Confirm refund

6. Wait 5-10 seconds, then check Stripe CLI terminal:

   ```
   charge.refunded [evt_...] (200)
   ```

7. Check database:

   ```sql
   -- Order status
   SELECT status, "refundedAt" FROM "Order"
   WHERE id = 'YOUR_ORDER_ID';
   -- Expected: status = 'refunded', refundedAt = timestamp

   -- Entitlement revoked
   SELECT active, "revokedAt", "revokeReason"
   FROM "Entitlement"
   WHERE "orderId" = 'YOUR_ORDER_ID';
   -- Expected: active = false, revokedAt = timestamp, revokeReason = 'Order refunded'

   -- Audit log
   SELECT * FROM "AuditLog"
   WHERE "entityType" = 'order'
   AND "entityId" = 'YOUR_ORDER_ID'
   ORDER BY "createdAt" DESC LIMIT 1;
   -- Should have refund audit entry
   ```

8. Try to download product again from `/account`
   - Expected: Download button disabled or removed
   - Expected: Access denied if trying direct API call

9. Check email for refund confirmation

**Expected Result:**

- ✅ Order status updated to 'refunded'
- ✅ Entitlement revoked (active=false)
- ✅ Customer can no longer access product
- ✅ Audit trail created
- ✅ Refund email sent

---

### ✅ TEST 10: Failed Payment Handling

**Objective:** Verify failed payments don't grant access

**Steps:**

1. Start a new checkout session for the product
2. On Stripe Checkout, use **declined card:**
   - Card: `4000 0000 0000 0002`
   - Expiry: Any future date
   - CVC: Any 3 digits

3. Click "Pay"
4. Verify Stripe shows payment declined error
5. Check database:

   ```sql
   -- Should be NO new order
   SELECT COUNT(*) FROM "Order"
   WHERE "userId" = 'YOUR_USER_ID'
   AND status = 'completed';
   -- Count should be same as before (1)

   -- No new entitlement
   SELECT COUNT(*) FROM "Entitlement"
   WHERE "userId" = 'YOUR_USER_ID'
   AND active = true;
   -- Count should be 0 (revoked in Test 9) or 1 (if new purchase)
   ```

**Expected Result:**

- ✅ Payment fails gracefully
- ✅ No order created
- ✅ No entitlement granted
- ✅ User can retry payment

---

### ✅ TEST 11: Multiple Products Purchase

**Objective:** Verify system handles multiple products

**Steps:**

1. If you have multiple products, purchase a second product
2. Verify:
   - Each product has separate Order
   - Each product has separate Entitlement
   - Each product downloadable independently

**Expected Result:**

- ✅ Multiple orders tracked separately
- ✅ Multiple entitlements managed correctly
- ✅ No cross-product access issues

---

### ✅ TEST 12: Email Notifications

**Objective:** Verify all emails sent correctly

**Check these emails:**

1. **Purchase Confirmation Email:**
   - Sent after successful payment
   - Contains: Order number, product title, download link
   - Sender: noreply@riqle.com
   - Subject: "Your purchase confirmation"

2. **Refund Confirmation Email:**
   - Sent after refund processed
   - Contains: Order number, refund amount
   - Explains access revocation

**If emails not arriving:**

- Check Resend Dashboard: https://resend.com/emails
- Check EmailLog table in database
- Verify `RESEND_API_KEY` and `EMAIL_FROM` in `.env`

---

## Test Results Checklist

After completing all tests, verify:

- [ ] ✅ User can register and login
- [ ] ✅ Products display correctly
- [ ] ✅ Checkout session creates successfully
- [ ] ✅ Payment processes with test card
- [ ] ✅ Webhook received and processed (200 response)
- [ ] ✅ Order created in database (status='completed')
- [ ] ✅ Entitlement granted (active=true)
- [ ] ✅ Purchase confirmation email sent
- [ ] ✅ Customer can download purchased product
- [ ] ✅ Unauthenticated users blocked from downloads
- [ ] ✅ Users without entitlement blocked from downloads
- [ ] ✅ Webhook replay doesn't create duplicates
- [ ] ✅ Refund revokes entitlement (active=false)
- [ ] ✅ Refunded customer cannot access product
- [ ] ✅ Refund email sent
- [ ] ✅ Failed payments don't create orders
- [ ] ✅ Audit logs track all events

---

## Common Issues & Troubleshooting

### Issue: Webhooks not received

**Symptoms:** Payment succeeds but no order created

**Solutions:**

1. Check Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
2. Verify `STRIPE_WEBHOOK_SECRET` in `.env` matches Stripe CLI output
3. Check server logs for webhook errors
4. Verify webhook endpoint responds: `curl -X POST http://localhost:3000/api/webhooks/stripe`

---

### Issue: Payment succeeds but entitlement not granted

**Symptoms:** Order created but Entitlement table empty

**Solutions:**

1. Check server logs for fulfillment errors
2. Verify Product table has `downloadUrls` array populated
3. Check StripeEvent table - is event marked as processed?
4. Look for transaction errors in logs

---

### Issue: Download fails with 403

**Symptoms:** Purchased product shows 403 Forbidden

**Solutions:**

1. Verify Entitlement exists and active=true:
   ```sql
   SELECT * FROM "Entitlement"
   WHERE "userId" = 'YOUR_USER_ID'
   AND "productId" = 'PRODUCT_ID';
   ```
2. Check session is authenticated (userId in session)
3. Verify Product.id matches entitlement productId
4. Check download API logs

---

### Issue: Emails not sending

**Symptoms:** No confirmation emails received

**Solutions:**

1. Check Resend API key is valid
2. Verify `EMAIL_FROM` domain is configured in Resend
3. Check EmailLog table for send status
4. Look at Resend dashboard for delivery status
5. Check spam folder

---

### Issue: Duplicate orders created

**Symptoms:** Same checkout creates multiple orders

**Solutions:**

1. Check idempotency logic in fulfillment.ts
2. Verify Order.stripeSessionId unique constraint exists
3. Check StripeEvent table for duplicate processing
4. Review webhook-processor.ts idempotency checks

---

## Performance Benchmarks

Target metrics for local testing:

- **Checkout session creation:** < 500ms
- **Payment processing:** 2-5 seconds (Stripe)
- **Webhook processing:** < 1 second
- **Order fulfillment:** < 500ms
- **Email sending:** 1-3 seconds
- **Download API response:** < 200ms

---

## Next Steps After Testing

Once all tests pass:

1. ✅ Review this document and mark all tests complete
2. 🚀 Proceed with production deployment
3. 🔧 Set up production Stripe webhook endpoint
4. 📧 Configure production email domain
5. 🗄️ Set up production database
6. 🔐 Rotate all secrets for production
7. 📊 Set up monitoring and alerts

---

## Production Deployment Checklist

Before going live:

- [ ] Switch Stripe keys from `sk_test_` to `sk_live_`
- [ ] Configure Stripe webhook in Dashboard (not CLI)
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Set up production database with backups
- [ ] Configure production email domain
- [ ] Enable Sentry error tracking
- [ ] Set up uptime monitoring
- [ ] Run all tests again in production-like staging
- [ ] Perform a real money test transaction (and refund it)

---

**Document Version:** 1.0
**Last Updated:** 2026-01-21
**Tested On:** Local development environment
**Next Review:** After production deployment
