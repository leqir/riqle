---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - "_bmad-output/planning-artifacts/project-vision.md"
date: 2026-01-03
author: Nathanael
---

# Product Brief: riqle

## Executive Summary

This is Nathanael's personal website, built as a robust internal system to present his professional identity, work, and impact clearly to employers and collaborators.

Rather than a static portfolio or résumé replacement, the site functions as a **personal operating system**—integrating:
- **Narrative** (who I am and how I got here)
- **Proof of work** (projects, startups, quantified outcomes)
- **Educational impact** (resources and courses sold through the platform)
- **Real-world execution** (payments, access management, operational infrastructure)

The goal is not to build a product for others, but to ensure that Nathanael's work, thinking, and trajectory are represented accurately and credibly in one place, without fragmentation across LinkedIn, GitHub, Gumroad, and disconnected platforms.

The site is intentionally:
- **Over-engineered behind the scenes** (production-grade auth, commerce, observability)
- **Restrained and clear on the surface** (no dark patterns, hype, or artificial urgency)
- **Designed to grow** alongside Nathanael's career without needing rewrites

Success is measured by three outcomes: (1) employers understand capability quickly, (2) collaborators can assess alignment deeply, and (3) students or customers engage with trust.

This is not "just a personal website." It's a properly-built system for someone who actually does things, sells things, and needs one authoritative place to represent that honestly.

---

## Core Vision

### The Problem

Modern candidates who build real things often suffer from misrepresentation:
- **Résumés** flatten non-linear paths
- **LinkedIn** rewards conformity over substance
- **Portfolios** show outputs without context or thinking
- **Commerce platforms** (Gumroad, Teachable) detach selling from credibility
- **Startup pages** live in isolation, disconnected from founder legitimacy

The result is **identity fragmentation**—valuable proof of work, learning, and judgment is scattered across incompatible systems that don't acknowledge each other's existence. Every new context (job application, collaboration opportunity, customer interaction) triggers a credibility reset because there's no unified source of truth.

For someone with a non-linear path—student → tutor → builder → founder—existing platforms force you to choose one dimension while the whole story gets lost.

### Why Existing Solutions Fall Short

**Static portfolios:**
- Show what was built, not why or how
- No commerce integration
- No narrative continuity
- Require manual updates and feel stale quickly

**Template sites (Carrd, Webflow, Squarespace):**
- Good for presentation, not operation
- No auth, access control, or entitlement logic
- Commerce feels bolted-on (because it is)
- Can't represent complexity or evolution

**Hybrid approaches (Notion public + Gumroad):**
- Everything is disconnected
- No shared identity layer
- No proof → commerce feedback loop
- Unprofessional for employer evaluation

**Professional platforms (LinkedIn, AngelList):**
- Force conformity and institutional framing
- Punish non-linear paths
- Don't support direct commerce or deep narrative

None of these were built to solve the problem: **How does someone with real execution, teaching experience, and startup ventures present themselves coherently to employers while also running an operational business?**

### The Solution

This site exists to solve that problem for one person: Nathanael.

It unifies:
- **Identity & narrative** (about page, timeline, principles, direction)
- **Proof of work** (portfolio, accolades, startups like MarkPoint, quantified impact)
- **Educational commerce** (HSC resources, courses with secure delivery and payments)
- **Operational infrastructure** (auth, role-based access, Stripe webhooks, audit logs, background jobs)

The system allows:
- **Employers** to understand capability in 2-3 minutes with signal density
- **Collaborators** to assess alignment and competence through deeper exploration
- **Students/customers** to purchase resources backed by demonstrated expertise and trust
- **Nathanael** to manage everything from one coherent admin layer

The philosophy is **selling after proof**:
- Commerce is downstream of credibility
- Teaching materials are extensions of real outcomes (e.g., HSC tutoring success)
- Startups are presented as chapters in a larger arc, not isolated pitches
- Monetization feels earned, not extracted

### Why Build This (Instead of Using Existing Tools)

