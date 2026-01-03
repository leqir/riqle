/**
 * About Page - Professional Narrative Alignment Tool
 *
 * Purpose: Explain Nathanael's non-linear path with clarity, maturity, and self-awareness.
 * Core question answered: "Is this person coherent — or are they all over the place?"
 *
 * Design Principles:
 * - Text-first layout (no glassmorphism, no decorative cards)
 * - Calm, reflective, grounded tone
 * - Closer to an essay than a marketing page
 */

import { type Metadata } from 'next';
import { CurrentContext } from '@/components/about/current-context';
import { TrajectoryTimeline } from '@/components/about/trajectory-timeline';
import { CurrentFocus } from '@/components/about/current-focus';
import { OperatingPrinciples } from '@/components/about/operating-principles';

export const metadata: Metadata = {
  title: 'About | Nathanael',
  description:
    "Student → Tutor → Builder → Founder. How I got here, what I learned, and where I'm heading next.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-8 md:py-32">
        {/* Page Title */}
        <header className="mb-16">
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight tracking-tight text-stone-900">
            About
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            How I got here, what I learned, and where I&apos;m heading next.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-20">
          {/* Section 1: Opening Context - "Where I Am Now" */}
          <section>
            <CurrentContext />
          </section>

          {/* Section 2: Trajectory Timeline */}
          <section>
            <TrajectoryTimeline />
          </section>

          {/* Section 3: Current Focus */}
          <section>
            <CurrentFocus />
          </section>

          {/* Section 4: Operating Principles (optional) */}
          <section>
            <OperatingPrinciples />
          </section>
        </div>
      </div>
    </div>
  );
}
