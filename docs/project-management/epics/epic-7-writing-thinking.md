# EPIC 7 — Writing & Thinking (Judgment as Signal)

**Epic ID:** 7
**Epic Name:** Writing & Thinking (Judgment as Signal)
**Status:** Ready for Implementation
**Dependencies:** Epic 0 (Infrastructure), Epic 1 (Information Architecture), Epic 2 (Design System)
**Total Stories:** 12

---

## Epic Overview

### Purpose

Present writing as evidence of thinking quality, not as branding, blogging, or audience-building.

**This is thinking made inspectable.**

### User Outcome

This epic ensures:

- Writing increases trust rather than ego
- Ideas feel grounded rather than performative
- Employers can assess judgment without an interview

### Core Question Answered

**"How does this person think when no one is giving them instructions?"**
**"How do they think when they're not optimizing for approval?"**

Employers can conclude:

- "This person can reason clearly"
- "They can explain complex ideas without theatrics"
- "They have independent judgment"

This epic answers the employer question most candidates cannot.

---

## Architecture Decisions

### Page Structure

```
/writing              # Writing listing page (curated essays)
/writing/[slug]       # Individual essay pages
```

### Component Hierarchy

```
WritingPage
├── WritingIntro (why you write)
├── EssayList (curated list, optional grouping by theme)
│   └── EssayCard[] (title, description, date, reading time)
└── Pagination (none - all essays visible)

EssayPage
├── EssayHeader (title, context line, date, reading time)
├── EssayBody (prose, structured sections)
├── OptionalDiagram (max 1 per essay)
└── EssayFooter (subtle links to related work/projects)
```

### Content Model (Prisma Schema Addition)

```prisma
// Add to existing schema in Epic 0

model Post {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String   // One-line description

  // Essay content
  contextLine String?  // Why this was written
  body        String   @db.Text // Markdown or rich text

  // Optional diagram
  diagramUrl  String?  // Max 1 diagram per essay

  // Metadata
  publishedAt DateTime?
  readingTime Int?     // Estimated reading time in minutes
  featured    Boolean  @default(false)

  // Grouping (optional)
  theme       String?  // "Education", "Systems", "Product", "Decision-making"

  // Cross-linking
  relatedProjectSlugs String[] // Related Work items
  relatedStartupSlugs String[] // Related Startups

  // Publishing workflow
  draft       Boolean  @default(true)
  published   Boolean  @default(false)

  // Edit history (optional)
  version     Int      @default(1)

  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  author      User     @relation(fields: [authorId], references: [id])
  authorId    String

  @@index([publishedAt])
  @@index([published])
  @@index([featured])
  @@index([theme])
}
```

### Routing

```typescript
// app/writing/page.tsx - Writing listing
export default async function WritingPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });
  return <EssayList posts={posts} />;
}

// app/writing/[slug]/page.tsx - Essay detail
export default async function EssayPage({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({
    where: { slug: params.slug, published: true },
  });
  if (!post) notFound();
  return <Essay post={post} />;
}
```

### Design Constraints

- **Library, not blog** (calm exploration, no infinite feeds)
- **Clarity over cleverness** (plain language, concrete examples)
- **Minimal visual treatment** (no sidebars, no CTAs, no social buttons)
- **One diagram max** per essay (only if it clarifies thinking)
- **Event-driven publishing** (not scheduled, quality over consistency)

---

## Stories

### Story 7.1: Core Job-to-Be-Done

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As an **employer evaluating thinking quality**,
I want **to assess how Nathanael reasons when no one is giving instructions**,
So that **I can determine if he has independent judgment and clear thinking**.

#### Acceptance Criteria

**Given** an employer visits the Writing page
**When** they skim one essay
**Then** they understand your thinking style
**And** writing raises confidence rather than questions
**And** they conclude: "This person can reason clearly"

#### Implementation Checklist

- [ ] Define page metadata and SEO
  ```typescript
  // app/writing/page.tsx
  export const metadata: Metadata = {
    title: 'Writing | Nathanael',
    description:
      'Essays on education, systems, learning, product, and decision-making—thinking made inspectable.',
  };
  ```
