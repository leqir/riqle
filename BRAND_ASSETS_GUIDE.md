# Brand Assets Guide - Favicon & OG Images

To complete your SEO optimisation, you need to create brand assets for your website.

---

## Files Needed

### 1. Favicon (Website Icon)

**Location:** `/public/favicon.ico`
**Sizes:** Multi-resolution ICO file with 16x16, 32x32, 48x48
**Purpose:** Shows up in browser tabs, bookmarks, and search results

**How to create:**

1. Use Figma/Canva to design a simple logo or icon representing "Riqle"
2. Use https://favicon.io/ or https://realfavicongenerator.net/ to generate the ICO file
3. Download and place in `/public/favicon.ico`

**Design ideas:**

- Your initials "R" or "N"
- A minimal geometric shape that represents you
- Keep it simple - works at 16x16 pixels

### 2. Apple Touch Icon

**Location:** `/public/apple-touch-icon.png`
**Size:** 180x180px PNG
**Purpose:** Shows up when users save your site to iPhone/iPad home screen

### 3. General Icon (PWA)

**Location:** `/public/icon.png`
**Size:** 512x512px PNG
**Purpose:** Used for Progressive Web App functionality and Android home screen

### 4. Open Graph Image (Social Media)

**Location:** `/public/og-image.png`
**Size:** 1200x630px PNG or JPG
**Purpose:** Shows up when your website is shared on social media (Twitter, Facebook, LinkedIn, Instagram Stories)

**Design requirements:**

- 1200x630px (2:1 aspect ratio)
- Text should be large and readable (min 60px font)
- Important content in center (safe zone: 1200x600px)
- High contrast for visibility in small previews

**Content suggestions:**

```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│         RIQLE                               │
│         Nathanael                           │
│                                             │
│         Builder • Founder • Educator        │
│         Co-founder of MarkPoint             │
│                                             │
│                   riqle.com                 │
│                                             │
└─────────────────────────────────────────────┘
```

**Tools to create:**

- Figma (free): https://figma.com
- Canva (free): https://canva.com (has OG image template)
- Photopea (free, online Photoshop): https://photopea.com

---

## Quick Design Option (If You're in a Hurry)

### Option 1: Text-Only Minimal

1. Create 1200x630px image with your brand colours
2. Add large text: "RIQLE"
3. Add subtitle: "Nathanael - Builder, Founder, Educator"
4. Add domain: "riqle.com"
5. Keep it clean and readable

### Option 2: Use a Photo

1. Use a professional photo of yourself
2. Overlay text with your name and tagline
3. Ensure good contrast between text and image

### Option 3: Abstract/Geometric

1. Create a simple geometric pattern or gradient
2. Add your name in large, bold font
3. Add tagline underneath

---

## Brand Colours (From Your Site)

**Primary:**

- Blue: `#2563EB` (blue-600)
- Indigo: `#4F46E5` (indigo-600)
- Purple: `#9333EA` (purple-600)

**Neutral:**

- Stone-900: `#1C1917`
- Stone-700: `#44403C`
- White: `#FFFFFF`

**Suggested colour scheme:**

- Background: White or subtle gradient (blue-50 to purple-50)
- Text: Stone-900
- Accent: Blue-600 or Purple-600

---

## After Creating Assets

### 1. Place Files in Public Directory

```
/public/
├── favicon.ico          ✅ Required
├── apple-touch-icon.png ✅ Required
├── icon.png            ✅ Required
└── og-image.png        ✅ Required
```

### 2. Verify in Browser

- Favicon: Look at browser tab
- Open Graph: Share your site link on social media or use https://www.opengraph.xyz/

### 3. Update Root Layout (Already Done)

The code is already in place to use these images. As soon as you add the files, they'll work.

---

## Testing Your OG Image

**Free tools to preview:**

1. **Facebook Debugger:** https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
4. **OpenGraph.xyz:** https://www.opengraph.xyz/

Enter your URL (e.g., https://riqle.com) and it will show you how your OG image appears.

---

## Professional Option (If You Want to Hire Someone)

**Platforms:**

- Fiverr: $10-30 for favicon + OG image set
- 99designs: Contest for brand identity
- Upwork: Hire a designer

**What to ask for:**

- Favicon (ICO format with multiple sizes)
- Apple Touch Icon (180x180px PNG)
- App Icon (512x512px PNG)
- Open Graph image (1200x630px PNG)
- Consistent brand style across all assets

---

## Temporary Placeholder (If You Need Something NOW)

You can use text-only placeholders until you create proper designs:

### Quick OG Image with Text Only:

1. Go to https://www.canva.com
2. Search "Open Graph" template
3. Change text to "Riqle - Nathanael"
4. Download as PNG
5. Rename to og-image.png

This takes 5 minutes and is better than nothing!

---

## Current Status

Your site is configured to use these images:

- ✅ Code is ready in `/src/app/layout.tsx`
- ✅ Metadata points to `/og-image.png`
- ❌ Files don't exist yet (need to be created)

Next.js will gracefully handle missing images, but creating them will significantly improve your SEO and social sharing.

---

**Priority:** Medium-High
**Time required:** 30 minutes to 2 hours (depending on design experience)
**Cost:** Free (DIY) or $10-30 (hire designer)
