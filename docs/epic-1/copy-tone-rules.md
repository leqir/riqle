# copy system & tone rules: factual, lowercase, honest validation

> **principle:** write like you're explaining to a colleague, not selling to a customer
> **rule:** lowercase everything, full stops, factual tone — no motivational speak

**last updated:** january 3, 2026
**status:** complete
**story:** 1.9 - establish copy system and tone rules

---

## core philosophy

**the problem:**

most portfolios sound desperate ("hire me!"), fake-motivational ("crushing it!"), or corporate-bland ("leveraged synergies"). employers sense inauthenticity immediately. they want to know: can you do the work? are you honest about trade-offs? do you understand nuance?

**the solution:**

write like you're writing internal documentation. factual observations, not sales pitches. lowercase for calm energy. honest validation instead of empty praise. korean study room aesthetic = focus, effort, truth.

**the anti-pattern:**

- ❌ "i'm a passionate full-stack developer who loves building amazing products!"
- ❌ "crushing it with cutting-edge AI solutions!"
- ❌ "let's collaborate on your next big idea!"

**the pattern:**

- ✅ "i build data-heavy tools for technical users."
- ✅ "worked on context-aware writing systems. some patterns transferred to portfolio design."
- ✅ "this took 3 months. tradeoff: depth over polish."

**user feeling:**

"this person tells the truth. they understand trade-offs. they don't oversell. i trust them."

---

## voice & tone principles

### 1. lowercase default

**rule:** all headings, body text, buttons, CTAs = lowercase. proper nouns only.

**why:** lowercase creates calm, approachable energy. uppercase feels urgent or corporate. korean study room = quiet focus, not shouting.

**examples:**

```
✅ good:
- "riqle: employer-first portfolios"
- "about nathanael"
- "send message"
- "featured work"

❌ bad:
- "RIQLE: Employer-First Portfolios"
- "About Nathanael"
- "Send Message"
- "Featured Work"
```

**exceptions:**

- proper nouns: "React", "Next.js", "Anthropic", "Claude"
- acronyms: "AI", "API", "UI", "UX"
- brand names: "GitHub", "OpenAI", "PostgreSQL"

**all other text:** lowercase, including "i" (first-person singular)

---

### 2. factual, not motivational

**rule:** state observations and outcomes. avoid hyperbole, superlatives, marketing speak.

**why:** employers want proof, not promises. factual language signals competence and honesty.

**comparison:**

| motivational (❌)                   | factual (✅)                                 |
| ----------------------------------- | -------------------------------------------- |
| "passionate about AI"               | "worked on AI systems for 3 years"           |
| "amazing user experience"           | "reduced clicks from 12 to 3"                |
| "crushing it with innovation"       | "shipped 4 products in 2024"                 |
| "let's build something incredible!" | "available for contract work starting march" |
| "game-changing solution"            | "reduced query time from 2s to 200ms"        |
| "i love solving complex problems"   | "debugged distributed systems for 5 years"   |

**pattern:** quantify when possible, qualify when not. never inflate.

---

### 3. honest validation (not empty praise)

**rule:** when acknowledging user actions, state facts. avoid enthusiastic cheerleading.

**why:** korean study room aesthetic = "you earned this" not "you're amazing!"

**comparison:**

| empty praise (❌)           | honest validation (✅)               |
| --------------------------- | ------------------------------------ |
| "great job!"                | "task complete."                     |
| "you're doing amazing!"     | "you finished 3 essays this week."   |
| "keep up the awesome work!" | "steady progress. 12 days in a row." |
| "you're a rockstar!"        | "you hit the goal. well done."       |
| "fantastic!"                | "published."                         |

**pattern:** state the outcome, acknowledge the effort. no artificial enthusiasm.

---

### 4. observational, not judgmental

**rule:** describe what happened. don't prescribe what should happen (unless in error messages).

**why:** judgmental language creates guilt/pressure. observational language creates awareness.

**comparison:**

| judgmental (❌)                         | observational (✅)                    |
| --------------------------------------- | ------------------------------------- |
| "you should write more essays"          | "you wrote 2 essays this month"       |
| "you need to update your portfolio"     | "portfolio last updated 3 months ago" |
| "don't forget to proofread!"            | "5 typos found"                       |
| "make sure you link projects to essays" | "essay has no related projects"       |

**exception:** errors and warnings can be prescriptive:

- ✅ "url must be unique"
- ✅ "title required"
- ✅ "publish failed: missing excerpt"

---

### 5. full stops, not exclamation marks

**rule:** end sentences with full stops (periods). avoid exclamation marks except for warnings.

