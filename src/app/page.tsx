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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <div className="mx-auto max-w-5xl px-6 py-24 md:px-8 md:py-32">
        {/* Above the Fold - Answers Q1, Q2, Q4 */}
        <section className="flex min-h-[85vh] flex-col justify-center">
          {/* Personality-driven opening */}
          <p className="mb-6 text-[0.95rem] font-medium uppercase tracking-wide text-stone-500">
            i built this because employers keep asking for proof
          </p>

          {/* Q1: Who is this? */}
          <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-stone-900">
            Nathanael
          </h1>

          {/* Q2: What do they actually do? */}
          <p className="mt-6 max-w-2xl text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-[1.2] text-stone-700">
            Student → Tutor → Builder → Founder
          </p>

          {/* Context - Answers Q2, Q3, Q4 */}
          <div className="mt-10 space-y-3 text-[1.1rem] leading-[1.8] text-stone-600">
            <p className="flex items-start">
              <span className="mr-3 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500"></span>
              Founder of MarkPoint
            </p>
            <p className="flex items-start">
              <span className="mr-3 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500"></span>
              Former HSC English tutor (500+ students to Band 6)
            </p>
            <p className="flex items-start">
              <span className="mr-3 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500"></span>
              Ships production code daily
            </p>
          </div>

          {/* Primary CTAs - Routes to Q3 (Work) and Q4 (Writing) */}
          <div className="mt-14 flex flex-wrap gap-4">
            <a
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-stone-900/10 transition-all duration-200 hover:bg-stone-800 hover:shadow-xl"
            >
              View Work
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <a
              href="/writing"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-stone-300 bg-white px-8 py-3.5 text-base font-semibold text-stone-900 shadow-sm transition-all duration-200 hover:border-stone-400 hover:bg-stone-50"
            >
              Read Writing
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>

          {/* Secondary Resources Link - Subtle, Skippable */}
          <p className="mt-10 text-[0.9rem] leading-[1.6] text-stone-500">
            <a href="/resources" className="transition-colors duration-200 hover:text-cyan-600">
              Educational resources →
            </a>
          </p>
        </section>

        {/* Second Screen - Proof Anchors (Answers Q3: Built Real Things?) */}
        <section className="relative border-t border-stone-200 bg-white/50 py-24 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/30 to-transparent"></div>
          <div className="relative">
            <div className="mb-4 inline-block rounded-full bg-cyan-500/10 px-4 py-1.5">
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                Proof of Work
              </p>
            </div>
            <h2 className="mb-14 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.2] tracking-tight text-stone-900">
              Built & Operated
            </h2>

            <div className="space-y-5">
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

            <div className="mt-16">
              <a
                href="/work"
                className="group inline-flex items-center gap-2 text-base font-semibold text-stone-900 transition-colors duration-200 hover:text-cyan-600"
              >
                See all work
                <svg
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Third Screen - Direction & Thinking (Optional Depth) */}
        <section className="relative border-t border-stone-200 py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-50 to-white"></div>
          <div className="relative mx-auto max-w-4xl">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
              {/* Currently Focused On */}
              <div className="space-y-4 rounded-2xl border border-stone-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                  <svg
                    className="h-5 w-5 text-cyan-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-stone-900">Currently</h3>
                <p className="text-base leading-relaxed text-stone-700">
                  Building MarkPoint to solve educational technology challenges. Exploring how
                  systems thinking transforms education outcomes.
                </p>
              </div>

              {/* Featured Essay */}
              <div className="space-y-4 rounded-2xl border border-stone-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                  <svg
                    className="h-5 w-5 text-cyan-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-stone-900">Recent Thinking</h3>
                <a href="/writing/building-in-public" className="group block">
                  <p className="text-base font-semibold leading-relaxed text-stone-900 transition-colors duration-200 group-hover:text-cyan-600">
                    Building in Public: Lessons from MarkPoint →
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    On transparency, iteration, and learning from real users.
                  </p>
                </a>
              </div>

              {/* Philosophy/Approach - Full Width */}
              <div className="space-y-4 rounded-2xl border border-stone-200 bg-gradient-to-br from-cyan-500/5 to-transparent p-8 shadow-sm backdrop-blur-sm md:col-span-2">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                  <svg
                    className="h-5 w-5 text-cyan-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-stone-900">Approach</h3>
                <p className="text-base leading-relaxed text-stone-700">
                  Outcomes over credentials. Systems over hacks. Teaching what actually works.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
