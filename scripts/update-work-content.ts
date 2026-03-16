import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find admin user ID
  const adminUser = await prisma.user.findFirst({
    where: { UserRole: { some: { Role: { name: 'admin' } } } },
  });
  const authorId = adminUser?.id ?? null;
  console.log('Admin user ID:', authorId);

  // 1. Update MarkPoint project
  console.log('Updating MarkPoint project...');
  await prisma.project.update({
    where: { slug: 'markpoint' },
    data: {
      description: `AI-powered HSC English platform. Essay marking, full exam generation, ATAR tracking, study type profiling, and competitive AI mode, all built around four companions. Built for students who are tired of waiting four weeks to get "14/20, good effort" back.`,
      role: 'Co-founder, Lead Engineer, Brand and Design',
      outcome: 'Live in beta',
      projectStatus: 'Live in beta',
      overview: `MarkPoint started because I was craving acai.

Tim and I had just finished a gym session and decided to go to Berry Boy in Hurstville, then head to Hurstville Library to study. We ran into his teacher there, Ms. Hong, who used to teach at Sydney Technical High School and now works at NESA.

She told us that HSC English exams are going online in 2027 for Extension 1 and Extension 2, and that NESA is not providing software for schools to trial it. There is a gap. Students need to practice writing under real exam conditions on a screen, and nothing exists for that yet.

That was the idea. Initially just Tim and Ms. Hong. Then Anthony and I got onboarded and we actually started building.

---

MarkPoint is an HSC English platform built around four companions: Chaba the capybara, Nabi the cat, Bami the owl, and Dung-i the panda. Each one has a distinct personality and owns a different part of the student experience inside the app.

The AI is running everything underneath. To the student, it is the companions doing it. That distinction matters because nobody wants to feel like they are being processed by a generic chatbot at 11pm when they are stressed and three weeks out from trials.

Unlike anything built on a general purpose model, MarkPoint's AI has been trained specifically for HSC English through a combination of RAG with a vector database, fine-tuning, and MCP server integration. It has ingested the NESA syllabus, HSC marking criteria, band 6 exemplar essays, real markers notes, and hundreds of curated resources. It knows what a band 6 response actually looks like, what markers are specifically rewarding, and how to generate questions that reflect authentic HSC difficulty. This is not ChatGPT with an HSC prompt on top. It is purpose built from the ground up for this specific exam.

The AI is also not static. It uses your ATAR projections and your study type profile together to personalise every interaction throughout the app. The longer you use it, the more calibrated it becomes to exactly where you are and what you actually need to improve.`,
      roleDetail: `Essay Marking

Submit an essay and get detailed feedback in under 60 seconds. Band prediction, inline sentence-by-sentence commentary, strengths and weaknesses analysis, and specific actionable improvements. The AI also runs automatic quote verification, checking whether your quotes are accurate and from the correct text, and flagging misquotes before they cost you marks in an exam.

The problem it solves is straightforward. You write an essay, wait four weeks, and get "14/20, good effort" back. By then you have already written three more essays reinforcing the exact same mistakes. MarkPoint closes that loop in 60 seconds.


ATAR Calculator

The most detailed ATAR calculator available. Enter your subjects and current marks and get full projections, comparisons against real university cutoff thresholds for your target courses, and commentary from all four companions simultaneously. Each companion responds in character. Chaba is calm and methodical. Nabi is direct and honest. Bami is precise and data driven. Dung-i is grounded and real with you. You do not just get a number. You get four distinct perspectives on what that number means and exactly what to do about it.


Study Type Quiz

Think MBTI but for how you actually study. Answer a short set of questions and receive a full profile covering your study type, your cognitive strengths and weaknesses, how you retain information best, what environments suit you, and which companions you are most compatible with. The kind of result you screenshot and send to your group chat immediately.


Study Lab

This is where the companions live and where the experience compounds over time. Students complete tasks ranging from submitting two essays in a session to reviewing feedback in detail, all structured around rewarding consistent effort rather than raw achievement. Completing tasks unlocks collectible achievement cards tied to real milestones. Submitting an essay at 3am gets you a card. Finishing five consecutive sessions gets you a card. They are not tradeable and do not unlock features. They are honest recognition that you did the work.

The Study Lab also shows your full analytics: essay scores over time, session history, and how you compare against other students who share your study type. You can consult your companions directly here and the AI uses your ATAR projections and study profile to make those conversations specific to where you actually are.


Exams

Take full length HSC English exams inside the app. The AI generates the paper, you sit it, it marks it when you are done. The format is genuinely flexible: choose Paper 1 only, Paper 2 only, a specific module like Module A or Module B, or manually build a custom exam from scratch. Built to mirror real HSC conditions as closely as possible.

If you get stuck mid-exam, the app provides graduated hints the way Dr Du tutoring does it, guiding you toward the answer without just giving it to you. If you exhaust your hints, one of the companions steps in directly as your AI helper to talk you through it. When the exam is done you get a full detailed breakdown of your performance, what you did well, where you lost marks, and exactly how to close the gap.


VS Nabi

The competitive mode. Go head to head against Nabi the cat in an essay or exam at a difficulty level calibrated to your current standing. If your predicted English mark is 88, your difficulty options might be 86, 88, or 90. Nabi adapts to the level you select and pushes back accordingly.

When the match ends you get a full side by side breakdown: what you wrote, what Nabi wrote, where she beat you, where you beat her, and the specific reasons why. It is the most genuinely competitive thing in the app and students engage with it in a way that no streak mechanic or badge system has ever managed to produce. Losing to an AI at your own exam subject is personal. Beating her is satisfying in a way that is hard to replicate.`,
      execution: `We did not land on B2C straight away.

First we tried selling to schools. We ran immediately into compliance walls, procurement cycles, and the reality of what it actually takes to get software into a NSW school system with all the associated regulatory requirements. That was a dead end for an early stage product.

We moved to tutoring centres to gain traction and validation. Most of them wanted selective school content, not HSC English. Wrong market again.

Eventually we admitted that B2C direct to students was where we should have started. The student is the one with the problem. The student is the one sitting at 11pm three weeks out from trials with an essay that is not good enough and a teacher who will not respond until Tuesday. That is the person MarkPoint was built for and who we should have been talking to from day one.

Each pivot cost real time. Each one was a deliberate decision. That is how you find the actual market.`,
      outcomeDetail: `I came in as co-founder and took ownership of the full frontend, brand, and design from scratch.

The UI is the product as much as the features are. Korean 1am study aesthetic: dark backgrounds, warm glow, transparent character videos with rain effects and neon reflections. The visual language of a late night study session that communicates we know where you are before a single word of feedback is delivered. It is not decoration. It is the reason students open the app and feel something before they have done anything.

Tech stack: Next.js 15 App Router, React 19, TypeScript strict mode, Supabase with PostgreSQL and row-level security, GPT-4o-mini as the core AI engine trained through RAG, fine-tuning, and MCP server integration, deployed on Vercel edge network. Full CI/CD pipeline, zero downtime deployments, production grade architecture from the first commit.

I designed the four characters, the gamification system, the collectible card logic, the visual identity, the onboarding flow, and the tone of voice across the entire product. Lowercase copy throughout. No fake cheerleading. "You earned this." Not "Great job!"

I owned every product decision through the pivots: what to cut, what to keep, what the student actually needs at 1am when they are tired and behind and the exam is in three weeks.

---

Live in beta with the first cohort of HSC students onboarding.

Essay marking, ATAR calculator, study type quiz, study lab with gamification and analytics, full HSC exams, and VS Nabi are all shipped and functional. AI personalisation using ATAR and study type data is in active development. The teacher platform and expanded subject coverage are next.

The core loop works: submit, get feedback, improve, compete, repeat.`,
      reflection: `The market tells you the truth if you listen early enough. We spent real time on schools and tutoring centres before admitting B2C was the answer. We should have been talking directly to students from the start.

Aesthetic is a genuine moat. You can copy a feature. You cannot copy a feeling. The students who use MarkPoint describe it as the first study app that feels like it was made for them. That is not something you can replicate by throwing a dark theme on a generic product.

Competition is massively underused in edtech. VS Nabi works because students are naturally competitive and most study tools ignore that completely. Giving someone a real opponent they can beat or lose to is more motivating than any streak mechanic or participation badge ever invented.

AI should disappear into the experience. The companions work because students interact with Chaba and Nabi, not with an API. Putting a real character on the technology changes everything about how people relate to it.

Owning design and engineering together removes an entire layer of friction. When the person who designed the component is the same person building it, every decision is faster and the product stays coherent end to end.`,
      updatedAt: new Date(),
    },
  });
  console.log('MarkPoint updated.');

  // 2. Update Riqle project
  console.log('Updating Riqle project...');
  await prisma.project.update({
    where: { slug: 'riqle' },
    data: {
      description: `This site. Not just a portfolio. A fully functional platform with authentication, payments via Stripe, content delivery, tutoring bookings, and resource management. Built from scratch as a real product, not a static page with links.`,
      role: 'Solo developer',
      outcome: 'In production',
      projectStatus: 'In production',
      overview: `Riqle is my personal platform. Not a portfolio site with links and a contact form. A fully functional product with authentication, payments, content delivery, and resource management built from scratch.

The distinction matters because most developer portfolio sites are static. They show what someone has built elsewhere. Riqle is itself the thing being built. Every feature on the site is something I designed, engineered, shipped, and maintain in production.`,
      roleDetail: `Tech stack: Next.js 15 App Router, TypeScript strict mode, tRPC for end-to-end type safe APIs, Prisma ORM, PostgreSQL, NextAuth.js v5 for authentication, Stripe for payments and subscription management, Vercel Blob for file storage, Inngest for background jobs and event-driven workflows, Resend for transactional email, and Upstash Redis for caching and rate limiting. Deployed on Vercel.

Features shipped:

Authentication: full sign up, login, session management, and account flows via NextAuth.js v5.

Payments: Stripe integration with product listings, checkout, and purchase history. Resources can be free or paid. Customers get access to purchased content through their account.

Content delivery: resource library with browsing, filtering by category, and individual resource pages. Built to support HSC resources, articles, and other content types.

Tutoring: booking infrastructure for private English tutoring with years 10 to 12.

Writing: a publishing system for articles and essays with individual post pages and a browsable index.

Changelog: a running record of what has been built and shipped on the site over time.

The entire stack is type safe end to end. tRPC means the API layer shares types with the frontend so breaking changes surface at compile time, not in production. Prisma handles schema management and migrations. Inngest handles anything that should not block a request, background processing, webhook handling, scheduled jobs.`,
      execution: `I could have used an existing CMS, a Shopify store, and a separate blog platform. That would have been faster to set up and harder to own.

Building the full stack myself meant every decision was deliberate. The schema reflects how I actually think about the data. The API is exactly what the frontend needs. The payment flow works the way I want it to work. Nothing is a workaround for someone else's abstraction.

It also meant I could use the site itself as a proving ground. Every pattern I implement here, auth flows, background jobs, payment webhooks, I understand end to end because I built it from scratch. That compounds over time in a way that using pre-built tools does not.`,
      outcomeDetail: `In production. Authentication, payments, content delivery, and tutoring bookings are all live.

Resources and writing sections are being populated. Ordo and Incline My Heart will be published here when they are ready.`,
      reflection: null,
      updatedAt: new Date(),
    },
  });
  console.log('Riqle updated.');

  // 3. Upsert Ordo project
  console.log('Upserting Ordo project...');
  await prisma.project.upsert({
    where: { slug: 'ordo' },
    update: {
      title: 'Ordo',
      description: 'Coming soon.',
      role: '',
      outcome: '',
      projectStatus: 'Coming soon',
      overview: 'Coming soon.',
      roleDetail: '',
      execution: '',
      outcomeDetail: '',
      reflection: null,
      displayOrder: 3,
      published: true,
      updatedAt: new Date(),
    },
    create: {
      id: 'proj_ordo',
      slug: 'ordo',
      title: 'Ordo',
      description: 'Coming soon.',
      role: '',
      outcome: '',
      projectStatus: 'Coming soon',
      overview: 'Coming soon.',
      roleDetail: '',
      execution: '',
      outcomeDetail: '',
      reflection: null,
      screenshots: [],
      diagrams: [],
      relatedPostSlugs: [],
      relatedStartupSlugs: [],
      featured: false,
      displayOrder: 3,
      published: true,
      updatedAt: new Date(),
      ...(authorId ? { authorId } : {}),
    },
  });
  console.log('Ordo upserted.');

  // 4. Upsert Incline My Heart project
  console.log('Upserting Incline My Heart project...');
  await prisma.project.upsert({
    where: { slug: 'incline-my-heart' },
    update: {
      title: 'Incline My Heart',
      description: 'A devotional. Coming soon.',
      role: '',
      outcome: '',
      projectStatus: 'Coming soon',
      overview: 'A devotional. Coming soon.',
      roleDetail: '',
      execution: '',
      outcomeDetail: '',
      reflection: null,
      displayOrder: 4,
      published: true,
      updatedAt: new Date(),
    },
    create: {
      id: 'proj_incline',
      slug: 'incline-my-heart',
      title: 'Incline My Heart',
      description: 'A devotional. Coming soon.',
      role: '',
      outcome: '',
      projectStatus: 'Coming soon',
      overview: 'A devotional. Coming soon.',
      roleDetail: '',
      execution: '',
      outcomeDetail: '',
      reflection: null,
      screenshots: [],
      diagrams: [],
      relatedPostSlugs: [],
      relatedStartupSlugs: [],
      featured: false,
      displayOrder: 4,
      published: true,
      updatedAt: new Date(),
      ...(authorId ? { authorId } : {}),
    },
  });
  console.log('Incline My Heart upserted.');

  console.log('All done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
