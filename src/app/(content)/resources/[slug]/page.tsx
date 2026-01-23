/**
 * Resource Detail Page - Dynamic Route
 *
 * Epic 8 - Story 8.5: Individual Resource Page
 *
 * Features:
 * - Reads product from database by slug
 * - Shows all 7 required sections (Epic 8 spec)
 * - Cross-links to related Writing/Work for credibility
 * - Calm, neutral purchase CTA (no urgency)
 * - Returns 404 if product not found or not published
 * - Generates metadata for SEO
 *
 * Epic 8 Philosophy:
 * - Three-audience success: employers, students, operator
 * - Credibility before commerce
 * - No urgency language or pressure tactics
 */

import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ResourceDetail } from '@/components/content/resources/resource-detail';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ eid?: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      ogImage: true,
    },
  });

  if (!product) {
    return {
      title: 'Resource Not Found',
    };
  }

  return {
    title: product.metaTitle || `${product.title} | Resources`,
    description: product.metaDescription || product.description,
    openGraph: {
      title: product.metaTitle || product.title,
      description: product.metaDescription || product.description,
      images: product.ogImage ? [{ url: product.ogImage }] : [],
    },
  };
}

export default async function ResourcePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { eid } = await searchParams;

  // Fetch product from database
  const product = await db.product.findUnique({
    where: { slug },
    select: {
      id: true, // Epic 8: Include product ID for checkout
      title: true,
      description: true,
      targetAudience: true,
      nonAudience: true,
      whatItIs: true,
      whatItCovers: true,
      howItWasCreated: true,
      format: true,
      whatYouGet: true,
      priceInCents: true,
      currency: true,
      stripeProductId: true,
      stripePriceId: true,
      downloadUrls: true,
      relatedPostSlugs: true,
      relatedProjectSlugs: true,
      published: true,
    },
  });

  // Return 404 if product not found or not published
  if (!product || !product.published) {
    notFound();
  }

  // Check for entitlement if eid provided
  let entitlement = null;
  if (eid) {
    entitlement = await db.entitlement.findUnique({
      where: {
        id: eid,
      },
      select: {
        id: true,
        active: true,
        productId: true,
        userId: true,
      },
    });

    // Verify entitlement is active and matches this product
    if (!entitlement || !entitlement.active || entitlement.productId !== product.id) {
      entitlement = null;
    }
  }

  // Fetch related posts for credibility (max 3)
  const relatedPosts =
    product.relatedPostSlugs.length > 0
      ? await db.post.findMany({
          where: {
            slug: { in: product.relatedPostSlugs.slice(0, 3) },
            published: true,
          },
          select: {
            slug: true,
            title: true,
          },
        })
      : [];

  // Fetch related projects for credibility (max 3)
  const relatedProjects =
    product.relatedProjectSlugs.length > 0
      ? await db.project.findMany({
          where: {
            slug: { in: product.relatedProjectSlugs.slice(0, 3) },
            published: true,
          },
          select: {
            slug: true,
            title: true,
          },
        })
      : [];

  return (
    <ResourceDetail
      productId={product.id}
      title={product.title}
      description={product.description}
      targetAudience={product.targetAudience}
      nonAudience={product.nonAudience}
      whatItIs={product.whatItIs}
      whatItCovers={product.whatItCovers}
      howItWasCreated={product.howItWasCreated}
      format={product.format}
      whatYouGet={product.whatYouGet}
      priceInCents={product.priceInCents}
      currency={product.currency}
      stripeProductId={product.stripeProductId}
      stripePriceId={product.stripePriceId}
      downloadUrls={product.downloadUrls}
      hasAccess={!!entitlement}
      entitlementId={entitlement?.id}
      relatedPosts={relatedPosts}
      relatedProjects={relatedProjects}
    />
  );
}
