# homepage core questions

**every element on the homepage must answer at least one of these five questions. if an element doesn't answer a question, it does not belong.**

---

## the five questions

### question 1: who is this?

**answered by:** name (large, calm typography)

**location:** above fold, top of page

**format:**

- "Nathanael" or "Nathanael / Riqle"
- large, calm typography (48-64px)
- no titles next to name
- no emojis
- no descriptors
- just the name

**example:**

```tsx
<h1 className="text-display font-semibold text-stone-900">Nathanael</h1>
```

**what NOT to include:**

- ❌ "Nathanael - Software Engineer"
- ❌ "Nathanael 👋"
- ❌ "Hey, I'm Nathanael!"
- ✅ "Nathanael"

---

### question 2: what do they actually do?

**answered by:** positioning statement (1-2 lines max)

**location:** immediately below name

**format:**

- plain language, no buzzwords
- legible in 5 seconds
- specific enough to understand domain
- 1-2 lines maximum

**examples:**

- "Student → Tutor → Builder → Founder"
- "Building MarkPoint. Teaching systems thinking."
- "Founded MarkPoint. Taught 500+ students. Ships production code daily."

**what NOT to include:**

- ❌ "Passionate about changing the world through education"
- ❌ "Full-stack developer and entrepreneur"
- ❌ "Turning ideas into reality"
- ✅ "Student → Tutor → Builder → Founder"

---

### question 3: have they built real things?

**answered by:** proof anchors (2-3 items)

**location:** second screen (after one scroll)

**format:**

- project/startup name
- one-line description (what it is)
- outcome or scope (quantified if possible)
- link to deep-dive page

**proof anchor structure:**

```tsx
<ProofAnchor
  name="MarkPoint"
  description="Startup focused on [problem space]. Live product with real users."
  outcome="X users, $Y MRR, featured on Product Hunt"
  href="/startups/markpoint"
/>
```

**proof requirements:**

- maximum 2-3 proof anchors
- real outcomes (not hypothetical)
- specific metrics with context
- no "featured everywhere" syndrome
- no logo grids

**examples:**

- ✅ "MarkPoint: X users, $Y MRR, launched 2024"
- ✅ "Riqle: T3 Stack, Stripe integration, full test coverage"
- ✅ "500+ students taught, 90% achieved Band 5 or 6"
- ❌ "MarkPoint: Amazing startup that's changing education"
- ❌ "Riqle: My personal project using cutting-edge tech"

---

### question 4: can i trust their judgment?

**answered by:**

- writing link (signals thinking quality)
- optional: featured essay or principle
- quantified outcomes (500+ students, etc.)

**location:** throughout homepage

**signals of good judgment:**

- clear, factual communication (no hype)
- restraint in design (calm, not flashy)
- real outcomes (not just claims)
- evidence of systems thinking
- teaching what works (outcomes over theory)

**writing link:**

```tsx
<a href="/writing" className="hover:text-accent text-lg font-medium text-stone-900">
  Read Writing →
</a>
```

**optional featured essay:**

```tsx
<a href="/writing/building-in-public" className="group block">
  <p className="text-body group-hover:text-accent font-medium text-stone-900">
    Building in Public: Lessons from MarkPoint →
  </p>
  <p className="text-meta mt-1 text-stone-600">
    On transparency, iteration, and learning from real users.
  </p>
</a>
```

**what signals good judgment:**

- ✅ restraint in design (not trying to impress)
- ✅ specific outcomes with context
- ✅ clear, plain language
- ✅ evidence of real impact
- ❌ hype or exaggeration
- ❌ jargon or buzzwords
- ❌ claims without proof

---

### question 5: would i want them on my team?

**answered by:** combination of all above

**this is the synthesis question — answered by the sum of:**

- restraint (not overselling)
- precision (clear communication)
- real outcomes (proof of execution)
- clear thinking (writing quality)
- professionalism (serious tone)

**signals that answer "yes":**

- restraint: calm design, no hype, not trying too hard
- precision: specific claims, quantified outcomes, clear language
- proof: real work, real impact, real metrics
- judgment: systems thinking, evidence-based, outcomes-focused
- professionalism: serious but approachable, credible but not corporate

**anti-signals that answer "no":**

