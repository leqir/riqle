# Resend Domain Setup Guide for riqle.com.au

Complete guide to configure Resend to send emails from your verified domain.

---

## Prerequisites

- ✅ You own riqle.com.au
- ✅ Access to your domain registrar's DNS settings
- ✅ Resend API key configured in `.env`

---

## Step 1: Add Domain to Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click **"Add Domain"** button
3. Enter your domain: `riqle.com.au`
4. Click **"Add"**

**Screenshot location:** Resend will show you DNS records to add

---

## Step 2: Get DNS Records from Resend

After adding the domain, Resend will display **3 DNS records** you need to add:

### Record 1: SPF (TXT Record)

- **Type:** TXT
- **Name:** `@` or `riqle.com.au`
- **Value:** `v=spf1 include:spf.resend.com ~all`
- **Purpose:** Authorizes Resend to send emails on your behalf

### Record 2: DKIM (TXT Record)

- **Type:** TXT
- **Name:** `resend._domainkey` or `resend._domainkey.riqle.com.au`
- **Value:** `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN...` (long string provided by Resend)
- **Purpose:** Email authentication to prevent spoofing

### Record 3: DMARC (TXT Record) - Optional but Recommended

- **Type:** TXT
- **Name:** `_dmarc` or `_dmarc.riqle.com.au`
- **Value:** `v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au`
- **Purpose:** Email authentication policy

**IMPORTANT:** Copy the exact values Resend shows you. The DKIM value is unique to your account.

---

## Step 3: Add DNS Records to Your Domain Registrar

### If your domain is with **GoDaddy:**

