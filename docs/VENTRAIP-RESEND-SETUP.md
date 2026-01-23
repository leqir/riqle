# Adding Resend DNS Records to VentraIP

Step-by-step guide for configuring riqle.com.au in VentraIP for Resend email sending.

---

## Important: Merging DNS Records

You already have some DNS records configured (I can see amazonses.com).

**DON'T DELETE YOUR EXISTING RECORDS!**

We'll be **adding** new records alongside your existing ones, and **merging** the SPF record.

---

## Step 1: Login to VentraIP

1. Go to: https://ventraip.com.au/
2. Click **"Sign In"** (top right)
3. Login with your credentials
4. Go to **"My Services"** → **"Domains"**
5. Click on **riqle.com.au**

---

## Step 2: Access DNS Management

1. In the riqle.com.au dashboard, look for **"DNS Records"** or **"Manage DNS"**
2. Click it to open the DNS management page
3. You should see your existing records listed

---

## Step 3: Add DKIM Record (New Record)

Click **"Add Record"** or **"Add DNS Record"**

**Settings:**

- **Type:** `TXT`
- **Host/Name:** `resend._domainkey`
- **Value/Content:** `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDU4bEzM7lACBU9Lkens7y/SWnETXDxmAXLD7F7s03bWYt3UvXsVFnFA9cTAlQyIhZyUZApv52POIZf5jGZ+vxMd1XE58ULa5k3uoTgkXgUmIpMejnHOm9kurxTY4HV7Cusq0mxKYQ2kg0R/iF2V2Lt6lqcb1YqYu1rTsGqOtiI0wIDAQAB`
- **TTL:** `3600` or `1 hour`

Click **"Save"** or **"Add Record"**

---

## Step 4: Update SPF Record (Merge with Existing)

**You already have this SPF record:**

```
v=spf1 include:amazonses.com ~all
```

**You need to MERGE it with Resend's SPF:**

```
v=spf1 include:spf.resend.com ~all
```

### How to Merge:

1. Find your existing SPF TXT record (the one with `include:amazonses.com`)
2. Click **"Edit"** on that record
3. Change the value from:

   ```
   v=spf1 include:amazonses.com ~all
   ```

   To:

   ```
   v=spf1 include:amazonses.com include:spf.resend.com ~all
   ```

4. Click **"Save"**

**Important:**

- ✅ Keep `include:amazonses.com` (for your existing email setup)
- ✅ Add `include:spf.resend.com` (for Resend)
- ✅ Keep `~all` at the end
- ❌ Don't create a second SPF record (you can only have one)

---

## Step 5: Update DMARC Record (Update Existing)

**You already have:**

```
v=DMARC1; p=none;
```

**Update it to include a reporting email:**

1. Find your existing DMARC TXT record (name is `_dmarc`)
2. Click **"Edit"**
3. Change the value to:
   ```
   v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au
   ```
4. Click **"Save"**

This adds email reporting so you can monitor email authentication.

---

## Step 6: Verify Records in VentraIP

After adding/updating all records, your DNS should look like this:

### TXT Records:

| Type | Name/Host           | Value                                                                                                                                                                                                                        |
| ---- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TXT  | `@`                 | `v=spf1 include:amazonses.com include:spf.resend.com ~all`                                                                                                                                                                   |
| TXT  | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDU4bEzM7lACBU9Lkens7y/SWnETXDxmAXLD7F7s03bWYt3UvXsVFnFA9cTAlQyIhZyUZApv52POIZf5jGZ+vxMd1XE58ULa5k3uoTgkXgUmIpMejnHOm9kurxTY4HV7Cusq0mxKYQ2kg0R/iF2V2Lt6lqcb1YqYu1rTsGqOtiI0wIDAQAB` |
| TXT  | `_dmarc`            | `v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au`                                                                                                                                                                            |

**Plus your existing records** (like MX records for amazonses.com)

---

## Step 7: Wait for DNS Propagation

DNS changes in VentraIP usually take **15-30 minutes** to propagate.

### Check if propagated:

```bash
# Check SPF record (should show both amazonses and resend)
dig TXT riqle.com.au +short

# Check DKIM record (should show the long key)
dig TXT resend._domainkey.riqle.com.au +short

# Check DMARC record
dig TXT _dmarc.riqle.com.au +short
```

**Expected outputs:**

```
"v=spf1 include:amazonses.com include:spf.resend.com ~all"

"p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDU4bEzM7lACBU9Lkens7y/SWnETXDxmAXLD7F7s03bWYt3UvXsVFnFA9cTAlQyIhZyUZApv52POIZf5jGZ+vxMd1XE58ULa5k3uoTgkXgUmIpMejnHOm9kurxTY4HV7Cusq0mxKYQ2kg0R/iF2V2Lt6lqcb1YqYu1rTsGqOtiI0wIDAQAB"

"v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au"
```

---

## Step 8: Verify in Resend Dashboard

1. Go to: https://resend.com/domains
2. Find `riqle.com.au`
3. Click **"Verify"**
4. Wait for green checkmarks ✅

If verification fails:

- Wait another 15 minutes
- Click "Verify" again
- DNS can take up to 1 hour to fully propagate

---

## VentraIP-Specific Tips

### If you can't find DNS Records option:

- Look for **"DNS Zone Editor"**
- Or **"Advanced DNS"**
- Or **"Manage DNS Records"**

### If VentraIP asks for "@" vs domain name:

- For root domain records, use `@`
- For subdomains, just enter the subdomain part:
  - `resend._domainkey` (NOT `resend._domainkey.riqle.com.au`)
  - `_dmarc` (NOT `_dmarc.riqle.com.au`)

### Common VentraIP Field Names:

| What guide says | What VentraIP shows |
| --------------- | ------------------- |
| Name/Host       | Host Record         |
| Value/Content   | Points To           |
| TTL             | Time To Live        |

---

## Quick Summary for VentraIP:

**✅ Add new DKIM record:**

- Host: `resend._domainkey`
- Type: `TXT`
- Points To: `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDU4bEzM7lACBU9Lkens7y/SWnETXDxmAXLD7F7s03bWYt3UvXsVFnFA9cTAlQyIhZyUZApv52POIZf5jGZ+vxMd1XE58ULa5k3uoTgkXgUmIpMejnHOm9kurxTY4HV7Cusq0mxKYQ2kg0R/iF2V2Lt6lqcb1YqYu1rTsGqOtiI0wIDAQAB`

**✅ Edit existing SPF record:**

- Change: `v=spf1 include:amazonses.com ~all`
- To: `v=spf1 include:amazonses.com include:spf.resend.com ~all`

**✅ Edit existing DMARC record:**

- Change: `v=DMARC1; p=none;`
- To: `v=DMARC1; p=none; rua=mailto:dmarc@riqle.com.au`

---

## What NOT to Do:

❌ Don't delete your amazonses.com records
❌ Don't create a second SPF record
❌ Don't remove existing MX records
❌ Don't worry about CNAME/A records (those are for your website)

---

## Need Help?

**VentraIP Support:**

- Phone: 1300 783 783
- Email: support@ventraip.com.au
- Live Chat: Available on their website

**Tell them:** "I need to add DNS TXT records for email authentication (SPF, DKIM, DMARC)"

---

## After DNS is Added:

**Tell me when:**

1. ✅ You've added all records in VentraIP
2. ✅ 30 minutes have passed
3. ✅ Resend shows domain as verified

Then I'll update the code to use `noreply@riqle.com.au` instead of the sandbox email.