- [ ] Create WritingPage component with job-to-be-done focus
- [ ] Document acceptance criteria for editorial review
- [ ] Create validation checklist:
  - Can employers understand thinking style from one essay?
  - Does writing raise confidence or questions?
  - Is clear reasoning evident?

#### Testing Requirements

- [ ] Skim test: Can 3 employers understand thinking style from one essay?
- [ ] Confidence test: Does writing increase or decrease trust?
- [ ] Clarity test: Do employers conclude you can reason clearly?

---

### Story 7.2: What Qualifies as "Writing" (Inclusion Rules)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **content curator**,
I want **clear inclusion standards for what qualifies as "writing"**,
So that **signal is not diluted by generic content or performative pieces**.

#### Acceptance Criteria

**Given** a potential essay for inclusion
**When** evaluating against standards
**Then** every essay answers a real question you've thought deeply about
**And** no content exists "to stay active"
**And** if a piece does not reveal how you reason, it does not belong

#### Included

✅ Essays on:

- Education
- Systems
- Learning
- Product
- Decision-making

✅ Post-mortems (thoughtful reflections after building or teaching)
✅ Explanations of frameworks you actually use

#### Excluded

❌ Generic opinion pieces
❌ Motivational content
❌ Hot takes
❌ Trend commentary
❌ SEO-driven posts

**Rule:** If a piece does not reveal how you reason, it does not belong.

#### Implementation Checklist

- [ ] Create inclusion criteria document

  ```markdown
  # Writing Inclusion Standards

  ## Included Categories

  1. **Essays on education, systems, learning, product, decision-making**
  2. **Post-mortems** - Reflections after building or teaching
  3. **Framework explanations** - Only frameworks you actually use

  ## Explicit Exclusions

  - Generic opinion pieces
  - Motivational content
  - Hot takes or trend commentary
  - SEO-driven posts
  - Content written "to stay active"

  ## Inclusion Checklist

  For each potential essay, ask:

  - [ ] Does this reveal how I reason?
  - [ ] Does this answer a real question I've thought deeply about?
  - [ ] Would I be comfortable discussing this in depth in an interview?
  - [ ] Does this demonstrate independent judgment?

  ## Quality Bar

  - Must reveal thinking process
  - Must be grounded in real experience
  - Must demonstrate judgment, not just opinion
  ```

- [ ] Review existing essays against criteria
- [ ] Create content review process
- [ ] Document why each included essay qualifies

#### Testing Requirements

- [ ] Inclusion test: Does each essay meet standards?
- [ ] Reasoning test: Does each essay reveal how you think?
- [ ] Depth test: Can you discuss each essay in depth?

---

### Story 7.3: Writing Page Structure (Macro)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As an **employer with limited time**,
I want **to explore the Writing page calmly and selectively**,
So that **I can choose deliberately what to read without pressure**.

#### Acceptance Criteria

**Given** the Writing page is loaded
**When** an employer scans it
**Then** the page feels like a library, not a blog
**And** readers choose deliberately what to read
**And** there are no infinite feeds, pagination pressure, or popularity sorting

#### Recommended Structure

- Brief intro explaining why you write
- Curated list of essays
- Optional grouping by theme (not required)
- Each essay entry shows:
  - Title
  - One-line description
  - Date (optional but useful)
  - Reading time (optional)

#### Rules

❌ No infinite feeds
❌ No pagination pressure
❌ No sorting by popularity

#### Implementation Checklist

- [ ] Create EssayList component

  ```tsx
  // components/writing/EssayList.tsx
  import Link from 'next/link';

  type Post = {
    slug: string;
    title: string;
    description: string;
    publishedAt: Date | null;
    readingTime: number | null;
    theme?: string | null;
  };

  export function EssayList({ posts }: { posts: Post[] }) {
    return (
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        {/* Intro */}
        <div className="space-y-4">
          <h1 className="text-h1 font-semibold text-stone-900">Writing</h1>
          <p className="text-body max-w-2xl text-stone-600">
            Essays on education, systems, learning, product, and decision-making. This is thinking
            made inspectable.
          </p>
        </div>

        {/* Essay list */}
        <div className="space-y-8">
          {posts.map((post) => (
            <EssayCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    );
  }
  ```

