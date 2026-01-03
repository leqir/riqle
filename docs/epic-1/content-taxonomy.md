# content taxonomy and naming conventions

> **principle:** clear boundaries between content types. one piece of content = one primary type.
> **decision:** when in doubt, ask "what's the job of this content?"

---

## core philosophy

**the problem:**

- unclear what belongs where (is this an essay or a project?)
- duplicate content across sections
- confusing taxonomy (blog vs articles vs posts)
- no clear rules for edge cases

**the solution:**

- four clear content types: writing, work, startups, resources
- decision tree for categorization
- naming conventions for each type
- metadata structure defines capabilities

**user feeling:**

- "i know where to find essays." (writing)
- "i know where to see projects." (work)
- "i know where to learn about startups." (startups)
- "i know where to buy resources." (resources)

---

## content type definitions

### writing (essays, thinking, reflections)

**what it is:**

- long-form written content
- demonstrates thinking, not execution
- published for insight, not promotion

**examples:**

```
- "building in public: lessons from markpoint"
- "teaching 500 students what the hsc really tests"
- "why i left university to build startups"
- "focus: the korean concept of 집중 in work"
```

**job:**

- show depth of thought
- demonstrate domain expertise
- provide value to reader
- reveal values and principles

**not:**

- case studies (those go in work)
- product descriptions (those go in resources)
- startup updates (those go in startups)
- news/announcements (avoid or put in writing)

**db model:**

```prisma
model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String?  @db.Text
  content     String   @db.Text
  status      PostStatus @default(DRAFT)
  featured    Boolean  @default(false)
  tags        String[] // ["teaching", "hsc", "philosophy"]
  readTime    Int?     // minutes
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

---

### work (projects, builds, executions)

**what it is:**

- things you've built (code, products, systems)
- demonstrates execution capability
- shows technical depth

**examples:**

```
- "markpoint" (but links to /startups for full story)
- "riqle portfolio site"
- "client: ecommerce rebuild"
- "open source: react-chalk-ui"
```

**job:**

- prove you can build
- show technical skills
- demonstrate outcomes
- attract employers

**not:**

- essays about building (those go in writing)
- startup vision statements (those go in startups)
- products for sale (those go in resources)

**db model:**

```prisma
model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String?  @db.Text
  content     String   @db.Text
  status      ProjectStatus @default(DRAFT)
  featured    Boolean  @default(false)
  order       Int      @default(0)
  tags        String[] // ["nextjs", "prisma", "stripe"]
  techStack   String[] // ["Next.js", "Prisma", "Stripe"]
  liveUrl     String?
  githubUrl   String?
  outcome     String?  // "500 users, 85% retention"
  year        Int?
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
}

enum ProjectStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

---

### startups (ventures you own/operate)

**what it is:**

- companies you've started
- ventures where you have ownership
- demonstrates operator capability

**examples:**

```
- "markpoint" (primary)
- future ventures (if any)
```

**job:**

- show ownership mindset
- demonstrate traction
- reveal entrepreneurial capability
- attract investors/partners (secondary)

**not:**

