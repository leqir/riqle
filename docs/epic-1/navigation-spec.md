# navigation model: boring by design

> **principle:** navigation exists to help, not to impress. always visible. always predictable. always accessible.
> **tone:** lowercase. calm. no surprises.

---

## core philosophy

**the problem:**

- clever navigation confuses employers
- hidden menus create friction
- animations delay comprehension
- inconsistent patterns break trust

**the solution:**

- boring horizontal nav (desktop)
- standard hamburger menu (mobile)
- always visible (no hiding on scroll)
- current page clearly marked
- zero animation overhead

**user feeling:**

- "i know where i am."
- "i know where i can go."
- "navigation doesn't get in my way."

---

## desktop navigation

### structure

```
[riqle]              about | work | writing | startups | resources | contact
 ↑                                    ↑
logo                        current page (chalk underline)
```

**components:**

- logo/wordmark (left): "riqle" in chalk typography
- navigation links (right): horizontal list
- current page indicator: chalk underline effect

**spacing:**

- logo-to-nav gap: `auto` (flexbox justify-between)
- nav link spacing: 32-40px between items
- header padding: 24px vertical, 48px horizontal
- max-width: 1280px (centered)

### visual treatment

**default state (not current page):**

```css
{
  color: chalk-white (#f5f5f0);
  opacity: 0.70;
  text-decoration: none;
  font-family: apple sf (body font);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.02em;
  transition: opacity 300ms ease;
}
```

**hover state:**

```css
{
  opacity: 1.0;
  /* subtle neon cyan glow */
  text-shadow: 0 0 8px rgba(0, 229, 255, 0.3);
  transition: all 200ms ease;
}
```

**active/current page state:**

```css
{
  opacity: 1.0;
  position: relative;
  font-weight: 500;
}

/* chalk underline effect */
::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: neon-cyan (#00e5ff);
  opacity: 0.8;
  border-radius: 1px;
  /* slight hand-drawn imperfection */
  transform: rotate(-0.3deg);
}
```

**focus state (keyboard navigation):**

```css
{
  outline: 2px solid neon-cyan (#00e5ff);
  outline-offset: 4px;
  border-radius: 2px;
}
```

---

## mobile navigation

### structure (closed state)

```
[riqle]                                                    [☰]
 ↑                                                          ↑
logo                                                   hamburger
```

**breakpoint:** `< 768px`

**components:**

- logo/wordmark (left): "riqle" in chalk typography
- hamburger icon (right): hand-drawn three lines

### structure (open state)

```
[riqle]                                                    [✕]

about
work
writing
startups
resources
contact
```

**menu behavior:**

- slides in from right (or fades in - TBD based on feel)
- full-screen overlay
- dark background (chalk-charcoal with 95% opacity)
- links stack vertically
- close button (hand-drawn X)

**link styling:**

```css
/* mobile nav link */
{
  display: block;
  padding: 20px 32px;
  font-size: 28px;
  font-family: chalk font (nanum pen script);
  color: chalk-white;
  text-decoration: none;
  opacity: 0.85;
  border-bottom: 1px solid rgba(245, 245, 240, 0.1);
}

/* current page */
{
  opacity: 1.0;
  color: neon-cyan (#00e5ff);
}

/* tap target */
{
  min-height: 44px; /* iOS accessibility guideline */
  min-width: 44px;
}
```

**animation (if any):**

- menu fade-in: 200ms ease
- link stagger (optional): 50ms delay per item
- respects `prefers-reduced-motion`

---

## navigation behavior rules

### always visible

```
- NO hiding on scroll
- NO collapsing on scroll
- NO auto-hide after timeout
- navigation stays fixed at top
```

**reasoning:**

- employer needs constant orientation
- hiding creates cognitive load
- scrolling up to reveal = friction

### consistent across pages

```
- same navigation on every page
- same link order
- same visual treatment
- same hover/active states
```

**exception:**

- optional: hide nav on full-screen modals (if we use them)
- otherwise: always present

### current page indication

```
desktop: chalk underline (neon cyan)
mobile: neon cyan text color
both: increased font weight (500)
```

**test:**

- user should know current page at a glance (< 1 second)

---

## keyboard navigation

### tab order

```
1. logo (if clickable)
2. about
3. work
4. writing
5. startups
6. resources
7. contact
```

**desktop:**

- tab moves focus right
- shift+tab moves focus left
- enter activates link
- focus visible (cyan outline)

**mobile:**

- tab opens menu (if closed)
- tab cycles through links (if open)
- escape closes menu
- enter activates link

### focus management

**when page loads:**

- focus NOT on navigation (goes to main content)
- skip-to-content link available (hidden unless focused)

**skip link:**

