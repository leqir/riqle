/**
 * EssayCard Component - Apple-inspired Design
 *
 * Epic 7 - Story 7.3: Writing Page Structure
 *
 * Features:
 * - Clean typography following Apple HIG
 * - Shows title, description, date, reading time
 * - Optional theme badge
 * - Hand-drawn arrow icon
 * - Library feel, not blog
 */

'use client';

import Link from 'next/link';
import { HandDrawnArrowRight } from '@/components/icons/hand-drawn-arrow-right';

type EssayCardProps = {
  slug: string;
  title: string;
  description: string;
  publishedAt: Date | null;
  readingTime?: number | null;
  theme?: string | null;
};

export function EssayCard({
  slug,
  title,
  description,
  publishedAt,
  readingTime,
  theme,
}: EssayCardProps) {
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt))
    : null;

  return (
    <Link
      href={`/writing/${slug}`}
      className="group block rounded-2xl border border-stone-200 bg-white p-8 transition-all duration-200 hover:border-stone-300 hover:shadow-lg"
    >
      {/* Title & Theme */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold text-stone-900 transition-colors duration-200 group-hover:text-indigo-600">
          {title}
        </h3>
        {theme && (
          <span className="text-sm font-medium text-stone-500">{theme}</span>
        )}
      </div>

      {/* Description */}
      <p className="mb-6 text-lg leading-relaxed text-stone-700">{description}</p>

      {/* Meta */}
      <div className="mb-4 flex items-center gap-4 text-base text-stone-600">
        {formattedDate && <span>{formattedDate}</span>}
        {readingTime && (
          <>
            <span className="text-stone-400">·</span>
            <span>{readingTime} min read</span>
          </>
        )}
      </div>

      {/* CTA */}
      <div className="inline-flex items-center gap-2 text-base font-semibold text-indigo-600 transition-colors duration-200 group-hover:text-indigo-700">
        Read essay
        <HandDrawnArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
