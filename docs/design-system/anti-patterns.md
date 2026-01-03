# anti-patterns: explicit bans

**this document consolidates all anti-patterns from the design system into a single enforceable reference. these are not suggestions — they are explicit constraints to protect the visual north star.**

---

## philosophy

> **rule:** anti-patterns are as important as patterns. knowing what _not_ to build prevents visual debt and protects the core design intent.

**why anti-patterns matter:**

- patterns tell you what to build. anti-patterns tell you what never to build
- preventing bad design is faster than fixing it later
- explicit bans reduce decision fatigue ("can i use this?" → "no, it's banned")
- anti-patterns protect the calm, intentional aesthetic from trend-chasing

**enforcement:**

- code review checklist includes anti-pattern audit
- automated linting rules flag violations
- design reviews use this document as rejection criteria
- zero tolerance: if it's banned here, it doesn't ship

---

## visual & layout anti-patterns

### ❌ visual noise

**banned:**

- background patterns (textures, grids, noise overlays)
- multiple competing focal points on a single page
- decorative elements with no functional purpose
- "hero" sections with parallax scrolling
- full-bleed images without restraint (max 1-2 per page)

**why banned:**
these create visual clutter and undermine the calm, intentional aesthetic.

**instead:**

- generous white space (minimum 48px between sections)
- single focal point per viewport
- every element must serve understanding or navigation

---

### ❌ layout chaos

**banned:**

- arbitrary spacing values not in 8px scale (e.g., `mt-[23px]`)
- breaking vertical rhythm (inconsistent line-height multipliers)
- overlapping content zones (text over images without proper contrast)
- asymmetric layouts without clear intention
- negative margins for "clever" overlaps

**why banned:**
arbitrary spacing creates inconsistency. vertical rhythm breaks feel sloppy.

**instead:**

- use spacing tokens only: `space-y-{2|4|6|8|12|16|24}`
- maintain 1.7 line-height for body, 1.1-1.3 for headings
- clear visual hierarchy through spacing alone

---

## typography anti-patterns

### ❌ font chaos

**banned:**

- using multiple font families (we use Inter exclusively)
- font weights outside of 400, 500, 600, 700
- text gradients or color effects on typography
- outlined/stroked text
- all-caps body text (headings are acceptable if intentional)
- italic text for emphasis (use weight or color instead)

**why banned:**
multiple fonts feel unfocused. decorative text effects feel gimmicky.

**instead:**

- Inter variable font with specified weights only
- hierarchy through size and weight, not font family
- emphasis through `font-medium` (500) or color change

---

### ❌ sizing madness

**banned:**

- arbitrary font sizes outside the type scale
- responsive text using `vw` without clamp() constraints
- text smaller than 14px (0.875rem) for body content
- display text larger than 64px (4rem) without justification

**why banned:**
type scale exists to prevent random sizing. too-small text fails accessibility.

**instead:**

- use defined scale: `text-{body|caption|h3|h2|h1|display}`
- responsive sizing via clamp() only
- minimum body text: 16px (1rem)

---

## color anti-patterns

### ❌ color explosion

**banned:**