- [ ] Create EssayCard component

  ```tsx
  // components/writing/EssayCard.tsx
  export function EssayCard({ post }: { post: Post }) {
    return (
      <Link
        href={`/writing/${post.slug}`}
        className="group block space-y-2 rounded-lg border border-stone-200 p-6 transition-colors hover:border-stone-300"
      >
        {/* Title */}
        <h2 className="text-h3 group-hover:text-accent font-semibold text-stone-900">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-body text-stone-700">{post.description}</p>

        {/* Metadata */}
        <div className="text-meta flex items-center gap-3 text-stone-600">
          {post.publishedAt && (
            <time dateTime={post.publishedAt.toISOString()}>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }).format(post.publishedAt)}
            </time>
          )}
          {post.readingTime && (
            <>
              <span className="text-stone-400">•</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
          {post.theme && (
            <>
              <span className="text-stone-400">•</span>
              <span>{post.theme}</span>
            </>
          )}
        </div>
      </Link>
    );
  }
  ```

- [ ] Implement essay listing (no pagination)
- [ ] Optional: Add theme grouping
- [ ] Remove any feed-like patterns
- [ ] Ensure library-like feel

#### Testing Requirements

- [ ] Library test: Does page feel like a library or a blog?
- [ ] Choice test: Can readers choose deliberately what to read?
- [ ] Pressure test: Is there any pagination or "infinite scroll" pressure?

---

### Story 7.4: Individual Essay Page Structure

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **reader**,
I want **essays to read cleanly from top to bottom**,
So that **I can focus on thinking without distraction**.

#### Acceptance Criteria

**Given** an essay page is loaded
**When** a reader views it
**Then** the essay reads cleanly from top to bottom
**And** the page feels like reading a well-edited memo
**And** all required elements are present

#### Required Elements

1. **Title** — Descriptive, not clever
2. **Context line** — Why this was written
3. **Body** — Clear, structured prose
4. **Optional diagram** — Only if it clarifies thinking (max 1)
5. **Subtle footer** — Links to related work or projects

#### Rules

❌ No sidebars
❌ No sticky CTAs
❌ No comments section
❌ No social share buttons

#### Implementation Checklist

- [ ] Create Essay component

  ```tsx
  // components/writing/Essay.tsx
  type Post = {
    title: string;
    contextLine?: string;
    body: string;
    diagramUrl?: string;
    publishedAt: Date | null;
    readingTime: number | null;
  };

  export function Essay({ post }: { post: Post }) {
    return (
      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* Header */}
        <header className="mb-12 space-y-4">
          <h1 className="text-h1 font-semibold text-stone-900">{post.title}</h1>

          {/* Context line */}
          {post.contextLine && (
            <p className="text-body italic text-stone-600">{post.contextLine}</p>
          )}

          {/* Metadata */}
          <div className="text-meta flex items-center gap-3 text-stone-500">
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toISOString()}>
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(post.publishedAt)}
              </time>
            )}
            {post.readingTime && (
              <>
                <span className="text-stone-400">•</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
          </div>
        </header>

        {/* Body */}
        <div className="prose prose-stone max-w-none">
          {/* Render markdown or rich text */}
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>

        {/* Optional diagram */}
        {post.diagramUrl && (
          <figure className="my-12">
            <img
              src={post.diagramUrl}
              alt="Diagram"
              className="w-full rounded-lg border border-stone-200"
            />
          </figure>
        )}

        {/* Footer with related content */}
        <footer className="mt-16 border-t border-stone-200 pt-8">
          <EssayRelatedContent postId={post.id} />
        </footer>
      </article>
    );
  }
  ```

- [ ] Implement markdown/rich text rendering
- [ ] Add prose styling (Typography from Epic 2)
- [ ] Remove sidebars, CTAs, comments, social buttons
- [ ] Ensure clean top-to-bottom reading flow

#### Testing Requirements

- [ ] Reading test: Does essay read cleanly top to bottom?
- [ ] Distraction test: Are there any competing elements?
- [ ] Memo test: Does it feel like a well-edited memo?

---

### Story 7.5: Writing Style Constraints (This Matters a Lot)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 5-6 hours

#### User Story

