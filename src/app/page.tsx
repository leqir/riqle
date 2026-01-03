/**
 * Homepage - Apple-inspired Modern Design
 *
 * Features:
 * - Clean Apple HIG typography
 * - Strategic glassmorphism (not everything)
 * - HEYTEA hand-drawn illustrations
 * - Modern, minimal, futuristic
 */

'use client';

import { GlassCard } from '@/components/korean-aesthetic/glass-card';
import { SleepyOwl } from '@/components/heytea-characters/sleepy-owl';
import { StudyCat } from '@/components/heytea-characters/study-cat';
import { PencilSprite } from '@/components/heytea-characters/pencil-sprite';
import { HandDrawnArrowRight } from '@/components/icons/hand-drawn-arrow-right';
import { HandDrawnSparkles } from '@/components/icons/hand-drawn-sparkles';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Floating HEYTEA Characters */}
      <div className="fixed right-12 top-32 z-20 hidden lg:block">
        <div className="w-24">
          <SleepyOwl emotion="happy" />
        </div>
      </div>

      <div className="fixed bottom-12 left-12 z-20 hidden lg:block">
        <div className="w-28">
          <StudyCat pose="sleeping" />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-24 md:px-8 md:py-32">
        {/* Hero Section - No card, just content */}
        <section className="mb-32 flex min-h-[80vh] flex-col justify-center">
          <div className="relative">
            {/* Pencil Sprite near content */}
            <div className="absolute -right-20 top-0 hidden w-16 xl:block">
              <PencilSprite state="excited" />
            </div>

            {/* Main heading - Apple SF Pro style (Inter) */}
            <h1 className="mb-6 text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-stone-900">
              Nathanael
            </h1>

            {/* Subheading - Apple style */}
            <p className="mb-8 text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight text-stone-600">
              Student → Tutor → Builder → Founder
            </p>

            {/* Description - Apple body text style */}
            <p className="mb-12 max-w-2xl text-xl leading-relaxed text-stone-600">
              Building products and teaching systems thinking. Focused on creating tools that help
              students internalize frameworks, not just memorize content.
            </p>

            {/* CTAs - Apple button style */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
              >
                View Work
                <HandDrawnArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-stone-300 bg-white px-8 py-4 text-base font-semibold text-stone-900 transition-all duration-200 hover:border-stone-400 hover:bg-stone-50"
              >
                About
                <HandDrawnArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        {/* Work Section - With Glassmorphic Card */}
        <section className="mb-32">
          <GlassCard neonColor="purple" className="p-12 md:p-16">
            <div className="mb-8 flex items-center gap-3">
              <HandDrawnSparkles className="h-7 w-7 text-purple-600" />
              <h2 className="text-4xl font-bold tracking-tight text-stone-900">Built & Shipped</h2>
            </div>

            <div className="space-y-8">
              {/* MarkPoint */}
              <div className="group">
                <h3 className="mb-2 text-2xl font-semibold text-stone-900">MarkPoint</h3>
                <p className="mb-3 text-lg leading-relaxed text-stone-700">
                  Educational technology startup. Live product with real users solving complex
                  academic frameworks.
                </p>
                <a
                  href="/startups/markpoint"
                  className="group/link inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700"
                >
                  View project
                  <HandDrawnArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>

              {/* Riqle */}
              <div className="group border-t border-stone-200 pt-8">
                <h3 className="mb-2 text-2xl font-semibold text-stone-900">Riqle</h3>
                <p className="mb-3 text-lg leading-relaxed text-stone-700">
                  Personal platform with commerce infrastructure. T3 Stack, Stripe, full test
                  coverage.
                </p>
                <a
                  href="/work/riqle"
                  className="group/link inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700"
                >
                  View project
                  <HandDrawnArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>

              {/* Teaching */}
              <div className="group border-t border-stone-200 pt-8">
                <h3 className="mb-2 text-2xl font-semibold text-stone-900">Teaching</h3>
                <p className="mb-3 text-lg leading-relaxed text-stone-700">
                  500+ HSC English students over 5 years. Developed replicable frameworks that
                  consistently produce Band 6 results.
                </p>
                <a
                  href="/about#teaching"
                  className="group/link inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700"
                >
                  Read more
                  <HandDrawnArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Current Focus - Grid without cards */}
        <section className="mb-32">
          <h2 className="mb-12 text-4xl font-bold tracking-tight text-stone-900">Currently</h2>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-stone-900">Focus</h3>
              <p className="text-lg leading-relaxed text-stone-700">
                Building MarkPoint&apos;s core infrastructure. Creating educational tools that help
                students internalize cognitive frameworks rather than memorize content.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-semibold text-stone-900">Exploring</h3>
              <p className="text-lg leading-relaxed text-stone-700">
                How systems scale without losing coherence—especially in education, where bad
                scaling destroys what made something work.
              </p>
            </div>

            <div className="md:col-span-2">
              <h3 className="mb-4 text-2xl font-semibold text-stone-900">Approach</h3>
              <p className="text-lg leading-relaxed text-stone-700">
                Outcomes over credentials. Systems over hacks. Teaching what actually works.
                Evidence before persuasion.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Writing - Simple section */}
        <section>
          <h2 className="mb-8 text-4xl font-bold tracking-tight text-stone-900">Recent Thinking</h2>

          <a
            href="/writing/building-in-public"
            className="group block rounded-2xl border border-stone-200 bg-white p-8 transition-all duration-200 hover:border-stone-300 hover:shadow-lg"
          >
            <h3 className="mb-2 text-2xl font-semibold text-stone-900 transition-colors duration-200 group-hover:text-blue-600">
              Building in Public: Lessons from MarkPoint →
            </h3>
            <p className="text-lg leading-relaxed text-stone-600">
              On transparency, iteration, and learning from real users.
            </p>
          </a>
        </section>
      </div>
    </div>
  );
}
