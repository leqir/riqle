/**
 * Startups Page - Professional Record, Not Sales Page
 *
 * Epic 6 - Story 6.3: Portfolio Structure (Macro Layout)
 *
 * Features:
 * - Apple-inspired typography
 * - Curated list (1-3 startups max)
 * - Evidence of ownership, not pitch decks
 * - Scannable in 60-90 seconds
 */

import { type Metadata } from 'next';
import { db } from '@/lib/db';
import { StartupCard } from '@/components/startups/startup-card';
import { HandDrawnSparkles } from '@/components/icons/hand-drawn-sparkles';

export const metadata: Metadata = {
  title: 'Startups | Nathanael',
  description: "Ventures I've founded and operated—evidence of ownership, decision-making, and execution under uncertainty.",
};

export default async function StartupsPage() {
  // Fetch published startups, ordered by displayOrder
  const startups = await db.startup.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
    take: 3, // Max 3 startups per Epic 6 specifications
    select: {
      slug: true,
      name: true,
      description: true,
      role: true,
      status: true,
    },
  });

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-16">
          <div className="mb-6 inline-flex items-center gap-3">
            <HandDrawnSparkles className="h-7 w-7 text-purple-600" />
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-stone-900">
              Startups
            </h1>
          </div>
          <p className="max-w-2xl text-xl leading-relaxed text-stone-600">
            Ventures I&apos;ve founded and operated—evidence of ownership, decision-making, and
            execution under uncertainty.
          </p>
        </header>

        {/* Startup List */}
        {startups.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-lg text-stone-600">No published startups yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {startups.map((startup) => (
              <StartupCard
                key={startup.slug}
                slug={startup.slug}
                name={startup.name}
                description={startup.description}
                role={startup.role}
                status={startup.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
