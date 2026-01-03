# seo & discoverability baseline: employer findability, not gaming algorithms

> **principle:** optimize for human employers searching for specific skills, not for ranking algorithms
> **rule:** semantic markup, accurate metadata, clean URLs — no keyword stuffing, no tricks

**last updated:** january 3, 2026
**status:** complete
**story:** 1.10 - implement seo and discoverability baseline

---

## core philosophy

**the problem:**

employers search google for "[skill] portfolio", "[name] resume", "[technology] engineer". if your portfolio doesn't rank for these queries, you're invisible. but most seo advice is for e-commerce/content sites, not personal portfolios.

**the solution:**

semantic HTML, accurate metadata, structured data. optimize for employer queries (specific skills, technologies, domains), not vanity metrics (page rank, domain authority). make google understand who you are and what you do.

**the anti-pattern:**

- keyword stuffing ("react developer react expert react specialist...")
- hidden text for seo
- manipulative link schemes
- clickbait titles that don't match content

**the pattern:**

- clean semantic HTML (`<article>`, `<nav>`, `<main>`)
- accurate page titles ("[name] - [skill/domain]")
- structured data (Person, Article, SoftwareApplication)
- internal linking with descriptive anchor text

**user feeling:**

"when i search '[skill] portfolio', this person shows up. when i click through, the content matches what i was looking for."

---

## primary seo goals

### 1. name-based queries

**queries:**

- "[full name]"
- "[full name] portfolio"
- "[full name] resume"
- "[full name] [technology]"

**target pages:** homepage, about page

**optimization:**

- `<title>[Name] - [Primary Positioning]</title>`
- clear `<h1>` with name on homepage
- structured data: Person schema
- canonical URLs

---

### 2. skill-based queries

**queries:**

- "[skill] portfolio"
- "[skill] engineer portfolio"
- "[technology stack] developer"
- "[domain] product manager"

**target pages:** homepage, work index, individual projects

**optimization:**

- skill keywords in page title, h1, first paragraph
- projects tagged with specific skills/tech
- structured data: SoftwareApplication schema for projects

---

### 3. content-based queries

**queries:**

- "[topic] guide"
- "[framework] tutorial"
- "[problem] solution"
- "how to [action]"

**target pages:** writing index, individual essays

**optimization:**

- descriptive essay titles (not clickbait)
- clear thesis in excerpt/meta description
- structured data: Article schema
- internal links to related projects (proof)

---

## meta tags strategy

### homepage meta tags

```html
<!-- homepage: /pages/index.tsx -->
<head>
  <title>nathanael - data-heavy tools for technical users</title>
  <meta
    name="description"
    content="portfolio of nathanael: 8 years building software. shipped context-aware writing systems, employer-first portfolios, ai product consulting."
  />

  <!-- canonical URL -->
  <link rel="canonical" href="https://riqle.com/" />

  <!-- Open Graph (social sharing) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://riqle.com/" />
  <meta property="og:title" content="nathanael - data-heavy tools for technical users" />
  <meta
    property="og:description"
    content="portfolio of nathanael: 8 years building software. shipped context-aware writing systems, employer-first portfolios, ai product consulting."
  />
  <meta property="og:image" content="https://riqle.com/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="riqle: nathanael's portfolio" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="nathanael - data-heavy tools for technical users" />
  <meta
    name="twitter:description"
    content="portfolio of nathanael: 8 years building software. shipped context-aware writing systems, employer-first portfolios, ai product consulting."
  />
  <meta name="twitter:image" content="https://riqle.com/og-image.png" />

  <!-- robots -->
  <meta name="robots" content="index, follow" />

  <!-- language -->
  <meta httpEquiv="content-language" content="en" />
  <html lang="en" />
</head>
```

**key patterns:**

- title: `[name] - [positioning]` (50-60 characters)
- description: factual summary (150-160 characters)
- Open Graph: accurate preview for LinkedIn/Twitter shares
- robots: `index, follow` (allow crawling)

---

### about page meta tags

