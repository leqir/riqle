# Epic 12: Performance, Reliability & Trust

**Status:** ✅ Ready for Implementation
**Dependencies:** Epic 0 (Infrastructure), Epic 9 (Payments), Epic 11 (Admin)
**Priority:** Critical
**Estimated Timeline:** 10-14 days

---

## Overview

### Purpose

Ensure the site is **fast, stable, resilient, and boringly reliable** at all times. This epic exists because:

> **One slow page, one broken checkout, or one visible error undoes months of credibility.**

If Epic 11 keeps _you_ calm, **Epic 12 keeps everyone else unaware that anything could ever go wrong**.

Reliability is not a feature — it is **table stakes for trust**.

### User Outcome

By the end of this epic:

- **Employers** think: "This site feels solid."
- **Customers** think: "Nothing here feels risky."
- **You** think: "I don't worry about this system."

The site should never draw attention to itself by failing.

### Core Questions This Epic Answers

1. Can the site handle unexpected traffic without breaking?
2. Do users ever comment on performance (slow pages, broken flows)?
3. Are failures rare, quiet, and recoverable?
4. Will you know about issues before users complain?

---

## Architecture Decisions

### Performance Stack

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static optimization
  output: 'standalone',

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Compress responses
  compress: true,

  // Bundle analysis (development only)
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Analyze bundle size
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: '../bundle-report.html',
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
```

### Caching Strategy

```typescript
// lib/cache/config.ts

export const CACHE_CONFIG = {
  // Static pages (revalidate daily)
  staticPages: {
    homepage: { revalidate: 86400 }, // 24 hours
    about: { revalidate: 86400 },
    work: { revalidate: 3600 }, // 1 hour
    startups: { revalidate: 3600 },
  },

  // Dynamic content (shorter revalidation)
  dynamicContent: {
    writingIndex: { revalidate: 1800 }, // 30 minutes
    essayPage: { revalidate: 3600 }, // 1 hour
    resourcesIndex: { revalidate: 1800 },
    resourcePage: { revalidate: 3600 },
  },

  // Never cache
  neverCache: ['/admin/*', '/api/checkout/*', '/api/webhooks/*', '/access/*'],
} as const;

// Helper function
export function getCacheConfig(path: string) {
  // Check never-cache paths
  if (CACHE_CONFIG.neverCache.some((pattern) => path.startsWith(pattern.replace('*', '')))) {
    return { revalidate: 0 };
  }

  // Return appropriate config
  // ... matching logic
}
```

### Database Optimization

```prisma
// prisma/schema.prisma (indexes for performance)

model Post {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  content     String   @db.Text
  published   Boolean  @default(false)
  featured    Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Performance indexes
  @@index([published, publishedAt(sort: Desc)])
  @@index([featured, published])
  @@index([slug])
}

model Project {
  id       String  @id @default(cuid())
  slug     String  @unique
  title    String
  order    Int     @default(0)
  featured Boolean @default(false)
  status   String

  @@index([order])
  @@index([featured, order])
}

model Order {
  id         String   @id @default(cuid())
  status     String
  createdAt  DateTime @default(now())
  customerEmail String

  @@index([status])
  @@index([customerEmail])
  @@index([createdAt(sort: Desc)])
}

model Entitlement {
  id        String   @id @default(cuid())
  userId    String
  productId String
  active    Boolean  @default(true)
  createdAt DateTime @default(now())

  @@index([userId, active])
  @@index([productId, active])
}
```

---

## Stories

### Story 12.1: Core Job-to-be-Done - Make the System Feel Inevitable

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **user** (employer, customer, or operator),
I want **the site to feel fast, stable, and reliable**,
So that **I never think about performance or worry about failures**.

#### Acceptance Criteria

**Given** any user interacting with the site
**When** browsing, purchasing, or managing content
**Then** the system feels inevitable (never slow, never broken)
**And** users never comment on performance
**And** failures are rare, quiet, and recoverable
**And** the operator is alerted before users complain

#### Implementation Checklist

- [ ] Define performance success criteria:

```typescript
// lib/monitoring/performance-criteria.ts

/**
 * Performance Success Criteria
 *
 * These are the non-negotiable standards for site performance.
 * If any metric falls below these thresholds, it's a critical issue.
 */

export const PERFORMANCE_CRITERIA = {
  // User-facing metrics
  userExperience: {
    // "Users never comment on performance"
    subjectiveSpeed: 'instant', // < 1s perceived load time

    // "Failures are rare"
    errorRate: 0.001, // < 0.1% error rate

    // "Recoverable"
    errorRecovery: 'graceful', // No user panic
  },

  // Technical metrics (Lighthouse)
  lighthouse: {
    performance: 90, // Minimum score
    accessibility: 95,
    bestPractices: 95,
    seo: 95,
  },

  // Core Web Vitals
  coreWebVitals: {
    LCP: 1.5, // Largest Contentful Paint (seconds)
    FID: 0.1, // First Input Delay (seconds)
    CLS: 0.05, // Cumulative Layout Shift
  },

  // Availability
  uptime: {
    target: 0.999, // 99.9% uptime (43 minutes downtime/month)
    measurement: 'monthly',
  },

  // Alert thresholds
  alerts: {
    // Alert if error rate exceeds threshold
    errorRateThreshold: 0.01, // 1%

    // Alert if response time exceeds threshold
    p95ResponseTime: 1000, // 1 second (95th percentile)

    // Alert if availability drops
    availabilityThreshold: 0.99, // 99%
  },
} as const;

export function checkPerformanceCriteria(metrics: {
  errorRate: number;
  p95ResponseTime: number;
  availability: number;
}): {
  passing: boolean;
  failures: string[];
} {
  const failures: string[] = [];

  if (metrics.errorRate > PERFORMANCE_CRITERIA.alerts.errorRateThreshold) {
    failures.push(`Error rate ${(metrics.errorRate * 100).toFixed(2)}% exceeds threshold`);
  }

  if (metrics.p95ResponseTime > PERFORMANCE_CRITERIA.alerts.p95ResponseTime) {
    failures.push(`P95 response time ${metrics.p95ResponseTime}ms exceeds threshold`);
  }

  if (metrics.availability < PERFORMANCE_CRITERIA.alerts.availabilityThreshold) {
    failures.push(`Availability ${(metrics.availability * 100).toFixed(2)}% below threshold`);
  }

  return {
    passing: failures.length === 0,
    failures,
  };
}
```

- [ ] Document reliability principles:

```markdown
# Reliability Principles

## For Employers

The site should feel:

- Professional and solid
- Never broken or slow
- Trustworthy at first glance

