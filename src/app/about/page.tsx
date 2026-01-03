/**
 * About Page - Sophisticated Design with HEYTEA Illustrations
 *
 * Features:
 * - Hand-drawn icons throughout (NO emojis)
 * - Large intricate HEYTEA illustrations as full-width page breaks
 * - Real photography from user's collection
 * - Nuanced gradients and unique UI elements
 * - Apple HIG-inspired typography
 */

'use client';

import Image from 'next/image';
import { GlassCard } from '@/components/korean-aesthetic/glass-card';
import { IntricateHeyteaScene } from '@/components/about/intricate-heytea-scene';
import { HandDrawnBuilding } from '@/components/icons/hand-drawn-building';
import { HandDrawnShield } from '@/components/icons/hand-drawn-shield';
import { HandDrawnBook } from '@/components/icons/hand-drawn-book';
import { HandDrawnSparkles } from '@/components/icons/hand-drawn-sparkles';
import { HandDrawnTarget } from '@/components/icons/hand-drawn-target';
import { HandDrawnPalette } from '@/components/icons/hand-drawn-palette';
import { HandDrawnChart } from '@/components/icons/hand-drawn-chart';
import { HandDrawnDocument } from '@/components/icons/hand-drawn-document';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Asymmetric Layout */}
      <section className="relative overflow-hidden">
        {/* Nuanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-purple-50/30 via-blue-50/20 to-white" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-gradient-to-bl from-purple-400/8 via-blue-400/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-gradient-to-tr from-blue-400/6 via-cyan-400/4 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 md:px-8 md:py-40">
          <div className="grid gap-20 lg:grid-cols-5">
            {/* Left: Typography - 3 columns */}
            <div className="flex flex-col justify-center lg:col-span-3">
              {/* Decorative line element with nuanced gradient */}
              <div className="mb-8 flex items-center gap-4">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500" />
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400">About</p>
              </div>

              <h1 className="mb-6 font-display text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-stone-900">
                hi, i'm
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  nathanael
                </span>
              </h1>

              <div className="mb-8 space-y-3">
                <p className="text-[1.5rem] font-semibold leading-tight tracking-[-0.01em] text-stone-700">
                  or better known as{' '}
                  <span className="relative">
                    riqle
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />
                  </span>
                </p>
              </div>

              {/* Unique quote box with nuanced gradient */}
              <div className="relative mt-8 overflow-hidden rounded-2xl border-2 border-purple-200/60 bg-gradient-to-br from-purple-50/70 via-blue-50/40 to-transparent pl-6 py-4">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 via-purple-400 to-blue-500" />
                <p className="text-lg italic text-stone-600">
                  "Formation through habits, discipline, and the systems we inhabit"
                </p>
              </div>
            </div>

            {/* Right: Photo with creative frame - 2 columns */}
            <div className="relative lg:col-span-2">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-stone-100 shadow-2xl shadow-stone-900/10 ring-1 ring-stone-900/5">
                  <Image
                    src="/friends-sunset-field.jpeg"
                    alt="Friends at sunset in field"
                    width={600}
                    height={800}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                {/* Nuanced decorative corner elements */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/15 via-purple-400/10 to-blue-500/15 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-blue-500/15 via-cyan-400/10 to-cyan-500/15 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="border-t border-stone-100 bg-white py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Section Label - Sticky */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 via-purple-400 to-purple-600 p-0.5 shadow-lg shadow-purple-500/20">
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                    <HandDrawnSparkles className="h-7 w-7 text-purple-500" />
                  </div>
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-600">
                  Philosophy
                </p>
              </div>
            </div>

            {/* Content - 6 columns */}
            <div className="lg:col-span-6">
              <h2 className="mb-10 text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-stone-900">
                Formation
              </h2>

              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-[1.1875rem] leading-[1.75] text-stone-700">
                  I'm interested in <span className="font-semibold text-stone-900">formation</span> —
                  how people are shaped over time by habits, language, discipline, and the systems
                  they inhabit.
                </p>

                <p className="text-[1.1875rem] leading-[1.75] text-stone-700">
                  I've learned to care about clarity early. Unclear language, unclear ownership,
                  and unclear intent tend to create more problems than technical difficulty ever does.
                  This applies just as much to people as it does to software or organisations.
                </p>

                {/* Faith Callout - Unique Design with nuanced gradients */}
                <div className="relative my-10 overflow-hidden rounded-2xl border-2 border-purple-200/70 bg-gradient-to-br from-purple-50/80 via-blue-50/50 via-white to-purple-50/30 p-8 shadow-xl shadow-purple-500/10">
                  <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-purple-500/12 via-blue-500/8 to-transparent blur-2xl" />
                  <div className="relative">
                    <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-purple-100 via-purple-50 to-blue-100 px-4 py-1.5 shadow-sm">
                      <p className="text-sm font-bold uppercase tracking-wider text-purple-700">Core Belief</p>
                    </div>
                    <p className="mb-4 text-[2rem] font-bold leading-tight tracking-[-0.02em] text-stone-900">
                      conviction &gt; performance
                    </p>
                    <p className="text-[1.0625rem] leading-relaxed text-stone-600">
                      My faith sits at the centre of how I try to order my life. I'm guided more by
                      restraint, accountability, and how I treat people than by what I signal publicly.
                      It informs what I say yes to, what I walk away from, and how seriously I take
                      responsibility.
                    </p>
                  </div>
                </div>

                <p className="text-[1.1875rem] leading-[1.75] text-stone-700">
                  Outside of work, I value routines that reward consistency. I like running and rarely
                  turn it down if someone else is keen. Swimming is the other constant, I go gym to swim.
                </p>

                <p className="text-[1.1875rem] leading-[1.75] text-stone-700">
                  I enjoy yapping about theology, ethics, culture, or the political state of the world.
                  I don't mind listening carefully, disagreeing honestly, and changing my mind when
                  it's warranted.
                </p>

                <p className="text-[1.1875rem] leading-[1.75] text-stone-700">
                  I used to compete in geoguessr (top 50 aus) before taking a break. If anyone can
                  beat me in geoguessr or even gamepigeon word hunt I'll give them $20.
                </p>

                <p className="text-[1.1875rem] leading-[1.75] text-stone-700">
                  Music has always hovered in the background. I enjoy jamming with others, despite being
                  tone deaf. The idea of forming a band resurfaces every so often. It hasn't happened yet.
                </p>

                <p className="text-[1.1875rem] leading-[1.75] text-stone-500">
                  p.s. lmk if you know good acai spots
                </p>
              </div>
            </div>

            {/* Illustration - 4 columns */}
            <div className="flex items-center justify-center lg:col-span-4">
              <IntricateHeyteaScene scene="philosophy" className="w-full max-w-md" />
            </div>
          </div>

          {/* Photo Grid - Creative Layout */}
          <div className="mt-24 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-stone-100 shadow-xl shadow-stone-900/5 ring-1 ring-stone-900/5">
                <Image
                  src="/friends-daytime.jpeg"
                  alt="Friends during the day"
                  width={1200}
                  height={750}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-square overflow-hidden rounded-2xl bg-stone-100 shadow-xl shadow-stone-900/5 ring-1 ring-stone-900/5">
                <Image
                  src="/friends-night-group.jpeg"
                  alt="Friends at night"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-2xl bg-stone-100 shadow-xl shadow-stone-900/5 ring-1 ring-stone-900/5">
                <Image
                  src="/friends-carnival.jpg"
                  alt="Friends at carnival"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH HEYTEA ILLUSTRATION PAGE BREAK */}
      <section className="relative overflow-hidden border-y border-stone-100 bg-gradient-to-br from-stone-50 via-white to-blue-50/20 py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5" />
        <div className="relative mx-auto max-w-6xl px-6">
          <IntricateHeyteaScene scene="technical" className="mx-auto w-full max-w-4xl" />
        </div>
      </section>

      {/* For Employers Section */}
      <section className="border-t border-stone-100 bg-white py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {/* Section Header - Creative */}
          <div className="mb-32 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-500 p-0.5 shadow-xl shadow-blue-500/25">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white">
                <HandDrawnBuilding className="h-9 w-9 text-blue-500" />
              </div>
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-blue-600">
              For Employers
            </p>
            <p className="text-lg text-stone-500">this section is factual by design</p>
          </div>

          {/* Current Focus */}
          <div className="mb-40 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-blue-500/20">
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                    <HandDrawnTarget className="h-7 w-7 text-blue-500" />
                  </div>
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                  Current
                </p>
              </div>
            </div>

            <div className="lg:col-span-10">
              <h2 className="mb-12 text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-stone-900">
                Current Focus
              </h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Card 1 - MarkPoint */}
                <GlassCard neonColor="blue" className="group relative overflow-hidden p-8 transition-all hover:scale-[1.02]">
                  <div className="absolute right-4 top-4 opacity-20">
                    <HandDrawnBuilding className="h-16 w-16 text-blue-500" />
                  </div>
                  <div className="relative">
                    <div className="mb-6">
                      <HandDrawnBuilding className="h-14 w-14 text-blue-500" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-stone-900">MarkPoint</h3>
                    <p className="text-[0.9375rem] leading-relaxed text-stone-600">
                      Founding developer and brand lead (2025-present)
                    </p>
                  </div>
                </GlassCard>

                {/* Card 2 - Full Ownership */}
                <GlassCard neonColor="purple" className="group relative overflow-hidden p-8 transition-all hover:scale-[1.02]">
                  <div className="absolute right-4 top-4 opacity-20">
                    <HandDrawnShield className="h-16 w-16 text-purple-500" />
                  </div>
                  <div className="relative">
                    <div className="mb-6">
                      <HandDrawnShield className="h-14 w-14 text-purple-500" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-stone-900">Full Ownership</h3>
                    <p className="text-[0.9375rem] leading-relaxed text-stone-600">
                      Across product, engineering, and brand execution
                    </p>
                  </div>
                </GlassCard>

                {/* Card 3 - Education */}
                <GlassCard neonColor="blue" className="group relative overflow-hidden p-8 transition-all hover:scale-[1.02] md:col-span-2 lg:col-span-1">
                  <div className="absolute right-4 top-4 opacity-20">
                    <HandDrawnBook className="h-16 w-16 text-blue-500" />
                  </div>
                  <div className="relative">
                    <div className="mb-6">
                      <HandDrawnBook className="h-14 w-14 text-blue-500" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-stone-900">Education</h3>
                    <p className="text-[0.9375rem] leading-relaxed text-stone-600">
                      Concurrently studying exercise science, with a pathway towards medicine
                    </p>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>

          {/* Product & Engineering - Creative Grid */}
          <div className="mb-40 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-400 to-purple-600 p-0.5 shadow-lg shadow-purple-500/20">
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                    <div className="text-[1.3rem] font-mono font-bold text-purple-500">&lt;/&gt;</div>
                  </div>
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-600">
                  Technical
                </p>
              </div>
            </div>

            <div className="lg:col-span-10">
              <h2 className="mb-10 text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-stone-900">
                Product & Engineering
              </h2>

              <p className="mb-12 text-[1.1875rem] leading-[1.75] text-stone-700">
                At markpoint, I designed and engineered the product end-to-end, including:
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: 'Full-Stack Development',
                    items: ['Next.js 14', 'React', 'TypeScript', 'Supabase'],
                    color: 'blue' as const,
                    gradient: 'from-blue-500 via-blue-400 to-cyan-500',
                  },
                  {
                    title: 'Database Architecture',
                    items: ['Schema design', 'Row-level security (RLS)', 'Role-based access control', 'Auth flows'],
                    color: 'purple' as const,
                    gradient: 'from-purple-500 via-pink-400 to-pink-500',
                  },
                  {
                    title: 'API & Server Logic',
                    items: ['RESTful API routes', 'Server-side logic', 'Data validation'],
                    color: 'blue' as const,
                    gradient: 'from-blue-500 via-indigo-400 to-indigo-500',
                  },
                  {
                    title: 'DevOps & Deployment',
                    items: ['CI/CD pipelines', 'Test coverage', 'Production deployment', 'Real user system'],
                    color: 'purple' as const,
                    gradient: 'from-purple-500 via-violet-400 to-violet-500',
                  },
                ].map((card, i) => (
                  <GlassCard key={i} neonColor={card.color} className="p-8">
                    <div className={`mb-4 inline-block rounded-lg bg-gradient-to-r ${card.gradient} px-4 py-1.5 shadow-sm`}>
                      <p className="text-sm font-bold text-white">{String(i + 1).padStart(2, '0')}</p>
                    </div>
                    <h3 className="mb-6 text-xl font-bold tracking-tight text-stone-900">
                      {card.title}
                    </h3>
                    <ul className="space-y-3">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-[0.9375rem] text-stone-600">
                          <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r ${card.gradient}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                ))}
              </div>

              {/* Operating Model - Unique Visual */}
              <div className="mt-12 overflow-hidden rounded-3xl border-2 border-stone-200 bg-gradient-to-br from-white via-stone-50/50 to-white p-10 shadow-xl">
                <h3 className="mb-8 text-center text-lg font-bold uppercase tracking-[0.2em] text-stone-900">
                  Operating Model
                </h3>
                <div className="mb-8 flex items-center justify-center gap-4">
                  {['Design', 'Engineering', 'Product'].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-purple-400 to-blue-500 text-3xl font-bold text-white shadow-xl shadow-purple-500/30">
                        {String(i + 1)}
                      </div>
                      <p className="text-sm font-semibold text-stone-900">{item}</p>
                      {i < 2 && (
                        <div className="absolute mt-8 h-0.5 w-12 bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500" style={{ marginLeft: '80px' }} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-stone-100 pt-6">
                  <p className="text-center text-[0.9375rem] font-medium text-stone-600">
                    No separation • Full ownership • Optimised for long-term iteration
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Sections */}
          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
            {/* Design & Brand */}
            <div>
              <div className="mb-6 h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-blue-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                  <HandDrawnPalette className="h-7 w-7 text-blue-500" />
                </div>
              </div>
              <h3 className="mb-6 text-2xl font-bold tracking-tight text-stone-900">
                Design & Brand
              </h3>
              <div className="mb-6 space-y-3">
                {[
                  'Brand strategy',
                  'Visual identity system',
                  'Tailwind CSS components',
                  'UX flow optimization',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="space-y-2 rounded-xl bg-gradient-to-br from-blue-50 via-blue-50/50 to-cyan-50 p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-900">Focus</p>
                <p className="text-sm font-semibold text-blue-700">clarity &gt; novelty</p>
                <p className="text-sm font-semibold text-purple-700">trust &gt; growth</p>
              </div>
            </div>

            {/* Marketing & Sales */}
            <div>
              <div className="mb-6 h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-400 to-purple-600 p-0.5 shadow-lg shadow-purple-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                  <HandDrawnChart className="h-7 w-7 text-purple-500" />
                </div>
              </div>
              <h3 className="mb-6 text-2xl font-bold tracking-tight text-stone-900">
                Marketing & Sales
              </h3>
              <div className="space-y-3 text-sm text-stone-600">
                <p>• ICP definition</p>
                <p>• Conversion funnel mapping</p>
                <p>• Lead magnets & resources</p>
                <p>• Organic acquisition</p>
                <p>• Pricing iteration</p>
                <p>• Early-stage sales motion</p>
              </div>
            </div>

            {/* Teaching & Working Style */}
            <div>
              <div className="mb-6 h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                  <HandDrawnBook className="h-7 w-7 text-blue-500" />
                </div>
              </div>
              <h3 className="mb-6 text-2xl font-bold tracking-tight text-stone-900">
                Teaching & Style
              </h3>
              <div className="mb-6 space-y-3 text-sm text-stone-600">
                <p>• Private tutor (Yrs 10-12)</p>
                <p>• Detailed feedback loops</p>
                <p>• Mixed-ability cohorts</p>
              </div>
              <div className="space-y-2 rounded-xl bg-gradient-to-br from-stone-50 via-stone-50/70 to-blue-50/30 p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-stone-700">Values</p>
                <p className="text-sm text-stone-600">Small accountable teams</p>
                <p className="text-sm text-stone-600">Ship & iterate</p>
                <p className="text-sm text-stone-600">Clarity & judgement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH HEYTEA ILLUSTRATION PAGE BREAK - Creative Scene */}
      <section className="relative overflow-hidden border-y border-stone-100 bg-gradient-to-br from-pink-50/30 via-white to-purple-50/20 py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-purple-500/5" />
        <div className="relative mx-auto max-w-6xl px-6">
          <IntricateHeyteaScene scene="creative" className="mx-auto w-full max-w-4xl" />
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-stone-100 bg-gradient-to-b from-white via-stone-50/50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-8">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-br from-stone-400 via-stone-300 to-stone-500 p-0.5 shadow-lg shadow-stone-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <HandDrawnDocument className="h-8 w-8 text-stone-400" />
            </div>
          </div>
          <p className="text-[0.9375rem] italic text-stone-500">
            A conventional resume with full chronology and references is available on request.
          </p>
        </div>
      </section>
    </div>
  );
}
