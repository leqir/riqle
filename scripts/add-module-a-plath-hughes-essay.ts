/**
 * Add Module A Resource: Annotated Essay on Plath & Hughes
 *
 * This script adds the comprehensively annotated exemplar essay for
 * HSC English Advanced/Extension 1 Module A: Textual Conversations
 */

import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

async function addPlathHughesEssay() {
  console.log('🚀 Adding Module A Plath/Hughes annotated essay...\n');

  // Get the English Advanced category
  const advancedCategory = await prisma.resourceCategory.findUnique({
    where: { path: 'hsc/year-12/english-advanced' },
  });

  if (!advancedCategory) {
    throw new Error('English Advanced category not found. Run resource-categories seed first.');
  }

  console.log('✓ Found English Advanced category');

  // Check if product already exists
  const existingProduct = await prisma.product.findUnique({
    where: { slug: 'module-a-plath-hughes-annotated-essay' },
  });

  if (existingProduct) {
    console.log('⚠️  Product already exists. Skipping creation.');
    await prisma.$disconnect();
    return;
  }

  // Create the product
  const product = await prisma.product.create({
    data: {
      id: createId(),
      slug: 'module-a-plath-hughes-annotated-essay',
      title: 'Annotated Exemplar Essay: Plath & Hughes (Module A)',
      updatedAt: new Date(),
      description:
        "A comprehensively annotated Band 6 exemplar essay for HSC Module A: Textual Conversations. Features complete line-by-line analysis of a sophisticated response on reinvention in Sylvia Plath's Ariel and Ted Hughes' Birthday Letters, with extensive theoretical frameworks and structural commentary.",

      // Positioning
      targetAudience:
        'HSC English Advanced and Extension 1 students (2025-2026) studying Module A: Textual Conversations who want to understand how Band 6 essays construct sophisticated arguments about textual connections. For students pursuing high-range responses through genuine engagement with literary theory, dialectical structures, and nuanced textual analysis. Designed for those who want to see the complete thought process behind every paragraph, sentence, and theoretical reference.',
      nonAudience:
        'This is NOT a generic essay template to memorise, a formulaic "Band 6 structure," or a surface-level model answer. Not suitable for students seeking quick fixes, pre-written paragraphs to copy, or those unwilling to engage with complex theoretical concepts (Derrida, Judith Butler, Harold Bloom, Bakhtin, Adrienne Rich, etc.). Requires sustained intellectual effort to understand the meta-commentary and apply analytical strategies to your own Module A texts.',

      // Content sections
      whatItIs: `<p>An intellectually rigorous, comprehensively annotated exemplar essay for HSC Module A: Textual Conversations. This responds to the question: <em>"Evaluate the role of reinvention in Plath's poetry and Hughes' poetry in enhancing your appreciation of the textual connections between these texts."</em></p>

<p>This is not merely an essay—it is a complete meta-cognitive teaching document that reveals the architectural thinking behind Band 6 Module A responses:</p>

<ul>
  <li><strong>16 pages of comprehensive annotations</strong> including overarching structural overview explaining the dialectical pattern, line-by-line analysis of introduction, body paragraphs, and conclusion, and theoretical explanations of every critical framework deployed</li>
  <li><strong>Dialectical structure:</strong> The essay mirrors the textual conversation itself—thesis (Plath), antithesis (Hughes), repeated across two thematic domains (paternity, maternity), then synthesis—demonstrating how structure can enact argument</li>
  <li><strong>Theoretical sophistication:</strong> Integrates Derrida's logocentrism, Judith Butler's performativity, Harold Bloom's anxiety of influence, Bakhtin's dialogism, Adrienne Rich's feminist theory, Viktor Shklovsky's defamiliarisation, and more—all deployed to illuminate the texts rather than decorate</li>
  <li><strong>Sophisticated textual analysis:</strong> Close reading of "Daddy," "A Picture of Otto," "Nick and the Candlestick," and "Red" with embedded quotations analysed for technique, ideology, and intertextual response</li>
  <li><strong>Contextual sophistication:</strong> Betty Friedan's The Feminine Mystique, second-wave feminism, confessional poetry movement, Plath's BBC introduction, Hughes' decades of silence, and the contested legacy</li>
</ul>

<p>Every annotation reveals the <em>why</em> behind choices: why use this theoretical framework here, why structure the argument dialectically, how to integrate quotations seamlessly, when to deploy technical terminology, how to create linking sentences that advance the argument.</p>`,

      whatItCovers: `<p>This resource demonstrates advanced Module A essay techniques through comprehensive structural and line-by-line analysis:</p>

<ul>
  <li><strong>Structural Overview:</strong> Complete explanation of dialectical pattern (Plath paragraph → Hughes response → Plath paragraph → Hughes response → synthesis) and how it mirrors the textual conversation itself</li>
  <li><strong>Introduction Analysis:</strong> Line-by-line breakdown of how to establish sophisticated thesis ("ontological necessity"), contextualise texts historically, introduce theoretical frameworks, and preview essay structure</li>
  <li><strong>Body Paragraph 1 (Daddy):</strong> Analysis of mythopoeic transformation, Holocaust imagery as "transgressive birth" (Axelrod), nursery rhyme form creating power asymmetry, vampire imagery as performative exorcism</li>
  <li><strong>Body Paragraph 2 (A Picture of Otto):</strong> Hughes' counter-mythology, Harold Bloom's revisionary ratio, transformation of Prussian identity from menace to dignity, solidarity between Otto and Hughes as "fellow victims," Wilfred Owen allusion</li>
  <li><strong>Body Paragraph 3 (Nick and the Candlestick):</strong> Plath's defamiliarisation of motherhood, cave/womb/suburb extended metaphor, piranha/communion imagery subverting maternal ideal, structural volta to tenderness, Nativity transformation</li>
  <li><strong>Body Paragraph 4 (Red):</strong> Hughes inverting Plath's colour symbolism, blue as motherhood vs red as self-destruction, semantic field accumulation, "Aztec altar" domestic space, final poignancy of "the jewel you lost was blue"</li>
  <li><strong>Conclusion Analysis:</strong> How to synthesise dialectical tension, acknowledge "irreducible" conflict between reinventions, demonstrate enhanced appreciation through "mutual exposure," create intellectual closure without falsely resolving the conversation</li>
</ul>

<p><strong>Theoretical Frameworks Demonstrated:</strong></p>
<ul>
  <li>Jacques Derrida's logocentrism and deconstruction</li>
  <li>Judith Butler's theory of performativity and gender construction</li>
  <li>Harold Bloom's anxiety of influence and revisionary ratios</li>
  <li>Mikhail Bakhtin's dialogism and textual conversation</li>
  <li>Adrienne Rich's feminist analysis of motherhood as institution vs experience</li>
  <li>Viktor Shklovsky's formalist concept of defamiliarisation</li>
  <li>Stephen Gould Axelrod's reading of "Daddy" as transgressive birth</li>
  <li>Post-structuralist understanding of language constructing reality</li>
  <li>Jungian archetypes and collective unconscious</li>
</ul>

<p><strong>Technical Skills Revealed:</strong></p>
<ul>
  <li>How to integrate theoretical frameworks organically (not decoratively)</li>
  <li>Creating topic sentences that make sophisticated evaluative claims</li>
  <li>Embedding quotations seamlessly within analytical sentences</li>
  <li>Analysing techniques (sound patterning, metaphor, allusion) for ideological function</li>
  <li>Making linking sentences that advance dialectical argument</li>
  <li>Using scholarly references strategically (Axelrod, Wagner, Friedan, Rich)</li>
  <li>Balancing textual evidence with conceptual analysis</li>
  <li>Maintaining coherent argument across complex structure</li>
  <li>Deploying technical terminology precisely (metalepsis, heteroglossia, ontological)</li>
  <li>Creating synthesis that acknowledges irreducible tensions</li>
</ul>

<p><strong>Meta-Cognitive Commentary Included:</strong></p>
<p>The annotations explain not just <em>what</em> the essay does but <em>why</em> it works: why "ontological necessity" elevates the discussion, why "merely" dismisses surface readings, how "mythic architecture" combines temporal and spatial metaphors, why Derrida is invoked with careful qualification ("what Derrida would term"), how "dialogic" invokes Bakhtin while describing the conversation's structure.</p>`,

      howItWasCreated: `<p>This annotated essay emerged from years of teaching HSC English Advanced and Extension 1 at the highest level, working with students tackling Module A: Textual Conversations with genuine intellectual ambition.</p>

<p>The piece represents authentic close reading of Plath and Hughes, engaging with the theoretical frameworks that genuinely illuminate their work: post-structuralist theory for Plath's linguistic radicalism, Bloom's anxiety of influence for Hughes' responsive poems, feminist theory for both poets' treatment of gender and power.</p>

<p>The annotations make visible complete essay-writing craft: architectural decisions (why dialectical structure mirrors textual conversation), theoretical deployment (when to invoke Butler, how to qualify anachronistic theory), technical analysis (sound patterning serving ideological function), and linking strategies (maintaining coherence across complex argument).</p>

<p>Significantly, the annotations work at two levels: <strong>structural commentary</strong> explaining how the essay works as cohesive whole, and <strong>line-by-line analysis</strong> explaining specific word choices, theoretical references, and analytical moves. This dual-level teaches both macro conceptual architecture and micro execution.</p>

<p>The essay itself is not a safe, formulaic response but an intellectually ambitious argument: that reinvention is "ontological necessity" rather than mere technique, that the textual conversation operates "dialectically" without resolution, that both poets' myths are "ideologically motivated," and that meaning emerges from "irreconcilable collision" rather than synthesis.</p>

<p>Every annotation is pedagogical: explaining why this theoretical framework illuminates rather than decorates, how this linking sentence advances dialectical structure, what intellectual risks are being taken by invoking contested critics or making bold evaluative claims.</p>

<p>The piece doesn't mystify Band 6 writing as innate brilliance—it treats sophisticated literary analysis as learnable craft with identifiable techniques, systematic strategies, and replicable thinking patterns.</p>`,

      // Delivery
      format: 'PDF',
      whatYouGet: `<ul>
  <li><strong>16-page annotated exemplar (PDF):</strong> Complete essay text with extensive structural overview and line-by-line annotations explaining every analytical choice</li>
  <li><strong>Structural overview:</strong> Full explanation of dialectical pattern (thesis-antithesis across two domains, then synthesis) and how structure enacts the argument about textual conversations</li>
  <li><strong>Introduction annotations:</strong> Line-by-line breakdown of how to open sophisticatedly, establish theoretical framework, contextualise historically, and preview structure</li>
  <li><strong>Body paragraph annotations:</strong> Dense commentary on each paragraph explaining topic sentence strategy, quotation integration, theoretical deployment, technique analysis, and linking</li>
  <li><strong>Theoretical framework explanations:</strong> Clarification of what Derrida's logocentrism means, how Butler's performativity works, why Bloom's anxiety of influence applies, when Bakhtin's dialogism illuminates</li>
  <li><strong>Conclusion annotations:</strong> How to synthesise dialectical argument, acknowledge irreducible tensions, demonstrate enhanced appreciation, create intellectual closure</li>
  <li><strong>Full essay text:</strong> The complete response appears both integrated with annotations and clean at the end for straight-through reading</li>
</ul>

<p>Instant download after purchase. The PDF is designed for deep study—print it, annotate the annotations, trace how the argument develops dialectically, identify analytical moves you can adapt to your own Module A texts.</p>`,

      // Pricing
      priceInCents: 3900, // $39 AUD - consistent with other essays
      currency: 'AUD',
      pageCount: 16,

      // Cross-linking
      relatedPostSlugs: [],
      relatedProjectSlugs: [],

      // Metadata
      featured: true,
      published: true,
      tags: [
        'module-a',
        'textual-conversations',
        'plath-hughes',
        'ariel',
        'birthday-letters',
        'literary-theory',
        'annotated-essay',
        'band-6',
        'dialectical-structure',
        'feminist-criticism',
        'close-reading',
        'theoretical-frameworks',
      ],
      downloadUrls: ['/resources/hsc-module-a-plath-hughes-annotated-essay.pdf'],

      // SEO
      metaTitle: 'Module A Annotated Essay: Plath & Hughes | HSC English',
      metaDescription:
        "Comprehensively annotated Band 6 exemplar essay for Module A: Textual Conversations. 16 pages of line-by-line analysis on reinvention in Plath's Ariel and Hughes' Birthday Letters. Includes dialectical structure, theoretical frameworks (Derrida, Butler, Bloom), and sophisticated close reading techniques.",
      ogImage: null,
    },
  });

  console.log(`✓ Created product: ${product.title}`);

  // Assign to English Advanced category (primary)
  await prisma.productCategory.create({
    data: {
      id: createId(),
      productId: product.id,
      categoryId: advancedCategory.id,
      isPrimary: true,
      displayOrder: 1,
    },
  });

  console.log('✓ Assigned to English Advanced category');

  console.log('\n✅ Successfully added Module A Plath/Hughes essay!');
  console.log(`📦 Product ID: ${product.id}`);
  console.log(`🔗 Slug: ${product.slug}`);
  console.log(`💰 Price: $${product.priceInCents / 100} ${product.currency}`);
  console.log(`📄 Pages: ${product.pageCount}`);
  console.log(`🏷️  Tags: ${product.tags.join(', ')}`);

  await prisma.$disconnect();
}

addPlathHughesEssay().catch((error) => {
  console.error('❌ Error adding resource:', error);
  process.exit(1);
});