The site is intentionally over-engineered because:
1. **Professionalism matters to employers** - broken links, slow loads, or janky UX signal sloppiness
2. **Real commerce requires real infrastructure** - customers deserve secure access, reliable delivery, and proper receipts
3. **Growth without rewrites** - the system can scale from personal site to full ecosystem as ventures expand
4. **Credibility through execution** - building this properly is itself proof of technical capability

This is not premature optimization. It's **infrastructure built to last** because the alternative—constant platform-hopping and rebuilding—wastes time and erodes trust.

### Success Criteria

The site works if:

**For employers:**
- Identity compression: someone can spend 2-3 minutes and accurately understand who Nathanael is, what he's built, and where he's heading
- Proof is legible: projects, outcomes, and startups clearly demonstrate execution
- No confusion: non-linear path (student → tutor → builder → founder) feels coherent, not fragmented

**For collaborators:**
- Alignment is assessable: essays, projects, and principles reveal thinking and values
- Credibility is established: demonstrated outcomes (students taught, products shipped, startups operated) build trust

**For customers:**
- Trust precedes purchase: resources feel backed by real experience, not hype
- Professional delivery: payments work, access is secure, experience feels polished

**For Nathanael:**
- Opportunity becomes inbound and aligned: fewer cold applications, more "I saw your site and this aligns"
- No fragmentation tax: one system handles identity, commerce, content, and ventures
- Long-term leverage: thinking, proof, and credibility accumulate rather than reset

---

## Target Users

### Primary User: Nathanael (Platform Operator)

**Role:** Owner, content manager, admin

**Update Cadence:**
This is not a "creator schedule" - updates are **event-driven**:
- **Essays/writing:** Monthly or quarterly, usually after completing a project, major reflection, or pivot
- **Portfolio/startups:** Project-by-project when something ships, changes direction, or reaches meaningful traction
- **Resources/courses:** Infrequent - add once, refine occasionally
- **About/narrative:** Rarely - only when trajectory meaningfully changes

The goal is maintaining an accurate professional record, not feeding an audience.

**Critical Admin Workflows:**
Admin tasks must be fast and frictionless:

1. **Publishing writing**
   - Write → preview → publish
   - No build steps, no broken layouts

2. **Adding/editing projects**
   - Title, description, links, outcomes
   - Attach essays or references
   - Done

3. **Managing resources/courses**
   - Create product, set price, upload assets
   - Complete

4. **Order visibility**
   - See who bought what
   - Resend access if needed

5. **Zero-thought deployment**
   - Push → live
   - No CMS migrations, no "why did prod break"

Admin should feel like: **"I'm recording reality, not wrestling software."**

**Pain Points to Avoid:**
Based on lived experience with other platforms:
- CMSs that feel heavier than the content itself
- Having to think about hosting, builds, plugins
- Content living separately from products
- "Creator dashboards" bloated with analytics you don't care about
- Having to re-explain yourself everywhere (LinkedIn, CV, portfolio)

The platform should disappear when you use it.

**Success Vision:**
Not more messages - **better ones**.

Primary success:
- Fewer cold applications
- More messages that start with "I spent time on your site and..."
- Conversations that skip basic explanations (employers reference specific essays/projects, collaborators already understand values)

Secondary success:
- Collaborations that feel natural, not transactional
- Course/resource sales that act as credibility proof (not income dependency)

**Important:** Sales are a signal, not the goal. If no one buys, the site can still succeed. If people buy without trust, the site has failed.

---

### Primary Audience: Employers & Hiring Managers

**Who They Are:**
- Startups and scale-ups
- Edtech, product-focused, systems-oriented teams
- Early teams that value builders over credentials
- Roles where thinking + execution matters

**Not optimizing for:**
- Ultra-corporate grad programs
- Resume-only screening funnels
- Pure credentialism

**The site is a filter, not a magnet.**

**Evaluation Mindset:**

**Initial skim (30-45 seconds):**
- Looking for red flags
- Checking if this is "serious" or fluff
- Assessing: is this person real, thoughtful, and capable - or just polished?

