/**
 * WorkCard Component - Apple-inspired Design
 *
 * Features:
 * - Clean typography following Apple HIG
 * - Strategic glassmorphism (subtle)
 * - Clear role and outcome display
 * - Hand-drawn arrow icon
 */

'use client';

import Link from 'next/link';
import { HandDrawnArrowRight } from '@/components/design-system/icons/hand-drawn-arrow-right';

type WorkCardProps = {
  slug: string;
  title: string;
  description: string;
  role: string;
  outcome: string;
  projectStatus: string;
};

export function WorkCard({
  slug,
  title,
  description,
  role,
  outcome,
  projectStatus,
}: WorkCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className="group block rounded-2xl border border-stone-200 bg-white p-8 transition-all duration-200 hover:border-stone-300 hover:shadow-lg"
    >
      {/* Title & Status */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold text-stone-900 transition-colors duration-200 group-hover:text-blue-600">
          {title}
        </h3>
        <span className="text-sm font-medium text-stone-500">{projectStatus}</span>
      </div>

      {/* Description */}
      <p className="mb-6 text-lg leading-relaxed text-stone-700">{description}</p>

      {/* Role & Outcome */}
      <div className="mb-4 flex flex-col gap-2 text-base text-stone-600 sm:flex-row sm:items-center sm:gap-4">
        <span>
          <strong className="font-semibold text-stone-900">Role:</strong> {role}
        </span>
        <span className="hidden text-stone-400 sm:inline">•</span>
        <span>
          <strong className="font-semibold text-stone-900">Outcome:</strong> {outcome}
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
