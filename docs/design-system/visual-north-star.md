# visual north star

> **design intent:** a calm, precise, apple-internal-tool-like interface with subtle warmth and human texture — serious, intentional, and quietly obsessive.

**last updated:** january 3, 2026
**status:** complete
**story:** 2.1 - define the visual north star

---

## design intent

the riqle portfolio platform exists to help employers understand who you are in 30-45 seconds.

every design decision serves this single purpose: **employer comprehension at speed, without cognitive overload**.

the visual language must communicate:

- **calm in the first 30 seconds** (not overwhelming)
- **trust through restraint** (not trying too hard)
- **respect through depth** (not surface-level)

**this is not decoration — it is credibility engineering.**

---

## emotional target

### first 30 seconds: calm

when an employer lands on the site, they should feel:

- relieved (this won't waste my time)
- curious (this person is thoughtful)
- confident (i can evaluate quickly)

they should NOT feel:

- overwhelmed (too much happening)
- confused (where do i look first)
- skeptical (is this person serious)

### after engagement: trust

as they explore projects and writing, they should feel:

- impressed (this person thinks deeply)
- reassured (proof matches claims)
- validated (time well spent)

they should NOT feel:

- sold to (manipulative urgency)
- tricked (clickbait, fake proof)
- distracted (visual noise)

### deep exploration: respect

for employers who spend 5+ minutes exploring, they should feel:

- respected (attention to detail noticed)
- convinced (this is the right person)
- ready (i want to contact them)

they should NOT feel:

- bored (no depth)
- disappointed (surface-level)
- uncertain (is this person real)

---

## positioning

### what this site IS

**calm and unhurried:**

- generous white space
- slow, intentional transitions
- no urgency tactics
- reading feels natural

**precise and intentional:**

- every element has purpose
- nothing exists "just because"
- design serves content
- details are considered

**quietly premium:**

- quality without ostentation
- subtle, not loud
- restrained, not sterile
- confident, not flashy

**human through imperfection:**

- texture through variation
- hand-drawn elements (sparingly)
- warmth through tone
- real, not manufactured

**serious but not corporate:**

- professional without stuffiness
- formal without rigidity
- credible without jargon
- clear without simplification

**obsessive about detail:**

- typography perfect
- spacing consistent
- colors measured
- everything considered

### what this site is NOT

**flashy or attention-grabbing:**

- no neon gradients
- no dramatic animations
- no hero theatrics
- no "look at me" moments

**loud or theatrical:**

- no parallax dramatics
- no scroll hijacking
- no auto-playing media
- no visual spectacle

**trendy or following design fads:**

- no brutalism for its own sake
- no glassmorphism overload
- no "of the moment" aesthetics
- timeless over trendy

**experimental for its own sake:**

- no novel navigation patterns
- no unconventional layouts
- no "art project" vibes
- proven patterns over novelty

**corporate or sterile:**

- not cold, clinical, lifeless
- not bland, safe, forgettable
- not enterprise software aesthetic
- warmth balanced with precision

**playful or informal:**

- not cute or whimsical
- not casual or irreverent
- not fun-first
- serious intent, executed warmly

---

## inspiration references

### feeling, not copying

**apple internal tools:**

- **what to notice:** calm precision, restrained palette, typography-first, generous spacing
- **what to avoid:** overly minimal (too cold), lack of personality
- **key lesson:** trust comes from restraint, not decoration

**linear:**

- **what to notice:** typography hierarchy, white space discipline, subtle motion, professional clarity
- **what to avoid:** too trendy, gradient overuse
- **key lesson:** clarity and speed coexist

**stripe:**

- **what to notice:** micro-interactions done well, clear documentation style, technical depth
- **what to avoid:** corporate formality, excessive product marketing
- **key lesson:** precision builds confidence

**paul graham essays:**

- **what to notice:** text-first, minimal distraction, reading-focused, no visual clutter
- **what to avoid:** plain html aesthetic (too bare)
- **key lesson:** good writing doesn't need visual competition

---

## decision framework

before adding any design element, ask these questions:

### 1. does this make the site calmer or noisier?

**calm:**

- consistent spacing
- generous white space
- subtle transitions
- restrained color

**noise:**

- multiple competing elements
- dense layouts
- dramatic animations
- bright, saturated colors

**test:** if removing this element makes the page feel more calm, reject it.

---

### 2. does this support understanding or distract from it?

**supports understanding:**

- clear hierarchy
- readable typography
- purposeful visuals
- logical flow

**distracts from understanding:**

- decorative elements
- visual metaphors requiring explanation
- novelty for novelty's sake
- anything requiring interpretation

**test:** can employer understand the content without this element? if yes, question its necessity.

---

### 3. would this feel at home in an apple internal tool?

**fits apple internal:**

- neutral colors
- san francisco-style typography
- functional clarity
- subtle sophistication

**does NOT fit:**

- playful illustrations
- loud branding
- marketing-heavy design
- consumer product aesthetics

**test:** imagine this element in apple's internal HR tool. does it belong? if no, reconsider.

---

### 4. is this intentional or just "looks cool"?

**intentional:**

- solves specific problem
- improves comprehension
- serves user need
- aligns with design intent

**"looks cool":**

- added because seen elsewhere
- no functional purpose
- pure decoration
- designer preference over user need

**test:** can you articulate the specific problem this solves? if no, reject it.

---

## design review checklist

use this checklist when reviewing any design work:

### visual quality

- [ ] does this feel calm in the first 30 seconds?
- [ ] is white space generous and intentional?
- [ ] is typography doing most of the work?
- [ ] are colors restrained (no pure white/black, no high saturation)?
- [ ] is the accent color used sparingly?

### hierarchy and clarity

- [ ] is visual hierarchy obvious without thinking?
- [ ] can employer identify key information in < 5 seconds?
- [ ] does text flow naturally (left-aligned, readable line length)?
- [ ] are section breaks clear and consistent?
- [ ] is nothing competing for attention unnecessarily?

### restraint and discipline

- [ ] is every element necessary?
- [ ] does removing any element improve clarity?
- [ ] is animation subtle and purposeful (not decorative)?
- [ ] are there fewer than 4 colors on screen at once?
- [ ] is glass effect used sparingly (or not at all)?

### quality and precision

- [ ] is spacing consistent (using design tokens)?
- [ ] is typography precise (no arbitrary sizes)?
- [ ] are interactive states clear (hover, focus, active)?
- [ ] is nothing misaligned or inconsistent?
- [ ] would this feel at home in an apple internal tool?

### accessibility and usability

- [ ] is color contrast sufficient (wcag aa: 4.5:1 for text)?
- [ ] are focus indicators visible and clear?
- [ ] is keyboard navigation intuitive?
- [ ] does motion respect `prefers-reduced-motion`?
- [ ] is text readable at all sizes (min 16px)?

### emotional alignment

- [ ] does this make employer feel calm (not overwhelmed)?
- [ ] does this build trust (not skepticism)?
- [ ] does this show respect (not wasting time)?
- [ ] is this quietly premium (not loud or cheap)?
- [ ] is this serious but warm (not corporate or playful)?

---

## anti-patterns (explicit rejections)

if design includes any of these, reject immediately:

### visual noise

- ❌ neon gradients or high-saturation colors
- ❌ multiple glass effects competing
- ❌ decorative animations on load
- ❌ parallax scroll effects
- ❌ auto-playing media or carousels

### hierarchy violations

- ❌ center-heavy layouts (text should flow left)
- ❌ pinterest-style masonry grids
- ❌ overlapping text on images
- ❌ inconsistent spacing or typography
- ❌ no clear visual hierarchy

### unnecessary complexity

- ❌ novel navigation patterns
- ❌ "creative" interaction patterns
- ❌ visual metaphors requiring explanation
- ❌ experimental layouts
- ❌ anything that requires user learning

### false premium

- ❌ luxury brand aesthetics (gold, black, dramatic)
- ❌ over-designed hero sections
- ❌ "brand moments" that distract
- ❌ excessive use of effects
- ❌ trying too hard to look expensive

---

## example decisions

### decision 1: homepage hero

**proposed:** full-screen hero with parallax effect, rotating taglines, dramatic gradient background

**evaluation:**

1. calmer or noisier? → **noisier** (parallax, rotation, gradient)
2. supports understanding? → **no** (distraction from key info)
3. fits apple internal? → **no** (too theatrical)
4. intentional or "looks cool"? → **"looks cool"** (no functional purpose)

**verdict:** ❌ **reject**. use static, typography-focused hero instead.

---

### decision 2: project cards

**proposed:** simple card with title, brief description, subtle border, white background

**evaluation:**

1. calmer or noisier? → **calmer** (minimal, consistent)
2. supports understanding? → **yes** (clear containment)
3. fits apple internal? → **yes** (functional, clean)
4. intentional or "looks cool"? → **intentional** (solves grouping problem)

**verdict:** ✅ **approve**. add subtle hover state (border color change).

---

### decision 3: animated page transitions

**proposed:** framer motion page transitions with slide + fade effects

**evaluation:**

1. calmer or noisier? → **depends** (if subtle: calmer, if dramatic: noisier)
2. supports understanding? → **no** (delays content visibility)
3. fits apple internal? → **maybe** (if very subtle)
4. intentional or "looks cool"? → **"looks cool"** (no functional benefit)

**verdict:** ❌ **reject** (or use extremely subtle fade only, respecting `prefers-reduced-motion`)

---

## alignment with information architecture (epic 1)

the visual north star aligns with epic 1 principles:

**epic 1 principle: employer-first (45s comprehension)**
→ **visual north star: calm in first 30 seconds**
✅ both prioritize speed and clarity

**epic 1 principle: progressive disclosure (calm → proof → texture)**
→ **visual north star: restraint first, depth on engagement**
✅ both reveal complexity gradually

**epic 1 principle: manual curation over automation**
→ **visual north star: intentional over "looks cool"**
✅ both value deliberate choices

**epic 1 principle: constraints enable focus**
→ **visual north star: fewer elements, more clarity**
✅ both embrace restraint

---

## measuring success

visual north star is successful when:

### qualitative measures

- [ ] employers describe site as "clean" or "clear"
- [ ] employers mention fast comprehension
- [ ] employers notice details ("this is well-designed")
- [ ] employers feel confident reaching out
- [ ] designers/developers can justify every design decision against this document

### quantitative measures

- [ ] 90%+ of test employers understand positioning in < 45 seconds
- [ ] 0 complaints about visual clutter or confusion
- [ ] 100% wcag aa compliance (4.5:1 contrast, keyboard nav)
- [ ] lighthouse performance score > 90
- [ ] design decisions can be traced to framework questions

---

## design system boundaries

the visual north star defines what the design system IS and IS NOT:

### design system IS

- restrained color palette (warm neutrals + subtle accent)
- typography-first hierarchy
- generous spacing and white space
- functional clarity over decoration
- subtle, intentional motion
- accessible by default

### design system is NOT

- trendy aesthetic system
- branding toolkit
- creative showcase
- experimental playground
- marketing design system

---

**last updated:** january 3, 2026
**status:** complete
**principle:** design becomes invisible — and invisibility is trust
