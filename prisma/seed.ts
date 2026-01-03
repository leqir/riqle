/**
 * Database Seed Script
 *
 * Seeds the database with initial data:
 * - MarkPoint project
 * - Riqle project
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

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
      role: 'Solo Founder',
      roleDetail: `I founded MarkPoint to solve a problem I encountered firsthand as an HSC English tutor: students struggle not with content knowledge, but with knowing what to prioritize and how to structure their thinking under time pressure.

As the sole founder, I own all aspects of the product:
- Product vision and strategy
- Full-stack development (Next.js, TypeScript, Prisma)
- UX design and user research
- Customer acquisition and onboarding
- Technical infrastructure and deployment

I make all product decisions, write all code, and maintain direct contact with users for feedback and iteration.`,
      teamSize: 0,

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
- Solo development means prioritizing ruthlessly—features must directly support core value proposition
- Infrastructure choices optimized for rapid iteration and low maintenance overhead
- Type safety throughout to minimize runtime bugs while working alone

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
The T3 Stack has proven to be an excellent choice for solo development. The type safety across the full stack catches bugs early and enables confident refactoring. tRPC in particular eliminates entire classes of API contract bugs.

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
