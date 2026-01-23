# Cloudflare DNS Migration Guide

Complete step-by-step guide to migrate riqle.com.au DNS from VentraIP to Cloudflare.

**Total Time:** 30-45 minutes
**Skill Level:** Beginner-friendly

---

## Part 1: Set Up Cloudflare Account (10 minutes)

### Step 1: Create Cloudflare Account

1. Go to: https://dash.cloudflare.com/sign-up
2. Enter your email address
3. Create a strong password
4. Click **"Create Account"**
5. Check your email and verify your account (click the link)

---

### Step 2: Add Your Domain to Cloudflare

1. After logging in, click **"Add a Site"**
2. Enter: `riqle.com.au`
3. Click **"Add Site"**

---

### Step 3: Select Free Plan

1. Cloudflare will show pricing plans
2. Scroll down to the **"Free"** plan
3. Click **"Continue"** under Free ($0/month)

---

### Step 4: Review DNS Records (IMPORTANT!)

Cloudflare will now scan your existing DNS records from VentraIP.

**You'll see a list of records like:**

- A records (for riqle.com.au, www.riqle.com.au)
- NS records (nameservers)
- MX records (email - amazonses.com)
- TXT records (SPF, DMARC)

**IMPORTANT:**

1. ✅ **Make sure ALL your existing records are checked/selected**
2. ✅ Especially check that your Amazon SES MX records are there
3. ✅ Don't uncheck anything unless you know what it is

**Look for these critical records:**

- MX record pointing to `feedback-smtp.ap-northeast-1.amazonses.com`
- TXT record with `v=spf1 include:amazonses.com ~all`
- A records for your website IP (103.42.108.46)

If anything is missing, you can add it later.

4. Click **"Continue"**

---

### Step 5: Get Your Cloudflare Nameservers

Cloudflare will show you 2 nameservers. **COPY THESE - YOU'LL NEED THEM!**

They'll look like:

```
eva.ns.cloudflare.com
rob.ns.cloudflare.com
```

(Yours will be different names, but same format)

**Write them down or keep this tab open!**

---

## Part 2: Update Nameservers in VentraIP (10 minutes)

### Step 6: Login to VentraIP

1. Go to: https://ventraip.com.au/
2. Click **"Sign In"**
3. Login with your credentials
4. Go to **"My Services"** → **"Domains"**
5. Click on **riqle.com.au**

---

### Step 7: Change Nameservers

In the VentraIP domain management page:

1. Look for **"Child Nameservers"** in the left menu (or it might say "Nameservers" or "DNS Management")
2. Click on it
3. You'll see the current nameservers (probably VentraIP's)

**Current nameservers might be:**

```
ns1.nameserver.net.au
ns2.nameserver.net.au
ns3.nameserver.net.au
```

4. Click **"Edit"** or **"Change Nameservers"**
5. Select **"Use Custom Nameservers"** or **"Third Party Nameservers"**
6. Enter the 2 Cloudflare nameservers you copied earlier:
   - Nameserver 1: `eva.ns.cloudflare.com` (your actual one)
   - Nameserver 2: `rob.ns.cloudflare.com` (your actual one)
7. Remove any 3rd or 4th nameserver fields (Cloudflare only uses 2)
8. Click **"Save"** or **"Update Nameservers"**

**VentraIP will warn you:**

> "Changing nameservers will affect your domain's DNS. Are you sure?"

9. Click **"Yes"** or **"Confirm"**

---

### Step 8: Wait for Confirmation

VentraIP will show:

> "Nameservers updated successfully. Changes may take up to 24 hours to propagate."

**In reality:** Usually takes 15 minutes to 2 hours.

---

## Part 3: Complete Cloudflare Setup (5 minutes)

### Step 9: Verify Nameservers in Cloudflare

1. Go back to your Cloudflare tab
2. On the nameserver page, click **"Done, check nameservers"**

Cloudflare will show:

> "Checking nameservers... This may take a moment."

**If nameservers are verified immediately:**

- ✅ Great! You'll see "Active" status

**If not verified yet:**

- ⏳ "Pending Nameserver Update"
- This is normal. Cloudflare will keep checking automatically.
- You'll get an email when it's active (usually 15-60 minutes)

---

### Step 10: Configure Quick Start Settings

