# homepage content prioritization logic

**what earns homepage real estate**

---

## core principle

**the homepage is curated, not chronological.**

homepage content is manually selected for best representation, not automatically pulled from "latest 3" queries. this ensures the homepage remains stable and intentional over time.

---

## rules

### 1. homepage is curated, not chronological

**NOT:**

- "latest 3 projects"
- "most recent posts"
- chronological ordering

**YES:**

- "best 3 projects (manually selected)"
- featured items marked in database
- quality over recency

---

### 2. maximum items per section enforced

**proof anchors:** 2-3 max

- MarkPoint
- Riqle
- HSC English Tutoring (or rotate based on relevance)

**featured essay:** 1 max

- manually selected for best representation of thinking

**primary CTAs:** 2 only

- View Work
- Read Writing

**secondary links:** minimal

- Resources (subtle, in above-fold)
- Contact (if needed, in footer)

---

### 3. "best work" beats "latest work"

**selection criteria:**

- impact over recency
- outcomes over novelty
- proof of capability over "latest thing I built"

**example:**

- older project with strong outcomes stays featured
- new side project doesn't automatically replace it
- homepage represents best work, not most recent activity

---

## governance

### featured items must be manually chosen

**database implementation:**

```prisma
model Project {
  id                  String  @id @default(cuid())
  title               String
  slug                String  @unique
  description         String
  outcome             String?
  featuredOnHomepage  Boolean @default(false)  // manual flag
  homepageOrder       Int?                     // manual ordering
  status              String  @default("draft")
  // ... other fields
}

model Post {
  id                  String  @id @default(cuid())
  title               String
  slug                String  @unique
  content             String
  excerpt             String?
  featuredOnHomepage  Boolean @default(false)
  status              String  @default("draft")
  publishedAt         DateTime?
  // ... other fields
}
```

**admin interface:**

- checkbox to toggle "featured on homepage"
- drag-to-reorder for homepage sequence
- preview before publishing

---

### review homepage quarterly, not weekly

**cadence:**

- quarterly review (every 3 months)
- not daily/weekly updates
- stable representation over time

**review questions:**

1. do these 3 proof items still represent best work?
2. is the featured essay still the best thinking?
3. have any major achievements happened that should be featured?
4. does the homepage accurately reflect current direction?

**when to update:**

- major new project with strong outcomes
- significant shift in focus/direction
- featured work becomes outdated or no longer representative

**when NOT to update:**

- "i just finished a side project" → doesn't automatically go on homepage
- "i wrote a new blog post" → doesn't replace featured essay unless it's significantly better
- weekly churn → homepage is not a feed

---

### homepage never becomes a feed

**banned patterns:**

- chronological listings ("latest posts")
- activity streams ("recent projects")
- "new" badges or timestamps
- dynamic "what i'm working on now" sections (use third screen for this)

**homepage is:**

- snapshot of best representation
- curated selection
- stable over time
- manually maintained

---

## implementation

### homepage data fetching

```typescript
// app/page.tsx - Server Component
export default async function HomePage() {
  // Get manually featured projects (not "latest 3")
  const featuredProjects = await db.project.findMany({
    where: {
      status: 'published',
      featuredOnHomepage: true,
    },
    orderBy: { homepageOrder: 'asc' }, // manual ordering
    take: 3, // enforce maximum
  });

  // Get manually featured essay (not "latest post")
  const featuredEssay = await db.post.findFirst({
    where: {
      status: 'published',
      featuredOnHomepage: true,
    },
  });

  return (
    // ... homepage JSX using featuredProjects and featuredEssay
  );
}
```

**NO automatic queries:**

```typescript
// ❌ DO NOT DO THIS
const latestProjects = await db.project.findMany({
  where: { status: 'published' },
  orderBy: { createdAt: 'desc' },
  take: 3,
});

// ❌ DO NOT DO THIS
const recentPosts = await db.post.findMany({
  where: { status: 'published' },
  orderBy: { publishedAt: 'desc' },
  take: 1,
});
```

**YES manual curation:**

```typescript
// ✅ YES: manually curated
const featuredProjects = await db.project.findMany({
  where: {
    status: 'published',
    featuredOnHomepage: true, // admin manually toggles this
  },
  orderBy: { homepageOrder: 'asc' }, // admin manually sets order
  take: 3,
});
```

---

## admin workflow

### marking content as featured

