# typography system: the foundation of trust

> **principle:** typography does most of the work — visuals stay secondary, site feels calm and authoritative
> **rule:** only use defined text styles, no arbitrary font sizes

**last updated:** january 3, 2026
**status:** complete
**story:** 2.2 - implement typography system

---

## philosophy

good typography creates hierarchy without noise. on riqle, typography isn't decoration—it's the primary tool for communication, hierarchy, and trust.

**key beliefs:**

- **typography > decoration:** headings communicate authority through size and weight, not color or effects
- **restraint > variety:** 6 text styles total (display, h1, h2, h3, body, meta)
- **readability > aesthetics:** generous line height (1.6-1.7), readable line length (65-75ch max)
- **consistency > creativity:** defined styles only, no arbitrary sizes

---

## typeface selection

### primary font: inter

**chosen:** [inter](https://rsms.me/inter/) by rasmus andersson

**characteristics:**

- neutral modern grotesk
- high legibility (tall x-height, open apertures)
- variable font (performance benefit)
- professional without being corporate
- neutral without being bland

**why inter:**

- ✅ optimized for screens (tall x-height)
- ✅ variable font (one file, multiple weights/sizes)
- ✅ open source, self-hostable
- ✅ feels like apple san francisco (but more neutral)
- ✅ widely used in professional tools (linear, notion, etc.)

**alternatives considered:**

- **geist:** excellent, but too similar to vercel branding
- **untitled sans:** beautiful, but requires license
- **system fonts:** free/fast, but lack polish

**verdict:** inter strikes perfect balance of neutrality, readability, and quiet quality.

---

### secondary font: none (inter for everything)

**decision:** use inter for all text, including metadata.

**reasoning:**

- simpler is better (one font family)
- inter has enough weight range (100-900)
- metadata differentiation through:
  - lighter weight (inter 400 vs 600 for body)
  - smaller size (14px vs 16px)
  - muted color (stone-500 vs stone-700)

**no need for secondary font when weight/size/color create hierarchy.**

---

## font loading strategy

### using next/font for performance

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

**why next/font:**

- automatic font optimization
- self-hosting (no google fonts cdn)
- zero layout shift (size-adjust fallback)
- preloading critical fonts

**configuration choices:**

- `display: 'swap'`: show fallback immediately, swap when loaded (avoid foit)
- `subsets: ['latin']`: only load latin characters (reduce file size)
- `weight: ['400', '500', '600', '700']`: load only weights we use
- `variable: '--font-inter'`: css variable for tailwind

---

## typographic hierarchy

### display / hero (identity statements)

**usage:** homepage hero, page titles (rare, high-impact moments)

**specifications:**

```typescript
font-family: Inter
font-weight: 600-700 (semibold to bold)
font-size: clamp(2rem, 5vw, 4rem)  // 32px-64px responsive
line-height: 1.1-1.2
letter-spacing: -0.02em (tighter, more impact)
color: stone-900 (dark charcoal)
```

**tailwind class:** `text-display font-semibold text-stone-900`

**example use:**

```tsx
<h1 className="text-display font-semibold text-stone-900">nathanael lastname</h1>
```

---

### h1 (main page headings)

**usage:** main heading on every page (about, work, writing, etc.)

**specifications:**

```typescript
font-family: Inter
font-weight: 600 (semibold)
font-size: clamp(1.5rem, 3vw, 2.5rem)  // 24px-40px responsive
line-height: 1.3
letter-spacing: -0.01em (slightly tighter)
color: stone-900
```

**tailwind class:** `text-h1 font-semibold text-stone-900`

**example use:**

```tsx
<h1 className="text-h1 font-semibold text-stone-900">about</h1>
```

---

### h2 (section headings)

**usage:** section divisions, card group labels

**specifications:**

```typescript
font-family: Inter
font-weight: 600 (semibold)
font-size: clamp(1.25rem, 2vw, 1.75rem)  // 20px-28px responsive
line-height: 1.4
letter-spacing: normal
color: stone-900
```

**tailwind class:** `text-h2 font-semibold text-stone-900`

**example use:**

```tsx
<h2 className="text-h2 font-semibold text-stone-900">featured work</h2>
```

---

### h3 (component headings)

**usage:** card titles, list headings, subsection labels

**specifications:**

```typescript
font-family: Inter
font-weight: 500-600 (medium to semibold)
font-size: 1.125rem  // 18px
line-height: 1.5
letter-spacing: normal
color: stone-900
```

**tailwind class:** `text-h3 font-medium text-stone-900`

**example use:**

```tsx
<h3 className="text-h3 font-medium text-stone-900">project title</h3>
```

---

### body text

**usage:** all reading content (paragraphs, lists, descriptions)

**specifications:**

```typescript
font-family: Inter
font-weight: 400 (regular)
font-size: 1rem  // 16px (never smaller)
line-height: 1.7 (generous for readability)
letter-spacing: normal
color: stone-700 (soft charcoal, not pure black)
max-width: 65-75ch (readable line length)
```

**tailwind class:** `text-body text-stone-700 max-w-prose`

**example use:**

```tsx
<p className="text-body max-w-prose text-stone-700">
  i build data-heavy tools for technical users. 8 years building software.
</p>
```

---

### meta text (timestamps, tags, captions)

**usage:** dates, tags, image captions, secondary information

**specifications:**

```typescript
font-family: Inter
font-weight: 400 (regular)
font-size: 0.875rem  // 14px
line-height: 1.5
letter-spacing: normal
color: stone-500 (muted, 60-70% opacity feel)
```

**tailwind class:** `text-meta text-stone-500`

**example use:**

```tsx
<span className="text-meta text-stone-500">published january 2026</span>
```

---

## tailwind configuration

### typography scale

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        display: [
          'clamp(2rem, 5vw, 4rem)',
          {
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            fontWeight: '600',
          },
        ],
        h1: [
          'clamp(1.5rem, 3vw, 2.5rem)',
          {
            lineHeight: '1.3',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        h2: [
          'clamp(1.25rem, 2vw, 1.75rem)',
          {
            lineHeight: '1.4',
            fontWeight: '600',
          },
        ],
        h3: [
          '1.125rem',
          {
            lineHeight: '1.5',
            fontWeight: '500',
          },
        ],
        body: [
          '1rem',
          {
            lineHeight: '1.7',
          },
        ],
        meta: [
          '0.875rem',
          {
            lineHeight: '1.5',
          },
        ],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
```

---

## typography components

### heading components

```typescript
// components/typography/Heading.tsx

interface HeadingProps {
  level?: 'display' | 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level = 'h1', children, className = '' }: HeadingProps) {
  const styles = {
    display: 'text-display font-semibold',
    h1: 'text-h1 font-semibold',
    h2: 'text-h2 font-semibold',
    h3: 'text-h3 font-medium',
  };

  const Tag = level === 'display' ? 'h1' : level;

  return <Tag className={`${styles[level]} text-stone-900 ${className}`}>{children}</Tag>;
}
```

**usage:**

```tsx
<Heading level="h1">about</Heading>
<Heading level="h2">featured work</Heading>
<Heading level="h3">project title</Heading>
```

---

### text components

```typescript
// components/typography/Text.tsx

export function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-body text-stone-700 max-w-prose ${className}`}>{children}</p>;
}

export function Meta({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-meta text-stone-500 ${className}`}>{children}</span>;
}
```

**usage:**

```tsx
<Paragraph>i build data-heavy tools for technical users.</Paragraph>
<Meta>published january 2026</Meta>
```

---

## typography rules

### 1. generous line height

**body text:** 1.6-1.7 minimum (riqle uses 1.7)

**headings:** 1.1-1.4 depending on size

**why:** generous line height improves readability, creates breathing room, feels unhurried

**enforcement:**

```css
/* ❌ bad: too tight */
p {
  line-height: 1.2; /* difficult to read */
}

