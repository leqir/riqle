# EPIC 4 — About / Narrative / Trajectory

**Epic ID:** 4
**Epic Name:** About / Narrative / Trajectory
**Status:** Ready for Implementation
**Dependencies:** Epic 0 (Infrastructure), Epic 1 (Information Architecture), Epic 2 (Design System)
**Total Stories:** 12

---

## Epic Overview

### Purpose
Explain Nathanael's non-linear path with clarity, maturity, and self-awareness — without apology, defensiveness, or over-storytelling.

**This page is not a biography.**
**It is a professional narrative alignment tool.**

### User Outcome
After reading this page, employers and collaborators can:
- Understand how you got here
- See why your path makes sense
- Know what you value
- Anticipate where you're heading next

### Core Question Answered
**"Is this person coherent — or are they all over the place?"**

The About page reduces concern about pivots rather than amplifying them.

---

## Architecture Decisions

### Page Structure
```
/about
```

### Component Hierarchy
```
AboutPage
├── CurrentContext (opening)
├── TrajectoryTimeline (phases with learnings)
├── CurrentFocus (what you're working on now)
└── OperatingPrinciples (optional, 3-5 principles)
```

### Content Model (Prisma Schema Addition)
```prisma
// This page uses static content, not database-driven
// Content lives in MDX or React components
```

### Routing
```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <AboutContent />;
}
```

### Design Constraints
- **Text-first layout** (no glassmorphism, no decorative cards)
- **Minimal visual interruption** (optional hand-drawn timeline graphic)
- **Reads well as plain text** (skimmable headings, short paragraphs)
- **Closer to an essay than a marketing page**

---

## Stories

### Story 4.1: Core Job-to-Be-Done (Why This Page Exists)

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story
As an **employer or potential collaborator**,
I want **to quickly understand if Nathanael's non-linear path is coherent or chaotic**,
So that **I can assess fit without uncertainty or follow-up questions**.

#### Acceptance Criteria
**Given** an employer reads the About page
**When** they finish reading
**Then** they can summarize my trajectory accurately in one sentence
**And** the page reduces concern about pivots rather than amplifying them
**And** they understand the implicit question: "Is this person coherent?"

#### Implementation Checklist
- [ ] Define page metadata and SEO
  ```typescript
  // app/about/page.tsx
  export const metadata: Metadata = {
    title: 'About | Nathanael',
    description: 'Student → Tutor → Builder → Founder. How I got here, what I learned, and where I\'m heading next.',
  };
  ```
- [ ] Create AboutPage component structure
- [ ] Implement primary job-to-be-done statement (internal comment or design doc)
- [ ] Document acceptance criteria for editorial review
- [ ] Create content validation checklist:
  - Can employers summarize trajectory in one sentence?
  - Does page reduce or amplify pivot concerns?
  - Is coherence evident?

#### Testing Requirements
- [ ] User testing with 3-5 potential employers or collaborators
- [ ] Ask: "Summarize this person's path in one sentence"
- [ ] Measure: Did they identify coherence or confusion?
- [ ] Validate: Does page answer "Is this person coherent?"

---

### Story 4.2: Narrative Stance (Tone Before Content)

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story
As a **reader**,
I want **the About page to feel calm, reflective, and grounded**,
So that **I trust the narrative without feeling manipulated or defensive**.

#### Acceptance Criteria
**Given** the page is read by an employer
**When** they assess tone and stance
**Then** the page reads like considered professional reflection, not a personal essay
**And** there is no emotional volatility in tone
**And** the stance is calm, reflective, grounded, and matter-of-fact
**And** the page explicitly avoids being inspirational, dramatic, defensive, or justificatory

#### Required Stance
✅ Calm
✅ Reflective
✅ Grounded
✅ Matter-of-fact

#### Explicitly NOT
❌ Inspirational
❌ Dramatic
❌ Defensive
❌ Justificatory

#### This is NOT
"Here's why my choices were right."

#### This IS
"Here's what happened, what I learned, and how it informs what I do now."