```html
<!-- about page: /pages/about.tsx -->
<head>
  <title>about nathanael - background, expertise, current status</title>
  <meta
    name="description"
    content="nathanael: 8 years building software. mit cs grad. worked at stripe, carta. now building markpoint and riqle. available for select contract work."
  />

  <link rel="canonical" href="https://riqle.com/about" />

  <meta property="og:type" content="profile" />
  <meta property="og:url" content="https://riqle.com/about" />
  <meta property="og:title" content="about nathanael" />
  <meta
    property="og:description"
    content="nathanael: 8 years building software. mit cs grad. worked at stripe, carta. now building markpoint and riqle."
  />
  <meta property="og:image" content="https://riqle.com/about-og-image.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="about nathanael" />
  <meta
    name="twitter:description"
    content="nathanael: 8 years building software. mit cs grad. worked at stripe, carta. now building markpoint and riqle."
  />
</head>
```

---

### project detail page meta tags

```html
<!-- project detail: /pages/work/[slug].tsx -->
<head>
  <title>markpoint - context-aware writing tool | nathanael</title>
  <meta
    name="description"
    content="markpoint: writing tool that handles 10x context windows (200k tokens). next.js, claude api, postgres. shipped in 6 months."
  />

  <link rel="canonical" href="https://riqle.com/work/markpoint" />

  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://riqle.com/work/markpoint" />
  <meta property="og:title" content="markpoint - context-aware writing tool" />
  <meta
    property="og:description"
    content="markpoint: writing tool that handles 10x context windows (200k tokens). next.js, claude api, postgres. shipped in 6 months."
  />
  <meta property="og:image" content="https://riqle.com/work/markpoint-og.png" />
  <meta property="og:article:published_time" content="2024-08-15T00:00:00Z" />
  <meta property="og:article:author" content="nathanael" />
  <meta property="og:article:tag" content="ai" />
  <meta property="og:article:tag" content="writing tools" />
  <meta property="og:article:tag" content="context windows" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="markpoint - context-aware writing tool" />
  <meta
    name="twitter:description"
    content="markpoint: writing tool that handles 10x context windows (200k tokens). next.js, claude api, postgres. shipped in 6 months."
  />
  <meta name="twitter:image" content="https://riqle.com/work/markpoint-og.png" />
</head>
```

**key patterns:**

- title: `[project name] - [one-line description] | [name]`
- description: outcome + tech + timeframe
- tags: specific skills/domains (not generic)

---

### essay detail page meta tags

```html
<!-- essay detail: /pages/writing/[slug].tsx -->
<head>
  <title>progressive disclosure: why portfolios fail employers | nathanael</title>
  <meta
    name="description"
    content="employers need speed, portfolios show everything. solution: progressive disclosure. calm first (scroll 1), proof second (scroll 2), texture third."
  />

  <link rel="canonical" href="https://riqle.com/writing/progressive-disclosure" />

  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://riqle.com/writing/progressive-disclosure" />
  <meta property="og:title" content="progressive disclosure: why portfolios fail employers" />
  <meta
    property="og:description"
    content="employers need speed, portfolios show everything. solution: progressive disclosure. calm first (scroll 1), proof second (scroll 2), texture third."
  />
  <meta property="og:image" content="https://riqle.com/writing/progressive-disclosure-og.png" />
  <meta property="og:article:published_time" content="2025-01-02T00:00:00Z" />
  <meta property="og:article:modified_time" content="2025-01-02T00:00:00Z" />
  <meta property="og:article:author" content="nathanael" />
  <meta property="og:article:section" content="design" />
  <meta property="og:article:tag" content="ux design" />
  <meta property="og:article:tag" content="portfolios" />
  <meta property="og:article:tag" content="information architecture" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="progressive disclosure: why portfolios fail employers" />
  <meta
    name="twitter:description"
    content="employers need speed, portfolios show everything. solution: progressive disclosure. calm first (scroll 1), proof second (scroll 2), texture third."
  />
  <meta name="twitter:image" content="https://riqle.com/writing/progressive-disclosure-og.png" />
</head>
```

**key patterns:**

- title: `[essay title] | [name]`
- description: thesis + key insight (150-160 chars)
- published/modified time (ISO 8601)
- tags: specific topics (3-5 max)

---

## structured data (JSON-LD)

