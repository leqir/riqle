# do not build list: explicitly banned features and patterns

> **principle:** constraints enable focus — saying "no" to bad patterns protects the core experience
> **rule:** if a feature is on this list, do not build it. ever. no exceptions unless documented reasoning exists.

**last updated:** january 3, 2026
**status:** complete
**story:** 1.12 - document 'do not build' list

---

## core philosophy

**the problem:**

feature creep destroys focus. every portfolio adds "just one more thing" (social sharing, analytics dashboards, gamification, notifications) until the platform becomes bloated, slow, distracting. employers close the tab.

**the solution:**

explicit "do not build" list. banned patterns documented upfront. when temptation arises ("but users might want..."), reference this document. constraints protect the core experience: employer comprehension in 45 seconds.

**the anti-pattern:**

- adding features because competitors have them
- building for hypothetical future users
- implementing "nice to have" features before core is solid
- confusing activity with progress

**the pattern:**

- ruthless prioritization (one job to be done: employer comprehension)
- remove before adding (subtract features that distract)
- default to "no" (feature requests must clear high bar)
- protect the core experience (calm first, proof second)

---

## category 1: engagement manipulation

### ❌ banned: gamification

**do NOT implement:**

- badges, achievements, levels, ranks
- points systems ("portfolio score", "profile completion %")
- streaks ("7-day writing streak!")
- leaderboards ("top portfolios this week")
- progress bars for profile completion
- unlockable features
- daily challenges or goals

**reasoning:**

gamification creates artificial urgency and guilt. portfolio is for employers, not engagement metrics. focus on substance (proof), not arbitrary milestones.

**exception:**

none. no gamification, period.

---

### ❌ banned: notifications and alerts

**do NOT implement:**

- push notifications (browser, mobile, email)
- notification badges ("3 new views!")
- real-time alerts ("someone viewed your portfolio!")
- reminder emails ("finish your about page!")
- "you haven't posted in 2 weeks" nudges
- automated engagement emails

**reasoning:**

notifications interrupt focus. portfolio is static proof, not social feed. employers visit once, decide, move on. no need for real-time updates.

**exception:**

system-critical notifications only (security alerts, account issues). never promotional or engagement-driven.

---

### ❌ banned: social features

**do NOT implement:**

- likes, hearts, upvotes, reactions
- comments on projects/essays
- follower/following counts
- social sharing buttons (every page)
- "share your thoughts" prompts
- social proof counters ("1.2k views!")

**reasoning:**

portfolio is professional proof, not social network. employer doesn't care how many likes a project has. focus on outcomes, not popularity.

**exception:**

single, optional "share" link on essays (for author to share own work). no counters, no tracking, no encouragement.

---

### ❌ banned: content discovery algorithms

**do NOT implement:**

- "recommended for you" based on browsing history
- "you might also like" based on collaborative filtering
- trending/popular/featured sections (algorithmic)
- personalized homepage layouts
- auto-play next project/essay
- infinite scroll / endless feeds

**reasoning:**

employer has specific goal: understand who you are, see proof, find contact. algorithms create distraction. manual curation (featured work) is intentional, not algorithmic.

**exception:**

manual curation only (you choose featured work). no algorithms.

---

## category 2: visual noise and distraction

### ❌ banned: animations and transitions

**do NOT implement:**

- load animations (spinners, skeleton screens on initial load)
- parallax scrolling effects
- scroll-triggered animations (fade in, slide in)
- animated hero sections (rotating text, typewriter effect)
- particle effects, confetti, sparkles
- animated gradient backgrounds
- hover effects that move elements
- auto-playing background videos
- carousel/slider auto-advance

**reasoning:**

animations distract, slow down comprehension, cause motion sickness, hurt accessibility. employer wants speed, not spectacle.

**exception:**

subtle transitions on user-triggered actions only:

- ✅ hover: underline color change (0.2s ease)
- ✅ focus: outline appearance (instant)
- ✅ button click: background color shift (0.15s ease)
- ✅ modal open/close: opacity fade (0.3s ease)

rule: if animation doesn't communicate state change, don't use it.

---

### ❌ banned: popups and overlays

**do NOT implement:**

- newsletter signup popups
- cookie consent banners (unless legally required, and then: minimal)
- "before you go" exit-intent popups
- chat widgets (live chat, chatbots)
- sticky notification bars ("new essay published!")
- full-screen takeovers
- "subscribe to unlock" gates
- video modals that auto-play

**reasoning:**

popups interrupt comprehension. employer landed on homepage, has 45 seconds to decide. popup = instant close tab.

**exception:**

user-triggered modals only (e.g., contact form modal if user clicks "contact"). never automatic.

---

### ❌ banned: decorative overload

**do NOT implement:**