#### Implementation Checklist
- [ ] Create tone guide document for About page
  ```markdown
  # About Page Tone Guide

  ## Required Stance
  - Calm: No urgency, no emotional peaks
  - Reflective: Thoughtful, considered
  - Grounded: Concrete, specific
  - Matter-of-fact: Descriptive, not persuasive

  ## Banned Phrases
  - "I'm passionate about..."
  - "burnt out", "lost", "struggled"
  - "dream", "mission", "calling"
  - Any retrospective justification

  ## Good Examples
  - "Tutoring revealed X, which later shaped Y."
  - "Building Z exposed constraints I now design around."

  ## Bad Examples
  - "I was passionate about education and wanted to make a difference."
  - "After burning out, I pivoted to tech."
  ```
- [ ] Review all copy for tone violations
- [ ] Remove emotional language
- [ ] Remove justifications
- [ ] Ensure matter-of-fact delivery

#### Testing Requirements
- [ ] Editorial review: Does tone match stance requirements?
- [ ] External review: Ask 2-3 people: "What emotions did you feel reading this?"
- [ ] Expected responses: reassurance, respect, understanding, confidence
- [ ] Forbidden responses: pity, confusion, doubt, "why are they telling me this?"

---

### Story 4.3: Structural Outline (How the Story Is Told)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story
As a **content designer**,
I want **a clear structural outline for the About page**,
So that **the narrative is linear, scannable, and coherent without rambling**.

#### Acceptance Criteria
**Given** the About page is structured
**When** readers navigate through sections
**Then** each section has a clear purpose
**And** no section feels like filler
**And** the page is linear, scannable, and coherent

#### Recommended Structure
1. **Opening context** (who you are now)
2. **Trajectory timeline** (key phases)
3. **What each phase taught you**
4. **What you're focused on now**
5. **Principles you operate by** (brief, optional)

#### Implementation Checklist
- [ ] Create AboutPage component with section structure
  ```tsx
  // components/AboutPage.tsx
  export function AboutPage() {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {/* Section 1: Opening Context */}
        <section>
          <CurrentContext />
        </section>

        {/* Section 2: Trajectory Timeline */}
        <section>
          <TrajectoryTimeline />
        </section>

        {/* Section 3: Current Focus */}
        <section>
          <CurrentFocus />
        </section>

        {/* Section 4: Operating Principles (optional) */}
        <section>
          <OperatingPrinciples />
        </section>
      </div>
    );
  }
  ```
- [ ] Implement CurrentContext component
- [ ] Implement TrajectoryTimeline component
- [ ] Implement CurrentFocus component
- [ ] Implement OperatingPrinciples component (optional)
- [ ] Ensure each section has clear heading
- [ ] Review for filler content (remove anything without purpose)

#### Testing Requirements
- [ ] Skimming test: Can readers understand the arc from headings alone?
- [ ] Purpose test: Can you articulate why each section exists?
- [ ] Filler test: Remove each section one by one — does the page lose essential information?

---

### Story 4.4: Opening Section — "Where I Am Now"

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story
As a **reader**,
I want **to immediately know who Nathanael is NOW**,
So that **the narrative feels current and relevant, not nostalgic**.

#### Acceptance Criteria
**Given** a reader lands on the About page
**When** they read the opening section
**Then** they know "who you are now" before learning how you got here
**And** the page feels current, not nostalgic
**And** the section contains NO childhood backstory, NO credentials list, NO future promises

#### Content Requirements
- One short paragraph
- States:
  - What you currently do
  - What you're focused on
  - What kind of problems you work on

#### Rules
❌ No childhood backstory
❌ No credentials list
❌ No future promises