### Person schema (homepage, about)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nathanael [Last Name]",
  "url": "https://riqle.com",
  "image": "https://riqle.com/profile-photo.jpg",
  "jobTitle": "Software Engineer",
  "description": "i build data-heavy tools for technical users. 8 years building software.",
  "knowsAbout": [
    "Software Engineering",
    "AI Product Development",
    "Distributed Systems",
    "React",
    "TypeScript",
    "Python",
    "PostgreSQL"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "MIT",
    "url": "https://mit.edu"
  },
  "sameAs": [
    "https://github.com/[username]",
    "https://linkedin.com/in/[username]",
    "https://twitter.com/[username]"
  ]
}
```

**why:** helps google understand who you are, what you know, where you worked/studied.

---

### Article schema (essays)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "progressive disclosure: why portfolios fail employers",
  "description": "employers need speed, portfolios show everything. solution: progressive disclosure.",
  "author": {
    "@type": "Person",
    "name": "Nathanael [Last Name]",
    "url": "https://riqle.com"
  },
  "datePublished": "2025-01-02T00:00:00Z",
  "dateModified": "2025-01-02T00:00:00Z",
  "image": "https://riqle.com/writing/progressive-disclosure-og.png",
  "publisher": {
    "@type": "Person",
    "name": "Nathanael [Last Name]",
    "url": "https://riqle.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://riqle.com/writing/progressive-disclosure"
  },
  "keywords": ["ux design", "portfolios", "information architecture"],
  "articleSection": "Design",
  "wordCount": 1500,
  "inLanguage": "en"
}
```

**why:** helps google understand essay topic, author, publication date. can appear in rich snippets.

---

### SoftwareApplication schema (projects)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "markpoint",
  "description": "context-aware writing tool that handles 10x context windows (200k tokens)",
  "url": "https://markpoint.app",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "author": {
    "@type": "Person",
    "name": "Nathanael [Last Name]",
    "url": "https://riqle.com"
  },
  "datePublished": "2024-08-15",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "screenshot": "https://riqle.com/work/markpoint-screenshot.png",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "12"
  }
}
```

**why:** helps google understand project type, tech, outcomes. can appear as rich result.

---

### BreadcrumbList schema (all pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "riqle",
      "item": "https://riqle.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "work",
      "item": "https://riqle.com/work"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "markpoint",
      "item": "https://riqle.com/work/markpoint"
    }
  ]
}
```

**why:** helps google understand site hierarchy. breadcrumbs can appear in search results.

---

## Open Graph images

### requirements

**dimensions:** 1200 × 630 px (facebook/linkedin standard)
**format:** png or jpg
**file size:** < 1mb
**content:** clear, readable at thumbnail size

### homepage OG image

**content:**

- name (large, chalk font)
- positioning line
- 2-3 proof bullets
- brand: "riqle" (lowercase, bottom corner)

**example:**

```
┌────────────────────────────────────┐
│                                    │
│  nathanael                         │
│  i build data-heavy tools          │
│                                    │
│  • 10x context windows             │
│  • 45s comprehension               │
│  • 3 ai clients (2024)             │
│                                    │
│               riqle                │
└────────────────────────────────────┘
```

---

### project OG image

**content:**

- project name (large)
- one-line description
- key outcome (quantified)
- tech stack (icons or text)

**example:**

```
┌────────────────────────────────────┐
│                                    │
│  markpoint                         │
│  context-aware writing tool        │
│                                    │
│  outcome: 10x context windows      │
│  tech: next.js · claude · postgres │
│                                    │
│               riqle                │
└────────────────────────────────────┘
```

---

### essay OG image

**content:**

- essay title (large, readable)
- thesis (1-2 lines)
- key insight (quantified if possible)

**example:**

```
┌────────────────────────────────────┐
│                                    │
│  progressive disclosure:           │
│  why portfolios fail employers     │
│                                    │
│  employers need speed,             │
│  portfolios show everything.       │
│                                    │
│  solution: calm → proof → texture  │
│                                    │
│               riqle                │
└────────────────────────────────────┘
```

---

## semantic HTML structure

### homepage semantic markup

```tsx
// pages/index.tsx

export default function HomePage() {
  return (
    <>
      <header>
        <nav aria-label="main navigation">{/* SiteHeader component */}</nav>
      </header>

      <main id="main-content">
        <section aria-labelledby="hero-heading">
          <h1 id="hero-heading">nathanael</h1>
          <p>i build data-heavy tools for technical users.</p>

          <div aria-labelledby="proof-heading">
            <h2 id="proof-heading" className="sr-only">
              proof
            </h2>
            <ul>
              <li>10x context windows (markpoint)</li>
              <li>45s employer comprehension (riqle)</li>
              <li>3 ai strategy clients (2024)</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="featured-work-heading">
          <h2 id="featured-work-heading">featured work</h2>
          {/* featured projects */}
        </section>

        <section aria-labelledby="featured-writing-heading">
          <h2 id="featured-writing-heading">featured writing</h2>
          {/* featured essay */}
        </section>
      </main>

      <footer>
        <nav aria-label="footer navigation">{/* footer links */}</nav>
      </footer>
    </>
  );
}
```

