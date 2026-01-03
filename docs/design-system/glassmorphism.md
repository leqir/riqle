# glassmorphism: velvet glass, not trendy blur

> **principle:** glass effects create depth perception, not decoration — subtle, functional, and accessible.

**last updated:** january 3, 2026
**status:** complete
**story:** 2.6 - define glassmorphism rules (velvet glass)

---

## glassmorphism philosophy

### the problem

glassmorphism became a trend in 2020-2022:

- heavy blur effects everywhere
- colorful transparent backgrounds
- low-contrast text over glass
- performance-killing backdrop-filters
- glass used decoratively, not functionally

this creates **visual noise** and **accessibility issues** — the opposite of the calm, readable interface we need.

### the solution

**"velvet glass" approach:**

- subtle blur (4-8px max, not 20px+)
- high contrast text over glass
- glass used sparingly for depth perception
- performance-conscious implementation
- functional purpose (overlay, header, modal), not decoration

### user feeling

when employer encounters glass effects, they should:

- **feel depth** — subtle layering, not flat
- **read clearly** — text always readable, never obscured
- **move smoothly** — no performance lag

they should NOT:

- notice the glass effect consciously ("oh, they used glassmorphism")
- struggle to read text
- experience janky scrolling

---

## "velvet glass" aesthetic

### visual characteristics

**velvet glass** is soft, subtle, and functional:

- very light blur (4-8px maximum)
- high background opacity (85-95%, not 50%)
- neutral tones (white/stone with slight transparency)
- subtle border for definition
- high-contrast text

```css
/* ✅ velvet glass: subtle and readable */
.glass-subtle {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(120, 113, 108, 0.1); /* stone-500 at 10% */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* ❌ trendy glass: obvious and distracting */
.glass-trendy {
  background: rgba(255, 255, 255, 0.3); /* too transparent */
  backdrop-filter: blur(24px); /* too blurred */
  border: 1px solid rgba(255, 255, 255, 0.3); /* low contrast */
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37); /* colorful shadow */
}
```

---

## glass usage rules

### rule 1: glass only for overlays

**use glass only when content needs to float above other content.**

approved use cases:

- sticky header (floats above scrolling content)
- modal backdrop (overlay on page)
- dropdown menus (float above page)
- tooltips (overlay on hover)

```tsx
// ✅ correct: sticky header with glass
<header className="sticky top-0 z-10 backdrop-blur-sm bg-white/90 border-b border-stone-200/50">
  <nav>navigation</nav>
</header>

// ❌ incorrect: glass on static card
<div className="backdrop-blur-md bg-white/50">
  <p>this card doesn't overlay anything — no need for glass</p>
</div>
```

---

### rule 2: maximum 8px blur

**blur values above 8px reduce readability and kill performance.**

```css
/* ✅ acceptable blur values */
backdrop-filter: blur(4px); /* subtle */
backdrop-filter: blur(6px); /* medium */
backdrop-filter: blur(8px); /* maximum */

/* ❌ excessive blur */
backdrop-filter: blur(12px); /* too much */
backdrop-filter: blur(20px); /* way too much */
backdrop-filter: blur(40px); /* accessibility violation */
```

---

### rule 3: minimum 85% opacity

**backgrounds must be mostly opaque to maintain text contrast.**

```tsx
// ✅ correct: high opacity
<div className="bg-white/90">  {/* 90% opaque */}
  <p className="text-stone-800">clearly readable text</p>
</div>

// ❌ incorrect: low opacity
<div className="bg-white/30">  {/* 30% opaque */}
  <p className="text-stone-800">text readability depends on background content</p>
</div>
```

---

### rule 4: text must meet WCAG AA over glass

**all text over glass must maintain 4.5:1 contrast ratio.**

test text contrast with worst-case background (darkest content showing through glass).

```tsx
// ✅ correct: dark text on light glass
<div className="backdrop-blur-sm bg-white/90">
  <p className="text-stone-900">
    high contrast text (19.8:1 ratio with white background)
  </p>
</div>

// ❌ incorrect: light text on light glass
<div className="backdrop-blur-sm bg-white/70">
  <p className="text-stone-400">
    low contrast text (varies by background, often fails WCAG)
  </p>
</div>
```

