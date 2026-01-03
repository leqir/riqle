# accessibility & usability constraints: wcag aa compliance, keyboard-first, inclusive by default

> **principle:** accessible design is good design — everyone benefits from clear hierarchy, keyboard navigation, and semantic markup
> **rule:** wcag 2.1 level aa minimum, test with real assistive technology, design for keyboard-only users

**last updated:** january 3, 2026
**status:** complete
**story:** 1.11 - ensure accessibility and usability constraints

---

## core philosophy

**the problem:**

most portfolios are mouse-only, screen-reader-hostile, keyboard-inaccessible. employers with disabilities (or anyone using keyboard navigation for efficiency) can't navigate the site. violates ADA, excludes potential opportunities, signals carelessness.

**the solution:**

design for keyboard-first navigation. semantic HTML by default. test with real screen readers (NVDA, JAWS, VoiceOver). wcag aa compliance as baseline, not aspiration. accessibility improves usability for everyone.

**the anti-pattern:**

- custom widgets that break keyboard navigation
- images without alt text
- low contrast text
- focus states removed for aesthetic reasons
- "accessibility overlay" widgets (accessiBe, etc.) that don't actually fix problems

**the pattern:**

- semantic HTML (`<nav>`, `<main>`, `<article>`)
- keyboard navigation (tab, enter, escape, arrow keys)
- clear focus indicators (visible, high contrast)
- screen reader friendly (ARIA labels, live regions, alt text)
- sufficient color contrast (4.5:1 for text, 3:1 for UI elements)

**user feeling:**

"i can navigate this site with keyboard only. screen reader announces content clearly. focus indicator shows where i am. this person cares about details."

---

## wcag 2.1 level aa requirements

### 1. perceivable

#### 1.1 text alternatives

**requirement:** all non-text content must have text alternative

**implementation:**

```tsx
// ✅ good: descriptive alt text
<img src="markpoint-dashboard.png" alt="markpoint dashboard showing context window with 3 active documents" />

// ✅ good: decorative images hidden from screen readers
<svg aria-hidden="true" className="decorative-icon">
  {/* chalk decoration */}
</svg>

// ❌ bad: missing alt text
<img src="screenshot.png" />

// ❌ bad: redundant alt text
<a href="/work/markpoint">
  <img src="markpoint-logo.png" alt="markpoint logo click here to view project" />
  markpoint
</a>
// screen reader reads: "markpoint logo click here to view project, markpoint, link"
// fix: alt="" (image is decorative since link text exists)
```

**rules:**