## For Customers

The purchasing experience should be:

- Fast and confident
- Never risky or uncertain
- Boringly reliable

## For Operator (You)

The system should:

- Alert you before users complain
- Fail gracefully when issues occur
- Remain stable under unexpected load
- Never embarrass you
```

- [ ] Create monitoring dashboard config (Vercel Analytics or similar):

```typescript
// lib/monitoring/dashboard-config.ts

export const DASHBOARD_METRICS = {
  // Real-time
  realTime: ['requests_per_minute', 'error_rate', 'p95_response_time'],

  // Daily
  daily: ['total_requests', 'unique_visitors', 'error_count', 'avg_response_time'],

  // Weekly
  weekly: ['lighthouse_scores', 'core_web_vitals', 'uptime_percentage'],
} as const;
```

#### Testing Requirements

- [ ] Baseline performance test: Run Lighthouse on all major pages
- [ ] Load test: Simulate 100 concurrent users for 5 minutes
- [ ] Error handling test: Verify graceful degradation when services fail
- [ ] Alert test: Trigger alert conditions and verify notifications

---

### Story 12.2: Performance Philosophy - Speed = Respect

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **developer**,
I want **clear performance principles and banned patterns**,
So that **the site stays fast by default and user time is respected**.

#### Acceptance Criteria

**Given** development decisions
**When** building features
**Then** performance principles guide choices
**And** fast is the default (not an optimization)
**And** simple beats clever
**And** less JavaScript is preferred
**And** heavy client frameworks are banned where unnecessary

#### Implementation Checklist

- [ ] Document performance philosophy:

```typescript
// docs/performance-philosophy.md

/**
 * Performance Philosophy: Speed = Respect
 *
 * Treating user time as valuable means:
 * 1. Fast by default
 * 2. Simple beats clever
 * 3. Less JavaScript > more JavaScript
 * 4. Static where possible, dynamic only where required
 */

export const PERFORMANCE_PRINCIPLES = {
  // Principle 1: Fast by default
  fastByDefault: {
    rule: 'Every page should feel instant',
    implementation: [
      'Static generation for all public content',
      'Minimal JavaScript on critical pages',
      'Lazy load non-critical resources',
    ],
  },

  // Principle 2: Simple beats clever
  simpleBeatsClever: {
    rule: 'Prefer boring, proven solutions over cutting-edge tech',
    examples: [
      'Server-side rendering > client hydration',
      'CSS > JavaScript for UI',
      'HTML forms > React forms (where possible)',
    ],
  },

  // Principle 3: Less JavaScript
  lessJavaScript: {
    rule: 'Ship minimal JavaScript to the browser',
    targets: {
      homepage: '< 50KB total JS',
      contentPages: '< 30KB total JS',
      adminPages: 'Acceptable to be heavier',
    },
  },

  // Principle 4: Static where possible
  staticFirst: {
    rule: 'Generate static HTML at build time whenever possible',
    staticPages: [
      '/', // Homepage
      '/about',
      '/work',
      '/work/[slug]',
      '/startups',
      '/startups/[slug]',
      '/writing',
      '/writing/[slug]',
      '/resources',
      '/resources/[slug]',
    ],
  },
} as const;

// Banned patterns
export const BANNED_PATTERNS = [
  {
    pattern: 'Heavy client-side frameworks where unnecessary',
    reason: 'Adds unnecessary JavaScript',
    alternatives: ['Server Components', 'Progressive enhancement'],
  },
  {
    pattern: 'Unbounded third-party scripts',
    reason: 'Unpredictable performance impact',
    alternatives: ['Self-hosted analytics', 'Minimal tracking'],
  },
  {
    pattern: 'Animation that delays content',
    reason: 'Frustrates users, delays information',
    alternatives: ['Instant content, subtle motion'],
  },
  {
    pattern: 'Client-side data fetching on initial load',
    reason: 'Waterfalls, slow perceived performance',
    alternatives: ['Server-side data fetching', 'Static generation'],
  },
  {
    pattern: 'Large image files without optimization',
    reason: 'Slow page loads, wasted bandwidth',
    alternatives: ['Next.js Image component', 'AVIF/WebP formats'],
  },
];
```

- [ ] Create performance checklist for PRs:

```markdown
# Performance Checklist (PR Review)

Before merging any PR, verify:

## JavaScript Bundle

- [ ] New dependencies are justified and necessary
- [ ] Bundle size increase is < 10KB (or explained)
- [ ] Code splitting is used for large components

## Images

- [ ] All images use Next.js Image component
- [ ] Image formats are optimized (AVIF/WebP)
- [ ] Appropriate sizes/srcsets are provided

## Data Fetching

- [ ] Server-side data fetching is preferred
- [ ] No unnecessary client-side requests on page load
- [ ] Data is cached appropriately

## CSS

- [ ] No large CSS-in-JS libraries added
- [ ] Tailwind classes are purged correctly
- [ ] Critical CSS is inlined (if applicable)

## Third-Party Scripts

- [ ] No new analytics/tracking scripts without approval
- [ ] External scripts are loaded asynchronously
- [ ] Scripts are necessary and cannot be self-hosted

## General

- [ ] Page feels instant (subjective test)
- [ ] No console errors or warnings
- [ ] Lighthouse score remains > 90
```

- [ ] Set up bundle size monitoring:

```javascript
// .github/workflows/bundle-size.yml
name: Bundle Size Check

on:
  pull_request:
    branches: [main]

jobs:
  check-bundle-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: andresz1/size-limit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

```javascript
// package.json (size-limit config)
{
  "size-limit": [
    {
      "name": "Homepage",
      "path": ".next/static/**/*.js",
      "limit": "50 KB"
    },
    {
      "name": "Content pages",
      "path": ".next/static/chunks/pages/**/*.js",
      "limit": "30 KB"
    }
  ]
}
```

#### Testing Requirements

- [ ] Verify banned patterns are documented
- [ ] Check bundle size limits are enforced in CI
- [ ] Review 3 recent PRs against performance checklist

---

### Story 12.3: Page Load Performance Standards

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 6-8 hours

#### User Story

As a **user**,
I want **every page to load instantly**,
So that **I never experience "loading" moments and the site feels professional**.

#### Acceptance Criteria

**Given** any page on the site
**When** loading the page
**Then** Time to First Byte (TTFB) is < 300ms
**And** First Contentful Paint is < 1s
**And** Largest Contentful Paint is < 1.5s
**And** Cumulative Layout Shift is ≈ 0
**And** homepage is the fastest page
**And** performance does not degrade as content grows