As a **reader evaluating thinking quality**,
I want **essays to feel careful, not impressive**,
So that **I can assess judgment without fighting through jargon or theatrics**.

#### Acceptance Criteria

**Given** an essay is written
**When** readers evaluate it
**Then** essays are understandable without re-reading
**And** you would stand by every sentence in an interview
**And** the writing feels careful, not impressive

#### Required Qualities

✅ Plain language
✅ Concrete examples
✅ Clear structure
✅ Honest uncertainty where applicable

#### Explicit Bans

❌ Buzzwords
❌ Over-abstract language
❌ Rhetorical questions as filler
❌ Grand conclusions

#### Implementation Checklist

- [ ] Create writing style guide

  ```markdown
  # Writing Style Guide

  ## Required Qualities

  1. **Plain language**
     - Use everyday words
     - Avoid jargon unless necessary
     - Define technical terms when used

  2. **Concrete examples**
     - Every abstract point needs a concrete example
     - Real scenarios from teaching, building, or operating
     - Numbers and specifics where possible

  3. **Clear structure**
     - Headings that outline the argument
     - Short paragraphs (3-5 sentences max)
     - Logical flow from point to point

  4. **Honest uncertainty**
     - Admit what you don't know
     - Caveat strong claims
     - "I think" is okay when appropriate

  ## Explicit Bans

  - **Buzzwords**: "disruptive", "paradigm shift", "thought leader"
  - **Over-abstract language**: "leverage synergies", "holistic approach"
  - **Rhetorical questions as filler**: "But what if we could...?"
  - **Grand conclusions**: "This will change everything"

  ## Good Examples

  - "After teaching 500 students, I noticed that clarity beats cleverness."
  - "User retention dropped 20% when we added the new feature."
  - "I don't know if this applies to larger teams, but it worked at our scale."

  ## Bad Examples

  - "We must reimagine the paradigm of educational excellence."
  - "What if there was a better way?"
  - "This revolutionary approach will transform learning forever."

  ## Tone Checklist

  Before publishing, ask:

  - [ ] Would I say this sentence out loud in a conversation?
  - [ ] Can I defend every claim with evidence or experience?
  - [ ] Is anything here just to sound smart?
  ```

- [ ] Review all essays against style guide
- [ ] Remove buzzwords and abstract language
- [ ] Replace rhetorical questions with statements
- [ ] Remove grand conclusions
- [ ] Add concrete examples to abstract points

#### Testing Requirements

- [ ] Readability test: Can readers understand without re-reading?
- [ ] Interview test: Would you stand by every sentence in an interview?
- [ ] Tone test: Does writing feel careful or impressive?

---

### Story 7.6: Length Discipline

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **reader with limited time**,
I want **essays to respect my time while allowing necessary depth**,
So that **every section earns its place and nothing feels bloated**.

#### Acceptance Criteria

**Given** an essay is written
**When** evaluating length
**Then** no essay feels bloated
**And** every section earns its place
**And** clarity is preferred over completeness

#### Guidelines

- Prefer clarity over completeness
- Cut aggressively
- Long essays allowed only if necessary

#### Rules

- If it can be said in 800 words, don't make it 2,000
- If it needs 2,000 words, structure it carefully

#### Implementation Checklist

- [ ] Create length discipline guidelines

  ```markdown
  # Length Discipline Guidelines

  ## Preferred Lengths

  - **Short essays**: 500-800 words (preferred)
  - **Medium essays**: 1,000-1,500 words (acceptable if necessary)
  - **Long essays**: 2,000+ words (only if unavoidable, must be structured)

  ## Cutting Process

  Before publishing, ask:

  1. **Can this be shorter?**
     - Cut the first paragraph (often unnecessary context)
     - Remove hedging language ("I think that maybe perhaps...")
     - Delete repetitive points

  2. **Does every section earn its place?**
     - Remove sections that don't advance the argument
     - Cut examples that don't clarify
     - Delete conclusions that just summarize

  3. **Is this as clear as possible?**
     - Short sentences > long sentences
     - Active voice > passive voice
     - Concrete > abstract

  ## Structure for Long Essays

  If essay exceeds 1,500 words:

  - [ ] Add clear section headings
  - [ ] Front-load key insights
  - [ ] Use subheadings to aid scanning
  - [ ] Consider splitting into multiple essays

  ## Red Flags

  - Long introductions
  - Repetitive points
  - Unnecessary background
  - Rambling conclusions
  ```

