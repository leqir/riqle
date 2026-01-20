/**
 * Essay Component - Minimalist, Stripe-Inspired Design
 *
 * Features:
 * - Clean typography with stone color palette
 * - border-l-2 border-stone-900 for emphasis
 * - No colored boxes/cards
 * - Matches minimalist aesthetic from resources and work
 * - Library feel, not blog
 * - Cross-linking to related Work and Startups
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';

type RelatedItem = {
  slug: string;
  title: string;
};

type EssayProps = {
  title: string;
  description: string;
  content: string;
  contextLine?: string | null;
  publishedAt: Date | null;
  readingTime?: number | null;
  diagramUrl?: string | null;
  theme?: string | null;
  relatedProjects?: RelatedItem[];
  relatedStartups?: RelatedItem[];
};

export function Essay({
  title,
  description: _description,
  content,
  contextLine,
  publishedAt,
  readingTime,
  diagramUrl,
  theme,
  relatedProjects,
  relatedStartups,
}: EssayProps) {
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt))
    : null;

  return (
    <article className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <Link
            href="/writing"
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
            writing
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-16">
          {/* Theme label */}
          {theme && (
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">
              {theme}
            </p>
          )}

          {/* Title */}
          <h1 className="mb-6 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            {title}
          </h1>

          {/* Context line */}
          {contextLine && (
            <p className="mb-6 border-l-2 border-stone-300 pl-8 text-xl italic leading-relaxed text-stone-600">
              {contextLine}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-stone-600">
            {formattedDate && <span>{formattedDate}</span>}
            {readingTime && (
              <>
                <span className="text-stone-400">·</span>
                <span>{readingTime} min</span>
              </>
            )}
          </div>
        </header>

        {/* Essay Body */}
        <div className="mb-20 border-l-2 border-stone-900 pl-8">
          <div
            className="prose prose-stone prose-lg max-w-none leading-relaxed text-stone-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Diagram (max 1) */}
        {diagramUrl && (
          <div className="mb-20">
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                diagram
              </p>
            </div>
            <div className="border-l-2 border-stone-300 pl-8">
              <div className="overflow-hidden">
                <Image
                  src={diagramUrl}
                  alt={`${title} diagram`}
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Related Content */}
        {(relatedProjects?.length || relatedStartups?.length) && (
          <footer className="border-t border-stone-200 pt-12">
            <h3 className="mb-8 text-sm font-semibold uppercase tracking-wider text-stone-900">
              related
            </h3>

            <div className="space-y-8">
              {/* Related Work Projects */}
              {relatedProjects && relatedProjects.length > 0 && (
                <div>
                  <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-500">
                    work
                  </h4>
                  <ul className="space-y-2">
                    {relatedProjects.map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={`/work/${project.slug}`}
                          className="block text-sm text-stone-700 transition-colors hover:text-stone-900"
                        >
                          {project.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Startups */}
              {relatedStartups && relatedStartups.length > 0 && (
                <div>
                  <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-500">
                    startups
                  </h4>
                  <ul className="space-y-2">
                    {relatedStartups.map((startup) => (
                      <li key={startup.slug}>
                        <Link
                          href={`/startups/${startup.slug}`}
                          className="block text-sm text-stone-700 transition-colors hover:text-stone-900"
                        >
                          {startup.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </footer>
        )}
      </div>
    </article>
  );
}