**why:** exclamation marks create artificial urgency. full stops create calm confidence.

**examples:**

```
✅ good:
- "message sent."
- "profile updated."
- "you earned this."

❌ bad:
- "Message sent!"
- "Profile updated!"
- "You earned this!"
```

**exception:** warnings and critical errors can use exclamation marks sparingly:

- ⚠️ "data will be permanently deleted!"
- ❌ "publish failed!"

**rule of thumb:** if it's good news or neutral info, use a full stop. if it's a warning, you can use an exclamation mark.

---

## writing patterns by content type

### homepage copy

**goal:** state identity, position, proof — no selling, no hype

**pattern:**

```markdown
# [name]

[positioning: one line, factual]

proof:

- [quantified outcome 1]
- [quantified outcome 2]
- [quantified outcome 3]

[cta: factual, lowercase]
```

**example:**

```markdown
# nathanael

i build data-heavy tools for technical users.

proof:

- shipped context-aware writing system (10x token windows)
- designed employer-first portfolio platform (45s comprehension)
- consulted on ai product strategy (3 companies, 2024)

see work → | read writing → | contact →
```

**banned phrases:**

- ❌ "welcome to my portfolio!"
- ❌ "passionate software engineer"
- ❌ "let's build something amazing together"
- ❌ "hire me for your next project"

---

### about page copy

**goal:** background, expertise, current status — resume-adjacent, not bio-fluff

**pattern:**

```markdown
# about [name]

[2-3 sentences: who you are, what you do, how long]

## background

[chronological: education, key roles, transitions]

## expertise

[specific skills, domains, tech — no "proficient in" language]

## current status

[what you're doing now, availability, next steps]
```

**example:**

```markdown
# about nathanael

i've been building software for 8 years. started in backend systems, moved to product engineering, now focused on ai-native tools.

## background

graduated mit (2016, computer science). worked at stripe (payments infrastructure), then carta (equity management). left to build markpoint (2023).

## expertise

distributed systems, data-heavy uis, context-aware tools. react, typescript, python. postgres, redis. comfortable with llms, embeddings, vector search.

## current status

building riqle (portfolio platform). consulting on ai product strategy. available for select contract work starting march 2026.
```

**tone:**

- factual chronology (no storytelling arcs)
- specific experience (no vague claims)
- current availability (no "always open to opportunities")

---

### project descriptions

**goal:** outcome, tech, role, tradeoffs — technical depth, not marketing

**pattern:**

```markdown
# [project name]

[one-line description: what it does, who it's for]

**outcome:** [quantified result or user capability]
**tech:** [specific stack, no buzzwords]
**role:** [your contribution, timeframe]
**tradeoff:** [what you sacrificed for speed/depth/scope]

[2-3 paragraphs: context, approach, key decisions]

[related essays or startups, if any]
```

**example:**

```markdown
# markpoint

context-aware writing tool for technical documentation.

**outcome:** writers handle 10x context windows (200k tokens) without losing track
**tech:** next.js, typescript, claude api, postgres, redis
**role:** solo founder, full-stack, 6 months (q2-q3 2024)
**tradeoff:** depth over polish — advanced features work, ui needs refinement

started as an experiment: can ai handle technical writing if it has full project context? answer: yes, but only with careful prompt engineering and memory management.

built custom context window that chunks documents semantically. used embeddings for retrieval, but fallback to chronological for edge cases. redis caching reduced api costs by 70%.

key insight: writers don't want ai to write for them — they want ai to remember what they wrote 3 weeks ago.

related: [essay: building for 10x context windows]
```

**banned phrases:**

- ❌ "cutting-edge solution"
- ❌ "innovative approach"
- ❌ "game-changing product"
- ❌ "seamless user experience"

---

### essay copy (writing index + detail)

**goal:** clear thesis, supporting argument, actionable insight — technical depth

**pattern:**

```markdown
# [essay title: descriptive, not clickbait]

[excerpt: 1-2 sentences stating thesis]

[body: paragraphs with clear structure]

**takeaway:** [1 sentence: what reader should remember]

[related projects, if any]
```

**example:**

```markdown
# progressive disclosure: why portfolios fail employers

most portfolios overwhelm in the first 3 seconds. employers close the tab. not because the work is bad — because they can't find proof fast enough.

## the problem

average employer attention span: 30-45 seconds. average portfolio: 50+ items on homepage, no clear hierarchy, unclear positioning. result: cognitive overload, tab closed.

## the solution

progressive disclosure. scroll 1: clarity (who are you, what do you do). scroll 2: proof (1-2 best projects). scroll 3+: texture (archive, process, etc).

## implementation

homepage shows ≤ 10 items above fold. featured work limited to 1-2 projects. everything else hidden until scroll 2 or click-through.

tested with 12 hiring managers. average comprehension time dropped from 2+ minutes to 35 seconds.

**takeaway:** show less, communicate more. employers want speed, not completeness.

related: [project: riqle] [project: markpoint]
```