---

### rule 5: performance-first implementation

**test glass effects on low-end devices — if janky, remove or simplify.**

```tsx
// ✅ correct: conditional glass based on performance
<div className={`
  bg-white
  supports-[backdrop-filter]:bg-white/90
  supports-[backdrop-filter]:backdrop-blur-sm
`}>
  {/* fallback to solid white if backdrop-filter not supported */}
</div>

// ✅ correct: disable glass on mobile for performance
<div className="
  bg-white
  lg:bg-white/90
  lg:backdrop-blur-sm
">
  {/* solid on mobile, glass on desktop */}
</div>
```

---

### rule 6: always include fallback

**glass effects must have solid background fallback for unsupported browsers.**

```css
/* ✅ correct: progressive enhancement */
.glass {
  background: rgb(255, 255, 255); /* fallback: solid white */
}

@supports (backdrop-filter: blur(8px)) {
  .glass {
    background: rgba(255, 255, 255, 0.9); /* glass if supported */
    backdrop-filter: blur(8px);
  }
}

/* ❌ incorrect: no fallback */
.glass {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  /* browsers without backdrop-filter support get semi-transparent background with no blur */
}
```

---

### rule 7: subtle border for definition

**glass elements need subtle border to define edges.**

```tsx
// ✅ correct: border defines glass edge
<div className="
  backdrop-blur-sm
  bg-white/90
  border border-stone-200/50
">
  glass with subtle border
</div>

// ❌ incorrect: no border (edges blend into background)
<div className="backdrop-blur-sm bg-white/90">
  where does this element end?
</div>
```

---

### rule 8: no colored glass

**glass backgrounds must be neutral (white/stone), never colored.**

```tsx
// ✅ correct: neutral glass
<div className="backdrop-blur-sm bg-white/90">
  neutral, calm glass
</div>

// ❌ incorrect: colored glass
<div className="backdrop-blur-md bg-accent-400/50">
  distracting, trendy, fails contrast
</div>
```

---

## tailwind configuration

### glass utilities

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        // no xl/2xl — too much blur
      },

      // custom glass utilities
      backgroundColor: {
        'glass-subtle': 'rgba(255, 255, 255, 0.95)',
        'glass-medium': 'rgba(255, 255, 255, 0.90)',
        'glass-strong': 'rgba(255, 255, 255, 0.85)',
      },
    },
  },
};
```

---

## glass components

### GlassCard (subtle glass for overlays)

```tsx
// components/primitives/GlassCard.tsx
interface GlassCardProps {
  blur?: 'sm' | 'md' | 'lg';
  opacity?: 'subtle' | 'medium' | 'strong';
  children: React.ReactNode;
}

export function GlassCard({ blur = 'sm', opacity = 'medium', children }: GlassCardProps) {
  const blurMap = {
    sm: 'backdrop-blur-sm', // 4px
    md: 'backdrop-blur-md', // 6px
    lg: 'backdrop-blur-lg', // 8px
  };

  const opacityMap = {
    subtle: 'bg-white/95', // 95% opaque
    medium: 'bg-white/90', // 90% opaque
    strong: 'bg-white/85', // 85% opaque
  };

  return (
    <div
      className={` ${blurMap[blur]} ${opacityMap[opacity]} rounded-lg border border-stone-200/50 p-6 shadow-sm`}
    >
      {children}
    </div>
  );
}
```

---

### StickyHeader (glass header that floats)

```tsx
// components/layout/StickyHeader.tsx
export function StickyHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/50 bg-white transition-all supports-[backdrop-filter]:bg-white/90 supports-[backdrop-filter]:backdrop-blur-sm">
      <Container>{children}</Container>
    </header>
  );
}
```

---

### Modal (glass backdrop)

```tsx
// components/primitives/Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/20 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg border border-stone-200 bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
```

---

## usage patterns

### sticky navigation

```tsx
// app/components/SiteHeader.tsx
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/50 bg-white supports-[backdrop-filter]:bg-white/90 supports-[backdrop-filter]:backdrop-blur-sm">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href="/">riqle</Link>
          <div className="flex gap-6">
            <Link href="/work">work</Link>
            <Link href="/writing">writing</Link>
            <Link href="/about">about</Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
