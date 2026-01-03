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

        {/* Second Screen - Proof Anchors */}
        {/* TODO: Implement in Story 3.4 */}

        {/* Third Screen - Direction & Thinking */}
        {/* TODO: Implement in Story 3.5 */}
      </div>
    </div>
  );
}