Cloudflare will ask about automatic features:

**Automatic HTTPS Rewrites:**

- ✅ Turn ON (recommended)

**Auto Minify:**

- ✅ Check JavaScript, CSS, HTML (recommended)

**Brotli Compression:**

- ✅ Turn ON (recommended)

Click **"Finish"**

---

## Part 4: Add Resend DNS Records (5 minutes)

### Step 11: Navigate to DNS Settings

1. In Cloudflare dashboard, click **"DNS"** in the left menu
2. Click **"Records"**

You'll see all your DNS records that were imported from VentraIP.

---

### Step 12: Add DKIM Record for Resend

1. Click **"Add record"**
2. Fill in:
   - **Type:** `TXT`
   - **Name:** `resend._domainkey`
   - **Content:** `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDU4bEzM7lACBU9Lkens7y/SWnETXDxmAXLD7F7s03bWYt3UvXsVFnFA9cTAlQyIhZyUZApv52POIZf5jGZ+vxMd1XE58ULa5k3uoTgkXgUmIpMejnHOm9kurxTY4HV7Cusq0mxKYQ2kg0R/iF2V2Lt6lqcb1YqYu1rTsGqOtiI0wIDAQAB`
   - **Proxy status:** Click the cloud icon so it's **gray** (DNS only)
   - **TTL:** `Auto`
3. Click **"Save"**

**✅ Success!** Cloudflare accepts underscores with no problem.

---

### Step 13: Update SPF Record

1. Find your existing SPF TXT record (has `include:amazonses.com`)
2. Click **"Edit"** on that record
3. Change **Content** from:
   ```
   v=spf1 include:amazonses.com ~all
   ```
   To:
   ```
   v=spf1 include:amazonses.com include:spf.resend.com ~all
   ```
4. Click **"Save"**

---

### Step 14: Update DMARC Record (if exists)

1. Look for a TXT record with **Name:** `_dmarc`
2. If it exists, click **"Edit"**
3. Update **Content** to:
   ```
   v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au
   ```
4. Click **"Save"**

**If \_dmarc record doesn't exist:**

1. Click **"Add record"**
2. Fill in:
   - **Type:** `TXT`
   - **Name:** `_dmarc`
   - **Content:** `v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au`
   - **Proxy status:** Gray cloud (DNS only)
   - **TTL:** `Auto`
3. Click **"Save"**

---

## Part 5: Verify Everything Works (15-30 minutes)

### Step 15: Wait for DNS Propagation

**Wait at least 15-30 minutes** for DNS to propagate globally.

During this time:

- ⏳ Your website might be temporarily unreachable
- ⏳ Emails might be delayed
- ⏳ This is normal during DNS migration

**Check propagation status:**

1. Go to: https://www.whatsmydns.net/
2. Enter: `riqle.com.au`
3. Select: `A` record
4. Click **"Search"**
5. You should see your IP (103.42.108.46) across most locations

---

### Step 16: Verify Cloudflare is Active

1. In Cloudflare dashboard, go to **Overview**
2. Status should show: **"Active"** (green)

If still pending:

- ⏳ Wait another 30 minutes
- Check email for Cloudflare activation notification

---

### Step 17: Check DNS Records

Use command line to verify DNS records are working:

```bash
# Check your website A record
dig riqle.com.au +short

# Should show: 103.42.108.46

# Check SPF record
dig TXT riqle.com.au +short

# Should show: "v=spf1 include:amazonses.com include:spf.resend.com ~all"

# Check DKIM record
dig TXT resend._domainkey.riqle.com.au +short

# Should show the long DKIM key starting with "p=MIGfMA0G..."

# Check DMARC record
dig TXT _dmarc.riqle.com.au +short

# Should show: "v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au"
```

**Don't have command line?** Use https://dnschecker.org instead.

---

### Step 18: Verify in Resend Dashboard

1. Go to: https://resend.com/domains
2. Find `riqle.com.au`
3. Click **"Verify"**
4. Wait for verification

**Expected result:**

- ✅ SPF: Verified (green checkmark)
- ✅ DKIM: Verified (green checkmark)
- ✅ DMARC: Verified (green checkmark)

**If verification fails:**

- Wait another 15 minutes (DNS might still be propagating)
- Try clicking "Verify" again

