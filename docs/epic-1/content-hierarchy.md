# content hierarchy rules: featuring and ordering logic

> **principle:** quality over quantity. manual curation over algorithms. employer sees best work first.
> **rule:** featured = what you'd show an employer in a 30-second pitch.

---

## core philosophy

**the problem:**

- showing everything = showing nothing
- chronological = newest might not be best
- automatic featuring = no editorial control
- equal prominence = lack of focus

**the solution:**

- manual curation for featured content
- thoughtful ordering strategies
- homepage shows only best of best
- index pages show top 3-5, then archive
- employer sees proof immediately

**user feeling:**

- "this person highlighted their strongest work."
- "i'm seeing quality, not quantity."
- "the best stuff is easy to find."

---

## featuring philosophy

### what "featured" means

**definition:**

- featured = worthy of immediate employer attention
- featured = representative of best capability
- featured = current and relevant
- featured = proud to show

**not:**

- most recent
- most popular
- most effort
- most content

### featuring is manual curation

**how it works:**

- admin UI has "featured" toggle (boolean)
- you decide what gets featured
- review quarterly: "is this still my best work?"
- update as you create better work

**no automatic featuring:**

- ❌ newest 5 posts automatically featured
- ❌ most viewed automatically featured
- ❌ highest rated automatically featured
- ✓ manual selection only

**reasoning:**

- you know your best work better than an algorithm
- featuring strategy shifts over time
- quality > metrics

---

## featuring limits per content type

### writing (essays)

**homepage:**

- 1 featured essay (maximum)
- OR: 0 if no essay is homepage-worthy

**writing index:**

- 3 featured essays (maximum)
- shows above fold, before "all writing" link

**criteria:**

- demonstrates depth of thinking
- relevant to target employer
- well-written (no typos, clear structure)
- provides unique insight

**examples of homepage-worthy essays:**

```
✓ "building in public: lessons from markpoint"
  (shows startup experience + transparency)

✓ "teaching 500 students what the hsc really tests"
  (demonstrates domain expertise + scale)

✓ "focus: applying the korean concept of 집중 to work"
  (shows cultural awareness + productivity philosophy)

❌ "random thoughts on productivity"
  (too vague, not distinctive)

❌ "my week in review: march 15-22"
  (too temporal, not evergreen)
```

---

### work (projects)

**homepage:**

- 1-2 featured projects (maximum)
- prioritize: startups you own > complex builds > polished work

**work index:**

- 5 featured projects (maximum)
- shows above fold as grid

**criteria:**

- demonstrates technical capability
- quantifiable outcome (if possible)
- visually presentable (if applicable)
- represents current skill level

**examples of homepage-worthy projects:**

```
✓ markpoint
  (startup with real users, demonstrates full-stack + business)

✓ riqle portfolio site
  (meta: the site itself shows design + dev skills)

✓ client: saas analytics dashboard (1000+ daily users)
  (scale + impact, even if confidential)

❌ tutorial project from bootcamp
  (not representative of professional work)

❌ abandoned side project with no users
  (no outcome, no proof)
```

---

### startups

**homepage:**

- 1 featured startup (markpoint)
- OR: 0 if focusing on employment (not startup)

**startups index:**

- 1-2 featured startups (all of them, likely)
- markpoint always primary

**criteria:**

- has traction (users, revenue, or clear momentum)
- actively maintained
- publicly discussable

**examples:**

```
✓ markpoint (1000 users, active development)
✓ future startup with funding/users
❌ idea-stage venture with no validation
❌ shut-down startup (archive it)
```

---

### resources (products)

**homepage:**

- 0 featured resources
- resources link in footer only

**resources index:**

- 3 featured resources (maximum)
- shows above fold

**criteria:**

- proven sales/downloads
- evidence-backed
- professional presentation
- active support/updates

**examples:**

```
✓ hsc english comprehensive guide (50+ sales, 5 years experience)
✓ essay writing toolkit (built from real student feedback)
❌ hastily created "ultimate guide" (no credibility)
❌ outdated resource from 2020 (not maintained)
```

---

## ordering strategies

### homepage content order

```
scroll 1 (0-100vh):
  - name / identity
  - positioning line
  - 3 proof anchors
  - 2 CTAs

scroll 2 (100vh-200vh):
  - featured project (1)
  - featured essay (1)

scroll 3+ (200vh+):
  - optional texture
  - footer with full navigation
```

