# progressive disclosure rules: calm first, depth later

> **principle:** message first, texture later. never overwhelm on first impression.
> **user control:** depth on demand, not forced.

---

## core philosophy

**the problem:**

- showing everything at once = cognitive overload
- employer bounces if confused in first 3 seconds
- commerce/complexity can hijack professional identity

**the solution:**

- scroll 1 (above fold): pure clarity
- scroll 2-3: proof that supports clarity
- deep pages: full depth for those who want it

**user feeling:**

- scroll 1: "i understand who this person is."
- scroll 2: "i see evidence this is real."
- scroll 3+: "i want to dig deeper." (optional)

---

## scroll hierarchy (homepage)

### scroll 1 (0-100vh): clarity only

**what appears:**

- name / identity
- positioning (one line)
- 3 proof anchors (quantified)
- 2 primary CTAs

**what does NOT appear:**

- complex visuals
- animations on load
- walls of text
- detailed case studies
- product pitches
- full bio
- testimonials
- social feeds

**aesthetic:**

- desk lamp glow (subtle warmth)
- 1-2 desk objects (mechanical pencil, coffee ring)
- korean annotation (1 word, opacity 30%)
- clean whitespace
- breathing room

**test:**

- if employer can't understand identity in 10 seconds → fail
- if more than 10 items on screen → fail

---

### scroll 2 (100vh-200vh): proof

**what appears:**

- featured project (1 card, expanded)
  - title
  - outcome (quantified)
  - tech stack
  - [view project] CTA
- featured essay (1 card)
  - title
  - excerpt (2-3 lines)
  - read time
  - [read essay] CTA

**what does NOT appear:**

- full project case studies (those live on /work/[slug])
- complete essays (those live on /writing/[slug])
- multiple projects at once (1-2 max)

**aesthetic:**

- hand-drawn card borders (imperfections: torn corner, tape)
- pencil sketch decoration
- neon accents on outcomes (cyan for calm, green for success)
- more korean annotations (노력, 진실)

**test:**

- does this section support claim from scroll 1? → yes
- is user compelled to click deeper? → yes

---

### scroll 3+ (200vh+): texture (optional)

**what appears:**

- additional context (if needed)
- brief "more about me" teaser
- footer navigation (all pages accessible)
- korean timestamp ("23:47" style)
- more desk objects (eraser crumbs, paper clips)

**what does NOT appear:**

- everything at once
- endless content

**aesthetic:**

- more atmospheric (rain overlay optional)
- desk clutter increases slightly (7-10 objects)
- lamp glow fades (darker corners)

**user control:**

- user scrolled this far → they want depth
- but it's optional (not forced)

---

## page-level progressive disclosure

### home page

```
scroll 1: who, what, where to go
scroll 2: proof (1 project, 1 essay)
scroll 3+: texture, footer
```

### work page

```
scroll 1: featured projects (3-5 cards)
scroll 2: "see all projects" link → archive
deep page: /work/[slug] → full case study
```

### writing page

```
scroll 1: featured essays (1-3)
scroll 2: "all writing" link → archive
deep page: /writing/[slug] → full essay
```

### startups page

```
scroll 1: markpoint (primary)
scroll 2: other ventures (if they exist)
deep page: /startups/[slug] → full story
```

### resources page

```
scroll 1: intro + product catalog
scroll 2: individual product cards
deep page: /resources/[slug] → product detail + purchase
```

### about page

```
scroll 1: opening paragraph (student → tutor → builder → founder)
scroll 2: narrative (non-linear path explained)
scroll 3: values + current focus
scroll 4+: deeper context (optional)
```

### contact page

```
scroll 1: email + form (that's it)
no scroll 2 needed
```

---

## deep page structure (detail views)

**applies to:**

- /work/[slug] (project detail)
- /writing/[slug] (essay detail)
- /startups/[slug] (startup detail)
- /resources/[slug] (product detail)

**structure:**

```
[breadcrumb: work > project name]

scroll 1: title + hero image (if applicable)
scroll 2: problem / context
scroll 3: solution / approach
scroll 4: outcome / results
scroll 5: technical details (if applicable)
scroll 6: learnings / reflections
scroll 7: related content
scroll 8: footer
```

**progressive depth:**

- each scroll reveals next layer
- user controls how deep they go
- no infinite scroll (clear end point)

---

## interaction-based disclosure

### click to reveal (not hover)

**what needs interaction:**

- full case studies → click project card
- complete essays → click essay card
- product details → click product card
- related content → click "related" link

**what doesn't:**

- navigation (always visible)
- primary CTAs (always visible)
- proof anchors (always visible)

**reasoning:**

- hover = unstable on mobile
- click = intentional choice
- user decides when to go deeper

### examples

**homepage project card (initial state):**

```
[project card]
markpoint
one-line description
[X] users, [Y] retention
[view project]
```

**click "view project" → /work/markpoint (full depth):**

```
markpoint

[full case study]
- problem statement
- solution approach
- technical architecture
- outcomes + metrics
- learnings
- screenshots / demos
- related writing
```

---

## commerce containment rules

**problem:**

- selling products can make site feel like sales funnel
- employer perception: "marketer" not "builder"

**solution:**

- resources exist but don't hijack identity

### homepage

```
scroll 1: NO resources mention
scroll 2: NO resources mention
scroll 3+: subtle "resources" link in footer (optional)
```

### navigation