```html
<a href="#main-content" class="skip-link"> skip to main content </a>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: neon-cyan;
  color: chalk-charcoal;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

## accessibility (wcag aa compliance)

### aria labels

**desktop nav:**

```html
<nav aria-label="primary navigation">
  <ul role="list">
    <li>
      <a href="/about" aria-current="page">about</a>
    </li>
    <!-- ... -->
  </ul>
</nav>
```

**mobile nav:**

```html
<button aria-label="open navigation menu" aria-expanded="false" aria-controls="mobile-menu">
  <HandDrawnHamburger />
</button>

<nav id="mobile-menu" aria-label="primary navigation" hidden>
  <!-- links -->
</nav>
```

**current page:**

- use `aria-current="page"` on active link
- visual indicator (underline) matches semantic state

### color contrast

**text on background:**

- chalk-white (#f5f5f0) on chalk-charcoal (#1a1a1a)
- contrast ratio: 14.8:1 (exceeds wcag aa requirement of 4.5:1)

**neon cyan underline:**

- neon-cyan (#00e5ff) on chalk-charcoal
- contrast ratio: 11.2:1 (exceeds requirement)

**focus outline:**

- 2px solid neon-cyan
- 4px offset (clear separation from text)

### screen reader support

**navigation landmark:**

- wrapped in `<nav>` element
- labeled with `aria-label="primary navigation"`

**current page announcement:**

- `aria-current="page"` announces "current page" to screen readers
- visual underline reinforces for sighted users

**mobile menu state:**

- `aria-expanded` communicates menu open/closed state
- `aria-controls` links button to menu
- `hidden` attribute hides menu from screen readers when closed

---

## korean aesthetic integration

### logo/wordmark

**treatment:**

```
riqle
 ↑
chalk font (nanum pen script)
lowercase
slight rotation (-0.8deg)
hand-drawn imperfection
```

**optional:**

- korean annotation near logo: "집중" (focus) at 25% opacity
- positioned slightly above and right of logo

### navigation links (desktop)

**decoration (optional):**

- hand-drawn separator dots between links
- small decorative elements (chalk dust particles)
- subtle desk lamp glow effect on header background

**example:**

```
about  •  work  •  writing  •  startups  •  resources  •  contact
       ↑
   hand-drawn dot (not perfect circle)
```

### mobile menu

**background:**

- chalk-charcoal base (#1a1a1a)
- optional: faint desk lamp glow vignette
- optional: korean annotation "메뉴" (menu) watermark at 10% opacity

**close button:**

- hand-drawn X icon
- wobbly lines (not perfect)
- neon pink on hover (#ff2d6a)

---

## component implementation

### SiteHeader organism

```tsx
// components/organisms/SiteHeader.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChalkText } from '@/components/atoms/typography/ChalkText';
import { NavLink } from '@/components/molecules/NavLink';
import { HandDrawnHamburger } from '@/components/atoms/icons/HandDrawnHamburger';
import { HandDrawnX } from '@/components/atoms/icons/HandDrawnX';
import { COLORS } from '@/lib/design-tokens';

const NAV_LINKS = [
  { href: '/about', label: 'about' },
  { href: '/work', label: 'work' },
  { href: '/writing', label: 'writing' },
  { href: '/startups', label: 'startups' },
  { href: '/resources', label: 'resources' },
  { href: '/contact', label: 'contact' },
] as const;

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-chalk-charcoal border-chalk-white/10 sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-screen-xl px-6 py-6 sm:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="focus:outline-cyan">
            <ChalkText as="span" size="xl" className="-rotate-[0.8deg] transform">
              riqle
            </ChalkText>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="primary navigation" className="hidden md:block">
            <ul role="list" className="flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <NavLink href={href} isActive={pathname === href}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'close navigation menu' : 'open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="focus:outline-cyan p-2 md:hidden"
          >
            {mobileMenuOpen ? <HandDrawnX /> : <HandDrawnHamburger />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="primary navigation"
          className="bg-chalk-charcoal/95 fixed inset-0 top-[72px] z-40 backdrop-blur-sm md:hidden"
        >
          <ul role="list" className="p-6">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-chalk-white/10 block border-b px-8 py-5 text-2xl ${
                    pathname === href ? 'text-neon-cyan font-medium' : 'text-chalk-white/85'
                  } hover:text-neon-cyan focus:outline-cyan transition-colors`}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  <ChalkText as="span" size="lg">
                    {label}
                  </ChalkText>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
```

### NavLink molecule

```tsx
// components/molecules/NavLink.tsx
import Link from 'next/link';
import { BodyText } from '@/components/atoms/typography/BodyText';

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-chalk-white relative inline-block transition-all duration-200 ${isActive ? 'font-medium opacity-100' : 'opacity-70 hover:opacity-100'} focus:outline-neon-cyan focus:outline-2 focus:outline-offset-4 ${isActive ? 'after:bg-neon-cyan after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:rotate-[-0.3deg] after:rounded-[1px] after:opacity-80' : ''} hover:text-shadow-cyan`}
      aria-current={isActive ? 'page' : undefined}
    >
      <BodyText as="span" className="tracking-wide">
        {children}
      </BodyText>
    </Link>
  );
}
```

---

## navigation z-index hierarchy

```
z-index values (lowest to highest):
1. page content: 0
2. desk decorations: 1
3. sticky header: 50
4. mobile menu overlay: 40
5. mobile menu toggle: 50
6. modals (if any): 100
```

**reasoning:**

- header stays above content when scrolling
- mobile menu sits below header
- modals sit above everything (rare usage)

---

## performance considerations

### header optimization

**always rendered:**

- header HTML is part of every page
- no lazy loading (needed immediately)
- CSS critical (inline if possible)

**mobile menu:**

- conditionally render (only when open)
- OR render with `display: none` (choose based on performance testing)

**link prefetching:**

```tsx
<Link href="/work" prefetch={true}>
  work
