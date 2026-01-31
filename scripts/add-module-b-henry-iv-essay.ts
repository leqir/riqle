/**
 * Add Module B Resource: Annotated Essay on Henry IV Part 1
 *
 * This script adds the comprehensively annotated exemplar essay for
 * HSC English Advanced/Extension 1 Module B: Critical Study of Literature
 */

import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

async function addHenryIVEssay() {
  console.log('🚀 Adding Module B Henry IV annotated essay...\n');

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
    where: { slug: 'module-b-henry-iv-annotated-essay' },
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
      slug: 'module-b-henry-iv-annotated-essay',
      title: 'Annotated Exemplar Essay: Henry IV Part 1 (Module B)',
      updatedAt: new Date(),
      description:
        "A comprehensively annotated Band 6 exemplar essay for HSC Module B: Critical Study of Literature. Features complete structural overview and line-by-line analysis of a sophisticated response on effective resolution in Shakespeare's King Henry IV Part 1, with extensive theoretical frameworks including Bakhtin, metatheatricality, and new historicism.",

      // Positioning
      targetAudience:
        "HSC English Advanced and Extension 1 students (2025-2026) studying Module B: Critical Study of Literature with Shakespeare's King Henry IV Part 1 who want to understand how Band 6 essays demonstrate personal engagement with textual integrity. For students pursuing high-range responses through sophisticated theoretical frameworks, close textual analysis, and nuanced interpretation. Designed for those who want to see the complete thought process behind every structural decision, theoretical reference, and analytical move.",
      nonAudience:
        'This is NOT a generic essay template to memorise, a formulaic \"Band 6 structure,\" or a surface-level model answer. Not suitable for students seeking quick fixes, pre-written paragraphs to copy, or those unwilling to engage with complex theoretical concepts (Bakhtin\'s carnivalesque, metatheatricality, new historicism, heteroglossia). Requires sustained intellectual effort to understand the meta-commentary and apply analytical strategies to your own Module B text.',

      // Content sections
      whatItIs: `<p>An intellectually rigorous, comprehensively annotated exemplar essay for HSC Module B: Critical Study of Literature. This responds to the question: <em>"In what ways is this closing scene an effective resolution to the dramatic tensions explored in Shakespeare's King Henry IV Part 1?"</em></p>

<p>This is not merely an essay—it is a complete meta-cognitive teaching document that reveals the architectural thinking behind Band 6 Module B responses:</p>

<ul>
  <li><strong>16 pages of comprehensive annotations</strong> including structural overview explaining the synthesis thesis, line-by-line analysis of introduction, three body paragraphs, and conclusion, and theoretical explanations of every critical framework deployed</li>
  <li><strong>Sophisticated thesis:</strong> The essay argues resolution works through synthesis not suppression, demonstrating that effective governance requires orchestration of competing worlds rather than their exclusion—a reading that shows personal engagement with textual integrity</li>
  <li><strong>Theoretical sophistication:</strong> Integrates Bakhtin's carnivalesque and heteroglossia, metatheatricality, new historicism, Elizabethan succession anxieties, Renaissance vs medieval worldviews—all deployed to illuminate Shakespeare's dramatic technique rather than decorate</li>
  <li><strong>Sophisticated textual analysis:</strong> Close reading of the closing scene (Act 5 Scene 5) with analysis of legitimacy/rebellion tensions, Hal's redemptive arc, and comic/historical register integration, plus intertextual connections to tavern scenes, battle sequences, and Hal's soliloquies</li>
  <li><strong>Contextual sophistication:</strong> Holinshed's Chronicles as source material, Elizabethan succession anxieties, medieval vs Renaissance ideologies, chivalric codes vs proto-capitalist economics</li>
</ul>

<p>Every annotation reveals the <em>why</em> behind choices: why use Bakhtin here, why structure the argument dialectically around three tensions, how to integrate quotations seamlessly, when to deploy technical terminology, how to create linking sentences that advance the argument.</p>`,

      whatItCovers: `<p>This resource demonstrates advanced Module B essay techniques through comprehensive structural and line-by-line analysis:</p>

<ul>
  <li><strong>Structural Overview:</strong> Complete explanation of three-part body structure (legitimacy/rebellion, Hal's arc, comic/historical registers) and how this demonstrates textual integrity through synthesis thesis</li>
  <li><strong>Introduction Analysis:</strong> Line-by-line breakdown of how to establish generic hybridity as critical lens, reference source material (Holinshed), deploy evaluative language ("audaciously"), introduce synthesis thesis, and preview essay structure</li>
  <li><strong>Body Paragraph 1 (Legitimacy & Rebellion):</strong> Analysis of Henry's usurpation guilt, crusade motif, rhyming couplet performing restoration through poetic form, provisionality refusing false completeness, Elizabethan succession anxieties as context</li>
  <li><strong>Body Paragraph 2 (Hal's Redemptive Arc):</strong> "I know you all" soliloquy as proleptic promise, play extempore revealing sovereignty as performance, releasing Douglas "ransomless and free" demonstrating princely conduct, synthesis of tavern wit and court propriety, Robert Weiss's "synthesising Elizabethan genius"</li>
  <li><strong>Body Paragraph 3 (Comic & Historical Registers):</strong> Bakhtin's carnivalesque force, Falstaff's structural absence as meaningful, carnivalesque values translated not rejected, honour circulating like sack, medieval binary of carnival/Lent refused</li>
  <li><strong>Conclusion Analysis:</strong> How to restate synthesis thesis, invoke Harold Bloom's "secular charisma," acknowledge provisional nature pointing to Part Two, create intellectual closure through metatheatrical flourish</li>
</ul>

<p><strong>Theoretical Frameworks Demonstrated:</strong></p>
<ul>
  <li>Mikhail Bakhtin's carnivalesque, heteroglossia, and dialogism</li>
  <li>Metatheatricality and performance theory</li>
  <li>New historicism and Elizabethan political anxieties</li>
  <li>Proleptic structure and textual integrity</li>
  <li>Generic hybridity (tragedy/history/comedy synthesis)</li>
  <li>Close reading of verse form (rhyming couplets, blank verse)</li>
  <li>Intertextual analysis within the play</li>
  <li>Historical context (Holinshed, Elizabeth I, succession crisis)</li>
</ul>

<p><strong>Technical Skills Revealed:</strong></p>
<ul>
  <li>How to integrate theoretical frameworks organically (Bakhtin, new historicism)</li>
  <li>Creating topic sentences that directly address the question</li>
  <li>Embedding quotations seamlessly within analytical sentences</li>
  <li>Analysing form-content relationships (rhyming couplet enacting closure)</li>
  <li>Making linking sentences that advance three-part argument</li>
  <li>Using scholarly references strategically (Robert Weiss, Harold Bloom)</li>
  <li>Balancing close textual analysis with conceptual sophistication</li>
  <li>Maintaining coherent argument across complex structure</li>
  <li>Deploying technical terminology precisely (proleptic, metatheatrical, heteroglossia)</li>
  <li>Creating synthesis that acknowledges complexity without false resolution</li>
</ul>

<p><strong>Meta-Cognitive Commentary Included:</strong></p>
<p>The annotations explain not just <em>what</em> the essay does but <em>why</em> it works: why "synthesis rather than suppression" shapes everything, why "characteristically nuanced" signals Module B appreciation, how "structural silence" names meaningful absence, why invoking Bakhtin illuminates rather than decorates, how "ready to be reconfigured when the curtain rises again" creates metatheatrical closure while acknowledging the play's status as Part One.</p>`,

      howItWasCreated: `<p>This annotated essay emerged from years of teaching HSC English Advanced and Extension 1 at the highest level, working with students tackling Module B: Critical Study of Literature with genuine intellectual ambition.</p>

<p>The piece represents authentic critical engagement with Shakespeare's Henry IV Part 1, deploying the theoretical frameworks that genuinely illuminate the play: Bakhtin's carnivalesque for understanding Falstaff and the tavern world, metatheatricality for Hal's performative kingship, new historicism for Elizabethan political anxieties about succession and legitimacy.</p>

<p>The annotations make visible complete Module B essay craft: architectural decisions (why three-part structure addressing three tensions demonstrates textual integrity), theoretical deployment (when to invoke Bakhtin, how to connect carnivalesque to specific textual moments), close reading (rhyming couplet form enacting meaning), and contextual sophistication (Elizabethan succession crisis illuminating the play's provisional resolution).</p>

<p>Significantly, the annotations work at two levels: <strong>structural commentary</strong> explaining how the essay works as cohesive demonstration of textual integrity, and <strong>line-by-line analysis</strong> explaining specific word choices, theoretical references, and analytical moves. This dual-level teaches both macro conceptual architecture and micro execution.</p>

<p>The essay itself is not a safe, formulaic response but an intellectually ambitious argument: that effective resolution works through synthesis not suppression, that competing worlds (tavern/court, comedy/history, carnival/Lent) can be orchestrated rather than excluded, that Falstaff's absence is structural silence speaking to generic hybridity, and that provisional resolution refusing false completeness is more sophisticated than neat closure.</p>

<p>Every annotation is pedagogical: explaining why synthesis thesis shapes the entire argument, how Bakhtin's carnivalesque illuminates Falstaff's function, what intellectual risks are being taken by arguing for translation rather than rejection of comic values, why metatheatrical closure acknowledging Part Two is more sophisticated than falsely final resolution.</p>

<p>The piece doesn't mystify Band 6 writing as innate brilliance—it treats sophisticated literary analysis as learnable craft with identifiable techniques, systematic strategies, and replicable thinking patterns.</p>`,

      // Delivery
      format: 'PDF',
      whatYouGet: `<ul>
  <li><strong>16-page annotated exemplar (PDF):</strong> Complete essay text with extensive structural overview and line-by-line annotations explaining every analytical choice</li>
  <li><strong>Structural overview:</strong> Full explanation of three-part body structure (legitimacy/rebellion, Hal's arc, comic/historical registers) and how synthesis thesis unifies all three</li>
  <li><strong>Introduction annotations:</strong> Line-by-line breakdown of how to establish generic hybridity lens, reference Holinshed, deploy evaluative language, introduce synthesis thesis, and preview structure</li>
  <li><strong>Body paragraph annotations:</strong> Dense commentary on each paragraph explaining topic sentence addressing question, quotation integration, theoretical deployment (Bakhtin, metatheatricality, new historicism), close reading, and linking</li>
  <li><strong>Theoretical framework explanations:</strong> Clarification of what Bakhtin's carnivalesque means, how heteroglossia works in the tavern, why metatheatricality matters for Hal, when new historicism illuminates Elizabethan anxieties</li>
  <li><strong>Conclusion annotations:</strong> How to restate synthesis thesis, invoke Harold Bloom strategically, acknowledge provisional nature, create metatheatrical closure</li>
  <li><strong>Full essay text:</strong> The complete response appears both integrated with annotations and clean at the end for straight-through reading</li>
</ul>

<p>Instant download after purchase. The PDF is designed for deep study—print it, annotate the annotations, trace how the synthesis argument develops across three tensions, identify analytical moves you can adapt to your own Module B text.</p>`,

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
        'module-b',
        'critical-study-literature',
        'henry-iv',
        'shakespeare',
        'annotated-essay',
        'band-6',
        'bakhtin',
        'carnivalesque',
        'metatheatricality',
        'new-historicism',
        'textual-integrity',
        'close-reading',
      ],
      downloadUrls: ['/resources/hsc-module-b-henry-iv-annotated-essay.pdf'],

      // SEO
      metaTitle: 'Module B Annotated Essay: Henry IV Part 1 | HSC English',
      metaDescription:
        "Comprehensively annotated Band 6 exemplar essay for Module B: Critical Study of Literature. 16 pages of line-by-line analysis on effective resolution in Shakespeare's Henry IV Part 1. Includes synthesis thesis, theoretical frameworks (Bakhtin, metatheatricality, new historicism), and sophisticated close reading techniques.",
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

  console.log('\n✅ Successfully added Module B Henry IV essay!');
  console.log(`📦 Product ID: ${product.id}`);
  console.log(`🔗 Slug: ${product.slug}`);
  console.log(`💰 Price: $${product.priceInCents / 100} ${product.currency}`);
  console.log(`📄 Pages: ${product.pageCount}`);
  console.log(`🏷️  Tags: ${product.tags.join(', ')}`);

  await prisma.$disconnect();
}

addHenryIVEssay().catch((error) => {
  console.error('❌ Error adding resource:', error);
  process.exit(1);
});
