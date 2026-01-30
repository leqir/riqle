/**
 * Add Extension 1 Literary Worlds Resource: The Translator's Paradox
 *
 * This script adds the annotated exemplar discursive response to the database
 * and assigns it to the English Extension 1 category.
 */

import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

async function addTranslatorsParadoxResource() {
  console.log('🚀 Adding Extension 1 Literary Worlds resource...\n');

  // Get the Extension 1 category
  const ext1Category = await prisma.resourceCategory.findUnique({
    where: { path: 'hsc/year-12/english-extension-1' },
  });

  if (!ext1Category) {
    throw new Error('English Extension 1 category not found. Run resource-categories seed first.');
  }

  console.log('✓ Found English Extension 1 category');

  // Check if product already exists
  const existingProduct = await prisma.product.findUnique({
    where: { slug: 'extension-1-literary-worlds-translators-paradox' },
  });

  if (existingProduct) {
    console.log('⚠️  Product already exists. Updating instead...');

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { slug: 'extension-1-literary-worlds-translators-paradox' },
      data: {
        title: "Annotated Exemplar Discursive: The Translator's Paradox",
        description:
          "A comprehensively annotated Band 6 exemplar discursive response for HSC English Extension 1 Literary Worlds. Features deep structural commentary, line-by-line analysis, and sophisticated engagement with Ken Liu's ideas on translation, metafiction, and world-building.",

        // Positioning
        targetAudience:
          'HSC English Extension 1 students (2025-2026) studying Literary Worlds who want to understand how sophisticated discursive writing works at a conceptual level. For students pursuing Band 6 outcomes through genuine intellectual engagement with postmodernist techniques, metafictional architecture, and theoretical frameworks. Designed for those who want to see the complete thought process behind every structural and stylistic choice.',
        nonAudience:
          'This is NOT a template for copying, a formulaic "Band 6 example," or a surface-level model response. Not suitable for students seeking quick fixes, pre-written paragraphs to memorize, or those unwilling to engage with complex theoretical concepts (Bakhtin, Derrida, Barthes, Benjamin, Waugh, Hutcheon). Requires sustained intellectual effort to understand the meta-commentary and apply thinking strategies to your own discursive writing.',

        // Content sections
        whatItIs: `<p>An intellectually rigorous, comprehensively annotated exemplar discursive response for HSC Extension 1 Literary Worlds. This responds to the question: <em>"Compose a discursive response in which you extend the ideas in Text 1. In your response, articulate your insights into how texts make meaning through the crafting of literary worlds."</em></p>

<p>This is not merely a discursive essay—it is a complete meta-cognitive teaching document that reveals the architectural thinking behind Band 6 discursive writing:</p>

<ul>
  <li><strong>18 pages of dense annotations</strong> including overarching structural commentary explaining how the piece operates as a cohesive whole, line-by-line analysis of every technique, and theoretical explanations of postmodernist strategies</li>
  <li><strong>Metafictional architecture:</strong> The form itself becomes the argument—fragmented structure, multiple narrative voices, editorial intrusions, dictionary sections, and unreliable narration directly enact Ken Liu's claim that "every act of communication is a miracle of translation"</li>
  <li><strong>Theoretical sophistication:</strong> Integrates Patricia Waugh's metafiction theory, Bakhtin's heteroglossia, Derrida's deconstruction, Roland Barthes' semiotics, Gerard Genette's narratology, Walter Benjamin's philosophy of history, and Linda Hutcheon's postmodernism frameworks</li>
  <li><strong>Western Sydney grounding:</strong> Concrete, specific geography (Wentworthville Maccas, Great Western Highway, Ms Sweeties Greystanes) demonstrates how to ground abstract theoretical discussion in lived experience and particular places</li>
  <li><strong>Recursive spiral structure:</strong> Rather than linear argument, the piece proliferates meaning through juxtaposition and fragment, asking readers to construct coherence—which is precisely how literary worlds function</li>
</ul>

<p>Every annotation reveals the <em>why</em> behind choices: why fragment the structure, why deploy these theories at specific moments, how to create multiple narrative voices, when to break the fourth wall, how to use typography and form to enact argument.</p>`,

        whatItCovers: `<p>This resource demonstrates advanced discursive techniques through comprehensive structural and line-by-line analysis:</p>

<ul>
  <li><strong>Overarching Structural Commentary:</strong> Complete explanation of how the fragmented structure (numbered fragments, dictionary entries, multiple versions, editorial intrusions) creates a "recursive spiral pattern" rather than linear argument—directly enacting the impossibility of singular truth</li>
  <li><strong>Opening & Epigraph:</strong> How to establish governing metaphors, use intertextual quotation strategically, and perform metafictional acknowledgment of reading conditions</li>
  <li><strong>Fragment 67A (Maccas Carpark):</strong> Grounding abstract theory in hyper-specific geography, using Roland Barthes' "reality effect," deploying the constellation metaphor, establishing the six/seven numerical motif</li>
  <li><strong>Editorial Intrusion:</strong> Creating metaleptic breaks, inverting hierarchies (margin intrudes on center), using typography (purple Posca pen graffiti) to perform disruption</li>
  <li><strong>Ms Sweeties Variations:</strong> Demonstrating impossibility of singular truth through versioning (as remembered, as recorded, as actually happened [torn out], as translated through metaphor)</li>
  <li><strong>Dictionary Section:</strong> "Hermit crab essay" form, redefining ordinary words to build alternative lexicon of literary world, literalizing metaphors</li>
  <li><strong>Unreliable Narrator:</strong> Retroactive destabilization of truth claims, creating temporal collapse, addressing reader directly to implicate them</li>
  <li><strong>Paradox of Literary Worlds:</strong> Theoretical climax directly addressing question, arguing meaning is constructed not discovered, collapsing fiction/reality distinction</li>
  <li><strong>Epilogue:</strong> Impossible time (2:67 AM), refusing closure, extending translation into reader's present tense</li>
</ul>

<p><strong>Theoretical Frameworks Demonstrated:</strong></p>
<ul>
  <li>Patricia Waugh's metafiction theory and "metafictional architecture"</li>
  <li>Bakhtin's heteroglossia and dialogism</li>
  <li>Derrida's "there is nothing outside the text"</li>
  <li>Roland Barthes' "reality effect" and "punctum"</li>
  <li>Gerard Genette's metalepsis and paratextuality</li>
  <li>Walter Benjamin's philosophy of history</li>
  <li>Linda Hutcheon's "complicit critique" in postmodernism</li>
  <li>Lyotard's "incredulity toward metanarratives"</li>
  <li>Emmanuel Levinas' ethics of the Other</li>
</ul>

<p><strong>Meta-Cognitive Skills Revealed:</strong></p>
<ul>
  <li>How to make form enact argument (fragmentation demonstrates translation's impossibility)</li>
  <li>Creating multiple narrative voices and making them productively compete</li>
  <li>Using typography, structure, and paratextual elements strategically</li>
  <li>Grounding theory in concrete specificity (not abstract philosophizing)</li>
  <li>Deploying theoretical frameworks that genuinely illuminate rather than decorate</li>
  <li>Maintaining thematic coherence across deliberately fragmented structure</li>
  <li>Using numerical and color motifs to create unity</li>
  <li>Strategic unreliability and metaleptic breaks</li>
  <li>Balancing intellectual rigor with emotional resonance</li>
  <li>Refusing closure to extend meaning into reader's experience</li>
</ul>

<p><strong>Complete Technique Summaries:</strong></p>
<p>The annotations include comprehensive summaries of macro techniques (fragmented structure, multiple narrative voices, metalepsis, mise en abyme, recursive structure, generic hybridity, unreliable narration, numerical motifs) and micro techniques (cascading prepositions, chiasmus, bathos, defamiliarization, extended metaphor, direct address, prolepsis, intertextual quotation, typographical play, semantic density).</p>`,

        howItWasCreated: `<p>This discursive emerged from years of teaching HSC English Extension 1 and Extension 2 at the highest level, working with students who demanded genuine intellectual sophistication beyond formulaic Band 6 techniques.</p>

<p>The piece represents authentic engagement with Ken Liu's ideas about translation and world-building, filtered through Western Sydney geography that rarely appears in Australian literary writing. Every theoretical framework deployed (Waugh, Bakhtin, Derrida, Barthes, Benjamin, Hutcheon) emerges organically from the formal choices rather than being imposed externally.</p>

<p>The annotations make visible the complete architectural thinking: why this structure, why these theories, why this geography, why these narrative interruptions. The piece doesn't mystify discursive writing as innate genius—it treats it as a craft with learnable techniques.</p>

<p>Significantly, the annotations include both "overarching structural commentary" (explaining how the piece works as a cohesive whole) and "line-by-line annotations" (explaining specific choices). This dual-level analysis teaches both macro-level conceptual thinking and micro-level execution.</p>

<p>The Western Sydney setting is deliberate and political: Wentworthville, Greystanes, North Parramatta, the Great Western Highway. These spaces are rarely granted literary dignity or philosophical depth. The piece demonstrates that literary world-building happens everywhere, not just in privileged inner-city or rural Australian settings.</p>

<p>Every annotation is pedagogical: it explains not just what was done but why it works, how similar strategies could apply to different texts or questions, and what intellectual risks are being taken. This teaches discursive thinking as systematic craft, not mysterious inspiration.</p>`,

        // Delivery
        format: 'PDF',
        whatYouGet: `<ul>
  <li><strong>18-page annotated exemplar (PDF):</strong> Complete discursive text with extensive structural commentary and line-by-line annotations explaining every choice</li>
  <li><strong>Overarching structural commentary:</strong> Full explanation of how fragmented structure creates "metafictional architecture" where form becomes argument</li>
  <li><strong>Line-by-line analysis:</strong> Dense annotations (often longer than the sections themselves) explaining theoretical choices, structural decisions, narrative techniques, and pedagogical rationale</li>
  <li><strong>Theoretical framework explanations:</strong> Clarification of what Waugh's metafiction means, how Bakhtin's heteroglossia operates, why Derrida's deconstruction applies, how Barthes' semiotics illuminates, when Genette's metalepsis disrupts</li>
  <li><strong>Complete technique summaries:</strong> Systematic cataloging of 10 macro techniques (fragmentation, multiple voices, metalepsis, etc.) and 10 micro techniques (cascading prepositions, chiasmus, bathos, etc.)</li>
  <li><strong>Connection to question analysis:</strong> Explicit discussion of how the piece addresses "how texts make meaning through crafting of literary worlds"</li>
  <li><strong>Full text included:</strong> The complete discursive appears at the end so you can read it straight through before studying the annotations</li>
</ul>

<p>Instant download after purchase. The PDF is designed for deep study—print it, annotate the annotations, trace how arguments develop across fragments, identify techniques you can adapt to your own discursive responses.</p>`,

        // Pricing
        priceInCents: 3900, // $39 AUD - same as 1984 resource
        currency: 'AUD',

        // Cross-linking
        relatedPostSlugs: [],
        relatedProjectSlugs: [],

        // Metadata
        featured: true,
        published: true,
        tags: [
          'discursive-writing',
          'literary-worlds',
          'metafiction',
          'postmodernism',
          'theoretical-frameworks',
          'exemplar-essay',
          'extension-1',
          'band-6',
        ],
        searchVector:
          'extension 1 literary worlds discursive translator paradox ken liu metafiction postmodernism bakhtin derrida annotation exemplar band 6',

        // SEO
        metaTitle: "Annotated Discursive: The Translator's Paradox - Extension 1 Literary Worlds",
        metaDescription:
          'Comprehensively annotated Band 6 exemplar discursive for HSC Extension 1 Literary Worlds. Features metafictional architecture, postmodernist techniques, and deep engagement with Ken Liu. Complete structural and line-by-line analysis revealing sophisticated discursive thinking.',
        ogImage: null,

        // File path for download
        downloadUrls: ['/resources/hsc-extension-1-literary-worlds-translators-paradox.pdf'],

        // Timestamps
        updatedAt: new Date(),
      },
    });

    console.log(`✓ Updated product: ${updatedProduct.title}`);

    // Check if category assignment exists
    const existingCategoryAssignment = await prisma.productCategory.findFirst({
      where: {
        productId: updatedProduct.id,
        categoryId: ext1Category.id,
      },
    });

    if (!existingCategoryAssignment) {
      await prisma.productCategory.create({
        data: {
          id: createId(),
          productId: updatedProduct.id,
          categoryId: ext1Category.id,
          isPrimary: true,
          displayOrder: 1,
        },
      });
      console.log('✓ Assigned product to English Extension 1 category');
    } else {
      console.log('✓ Product already assigned to category');
    }
  } else {
    // Create new product
    const product = await prisma.product.create({
      data: {
        id: createId(),
        slug: 'extension-1-literary-worlds-translators-paradox',
        title: "Annotated Exemplar Discursive: The Translator's Paradox",
        description:
          "A comprehensively annotated Band 6 exemplar discursive response for HSC English Extension 1 Literary Worlds. Features deep structural commentary, line-by-line analysis, and sophisticated engagement with Ken Liu's ideas on translation, metafiction, and world-building.",

        // Positioning
        targetAudience:
          'HSC English Extension 1 students (2025-2026) studying Literary Worlds who want to understand how sophisticated discursive writing works at a conceptual level. For students pursuing Band 6 outcomes through genuine intellectual engagement with postmodernist techniques, metafictional architecture, and theoretical frameworks. Designed for those who want to see the complete thought process behind every structural and stylistic choice.',
        nonAudience:
          'This is NOT a template for copying, a formulaic "Band 6 example," or a surface-level model response. Not suitable for students seeking quick fixes, pre-written paragraphs to memorize, or those unwilling to engage with complex theoretical concepts (Bakhtin, Derrida, Barthes, Benjamin, Waugh, Hutcheon). Requires sustained intellectual effort to understand the meta-commentary and apply thinking strategies to your own discursive writing.',

        // Content sections
        whatItIs: `<p>An intellectually rigorous, comprehensively annotated exemplar discursive response for HSC Extension 1 Literary Worlds. This responds to the question: <em>"Compose a discursive response in which you extend the ideas in Text 1. In your response, articulate your insights into how texts make meaning through the crafting of literary worlds."</em></p>

<p>This is not merely a discursive essay—it is a complete meta-cognitive teaching document that reveals the architectural thinking behind Band 6 discursive writing:</p>

<ul>
  <li><strong>18 pages of dense annotations</strong> including overarching structural commentary explaining how the piece operates as a cohesive whole, line-by-line analysis of every technique, and theoretical explanations of postmodernist strategies</li>
  <li><strong>Metafictional architecture:</strong> The form itself becomes the argument—fragmented structure, multiple narrative voices, editorial intrusions, dictionary sections, and unreliable narration directly enact Ken Liu's claim that "every act of communication is a miracle of translation"</li>
  <li><strong>Theoretical sophistication:</strong> Integrates Patricia Waugh's metafiction theory, Bakhtin's heteroglossia, Derrida's deconstruction, Roland Barthes' semiotics, Gerard Genette's narratology, Walter Benjamin's philosophy of history, and Linda Hutcheon's postmodernism frameworks</li>
  <li><strong>Western Sydney grounding:</strong> Concrete, specific geography (Wentworthville Maccas, Great Western Highway, Ms Sweeties Greystanes) demonstrates how to ground abstract theoretical discussion in lived experience and particular places</li>
  <li><strong>Recursive spiral structure:</strong> Rather than linear argument, the piece proliferates meaning through juxtaposition and fragment, asking readers to construct coherence—which is precisely how literary worlds function</li>
</ul>

<p>Every annotation reveals the <em>why</em> behind choices: why fragment the structure, why deploy these theories at specific moments, how to create multiple narrative voices, when to break the fourth wall, how to use typography and form to enact argument.</p>`,

        whatItCovers: `<p>This resource demonstrates advanced discursive techniques through comprehensive structural and line-by-line analysis:</p>

<ul>
  <li><strong>Overarching Structural Commentary:</strong> Complete explanation of how the fragmented structure (numbered fragments, dictionary entries, multiple versions, editorial intrusions) creates a "recursive spiral pattern" rather than linear argument—directly enacting the impossibility of singular truth</li>
  <li><strong>Opening & Epigraph:</strong> How to establish governing metaphors, use intertextual quotation strategically, and perform metafictional acknowledgment of reading conditions</li>
  <li><strong>Fragment 67A (Maccas Carpark):</strong> Grounding abstract theory in hyper-specific geography, using Roland Barthes' "reality effect," deploying the constellation metaphor, establishing the six/seven numerical motif</li>
  <li><strong>Editorial Intrusion:</strong> Creating metaleptic breaks, inverting hierarchies (margin intrudes on center), using typography (purple Posca pen graffiti) to perform disruption</li>
  <li><strong>Ms Sweeties Variations:</strong> Demonstrating impossibility of singular truth through versioning (as remembered, as recorded, as actually happened [torn out], as translated through metaphor)</li>
  <li><strong>Dictionary Section:</strong> "Hermit crab essay" form, redefining ordinary words to build alternative lexicon of literary world, literalizing metaphors</li>
  <li><strong>Unreliable Narrator:</strong> Retroactive destabilization of truth claims, creating temporal collapse, addressing reader directly to implicate them</li>
  <li><strong>Paradox of Literary Worlds:</strong> Theoretical climax directly addressing question, arguing meaning is constructed not discovered, collapsing fiction/reality distinction</li>
  <li><strong>Epilogue:</strong> Impossible time (2:67 AM), refusing closure, extending translation into reader's present tense</li>
</ul>

<p><strong>Theoretical Frameworks Demonstrated:</strong></p>
<ul>
  <li>Patricia Waugh's metafiction theory and "metafictional architecture"</li>
  <li>Bakhtin's heteroglossia and dialogism</li>
  <li>Derrida's "there is nothing outside the text"</li>
  <li>Roland Barthes' "reality effect" and "punctum"</li>
  <li>Gerard Genette's metalepsis and paratextuality</li>
  <li>Walter Benjamin's philosophy of history</li>
  <li>Linda Hutcheon's "complicit critique" in postmodernism</li>
  <li>Lyotard's "incredulity toward metanarratives"</li>
  <li>Emmanuel Levinas' ethics of the Other</li>
</ul>

<p><strong>Meta-Cognitive Skills Revealed:</strong></p>
<ul>
  <li>How to make form enact argument (fragmentation demonstrates translation's impossibility)</li>
  <li>Creating multiple narrative voices and making them productively compete</li>
  <li>Using typography, structure, and paratextual elements strategically</li>
  <li>Grounding theory in concrete specificity (not abstract philosophizing)</li>
  <li>Deploying theoretical frameworks that genuinely illuminate rather than decorate</li>
  <li>Maintaining thematic coherence across deliberately fragmented structure</li>
  <li>Using numerical and color motifs to create unity</li>
  <li>Strategic unreliability and metaleptic breaks</li>
  <li>Balancing intellectual rigor with emotional resonance</li>
  <li>Refusing closure to extend meaning into reader's experience</li>
</ul>

<p><strong>Complete Technique Summaries:</strong></p>
<p>The annotations include comprehensive summaries of macro techniques (fragmented structure, multiple narrative voices, metalepsis, mise en abyme, recursive structure, generic hybridity, unreliable narration, numerical motifs) and micro techniques (cascading prepositions, chiasmus, bathos, defamiliarization, extended metaphor, direct address, prolepsis, intertextual quotation, typographical play, semantic density).</p>`,

        howItWasCreated: `<p>This discursive emerged from years of teaching HSC English Extension 1 and Extension 2 at the highest level, working with students who demanded genuine intellectual sophistication beyond formulaic Band 6 techniques.</p>

<p>The piece represents authentic engagement with Ken Liu's ideas about translation and world-building, filtered through Western Sydney geography that rarely appears in Australian literary writing. Every theoretical framework deployed (Waugh, Bakhtin, Derrida, Barthes, Benjamin, Hutcheon) emerges organically from the formal choices rather than being imposed externally.</p>

<p>The annotations make visible the complete architectural thinking: why this structure, why these theories, why this geography, why these narrative interruptions. The piece doesn't mystify discursive writing as innate genius—it treats it as a craft with learnable techniques.</p>

<p>Significantly, the annotations include both "overarching structural commentary" (explaining how the piece works as a cohesive whole) and "line-by-line annotations" (explaining specific choices). This dual-level analysis teaches both macro-level conceptual thinking and micro-level execution.</p>

<p>The Western Sydney setting is deliberate and political: Wentworthville, Greystanes, North Parramatta, the Great Western Highway. These spaces are rarely granted literary dignity or philosophical depth. The piece demonstrates that literary world-building happens everywhere, not just in privileged inner-city or rural Australian settings.</p>

<p>Every annotation is pedagogical: it explains not just what was done but why it works, how similar strategies could apply to different texts or questions, and what intellectual risks are being taken. This teaches discursive thinking as systematic craft, not mysterious inspiration.</p>`,

        // Delivery
        format: 'PDF',
        whatYouGet: `<ul>
  <li><strong>18-page annotated exemplar (PDF):</strong> Complete discursive text with extensive structural commentary and line-by-line annotations explaining every choice</li>
  <li><strong>Overarching structural commentary:</strong> Full explanation of how fragmented structure creates "metafictional architecture" where form becomes argument</li>
  <li><strong>Line-by-line analysis:</strong> Dense annotations (often longer than the sections themselves) explaining theoretical choices, structural decisions, narrative techniques, and pedagogical rationale</li>
  <li><strong>Theoretical framework explanations:</strong> Clarification of what Waugh's metafiction means, how Bakhtin's heteroglossia operates, why Derrida's deconstruction applies, how Barthes' semiotics illuminates, when Genette's metalepsis disrupts</li>
  <li><strong>Complete technique summaries:</strong> Systematic cataloging of 10 macro techniques (fragmentation, multiple voices, metalepsis, etc.) and 10 micro techniques (cascading prepositions, chiasmus, bathos, etc.)</li>
  <li><strong>Connection to question analysis:</strong> Explicit discussion of how the piece addresses "how texts make meaning through crafting of literary worlds"</li>
  <li><strong>Full text included:</strong> The complete discursive appears at the end so you can read it straight through before studying the annotations</li>
</ul>

<p>Instant download after purchase. The PDF is designed for deep study—print it, annotate the annotations, trace how arguments develop across fragments, identify techniques you can adapt to your own discursive responses.</p>`,

        // Pricing
        priceInCents: 3900, // $39 AUD - same as 1984 resource
        currency: 'AUD',

        // Cross-linking
        relatedPostSlugs: [],
        relatedProjectSlugs: [],

        // Metadata
        featured: true,
        published: true,
        tags: [
          'discursive-writing',
          'literary-worlds',
          'metafiction',
          'postmodernism',
          'theoretical-frameworks',
          'exemplar-essay',
          'extension-1',
          'band-6',
        ],
        searchVector:
          'extension 1 literary worlds discursive translator paradox ken liu metafiction postmodernism bakhtin derrida annotation exemplar band 6',

        // SEO
        metaTitle: "Annotated Discursive: The Translator's Paradox - Extension 1 Literary Worlds",
        metaDescription:
          'Comprehensively annotated Band 6 exemplar discursive for HSC Extension 1 Literary Worlds. Features metafictional architecture, postmodernist techniques, and deep engagement with Ken Liu. Complete structural and line-by-line analysis revealing sophisticated discursive thinking.',
        ogImage: null,

        // File path for download
        downloadUrls: ['/resources/hsc-extension-1-literary-worlds-translators-paradox.pdf'],

        // Timestamps
        updatedAt: new Date(),
      },
    });

    console.log(`✓ Created product: ${product.title}`);

    // Assign to English Extension 1 category
    await prisma.productCategory.create({
      data: {
        id: createId(),
        productId: product.id,
        categoryId: ext1Category.id,
        isPrimary: true,
        displayOrder: 1,
      },
    });

    console.log('✓ Assigned product to English Extension 1 category');
  }

  console.log('\n✅ Extension 1 resource added successfully!');
  console.log('\n📋 Product Details:');
  console.log("  Title: Annotated Exemplar Discursive: The Translator's Paradox");
  console.log('  Slug: extension-1-literary-worlds-translators-paradox');
  console.log('  Category: HSC → Year 12 → English Extension 1');
  console.log('  Price: $39 AUD');
  console.log(
    '  PDF Location: /public/resources/hsc-extension-1-literary-worlds-translators-paradox.pdf'
  );
  console.log('\n🔗 URLs:');
  console.log('  Product page: /resources/extension-1-literary-worlds-translators-paradox');
  console.log('  Category page: /resources/browse/hsc/year-12/english-extension-1');
}

async function main() {
  try {
    await addTranslatorsParadoxResource();
  } catch (error) {
    console.error('❌ Error adding resource:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
