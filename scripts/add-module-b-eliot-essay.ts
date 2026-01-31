/**
 * Add Module B T.S. Eliot Annotated Essay
 * HSC English Advanced - Critical Study of Literature
 */

import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

async function addProduct() {
  console.log('📚 Adding Module B T.S. Eliot annotated essay...\n');

  // Find the category: HSC → Year 12 → English Advanced
  const advancedCategory = await prisma.resourceCategory.findUnique({
    where: { path: 'hsc/year-12/english-advanced' },
  });

  if (!advancedCategory) {
    console.log('❌ English Advanced category not found');
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log(`✅ Found category: ${advancedCategory.name} (${advancedCategory.path})\n`);

  // Check if product already exists
  const existingProduct = await prisma.product.findUnique({
    where: { slug: 'module-b-eliot-annotated-essay' },
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
      slug: 'module-b-eliot-annotated-essay',
      title: 'Annotated Exemplar Essay: T.S. Eliot Selected Poems (Module B)',
      updatedAt: new Date(),
      description:
        "A comprehensively annotated Band 6 exemplar essay for HSC Module B: Critical Study of Literature. Features complete structural overview and line-by-line analysis of a sophisticated response on T.S. Eliot Selected Poems (Rhapsody on a Windy Night, The Hollow Men, Journey of the Magi), with extensive theoretical frameworks including Eliot's objective correlative, Bergson's durée, Weber's disenchantment, and modernist poetics.",

      // Positioning
      targetAudience:
        'HSC English Advanced and Extension 1 students (2025-2026) studying Module B: Critical Study of Literature with T.S. Eliot Selected Poems who want to understand how Band 6 essays demonstrate personal engagement with textual integrity through sophisticated theoretical frameworks and close poetic analysis. For students pursuing high-range responses through genuine intellectual engagement with modernist poetics, philosophical theory, and nuanced interpretation. Designed for those who want to see the complete thought process behind every analytical move, theoretical reference, and structural decision.',
      nonAudience:
        "This is NOT a generic essay template to memorise, a formulaic \"Band 6 structure,\" or a surface-level model answer. Not suitable for students seeking quick fixes, pre-written paragraphs to copy, or those unwilling to engage with complex theoretical concepts (Eliot's impersonality theory, Bergson's philosophy of time, Weber's disenchantment thesis, modernist fragmentation). Requires sustained intellectual effort to understand the meta-commentary and apply analytical strategies to your own Module B text.",

      // Content sections
      whatItIs: `<p>An intellectually rigorous, comprehensively annotated exemplar essay for HSC Module B: Critical Study of Literature. This responds to the question: <em>"Evaluate how the artistry and integrity of your prescribed text has influenced your understanding of its literary value."</em></p>

<p>This is not merely an essay—it is a complete meta-cognitive teaching document that reveals the architectural thinking behind Band 6 Module B responses:</p>

<ul>
  <li><strong>17 pages of comprehensive annotations</strong> including structural overview explaining the synthesis thesis, line-by-line analysis of introduction, three body paragraphs, and conclusion, and theoretical explanations of every critical framework deployed</li>
  <li><strong>Sophisticated thesis:</strong> The essay argues that form embodies meaning—Eliot's fragmentation paradoxically coheres into unified artistic statements demonstrating textual integrity across three movements: individual alienation, civilisational paralysis, and spiritual transformation</li>
  <li><strong>Theoretical sophistication:</strong> Integrates Eliot's own critical theory (objective correlative, impersonality doctrine), Henri Bergson's philosophical distinction between durée and clock time, Max Weber's disenchantment thesis, modernist aesthetics, and extensive close reading of poetic form—all deployed to illuminate Eliot's artistry rather than decorate</li>
  <li><strong>Sophisticated textual analysis:</strong> Close reading across three poems (Rhapsody on a Windy Night, The Hollow Men, Journey of the Magi) with analysis of synesthesia, sibilance, zeugma, anaphora, polysyndeton, prolepsis, fragmentation, allusion (Dante, Conrad, Shakespeare), and stream-of-consciousness technique</li>
  <li><strong>Contextual sophistication:</strong> Modernist crisis of meaning, post-WWI disillusionment, Eliot's conversion to Anglo-Catholicism, urban alienation in modern London, philosophical influences (Bergson, Bradley), connection to The Waste Land and Four Quartets</li>
</ul>

<p>Every annotation reveals the <em>why</em> behind choices: why invoke Bergson to illuminate temporal dislocation in "Rhapsody," how the objective correlative explains "The Hollow Men" achieving emotional intensity through concrete imagery, why "Journey of the Magi" demonstrates Eliot integrating fragmentation with spiritual coherence, how to structure an argument that demonstrates textual integrity across three distinct poems.</p>`,

      whatItCovers: `<p>This resource demonstrates advanced Module B essay techniques through comprehensive structural and line-by-line analysis:</p>

<ul>
  <li><strong>Structural Overview:</strong> Complete explanation of three-part body structure (individual alienation → civilisational paralysis → spiritual transformation) and how this progression demonstrates Eliot's artistic integrity through fragmentation that creates rather than destroys meaning</li>
  <li><strong>Introduction Analysis:</strong> Line-by-line breakdown of how to establish sophisticated thesis about form embodying meaning, reference Eliot's critical theory (objective correlative), deploy evaluative language ("paradoxically coheres"), introduce modernist context, and preview tripartite structure</li>
  <li><strong>Body Paragraph 1 (Rhapsody on a Windy Night):</strong> Individual alienation through temporal dislocation, Bergson's durée vs mechanical clock time ("Twelve o'clock," "Half-past one," "Half-past two"), synesthesia breaking sensory boundaries ("smells of chestnuts... female smells"), memory as fragmentary and traumatic, sibilance creating sonic disintegration, stream-of-consciousness revealing fractured psyche, urban modernity as alienating force</li>
  <li><strong>Body Paragraph 2 (The Hollow Men):</strong> Civilisational paralysis operating at cultural scale, Weber's disenchantment thesis explaining spiritual emptiness, objective correlative through "dried voices" and "stuffed men" achieving emotional precision, anaphora ("We are the hollow men / We are the stuffed men") performing meaninglessness, fragmentation refusing narrative coherence, Dante's Inferno and Conrad's Heart of Darkness allusions, whimper/bang paradox as modernist critique</li>
  <li><strong>Body Paragraph 3 (Journey of the Magi):</strong> Spiritual transformation transcending earlier alienation, proleptic structure ("were we led all that way for / Birth or Death?") collapsing linear time, zeugma joining sacred/profane, polysyndeton creating ritual accumulation, Nativity narrative defamiliarised through difficulty and doubt, synthesis of fragmentation with spiritual coherence, birth/death paradox as Christian mystery, movement from alienation to qualified transcendence</li>
  <li><strong>Conclusion Analysis:</strong> How to restate thesis about form embodying meaning, synthesise the three-poem progression, acknowledge Eliot's "austere artistry," demonstrate enhanced appreciation through engagement with textual integrity, create intellectual closure that honours complexity</li>
</ul>

<p><strong>Theoretical Frameworks Demonstrated:</strong></p>
<ul>
  <li>T.S. Eliot's objective correlative and impersonality theory</li>
  <li>Henri Bergson's durée (lived time) vs clock time (mechanised time)</li>
  <li>Max Weber's disenchantment thesis (rationalization undermining meaning)</li>
  <li>Modernist aesthetics: fragmentation, stream-of-consciousness, defamiliarisation</li>
  <li>New Critical close reading integrating form and content</li>
  <li>Allusion studies (Dante, Conrad, Shakespeare, Biblical narrative)</li>
  <li>Philosophical understanding of time, memory, and consciousness</li>
  <li>Christian mysticism and via negativa tradition</li>
</ul>

<p><strong>Technical Skills Revealed:</strong></p>
<ul>
  <li>How to integrate theoretical frameworks organically (Bergson illuminating temporal dislocation, Weber explaining spiritual emptiness)</li>
  <li>Creating topic sentences that directly address "artistry and integrity"</li>
  <li>Embedding quotations seamlessly within analytical sentences</li>
  <li>Analysing poetic techniques (synesthesia, zeugma, anaphora) for conceptual function</li>
  <li>Making linking sentences that trace progression across three poems</li>
  <li>Using Eliot's own critical theory to analyse his poetry</li>
  <li>Balancing close textual analysis with philosophical sophistication</li>
  <li>Maintaining coherent argument across disparate poems</li>
  <li>Deploying technical terminology precisely (proleptic, polysyndeton, objective correlative)</li>
  <li>Creating synthesis that demonstrates textual integrity without flattening complexity</li>
</ul>

<p><strong>Meta-Cognitive Commentary Included:</strong></p>
<p>The annotations explain not just <em>what</em> the essay does but <em>why</em> it works: why "paradoxically coheres" captures Eliot's achievement, why invoking Bergson illuminates rather than decorates, how "fragmentary and traumatic" connects form to psychological content, why the three-poem structure demonstrates progression from alienation to qualified transcendence, how "austere artistry" acknowledges Eliot's refusal of easy comfort while honouring aesthetic achievement.</p>`,

      howItWasCreated: `<p>This annotated essay emerged from years of teaching HSC English Advanced and Extension 1 at the highest level, working with students tackling Module B: Critical Study of Literature with genuine intellectual ambition.</p>

<p>The piece represents authentic critical engagement with T.S. Eliot's Selected Poems, deploying the theoretical frameworks that genuinely illuminate modernist poetics: Bergson's philosophy for understanding Eliot's treatment of time and memory, Weber's sociology for the spiritual crisis in "The Hollow Men," Eliot's own critical theory (objective correlative, impersonality) applied to his poems, close reading integrating form with meaning.</p>

<p>The annotations make visible complete Module B essay craft: architectural decisions (why three-poem structure demonstrates progression from individual to civilisational to spiritual), theoretical deployment (when to invoke Bergson, how to connect Weber's disenchantment to "The Hollow Men"), close reading (synesthesia serving psychological fragmentation), and synthesis strategies (demonstrating textual integrity across disparate poems).</p>

<p>Significantly, the annotations work at two levels: <strong>structural commentary</strong> explaining how the essay works as cohesive demonstration of Eliot's artistic integrity, and <strong>line-by-line analysis</strong> explaining specific word choices, theoretical references, and analytical moves. This dual-level teaches both macro conceptual architecture and micro execution.</p>

<p>The essay itself is not a safe, formulaic response but an intellectually ambitious argument: that Eliot's fragmentation paradoxically creates meaning, that modernist form embodies rather than decorates content, that textual integrity emerges through sustained artistic vision across three distinct poems, and that Eliot's "austere artistry" refuses easy comfort while achieving genuine spiritual insight.</p>

<p>Every annotation is pedagogical: explaining why this theoretical framework illuminates Eliot's technique, how this linking sentence advances the three-poem progression, what intellectual risks are being taken by arguing fragmentation creates coherence, why invoking Eliot's own critical theory demonstrates sophisticated engagement with textual integrity.</p>

<p>The piece doesn't mystify Band 6 writing as innate brilliance—it treats sophisticated literary analysis as learnable craft with identifiable techniques, systematic strategies, and replicable thinking patterns.</p>`,

      // Delivery
      format: 'PDF',
      whatYouGet: `<ul>
  <li><strong>17-page annotated exemplar (PDF):</strong> Complete essay text with extensive structural overview and line-by-line annotations explaining every analytical choice</li>
  <li><strong>Structural overview:</strong> Full explanation of three-part body structure (individual alienation → civilisational paralysis → spiritual transformation) and how it demonstrates Eliot's textual integrity</li>
  <li><strong>Introduction annotations:</strong> Line-by-line breakdown of how to establish sophisticated thesis, reference Eliot's critical theory, contextualise modernism, and preview structure</li>
  <li><strong>Body paragraph annotations:</strong> Dense commentary on each paragraph explaining topic sentence strategy, quotation integration, theoretical deployment (Bergson, Weber, Eliot's objective correlative), technique analysis (synesthesia, zeugma, anaphora), and linking sentences advancing progression</li>
  <li><strong>Theoretical framework explanations:</strong> Clarification of what Bergson's durée means for temporal dislocation, how Weber's disenchantment illuminates spiritual crisis, why Eliot's objective correlative theory explains his poetic technique, when modernist fragmentation creates rather than destroys meaning</li>
  <li><strong>Conclusion annotations:</strong> How to synthesise three-poem progression, restate thesis about form embodying meaning, demonstrate enhanced appreciation, create intellectual closure honouring complexity</li>
  <li><strong>Full essay text:</strong> The complete response appears both integrated with annotations and clean at the end for straight-through reading</li>
</ul>

<p>Instant download after purchase. The PDF is designed for deep study—print it, annotate the annotations, trace how the argument progresses from individual to civilisational to spiritual, identify analytical moves you can adapt to your own Module B text.</p>`,

      // Pricing
      priceInCents: 3900, // $39 AUD - consistent with other essays
      currency: 'AUD',
      pageCount: 17,

      // Cross-linking
      relatedPostSlugs: [],
      relatedProjectSlugs: [],

      // Metadata
      featured: true,
      published: true,
      tags: [
        'module-b',
        'critical-study-literature',
        'ts-eliot',
        'eliot',
        'selected-poems',
        'annotated-essay',
        'band-6',
        'modernist-poetry',
        'objective-correlative',
        'bergson',
        'weber',
        'close-reading',
        'theoretical-frameworks',
      ],
      downloadUrls: ['/resources/hsc-module-b-eliot-annotated-essay.pdf'],

      // SEO
      metaTitle: 'Module B Annotated Essay: T.S. Eliot Selected Poems | HSC English',
      metaDescription:
        'Comprehensively annotated essay for Module B on T.S. Eliot Selected Poems. 17 pages of line-by-line analysis covering Rhapsody on a Windy Night, The Hollow Men, and Journey of the Magi with theoretical frameworks.',
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

  console.log('\n✅ Successfully added Module B T.S. Eliot essay!');
  console.log(`📦 Product ID: ${product.id}`);
  console.log(`🔗 Slug: ${product.slug}`);
  console.log(`💰 Price: $${product.priceInCents / 100} ${product.currency}`);
  console.log(`📄 Pages: ${product.pageCount}`);
  console.log(`🏷️  Tags: ${product.tags.join(', ')}`);

  await prisma.$disconnect();
}

addProduct().catch((error) => {
  console.error('❌ Error adding product:', error);
  process.exit(1);
});
