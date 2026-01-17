# Epic 0 Completion Checklist - Manual Steps Required

This document outlines all the manual steps YOU need to complete to finish Epic 0. AI has set up all the code - now you need to configure the external services and verify everything works.

## ⏱️ Estimated Time: 2-3 hours

---

## Phase 1: Third-Party Service Setup (60-90 minutes)

### 1.1 Database Setup - Vercel Postgres (15 min)

**Why**: Your app needs a PostgreSQL database to store users, orders, products, etc.

**Steps**:

1. Go to [vercel.com](https://vercel.com)
2. Sign in or create account
3. Click "Storage" → "Create Database"
4. Select "Postgres"
5. Choose a database name (e.g., `riqle-db`)
6. Select region closest to you
7. Click "Create"
8. Once created, click the "Quickstart" tab
9. Copy the `POSTGRES_PRISMA_URL` connection string
10. Save this for `.env` setup later

**✅ Success Check**: You should have a connection string like `postgresql://username:password@host/database?sslmode=require`

---

### 1.2 NextAuth Secret Generation (2 min)

**Why**: NextAuth needs a secret key to encrypt session tokens.

**Steps**:

1. Open your terminal
2. Run this command:
   ```bash
   openssl rand -base64 32
   ```
3. Copy the output (looks like: `kZx8Q3J2mN5vB8tY9wE7rK1...`)
4. Save this for `.env` setup later

**✅ Success Check**: You should have a 44-character random string

---

### 1.3 Resend Email Setup (10 min)

**Why**: Your app sends magic link emails, purchase confirmations, and access notifications.

**Steps**:

1. Go to [resend.com](https://resend.com)
2. Sign up for free account (100 emails/day free)
3. Verify your email address
4. Click "API Keys" in sidebar
5. Click "Create API Key"
6. Name it "Riqle Production"
7. Copy the API key (starts with `re_`)
8. Save this for `.env` setup later
9. **Domain Setup** (Optional but recommended):
   - Go to "Domains" in sidebar
   - Click "Add Domain"
   - Enter your domain (e.g., `riqle.com`)
   - Follow DNS verification instructions
   - **OR** use `onboarding@resend.dev` for testing (no domain needed)

**✅ Success Check**: You should have an API key like `re_123abc...`

---

### 1.4 Stripe Payment Setup (20 min)

**Why**: Your app processes payments and manages subscriptions.

**Steps**:

1. Go to [stripe.com](https://stripe.com)
2. Sign up or sign in
3. Click "Developers" → "API keys"
4. Copy **both** keys:
   - `Publishable key` (starts with `pk_test_`)
   - `Secret key` (starts with `sk_test_`)
5. Save these for `.env` setup later

**Webhook Setup**: 6. Click "Developers" → "Webhooks" 7. Click "Add endpoint" 8. For local testing, use: `http://localhost:3000/api/webhooks/stripe` 9. For production, use: `https://yourdomain.com/api/webhooks/stripe` 10. Click "Select events" 11. Add these events: - `checkout.session.completed` - `customer.subscription.created` - `customer.subscription.updated` - `customer.subscription.deleted` - `charge.refunded` 12. Click "Add endpoint" 13. Click on the webhook you just created 14. Copy the "Signing secret" (starts with `whsec_`) 15. Save this for `.env` setup later

**Product Setup** (Important!): 16. Go to Stripe Dashboard → "Products" 17. Click "Add product" 18. Create test products matching your business model 19. Note the Price IDs for each product (starts with `price_`) 20. You'll use these Price IDs in your app

**✅ Success Check**: You should have:

- Publishable key (pk*test*...)
- Secret key (sk*test*...)
- Webhook secret (whsec\_...)
- At least one product with a Price ID

---

### 1.5 Inngest Setup (15 min)

**Why**: Handles background jobs like sending emails and processing orders asynchronously.

**Steps**:

1. Go to [inngest.com](https://inngest.com)
2. Sign up for free account
3. Create a new app (name it "Riqle")
4. Click "Apps" → your app name
5. Click "Keys" in sidebar
6. Copy the "Event Key" (starts with `inngest_`)
7. Save this for `.env` setup later
8. **Important**: You'll need to deploy your app first before Inngest can sync functions
9. For local development:
   - Install Inngest CLI: `npx inngest-cli@latest dev`
   - This will run locally and you don't need the event key yet

**✅ Success Check**: You should have an event key like `inngest_...`

---

### 1.6 Sentry Error Tracking Setup (20 min)

**Why**: Tracks errors, monitors performance, and helps debug production issues.

**Steps**:

1. Go to [sentry.io](https://sentry.io)
2. Sign up for free account
3. Click "Create Project"
4. Select "Next.js"
5. Name it "Riqle"
6. Click "Create Project"
7. Copy the DSN (looks like `https://abc123@o123.ingest.sentry.io/456`)
8. Save this for `.env` setup later
9. **Configure Sentry**:
   - Organization slug: Found in URL (`sentry.io/organizations/YOUR-SLUG`)
   - Project slug: Your project name (e.g., "riqle")
   - Auth Token:
     - Go to Settings → Auth Tokens
     - Click "Create New Token"
     - Select scope: `project:releases`
     - Copy token
10. Save org slug, project slug, and auth token for `.env`

**✅ Success Check**: You should have:

- Sentry DSN
- Organization slug
- Project slug
- Auth token

---

## Phase 2: Environment Configuration (15 min)

### 2.1 Create .env File

**Steps**:

1. In your project root, copy the example:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` in your editor

3. Fill in ALL the values you saved from Phase 1:

```bash
# Database (from 1.1)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
POSTGRES_PRISMA_URL="postgresql://username:password@host/database?sslmode=require"

# NextAuth (from 1.2)
NEXTAUTH_URL="http://localhost:3000"  # Change to production URL when deploying
NEXTAUTH_SECRET="your-44-character-secret-here"

# Email Provider - Resend (from 1.3)
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="onboarding@resend.dev"  # Or your verified domain

# Stripe (from 1.4)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key_here"
STRIPE_SECRET_KEY="sk_test_your_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# Inngest (from 1.5)
INNGEST_EVENT_KEY="inngest_your_key_here"
INNGEST_SIGNING_KEY="signkey_your_key_here"  # Get this from Inngest dashboard

# Sentry (from 1.6)
SENTRY_DSN="https://your-dsn@sentry.io/project-id"
SENTRY_ORG="your-org-slug"
SENTRY_PROJECT="riqle"
SENTRY_AUTH_TOKEN="your-auth-token"

# App Config
NEXT_PUBLIC_URL="http://localhost:3000"  # Change to production URL when deploying
NODE_ENV="development"
```

4. **Double-check every value** - missing or wrong values will cause errors

**✅ Success Check**:

- `.env` file exists
- All values filled in (no "your_key_here" placeholders)
- No quotes around values unless needed
- File is in project root (same level as package.json)

---

## Phase 3: Database Initialization (10 min)

### 3.1 Generate Prisma Client

**Steps**:

```bash
npx prisma generate
```

**What this does**: Creates TypeScript types from your schema

**✅ Success Check**: You should see "✔ Generated Prisma Client"

---

### 3.2 Push Schema to Database

**Steps**:

```bash
npx prisma db push
```

**What this does**: Creates all tables in your database

**Expected output**:

```
🚀  Your database is now in sync with your Prisma schema.
```

**✅ Success Check**: No errors, all tables created

---

### 3.3 Seed Test Data (Optional)

**Steps**:

```bash
npm run db:seed
```

**What this does**: Creates test users, products, and orders

**✅ Success Check**: You should see "Database seeded successfully"

---

## Phase 4: Local Testing (20-30 min)

### 4.1 Start Development Server

**Steps**:

```bash
npm run dev
```

**Expected output**:

```
✓ Ready in 3.2s
○ Local:   http://localhost:3000
```

**✅ Success Check**: Server starts without errors

---

### 4.2 Test Health Endpoint

**Steps**:

1. Open browser
2. Go to: `http://localhost:3000/api/health`
3. You should see:
   ```json
   {
     "status": "healthy",
     "timestamp": "2024-01-03T...",
     "requestId": "...",
     "checks": {
       "api": "ok",
       "database": "ok"
     }
   }
   ```

**✅ Success Check**: JSON response with "healthy" status

---

### 4.3 Test Authentication Flow

**Steps**:

1. Go to: `http://localhost:3000/login`
2. Enter your email
3. Click "Continue with Email"
4. Check your email inbox
5. Click the magic link
6. You should be redirected to the homepage, signed in

**Troubleshooting**:

- No email? Check spam folder
- Still no email? Check Resend dashboard → "Logs" to see if email sent
- Check `.env` has correct `RESEND_API_KEY`

**✅ Success Check**: You can sign in via magic link

---

### 4.4 Test tRPC API

**Steps**:

1. Open: `http://localhost:3000/api/trpc/posts.getAll`
2. You should see JSON data or empty array

**Or use the example page**:

1. Create a file: `src/app/test/page.tsx`
2. Import the example: `import { PostsListExample } from '@/components/examples/posts-list-example'`
3. Visit: `http://localhost:3000/test`

**✅ Success Check**: API responds with JSON

---

### 4.5 Test Stripe Checkout (Important!)

**Steps**:

1. Make sure you have a product in Stripe (from 1.4)
2. Update `src/app/page.tsx` or create a test page with:

   ```tsx
   import { CheckoutButton } from '@/components/checkout-button';

   <CheckoutButton priceId="price_your_test_price_id" productName="Test Product" />;
   ```

3. Click the checkout button
4. You should be redirected to Stripe Checkout
5. Use test card: `4242 4242 4242 4242`
6. Expiry: Any future date
7. CVC: Any 3 digits
8. Complete checkout
9. Check database for new order

**✅ Success Check**:

- Redirected to Stripe
- Payment succeeds
- Order created in database

---

### 4.6 Test Inngest Jobs (Local)

**Steps**:

**Option 1: Inngest Dev Server** (Recommended for testing)

1. In a new terminal:
   ```bash
   npx inngest-cli@latest dev
   ```
2. Go to: `http://localhost:8288`
3. You should see Inngest dev UI
4. Trigger a test event
5. Watch it process

**Option 2: Production Inngest**

1. Deploy your app first (see Phase 5)
2. Go to Inngest dashboard
3. Your functions should sync automatically
4. Test by triggering events

**✅ Success Check**: Inngest functions visible and executable

---

### 4.7 Test Sentry Error Tracking

**Steps**:

1. Create an intentional error:
   ```tsx
   // Add to any page
   <button
     onClick={() => {
       throw new Error('Test error');
     }}
   >
     Test Sentry
   </button>
   ```
2. Click the button
3. Go to Sentry dashboard
4. Check "Issues" - you should see your error

**✅ Success Check**: Error appears in Sentry within 1-2 minutes

---

## Phase 5: Deployment Preparation (Optional - 30 min)

### 5.1 Choose Hosting Platform

**Recommended**: Vercel (easiest for Next.js)

**Steps**:

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure environment variables (copy all from `.env`)
5. Deploy

**Important**: Update these in Vercel environment variables:

- `NEXTAUTH_URL` → Your production URL
- `NEXT_PUBLIC_URL` → Your production URL
- `STRIPE_WEBHOOK_SECRET` → Create new webhook for production URL

**✅ Success Check**: App deploys successfully

---

### 5.2 Configure Production Webhooks

**Stripe**:

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select same events as before
4. Copy new webhook secret
5. Update `STRIPE_WEBHOOK_SECRET` in Vercel

**Inngest**:

1. After deploying, Inngest should auto-sync
2. Check Inngest dashboard → Apps → Functions
3. Your functions should appear

**✅ Success Check**: Webhooks receiving events

---

## Phase 6: Final Verification (15 min)

### 6.1 Complete Integration Test

Run through this full flow:

1. ✅ Open your app (local or production)
2. ✅ Sign up with email → Receive magic link
3. ✅ Sign in via magic link
4. ✅ Browse products (if you have a products page)
5. ✅ Start checkout
6. ✅ Complete payment with test card
7. ✅ Receive purchase confirmation email
8. ✅ Check database - order exists
9. ✅ Check Sentry - no errors (or only expected ones)
10. ✅ Check Inngest - background jobs executed

**✅ Success Check**: Complete user journey works end-to-end

---

### 6.2 Check All Services Dashboard

Visit each service and confirm:

- ✅ **Database**: Tables created, data exists
- ✅ **Resend**: Emails sending successfully
- ✅ **Stripe**: Payments processing, webhooks active
- ✅ **Inngest**: Functions synced and executing
- ✅ **Sentry**: Errors being tracked (test one if needed)

---

## Phase 7: Documentation & Next Steps (10 min)

### 7.1 Document Your Configuration

Create a private note with:

- All your API keys and secrets (store securely!)
- Service account credentials
- Dashboard URLs for each service
- Any custom configuration

**⚠️ SECURITY**: Never commit `.env` to git! It's already in `.gitignore`

---

### 7.2 Review Documentation

Read these docs to understand the system:

- `README.md` - Project overview
- `docs/QUICK_START.md` - Development guide
- `docs/AUTH_QUICK_START.md` - Authentication details
- `docs/stripe-integration.md` - Payment flow
- `docs/API_TESTING_GUIDE.md` - API usage

---

### 7.3 Set Up Git Remote (If not done)

```bash
# Create repo on GitHub/GitLab first, then:
git remote add origin <your-repo-url>
git push -u origin master
```

---

## 🎉 Epic 0 Complete Checklist

Before marking Epic 0 as done, confirm:

- [ ] All third-party accounts created and configured
- [ ] All API keys obtained and added to `.env`
- [ ] Database initialized and seeded
- [ ] Development server starts without errors
- [ ] Authentication flow works (magic link email)
- [ ] tRPC API responds correctly
- [ ] Stripe checkout flow completes
- [ ] Emails sending via Resend
- [ ] Inngest jobs executing
- [ ] Sentry tracking errors
- [ ] All environment variables validated
- [ ] Git commit created and pushed (already done!)
- [ ] Documentation reviewed

---

## 🆘 Troubleshooting Common Issues

### Issue: "Database connection failed"

**Solution**:

- Check `DATABASE_URL` is correct
- Verify database exists in Vercel/your provider
- Test connection: `npx prisma db pull`

### Issue: "No emails received"

**Solution**:

- Check spam folder
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard → Logs
- If using custom domain, verify DNS settings

### Issue: "Stripe webhook not receiving events"

**Solution**:

- Check webhook URL is correct
- Verify `STRIPE_WEBHOOK_SECRET` matches
- For local testing, use Stripe CLI:
  ```bash
  stripe listen --forward-to localhost:3000/api/webhooks/stripe
  ```

### Issue: "NextAuth session not persisting"

**Solution**:

- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

### Issue: "tRPC procedures not found"

**Solution**:

- Restart dev server
- Check `src/server/api/root.ts` has all routers
- Verify Prisma client generated: `npx prisma generate`

---

## 📊 Time Estimates Summary

| Phase     | Task                      | Time          |
| --------- | ------------------------- | ------------- |
| 1         | Third-party service setup | 60-90 min     |
| 2         | Environment configuration | 15 min        |
| 3         | Database initialization   | 10 min        |
| 4         | Local testing             | 20-30 min     |
| 5         | Deployment (optional)     | 30 min        |
| 6         | Final verification        | 15 min        |
| 7         | Documentation             | 10 min        |
| **Total** |                           | **2-3 hours** |

---

## 🚀 Ready for Next Epic

Once all checkboxes are checked, Epic 0 is officially complete! You now have:

- ✅ Fully functional development environment
- ✅ Authentication system
- ✅ Payment processing
- ✅ Email notifications
- ✅ Background jobs
- ✅ Error tracking
- ✅ Production-ready infrastructure

You're ready to build Epic 1 features! 🎊