```

---

### dropdown menu

```tsx
// components/primitives/Dropdown.tsx
export function Dropdown({ isOpen, items }: DropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full z-10 mt-2 min-w-[200px] rounded-lg border border-stone-200/50 bg-white/95 p-2 shadow-lg backdrop-blur-sm">
      {items.map((item) => (
        <button
          key={item.id}
          className="w-full rounded px-4 py-2 text-left text-stone-700 transition-colors hover:bg-stone-50"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
```

---

### tooltip

```tsx
// components/primitives/Tooltip.tsx
export function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className="group relative">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded border border-stone-200/50 bg-white/95 px-3 py-1.5 text-xs text-stone-700 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100">
        {text}
      </div>
    </div>
  );
}
```

---

## accessibility requirements

### contrast testing

**test text contrast with worst-case backgrounds.**

```tsx
// testing approach
// 1. place glass element over dark content
// 2. measure text contrast with dark background showing through
// 3. ensure minimum 4.5:1 ratio

// ✅ passes even with dark background
<div className="bg-white/90 backdrop-blur-sm">
  <p className="text-stone-900">
    {/* stone-900 on white/90 = 17.8:1 ratio */}
    readable even over dark backgrounds
  </p>
</div>

// ❌ fails with dark background
<div className="bg-white/50 backdrop-blur-md">
  <p className="text-stone-600">
    {/* stone-600 on white/50 over dark = ~3:1 ratio */}
    fails contrast when over dark backgrounds
  </p>
</div>
```

---

### reduced motion

**respect `prefers-reduced-motion` for backdrop-blur animations.**

```css
/* ✅ correct: disable blur transitions if reduced motion preferred */
@media (prefers-reduced-motion: reduce) {
  .glass {
    backdrop-filter: none;
    background: rgb(255, 255, 255); /* solid fallback */
  }
}
```

---

### keyboard navigation

**glass overlays (modals, dropdowns) must trap focus.**

```tsx
// ✅ correct: modal traps focus
export function Modal({ isOpen, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // trap focus in modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements?.[0]) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  return (
    <div className="bg-stone-900/20 backdrop-blur-sm" ref={modalRef}>
      {children}
    </div>
  );
}
```

---

## performance optimization

### conditional rendering

**only render glass effects when necessary.**

```tsx
// ✅ correct: glass only when scrolled
export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 ${
        isScrolled ? 'border-b border-stone-200/50 bg-white/90 backdrop-blur-sm' : 'bg-transparent'
      } transition-all`}
    >
      navigation
    </header>
  );
}
```

---

### will-change optimization

**use `will-change` for scrolling glass elements.**

```css
/* ✅ optimize scrolling performance */
.sticky-glass {
  will-change: backdrop-filter;
  backdrop-filter: blur(8px);
}

/* remove will-change after scroll settles */
@media (prefers-reduced-motion: no-preference) {
  .sticky-glass:not(:hover) {
    will-change: auto;
  }
}
```

---

### mobile fallback

**disable glass on mobile for better performance.**

```tsx
// ✅ correct: solid background on mobile, glass on desktop
<header className="bg-white lg:bg-white/90 lg:backdrop-blur-sm">
  {/* mobile: solid white, desktop: glass */}
</header>
```

---

## anti-patterns (banned)

### ❌ excessive blur

```css
/* ❌ DO NOT: heavy blur */
.glass-heavy {
  backdrop-filter: blur(20px); /* way too much */
}

/* ✅ DO: subtle blur */
.glass-subtle {
  backdrop-filter: blur(6px); /* just enough */
}
```

---

### ❌ low opacity

```css
/* ❌ DO NOT: transparent backgrounds */
.glass-transparent {
  background: rgba(255, 255, 255, 0.3); /* text unreadable */
}

/* ✅ DO: mostly opaque */
.glass-readable {
  background: rgba(255, 255, 255, 0.9); /* high contrast */
}
```

---

### ❌ colored glass

```css
/* ❌ DO NOT: colored transparent backgrounds */
.glass-colored {
  background: rgba(34, 211, 238, 0.5); /* trendy, distracting */
  backdrop-filter: blur(12px);
}

/* ✅ DO: neutral glass */
.glass-neutral {
  background: rgba(255, 255, 255, 0.9); /* calm, readable */
  backdrop-filter: blur(6px);
}
```

---

### ❌ decorative glass

```tsx
// ❌ DO NOT: glass on static elements
<div className="backdrop-blur-md bg-white/70">
  <Card>
    static card with glass effect for no reason
  </Card>
</div>

// ✅ DO: glass only on overlays
<header className="sticky top-0 backdrop-blur-sm bg-white/90">
  glass used functionally (header floats over content)
</header>
```

---

### ❌ multiple glass layers

```tsx
// ❌ DO NOT: stacked glass effects
<div className="backdrop-blur-md bg-white/80">
  <div className="backdrop-blur-sm bg-white/70">
    <div className="backdrop-blur-lg bg-white/60">
      too much glass, performance nightmare
    </div>
  </div>
</div>

// ✅ DO: single glass layer
<div className="backdrop-blur-sm bg-white/90">
  one glass layer is enough
</div>
```

---

### ❌ no fallback

```css
/* ❌ DO NOT: glass without fallback */
.glass-no-fallback {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  /* unsupported browsers get semi-transparent background with no blur */
}

/* ✅ DO: progressive enhancement */
.glass-fallback {
  background: rgb(255, 255, 255); /* solid fallback */
}

@supports (backdrop-filter: blur(8px)) {
  .glass-fallback {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
  }
}
```

---

### ❌ glass everywhere

```tsx
// ❌ DO NOT: glass on every component
<div className="space-y-4">
  <div className="backdrop-blur-sm bg-white/90">card 1</div>
  <div className="backdrop-blur-sm bg-white/90">card 2</div>
  <div className="backdrop-blur-sm bg-white/90">card 3</div>
  {/* visual noise, performance killer */}
</div>

// ✅ DO: glass sparingly for overlays only
<div className="space-y-4">
  <Card>card 1 (solid)</Card>
  <Card>card 2 (solid)</Card>
  <Card>card 3 (solid)</Card>
</div>
<header className="sticky top-0 backdrop-blur-sm bg-white/90">
  {/* only the floating header uses glass */}
</header>
```

---

## testing checklist

before shipping glass effects:

- [ ] blur ≤ 8px
- [ ] background opacity ≥ 85%
- [ ] text meets WCAG AA over worst-case background (4.5:1)
- [ ] glass only used on overlays (header, modal, dropdown, tooltip)
- [ ] solid background fallback for unsupported browsers
- [ ] subtle border defines glass edges
- [ ] no colored glass (white/stone only)
- [ ] performance tested on mobile (60fps scrolling)
- [ ] `prefers-reduced-motion` respected
- [ ] keyboard navigation works (focus trap in modals)

---

## alignment with visual north star

glassmorphism rules support the visual north star principles:

**visual north star: calm in first 30 seconds**
→ **glassmorphism: subtle blur (4-8px), high opacity**
✅ glass recedes, doesn't demand attention

**visual north star: restraint and discipline**
→ **glassmorphism: overlays only, never decorative**
✅ functional purpose, not trend-following

**visual north star: accessible by default**
→ **glassmorphism: high contrast text, solid fallbacks**
✅ readability never sacrificed for aesthetics

**visual north star: precise and intentional**
→ **glassmorphism: specific blur values, opacity ranges**
✅ measured approach, not arbitrary

**visual north star: apple internal tool aesthetic**
→ **glassmorphism: neutral tones, subtle depth**
✅ matches apple's refined use of translucency

---

## measuring success

glassmorphism is successful when:

### qualitative measures

- [ ] glass effects feel subtle, not obvious
- [ ] employers don't consciously notice glass
- [ ] text always readable over glass
- [ ] scrolling feels smooth (no jank)
- [ ] glass adds depth perception, not decoration

### quantitative measures

- [ ] blur ≤ 8px on all glass elements
- [ ] background opacity ≥ 85% on all glass elements
- [ ] 100% WCAG AA contrast over glass (4.5:1 minimum)
- [ ] 60fps scrolling on mobile with glass header
- [ ] glass used on < 5% of interface (overlays only)

---

**last updated:** january 3, 2026
**status:** complete
**principle:** glass effects create depth perception, not decoration — subtle, functional, and accessible.