#### Implementation Checklist
- [ ] Create CurrentContext component
  ```tsx
  // components/about/CurrentContext.tsx
  export function CurrentContext() {
    return (
      <div className="space-y-4">
        <p className="text-body text-stone-700 leading-relaxed">
          I build products, teach systems thinking, and run MarkPoint—a startup
          focused on [brief description]. My work sits at the intersection of
          education, product development, and sustainable business models.
        </p>
        <p className="text-body text-stone-700 leading-relaxed">
          Right now, I'm focused on [current focus areas]—problems that require
          clarity, restraint, and evidence-based decision-making.
        </p>
      </div>
    );
  }
  ```
- [ ] Write opening paragraph (1-2 short paragraphs max)
- [ ] Review for:
  - Present tense only
  - No credentials
  - No childhood stories
  - No future promises
- [ ] Validate that readers know "who you are now"

#### Testing Requirements
- [ ] Comprehension test: Ask 3 readers "Who is this person?" after reading opening
- [ ] Recency test: Does the page feel current or nostalgic?
- [ ] Relevance test: Can readers immediately assess potential fit?

---

### Story 4.5: Trajectory Timeline (Non-Linear Path, Clearly Framed)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 5-6 hours

#### User Story
As an **employer**,
I want **to see Nathanael's pivots as intentional and coherent**,
So that **I trust his judgment rather than questioning his stability**.

#### Acceptance Criteria
**Given** an employer reads the trajectory timeline
**When** they review each phase
**Then** each phase logically leads to the next
**And** employers can see cause-and-effect, not randomness
**And** pivots feel intentional, not erratic

#### Phases to Include
1. **Student** (timeframe, what you were doing, problem exposed to, learning)
2. **Tutor** (timeframe, what you were doing, problem exposed to, learning)
3. **Builder** (timeframe, what you were doing, problem exposed to, learning)
4. **Founder** (timeframe, what you were doing, problem exposed to, learning)

#### Each Phase Must Include
- Timeframe (approximate, not exact dates)
- What you were doing
- What problem you were exposed to
- What you learned or noticed

#### Rules
✅ Focus on learning, not status
❌ Avoid emotional language ("burnt out", "lost", etc.)
❌ Avoid retrospective justification

#### Implementation Checklist
- [ ] Create TrajectoryTimeline component
  ```tsx
  // components/about/TrajectoryTimeline.tsx
  type Phase = {
    id: string;
    title: string;
    timeframe: string;
    description: string;
    problemExposed: string;
    learning: string;
  };

  const phases: Phase[] = [
    {
      id: 'student',
      title: 'Student',
      timeframe: '2015–2019',
      description: 'Studying [subject] at [institution]',
      problemExposed: 'Noticed that [specific problem]',
      learning: 'This revealed [specific insight]',
    },
    {
      id: 'tutor',
      title: 'Tutor',
      timeframe: '2018–2022',
      description: 'Taught 500+ students to Band 6 in HSC English',
      problemExposed: 'Saw how [specific educational problem]',
      learning: 'Learned that [specific teaching insight]',
    },
    {
      id: 'builder',
      title: 'Builder',
      timeframe: '2020–2023',
      description: 'Built [products/tools] to solve [problems]',
      problemExposed: 'Encountered [technical constraints]',
      learning: 'Discovered that [product insight]',
    },
    {
      id: 'founder',
      title: 'Founder',
      timeframe: '2023–present',
      description: 'Founded MarkPoint to [mission]',
      problemExposed: 'Working on [current challenges]',
      learning: 'Currently learning [ongoing insights]',
    },
  ];

  export function TrajectoryTimeline() {
    return (
      <div className="space-y-12">
        <h2 className="text-h2 font-semibold text-stone-900">
          How I got here
        </h2>

        <div className="space-y-10">
          {phases.map((phase, index) => (
            <div key={phase.id} className="space-y-3">
              {/* Phase Title & Timeframe */}
              <div className="flex items-baseline gap-3">
                <h3 className="text-h3 font-semibold text-stone-900">
                  {phase.title}
                </h3>
                <span className="text-meta text-stone-500">
                  {phase.timeframe}
                </span>
              </div>

              {/* What I was doing */}
              <p className="text-body text-stone-700">
                {phase.description}
              </p>

              {/* Problem exposed to */}
              <p className="text-body text-stone-600">
                {phase.problemExposed}
              </p>

              {/* What I learned */}
              <p className="text-body text-stone-800 font-medium">
                {phase.learning}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  ```