- pure black (#000000) or pure white (#ffffff) for text
- colored text on colored backgrounds (must be text-on-neutral or neutral-on-color)
- gradients (linear, radial, conic — all banned)
- multiple accent colors (we have one: cyan #22d3ee)
- "creative" color usage outside of stone palette and cyan accent

**why banned:**
color restraint is the foundation. multiple accents feel unfocused.

**instead:**

- stone palette for 95% of interface
- cyan accent for 5% (interactive elements only)
- neutral backgrounds with colored accents, never colored backgrounds

---

### ❌ contrast failures

**banned:**

- text contrast below WCAG AA (4.5:1 for body, 3:1 for large)
- light text on light backgrounds (e.g., stone-300 on white)
- colored glass with insufficient contrast
- accent color on non-white backgrounds without testing

**why banned:**
accessibility is non-negotiable. poor contrast excludes users.

**instead:**

- use tested combinations from color system doc
- stone-900 on white (19.8:1) for headings
- stone-600 on white (7.8:1) for body
- accent-400 on white (4.9:1) for interactive

---

## component anti-patterns

### ❌ prop bloat

**banned:**

```tsx
// ❌ NO: too many props, becomes unmanageable
<Button
  variant="primary"
  size="medium"
  rounded={true}
  shadow="large"
  hoverEffect="lift"
  animationDuration={300}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  loading={false}
  disabled={false}
  fullWidth={false}
  customClass="extra-styles"
/>
```

**why banned:**
every prop is a decision point. configuration hell leads to inconsistency.

**instead:**

```tsx
// ✅ YES: composition over configuration
<Button variant="primary" size="md">
  <Icon /> click me
</Button>
```

- max 3-4 props per component
- compose complex UIs from simple primitives
- variant + size + children is usually enough

---

### ❌ accessibility bypasses

**banned:**

- clickable divs without role, tabIndex, keyboard handlers
- links styled as buttons (use <button> for actions, <a> for navigation)
- images without alt text
- form inputs without labels
- icon buttons without aria-label
- focus indicators removed via `outline: none` without replacement

**why banned:**
accessibility is baked in by default, never bolted on later.

**instead:**

- semantic HTML first (button, a, input, label)
- ARIA labels on all icon-only buttons
- custom focus indicators if removing default
- keyboard support for all interactive elements

---

## glassmorphism anti-patterns

### ❌ excessive blur

**banned:**

- backdrop-filter blur > 8px (feels gimmicky)
- glass effects on non-overlay content (e.g., card backgrounds)
- opacity below 85% (fails contrast requirements)
- colored glass (tinted backgrounds other than neutral white/stone)
- glass on glass (nested blur effects)

**why banned:**
heavy blur is a trend that ages poorly. low opacity fails accessibility.

**instead:**

- max 8px blur for subtle depth
- min 85% opacity for WCAG compliance
- neutral colors only (white or stone)
- overlays and modals only, never primary content

---

## motion & animation anti-patterns

### ❌ motion overload

**banned:**

- page transitions (fade in/out on route changes)
- loading animations (spinners, skeleton screens with shimmer)
- parallax scrolling (different scroll speeds for elements)
- scroll-triggered animations (elements flying in on scroll)
- auto-playing anything (videos, carousels, typewriter effects)
- animations longer than 300ms
- easing curves other than `ease-out` or `ease-in-out`

**why banned:**
motion draws attention. too much motion = constant distraction.

**instead:**

- hover/focus feedback only (100-200ms)
- state transitions (accordion expand, modal open: 200-300ms)
- mandatory `prefers-reduced-motion: reduce` support
- instant transitions (0ms) for reduced-motion users

---

### ❌ missing accessibility fallbacks

**banned:**

- animations without prefers-reduced-motion support
- motion as the only indicator of state change (must have visual change too)
- infinite animations (even subtle ones)

**why banned:**
motion can cause vestibular disorders. accessibility is non-negotiable.

**instead:**

```css
/* ✅ YES: mandatory reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## hand-drawn anti-patterns

### ❌ decoration overload

**banned:**

- hand-drawn elements on > 5% of interface
- decorative flourishes with no functional purpose
- hand-drawn borders around content
- multiple hand-drawn elements on a single screen
- hand-drawn backgrounds or textures
- hand-drawn icons (use Heroicons)

**why banned:**
hand-drawn elements are surgical warmth, not a theme. overuse feels childish.

**instead:**

- max 1-2 hand-drawn elements per page
- functional use only (arrows guide, underlines emphasize)
- < 5% of total interface area
- must support understanding or navigation

---

## iconography anti-patterns

### ❌ decorative icons

**banned:**

- icons without adjacent text (unless aria-label provided)
- icons as decoration (e.g., random icons scattered in margins)
- mixing icon styles (outline + solid, or multiple libraries)
- custom-drawn icons when Heroicons equivalent exists
- icon-only navigation without labels
- icons larger than 24px (unless hero/feature)

**why banned:**
icons clarify, never decorate. mixed styles feel inconsistent.

**instead:**

- Heroicons outline exclusively
- max 20 unique icons across entire site
- icons support text, never replace it (except icon buttons with aria-label)
- consistent sizing: sm (16px), md (20px), lg (24px)

---

## page-specific anti-patterns

### ❌ homepage noise

**banned:**

- auto-playing hero videos
- carousels (automatic or manual)
- social media follower counts
- "latest blog posts" feeds with > 3 items
- multiple CTAs above the fold (max 1 primary action)
- featuring > 2 projects on homepage

**why banned:**
homepage is first impression. noise = distrust. focus = credibility.

**instead:**

- one h1 (name)
- one-sentence positioning
- 1-2 featured projects max
- single clear CTA
- max 10 total items above fold

---

### ❌ /work page chaos

**banned:**

- filtering UI (tags, search, categories)
- "load more" pagination (all projects visible immediately)
- project cards with > 4 data points
- sorting controls (chronological reverse only)
- project counts or stats

**why banned:**
employer wants to see work, not navigate complex UI.

**instead:**

- chronological grid (reverse)
- all projects visible (no pagination if < 20 projects)
- card content: thumbnail, title, one-line description, year
- click → project detail page

---

### ❌ /essays verbosity

**banned:**

- essay excerpts longer than 2 sentences
- category/tag clouds
- "popular posts" sidebar
- related posts with complex logic
- reading time estimations (e.g., "5 min read")

**why banned:**
employer scanning for thinking depth, not reading blog UI.

**instead:**

- title + one-line thesis
- publication date
- chronological reverse order
- click → full essay

---

### ❌ project detail overload

**banned:**

- multi-step galleries (lightboxes, carousels)
- video embeds that auto-play
- "tech stack" lists with > 6 items
- "my role" descriptions longer than 2 sentences
- metrics without context (e.g., "10,000 users" without explaining why it matters)

**why banned:**
project pages prove capability. proof = artifacts + outcomes, not prose.

**instead:**

- hero image (single, large)
- problem/solution (2-3 paragraphs total)
- artifacts (code snippets, design screenshots, deployed links)
- outcomes (specific metrics with context)
- tech stack (max 6 key technologies)

---

## engagement manipulation anti-patterns

### ❌ dark patterns

**banned:**

- newsletter signup modals (especially on entry or exit)
- cookie consent that defaults to "accept all"
- "notify me" prompts for browser notifications
- social proof ("1,247 people viewed this today")
- artificial scarcity ("only 2 spots left")
- email collection gates (must view content without signup)

**why banned:**
manipulation destroys trust. employers expect professionalism, not growth hacks.

**instead:**

- optional newsletter signup in footer only
- no tracking beyond essential analytics
- no popups, no interruptions
- content freely accessible

---

## technical anti-patterns

### ❌ performance killers

**banned:**

- multiple font files (we use Inter variable only)
- images without next/image optimization
- client-side data fetching for static content
- animations without will-change or transform
- JavaScript bundles > 200kb initial load
- third-party scripts (analytics allowed, everything else banned)

**why banned:**
slow sites signal sloppiness. performance = professionalism.

**instead:**

- next/image for all images
- static generation for all content pages
- CSS transforms for animations
- minimal JavaScript (progressive enhancement)
- Vercel Analytics only (no Google Analytics, no social pixels)

---

## enforcement checklist

**use this checklist in every code review:**

### visual

- [ ] no background patterns or textures
- [ ] max 1-2 focal points per page
- [ ] all spacing values from 8px scale
- [ ] vertical rhythm maintained (line-height consistent)

### typography

- [ ] Inter font exclusively
- [ ] font weights: 400, 500, 600, 700 only
- [ ] no text gradients, outlines, or effects
- [ ] type scale sizes only (no arbitrary values)

### color

- [ ] no pure black or pure white
- [ ] no gradients
- [ ] cyan accent only (no multiple accent colors)
- [ ] WCAG AA contrast minimums met

### components

- [ ] max 3-4 props per component
- [ ] semantic HTML (button, a, input, label)
- [ ] ARIA labels on icon buttons
- [ ] keyboard navigation works

### glassmorphism

- [ ] max 8px blur
- [ ] min 85% opacity
- [ ] overlays only (not primary content)
- [ ] neutral colors only

### motion

- [ ] max 300ms duration
- [ ] prefers-reduced-motion support exists
- [ ] no auto-play
- [ ] no parallax or scroll-triggered animations

### hand-drawn

- [ ] < 5% of interface
- [ ] functional purpose (not decorative)
- [ ] max 1-2 elements per page

### icons

- [ ] Heroicons outline exclusively
- [ ] < 20 unique icons total
- [ ] aria-label on icon-only buttons
- [ ] consistent sizing (sm/md/lg)

### page-specific

- [ ] homepage: max 2 featured projects
- [ ] no carousels, no auto-play
- [ ] no newsletter popups
- [ ] no social proof or engagement manipulation

### performance

- [ ] images via next/image
- [ ] no third-party scripts (except Vercel Analytics)
- [ ] JavaScript bundle < 200kb initial

---

## automated linting rules

**tailwind configuration can enforce some anti-patterns:**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // enforce spacing scale (no arbitrary values)
      spacing: {
        // only allow defined tokens
      },
      // enforce font family
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // no other font families allowed
      },
      // enforce type scale
      fontSize: {
        // only defined sizes (body, caption, h3, h2, h1, display)
      },
    },
  },
  // block arbitrary values in production
  safelist: [], // explicitly empty
  blocklist: [
    // block common violations
    'text-black',
    'text-white',
    'bg-gradient-*',
  ],
};
```

**eslint can catch component anti-patterns:**

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    // enforce alt text on images
    'jsx-a11y/alt-text': 'error',
    // enforce aria-label on icon buttons
    'jsx-a11y/aria-props': 'error',
    // block clickable divs
    'jsx-a11y/no-static-element-interactions': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
  },
};
```

---

## rejection examples

**design review rejections based on this document:**

### example 1: color gradient rejected

```tsx
// ❌ REJECTED: gradients are banned
<h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
  welcome
