# Cloudflare DNS Setup - Quick Checklist

Ultra-simple checklist for migrating riqle.com.au to Cloudflare DNS.

---

## Part 1: Cloudflare Setup (10 min)

### ☐ Create Account

1. Go to: https://dash.cloudflare.com/sign-up
2. Enter email, create password, verify email

### ☐ Add Domain

1. Click "Add a Site"
2. Enter: `riqle.com.au`
3. Select "Free" plan
4. Review DNS records (make sure all are checked)
5. Click "Continue"

### ☐ Copy Nameservers

Write down the 2 nameservers shown (like `eva.ns.cloudflare.com` and `rob.ns.cloudflare.com`)

---

## Part 2: VentraIP Update (5 min)

### ☐ Change Nameservers

1. Login to VentraIP: https://ventraip.com.au/
2. Go to: My Services → Domains → riqle.com.au
3. Click "Child Nameservers" or "Nameservers"
4. Select "Custom Nameservers"
5. Enter the 2 Cloudflare nameservers
6. Save

---

## Part 3: Wait (15-60 min)

### ☐ DNS Propagation

- Wait 15-60 minutes
- Cloudflare will email when active
- Check status in Cloudflare dashboard

---

## Part 4: Add Resend Records (5 min)

### ☐ In Cloudflare DNS Section:

**Add DKIM Record:**

- Type: `TXT`
- Name: `resend._domainkey`
- Content: `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDU4bEzM7lACBU9Lkens7y/SWnETXDxmAXLD7F7s03bWYt3UvXsVFnFA9cTAlQyIhZyUZApv52POIZf5jGZ+vxMd1XE58ULa5k3uoTgkXgUmIpMejnHOm9kurxTY4HV7Cusq0mxKYQ2kg0R/iF2V2Lt6lqcb1YqYu1rTsGqOtiI0wIDAQAB`
- Proxy: Gray cloud (DNS only)

**Edit SPF Record:**

- Find existing SPF TXT record
- Change to: `v=spf1 include:amazonses.com include:spf.resend.com ~all`

**Add/Edit DMARC Record:**

- Type: `TXT`
- Name: `_dmarc`
- Content: `v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au`

---

## Part 5: Verify (10 min)

### ☐ Verify in Resend

1. Go to: https://resend.com/domains
2. Click "Verify" next to riqle.com.au
3. Wait for all green checkmarks ✅

### ☐ Test Website

- Visit: https://riqle.com.au
- Should load normally

---

## ☐ Tell Me When Done!

When you see:

- ✅ Cloudflare shows "Active"
- ✅ Resend shows all green checkmarks
- ✅ Website loads

**Say:** "Cloudflare setup complete!"

Then I'll update the code to use `noreply@riqle.com.au`

---

## Quick Links

- **Cloudflare Signup:** https://dash.cloudflare.com/sign-up
- **VentraIP Login:** https://ventraip.com.au/
- **Resend Dashboard:** https://resend.com/domains
- **DNS Checker:** https://dnschecker.org

---

## Total Time: ~30-60 minutes

(Mostly waiting for DNS propagation)