```
[about] [work] [writing] [startups] [resources] [contact]
                                     ↑
                                  present but not dominant
```

### resources page itself

```
scroll 1: calm intro
"resources built from real tutoring experience.

no urgency. no scarcity. just tools that work."

scroll 2: product catalog (factual cards)
deep page: /resources/[slug] → purchase flow
```

**banned:**

- popups ("sign up for my newsletter!")
- countdown timers ("offer ends in 3 hours!")
- urgency language ("only 2 left!")
- exit-intent modals
- forced email gates
- "get instant access!" language

**allowed:**

- calm product cards
- clear pricing
- factual descriptions
- evidence-backed claims
- simple checkout

---

## depth without chaos

**principle:** every page has a clear end.

**no:**

- infinite scroll
- endless related content loops
- 50-item archives on one page

**yes:**

- pagination ("page 1 of 5")
- "load more" button (optional, max 3 clicks)
- clear archive structure

**example (writing archive):**

```
/writing → featured essays (3)
         → "all writing" link

/writing/archive → paginated list
                 → 10 essays per page
                 → clear page numbers
```

---

## typography hierarchy supports disclosure

**scroll 1 (clarity):**

- chalk font headings (60px)
- body text (16px)
- minimal decorative text

**scroll 2 (proof):**

- chalk font headings (40px)
- body text (16px)
- neon accents on key metrics
- margin annotations start appearing

**scroll 3+ (texture):**

- chalk font headings (28px)
- body text (16px)
- more annotations
- korean text opacity increases slightly

**deep pages (full depth):**

- chalk font headings (40-60px range based on hierarchy)
- body text (16px, max width 75ch for readability)
- code blocks (if applicable)
- full annotation system

---

## whitespace as disclosure tool

**scroll 1:**

- 48-60px between sections
- generous padding (32-48px)
- feels spacious, calm

**scroll 2:**

- 32-40px between sections
- standard padding (24-32px)
- still comfortable

**scroll 3+:**

- 24-32px between sections
- tighter (but not cramped)
- more information density accepted

**deep pages:**

- varies by content type
- essays: wider spacing (reading comfort)
- code: tighter spacing (scanning)

---

## animation constraints

**scroll 1 (above fold):**

- NO animations on load
- NO auto-playing anything
- NO scroll-triggered effects

**reasoning:**

- animations delay comprehension
- employer needs clarity immediately
- motion can distract from message

**scroll 2+:**

- subtle fade-ins allowed (opacity 0 → 1, 300ms)
- scroll-triggered reveals allowed (if respectful)
- NO parallax that induces nausea
- NO scroll-jacking

**interactions:**

- hover effects allowed (glow intensify, underline appear)
- click animations allowed (chalk dust, neon pulse)
- loading states allowed (chalk dots, pencil drawing)

**motion preferences:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## mobile progressive disclosure

**same principles, adapted layout:**

**scroll 1 (mobile):**

- vertical stack (no columns)
- same content as desktop
- larger touch targets (min 44px)
- same "clarity only" rule

**scroll 2 (mobile):**

- cards stack vertically
- one project card (not 2-3 side-by-side)
- same proof principle

**mobile-specific:**

- hamburger nav (disclosed on tap)
- collapsible sections (if necessary)
- "read more" buttons for long text

---

## banned patterns (progressive disclosure violations)

**modals on load:**

- ❌ email capture popups
- ❌ "subscribe to newsletter"
- ❌ cookie banners (unless legally required)
- ❌ "download my free guide"

**intrusive elements:**

- ❌ sticky "subscribe" banners
- ❌ floating chat widgets
- ❌ notification prompts
- ❌ auto-expanding menus

**content overload:**

- ❌ showing 15 projects on homepage
- ❌ full bio above fold
- ❌ testimonials carousel
- ❌ social media feeds

**forced disclosure:**

- ❌ email gates ("enter email to read")
- ❌ account required to browse
- ❌ "unlock with share" schemes

---

## testing checklist

**before launch:**

- [ ] homepage scroll 1: ≤ 10 items visible
- [ ] no animations delay first impression
- [ ] best proof ≤ 3 clicks from home
- [ ] commerce contained (not dominant)
- [ ] deep pages have clear structure
- [ ] no infinite scroll without end
- [ ] mobile preserves hierarchy
- [ ] motion respects `prefers-reduced-motion`
- [ ] no banned patterns present
- [ ] user controls depth (not forced)

**user test:**

- show homepage for 3 seconds
- ask: "what did you understand?"
- if confused → violated clarity rule
- if clear → progressive disclosure works

---

## example: homepage disclosure in action

**employer lands on homepage (0s):**

- sees: name, positioning, 3 proof anchors, CTAs
- understands: student-turned-builder-founder
- feels: calm, clear, not overwhelmed

**employer scrolls (10s):**

- sees: featured project card (markpoint)
- thinks: "this person builds real things"
- action: clicks "view project" (optional)

**employer clicks project (20s):**

- sees: full case study (problem, solution, outcomes)
- thinks: "this is thorough, credible"
- action: clicks "contact" or continues browsing

**employer browses writing (40s):**

- sees: essay about teaching philosophy
- thinks: "this person can explain complex ideas"
- action: decides to reach out

**total journey: 40-60 seconds**

- clarity → proof → depth → decision
- never overwhelmed
- always in control

---

**last updated:** january 3, 2026
**status:** progressive disclosure rules defined. ready for implementation.
**principle:** calm first. depth later. user controls everything.