</Link>
```

- prefetch on hover (next.js default)
- instant navigation feel

### animation budget

**allowed:**

- opacity transitions (cheap)
- color transitions (cheap)
- text-shadow on hover (acceptable)

**avoid:**

- transforms on scroll (expensive)
- parallax effects (expensive)
- complex filter effects (expensive)

**motion preferences:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## responsive breakpoints

```typescript
// lib/breakpoints.ts
export const BREAKPOINTS = {
  mobile: '0px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;
```

**navigation behavior:**

- `< 768px`: mobile menu (hamburger)
- `>= 768px`: desktop nav (horizontal)

**no intermediate states:**

- either mobile OR desktop
- clean switch at breakpoint
- no "tablet-specific" navigation

---

## sticky header behavior

### desktop

```css
header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: chalk-charcoal (#1a1a1a);
  border-bottom: 1px solid rgba(245, 245, 240, 0.1);
}
```

**on scroll:**

- header stays visible (no hiding)
- NO background color change
- NO size reduction
- NO animation

**reasoning:**

- employer always knows where navigation is
- no surprises
- boring = predictable = good

### mobile

```css
header {
  position: sticky;
  top: 0;
  z-index: 50;
}

/* when menu open */
#mobile-menu {
  position: fixed;
  top: 72px; /* header height */
  left: 0;
  right: 0;
  bottom: 0;
}
```

**scroll behavior:**

- header stays at top
- menu overlay prevents page scroll (body lock)
- closing menu restores scroll position

---

## navigation state management

### client-side routing

**use next.js Link component:**

```tsx
import Link from 'next/link';

<Link href="/work">work</Link>;
```

**benefits:**

- client-side navigation (no full page reload)
- prefetching on hover
- instant feel
- preserves scroll position (configurable)

### active page detection

```tsx
import { usePathname } from 'next/navigation';

