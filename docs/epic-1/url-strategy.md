# url strategy and slug policy

> **principle:** urls should be human-readable, permanent, and predictable.
> **rule:** once published, never change. if you must change, 301 redirect.

---

## core philosophy

**the problem:**

- cryptic urls (example.com/post/12345) hide content
- dated urls (example.com/2024/01/post) age poorly
- changing urls breaks links and seo
- complex urls confuse users

**the solution:**

- semantic paths: `/writing/building-in-public`
- no dates in urls
- no ids in urls (unless absolutely necessary)
- stable: treat urls as contracts

**user feeling:**

- "i can read this url and know what the page is about."
- "i can guess urls and find content."
- "shared links won't break."

---

## url structure patterns

### static pages (top-level)

```
/                 → homepage
/about            → about page
/work             → work index
/writing          → writing index
/startups         → startups index
/resources        → resources catalog
/contact          → contact page
```

**rules:**

- single word preferred: `/work` not `/my-work`
- lowercase always: `/about` not `/About`
- no trailing slashes: `/work` not `/work/`
- no file extensions: `/about` not `/about.html`

### dynamic content pages

```
/writing/<slug>           → individual essay
/work/<slug>              → individual project
/startups/<slug>          → individual startup
/resources/<slug>         → individual product/resource
```

**pattern:**

```
/<content-type>/<slug>
```

**examples:**

```
/writing/building-markpoint
/work/riqle-portfolio
/startups/markpoint
/resources/hsc-english-guide
```

### archive and filter pages

```
/writing/archive          → all essays (paginated)
/work/archive             → all projects (paginated)
```

**alternative (if filters needed):**

```
/writing?tag=teaching
/work?tech=nextjs
```

**decision:** use query params for filters, not new routes

- keeps url structure simple
- easy to add/remove filters
- doesn't require new pages

---

## slug naming rules

### format

```
lowercase-words-separated-by-hyphens
```

**good slugs:**

```
building-in-public
markpoint-journey
teaching-500-students
why-i-left-university
```

**bad slugs:**

```
Building-In-Public          ❌ (uppercase)
building_in_public          ❌ (underscores)
buildingInPublic            ❌ (camelCase)
building.in.public          ❌ (dots)
post-2024-01-15             ❌ (dates)
p123                        ❌ (cryptic)
```

### length

**ideal:** 2-6 words
**max:** 8 words (after this, too long)
**min:** 1 word (if descriptive enough)

**examples:**

```
markpoint                   ✓ (1 word, clear for startup)
teaching-philosophy         ✓ (2 words)
building-markpoint          ✓ (2 words)
hsc-english-comprehensive-guide  ⚠️  (4 words, acceptable but long)
```

### word choice

**use:**

- descriptive nouns: `markpoint`, `teaching`, `philosophy`
- action verbs: `building`, `teaching`, `shipping`
- clear adjectives: `comprehensive`, `practical`

**avoid:**

- articles: `the`, `a`, `an`
- prepositions (when possible): `of`, `in`, `on`
- filler words: `how-to`, `guide-to`

**examples:**

```
// good
/writing/teaching-philosophy
/work/markpoint

// avoid (wordy)
/writing/a-guide-to-teaching-philosophy
/work/the-markpoint-project
```

### special characters

**allowed:**

- hyphens: `-` (word separator)

**not allowed:**

- underscores: `_`
- spaces: ` ` (encode to `%20`, ugly)
- ampersands: `&`
- question marks: `?` (reserved for query params)
- slashes: `/` (reserved for path segments)
- unicode: `é`, `ñ`, `한글` (use ascii transliteration)

**korean words:**

- transliterate: `집중` → `jipjung` or use english equivalent
- example: `/writing/jipjung-focus` or `/writing/focus`

---

## slug generation algorithm

### from title to slug

**step 1:** lowercase everything

```
"Building Markpoint: Lessons from Year One" → "building markpoint: lessons from year one"
```

**step 2:** remove punctuation

```
"building markpoint: lessons from year one" → "building markpoint lessons from year one"
```

**step 3:** replace spaces with hyphens

```
"building markpoint lessons from year one" → "building-markpoint-lessons-from-year-one"
```

**step 4:** remove filler words (optional)

