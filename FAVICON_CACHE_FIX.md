# How to Clear Favicon Cache and See KRAMIG

Your KRAMIG favicon is correctly installed, but browsers cache favicons aggressively. Here's how to force refresh:

## Quick Fix (Choose One Method)

### Method 1: Hard Refresh (Easiest)

1. **Close ALL browser tabs** with localhost:3001
2. **Clear cache**:
   - Mac Chrome: Cmd + Shift + Delete → Clear "Cached images and files"
   - Mac Safari: Cmd + Option + E (empty cache)
3. **Reopen**: http://localhost:3001
4. **Hard refresh**: Cmd + Shift + R (Mac) or Ctrl + Shift + R (Windows)

### Method 2: Incognito/Private Window

1. Open new **Incognito/Private window** (Cmd + Shift + N in Chrome)
2. Visit: http://localhost:3001
3. Should see KRAMIG immediately (no cache)

### Method 3: Direct Favicon URL

1. Visit directly: http://localhost:3001/favicon.ico
2. Should see KRAMIG image
3. Then visit: http://localhost:3001
4. Hard refresh: Cmd + Shift + R

### Method 4: Different Browser

If you were testing in Chrome, try Firefox or Safari - they have separate caches.

## Why This Happens

Browsers cache favicons for weeks/months because:

- They rarely change
- Reduces server requests
- Improves page load speed

Your old MarkPoint favicon was cached, so the browser doesn't even request the new one.

## Verify KRAMIG is Installed

Run this command to verify the file exists:

```bash
open /Users/nathanael/Desktop/Projects/riqle/public/favicon.ico
```

This should open the KRAMIG icon image.

## Production Note

When you deploy to Vercel/production:

- Users who never visited your site before will see KRAMIG immediately
- Returning visitors will see old favicon until their cache expires (1-7 days typically)
- You can't force users to clear cache, but new visitors are fine

## Still Not Working?

If none of the above work, check browser console:

1. Open DevTools (F12 or Cmd + Option + I)
2. Go to Network tab
3. Refresh page
4. Filter for "favicon"
5. Check if it's loading the correct file