#### Implementation Checklist

- [ ] Define performance budgets:

```typescript
// lib/monitoring/performance-budgets.ts

export const PERFORMANCE_BUDGETS = {
  // Time budgets (milliseconds)
  timing: {
    TTFB: 300, // Time to First Byte
    FCP: 1000, // First Contentful Paint
    LCP: 1500, // Largest Contentful Paint
    TTI: 2000, // Time to Interactive
  },

  // Size budgets (bytes)
  size: {
    totalJS: 50000, // 50 KB total JavaScript
    totalCSS: 20000, // 20 KB total CSS
    totalImages: 500000, // 500 KB total images (per page)
    totalFonts: 100000, // 100 KB fonts
  },

  // Request budgets
  requests: {
    total: 25, // Max 25 requests per page
    thirdParty: 3, // Max 3 third-party requests
  },

  // Core Web Vitals thresholds
  coreWebVitals: {
    LCP: {
      good: 1500,
      needsImprovement: 2500,
      poor: Infinity,
    },
    FID: {
      good: 100,
      needsImprovement: 300,
      poor: Infinity,
    },
    CLS: {
      good: 0.05,
      needsImprovement: 0.15,
      poor: Infinity,
    },
  },
} as const;

export function checkBudget(
  metric: keyof typeof PERFORMANCE_BUDGETS.timing,
  value: number
): {
  passing: boolean;
  budget: number;
  actual: number;
  difference: number;
} {
  const budget = PERFORMANCE_BUDGETS.timing[metric];
  const passing = value <= budget;
  const difference = value - budget;

  return { passing, budget, actual: value, difference };
}
```

- [ ] Implement performance monitoring component:

```typescript
// lib/monitoring/performance-monitor.ts

export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Vercel Analytics
    if (window.va) {
      window.va('event', 'Web Vitals', {
        name: metric.name,
        value: metric.value,
        id: metric.id,
        label: metric.label,
      });
    }

    // Custom analytics endpoint
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
    }).catch((error) => {
      // Silent fail - don't block user
      console.error('Failed to report web vitals:', error);
    });
  }

  // Check against budgets
  if (metric.name === 'LCP') {
    const check = checkBudget('LCP', metric.value);
    if (!check.passing) {
      console.warn(`LCP exceeded budget by ${check.difference}ms`);
    }
  }
}
```

```typescript
// app/layout.tsx
import { reportWebVitals } from '@/lib/monitoring/performance-monitor';

export { reportWebVitals };
```

- [ ] Optimize homepage for maximum speed:

```tsx
// app/page.tsx (homepage optimization)

import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { ProofSection } from '@/components/home/ProofSection';
import { DirectionSection } from '@/components/home/DirectionSection';

// Static generation with revalidation
export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: 'Nathanael [Last Name] - Product Builder & Operator',
  description:
    'Product builder, founder, and operator. Previously built [X], currently building [Y].',
  // ... other metadata
};

// Fetch data at build time
async function getHomeData() {
  const [featuredWork, featuredWriting] = await Promise.all([
    db.project.findMany({
      where: { featured: true, published: true },
      orderBy: { order: 'asc' },
      take: 3,
    }),
    db.post.findMany({
      where: { featured: true, published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
  ]);

  return { featuredWork, featuredWriting };
}

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <div className="min-h-screen">
      {/* Critical above-fold content (no lazy loading) */}
      <HeroSection />

      {/* Below-fold content (can be lazy loaded) */}
      <ProofSection work={data.featuredWork} />
      <DirectionSection writing={data.featuredWriting} />
    </div>
  );
}
```

- [ ] Implement font optimization:

```typescript
// app/layout.tsx (font optimization)

import { Inter } from 'next/font/google';

// Load font with optimal settings
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent invisible text during load
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'], // System font fallback
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] Prevent layout shift:

```tsx
// components/ui/Image.tsx (CLS prevention)

import NextImage from 'next/image';

