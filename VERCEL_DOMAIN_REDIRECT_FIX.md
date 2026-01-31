# Fix Vercel Domain Redirect (riqle.com.au → www)

## Problem

The redirect is coming from **Vercel**, not Cloudflare:

```
HTTP/2 307
server: Vercel
location: https://www.riqle.com.au/favicon.ico
```

Vercel is configured to redirect `riqle.com.au` → `www.riqle.com.au`, which breaks favicon loading.

## Solution: Update Vercel Domain Settings

### Step 1: Open Vercel Dashboard

**Option A - Via CLI:**

```bash
vercel project
# Opens browser to project page
```

**Option B - Direct Link:**
https://vercel.com/leqirs-projects/riqle/settings/domains

### Step 2: Navigate to Domains

1. Click your project name (`riqle`)
2. Go to **Settings** (top right)
3. Click **Domains** in the left sidebar

### Step 3: Check Current Configuration

You'll likely see:

```
Domain                Status
─────────────────────────────────────────
riqle.com.au         Redirect to www.riqle.com.au  ← THIS IS THE PROBLEM
www.riqle.com.au     Primary / Production
```

### Step 4: Remove the Redirect

**For `riqle.com.au` (apex domain):**

1. Click the **three dots (⋯)** next to `riqle.com.au`
2. Click **Edit**
3. You'll see a dropdown or checkbox for "Redirect to Domain"
4. **Uncheck** the redirect option OR select "None"
5. Make sure it's set to **"Production Branch (master)"**
6. Click **Save**

### Step 5: Verify Both Domains Are Production

After saving, both should show:

```
Domain                Status
─────────────────────────────────────────
riqle.com.au         Production (master)   ✓
www.riqle.com.au     Production (master)   ✓
```

**NOT:**

```
Domain                Status
─────────────────────────────────────────
riqle.com.au         Redirect to www...    ✗ BAD
www.riqle.com.au     Production            ✓
```

### Step 6: Test Immediately

No waiting needed - Vercel updates instantly:

```bash
curl -I https://riqle.com.au/favicon.ico
```

**Should return:**

```
HTTP/2 200
content-type: image/vnd.microsoft.icon
server: Vercel
```

**NOT:**

```
HTTP/2 307
location: https://www.riqle.com.au/favicon.ico
```

### Step 7: Clear Browser Cache

- **Mac**: Cmd+Shift+R
- **Windows**: Ctrl+Shift+R
- Or open incognito window

Then visit: https://riqle.com.au

**Favicon should appear!** 🐻

## Why This Works

**Before (with redirect):**

1. Browser requests `riqle.com.au`
2. Vercel returns 307 redirect to `www.riqle.com.au`
3. Browser loads www version
4. Browser requests `riqle.com.au/favicon.ico`
5. Vercel returns 307 redirect
6. **Browser doesn't follow redirect for favicon** ❌

**After (no redirect):**

1. Browser requests `riqle.com.au`
2. Vercel serves site directly (no redirect)
3. Browser requests `riqle.com.au/favicon.ico`
4. **Vercel serves favicon directly** ✅

## Common Questions

### "Do I need both domains?"

Yes! Some users type `riqle.com.au`, others type `www.riqle.com.au`. Both should work.

### "Which one is 'primary'?"

It doesn't matter - both can serve the same content. Vercel handles this automatically. Just make sure **neither redirects**.

### "Will this affect SEO?"

No. As long as both domains serve the same content (not redirect), search engines are happy. You can optionally add a canonical URL in your HTML to indicate preference.

### "Can I keep redirect for other reasons?"

Not if you want the favicon to work on both domains. The redirect breaks favicon loading on the apex domain.

## Troubleshooting

### Still seeing 307 redirect

1. Double-check you saved changes in Vercel
2. Try in incognito window (no cache)
3. Check you edited the apex domain (`riqle.com.au`), not www
4. Verify no redirect checkbox is selected

### Changes not taking effect

- Vercel changes are instant (no DNS propagation needed)
- Clear browser cache completely
- Check in different browser
- Ensure you're logged into correct Vercel account

### Can't find "Edit" option

- Click the three dots (⋯) next to the domain
- Or click directly on the domain name
- Should see "Edit" or "Remove" options

## Quick Commands to Verify

```bash
# Test apex domain
curl -I https://riqle.com.au/favicon.ico

# Test www domain
curl -I https://www.riqle.com.au/favicon.ico

# Both should return HTTP/2 200
# Neither should return HTTP/2 307
```

## Success Criteria

✅ `curl -I https://riqle.com.au/favicon.ico` returns 200
✅ `curl -I https://www.riqle.com.au/favicon.ico` returns 200
✅ Favicon appears in browser on riqle.com.au
✅ Favicon appears in browser on www.riqle.com.au

Done! 🎉