```
"building-markpoint-lessons-from-year-one" → "building-markpoint-lessons-year-one"
                                           or → "building-markpoint-year-one"
```

**step 5:** trim to reasonable length (if needed)

```
"building-markpoint-year-one" ✓ (4 words, good)
```

### implementation

```typescript
// lib/generate-slug.ts

const FILLER_WORDS = new Set([
  'a',
  'an',
  'the',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'from',
  'how',
  'what',
  'why',
  'when',
  'where',
]);

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove punctuation
    .replace(/\s+/g, '-') // spaces to hyphens
    .split('-')
    .filter((word) => !FILLER_WORDS.has(word)) // remove filler
    .join('-')
    .replace(/-+/g, '-') // collapse multiple hyphens
    .replace(/^-|-$/g, ''); // trim leading/trailing hyphens
}

// examples
generateSlug('Building Markpoint: Lessons from Year One');
// → "building-markpoint-lessons-year-one"

generateSlug('Why I Left University to Build Startups');
// → "why-left-university-build-startups"

generateSlug('The Ultimate Guide to HSC English');
// → "ultimate-guide-hsc-english"
```

---

## url permanence policy

### once published, never change

**rule:** published urls are permanent

**reasoning:**

- external links (social media, forums, other sites)
- search engine indexing
- user bookmarks
- email shares

**exception:** pre-launch (no external links yet)

- can change freely during development
- lock urls before public launch

### if you must change a url

**use 301 permanent redirect:**

```typescript
// next.config.ts
export default {
  async redirects() {
    return [
      {
        source: '/writing/old-slug',
        destination: '/writing/new-slug',
        permanent: true, // 301
      },
    ];
  },
};
```

**when to change:**

- typo in slug (rare, better to leave it)
- content fundamentally changed (better to create new)
- rebranding (acceptable)

**when NOT to change:**

- "slug could be better" (not worth breaking links)
- "slug is too long" (live with it)
- "i don't like it anymore" (tough luck)

---

## canonical url strategy

### single source of truth

**problem:** same content accessible via multiple urls

```
example.com/writing/post
example.com/writing/post/
example.com/writing/post?ref=twitter
```

**solution:** canonical tag points to preferred version

```html
<link rel="canonical" href="https://riqle.com/writing/building-markpoint" />
```

### implementation

```tsx
// app/writing/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = params;
  const canonicalUrl = `https://riqle.com/writing/${slug}`;

  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