export function Image({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={className} style={{ position: 'relative', aspectRatio: `${width}/${height}` }}>
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
```

- [ ] Create performance testing script:

```typescript
// scripts/test-performance.ts

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const PAGES_TO_TEST = [
  { url: 'http://localhost:3000/', name: 'Homepage' },
  { url: 'http://localhost:3000/about', name: 'About' },
  { url: 'http://localhost:3000/work', name: 'Work' },
  { url: 'http://localhost:3000/writing', name: 'Writing' },
  { url: 'http://localhost:3000/resources', name: 'Resources' },
];

async function runLighthouse(url: string, name: string) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  const options = {
    logLevel: 'info' as const,
    output: 'json' as const,
    onlyCategories: ['performance'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);

  await chrome.kill();

  const { lhr } = runnerResult!;
  const score = lhr.categories.performance.score! * 100;

  console.log(`${name}: ${score}`);

  return {
    name,
    url,
    score,
    metrics: {
      FCP: lhr.audits['first-contentful-paint'].numericValue,
      LCP: lhr.audits['largest-contentful-paint'].numericValue,
      CLS: lhr.audits['cumulative-layout-shift'].numericValue,
      TBT: lhr.audits['total-blocking-time'].numericValue,
    },
  };
}

async function main() {
  console.log('Running Lighthouse tests...\n');

  const results = await Promise.all(
    PAGES_TO_TEST.map((page) => runLighthouse(page.url, page.name))
  );

  console.log('\nResults:');
  console.table(results);

  const failedPages = results.filter((r) => r.score < 90);

  if (failedPages.length > 0) {
    console.error(`\n❌ ${failedPages.length} page(s) below performance threshold (90)`);
    process.exit(1);
  } else {
    console.log('\n✅ All pages pass performance thresholds');
  }
}

main();
```

#### Testing Requirements

- [ ] Run Lighthouse on all major pages (score > 90)
- [ ] Measure Core Web Vitals in production
- [ ] Test performance on slow 3G connection
- [ ] Verify no layout shift on page load
- [ ] Test homepage loads in < 1 second

---

### Story 12.4: Caching & Rendering Strategy

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 8-10 hours

#### User Story

As a **user**,
I want **pages to load instantly**,
So that **browsing feels seamless and the site feels fast worldwide**.

#### Acceptance Criteria

**Given** public content pages
**When** loading the page
**Then** static generation is used for homepage, about, work, writing
**And** incremental revalidation handles content updates
**And** admin routes are never cached
**And** checkout endpoints are never cached
**And** signed URLs are never cached
**And** cache is aggressive for public content but never for secure flows

#### Implementation Checklist

- [ ] Implement static generation with ISR:

```tsx
// app/(public)/page.tsx (homepage - static)

export const revalidate = 86400; // 24 hours

export default async function HomePage() {
  // Data fetched at build time, revalidated daily
  const data = await getHomeData();
  return <HomeContent data={data} />;
}
```

```tsx
// app/(public)/about/page.tsx (about - static)

export const revalidate = 86400; // 24 hours

export default async function AboutPage() {
  // Static content, revalidated daily
  return <AboutContent />;
}
```

```tsx
// app/(public)/work/page.tsx (work index - ISR)

export const revalidate = 3600; // 1 hour

export default async function WorkPage() {
  const projects = await db.project.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return <WorkGrid projects={projects} />;
}
```

```tsx
// app/(public)/work/[slug]/page.tsx (project pages - ISR with generateStaticParams)

export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  const projects = await db.project.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await db.project.findUnique({
    where: { slug: params.slug, published: true },
  });

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
```

```tsx
// app/(public)/writing/[slug]/page.tsx (essay pages - ISR)

export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  const posts = await db.post.findMany({
    where: { published: true, type: 'essay' },
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function EssayPage({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({
    where: { slug: params.slug, published: true },
  });

  if (!post) notFound();

  return <EssayContent post={post} />;
}
```

- [ ] Disable caching for sensitive routes:

```tsx
// app/admin/layout.tsx (no caching)

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin routes are never cached
  return <div>{children}</div>;
}
```

```typescript
// app/api/checkout/route.ts (no caching)

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  // Checkout endpoint is never cached
  // ...
}
```

```typescript
// app/access/[slug]/route.ts (no caching)

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  // Access pages with tokens are never cached
  // ...
}
```

- [ ] Implement on-demand revalidation:

```typescript
// app/api/revalidate/route.ts

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/admin';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { path, tag } = body;

    if (path) {
      await revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    if (tag) {
      await revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag });
    }

    return NextResponse.json({ error: 'Missing path or tag' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
```

- [ ] Add cache tags for granular revalidation:

```tsx
// app/(public)/writing/page.tsx (with tags)

import { unstable_cache } from 'next/cache';

const getWriting = unstable_cache(
  async () => {
    return db.post.findMany({
      where: { published: true, type: 'essay' },
      orderBy: { publishedAt: 'desc' },
    });
  },
  ['writing-index'],
  {
    revalidate: 1800, // 30 minutes
    tags: ['writing', 'posts'],
  }
);

export default async function WritingPage() {
  const posts = await getWriting();
  return <WritingGrid posts={posts} />;
}
```

- [ ] Implement CDN caching headers:

```typescript
// next.config.js (headers for CDN caching)

async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      ],
    },
    {
      source: '/admin/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate',
        },
      ],
    },
    {
      source: '/api/checkout/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate',
        },
      ],
    },
  ];
}
```

- [ ] Create cache warming script (optional):

```typescript
// scripts/warm-cache.ts

/**
 * Cache Warming Script
 *
 * Runs after deployment to pre-generate static pages
 * and warm CDN cache.
 */

const PAGES_TO_WARM = ['/', '/about', '/work', '/startups', '/writing', '/resources'];

