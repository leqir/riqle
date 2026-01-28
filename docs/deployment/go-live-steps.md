# Go Live with Stripe - Step by Step

## ✅ What You've Completed

- [x] ABN obtained: 58837251477
- [x] Stripe account activated
- [x] Bank account linked to Stripe
- [x] Live API keys available

## 🚀 Next Steps to Go Live

### Step 1: Get Your Live Secret Key from Stripe

1. Go to: https://dashboard.stripe.com/apikeys (make sure you're in LIVE mode)
2. Under "Secret key", click "Reveal live key"
3. Copy the key (starts with `sk_live_...`)
4. **Keep this safe** - you'll need it for Vercel

Your live publishable key (already visible):
```
pk_live_51QxGqUAJjRifr9QA4Sv3PBcoPXja52kdL6SzcKLwwI0nXLIXBJDODDMS2D7zka22LbjPXGjkzpcgnXRHMFptijb800fAxobKmY
```

---

### Step 2: Deploy to Vercel

**Option A: Deploy via GitHub (Recommended)**

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. Go to: https://vercel.com
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure settings

**Option B: Deploy via CLI**

```bash
vercel login
vercel --prod
```

---

### Step 3: Add Environment Variables to Vercel

Go to your Vercel project → Settings → Environment Variables

Add these for **Production** environment:

```bash
# Stripe Live Keys
STRIPE_SECRET_KEY=sk_live_... (your live secret key from Step 1)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51QxGqUAJjRifr9QA4Sv3PBcoPXja52kdL6SzcKLwwI0nXLIXBJDODDMS2D7zka22LbjPXGjkzpcgnXRHMFptijb800fAxobKmY

# Production URL
NEXT_PUBLIC_URL=https://riqle.com (or your Vercel URL: https://riqle.vercel.app)

# All other env vars from your .env file
DATABASE_URL=... (copy from .env)
DIRECT_URL=... (copy from .env)
NEXTAUTH_SECRET=... (copy from .env)
AUTH_SECRET=... (copy from .env)
RESEND_API_KEY=... (copy from .env)
EMAIL_FROM=... (copy from .env)
BLOB_READ_WRITE_TOKEN=... (copy from .env)
# etc. (all the other variables)
```

**IMPORTANT:**
- Set STRIPE_WEBHOOK_SECRET later (Step 4)
- Don't add it yet - we need to create the webhook first

---

### Step 4: Set Up Production Webhooks

Once your site is deployed to Vercel:

1. **Get your production URL**
   - Example: `https://riqle.vercel.app` or `https://riqle.com`

2. **Create webhook endpoint in Stripe**
   - Go to: https://dashboard.stripe.com/webhooks (LIVE mode)
   - Click "Add endpoint"
   - Endpoint URL: `https://riqle.vercel.app/api/webhooks/stripe`
   - Events to select:
     - ✅ `checkout.session.completed`
     - ✅ `charge.refunded`
     - ✅ `payment_intent.payment_failed`
   - Click "Add endpoint"

3. **Copy webhook signing secret**
   - After creating the endpoint, you'll see "Signing secret"
   - Click "Reveal" and copy it (starts with `whsec_...`)

4. **Add to Vercel**
   - Go back to Vercel → Settings → Environment Variables
   - Add:
     ```
     STRIPE_WEBHOOK_SECRET=whsec_... (the signing secret you just copied)
     ```
   - Set for **Production** environment
   - Redeploy your app (Vercel will do this automatically when you add env vars)

---

### Step 5: Test Your Production Setup

1. **Make a test purchase with a REAL credit card**
   - Go to your live site
   - Purchase a resource
   - Use a real card (you'll be charged real money!)
   - Recommended: Buy the cheapest item first

2. **Verify everything works**
   - [ ] Payment succeeds in Stripe
   - [ ] Webhook is received (check Stripe Dashboard → Webhooks → your endpoint)
   - [ ] Order created in database
   - [ ] Email sent to customer
   - [ ] Entitlement granted
   - [ ] Access page works

3. **Check Stripe Dashboard**
   - Go to: https://dashboard.stripe.com/payments
   - You should see your test payment
   - Check that webhook shows "succeeded"

---

### Step 6: Test Refund Flow

1. **Issue a refund from Stripe**
   - Dashboard → Payments → Select the payment
   - Click "Refund"
   - Refund the full amount

2. **Verify**
   - [ ] Webhook received
   - [ ] Entitlement revoked in database
   - [ ] Customer can no longer access product
   - [ ] Refund email sent (if implemented)

---

## ⚠️ Important Notes

**Local Development:**
- Keep test keys in your local `.env` file
- Never commit `.env` to git (it's in `.gitignore`)
- Use test cards locally: `4242 4242 4242 4242`

**Production:**
- Live keys only in Vercel environment variables
- Never commit live keys to code
- Monitor first few transactions closely
- Check Stripe Dashboard regularly

**Costs:**
- Stripe fees: ~2.9% + $0.30 per transaction (check Australian rates)
- Payouts: 2-7 days to your bank account
- No monthly fees for Stripe

---

## Troubleshooting

**Webhook not working:**
- Check endpoint URL is correct (https://yourdomain.com/api/webhooks/stripe)
- Verify webhook secret in Vercel matches Stripe
- Check Stripe Dashboard → Webhooks → Event log for errors
- Redeploy after adding webhook secret

**Environment variables not working:**
- Make sure they're set for "Production" environment in Vercel
- Redeploy after adding/changing variables
- Check for typos in variable names

**Payment works but no email:**
- Check Resend API key is valid
- Check webhook is firing
- Look at server logs in Vercel
- Verify email template syntax

---

## Current Status

- [x] Stripe account activated
- [x] Live API keys obtained
- [ ] Deployed to Vercel
- [ ] Environment variables added to Vercel
- [ ] Production webhook configured
- [ ] Test purchase completed
- [ ] Test refund completed

## You're Ready!

Once you complete steps 2-6, you'll be live and accepting real payments! 🎉
