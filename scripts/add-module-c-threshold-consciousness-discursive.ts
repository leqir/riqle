/**
 * Add Module C Threshold Consciousness Discursive Writing Resource
 * HSC English Advanced - The Craft of Writing
 */

import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

async function addProduct() {
  console.log('📚 Adding Module C Threshold Consciousness discursive writing resource...\n');

  // Find the category: HSC → Year 12 → English Advanced → Module C
  const moduleCCategory = await prisma.resourceCategory.findUnique({
    where: { path: 'hsc/year-12/english-advanced/module-c' },
  });

  if (!moduleCCategory) {
    console.log('❌ Module C category not found');
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log(`✅ Found category: ${moduleCCategory.name} (${moduleCCategory.path})\n`);

  // Check if product already exists
  const existingProduct = await prisma.product.findUnique({
    where: { slug: 'module-c-threshold-consciousness-discursive' },
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
      slug: 'module-c-threshold-consciousness-discursive',
      title: 'Annotated Discursive Writing Exemplar: Threshold Consciousness (Module C)',
      updatedAt: new Date(),
      description:
        "A comprehensively annotated Band 6 exemplar discursive piece for HSC Module C: The Craft of Writing. Features complete structural overview and line-by-line analysis of a sophisticated postmodernist response to Stephanie Radok's stimulus about hope and anticipation, demonstrating advanced craft through fragmentation, metafiction, generic hybridization, and anthropological frameworks exploring liminality, hope, and threshold consciousness via a 4 AM road trip to Jervis Bay.",

      // Positioning
      targetAudience:
        'HSC English Advanced students (2025-2026) studying Module C: The Craft of Writing who want to understand how Band 6 discursive responses demonstrate sophisticated craft through deliberate formal experimentation, postmodernist techniques, and thoughtful integration of theoretical frameworks. For students pursuing high-range responses through genuine engagement with how form creates meaning, how metafiction enables critical interrogation, and how experimental techniques (fragmentation, generic hybridization, field notes) serve conceptual purposes. Designed for those who want to see the complete thought process behind every structural decision, stylistic choice, and theoretical integration in responding to discursive stimuli about abstract concepts like hope.',
      nonAudience:
        'This is NOT a generic discursive writing template to copy, a formulaic "Band 6 structure," or a surface-level model response. Not suitable for students seeking quick fixes, pre-written pieces to adapt, or those unwilling to engage with complex postmodernist techniques (metafiction, generic hybridization, fragmentation, anthropological frameworks). Requires sustained intellectual effort to understand the meta-commentary about craft choices and apply experimental strategies to your own Module C writing.',

      // Content sections
      whatItIs: `<p>An intellectually rigorous, comprehensively annotated exemplar discursive piece for HSC Module C: The Craft of Writing. This responds to Stephanie Radok's stimulus about hope and anticipation by reframing hope not as optimism but as threshold consciousness—the hypnagogic awareness of being between states.</p>

<p>This is not merely a discursive piece—it is a complete meta-cognitive teaching document that reveals the architectural thinking behind Band 6 Module C responses:</p>

<ul>
  <li><strong>26 pages of comprehensive annotations</strong> including structural overview explaining why fragmented form serves the conceptual purpose, line-by-line analysis of all nine sections, detailed explanations of every craft choice from generic hybridization to anthropological frameworks, and reflection on how form creates meaning</li>
  <li><strong>Sophisticated structural approach:</strong> Nine-section architecture oscillating between field notes, dramatic script, scholarly citations, lyric fragments, and essayistic reflection, refusing generic stability to enact the liminality being theorised, demonstrating how postmodernist generic hybridization serves conceptual purposes</li>
  <li><strong>Advanced formal techniques:</strong> Metafictional interruptions (author questioning own methodology), fragmentation across genres (ethnographic observation, dramatic dialogue, scholarly citation, poetic meditation), temporal layering (4 AM moment expanded through recursive analysis), anthropological frameworks (van Gennep's rites of passage, Turner's communitas) deployed as interpretive tools</li>
  <li><strong>Sophisticated language craft:</strong> Anthropological terminology (liminality, threshold, communitas, rite of passage) deployed analytically, extended metaphors (4 AM as threshold state, headlights as temporary meaning-making, Jervis Bay as liminal space), paradox, technical precision in geographic detail (Princes Highway, Kangaroo Valley turnoff, specific rest stop locations), synaesthesia, hypnagogic vocabulary</li>
  <li><strong>Stimulus integration:</strong> Radok's question about hope and anticipation is interrogated rather than answered—the piece argues that hope exists not in destination but in threshold consciousness, not in resolution but in awareness of betweenness, demonstrated through the 4 AM road trip as literal and metaphorical liminal state</li>
</ul>

<p>Every annotation reveals the <em>why</em> behind choices: why generic hybridization enacts liminality, how anthropological frameworks provide vocabulary for describing threshold consciousness, why 4 AM functions as governing metaphor, how metafictional interruptions prevent false resolution, why geographic specificity grounds abstract theorisation, how the piece demonstrates discursive writing as critical interrogation not mere opinion.</p>`,

      whatItCovers: `<p>This resource demonstrates advanced Module C discursive writing craft through comprehensive structural and line-by-line analysis:</p>

<ul>
  <li><strong>Structural Overview:</strong> Complete explanation of nine-section architecture (Title with parenthetical qualification, Opening field note, Dramatic dialogue, Scholarly framework introduction, Lyric meditation, Ethnographic observation, Theoretical synthesis, Metafictional interruption, Closing threshold) and how this structure enacts the thematic argument about liminality as site of meaning-making</li>
  <li><strong>Title & Epigraph Analysis:</strong> "Threshold Consciousness" chosen for anthropological precision, "(or: Notes Toward a Theory of the 4AM)" signalling provisional/exploratory stance characteristic of discursive mode, epigraph from van Gennep establishing theoretical framework</li>
  <li><strong>Postmodernist Techniques:</strong> Metafictional interruption questioning own methodology ("But can this moment sustain such weight?"), generic instability refusing to settle into essay or narrative or field notes, acknowledgment of constructedness, critical self-reflexivity about the limits of theorisation</li>
  <li><strong>Generic Hybridization:</strong> Field notes providing ethnographic observation, dramatic script creating immediacy, scholarly citations establishing theoretical credibility, lyric fragments allowing affective resonance, essayistic reflection synthesising insights—all genres serving the argument about betweenness</li>
  <li><strong>Anthropological Framework:</strong> Van Gennep's rites of passage (separation, threshold, incorporation) reframed to understand 4 AM as permanent threshold, Turner's concept of communitas explaining the fellowship of liminal subjects, liminality as state of being between structures where meaning becomes visible</li>
  <li><strong>Language Techniques:</strong> Technical anthropological vocabulary deployed precisely, extended metaphor (4 AM as threshold, headlights as meaning-making, road trip as ritual journey), paradox ("hope lives in suspension"), anaphora ("Not the...but the"), geographic specificity (Princes Highway kilometre markers, Kangaroo Valley turnoff, Jervis Bay rest stop), synaesthesia, hypnagogic imagery</li>
  <li><strong>Temporal Manipulation:</strong> Single 4 AM moment expanded through recursive analysis, oscillation between immediate present and theoretical reflection, layers of time (clock time vs threshold time), demonstrating how discursive mode allows critical examination of experience</li>
  <li><strong>Stimulus Integration:</strong> Radok's question about hope and anticipation is treated as provocation for critical inquiry rather than prompt for personal anecdote, the piece argues that hope resides in threshold consciousness (awareness of betweenness) rather than future orientation, demonstrates sophisticated engagement with stimulus as intellectual proposition</li>
  <li><strong>Reflection Component:</strong> 460-word reflection explaining how generic hybridization enacts liminality, how anthropological frameworks enable precise theorisation of hope, how 4 AM functions as governing metaphor, how metafictional interruption prevents false closure, synthesising form-and-content relationship</li>
</ul>

<p><strong>Craft Frameworks Demonstrated:</strong></p>
<ul>
  <li>Postmodernist generic hybridization and instability</li>
  <li>Metafictional self-reflexivity and critical interruption</li>
  <li>Anthropological frameworks (van Gennep, Turner) as interpretive tools</li>
  <li>Discursive mode as critical interrogation not opinion</li>
  <li>Fragmentation serving conceptual purposes</li>
  <li>Temporal layering and expansion</li>
  <li>Geographic specificity grounding abstraction</li>
  <li>Theoretical precision through specialist vocabulary</li>
</ul>

<p><strong>Meta-Cognitive Commentary Included:</strong></p>
<p>The annotations explain not just <em>what</em> the piece does but <em>why</em> each choice works: why nine-section structure refuses generic stability, how anthropological frameworks provide vocabulary for threshold consciousness, why 4 AM serves as literal and metaphorical liminal state, how metafictional interruption prevents false resolution, why geographic detail grounds abstract theorisation, how every formal choice serves the discursive purpose of critical inquiry.</p>`,

      howItWasCreated: `<p>This annotated discursive piece emerged from years of teaching HSC English Advanced Module C at the highest level, working with students pursuing genuine formal experimentation rather than formulaic "discursive writing" templates.</p>

<p>The piece represents authentic engagement with discursive craft: the generic hybridization is not decoration but enactment of liminality, the metafictional interruptions are not gimmicks but necessary acknowledgments of theorisation's limits, the anthropological frameworks are not pretension but analytical vocabulary genuinely illuminating threshold consciousness, the geographic specificity is not local colour but grounding for abstract ideas.</p>

<p>The annotations make visible complete Module C craft: architectural decisions (why nine sections, why oscillate between genres, why use field notes and dramatic script and scholarly citation), formal choices (when to interrupt with metafiction, how to deploy anthropological terminology, where to ground abstraction with geographic detail), theoretical deployment (how van Gennep illuminates liminality, why Turner's communitas names threshold fellowship, how 4 AM becomes governing metaphor), and synthesis strategies (how form enacts the argument about betweenness).</p>

<p>Significantly, the annotations work at two levels: <strong>structural commentary</strong> explaining how the piece demonstrates "deliberate and thoughtful shaping" required by Module C rubric through discursive mode, and <strong>line-by-line analysis</strong> explaining specific word choices, allusions, and craft moves. This dual-level teaches both macro conceptual architecture and micro execution.</p>

<p>The piece itself is not safe or conventional but intellectually ambitious: it refuses to answer Radok's question simply, instead interrogating what hope means when reframed as threshold consciousness, embraces liminality as permanent state rather than transition to resolution, admits the limits of theorisation through metafictional interruption, demonstrates that sophisticated Module C discursive writing means critical inquiry not personal opinion.</p>

<p>Every annotation is pedagogical: explaining why this generic choice serves the conceptual purpose, how this anthropological framework provides analytical precision, what intellectual complexity is gained by refusing resolution, why geographic specificity prevents sentimentality, how experimental techniques align with Module C's emphasis on understanding how texts work.</p>

<p>The piece doesn't mystify Band 6 discursive writing as innate talent—it treats sophisticated formal experimentation as learnable craft with identifiable techniques, systematic strategies, and replicable thinking patterns about how form creates meaning in discursive mode.</p>`,

      // Delivery
      format: 'PDF',
      whatYouGet: `<ul>
  <li><strong>26-page annotated exemplar (PDF):</strong> Complete discursive piece (~1100 words) with reflection (~460 words) plus extensive structural overview and line-by-line annotations explaining every craft choice</li>
  <li><strong>Structural overview:</strong> Full explanation of nine-section architecture, why generic hybridization serves conceptual purpose, how fragmentation enacts liminality, why each section performs specific work, how structure responds to Radok stimulus through critical interrogation not simple answer</li>
  <li><strong>Section-by-section annotations:</strong> Dense commentary on title/epigraph, all nine sections, and reflection explaining every structural decision, formal technique, language choice, anthropological framework, and craft move with explicit reasoning</li>
  <li><strong>Technique explanations:</strong> Clarification of discursive strategies (generic hybridization, metafictional interruption, critical interrogation), anthropological frameworks (van Gennep's liminality, Turner's communitas), temporal manipulation, theoretical precision through specialist vocabulary, geographic specificity as abstraction anchor</li>
  <li><strong>Craft framework summary:</strong> Complete list of macro techniques (fragmented structure, generic hybridization, metafictional interruption, anthropological frameworks, temporal layering) and micro techniques (technical vocabulary, extended metaphor, paradox, anaphora, geographic precision, synaesthesia, hypnagogic imagery)</li>
  <li><strong>Module C alignment analysis:</strong> Explicit demonstration of how piece fulfills rubric requirements for "deliberate and thoughtful shaping," "range of textual forms," "language structures and features," and "considered personal style" through discursive mode</li>
  <li><strong>Full discursive text:</strong> Complete 1100-word discursive piece appears both integrated with annotations and clean at end for straight-through reading, plus 460-word reflection</li>
</ul>

<p>Instant download after purchase. The PDF is designed for deep study—print it, annotate the annotations, trace how formal choices serve conceptual purposes, identify experimental techniques you can adapt to your own Module C discursive writing, understand how to write reflections that demonstrate sophisticated understanding of craft.</p>`,

      // Pricing
      priceInCents: 3900, // $39 AUD - consistent with other resources
      currency: 'AUD',
      pageCount: 26,

      // Cross-linking
      relatedPostSlugs: [],
      relatedProjectSlugs: [],

      // Metadata
      featured: true,
      published: true,
      tags: [
        'module-c',
        'craft-of-writing',
        'discursive-writing',
        'annotated-exemplar',
        'band-6',
        'postmodernist',
        'liminality',
        'metafiction',
        'generic-hybridization',
        'anthropological-frameworks',
        'threshold-consciousness',
        'reflection',
        'formal-experimentation',
      ],
      downloadUrls: ['/resources/hsc-module-c-threshold-consciousness-annotated-essay.pdf'],

      // SEO
      metaTitle: 'Module C Discursive Writing Exemplar: Threshold Consciousness | HSC English',
      metaDescription:
        'Comprehensively annotated discursive writing exemplar for Module C. 26 pages of line-by-line analysis covering postmodernist techniques, liminality, generic hybridization, and anthropological frameworks with reflection.',
      ogImage: null,
    },
  });

  console.log(`✓ Created product: ${product.title}`);

  // Assign to Module C category (primary)
  await prisma.productCategory.create({
    data: {
      id: createId(),
      productId: product.id,
      categoryId: moduleCCategory.id,
      isPrimary: true,
      displayOrder: 1,
    },
  });

  console.log('✓ Assigned to Module C category');

  console.log(
    '\n✅ Successfully added Module C Threshold Consciousness discursive writing resource!'
  );
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
