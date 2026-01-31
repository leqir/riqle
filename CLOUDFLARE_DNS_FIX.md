# Cloudflare DNS Configuration for riqle.com.au

## Current Problem

- `riqle.com.au` redirects (307) to `www.riqle.com.au`
- Browsers don't follow redirects for favicon requests
- Result: Favicon works on www.riqle.com.au but not riqle.com.au

## Root Cause

Your DNS is managed through Cloudflare (nameservers: dara.ns.cloudflare.com, salvador.ns.cloudflare.com).

Currently:

- `riqle.com.au` → `216.198.79.1` (redirect service)
- `www.riqle.com.au` → Vercel (`cname.vercel-dns.com`)

The apex domain (riqle.com.au) is using a redirect instead of pointing directly to Vercel.

## Solution: Configure Both to Point Directly to Vercel

### Step 1: Log into Cloudflare

1. Go to https://dash.cloudflare.com
2. Select `riqle.com.au` domain
3. Click "DNS" in the left sidebar

### Step 2: Update DNS Records

Set these records:

#### For Apex Domain (riqle.com.au)

```
Type: A
Name: @
Content: 76.76.21.21
Proxy: ON (orange cloud icon)
TTL: Auto
```

#### For WWW Subdomain (www.riqle.com.au)

```
Type: CNAME
Name: www
Content: cname.vercel-dns.com
Proxy: ON (orange cloud icon)
TTL: Auto
```

**Alternative for Apex (if CNAME flattening supported):**

```
Type: CNAME
Name: @
Content: cname.vercel-dns.com
Proxy: ON
```

### Step 3: Remove Any Redirects

1. Go to **Rules** → **Page Rules** (or **Redirect Rules**)
2. Look for any redirect from `riqle.com.au` → `www.riqle.com.au`
3. **Delete** that redirect rule
4. Save changes

### Step 4: Wait for Propagation

- DNS changes take 5-10 minutes to propagate
- Some browsers may cache up to 1 hour

### Step 5: Verify

After waiting, test both URLs:

```bash
# Both should return HTTP 200 (not 307)
curl -I https://riqle.com.au/favicon.ico
curl -I https://www.riqle.com.au/favicon.ico
```

Then visit:

- https://riqle.com.au (favicon should appear)
- https://www.riqle.com.au (favicon should appear)

### Step 6: Clear Browser Cache

- **Mac**: Cmd+Shift+R
- **Windows**: Ctrl+Shift+R
- Or open incognito/private window

## Why This Fixes It

**Before:**

1. Browser requests `riqle.com.au`
2. Gets 307 redirect to `www.riqle.com.au`
3. Browser requests `riqle.com.au/favicon.ico`
4. Gets 307 redirect to `www.riqle.com.au/favicon.ico`
5. **Browser doesn't follow redirect for favicon** ❌

**After:**

1. Browser requests `riqle.com.au`
2. Cloudflare serves content directly from Vercel
3. Browser requests `riqle.com.au/favicon.ico`
4. **Cloudflare serves favicon directly** ✅

## Troubleshooting

### "I still see 307 redirect"

- Wait longer (DNS can take up to 1 hour)
- Check you removed ALL page rules/redirects in Cloudflare
- Try clearing your browser's DNS cache:
  - Chrome: chrome://net-internals/#dns → "Clear host cache"
  - Mac: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`

### "Which is my primary domain?"

- Both should work equally (no redirect)
- Most users prefer `www.riqle.com.au` for consistency
- But `riqle.com.au` should also serve content directly

### "Can I keep the redirect for other pages?"

- No - if you redirect the apex domain, favicon won't load
- Both domains should serve the same content
- Vercel handles this automatically when both point to it

## Quick Reference

| Domain           | DNS Type | Points To            | Status     |
| ---------------- | -------- | -------------------- | ---------- |
| riqle.com.au     | A        | 76.76.21.21          | ✅ Proxied |
| www.riqle.com.au | CNAME    | cname.vercel-dns.com | ✅ Proxied |

Both domains → Same Vercel deployment → Favicon works everywhere!
