# cross-linking system: proof chains that connect

> **principle:** content should cross-reference naturally to build comprehensive proof of capabilities
> **rule:** links must feel earned, not promotional — "this proves x, which relates to y"

**last updated:** january 3, 2026
**status:** complete
**story:** 1.8 - design cross-linking system

---

## core philosophy

**the problem:**

employers who read an essay may not know you've built products that prove the essay's claims. employers who view a project may not know you've written deep analysis about the domain. content exists in silos, forcing employers to manually explore to discover the full picture.

**the solution:**

strategic cross-linking creates "proof chains" — essays link to projects that demonstrate the concepts, projects link to essays that explain the thinking, startups link to both. each piece of content becomes a gateway to related proof.

**the anti-pattern:**

promotional cross-linking ("check out my other work!") feels desperate. algorithmic "you might also like" feels generic. we want factual, earned connections: "this project implements the framework discussed in [essay]" or "for technical deep-dive, see [essay]."

**user feeling:**

"oh, they didn't just write about this — they actually built it. and they wrote a post-mortem analyzing what worked. this person has depth."

---

## cross-linking philosophy

### 1. direction of links

**essays → projects** (most common)

- essays make claims or describe frameworks
- projects provide concrete proof of implementation
- link text: "implemented in [project name]" or "case study: [project name]"

**projects → essays** (second most common)

- projects demonstrate outcomes
- essays explain the thinking, trade-offs, lessons learned
- link text: "technical breakdown: [essay title]" or "retrospective: [essay title]"

**projects ↔ startups** (contextual)

- startups are collections of related projects
- projects belong to a startup context
- link text: "part of [startup name]" or "related work: [project name]"

**essays ↔ startups** (rare)

- essays about entrepreneurship, product strategy
- startups as case studies
- link text: "applied in [startup name]" or "lessons from [startup name]"

**resources → everything** (one-way from resources)

- resources (tools, templates, guides) link to proof
- link text: "example implementation: [project]" or "context: [essay]"

**everything → resources** (minimal)

- only when resource directly relates
- link text: "template used: [resource]" or "tool: [resource]"

---

## database relationships

### schema design (prisma)

```prisma
// cross-linking through explicit relations

model Post {
  id              String    @id @default(cuid())
  title           String
  slug            String    @unique
  content         String    @db.Text

  // manual cross-links
  relatedProjects Project[] @relation("PostToProjects")
  relatedStartups Startup[] @relation("PostToStartups")

  // automatic backlinks (prisma relations)
  linkedFromProjects Project[] @relation("ProjectToPosts")
  linkedFromStartups Startup[] @relation("StartupToPosts")
}

model Project {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique

  // manual cross-links
  relatedPosts    Post[]    @relation("ProjectToPosts")
  relatedProjects Project[] @relation("RelatedProjects")
  startup         Startup?  @relation(fields: [startupId], references: [id])
  startupId       String?

  // automatic backlinks
  linkedFromPosts Post[]    @relation("PostToProjects")
  relatedTo       Project[] @relation("RelatedProjects")
}

model Startup {
  id              String    @id @default(cuid())
  title           String
  slug            String    @unique

  // one-to-many: startup contains projects
  projects        Project[]

  // manual cross-links
  relatedPosts    Post[]    @relation("StartupToPosts")

  // automatic backlinks
  linkedFromPosts Post[]    @relation("PostToStartups")
}

model Resource {
  id              String @id @default(cuid())
  title           String
  slug            String @unique

  // resources only link out (no backlinks needed)
  exampleProjectId String?
  exampleProject   Project? @relation(fields: [exampleProjectId], references: [id])
  contextPostId    String?
  contextPost      Post?    @relation(fields: [contextPostId], references: [id])
}
```

**key decisions:**

- **explicit relations:** manual curation, not algorithmic
- **bidirectional:** prisma handles backlinks automatically
- **many-to-many:** essays and projects can relate to multiple items
- **one-to-many:** startups contain multiple projects (hierarchical)
- **one-way from resources:** resources reference examples, but examples don't reference back

---

## related content logic

### homepage related content

**goal:** after reading featured essay, show 1-2 related projects as proof

