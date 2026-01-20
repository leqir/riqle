/**
 * ProjectDetail Component - Minimalist, Stripe-Inspired Design
 *
 * Features:
 * - Clean typography with stone color palette
 * - border-l-2 border-stone-900 for emphasis
 * - No colored boxes/cards
 * - Matches minimalist aesthetic from resources
 * - Text-first layout (visuals support, don't distract)
 * - Reads like a post-mortem, not a pitch
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';

type ProjectDetailProps = {
  title: string;
  overview: string;
  roleDetail: string;
  teamSize?: number | null;
  execution: string;
  outcomeDetail: string;
  reflection?: string | null;
  screenshots: string[];
  diagrams: string[];
};

export function ProjectDetail({
  title,
  overview,
  roleDetail,
  teamSize,
  execution,
  outcomeDetail,
  reflection,
  screenshots,
  diagrams,
}: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            work
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-20">
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            {title}
          </h1>
        </header>

        {/* Content Sections */}
        <div className="space-y-20">
          {/* Overview */}
          <section>
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                overview
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                what this project was
              </h2>
            </div>
            <div className="border-l-2 border-stone-900 pl-8">
              <p className="text-lg leading-relaxed text-stone-700">{overview}</p>
            </div>
          </section>

          {/* Your Role */}
          <section>
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                role
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">what you did</h2>
            </div>
            <div className="border-l-2 border-stone-900 pl-8">
              <p className="text-lg leading-relaxed text-stone-700">{roleDetail}</p>
              {teamSize !== null && teamSize !== undefined && (
                <p className="mt-4 text-sm text-stone-600">
                  team size:{' '}
                  {teamSize === 0
                    ? 'solo project'
                    : `${teamSize} ${teamSize === 1 ? 'person' : 'people'}`}
                </p>
              )}
            </div>
          </section>

          {/* Execution */}
          <section>
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                execution
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                how it was built
              </h2>
            </div>
            <div className="border-l-2 border-stone-900 pl-8">
              <p className="text-lg leading-relaxed text-stone-700">{execution}</p>
            </div>
          </section>

          {/* Outcome */}
          <section>
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                outcome
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                what happened
              </h2>
            </div>
            <div className="border-l-2 border-stone-900 pl-8">
              <p className="text-lg leading-relaxed text-stone-700">{outcomeDetail}</p>
            </div>
          </section>

          {/* Reflection (optional) */}
          {reflection && (
            <section>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  reflection
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                  what you learned
                </h2>
              </div>
              <div className="border-l-2 border-stone-300 pl-8">
                <p className="text-lg leading-relaxed text-stone-600">{reflection}</p>
              </div>
            </section>
          )}

          {/* Diagrams (if any) - shown before screenshots */}
          {diagrams.length > 0 && (
            <section>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  architecture
                </p>
              </div>
              <div className="space-y-8 border-l-2 border-stone-300 pl-8">
                {diagrams.map((url, index) => (
                  <div key={index} className="overflow-hidden">
                    <Image
                      src={url}
                      alt={`${title} architecture diagram ${index + 1}`}
                      width={800}
                      height={600}
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Screenshots (sparingly - max 3) */}
          {screenshots.length > 0 && (
            <section>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  screenshots
                </p>
              </div>
              <div className="space-y-8 border-l-2 border-stone-300 pl-8">
                {screenshots.slice(0, 3).map((url, index) => (
                  <div key={index} className="overflow-hidden">
                    <Image
                      src={url}
                      alt={`${title} screenshot ${index + 1}`}
                      width={800}
                      height={600}
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