- [ ] Review all essays for length
- [ ] Cut aggressively where possible
- [ ] For long essays, add structure (headings, subheadings)
- [ ] Calculate reading time for each essay

#### Testing Requirements

- [ ] Bloat test: Does any essay feel padded or bloated?
- [ ] Necessity test: Does every section earn its place?
- [ ] Clarity test: Could this be shorter without losing meaning?

---

### Story 7.7: Hand-Drawn Diagrams & Visual Explanations (Optional, Controlled)

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **reader processing complex ideas**,
I want **diagrams that clarify thinking, not decorate**,
So that **cognitive load is reduced without distraction**.

#### Acceptance Criteria

**Given** an essay includes a diagram
**When** readers view it
**Then** diagrams reduce cognitive load
**And** removing the diagram would make the essay worse
**And** there is max 1 diagram per essay

#### Allowed

✅ System diagrams
✅ Concept flows
✅ Decision trees
✅ Timelines

#### Style Rules

- Thin lines
- Neutral color
- Minimal labels
- One diagram per essay max

#### Forbidden

❌ Illustrations for mood
❌ Decorative sketches
❌ Multiple diagrams per section

#### Implementation Checklist

- [ ] Create diagram guidelines

  ```markdown
  # Diagram Guidelines

  ## When to Use

  - Only when a visual reduces cognitive load
  - Only when text alone is insufficient
  - Max 1 diagram per essay

  ## Allowed Types

  - System diagrams (how components connect)
  - Concept flows (how ideas relate)
  - Decision trees (branching logic)
  - Timelines (sequence of events)

  ## Style Rules

  - Thin lines (1-2px)
  - Neutral color (stone-400 or stone-500)
  - Minimal labels (short, clear)
  - Simple shapes (rectangles, circles, arrows)

  ## Forbidden

  - Illustrations for mood or decoration
  - Multiple diagrams in one section
  - Complex or busy diagrams
  - Color for aesthetic purposes

  ## Quality Test

  Ask: "If I removed this diagram, would the essay be harder to understand?"

  - If yes: keep diagram
  - If no: remove diagram
  ```

- [ ] Add diagramUrl field to Post model (already in schema)
- [ ] Implement diagram rendering in Essay component (already done)
- [ ] Review all diagrams against guidelines
- [ ] Limit to 1 diagram max per essay

#### Testing Requirements

- [ ] Clarity test: Does diagram reduce cognitive load?
- [ ] Necessity test: Would removing it make essay worse?
- [ ] Limit test: Is there max 1 diagram per essay?

---

### Story 7.8: Cross-Linking with Work & Startups

**Priority:** Medium
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **deep reader**,
I want **to trace ideas to systems to outcomes**,
So that **writing reinforces execution and the site feels coherent**.

#### Acceptance Criteria

**Given** related content exists across writing, work, and startups
**When** cross-links are added
**Then** deep readers can trace ideas → systems → outcomes
**And** links feel like citations, not funnels
**And** tone is referential, not promotional

#### Rules

Essays can link to:

- Projects they explain
- Startups they emerged from

Project/startup pages can link back to:

- Essays explaining decisions

#### Tone

✅ Referential, not promotional
❌ No "Read this to understand…" language

#### Implementation Checklist

- [ ] Add relatedProjectSlugs and relatedStartupSlugs to Post model (already in schema)
- [ ] Create EssayRelatedContent component

  ```tsx
  // components/writing/EssayRelatedContent.tsx
  export function EssayRelatedContent({
    projects,
    startups,
  }: {
    projects?: Array<{ slug: string; title: string }>;
    startups?: Array<{ slug: string; name: string }>;
  }) {
    if (!projects?.length && !startups?.length) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-h3 font-semibold text-stone-900">Related</h3>

        {projects && projects.length > 0 && (
          <div className="space-y-2">
            <p className="text-meta text-stone-600">Work:</p>
            <ul className="space-y-1">
              {projects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={`/work/${project.slug}`}
                    className="text-body text-accent hover:underline"
                  >
                    {project.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {startups && startups.length > 0 && (
          <div className="space-y-2">
            <p className="text-meta text-stone-600">Startups:</p>
            <ul className="space-y-1">
              {startups.map((startup) => (
                <li key={startup.slug}>
                  <a
                    href={`/startups/${startup.slug}`}
                    className="text-body text-accent hover:underline"
                  >
                    {startup.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  ```