```typescript
// lib/queries/homepage.ts

async function getFeaturedEssayWithProof() {
  const featuredPost = await db.post.findFirst({
    where: { featured: true, status: 'published' },
    include: {
      relatedProjects: {
        where: { featured: true, status: 'published' },
        take: 2,
        orderBy: { order: 'asc' },
      },
    },
  });

  return featuredPost;
}
```

**homepage layout:**

```
scroll 2:
┌────────────────────────────────────┐
│ featured essay                     │
│ "building for 10x context windows" │
│ excerpt...                         │
│                                    │
│ related proof:                     │
│ → markpoint (project)              │
│ → riqle (project)                  │
└────────────────────────────────────┘
```

**key rules:**

- max 2 related projects on homepage
- only show if explicitly linked (manual curation)
- order by `project.order` field (manual priority)

---

### essay detail page related content

**goal:** show concrete implementations + related reading

```typescript
// app/writing/[slug]/page.tsx

async function getPostWithRelated(slug: string) {
  const post = await db.post.findUnique({
    where: { slug },
    include: {
      relatedProjects: {
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
      },
      relatedStartups: {
        where: { status: 'published' },
      },
    },
  });

  return post;
}
```

**essay detail layout:**

```
[essay content]

---

## related projects

1-3 projects that implement concepts from essay
- card grid (ProjectCard molecule)
- shows: title, excerpt, tech stack
- links to /work/[slug]

## related startups

0-1 startup context
- "this essay relates to work at [startup name]"
- links to /startups/[slug]
```

**key rules:**

