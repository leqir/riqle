# Google Search Console Setup Guide

**Priority:** 🔴 **CRITICAL** - This is the #1 most important action to outrank Instagram

Google Search Console (GSC) is your direct line to Google. It tells Google "this is my official website" and helps you monitor how your site appears in search results.

---

## Why This Matters

1. **Verification = Authority:** Verified sites rank better than unverified ones
2. **Submit Sitemap:** Tells Google exactly which pages to index
3. **Request Indexing:** Get new pages indexed within hours instead of weeks
4. **Monitor Performance:** See exactly where you rank for "riqle" and other keywords
5. **Fix Issues:** Google tells you about crawl errors, mobile issues, etc.

---

## Setup Steps (15 minutes)

### Step 1: Create Google Search Console Account

1. Go to: https://search.google.com/search-console
2. Sign in with your Google account (use your main Gmail)
3. Click "Add Property"
4. Choose "Domain" property type (recommended)
5. Enter: `riqle.com` (without https://)

---

### Step 2: Verify Ownership

You have 4 verification options. **DNS verification is recommended** (most reliable, covers all subdomains).

#### Option A: DNS Verification (Recommended)

**If using Vercel:**

1. GSC will show a TXT record like: `google-site-verification=abc123xyz`
2. Go to Vercel dashboard → Your project → Settings → Domains
3. Find your domain (riqle.com)
4. Click "Edit" → "Add DNS Record"
5. Add TXT record:
   - Type: TXT
   - Name: @ (or leave blank)
   - Value: `google-site-verification=abc123xyz` (use the code GSC gave you)
6. Save and wait 5-10 minutes for DNS propagation
7. Return to GSC and click "Verify"

**If using another DNS provider (Namecheap, GoDaddy, etc.):**

1. Log into your domain registrar
2. Find DNS settings
3. Add TXT record with the verification code
4. Wait 5-10 minutes
5. Return to GSC and click "Verify"

#### Option B: HTML File Upload (Easy Alternative)

1. GSC will provide an HTML file (e.g., `google123abc.html`)
2. Download the file
3. Place it in `/public/google123abc.html` in your project
4. Deploy to production
5. Visit https://riqle.com/google123abc.html to confirm it's live
6. Return to GSC and click "Verify"

#### Option C: HTML Meta Tag (Quick but Less Reliable)

1. GSC will give you a meta tag like:
   ```html
   <meta name="google-site-verification" content="abc123xyz" />
   ```
2. Add to your `/src/app/layout.tsx` in the metadata:
   ```typescript
   verification: {
     google: 'abc123xyz', // Just the content value, not the full tag
   },
   ```
3. This is already set up in your layout! Just uncomment and add the code.
4. Deploy to production
5. Return to GSC and click "Verify"

---

### Step 3: Submit Your Sitemap

**Immediately after verification:**

1. In Google Search Console, go to "Sitemaps" (left sidebar)
2. Click "Add a new sitemap"
3. Enter: `sitemap.xml`
4. Click "Submit"

Google will now:

- Discover all your pages automatically
- Crawl and index them faster
- Show you which pages are indexed

**Your sitemap URL:** https://riqle.com/sitemap.xml

---

### Step 4: Request Indexing for Key Pages

**For immediate impact:**

1. In GSC, go to "URL Inspection" (top search bar or left sidebar)
2. Enter each of these URLs and request indexing:
   - `https://riqle.com` (homepage - most important!)
   - `https://riqle.com/about`
   - `https://riqle.com/work/markpoint`
   - `https://riqle.com/resources`

3. For each URL:
   - Paste URL in search bar
   - Click "Test Live URL"
   - Click "Request Indexing"
   - Wait for confirmation

**Why this matters:** Google may take weeks to naturally find your pages. Requesting indexing gets them in search results within 24-48 hours.

---

### Step 5: Set Up Email Notifications

1. In GSC, click settings (⚙️) in top right
2. Go to "Users and permissions"
3. Verify your email is listed
4. GSC will email you about:
   - Critical indexing issues
   - Manual actions (penalties)
   - Security issues
   - Major crawl errors

---

## What to Monitor (Weekly)

### Performance Report

**Location:** GSC → Performance

**Key metrics for "riqle" keyword:**

- **Impressions:** How many times your site appeared in search results
- **Clicks:** How many times people clicked your site
- **CTR (Click-through rate):** Clicks ÷ Impressions (aim for >10%)
- **Position:** Your average ranking (aim for top 3)

**Goal:** See "riqle" impressions and position improve over time.

### Coverage Report

**Location:** GSC → Coverage (or Index → Pages)

**Check:**

- How many pages are indexed (should match your sitemap count)
- Any errors preventing indexing
- Pages excluded or not indexed

**Goal:** All important pages indexed with no errors.

### Mobile Usability

**Location:** GSC → Mobile Usability

**Check:** Ensure no mobile usability issues (your site should be fine - Next.js is mobile-first)

---

## Competing with Instagram - Search Console Strategy

### Week 1: Baseline

- Set up GSC ✅
- Submit sitemap ✅
- Request indexing for homepage ✅
- Check current position for "riqle" (you may not rank yet)

### Week 2-4: Growth Phase

- Monitor "riqle" keyword daily
- Request indexing for new content as you publish
- Fix any crawl errors immediately
- Track impressions (should increase)

### Month 2-3: Overtaking Instagram

- Compare your CTR vs Instagram's
- Optimise title/description if CTR is low
- Build backlinks (GSC doesn't show this, but it helps ranking)
- Monitor position improvements (target: top 3)

### Month 4+: Maintenance

- Check GSC weekly for issues
- Monitor for sudden ranking drops
- Keep content fresh (publish regularly)

---

## Expected GSC Timeline

**Day 1-2:** Verification and sitemap submission
**Day 3-7:** Google starts crawling your site
**Week 2:** First data appears in Performance report
**Week 3-4:** "Riqle" keyword starts showing impressions
**Month 2:** Should see you ranking on page 1-2 for "riqle"
**Month 3-6:** Competing for #1 position with Instagram

---

## Troubleshooting

### "Verification failed"

- Double-check TXT record is correct
- Wait 15-30 minutes for DNS propagation
- Try alternative verification method

### "Sitemap could not be read"

- Verify sitemap is accessible: https://riqle.com/sitemap.xml
- Check for XML errors
- Ensure robots.txt doesn't block sitemap

### "No data available yet"

- Normal for new sites
- Takes 2-3 days after verification
- Be patient - Google needs time to crawl

### "Page is not indexed"

- Request indexing manually
- Check robots.txt isn't blocking the page
- Ensure page is linked from homepage (internal linking)

---

## Pro Tips

1. **Set Data Range to "Last 28 days"** for meaningful trends
2. **Export data monthly** to track progress over time
3. **Filter by query "riqle"** to specifically track brand searches
4. **Compare Pages** to see which pages get most search traffic
5. **Check "Discover" tab** (if you get featured in Google Discover feed)

---

## Integration with Your Site (Already Done ✅)

Your site is configured to be GSC-friendly:

- ✅ Sitemap.xml generated automatically
- ✅ Robots.txt properly configured
- ✅ Meta robots tags set correctly
- ✅ Mobile-responsive design
- ✅ Fast page speed (Next.js)
- ✅ HTTPS enabled (via Vercel)
- ✅ Structured data (Person schema) on homepage

All you need to do is **verify ownership and submit the sitemap**.

---

## After Setup: Next Actions

1. **Update Instagram Bio:**
   Add "Full portfolio: riqle.com" as first line
   This creates a strong backlink from Instagram to your site

2. **Link Social Profiles:**
   Add Instagram/LinkedIn/Twitter links to your website footer
   This creates entity connections Google recognises

3. **Monitor Daily:**
   Check GSC every day for the first week to catch any issues

4. **Request Indexing After Updates:**
   Every time you publish new content, request indexing in GSC

---

## Current Status

- ✅ Site is technically ready for GSC
- ✅ Sitemap is generated and accessible
- ✅ Robots.txt is configured
- ❌ GSC account not set up yet (YOU NEED TO DO THIS)
- ❌ Sitemap not submitted to Google yet
- ❌ Homepage not requested for indexing yet

**Time required:** 15-30 minutes
**Cost:** Free
**Impact:** 🔴 **CRITICAL** for SEO success

---

**DO THIS FIRST** before anything else. This is your #1 priority to outrank Instagram.