**Selective deep-dive (2-3 minutes if hooked):**
- Only if something resonates
- Reading specific essays or project details
- Assessing depth and judgment

**Comparison mode (5-10 minutes if very interested):**
- Against other candidates who all look similar on paper
- Trying to understand: would this person fit our team?

**Discovery Path:**
The site is usually a **second step**, not first touch:
1. **Direct application** - resume → link to site
2. **LinkedIn** - profile → curiosity → site
3. **Referral** - "check this person out" → site
4. **(Rarely) Google**

**Critical Questions (Must Answer Immediately):**
Within the first 30-45 seconds, the site must answer:
1. Who is this person?
2. What do they actually do?
3. Have they built real things?
4. Can I trust their judgment?
5. Is this someone I'd want on my team?

Everything else is secondary.

**What Triggers "We Need to Talk to This Person":**
One or more of these moments:
- They understand your trajectory quickly
- They see proof of initiative, not just compliance
- Your projects have context and outcomes
- Your writing shows independent thinking
- Your site feels calm, confident, and non-performative

**Most importantly:** You don't look like you're trying to impress them - you look like you're building something. That's rare.

---

### Secondary Audiences

**Collaborators / Founders / Operators:**
- Looking for alignment and competence
- More likely to read deeply (essays, principles, project details)
- Asking: "Do our values and approaches align?"
- Discovery: typically via referral or shared networks

**Students / Customers:**
- Evaluating resources and courses for purchase
- Asking: "Is this backed by real experience and outcomes?"
- Need: trust before purchase, professional delivery
- The commerce interaction validates credibility but is not the primary purpose

**Other Builders (Tertiary):**
- Incidental audience
- May observe for inspiration or learning
- Not a design priority

---

### Key Alignment Insight

This platform works because operator and audience want the same thing:

**Nathanael (operator) wants:** Accuracy, not noise
**Employers (audience) want:** Clarity, not hype
**Both want:** A truthful, high-signal representation

That's why the system works even though it's "just" a personal site.

---

## Success Metrics

Since this is a personal operating system (not a traditional product), success is measured through **behavioral signals and outcomes** rather than growth metrics or engagement rates. The platform succeeds when it creates clarity for audiences while disappearing operationally for Nathanael.

### Operator Success Signals (Nathanael)

**A. Employers Understand Quickly**

Success indicators:
- Employers reference specific parts of the site in conversations: "I read your essay on X," "Your MarkPoint breakdown clarified a lot," "I liked how you framed your transition"
- Less explaining in interviews - fewer "let me give you background" moments, more "let's talk about how I'd approach this role"
- Interview questions shift from "What have you done?" to "How would you think about...?"

Proxy metrics:
- Interview calls skip introductory explanation
- First interviews feel like second interviews
- If this happens even a few times, the site is doing its job

**B. Better Quality Opportunities**

Success indicators:
- Fewer random or misaligned inquiries
- More messages that clearly demonstrate they understood your direction and are aligned with your values
- Declining opportunities because they don't fit (not because you're unseen)

Concrete indicators:
- Inbound messages mention specific projects, your philosophy, or your trajectory
- Less time wasted clarifying fit
- Higher acceptance rate of interviews you do take

This is **filter success, not funnel success.**

**C. Reduced Cognitive Load**

The site is working if:
- You stop updating multiple platforms
- You send people one link instead of five
- You feel less anxiety about "representation"
- You trust that your public presence is accurate

Observable behaviors:
- Less tinkering
- Fewer "I should update my LinkedIn" thoughts
- Fewer explanations via DM/email

---

### Audience Success Signals (Employers)

Employers don't measure success consciously - they signal it through behavior.

**A. They Engage Beyond the Homepage**

Behavioral patterns:
- Homepage → About → Work or Writing
- Visiting multiple sections in one session
- Returning to the site before or after an interview

**Interpretation:** They're not just checking you - they're evaluating you.

**B. They Initiate Contact with Context**

