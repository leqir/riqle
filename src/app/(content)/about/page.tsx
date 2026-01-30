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

import { PhotoCarousel } from '@/components/content/about/photo-carousel';

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
              <p>
                ts is ai-gen for now......i think a lot about{' '}
                <span className="font-medium text-stone-900">formation</span>. how people are shaped
                over time by the habits they keep, the language they use, the discipline they build,
                and the systems they inhabit. not as some abstract concept, but as a lived reality.
                the things you do every day are quietly forming you into someone, whether
                you&apos;re paying attention or not.
              </p>

              <p>
                i learned early on to care about clarity. unclear language, unclear ownership, and
                unclear intent create more problems than technical difficulty ever does. this
                applies to people just as much as it applies to software. i&apos;ve seen teams fall
                apart not because the code was broken, but because no one could agree on what done
                actually meant. clarity is kindness. ambiguity is violence.
              </p>

              <div className="my-10 border-l-2 border-stone-900 pl-6">
                <p className="mb-2 text-sm text-stone-500">core belief</p>
                <p className="mb-4 text-2xl font-medium text-stone-900">
                  conviction over performance
                </p>
                <p className="text-base leading-relaxed">
                  my faith sits at the center of how i try to order my life. i&apos;m guided more by
                  restraint, accountability, and how i treat people than by what i signal publicly.
                  it informs what i say yes to, what i walk away from, and how seriously i take
                  responsibility. it&apos;s the difference between optimising for appearance and
                  optimising for integrity, and i know which one matters when no one&apos;s
                  watching.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  this shapes everything. the products i build, the teams i want to work with, the
                  conversations i value. it&apos;s why i care more about long-term trust than
                  short-term growth, and why i&apos;d rather be honest than impressive.
                </p>
              </div>

              <p>
                outside of work, i value routines that reward consistency. i like running and rarely
                turn it down if someone else is keen. swimming is the other constant. i go to the
                gym to swim.
              </p>

              <p>
                i enjoy talking about theology, ethics, culture, or the political state of the
                world. i don&apos;t mind listening carefully, disagreeing honestly, and changing my
                mind when it&apos;s warranted. there&apos;s something about 1am conversations that
                strip away pretense. the kind where you&apos;re too tired to perform and end up
                saying what you actually think. deep theological talks at that hour hit different.
              </p>

              <p>
                i used to compete in geoguessr (top 50 aus) before taking a break. if anyone can
                beat me in geoguessr or even gamepigeon word hunt i&apos;ll give them $20.
              </p>

              <p>
                music has always hovered in the background. i genuinely enjoy jamming with others. i
                play guitar, bass, keys, and mess around with drums when the opportunity presents
                itself. the idea of forming a band resurfaces every so often. it hasn&apos;t
                happened yet, but the pull is real. there&apos;s something meditative about
                improvising with people who get the rhythm. it&apos;s less about performance and
                more about connecting with something honest.
              </p>

              <p>
                i draw and sketch when i need to think through something visually. it&apos;s less
                about being an artist and more about working through ideas in a different medium.
                sometimes the clearest way to understand a system is to map it by hand. there&apos;s
                a particular kind of clarity that comes from putting pen to paper. slowing down
                enough to see what you&apos;re actually building.
              </p>

              <p>
                i care about the weight of words. not in a pedantic way, but in the sense that
                language shapes how we think, how we relate, and what we pay attention to. unclear
                communication creates more problems than most technical issues ever will. this shows
                up in how i write, how i design interfaces, and how i think about product decisions.
              </p>

              <p className="text-stone-500">p.s. lmk if you know good acai spots</p>
            </div>
          </div>
        </section>

        {/* Photo Carousel */}
        <section className="mb-32">
          <PhotoCarousel />
        </section>
      </div>

      {/* For Employers Section - Split Brain Layout */}
      <section className="relative overflow-x-auto border-t border-stone-200 bg-stone-50/50">
        <div className="flex min-w-max">
          {/* LEFT BRAIN - Fixed Identity Column (40%) */}
          <div className="flex h-screen w-screen flex-shrink-0 overflow-y-auto border-r border-stone-200 bg-white/80 px-12 py-20 backdrop-blur-sm lg:w-[40vw]">
            <div className="mx-auto w-full max-w-lg space-y-12 py-12">
              {/* Header */}
              <div className="space-y-4">
                <div>
                  <h2 className="mb-2 text-4xl font-medium tracking-tight text-stone-900">
                    nathanael
                  </h2>
                  <p className="text-base text-stone-600">riqle</p>
                </div>
                <p className="text-lg text-stone-700">
                  founder · product builder · systems thinker
                </p>
              </div>

              {/* Context Snapshot */}
              <div className="space-y-3 border-l-2 border-stone-900 pl-6">
                <p className="text-sm text-stone-600">based in sydney</p>
                <p className="text-sm text-stone-600">building education systems</p>
                <p className="text-sm text-stone-600">design-led, metric-driven</p>
              </div>

              {/* Philosophy */}
              <div className="space-y-6">
                <p className="text-sm font-medium text-stone-500">what i care about</p>
                <div className="space-y-4 text-sm leading-relaxed text-stone-700">
                  <p>systems outperform motivation. discipline beats inspiration every time.</p>
                  <p>
                    clarity compounds. unclear language creates more problems than technical
                    difficulty.
                  </p>
                  <p>products should teach users how to succeed, not just give them features.</p>
                  <p>autonomy matters more than prestige. ownership over titles.</p>
                  <p>honest conversations. the kind that happen at 1am when pretense falls away.</p>
                </div>
              </div>

              {/* Background */}
              <div className="space-y-4 border-t border-stone-200 pt-8">
                <p className="text-sm font-medium text-stone-500">how i got here</p>
                <div className="space-y-3 text-sm text-stone-700">
                  <p>started in computer science. left when it felt like the wrong fit.</p>
                  <p>founded markpoint. learned by building.</p>
                  <p>ui/ux internship at breville. saw how real teams work.</p>
                  <p>
                    self-taught across product, ux, growth. found my own path when traditional ones
                    didn&apos;t click.
                  </p>
                  <p>now studying exercise science, pathway toward medicine.</p>
                </div>
              </div>

              {/* Human Element */}
              <div className="space-y-4 border-t border-stone-200 pt-8">
                <p className="text-sm font-medium text-stone-500">beyond work</p>
                <div className="space-y-3 text-sm text-stone-700">
                  <p>guitar, bass, keys, drums, sax</p>
                  <p>drawing and visual thinking</p>
                  <p>1am theological conversations</p>
                  <p>running and swimming</p>
                  <p>clarity through language</p>
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