async function warmCache() {
  console.log('Warming cache...\n');

  for (const page of PAGES_TO_WARM) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${page}`;

    try {
      const response = await fetch(url);
      console.log(`✅ ${page} - ${response.status}`);
    } catch (error) {
      console.error(`❌ ${page} - Failed`);
    }
  }

  console.log('\nCache warming complete');
}

warmCache();
```

#### Testing Requirements

- [ ] Verify static pages are generated at build time
- [ ] Test ISR: Update content and verify revalidation after TTL
- [ ] Test on-demand revalidation: Trigger revalidation and verify cache refresh
- [ ] Verify admin routes are never cached (check response headers)
- [ ] Verify checkout endpoints are never cached
- [ ] Test cache warming script after deployment

---

### Story 12.5: Database Performance & Resilience

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 8-10 hours

#### User Story

As a **developer**,
I want **the database to perform well under load and never cascade failures**,
So that **slow queries don't degrade the site and the system remains stable**.

#### Acceptance Criteria

**Given** database queries
**When** executing queries
**Then** frequently queried columns are indexed
**And** query limits are enforced (no unbounded queries)
**And** timeouts are set on all DB calls
**And** connection pooling is configured correctly
**And** no N+1 query patterns exist
**And** DB performance remains stable under load

#### Implementation Checklist

- [ ] Configure database connection pooling:

```typescript
// lib/db/client.ts

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],

    // Connection pool configuration
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// Graceful shutdown
process.on('beforeExit', async () => {
  await db.$disconnect();
});
```

```env
# .env (connection pooling for serverless)

# Direct connection for migrations
DATABASE_URL="postgresql://user:password@host:5432/db"

# Connection pooling for app (Prisma Data Proxy or PgBouncer)
DATABASE_URL_POOLING="postgresql://user:password@pooler.host:5432/db?pgbouncer=true&connection_limit=10"
```

- [ ] Add query timeouts:

```typescript
// lib/db/with-timeout.ts

/**
 * Wrap database queries with timeout
 * Prevents slow queries from blocking requests
 */

export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 5000 // 5 seconds default
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Database query timeout')), timeoutMs)
    ),
  ]);
}

// Usage:
// const users = await withTimeout(
//   db.user.findMany(),
//   3000 // 3 second timeout
// );
```

- [ ] Enforce query limits:

```typescript
// lib/db/safe-queries.ts

/**
 * Safe query wrappers that enforce limits
 * Prevents unbounded queries that could load too much data
 */

const MAX_QUERY_LIMIT = 100;

export async function safeFindMany<T>(model: any, args: any = {}): Promise<T[]> {
  // Enforce max limit
  const limit = args.take || MAX_QUERY_LIMIT;
  const safeTake = Math.min(limit, MAX_QUERY_LIMIT);

  return withTimeout(
    model.findMany({
      ...args,
      take: safeTake,
    })
  );
}

// Usage:
// const posts = await safeFindMany(db.post, {
//   where: { published: true },
//   take: 50, // Will be capped at MAX_QUERY_LIMIT
// });
```

- [ ] Prevent N+1 queries with includes:

```typescript
// lib/db/queries.ts (optimized queries)

/**
 * Optimized database queries
 * Uses `include` to prevent N+1 patterns
 */

export async function getOrdersWithDetails(limit: number = 50) {
  return db.order.findMany({
    take: limit,
    include: {
      // Include related data in single query
      product: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      entitlements: {
        select: {
          id: true,
          active: true,
          createdAt: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

// BAD: N+1 query pattern
// const orders = await db.order.findMany();
// for (const order of orders) {
//   const product = await db.product.findUnique({ where: { id: order.productId } });
//   const entitlements = await db.entitlement.findMany({ where: { orderId: order.id } });
// }

// GOOD: Single query with includes
// const orders = await getOrdersWithDetails();
```

- [ ] Add database performance monitoring:

```typescript
// lib/db/monitoring.ts

import { PrismaClient } from '@prisma/client';

export function createMonitoredPrismaClient() {
  const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  });

  // Monitor slow queries
  prisma.$on('query' as never, (e: any) => {
    const duration = e.duration;

    // Log slow queries (> 1 second)
    if (duration > 1000) {
      console.warn('Slow query detected:', {
        query: e.query,
        duration: `${duration}ms`,
        params: e.params,
      });

      // Send to monitoring service (Sentry, etc.)
      if (process.env.NODE_ENV === 'production') {
        // Sentry.captureMessage('Slow database query', {
        //   level: 'warning',
        //   extra: { query: e.query, duration, params: e.params },
        // });
      }
    }
  });

  return prisma;
}
```

- [ ] Create database health check:

```typescript
// app/api/health/db/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Simple query to check DB connectivity
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Database connection failed',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
```

- [ ] Optimize indexes (already defined in schema):

```prisma
// prisma/schema.prisma (review indexes)

// Verify indexes on:
// - Foreign keys
// - Frequently queried columns
// - Sort columns
// - Filter columns

model Post {
  @@index([published, publishedAt(sort: Desc)]) // For public post lists
  @@index([featured, published]) // For featured content queries
  @@index([slug]) // For slug lookups (already unique, but explicit)
}

model Order {
  @@index([status]) // For filtering by status
  @@index([customerEmail]) // For customer order lookups
  @@index([createdAt(sort: Desc)]) // For date-sorted lists
}

model Entitlement {
  @@index([userId, active]) // For user access checks
  @@index([productId, active]) // For product access lists
}
```

- [ ] Create database migration safety checks:

```bash
#!/bin/bash
# scripts/safe-migrate.sh

# Database Migration Safety Script

echo "Running migration safety checks..."

# Check if migrations compile
npx prisma migrate resolve --preview-feature

# Generate client to verify schema
npx prisma generate

# Run migrations in transaction
npx prisma migrate deploy

echo "Migration complete"
```

#### Testing Requirements

- [ ] Load test: 100 concurrent queries for 5 minutes
- [ ] Verify connection pool doesn't exhaust under load
- [ ] Test query timeout: Simulate slow query and verify timeout
- [ ] Review all queries for N+1 patterns (use Prisma query logging)
- [ ] Test database health check endpoint
- [ ] Verify indexes are used (EXPLAIN ANALYZE in Postgres)

---

### Story 12.6: API Reliability & Fault Isolation

**Priority:** High
**Complexity:** High
**Estimated Time:** 8-10 hours

#### User Story

As a **user**,
I want **the site to remain usable even when parts of it fail**,
So that **one broken service doesn't take down the entire site**.

#### Acceptance Criteria

**Given** third-party service failures (Stripe, email, etc.)
**When** a service is unavailable
**Then** non-critical APIs degrade gracefully
**And** content APIs are separate from commerce APIs
**And** commerce APIs are separate from admin APIs
**And** circuit-breaker behavior prevents cascading failures
**And** Stripe outage does not break content browsing
**And** email failure does not block checkout completion

#### Implementation Checklist

- [ ] Implement graceful degradation patterns:

```typescript
// lib/api/graceful-degradation.ts

/**
 * Graceful Degradation Patterns
 *
 * Non-critical services should fail silently without blocking core functionality
 */

export async function fetchWithFallback<T>(
  fetchFn: () => Promise<T>,
  fallback: T,
  options: {
    timeout?: number;
    logError?: boolean;
  } = {}
): Promise<T> {
  const { timeout = 5000, logError = true } = options;

  try {
    const result = await Promise.race([
      fetchFn(),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout)),
    ]);

    return result;
  } catch (error) {
    if (logError) {
      console.error('Fetch failed, using fallback:', error);
    }

    return fallback;
  }
}

// Example usage:
// const analytics = await fetchWithFallback(
//   () => fetchAnalytics(),
//   { views: 0, visitors: 0 }, // Fallback data
//   { timeout: 2000 }
// );
```

- [ ] Implement circuit breaker pattern:

```typescript
// lib/api/circuit-breaker.ts

/**
 * Circuit Breaker Pattern
 *
 * Prevents repeated calls to failing services
 */

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failureCount = 0;
  private successCount = 0;
  private lastFailureTime: number | null = null;

  constructor(
    private options: {
      failureThreshold: number; // Open circuit after N failures
      successThreshold: number; // Close circuit after N successes in HALF_OPEN
      timeout: number; // Time to wait before trying HALF_OPEN
    } = {
      failureThreshold: 5,
      successThreshold: 2,
      timeout: 60000, // 1 minute
    }
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      // Check if timeout has elapsed
      if (this.lastFailureTime && Date.now() - this.lastFailureTime > this.options.timeout) {
        this.state = 'HALF_OPEN';
        this.successCount = 0;
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();

      // Success
      this.onSuccess();

      return result;
    } catch (error) {
      // Failure
      this.onFailure();

      throw error;
    }
  }

  private onSuccess() {
    this.failureCount = 0;

    if (this.state === 'HALF_OPEN') {
      this.successCount++;

      if (this.successCount >= this.options.successThreshold) {
        this.state = 'CLOSED';
        console.log('Circuit breaker closed');
      }
    }
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.options.failureThreshold) {
      this.state = 'OPEN';
      console.error('Circuit breaker opened');
    }
  }

  getState() {
    return this.state;
  }
}

// Create circuit breakers for third-party services
export const stripeCircuitBreaker = new CircuitBreaker();
export const emailCircuitBreaker = new CircuitBreaker();
```

- [ ] Separate API routes by concern:

```
app/api/
├── content/           # Content APIs (public, cacheable)
│   ├── posts/
│   └── projects/
│
├── commerce/          # Commerce APIs (secure, never cached)
│   ├── checkout/
│   ├── webhooks/
│   └── orders/
│
└── admin/             # Admin APIs (authenticated, never cached)
    ├── content/
    ├── products/
    └── orders/
```

- [ ] Implement fault isolation for Stripe:

```typescript
// lib/stripe/safe-client.ts

import Stripe from 'stripe';
import { stripeCircuitBreaker } from '@/lib/api/circuit-breaker';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

/**
 * Safe Stripe client with circuit breaker
 * Prevents cascading failures when Stripe is down
 */

export async function safeStripeCall<T>(fn: (stripe: Stripe) => Promise<T>): Promise<T> {
  try {
    return await stripeCircuitBreaker.execute(() => fn(stripe));
  } catch (error) {
    // Log error
    console.error('Stripe call failed:', error);

    // Check if circuit is open
    if (stripeCircuitBreaker.getState() === 'OPEN') {
      throw new Error('Payment system temporarily unavailable. Please try again later.');
    }

    throw error;
  }
}

// Usage:
// const session = await safeStripeCall((stripe) =>
//   stripe.checkout.sessions.create({ ... })
// );
```

- [ ] Implement fault isolation for email:

```typescript
// lib/email/safe-sender.ts

import { emailCircuitBreaker } from '@/lib/api/circuit-breaker';
import { sendEmail as rawSendEmail } from '@/lib/email/sender';

/**
 * Safe email sender with circuit breaker
 * Email failures should not block critical flows
 */

export async function safeSendEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await emailCircuitBreaker.execute(() => rawSendEmail(params));

    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);

    // Log to failed jobs for retry
    await db.failedJob.create({
      data: {
        jobType: 'email',
        payload: params,
        error: error instanceof Error ? error.message : 'Unknown error',
        attempts: 0,
        maxAttempts: 3,
      },
    });

    // Don't throw - email failure should not block checkout
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
```

- [ ] Update checkout to handle email failures gracefully:

```typescript
// lib/stripe/handlers.ts (update handleCheckoutCompleted)

export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // ... existing order creation and entitlement logic

  // Send access email (non-blocking)
  const emailResult = await safeSendEmail({
    to: order.customerEmail,
    subject: `Access: ${product.title}`,
    html: renderAccessEmail(order, entitlement),
  });

  if (!emailResult.success) {
    // Log warning but don't fail the webhook
    console.warn('Access email failed to send, will retry:', emailResult.error);

    // Customer can still access via /access/recover
  }

  return { success: true };
}
```

- [ ] Create health check for external dependencies:

```typescript
// app/api/health/external/route.ts

import { NextResponse } from 'next/server';
import { safeStripeCall } from '@/lib/stripe/safe-client';
import { stripeCircuitBreaker, emailCircuitBreaker } from '@/lib/api/circuit-breaker';

export const dynamic = 'force-dynamic';

export async function GET() {
  const health = {
    stripe: 'unknown',
    email: 'unknown',
    timestamp: new Date().toISOString(),
  };

  // Check Stripe
  try {
    await safeStripeCall((stripe) => stripe.balance.retrieve());
    health.stripe = 'healthy';
  } catch (error) {
    health.stripe = stripeCircuitBreaker.getState() === 'OPEN' ? 'circuit_open' : 'unhealthy';
  }

  // Check Email
  health.email = emailCircuitBreaker.getState() === 'CLOSED' ? 'healthy' : 'degraded';

  return NextResponse.json(health);
}
```

#### Testing Requirements

- [ ] Test graceful degradation: Disable Stripe and verify content browsing works
- [ ] Test circuit breaker: Trigger 5 failures and verify circuit opens
- [ ] Test email failure: Disable email service and verify checkout completes
- [ ] Test recovery: After circuit opens, verify it transitions to HALF_OPEN
- [ ] Load test: Verify partial outages don't cascade

---

_Continuing with remaining stories (12.7-12.15) following the same comprehensive pattern..._

---

### Story 12.7: Error Handling & User-Facing Failures

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 6-8 hours

#### User Story

As a **user**,
I want **errors to be calm and helpful**,
So that **I don't panic and know what to do next**.

#### Acceptance Criteria

**Given** an error occurs
**When** the error is displayed to the user
**Then** the message is friendly and calm
**And** clear next steps are provided
**And** no stack traces or technical jargon are shown
**And** errors acknowledge the issue without blaming the user

#### Implementation Checklist

- [ ] Create error message templates:

```typescript
// lib/errors/messages.ts

/**
 * User-Friendly Error Messages
 *
 * All user-facing errors should be:
 * - Calm and friendly
 * - Clear about what happened
 * - Provide next steps
 * - Never blame the user
 */

export const ERROR_MESSAGES = {
  // General
  general: {
    title: 'Something went wrong',
    message: 'We encountered an unexpected issue. Please try again.',
    action: 'Try again',
  },

  // Network errors
  network: {
    title: 'Connection issue',
    message: 'We couldn't connect to the server. Please check your internet connection and try again.',
    action: 'Retry',
  },

  // Payment errors
  paymentFailed: {
    title: 'Payment unsuccessful',
    message: 'Your payment could not be processed. No charge was made. Please try again or use a different payment method.',
    action: 'Try again',
  },

  paymentProcessing: {
    title: 'Processing your payment',
    message: 'Your payment is being processed. You'll receive an email shortly with access instructions.',
    action: 'Check email',
  },

  // Access errors
  accessDenied: {
    title: 'Access not found',
    message: 'We couldn't confirm your access to this resource. If you recently purchased, check your email for the access link.',
    action: 'Check email',
  },

  accessExpired: {
    title: 'Link expired',
    message: 'This access link has expired. Request a new one using your email address.',
    action: 'Request new link',
  },

  accessRevoked: {
    title: 'Access revoked',
    message: 'Access to this resource has been revoked. If you believe this is an error, please contact support.',
    action: 'Contact support',
  },

  // Form errors
  invalidInput: {
    title: 'Please check your input',
    message: 'Some information is missing or incorrect. Please review and try again.',
    action: 'Review form',
  },

  // Rate limiting
  rateLimited: {
    title: 'Too many requests',
    message: 'You're doing that too quickly. Please wait a moment and try again.',
    action: 'Wait and retry',
  },
} as const;

export function getErrorMessage(type: keyof typeof ERROR_MESSAGES) {
  return ERROR_MESSAGES[type];
}
```

- [ ] Create error page component:

```tsx
// components/errors/ErrorPage.tsx

export function ErrorPage({
  title,
  message,
  action,
  onAction,
}: {
  title: string;
  message: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
          <p className="text-neutral-600">{message}</p>
        </div>

        {action && onAction && <Button onClick={onAction}>{action}</Button>}

        <div className="pt-4">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] Create global error boundary:

```tsx
// app/error.tsx

'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/components/errors/ErrorPage';
import { ERROR_MESSAGES } from '@/lib/errors/messages';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Global error caught:', error);

    // Send to Sentry (production only)
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(error);
    }
  }, [error]);

  return (
    <ErrorPage
      title={ERROR_MESSAGES.general.title}
      message={ERROR_MESSAGES.general.message}
      action={ERROR_MESSAGES.general.action}
      onAction={reset}
    />
  );
}
```

- [ ] Create API error handler:

```typescript
// lib/api/error-handler.ts