- [ ] Identify cross-linking opportunities
- [ ] Add related content to essays
- [ ] Add essay references to work/startup pages
- [ ] Review for promotional tone (keep referential)
- [ ] Limit to 2-3 related items max per essay

#### Testing Requirements

- [ ] Coherence test: Can readers trace ideas → systems → outcomes?
- [ ] Citation test: Do links feel like citations or funnels?
- [ ] Referential test: Is tone referential, not promotional?

---

### Story 7.9: Publishing Cadence & Governance

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **writer**,
I want **to publish event-driven, not on a schedule**,
So that **writing never feels obligatory and the archive remains high-signal**.

#### Acceptance Criteria

**Given** the publishing system exists
**When** deciding whether to publish
**Then** writing never feels obligatory
**And** the archive remains high-signal
**And** it's okay to publish nothing for months

#### Cadence Philosophy

- Event-driven
- Not weekly
- Not scheduled

#### Governance Rules

- Only publish when something is learned
- It's okay to publish nothing for months
- Quality beats consistency

#### Implementation Checklist

- [ ] Create publishing governance document

  ```markdown
  # Publishing Governance

  ## Publishing Philosophy

  - **Event-driven**: Publish when something is learned
  - **Not scheduled**: No weekly/monthly commitments
  - **Quality over consistency**: Better to publish 2 great essays per year than 24 mediocre ones

  ## When to Publish

  Publish when:

  - You've learned something concrete from building, teaching, or operating
  - You can explain it clearly without jargon
  - You'd be comfortable discussing it in depth in an interview
  - It reveals how you think, not just what you think

  ## When NOT to Publish

  Don't publish:

  - To "stay active" or "build audience"
  - Generic opinions without grounding
  - Hot takes or trend commentary
  - Content that doesn't reveal reasoning

  ## Acceptable Gaps

  - No posts for 3 months: Perfectly fine
  - No posts for 6 months: Acceptable
  - No posts for 1 year: Consider if writing section adds value

  ## Archive Quality

  - Review annually
  - Archive or remove essays that no longer represent you
  - Highlight best 1-3 essays
  ```

- [ ] Document event-driven publishing approach
- [ ] Remove any scheduled publishing pressure
- [ ] Set expectation: quality over consistency

#### Testing Requirements

- [ ] Pressure test: Is there any obligation to publish?
- [ ] Quality test: Does archive remain high-signal?
- [ ] Flexibility test: Is it acceptable to publish nothing for months?

---

### Story 7.10: Drafting & Editing Workflow (Operator UX)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **writer**,
I want **a frictionless but deliberate writing workflow**,
So that **I can write without worrying about layout and publish intentionally**.

#### Acceptance Criteria

**Given** the writing workflow exists
**When** using it
**Then** you can write without worrying about layout
**And** publishing feels calm and controlled
**And** drafts are saved privately

#### Requirements

- Drafts saved privately
- Preview mode
- Publish/unpublish toggle
- Edit history (optional but useful)

#### Rules

❌ No auto-publish
✅ Publishing is intentional

#### Implementation Checklist

- [ ] Create draft/publish workflow

  ```typescript
  // lib/post-workflow.ts
  export async function createDraft(data: { title: string; description: string; body: string }) {
    return db.post.create({
      data: {
        ...data,
        draft: true,
        published: false,
        authorId: 'user-id', // From session
      },
    });
  }

  export async function publishPost(postId: string) {
    return db.post.update({
      where: { id: postId },
      data: {
        published: true,
        publishedAt: new Date(),
        draft: false,
      },
    });
  }

  export async function unpublishPost(postId: string) {
    return db.post.update({
      where: { id: postId },
      data: {
        published: false,
      },
    });
  }
  ```

