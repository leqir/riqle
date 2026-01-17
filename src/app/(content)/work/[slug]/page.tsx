/**
 * Project Detail Page - Dynamic Route
 *
 * Epic 5 - Story 5.4: Individual Project Page Structure
 *
 * Features:
 * - Reads project from database by slug
 * - Renders ProjectDetail component
 * - Returns 404 if project not found or not published
 * - Generates metadata for SEO
 */

import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ProjectDetail } from '@/components/content/work/project-detail';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const project = await db.project.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      ogImage: true,
    },
  });

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.metaTitle || `${project.title} | Nathanael`,
    description: project.metaDescription || project.description,
    openGraph: {
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.description,
      images: project.ogImage ? [{ url: project.ogImage }] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  // Fetch project from database
  const project = await db.project.findUnique({
    where: { slug },
    select: {
      title: true,
      published: true,
      overview: true,
      roleDetail: true,
      teamSize: true,
      execution: true,
      outcomeDetail: true,
      reflection: true,
      screenshots: true,
      diagrams: true,
    },
  });

  // Return 404 if project not found or not published
  if (!project || !project.published) {
    notFound();
  }

  return (
    <ProjectDetail
      title={project.title}
      overview={project.overview}
      roleDetail={project.roleDetail}
      teamSize={project.teamSize}
      execution={project.execution}
      outcomeDetail={project.outcomeDetail}
      reflection={project.reflection}
      screenshots={project.screenshots}
      diagrams={project.diagrams}
    />
  );
}
