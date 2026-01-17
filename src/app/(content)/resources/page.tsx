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
import { Card, Badge, MetaInfo, PageHero } from '@/components/ui';

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
        <PageHero
          title="Resources"
          description="Educational materials created from teaching 500+ HSC English students to Band 6—proven frameworks, tested approaches, and practical guidance grounded in real experience."
        />

        {/* Resources List - Clean list layout (not grid) */}
        {products.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-lg text-stone-600">No resources available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {products.map((product) => {
              const price = (product.priceInCents / 100).toFixed(2);
              const currencySymbol = product.currency === 'AUD' ? 'A$' : '$';

              return (
                <Card
                  key={product.slug}
                  href={`/resources/${product.slug}`}
                  title={product.title}
                  description={product.description}
                  accentColor="indigo"
                  badge={product.featured ? <Badge color="indigo">Featured</Badge> : undefined}
                  metaItems={[
                    <MetaInfo key="audience">For: {product.targetAudience}</MetaInfo>,
                    <MetaInfo key="format">
                      <span className="font-medium">{product.format}</span>
                    </MetaInfo>,
                    <MetaInfo key="price">
                      <span className="font-semibold text-stone-900">
                        {currencySymbol}
                        {price}
                      </span>
                    </MetaInfo>,
                  ]}
                />
              );
            })}
          </div>
        )}

        {/* Trust-building footer note */}
        <footer className="mt-16 rounded-2xl border border-stone-200 bg-stone-50 p-8">
          <h3 className="mb-3 text-lg font-semibold text-stone-900">Refund Policy</h3>
          <p className="text-base leading-relaxed text-stone-600">
            14-day refund, no questions asked. If a resource doesn&apos;t work for you, just email
            and I&apos;ll refund immediately. The goal is to help students, not extract revenue.
          </p>
        </footer>
      </div>
    </div>
  );
}