- [ ] Create admin UI for drafting

  ```tsx
  // app/admin/posts/[id]/edit/page.tsx
  export default function EditPostPage({ params }: { params: { id: string } }) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <PostEditor postId={params.id} />
      </div>
    );
  }

  // components/admin/PostEditor.tsx
  function PostEditor({ postId }: { postId: string }) {
    const [post, setPost] = useState<Post | null>(null);
    const [preview, setPreview] = useState(false);

    return (
      <div className="space-y-6">
        {/* Editor controls */}
        <div className="flex items-center justify-between">
          <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
          <div className="flex gap-3">
            <button onClick={saveDraft}>Save Draft</button>
            <button onClick={publishPost}>Publish</button>
          </div>
        </div>

        {/* Editor or preview */}
        {preview ? <EssayPreview post={post} /> : <EssayEditor post={post} onChange={setPost} />}
      </div>
    );
  }
  ```

- [ ] Implement draft auto-save
- [ ] Add preview mode
- [ ] Add publish/unpublish toggle
- [ ] Optional: Add edit history

#### Testing Requirements

- [ ] Workflow test: Is writing frictionless?
- [ ] Control test: Does publishing feel calm and intentional?
- [ ] Privacy test: Are drafts saved privately?

---

### Story 7.11: Emotional Validation Checks (Writing Epic)

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **quality control mechanism**,
I want **to validate that writing produces the right emotional outcome**,
So that **employers feel respect and trust, not performativeness**.

#### Acceptance Criteria

**Given** the Writing section is complete
**When** employers read it
**Then** they feel respect, trust, "this person thinks clearly", and "I'd like to hear how they'd approach our problems"
**And** they do NOT feel "this feels like a blog", "this feels performative", or "this feels opinionated without grounding"
**And** you'd be comfortable discussing any essay in depth
**And** writing strengthens interview conversations

#### Desired Employer Emotions

✅ Respect
✅ Trust
✅ "This person thinks clearly"
✅ "I'd like to hear how they'd approach our problems"

#### Anti-Emotions

❌ "This feels like a blog"
❌ "This feels performative"
❌ "This feels opinionated without grounding"

#### Implementation Checklist

- [ ] Create emotional validation checklist

  ```markdown
  # Writing Emotional Validation Checklist

  ## Pre-launch Review

  - [ ] Would I be comfortable discussing any essay in depth in an interview?
  - [ ] Does any essay feel performative or written to impress?
  - [ ] Does any essay make grand claims without grounding?
  - [ ] Does the writing section feel like a blog or a library?

  ## External Validation (3-5 test readers)

  - [ ] Ask: "What emotions did you feel reading this?"
  - [ ] Expected: respect, trust, "thinks clearly", "want to hear their approach"
  - [ ] Red flags: "feels like a blog", "performative", "opinionated without grounding"

  ## Interview Strengthening Test

  - [ ] For each essay, imagine an interviewer saying: "I read your essay on X. Can you explain Y?"
  - [ ] Can you go deeper on every point?
  - [ ] Does the essay create good conversation starting points?

  ## Thinking Quality Test

  - [ ] Does each essay reveal HOW you think, not just WHAT you think?
  - [ ] Can employers infer your judgment from the essays?
  - [ ] Do essays demonstrate independent thinking?
  ```

- [ ] Conduct pre-launch review
- [ ] Run external validation with 3-5 test readers
- [ ] Simulate interview scenarios for each essay
- [ ] Remove any content that triggers anti-emotions

#### Testing Requirements

- [ ] Emotional response test: Ask 3-5 readers "What emotions did you feel?"
- [ ] Interview test: Does writing strengthen interview conversations?
- [ ] Performative test: Does anything feel written to impress?
- [ ] Thinking test: Do essays reveal HOW you think?

---

### Story 7.12: Curation & Pruning Over Time

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **portfolio maintainer**,
I want **clear curation rules to keep the writing section sharp**,
So that **signal density increases over time, not decreases**.

#### Acceptance Criteria

**Given** the writing section is maintained over time
**When** curation rules are applied
**Then** the writing section improves with age
**And** signal density increases, not decreases
**And** essays that no longer represent you are archived

#### Governance Rules

