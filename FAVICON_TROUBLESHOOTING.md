# Favicon Not Showing - Troubleshooting Guide

## Problem

The KRAMIG bear favicon is deployed to riqle.vercel.app but not showing on riqle.com.au or in your browser.

## Root Cause

**Browser Favicon Caching** - Browsers aggressively cache favicons for up to 7 days or longer. Even after deploying new favicons, your browser may still show the old one.

## Solution

### Method 1: Hard Refresh (Quickest)

1. **Chrome/Edge**: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Firefox**: Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
3. **Safari**: Press `Cmd+Option+R` (Mac)

### Method 2: Clear Browser Cache

1. Open browser settings
2. Clear browsing data
3. Select "Cached images and files"
4. Clear data
5. Reload riqle.com.au

### Method 3: Force Favicon Reload (Chrome)

1. Open DevTools (F12)
2. Go to Application tab
3. Under "Storage" → Clear site data
4. Reload the page

### Method 4: Try Different Browser/Incognito

1. Open Incognito/Private window
2. Visit riqle.com.au
3. Favicon should show correctly (no cache)

### Method 5: Direct Favicon Check

Visit these URLs directly to verify they're working:

- https://www.riqle.com.au/favicon.ico
- https://www.riqle.com.au/favicon-32x32.png
- https://riqle.vercel.app/favicon.ico

If these load the KRAMIG bear, the issue is 100% browser cache.

## Verification

The favicons are correctly deployed:

```bash
✓ /public/favicon.ico (15KB) - KRAMIG bear
✓ /public/favicon-16x16.png (838B)
✓ /public/favicon-32x32.png (2.1KB)
✓ /public/apple-touch-icon.png (36KB)
```

Configured in `src/app/layout.tsx`:

```typescript
icons: {
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: '/apple-touch-icon.png',
}
```

## Still Not Working?

If none of the above work:

1. Close ALL browser windows/tabs
2. Restart browser completely
3. Visit riqle.com.au

The favicon cache is stored per browser profile, so if you've visited the site before with an old favicon, it will persist until forcefully cleared.

## For Future Favicon Changes

To avoid this issue when updating favicons in the future, you can add a version query parameter:

```typescript
icon: [{ url: '/favicon.ico?v=2', sizes: 'any' }];
```

This forces browsers to fetch the new icon.