**key patterns:**

- `<header>`, `<main>`, `<footer>` landmarks
- `<nav>` with `aria-label` for navigation
- `<section>` with `aria-labelledby` for content blocks
- `<h1>` → `<h2>` → `<h3>` hierarchical headings
- skip to main content link (accessibility)

---

### project detail semantic markup

```tsx
// pages/work/[slug].tsx

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <main id="main-content">
      <article itemScope itemType="https://schema.org/SoftwareApplication">
        <header>
          <h1 itemProp="name">{project.title}</h1>
          <p itemProp="description">{project.description}</p>
        </header>

        <section aria-labelledby="outcome-heading">
          <h2 id="outcome-heading">outcome</h2>
          <p itemProp="featureList">{project.outcome}</p>
        </section>

        <section aria-labelledby="tech-heading">
          <h2 id="tech-heading">tech stack</h2>
          <ul>
            {project.tech.map((tech) => (
              <li key={tech} itemProp="softwareRequirements">
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="content-heading">
          <h2 id="content-heading" className="sr-only">
            project details
          </h2>
          <div itemProp="articleBody">{/* markdown content */}</div>
        </section>

        <aside aria-labelledby="related-heading">
          <h2 id="related-heading">related essays</h2>
          {/* related posts */}
        </aside>

        <meta itemProp="author" content="nathanael" />
        <meta itemProp="datePublished" content={project.publishedAt.toISOString()} />
      </article>
    </main>
  );
}
```

**key patterns:**

- `<article>` with microdata (`itemScope`, `itemType`)
- `<header>` for project title/description
- `<section>` for each content block
- `<aside>` for related content
- semantic `itemProp` attributes for structured data

---

### essay detail semantic markup

```tsx
// pages/writing/[slug].tsx

export default function EssayPage({ post }: { post: Post }) {
  return (
    <main id="main-content">
      <article itemScope itemType="https://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p itemProp="description">{post.excerpt}</p>

          <div className="metadata">
            <time itemProp="datePublished" dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
            <span itemProp="author" itemScope itemType="https://schema.org/Person">
              <meta itemProp="name" content="nathanael" />
            </span>
            <meta itemProp="inLanguage" content="en" />
          </div>
        </header>

        <div itemProp="articleBody">{/* markdown content */}</div>

        <footer>
          <p>
            <strong>takeaway:</strong> {post.takeaway}
          </p>
        </footer>

        <aside aria-labelledby="related-projects-heading">
          <h2 id="related-projects-heading">related projects</h2>
          {/* related projects */}
        </aside>

        <meta itemProp="wordCount" content={post.wordCount.toString()} />
        <meta itemProp="dateModified" content={post.updatedAt.toISOString()} />
      </article>
    </main>
  );
}
```

**key patterns:**

- `<article>` with Article schema microdata
- `<header>` with title, excerpt, metadata
- `<time>` with `dateTime` attribute (ISO 8601)
- `<footer>` for takeaway/conclusion
- `<aside>` for related content

---

## sitemap.xml

### structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- homepage -->
  <url>
    <loc>https://riqle.com/</loc>
    <lastmod>2026-01-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- static pages -->
  <url>
    <loc>https://riqle.com/about</loc>
    <lastmod>2026-01-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://riqle.com/work</loc>
    <lastmod>2026-01-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://riqle.com/writing</loc>
    <lastmod>2026-01-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- dynamic pages: projects -->
  <url>
    <loc>https://riqle.com/work/markpoint</loc>
    <lastmod>2024-08-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- dynamic pages: essays -->
  <url>
    <loc>https://riqle.com/writing/progressive-disclosure</loc>
    <lastmod>2025-01-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

**priority guidelines:**

- homepage: 1.0
- index pages (work, writing): 0.9
- about page: 0.8
- individual projects/essays: 0.7
- archive pages: 0.5

**changefreq guidelines:**

- homepage: weekly (featured content changes)
- index pages: weekly (new content added)
- detail pages: monthly (minor edits)
- static pages (about): monthly (rare updates)

---

### implementation (Next.js)

