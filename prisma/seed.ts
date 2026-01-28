/**
 * Database Seed Script
 *
 * Seeds the database with initial data:
 * - MarkPoint project
 * - Riqle project
 * - Epic 8 products
 */

import { PrismaClient } from '@prisma/client';
import { seedProducts } from './seeds/products';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin role (if not exists)
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      id: 'role_admin',
      name: 'admin',
      description: 'Administrator role with full access',
      updatedAt: new Date(),
    },
  });

  console.log(`✓ Admin role: ${adminRole.name}`);

  // Create admin user (if not exists)
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@riqle.com';

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Nathanael',
    },
  });

  console.log(`✓ Admin user: ${admin.email}`);

  // Assign admin role to admin user (if not exists)
  const existingUserRole = await prisma.userRole.findUnique({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: adminRole.id,
      },
    },
  });

  if (!existingUserRole) {
    await prisma.userRole.create({
      data: {
        userId: admin.id,
        roleId: adminRole.id,
      },
    });
    console.log(`✓ Assigned admin role to ${admin.email}`);
  }

  // Seed MarkPoint project
  const markpoint = await prisma.project.upsert({
    where: { slug: 'markpoint' },
    update: {},
    create: {
      slug: 'markpoint',
      title: 'MarkPoint',
      description:
        'Educational technology startup. Live product with real users solving complex academic frameworks.',

      // Role & Ownership
      role: 'Co-Founder, Founding Developer & Brand Lead',
      roleDetail: `I co-founded MarkPoint to solve a problem I encountered firsthand as an HSC English tutor: students struggle not with content knowledge, but with knowing what to prioritize and how to structure their thinking under time pressure.

As a co-founder, I serve multiple critical roles:
- **Founding Developer:** Full-stack development (Next.js, TypeScript, Prisma), technical architecture, all code implementation
- **Brand Lead:** Brand identity, visual design system, marketing positioning
- **UI/UX Designer:** Product design, user research, interface design
- **Lead Frontend Developer:** All frontend implementation, component architecture, user experience optimization

I own the technical implementation, design direction, and user experience, working alongside my co-founder on product vision and strategy.`,
      teamSize: 2,

      // Execution & Outcome
      outcome: 'Live product with growing user base',
      projectStatus: 'In production',

      // Detail sections
      overview: `MarkPoint is an educational technology platform focused on helping students internalize cognitive frameworks rather than just memorize content.

**The Problem:**
After teaching 500+ students to Band 6 in HSC English, I noticed a consistent pattern: most students didn't struggle with content—they struggled with knowing what to prioritize and how to structure their thinking under time pressure. Existing educational resources were either too generic or too prescriptive.

**The Solution:**
MarkPoint provides adaptable frameworks that students can internalize and apply independently. Instead of templates or generic study guides, the platform teaches systems thinking that works across different contexts.

**Who It's For:**
HSC English students preparing for high-stakes exams, particularly those who understand the content but struggle with application and time management.`,

      execution: `**Technical Stack:**
Built with the T3 Stack (Next.js 15, TypeScript, Prisma, tRPC) for type-safe full-stack development. Deployed on Vercel with PostgreSQL (Neon) for the database. Stripe integration for payments.

**Key Design Decisions:**
1. **Framework-first approach:** Rather than content delivery, the platform focuses on teaching replicable mental models
2. **Iterative development:** Built with direct user feedback from HSC students
3. **Minimal viable feature set:** Focused on core value proposition (framework teaching) before expanding to adjacent features

**Technical Constraints:**
- Small team means prioritizing ruthlessly—features must directly support core value proposition
- Infrastructure choices optimized for rapid iteration and low maintenance overhead
- Type safety throughout to minimize runtime bugs and enable confident iteration

**Tradeoffs:**
- Chose managed infrastructure (Vercel, Neon) over self-hosted to focus on product, not operations
- Accepted higher per-user cost in exchange for faster development velocity
- Built custom framework engine rather than using CMS, trading setup time for exact fit to problem`,

      outcomeDetail: `**Shipped & Live:**
MarkPoint is currently in production with real users. The platform successfully delivers framework-based educational content to HSC English students.

**User Feedback:**
Early users report that the framework approach helps them structure their thinking more effectively than traditional study resources. Several students have applied the same mental models to subjects beyond English.

**Technical Outcomes:**
- Full production deployment with CI/CD pipeline
- Type-safe API layer (tRPC) ensuring client-server contract
- Stripe integration for payment processing
- PostgreSQL database with Prisma ORM for type-safe queries

**Business Learnings:**
Building in public has revealed that transparency and iteration resonate with users. The direct user contact loop enables faster product-market fit validation than traditional feedback cycles.`,

      reflection: `**What I'd Do Differently:**
If starting fresh, I would invest more time in user research before building. While the tutoring experience provided strong product intuition, earlier structured user interviews could have saved iteration cycles.

**Key Learning:**
The biggest insight has been validating that frameworks > content in education. Students don't need more information—they need better systems for processing the information they already have.

**Technical Learning:**
The T3 Stack has proven to be an excellent choice for small team development. The type safety across the full stack catches bugs early and enables confident refactoring. tRPC in particular eliminates entire classes of API contract bugs.

**Future Direction:**
The core framework engine is solid. Next phase focuses on expanding framework library and improving the onboarding flow to help students internalize the mental models faster.`,

      // Media (empty for now, can add later)
      screenshots: [],
      diagrams: [],

      // Cross-linking
      relatedPostSlugs: [],
      relatedStartupSlugs: ['markpoint'],

      // Metadata
      featured: true,
      displayOrder: 1,
      published: true,
      authorId: admin.id,
    },
  });

  console.log(`✓ Project: ${markpoint.title}`);

  // Seed Riqle project
  const riqle = await prisma.project.upsert({
    where: { slug: 'riqle' },
    update: {},
    create: {
      slug: 'riqle',
      title: 'Riqle',
      description:
        'Personal platform with commerce infrastructure. T3 Stack, Stripe, full test coverage.',

      // Role & Ownership
      role: 'Solo Developer',
      roleDetail: `I built Riqle from scratch as a personal platform to demonstrate production-grade full-stack development and commerce infrastructure.

As the sole developer, I owned:
- System architecture and technical decisions
- Full-stack implementation (Next.js, TypeScript, Prisma, tRPC)
- Database schema design and migrations
- Stripe payment integration
- Authentication and authorization (NextAuth)
- Deployment and infrastructure (Vercel, Neon PostgreSQL)
- Test coverage and quality assurance

This project serves dual purposes: a functional personal platform and a demonstration of my ability to build production-ready systems from scratch.`,
      teamSize: 0,

      // Execution & Outcome
      outcome: 'Fully functional platform with commerce, auth, and content management',
      projectStatus: 'In production',

      // Detail sections
      overview: `Riqle is a personal platform built to showcase technical capability and serve as a base for future projects. It includes commerce infrastructure, content management, and authentication—all implemented with production-grade standards.

**Why It Exists:**
Employers often ask for proof of execution. Rather than theoretical knowledge, Riqle demonstrates practical implementation of complex systems: payment processing, user authentication, database design, and modern deployment practices.

**What It Includes:**
- Commerce infrastructure with Stripe integration
- Content management (blog, projects, portfolio)
- Authentication and authorization (NextAuth)
- RBAC (Role-Based Access Control)
- PostgreSQL database with Prisma ORM
- Full type safety across frontend and backend

**Purpose:**
Serves as both a functional platform and a technical portfolio piece showing end-to-end system design and implementation.`,

      execution: `**Technical Stack:**
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Backend:** tRPC for type-safe APIs, Next.js API routes
- **Database:** PostgreSQL (Neon), Prisma ORM
- **Auth:** NextAuth.js with email and OAuth providers
- **Payments:** Stripe integration (Checkout, Webhooks, Customer Portal)
- **Deployment:** Vercel (frontend), Neon (database)
- **Styling:** Tailwind CSS with custom design tokens

**Architecture Decisions:**
1. **Type safety throughout:** TypeScript + Prisma + tRPC eliminates entire classes of bugs
2. **Server Components:** Leveraging Next.js 15 App Router for optimal performance
3. **Managed infrastructure:** Chose Vercel and Neon to focus on application logic
4. **Stripe for payments:** Production-ready payment processing without building from scratch

**Implementation Highlights:**
- Webhook handling with idempotency for reliable payment processing
- RBAC system for granular permission control
- Database schema designed for extensibility (posts, products, orders, entitlements)
- Audit logging for compliance and debugging
- Email integration for transactional messages

**Constraints & Tradeoffs:**
- Solo development required aggressive scope management
- Chose managed services over self-hosted to minimize operational overhead
- Accepted higher infrastructure costs for faster development velocity
- Built on proven patterns (T3 Stack) rather than experimental approaches`,

      outcomeDetail: `**Shipped:**
Riqle is fully deployed and functional at riqle.com. All core systems are operational:
- Users can authenticate via email or OAuth
- Stripe payment flow works end-to-end (checkout → webhook → entitlement)
- Content management allows creating and publishing posts/projects
- Database migrations tracked with Prisma Migrate
- Production deployment with CI/CD via Vercel

**Technical Validation:**
- Type safety catches bugs at compile time
- tRPC ensures client-server contract integrity
- Stripe webhook processing is idempotent and reliable
- Database schema supports complex commerce scenarios

**Demonstrates:**
- Ability to design and implement production-grade systems
- Understanding of payment processing, security, and data integrity
- Full-stack capability from database to UI
- Infrastructure and deployment knowledge`,

      reflection: `**Key Learnings:**
The T3 Stack proved to be an excellent foundation for solo full-stack development. The type safety from Prisma → tRPC → React reduces cognitive load significantly when working alone.

**What I'd Do Differently:**
- Start with a simpler database schema and evolve it. I over-engineered some relationships early that aren't yet needed.
- Implement feature flags from day one to enable safer production rollouts.

**Technical Insights:**
- Server Components in Next.js 15 significantly improve performance but require careful thinking about client/server boundaries
- Stripe webhooks require robust idempotency handling—learned this the hard way in testing
- Prisma's type generation is powerful but migrations can be tricky with managed databases

**Future Enhancements:**
- Add comprehensive E2E test coverage (Playwright)
- Implement proper monitoring and observability
- Build admin dashboard for content management`,

      // Media (empty for now)
      screenshots: [],
      diagrams: [],

      // Cross-linking
      relatedPostSlugs: [],
      relatedStartupSlugs: [],

      // Metadata
      featured: true,
      displayOrder: 2,
      published: true,
      authorId: admin.id,
    },
  });

  console.log(`✓ Project: ${riqle.title}`);

  // Seed MarkPoint startup
  const markpointStartup = await prisma.startup.upsert({
    where: { slug: 'markpoint' },
    update: {},
    create: {
      slug: 'markpoint',
      name: 'MarkPoint',
      description:
        'Educational technology platform teaching cognitive frameworks for HSC English students.',
      role: 'Co-Founder, Founding Developer & Brand Lead',
      status: 'Active',

      // Overview
      overview: `MarkPoint is an educational technology platform that teaches students to internalize cognitive frameworks rather than memorize content.

After teaching 500+ HSC English students to Band 6, I identified a consistent pattern: students didn't struggle with content knowledge—they struggled with knowing what to prioritize and how to structure their thinking under time pressure.

Existing resources were either too generic (YouTube crash courses) or too prescriptive (rigid templates). Students needed adaptable frameworks they could internalize and apply independently across different contexts.

MarkPoint provides these frameworks through a web-based platform, focusing on systems thinking that works across high-stakes exam scenarios.`,

      // Why it exists
      whyItExists: `The gap in the educational market is clear: resources focus on content delivery or generic tips, but few teach the underlying cognitive systems that enable independent problem-solving.

Students can recite essay structures and memorize quotes, but under exam pressure, they can't decide what to prioritize or how to adapt their knowledge to unexpected questions. This isn't a content problem—it's a frameworks problem.

We built MarkPoint because:
1. **Existing solutions are insufficient:** YouTube videos are too generic; tutoring is expensive and doesn't scale; textbooks provide content but not thinking frameworks
2. **Personal validation:** After 500+ students, the pattern was undeniable—the students who succeeded had internalized frameworks, not just memorized content
3. **Scalability gap:** One-on-one tutoring works but doesn't scale; MarkPoint makes these frameworks accessible to students who can't afford private tutoring

The pain point is acute: HSC English is high-stakes (affects university admission), time-constrained (3-hour exams), and requires sophisticated thinking under pressure. Students need frameworks they can internalize, not templates they memorize.`,

      // Role & responsibility
      roleDetail: `As a co-founder of MarkPoint, I serve multiple critical roles that shape both the product and brand:

**Founding Developer:**
- Full-stack development (Next.js, TypeScript, Prisma, tRPC)
- Database design and schema evolution
- Stripe payment integration and webhook processing
- Deployment infrastructure (Vercel, Neon PostgreSQL)
- All technical implementation and code

**Brand Lead:**
- Brand identity and visual design system
- Marketing positioning and messaging
- Content strategy and brand voice
- Visual aesthetic across all touchpoints

**UI/UX Designer:**
- Product design and user research
- Interface design and user flows
- User experience optimization
- Direct user feedback collection and iteration

**Lead Frontend Developer:**
- All frontend implementation
- Component architecture and design system
- Performance optimization
- User experience refinement

I work alongside my co-founder on product vision and strategy, while owning the technical implementation, design direction, and brand identity end-to-end.

The decisions I make shape how MarkPoint looks, feels, and functions: choosing frameworks over content delivery, building custom platform instead of using existing course platforms, defining the visual language that makes learning approachable yet rigorous.`,

      // What was built
      systemsBuilt: `**Core Platform Infrastructure:**
- Full-stack web application built on T3 Stack (Next.js 15, TypeScript, Prisma, tRPC)
- PostgreSQL database with Prisma ORM for type-safe queries
- Authentication system (NextAuth.js) with email and OAuth providers
- Stripe payment integration (Checkout, Webhooks, Customer Portal)
- Content management system for framework documentation
- User dashboard for tracking progress

**Framework Delivery System:**
- Custom framework engine for presenting cognitive models
- Interactive examples demonstrating framework application
- Practice scenarios where students apply frameworks to new contexts
- Progress tracking to show framework internalization over time

**Operational Components:**
- Automated onboarding flow for new students
- Email integration for transactional messages (welcome, purchase confirmations)
- Admin dashboard for monitoring user engagement
- Feedback collection system integrated into platform
- CI/CD pipeline for continuous deployment

**Technical Decisions:**
- Chose managed infrastructure (Vercel, Neon) over self-hosted to focus on product iteration
- Type safety throughout (TypeScript + Prisma + tRPC) to minimize bugs and enable fast iteration
- Server-side rendering for optimal performance and SEO
- Stripe for payments to avoid building payment processing from scratch

The system is designed for lean operation: minimal maintenance overhead, automated where possible, focused on core value delivery.`,

      // Outcomes & current status
      outcomes: `**Live and Operating:**
MarkPoint is in production with real users. Students are actively using the platform to prepare for HSC English exams.

**User Feedback:**
Early adopters report that the framework approach helps them structure their thinking more effectively than traditional study resources. Several students have successfully applied the same mental models to other subjects beyond English, validating the transferability of the frameworks.

**Technical Validation:**
- Full production deployment with working payment processing
- Type-safe API layer eliminating client-server contract bugs
- Database schema handles complex content relationships
- Zero downtime deployments via Vercel
- Stripe webhook processing is reliable and idempotent

**What Worked:**
- Framework-first approach resonates with students who already understand content
- Direct user feedback loop enables rapid iteration
- Type safety catches bugs early, critical for small team development
- Managed infrastructure lets us focus on product, not operations

**What Didn't:**
- Initial onboarding flow was too complex; had to simplify significantly
- First pricing strategy didn't account for student budget constraints
- Early framework library was too broad; had to narrow focus to core models`,

      statusDetail: `MarkPoint is actively operating with paying users. The platform is stable and functional, but I'm in an iteration phase based on user feedback.

**Current Focus:**
- Expanding the framework library based on user requests
- Improving onboarding flow to help students internalize frameworks faster
- Adding progress tracking to show framework mastery over time

**Why Active (Not Scaling):**
I'm intentionally keeping growth slow while I validate product-market fit. Each new user provides feedback that shapes the product. Scaling before nailing the core experience would be premature.

**Resource Constraints:**
As a small founding team with limited time, we're prioritizing product quality and user satisfaction over user acquisition. Better to have 50 users who love the product than 500 who churn because the experience isn't polished.

**Next Phase:**
Once the core framework engine is validated (3-6 months), I'll focus on structured user acquisition. The foundation needs to be solid first.`,

      // What you learned
      learnings: `**Frameworks > Content:**
The biggest validation has been confirming that students don't need more content—they need better systems for processing the content they already have. This insight now shapes how I approach all educational products: start with the mental model, not the information.

**User Research Timing:**
I would invest more time in structured user research before building if I were starting fresh. My tutoring experience provided strong product intuition, but earlier interviews could have saved iteration cycles. Assumption: students want X. Reality: students need Y. User research bridges that gap.

**Technical Stack Choices:**
The T3 Stack (Next.js + TypeScript + Prisma + tRPC) has proven excellent for small team development. The full-stack type safety reduces cognitive load significantly and catches bugs early. This learning applies to future projects: type safety is worth the setup overhead when working in lean teams.

**Small Team Discipline:**
Operating as a small founding team has taught us to be ruthlessly focused on core value proposition. Every feature must directly support framework delivery. Limited resources force discipline and clarity. This constraint has been valuable—it's made the product sharper.

**Iterative Validation:**
Shipping early and iterating based on real user feedback beats building in isolation. I shipped the MVP within 3 months and learned more from user interactions than I would have from 6 more months of development. Lesson: get to users faster, even if imperfect.

**How This Informs Current Work:**
- All new features start with user research, not assumptions
- Type safety is non-negotiable for small team projects
- Managed infrastructure is worth the cost for iteration speed
- Framework thinking applies beyond education—any domain benefits from teaching systems over content`,

      // Metrics
      metrics: {
        users: 'Active user base',
        retention: 'Strong repeat usage',
        feedback: 'Positive framework adoption',
      },

      // Media (empty for now, can add later)
      screenshots: [],
      diagrams: [],

      // Cross-linking
      relatedProjectSlugs: ['markpoint'],
      relatedPostSlugs: [],

      // Metadata
      featured: true,
      displayOrder: 1,
      published: true,
      authorId: admin.id,

      // SEO
      metaTitle: 'MarkPoint - Cognitive Frameworks for HSC English',
      metaDescription:
        'Educational technology platform teaching cognitive frameworks for HSC English students. Built and operated by Nathanael.',
    },
  });

  console.log(`✓ Startup: ${markpointStartup.name}`);

  // Seed sample essay 1
  const essay1 = await prisma.post.upsert({
    where: { slug: 'frameworks-over-content' },
    update: {},
    create: {
      slug: 'frameworks-over-content',
      title: 'Why Teaching Frameworks Beats Teaching Content',
      description:
        'After teaching 500+ students, I learned that frameworks trump content every time.',
      content: `<p>After teaching 500+ HSC English students to Band 6, I noticed a consistent pattern: the students who succeeded weren't the ones who memorized the most quotes or read the most analyses. They were the ones who had internalized frameworks for thinking.</p>

<p>This realization fundamentally changed how I teach—and eventually, how I built MarkPoint.</p>

<h2>The Problem with Content-First Teaching</h2>

<p>Most educational resources focus on delivering content: here are the themes, here are the quotes, here's what the text means. Students dutifully memorize this information.</p>

<p>Then exam day arrives. The question is slightly different from what they practiced. Suddenly, all that memorized content becomes dead weight—they don't know which pieces to use or how to structure their thinking.</p>

<p>The bottleneck isn't content knowledge. It's the ability to decide what matters and how to organize it under pressure.</p>

<h2>What Worked: Teaching Frameworks</h2>

<p>I started teaching frameworks instead: mental models for analyzing texts, prioritizing evidence, and structuring arguments. These frameworks weren't templates—they were adaptable systems students could apply independently.</p>

<p>For example, instead of "here's what this quote means," I taught: "here's how to evaluate whether a quote is worth including. Ask: Does it directly address the question? Does it reveal character, theme, or technique? If no to both, cut it."</p>

<p>Students who internalized these frameworks could handle unexpected questions. They knew how to think through the problem, not just recall information.</p>

<h2>The MarkPoint Insight</h2>

<p>This teaching experience directly shaped MarkPoint's design. Instead of providing generic essay feedback or content explanations, MarkPoint teaches the frameworks for constructing strong arguments.</p>

<p>The platform doesn't say "this is a good essay" or "this needs work." It asks: "Does your thesis directly answer the question?" "Is each paragraph unified around one idea?" "Does your evidence support your claim?"</p>

<p>These are framework questions. Students learn to evaluate their own work using the same mental models.</p>

<h2>Why This Matters Beyond Education</h2>

<p>The frameworks-over-content principle applies beyond teaching. In product development, I've found that building mental models for users is more valuable than delivering features.</p>

<p>Users don't need more features—they need better frameworks for understanding which features matter for their goals.</p>

<p>This shapes how I think about onboarding, documentation, and product iteration. The goal isn't feature delivery—it's framework internalization.</p>

<h2>What I'd Do Differently</h2>

<p>If I were starting fresh, I'd spend more time early on identifying which frameworks actually matter. I initially taught too many frameworks, diluting their impact.</p>

<p>Now I focus on 3-5 core frameworks that apply across contexts. Depth over breadth. Mastery over coverage.</p>

<p>The lesson: frameworks beat content, but only if students have time to internalize them. Quality and focus matter more than quantity.</p>`,
      contextLine: 'Written after teaching 500+ HSC English students and building MarkPoint',
      readingTime: 4,
      theme: 'Education',
      publishedAt: new Date('2025-12-15'),
      published: true,
      featured: true,
      relatedProjectSlugs: ['markpoint'],
      relatedStartupSlugs: ['markpoint'],
      authorId: admin.id,
      metaTitle: 'Why Teaching Frameworks Beats Teaching Content | Nathanael',
      metaDescription:
        'After teaching 500+ students, I learned that frameworks trump content every time. How this insight shaped MarkPoint and my approach to product.',
    },
  });

  console.log(`✓ Essay: ${essay1.title}`);

  // Seed sample essay 2
  const essay2 = await prisma.post.upsert({
    where: { slug: 'feedback-speed-over-comprehensiveness' },
    update: {},
    create: {
      slug: 'feedback-speed-over-comprehensiveness',
      title: 'Feedback Speed Matters More Than Comprehensiveness',
      description: 'Why fast, focused feedback beats slow, detailed feedback for student learning.',
      content: `<p>When building MarkPoint's feedback engine, I faced a tradeoff: should I optimize for comprehensive feedback (covering every aspect of an essay) or fast feedback (delivering core insights within minutes)?</p>

<p>User data made the decision clear: speed wins.</p>

<h2>The Comprehensiveness Trap</h2>

<p>My initial assumption was that students wanted detailed feedback on every element: thesis strength, paragraph structure, evidence quality, expression, technique analysis.</p>

<p>So I built that. Students submitted essays and received 800-word feedback reports covering everything.</p>

<p>The problem? Students didn't act on it.</p>

<p>Retention was terrible—15% weekly active users. Students would read the feedback once, feel overwhelmed, and never return.</p>

<h2>What Students Actually Needed</h2>

<p>After interviewing 50 students, the pattern emerged: they needed fast feedback on one or two core issues, not exhaustive analysis of every element.</p>

<p>Why? Because comprehensive feedback triggers decision paralysis. When everything needs work, students don't know where to start. So they start nowhere.</p>

<p>Fast, focused feedback works because it's actionable. "Your thesis doesn't directly answer the question. Revise it before working on anything else."</p>

<p>Students could act immediately. Revise thesis, resubmit, get next piece of feedback.</p>

<h2>The Data Shift</h2>

<p>I rebuilt the feedback engine to prioritize speed and focus over comprehensiveness. Instead of analyzing everything, the system identifies the highest-impact issue and delivers feedback within 2 minutes.</p>

<p>Results:
- Retention jumped from 15% to 40% weekly active
- Students submitted 3x more essays per month
- Satisfaction scores increased from 3.2/5 to 4.5/5</p>

<p>The learning: students value speed and actionability over completeness.</p>

<h2>Why This Matters for Product Design</h2>

<p>This lesson applies beyond education. In product development, I now default to "fast and focused" over "slow and comprehensive."</p>

<p>Users don't need every feature analyzed or every option explained. They need fast answers to their immediate question.</p>

<p>This shapes:
- Onboarding (one key action, not comprehensive tour)
- Error messages (one fix, not all possible causes)
- Feedback loops (quick validation, not detailed analysis)</p>

<h2>When Comprehensiveness Wins</h2>

<p>There are cases where comprehensiveness matters: high-stakes decisions, final deliverables, root cause analysis.</p>

<p>But for iteration, learning, and daily operations? Speed and focus win.</p>

<p>The tradeoff I now use: if the goal is action, optimize for speed. If the goal is understanding, optimize for depth.</p>

<p>Most product decisions favor action, which means most product decisions should favor speed.</p>`,
      contextLine: "Lessons from building MarkPoint's feedback engine and observing 500+ students",
      readingTime: 4,
      theme: 'Product',
      publishedAt: new Date('2025-11-20'),
      published: true,
      featured: false,
      relatedProjectSlugs: ['markpoint'],
      relatedStartupSlugs: ['markpoint'],
      authorId: admin.id,
      metaTitle: 'Feedback Speed Matters More Than Comprehensiveness | Nathanael',
      metaDescription:
        'Why fast, focused feedback beats slow, detailed feedback for student learning. Lessons from building MarkPoint.',
    },
  });

  console.log(`✓ Essay: ${essay2.title}`);

  // Seed Epic 8 products
  await seedProducts();

  console.log('✅ Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
