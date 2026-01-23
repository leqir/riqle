# Quick DNS Setup for VentraIP

Ultra-simple checklist for riqle.com.au DNS configuration.

---

## Login to VentraIP

1. Go to: https://ventraip.com.au/
2. Sign in
3. Go to: **My Services** → **Domains** → **riqle.com.au**
4. Click **"DNS Records"** or **"Manage DNS"**

---

## Add/Edit These 3 Records:

### 1. ADD New DKIM Record

**Click "Add Record":**

- Type: `TXT`
- Host: `resend._domainkey`
- Value: `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDU4bEzM7lACBU9Lkens7y/SWnETXDxmAXLD7F7s03bWYt3UvXsVFnFA9cTAlQyIhZyUZApv52POIZf5jGZ+vxMd1XE58ULa5k3uoTgkXgUmIpMejnHOm9kurxTY4HV7Cusq0mxKYQ2kg0R/iF2V2Lt6lqcb1YqYu1rTsGqOtiI0wIDAQAB`
- Click "Save"

### 2. EDIT Existing SPF Record

**Find your SPF record (has `amazonses.com`):**

- Click "Edit"
- Change from: `v=spf1 include:amazonses.com ~all`
- Change to: `v=spf1 include:amazonses.com include:spf.resend.com ~all`
- Click "Save"

### 3. EDIT Existing DMARC Record

**Find your DMARC record (name is `_dmarc`):**

- Click "Edit"
- Change from: `v=DMARC1; p=none;`
- Change to: `v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au`
- Click "Save"

---

## Done!

**Now:**

1. Wait 30 minutes
2. Go to: https://resend.com/domains
3. Click "Verify" next to riqle.com.au
4. Tell me when you see green checkmarks ✅

---

## Summary:

- ✅ 1 new record added (DKIM)
- ✅ 2 existing records updated (SPF, DMARC)
- ⏳ Wait 30 minutes for DNS propagation
- ✅ Verify in Resend dashboard

**That's it!**