- show related projects if any exist (0-3 max)
- show related startup if exists (0-1 max)
- no "you might also like" — only explicit relations
- if no relations exist, show nothing (don't force it)

---

### project detail page related content

**goal:** show context (startup), deep-dive (essay), related work (other projects)

```typescript
// app/work/[slug]/page.tsx

async function getProjectWithRelated(slug: string) {
  const project = await db.project.findUnique({
    where: { slug },
    include: {
      startup: true, // parent startup context
      relatedPosts: {
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 2,
      },
      relatedProjects: {
        where: { status: 'published' },
        take: 2,
      },
    },
  });

  return project;
}
```

**project detail layout:**

```
[project content]

---

## startup context

if project.startup exists:
- "part of [startup name]"
- 1-2 sentence startup description
- link to /startups/[slug]

## deep dive

if relatedPosts exist:
- "technical breakdown: [essay title]"
- "lessons learned: [essay title]"
- max 2 essays

## related projects

if relatedProjects exist:
- "similar work:"
- 1-2 project cards
- same tech stack or domain
```

**key rules:**

- always show startup context if exists (hierarchical parent)
- max 2 related essays (technical depth)
- max 2 related projects (similar work)
- order: context → deep-dive → related work

---

### startup detail page related content

**goal:** show all projects under startup + related essays about the domain

```typescript
// app/startups/[slug]/page.tsx

async function getStartupWithRelated(slug: string) {
  const startup = await db.startup.findUnique({
    where: { slug },
    include: {
      projects: {
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
      },
      relatedPosts: {
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 3,
      },
    },
  });

  return startup;
}
```

**startup detail layout:**

```
[startup overview]

---

## projects

all projects under this startup
- chronological (newest first)
- full project cards
- shows progression over time

## related essays

if relatedPosts exist:
- "insights from building [startup]:"
- 1-3 essay cards
- retrospectives, lessons, strategy
```

**key rules:**

- show ALL projects (no limit) — this is the canonical list
- max 3 related essays
- chronological order (shows evolution)

---

## in-content linking (manual markdown links)

### essay content linking

**in markdown content:**

```markdown
## implementing progressive disclosure

we applied this framework in [markpoint](/work/markpoint), where users needed to...

for a technical breakdown of the architecture, see [building for 10x context](/writing/building-for-10x-context).
```

**allowed link patterns:**

- `/work/[slug]` → project
- `/writing/[slug]` → essay
- `/startups/[slug]` → startup
- `/resources/[slug]` → resource
- external URLs (https://)

**link rendering:**

```tsx
// components/molecules/ContentLink.tsx

export function ContentLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isInternal = href.startsWith('/');
  const isProject = href.startsWith('/work/');
  const isEssay = href.startsWith('/writing/');

  return (
    <a
      href={href}
      className={cn(
        'decoration-neon-cyan underline underline-offset-4',
        'hover:decoration-neon-pink transition-colors',
        isProject && 'after:text-neon-cyan after:content-["_↗"]',
        isEssay && 'after:text-neon-purple after:content-["_→"]'
      )}
      target={isInternal ? undefined : '_blank'}
      rel={isInternal ? undefined : 'noopener noreferrer'}
    >
      {children}
    </a>
  );
}
```

**visual indicators:**

- project links: cyan underline, "↗" arrow (proof)
- essay links: purple underline, "→" arrow (depth)
- external links: new tab, "rel=noopener"

---

## admin ui for linking

### essay editor cross-link selector

```tsx
// components/admin/CrossLinkSelector.tsx

interface CrossLinkSelectorProps {
  type: 'project' | 'startup';
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CrossLinkSelector({ type, selected, onChange }: CrossLinkSelectorProps) {
  const items =
    type === 'project'
      ? useProjects({ status: 'published' })
      : useStartups({ status: 'published' });

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        related {type}s
        <span className="text-chalk-charcoal/60 ml-2">
          (select items that provide proof or context)
        </span>
      </label>

      <div className="space-y-1">
        {items.map((item) => (
          <label key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...selected, item.id]);
                } else {
                  onChange(selected.filter((id) => id !== item.id));
                }
              }}
            />
            <span>{item.title}</span>
          </label>
        ))}
      </div>

      {selected.length > 3 && (
        <p className="text-neon-pink text-sm">⚠ consider limiting to 3 most relevant items</p>
      )}
    </div>
  );
}
```

**admin workflow:**

1. create/edit essay
2. scroll to "cross-linking" section
3. check boxes for related projects (max 3 recommended)
4. check boxes for related startups (max 1 recommended)
5. save → prisma handles bidirectional relations

---

## link placement rules

### where to show related content

**always show:**

- startup context on project pages (if exists)
- projects list on startup pages (canonical list)

**conditionally show:**

- related projects on essay pages (if manually linked)
- related essays on project pages (if manually linked)
- related essays on startup pages (if manually linked)

**never show:**

- algorithmic suggestions ("you might also like")
- "popular posts" or "trending projects"
- sidebar widgets with unrelated content
- footer "explore more" grids

### section ordering on detail pages

**essay detail:**

1. essay content (markdown)
2. related projects (if any)
3. related startups (if any)

**project detail:**

1. project content (outcome, tech, role)
2. startup context (if exists) — hierarchical parent first
3. deep dive essays (if any) — technical depth
4. related projects (if any) — similar work

**startup detail:**

1. startup overview
2. all projects (chronological)
3. related essays (if any)

**reasoning:**

- startup context comes first (provides framing)
- essays provide depth after seeing proof
- related projects come last (exploration)

---

## korean aesthetic integration

### link visual treatment

**chalk underlines:**

```css
.content-link {
  text-decoration: underline;
  text-decoration-color: var(--neon-cyan);
  text-decoration-thickness: 2px;
  text-decoration-style: solid;
  text-underline-offset: 4px;
  transition: text-decoration-color 0.2s ease;
}

.content-link:hover {
  text-decoration-color: var(--neon-pink);
}

.content-link::after {
  content: ' ↗';
  color: var(--neon-cyan);
  font-size: 0.875em;
}
```

**related content section:**

```tsx
<section className="border-chalk-cream mt-12 border-t pt-8">
  <h2 className="font-chalk text-chalk-charcoal mb-4 text-xl">related proof</h2>
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{/* project cards */}</div>
</section>
```

**hand-drawn arrows:**

- use hand-drawn arrow SVGs for "related work" connectors
- subtle, not decorative overload
- chalk-style stroke

---

## link text patterns

### good link text (factual, earned)

**essays → projects:**

- "implemented in [project name]"
- "case study: [project name]"
- "applied at [startup name]"
- "see [project name] for implementation"

**projects → essays:**

- "technical breakdown: [essay title]"
- "retrospective: [essay title]"
- "lessons learned: [essay title]"
- "for context: [essay title]"

**projects → startups:**

- "part of [startup name]"
- "built at [startup name]"

**essays → startups:**

- "lessons from [startup name]"
- "applied in [startup name]"

### bad link text (promotional, vague)

❌ "check out my other work"
❌ "you might also like"
❌ "read more"
❌ "click here"
❌ "related content"
❌ "explore similar projects"

**reasoning:**

good link text states the relationship explicitly. bad link text is generic and promotional.

---

## backlinks (automatic)

### show backlinks on detail pages

**example: project page shows essays that link to it**

```typescript
async function getProjectWithBacklinks(slug: string) {
  const project = await db.project.findUnique({
    where: { slug },
    include: {
      linkedFromPosts: {
        where: { status: 'published' },
        select: { title: true, slug: true },
      },
    },
  });

  return project;
}
```

**ui treatment:**

```tsx
{
  project.linkedFromPosts.length > 0 && (
    <aside className="border-neon-cyan bg-chalk-cream/20 mt-8 border-l-2 p-4">
      <p className="text-chalk-charcoal/80 mb-2 text-sm">mentioned in:</p>
      <ul className="space-y-1">
        {project.linkedFromPosts.map((post) => (
          <li key={post.slug}>
            <a href={`/writing/${post.slug}`} className="text-sm underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

**key rules:**

- show backlinks in subtle aside (not prominent)
- max 5 backlinks shown (oldest 5 if more exist)
- only show if backlinks exist (no empty state)

---

## content relationship strategies

### 1. proof chains (essay → project)

**use case:** essay makes claim, project proves it

**example:**

- essay: "building for 10x context windows"
- related project: markpoint (implements 10x context handling)

**link text in essay:** "implemented in [markpoint](/work/markpoint)"
**link text on project:** "technical breakdown: [building for 10x context](/writing/building-for-10x-context)"

### 2. retrospectives (project → essay)

**use case:** project completed, essay analyzes what worked/failed

**example:**

- project: markpoint
- related essay: "what i learned building a context-aware writing tool"

**link text on project:** "retrospective: [what i learned](/writing/what-i-learned)"
**link text in essay:** "case study: [markpoint](/work/markpoint)"

### 3. startup collections (startup → projects)

**use case:** multiple projects under one startup

**example:**

- startup: markpoint
- projects: markpoint v1, markpoint chrome extension, markpoint api

**link text on project:** "part of [markpoint](/startups/markpoint)"
**startup page:** shows all 3 projects chronologically

### 4. domain expertise (essay ↔ essay)

**use case:** multiple essays on same topic (rarely needed)

**example:**

- essay 1: "progressive disclosure patterns"
- essay 2: "information architecture for portfolios"

**approach:** link within markdown content, not as "related essays" section
**link text:** "for more on [progressive disclosure](/writing/progressive-disclosure)"

---

## limits and constraints

### hard limits

- **homepage featured essay:** max 2 related projects
- **essay detail:** max 3 related projects, max 1 related startup
- **project detail:** max 2 related essays, max 2 related projects
- **startup detail:** unlimited projects (canonical list), max 3 related essays

### soft recommendations

- **related projects on essay:** aim for 1-2, max 3
- **related essays on project:** aim for 1, max 2
- **related projects on project:** aim for 0-1, max 2

### no limits

- **startup → projects:** show all (this is the canonical list)
- **in-content markdown links:** no limit (but keep readable)

---

## seo implications

### internal linking benefits

**google ranking factors:**

- internal links pass authority
- anchor text signals relevance
- link depth affects crawlability

**structured data:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "markpoint",
    "url": "https://riqle.com/work/markpoint"
  }
}
```

**breadcrumbs:**

```tsx
// project belonging to startup
<nav aria-label="breadcrumb">
  <ol>
    <li>
      <a href="/">riqle</a>
    </li>
    <li>
      <a href="/startups">startups</a>
    </li>
    <li>
      <a href="/startups/markpoint">markpoint</a>
    </li>
    <li aria-current="page">markpoint v1</li>
  </ol>
</nav>
```

---

## implementation checklist

### phase 1: database schema

- [ ] add `relatedProjects` relation to Post model
- [ ] add `relatedStartups` relation to Post model
- [ ] add `relatedPosts` relation to Project model
- [ ] add `relatedProjects` relation to Project model (self-relation)
- [ ] add `startup` foreign key to Project model
- [ ] add `projects` relation to Startup model
- [ ] add `relatedPosts` relation to Startup model
- [ ] run prisma migration

### phase 2: query functions

- [ ] `getFeaturedEssayWithProof()` for homepage
- [ ] `getPostWithRelated(slug)` for essay detail
- [ ] `getProjectWithRelated(slug)` for project detail
- [ ] `getStartupWithRelated(slug)` for startup detail

### phase 3: ui components

- [ ] `ContentLink` molecule (link with visual indicators)
- [ ] `RelatedProjects` organism (grid of related project cards)
- [ ] `RelatedEssays` organism (list of related essay links)
- [ ] `StartupContext` molecule (parent startup badge)
- [ ] `Backlinks` molecule (subtle aside for automatic backlinks)

### phase 4: admin ui

- [ ] `CrossLinkSelector` component for essay editor
- [ ] `CrossLinkSelector` component for project editor
- [ ] `CrossLinkSelector` component for startup editor
- [ ] visual preview of selected relations
- [ ] warning when exceeding recommended limits

### phase 5: testing

- [ ] test bidirectional linking (essay ↔ project)
- [ ] test hierarchical linking (startup → project)
- [ ] test backlinks display
- [ ] test empty states (no relations)
- [ ] test limit enforcement
- [ ] test link visual treatment (hover, active)

---

## banned patterns

### ❌ do NOT implement

**algorithmic suggestions:**

- "you might also like" based on tags
- "popular posts" based on views
- "trending projects" based on recency
- "similar work" based on tf-idf or embeddings

**promotional patterns:**

- "explore more" grids at bottom of every page
- sidebar "recent posts" widgets
- footer "featured work" sections unrelated to current content
- popup "subscribe to see related content"

**infinite scroll / pagination on related content:**

- "load more related projects"
- "see all 47 related essays"
- pagination controls on related content sections

**over-linking:**

- automatic linking of every keyword mention
- "related tags" clouds
- "all posts tagged X" on every page

**visual noise:**

- animated arrows between related items
- hover popups showing related content previews
- auto-playing videos of related projects

**reasoning:**

cross-linking should feel curated and intentional, not algorithmic or promotional. links should be earned through explicit relevance, not auto-generated noise.

---

## edge cases

### 1. circular references

**scenario:** essay A links to project B, project B links to essay A

**solution:** allowed and expected (bidirectional proof)

**ui treatment:** show both directions

- essay A shows project B under "related projects"
- project B shows essay A under "deep dive"

### 2. multiple startups per project

**scenario:** project spans multiple startups (rare)

**solution:** only allow one startup parent (hierarchical)

**workaround:** mention other startup in project description, manual markdown link

### 3. project links to itself

**scenario:** project has multiple versions (markpoint v1, markpoint v2)

**solution:** use `relatedProjects` self-relation

**ui treatment:** show under "related work: [project name] v2"

### 4. no related content exists

**scenario:** new essay with no related projects yet

**solution:** show nothing (no empty state, no "coming soon")

**reasoning:** better to show nothing than force fake connections

### 5. too many related items

**scenario:** essay relates to 10 projects

**solution:** admin ui warns, but doesn't block. curator must manually choose top 3.

**reasoning:** trust curator judgment, but nudge toward quality over quantity

---

## korean aesthetic: link decorations

### hand-drawn arrows between sections

```tsx
// components/atoms/HandDrawnArrow.tsx

export function HandDrawnArrow({ direction = 'right' }: { direction: 'right' | 'down' }) {
  return (
    <svg viewBox="0 0 100 20" className="text-neon-cyan h-4 w-12 opacity-60" aria-hidden="true">
      <path
        d={
          direction === 'right'
            ? 'M 5 10 Q 30 5, 60 10 T 95 10 L 90 5 M 95 10 L 90 15'
            : 'M 50 5 Q 45 10, 50 15 T 50 30 L 45 25 M 50 30 L 55 25'
        }
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

### korean annotations for link sections

```tsx
<section className="relative">
  <span className="font-chalk text-neon-purple absolute -left-8 -top-4 rotate-[-5deg] text-sm opacity-40">
    연결 {/* yeon-gyeol = connection */}
  </span>
  <h2>related proof</h2>
  {/* content */}
</section>
```

---

**last updated:** january 3, 2026
**status:** complete
**principle:** links must feel earned, not promotional — cross-reference to build comprehensive proof chains