```typescript
// pages/sitemap.xml.ts

import { GetServerSideProps } from 'next';
import { db } from '@/lib/db';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://riqle.com';

  // fetch all published content
  const projects = await db.project.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
  });

  const posts = await db.post.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
  });

  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/work', changefreq: 'weekly', priority: '0.9' },
    { url: '/writing', changefreq: 'weekly', priority: '0.9' },
    { url: '/startups', changefreq: 'weekly', priority: '0.8' },
    { url: '/resources', changefreq: 'monthly', priority: '0.6' },
    { url: '/contact', changefreq: 'monthly', priority: '0.7' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map(
          (page) => `
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
        )
        .join('')}

      ${projects
        .map(
          (project) => `
        <url>
          <loc>${baseUrl}/work/${project.slug}</loc>
          <lastmod>${project.updatedAt.toISOString().split('T')[0]}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `
        )
        .join('')}

      ${posts
        .map(
          (post) => `
        <url>
          <loc>${baseUrl}/writing/${post.slug}</loc>
          <lastmod>${post.updatedAt.toISOString().split('T')[0]}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `
        )
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null;
}
```

---

## robots.txt

```
# robots.txt

User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /drafts/

Sitemap: https://riqle.com/sitemap.xml
```

**key rules:**

- allow all pages (default)
- disallow admin, api, drafts, build files
- point to sitemap.xml

---

## internal linking strategy

### primary navigation links

**always present:**

- header: home, about, work, writing, startups, resources, contact
- footer: same as header + privacy, terms

**why:** search engines use nav links to understand site structure.

---

### contextual internal links

**essays → projects:**

```markdown
we implemented progressive disclosure in [riqle](/work/riqle), where...
```

**projects → essays:**

```markdown
for technical breakdown, see [building for 10x context](/writing/building-for-10x-context).
```

**anchor text rules:**

✅ good (descriptive):

- "see [markpoint project](/work/markpoint)"
- "read [progressive disclosure essay](/writing/progressive-disclosure)"
- "technical breakdown: [building for 10x context](/writing/building-for-10x-context)"

❌ bad (generic):

- "click here"
- "read more"
- "this post"

**why:** descriptive anchor text helps search engines understand link relevance.

---

### breadcrumbs

**project page:**

```
riqle > work > markpoint
```

**essay page:**

```
riqle > writing > progressive disclosure
```

**implementation:**

```tsx
// components/molecules/Breadcrumbs.tsx

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="breadcrumb" className="mb-md">
      <ol
        className="flex items-center gap-2 text-sm"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => (
          <li
            key={item.label}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-2"
          >
            {item.href ? (
              <a
                href={item.href}
                itemProp="item"
                className="text-neon-cyan hover:text-neon-pink underline"
              >
                <span itemProp="name">{item.label}</span>
              </a>
            ) : (
              <span itemProp="name" className="text-chalk-charcoal">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={(index + 1).toString()} />
            {index < items.length - 1 && <span className="text-chalk-charcoal/40">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// usage:
<Breadcrumbs
  items={[{ label: 'riqle', href: '/' }, { label: 'work', href: '/work' }, { label: 'markpoint' }]}
/>;
```

**why:** breadcrumbs help users navigate, help search engines understand hierarchy, can appear in search results.

---

## page load performance (core web vitals)

### First Contentful Paint (FCP) < 1.5s

**strategies:**

- server-side rendering (SSR) for all pages
- optimize fonts (preload chalk font, use font-display: swap)
- minimize CSS (critical CSS inline, defer rest)
- optimize images (next/image with lazy loading)

---

### Largest Contentful Paint (LCP) < 2.5s

**strategies:**

- prioritize above-fold content
- preload hero images
- minimize render-blocking resources
- use CDN for static assets

---

### Cumulative Layout Shift (CLS) < 0.1

**strategies:**

- reserve space for images (width/height attributes)
- avoid inserting content above existing content
- use transform animations (not top/left)
- preload fonts to avoid FOIT (flash of invisible text)

---

### implementation (Next.js config)

```typescript
// next.config.ts

const nextConfig = {
  images: {
    domains: ['riqle.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },

  // compression
  compress: true,

  // headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // redirects for old URLs
  async redirects() {
    return [
      {
        source: '/portfolio/:slug',
        destination: '/work/:slug',
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
```

---

## analytics & search console

### Google Search Console

**setup:**

1. verify ownership (DNS or HTML file)
2. submit sitemap.xml
3. monitor coverage (indexed pages)
4. fix crawl errors
5. check mobile usability

**key metrics:**

- impressions (how often you appear in search)
- clicks (how often people click)
- CTR (click-through rate)
- average position (ranking)

**goal:** improve CTR for target queries (name, skills, domains)

---

### analytics (privacy-first)

**recommendation:** Plausible or Fathom (GDPR-compliant, no cookies)

**key metrics:**

- page views (most visited pages)
- referrers (where traffic comes from)
- top paths (employer journey)
- bounce rate (homepage engagement)

**avoid:** Google Analytics (privacy concerns, cookie banners)

---

## banned seo practices

### ❌ do NOT implement

**keyword stuffing:**

```html
<!-- BAD: -->
<title>
  React Developer React Engineer React Specialist React Portfolio React Projects React Resume
</title>
```

**hidden text:**

```css
/* BAD: */
.keywords {
  color: white;
  background: white;
  font-size: 0;
}
```

**link schemes:**

- buying backlinks
- link exchanges ("link to me, i'll link to you")
- footer link spam

**duplicate content:**

- copying essays to medium/dev.to without canonical tags
- multiple pages with identical content

**cloaking:**

- showing different content to search engines vs users

**clickbait:**

- misleading titles that don't match content
- "you won't believe what happened next"

---

## checklist: pre-launch seo audit

### [ ] meta tags

- [ ] all pages have unique `<title>` tags
- [ ] all pages have `<meta name="description">`
- [ ] all pages have canonical URLs
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] language meta tag (`<html lang="en">`)

### [ ] structured data

- [ ] Person schema on homepage/about
- [ ] Article schema on essays
- [ ] SoftwareApplication schema on projects
- [ ] BreadcrumbList schema on all pages
- [ ] test with [schema.org validator](https://validator.schema.org/)

### [ ] semantic HTML

- [ ] `<header>`, `<main>`, `<footer>` landmarks
- [ ] `<nav>` with aria-labels
- [ ] hierarchical headings (`<h1>` → `<h2>` → `<h3>`)
- [ ] `<article>` for content
- [ ] `<section>` with aria-labelledby

### [ ] images

- [ ] all images have descriptive alt text
- [ ] decorative images use `aria-hidden="true"`
- [ ] OG images (1200×630px) for all key pages
- [ ] images optimized (< 200kb)

### [ ] sitemap & robots

- [ ] sitemap.xml generated and accessible
- [ ] sitemap submitted to Google Search Console
- [ ] robots.txt allows crawling
- [ ] no broken links (404s)

### [ ] performance

- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] mobile-friendly (test: [mobile-friendly test](https://search.google.com/test/mobile-friendly))

### [ ] internal linking

- [ ] all pages accessible from navigation
- [ ] contextual links use descriptive anchor text
- [ ] breadcrumbs on detail pages
- [ ] no orphan pages (unreachable)

### [ ] redirects

- [ ] old URLs redirect to new URLs (301)
- [ ] no redirect chains
- [ ] no redirect loops

---

## monitoring & iteration

### monthly tasks

- [ ] check Google Search Console for errors
- [ ] review top queries (are you ranking for target keywords?)
- [ ] check CTR (click-through rate) for homepage
- [ ] fix any crawl errors or coverage issues
- [ ] review analytics (which pages get traffic?)

### quarterly tasks

- [ ] update sitemap.xml (new content)
- [ ] audit meta descriptions (are they accurate?)
- [ ] check for broken links
- [ ] review performance (Core Web Vitals)
- [ ] update OG images if content changed

---

## implementation priority

### phase 1 (pre-launch)

- [ ] meta tags (all pages)
- [ ] structured data (Person, Article, SoftwareApplication)
- [ ] semantic HTML
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] OG images (homepage, key projects/essays)

### phase 2 (post-launch)

- [ ] submit to Google Search Console
- [ ] monitor coverage and fix errors
- [ ] optimize slow pages (Core Web Vitals)
- [ ] add breadcrumbs
- [ ] analytics setup

### phase 3 (ongoing)

- [ ] monthly monitoring
- [ ] quarterly audits
- [ ] new content: meta tags + structured data + OG images

---

**last updated:** january 3, 2026
**status:** complete
**principle:** optimize for human employers searching for specific skills, not for ranking algorithms — semantic markup, accurate metadata, clean URLs