import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public userMessage?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error('API error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.userMessage || 'An error occurred',
        message: error.message, // Internal message for debugging
      },
      { status: error.statusCode }
    );
  }

  // Unknown errors
  return NextResponse.json(
    {
      error: 'Something went wrong. Please try again.',
    },
    { status: 500 }
  );
}

// Usage in API routes:
// export async function POST(request: Request) {
//   try {
//     // ... logic
//   } catch (error) {
//     return handleApiError(error);
//   }
// }
```

- [ ] Create 404 page:

```tsx
// app/not-found.tsx

import { ErrorPage } from '@/components/errors/ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage
      title="Page not found"
      message="The page you're looking for doesn't exist or has been moved."
    />
  );
}
```

- [ ] Create 500 page:

```tsx
// app/500.tsx

import { ErrorPage } from '@/components/errors/ErrorPage';

export default function ServerError() {
  return (
    <ErrorPage
      title="Server error"
      message="We encountered an issue on our end. We've been notified and are working on it."
    />
  );
}
```

#### Testing Requirements

- [ ] Test error boundaries: Trigger client error and verify friendly message
- [ ] Test API errors: Make invalid request and verify user-friendly response
- [ ] Test 404 page: Navigate to non-existent page
- [ ] Test network errors: Simulate offline and verify messaging
- [ ] Verify no stack traces leak to users in production

---

### Story 12.8: Observability & Alerting (Operator-First)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 8-10 hours

#### User Story

As an **operator**,
I want **to know about issues before users complain**,
So that **I can fix problems proactively and maintain trust**.

#### Acceptance Criteria

**Given** application errors or failures
**When** issues occur
**Then** application errors are monitored
**And** checkout failures trigger alerts
**And** webhook failures trigger alerts
**And** email send failures are logged
**And** DB connection issues trigger alerts
**And** alerts are actionable (not spam)
**And** severity-based routing is implemented

#### Implementation Checklist

- [ ] Set up error tracking with Sentry:

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set sample rate
  tracesSampleRate: 0.1, // 10% of transactions

  // Environment
  environment: process.env.NODE_ENV,

  // Ignore common errors
  ignoreErrors: ['ResizeObserver loop limit exceeded', 'Non-Error promise rejection captured'],

  // Filter sensitive data
  beforeSend(event, hint) {
    // Remove sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }

    return event;
  },
});
```

