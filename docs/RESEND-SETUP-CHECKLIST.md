# Resend Domain Setup - Quick Checklist

Quick reference checklist for setting up riqle.com.au with Resend.

---

## ☐ Step 1: Add Domain to Resend (5 minutes)

1. Go to: https://resend.com/domains
2. Click "Add Domain"
3. Enter: `riqle.com.au`
4. Click "Add"
5. **COPY the DNS records shown** (you'll need these next)

---

## ☐ Step 2: Add DNS Records (10 minutes)

Go to your domain registrar where you bought riqle.com.au.

### Add these 3 TXT records:

**Record 1 - SPF:**

- Type: `TXT`
- Name: `@`
- Value: `v=spf1 include:spf.resend.com ~all`

**Record 2 - DKIM:**

- Type: `TXT`
- Name: `resend._domainkey`
- Value: (copy from Resend - starts with `p=MIGfMA0G...`)

**Record 3 - DMARC (optional):**

- Type: `TXT`
- Name: `_dmarc`
- Value: `v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au`

Click "Save" after each record.

---

## ☐ Step 3: Wait for DNS Propagation (15-30 minutes)

Wait 15-30 minutes for DNS to propagate.

**Check if ready:**

```bash
dig TXT riqle.com.au +short
dig TXT resend._domainkey.riqle.com.au +short
```

---

## ☐ Step 4: Verify in Resend (2 minutes)

1. Go back to: https://resend.com/domains
2. Find `riqle.com.au`
3. Click "Verify"
4. Wait for green checkmarks ✅

If it fails, wait 10 more minutes and try again.

---

## ☐ Step 5: Update Code (1 minute)

I'll do this for you once you confirm the domain is verified:

```typescript
// Change from:
from: 'Riqle <onboarding@resend.dev>';

// To:
from: 'Riqle <noreply@riqle.com.au>';
```

---

## ☐ Step 6: Test (2 minutes)

1. Restart dev server
2. Make test purchase
3. Check email inbox for confirmation from `noreply@riqle.com.au`

---

## Total Time: ~30-45 minutes

(Most of this is waiting for DNS propagation)

---

## Tell Me When:

✅ **"Domain added to Resend"** - After Step 1
✅ **"DNS records added"** - After Step 2
✅ **"Domain verified"** - After Step 4

Then I'll update the code for you!