**tone:**

- clear thesis (no meandering)
- specific examples (no vague generalizations)
- actionable insights (no philosophy for philosophy's sake)

---

## microcopy patterns

### buttons & ctas

**rule:** verb + noun, lowercase, no urgency

**examples:**

```
✅ good:
- "see work"
- "read writing"
- "send message"
- "view project"
- "download resume"

❌ bad:
- "See Work!"
- "Read My Writing"
- "Contact Me Now"
- "Check Out This Project"
- "Get Resume"
```

**pattern:** `[action] [object]` — simple, direct, factual

---

### form labels & placeholders

**rule:** clear, specific, helpful — no cleverness

**examples:**

```
✅ good labels:
- "your email"
- "message (optional)"
- "preferred contact method"

❌ bad labels:
- "drop us a line!"
- "what's on your mind?"
- "your deets"

✅ good placeholders:
- "name@company.com"
- "describe your project in 2-3 sentences"
- "phone or slack"

❌ bad placeholders:
- "enter email here"
- "tell us everything!"
- "we'd love to hear from you"
```

**pattern:** label = what field is. placeholder = example or format hint.

---

### success messages

**rule:** state outcome, acknowledge action — no celebration

**examples:**

```
✅ good:
- "message sent."
- "profile updated."
- "draft saved."
- "essay published."

❌ bad:
- "Woohoo! Message sent!"
- "Great! Profile updated!"
- "Success! Draft saved!"
- "Congrats! Essay published!"
```

**pattern:** `[noun] [verb (past tense)].` — factual confirmation, full stop.

---

### error messages

**rule:** what went wrong, how to fix — no blame, no apology

**examples:**

```
✅ good:
- "email required."
- "url must be unique. try: /work/[project-name]-v2"
- "publish failed: excerpt missing."
- "image too large (max 5mb). compress or crop."

❌ bad:
- "Oops! Something went wrong."
- "Sorry, we couldn't process your request."
- "Error 500: Internal Server Error"
- "Please enter a valid email address!"
```

**pattern:** `[problem]. [solution (if available)].` — diagnostic, not apologetic.

---

### loading states

**rule:** what's happening now, no false promises

**examples:**

```
✅ good:
- "loading projects..."
- "uploading image..."
- "publishing essay..."
- "generating slug..."

❌ bad:
- "hang tight!"
- "working our magic..."
- "almost there!"
- "just a sec..."
```

**pattern:** `[action (present continuous)]...` — factual, present tense.

---

## korean aesthetic integration in copy

### korean annotations (visual only, not translated)

**use sparingly:** accent headings or key sections with korean words

**common annotations:**

- 집중 (jipjung) = focus
- 노력 (noryeok) = effort
- 진실 (jinsil) = truth
- 꿈 (kkum) = dream
- 증명 (jeungmyeong) = proof
- 시작 (sijak) = beginning
- 연결 (yeon-gyeol) = connection
- 완성 (wanseong) = completion

**usage:**

```tsx
<section className="relative">
  <span className="font-chalk text-neon-purple absolute -left-8 -top-4 rotate-[-5deg] text-sm opacity-40">
    증명 {/* proof */}
  </span>
  <h2>featured work</h2>
  {/* content */}
</section>
```

**key rule:** korean is decorative annotation, not content. never replace english with korean.

---

### chalk handwriting for emphasis

**use for:**

- section headings
- key stats (proof anchors)
- CTAs (sparingly)

**avoid for:**

- body text (hard to read)
- long sentences
- critical information (accessibility)

**example:**

```tsx
<h1 className="font-chalk text-4xl text-chalk-charcoal">nathanael</h1>
<p className="font-body text-base text-chalk-charcoal/80">
  i build data-heavy tools for technical users.
</p>
```

**pattern:** chalk for headings/emphasis, clean sans-serif for body.

---

## copy checklist (before publish)

### [ ] tone audit

- [ ] no exclamation marks (except warnings)
- [ ] all lowercase (except proper nouns)
- [ ] no motivational language ("passionate", "amazing", "crushing it")
- [ ] no sales language ("innovative", "cutting-edge", "game-changing")
- [ ] factual observations, not promises

### [ ] clarity audit

- [ ] one idea per sentence
- [ ] no jargon without definition
- [ ] specific examples (not vague claims)
- [ ] quantified when possible

### [ ] brevity audit

- [ ] remove filler words ("really", "very", "just", "actually")
- [ ] cut redundant phrases
- [ ] aim for ≤ 20 words per sentence

### [ ] consistency audit

- [ ] "riqle" (lowercase, always)
- [ ] "i" (lowercase, first person)
- [ ] brand names capitalized correctly ("GitHub" not "github")
- [ ] consistent verb tense within sections

---

## banned words & phrases

### ❌ motivational speak

- passionate
- love (as in "i love building products")
- amazing / awesome / incredible
- crushing it
- rockstar / ninja / guru
- game-changer / game-changing
- innovative / innovation (unless specific)
- cutting-edge
- next-level
- world-class

### ❌ sales language

- leverage / leveraging
- synergy
- solutions (vague usage)
- deliver value
- seamless
- robust
- enterprise-grade (unless literally enterprise)
- best-in-class
- industry-leading

### ❌ vague claims

- experienced developer (how many years?)
- skilled in many technologies (which ones?)
- proven track record (what outcomes?)
- strong communicator (evidence?)
- detail-oriented (example?)

### ❌ filler words

- really
- very
- just
- actually
- basically
- literally (unless literally)
- simply
- easily

**rule:** if you can remove the word without changing meaning, remove it.

---

## replacement patterns

### instead of vague claims, use specifics:

| vague (❌)              | specific (✅)                                             |
| ----------------------- | --------------------------------------------------------- |
| "experienced developer" | "8 years building web apps"                               |
| "skilled in react"      | "shipped 12 react apps (2020-2024)"                       |
| "strong communicator"   | "wrote 40+ technical docs, presented to C-suite 15 times" |
| "detail-oriented"       | "caught 200+ edge cases in code review"                   |
| "fast learner"          | "learned rust in 3 weeks, shipped production code in 6"   |

### instead of sales language, use outcomes:

| sales (❌)              | outcome (✅)                                 |
| ----------------------- | -------------------------------------------- |
| "innovative solution"   | "reduced query time from 2s to 200ms"        |
| "seamless integration"  | "zero downtime during migration"             |
| "robust architecture"   | "handled 10k requests/sec, 99.9% uptime"     |
| "game-changing product" | "saved users 5 hours/week on average"        |
| "cutting-edge AI"       | "fine-tuned gpt-4 for domain-specific tasks" |

---

## voice examples by context

### 1. homepage hero (30 words max)

```
# nathanael

i build data-heavy tools for technical users.

proof:
- 10x context windows (markpoint)
- 45s employer comprehension (riqle)
- 3 ai strategy clients (2024)
```

**tone:** direct, quantified, no fluff.

---

### 2. project outcome (15 words max)

```
**outcome:** reduced context switching from 40 clicks to 3 clicks
```

**tone:** quantified result, user benefit.

---

### 3. about intro (50 words max)

```
i've been building software for 8 years. started in distributed systems (stripe, carta), moved to product engineering, now focused on ai-native tools. based in san francisco. available for select contract work starting march 2026.
```

**tone:** chronological, factual, current status.

---

### 4. essay thesis (25 words max)

```
progressive disclosure solves the portfolio paradox: employers need speed, but depth requires content. solution: calm first, proof second, texture third.
```

**tone:** clear problem/solution, actionable.

---

### 5. cta (5 words max)

```
see work →
send message →
download resume →
```

**tone:** action + object, no urgency.

---

### 6. success message (5 words max)

```
message sent.
profile updated.
essay published.
```

**tone:** past tense confirmation, full stop.

---

### 7. error message (15 words max)

```
url must be unique. try: /work/project-name-v2
```

**tone:** diagnostic + solution (if available).

---

## accessibility considerations

### 1. link text must be descriptive

```
✅ good:
- "read technical breakdown"
- "view markpoint project"
- "download resume (pdf, 120kb)"

❌ bad:
- "click here"
- "read more"
- "link"
```

**why:** screen readers read link text out of context. "click here" is meaningless.

---

### 2. headings must be hierarchical

```
✅ good:
<h1>about nathanael</h1>
  <h2>background</h2>
  <h2>expertise</h2>
    <h3>frontend</h3>
    <h3>backend</h3>

❌ bad:
<h1>about nathanael</h1>
  <h3>background</h3>
  <h2>expertise</h2>
    <h4>frontend</h4>
```

**why:** screen readers use heading hierarchy for navigation.

---

### 3. alt text must be descriptive (not decorative)

```
✅ good:
<img src="chart.png" alt="bar chart showing 10x improvement in context window size" />

❌ bad:
<img src="chart.png" alt="chart" />
<img src="decoration.png" alt="decoration" />  // use aria-hidden instead
```

**why:** screen readers read alt text. decorative images should be hidden.

---

### 4. form errors must be programmatically associated

```
✅ good:
<label htmlFor="email">your email</label>
<input id="email" aria-describedby="email-error" />
<span id="email-error" role="alert">email required.</span>

❌ bad:
<label>your email</label>
<input />
<span className="error">email required.</span>
```

**why:** screen readers need programmatic association to announce errors.

---

## implementation examples

### homepage hero component

```tsx
// components/organisms/HomepageHero.tsx

export function HomepageHero() {
  return (
    <section className="py-xl">
      <h1 className="font-chalk text-chalk-charcoal mb-md text-4xl">nathanael</h1>

      <p className="text-chalk-charcoal/80 mb-lg text-lg">
        i build data-heavy tools for technical users.
      </p>

      <div className="mb-xl">
        <h2 className="text-chalk-charcoal/60 mb-sm text-sm">proof:</h2>
        <ul className="space-y-xs text-chalk-charcoal list-inside list-disc">
          <li>10x context windows (markpoint)</li>
          <li>45s employer comprehension (riqle)</li>
          <li>3 ai strategy clients (2024)</li>
        </ul>
      </div>

      <div className="gap-md flex">
        <a
          href="/work"
          className="text-neon-cyan hover:text-neon-pink underline underline-offset-4"
        >
          see work →
        </a>
        <a
          href="/writing"
          className="text-neon-cyan hover:text-neon-pink underline underline-offset-4"
        >
          read writing →
        </a>
        <a
          href="/contact"
          className="text-neon-cyan hover:text-neon-pink underline underline-offset-4"
        >
          contact →
        </a>
      </div>
    </section>
  );
}
```

**key patterns:**

- lowercase headings, body text
- factual proof bullets (quantified)
- simple CTAs (action + object)
- chalk font for name, clean font for body

---

### success toast component

```tsx
// components/molecules/SuccessToast.tsx

export function SuccessToast({ message }: { message: string }) {
  return (
    <div
      className="bg-chalk-cream border-neon-green fixed bottom-8 right-8 flex items-center gap-3 border-l-4 p-4 shadow-lg"
      role="status"
      aria-live="polite"
    >
      <svg className="text-neon-green h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-chalk-charcoal text-sm">{message}</p>
    </div>
  );
}

// usage:
<SuccessToast message="message sent." />
<SuccessToast message="essay published." />
<SuccessToast message="profile updated." />
```

**key patterns:**

- factual confirmation (past tense)
- full stop (no exclamation)
- aria-live for screen readers
- green accent (success color)

---

### error message component

```tsx
// components/molecules/ErrorMessage.tsx

export function ErrorMessage({ error, solution }: { error: string; solution?: string }) {
  return (
    <div
      className="bg-neon-pink/10 border-neon-pink mt-2 border-l-4 p-3"
      role="alert"
      aria-live="assertive"
    >
      <p className="text-chalk-charcoal text-sm">
        {error}
        {solution && (
          <>
            {' '}
            <span className="text-chalk-charcoal/70">{solution}</span>
          </>
        )}
      </p>
    </div>
  );
}

// usage:
<ErrorMessage error="email required." />
<ErrorMessage error="url must be unique." solution="try: /work/project-name-v2" />
<ErrorMessage error="image too large (max 5mb)." solution="compress or crop." />
```

**key patterns:**

- diagnostic (what went wrong)
- prescriptive solution (if available)
- aria-live="assertive" (announces immediately)
- pink accent (error color)

---

## content style guide summary

### always:

- lowercase (except proper nouns, acronyms)
- full stops (except warnings)
- factual tone (no motivational speak)
- quantified claims (when possible)
- specific examples (not vague)
- verb + noun CTAs
- past tense confirmations
- diagnostic errors

### never:

- exclamation marks (except warnings)
- uppercase headings
- sales language ("innovative", "cutting-edge")
- vague claims ("experienced", "passionate")
- filler words ("really", "very", "just")
- clickbait ("you won't believe...")
- urgency ("act now!", "limited time!")

### korean aesthetic:

- chalk font for headings/emphasis
- korean annotations (decorative only)
- hand-drawn icons (subtle)
- neon accents (cyan, pink, purple, green)
- desk objects (lamp glow, pencil sketches)

---

**last updated:** january 3, 2026
**status:** complete
**principle:** write like you're explaining to a colleague, not selling to a customer — factual, lowercase, honest validation