**featured project selection (homepage):**

```typescript
// pseudo-code
const featuredProject = await db.project.findFirst({
  where: {
    status: 'published',
    featured: true,
  },
  orderBy: [
    { order: 'asc' }, // manual ordering
    { publishedAt: 'desc' }, // fallback: recent
  ],
});
```

**featured essay selection (homepage):**

```typescript
const featuredEssay = await db.post.findFirst({
  where: {
    status: 'published',
    featured: true,
  },
  orderBy: [
    { publishedAt: 'desc' }, // most recent featured
  ],
});
```

---

### work index order

**featured projects (above fold):**

```typescript
const featuredProjects = await db.project.findMany({
  where: {
    status: 'published',
    featured: true,
  },
  orderBy: [
    { order: 'asc' }, // manual ordering (1, 2, 3, 4, 5)
  ],
  take: 5,
});
```

**manual ordering field:**

- admin can set `order: 1` for most important
- `order: 2` for second, etc.
- allows precise control of presentation

**all projects (archive view):**

```typescript
const allProjects = await db.project.findMany({
  where: { status: 'published' },
  orderBy: [
    { featured: 'desc' }, // featured first
    { publishedAt: 'desc' }, // then by date
  ],
});
```

---

### writing index order

**featured essays (above fold):**

```typescript
const featuredEssays = await db.post.findMany({
  where: {
    status: 'published',
    featured: true,
  },
  orderBy: [
    { publishedAt: 'desc' }, // recent featured essays
  ],
  take: 3,
});
```

**all essays (archive view):**

```typescript
const allEssays = await db.post.findMany({
  where: { status: 'published' },
  orderBy: [
    { publishedAt: 'desc' }, // chronological
  ],
});
```

**reasoning:**

- essays are temporal (publish date matters)
- projects are evergreen (quality matters more than date)

---

### startups index order

**primary startup:**

```typescript
const primaryStartup = await db.startup.findFirst({
  where: {
    status: 'published',
    slug: 'markpoint', // hardcoded for now
  },
});
```

**other startups (if any):**

```typescript
const otherStartups = await db.startup.findMany({
  where: {
    status: 'published',
    slug: { not: 'markpoint' },
  },
  orderBy: [
    { founded: 'desc' }, // most recent ventures first
  ],
});
```

---

### resources index order

**featured resources:**

```typescript
const featuredResources = await db.resource.findMany({
  where: {
    status: 'published',
    featured: true,
  },
  orderBy: [
    { createdAt: 'desc' }, // most recently added
  ],
  take: 3,
});
```

**all resources:**

```typescript
const allResources = await db.resource.findMany({
  where: { status: 'published' },
  orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
});
```

---

## related content logic

### purpose

**jobs:**

- keep user engaged after reading
- show depth (multiple related pieces)
- cross-promote content types

**not:**

- SEO link farming
- arbitrary "you might also like"
- algorithmic recommendations (keep simple)

### essay → related content

**show:**

- 2-3 related essays (same tags)
- 1 related project (if essay discusses a build)
- 1 related startup (if essay about startup journey)

**query:**

```typescript
// for essay with tags ["teaching", "hsc"]
const relatedEssays = await db.post.findMany({
  where: {
    status: 'published',
    id: { not: currentEssay.id },
    OR: [
      { tags: { hasSome: currentEssay.tags } }, // shares tags
    ],
  },
  orderBy: [{ publishedAt: 'desc' }],
  take: 3,
});
```

### project → related content

**show:**

- 2-3 related projects (same tech stack)
- 1 related essay (if essay discusses this project)

**query:**

```typescript
const relatedProjects = await db.project.findMany({
  where: {
    status: 'published',
    id: { not: currentProject.id },
    OR: [
      { techStack: { hasSome: currentProject.techStack } },
      { tags: { hasSome: currentProject.tags } },
    ],
  },
  orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
  take: 3,
});
```

### startup → related content

**show:**

- related essays about startup journey
- related projects (if tech used in startup)

**manual curation recommended:**

```typescript
// in startup content, manually link:
'read more: /writing/building-markpoint';
'see the tech stack: /work/markpoint';
```

---

## freshness vs evergreen balance

### homepage (evergreen bias)

**strategy:**

- featured content rarely changes
- update quarterly, not weekly
- employer sees consistent, best work
- not a feed, not a blog

**when to update featured:**

