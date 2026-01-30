# Clear Browser Cache - Fix Hydration Errors

## Why This Is Needed

Your browser has cached old JavaScript bundles from before the Australian English changes (optimizing → optimising) and navigation updates. The **server is rendering correctly** (verified by incognito mode working perfectly), but your regular browser is loading old cached files.

## Quick Solution

### Option 1: Use Incognito Mode (Temporary)

- Open a new incognito/private window
- Navigate to http://localhost:3000
- No hydration errors because it bypasses cache

### Option 2: Hard Refresh (May Not Work)

Try this first, but it often doesn't clear JavaScript bundles:

- **macOS Chrome/Safari**: `Cmd + Shift + R`
- **macOS Firefox**: `Cmd + Shift + Delete`

### Option 3: Complete Cache Clear (Recommended)

#### Chrome:

1. Open DevTools (`Cmd + Option + I`)
2. **Right-click** the refresh button (top-left of browser)
3. Select **"Empty Cache and Hard Reload"**
4. Wait for page to reload

OR:

1. Go to `chrome://settings/clearBrowserData`
2. Time range: **"All time"**
3. Check ONLY: **"Cached images and files"**
4. Click **"Clear data"**
5. Restart Chrome
6. Go to http://localhost:3000

#### Safari:

1. Go to Safari → Settings (or press `Cmd + ,`)
2. Click "Advanced" tab
3. Enable "Show Develop menu in menu bar"
4. Go to Develop → **Empty Caches**
5. Close and reopen Safari
6. Go to http://localhost:3000

#### Firefox:

1. Press `Cmd + Shift + Delete`
2. Time range: **"Everything"**
3. Check ONLY: **"Cache"**
4. Click **"Clear Now"**
5. Restart Firefox
6. Go to http://localhost:3000

### Option 4: Nuclear Option (Guaranteed Fix)

If nothing else works:

1. **Close all browser windows completely**
2. Clear browser cache using Option 3
3. **Delete** `/Users/nathanael/Desktop/Projects/riqle/.next` folder (already done)
4. Restart your computer (flushes all OS-level caches)
5. Start dev server: `npm run dev`
6. Open browser and navigate to http://localhost:3000

### Option 5: Use Different Browser

If you have another browser installed (Chrome, Safari, Firefox, Edge):

- Open that browser
- Go to http://localhost:3000
- Should work perfectly with no hydration errors

---

## Understanding the Hydration Errors

### What You're Seeing:

```
Hydration failed because the server rendered text didn't match the client
- Server: "optimising for appearance"
- Client: "optimizing for appearance"
```

### Why It Happens:

1. **Server** (Next.js) generates HTML with correct Australian spelling: "optimising"
2. **Browser** loads cached JavaScript from before the change with "optimizing"
3. React compares them and finds mismatch → hydration error

### Why Incognito Works:

Incognito mode doesn't use cache, so it loads fresh JavaScript from the server (which is correct).

---

## Verification

After clearing cache, you should see:

- ✅ No hydration errors in console
- ✅ Correct spelling: "optimising" (not "optimizing")
- ✅ Header shows "changelog" (not "contact")
- ✅ Correct page counts: 11 pages and 18 pages

---

## Technical Details

**What was changed:**

- All American English → Australian English (optimizing → optimising, etc.)
- Page counts made dynamic (database field instead of hardcoded)
- Resources philosophy text updated with authentic copy
- Header navigation structure updated

**Cache locations:**

- Browser memory cache (RAM)
- Browser disk cache (~/.cache/...)
- Service worker cache (if any)
- Next.js build cache (.next folder) - already cleared
- OS DNS cache

**Why Next.js cache clearing didn't help:**
The `.next` folder is server-side build cache. Clearing it helps the server rebuild, but doesn't affect what's cached in your browser. The browser has its own separate cache for JavaScript, CSS, HTML, and images.

---

**Bottom line**: The code is correct. Your browser needs to forget about the old files and download the new ones.
