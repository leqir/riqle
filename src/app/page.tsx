/**
 * Homepage - Stripe-inspired Clean Design
 *
 * Features:
 * - Clean, professional typography
 * - Strategic color accents
 * - Modular atomic design components
 * - No illustrations - pure content focus
 */

import Link from 'next/link';

// Static generation with revalidation (24 hours)
export const revalidate = 86400;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-stone-50">
      <div className="mx-auto max-w-5xl px-6 py-24 md:px-8 md:py-32">
        {/* Hero Section */}
        <section className="mb-32">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
              WELCOME TO RIQLE.COM
            </p>

            {/* Hero heading */}
            <h1 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-stone-900">
              hi, i&apos;m nathanael
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                or better known as riqle
              </span>
            </h1>

            {/* Body content */}
            <div className="mb-12 space-y-6 text-[1.125rem] leading-relaxed text-stone-700">
              <p>
                my future employers want a personal website
                <br />
                here it is.
              </p>

              <p>
                i dropped out of computer science at unsw when it became clear it wasn&apos;t the
                work i wanted to do.
              </p>

              <p>i&apos;m now studying exercise science (physio)</p>

              <p>
                during my gap term i co-founded{' '}
                <span className="font-semibold text-stone-900">markpoint</span> with three of my
                mates. i pulled out of internships to work on it.
              </p>

              <p>
                this site is where i keep my projects, startups, and work in progress.
                <br />
                <span className="text-stone-600">some things are free. some things are paid.</span>
              </p>

              <p className="text-stone-500">thanks for stopping by.</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
              >
                View Work
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/startups/markpoint"
                className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-3 text-base font-semibold text-stone-900 shadow-sm transition-all hover:border-stone-400 hover:shadow-md"
              >
                MarkPoint
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section className="mb-32">
          <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <svg
                  className="h-5 w-5 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-stone-900">Built & Shipped</h2>
            </div>

            <div className="space-y-8">
              {/* MarkPoint */}
              <div>
                <h3 className="mb-2 text-xl font-semibold text-stone-900">MarkPoint</h3>
                <p className="mb-3 text-base leading-relaxed text-stone-700">
                  Educational technology startup. Live product with real users solving complex
                  academic frameworks.
                </p>
                <Link
                  href="/startups/markpoint"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  View project
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              {/* Riqle */}
              <div className="border-t border-stone-200 pt-8">
                <h3 className="mb-2 text-xl font-semibold text-stone-900">Riqle</h3>
                <p className="mb-3 text-base leading-relaxed text-stone-700">
                  Personal platform with commerce infrastructure. T3 Stack, Stripe, full test
                  coverage.
                </p>
                <Link
                  href="/work/riqle"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  View project
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              {/* Teaching */}
              <div className="border-t border-stone-200 pt-8">
                <h3 className="mb-2 text-xl font-semibold text-stone-900">Teaching</h3>
                <p className="mb-3 text-base leading-relaxed text-stone-700">
                  500+ HSC English students over 5 years. Developed replicable frameworks that
                  consistently produce Band 6 results.
                </p>
                <Link
                  href="/about#teaching"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Read more
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Current Focus Grid */}
        <section className="mb-32">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-stone-900">Currently</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-stone-900">Focus</h3>
              <p className="text-base leading-relaxed text-stone-700">
                Building MarkPoint&apos;s core infrastructure. Creating educational tools that help
                students internalize cognitive frameworks.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                <svg
                  className="h-4 w-4 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-stone-900">Exploring</h3>
              <p className="text-base leading-relaxed text-stone-700">
                How systems scale without losing coherence—especially in education, where bad
                scaling destroys what made something work.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm md:col-span-2">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <svg
                  className="h-4 w-4 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-stone-900">Approach</h3>
              <p className="text-base leading-relaxed text-stone-700">
                Outcomes over credentials. Systems over hacks. Teaching what actually works.
                Evidence before persuasion.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Writing */}
        <section>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-stone-900">Recent Thinking</h2>

          <Link
            href="/writing"
            className="group block rounded-xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:border-stone-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-stone-900 transition-colors group-hover:text-blue-600">
                  Explore Writing
                </h3>
                <p className="text-base leading-relaxed text-stone-600">
                  Essays on education, systems, learning, product, and decision-making.
                </p>
              </div>
              <svg
                className="h-5 w-5 flex-shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