- you publish significantly better work
- featured work becomes outdated
- strategic focus shifts (e.g., moving from employment to startup)

**freshness indicators:**

- "last updated: [date]" in footer
- optional: changelog page

---

### index pages (mix of both)

**writing index:**

- chronological (freshness matters)
- most recent shows temporal relevance

**work index:**

- manual order (evergreen matters)
- best work shows first, regardless of date

**startups:**

- featured first, always
- traction metrics updated in content

**resources:**

- featured first
- newest additions surface easily

---

### archive pages (chronological)

**all archive views:**

```typescript
orderBy: [
  { publishedAt: 'desc' }, // newest first
];
```

**pagination:**

```
/writing/archive?page=1 (essays 1-10)
/writing/archive?page=2 (essays 11-20)
```

**10 items per page (configurable)**

---

## filtering and sorting

### allowed filters

**writing:**

- by tag: `/writing?tag=teaching`
- by year: `/writing?year=2026`

**work:**

- by tech: `/work?tech=nextjs`
- by year: `/work?year=2026`

**implementation:**

```typescript
// app/writing/page.tsx
export default async function WritingPage({ searchParams }) {
  const { tag, year } = searchParams;

  const essays = await db.post.findMany({
    where: {
      status: 'published',
      ...(tag && { tags: { has: tag } }),
      ...(year && {
        publishedAt: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${parseInt(year) + 1}-01-01`),
        }
      }),
    },
    orderBy: [
      { publishedAt: 'desc' },
    ],
  });

  return <WritingIndex essays={essays} />;
}
```

### allowed sorting (user-controlled)

**optional enhancement (later):**

- sort by: newest, oldest, popular (if metrics added)
- default: order defined in this doc
- user can override via dropdown

**example:**

```
/writing?sort=newest    (default)
/writing?sort=oldest
/writing?sort=popular   (if view counts tracked)
```

**not implementing yet:**

- keep simple
- default ordering is intentional

---

## proof anchor logic (homepage)

### what are proof anchors?

**definition:**

- 3 quantified statements
- demonstrate capability and scale
- shown in scroll 1 (above fold)

**current anchors:**

```
1. built markpoint (startup with [X] users)
2. taught 500+ students to band 6 in hsc english
3. ships production code daily
```

### sourcing proof anchors

**manual definition (hardcoded for now):**

```typescript
// app/page.tsx
const proofAnchors = [
  {
    text: 'built markpoint',
    detail: 'startup with 1000+ users',
    href: '/startups/markpoint',
  },
  {
    text: 'taught 500+ students',
    detail: 'to band 6 in hsc english',
    href: '/writing/teaching-philosophy',
  },
  {
    text: 'ships production code',
    detail: 'daily',
    href: '/work',
  },
];
```

**future enhancement (dynamic):**

```typescript
// calculate from database
const userCount = await getUserCountFromMarkpoint();
const studentCount = 500; // static for now
const projectCount = await db.project.count({ where: { status: 'published' } });

const proofAnchors = [
  `built markpoint (${userCount} users)`,
  `taught ${studentCount}+ students to band 6`,
  `${projectCount} projects shipped`,
];
```

**update frequency:**

- review monthly
- update when metrics change significantly
- keep quantified and honest

---

## content limits per page

### homepage

```
- proof anchors: 3 (exact)
- featured projects: 1-2 (max)
- featured essays: 1 (max)
- CTAs: 2 (exact)
```

**reasoning:**

- employer-first: less is more
- 30-45 second comprehension
- no overwhelm

### work index

```
- featured projects (above fold): 5 (max)
- archive link: 1
- total visible projects: 5 (+ link to see all)
```

### writing index

```
- featured essays (above fold): 3 (max)
- archive link: 1
- total visible essays: 3 (+ link to see all)
```

### startups index

```
- primary startup: 1 (markpoint)
- other startups: 2 (max)
- total: 3 (max)
```

### resources index

```
- featured resources: 3 (max)
- all resources: paginated (10 per page)
```

---

## admin ui requirements

### featuring interface

**work index admin view:**

```
[project card]
  markpoint
  [✓] featured
  order: [1] ↕

[project card]
  riqle
  [✓] featured
  order: [2] ↕

[project card]
  client project
  [ ] featured
  order: [—]