- [ ] Write content for each phase (Student, Tutor, Builder, Founder)
- [ ] Review each phase for:
  - Cause-and-effect clarity
  - Learning focus (not status)
  - No emotional language
  - No retrospective justification
- [ ] Ensure phases connect logically
- [ ] Optional: Add subtle hand-drawn timeline graphic

#### Testing Requirements
- [ ] Coherence test: Ask 3 employers "Does this path make sense?"
- [ ] Intentionality test: Do pivots feel data-driven or impulsive?
- [ ] Learning test: Can readers identify what each phase taught you?

---

### Story 4.6: Lessons Learned (Credibility Core)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 4-5 hours

#### User Story
As an **employer evaluating judgment**,
I want **to see concrete insights from each phase**,
So that **I can infer how Nathanael thinks under uncertainty**.

#### Acceptance Criteria
**Given** each phase in the trajectory timeline
**When** lessons are articulated
**Then** insights are specific and earned, not generic
**And** employers can infer how you think under uncertainty
**And** each lesson connects to current work

#### For Each Phase, Articulate
1. One or two concrete insights
2. How that insight informs your current work

#### Example Framing (Conceptual)
- "Tutoring taught me X, which later shaped how I approached Y."
- "Building Z revealed constraints that I now design around."

#### Rules
✅ Insights must be specific
❌ Avoid platitudes ("learned a lot", "grew as a person")

#### Implementation Checklist
- [ ] For each phase, identify 1-2 concrete lessons
- [ ] Ensure lessons are specific and observable
- [ ] Connect each lesson to current work
- [ ] Review examples:
  ```markdown
  # Good Examples
  - "Tutoring 500+ students taught me that clarity beats cleverness—most comprehension failures come from unnecessary complexity, not lack of intelligence. This now shapes how I write documentation and design UX."

  - "Building MarkPoint revealed that users don't adopt tools because they're powerful—they adopt tools that reduce friction in an existing workflow. I now design for adoption first, features second."

  # Bad Examples (too generic)
  - "I learned a lot about teamwork and perseverance."
  - "This experience helped me grow as a person."
  ```
- [ ] Embed lessons in TrajectoryTimeline component (already included in phase.learning)
- [ ] Review for specificity and connection to present

#### Testing Requirements
- [ ] Specificity test: Are lessons concrete or generic?
- [ ] Inference test: Can employers deduce how you think?
- [ ] Relevance test: Do lessons connect to current work?

---

### Story 4.7: Handling Sensitive Pivots (Neutralize Skepticism)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story
As an **employer concerned about career stability**,
I want **pivots explained plainly without drama or defensiveness**,
So that **I see adaptability, not instability**.

#### Acceptance Criteria
**Given** a reader encounters a career pivot
**When** they read the explanation
**Then** pivots feel like data-driven decisions
**And** no emotional residue is left for the reader to manage
**And** the page conveys: "I can evaluate, adjust, and move forward without drama"

#### Strategy
1. State the change plainly
2. Explain what it revealed
3. Move forward

#### Explicit Bans
❌ Over-explaining
❌ Defensiveness
❌ Framing decisions as "mistakes"

#### Implementation Checklist
- [ ] Identify sensitive pivots in trajectory (e.g., leaving tutoring, starting MarkPoint)
- [ ] For each pivot, write:
  - Plain statement of change
  - What it revealed
  - Forward-looking insight
- [ ] Example framing:
  ```markdown
  # Good Pivot Framing
  "After teaching 500+ students, I noticed that the tools available for [problem]
  were inadequate. Building MarkPoint was a response to that gap."

  # Bad Pivot Framing (over-explaining)
  "I loved teaching, but after years of burnout and frustration with the system,
  I realized I needed to make a change. It was a difficult decision, but ultimately
  I knew I could have more impact by building tools instead of staying in the classroom."
  ```
