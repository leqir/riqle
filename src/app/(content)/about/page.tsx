'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        <header className="mb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">about</p>
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            hi, i&apos;m nathanael
          </h1>
          <p className="text-xl leading-relaxed text-stone-600">
            or better known as <span className="font-semibold text-stone-900">riqle</span>
          </p>
        </header>

        {/* Philosophy Section */}
        <section className="mb-32">
          <div className="mb-12">
            <p className="mb-2 text-sm text-stone-500">philosophy</p>
            <h2 className="text-3xl font-medium tracking-tight text-stone-900">formation</h2>
          </div>

          <div className="border-l-2 border-stone-900 pl-8">
            <div className="space-y-6 text-lg leading-relaxed text-stone-700">
              <p className="text-sm italic text-stone-500">
                my chatgpt wanted me to write this here:
              </p>

              <p>
                i think a lot about <span className="font-medium text-stone-900">formation</span>.
                how people are shaped over time by the habits they keep, the language they use, the
                discipline they build, and the systems they inhabit. not as some abstract concept,
                but as a lived reality. the things you do every day are quietly forming you into
                someone, whether you&apos;re paying attention or not.
              </p>

              <p>
                i learned early on to care about clarity. unclear language, unclear ownership, and
                unclear intent create more problems than technical difficulty ever does. this
                applies to people just as much as it applies to software. i&apos;ve seen teams fall
                apart not because the code was broken, but because no one could agree on what done
                actually meant. clarity is kindness. ambiguity is violence.
              </p>

              <div className="my-10 border-l-2 border-stone-300 pl-6">
                <p className="mb-4 text-lg text-stone-900">
                  but i&apos;m genuinely just a simple guy
                </p>
                <ul className="space-y-2 text-base leading-relaxed text-stone-700">
                  <li>• i like playing music, hmu if you forming a band</li>
                  <li>• i like to draw</li>
                  <li>• i like to yap about the political state of the world</li>
                  <li>• i like acai</li>
                </ul>
              </div>

              <p className="text-stone-500">
                p.s. if anyone can beat me in geoguessr or gamepigeon word hunt i will give them $20
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* For Employers Section - Split Brain Layout */}
      <section className="relative overflow-x-auto border-t border-stone-200 bg-stone-50/50">
        <div className="flex min-w-max">
          {/* LEFT BRAIN - Fixed Identity Column (40%) */}
          <div className="flex h-screen w-screen flex-shrink-0 overflow-y-auto border-r border-stone-200 bg-white/80 px-12 py-20 backdrop-blur-sm lg:w-[40vw]">
            <div className="mx-auto w-full max-w-lg space-y-12 py-12">
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-4xl font-medium tracking-tight text-stone-900">nathanael</h2>
                <p className="text-sm text-stone-500">sydney</p>
              </div>

              {/* Context Snapshot */}
              <div className="space-y-3 border-l-2 border-stone-300 pl-6">
                <p className="text-sm text-stone-600">
                  dropped out of compsci. started a business. gambled on myself.
                </p>
              </div>

              {/* Philosophy */}
              <div className="space-y-6">
                <p className="text-sm font-medium text-stone-500">things i believe</p>
                <div className="space-y-4 text-sm leading-relaxed text-stone-700">
                  <p>systems &gt; motivation</p>
                  <p>clarity is based</p>
                  <p>ai is good</p>
                  <p>ownership &gt; titles</p>
                  <p>claude &gt; chatgpt</p>
                </div>
              </div>

              {/* Background */}
              <div className="space-y-4 border-t border-stone-200 pt-8">
                <p className="text-sm font-medium text-stone-500">the path here</p>
                <div className="space-y-3 text-sm text-stone-700">
                  <p>co-founded markpoint with two of my mates. built the whole stack.</p>
                  <p>interned as ui/ux designer. i make screens look pretty</p>
                  <p>taught myself product, design, growth.</p>
                </div>
              </div>

              {/* Human Element */}
              <div className="space-y-4 border-t border-stone-200 pt-8">
                <p className="text-sm font-medium text-stone-500">when i&apos;m not working</p>
                <div className="space-y-3 text-sm text-stone-700">
                  <p>i play whatever instruments</p>
                  <p>i can yap about theology</p>
                  <p>i used to run now im unfit asl</p>
                  <p>i swim now</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BRAIN - Scrolling Execution Column (60%) */}
          <div className="h-screen w-screen flex-shrink-0 overflow-y-auto bg-white/60 px-6 py-20 backdrop-blur-sm md:px-12 lg:w-[60vw]">
            <div className="mx-auto w-full max-w-3xl space-y-16">
              <div>
                <p className="mb-2 text-sm text-stone-500">for employers</p>
                <p className="text-sm text-stone-600">this section is factual by design</p>
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

                <div className="space-y-4 text-sm text-stone-700">
                  <p className="text-xs font-medium text-stone-500">competitive programming</p>
                  <p>• Australian Informatics Olympiad (2023)</p>
                  <p>• UNSW ProgComp (2022)</p>
                  <p>• Computational & Algorithmic Thinking — Distinction (2022)</p>
                  <p>• FinTech Algothon (UNSW)</p>
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

              {/* Academic Record */}
              <section className="space-y-8">
                <div>
                  <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                    academic record
                  </h3>
                  <p className="text-sm text-stone-600">Sydney Boys High School, 2019–2024</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="border-l-2 border-stone-900 pl-6">
                    <p className="text-sm text-stone-500">HSC results</p>
                    <div className="mt-3 space-y-1.5 text-sm text-stone-700">
                      <p>HSC All-Rounder (2024)</p>
                      <p>1st — English Extension 2 (2024)</p>
                      <p>1st — Software Design & Dev (2023–24)</p>
                      <p>1st — English Extension 1 (2023)</p>
                      <p>1st — Game & Software Design (2022)</p>
                      <p>1st — English (2022)</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-stone-900 pl-6">
                    <p className="text-sm text-stone-500">awards</p>
                    <div className="mt-3 space-y-1.5 text-sm text-stone-700">
                      <p>The Margaret Richardson Award</p>
                      <p className="pl-2 text-xs text-stone-400">English Extension 2 (2024)</p>
                      <p>The High Dedication Award (2024)</p>
                      <p>Nathan McDonald Award (2023)</p>
                      <p>School Trophy (2022)</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-stone-900 pl-6">
                    <p className="text-sm text-stone-500">olympiads & competitions</p>
                    <div className="mt-3 space-y-1.5 text-sm text-stone-700">
                      <p>Maths — High Distinction (2020)</p>
                      <p>Chemistry — High Distinction (2022)</p>
                      <p>Geography — High Distinction (2019–20, 22)</p>
                      <p>AlphaSights Asia Case Competition</p>
                      <p>Fintech × PwC Case Competition</p>
                      <p>BusinessOne Mastercard Case Competition</p>
                      <p>UNIT Macquarie Private Markets Case</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-stone-900 pl-6">
                    <p className="text-sm text-stone-500">education</p>
                    <div className="mt-3 space-y-3 text-sm text-stone-700">
                      <div>
                        <p className="font-medium">UNSW</p>
                        <p className="text-xs text-stone-500">
                          B. Adv Computer Science (Hons) — 2025
                        </p>
                        <p className="text-xs italic text-stone-400">left to start markpoint</p>
                      </div>
                      <div>
                        <p className="font-medium">UNSW</p>
                        <p className="text-xs text-stone-500">
                          B. Exercise Science / M. Physiotherapy — 2026–present
                        </p>
                      </div>
                    </div>
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

                  <div className="border-l-2 border-stone-300 pl-6">
                    <p className="mb-1 text-sm font-medium text-stone-900">
                      english tutor / marker
                    </p>
                    <p className="mb-3 text-xs text-stone-500">The Brain Education · 2025</p>
                    <div className="space-y-2 text-sm text-stone-700">
                      <p>– classroom teaching: years 10–12</p>
                      <p>– prepared curriculum material, marked assessments at scale</p>
                      <p>– didactic engagement across mixed-ability audiences</p>
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