Strong signal behaviors:
- Emails referencing specific sections
- LinkedIn messages that show they explored the site
- Recruiters pre-emptively addressing fit: "I think you'd be strong in this role because..."

**Meaning:** The site answered their questions before they asked them.

**C. They Forward Your Site Internally**

Indicators:
- "I shared your site with the team"
- "Others on the team had a look"
- Second interviewers already know your background

**Meaning:** The site is functioning as an internal briefing document. This is extremely high leverage.

---

### Commerce Success Signals

Sales are a signal, not the goal. The signal you care about is: **trust validation.**

**A. Sales as Trust Validation**

Success indicators:
- People buying without aggressive selling
- Purchases occurring after engaging with your content

**This tells you:** "Your proof is sufficient for monetization."

**B. The Right Commerce Metrics**

You care about:
- **Low refund rate** - indicates expectations were set honestly
- **Low support requests** - indicates clarity and quality
- **Repeat purchases** (even small) - indicates trust, not hype

**Conversion rate is secondary.** A low conversion rate with high satisfaction is fine.

**C. Red Flags**

You'd know something is wrong if:
- High sales but high refunds
- Confused customer emails
- Purchases coming from traffic that didn't engage with content

**That would mean:** Trust erosion.

---

### Operational Success Metrics

This is the silent layer. The platform succeeds when it becomes invisible.

**A. It Never Becomes "A Thing to Manage"**

The platform is working if:
- You almost forget it exists operationally
- No firefighting, no surprise downtime, no broken flows

Concrete signs:
- Weeks go by without touching admin
- You only log in when you want to add something

**B. Performance & Reliability**

You care about:
- Fast initial page load (especially homepage)
- No broken links
- No checkout failures
- No lost access or entitlement bugs

**Critical:** Even one visible failure hurts credibility disproportionately.

---

### 6-Month Success Statement

In 6 months, the site is working if:

1. **Employers reference your site unprompted**
2. **You explain yourself less in interviews**
3. **Inbound opportunities feel aligned**
4. **You trust your public representation**
5. **Selling resources feels natural, not awkward**
6. **The platform runs quietly in the background**

**In short:** The site disappears for you, and clarifies you for others.

That's the highest compliment this kind of system can receive.

---

## MVP Scope

### Core Features

The MVP is a **professional identity platform with operational proof** - not a store with a personal page. Commerce exists from day 1 as evidence of execution, not as the primary narrative.

**Public Site (Employer-First)**

**1. Homepage**
- Identity, positioning, proof
- Subtle mention of resources (1 line max, no "Buy now" above the fold)
- Optimized for the 30-45 second employer skim

**2. About**
- Story, trajectory, thinking
- Contextualizes non-linear path (student → tutor → builder → founder)
- Answers "who is this person?" immediately

**3. Work / Portfolio**
- Projects, startups (e.g., MarkPoint), quantified outcomes
- Context and thinking behind each project, not just outputs
- Demonstrates initiative and execution

**4. Writing**
- Essays, reflections, independent thinking
- Employers can assess depth and judgment
- Reinforces identity and values

**5. Resources**
- Separate, clearly labeled page
- Calm framing: "Resources I've created based on tutoring and building experience"
- Professional, not persuasive
- Commerce as infrastructure, not funnel

**Commerce System (Fully Working, But Contained)**

What must work from day 1:
- **Stripe Checkout** (one-time payments only)
- **Order creation** and fulfillment
- **Entitlement granting** (access tied to purchases)
- **Secure file access** (signed URLs with expiration)
- **Purchase confirmation email** (professional, receipt-focused)
- **Admin view of orders** (visibility and support capability)

**Critical:** One clean purchase flow is enough. No urgency, no upsells, no dark patterns.

**Admin System (Minimum But Real)**

Admin must support:
- **Publishing essays** (write → preview → publish, no build steps)
- **Managing projects** (title, description, links, outcomes)
- **Creating/editing products** (product details, pricing, asset uploads)
- **Viewing orders** (who bought what)
- **Resending access** (customer support)

Admin UX should feel like: **"Internal tooling for a serious operation."**