</h1>

// ✅ APPROVED: solid color from system
<h1 className="text-stone-900">
  welcome
</h1>
```

---

### example 2: arbitrary spacing rejected

```tsx
// ❌ REJECTED: arbitrary value outside 8px scale
<div className="mt-[23px] mb-[17px]">
  content
</div>

// ✅ APPROVED: spacing tokens only
<div className="space-y-6">
  content
</div>
```

---

### example 3: prop bloat rejected

```tsx
// ❌ REJECTED: too many configuration props
<Card
  variant="outlined"
  elevation={3}
  rounded="large"
  shadow="medium"
  hoverEffect="lift"
  animationDuration={200}
/>

// ✅ APPROVED: composition over configuration
<Card>
  <CardContent>
    {children}
  </CardContent>
</Card>
```

---

### example 4: decorative icons rejected

```tsx
// ❌ REJECTED: decorative icon with no function
<div className="flex items-center gap-2">
  <SparklesIcon className="w-5 h-5" />
  <p>check out my latest project</p>
</div>

// ✅ APPROVED: icon clarifies action
<button>
  <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
  view project
</button>
```

---

## final note

**this document is a living rejection filter. if you're unsure whether something is allowed:**

1. check if it's explicitly banned here → if yes, don't build it
2. check if it supports the visual north star → if no, don't build it
3. ask: "does this make the site calmer or noisier?" → if noisier, don't build it

**when in doubt, default to restraint.**

the design system exists to protect employers from visual noise and protect you from decision fatigue. these anti-patterns are not suggestions — they're guardrails that let you move fast without breaking things.