- informative images: descriptive alt text (what's in the image)
- functional images (buttons, links): describe function (not appearance)
- decorative images: `alt=""` or `aria-hidden="true"`
- complex images (charts, diagrams): alt text + long description

---

#### 1.3 adaptable

**requirement:** content can be presented in different ways without losing information

**implementation:**

```tsx
// ✅ good: semantic HTML with logical heading structure
<main>
  <h1>about nathanael</h1>
  <section aria-labelledby="background-heading">
    <h2 id="background-heading">background</h2>
    <p>...</p>
  </section>
  <section aria-labelledby="expertise-heading">
    <h2 id="expertise-heading">expertise</h2>
    <h3>frontend</h3>
    <h3>backend</h3>
  </section>
</main>

// ❌ bad: skipping heading levels
<h1>about</h1>
<h3>background</h3>  // skipped h2
<h2>expertise</h2>   // went backwards

// ❌ bad: using headings for styling
<h4 className="small-text">note: this isn't actually a heading</h4>
```

**rules:**

- heading hierarchy: h1 → h2 → h3 (don't skip levels)
- one `<h1>` per page
- use semantic HTML (`<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`)
- reading order matches visual order
- don't use tables for layout

---

#### 1.4 distinguishable

**requirement:** make it easy to see and hear content (color contrast, text resize, no text in images)

**implementation:**

```tsx
// ✅ good: sufficient contrast (4.5:1 for body text)
const COLORS = {
  chalk: {
    charcoal: '#1a1a1a', // text
    white: '#f5f5f0', // background
  },
  // contrast ratio: 16.8:1 (passes AAA)
};

// ✅ good: color not sole indicator
<button className="text-neon-pink">
  ❌ delete  {/* icon + color + text */}
</button>

// ❌ bad: color alone indicates error
<input className="border-red-500" />  // red border, but no error text

// ✅ good: error indicated by text + color
<input className="border-red-500" aria-describedby="email-error" />
<span id="email-error" className="text-red-500">email required.</span>
```

**contrast ratios (wcag aa):**

- normal text (< 18pt): 4.5:1 minimum
- large text (≥ 18pt or bold ≥ 14pt): 3:1 minimum
- ui components (buttons, borders): 3:1 minimum
- decorative elements: no requirement

**riqle color contrast:**

| foreground                    | background               | ratio  | wcag aa       |
| ----------------------------- | ------------------------ | ------ | ------------- |
| chalk charcoal (#1a1a1a)      | chalk white (#f5f5f0)    | 16.8:1 | ✅ pass (AAA) |
| neon cyan (#00e5ff)           | chalk charcoal (#1a1a1a) | 8.9:1  | ✅ pass       |
| neon pink (#ff2d6a)           | chalk charcoal (#1a1a1a) | 5.2:1  | ✅ pass       |
| neon purple (#a855f7)         | chalk charcoal (#1a1a1a) | 6.1:1  | ✅ pass       |
| chalk charcoal/80 (#1a1a1acc) | chalk white (#f5f5f0)    | 12.5:1 | ✅ pass       |

**rules:**

- test contrast with [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
- don't rely on color alone (use icons + text)
- allow text resize up to 200% without loss of function
- no text in images (use real text with web fonts)

---

### 2. operable

#### 2.1 keyboard accessible

**requirement:** all functionality available via keyboard

**implementation:**

```tsx
// ✅ good: native button (keyboard accessible by default)
<button onClick={handleSubmit}>send message</button>

// ❌ bad: div as button (no keyboard support)
<div onClick={handleSubmit} className="button">send message</div>

// ✅ good: custom interactive element with keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  custom button
</div>

// ✅ good: skip to main content link
<a href="#main-content" className="sr-only focus:not-sr-only">
  skip to main content
</a>
<main id="main-content">{/* content */}</main>
```

**keyboard patterns:**

| interaction            | key             |
| ---------------------- | --------------- |
| navigate links/buttons | Tab / Shift+Tab |
| activate link/button   | Enter           |
| activate button        | Space           |
| close dialog/modal     | Escape          |
| navigate menu          | Arrow keys      |
| toggle dropdown        | Space / Enter   |
| select radio button    | Arrow keys      |
| check checkbox         | Space           |

**rules:**

- all interactive elements must be keyboard accessible
- tab order must be logical (matches visual order)
- no keyboard traps (can tab in and out of everything)
- provide skip links (skip to main content, skip navigation)
- custom widgets must implement keyboard support

---

#### 2.2 enough time

**requirement:** users have enough time to read and use content

**implementation:**

```tsx
// ✅ good: no time limits on interactions
<form onSubmit={handleSubmit}>{/* no session timeout */}</form>

// ❌ bad: auto-dismissing messages without control
<Toast message="saved" duration={2000} />  // disappears after 2s

// ✅ good: persistent message with manual dismiss
<Toast message="saved" onDismiss={() => setShowToast(false)} />
```

**rules:**

- no time limits unless necessary (and then: warn user, allow extension)
- auto-updating content: allow pause/stop
- auto-dismissing notifications: allow pause or extend time
- no auto-playing media (or provide controls)

---

#### 2.3 seizures and physical reactions

**requirement:** don't design content that causes seizures

**implementation:**

```tsx
// ❌ bad: flashing animation (> 3 times per second)
<div className="animate-flash" />  // can trigger seizures

// ✅ good: subtle fade-in (no flashing)
<div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
  {/* tooltip */}
</div>
```

**rules:**

- no flashing content (> 3 flashes per second)
- no parallax effects (can cause motion sickness)
- provide option to disable animations (prefers-reduced-motion)

---

#### 2.4 navigable

**requirement:** provide ways to help users navigate, find content, and determine where they are

**implementation:**

```tsx
// ✅ good: descriptive page title
<title>markpoint - context-aware writing tool | nathanael</title>

// ✅ good: multiple navigation methods
<header>
  <nav aria-label="main navigation">
    <a href="/">home</a>
    <a href="/work">work</a>
    <a href="/writing">writing</a>
  </nav>
</header>

<nav aria-label="breadcrumb">
  <ol>
    <li><a href="/">riqle</a></li>
    <li><a href="/work">work</a></li>
    <li aria-current="page">markpoint</li>
  </ol>
</nav>

// ✅ good: clear focus indicator
<a href="/work" className="focus:outline-2 focus:outline-offset-2 focus:outline-neon-cyan">
  see work
</a>

// ❌ bad: removed focus indicator
<button className="focus:outline-none">click me</button>
```

**rules:**

- descriptive page titles (unique for each page)
- multiple ways to navigate (menu, breadcrumbs, search, sitemap)
- clear focus indicators (visible, high contrast)
- link purpose clear from link text (no "click here")
- headings describe topic or purpose

---

#### 2.5 input modalities

**requirement:** make it easier to operate functionality through various inputs beyond keyboard

**implementation:**

```tsx
// ✅ good: large touch target (44×44px minimum)
<button className="min-h-[44px] min-w-[44px] px-4 py-2">send</button>

// ❌ bad: tiny touch target
<button className="p-1">×</button>  // 16×16px

// ✅ good: click anywhere on card
<a href="/work/markpoint" className="block p-6">
  <h3>markpoint</h3>
  <p>context-aware writing tool</p>
</a>

// ❌ bad: only text is clickable
<div className="p-6">
  <h3><a href="/work/markpoint">markpoint</a></h3>
  <p>context-aware writing tool</p>
</div>
```

**rules:**

- touch targets: 44×44px minimum (mobile)
- sufficient spacing between targets (8px minimum)
- don't require precise pointer movements
- support pointer cancel (drag away to cancel)

---

### 3. understandable

#### 3.1 readable

**requirement:** make text readable and understandable

**implementation:**

```tsx
// ✅ good: language declared
<html lang="en">

// ✅ good: language changes marked
<p>
  korean study room aesthetic emphasizes <span lang="ko">집중</span> (focus)
</p>

// ✅ good: abbreviations expanded on first use
<abbr title="Artificial Intelligence">AI</abbr>
```

**rules:**

- declare page language (`<html lang="en">`)
- mark language changes (`<span lang="ko">`)
- explain unusual words, idioms, jargon
- expand abbreviations on first use

---

#### 3.2 predictable

**requirement:** web pages appear and operate in predictable ways

**implementation:**

```tsx
// ✅ good: focus doesn't change context
<input
  onFocus={() => console.log('focused')}  // ok
  onFocus={() => router.push('/other')}  // ❌ unexpected navigation
/>

// ✅ good: consistent navigation across pages
<SiteHeader />  // same nav on every page

// ✅ good: consistent identification
<button className="primary-button">save</button>
// use same label/style for save button everywhere

// ❌ bad: inconsistent labels
<button>save</button>
<button>submit</button>
<button>send</button>
// same action, different labels (confusing)
```

**rules:**

- consistent navigation across pages
- consistent identification (same function = same label)
- no unexpected context changes on focus
- no unexpected context changes on input
- warn before major changes (navigation, submission)

---

#### 3.3 input assistance

**requirement:** help users avoid and correct mistakes

**implementation:**

```tsx
// ✅ good: clear error identification + suggestion
<input
  aria-invalid={errors.email ? 'true' : 'false'}
  aria-describedby="email-error"
/>
{errors.email && (
  <span id="email-error" role="alert" className="text-neon-pink">
    email required. format: name@company.com
  </span>
)}

// ✅ good: labels for all form fields
<label htmlFor="email">your email</label>
<input id="email" type="email" />

// ❌ bad: placeholder as label
<input placeholder="Email" />  // disappears when typing

// ✅ good: confirmation for destructive actions
<button onClick={() => {
  if (confirm('delete all data? this cannot be undone.')) {
    handleDelete();
  }
}}>
  delete account
</button>
```

**rules:**

- labels for all form fields
- error identification (which field, what's wrong)
- error suggestions (how to fix)
- confirmation for destructive actions
- ability to review/correct before final submission

---

### 4. robust

#### 4.1 compatible

**requirement:** maximize compatibility with current and future user agents, including assistive technologies

**implementation:**

```tsx
// ✅ good: semantic HTML
<nav aria-label="main navigation">
  <ul>
    <li><a href="/">home</a></li>
    <li><a href="/work">work</a></li>
  </ul>
</nav>

// ✅ good: ARIA when semantic HTML isn't enough
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  <h2 id="dialog-title">confirm deletion</h2>
  <button>delete</button>
  <button>cancel</button>
</div>

// ❌ bad: divs for everything
<div class="nav">
  <div class="link">home</div>
  <div class="link">work</div>
</div>
```

**rules:**

- use semantic HTML whenever possible
- use ARIA when semantic HTML isn't sufficient
- ensure all elements have complete start and end tags
- no duplicate IDs on page
- validate HTML (catch unclosed tags, etc.)

---

## keyboard navigation implementation

### site header keyboard navigation

```tsx
// components/organisms/SiteHeader.tsx

const NAV_LINKS = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/work', label: 'work' },
  { href: '/writing', label: 'writing' },
  { href: '/contact', label: 'contact' },
] as const;

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-chalk-cream bg-chalk-white border-b">
      {/* skip to main content link (visible on focus) */}
      <a
        href="#main-content"
        className="focus:bg-neon-cyan focus:text-chalk-charcoal sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:px-4 focus:py-2"
      >
        skip to main content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* logo */}
        <a href="/" className="font-chalk focus:outline-neon-cyan text-2xl focus:outline-offset-4">
          riqle
        </a>

        {/* desktop nav */}
        <nav aria-label="main navigation" className="hidden md:block">
          <ul className="flex gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-chalk-charcoal hover:text-neon-cyan focus:text-neon-cyan focus:outline-neon-cyan focus:outline-offset-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* mobile menu button */}
        <button
          aria-label="toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* mobile menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="mobile navigation"
          className="border-chalk-cream border-t md:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:bg-chalk-cream focus:bg-chalk-cream focus:outline-neon-cyan block px-6 py-3"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
```

**keyboard behavior:**

- Tab: move to skip link → logo → nav links → menu button
- Enter/Space on menu button: open/close mobile menu
- Tab through menu items (logical order)
- Escape: close mobile menu (future enhancement)

---

### modal dialog keyboard navigation

```tsx
// components/molecules/Modal.tsx

export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // trap focus inside modal
    const focusableElements = dialogRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      // close on escape
      if (e.key === 'Escape') {
        onClose();
      }

      // trap focus
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="bg-chalk-charcoal/80 fixed inset-0 z-50 flex items-center justify-center">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="bg-chalk-white max-w-lg rounded p-6 shadow-lg"
      >
        <h2 id="dialog-title" className="font-chalk mb-4 text-2xl">
          {title}
        </h2>

        <div className="mb-6">{children}</div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2">
            cancel
          </button>
          <button onClick={onClose} className="bg-neon-cyan text-chalk-charcoal px-4 py-2">
            confirm
          </button>
        </div>
      </div>
    </div>
  );
}
```

**keyboard behavior:**

- Opens: focus first focusable element
- Tab: cycle through focusable elements (trapped in dialog)
- Shift+Tab: cycle backwards
- Escape: close dialog
- Enter on buttons: activate
- Closes: return focus to trigger element

---

## screen reader support

### aria labels and live regions

```tsx
// components/molecules/SearchBox.tsx

export function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        search projects and essays
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          performSearch(e.target.value);
        }}
        placeholder="search..."
        aria-describedby="search-instructions"
        aria-controls="search-results"
        aria-expanded={results.length > 0}
      />

      <div id="search-instructions" className="sr-only">
        type to search. results will appear below.
      </div>

      {searching && (
        <div role="status" aria-live="polite" className="sr-only">
          searching...
        </div>
      )}

      {results.length > 0 && (
        <div id="search-results" role="listbox" aria-label="search results">
          <div role="status" aria-live="polite" className="sr-only">
            {results.length} results found
          </div>

          {results.map((result) => (
            <a
              key={result.id}
              href={result.url}
              role="option"
              className="hover:bg-chalk-cream block p-2"
            >
              {result.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
```

**aria usage:**

- `aria-label`: label for elements without visible text
- `aria-labelledby`: reference to element that labels current element
- `aria-describedby`: reference to element that describes current element
- `aria-live="polite"`: announce changes (not interrupting)
- `aria-live="assertive"`: announce changes immediately (errors)
- `role="status"`: for status messages
- `role="alert"`: for urgent messages

---

### screen reader only text

```tsx
// components/atoms/ScreenReaderOnly.tsx

export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

// tailwind sr-only class:
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

// usage:
<button>
  ❌
  <ScreenReaderOnly>delete</ScreenReaderOnly>
</button>
// screen reader: "delete, button"
// visual: ❌ icon only
```

---

## color contrast and visual design

### focus indicators

```css
/* global focus styles */
*:focus {
  outline: 2px solid var(--neon-cyan);
  outline-offset: 4px;
}

/* keyboard-only focus (no focus on mouse click) */
*:focus-visible {
  outline: 2px solid var(--neon-cyan);
  outline-offset: 4px;
}

*:focus:not(:focus-visible) {
  outline: none;
}
```

**requirements:**

- visible focus indicator (2px minimum)
- high contrast (3:1 against background)
- not obscured by other content
- consistent across site

---

### text sizing and spacing

```css
/* allow text resize up to 200% */
html {
  font-size: 16px; /* base */
}

body {
  font-family: 'SF Pro Text', sans-serif;
  font-size: 1rem; /* 16px, scales with html font-size */
  line-height: 1.5; /* wcag aa: 1.5 minimum for body text */
}

h1,
h2,
h3 {
  font-family: 'Nanum Pen Script', cursive;
  line-height: 1.2; /* headings can be tighter */
}

p {
  margin-bottom: 1em;
  max-width: 65ch; /* readable line length */
}
```

**requirements:**

- line height: 1.5 minimum for body text
- paragraph spacing: 2× font size minimum
- letter spacing: 0.12× font size minimum (for justified text)
- max line length: 80 characters (65ch recommended)

---

## responsive and mobile accessibility

### touch targets

```tsx
// ✅ good: minimum 44×44px touch target
<button className="min-h-[44px] min-w-[44px] px-4 py-2">
  send message
</button>

// ✅ good: adequate spacing between targets
<div className="flex flex-wrap gap-4">
  <button>save</button>
  <button>cancel</button>
</div>

// ❌ bad: tiny, close together
<div className="flex gap-1">
  <button className="p-1">save</button>
  <button className="p-1">cancel</button>
</div>
```

---

### orientation and zoom

```html
<!-- ✅ allow pinch-zoom on mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- ❌ disable zoom (accessibility violation) -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

---

## testing checklist

### automated testing

- [ ] axe DevTools (browser extension)
- [ ] Lighthouse accessibility audit
- [ ] WAVE browser extension
- [ ] Pa11y CI (automated testing)
- [ ] validate HTML (catch unclosed tags, duplicate IDs)

### manual testing

- [ ] keyboard navigation (tab through entire site)
- [ ] screen reader (NVDA on Windows, VoiceOver on Mac, JAWS)
- [ ] zoom to 200% (text still readable, no horizontal scroll)
- [ ] check focus indicators (visible, high contrast)
- [ ] check color contrast (WebAIM contrast checker)
- [ ] test with grayscale (color not sole indicator)
- [ ] test with keyboard only (no mouse)
- [ ] test on mobile (touch targets, zoom)

### real user testing

- [ ] test with real screen reader users
- [ ] test with keyboard-only users
- [ ] test with low vision users
- [ ] test with motor disability users

---

## common accessibility issues & fixes

### issue 1: missing alt text

```tsx
// ❌ bad
<img src="project-screenshot.png" />

// ✅ fix
<img src="project-screenshot.png" alt="markpoint dashboard showing context window with 3 active documents" />

// ✅ decorative image
<img src="decoration.png" alt="" aria-hidden="true" />
```

---

### issue 2: low contrast text

```tsx
// ❌ bad: 2.5:1 (fails wcag aa)
<p className="text-gray-400 on bg-white">secondary text</p>

// ✅ fix: 4.8:1 (passes wcag aa)
<p className="text-gray-700 on bg-white">secondary text</p>
```

---

### issue 3: non-descriptive link text

```tsx
// ❌ bad
<a href="/work/markpoint">click here</a>

// ✅ fix
<a href="/work/markpoint">view markpoint project</a>

// ✅ alternative: visually hidden text
<a href="/work/markpoint">
  learn more
  <span className="sr-only"> about markpoint project</span>
</a>
```

---

### issue 4: form inputs without labels

```tsx
// ❌ bad: placeholder as label
<input placeholder="Email" type="email" />

// ✅ fix: visible label
<label htmlFor="email">your email</label>
<input id="email" type="email" />

// ✅ alternative: visually hidden label
<label htmlFor="email" className="sr-only">your email</label>
<input id="email" type="email" placeholder="name@company.com" />
```

---

### issue 5: removed focus indicator

```tsx
// ❌ bad
<button className="focus:outline-none">click me</button>

// ✅ fix
<button className="focus:outline-2 focus:outline-neon-cyan focus:outline-offset-4">
  click me
</button>

// ✅ custom focus style (still visible)
<button className="focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2">
  click me
</button>
```

---

### issue 6: custom widgets without keyboard support

```tsx
// ❌ bad: div as button
<div onClick={handleClick} className="button">
  submit
</div>

// ✅ fix: use native button
<button onClick={handleClick}>submit</button>

// ✅ alternative: add keyboard support to div
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  className="button"
>
  submit
</div>
```

---

### issue 7: error messages not associated with inputs

```tsx
// ❌ bad: error not programmatically associated
<input type="email" />
<span className="error">email required.</span>

// ✅ fix: aria-describedby
<input type="email" aria-invalid="true" aria-describedby="email-error" />
<span id="email-error" role="alert">
  email required.
</span>
```

---

## accessibility statement

**location:** `/accessibility` page

**content:**

```markdown
# accessibility

we're committed to ensuring riqle is accessible to everyone, including people with disabilities.

## conformance status

riqle conforms to wcag 2.1 level aa. this means we've designed the platform to be perceivable, operable, understandable, and robust for all users.

## features

- keyboard navigation (all functionality accessible without mouse)
- screen reader support (tested with nvda, jaws, voiceover)
- sufficient color contrast (4.5:1 minimum for text)
- clear focus indicators (visible on all interactive elements)
- semantic html (proper headings, landmarks, labels)
- responsive design (works at 200% zoom)

## testing

we regularly test with:

- automated tools (axe, lighthouse, wave)
- manual keyboard navigation
- screen readers (nvda on windows, voiceover on mac)
- real users with disabilities

## feedback

if you encounter accessibility barriers, please contact us at [email]. we'll respond within 3 business days and work to resolve the issue.

**last updated:** january 3, 2026
```

---

## implementation priority

### phase 1 (foundation)

- [ ] semantic HTML (header, main, nav, article, footer)
- [ ] heading hierarchy (h1 → h2 → h3)
- [ ] alt text for all images
- [ ] labels for all form inputs
- [ ] skip to main content link
- [ ] focus indicators (visible, high contrast)

### phase 2 (keyboard navigation)

- [ ] keyboard navigation (tab order, enter/space activation)
- [ ] escape to close modals
- [ ] focus trap in modals
- [ ] aria labels (navigation, dialogs, forms)
- [ ] aria-live regions (search results, notifications)

### phase 3 (polish)

- [ ] color contrast audit (all text, ui elements)
- [ ] screen reader testing (nvda, jaws, voiceover)
- [ ] keyboard-only testing (no mouse)
- [ ] zoom to 200% testing
- [ ] touch target sizing (mobile)
- [ ] accessibility statement page

---

**last updated:** january 3, 2026
**status:** complete
**principle:** accessible design is good design — wcag aa compliance minimum, keyboard-first, test with real assistive technology