- [ ] Review all pivots for:
  - Plain language (no drama)
  - Data-driven framing
  - No defensiveness
  - No emotional residue

#### Testing Requirements
- [ ] Skepticism test: Do pivots raise or reduce concern?
- [ ] Emotional residue test: After reading, do employers feel they need to ask probing questions?
- [ ] Adaptability test: Do pivots signal flexibility or instability?

---

### Story 4.8: "What I'm Focused On Now" (Directional Clarity)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story
As an **employer assessing fit**,
I want **to know what Nathanael is focused on NOW**,
So that **I can quickly assess alignment without guessing intent**.

#### Acceptance Criteria
**Given** an employer reads the "Current Focus" section
**When** they finish reading
**Then** they can assess alignment quickly
**And** the section feels practical, not aspirational
**And** there are NO grand mission statements or vague ambitions

#### Content Requirements
- 1–2 short paragraphs
- Covers:
  - Current interests
  - Types of problems you're working on
  - Areas you want to deepen

#### Rules
❌ No grand mission statements
❌ No vague ambition
✅ Keep it concrete and bounded

#### Implementation Checklist
- [ ] Create CurrentFocus component
  ```tsx
  // components/about/CurrentFocus.tsx
  export function CurrentFocus() {
    return (
      <div className="space-y-4">
        <h2 className="text-h2 font-semibold text-stone-900">
          What I'm focused on now
        </h2>

        <p className="text-body text-stone-700 leading-relaxed">
          Right now, I'm working on [specific problem 1] and [specific problem 2].
          These problems require [specific skill/approach], which aligns with my
          experience in [relevant phase].
        </p>

        <p className="text-body text-stone-700 leading-relaxed">
          I'm particularly interested in deepening my understanding of [specific area],
          especially as it relates to [concrete application]. This work informs how
          I approach [current project/company].
        </p>
      </div>
    );
  }
  ```
- [ ] Write 1-2 paragraphs covering:
  - Current work (concrete)
  - Problem types
  - Areas to deepen
- [ ] Review for:
  - Concreteness (no vague language)
  - Practicality (not aspirational)
  - Boundedness (specific, not infinite)
- [ ] Remove any mission statements or grand ambitions

#### Testing Requirements
- [ ] Alignment test: Can employers quickly assess fit?
- [ ] Concreteness test: Are focus areas specific or vague?
- [ ] Practicality test: Does section feel grounded or aspirational?

---

### Story 4.9: Principles & Values (Optional but Powerful)

**Priority:** Medium
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story
As an **employer evaluating culture fit**,
I want **to see how Nathanael makes decisions**,
So that **I can assess alignment without abstract virtues**.

#### Acceptance Criteria
**Given** the principles section exists
**When** employers read it
**Then** principles feel lived-in, not aspirational
**And** they align with how the site itself behaves
**And** each principle is observable in your work

#### Scope
- 3–5 principles max
- Short, declarative statements
- Each principle should be observable in your work

#### Examples of Acceptable Principles
✅ "Clarity over cleverness"
✅ "Build before you scale"
✅ "Evidence before persuasion"

#### Rules
❌ No moralizing
❌ No abstract virtues ("integrity", "excellence")
❌ No long explanations

#### Implementation Checklist
- [ ] Create OperatingPrinciples component
  ```tsx
  // components/about/OperatingPrinciples.tsx
  const principles = [
    'Clarity over cleverness',
    'Build before you scale',
    'Evidence before persuasion',
    'Boring is often better',
    'Respect user attention',
  ];

  export function OperatingPrinciples() {
    return (
      <div className="space-y-4">
        <h2 className="text-h2 font-semibold text-stone-900">
          How I work
        </h2>

        <ul className="space-y-2">
          {principles.map((principle, index) => (
            <li key={index} className="text-body text-stone-700">
              {principle}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  ```