```javascript
// sentry.server.config.js

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
```

- [ ] Create custom error logger:

```typescript
// lib/monitoring/error-logger.ts

import * as Sentry from '@sentry/nextjs';

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export function logError(
  error: Error,
  context: {
    severity: ErrorSeverity;
    category: 'payment' | 'webhook' | 'email' | 'database' | 'general';
    metadata?: Record<string, any>;
  }
) {
  console.error(`[${context.severity.toUpperCase()}] ${context.category}:`, error);

  // Send to Sentry with context
  Sentry.captureException(error, {
    level: mapSeverityToSentryLevel(context.severity),
    tags: {
      category: context.category,
    },
    extra: context.metadata,
  });

  // Log to database for admin visibility
  if (process.env.NODE_ENV === 'production') {
    db.errorLog
      .create({
        data: {
          severity: context.severity,
          category: context.category,
          message: error.message,
          stack: error.stack,
          metadata: context.metadata || {},
        },
      })
      .catch((dbError) => {
        // Don't let logging errors block execution
        console.error('Failed to log error to database:', dbError);
      });
  }
}

function mapSeverityToSentryLevel(severity: ErrorSeverity): Sentry.SeverityLevel {
  switch (severity) {
    case ErrorSeverity.LOW:
      return 'info';
    case ErrorSeverity.MEDIUM:
      return 'warning';
    case ErrorSeverity.HIGH:
      return 'error';
    case ErrorSeverity.CRITICAL:
      return 'fatal';
  }
}

// Usage:
// logError(new Error('Checkout failed'), {
//   severity: ErrorSeverity.CRITICAL,
//   category: 'payment',
//   metadata: { sessionId: 'cs_123' },
// });
```

- [ ] Add alerting for critical flows:

```typescript
// lib/monitoring/alerts.ts

import { logError, ErrorSeverity } from './error-logger';

/**
 * Alert on critical failures
 * Routes to appropriate channels based on severity
 */

export async function alertCheckoutFailure(error: Error, sessionId: string) {
  logError(error, {
    severity: ErrorSeverity.CRITICAL,
    category: 'payment',
    metadata: { sessionId },
  });

  // Send immediate notification (email, SMS, Slack)
  await sendAlertNotification({
    title: 'Checkout Failure (CRITICAL)',
    message: `Checkout session ${sessionId} failed: ${error.message}`,
    severity: 'critical',
  });
}

export async function alertWebhookFailure(error: Error, webhookId: string) {
  logError(error, {
    severity: ErrorSeverity.HIGH,
    category: 'webhook',
    metadata: { webhookId },
  });

  // Log to failed jobs for retry
  await db.failedJob.create({
    data: {
      jobType: 'webhook',
      payload: { webhookId },
      error: error.message,
      attempts: 0,
      maxAttempts: 5,
    },
  });
}

export async function alertEmailFailure(error: Error, recipient: string) {
  logError(error, {
    severity: ErrorSeverity.MEDIUM,
    category: 'email',
    metadata: { recipient },
  });

  // Log to failed jobs for retry
  await db.failedJob.create({
    data: {
      jobType: 'email',
      payload: { recipient },
      error: error.message,
      attempts: 0,
      maxAttempts: 3,
    },
  });
}

async function sendAlertNotification(alert: {
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}) {
  // Send to configured notification channel
  // Examples: Email, SMS, Slack, PagerDuty

  if (alert.severity === 'critical') {
    // Send SMS or PagerDuty for critical issues
    // await sendSMS(process.env.ALERT_PHONE, alert.message);
  }

  // Always log alert
  console.error('ALERT:', alert);
}
```

- [ ] Create monitoring dashboard endpoint:

