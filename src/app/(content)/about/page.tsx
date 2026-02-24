/**
 * About Page - Personal & Professional
 *
 * Features:
 * - Clean Apple HIG typography (matching work/writing/resources)
 * - Subtle gradient background
 * - Personal philosophy section
 * - Photo carousel
 * - Split-brain employer section
 */

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

        {/* Philosophy Section - More Personal, Less AI */}
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
                  dropped out of compsci. started a company. learned everything the hard way.
                </p>
                <p className="text-sm text-stone-600">
                  now studying exercise science because the body is more interesting than code.
                </p>
              </div>

              {/* Philosophy */}
              <div className="space-y-6">
                <p className="text-sm font-medium text-stone-500">things i believe</p>
                <div className="space-y-4 text-sm leading-relaxed text-stone-700">
                  <p>systems beat motivation</p>
                  <p>clarity is a superpower</p>
                  <p>good products teach, they don&apos;t just serve</p>
                  <p>ownership &gt; titles</p>
                  <p>the best conversations happen at 1am</p>
                </div>
              </div>

              {/* Background */}
              <div className="space-y-4 border-t border-stone-200 pt-8">
                <p className="text-sm font-medium text-stone-500">the path here</p>
                <div className="space-y-3 text-sm text-stone-700">
                  <p>tried uni. wasn&apos;t it.</p>
                  <p>co-founded markpoint with some friends. built the whole stack.</p>
                  <p>interned at breville doing ui/ux. learned how real companies work.</p>
                  <p>taught myself product, design, growth. no bootcamp, just building.</p>
                  <p>taking a different route now. medicine feels right.</p>
                </div>
              </div>

              {/* Human Element */}
              <div className="space-y-4 border-t border-stone-200 pt-8">
                <p className="text-sm font-medium text-stone-500">when i&apos;m not working</p>
                <div className="space-y-3 text-sm text-stone-700">
                  <p>guitar, bass, keys, drums, sax (hmu if you&apos;re forming a band)</p>
                  <p>drawing when i need to think</p>
                  <p>talking about theology and politics way too late</p>
                  <p>running, swimming, acai bowls</p>
                  <p>trying to beat people at geoguessr ($20 bounty still unclaimed)</p>
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

              {/* Product */}
              <section className="space-y-8">
                <div>
                  <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                    product
                  </h3>
                  <p className="text-sm text-stone-600">systems shipped end-to-end</p>
                </div>

                <div className="space-y-8">
                  <div className="border-l-2 border-stone-900 pl-6">
                    <h4 className="mb-3 text-lg font-medium text-stone-900">
                      markpoint – ai-powered edtech platform
                    </h4>
                    <div className="space-y-2 text-sm text-stone-700">
                      <p>– designed the full product lifecycle</p>
                      <p>– built ai feedback systems for hsc students</p>
                      <p>– shipped onboarding, progression, and engagement loops</p>
                      <p>– owned ux, product decisions, and iteration</p>
                    </div>
                    <p className="mt-4 text-xs italic text-stone-600">
                      focus: learning performance, not features
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="mb-3 text-xs font-medium text-stone-500">
                        01 / full-stack development
                      </p>
                      <div className="space-y-2 text-sm text-stone-700">
                        <p>• next.js 14</p>
                        <p>• react</p>
                        <p>• typescript</p>
                        <p>• supabase</p>
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-xs font-medium text-stone-500">
                        02 / architecture & implementation of postgresql database
                      </p>
                      <div className="space-y-2 text-sm text-stone-700">
                        <p>• schema design</p>
                        <p>• row-level security (rls)</p>
                        <p>• role-based access control</p>
                        <p>• auth flows and permissions</p>
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-xs font-medium text-stone-500">
                        03 / implementation of restful api routes & server logic
                      </p>
                      <div className="space-y-2 text-sm text-stone-700">
                        <p>• restful api routes</p>
                        <p>• server-side logic</p>
                        <p>• data validation</p>
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-xs font-medium text-stone-500">
                        04 / setup of ci/cd pipelines, test coverage & deployment
                      </p>
                      <div className="space-y-2 text-sm text-stone-700">
                        <p>• ci/cd pipelines</p>
                        <p>• basic test coverage</p>
                        <p>• deployment workflows</p>
                        <p>• delivery of production b2c system used by real hsc students</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-stone-200 pt-6">
                    <p className="mb-4 text-xs font-medium text-stone-500">operating model</p>
                    <div className="space-y-2 text-sm text-stone-700">
                      <p>• no separation between design, engineering, and product</p>
                      <p>
                        • accountable for correctness, usability, performance, and maintainability
                      </p>
                      <p>• decisions optimised for long-term iteration, not demos</p>
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
                  <div className="border-l-2 border-stone-300 pl-6">
                    <p className="mb-3 text-sm text-stone-900">
                      designed korean-inspired study aesthetics
                    </p>
                    <p className="text-sm text-stone-600">
                      → reduced friction and increased daily usage
                    </p>
                  </div>

                  <div className="border-l-2 border-stone-300 pl-6">
                    <p className="mb-3 text-sm text-stone-900">
                      built emotional ui for stressed students
                    </p>
                    <p className="text-sm text-stone-600">→ clarity under exam pressure</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-stone-700">
                  <p>
                    i built brand and product positioning from zero and using knowledge from my
                    ui/ux internship at breville, i:
                  </p>
                  <p>• developed the brand strategy and visual identity system</p>
                  <p>• defined tone of voice, messaging hierarchy, and student-facing language</p>
                  <p>
                    • designed and implemented responsive ui components using tailwind css and radix
                    ui primitives
                  </p>
                  <p>• shaped onboarding flows to reduce cognitive load and early churn</p>
                </div>

                <div className="border-l-2 border-stone-900 pl-6">
                  <p className="mb-3 text-xs font-medium text-stone-500">focus areas</p>
                  <div className="space-y-2 text-sm text-stone-700">
                    <p>clarity over novelty</p>
                    <p>trust over growth-at-all-costs</p>
                    <p>premium positioning in a crowded edtech market</p>
                  </div>
                </div>
              </section>

              {/* Systems & Growth */}
              <section className="space-y-8">
                <div>
                  <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                    systems & growth
                  </h3>
                  <p className="text-sm text-stone-600">design meets behavior</p>
                </div>

                <div className="space-y-4 text-sm text-stone-700">
                  <p className="font-medium">marketing & go-to-market execution</p>
                  <p>i led early gtm strategy and execution including:</p>
                  <p>• defining icp for senior secondary students</p>
                  <p>• mapping the conversion funnel</p>
                  <p>
                    • experimentation with lead magnets, gated resources, and quizzes to drive
                    top-of-funnel acquisition
                  </p>
                  <p>
                    • early user acquisition through organic channels, partnerships, and direct
                    outreach
                  </p>
                  <p>
                    • handling early sales conversions, pricing decisions, and willing-to-pay
                    testing
                  </p>
                </div>

                <div className="border-l-2 border-stone-300 pl-6">
                  <p className="mb-3 text-xs font-medium text-stone-500">
                    concepts actively applied
                  </p>
                  <div className="space-y-2 text-sm text-stone-700">
                    <p>activation metrics • retention and cohort thinking</p>
                    <p>churn drivers • value-based pricing</p>
                    <p>feedback loops between product and acquisition</p>
                  </div>
                </div>

                <div className="mt-8 space-y-4 text-sm text-stone-700">
                  <p className="font-medium">sales & commercial thinking</p>
                  <p>• experience with early-stage sales motion</p>
                  <p>• handling inbound leads and outbound conversations</p>
                  <p>• qualifying users based on fit rather than volume</p>
                  <p>• iterating pricing and packaging based on usage patterns and objections</p>
                  <p>• balancing monetization with long-term trust in an educational context</p>
                </div>
              </section>

              {/* Results */}
              <section className="space-y-8">
                <div>
                  <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                    results
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="border-l-2 border-stone-900 pl-6">
                    <p className="text-sm text-stone-500">production system</p>
                    <p className="mt-2 text-2xl font-medium text-stone-900">live users</p>
                  </div>

                  <div className="border-l-2 border-stone-900 pl-6">
                    <p className="text-sm text-stone-500">end-to-end ownership</p>
                    <p className="mt-2 text-2xl font-medium text-stone-900">full stack</p>
                  </div>

                  <div className="border-l-2 border-stone-900 pl-6">
                    <p className="text-sm text-stone-500">ai feedback systems</p>
                    <p className="mt-2 text-2xl font-medium text-stone-900">shipped</p>
                  </div>

                  <div className="border-l-2 border-stone-900 pl-6">
                    <p className="text-sm text-stone-500">real hsc students</p>
                    <p className="mt-2 text-2xl font-medium text-stone-900">in production</p>
                  </div>
                </div>
              </section>

              {/* Additional Context */}
              <section className="space-y-8 border-t border-stone-200 pt-12">
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4 text-xl font-medium text-stone-900">
                      teaching & communication
                    </h4>
                    <div className="space-y-2 text-sm text-stone-700">
                      <p>background in tutoring, particularly senior secondary english:</p>
                      <p>• private tutor (years 10-12)</p>
                      <p>• delivery of detailed written and verbal feedback</p>
                      <p>• experience translating complex ideas for mixed-ability cohorts</p>
                    </div>
                  </div>

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