- excessive use of korean annotations (one per section max)
- animated chalk dust particles
- auto-rotating desk objects
- blinking neon signs
- multiple simultaneous glows/vignettes
- background patterns that compete with text
- decorative images without purpose

**reasoning:**

korean aesthetic = subtle accents, not visual chaos. one desk lamp glow, few hand-drawn icons, sparse korean text. restraint over abundance.

**exception:**

strategic decoration only. test: if removing decoration improves clarity, it was visual noise.

---

### ❌ banned: auto-playing media

**do NOT implement:**

- auto-play videos (with or without sound)
- auto-play audio
- background music
- looping animated gifs (project demos)
- auto-advancing carousels/sliders

**reasoning:**

auto-play violates user control, hurts accessibility (wcag 2.1), causes cognitive overload. user decides when to play media.

**exception:**

none. all media requires explicit user action (click play button).

---

## category 3: data collection and tracking

### ❌ banned: invasive analytics

**do NOT implement:**

- session recording (hotjar, fullstory, etc.)
- mouse tracking / heatmaps
- keystroke logging
- form field analytics ("user typed, then deleted")
- scroll depth tracking
- time-on-page tracking
- user fingerprinting
- third-party analytics pixels (facebook, google ads, etc.)

**reasoning:**

privacy matters. analytics should answer "which pages get traffic" not "what did user type before deleting". use privacy-first analytics (plausible/fathom), not surveillance tools.

**exception:**

basic analytics only (page views, referrers, top paths). no behavioral tracking, no PII collection.

---

### ❌ banned: marketing and conversion tracking

**do NOT implement:**

- conversion pixels (google analytics goals, facebook pixel)
- A/B testing frameworks (optimizely, etc.)
- retargeting pixels
- affiliate tracking
- UTM parameter collection (beyond basic source/medium)
- email open tracking (tracking pixels)
- link click tracking in emails

**reasoning:**

