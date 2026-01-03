# riqle sitemap

> **vibe:** employer-first. calm. proof, not performance.
> **tone:** lowercase. factual. no hype.

---

## required pages (day 1)

### home

**job:** help employers understand who you are in 30-45 seconds and route them to proof
**key elements:** name, positioning, 2-3 proof anchors, clear CTAs
**not:** a feed, a blog, a portfolio grid

**above fold content:**

- name: nathanael / riqle (lowercase, chalk typography)
- positioning: "student → tutor → builder → founder"
- proof anchors:
  - built markpoint (startup with [X] users)
  - taught 500+ students to band 6 in hsc english
  - ships production code daily
- ctas: [view work] [read writing]
- subtle: resources link present but not dominant

**aesthetic notes:**

- chalk font for name (nanum pen script or hand-drawn)
- desk lamp glow (bottom-right vignette)
- subtle desk objects (mechanical pencil sketch, coffee ring)
- korean annotation: "집중" (focus) opacity 30%

---

### about

**job:** answer "who is this person and why should i care?"
**key elements:** personal story, non-linear path, values, current focus
**not:** a resume, a timeline, a hero's journey

**content structure:**

- opening: "went from failing high school to teaching it. then built software. then started a company."
- narrative: student → tutor → builder → founder journey
- values: honest. builder. operator.
- now: current focus (markpoint, teaching, building)

**aesthetic notes:**

- longer paragraphs (breathing room)
- occasional neon cyan underlines on key insights
- margin annotations: "(this matters.)"
- no photos unless absolutely necessary

---

### work

**job:** show what you've built with context and outcomes
**key elements:** featured projects (3-5), quantified impact, technical depth
**not:** a logo grid, a case study factory

**content hierarchy:**

1. featured projects (max 5)
   - markpoint (ownership + traction)
   - riqle (technical depth + production-grade)
   - client work with measurable outcomes
   - side projects showing unique skills
2. archive: "see all projects →"

**per project card:**

- title (chalk font)
- one-line description
- outcome/metric (neon green if positive)
- tech stack (subtle)
- [view project] button

**aesthetic notes:**

- cards have imperfections (torn corner, tape texture, smudged edge)
- no two cards identical rotation (±3°)
- hand-drawn borders
- desk object decorations between cards

---

### writing

**job:** demonstrate thinking quality and domain knowledge
**key elements:** long-form essays (1-3 featured), focused topics, instant load
**not:** a blog, a newsletter, a content marketing engine

**content hierarchy:**

1. featured essays (1-3)
   - "building in public: lessons from markpoint"
   - "teaching 500 students what the hsc really tests"
   - "why i left [path] to build startups"
2. archive: "all writing →"

**per essay card:**

- title (chalk font, larger)
- excerpt (2-3 lines, apple sf)
- read time
- [read essay] button

**aesthetic notes:**

- notebook paper texture background
- pencil underlines on key phrases
- margin notes: "this matters." "(you know this)"
- chalk tick marks for list items

---

### startups

**job:** prove operator capability and ownership mindset
**key elements:** markpoint front and center, problem/solution/traction
**not:** a pitch deck, a portfolio project

**content structure:**

1. markpoint (primary)
   - problem statement
   - solution approach
   - traction/metrics (honest numbers)
   - learnings
   - [visit markpoint] button
2. future ventures (if they exist)

**aesthetic notes:**

- larger cards for primary startup
- neon cyan accents for metrics
- korean annotation: "꿈" (dream) near vision statements
- coffee cup sketch decoration

---

### resources

**job:** offer educational products with calm framing after establishing proof
**key elements:** hsc materials, courses, evidence-backed descriptions
**not:** a sales funnel, a landing page

**intro copy:**
"resources built from real tutoring experience.

no urgency. no scarcity. just tools that work."

**content structure:**

1. catalog of products (cards)
   - title
   - description (factual, no hype)
   - price (clear, upfront)
   - evidence: "built from 5 years teaching 500+ students"
   - [download guide] or [access course] button

**aesthetic notes:**

- calm presentation (no countdown timers, no "only X left!")
- chalk-style product cards
- hand-drawn checkmarks for features
- korean annotation: "노력" (effort)

---

### contact

**job:** make it easy to reach you
**key elements:** email (primary), optional simple form
**not:** a lead capture system, a calendar booking widget

**content:**

- email: contact@riqle.com (or nathanael@...)
- optional: simple form (name, email, message)
- response time: "usually within 24-48 hours."

**aesthetic notes:**

- minimal page
- large chalk-style email address
- hand-drawn envelope icon
- no fancy animations

---

## optional pages (future)

### resume

**job:** printable, recruiter-friendly version
**when:** if needed for specific opportunities
**format:** pdf download + clean html view

### now

**job:** derek sivers-style "current focus" page
**when:** if trajectory changes often
**update frequency:** quarterly

### uses

**job:** tools stack for credibility
**when:** if asked frequently
**categories:** code, design, productivity, hardware

### changelog

**job:** site updates log
**when:** if shipping frequently
**audience:** curious visitors, fellow builders

### policies

**job:** privacy/terms/refunds (required before commerce launch)
**when:** before selling first product
**must include:** privacy policy, terms of service, refund policy

---

## navigation structure

**desktop:**

```
[riqle]                    about | work | writing | startups | resources | contact
```

**mobile:**

```
[riqle]                                                                   [☰]

(hamburger expands to)
about
work
writing
startups
resources
contact
```

**rules:**

- always visible (no hiding on scroll)
- current page highlighted (chalk underline)
- boring by design (no clever animations)
- lowercase everywhere
- hand-drawn icons optional

---

## url structure

**static pages:**

```
/                 → home
/about            → about
/work             → work index
/writing          → writing index
/startups         → startups index
/resources        → resources catalog
/contact          → contact
```

**dynamic content:**

```
/writing/<slug>   → individual essay
/work/<slug>      → individual project
/startups/<slug>  → individual startup
/resources/<slug> → individual product
```

**slug policy:**

- human-readable: `building-markpoint` not `post-123`
- lowercase: `my-project` not `My-Project`
- hyphens: `word-word` not `word_word`
- no dates: `/writing/building-in-public` not `/writing/2024/01/...`
- stable: never change unless absolutely necessary (301 redirect if needed)

---

## content taxonomy

**writing** = long-form thinking
**projects** = things you built
**startups** = ventures you own
**resources** = products you sell

**decision tree:**

```
new content → do you sell access?
  yes → resource/product
  no → do you own and operate it?
    yes → startup
    no → did you build it?
      yes → project
      no → is it long-form thinking? → writing
```

---

## design principles

**typography:**

- headings: chalk font (hand-drawn, imperfect)
- body: apple sf (clean, readable)
- lowercase: always
- full stops: everywhere

**colors:**

- chalk white: primary text
- chalk charcoal: background (dark mode default)
- neon pink (#ff2d6a): urgency, delete, warnings
- neon cyan (#00e5ff): focus, calm action, links
- neon purple (#a855f7): creativity, ai, late-night
- neon green (#4ade80): success, validation

**objects:**

- desk lamp glow (warm vignette)
- mechanical pencil sketches
- coffee cup rings
- korean annotations (집중, 노력, 진실, 꿈)
- hand-drawn icons throughout
- chalk dust particles (subtle)

**tone:**

- factual, not motivational
- observational, not judgmental
- lowercase, full stops
- honest validation: "you earned this." not "great job!"

---

**last updated:** january 3, 2026
**status:** foundation complete. ready for implementation.
**vibe check:** employer-safe. calm. proof-focused. korean study room aesthetic.