- ❌ overselling or hype
- ❌ vague claims without proof
- ❌ "personal brand" energy
- ❌ trying to impress instead of inform
- ❌ decoration over substance

**the homepage itself demonstrates the answer:**

- if the homepage is calm, precise, and evidence-based → yes
- if the homepage is flashy, vague, or salesy → no

---

## decision checklist for homepage elements

**before adding any element to the homepage, ask:**

1. **does this answer one of the five questions?**
   - if no → remove it
   - if yes → which question? (must be explicit)

2. **is this the clearest way to answer the question?**
   - if no → simplify or remove

3. **does this work without decoration?**
   - if no → it's decoration, remove it

4. **would this survive being printed?**
   - if no → it relies on effects, simplify

5. **can an employer miss this and still understand?**
   - if yes, and it's not critical → consider removing or making less prominent

---

## homepage element inventory

**above the fold:**

- name → answers Q1 (who is this?)
- positioning statement → answers Q2 (what do they do?)
- context sentences → answers Q2, Q3, Q4
- primary CTAs (View Work, Read Writing) → routes to Q3, Q4
- resources link (subtle) → optional, skippable

**second screen (proof anchors):**

- 2-3 proof items → answer Q3 (have they built real things?)
- each with name, description, outcome, link

**third screen (optional depth):**

- "currently focused on..." → answers Q5 (cultural fit)
- featured essay link → answers Q4 (can i trust judgment?)
- optional principle → answers Q4, Q5

**what does NOT belong:**

- decorative icons (don't answer questions)
- testimonials (social proof ≠ real proof)
- "about me" prose (positioning statement is enough)
- background patterns (visual noise)
- animations (distraction)
- product cards (homepage is not a store)
- social media links (not relevant to employer questions)

---

## validation process

**test 1: 30-45 second employer skim**

show homepage to someone unfamiliar with you

after 30-45 seconds, ask:

1. who is this person? (should answer with your name)
2. what do they do? (should understand domain/positioning)
3. have they built real things? (should mention at least one proof item)
4. do you trust them? (should feel calm/confident, not skeptical)
5. would you consider them for a role? (should say yes or maybe)

if they can't answer all five → homepage failed

---

## test 2: element-by-element audit

for each element on the homepage:

1. **which question does this answer?**
   - if none → remove
   - if unclear → clarify or remove

2. **is this the simplest way to answer it?**
   - if no → simplify

3. **does this help or distract?**
   - if distract → remove

example audit:

| element                  | question answered                | keep/remove | reason                      |
| ------------------------ | -------------------------------- | ----------- | --------------------------- |
| name                     | Q1: who is this?                 | keep        | essential                   |
| positioning statement    | Q2: what do they do?             | keep        | essential                   |
| decorative icon          | none                             | remove      | doesn't answer question     |
| proof anchor (MarkPoint) | Q3: built real things?           | keep        | specific proof              |
| testimonial              | none (social proof ≠ real proof) | remove      | doesn't answer              |
| "about me" paragraph     | Q2 (but redundant)               | remove      | positioning already answers |
| writing link             | Q4: can i trust judgment?        | keep        | signals thinking quality    |

---

## anti-patterns: elements that don't answer questions

**decorative elements:**

- icons without function (don't answer questions)
- background patterns (visual noise)
- gradient text (decoration over clarity)
- animations (distraction)

**social proof:**

- testimonials ("this changed my life!")
- follower counts (not relevant to employers)
- "as seen on" badges (press ≠ proof)
- social media links (not answering employer questions)

**verbose content:**

- "about me" paragraphs (positioning statement is enough)
- long mission statements (not answering specific questions)
- detailed bios (save for /about page)

**conversion tactics:**

- "get started" CTAs (this isn't a funnel)
- newsletter popups (trust-destroying)
- urgency cues (not professional)
- product features on homepage (not a store)

---

## the rule: if in doubt, remove it

**the homepage is not:**

- a portfolio showcase (that's /work)
- a blog feed (that's /writing)
- a product catalog (that's /resources)
- a personal brand landing page

**the homepage IS:**

- a 30-45 second decoding surface
- an answer to five employer questions
- a calm, professional entry point
- a routing mechanism to deeper content

**default to restraint:**

- when in doubt, remove
- less is more
- calm over clever
- clarity over creativity
- outcomes over personality

**the homepage doesn't ask for attention. it earns it.**
