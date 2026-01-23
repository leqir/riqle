/**
 * Add HSC Extension 1 Literary Worlds Discursive Product
 * 25/25 exemplar response with sophisticated analysis
 */

import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

async function main() {
  console.log('Creating HSC Extension 1 Literary Worlds product...');

  // Create Stripe product first
  const stripeProduct = await stripe.products.create({
    name: 'HSC Extension 1 Literary Worlds - 25/25 Discursive',
    description:
      'Exemplar discursive response achieving full marks in 2025 HSC English Extension 1',
    metadata: {
      type: 'educational-resource',
      subject: 'HSC English Extension 1',
      year: '2025',
    },
  });

  // Create Stripe price
  const stripePrice = await stripe.prices.create({
    product: stripeProduct.id,
    unit_amount: 6900, // $69.00 AUD
    currency: 'aud',
    metadata: {
      displayPrice: 'A$69.00',
    },
  });

  // Create product in database
  const product = await prisma.product.create({
    data: {
      id: `product_ext1_${Date.now()}`,
      slug: 'hsc-ext1-literary-worlds-discursive-25',
      title: 'HSC Extension 1 Literary Worlds - 25/25 Discursive',
      description:
        'Exemplar discursive response that achieved full marks (25/25) in the 2025 HSC English Extension 1 exam. A masterclass in postmodernist literary analysis.',

      // Target Audience
      targetAudience: `Year 12 students studying HSC English Extension 1 who need to understand what a 25/25 discursive response looks like. Perfect if you're struggling to integrate postmodernist theory, synthesise multiple texts, or structure a sophisticated argument that demonstrates conceptual depth beyond surface-level analysis.`,

      nonAudience: `Not suitable for Advanced English students (this is Extension 1 level), students looking for simple essay templates, or those wanting pre-written responses to copy. This requires critical engagement with high-level literary theory.`,

      // What It Is
      whatItIs: `<p>This is a complete 25/25 discursive response that achieved full marks in the 2025 HSC English Extension 1 Literary Worlds examination. What distinguishes this from typical Band 6 responses is its sophisticated deployment of <strong>macro-level conceptual architecture</strong> working in concert with <strong>micro-level textual precision</strong>.</p>

<p><strong>Macro Techniques (Conceptual Framework):</strong></p>
<ul>
  <li><strong>Recursive structural logic:</strong> The response employs a spiral argumentation pattern where each paragraph revisits and complicates the central thesis, rather than linear progression. This mirrors postmodernist rejection of teleological narrative.</li>
  <li><strong>Intertextual synthesis:</strong> Instead of discussing texts sequentially, the response braids multiple texts together within single sentences, demonstrating how literary worlds construct meaning through dialogue rather than isolation.</li>
  <li><strong>Meta-discursive awareness:</strong> The writing explicitly acknowledges its own construction as a literary world, interrogating the act of critical writing itself—a hallmark of Extension 1 sophistication.</li>
  <li><strong>Theoretical integration:</strong> Poststructuralist concepts (Barthes' death of the author, Derrida's différance, Foucault's discourse analysis) aren't name-dropped but <em>enacted</em> through the argument's structure.</li>
</ul>

<p><strong>Micro Techniques (Sentence-Level Craft):</strong></p>
<ul>
  <li><strong>Nominalization precision:</strong> Converting actions into abstract nouns ("the text's interrogation of" rather than "the text interrogates") creates density without opacity.</li>
  <li><strong>Punctuation as argument:</strong> Strategic use of semicolons, em-dashes, and parenthetical asides to layer multiple interpretive possibilities within single sentences.</li>
  <li><strong>Verb choice sophistication:</strong> Using verbs like "destabilises," "problematises," "reconstitutes" instead of "shows" or "demonstrates"—each verb carries theoretical weight.</li>
  <li><strong>Adjectival restraint:</strong> Avoiding flowery language in favour of conceptually precise modifiers that do argumentative work.</li>
</ul>

<p><strong>Postmodernist Techniques:</strong></p>
<ul>
  <li><strong>Fragmentation as method:</strong> The response deliberately fragments its own argument to mirror postmodern literary fragmentation, yet maintains coherence through thematic recursion.</li>
  <li><strong>Resistance to closure:</strong> Rather than concluding with false certainty, the response ends with productive ambiguity—acknowledging multiplicity of meaning.</li>
  <li><strong>Irony and reflexivity:</strong> The response performs what it analyzes, using postmodern techniques to discuss postmodern texts.</li>
  <li><strong>Decentering authority:</strong> Avoids authoritative declarations ("this text definitively shows") in favour of tentative exploration ("might suggest," "opens possibilities for").</li>
</ul>

<p>This isn't just a good essay—it's an <strong>architectural blueprint</strong> for how to think and write at Extension 1 standard.</p>`,

      // What It Covers
      whatItCovers: `<p>The discursive explores how literary worlds construct and deconstruct meaning through postmodernist lens, specifically examining:</p>

<ul>
  <li><strong>Metafictional self-awareness:</strong> How texts acknowledge their own constructedness</li>
  <li><strong>Temporal fragmentation:</strong> Non-linear narrative structures and their philosophical implications</li>
  <li><strong>Epistemological uncertainty:</strong> The impossibility of objective truth in literary representation</li>
  <li><strong>Intertextuality as world-building:</strong> How texts create meaning through dialogue with other texts</li>
  <li><strong>Reader-response dynamics:</strong> The text as incomplete until activated by readership</li>
  <li><strong>Language as constitutive:</strong> How language doesn't describe reality but creates it</li>
</ul>

<p><strong>Texts referenced include:</strong> Multiple canonical and contemporary works demonstrating postmodernist techniques (specific texts annotated in margins).</p>`,

      // How It Was Created
      howItWasCreated: `<p>This response was written under <strong>45-minute exam conditions</strong> in the 2025 HSC English Extension 1 examination, achieving the rare distinction of <strong>full marks (25/25)</strong> from HSC markers.</p>

<p>What makes this particularly valuable is that it wasn't crafted over weeks with unlimited time—it demonstrates <strong>exam-viable sophistication</strong>. The annotations reveal:</p>

<ul>
  <li>Real-time decision-making about structure and argument</li>
  <li>How to balance theoretical complexity with accessibility</li>
  <li>Techniques for synthesising multiple texts under pressure</li>
  <li>Managing conceptual depth within time constraints</li>
</ul>

<p>Post-exam, I've added <strong>detailed margin annotations</strong> explaining:</p>
<ul>
  <li>Why specific words and phrases were chosen</li>
  <li>How each paragraph advances the macro-level argument</li>
  <li>Where theoretical concepts are embedded vs. explicit</li>
  <li>Strategic choices about text selection and quotation</li>
  <li>How to avoid common Extension 1 pitfalls (over-theorizing, under-analyzing, false sophistication)</li>
</ul>`,

      // Format
      format: 'PDF',

      // What You Get
      whatYouGet: `<ul>
  <li><strong>Complete 25/25 discursive response (annotated PDF):</strong> Full text with detailed margin notes explaining every strategic choice</li>
  <li><strong>Macro-technique breakdown:</strong> Analysis of structural architecture and conceptual framework</li>
  <li><strong>Micro-technique guide:</strong> Sentence-level craft techniques you can adapt</li>
  <li><strong>Postmodernist theory primer:</strong> Key concepts and how to deploy them organically</li>
  <li><strong>Self-assessment rubric:</strong> Compare your writing against 25/25 standard across 8 criteria</li>
  <li><strong>Common pitfalls guide:</strong> What separates Band E4 from Band E3 responses</li>
</ul>

<p>All materials optimized for printing or digital annotation. Instant download after purchase.</p>`,

      // Pricing
      priceInCents: 6900, // $69.00 AUD
      currency: 'AUD',

      // Stripe integration
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,

      // Download
      downloadUrls: ['/products/hsc-ext1-literary-worlds-discursive.pdf'],

      // Publishing
      published: true,
      featured: true,
      displayOrder: 1,

      // SEO
      metaTitle: 'HSC Extension 1 Literary Worlds - 25/25 Discursive | Exemplar Response',
      metaDescription:
        'Exemplar discursive response achieving full marks (25/25) in 2025 HSC English Extension 1. Master macro techniques, micro craft, and postmodernist theory.',

      // Related content (if you have any)
      relatedPostSlugs: [],
      relatedProjectSlugs: [],

      // Timestamps
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('✅ Product created successfully!');
  console.log('Product ID:', product.id);
  console.log('Slug:', product.slug);
  console.log('Stripe Product:', stripeProduct.id);
  console.log('Stripe Price:', stripePrice.id);
  console.log('\nView at: http://localhost:3000/resources/' + product.slug);
}

main()
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
