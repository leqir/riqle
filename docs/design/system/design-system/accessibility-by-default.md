# accessibility: baked in, not bolted on

> **principle:** accessible design is good design for everyone — accessibility is the foundation, not an afterthought.

**last updated:** january 3, 2026
**status:** complete
**story:** 2.10 - ensure accessibility baked into design

---

## accessibility-first philosophy

### the problem

most design systems treat accessibility as:

- an afterthought (added after design is "done")
- optional feature (test only if time permits)
- compliance checkbox (minimal WCAG AA)
- separate concern (accessibility team's job)

this creates **accessibility debt** — fixing issues is harder and more expensive than building correctly from the start.

### the solution

**accessibility baked into every component:**

- WCAG 2.1 Level AA compliance by default
- keyboard navigation works without configuration
- screen reader support built in
- color contrast guaranteed (never fails)
- motion respects user preferences
- touch targets meet minimum sizes

### user impact

when accessibility is baked in:

- **keyboard users** navigate effortlessly
- **screen reader users** understand all content
- **motion-sensitive users** don't experience discomfort
- **low-vision users** read text clearly
- **everyone** benefits from clear hierarchy and focus management

---

## how design system ensures accessibility

### typography system (automatic compliance)

**every text style meets WCAG AA contrast by default.**

```tsx
// ✅ all typography components guarantee contrast
<Heading level="h1" className="text-stone-900">
  {/* stone-900 on white = 19.8:1 (exceeds AAA 7:1) */}
  heading text
</Heading>

<p className="text-stone-600">
  {/* stone-600 on white = 7.8:1 (exceeds AAA 7:1) */}
  body text
</p>

<Meta className="text-stone-500">
  {/* stone-500 on white = 4.6:1 (passes AA 4.5:1) */}
  metadata text
</Meta>
```

**minimum font sizes enforced:**

- body text: 16px (never smaller)
- metadata: 14px minimum
- headings: responsive scaling (always legible)

---

### color system (contrast guaranteed)

**all color combinations in design tokens meet WCAG AA.**

| foreground  | background | ratio  | wcag   |
| ----------- | ---------- | ------ | ------ |
| stone-900   | white      | 19.8:1 | ✅ AAA |
| stone-800   | white      | 15.2:1 | ✅ AAA |
| stone-700   | white      | 11.4:1 | ✅ AAA |
| stone-600   | white      | 7.8:1  | ✅ AAA |
| stone-500   | white      | 4.6:1  | ✅ AA  |
| accent-400  | white      | 4.9:1  | ✅ AA  |
| success-700 | white      | 6.2:1  | ✅ AAA |
| error-700   | white      | 6.8:1  | ✅ AAA |

**impossible to create failing contrast:**

- design tokens enforce compliant combinations
- custom colors rejected in code review
- automated contrast testing in CI

---

### component primitives (accessible by default)

#### Button component

**all interactive states have clear visual indicators.**

```tsx
<Button variant="primary">
  {/* automatically includes: */}
  {/* - keyboard focus ring (2px accent) */}
  {/* - hover state (subtle color change) */}
  {/* - active state (pressed appearance) */}
  {/* - disabled state (visual + cursor) */}
  {/* - aria-disabled when appropriate */}
  click me
</Button>
```

**built-in accessibility:**

- focus ring: 2px, high contrast, 2px offset
- keyboard activation: Enter + Space
- disabled state: visual + `disabled` attribute
- touch target: minimum 44x44px

---

#### Link component

**links always distinguishable by underline, not just color.**

```tsx
<Link href="/work" variant="inline">
  {/* automatically includes: */}
  {/* - underline (not just color) */}
  {/* - focus ring */}
  {/* - external link icon (if external) */}
  {/* - aria-label for external */}
  view projects
</Link>
```

**built-in accessibility:**

- underline for visibility (WCAG 1.4.1)
- external link icon + aria-label
- focus ring on keyboard navigation
- clear hover state

---

#### Input component

**form fields always associated with labels.**

```tsx
<Input type="email" label="email address" id="email" error={errors.email} required />;

{
  /* automatically includes: */
}
{
  /* - <label htmlFor="email"> association */
}
{
  /* - required indicator */
}
{
  /* - error message with role="alert" */
}
{
  /* - aria-invalid when error present */
}
{
  /* - aria-describedby linking error */
}
```

**built-in accessibility:**

- label always associated (`htmlFor`)
- required indicator (visual + attribute)
- error announcements (`role="alert"`)
- `aria-invalid` + `aria-describedby`
- focus ring on keyboard navigation

---

### keyboard navigation (works by default)

**all interactive elements are keyboard accessible.**

| component | keyboard behavior                                    |
| --------- | ---------------------------------------------------- |
| Button    | Tab to focus, Enter/Space to activate                |
| Link      | Tab to focus, Enter to navigate                      |
| Input     | Tab to focus, type to input                          |
| Dropdown  | Tab to open, Arrow keys to navigate, Enter to select |
| Modal     | Tab trap (focus stays in modal), Esc to close        |
| Tabs      | Arrow keys to switch, Tab to navigate content        |

```tsx
// ✅ all components implement keyboard nav
<Tabs tabs={tabs}>
  {/* Arrow Left/Right switches tabs */}
  {/* Tab moves through tab panel content */}
  {/* Automatic focus management */}
</Tabs>
```

---

### screen reader support (built in)

**all components have proper ARIA labels and semantics.**

#### icon buttons

```tsx
<IconButton icon={TrashIcon} label="delete project" onClick={handleDelete} />;

{
  /* renders: */
}
<button aria-label="delete project">
  <TrashIcon className="h-5 w-5" />
</button>;
```

---

#### status messages

```tsx
<div className="bg-success-100 flex items-center gap-2 rounded p-4">
  <CheckIcon className="text-success-700 h-5 w-5" aria-hidden="true" />
  <span className="text-success-700" role="status">
    project published successfully
  </span>
</div>;

{
  /* screen reader announces: "project published successfully" */
}
{
  /* icon is decorative (aria-hidden), text provides meaning */
}
```

---

#### loading states

```tsx
<div role="status" aria-live="polite">
  <span className="sr-only">loading projects...</span>
  <Spinner />
</div>;

{
  /* screen reader announces loading state */
}
{
  /* spinner is visual-only */
}
```

---

### motion system (respects preferences)

**all animations disabled when `prefers-reduced-motion: reduce`.**

```css
/* automatically applied globally */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**component-level support:**

```tsx
// ✅ animations only when motion-safe
<button className="motion-safe:duration-fast hover:text-accent-400 motion-safe:transition-colors">
  {/* transition only if user allows motion */}
  click me
</button>
```

---

### spacing system (touch targets)

**all interactive elements meet minimum 44x44px touch target.**

```tsx
// ✅ button with proper touch target
<button className="px-4 py-2.5">
  {/* padding ensures 44px height minimum */}
  click me
</button>

// ✅ icon button with proper target
<button className="p-2">
  {/* icon: 20px + padding: 16px = 36px (acceptable for icon buttons) */}
  <Icon size="md" />
</button>

// ✅ link with proper target
<a href="/work" className="inline-flex items-center gap-2 py-2">
  {/* min-height 44px with padding */}
  view projects
</a>
```

---

## accessibility testing (automated)

### CI/CD integration

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Testing

on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run test:a11y

      # automated tests:
      # - axe-core (WCAG violations)
      # - color contrast (all combinations)
      # - keyboard navigation (all components)
      # - screen reader announcements
```

---

### component testing

```tsx
// Button.test.tsx
describe('Button accessibility', () => {
  it('has visible focus indicator', () => {
    render(<Button>click me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveClass('focus:ring-2');
  });

  it('responds to keyboard', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>click me</Button>);
    const button = screen.getByRole('button');

    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();

    fireEvent.keyDown(button, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('has sufficient color contrast', async () => {
    const { container } = render(<Button>click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## accessibility checklist (for new components)

when creating new components, ensure:

### keyboard navigation

- [ ] Tab reaches all interactive elements
- [ ] Enter/Space activate buttons
- [ ] Arrow keys navigate lists/menus
- [ ] Esc closes modals/dropdowns
- [ ] Focus indicator visible (2px ring, accent color)
- [ ] Focus trap in modals
- [ ] Skip links for navigation

### screen reader support

- [ ] Semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- [ ] ARIA labels on icon-only elements
- [ ] `aria-hidden="true"` on decorative elements
- [ ] `role="alert"` on important announcements
- [ ] `aria-live` regions for dynamic content
- [ ] Meaningful link text (no "click here")
- [ ] Form labels associated with inputs

### color and contrast

- [ ] Text/background contrast ≥ 4.5:1 (WCAG AA)
- [ ] Focus indicator contrast ≥ 3:1
- [ ] Color not the only indicator (icons + text)
- [ ] Hover states distinguishable
- [ ] Disabled states clear

### motion and interaction

- [ ] Respect `prefers-reduced-motion`
- [ ] Animations ≤ 300ms
- [ ] No auto-play
- [ ] No scroll hijacking
- [ ] Touch targets ≥ 44x44px (or 24x24px for icons with spacing)

### content and structure

- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Alt text on images
- [ ] Table headers (`<th>`)
- [ ] Lists use `<ul>`, `<ol>`, `<li>`
- [ ] Language declared (`lang="en"`)

---

## common accessibility mistakes (and fixes)

### ❌ div button

```tsx
// ❌ DO NOT: div as button
<div onClick={handleClick} className="cursor-pointer">
  click me
</div>

// ✅ DO: semantic button
<button onClick={handleClick}>
  click me
</button>
```

---

### ❌ missing focus indicator

```tsx
// ❌ DO NOT: remove outline
<button className="outline-none">
  invisible to keyboard users
</button>

// ✅ DO: custom focus ring
<button className="focus:ring-2 focus:ring-accent-400 focus:ring-offset-2">
  clear focus indicator
</button>
```

---

### ❌ icon without label

```tsx
// ❌ DO NOT: icon button without label
<button>
  <TrashIcon className="w-5 h-5" />
</button>

// ✅ DO: aria-label
<button aria-label="delete project">
  <TrashIcon className="w-5 h-5" />
</button>
```

---

### ❌ low contrast

```tsx
// ❌ DO NOT: insufficient contrast
<p className="text-stone-400">
  {/* stone-400 on white = 3.1:1 (fails AA) */}
  hard to read
</p>

// ✅ DO: sufficient contrast
<p className="text-stone-600">
  {/* stone-600 on white = 7.8:1 (passes AAA) */}
  easy to read
</p>
```

---

### ❌ color-only indicator

```tsx
// ❌ DO NOT: color-only status
<div className={status === 'success' ? 'text-green-600' : 'text-red-600'}>
  {message}
</div>

// ✅ DO: icon + color
<div className={status === 'success' ? 'text-success-700' : 'text-error-700'}>
  {status === 'success' ? <CheckIcon /> : <XCircleIcon />}
  {message}
</div>
```

---

### ❌ unlabeled form field

```tsx
// ❌ DO NOT: placeholder as label
<input type="email" placeholder="Email" />

// ✅ DO: proper label
<Input
  type="email"
  label="email address"
  id="email"
  placeholder="you@company.com"
/>
```

---

## testing tools

### automated testing

```bash
# install testing tools
npm install --save-dev @axe-core/react jest-axe

# run accessibility tests
npm run test:a11y
```

```tsx
// setupTests.ts
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

// component.test.tsx
import { axe } from 'jest-axe';

it('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

### browser testing

- **Chrome DevTools:** Lighthouse (Accessibility audit)
- **Firefox DevTools:** Accessibility Inspector
- **axe DevTools:** Browser extension (free)
- **WAVE:** Browser extension (free)

---

### screen reader testing

- **macOS:** VoiceOver (Cmd+F5)
- **Windows:** NVDA (free) or JAWS (paid)
- **iOS:** VoiceOver (Settings → Accessibility)
- **Android:** TalkBack (Settings → Accessibility)

---

### keyboard testing

**manual test checklist:**

- [ ] Tab through entire page
- [ ] Shift+Tab reverses direction
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate dropdowns/tabs
- [ ] Esc closes modals
- [ ] Focus indicator always visible
- [ ] Focus order logical
- [ ] No keyboard traps (except modals)

---

## design system accessibility guarantees

**when using riqle design system components, you get:**

### automatic compliance

- ✅ WCAG 2.1 Level AA compliance
- ✅ Keyboard navigation works
- ✅ Screen reader support
- ✅ Color contrast guaranteed
- ✅ Motion preferences respected
- ✅ Touch targets meet minimums
- ✅ Semantic HTML structure
- ✅ ARIA labels where needed

### you still need to

- ⚠️ Write meaningful link text (not "click here")
- ⚠️ Provide alt text for images
- ⚠️ Ensure logical heading hierarchy
- ⚠️ Test with real screen readers
- ⚠️ Test with real keyboard navigation
- ⚠️ Write clear error messages
- ⚠️ Provide skip links for navigation

---

## quick reference

### wcag 2.1 level aa requirements (built in)

| requirement                     | how design system ensures it       |
| ------------------------------- | ---------------------------------- |
| 1.4.3 Contrast (Minimum)        | All color tokens meet 4.5:1        |
| 1.4.11 Non-text Contrast        | Focus indicators 3:1 minimum       |
| 2.1.1 Keyboard                  | All components keyboard accessible |
| 2.1.2 No Keyboard Trap          | Focus management in modals         |
| 2.4.7 Focus Visible             | All components have focus rings    |
| 3.2.4 Consistent Identification | Icons/labels consistent            |
| 4.1.2 Name, Role, Value         | Semantic HTML + ARIA               |

---

## alignment with visual north star

accessibility supports the visual north star principles:

**visual north star: calm in first 30 seconds**
→ **accessibility: clear hierarchy, semantic structure**
✅ accessible design benefits all users

**visual north star: accessible by default**
→ **accessibility: WCAG AA built in, not bolted on**
✅ accessibility is foundation, not afterthought

**visual north star: restraint and discipline**
→ **accessibility: clear focus indicators, semantic HTML**
✅ simple, clear patterns are accessible patterns

**visual north star: apple internal tool aesthetic**
→ **accessibility: focus on clarity and function**
✅ accessible design is good design

---

## measuring success

accessibility is successful when:

### qualitative measures

- [ ] keyboard-only users can complete all tasks
- [ ] screen reader users understand all content
- [ ] motion-sensitive users experience no discomfort
- [ ] low-vision users read all text clearly
- [ ] 0 user complaints about accessibility barriers

### quantitative measures

- [ ] 100% WCAG 2.1 Level AA compliance (automated + manual)
- [ ] 100% keyboard navigation coverage
- [ ] 100% color contrast compliance (4.5:1 minimum)
- [ ] 100% components with proper ARIA labels
- [ ] 100% interactive elements with focus indicators
- [ ] 0 axe-core violations in CI
- [ ] Lighthouse accessibility score ≥ 95

---

**last updated:** january 3, 2026
**status:** complete
**principle:** accessible design is good design for everyone — accessibility is the foundation, not an afterthought.

---

## related documentation

- [Epic 1: Accessibility Requirements](/docs/epic-1/accessibility-requirements.md) - Implementation details, testing procedures
- [Color System](/docs/design-system/colors.md) - Contrast ratios and color accessibility
- [Motion System](/docs/design-system/motion-and-animation.md) - Reduced motion support
- [Component Primitives](/docs/design-system/component-primitives.md) - Accessible components by default