---

## Part 6: Update Code (5 minutes)

### Step 19: Tell Me When Domain is Verified

Once you see all green checkmarks in Resend:

**Tell me:** "Domain verified in Resend!"

Then I'll update the code to change:

```typescript
from: 'Riqle <onboarding@resend.dev>';
```

To:

```typescript
from: 'Riqle <noreply@riqle.com.au>';
```

---

## Part 7: Test Everything (10 minutes)

### Step 20: Test Your Website

1. Visit: https://riqle.com.au
2. Should load normally
3. Check that all pages work

If website doesn't load:

- ⏳ Wait 30 more minutes for DNS propagation
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

---

### Step 21: Test Email Sending

After I update the code:

1. Restart dev server
2. Make a test Stripe purchase
3. Check your email inbox
4. You should receive email from `noreply@riqle.com.au`

---

## Troubleshooting

### Website Not Loading After DNS Change

**Solution:**

- Wait 2-4 hours for full DNS propagation
- Check Cloudflare status is "Active"
- Verify A records are correct in Cloudflare DNS

### Cloudflare Stuck on "Pending"

**Solution:**

- Wait up to 24 hours (usually takes 1-2 hours)
- Double-check nameservers in VentraIP match Cloudflare's exactly
- Contact Cloudflare support if still pending after 24 hours

### Resend Domain Not Verifying

**Solution:**

- Wait 1-2 hours for DNS propagation
- Use `dig` commands to verify records exist
- Check that proxy status is "DNS only" (gray cloud) for TXT records
- Try clicking "Verify" again after waiting

### Email Not Working

**Solution:**

- Verify all MX records from Amazon SES are in Cloudflare
- Check SPF record includes both amazonses.com and spf.resend.com
- Wait for full DNS propagation (2-4 hours)

---

## Important Notes

### ✅ What Cloudflare Does:

- Manages your DNS records (replaces VentraIP DNS)
- Provides free CDN (faster website)
- Free SSL certificate
- DDoS protection
- Better analytics

### ❌ What Cloudflare Doesn't Change:

- Your domain is still registered with VentraIP (don't cancel)
- Your email still goes through Amazon SES (unchanged)
- Your website hosting (if you have it)
- You still pay VentraIP for domain registration

### 🔐 Security:

- Keep both VentraIP and Cloudflare accounts secure
- Use strong passwords
- Enable 2FA on both accounts (recommended)

---

## Quick Reference

| What             | Where                                     |
| ---------------- | ----------------------------------------- |
| Domain Registrar | VentraIP (pay annual renewal)             |
| DNS Management   | Cloudflare (free, what you just set up)   |
| Email Service    | Amazon SES + Resend (unchanged)           |
| Website Hosting  | VentraIP or wherever you host (unchanged) |

---

## After Migration Checklist

- ✅ Cloudflare status shows "Active"
- ✅ Website loads at riqle.com.au
- ✅ All DNS records verified with dig/dnschecker
- ✅ Resend domain shows all green checkmarks
- ✅ Test email sent successfully from noreply@riqle.com.au
- ✅ Stripe purchase flow works end-to-end

---

## Next Steps

Once everything is verified and working:

1. **Tell me**: "Cloudflare migration complete, domain verified!"
2. I'll update the code to use `noreply@riqle.com.au`
3. We'll test the complete purchase flow
4. You're done! 🎉

---

## Need Help?

**Cloudflare Support:**

- Community: https://community.cloudflare.com/
- Docs: https://developers.cloudflare.com/dns/

**VentraIP Support:**

- Phone: 1300 783 783
- Email: support@ventraip.com.au

**Resend Support:**

- Docs: https://resend.com/docs
- Email: support@resend.com

---

## Summary Timeline

| Time      | Step                                  |
| --------- | ------------------------------------- |
| 0-10 min  | Create Cloudflare account, add domain |
| 10-20 min | Update nameservers in VentraIP        |
| 20-50 min | Wait for DNS propagation              |
| 50-60 min | Add Resend records in Cloudflare      |
| 60-90 min | Verify domain in Resend               |
| 90+ min   | Update code and test                  |

**Total:** ~90 minutes (mostly waiting)

---

**Ready? Let's start with Part 1!**

Go to: https://dash.cloudflare.com/sign-up
