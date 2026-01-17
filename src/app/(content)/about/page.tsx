/**
 * About Page - Minimalist Design
 *
 * Features:
 * - Lowercase aesthetic throughout
 * - No images or decorative elements
 * - Clean typography and spacing
 * - Consistent minimalistic UI
 * - Split-brain layout for employer section with scroll-sync
 */

'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-stone-200">
        <div className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-32">
          <div className="space-y-8">
            <div>
              <p className="mb-2 text-sm text-stone-500">about</p>
              <h1 className="mb-4 text-5xl font-medium tracking-tight text-stone-900 md:text-6xl">
                hi, i'm nathanael
              </h1>
              <p className="text-xl text-stone-600">
                or better known as <span className="text-stone-900">riqle</span>
              </p>
            </div>

            <div className="border-l-2 border-stone-900 pl-6">
              <p className="text-lg leading-relaxed text-stone-700">
                formation through habits, discipline, and the systems we inhabit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="border-b border-stone-200">
        <div className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-24">
          <div className="space-y-12">
            <div>
              <p className="mb-6 text-sm text-stone-500">philosophy</p>
              <h2 className="mb-8 text-3xl font-medium tracking-tight text-stone-900">
                formation
              </h2>
            </div>

            <div className="space-y-6 text-base leading-relaxed text-stone-700">
              <p>
                i'm interested in <span className="font-medium text-stone-900">formation</span>. how people
                are shaped over time by the habits they keep, the language they use, the discipline they build,
                and the systems they inhabit. not as some abstract idea, but as a lived reality. the things
                you do every day are quietly forming you into someone, whether you're paying attention or not.
              </p>

              <p>
                i've learned to care about clarity early. unclear language, unclear ownership, and unclear
                intent create more problems than technical difficulty ever does. this applies just as much
                to people as it does to software. i've seen teams fall apart not because the code was broken,
                but because no one could agree on what "done" actually meant. clarity is kindness. ambiguity
                is violence.
              </p>

              <div className="my-10 border-l-2 border-stone-900 pl-6">
                <p className="mb-2 text-sm text-stone-500">core belief</p>
                <p className="mb-4 text-2xl font-medium text-stone-900">
                  conviction &gt; performance
                </p>
                <p className="text-base leading-relaxed">
                  my faith sits at the centre of how i try to order my life. i'm guided more by
                  restraint, accountability, and how i treat people than by what i signal publicly.
                  it informs what i say yes to, what i walk away from, and how seriously i take
                  responsibility. it's the difference between optimising for appearance and
                  optimising for integrity—and i know which one matters when no one's watching.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  this shapes everything. the products i build, the teams i want to work with,
                  the conversations i value. it's why i care more about long-term trust than
                  short-term growth, and why i'd rather be honest than impressive.
                </p>
              </div>

              <p>
                outside of work, i value routines that reward consistency. i like running and rarely
                turn it down if someone else is keen. swimming is the other constant, i go gym to swim.
              </p>

              <p>
                i enjoy yapping about theology, ethics, culture, or the political state of the world.
                i don't mind listening carefully, disagreeing honestly, and changing my mind when
                it's warranted. there's something about 1am conversations that strip away pretence—
                the kind where you're too tired to perform and end up saying what you actually think.
                deep theological talks at that hour hit different.
              </p>

              <p>
                one night driving from greystanes to parramatta around 1am, my friend put on
                "surely worthy" by common gathering. something about that moment—the quiet roads,
                the vulnerability of late-night honesty, the weight of the conversation we were having—
                made that song hit harder than it probably should have. it became one of those moments
                you remember not for what happened, but for how it felt. now whenever i hear it,
                i'm back in that car, having the kind of conversation that matters.
              </p>

              <p>
                i once to compete in geoguessr (top 50 aus) before taking a break. if anyone can
                beat me in geoguessr or even gamepigeon word hunt i'll give them $20.
              </p>

              <p>
                music has always hovered in the background. i genuinely enjoy jamming with others—
                i play guitar, bass, keys, and mess around with drums when the opportunity presents itself.
                the idea of forming a band resurfaces every so often. it hasn't happened yet, but
                the pull is real. there's something meditative about improvising with people who get the rhythm.
                it's less about performance and more about connecting with something honest.
              </p>

              <p>
                i draw and sketch when i need to think through something visually. it's less about
                "being an artist" and more about working through ideas in a different medium.
                sometimes the clearest way to understand a system is to map it by hand. there's a
                particular kind of clarity that comes from putting pen to paper—slowing down enough
                to see what you're actually building.
              </p>

              <p>
                i care about the weight of words. not in a pedantic way, but in the sense that language
                shapes how we think, how we relate, and what we pay attention to. unclear communication
                creates more problems than most technical issues ever will. this shows up in how i write,
                how i design interfaces, and how i think about product decisions.
              </p>

              <p className="text-stone-500">
                p.s. lmk if you know good acai spots
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers Section - Split Brain Layout */}
      <section className="relative overflow-x-auto border-b border-stone-200 bg-stone-50">
        <div className="flex min-w-max">
          {/* LEFT BRAIN - Fixed Identity Column (40%) */}
          <div className="flex h-screen w-screen flex-shrink-0 overflow-y-auto border-r border-stone-200 bg-white px-12 py-20 lg:w-[40vw]">
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
                  <p id="principle-systems" className="transition-colors duration-200">
                    systems outperform motivation. discipline beats inspiration every time.
                  </p>
                  <p id="principle-clarity" className="transition-colors duration-200">
                    clarity compounds. unclear language creates more problems than technical
                    difficulty.
                  </p>
                  <p id="principle-products" className="transition-colors duration-200">
                    products should teach users how to succeed, not just give them features.
                  </p>
                  <p id="principle-autonomy" className="transition-colors duration-200">
                    autonomy matters more than prestige. ownership over titles.
                  </p>
                  <p className="transition-colors duration-200">
                    honest conversations. the kind that happen at 1am when pretence falls away.
                  </p>
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
                    self-taught across product, ux, growth. found my own path when traditional
                    ones didn't click.
                  </p>
                  <p>now studying exercise science, pathway toward medicine.</p>
                </div>
              </div>

              {/* Human Element */}
              <div className="space-y-4 border-t border-stone-200 pt-8">
                <p className="text-sm font-medium text-stone-500">beyond work</p>
                <div className="space-y-3 text-sm text-stone-700">
                  <p>guitar, bass, keys, drums</p>
                  <p>drawing and visual thinking</p>
                  <p>1am theological conversations</p>
                  <p>running and swimming</p>
                  <p>clarity through language</p>
                </div>
              </div>

              {/* Favourite Song */}
              <div className="space-y-3 border-t border-stone-200 pt-8">
                <p className="text-xs font-medium text-stone-500">currently on repeat</p>
                <div className="border-l-2 border-stone-900 pl-4">
                  <p className="text-sm italic text-stone-700">
                    "surely worthy" — common gathering
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">
                    1am drives from greystanes to parramatta. quiet roads. deep conversations.
                    some songs just hit different in the right moment.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT BRAIN - Scrolling Execution Column (60%) */}
          <div className="h-screen w-screen flex-shrink-0 overflow-y-auto px-6 py-20 md:px-12 lg:w-[60vw]">
            <div className="mx-auto w-full max-w-3xl space-y-16">
              <div>
                <p className="mb-2 text-sm text-stone-500">for employers</p>
                <p className="text-sm text-stone-600">this section is factual by design</p>
              </div>

              {/* Product */}
              <section id="section-product" className="space-y-8">
              <div>
                <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                  product
                </h3>
                <p className="text-sm text-stone-600">systems shipped end-to-end</p>
              </div>

              <div className="space-y-8">
                <div className="border-l-2 border-stone-900 pl-6">
                  <h4 className="mb-3 text-lg font-medium text-stone-900">
                    markpoint — ai-powered edtech platform
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
                    <p className="mb-3 text-xs font-medium text-stone-500">01 / full-stack development</p>
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
                    <p>• accountable for correctness, usability, performance, and maintainability</p>
                    <p>• decisions optimised for long-term iteration, not demos</p>
                  </div>
                </div>
              </div>
            </section>

            {/* UX / Design */}
            <section id="section-ux" className="space-y-8">
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
                  <p className="text-sm text-stone-600">
                    → clarity under exam pressure
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-stone-700">
                <p>
                  i sought brand and product positioning from zero and using knowledge from my
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
                  <p>clarity &gt; novelty</p>
                  <p>trust &gt; growth-at-all-costs</p>
                  <p>premium positioning in a crowded edtech market</p>
                </div>
              </div>
            </section>

            {/* Systems & Growth */}
            <section id="section-growth" className="space-y-8">
              <div>
                <h3 className="mb-2 text-3xl font-medium tracking-tight text-stone-900">
                  systems & growth
                </h3>
                <p className="text-sm text-stone-600">design meets behaviour</p>
              </div>

              <div className="space-y-4 text-sm text-stone-700">
                <p className="font-medium">marketing & go-to-market execution</p>
                <p>i propelled early gtm strategy and execution including:</p>
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
                  • handling early sales conversions, pricing decisions, and willing-to-pay testing
                </p>
              </div>

              <div className="border-l-2 border-stone-300 pl-6">
                <p className="mb-3 text-xs font-medium text-stone-500">concepts actively applied</p>
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
                <p>
                  • balancing monetisation with long-term trust in an educational context
                </p>
              </div>
            </section>

            {/* Results */}
            <section id="section-results" className="space-y-8">
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
                    <p>• values clarity, judgement, and work that compounds</p>
                    <p>• low tolerance for performative process</p>
                  </div>
                </div>
              </div>
            </section>
            </div>
          </div>
        </div>

        {/* Mobile Fallback - Traditional Layout */}
        <div className="mx-auto max-w-3xl px-6 py-20 lg:hidden">
          <div className="space-y-12">
            <div>
              <p className="mb-2 text-sm text-stone-500">for employers</p>
              <p className="text-sm text-stone-600">this section is factual by design</p>
            </div>

            {/* Current Focus */}
            <div className="space-y-8">
              <h2 className="text-2xl font-medium tracking-tight text-stone-900">
                current focus
              </h2>

              <div className="space-y-6">
                <div className="border-l-2 border-stone-300 pl-6">
                  <h3 className="mb-2 text-lg font-medium text-stone-900">markpoint</h3>
                  <p className="text-base text-stone-600">
                    founding developer and brand lead (2025-present)
                  </p>
                </div>

                <div className="border-l-2 border-stone-300 pl-6">
                  <h3 className="mb-2 text-lg font-medium text-stone-900">full ownership</h3>
                  <p className="text-base text-stone-600">
                    across product, engineering, and brand execution
                  </p>
                </div>

                <div className="border-l-2 border-stone-300 pl-6">
                  <h3 className="mb-2 text-lg font-medium text-stone-900">education</h3>
                  <p className="text-base text-stone-600">
                    concurrently studying exercise science, with a pathway towards medicine
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile content continues with original structure */}
            <div className="space-y-8">
              <h2 className="text-2xl font-medium tracking-tight text-stone-900">
                product & engineering
              </h2>

              <p className="text-base leading-relaxed text-stone-700">
                at markpoint, i designed and engineered the product end-to-end, including:
              </p>

              <div className="space-y-8">
                <div>
                  <p className="mb-3 text-sm text-stone-500">01 / full-stack development</p>
                  <ul className="space-y-2 text-base text-stone-700">
                    <li>• next.js 14</li>
                    <li>• react</li>
                    <li>• typescript</li>
                    <li>• supabase</li>
                  </ul>
                </div>

                <div>
                  <p className="mb-3 text-sm text-stone-500">
                    02 / architecture & implementation of postgresql database
                  </p>
                  <ul className="space-y-2 text-base text-stone-700">
                    <li>• schema design</li>
                    <li>• row-level security (rls)</li>
                    <li>• role-based access control</li>
                    <li>• auth flows and permissions</li>
                  </ul>
                </div>

                <div>
                  <p className="mb-3 text-sm text-stone-500">
                    03 / implementation of restful api routes & server logic
                  </p>
                  <ul className="space-y-2 text-base text-stone-700">
                    <li>• restful api routes</li>
                    <li>• server-side logic</li>
                    <li>• data validation</li>
                  </ul>
                </div>

                <div>
                  <p className="mb-3 text-sm text-stone-500">
                    04 / setup of ci/cd pipelines, test coverage & deployment
                  </p>
                  <ul className="space-y-2 text-base text-stone-700">
                    <li>• ci/cd pipelines</li>
                    <li>• basic test coverage</li>
                    <li>• deployment workflows</li>
                    <li>• delivery of production b2c system used by real hsc students</li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 border-t border-stone-200 pt-8">
                <p className="mb-6 text-sm text-stone-500">operating model</p>
                <div className="space-y-3 text-base text-stone-700">
                  <p>• no separation between design, engineering, and product</p>
                  <p>
                    • accountable for correctness, usability, performance, and maintainability
                  </p>
                  <p>• decisions optimised for long-term iteration, not demos</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-medium tracking-tight text-stone-900">
                design, brand & product positioning
              </h2>
              <div className="space-y-4 text-base text-stone-700">
                <p>
                  i sought brand and product positioning from zero and using knowledge from my
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
              <div className="border-l-2 border-stone-300 pl-6">
                <p className="mb-3 text-sm text-stone-500">focus areas</p>
                <div className="space-y-2 text-base text-stone-700">
                  <p>clarity &gt; novelty</p>
                  <p>trust &gt; growth-at-all-costs</p>
                  <p>premium positioning in a crowded edtech market</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-medium tracking-tight text-stone-900">
                marketing & go-to-market execution
              </h2>
              <div className="space-y-4 text-base text-stone-700">
                <p>i propelled early gtm strategy and execution including:</p>
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
                  • handling early sales conversions, pricing decisions, and willing-to-pay testing
                </p>
              </div>
              <div className="border-l-2 border-stone-300 pl-6">
                <p className="mb-3 text-sm text-stone-500">concepts actively applied</p>
                <div className="space-y-2 text-base text-stone-700">
                  <p>activation metrics • retention and cohort thinking</p>
                  <p>churn drivers • value-based pricing</p>
                  <p>feedback loops between product and acquisition</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-medium tracking-tight text-stone-900">
                sales & commercial thinking
              </h2>
              <div className="space-y-3 text-base text-stone-700">
                <p>• experience with early-stage sales motion</p>
                <p>• handling inbound leads and outbound conversations</p>
                <p>• qualifying users based on fit rather than volume</p>
                <p>• iterating pricing and packaging based on usage patterns and objections</p>
                <p>
                  • balancing monetisation with long-term trust in an educational context
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-medium tracking-tight text-stone-900">
                teaching & communication
              </h2>
              <div className="space-y-3 text-base text-stone-700">
                <p>background in tutoring, particularly senior secondary english:</p>
                <p>• private tutor (years 10-12)</p>
                <p>• delivery of detailed written and verbal feedback</p>
                <p>• experience translating complex ideas for mixed-ability cohorts</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-medium tracking-tight text-stone-900">
                working style
              </h2>
              <div className="space-y-3 text-base text-stone-700">
                <p>• strong preference for small, accountable teams</p>
                <p>• comfortable with ambiguity when ownership is clear</p>
                <p>• bias toward shipping and iterating with real users</p>
                <p>• values clarity, judgement, and work that compounds</p>
                <p>• low tolerance for performative process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-stone-200 bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <p className="text-base text-stone-600">
            a conventional resume with full chronology and references is available on request.
          </p>
        </div>
      </section>
    </div>
  );
}