- [ ] Identify 3-5 operating principles
- [ ] Ensure each is:
  - Observable in your work
  - Short and declarative
  - NOT abstract or moralistic
- [ ] Review examples from product brief and UX design for alignment
- [ ] Optional: Make this section collapsible or easily skippable

#### Testing Requirements
- [ ] Observability test: Can each principle be seen in your work?
- [ ] Alignment test: Do principles match site behavior?
- [ ] Brevity test: Are principles short and clear?

---

### Story 4.10: Visual Treatment Rules (About Page Specific)

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story
As a **reader**,
I want **the About page to be readable and serious**,
So that **nothing visually competes with the text**.

#### Acceptance Criteria
**Given** the About page is designed
**When** users read it
**Then** the page feels closer to an essay than a marketing page
**And** nothing visually competes with the text
**And** the page reads well as plain text

#### Requirements
✅ Text-first layout
✅ Minimal visual interruption
✅ Optional hand-drawn timeline graphic (subtle, single use)

#### Rules
❌ No glassmorphism
❌ No cards for narrative content
❌ Visuals must support understanding, not mood

#### Implementation Checklist
- [ ] Create text-first layout for About page
  ```tsx
  // app/about/page.tsx
  export default function AboutPage() {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Text-first, minimal visual treatment */}
          <AboutContent />
        </div>
      </div>
    );
  }
  ```
- [ ] Remove any glassmorphism effects
- [ ] Remove decorative cards
- [ ] Ensure typography is clear and readable
- [ ] Optional: Add subtle hand-drawn timeline graphic
  ```tsx
  // components/about/TimelineGraphic.tsx (optional)
  export function TimelineGraphic() {
    return (
      <svg className="w-full h-24 opacity-30" viewBox="0 0 800 100">
        {/* Simple hand-drawn line connecting phases */}
        <path
          d="M 0,50 Q 200,20 400,50 T 800,50"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-stone-300"
        />
      </svg>
    );
  }
  ```
- [ ] Test readability without any visual styling
- [ ] Ensure visuals support understanding, not mood

#### Testing Requirements
- [ ] Plain text test: Does page read well with CSS disabled?
- [ ] Visual competition test: Do any visuals distract from text?
- [ ] Essay test: Does page feel more like an essay or marketing page?

---

### Story 4.11: Skimmability & Scan Patterns

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story
As an **employer with limited time**,
I want **to skim the About page and still understand the arc**,
So that **I can decide whether to read deeply or move on**.

#### Acceptance Criteria
**Given** an employer skims the page
**When** they read only headings and emphasized text
**Then** they still understand the arc
**And** deep readers are rewarded with nuance
**And** there are no walls of text or excessive emphasis

#### Techniques
✅ Clear section headings
✅ Short paragraphs
✅ Occasional emphasis (bold or italics, sparingly)

#### Rules
❌ Avoid walls of text
❌ Avoid excessive emphasis

#### Implementation Checklist
- [ ] Add clear section headings
  ```tsx
  <h2 className="text-h2 font-semibold text-stone-900 mb-4">
    How I got here
  </h2>
  ```
- [ ] Break long paragraphs into 2-3 sentence chunks
- [ ] Add occasional emphasis (bold or italics)
  ```tsx
  <p className="text-body text-stone-700">
    Tutoring taught me that <strong>clarity beats cleverness</strong>—most
    comprehension failures come from unnecessary complexity, not lack of intelligence.
  </p>
  ```
- [ ] Review for:
  - No paragraphs longer than 4-5 sentences
  - Clear visual hierarchy
  - Scannable headings
- [ ] Test with "skim only headings" approach

#### Testing Requirements
- [ ] Skim test: Can readers understand the arc from headings alone?
- [ ] Depth test: Do deep readers find nuance and detail?
- [ ] Wall of text test: Are there any overwhelming text blocks?

---

### Story 4.12: Emotional Validation Checks (About Page)

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story
As a **quality control mechanism**,
I want **to validate that the About page produces the right emotional outcome**,
So that **employers feel reassurance and confidence, not pity or doubt**.