1. Go to [GoDaddy DNS Management](https://dcc.godaddy.com/domains)
2. Find `riqle.com.au` → Click **"DNS"**
3. Scroll to **"Records"** section
4. Click **"Add"** for each record:

   **SPF Record:**
   - Type: `TXT`
   - Name: `@`
   - Value: `v=spf1 include:spf.resend.com ~all`
   - TTL: `1 hour` (or `3600`)

   **DKIM Record:**
   - Type: `TXT`
   - Name: `resend._domainkey`
   - Value: (paste the long string from Resend)
   - TTL: `1 hour`

   **DMARC Record (optional):**
   - Type: `TXT`
   - Name: `_dmarc`
   - Value: `v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au`
   - TTL: `1 hour`

5. Click **"Save"** after adding each record

### If your domain is with **Cloudflare:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select `riqle.com.au`
3. Go to **DNS** → **Records**
4. Click **"Add record"** for each:

   **SPF Record:**
   - Type: `TXT`
   - Name: `@`
   - Content: `v=spf1 include:spf.resend.com ~all`
   - Proxy status: DNS only (gray cloud)
   - TTL: Auto

   **DKIM Record:**
   - Type: `TXT`
   - Name: `resend._domainkey`
   - Content: (paste from Resend)
   - Proxy status: DNS only
   - TTL: Auto

   **DMARC Record:**
   - Type: `TXT`
   - Name: `_dmarc`
   - Content: `v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au`
   - Proxy status: DNS only
   - TTL: Auto

### If your domain is with **Route 53 (AWS):**

1. Go to [Route 53 Console](https://console.aws.amazon.com/route53)
2. Click **"Hosted zones"** → Select `riqle.com.au`
3. Click **"Create record"** for each:

   **SPF Record:**
   - Record name: (leave blank for root domain)
   - Record type: `TXT`
   - Value: `"v=spf1 include:spf.resend.com ~all"`
   - TTL: `3600`

   **DKIM Record:**
   - Record name: `resend._domainkey`
   - Record type: `TXT`
   - Value: (paste from Resend, wrap in quotes)
   - TTL: `3600`

   **DMARC Record:**
   - Record name: `_dmarc`
   - Record type: `TXT`
   - Value: `"v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au"`
   - TTL: `3600`

---

## Step 4: Wait for DNS Propagation

- **Propagation time:** 5 minutes to 48 hours (usually 15-30 minutes)
- **Check status:** Go back to Resend dashboard and click **"Verify"**
- **Verification:** Resend will automatically check DNS records

### How to Check DNS Records Manually:

```bash
# Check SPF record
dig TXT riqle.com.au +short

# Check DKIM record
dig TXT resend._domainkey.riqle.com.au +short

# Check DMARC record
dig TXT _dmarc.riqle.com.au +short
```

**Expected outputs:**

```
# SPF should show:
"v=spf1 include:spf.resend.com ~all"

# DKIM should show the long key Resend gave you

# DMARC should show:
"v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au"
```

---

## Step 5: Verify Domain in Resend

1. Go back to [Resend Domains](https://resend.com/domains)
2. Click **"Verify"** next to `riqle.com.au`
3. Wait for verification (should show green checkmarks)

**Status meanings:**

- ✅ Green: Verified and ready to use
- ⏳ Orange: DNS records not yet propagated
- ❌ Red: DNS records incorrect or missing

---

## Step 6: Update Code to Use Verified Domain

Once the domain is verified in Resend:

### Update `src/lib/email.ts`:

```typescript
const result = await resend.emails.send({
  from: 'Riqle <noreply@riqle.com.au>', // Changed from onboarding@resend.dev
  to,
  subject,
  html,
});
```

### Update `scripts/resend-confirmation.ts` (if you use it):

```typescript
const result = await resend.emails.send({
  from: 'Riqle <noreply@riqle.com.au>', // Changed from onboarding@resend.dev
  to: order.customerEmail,
  subject: `Your ${product.title} is ready`,
  html,
});
```

---

## Step 7: Test Email Sending

After domain verification:

1. Restart your dev server:

   ```bash
   npm run dev
   ```

2. Make a test purchase in Stripe test mode

3. Check that you receive the confirmation email from `noreply@riqle.com.au`

4. Verify email logs:
   ```bash
   npx tsx scripts/check-email-logs.ts
   ```

---

## Troubleshooting

### Domain verification stuck on "Pending"

**Solution:**

- Wait 30 minutes and try clicking "Verify" again
- Check DNS records using `dig` commands above
- Ensure no typos in DNS records

### Emails not being received

**Checklist:**

1. ✅ Domain verified in Resend (green checkmarks)
2. ✅ Code updated to use `noreply@riqle.com.au`
3. ✅ Dev server restarted after code change
4. ✅ Check spam/junk folder
5. ✅ Check email logs show "sent" status

### SPF/DKIM/DMARC records not found

**Solution:**

- DNS propagation can take up to 48 hours
- Use [DNS Checker](https://dnschecker.org) to check global propagation
- Verify TTL isn't set too high (use 3600 or 1 hour)

### Multiple SPF records error

**Issue:** You can only have ONE SPF record per domain

**Solution:**
If you already have an SPF record, merge them:

```
# Existing:
v=spf1 include:_spf.google.com ~all

# Resend requires:
v=spf1 include:spf.resend.com ~all

# Merged version:
v=spf1 include:_spf.google.com include:spf.resend.com ~all
```

---

## Production Environment Variables

When deploying to production (Vercel/Railway/etc.), ensure:

```env
RESEND_API_KEY=re_YourProductionAPIKey
NEXT_PUBLIC_URL=https://riqle.com.au
```

---

## Email Best Practices

### Reply-To Address

Add a reply-to so users can respond:

```typescript
const result = await resend.emails.send({
  from: 'Riqle <noreply@riqle.com.au>',
  replyTo: 'nathanael.thie@gmail.com', // Where replies should go
  to,
  subject,
  html,
});
```

### Unsubscribe Link (for marketing emails)

If you send marketing emails (not transactional), add unsubscribe:

```typescript
headers: {
  'List-Unsubscribe': '<mailto:unsubscribe@riqle.com.au>',
}
```

### Email Deliverability Tips

1. **Warm up your domain:** Start with low volume, gradually increase
2. **Monitor bounce rate:** Keep below 5%
3. **Check spam score:** Use [Mail Tester](https://www.mail-tester.com)
4. **Enable DMARC reporting:** Monitor `dmarc@riqle.com.au` for reports

---

## Quick Reference

| Task               | Command/Link                          |
| ------------------ | ------------------------------------- |
| Resend Dashboard   | https://resend.com/domains            |
| Check DNS Records  | `dig TXT riqle.com.au +short`         |
| Check Email Logs   | `npx tsx scripts/check-email-logs.ts` |
| Test Email Sending | Make test Stripe purchase             |
| Mail Tester        | https://www.mail-tester.com           |
| DNS Checker        | https://dnschecker.org                |

---

## Current Status

- ✅ Resend API key configured
- ✅ Code currently using `onboarding@resend.dev` (sandbox)
- ⏳ Domain `riqle.com.au` needs to be added and verified
- ⏳ Code needs to be updated to use verified domain

---

## Need Help?

- **Resend Docs:** https://resend.com/docs/dashboard/domains/introduction
- **Resend Support:** https://resend.com/support
- **DNS Help:** Contact your domain registrar's support

---

**Next Step:** Go to https://resend.com/domains and click "Add Domain"
