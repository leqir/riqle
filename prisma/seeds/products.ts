/**
 * Product Seed Data - Epic 8 Resources
 *
 * Created: 2026-01-04
 * Products must meet Epic 8 inclusion standards:
 * - Based on 50+ hours teaching experience
 * - Would recommend to family without payment
 * - Defensible in job interviews
 * - Current and accurate
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProducts() {
  console.log('Seeding products...');

  // Get the first admin user for authorId
  const adminUser = await prisma.user.findFirst({
    where: {
      UserRole: {
        some: {
          Role: {
            name: 'admin',
          },
        },
      },
    },
  });

  if (!adminUser) {
    console.log('No admin user found, skipping product seeding');
    return;
  }

  // Product 1: 1984 Common Module Exemplar Essay
  const product1 = await prisma.product.upsert({
    where: { slug: 'common-module-1984-exemplar-essay' },
    update: {},
    create: {
      slug: 'common-module-1984-exemplar-essay',
      title: '1984 Common Module Exemplar Essay',
      description:
        'Band 6 exemplar essay for HSC English Advanced Common Module, analyzing George Orwell\'s "1984" with detailed annotations.',

      // Positioning (Epic 8: Who it's for and NOT for)
      targetAudience:
        'HSC English Advanced students (Year 12, 2025) studying 1984 for Common Module who need a concrete example of Band 6 essay structure and analysis.',
      nonAudience:
        'This is NOT for university students, HSC English Standard, or students looking for an essay to copy. This is a learning tool to understand Band 6 technique, not a template to plagiarize.',

      // Content sections (Epic 8: 7 required sections)
      whatItIs: `<p>A complete Band 6 exemplar essay (20/20 standard) for HSC English Advanced Common Module analyzing George Orwell's "1984".</p>

<p>This essay demonstrates:</p>
<ul>
  <li>How to analyze a Common Module question and develop a strong thesis</li>
  <li>Evidence selection and integration from "1984"</li>
  <li>Sophisticated analysis techniques that achieve Band 6</li>
  <li>Clear paragraph structure and argument development</li>
  <li>How to meet HSC 2025 marking criteria</li>
</ul>

<p>The essay includes annotations explaining <em>why</em> each technique works, so you can apply the same approach to your own writing.</p>`,

      whatItCovers: `<ul>
  <li><strong>Full exemplar essay:</strong> Complete 1200-1500 word response to a Common Module question</li>
  <li><strong>Question analysis:</strong> How to break down prompts and identify key terms</li>
  <li><strong>Thesis development:</strong> Crafting a sophisticated, arguable thesis statement</li>
  <li><strong>Evidence selection:</strong> Choosing the most effective quotes from "1984"</li>
  <li><strong>Analysis technique:</strong> Moving beyond description to sophisticated interpretation</li>
  <li><strong>Paragraph structure:</strong> Topic sentences, evidence integration, and linking</li>
  <li><strong>Annotations:</strong> Detailed explanations of techniques and why they work</li>
</ul>`,

      howItWasCreated: `<p>This essay was developed from teaching 100+ HSC English students through the Common Module, both in classroom and private tutoring settings.</p>

<p>It incorporates the most effective analysis techniques I observed across hundreds of tutoring sessions, refined based on actual HSC marking feedback and student results. The structure reflects what consistently achieved Band 6 outcomes—not theory, but proven technique.</p>

<p>Every annotation is based on real questions students asked and challenges they faced. This isn't a generic essay; it's the distillation of what actually works when teaching "1984" for HSC English Advanced.</p>`,

      // Delivery
      format: 'PDF',
      whatYouGet: `<ul>
  <li><strong>Annotated exemplar essay (PDF):</strong> Full essay with detailed margin notes explaining technique</li>
  <li><strong>Question breakdown guide:</strong> How to analyze Common Module prompts</li>
  <li><strong>Evidence selection framework:</strong> Choosing effective quotes from "1984"</li>
  <li><strong>Self-assessment checklist:</strong> Compare your essays against Band 6 criteria</li>
</ul>

<p>Instant download after purchase. All materials optimized for printing or digital reading.</p>`,

      // Pricing (Epic 8: Fair pricing methodology)
      // Floor price: 20 hours development × $50/hour ÷ 50 expected sales = $20
      // Value price: Equivalent to 1 tutoring session analyzing essays = $70-80
      // Fair price: $20 + ($75 - $20) × 0.7 (high confidence) = $58.50 → $59
      priceInCents: 5900, // $59 AUD
      currency: 'AUD',

      // Cross-linking (Epic 8: Credibility before commerce)
      relatedPostSlugs: [], // Would link to essays about teaching frameworks if they existed
      relatedProjectSlugs: [], // Would link to MarkPoint or other teaching projects

      // Metadata
      featured: true,
      displayOrder: 1,
      published: true, // Set to false initially if you want to review first

      // SEO
      metaTitle: '1984 Common Module Exemplar Essay - HSC English Advanced Band 6',
      metaDescription:
        'Band 6 exemplar essay for HSC English Advanced Common Module analyzing George Orwell\'s "1984". Based on teaching 100+ students with detailed annotations explaining technique.',
      ogImage: null, // Could add a preview image later

      // Note: stripeProductId and stripePriceId will be created automatically on first checkout
      // downloadUrls will be added after PDF is uploaded to storage
    },
  });

  console.log(`Created product: ${product1.title}`);

  // You can add more products here following the same pattern
  // Each must pass Epic 8 inclusion standards

  console.log('Product seeding complete!');
}
