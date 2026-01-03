/**
 * Resources Page - Trust-First Educational Commerce
 *
 * Epic 8 - Story 8.4: Resources Listing Page
 *
 * Philosophy:
 * - Commerce as infrastructure, not identity
 * - Three-audience success: employers, students, operator
 * - Calm presentation (no urgency, hype, or pressure)
 * - Credibility before commerce
 *
 * Containment Rules:
 * - All commerce lives exclusively on /resources
 * - NO urgency language ("Buy now", "Limited time")
 * - NO hype language ("Transform your results")
 * - Informational tone, never promotional
 */

import { type Metadata } from 'next';
import { db } from '@/lib/db';
import { ResourceCard } from '@/components/resources/resource-card';

export const metadata: Metadata = {
  title: 'Resources | Nathanael',
  description:
    'Educational resources based on real teaching experience with 500+ HSC English students.',
};

export default async function ResourcesPage() {
  // Fetch published products, ordered by display order
  const products = await db.product.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
    select: {
      slug: true,
      title: true,
      description: true,
      format: true,
      priceInCents: true,
      currency: true,
      featured: true,
      targetAudience: true,
    },
  });

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-16">
          <h1 className="mb-6 text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-stone-900">
            Resources
          </h1>

          {/* Philosophy Intro - Epic 8 Story 8.1 */}
          <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-stone-600">
            <p>
              Educational materials created from teaching 500+ HSC English students to Band 6.
              Based on real experience, not theory.
            </p>
            <p>
              Every resource here is something I'd recommend to family—proven frameworks,
              tested approaches, and practical guidance grounded in what actually worked.
            </p>
          </div>
        </header>

        {/* Resources List - Clean list layout (not grid) */}
        {products.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-lg text-stone-600">
              No resources available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <ResourceCard
                key={product.slug}
                slug={product.slug}
                title={product.title}
                description={product.description}
                format={product.format}
                priceInCents={product.priceInCents}
                currency={product.currency}
                featured={product.featured}
                targetAudience={product.targetAudience}
              />
            ))}
          </div>
        )}

        {/* Trust-building footer note */}
        <footer className="mt-16 rounded-2xl border border-stone-200 bg-stone-50 p-8">
          <h3 className="mb-3 text-lg font-semibold text-stone-900">Refund Policy</h3>
          <p className="text-base leading-relaxed text-stone-600">
            14-day refund, no questions asked. If a resource doesn't work for you, just email
            and I'll refund immediately. The goal is to help students, not extract revenue.
          </p>
        </footer>
      </div>
    </div>
  );
}
