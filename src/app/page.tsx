/**
 * Homepage - Identity Compression Engine
 *
 * Purpose: Enable employers to understand capability, credibility, and direction
 * in 30-45 seconds. This is not a "hero section" — it's a professional decoding surface.
 *
 * Five Core Questions Answered:
 * 1. Who is this? (Name)
 * 2. What do they actually do? (Positioning statement)
 * 3. Have they built real things? (Proof anchors - second screen)
 * 4. Can I trust their judgment? (Writing link + outcomes)
 * 5. Would I want them on my team? (Synthesis of all above)
 *
 * Design Principles:
 * - Calm over clever
 * - Clarity over creativity
 * - Outcomes over personality
 * - Restraint is the system
 */

import { ProofAnchor } from '@/components/homepage/proof-anchor';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        {/* Above the Fold - Answers Q1, Q2, Q4 */}
        <section className="flex min-h-[80vh] flex-col justify-center">
          {/* Q1: Who is this? */}
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] text-stone-900">
            Nathanael
          </h1>

          {/* Q2: What do they actually do? */}
          <p className="mt-4 max-w-2xl text-[clamp(1.5rem,3vw,2rem)] leading-[1.3] text-stone-700">
            Student → Tutor → Builder → Founder
          </p>

          {/* Context - Answers Q2, Q3, Q4 */}
          <div className="mt-8 space-y-2 text-[1rem] leading-[1.7] text-stone-600">
            <p>Founder of MarkPoint</p>
            <p>Former HSC English tutor (500+ students to Band 6)</p>
            <p>Ships production code daily</p>
          </div>

          {/* Primary CTAs - Routes to Q3 (Work) and Q4 (Writing) */}
          <div className="mt-12 flex flex-wrap gap-6">
            <a
              href="/work"
              className="text-lg font-medium text-stone-900 transition-colors duration-200 hover:text-cyan-500"
            >
              View Work →
            </a>
            <a
              href="/writing"
              className="text-lg font-medium text-stone-900 transition-colors duration-200 hover:text-cyan-500"
            >
              Read Writing →
            </a>
          </div>

          {/* Secondary Resources Link - Subtle, Skippable */}
          <p className="mt-8 text-[0.875rem] leading-[1.5] text-stone-500">
            <a href="/resources" className="transition-colors duration-200 hover:text-stone-700">
              Educational resources
            </a>
          </p>
        </section>

        {/* Second Screen - Proof Anchors (Answers Q3: Built Real Things?) */}
        <section className="border-t border-stone-200 py-24">
          <h2 className="mb-12 text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.3] text-stone-900">
            Built & Operated
          </h2>

          <div className="space-y-6">
            {/* Proof Anchor 1: MarkPoint */}
            <ProofAnchor
              name="MarkPoint"
              description="Startup focused on educational technology. Live product with real users."
              outcome="Active development, user growth trajectory, built with modern stack"
              href="/startups/markpoint"
            />

            {/* Proof Anchor 2: Riqle */}
            <ProofAnchor
              name="Riqle"
              description="Personal platform with commerce, built from scratch with production-grade infrastructure."
              outcome="T3 Stack, Stripe integration, full test coverage, deployed on Vercel"
              href="/work/riqle"
            />

            {/* Proof Anchor 3: Teaching Outcomes */}
            <ProofAnchor
              name="HSC English Tutoring"
              description="Taught 500+ students over 5 years, developing frameworks that consistently produce Band 6 results."
              outcome="90% of students achieved Band 5 or 6"
              href="/about#teaching"
            />
          </div>

          <p className="mt-12 text-[1rem] leading-[1.7] text-stone-600">
            <a
              href="/work"
              className="font-medium text-stone-900 transition-colors duration-200 hover:text-cyan-500"
            >
              See all work →
            </a>
          </p>
        </section>

        {/* Third Screen - Direction & Thinking */}
        {/* TODO: Implement in Story 3.5 */}
      </div>
    </div>
  );
}
