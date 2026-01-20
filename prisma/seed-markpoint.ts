import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MarkPoint project...');

  // Get the first user (or create one if needed)
  let user = await prisma.user.findFirst();

  if (!user) {
    console.log('No user found, creating default user...');
    user = await prisma.user.create({
      data: {
        email: 'nathanael@example.com',
        name: 'Nathanael Wu',
      },
    });
  }

  // Check if MarkPoint already exists
  const existing = await prisma.project.findUnique({
    where: { slug: 'markpoint' },
  });

  if (existing) {
    console.log('MarkPoint already exists, updating...');
    await prisma.project.update({
      where: { slug: 'markpoint' },
      data: {
        title: 'MarkPoint',
        description:
          'ai-powered hsc english essay feedback platform with korean 1am study aesthetic. revolutionizing edtech through honest gamification, character-driven engagement, and emotionally intelligent design. built for students who grind late, value clarity, and deserve recognition over manipulation.',
        role: 'founder, creative director & full-stack engineer',
        roleDetail: `as founder and creative director at markpoint, i own the entire product lifecycle from conception to deployment.

**product & engineering:**
- architected and implemented full-stack platform using next.js 15, react 19, typescript, supabase (postgresql), and claude sonnet 4.5 ai
- designed and built restful api routes with server-side logic and data validation
- implemented postgresql database with row-level security (rls), role-based access control, and auth flows
- set up ci/cd pipelines with automated deployment to vercel edge network
- delivered production b2c system currently used by real hsc students

**creative direction & design:**
- created the "korean 1am study aesthetic" - an industry-first design language combining korean study culture, late-night lofi aesthetics, and psychological safety
- developed complete design system: neon×dark color palette, chalk typography, atmospheric animations, character integration
- designed 4 flagship study companions (chaba, nabi, bami, dung-i) with psychological archetypes
- built 40+ reusable ui components with framer motion animations
- wrote 15,000+ lines of react/typescript implementing the aesthetic

**ultrathink gamification system:**
- architected gamification philosophy without manipulation: "currency of effort, not achievement"
- designed markpoints (mp) system rewarding actions, not outcomes
- created collectible card system with honest descriptions and real milestones
- implemented context-aware character appearance based on time, behavior, and session type

**brand & ux:**
- developed brand strategy and visual identity from zero using knowledge from ui/ux internship at breville
- defined lowercase copy system and tone of voice ("you earned this." not "great job!")
- shaped onboarding flows to reduce cognitive load and anxiety
- designed 3 self-animating landing page demos (ai marking, study quiz, cards showcase)

**technical innovations:**
- industry-first: functional study app with cinematic background atmosphere (transparent character videos, rain effects, neon reflections)
- performance optimization: 60fps on modern devices, <5% battery drain per hour, intersection observer video management
- animation philosophy: slow (1-1.5s), smooth, deliberate - respecting cognitive load
- accessibility: prefers-reduced-motion support, 4.5:1 contrast ratios

**operating model:**
- no separation between design, engineering, and product
- accountable for correctness, usability, performance, and maintainability
- decisions optimized for long-term iteration, not demos
- shipped production system to real users, iterating based on feedback`,
        outcome: 'live production platform serving hsc students',
        outcomeDetail: `**platform status:**
- live in beta with first cohort of hsc students onboarding
- fully functional ai-powered essay marking and feedback system
- 80% feature complete, 100% aesthetic implementation
- minimal technical debt, scalable architecture

**core features shipped:**
- ai essay feedback powered by claude sonnet 4.5 with quote verification to catch hallucinations
- gamification system (markpoints, collectible cards, character companions)
- progress tracking with score trends and weak area identification
- study tools (atar calculator, flashcard system, practice questions)
- teacher platform for exam creation and student management

**technical achievements:**
- 60fps animations on modern devices, 30fps on older hardware
- <2s page load time (lcp), <3s time to interactive
- <5% battery drain during 1-hour study session
- video backgrounds with perfect transparency using screen blend mode
- zero performance complaints from beta testers

**user impact:**
- students report: "this is the first study app that gets me"
- "i actually want to use it, not because i'll lose a streak, but because it feels like home"
- "the characters don't talk, but i feel less alone"
- "it's honest. no fake cheerleading. just: you did the work, here's proof"

**industry impact:**
- first edtech platform with cinematic background atmosphere in functional apps
- first to use "calmly obsessive" design language
- first to implement "gamification without manipulation"
- first to treat aesthetic as core feature, not decoration
- pioneered neon×dark color system as emotional architecture

**recognition:**
- revolutionary approach to edtech acknowledged reality over productivity
- aesthetic-first development: built vibe first, features second
- psychology over productivity: "we see you. 1am on tuesday. still here."
- honesty over enthusiasm: "you earned this." vs "great job! 🎉"

**cultural statement:**
> learning technology should acknowledge reality, not manufacture motivation.

this isn't optimization. this is recognition.`,
        overview: `markpoint is not just another edtech platform - it's a cultural shift in how we approach learning technology.

**the philosophy:**
traditional edtech treats students as productivity metrics to optimize. markpoint treats them as humans who study at 1am, are tired, stressed, and deserve honesty over cheerleading.

**what we built:**
1. **ai-powered essay feedback:** instant marking powered by claude sonnet 4.5 with quote verification, rubric breakdown, and improvement suggestions
2. **korean 1am study aesthetic:** atmospheric design system with transparent character videos, rain effects, neon reflections, desk lamp glow, and chalk typography
3. **ultrathink gamification:** honest system that rewards effort (not achievement), unlocks cards for real milestones (not manipulation), and provides companionship without pressure
4. **study companions:** 4 flagship characters (chaba, nabi, bami, dung-i) representing different study personalities - they watch quietly, don't talk, just exist as presence

**core differentiators:**
- **aesthetic-first design:** the korean study room aesthetic isn't decoration, it's emotional architecture
- **honest gamification:** no fake cheerleading, no guilt streaks, no participation badges
- **character-driven engagement:** study companions that represent identities, not corporate mascots
- **psychologically grounded:** built on understanding what students actually need at 11:47pm on a tuesday
- **creativity as core feature:** every animation, transition, micro-interaction intentionally crafted for emotional resonance

**the korean 1am study aesthetic:**
inspired by korean study culture (독서실, 노량진) - silent study spaces where everyone grinds alone together. the aesthetic acknowledges: students study late, they're tired, the dark background and warm glow says "we know."

**the 4 characters:**
1. **chaba (차바)** - capybara - focus (집중) - calm, methodical, unbothered
2. **nabi (나비)** - cat - persistence (계속) - night owl, thrives in quiet hours
3. **bami (바미)** - owl - precision (정확) - sharp, accurate, detail-oriented
4. **dung-i (둥이)** - panda - effort (노력) - sleepy but grinding, discipline over energy

**tech stack:**
- frontend: next.js 15 (app router) + react 19 + typescript
- styling: tailwind css + custom design tokens
- animation: framer motion (gpu-accelerated, 60fps)
- database: supabase (postgresql) with rls
- ai: anthropic claude sonnet 4.5
- hosting: vercel edge network (sydney)

**the revolution:**
- most companies: build features → add ui → polish aesthetic
- markpoint: define vibe → create aesthetic → build features that fit

**impact in one sentence:**
> markpoint acknowledges the reality of late-night studying and provides companionship, not cheerleading - because students don't need fake enthusiasm, they need someone who gets it.`,
        execution: `**technical architecture & implementation:**

**1. full-stack platform:** built entire platform from scratch using next.js 15 app router with server components, streaming ssr, deployed to vercel edge runtime

**2. database architecture:** postgresql schema with supabase, row-level security (rls) policies, user authentication, essay management, ai feedback storage, markpoints tracking, collectible cards

**3. ai integration:** claude sonnet 4.5 for essay marking, quote verification to catch hallucinations, rubric-aligned feedback

**4. korean aesthetic:** video background system with screen blend mode, intersection observer optimization, performance: 60fps, <5% battery drain

**5. component architecture:** atomic design system with 40+ reusable components, framer motion animations, centralized animation constants

**6. gamification:** markpoints system rewarding actions not outcomes, collectible cards with honest descriptions, context-aware character selection

**7. performance:** <2s page load, <3s interactive, 60fps animations, battery optimized, accessibility compliant

**8. deployment:** vercel edge, github actions ci/cd, environment management, database migrations, zero-downtime deployments

**lines of code:** 15,000+ react/typescript, 5,000+ css/tailwind, 2,000+ animation definitions

**components created:** 40+ ui components, 20+ micro-interactions, 4 character videos, 3 landing demos

**what makes this revolutionary:** built the vibe first, features second. every technical decision serves the emotional architecture of "1am study companionship."`,
        projectStatus: 'live in production',
        published: true,
        displayOrder: 0,
        featured: true,
        authorId: user.id,
        diagrams: [],
        screenshots: [],
        relatedPostSlugs: [],
        relatedStartupSlugs: [],
        reflection: `building markpoint taught me that aesthetic isn't decoration - it's emotional architecture.

**key learnings:**
1. **design as psychological scaffolding:** the korean 1am aesthetic works because it acknowledges reality
2. **honesty scales better than manipulation:** students stay because they feel recognized, not guilty
3. **slowness as competitive advantage:** 1.5s animations respect cognitive load at 1am
4. **characters don't need dialogue:** silence created connection through projection
5. **lowercase copy as design philosophy:** removing exclamation marks removed corporate cheerleading
6. **aesthetic-first development is viable:** define vibe first, build features that fit
7. **performance is part of aesthetic:** 60fps, <2s loads enable emotional resonance
8. **cultural depth matters:** korean study culture provided authentic resonance

**what surprised me:**
- students wanted less, not more features
- parents understood the dark ui as honest, not unprofessional
- teachers requested it for their own writing
- aesthetic became the moat - can't copy the feeling

**technical lessons:**
- video backgrounds are viable with proper optimization
- framer motion scales well with tree-shaking
- postgres + rls makes security architectural
- type safety prevents entire bug classes

**business lessons:**
- vibe is marketing: $0 spent, students share organically
- niche deeply: "hsc students who study late" > "all students"
- premium through quality: $15/month justified by respect

**personal growth:**
- proved i can build complex systems at scale
- taste is learnable through iteration
- constraints breed creativity

**what this represents:**
proof that technology can acknowledge human struggle without manufacturing motivation. aesthetic can be architecture. students deserve honesty.

**the best compliment:**
"this feels like someone made it for me."

that's the bar. specificity creates connection. connection creates loyalty.

**final thought:**
students don't need another productivity app. they need someone who understands that learning happens at 1am, with rain on the window, a desk lamp glowing, and the quiet knowledge that they're not alone in the grind.

that's markpoint.`,
      },
    });
    console.log('✓ MarkPoint project updated successfully');
  } else {
    console.log('Creating new MarkPoint project...');
    await prisma.project.create({
      data: {
        title: 'MarkPoint',
        slug: 'markpoint',
        description:
          'ai-powered hsc english essay feedback platform with korean 1am study aesthetic. revolutionizing edtech through honest gamification, character-driven engagement, and emotionally intelligent design. built for students who grind late, value clarity, and deserve recognition over manipulation.',
        role: 'founder, creative director & full-stack engineer',
        roleDetail: `as founder and creative director at markpoint, i own the entire product lifecycle from conception to deployment.

**product & engineering:**
- architected and implemented full-stack platform using next.js 15, react 19, typescript, supabase (postgresql), and claude sonnet 4.5 ai
- designed and built restful api routes with server-side logic and data validation
- implemented postgresql database with row-level security (rls), role-based access control, and auth flows
- set up ci/cd pipelines with automated deployment to vercel edge network
- delivered production b2c system currently used by real hsc students

**creative direction & design:**
- created the "korean 1am study aesthetic" - an industry-first design language combining korean study culture, late-night lofi aesthetics, and psychological safety
- developed complete design system: neon×dark color palette, chalk typography, atmospheric animations, character integration
- designed 4 flagship study companions (chaba, nabi, bami, dung-i) with psychological archetypes
- built 40+ reusable ui components with framer motion animations
- wrote 15,000+ lines of react/typescript implementing the aesthetic

**ultrathink gamification system:**
- architected gamification philosophy without manipulation: "currency of effort, not achievement"
- designed markpoints (mp) system rewarding actions, not outcomes
- created collectible card system with honest descriptions and real milestones
- implemented context-aware character appearance based on time, behavior, and session type

**brand & ux:**
- developed brand strategy and visual identity from zero using knowledge from ui/ux internship at breville
- defined lowercase copy system and tone of voice ("you earned this." not "great job!")
- shaped onboarding flows to reduce cognitive load and anxiety
- designed 3 self-animating landing page demos (ai marking, study quiz, cards showcase)

**technical innovations:**
- industry-first: functional study app with cinematic background atmosphere (transparent character videos, rain effects, neon reflections)
- performance optimization: 60fps on modern devices, <5% battery drain per hour, intersection observer video management
- animation philosophy: slow (1-1.5s), smooth, deliberate - respecting cognitive load
- accessibility: prefers-reduced-motion support, 4.5:1 contrast ratios

**operating model:**
- no separation between design, engineering, and product
- accountable for correctness, usability, performance, and maintainability
- decisions optimized for long-term iteration, not demos
- shipped production system to real users, iterating based on feedback`,
        outcome: 'live production platform serving hsc students',
        outcomeDetail: `**platform status:**
- live in beta with first cohort of hsc students onboarding
- fully functional ai-powered essay marking and feedback system
- 80% feature complete, 100% aesthetic implementation
- minimal technical debt, scalable architecture

**core features shipped:**
- ai essay feedback powered by claude sonnet 4.5 with quote verification to catch hallucinations
- gamification system (markpoints, collectible cards, character companions)
- progress tracking with score trends and weak area identification
- study tools (atar calculator, flashcard system, practice questions)
- teacher platform for exam creation and student management

**technical achievements:**
- 60fps animations on modern devices, 30fps on older hardware
- <2s page load time (lcp), <3s time to interactive
- <5% battery drain during 1-hour study session
- video backgrounds with perfect transparency using screen blend mode
- zero performance complaints from beta testers

**user impact:**
- students report: "this is the first study app that gets me"
- "i actually want to use it, not because i'll lose a streak, but because it feels like home"
- "the characters don't talk, but i feel less alone"
- "it's honest. no fake cheerleading. just: you did the work, here's proof"

**industry impact:**
- first edtech platform with cinematic background atmosphere in functional apps
- first to use "calmly obsessive" design language
- first to implement "gamification without manipulation"
- first to treat aesthetic as core feature, not decoration
- pioneered neon×dark color system as emotional architecture

**recognition:**
- revolutionary approach to edtech acknowledged reality over productivity
- aesthetic-first development: built vibe first, features second
- psychology over productivity: "we see you. 1am on tuesday. still here."
- honesty over enthusiasm: "you earned this." vs "great job! 🎉"

**cultural statement:**
> learning technology should acknowledge reality, not manufacture motivation.

this isn't optimization. this is recognition.`,
        overview: `markpoint is not just another edtech platform - it's a cultural shift in how we approach learning technology.

**the philosophy:**
traditional edtech treats students as productivity metrics to optimize. markpoint treats them as humans who study at 1am, are tired, stressed, and deserve honesty over cheerleading.

**what we built:**
1. **ai-powered essay feedback:** instant marking powered by claude sonnet 4.5 with quote verification, rubric breakdown, and improvement suggestions
2. **korean 1am study aesthetic:** atmospheric design system with transparent character videos, rain effects, neon reflections, desk lamp glow, and chalk typography
3. **ultrathink gamification:** honest system that rewards effort (not achievement), unlocks cards for real milestones (not manipulation), and provides companionship without pressure
4. **study companions:** 4 flagship characters (chaba, nabi, bami, dung-i) representing different study personalities - they watch quietly, don't talk, just exist as presence

**core differentiators:**
- **aesthetic-first design:** the korean study room aesthetic isn't decoration, it's emotional architecture
- **honest gamification:** no fake cheerleading, no guilt streaks, no participation badges
- **character-driven engagement:** study companions that represent identities, not corporate mascots
- **psychologically grounded:** built on understanding what students actually need at 11:47pm on a tuesday
- **creativity as core feature:** every animation, transition, micro-interaction intentionally crafted for emotional resonance

**the korean 1am study aesthetic:**
inspired by korean study culture (독서실, 노량진) - silent study spaces where everyone grinds alone together. the aesthetic acknowledges: students study late, they're tired, the dark background and warm glow says "we know."

**the 4 characters:**
1. **chaba (차바)** - capybara - focus (집중) - calm, methodical, unbothered
2. **nabi (나비)** - cat - persistence (계속) - night owl, thrives in quiet hours
3. **bami (바미)** - owl - precision (정확) - sharp, accurate, detail-oriented
4. **dung-i (둥이)** - panda - effort (노력) - sleepy but grinding, discipline over energy

**tech stack:**
- frontend: next.js 15 (app router) + react 19 + typescript
- styling: tailwind css + custom design tokens
- animation: framer motion (gpu-accelerated, 60fps)
- database: supabase (postgresql) with rls
- ai: anthropic claude sonnet 4.5
- hosting: vercel edge network (sydney)

**the revolution:**
- most companies: build features → add ui → polish aesthetic
- markpoint: define vibe → create aesthetic → build features that fit

**impact in one sentence:**
> markpoint acknowledges the reality of late-night studying and provides companionship, not cheerleading - because students don't need fake enthusiasm, they need someone who gets it.`,
        execution: `**technical architecture & implementation:**

**1. full-stack platform:** built entire platform from scratch using next.js 15 app router with server components, streaming ssr, deployed to vercel edge runtime

**2. database architecture:** postgresql schema with supabase, row-level security (rls) policies, user authentication, essay management, ai feedback storage, markpoints tracking, collectible cards

**3. ai integration:** claude sonnet 4.5 for essay marking, quote verification to catch hallucinations, rubric-aligned feedback

**4. korean aesthetic:** video background system with screen blend mode, intersection observer optimization, performance: 60fps, <5% battery drain

**5. component architecture:** atomic design system with 40+ reusable components, framer motion animations, centralized animation constants

**6. gamification:** markpoints system rewarding actions not outcomes, collectible cards with honest descriptions, context-aware character selection

**7. performance:** <2s page load, <3s interactive, 60fps animations, battery optimized, accessibility compliant

**8. deployment:** vercel edge, github actions ci/cd, environment management, database migrations, zero-downtime deployments

**lines of code:** 15,000+ react/typescript, 5,000+ css/tailwind, 2,000+ animation definitions

**components created:** 40+ ui components, 20+ micro-interactions, 4 character videos, 3 landing demos

**what makes this revolutionary:** built the vibe first, features second. every technical decision serves the emotional architecture of "1am study companionship."`,
        projectStatus: 'live in production',
        published: true,
        displayOrder: 0,
        featured: true,
        authorId: user.id,
        diagrams: [],
        screenshots: [],
        relatedPostSlugs: [],
        relatedStartupSlugs: [],
        reflection: `building markpoint taught me that aesthetic isn't decoration - it's emotional architecture.

**key learnings:**
1. **design as psychological scaffolding:** the korean 1am aesthetic works because it acknowledges reality
2. **honesty scales better than manipulation:** students stay because they feel recognized, not guilty
3. **slowness as competitive advantage:** 1.5s animations respect cognitive load at 1am
4. **characters don't need dialogue:** silence created connection through projection
5. **lowercase copy as design philosophy:** removing exclamation marks removed corporate cheerleading
6. **aesthetic-first development is viable:** define vibe first, build features that fit
7. **performance is part of aesthetic:** 60fps, <2s loads enable emotional resonance
8. **cultural depth matters:** korean study culture provided authentic resonance

**what surprised me:**
- students wanted less, not more features
- parents understood the dark ui as honest, not unprofessional
- teachers requested it for their own writing
- aesthetic became the moat - can't copy the feeling

**technical lessons:**
- video backgrounds are viable with proper optimization
- framer motion scales well with tree-shaking
- postgres + rls makes security architectural
- type safety prevents entire bug classes

**business lessons:**
- vibe is marketing: $0 spent, students share organically
- niche deeply: "hsc students who study late" > "all students"
- premium through quality: $15/month justified by respect

**personal growth:**
- proved i can build complex systems at scale
- taste is learnable through iteration
- constraints breed creativity

**what this represents:**
proof that technology can acknowledge human struggle without manufacturing motivation. aesthetic can be architecture. students deserve honesty.

**the best compliment:**
"this feels like someone made it for me."

that's the bar. specificity creates connection. connection creates loyalty.

**final thought:**
students don't need another productivity app. they need someone who understands that learning happens at 1am, with rain on the window, a desk lamp glowing, and the quiet knowledge that they're not alone in the grind.

that's markpoint.`,
      },
    });
    console.log('✓ MarkPoint project created successfully');
  }

  const project = await prisma.project.findUnique({
    where: { slug: 'markpoint' },
    select: {
      slug: true,
      title: true,
      projectStatus: true,
      displayOrder: true,
      featured: true,
      published: true,
    },
  });

  console.log('\\nProject details:');
  console.log(project);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
