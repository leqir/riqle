/**
 * ResourceCard Component - Trust-First Commerce Design
 *
 * Epic 8 - Story 8.4: Resources Listing Page
 *
 * Features:
 * - Calm, neutral presentation (no urgency)
 * - Shows title, description, format, price
 * - Clean typography following site standards
 * - Links to detail page for full information
 *
 * Containment Rules:
 * - NO "Buy now" language
 * - NO urgency colors or styling
 * - Informational tone, not promotional
 */

'use client';

import Link from 'next/link';
import { HandDrawnArrowRight } from '@/components/icons/hand-drawn-arrow-right';

type ResourceCardProps = {
  slug: string;
  title: string;
  description: string;
  format: string;
  priceInCents: number;
  currency: string;
  featured?: boolean;
  targetAudience: string;
};

export function ResourceCard({
  slug,
  title,
  description,
  format,
  priceInCents,
  currency,
  featured,
  targetAudience,
}: ResourceCardProps) {
  // Format price for display
  const price = (priceInCents / 100).toFixed(2);
  const currencySymbol = currency === 'AUD' ? 'A$' : '$';

  return (
    <Link
      href={`/resources/${slug}`}
      className="group block rounded-2xl border border-stone-200 bg-white p-8 transition-all duration-200 hover:border-stone-300 hover:shadow-lg"
    >
      {/* Title & Format */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold text-stone-900 transition-colors duration-200 group-hover:text-indigo-600">
          {title}
        </h3>
        {featured && (
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            Featured
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mb-4 text-lg leading-relaxed text-stone-700">{description}</p>

      {/* Target Audience */}
      <p className="mb-6 text-base text-stone-600">For: {targetAudience}</p>

      {/* Meta: Format & Price */}
      <div className="mb-4 flex items-center gap-4 text-base text-stone-600">
        <span className="font-medium">{format}</span>
        <span className="text-stone-400">·</span>
        <span className="font-semibold text-stone-900">
          {currencySymbol}
          {price}
        </span>
      </div>

      {/* CTA - Calm language (no "Buy now") */}
      <div className="inline-flex items-center gap-2 text-base font-semibold text-indigo-600 transition-colors duration-200 group-hover:text-indigo-700">
        View details
        <HandDrawnArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
