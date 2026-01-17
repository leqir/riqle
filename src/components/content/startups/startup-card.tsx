/**
 * StartupCard Component - Apple-inspired Design
 *
 * Epic 6 - Story 6.3: Professional record, not sales page
 *
 * Features:
 * - Clean typography following Apple HIG
 * - Clear role and status display
 * - Hand-drawn arrow icon
 * - Strategic design matching Work portfolio
 */

'use client';

import Link from 'next/link';
import { HandDrawnArrowRight } from '@/components/design-system/icons/hand-drawn-arrow-right';

type StartupCardProps = {
  slug: string;
  name: string;
  description: string;
  role: string;
  status: string;
};

export function StartupCard({ slug, name, description, role, status }: StartupCardProps) {
  return (
    <Link
      href={`/startups/${slug}`}
      className="group block rounded-2xl border border-stone-200 bg-white p-8 transition-all duration-200 hover:border-stone-300 hover:shadow-lg"
    >
      {/* Name & Status */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold text-stone-900 transition-colors duration-200 group-hover:text-blue-600">
          {name}
        </h3>
        <span className="text-sm font-medium text-stone-500">{status}</span>
      </div>

      {/* Description */}
      <p className="mb-6 text-lg leading-relaxed text-stone-700">{description}</p>

      {/* Role */}
      <div className="mb-4 text-base text-stone-600">
        <span>
          <strong className="font-semibold text-stone-900">Role:</strong> {role}
        </span>
      </div>

      {/* CTA */}
      <div className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-colors duration-200 group-hover:text-blue-700">
        View details
        <HandDrawnArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