- Archive or remove essays that no longer represent you
- Highlight best 1–3 essays
- Don't let volume substitute for quality

#### Implementation Checklist

- [ ] Create curation governance document

  ```markdown
  # Writing Curation Governance

  ## Annual Review Process

  Run every 12 months:

  1. **Review all published essays**
     - Does this still represent my current thinking?
     - Would I discuss this confidently in an interview today?
     - Does this demonstrate judgment I want to be hired for?

  2. **Apply quality bar**
     - Archive essays that no longer represent you
     - Highlight best 1-3 essays (featured flag)
     - Update essays if thinking has evolved (with note)

  3. **Signal density check**
     - 3 great essays > 10 mediocre essays
     - Quality beats volume
     - Archive anything that dilutes signal

  ## Archiving vs Deletion

  - Never delete essays (keep in database)
  - Set published: false to archive
  - Can be restored if thinking becomes relevant again

  ## Featured Essays

  - Mark 1-3 best essays as featured
  - Featured essays appear on homepage or top of writing page
  - Rotate featured essays as new strong pieces are published

  ## Evolution Note

  - If thinking has evolved, add note to essay:
    "Note: This essay reflects my thinking as of [date]. My current view is [brief update]."
  ```

- [ ] Implement featured flag (already in schema)
- [ ] Create admin interface for curation
- [ ] Set up annual review reminder
- [ ] Document archiving process

#### Testing Requirements

- [ ] Quality test: Does writing section improve with age?
- [ ] Signal test: Is density increasing?
- [ ] Curation test: Are weak essays archived?

---

## Epic Completion Criteria

Epic 7 is considered complete when:

### Content & Structure

- [ ] All 12 stories implemented and tested
- [ ] Writing page feels like a library, not a blog
- [ ] Each essay has title, context line, clear body, optional diagram (max 1)
- [ ] Inclusion standards documented and enforced
- [ ] Event-driven publishing (no schedules)

### Writing Quality

- [ ] Every essay reveals HOW you think, not just WHAT you think
- [ ] Plain language, concrete examples, clear structure
- [ ] Honest uncertainty where applicable
- [ ] No buzzwords, over-abstract language, rhetorical filler, or grand conclusions

### Length & Clarity

- [ ] Essays respect reader time (prefer 500-800 words)
- [ ] Long essays (2,000+ words) are structured carefully
- [ ] Every section earns its place
- [ ] No bloat or padding

### Visual & UX

- [ ] Clean top-to-bottom reading (no sidebars, CTAs, comments, social buttons)
- [ ] Optional diagrams clarify thinking (max 1 per essay)
- [ ] Cross-links to Work & Startups where relevant (referential, not promotional)

### Publishing Workflow

- [ ] Drafts saved privately
- [ ] Preview mode functional
- [ ] Publish/unpublish toggle
- [ ] No auto-publish (intentional publishing)

### User Validation

- [ ] 3-5 employers conclude "this person thinks clearly"
- [ ] Writing strengthens interview conversations
- [ ] Emotional validation produces respect/trust, not performativeness
- [ ] Featured essays (1-3 max) highlighted

---

## EPIC 7 Deliverables

By the end of EPIC 7, you have:

1. **A writing section that signals judgment**
   Essays reveal how you think when no one is giving instructions

2. **Essays that complement work and startups**
   Cross-links allow deep readers to trace ideas → systems → outcomes

3. **A calm, readable reading experience**
   Library-like feel, clean top-to-bottom reading, no distractions

4. **A sustainable, non-performative publishing system**
   Event-driven publishing, quality over consistency, no schedule pressure

---

## Why EPIC 7 Matters

### Many candidates either

- **Don't write at all** (miss opportunity to demonstrate thinking)
- **Write too much without substance** (dilute signal with performative content)

### Done correctly, writing becomes

**The quietest — and strongest — differentiator.**

When employers read essays that:

- Use plain language and concrete examples
- Demonstrate independent judgment
- Reveal reasoning process
- Connect to real work and decisions

They conclude: **"This person can think clearly when no one is watching."**

And that's the question most candidates can't answer.

---

**Epic Status:** Ready for Implementation
**Next Epic:** Epic 8 — Resources & Educational Products
