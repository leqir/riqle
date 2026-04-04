/**
 * Seed script: EverReel project
 *
 * Run with: npx tsx scripts/seed-everreel.ts
 * Safe to run multiple times (upsert).
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@riqle.com';

  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) {
    throw new Error(`Admin user not found for email: ${adminEmail}`);
  }

  const project = await prisma.project.upsert({
    where: { slug: 'everreel' },
    update: {},
    create: {
      id: 'proj_everreel',
      slug: 'everreel',
      title: 'EverReel',
      description:
        'Full-stack marketing website for Sydney content creator Daniel Chin. Custom booking system, cinematic UI, and editorial design system built to convert Australian SME owners into discovery calls.',
      published: true,
      displayOrder: 5,

      // Short summary fields (shown on /work list)
      role: 'Designer, Developer, Consultant',
      outcome: 'Live in production',
      projectStatus: 'In production',

      // Team
      teamSize: 0, // solo (0 = solo project per project-detail.tsx)

      // Detail sections
      overview: `The Brief

EverReel is the marketing and booking website for Daniel Chin, a Sydney-based content creator known online as @rememberthebeat. The numbers are real: 400k YouTube subscribers, 100M+ cross-platform views, brand deals with Samsung, HelloFresh, NordVPN, Manscaped, Anytime Fitness, DreamHack, Govee, and Opera GX.

The problem was straightforward. Daniel had the credentials but no professional web presence that could convert sceptical Australian SME owners into booked discovery calls. His audience trusted him. Businesses didn't know he existed as a service provider.

The Goal

Build a site where Daniel's creator credentials are impossible to ignore before a visitor reaches the services page. Not a portfolio. A conversion machine with a booked discovery call as the primary outcome.

What Was Built

A full-stack marketing website with eight pages, a custom booking system, a cinematic design system built on Daniel's own music video photography, and a complete email infrastructure.

The design language draws from editorial magazine layouts, weight-contrast typography, and clip-path scroll animations. The services page uses alternating full-width sections with large decorative number overlays. The contact page has a full-viewport hero with a text mask reveal animation. The work page uses a Tokyo Ginza night shot as a cinematic hero background.

The site needed to work for two audiences simultaneously: the 45-year-old Sydney SME owner who is sceptical of marketers and needs credibility signals before committing to a call, and the 17-year-old YouTube subscriber who needed a path to MarkPoint as a secondary conversion objective.`,

      roleDetail: `Designer, Developer, Consultant. Sole designer and developer. Daniel provided the creative brief and his music video photography. Everything else was built from scratch.

Design
Full brand identity from zero: colour palette (er-dark teal #04445b, er-green lime #a9cd5c), variable font system using Bricolage Grotesque and Inter, and a component library. Editorial design language with weight-contrast typography, ghost word overlays at 4% opacity, and clip-path reveal animations. Image direction using Daniel's actual music video stills as cinematic backgrounds across the site.

Engineering
Full Next.js 15 App Router codebase built from scratch. Custom two-step booking system replacing Cal.com entirely: calendar date picker, hourly time slot selection (10am to 4pm AEST, Mon-Fri), form with service toggles, Zod validation, in-memory rate limiting, and Brevo transactional email. Framer Motion scroll animations, GSAP ScrollTrigger horizontal scroll, Lenis smooth scroll. Notion CMS integration via ISR for blog content. Complete SEO infrastructure including JSON-LD structured data, sitemap, robots.txt, and per-page metadata. Full Vercel deployment including DNS debugging across VentraIP and Vercel's DNS panel.

Consulting
Pushed back on fabricated case study metrics and invented testimonials before launch. Advised removing blog and MarkPoint pages pre-launch to tighten conversion focus. Identified incorrect Meta audience targeting on the MarkPoint partnership campaign as the root cause of a 133-clicks-zero-conversions problem, separate from the site build.`,

      execution: `Key Technical Decisions

No Cal.com. Embedded third-party booking widgets break the design system and introduce external brand dependencies at the most critical conversion point. Built the entire booking flow in Next.js: two-step UX modelled on the Calendly-style flow built for riqle.com.au/tutoring, skinned entirely in EverReel's design tokens. Zod validation on API routes, in-memory rate limiting per IP, Brevo for transactional email with both a confirmation email to the booker and a notification email to Daniel.

Brevo over Resend. The Resend free plan only allows one custom domain, and riqle.com.au was already using it. Brevo's free plan allows unlimited custom domains and 300 emails per day. Rebuilt email templates as HTML strings without a React Email dependency, added DKIM and SPF records to Vercel's DNS panel.

Vercel DNS over VentraIP. Switched nameservers from VentraIP to Vercel for cleaner SSL provisioning. Hit a CAA record conflict in production: pki.goog and sectigo.com were blocking Let's Encrypt certificate issuance. Fixed by adding letsencrypt.org to the CAA record set in Vercel's DNS panel.

GPU-composited animations only. Every Framer Motion animation uses transform and opacity, never margin or left. All whileInView animations use once: true. GSAP ScrollTrigger instances are killed in useEffect cleanup via ctx.revert(). Lenis initialises with a 300ms defer after first paint to avoid blocking LCP. Lighthouse Performance holds above 90 on mobile despite the heavy animation layer.

Cinematic image direction. Used Daniel's actual music video stills as background images rather than stock photography. Tokyo Ginza night shot on the work page hero. Waterfront sunset on the homepage hero. Moon through clouds on the testimonials section. Low-opacity teal overlays at 52 to 70% blend the images into the brand palette without losing the photograph underneath.

Pages Shipped
Homepage: cinematic hero, stats strip, showreel section, brands marquee, testimonials, cinema strip carousel.
About: editorial split layout with stacked photography.
Services: alternating full-width magazine sections with 01/02/03 decorative number overlays.
Work: Tokyo Ginza hero, promo video case studies with YouTubeLite embeds.
Contact: full-viewport hero with text mask reveal, editorial floating-label form.
Book: custom two-step booking calendar.
Book/Confirmed: post-booking confirmation state.
Privacy: sticky sidebar navigation layout.

Tech Stack
Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis, Brevo, Notion API, Vercel, Prisma (on the riqle side).`,

      outcomeDetail: `Live in production at everreel.com.au.

The site shipped with a complete technical infrastructure and a clear conversion path. The services page editorial layout is the strongest design decision on the site: alternating image/text magazine sections with weight-contrast typography read as genuinely premium without requiring any client photography beyond what Daniel already had from his music videos.

What Is Working
The custom booking system operates end to end. Calendar, time selection, form, confirmation email to the booker, notification email to Daniel. The cinematic image direction gives the site a visual identity that no stock photography library could replicate. Performance holds above 90 on Lighthouse mobile despite the animation layer.

What Is Pending
Real case study metrics from Daniel's brand campaigns with Samsung, HelloFresh, and NordVPN. Two additional client testimonials beyond the MarkPoint co-founder quote already on the site. Real client names for the three promo video case studies. Blog re-enabling once a content strategy is defined.`,

      reflection: `What I Would Do Differently

Get content commitments before building content-dependent architecture. The booking system, animation system, and design system all shipped on time. The gaps at launch were content gaps: fabricated metrics that could not go live, testimonials held as placeholders, and client names not confirmed. The technical build waited on content that should have been defined in the brief.

What This Project Confirmed

Design systems pay off faster than expected. Building the token system and component library up front meant every subsequent page was faster to build and more consistent without extra effort.

Production debugging is a different skill from development. The CAA record conflict blocking SSL, the duplicate A records from VentraIP, and the Resend domain limit were all problems that do not exist in localhost. Knowing how to debug DNS, read Vercel logs, and trace email delivery failures is as important as knowing how to write the application code.

Client content is always the critical path. No amount of good engineering ships a credible site without real metrics, real testimonials, and real client names. Scope that dependency explicitly in the brief next time.`,

      // SEO
      metaTitle: 'EverReel | Nathanael',
      metaDescription:
        'Full-stack marketing website for Sydney content creator Daniel Chin (@rememberthebeat). Custom booking system, cinematic UI, and editorial design system. Live at everreel.com.au.',
      ogImage: '',

      // Media
      screenshots: [],
      diagrams: [],

      // Cross-linking
      relatedPostSlugs: [],
      relatedStartupSlugs: [],

      featured: false,
      authorId: admin.id,
      updatedAt: new Date(),
    },
  });

  console.log(
    `✓ Project: ${project.title} (slug: ${project.slug}, displayOrder: ${project.displayOrder})`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