```

### rules

**canonical url format:**

```
https://riqle.com/writing/slug
```

**always:**

- https (not http)
- no trailing slash
- no query params (unless essential)
- no fragments (#)

**when to use:**

- all content pages (essays, projects, startups, resources)
- pagination pages: canonical points to page 1
- filtered views: canonical points to unfiltered

---

## special cases

### pagination

**option 1: query params (recommended)**

```
/writing?page=1
/writing?page=2
```

**option 2: path segments**

```
/writing/page/1
/writing/page/2
```

**chosen:** query params

- simpler url structure
- page 1 = `/writing` (clean)
- seo: use `rel="next"` and `rel="prev"`

**implementation:**

```html
<!-- on /writing?page=2 -->
<link rel="canonical" href="https://riqle.com/writing" />
<link rel="prev" href="https://riqle.com/writing?page=1" />
<link rel="next" href="https://riqle.com/writing?page=3" />
```

### tags/categories

**option 1: query params (recommended)**

```
/writing?tag=teaching
/writing?tag=startups
```

**option 2: path segments**

```
/writing/tag/teaching
/writing/tag/startups
```

**chosen:** query params

- fewer routes to maintain
- easy to combine: `/writing?tag=teaching&tag=startups`
- canonical points to `/writing`

### dates in content

**problem:** essay published january 2026, should url include date?

**answer:** no

**reasoning:**

- content is timeless (or should be)
- dates make content feel old
- if date matters, show in content, not url

**good:**

```
/writing/building-markpoint
(publish date shown in page content: "published january 3, 2026")
```

**avoid:**

```
/writing/2026/01/building-markpoint
/writing/2026/building-markpoint
```

### multi-part series

**option 1: numbered slugs**

```
/writing/markpoint-journey-part-1
/writing/markpoint-journey-part-2
```

**option 2: descriptive slugs**

```
/writing/markpoint-early-days
/writing/markpoint-first-users
```

**chosen:** descriptive slugs

- each essay stands alone
- urls are more semantic
- use "related content" links to connect

**exception:** if truly a series (part 1 makes no sense without part 2)

- then use numbered slugs
- but reconsider if this is best format

---

## duplicate content handling

### problem scenarios

**scenario 1:** same project appears in work and startups

```
/work/markpoint
/startups/markpoint
```

**solution:**

- pick primary location: `/startups/markpoint` (it's a startup)
- redirect other: `/work/markpoint` → 301 to `/startups/markpoint`
- or: `/work/markpoint` shows summary + link to `/startups/markpoint`

**scenario 2:** product and essay about product

```
/resources/hsc-guide
/writing/how-i-built-hsc-guide
```

**solution:**

- both exist (different content)
- cross-link: essay links to product, product links to essay
- different canonical urls (no duplication)

**scenario 3:** multiple essays on same topic

```
/writing/teaching-philosophy
/writing/teaching-philosophy-updated
```

**solution:**

- avoid "updated" suffix
- either: update original in place (change publish date)
- or: create new with different angle (different slug)

---

## url structure for different content types

### essays (writing)

```
/writing/<slug>
```

**examples:**

```
/writing/building-in-public
/writing/teaching-500-students
/writing/leaving-university
```

**metadata in page, not url:**

- publish date
- read time
- tags

### projects (work)

```
/work/<slug>
```

**examples:**

```
/work/markpoint
/work/riqle-portfolio
/work/client-project-name
```

**slug choice:**

- use project name: `/work/markpoint`
- not client name: `/work/acme-corp` ❌
- describe project: `/work/acme-ecommerce-rebuild` ✓

### startups

```
/startups/<slug>
```

**examples:**

```
/startups/markpoint
```

**for future startups:**

- use company name: `/startups/company-name`
- no "ventures" or "projects": `/startups/venture-1` ❌

### resources/products

```
/resources/<slug>
```

**examples:**

```
/resources/hsc-english-guide
/resources/essay-writing-toolkit
/resources/startup-checklist
```

**slug = product name (not category)**

- `/resources/hsc-english-guide` ✓
- `/resources/guides/hsc-english` ❌ (no sub-categories)

---

## url validation rules

### before publishing

**checklist:**

- [ ] slug is lowercase
- [ ] slug uses hyphens (not underscores/spaces)
- [ ] slug is 2-6 words (max 8)
- [ ] slug is descriptive (no cryptic abbreviations)
- [ ] slug matches content type pattern: `/<type>/<slug>`
- [ ] slug doesn't include dates
- [ ] slug doesn't include "the", "a", "an" (usually)
- [ ] canonical url is set
- [ ] no duplicate slugs across content types
- [ ] url tested in browser (no 404)

### automated checks

```typescript
// lib/validate-slug.ts

