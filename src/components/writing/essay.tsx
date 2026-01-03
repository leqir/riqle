/**
 * Essay Component - Apple-inspired Design
 *
 * Epic 7 - Story 7.4: Individual Essay Page Structure
 *
 * Features:
 * - Clean Apple HIG typography
 * - Prose styling for essay content
 * - Optional context line
 * - Optional diagram (max 1)
 * - Cross-linking to related Work and Startups
 * - Minimal visual treatment (library, not blog)
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
  description,
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
    <article className="mx-auto max-w-3xl px-6 py-24 md:px-8 md:py-32">
      {/* Header */}
      <header className="mb-12">
        {/* Theme badge */}
        {theme && (
          <div className="mb-4">
            <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              {theme}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="mb-6 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight tracking-tight text-stone-900">
          {title}
        </h1>

        {/* Context line */}
        {contextLine && (
          <p className="mb-6 text-xl italic leading-relaxed text-stone-600">{contextLine}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-base text-stone-600">
          {formattedDate && <span>{formattedDate}</span>}
          {readingTime && (
            <>
              <span className="text-stone-400">·</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </div>
      </header>

      {/* Essay Body */}
      <div className="prose prose-stone prose-lg max-w-none">
        {/* Simple content rendering - in production, use markdown parser */}
        <div
          className="space-y-6 text-lg leading-relaxed text-stone-700"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Diagram (max 1 per Epic 7 spec) */}
      {diagramUrl && (
        <div className="my-12">
          <div className="overflow-hidden rounded-xl border border-stone-200">
            <Image
              src={diagramUrl}
              alt={`${title} diagram`}
              width={800}
              height={600}
              className="h-auto w-full"
            />
          </div>
        </div>
      )}

      {/* Related Content */}
      {(relatedProjects?.length || relatedStartups?.length) && (
        <footer className="mt-16 border-t border-stone-200 pt-12">
          <h3 className="mb-6 text-2xl font-semibold text-stone-900">Related</h3>

          <div className="space-y-6">
            {/* Related Work Projects */}
            {relatedProjects && relatedProjects.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-stone-600">
                  Work
                </p>
                <ul className="space-y-2">
                  {relatedProjects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/work/${project.slug}`}
                        className="text-lg text-indigo-600 hover:text-indigo-700 hover:underline"
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
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-stone-600">
                  Startups
                </p>
                <ul className="space-y-2">
                  {relatedStartups.map((startup) => (
                    <li key={startup.slug}>
                      <Link
                        href={`/startups/${startup.slug}`}
                        className="text-lg text-indigo-600 hover:text-indigo-700 hover:underline"
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
    </article>
  );
}