portfolio is not a marketing funnel. employer visits, decides, contacts (or doesn't). no need to optimize "conversion rate" or retarget.

**exception:**

basic referrer tracking (where did traffic come from). no conversion optimization, no retargeting.

---

### ❌ banned: email collection tactics

**do NOT implement:**

- newsletter signup forms (unless core to content strategy)
- "unlock content with email" gates
- "download resource" in exchange for email
- popup newsletter prompts
- exit-intent email collection
- "join 10k subscribers!" social proof

**reasoning:**

employer visiting portfolio doesn't want newsletter. if writing is valuable, they'll bookmark or follow RSS. email collection = distraction from core job (evaluate candidate).

**exception:**

optional newsletter signup (single, subtle link in footer) if writing is core content strategy. never gate content, never popup.

---

## category 4: commerce and urgency

### ❌ banned: artificial urgency

**do NOT implement:**

- countdown timers ("offer ends in 3 hours!")
- scarcity messaging ("only 2 spots left!")
- "limited time" anything
- "act now" language
- expiring discounts or offers
- "this deal won't last" urgency

**reasoning:**

portfolio is timeless proof, not flash sale. employer evaluates based on skills/outcomes, not urgency. artificial urgency = desperate, untrustworthy.

**exception:**

none. never use urgency tactics.

---

### ❌ banned: commerce features (unless consulting business)

**do NOT implement:**

- shopping cart / e-commerce
- payment processing (unless selling products/services)
- subscription tiers / paywalls
- digital product downloads (unless core offering)
- upsell / cross-sell prompts
- pricing tables (unless consulting rates)

**reasoning:**

portfolio shows proof of work, not products for sale. if consulting, rates can be on /services page. but no shopping cart, no checkout flow.

**exception:**

if portfolio is for selling digital products (courses, templates): allowed, but separate from proof pages. e.g., /work (proof) vs /shop (commerce).

---

### ❌ banned: testimonials and social proof (unless authentic)

**do NOT implement:**

- "as seen in" logo grids (unless genuinely featured)
- fake testimonials / stock photos
- "trusted by 10k users" (unless true and relevant)
- client logo walls (unless worked with them)
- manufactured credibility markers

**reasoning:**

employer can smell fake social proof. if you worked with recognizable clients, show the work (case study). if featured in publication, link to article. no manufactured credibility.

**exception:**

authentic testimonials with real names/companies (verifiable). authentic press mentions (link to source). no fake social proof, ever.

---

## category 5: complexity and feature bloat

### ❌ banned: user dashboards (unless admin)

**do NOT implement:**

- user-facing analytics dashboard ("your portfolio views")
- activity feeds ("recent visitors")
- profile settings with 50+ options
- customization panels ("change theme colors")
- advanced filtering ("filter by 12 criteria")

**reasoning:**

employer doesn't need dashboard. they visit once, evaluate, leave. focus on clean presentation of proof, not user account features.

**exception:**

admin dashboard only (for you to manage content). employers don't log in.

---

### ❌ banned: multi-step wizards and onboarding

**do NOT implement:**

- "complete your profile" wizards
- step-by-step onboarding flows
- progress checklists ("3 of 7 steps complete")
- tutorial overlays / product tours
- "getting started" guides

**reasoning:**

portfolio is static content, not SaaS product. no user onboarding needed. employer lands on homepage, reads, navigates, done.

**exception:**

admin onboarding only (for you when first setting up platform). never for employers visiting site.

---

### ❌ banned: advanced search and filtering

**do NOT implement:**

- faceted search (filter by 5+ criteria)
- advanced search operators (boolean queries)
- saved search queries
- search history
- autocomplete with 20+ suggestions
- search result sorting by 10+ criteria

**reasoning:**

portfolio has < 50 total pieces of content (projects, essays, resources). simple search is sufficient. employer can skim /work or /writing index in 10 seconds.

**exception:**

basic search only (keyword match, title/excerpt). no advanced filters.

---

### ❌ banned: collaborative features

**do NOT implement:**

- multi-user editing
- real-time collaboration
- shared workspaces
- team accounts
- permissions/roles systems
- activity streams ("who edited what")

**reasoning:**

portfolio is single-author. no need for collaboration features. if guest post needed, manually add content.

**exception:**

none. portfolio = single author.

---

## category 6: third-party integrations (unless essential)

### ❌ banned: social media embeds

**do NOT implement:**

- twitter/x embedded timelines
- instagram feed widgets
- linkedin profile embeds
- facebook like buttons
- social media carousels
- "follow me on 7 platforms" grids

**reasoning:**

social feeds distract from proof. employer doesn't care about latest tweets. if social presence matters, link to profiles (footer).

**exception:**

single, curated social proof (e.g., one testimonial tweet, manually screenshot). no live feeds, no widgets.

---

### ❌ banned: advertising and monetization

**do NOT implement:**

- display ads (google adsense, etc.)
- sponsored content blocks
- affiliate links (unless disclosed and relevant)
- sponsored "recommended" sections
- native advertising
- promotional content disguised as proof

**reasoning:**

portfolio is professional credential, not monetization platform. ads = desperation signal to employers.

**exception:**

none. no ads, period.

---

### ❌ banned: accessibility overlays (fake accessibility)

**do NOT implement:**

- accessiBe, UserWay, AudioEye, etc.
- "accessibility widget" overlays
- automated accessibility fixes
- "ai-powered accessibility" tools

**reasoning:**

accessibility overlays don't work, violate wcag, create legal liability. proper accessibility = semantic html, wcag compliance from start. no shortcuts.

**exception:**

none. build accessible from day one. no overlays.

---

## category 7: seo manipulation

### ❌ banned: black-hat seo tactics

**do NOT implement:**

- keyword stuffing
- hidden text (white text on white background)
- doorway pages
- cloaking (different content for search engines)
- link schemes (buying backlinks)
- automated content generation for seo
- duplicate content across multiple domains
- misleading redirects

**reasoning:**

google penalizes black-hat seo. employers search for your name or skills, find portfolio, evaluate. no need for seo tricks.

**exception:**

white-hat seo only (semantic html, meta tags, structured data, quality content).

---

## category 8: unnecessary technology

### ❌ banned: cutting-edge tech for tech's sake

**do NOT implement:**

- blockchain integration (unless building blockchain product)
- nfts for portfolio items
- web3 features (unless relevant to work)
- ai chatbots on every page
- virtual reality portfolio tours
- augmented reality business cards
- unnecessary microservices (when monolith works)
- over-engineered architecture

**reasoning:**

use appropriate technology for problem. portfolio = static content + simple cms. next.js + postgres is sufficient. don't add complexity for resume padding.

**exception:**

if showcasing specific tech (e.g., you're blockchain engineer), build demo project. but core portfolio stays simple.

---

### ❌ banned: performance killers

**do NOT implement:**

- unoptimized images (> 500kb)
- no lazy loading
- render-blocking scripts
- heavy javascript frameworks (when static html works)
- multiple third-party scripts (analytics, ads, widgets)
- web fonts that block rendering (no font-display: swap)
- autoplay videos above fold

**reasoning:**

employer on slow connection gives up if page takes 5+ seconds. core web vitals matter. lcp < 2.5s, fcp < 1.5s, cls < 0.1.

**exception:**

none. performance is non-negotiable. optimize everything.

---

## category 9: content anti-patterns

### ❌ banned: vague or misleading content

**do NOT write:**

- "passionate about technology"
- "innovative problem solver"
- "results-driven professional"
- "think outside the box"
- "synergy", "leverage", "disrupt"
- "proven track record" (without proof)
- "extensive experience" (without specifics)
- clickbait essay titles

**reasoning:**

employer reads hundreds of portfolios. generic claims = ignored. specific outcomes = credible.

**replacement pattern:**

- ❌ "passionate about AI" → ✅ "built AI systems for 3 years"
- ❌ "innovative solution" → ✅ "reduced query time from 2s to 200ms"
- ❌ "extensive experience" → ✅ "shipped 12 production apps (2020-2024)"

see: [copy-tone-rules.md](./copy-tone-rules.md) for comprehensive writing guidelines.

---

### ❌ banned: filler content

**do NOT include:**

- lorem ipsum placeholder text
- "coming soon" pages
- empty project cards ("more projects coming!")
- placeholder images
- "under construction" notices
- "check back later" messages

**reasoning:**

employer evaluates based on what exists now. empty promises = unprofessional. launch with 3-5 solid projects, not 20 placeholders.

**exception:**

none. only publish complete content.

---

### ❌ banned: fake or embellished work

**do NOT include:**

- projects you didn't work on
- exaggerated role ("led team of 20" when you contributed to team project)
- fabricated outcomes ("increased revenue 300%" with no evidence)
- stolen work / plagiarism
- fake testimonials
- photoshopped screenshots

**reasoning:**

integrity matters. employer will ask detailed questions in interview. lies get caught. show real work, honest outcomes, authentic proof.

**exception:**

none. honesty is non-negotiable.

---

## category 10: mobile and responsive anti-patterns

### ❌ banned: mobile-hostile patterns

**do NOT implement:**

- horizontal scrolling (unless intentional, like carousel)
- tiny touch targets (< 44px)
- hover-only interactions (no mobile equivalent)
- fixed-position elements that cover content
- desktop-only layouts (no mobile responsive)
- pinch-zoom disabled
- text too small to read on mobile
- forms that don't fit viewport

**reasoning:**

employers review portfolios on phones. mobile-hostile = unprofessional. wcag requires 44×44px touch targets, pinch-zoom enabled.

**exception:**

none. mobile-first design, always.

---

## when to break these rules

### decision framework

before building banned feature, ask:

1. **does it serve employer comprehension (core job)?**
   - if no → don't build
   - if yes → continue

2. **is there simpler alternative?**
   - if yes → use simpler alternative
   - if no → continue

3. **does it violate core principles (calm first, proof second, manual curation)?**
   - if yes → don't build
   - if no → continue

4. **document reasoning:**
   - why is banned feature necessary?
   - what user problem does it solve?
   - why can't simpler solution work?
   - what constraints prevent simple solution?

5. **get approval:**
   - document decision in `/docs/decisions/[feature-name].md`
   - explain reasoning, alternatives considered, tradeoffs
   - approve explicitly (don't assume exception)

---

## enforcement

### code review checklist

before approving PR, check:

- [ ] no banned features implemented
- [ ] no banned patterns (animation, urgency, etc.)
- [ ] no banned copy (vague claims, filler words)
- [ ] performance within limits (lcp < 2.5s, fcp < 1.5s)
- [ ] wcag aa compliant (contrast, keyboard nav, alt text)
- [ ] mobile responsive (44px touch targets, no horizontal scroll)

### when to say no

**scenarios for immediate rejection:**

- PR adds gamification (badges, streaks, points)
- PR adds notification system (push, email, alerts)
- PR adds social features (likes, comments, followers)
- PR adds popups (newsletter, exit-intent, chat widget)
- PR adds auto-play media
- PR adds accessibility overlay
- PR adds black-hat seo tactics
- PR includes vague/fake content

**response:**

"this feature is on the do-not-build list (see docs/epic-1/do-not-build.md). if you believe this is an exception, document reasoning in /docs/decisions/ and request approval."

---

## summary: core constraints

### what we build:

- ✅ clean, fast, accessible portfolio
- ✅ manual curation (you choose featured work)
- ✅ semantic html, wcag aa compliance
- ✅ employer-first architecture (45s comprehension)
- ✅ factual, quantified proof (outcomes, not claims)
- ✅ korean aesthetic accents (subtle, not overwhelming)
- ✅ privacy-first analytics (plausible/fathom)
- ✅ progressive disclosure (calm → proof → texture)

### what we don't build:

- ❌ gamification, notifications, social features
- ❌ animations, popups, auto-play media
- ❌ invasive tracking, retargeting pixels
- ❌ artificial urgency, fake social proof
- ❌ feature bloat, complex dashboards
- ❌ unnecessary integrations, ads
- ❌ seo manipulation, performance killers
- ❌ vague content, filler, fake work

### guiding principle:

when in doubt, subtract. employer needs clarity, proof, contact info. everything else is distraction.

---

**last updated:** january 3, 2026
**status:** complete
**principle:** constraints enable focus — saying "no" to bad patterns protects employer comprehension in 45 seconds