```

**controls:**

- featured checkbox (toggle)
- order input (number, 1-indexed)
- drag-and-drop reordering (nice-to-have)

### bulk actions

**select multiple:**

- feature/unfeature selected
- archive selected
- delete selected (with confirmation)

**safety:**

- "are you sure?" confirmation for destructive actions
- undo feature (nice-to-have)

---

## implementation examples

### homepage featured content

```tsx
// app/page.tsx
import { db } from '@/lib/db';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { ProjectCard } from '@/components/organisms/ProjectCard';
import { EssayCard } from '@/components/organisms/EssayCard';

export default async function HomePage() {
  // fetch 1 featured project
  const featuredProject = await db.project.findFirst({
    where: { status: 'PUBLISHED', featured: true },
    orderBy: [{ order: 'asc' }, { publishedAt: 'desc' }],
  });

  // fetch 1 featured essay
  const featuredEssay = await db.post.findFirst({
    where: { status: 'PUBLISHED', featured: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <HomeTemplate>
      {/* scroll 1: hero (name, positioning, proof, CTAs) */}
      {/* scroll 2: featured content */}
      {featuredProject && <ProjectCard project={featuredProject} />}
      {featuredEssay && <EssayCard essay={featuredEssay} />}
    </HomeTemplate>
  );
}
```

### work index with manual order

```tsx
// app/work/page.tsx
export default async function WorkPage() {
  const featuredProjects = await db.project.findMany({
    where: { status: 'PUBLISHED', featured: true },
    orderBy: [{ order: 'asc' }],
    take: 5,
  });

  return (
    <ContentIndexTemplate title="work" subtitle="things built. outcomes measured. proof shown.">
      <ProjectGrid projects={featuredProjects} />
      <Link href="/work/archive">see all projects →</Link>
    </ContentIndexTemplate>
  );
}
```

### related content

```tsx
// app/writing/[slug]/page.tsx
export default async function EssayPage({ params }) {
  const essay = await db.post.findUnique({
    where: { slug: params.slug },
  });

  const relatedEssays = await db.post.findMany({
    where: {
      status: 'PUBLISHED',
      id: { not: essay.id },
      tags: { hasSome: essay.tags },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return (
    <>
      <article>{/* essay content */}</article>
      <RelatedContent items={relatedEssays} />
    </>
  );
}
```

---

## hierarchy validation checklist

**before launch:**

- [ ] homepage shows max 1-2 featured projects
- [ ] homepage shows max 1 featured essay
- [ ] work index shows max 5 featured projects
- [ ] writing index shows max 3 featured essays
- [ ] startups index shows markpoint as primary
- [ ] resources not featured on homepage
- [ ] featured content is manually curated
- [ ] manual ordering works (projects)
- [ ] chronological ordering works (essays)
- [ ] related content logic returns relevant items
- [ ] archive views paginated (10 per page)
- [ ] filters work (tag, year)
- [ ] admin UI allows featuring/unfeaturing
- [ ] admin UI allows manual ordering

**quality checks:**

- [ ] featured work represents best capability
- [ ] featured essays are well-written and relevant
- [ ] no outdated content featured
- [ ] proof anchors are quantified and accurate
- [ ] content limits respected everywhere

---

## banned patterns

**do NOT implement:**

- ❌ automatic featuring based on views/likes
- ❌ "trending" or "popular" sections
- ❌ algorithmic recommendations
- ❌ endless scroll (use pagination)
- ❌ "load more" without limit
- ❌ featuring everything (defeats purpose)
- ❌ random shuffling of featured content
- ❌ A/B testing featured content
- ❌ personalization (employer sees same as everyone)
- ❌ "recently viewed" (no tracking)

**reasoning:**

- manual curation = intentional
- employer wants to see your judgment
- no gimmicks, no tricks

---

## future enhancements (post-mvp)

**view counts (ethical analytics):**

- track which content gets viewed
- inform (but don't automate) featuring decisions
- privacy-respecting (no user tracking)

**admin insights:**

- "most viewed this month"
- "zero views in 6 months" (consider archiving)
- "featured for 2+ years" (consider refreshing)

**user-controlled sorting:**

- allow user to sort by newest/oldest/popular
- default remains manual curation
- preserves editorial control

**dynamic proof anchors:**

- calculate from live data (markpoint user count)
- update automatically (monthly cron job)
- keep accurate and impressive

---

**last updated:** january 3, 2026
**status:** content hierarchy rules defined. ready for implementation.
**principle:** quality over quantity. manual curation. employer sees best work first.