```typescript
// app/api/admin/monitoring/route.ts

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/admin';
import { db } from '@/lib/db';

export async function GET() {
  await requireAdmin();

  // Get recent errors and failed jobs
  const [recentErrors, failedJobs, systemHealth] = await Promise.all([
    db.errorLog.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
    }),
    db.failedJob.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    }),
    getSystemHealth(),
  ]);

  return NextResponse.json({
    errors: recentErrors,
    failedJobs,
    health: systemHealth,
    timestamp: new Date().toISOString(),
  });
}

async function getSystemHealth() {
  // Check various system components
  const [dbHealth, stripeHealth, emailHealth] = await Promise.all([
    checkDatabaseHealth(),
    checkStripeHealth(),
    checkEmailHealth(),
  ]);

  return {
    database: dbHealth,
    stripe: stripeHealth,
    email: emailHealth,
  };
}
```

- [ ] Create uptime monitor (using BetterStack, UptimeRobot, or similar):

```typescript
// app/api/health/route.ts

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Simple health check for uptime monitoring
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
```

- [ ] Set up performance monitoring:

```typescript
// lib/monitoring/performance.ts

export function trackPerformance(metric: {
  name: string;
  value: number;
  tags?: Record<string, string>;
}) {
  // Send to analytics service
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', 'Performance', {
      metric: metric.name,
      value: metric.value,
      ...metric.tags,
    });
  }

  // Log slow operations
  if (metric.value > 1000) {
    console.warn(`Slow operation: ${metric.name} took ${metric.value}ms`);
  }
}

// Usage:
// const start = Date.now();
// await someOperation();
// trackPerformance({
//   name: 'operation_duration',
//   value: Date.now() - start,
//   tags: { operation: 'checkout' },
// });
```

#### Testing Requirements

- [ ] Test error logging: Trigger error and verify Sentry capture
- [ ] Test critical alerts: Simulate checkout failure and verify alert
- [ ] Test failed job logging: Simulate webhook failure and verify DB entry
- [ ] Test monitoring dashboard: Access endpoint and verify metrics
- [ ] Set up uptime monitor and verify pings

---

_Due to length, continuing with abbreviated versions of remaining stories 12.9-12.15. Each follows the same comprehensive pattern with user stories, acceptance criteria, implementation checklists with code, and testing requirements._

---

### Story 12.9: Third-Party Dependency Management

- Wrap all external calls with error handling
- Implement retries with exponential backoff
- Add fallbacks where possible
- Monitor third-party service health

### Story 12.10: Uptime Strategy & Hosting Reliability

- Configure zero-downtime deployments (Vercel)
- Implement rollback capability
- Set up CI/CD pipeline
- Monitor deployment health

### Story 12.11: Backup, Recovery & Disaster Readiness

- Automated database backups (daily)
- Backup retention policy (30 days)
- Documented restore process
- Quarterly restore test

### Story 12.12: Security & Trust Signals

- HTTPS everywhere (enforced)
- Secure cookies with httpOnly, sameSite
- CSRF protection (Next.js default)
- Input validation on all forms
- No mixed content warnings

### Story 12.13: Load Testing & Stress Scenarios

- Test traffic spike (1000 concurrent users)
- Test purchase burst (100 simultaneous checkouts)
- Test webhook retry storms
- Identify and fix bottlenecks

### Story 12.14: Performance Regression Prevention

- Bundle size monitoring in CI
- Lighthouse checks in CI (score > 90)
- Manual review for heavy dependencies
- Performance budget enforcement

### Story 12.15: Governance & Discipline

- Reliability impact assessment for new features
- No "quick hacks" in production
- Reliability issues prioritized over features
- Quarterly performance review
- Annual disaster recovery drill

---

## Epic Completion Criteria

This epic is complete when:

1. ✅ Performance budgets are defined and enforced
2. ✅ Caching strategy is implemented (static + ISR)
3. ✅ Database is optimized (indexes, connection pooling, timeouts)
4. ✅ API reliability patterns implemented (circuit breakers, graceful degradation)
5. ✅ Error handling is user-friendly and calm
6. ✅ Observability and alerting are configured
7. ✅ Third-party dependencies have fallbacks
8. ✅ Zero-downtime deployments are configured
9. ✅ Backup and recovery processes are documented and tested
10. ✅ Security best practices are enforced
11. ✅ Load testing passes (1000 concurrent users)
12. ✅ Performance regression prevention is automated
13. ✅ Governance and discipline practices are documented

### Validation Tests

- [ ] Lighthouse score > 90 on all major pages
- [ ] Load test: 1000 concurrent users for 10 minutes without failures
- [ ] Fault tolerance: Disable Stripe and verify content browsing works
- [ ] Backup restore: Successfully restore database from backup
- [ ] Performance budget: No pages exceed defined budgets
- [ ] Uptime: > 99.9% uptime over 30 days

---

## Deliverables

1. **Performance Infrastructure**
   - Performance budgets and monitoring
   - Caching strategy (static generation + ISR)
   - Bundle size monitoring

2. **Database Optimization**
   - Connection pooling
   - Query timeouts
   - Indexes on critical columns
   - N+1 prevention

3. **Reliability Patterns**
   - Circuit breakers for third-party services
   - Graceful degradation
   - Fault isolation

4. **Error Handling**
   - User-friendly error messages
   - Global error boundary
   - API error handlers

5. **Observability**
   - Sentry error tracking
   - Custom error logging
   - Monitoring dashboard
   - Uptime monitoring

6. **Deployment Infrastructure**
   - Zero-downtime deployments
   - Rollback capability
   - CI/CD pipeline

7. **Backup & Recovery**
   - Automated database backups
   - Documented restore process
   - Recovery testing

8. **Security**
   - HTTPS enforcement
   - Secure cookies
   - CSRF protection
   - Input validation

9. **Load Testing**
   - Load test scripts
   - Stress test scenarios
   - Bottleneck identification

10. **Governance**
    - Performance review process
    - Reliability guidelines
    - Decision-making criteria

---

## Why This Epic Matters

**One slow page, one broken checkout, or one visible error undoes months of credibility.**

Most personal sites fail silently by:

- Getting slow over time
- Breaking under unexpected load
- Feeling unreliable or unprofessional

When Epic 12 is done correctly:

> **The site fades into the background — and trust quietly compounds.**

- Employers see a solid, professional site
- Customers complete purchases without anxiety
- You sleep well knowing the system is monitored
- The platform earns long-term trust through boring reliability

This epic ensures the Riqle platform is:

- **Fast** (< 1s page loads)
- **Stable** (99.9% uptime)
- **Resilient** (graceful degradation)
- **Trustworthy** (professional at every touchpoint)

Reliability is not a feature — it is **table stakes for trust**.

---

**Epic 12 Complete**