#### Acceptance Criteria
**Given** the About page is complete
**When** employers read it
**Then** they feel reassurance, respect, understanding, and confidence in judgment
**And** they do NOT feel pity, confusion, doubt, or "why are they telling me this?"
**And** you would feel comfortable discussing this page in an interview
**And** the page does not invite probing questions about your choices

#### Desired Emotions
✅ Reassurance
✅ Respect
✅ Understanding
✅ Confidence in judgment

#### Anti-Emotions
❌ Pity
❌ Confusion
❌ Doubt
❌ "Why are they telling me this?"

#### Implementation Checklist
- [ ] Create emotional validation checklist
  ```markdown
  # About Page Emotional Validation Checklist

  ## Pre-launch Review
  - [ ] Would I feel comfortable discussing this page in an interview?
  - [ ] Does the page invite probing questions about my choices? (Should be NO)
  - [ ] Does any section trigger pity, confusion, or doubt?
  - [ ] Does the page produce reassurance and confidence?

  ## External Validation (3-5 test readers)
  - [ ] Ask: "What emotions did you feel reading this?"
  - [ ] Expected: reassurance, respect, understanding, confidence
  - [ ] Red flags: pity, confusion, doubt, "why is he telling me this?"

  ## Interview Simulation
  - [ ] Read page aloud to yourself
  - [ ] Would you say this in an interview?
  - [ ] Does anything feel defensive or over-explained?
  ```
- [ ] Conduct pre-launch review
- [ ] Run external validation with 3-5 test readers
- [ ] Simulate interview scenario
- [ ] Remove any content that triggers anti-emotions

#### Testing Requirements
- [ ] Emotional response test: Ask 3-5 readers "What emotions did you feel?"
- [ ] Interview test: Would you say this content in an interview?
- [ ] Probing questions test: Does page invite follow-up questions about choices?
- [ ] Comfort test: Do you feel comfortable sharing this page with employers?

---

## Epic Completion Criteria

Epic 4 is considered complete when:

### Content & Structure
- [ ] All 12 stories implemented and tested
- [ ] About page answers: "Is this person coherent?"
- [ ] Trajectory is explained without defensiveness or over-storytelling
- [ ] Current focus is clear and concrete
- [ ] Principles are observable and lived-in

### Tone & Emotional Validation
- [ ] Page feels calm, reflective, grounded, and matter-of-fact
- [ ] No emotional volatility or defensiveness
- [ ] Employers feel reassurance, not pity or doubt
- [ ] Page does not invite probing questions about choices

### Visual & Readability
- [ ] Text-first layout (no glassmorphism, no decorative cards)
- [ ] Skimmable headings and short paragraphs
- [ ] Page reads well as plain text
- [ ] Feels like an essay, not a marketing page

### User Validation
- [ ] 3-5 employers can summarize trajectory in one sentence
- [ ] Pivots feel intentional, not erratic
- [ ] Lessons learned are specific and credible
- [ ] Interview simulation passes (comfortable discussing content)

---

## EPIC 4 Deliverables

By the end of EPIC 4, you have:

1. **A coherent narrative of your trajectory**
   Student → Tutor → Builder → Founder

2. **A calm explanation of non-linear decisions**
   Pivots framed as data-driven, not defensive

3. **A clear articulation of what you're focused on now**
   Concrete, practical, bounded

4. **A page that reduces employer doubt rather than creating it**
   Answers "Is this person coherent?" with clarity and confidence

---

## Why EPIC 4 Matters

### Without this epic
- Employers fill in gaps themselves
- Non-linear paths raise unnecessary concern
- You spend interviews explaining context

### With this epic
- Your story explains itself — quietly and convincingly
- Pivots signal adaptability, not instability
- Employers assess fit quickly and confidently

---

**Epic Status:** Ready for Implementation
**Next Epic:** Epic 5 — Work & Portfolio (Proof of Execution)