export function validateSlug(slug: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // lowercase only
  if (slug !== slug.toLowerCase()) {
    errors.push('Slug must be lowercase');
  }

  // hyphens only (no underscores, spaces, etc)
  if (!/^[a-z0-9-]+$/.test(slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
  }

  // no leading/trailing hyphens
  if (slug.startsWith('-') || slug.endsWith('-')) {
    errors.push('Slug must not start or end with hyphen');
  }

  // no consecutive hyphens
  if (slug.includes('--')) {
    errors.push('Slug must not contain consecutive hyphens');
  }

  // reasonable length
  const wordCount = slug.split('-').length;
  if (wordCount < 1) {
    errors.push('Slug must contain at least one word');
  }
  if (wordCount > 8) {
    errors.push('Slug should not exceed 8 words');
  }

  // no common filler words as entire slug
  const fillerWords = ['the', 'a', 'an', 'and', 'or', 'but'];
  if (fillerWords.includes(slug)) {
    errors.push('Slug must be more descriptive');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
```

---

## seo implications

### url structure and rankings

**search engines prefer:**

- descriptive urls: `/writing/teaching-philosophy` > `/post/123`
- short urls: `/work/markpoint` > `/work/the-complete-story-of-markpoint-from-idea-to-launch`
- keyword-rich urls: `/writing/hsc-english-tips` contains "hsc english"
- stable urls: urls that don't change

### breadcrumb navigation

**urls inform breadcrumbs:**

```
home > writing > building in public
  ↓      ↓         ↓
  /      /writing  /writing/building-in-public
```

**structured data:**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "home",
      "item": "https://riqle.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "writing",
      "item": "https://riqle.com/writing"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "building in public",
      "item": "https://riqle.com/writing/building-in-public"
    }
  ]
}
```

### sitemap.xml

**include all content urls:**

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://riqle.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://riqle.com/writing/building-markpoint</loc>
    <lastmod>2026-01-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- ... -->
</urlset>
```

**implementation (next.js):**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const essays = await db.post.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
  });

  return [
    {
      url: 'https://riqle.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...essays.map((essay) => ({
      url: `https://riqle.com/writing/${essay.slug}`,
      lastModified: essay.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
```

---

## next.js implementation

### static pages

```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <div>about content</div>;
}

// url: /about
```

### dynamic routes

```typescript
// app/writing/[slug]/page.tsx
export default function WritingDetailPage({ params }: { params: { slug: string } }) {
  return <div>essay: {params.slug}</div>;
}

// url: /writing/building-markpoint
// params.slug = "building-markpoint"
```

### static generation (recommended)

```typescript
// app/writing/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await db.post.findMany({
    where: { status: 'published' },
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// generates: /writing/slug1, /writing/slug2, etc at build time
```

### catch-all routes (avoid if possible)

```typescript
// app/[...slug]/page.tsx
// matches: /anything, /anything/nested, /anything/deeply/nested

// avoid: hard to reason about, seo confusion
// use: explicit routes instead
```

---

## url normalization

### trailing slashes

**problem:**

```
/writing/post   ← canonical
/writing/post/  ← duplicate?
```

**solution:** redirect trailing slash to no trailing slash

```typescript
// next.config.ts
export default {
  async redirects() {
    return [
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};
```

### case sensitivity

**problem:**

```
/writing/Post           ← wrong
/Writing/post           ← wrong
/writing/post           ← correct
```

**solution:**

- database: store slugs in lowercase
- validation: reject uppercase slugs
- middleware: lowercase all incoming urls (if needed)

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const lowercasePathname = pathname.toLowerCase();

  if (pathname !== lowercasePathname) {
    return NextResponse.redirect(new URL(lowercasePathname, request.url), { status: 301 });
  }
}
```

---

## testing checklist

**before launch:**

- [ ] all static pages accessible (/, /about, /work, etc)
- [ ] dynamic routes work (/writing/test-slug)
- [ ] 404 page for invalid slugs
- [ ] redirects work (301 permanent)
- [ ] canonical tags present
- [ ] sitemap.xml generates correctly
- [ ] no trailing slash URLs (or all redirect)
- [ ] no uppercase URLs (or all redirect)
- [ ] breadcrumbs match URL structure
- [ ] share links work (full URL with https)

**manual tests:**

1. visit `/writing/test-slug` → should work
2. visit `/writing/Test-Slug` → should redirect to lowercase
3. visit `/writing/test-slug/` → should redirect without trailing slash
4. visit `/writing/fake-slug` → should 404
5. check `view-source:` for canonical tag
6. check `/sitemap.xml` includes all pages

---

## banned patterns

**do NOT use:**

- ❌ dates in urls: `/2026/01/post`
- ❌ ids in urls: `/post/12345`
- ❌ cryptic abbreviations: `/p/123`
- ❌ query params for content: `/post?id=123`
- ❌ underscores: `/writing/post_name`
- ❌ uppercase: `/Writing/Post`
- ❌ trailing slashes: `/writing/post/`
- ❌ file extensions: `/about.html`
- ❌ session ids: `/post?sessionid=abc`
- ❌ unnecessary nesting: `/content/writing/essays/post`

**reasoning:**

- urls are user-facing (be kind)
- urls are permanent (be thoughtful)
- urls affect seo (be strategic)

---

**last updated:** january 3, 2026
**status:** url strategy defined. ready for implementation.
**principle:** human-readable. permanent. predictable.
