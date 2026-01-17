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
import { Card, PageHero, MetaInfo, Text } from '@/components/ui';
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
        <PageHero
          icon={<HandDrawnSparkles className="h-7 w-7 text-purple-600" />}
          title="Startups"
          description="Ventures I've founded and operated—evidence of ownership, decision-making, and execution under uncertainty."
        />

        {/* Career Philosophy Section */}
        <section className="mb-16 rounded-3xl border border-stone-200/60 bg-gradient-to-br from-white/90 to-stone-50/90 p-8 backdrop-blur-xl md:p-12">
          <div className="space-y-6">
            <Text size="lg" color="secondary">
              A lot of great work happens inside established organisations. Internships at places like
              Atlassian or JPMorgan are rightly competitive, and learning within a well-run system is
              valuable.
            </Text>
            <Text size="lg" color="secondary">
              I&apos;ve chosen a different path for now.
            </Text>
            <Text size="lg" color="secondary">
              I prefer having direct responsibility over what I&apos;m building. That usually means
              smaller teams, less structure, and more exposure, but it also means the work is mine
              end-to-end.
            </Text>
            <Text size="lg" color="secondary">
              The projects here reflect that preference. They&apos;re not exercises or case studies.
              They&apos;re things that exist, are used, and are still being improved.
            </Text>
          </div>
        </section>

        {/* Startup List */}
        {startups.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-lg text-stone-600">No published startups yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {startups.map((startup) => (
              <Card
                key={startup.slug}
                href={`/startups/${startup.slug}`}
                title={startup.name}
                description={startup.description}
                accentColor="blue"
                badge={
                  <span className="text-sm font-medium text-stone-500">{startup.status}</span>
                }
                metaItems={[<MetaInfo key="role" label="Role" value={startup.role} />]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
