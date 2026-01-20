# Deployment Guide: riqle.com.au

## Prerequisites

- ✅ GitHub repository: https://github.com/leqir/riqle
- ✅ Next.js app ready
- ⏳ Domain: riqle.com.au (to be purchased)
- ⏳ Production database (recommend: Supabase or Neon)

---

## Step 1: Set Up Production Database

### Option A: Supabase (Free tier, PostgreSQL)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from **Settings → Database**
4. Format: `postgresql://postgres.[project-ref]:[password]@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres`

### Option B: Neon (Serverless PostgreSQL)

1. Go to [neon.tech](https://neon.tech)
2. Create new project in Sydney region
3. Copy connection string

### Run Migrations

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your_production_database_url"

# Run migrations
npx prisma migrate deploy

# Seed database (if needed)
npm run db:seed
```

---

## Step 2: Deploy to Vercel

### 2.1 Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import: `leqir/riqle`
5. Configure:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`

### 2.2 Add Environment Variables

In Vercel → **Settings → Environment Variables**, add:

```env
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>
AUTH_SECRET=<same-as-nextauth-secret>
NEXTAUTH_URL=https://riqle.com.au

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@riqle.com.au

# Sentry (Optional)
SENTRY_DSN=https://...
NEXT_PUBLIC_SENTRY_DSN=https://...
SENTRY_AUTH_TOKEN=...
```

**Generate secrets:**

```bash
openssl rand -base64 32
```

### 2.3 Deploy

Click **"Deploy"** - your site will be live at `riqle.vercel.app`

---

## Step 3: Purchase Domain

### Where to Buy riqle.com.au

- **[Crazy Domains](https://www.crazydomains.com.au/)** ⭐ Recommended
- **[VentraIP](https://ventraip.com.au/)**
- **[Netregistry](https://www.netregistry.com.au/)**
- **[Namecheap](https://www.namecheap.com/)** (supports .com.au)

### Requirements for .com.au

You need ONE of:

- ✅ Australian Business Number (ABN)
- ✅ Australian Company Number (ACN)
- ✅ Australian citizen/resident with ID

**Cost**: ~$15-25 AUD/year

---

## Step 4: Connect Domain to Vercel

### Method A: Vercel Nameservers (Recommended)

1. **In Vercel Dashboard:**
   - Go to your project → **Settings → Domains**
   - Click **"Add Domain"**
   - Enter: `riqle.com.au`
   - Click **"Add"**

2. **Vercel will provide nameservers:**

   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

3. **In your domain registrar (e.g., Crazy Domains):**
   - Go to **DNS Management** or **Nameservers**
   - Select **"Custom Nameservers"**
   - Replace with Vercel's nameservers
   - Save changes

4. **Add www subdomain (optional):**
   - In Vercel, add: `www.riqle.com.au`
   - Vercel auto-redirects www → non-www

5. **Wait for DNS propagation** (1-48 hours, usually < 4 hours)

### Method B: Custom DNS Records (Alternative)

If you want to keep your registrar's nameservers:

**In your domain registrar's DNS settings, add:**

| Type  | Name | Value                | TTL  |
| ----- | ---- | -------------------- | ---- |
| A     | @    | 76.76.21.21          | 3600 |
| CNAME | www  | cname.vercel-dns.com | 3600 |

---

## Step 5: Configure Stripe Webhooks

### Production Webhook Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter: `https://riqle.com.au/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `charge.succeeded`
   - `charge.failed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy **webhook signing secret** (starts with `whsec_`)
6. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
7. **Redeploy** your Vercel app for changes to take effect

---

## Step 6: Configure Email Domain

### Set up Email Sending from @riqle.com.au

1. **In Resend Dashboard:**
   - Go to **Domains** → **Add Domain**
   - Enter: `riqle.com.au`

2. **Add DNS Records** (in your domain registrar):

   Resend will provide records like:

   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:spf.resend.com ~all

   Type: CNAME
   Name: resend._domainkey
   Value: resend._domainkey.resend.com

   Type: CNAME
   Name: resend2._domainkey
   Value: resend2._domainkey.resend.com
   ```

3. **Verify domain** in Resend (takes 5-10 minutes)

4. **Update environment variable:**

   ```env
   EMAIL_FROM=noreply@riqle.com.au
   ```

5. **Redeploy** Vercel app

---

## Step 7: Post-Deployment Checklist

### Test Everything

- [ ] Visit https://riqle.com.au (and https://www.riqle.com.au)
- [ ] Test navigation (all pages load)
- [ ] Test authentication (login/logout)
- [ ] Test Stripe checkout flow
- [ ] Test email sending (verify email, purchase confirmation)
- [ ] Check Sentry for errors
- [ ] Test on mobile devices
- [ ] Check page load speed

### Security

- [ ] SSL certificate active (https://riqle.com.au shows 🔒)
- [ ] Security headers working (check with [securityheaders.com](https://securityheaders.com))
- [ ] CSP policy not blocking resources
- [ ] No secrets in client-side code

### SEO

- [ ] Add Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Add meta descriptions to all pages
- [ ] Set up Open Graph images

---

## Monitoring & Maintenance

### Check Regularly

- **Vercel Dashboard**: Monitor deployments, build logs
- **Sentry**: Track errors and performance
- **Stripe Dashboard**: Monitor payments
- **Database**: Monitor connection pool, query performance

### Costs (Estimated Monthly)

- Domain: ~$2 AUD/month
- Vercel: Free (Hobby plan) or $20 USD/month (Pro)
- Database: Free (Supabase/Neon) or ~$10-25/month
- Stripe: 1.75% + 30¢ per transaction
- Resend: Free (3,000 emails/month) or $20/month

---

## Troubleshooting

### Domain not working after 48 hours?

- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net/)
- Verify nameservers: `dig riqle.com.au NS`
- Check Vercel domain status in dashboard

### Build failing on Vercel?

- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Test build locally: `npm run build`

### Stripe webhooks not working?

- Check webhook signature is correct
- Verify endpoint URL is correct
- Check Vercel function logs
- Test with Stripe CLI: `stripe listen --forward-to localhost:3001/api/webhooks/stripe`

### Emails not sending?

- Verify Resend domain is verified
- Check DNS records are correct
- Test with Resend API tester
- Check Vercel function logs

---

## Quick Commands

```bash
# Generate production secret
openssl rand -base64 32

# Test build locally
npm run build
npm run start

# Check DNS propagation
dig riqle.com.au

# Test Stripe webhooks locally
stripe listen --forward-to localhost:3001/api/webhooks/stripe

# Run database migrations
npx prisma migrate deploy

# Check for TypeScript errors
npm run typecheck
```

---

## Support Links

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Stripe Webhooks**: https://stripe.com/docs/webhooks
- **Prisma Deployment**: https://www.prisma.io/docs/guides/deployment
- **Resend Setup**: https://resend.com/docs

---

**Last Updated**: 2026-01-18