/* ✅ good: generous */
p {
  line-height: 1.7; /* easy to scan */
}
```

---

### 2. clear paragraph spacing

**margin between paragraphs:** 1.5em (24px with 16px text)

**avoid orphans/widows:** use `text-wrap: pretty` (supported in modern browsers)

```css
p {
  margin-bottom: 1.5em;
  text-wrap: pretty; /* avoid orphans */
}
```

---

### 3. left-aligned text (english)

**always left-aligned** for body text and headings

**never fully justified** (creates rivers of white space)

**center-aligned only for:** hero statements (rare, high-impact moments)

```css
/* ✅ default */
.text-content {
  text-align: left;
}

/* ❌ avoid */
.text-content {
  text-align: justify; /* creates rivers */
}
```

---

### 4. no gradient text

**solid colors only** for all text

**avoid:**

- gradient fills on headings
- color transitions
- multicolor text

**reasoning:** gradients reduce readability, feel trendy (not timeless)

```css
/* ❌ bad */
h1 {
  background: linear-gradient(to right, #000, #666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ✅ good */
h1 {
  color: theme('colors.stone.900');
}
```

---

### 5. no outlined text

**no text-stroke effects**

**reasoning:** reduces legibility, looks amateurish

```css
/* ❌ bad */
h1 {
  -webkit-text-stroke: 1px black;
}

/* ✅ good */
h1 {
  color: black;
}
```

---

### 6. maximum 1 font family

**inter for everything:**

- headings: inter 600-700
- body: inter 400
- meta: inter 400 (smaller, muted color)

**no secondary font needed** when weight/size/color create hierarchy

---

### 7. readable line length

**max-width: 65-75ch** for body text

**why:** optimal line length for reading is 50-75 characters

**implementation:**

```tsx
<p className="max-w-prose">{/* tailwind's max-w-prose is 65ch */}</p>
```

---

### 8. minimum font size: 16px

**never smaller than 16px** for body text

**meta text can be 14px** (but no smaller)

**why:** wcag aa compliance, mobile readability

```css
/* ✅ good */
body {
  font-size: 16px;
}

.meta {
  font-size: 14px; /* minimum for metadata */
}

/* ❌ bad */
.small-print {
  font-size: 12px; /* too small */
}
```

---

## responsive typography

### fluid scaling with clamp()

headings use `clamp()` for smooth responsive scaling:

```css
/* display: 32px-64px */
font-size: clamp(2rem, 5vw, 4rem);

/* h1: 24px-40px */
font-size: clamp(1.5rem, 3vw, 2.5rem);

/* h2: 20px-28px */
font-size: clamp(1.25rem, 2vw, 1.75rem);
```

**body text is fixed:** 16px (no scaling)

**why:** body text should be consistent size for readability

---

### mobile considerations

**mobile (< 768px):**

- display: 32-40px
- h1: 24-28px
- h2: 20-24px
- h3: 18px
- body: 16px (same as desktop)
- meta: 14px (same as desktop)

**desktop (≥ 768px):**

- display: 48-64px
- h1: 32-40px
- h2: 24-28px
- h3: 18px
- body: 16px
- meta: 14px

---

## tailwind typography plugin

### prose classes for markdown content

```typescript
// for markdown content (essays)
import '@tailwindcss/typography';

// usage
<article className="prose prose-stone max-w-prose">
  {/* markdown content */}
</article>
```

**customization:**

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: theme('colors.stone.700'),
            maxWidth: '65ch',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            h1: {
              color: theme('colors.stone.900'),
              fontWeight: '600',
            },
            h2: {
              color: theme('colors.stone.900'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.accent.DEFAULT'),
              textDecorationColor: theme('colors.accent.DEFAULT'),
              '&:hover': {
                color: theme('colors.accent.hover'),
              },
            },
          },
        },
      },
    },
  },
};
```

---

## usage examples

### homepage hero

```tsx
<div className="mx-auto max-w-4xl py-24 text-center">
  <h1 className="text-display mb-6 font-semibold text-stone-900">nathanael lastname</h1>
  <p className="text-h2 mb-8 text-stone-700">i build data-heavy tools for technical users.</p>
</div>
```

---

### about page

```tsx
<div className="mx-auto max-w-prose py-16">
  <h1 className="text-h1 mb-8 font-semibold text-stone-900">about</h1>

  <div className="space-y-6">
    <p className="text-body text-stone-700">
      i've been building software for 8 years. started in distributed systems (stripe, carta), moved
      to product engineering, now focused on ai-native tools.
    </p>
    <p className="text-body text-stone-700">
      based in san francisco. available for select contract work.
    </p>
  </div>
</div>
```

---

### project card

```tsx
<div className="rounded-lg border border-stone-200 p-6">
  <h3 className="text-h3 mb-2 font-medium text-stone-900">markpoint</h3>
  <p className="text-body mb-4 text-stone-700">
    context-aware writing tool for technical documentation.
  </p>
  <span className="text-meta text-stone-500">2024</span>
</div>
```

---

## testing requirements

typography system is successful when:

- [ ] all text sizes defined in tailwind config
- [ ] no arbitrary font sizes in components (`text-[20px]`)
- [ ] line heights generous (1.6-1.7 for body)
- [ ] text readable on all screen sizes (16px minimum)
- [ ] writing pages feel like essays (prose class)
- [ ] headings feel authoritative, not dramatic
- [ ] typography hierarchy is clear without thinking
- [ ] wcag aa contrast met (4.5:1 for text)
- [ ] no gradient text or text-stroke effects
- [ ] max line length enforced (65ch) for readability

---

## common mistakes to avoid

### ❌ arbitrary sizes

```tsx
/* bad: arbitrary size */
<h2 className="text-[22px]">heading</h2>

/* good: defined size */
<h2 className="text-h2">heading</h2>
```

---

### ❌ too many weights

```tsx
/* bad: too many font weights */
font-weight: 300;  // light
font-weight: 400;  // regular
font-weight: 500;  // medium
font-weight: 600;  // semibold
font-weight: 700;  // bold

/* good: stick to 400, 500, 600 */
body: 400
h3: 500
h1/h2/display: 600
```

---

### ❌ tight line height

```tsx
/* bad: cramped */
<p className="leading-tight">...</p>  // 1.25

/* good: generous */
<p className="leading-relaxed">...</p>  // 1.625 or use text-body (1.7)
```

---

### ❌ ignoring max-width

```tsx
/* bad: text spans full width */
<p className="w-full">very long line of text that is hard to read...</p>

/* good: readable line length */
<p className="max-w-prose">comfortable line length for reading...</p>
```

---

**last updated:** january 3, 2026
**status:** complete
**principle:** typography does most of the work — headings communicate authority through size and weight, not color or effects
