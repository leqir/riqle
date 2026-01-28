# Go Live Checklist - Stripe Payment System

## Step 1: Complete Stripe Account Activation

Before accepting real payments, you MUST complete these steps in your Stripe Dashboard:

1. **Log into Stripe Dashboard (Live Mode)**
   - Go to: https://dashboard.stripe.com
   - Switch to "Live Mode" (toggle in top-right)

2. **Complete Business Profile**
   - Go to: Settings → Business settings → Public details
   - Add:
     - Business name: "Riqle" (or your legal entity name)
     - Support email: nathanael.thie@gmail.com
     - Business description
     - Website: https://riqle.com

3. **Add Tax Information**
   - Go to: Settings → Business settings → Tax settings
   - Complete your tax information (ABN/ACN if in Australia)

4. **Add Bank Account for Payouts**
   - Go to: Settings → Bank accounts and scheduling
   - Click "Add bank account"
   - Enter your Australian bank account details:
     - BSB
     - Account number
     - Account holder name
   - Verify the account (Stripe will send micro-deposits)

5. **Set Payout Schedule**
   - Go to: Settings → Bank accounts and scheduling
   - Choose payout frequency:
     - Daily (recommended for steady cash flow)
     - Weekly
     - Monthly
     - Manual (you trigger payouts yourself)

## Step 2: Get Your Live API Keys

Your live keys are already in your Stripe CLI:
- **Live Public Key**: `pk_live_51QxGqUAJjRifr9QA...`
- **Live Secret Key**: Get from Stripe Dashboard → Developers → API keys

## Step 3: Set Up Production Webhooks

Once your site is deployed to Vercel:

1. **Get Your Production URL**
   - Example: `https://riqle.com` or `https://riqle.vercel.app`

2. **Create Webhook Endpoint in Stripe**
   - Go to: https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - Set endpoint URL: `https://riqle.com/api/webhooks/stripe`
   - Select events to listen to:
     - `checkout.session.completed`
     - `charge.refunded`
     - `payment_intent.payment_failed`
   - Copy the **Webhook Signing Secret** (starts with `whsec_`)

## Step 4: Update Environment Variables

Update your `.env` file (or Vercel environment variables):

```bash
# Replace test keys with live keys
STRIPE_SECRET_KEY=sk_live_... # Get from Stripe Dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51QxGqUAJjRifr9QA4Sv3PBcoPXja52kdL6SzcKLwwI0nXLIXBJDODDMS2D7zka22LbjPXGjkzpcgnXRHMFptijb800fAxobKmY
STRIPE_WEBHOOK_SECRET=whsec_... # Get from webhook endpoint you created

# Production URL
NEXT_PUBLIC_URL=https://riqle.com
```

## Step 5: Deploy to Vercel

1. **Connect to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **Set Environment Variables in Vercel**
   - Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all the live environment variables (STRIPE_SECRET_KEY, etc.)
   - Make sure to set them for "Production" environment

3. **Deploy**
   - Vercel will auto-deploy when you push to main
   - Or manually trigger: `vercel --prod`

## Step 6: Test Production Payment

1. **Make a Real Purchase**
   - Use a REAL credit card (it will charge real money!)
   - Go through the entire flow
   - Verify:
     - Payment succeeds
     - Webhook is received (check Stripe Dashboard → Webhooks → Endpoint)
     - Order is created in database
     - Email is sent
     - Entitlement is granted

2. **Test Refund**
   - Issue a refund from Stripe Dashboard
   - Verify entitlement is revoked
   - Verify refund email is sent

## Important Notes

⚠️ **Before Going Live:**
- Test EVERYTHING in test mode first
- Have at least one successful end-to-end test purchase in test mode
- Review Stripe's fees: 2.9% + $0.30 per transaction (US) or check AU rates
- Understand payout timing: typically 2-7 days after purchase

⚠️ **After Going Live:**
- Monitor the first few transactions closely
- Check Stripe Dashboard regularly for any issues
- Keep webhook endpoint URLs consistent (don't change without updating Stripe)
- Never commit live API keys to git (use environment variables only)

## Current Status

- [x] Stripe account created
- [ ] Business profile completed
- [ ] Tax information added
- [ ] Bank account added and verified
- [ ] Live API keys obtained
- [ ] Production webhook configured
- [ ] Environment variables updated on Vercel
- [ ] Deployed to production
- [ ] Test purchase completed
- [ ] Test refund completed

## Need Help?

- Stripe Support: https://support.stripe.com
- Stripe Docs: https://stripe.com/docs
- Test Cards: https://stripe.com/docs/testing
