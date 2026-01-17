/**
 * Startup Detail Page - Dynamic Route
 *
 * Epic 6 - Story 6.4: Individual Startup Page Structure
 * Epic 6 - Story 6.8: Cross-linking with Work & Writing
 *
 * Features:
 * - Reads startup from database by slug
 * - Renders StartupDetail component with related content
 * - Returns 404 if startup not found or not published
 * - Generates metadata for SEO
 */

import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { StartupDetail } from '@/components/content/startups/startup-detail';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const startup = await db.startup.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      ogImage: true,
    },
  });

  if (!startup) {
    return {
      title: 'Startup Not Found',
    };
  }

  return {
    title: startup.metaTitle || `${startup.name} | Nathanael`,
    description: startup.metaDescription || startup.description,
    openGraph: {
      title: startup.metaTitle || startup.name,
      description: startup.metaDescription || startup.description,
      images: startup.ogImage ? [{ url: startup.ogImage }] : [],
    },
  };
}

export default async function StartupPage({ params }: Props) {
  const { slug } = await params;

  // Fetch startup from database
  const startup = await db.startup.findUnique({
    where: { slug },
    select: {
      name: true,
      published: true,
      overview: true,
      whyItExists: true,
      roleDetail: true,
      role: true,
      systemsBuilt: true,
      outcomes: true,
      statusDetail: true,
      learnings: true,
      metrics: true,
      screenshots: true,
      diagrams: true,
      relatedProjectSlugs: true,
      relatedPostSlugs: true,
    },
  });

  // Return 404 if startup not found or not published
  if (!startup || !startup.published) {
    notFound();
  }

  // Fetch related projects (max 3)
  const relatedProjects =
    startup.relatedProjectSlugs.length > 0
      ? await db.project.findMany({
          where: {
            slug: { in: startup.relatedProjectSlugs.slice(0, 3) },
            published: true,
          },
          select: {
            slug: true,
            title: true,
          },
        })
      : [];

  // Fetch related posts (max 3)
  const relatedPosts =
    startup.relatedPostSlugs.length > 0
      ? await db.post.findMany({
          where: {
            slug: { in: startup.relatedPostSlugs.slice(0, 3) },
            status: 'published',
          },
          select: {
            slug: true,
            title: true,
          },
        })
      : [];

  return (
    <StartupDetail
      name={startup.name}
      overview={startup.overview}
      whyItExists={startup.whyItExists}
      roleDetail={startup.roleDetail}
      role={startup.role}
      systemsBuilt={startup.systemsBuilt}
      outcomes={startup.outcomes}
      statusDetail={startup.statusDetail}
      learnings={startup.learnings}
      metrics={startup.metrics as Record<string, string> | null}
      screenshots={startup.screenshots}
      diagrams={startup.diagrams}
      relatedProjects={relatedProjects}
      relatedPosts={relatedPosts}
    />
  );
}