**admin dashboard:**

1. go to "Projects" or "Posts" management
2. find item to feature
3. toggle "Featured on Homepage" checkbox
4. set "Homepage Order" (1, 2, 3)
5. preview homepage
6. publish changes

**enforcement:**

- max 3 projects can be featured at once
- only 1 essay can be featured
- if adding a 4th project, system warns: "max 3 featured, remove one first"

---

## content rotation strategy

### when to rotate proof anchors

**add new proof anchor when:**

- new project has stronger outcomes than current featured work
- new project represents capability better than existing one
- significant shift in focus/direction makes old work less relevant

**keep existing proof anchor when:**

- still represents best work
- outcomes are strong and relevant
- no new work surpasses it

**example rotation:**

```
Before: [MarkPoint, Riqle, HSC Tutoring]
New project: "Data Viz Tool" with 10K users

Question: Is this better proof than HSC Tutoring?
- If yes → rotate out Tutoring, add Data Viz
- If no → keep existing, Data Viz goes on /work but not homepage

Decision: Keep current (tutoring shows unique skill, Data Viz is just another project)
Result: No change to homepage
```

---

## content selection criteria

### proof anchors (projects/startups)

**must have:**

- real outcomes (not hypothetical)
- quantified impact (users, revenue, reach, band scores)
- links to deep-dive page

**bonus points:**

- diverse skill demonstration (tech + teaching + business)
- unique capability signal
- "only i could have done this" projects

**rotation threshold:**

- new work must be significantly better to replace existing
- "better" = more impressive outcomes, not just newer

---

### featured essay

**must have:**

- represents best thinking quality
- demonstrates judgment/systems thinking
- readable in 5-10 minutes
- links to full essay page

**bonus points:**

- relevant to current direction
- unique perspective
- actionable insights

**rotation threshold:**

- new essay must be significantly better to replace
- "better" = clearer thinking, more valuable insights

---

## fallback rules

### if no featured content exists

**proof anchors:**

- show 0 proof anchors (don't auto-fill with "latest")
- homepage still works with just above-the-fold
- admin gets warning: "no featured projects, homepage incomplete"

**featured essay:**

- hide "Recent Thinking" section entirely
- don't show placeholder
- third screen can be just "Currently" and "Approach"

**philosophy:**

- better to show nothing than auto-fill with low-quality content
- homepage quality > homepage completeness
- manual curation enforced, no automatic fallbacks

---

## validation checklist

**before publishing homepage updates:**

- [ ] maximum 2-3 proof anchors selected
- [ ] each proof anchor has: name, description, outcome, link
- [ ] proof anchors represent best work (not latest)
- [ ] featured essay (if present) represents best thinking
- [ ] all links work (no 404s)
- [ ] content feels curated, not automated
- [ ] homepage answers 5 core questions
- [ ] no "latest 3" automatic queries
- [ ] quarterly review date set

---

## anti-patterns

### ❌ automatic chronological feeds

**don't:**

```tsx
// ❌ homepage becomes a blog
<h2>Latest Posts</h2>;
{
  latestPosts.map((post) => <PostCard post={post} />);
}
```

**instead:**

```tsx
// ✅ manually curated depth
<h3>Recent Thinking</h3>
<a href={featuredEssay.slug}>
  {featuredEssay.title} →
</a>
```

---

### ❌ "new" badges or timestamps

**don't:**

```tsx
// ❌ chasing recency
<ProofAnchor name="My Project" badge="NEW!" timestamp="Added 3 days ago" />
```

**instead:**

```tsx
// ✅ timeless representation
<ProofAnchor name="My Project" description="What it is" outcome="What was achieved" />
```

---

### ❌ weekly homepage churn

**don't:**

- update homepage every time you ship something
- rotate featured work weekly
- chase "freshness"

**instead:**

- quarterly review and updates
- stable representation
- update only when significantly better work exists

---

## summary

**homepage content prioritization:**

1. **curated, not chronological** — manual selection, no "latest 3"
2. **maximum items enforced** — 2-3 proof, 1 essay, fixed
3. **best work beats latest** — quality over recency
4. **quarterly reviews** — stable, not constantly changing
5. **never becomes a feed** — snapshot of best representation

**default to restraint:**

- fewer items, higher quality
- stable over time
- manually curated
- intentional selection

**the homepage represents your best work, not your most recent activity.**