Nothing bloated. Just what's needed to operate professionally.

**Production Infrastructure (Built to Last)**

From day 1:
- **Auth & user accounts** (secure login, password reset)
- **Role-based access control** (admin vs. customer)
- **Database with migrations** (schema versioning, no ad-hoc changes)
- **Observability** (logging, error tracking - even one visible failure hurts credibility)
- **Fast page loads** (especially homepage - first impression matters)
- **Reliable deployment** (push → live, zero surprises)

This is not premature optimization. It's **credibility through execution.**

---

### Out of Scope for MVP

The following are intentionally deferred to preserve focus and avoid bloat:

**Commerce Features (Not Needed Yet):**
- Subscriptions and recurring billing
- Coupons and discount codes
- Product bundles
- Upsells or cross-sells
- Affiliate program
- Advanced analytics or conversion funnels

**Course Features (Can Add Later):**
- Progress tracking for online courses
- Interactive course elements (quizzes, assignments)
- Course completion certificates
- Discussion forums or community features

**Social/Network Features:**
- Comments on essays
- Social sharing integrations
- Newsletter/email capture popups
- User-generated content

**Advanced Admin:**
- Bulk operations
- Detailed analytics dashboards
- A/B testing infrastructure
- Multi-author support

**Rationale:** The MVP proves the core hypothesis: **identity compression + operational proof = better opportunities.** Everything else can be validated and added based on real need, not speculation.

---

### MVP Success Criteria

The MVP is successful if:

**For Employers (Primary Validation):**
- At least 2-3 employers reference the site unprompted in conversations
- Interviews skip introductory explanations
- Inbound messages demonstrate they explored multiple sections

**For Commerce (Trust Validation):**
- At least one purchase occurs without aggressive selling
- Zero refunds or confused customer emails
- Purchase flow works flawlessly (no broken checkout, lost access, or failed emails)

**For Operations (Reliability Validation):**
- Site runs for 30 days with zero downtime
- Admin workflows feel frictionless (weeks go by without touching infrastructure)
- Page load times remain fast under normal traffic

**Decision Point:** If these criteria are met within 3-6 months, the approach is validated and additional features (course progression, advanced commerce) can be added confidently.

---

### Future Vision

If the MVP succeeds, the platform evolves to support:

**Enhanced Commerce:**
- Course subscriptions with progress tracking
- Product bundles and tiered offerings
- Advanced access management (time-based, cohort-based)

**Content Expansion:**
- Long-form case studies and deep dives
- Interactive course elements (quizzes, assignments, feedback loops)
- Expanded startup showcase (MarkPoint and future ventures)

**Platform Capabilities:**
- Newsletter integration (owned audience, not platform-dependent)
- Advanced analytics (user journeys, conversion insights)
- API access for integrations (CRM, analytics tools)

**Ecosystem Growth:**
- Collaborator roles (editors, support team)
- Partner integrations (other educators, tools)
- Scaled operations (automated fulfillment, advanced support tooling)

**Long-Term Positioning:**
The platform becomes **the authoritative source** for Nathanael's identity, proof, thinking, and ventures - growing alongside career trajectory without fragmentation or platform dependency.

**Critical:** Future features are only added when there's demonstrated need, not because they "might be useful." The system grows intentionally, not reactively.

---

### Key Insight: What Employers Infer from Restrained Commerce

When employers see commerce that exists but doesn't dominate, they think:
- "This person has actually sold something"
- "They understand responsibility and delivery"
- "They can build and operate systems"
- "They didn't need permission to do this"

They do NOT think:
- "They're distracted by side hustles"
- "They're trying to be an influencer"

**Because the site hierarchy keeps identity first.**

---

### Framing Note (Critical for Copy)

**Bad framing:**
- "Buy my HSC course"
- "Level up your marks"
- "Limited time"

**Correct framing:**
- "Resources created from real tutoring experience"
- "Used by students I've worked with"
- "Built to be clear, practical, and honest"

This preserves trust. Commerce is evidence, not persuasion.

---
