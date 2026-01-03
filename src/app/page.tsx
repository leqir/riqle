/**
 * Homepage - Futuristic Glassmorphism with HEYTEA Illustrations
 *
 * Features:
 * - Light mode glassmorphic cards
 * - Hand-drawn HEYTEA character illustrations
 * - Hand-drawn icons throughout
 * - Clean, modern, futuristic aesthetic
 */

'use client';

import { GlassCard } from '@/components/korean-aesthetic/glass-card';
import { SleepyOwl } from '@/components/heytea-characters/sleepy-owl';
import { StudyCat } from '@/components/heytea-characters/study-cat';
import { PencilSprite } from '@/components/heytea-characters/pencil-sprite';
import { HandDrawnArrowRight } from '@/components/icons/hand-drawn-arrow-right';
import { HandDrawnSparkles } from '@/components/icons/hand-drawn-sparkles';
import { HandDrawnCheck } from '@/components/icons/hand-drawn-check';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        {/* Sleepy Owl - Floating companion */}
        <div className="fixed right-8 top-24 z-20 hidden w-20 opacity-80 md:block">
          <SleepyOwl emotion="happy" />
        </div>

        {/* Hero Section */}
        <section className="relative flex min-h-[85vh] flex-col justify-center">
          <GlassCard neonColor="purple" imperfection="smudge" className="p-10 md:p-16">
            {/* Opening tagline */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-300/50 bg-purple-50/50 px-4 py-2">
              <HandDrawnSparkles className="h-5 w-5 text-purple-600" />
              <p className="font-chalk text-lg text-purple-700">building with intention</p>
            </div>

            {/* Name */}
            <h1 className="mb-6 text-[clamp(3.5rem,8vw,6rem)] font-bold leading-[1.05] tracking-tight text-stone-900">
              Nathanael
            </h1>

            {/* Trajectory */}
            <p className="mb-10 max-w-2xl font-chalk text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.2] text-purple-600">
              Student → Tutor → Builder → Founder
            </p>

            {/* Context with hand-drawn checks */}
            <div className="mb-14 space-y-3 text-[1.1rem] leading-[1.8] text-stone-700">
              <p className="flex items-start">
                <HandDrawnCheck className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-cyan-500" />
                Founder of MarkPoint
              </p>
              <p className="flex items-start">
                <HandDrawnCheck className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-cyan-500" />
                Former HSC English tutor (500+ students to Band 6)
              </p>
              <p className="flex items-start">
                <HandDrawnCheck className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-cyan-500" />
                Ships production code daily
              </p>
            </div>

            {/* CTAs with Pencil Sprite */}
            <div className="relative">
              <div className="absolute -left-16 top-0 hidden w-14 lg:block">
                <PencilSprite state="excited" />
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/work"
                  className="group inline-flex items-center gap-3 rounded-2xl border-2 border-purple-500 bg-purple-500 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-200 transition-all duration-300 hover:bg-purple-600 hover:shadow-xl hover:shadow-purple-300"
                >
                  View Work
                  <HandDrawnArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="/writing"
                  className="group inline-flex items-center gap-3 rounded-2xl border-2 border-purple-300 bg-white/80 px-8 py-4 font-semibold text-purple-700 backdrop-blur-sm transition-all duration-300 hover:bg-purple-50 hover:shadow-lg"
                >
                  Read Writing
                  <HandDrawnArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Proof of Work Section */}
        <section className="relative mt-24">
          <GlassCard neonColor="cyan" imperfection="tape" className="p-10 md:p-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-50/50 px-4 py-2">
              <HandDrawnSparkles className="h-5 w-5 text-cyan-600" />
              <p className="font-chalk text-base text-cyan-700">proof of work</p>
            </div>

            <h2 className="mb-12 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.2] text-stone-900">
              Built & Operated
            </h2>

            <div className="space-y-6">
              {/* MarkPoint */}
              <div className="group rounded-2xl border border-cyan-200/50 bg-gradient-to-br from-cyan-50/50 to-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-lg">
                <h3 className="mb-2 font-chalk text-2xl text-cyan-600">MarkPoint</h3>
                <p className="mb-3 text-base leading-relaxed text-stone-700">
                  Startup focused on educational technology. Live product with real users.
                </p>
                <p className="mb-4 text-sm leading-relaxed text-stone-500">
                  Active development, user growth trajectory, built with modern stack
                </p>
                <a
                  href="/startups/markpoint"
                  className="group/link inline-flex items-center gap-2 font-semibold text-cyan-600 transition-colors duration-200 hover:text-cyan-700"
                >
                  View project
                  <HandDrawnArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>

              {/* Riqle */}
              <div className="group rounded-2xl border border-purple-200/50 bg-gradient-to-br from-purple-50/50 to-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 hover:shadow-lg">
                <h3 className="mb-2 font-chalk text-2xl text-purple-600">Riqle</h3>
                <p className="mb-3 text-base leading-relaxed text-stone-700">
                  Personal platform with commerce, built from scratch with production-grade
                  infrastructure.
                </p>
                <p className="mb-4 text-sm leading-relaxed text-stone-500">
                  T3 Stack, Stripe integration, full test coverage, deployed on Vercel
                </p>
                <a
                  href="/work/riqle"
                  className="group/link inline-flex items-center gap-2 font-semibold text-purple-600 transition-colors duration-200 hover:text-purple-700"
                >
                  View project
                  <HandDrawnArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>

              {/* Teaching */}
              <div className="group rounded-2xl border border-green-200/50 bg-gradient-to-br from-green-50/50 to-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-green-300 hover:shadow-lg">
                <h3 className="mb-2 font-chalk text-2xl text-green-600">HSC English Tutoring</h3>
                <p className="mb-3 text-base leading-relaxed text-stone-700">
                  Taught 500+ students over 5 years, developing frameworks that consistently produce
                  Band 6 results.
                </p>
                <p className="mb-4 text-sm leading-relaxed text-stone-500">
                  90% of students achieved Band 5 or 6
                </p>
                <a
                  href="/about#teaching"
                  className="group/link inline-flex items-center gap-2 font-semibold text-green-600 transition-colors duration-200 hover:text-green-700"
                >
                  Read more
                  <HandDrawnArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Current Focus Section */}
        <section className="relative mt-24">
          {/* Study Cat - companion */}
          <div className="absolute -left-20 bottom-8 hidden w-24 opacity-70 lg:block">
            <StudyCat pose="sleeping" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Currently Working On */}
            <GlassCard neonColor="pink" imperfection="smudge" className="p-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-pink-300/50 bg-pink-100/50">
                <HandDrawnSparkles className="h-7 w-7 text-pink-600" />
              </div>
              <h3 className="mb-4 font-chalk text-2xl text-stone-900">Currently</h3>
              <p className="text-base leading-relaxed text-stone-700">
                Building MarkPoint to solve educational technology challenges. Exploring how systems
                thinking transforms education outcomes.
              </p>
            </GlassCard>

            {/* Recent Thinking */}
            <GlassCard neonColor="purple" imperfection="fold" className="p-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-purple-300/50 bg-purple-100/50">
                <HandDrawnCheck className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="mb-4 font-chalk text-2xl text-stone-900">Recent Thinking</h3>
              <a href="/writing/building-in-public" className="group block">
                <p className="mb-2 font-semibold text-purple-600 transition-colors duration-200 group-hover:text-purple-700">
                  Building in Public: Lessons from MarkPoint →
                </p>
                <p className="text-sm leading-relaxed text-stone-600">
                  On transparency, iteration, and learning from real users.
                </p>
              </a>
            </GlassCard>

            {/* Approach - Full Width */}
            <GlassCard neonColor="green" imperfection="torn" className="p-8 md:col-span-2">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-green-300/50 bg-green-100/50">
                <HandDrawnSparkles className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="mb-4 font-chalk text-2xl text-stone-900">Approach</h3>
              <p className="text-base leading-relaxed text-stone-700">
                Outcomes over credentials. Systems over hacks. Teaching what actually works.
              </p>
            </GlassCard>
          </div>
        </section>
      </div>
    </div>
  );
}