- freelance work (that's work)
- side projects (that's work unless significant traction)
- products for sale (that's resources, unless it's the startup itself)

**db model:**

```prisma
model Startup {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  tagline     String?
  content     String   @db.Text
  status      StartupStatus @default(DRAFT)
  featured    Boolean  @default(false)
  websiteUrl  String?
  traction    String?  // "1000 users, $5k MRR"
  founded     DateTime?
  stage       String?  // "idea", "mvp", "launched", "growing"
  techStack   String[]
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
}

enum StartupStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

---

### resources (products, tools, guides)

**what it is:**

- educational products for purchase/download
- tools you've built for others to use
- content that has transactional value

**examples:**

```
- "hsc english comprehensive guide"
- "essay writing toolkit"
- "startup launch checklist"
```

**job:**

- monetize expertise
- provide value to customers
- demonstrate teaching ability
- generate revenue (secondary)

**not:**

- free content (that's writing)
- projects to show off (that's work)
- the startup itself (that's startups)

**db model:**

```prisma
model Resource {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String   @db.Text
  content     String   @db.Text
  status      ResourceStatus @default(DRAFT)
  featured    Boolean  @default(false)
  price       Int      // cents
  stripePriceId String?
  downloadUrl String?
  previewUrl  String?
  tags        String[] // ["hsc", "english", "guide"]
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
}

enum ResourceStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

---

## decision tree

### categorizing new content

```
new content idea
  ↓
question 1: do i sell access to this?
  yes → resources
  no → continue

question 2: do i own and operate this business?
  yes → startups
  no → continue

question 3: did i build this (code/product/system)?
  yes → work
  no → continue

question 4: is this long-form thinking/insight?
  yes → writing
  no → reconsider if content is needed
```

### edge cases

**case: essay about a project i built**

- content type: writing
- cross-link: essay links to project in work section
- slug: `/writing/building-markpoint` (not `/work/markpoint-essay`)

**case: project that's also a startup**

- primary: startups (if you own it)
- secondary: mention in work with redirect to startups
- example: markpoint lives in `/startups/markpoint`

**case: free resource (no payment)**

- if substantial (50+ pages): writing (publish as essay)
- if tool/template: work (publish as project)
- if tiny checklist: writing (embed in essay or standalone)

**case: client work that's confidential**

- content type: work
- title: "client: [industry] [type of work]"
- example: "client: ecommerce platform rebuild"
- no NDA violations in case study

**case: tutorial/how-to content**

- if free and long-form: writing
- if paid and structured: resources
- avoid: tutorials that are thinly-veiled product pitches

---

## naming conventions

### writing (essay titles)

**format:**

- sentence case (not title case)
- descriptive (not clever)
- under 80 characters

**good titles:**

```
"building in public: lessons from markpoint"
"teaching 500 students what the hsc really tests"
"why i left university to build startups"
"focus: the korean concept of 집중 applied to work"
```

**avoid:**

```
"My Journey"                          ❌ (too vague)
"10 Tips for Better Productivity"    ❌ (listicle, not essay)
"The Ultimate Guide to..."            ❌ (marketing language)
"How I Made $10k in 30 Days"          ❌ (clickbait)
```

### work (project titles)

**format:**

- project name (proper noun)
- or: descriptive name (if no brand)

**good titles:**

```
"markpoint"
"riqle portfolio site"
"client: saas analytics dashboard"
"open source: react-chalk-ui"
```

**avoid:**

```
"My Portfolio"                        ❌ (not specific)
"Website for Client"                  ❌ (too vague)
"The Best Project I Ever Built"       ❌ (subjective)
```

### startups (company names)

**format:**

- company name (proper noun)
- lowercase in slug, but proper in title

**examples:**

```
title: "markpoint"
slug: "markpoint"
tagline: "student progress tracking for tutoring businesses"
```

### resources (product titles)

**format:**

- clear, descriptive
- includes target audience or outcome
- no hype words

**good titles:**

```
"hsc english comprehensive guide"
"essay writing toolkit for students"
"startup launch checklist"
```

**avoid:**

```
"The Ultimate HSC Guide"              ❌ (hype)
"Get Band 6 Guaranteed!"              ❌ (unrealistic claims)
"My Secret System"                    ❌ (marketing speak)
```

---

## metadata structure

### shared fields (all content types)

```typescript
interface BaseContent {
  id: string; // cuid
  title: string; // max 200 chars
  slug: string; // unique, url-safe
  excerpt?: string; // 1-3 sentences, optional
  content: string; // markdown/mdx
  status: 'draft' | 'published' | 'archived';
  featured: boolean; // show on homepage?
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}
```

### writing-specific fields

```typescript
interface Post extends BaseContent {
  tags: string[]; // ["teaching", "hsc"]
  readTime?: number; // calculated from content length
  relatedPosts?: string[]; // cuid of related posts
}
```

### work-specific fields

```typescript
interface Project extends BaseContent {
  order: number; // for manual sorting
  tags: string[]; // ["nextjs", "prisma"]
  techStack: string[]; // ["Next.js 15", "Prisma 5"]
  liveUrl?: string;
  githubUrl?: string;
  outcome?: string; // "500 users, 85% retention"
  year?: number; // 2026
}
```

### startups-specific fields

```typescript
interface Startup extends BaseContent {
  tagline?: string; // one-line description
  websiteUrl?: string;
  traction?: string; // "1000 users, $5k MRR"
  founded?: Date;
  stage?: 'idea' | 'mvp' | 'launched' | 'growing' | 'exited';
  techStack: string[];
}
```

### resources-specific fields

```typescript
interface Resource extends BaseContent {
  description: string; // longer than excerpt
  price: number; // in cents
  stripePriceId?: string;
  downloadUrl?: string;
  previewUrl?: string;
  tags: string[];
}
```

---

## tagging strategy

### purpose of tags

**jobs:**

- filter content by topic
- show related content
- seo (if used in urls, but we use query params)

**not for:**

- primary navigation (use content types)
- complex taxonomy (keep simple)

### tag naming rules

**format:**

- lowercase
- single word or hyphenated
- no spaces
- consistent naming

**good tags:**

```
"teaching"
"hsc"
"startups"
"nextjs"
"design-systems"
```

**avoid:**

```
"Teaching"               ❌ (uppercase)
"hsc english"            ❌ (space, use "hsc-english")
"Next.js"                ❌ (use "nextjs")
```

### tag categories (informal)

**topics:**

- teaching
- hsc
- startups
- building-in-public

**technologies:**

- nextjs
- prisma
- react
- typescript

**themes:**

- design-systems
- korean-aesthetic
- productivity

### tag limits

**per content item:** 3-7 tags (max 10)
**total tags site-wide:** 20-30 (keep curated)

**reasoning:**

- too many tags = meaningless
- tags should be selective, not exhaustive

---

## content lifecycle

### status flow

```
draft → published → (archived)
  ↓         ↓            ↓
  |    (unpublish)      |
  └──────────────────────┘
```

**draft:**

- not visible to public
- editable
- no published date

**published:**

- visible to public
- editable (but track updated date)
- has published date
- included in sitemap

**archived:**

- not visible in lists
- accessible via direct url (with notice)
- redirect if appropriate
- not in sitemap

### unpublishing content

**when to unpublish:**

- content outdated
- content inaccurate
- content no longer representative

**how to unpublish:**

- set status to archived
- add notice: "this content has been archived."
- OR redirect to updated version (301)

**never:**

- delete published content (breaks links)
- 404 previously published urls

---

## featured content logic

### purpose

**jobs:**

- homepage: show 1-2 best pieces per type
- index pages: show 3-5 best pieces above fold
- emphasize quality over quantity

### featuring rules

**maximum featured items:**

- writing: 3 essays
- work: 5 projects
- startups: 1-2 ventures
- resources: 3-5 products

**criteria for featuring:**

- high quality
- representative of best work
- recent (unless timeless)
- diverse (not all on same topic)

**manual curation:**

- featured = boolean flag in database
- admin UI to toggle featured status
- no automatic "featured" based on metrics

---

## content relationships

### cross-linking between types

**essay → project:**

```
essay: "building markpoint: lessons from year one"
  ↓
links to: /startups/markpoint
```

**project → essay:**

```
project: markpoint
  ↓
related content: /writing/building-markpoint
```

**startup → resource:**

```
startup: markpoint
  ↓
mentions: "we also built an hsc guide"
links to: /resources/hsc-english-guide
```

**implementation:**

```typescript
// in Post model
relatedProjects?: string[]; // array of project slugs
relatedStartups?: string[]; // array of startup slugs

// in Project model
relatedPosts?: string[];

// etc
```

### series/collections

**problem:** multiple essays on same topic

**solution 1: tags**

```
essay 1: tag "markpoint-series"
essay 2: tag "markpoint-series"
essay 3: tag "markpoint-series"

→ filter by tag to see series
```

**solution 2: explicit series field**

```typescript
interface Post {
  series?: {
    name: string; // "markpoint journey"
    part: number; // 1, 2, 3
    total: number; // 3
  };
}
```

**chosen:** tags (simpler, more flexible)

---

## content uniqueness rules

### no duplicates

**rule:** one piece of content lives in one primary location

**bad:**

```
/writing/markpoint        (essay about startup)
/startups/markpoint       (startup page)
/work/markpoint           (project page)
```

**good:**

```
/startups/markpoint       (primary)
/writing/building-markpoint (essay about journey)
/work/                    (mentions markpoint, links to /startups)
```

### content repurposing

**allowed:**

- essay excerpt on startup page
- project summary on homepage
- resource preview in essay

**not allowed:**

- same full content in multiple places
- duplicate pages with different urls

---

## naming edge cases

### project with multiple versions

**case:** "riqle portfolio v1" then "riqle portfolio v2"

**solution 1:** update in place (recommended)

```
/work/riqle-portfolio (always shows latest version)
content: includes section "version history"
```

**solution 2:** separate entries

```
/work/riqle-portfolio-v1 (archived)
/work/riqle-portfolio-v2 (published)
```

**chosen:** update in place (fewer pages, cleaner)

### confidential client work

**title format:**

```
"client: [industry] [project type]"
```

**examples:**

```
"client: fintech mobile app"
"client: ecommerce platform rebuild"
"client: saas analytics dashboard"
```

**avoid:**

- client names (if confidential)
- overly vague: "client project" ❌

### open source contributions

**as project:**

```
title: "open source: [project name]"
slug: "open-source-project-name"
```

**as essay:**

```
title: "contributing to [project]: lessons learned"
slug: "contributing-to-project-lessons"
```

**decision:** if you built significant portion → project; if contribution → essay

---

## content validation checklist

**before publishing writing:**

- [ ] title is descriptive (not clever)
- [ ] slug follows url policy
- [ ] excerpt is 1-3 sentences
- [ ] tags are lowercase and consistent
- [ ] content is long-form (500+ words)
- [ ] read time calculated
- [ ] featured status set (if applicable)
- [ ] related content linked

**before publishing work:**

- [ ] title is project name or descriptive
- [ ] tech stack listed
- [ ] outcome quantified (if possible)
- [ ] live url or github url included
- [ ] year indicated
- [ ] order set for manual sorting
- [ ] featured status set

**before publishing startups:**

- [ ] tagline is one-line and clear
- [ ] traction metrics honest
- [ ] website url included
- [ ] stage is accurate
- [ ] tech stack listed
- [ ] content includes problem/solution/outcome

**before publishing resources:**

- [ ] title includes target audience/outcome
- [ ] price is clear and upfront
- [ ] description is factual (no hype)
- [ ] preview available (if applicable)
- [ ] stripe integration working
- [ ] download url secure

---

## banned patterns

**do NOT implement:**

- ❌ "blog" as content type (use "writing")
- ❌ "portfolio" as content type (use "work")
- ❌ "case studies" as separate type (part of work)
- ❌ categories AND tags (pick one: tags)
- ❌ auto-generated tags (manual curation only)
- ❌ nested categories (flat taxonomy only)
- ❌ "featured" as a category (it's a flag)
- ❌ duplicate content across types
- ❌ content without clear purpose

---

**last updated:** january 3, 2026
**status:** content taxonomy defined. ready for database implementation.
**principle:** clear boundaries. one primary type. decision tree for edge cases.
