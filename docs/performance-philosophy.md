# Performance Philosophy: Speed = Respect

Treating user time as valuable means:
1. Fast by default
2. Simple beats clever
3. Less JavaScript > more JavaScript
4. Static where possible, dynamic only where required

## Principle 1: Fast by Default

**Rule:** Every page should feel instant

**Implementation:**
- Static generation for all public content
- Minimal JavaScript on critical pages
- Lazy load non-critical resources

## Principle 2: Simple Beats Clever

**Rule:** Prefer boring, proven solutions over cutting-edge tech

**Examples:**
- Server-side rendering > client hydration
- CSS > JavaScript for UI
- HTML forms > React forms (where possible)

## Principle 3: Less JavaScript

**Rule:** Ship minimal JavaScript to the browser

**Targets:**
- Homepage: < 50KB total JS
- Content Pages: < 30KB total JS
- Admin Pages: Acceptable to be heavier

## Principle 4: Static First

**Rule:** Generate static HTML at build time whenever possible

**Static Pages:**
- `/` (Homepage)
- `/about`
- `/work`
- `/work/[slug]`
- `/startups`
- `/startups/[slug]`
- `/writing`
- `/writing/[slug]`
- `/resources`
- `/resources/[slug]`

## Banned Patterns

### 1. Heavy Client-Side Frameworks Where Unnecessary

**Reason:** Adds unnecessary JavaScript

**Alternatives:** Server Components, Progressive enhancement

### 2. Unbounded Third-Party Scripts

**Reason:** Unpredictable performance impact

**Alternatives:** Self-hosted analytics, Minimal tracking

### 3. Animation That Delays Content

**Reason:** Frustrates users, delays information

**Alternatives:** Instant content, subtle motion

### 4. Client-Side Data Fetching on Initial Load

**Reason:** Waterfalls, slow perceived performance

**Alternatives:** Server-side data fetching, Static generation

### 5. Large Image Files Without Optimization

**Reason:** Slow page loads, wasted bandwidth

**Alternatives:** Next.js Image component, AVIF/WebP formats

## Performance Checklist (PR Review)

Before merging any PR, verify:

### JavaScript Bundle

- [ ] New dependencies are justified and necessary
- [ ] Bundle size increase is < 10KB (or explained)
- [ ] Code splitting is used for large components

### Images

- [ ] All images use Next.js Image component
- [ ] Image formats are optimized (AVIF/WebP)
- [ ] Appropriate sizes/srcsets are provided

### Data Fetching

- [ ] Server-side data fetching is preferred
- [ ] No unnecessary client-side requests on page load
- [ ] Data is cached appropriately

### CSS

- [ ] No large CSS-in-JS libraries added
- [ ] Tailwind classes are purged correctly
- [ ] Critical CSS is inlined (if applicable)

### Third-Party Scripts

- [ ] No new analytics/tracking scripts without approval
- [ ] External scripts are loaded asynchronously
- [ ] Scripts are necessary and cannot be self-hosted

### General

- [ ] Page feels instant (subjective test)
- [ ] No console errors or warnings
- [ ] Lighthouse score remains > 90
