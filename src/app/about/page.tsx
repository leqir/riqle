/**
 * About Page - Clean Apple-Inspired Design
 *
 * Features:
 * - Minimalist glassmorphism design
 * - Large, prominent hand-drawn icons
 * - Clean typography following Apple HIG
 * - No excessive gradients
 * - Sleek, smooth, and consistent UI
 */

'use client';

import Image from 'next/image';
import { HandDrawnBuilding } from '@/components/icons/hand-drawn-building';
import { HandDrawnShield } from '@/components/icons/hand-drawn-shield';
import { HandDrawnBook } from '@/components/icons/hand-drawn-book';
import { ElaborateSparkles } from '@/components/icons/elaborate-sparkles';
import { ElaborateTarget } from '@/components/icons/elaborate-target';
import { HandDrawnPalette } from '@/components/icons/hand-drawn-palette';
import { HandDrawnChart } from '@/components/icons/hand-drawn-chart';
import { HandDrawnDocument } from '@/components/icons/hand-drawn-document';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Hero Section - Clean Apple Style with Gradients */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-purple-50/20 to-white" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-gradient-to-bl from-purple-400/6 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-gradient-to-tr from-blue-400/5 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left: Typography */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-stone-500">About</p>
              </div>

              <h1 className="mb-6 font-display text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.025em] text-stone-900">
                Hi, I'm
                <br />
                Nathanael
              </h1>

              <div className="mb-8">
                <p className="text-[1.75rem] font-medium leading-tight tracking-[-0.015em] text-stone-600">
                  or better known as{' '}
                  <span className="text-stone-900">riqle</span>
                </p>
              </div>

              {/* Quote - Clean glassmorphism */}
              <div className="relative mt-6 overflow-hidden rounded-2xl border border-stone-200/60 bg-white/40 backdrop-blur-xl p-6 shadow-sm">
                <div className="absolute left-0 top-0 h-full w-1 bg-stone-900" />
                <p className="pl-2 text-[1.0625rem] leading-relaxed text-stone-700 lowercase">
                  "formation through habits, discipline, and the systems we inhabit"
                </p>
              </div>
            </div>

            {/* Right: Photo */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-stone-100 shadow-2xl shadow-stone-900/10">
                  <Image
                    src="/friends-sunset-field.jpeg"
                    alt="Friends at sunset"
                    width={600}
                    height={800}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="border-t border-stone-200/60 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Section Label */}
            <div className="lg:col-span-3">
              <div className="sticky top-32">
                <div className="mb-4 flex h-20 w-20 items-center justify-center">
                  <ElaborateSparkles className="h-20 w-20 text-stone-900" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-stone-900">
                  Philosophy
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-9">
              <h2 className="mb-10 text-[2.5rem] font-semibold leading-tight tracking-[-0.025em] text-stone-900">
                Formation
              </h2>

              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-[1.125rem] leading-[1.6] text-stone-700">
                  I'm interested in <span className="font-semibold text-stone-900">formation</span> —
                  how people are shaped over time by habits, language, discipline, and the systems
                  they inhabit.
                </p>

                <p className="text-[1.125rem] leading-[1.6] text-stone-700">
                  I've learned to care about clarity early. unclear language, unclear ownership,
                  and unclear intent tend to create more problems than technical difficulty ever does.
                  this applies just as much to people as it does to software or organisations.
                </p>

                {/* Faith Callout - Clean glassmorphism */}
                <div className="relative my-12 overflow-hidden rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-8 shadow-lg">
                  <div className="mb-4 inline-block rounded-full bg-stone-100 px-4 py-1.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-900">Core Belief</p>
                  </div>
                  <p className="mb-4 text-[1.875rem] font-semibold leading-tight tracking-[-0.02em] text-stone-900">
                    conviction &gt; performance
                  </p>
                  <p className="text-[1.0625rem] leading-relaxed text-stone-700">
                    my faith sits at the centre of how I try to order my life. I'm guided more by
                    restraint, accountability, and how I treat people than by what I signal publicly.
                    it informs what I say yes to, what I walk away from, and how seriously I take
                    responsibility.
                  </p>
                </div>

                <p className="text-[1.125rem] leading-[1.6] text-stone-700">
                  outside of work, I value routines that reward consistency. I like running and rarely
                  turn it down if someone else is keen. swimming is the other constant, I go gym to swim.
                </p>

                <p className="text-[1.125rem] leading-[1.6] text-stone-700">
                  I enjoy yapping about theology, ethics, culture, or the political state of the world.
                  I don't mind listening carefully, disagreeing honestly, and changing my mind when
                  it's warranted.
                </p>

                <p className="text-[1.125rem] leading-[1.6] text-stone-700">
                  I once to compete in geoguessr (top 50 aus) before taking a break. if anyone can
                  beat me in geoguessr or even gamepigeon word hunt I'll give them $20.
                </p>

                <p className="text-[1.125rem] leading-[1.6] text-stone-700">
                  music has always hovered in the background. I enjoy jamming with others, despite being
                  tone deaf. the idea of forming a band resurfaces every so often. it hasn't happened yet.
                </p>

                <p className="text-[1.125rem] leading-[1.6] text-stone-500">
                  p.s. lmk if you know good acai spots
                </p>
              </div>
            </div>
          </div>

          {/* Photo Grid - Clean Layout */}
          <div className="mt-24 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-stone-100 shadow-lg">
                <Image
                  src="/friends-night-group.jpeg"
                  alt="Friends at night"
                  width={1200}
                  height={750}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-stone-100 shadow-lg">
                <Image
                  src="/friends-daytime.jpeg"
                  alt="Friends during the day"
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers Section - Glassmorphism Design */}
      <section className="border-t border-stone-200/60 bg-[#f5f5f7] py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center">
              <HandDrawnBuilding className="h-20 w-20 text-stone-900" />
            </div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-stone-900">
              For Employers
            </p>
            <p className="text-base text-stone-600">this section is factual by design</p>
          </div>

          {/* Current Focus */}
          <div className="mb-32">
            <div className="mb-6 flex items-center gap-4">
              <ElaborateTarget className="h-16 w-16 text-stone-900" />
              <h2 className="text-[2.5rem] font-semibold leading-tight tracking-[-0.025em] text-stone-900">
                Current Focus
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 - MarkPoint */}
              <div className="group relative overflow-hidden rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-8 shadow-lg transition-all hover:shadow-xl">
                <div className="mb-6">
                  <HandDrawnBuilding className="h-16 w-16 text-stone-900" />
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-stone-900">MarkPoint</h3>
                <p className="text-[0.9375rem] leading-relaxed text-stone-600">
                  Founding developer and brand lead (2025-present)
                </p>
              </div>

              {/* Card 2 - Full Ownership */}
              <div className="group relative overflow-hidden rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-8 shadow-lg transition-all hover:shadow-xl">
                <div className="mb-6">
                  <HandDrawnShield className="h-16 w-16 text-stone-900" />
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-stone-900">Full Ownership</h3>
                <p className="text-[0.9375rem] leading-relaxed text-stone-600">
                  Across product, engineering, and brand execution
                </p>
              </div>

              {/* Card 3 - Education */}
              <div className="group relative overflow-hidden rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-8 shadow-lg transition-all hover:shadow-xl md:col-span-2 lg:col-span-1">
                <div className="mb-6">
                  <HandDrawnBook className="h-16 w-16 text-stone-900" />
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-stone-900">Education</h3>
                <p className="text-[0.9375rem] leading-relaxed text-stone-600">
                  Concurrently studying exercise science, with a pathway towards medicine
                </p>
              </div>
            </div>
          </div>

          {/* Product & Engineering */}
          <div className="mb-32">
            <div className="mb-6 flex items-center gap-4">
              <div className="text-[2rem] font-mono font-semibold text-stone-900">&lt;/&gt;</div>
              <h2 className="text-[2.5rem] font-semibold leading-tight tracking-[-0.025em] text-stone-900">
                Product & Engineering
              </h2>
            </div>

            <p className="mb-12 text-[1.125rem] leading-relaxed text-stone-700">
              At markpoint, I designed and engineered the product end-to-end, including:
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: 'Full-Stack Development',
                  items: ['Next.js 14', 'React', 'TypeScript', 'Supabase'],
                },
                {
                  title: 'Architecture & Implementation of PostgreSQL Database',
                  items: ['Schema design', 'Row-level security (RLS)', 'Role-based access control', 'Auth flows and permissions'],
                },
                {
                  title: 'Implementation of RESTful API Routes & Server Logic',
                  items: ['RESTful API routes', 'Server-side logic', 'Data validation'],
                },
                {
                  title: 'Setup of CI/CD Pipelines, Test Coverage & Deployment',
                  items: ['CI/CD pipelines', 'Basic test coverage', 'Deployment workflows', 'Delivery of production B2C system used by real HSC students'],
                },
              ].map((card, i) => (
                <div key={i} className="rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-8 shadow-lg">
                  <div className="mb-4 inline-block rounded-lg bg-stone-900 px-3 py-1">
                    <p className="text-sm font-semibold text-white">{String(i + 1).padStart(2, '0')}</p>
                  </div>
                  <h3 className="mb-6 text-xl font-semibold tracking-tight text-stone-900">
                    {card.title}
                  </h3>
                  <ul className="space-y-3">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-[0.9375rem] text-stone-600">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-900" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Operating Model - Clean Design */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-10 shadow-lg">
              <h3 className="mb-8 text-center text-base font-semibold uppercase tracking-[0.12em] text-stone-900">
                Operating Model
              </h3>
              <div className="mb-8 flex items-center justify-center gap-8">
                {['Design', 'Engineering', 'Product'].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-900 text-2xl font-semibold text-white shadow-lg">
                      {String(i + 1)}
                    </div>
                    <p className="text-sm font-medium text-stone-900">{item}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-stone-200/60 pt-6">
                <p className="text-center text-[0.9375rem] font-medium text-stone-700">
                  No separation between design, engineering, and product
                </p>
                <p className="text-center text-[0.9375rem] font-medium text-stone-700">
                  Accountable for correctness, usability, performance, and maintainability
                </p>
                <p className="text-center text-[0.9375rem] font-medium text-stone-700">
                  Decisions optimised for long-term iteration, not demos
                </p>
              </div>
            </div>
          </div>

          {/* Additional Detailed Sections */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Design & Brand */}
            <div className="rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-8 shadow-lg">
              <div className="mb-6">
                <HandDrawnPalette className="h-16 w-16 text-stone-900" />
              </div>
              <h3 className="mb-6 text-xl font-semibold tracking-tight text-stone-900">
                Design, Brand & Product Positioning
              </h3>
              <div className="mb-6 space-y-3 text-sm text-stone-600">
                <p>I sought brand and product positioning from zero and using knowledge from my UI/UX internship at Breville, I:</p>
                <p>• Developed the brand strategy and visual identity system</p>
                <p>• Defined tone of voice, messaging hierarchy, and student-facing language</p>
                <p>• Designed and implemented responsive UI components using Tailwind CSS and Radix UI primitives</p>
                <p>• Shaped onboarding flows to reduce cognitive load and early churn</p>
              </div>
              <div className="space-y-2 rounded-xl border border-stone-200/40 bg-stone-50/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-900">Focus Areas</p>
                <p className="text-sm font-medium text-stone-700">clarity &gt; novelty</p>
                <p className="text-sm font-medium text-stone-700">trust &gt; growth-at-all-costs</p>
                <p className="text-sm font-medium text-stone-700">premium positioning in a crowded edtech market</p>
              </div>
            </div>

            {/* Marketing & Sales */}
            <div className="rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-8 shadow-lg">
              <div className="mb-6">
                <HandDrawnChart className="h-16 w-16 text-stone-900" />
              </div>
              <h3 className="mb-6 text-xl font-semibold tracking-tight text-stone-900">
                Marketing & Go-To-Market Execution
              </h3>
              <div className="mb-6 space-y-3 text-sm text-stone-600">
                <p>I propelled early GTM strategy and execution including:</p>
                <p>• Defining ICP for senior secondary students</p>
                <p>• Mapping the conversion funnel</p>
                <p>• Experimentation with lead magnets, gated resources, and quizzes to drive top-of-funnel acquisition</p>
                <p>• Early user acquisition through organic channels, partnerships, and direct outreach</p>
                <p>• Handling early sales conversions, pricing decisions, and willing-to-pay testing</p>
              </div>
              <div className="space-y-2 rounded-xl border border-stone-200/40 bg-stone-50/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-900">Concepts Actively Applied</p>
                <p className="text-sm text-stone-700">Activation metrics • Retention and cohort thinking</p>
                <p className="text-sm text-stone-700">Churn drivers • Value-based pricing</p>
                <p className="text-sm text-stone-700">Feedback loops between product and acquisition</p>
              </div>
            </div>

            {/* Teaching & Working Style */}
            <div className="space-y-8 md:col-span-2 lg:col-span-1">
              <div className="rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-8 shadow-lg">
                <div className="mb-6">
                  <HandDrawnBook className="h-16 w-16 text-stone-900" />
                </div>
                <h3 className="mb-6 text-xl font-semibold tracking-tight text-stone-900">
                  Sales & Commercial Thinking
                </h3>
                <div className="space-y-3 text-sm text-stone-600">
                  <p>• Experience with early-stage sales motion</p>
                  <p>• Handling inbound leads and outbound conversations</p>
                  <p>• Qualifying users based on fit rather than volume</p>
                  <p>• Iterating pricing and packaging based on usage patterns and objections</p>
                  <p>• Balancing monetisation with long-term trust in an educational context</p>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-8 shadow-lg">
                <h3 className="mb-6 text-xl font-semibold tracking-tight text-stone-900">
                  Teaching & Communication
                </h3>
                <div className="mb-6 space-y-3 text-sm text-stone-600">
                  <p>Background in tutoring, particularly senior secondary English:</p>
                  <p>• Private tutor (years 10-12)</p>
                  <p>• Delivery of detailed written and verbal feedback</p>
                  <p>• Experience translating complex ideas for mixed-ability cohorts</p>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-xl p-8 shadow-lg">
                <h3 className="mb-6 text-xl font-semibold tracking-tight text-stone-900">
                  Working Style
                </h3>
                <div className="space-y-2 text-sm text-stone-600">
                  <p>• Strong preference for small, accountable teams</p>
                  <p>• Comfortable with ambiguity when ownership is clear</p>
                  <p>• Bias toward shipping and iterating with real users</p>
                  <p>• Values clarity, judgement, and work that compounds</p>
                  <p>• Low tolerance for performative process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Consistent Design */}
      <section className="border-t border-stone-200/60 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
            <HandDrawnDocument className="h-16 w-16 text-stone-900" />
          </div>
          <p className="text-[0.9375rem] text-stone-600">
            A conventional resume with full chronology and references is available on request.
          </p>
        </div>
      </section>
    </div>
  );
}
