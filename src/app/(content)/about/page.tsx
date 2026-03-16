'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        <header className="mb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">about</p>
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            hi, i&apos;m nathanael.
          </h1>
        </header>

        {/* Section 1 - Personal */}
        <section className="mb-20">
          <div className="border-l-2 border-stone-900 pl-8">
            <div className="space-y-6 text-lg leading-relaxed text-stone-700">
              <p>
                dropped out of compsci at unsw. co-founded markpoint.
                <br />
                now studying exercise science.
              </p>

              <p>
                i play music, read theology, swim and lift most weeks,
                <br />
                and draw when i feel like it. i also yap about most things
                <br />
                if you give me the chance.
              </p>

              <p>
                if you can beat me in geoguessr or gamepigeon word hunt
                <br />i will give you $20. no one has collected yet.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 - Clarity (no heading) */}
        <section className="mb-32">
          <div className="border-l-2 border-stone-900 pl-8">
            <div className="space-y-6 text-lg leading-relaxed text-stone-700">
              <p>
                i care about clarity. in code, in conversations, in how
                <br />
                you structure your day. unclear intent creates more damage
                <br />
                than any technical problem does.
              </p>

              <p>clarity is kindness. ambiguity is usually just cowardice.</p>

              <p>systems over motivation. ownership over titles.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Technical CV Section - Split Brain Layout */}
      <section className="relative overflow-x-auto border-t border-stone-200 bg-stone-50/50">
        <div className="flex min-w-max">
          {/* LEFT BRAIN - Fixed Identity Column (40%) */}
          <div className="flex h-screen w-screen flex-shrink-0 overflow-y-auto border-r border-stone-200 bg-white/80 px-12 py-20 backdrop-blur-sm lg:w-[40vw]">
            <div className="mx-auto w-full max-w-lg space-y-12 py-12">
              {/* Context Snapshot */}
              <div className="space-y-3 border-l-2 border-stone-300 pl-6">
                <p className="text-sm text-stone-600">
                  dropped out of compsci. started a business. gambled on myself.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT BRAIN - Scrolling Execution Column (60%) */}
          <div className="h-screen w-screen flex-shrink-0 overflow-y-auto bg-white/60 px-6 py-20 backdrop-blur-sm md:px-12 lg:w-[60vw]">
            <div className="mx-auto w-full max-w-3xl space-y-16">
              <div className="border-b border-stone-200 pb-8">
                <h2 className="mb-2 text-2xl font-medium tracking-tight text-stone-900">
                  what i&apos;ve built and how i work
                </h2>
              </div>

              {/* Engineering */}
              <section className="space-y-8">
                <div>
                  <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                    engineering
                  </h3>
                  <p className="text-sm text-stone-600">full-stack, end-to-end</p>
                </div>

                <div className="space-y-8">
                  <div className="border-l-2 border-stone-900 pl-6">
                    <h4 className="mb-1 text-lg font-medium text-stone-900">
                      markpoint – ai-powered edtech platform
                    </h4>
                    <p className="mb-4 text-xs text-stone-500">
                      founding engineer + brand lead · 2025–present
                    </p>
                    <div className="space-y-2 text-sm text-stone-700">
                      <p>
                        – led full-stack development: Next.js 14, React, TypeScript (strict),
                        Supabase
                      </p>
                      <p>
                        – architected PostgreSQL schema with row-level security (RLS) policies and
                        role-based access control
                      </p>
                      <p>
                        – built RESTful API routes with complete server-side validation and
                        structured error handling
                      </p>
                      <p>
                        – established CI/CD pipelines and test architecture for a B2C production
                        system used by real HSC students
                      </p>
                      <p>
                        – implemented responsive component library using Tailwind CSS and Radix UI
                        primitives
                      </p>
                      <p>– shipped AI feedback systems for student assessment (LLM-integrated)</p>
                      <p>
                        – owned full product lifecycle: UX, engineering, iteration, and deployment
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="mb-3 text-xs font-medium text-stone-500">languages</p>
                      <div className="space-y-1.5 text-sm text-stone-700">
                        <p>TypeScript · JavaScript · Python</p>
                        <p>HTML · CSS · SQL</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-3 text-xs font-medium text-stone-500">frameworks & tools</p>
                      <div className="space-y-1.5 text-sm text-stone-700">
                        <p>Next.js · React · Node.js · Svelte</p>
                        <p>Supabase · Prisma · Vercel</p>
                        <p>Tailwind CSS · Radix UI</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-3 text-xs font-medium text-stone-500">
                        infrastructure & practices
                      </p>
                      <div className="space-y-1.5 text-sm text-stone-700">
                        <p>PostgreSQL · RLS policies</p>
                        <p>RESTful APIs · tRPC</p>
                        <p>CI/CD · automated test coverage</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-3 text-xs font-medium text-stone-500">operating model</p>
                      <div className="space-y-1.5 text-sm text-stone-700">
                        <p>no separation of design, eng, product</p>
                        <p>bias toward shipping with real users</p>
                        <p>optimised for iteration, not demos</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-stone-200 pt-6">
                    <p className="mb-3 text-xs font-medium text-stone-500">also shipped</p>
                    <div className="space-y-2 text-sm text-stone-700">
                      <p>
                        • riqle.com.au — this site. Next.js 15 App Router, Prisma, tRPC, NextAuth.js
                        v5, Stripe, Vercel Blob, Inngest, Resend, Upstash Redis
                      </p>
                      <p>• GameMaker Studio games in Year 11-12 (1st in Software Design)</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* UX / Design */}
              <section className="space-y-8">
                <div>
                  <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                    ux / design
                  </h3>
                  <p className="text-sm text-stone-600">calm interfaces under pressure</p>
                </div>

                <div className="space-y-6">
                  <div className="border-l-2 border-stone-900 pl-6">
                    <h4 className="mb-1 text-lg font-medium text-stone-900">Breville Group Ltd</h4>
                    <p className="mb-4 text-xs text-stone-500">UI/UX Design Intern · 2023</p>
                    <div className="space-y-2 text-sm text-stone-700">
                      <p>
                        – used Sketch to design screen interfaces for consumer appliances (coffee
                        machines and others) from wireframe through final spec
                      </p>
                      <p>
                        – articulated design rationale and decision-making to stakeholders and
                        product owners
                      </p>
                      <p>
                        – conducted UI testing cycles with peer review and direct client feedback
                        sessions
                      </p>
                      <p>– learned how design decisions translate to manufacturing constraints</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-stone-300 pl-6">
                    <p className="mb-3 text-sm font-medium text-stone-900">
                      markpoint product design
                    </p>
                    <div className="space-y-2 text-sm text-stone-700">
                      <p>
                        – built korean-inspired study aesthetics to reduce friction and increase
                        daily engagement
                      </p>
                      <p>
                        – designed emotional UI for stressed students — clarity as a feature, not an
                        afterthought
                      </p>
                      <p>– developed visual identity system and messaging hierarchy from zero</p>
                      <p>– shaped onboarding flows to reduce cognitive load and early churn</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-stone-900 pl-6">
                  <p className="mb-3 text-xs font-medium text-stone-500">design principles</p>
                  <div className="space-y-2 text-sm text-stone-700">
                    <p>clarity over novelty</p>
                    <p>trust over growth-at-all-costs</p>
                    <p>premium positioning in a crowded market</p>
                  </div>
                </div>
              </section>

              {/* Cybersecurity + Systems */}
              <section className="space-y-8">
                <div>
                  <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                    cybersecurity + systems
                  </h3>
                  <p className="text-sm text-stone-600">applied under real conditions</p>
                </div>

                <div className="border-l-2 border-stone-900 pl-6">
                  <h4 className="mb-1 text-lg font-medium text-stone-900">
                    National Computer Science School (NCSS)
                  </h4>
                  <p className="mb-4 text-xs text-stone-500">Grok Academy · 2024</p>
                  <div className="space-y-2 text-sm text-stone-700">
                    <p>
                      – selective-entry 10-day intensive program: computer programming and
                      cybersecurity
                    </p>
                    <p>
                      – industry workshops with security engineers from Commonwealth Bank of
                      Australia, WiseTech Global, Atlassian, Macquarie Bank, Google, Optiver, and
                      Westpac Bank
                    </p>
                    <p>– NCSS Intermediate Perfect Score (2022–2024)</p>
                    <p>– NCSS Advanced Distinction (2022–2023)</p>
                  </div>
                </div>
              </section>

              {/* Brand & Growth */}
              <section className="space-y-8">
                <div>
                  <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                    brand & growth
                  </h3>
                  <p className="text-sm text-stone-600">zero to market</p>
                </div>

                <div className="space-y-4 text-sm text-stone-700">
                  <p className="text-xs font-medium text-stone-500">
                    go-to-market execution — markpoint
                  </p>
                  <p>
                    – developed brand strategy: visual identity system, tone of voice, and messaging
                    framework targeting senior secondary (HSC) students
                  </p>
                  <p>– defined ICP, mapped conversion funnel, and ran willing-to-pay experiments</p>
                  <p>
                    – managed beta user acquisition through organic channels, direct outreach, and
                    school partnerships
                  </p>
                  <p>
                    – handled early inbound sales, pricing decisions, and packaging iteration based
                    on usage and objections
                  </p>
                  <p>
                    – experimented with lead magnets, gated resources, and quizzes for top-of-funnel
                  </p>
                </div>

                <div className="border-l-2 border-stone-300 pl-6">
                  <p className="mb-3 text-xs font-medium text-stone-500">
                    frameworks actively applied
                  </p>
                  <div className="space-y-2 text-sm text-stone-700">
                    <p>activation metrics · retention and cohort thinking</p>
                    <p>churn drivers · value-based pricing</p>
                    <p>feedback loops between product and acquisition</p>
                  </div>
                </div>
              </section>

              {/* Teaching */}
              <section className="space-y-8">
                <div>
                  <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                    teaching
                  </h3>
                  <p className="text-sm text-stone-600">technical clarity under exam pressure</p>
                </div>

                <div className="space-y-6">
                  <div className="border-l-2 border-stone-300 pl-6">
                    <p className="mb-1 text-sm font-medium text-stone-900">private english tutor</p>
                    <p className="mb-3 text-xs text-stone-500">self-employed · 2024–present</p>
                    <div className="space-y-2 text-sm text-stone-700">
                      <p>– years 10–12, HSC English (Advanced, Extension 1 & 2)</p>
                      <p>– detailed written and verbal feedback on assessments</p>
                      <p>– translating complex ideas for mixed-ability cohorts</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Working Style */}
              <section className="space-y-8 border-t border-stone-200 pt-12">
                <div>
                  <h4 className="mb-4 text-xl font-medium text-stone-900">working style</h4>
                  <div className="space-y-2 text-sm text-stone-700">
                    <p>• strong preference for small, accountable teams</p>
                    <p>• comfortable with ambiguity when ownership is clear</p>
                    <p>• bias toward shipping and iterating with real users</p>
                    <p>• values clarity, judgment, and work that compounds</p>
                    <p>• low tolerance for performative process</p>
                  </div>
                </div>
              </section>

              {/* Closing note */}
              <section className="border-t border-stone-200 pb-4 pt-12">
                <p className="text-sm leading-relaxed text-stone-500">
                  also working on some things outside the tech stuff.
                  <br />a devotional called incline my heart, and ordo.
                  <br />
                  more on those when they&apos;re ready.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-stone-200 bg-white/80 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <p className="text-base text-stone-600">
            a conventional resume with full chronology and references is available on request.
          </p>
        </div>
      </section>
    </div>
  );
}