const pathname = usePathname();
const isActive = pathname === '/work';
```

**edge cases:**

- `/work` active when on `/work`
- `/work` NOT active when on `/work/project-slug`
- solution: exact match for nav links

**future enhancement (if needed):**

```tsx
// partial match for parent pages
const isWorkSection = pathname.startsWith('/work');
```

### mobile menu state

```tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// close menu on route change
useEffect(() => {
  setMobileMenuOpen(false);
}, [pathname]);
```

**body scroll lock when menu open:**

```tsx
useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return () => {
    document.body.style.overflow = '';
  };
}, [mobileMenuOpen]);
```

---

## navigation testing checklist

**before launch:**

- [ ] desktop nav: all links visible above fold
- [ ] desktop nav: current page has cyan underline
- [ ] desktop nav: hover states work (opacity, glow)
- [ ] desktop nav: keyboard navigation works (tab, enter)
- [ ] desktop nav: focus visible (cyan outline)
- [ ] mobile nav: hamburger visible on mobile
- [ ] mobile nav: menu opens/closes correctly
- [ ] mobile nav: current page highlighted (cyan text)
- [ ] mobile nav: tap targets >= 44px
- [ ] mobile nav: closing menu restores scroll
- [ ] both: skip-to-content link works
- [ ] both: aria labels correct
- [ ] both: screen reader announces current page
- [ ] both: color contrast meets wcag aa
- [ ] both: respects prefers-reduced-motion
- [ ] both: no layout shift on page load
- [ ] both: navigation works with js disabled (progressive enhancement)

**manual testing:**

1. **keyboard only:**
   - tab through all nav links
   - verify focus visible
   - press enter to navigate
   - verify skip link accessible

2. **screen reader (voiceover/nvda):**
   - navigate to header
   - verify "primary navigation" announced
   - verify current page announced
   - verify all links accessible

3. **mobile devices (real device):**
   - tap hamburger
   - verify menu opens
   - tap link
   - verify navigation works
   - verify menu closes

4. **responsive:**
   - resize browser from 320px to 1920px
   - verify clean breakpoint switch (768px)
   - verify no horizontal scroll
   - verify no layout shift

---

## banned patterns (navigation)

**do NOT implement:**

- ❌ mega menus (dropdowns with multiple columns)
- ❌ hiding navigation on scroll down
- ❌ revealing navigation on scroll up
- ❌ animated logo on scroll
- ❌ shrinking header on scroll
- ❌ background color change on scroll
- ❌ parallax effects in header
- ❌ auto-closing mobile menu (user closes explicitly)
- ❌ nested navigation (no sub-menus)
- ❌ hover-based dropdowns (mobile can't hover)
- ❌ "scroll to top" button (use boring navigation)
- ❌ breadcrumb in header (goes in page content)
- ❌ search in header (separate page or icon if needed)
- ❌ notification badges (distracting)
- ❌ animated hamburger icon (three lines to X transformation)

**reasoning:**

- simplicity = clarity
- boring = predictable = trustworthy
- employer needs orientation, not entertainment

---

## navigation copy rules

### link labels

**use:**

- lowercase: "about" not "About"
- single word when possible: "work" not "my work"
- verbs for actions: "contact" (implied "contact me")
- nouns for content: "writing" (collection of essays)

**avoid:**

- clever names: "musings" instead of "writing" ❌
- jargon: "portfolio" instead of "work" ❌
- first person: "my work" instead of "work" ❌
- emoji: "📝 writing" ❌

### aria labels

**be explicit:**

```html
<!-- good -->
<nav aria-label="primary navigation">
  <!-- avoid -->
  <nav aria-label="main nav"></nav>
</nav>
```

**button labels:**

```html
<!-- good -->
<button aria-label="open navigation menu">
  <!-- avoid -->
  <button aria-label="menu"></button>
</button>
```

---

## edge cases and solutions

### very long page titles

**problem:** some pages might have long titles that affect layout

**solution:**

- keep nav link labels short (always)
- full page title goes in page content, not nav
- example: nav says "writing", page says "writing: essays about teaching, building, and learning"

### deep nested routes

**problem:** `/work/markpoint` should show "work" as active? or nothing?

**solution:**

- only top-level pages in navigation
- nav shows exact match only
- breadcrumb in page content shows depth
- example: on `/work/markpoint`, nav shows "work" active

**implementation:**

```tsx
const isActive = pathname === href || pathname.startsWith(href + '/');
```

### external links (if needed)

**problem:** what if we link to external site (markpoint.com)?

**solution:**

- external links NOT in primary navigation
- primary nav = internal pages only
- external links in footer or page content
- if absolutely necessary: add icon indicator

```tsx
<a href="https://markpoint.com" target="_blank" rel="noopener noreferrer">
  markpoint <ExternalLinkIcon />
</a>
```

---

## implementation priority

### phase 1 (mvp)

- basic desktop nav (horizontal links)
- current page indication (underline)
- mobile hamburger menu
- keyboard navigation
- aria labels

### phase 2 (polish)

- korean aesthetic (chalk font logo, hand-drawn icons)
- hover states (glow effects)
- focus states (custom outline)
- skip-to-content link
- scroll lock on mobile menu

### phase 3 (refinement)

- performance optimization
- animation timing refinement
- accessibility audit
- real device testing

---

## design token reference

```typescript
// lib/design-tokens.ts

export const NAV = {
  desktop: {
    height: '72px',
    padding: '24px 48px',
    linkGap: '32px',
    maxWidth: '1280px',
  },
  mobile: {
    height: '72px',
    padding: '16px 24px',
    menuPadding: '24px',
    linkPadding: '20px 32px',
    fontSize: '28px',
  },
  zIndex: {
    header: 50,
    mobileMenuOverlay: 40,
    mobileMenuButton: 50,
  },
} as const;

export const NAV_COLORS = {
  background: COLORS.chalk.charcoal,
  border: 'rgba(245, 245, 240, 0.1)',
  linkDefault: COLORS.chalk.white,
  linkDefaultOpacity: 0.7,
  linkHover: COLORS.chalk.white,
  linkHoverOpacity: 1.0,
  linkActive: COLORS.chalk.white,
  activeUnderline: COLORS.neon.cyan,
  focusOutline: COLORS.neon.cyan,
  mobileOverlay: 'rgba(26, 26, 26, 0.95)',
} as const;
```

---

**last updated:** january 3, 2026
**status:** navigation model defined. ready for component implementation.
**principle:** boring by design. always visible. always predictable. always accessible.
