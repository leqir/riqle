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
import { randomUUID } from 'crypto';

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

  // Product 1: 1984 Annotated Exemplar Essay (Comprehensive Meta-Analysis)
  const product1 = await prisma.product.upsert({
    where: { slug: '1984-annotated-exemplar-common-module' },
    update: {},
    create: {
      id: randomUUID(),
      slug: '1984-annotated-exemplar-common-module',
      title: 'Annotated Exemplar Essay: Nineteen Eighty-Four',
      description:
        'A rigorously annotated Band 6 exemplar essay analyzing George Orwell\'s "Nineteen Eighty-Four" through sophisticated theoretical frameworks. Features extensive meta-cognitive annotations revealing the intellectual architecture behind every analytical choice, theoretical deployment, and structural decision.',

      // Positioning (Epic 8: Who it's for and NOT for)
      targetAudience:
        'HSC English Advanced/Extension students (2025) studying 1984 for Common Module who are committed to understanding sophisticated analytical thought processes. For students who want to learn HOW to think critically about literature, not merely what to write. Designed for those pursuing Band 6 outcomes through genuine intellectual engagement rather than formulaic replication.',
      nonAudience:
        'This is NOT a template for plagiarism, a surface-level "Band 6 example," or a formulaic response model. Not suitable for students seeking quick fixes, pre-written paragraphs to memorize, or those unwilling to engage with complex theoretical frameworks (Bakhtin, Wittgenstein, Weber, Arendt). This requires sustained intellectual effort to understand the meta-cognitive annotations and apply the thinking strategies to your own work.',

      // Content sections (Epic 8: 7 required sections)
      whatItIs: `<p>An intellectually rigorous, comprehensively annotated exemplar essay responding to the HSC 2025 Common Module question: <em>"Analyse how the representation of particular lives in your prescribed text enriches your understanding of the endurance of the human spirit."</em></p>

<p>This is not merely an essay—it is a meta-cognitive teaching document that makes visible the complete intellectual process behind Band 6 literary analysis:</p>

<ul>
  <li><strong>11 pages of dense annotations</strong> explaining every choice: from opening with historical context (post-war totalitarianism) to deploying Bakhtinian heteroglossia to arguing that the novel's <em>form itself</em> becomes resistance</li>
  <li><strong>Theoretical sophistication:</strong> Integrates Bakhtin's dialogism, Wittgenstein's linguistic philosophy, Weber's "iron cage," Arendt's analysis of totalitarianism, and phenomenological arguments about embodied consciousness</li>
  <li><strong>Metatextual argument:</strong> Advances the sophisticated claim that while Winston is destroyed within the narrative, the novel's existence and formal architecture (especially the Appendix's past tense about Newspeak) encode resistance</li>
  <li><strong>Deep contextual engagement:</strong> Positions Orwell's work within his biographical reality (dying of tuberculosis on Jura while writing), his commitment to democratic socialism, his experience in the Spanish Civil War, and the post-war European context</li>
</ul>

<p>Every annotation reveals the <em>why</em> behind choices: why begin with Churchill's "iron curtain" rather than the text, why deploy specific theoretical frameworks at particular moments, how to weave quotations into your own rhetoric, when to challenge received critical interpretations, how to maintain argumentative coherence across complex body paragraphs.</p>`,

      whatItCovers: `<p>This resource demonstrates advanced analytical techniques across three sophisticated body paragraphs plus introduction and conclusion:</p>

<ul>
  <li><strong>Introduction:</strong> How to establish historical/political context before entering the text, crafting thesis statements that acknowledge paradox, signaling sophisticated argumentative moves, and maintaining oratorical quality while remaining analytically precise</li>
  <li><strong>Body Paragraph 1 - Linguistic Rebellion:</strong> Analyzing Winston's stream-of-consciousness narration through Bakhtinian "zones of contact," exploring the diary as sacred/secular space, examining the palimpsest metaphor for historical erasure, deploying Wittgenstein's "limits of my language are limits of my world," and understanding Newspeak as linguistic determinism weaponized</li>
  <li><strong>Body Paragraph 2 - Embodied Resistance:</strong> Reading Julia through feminist frameworks (performativity, embodied knowledge vs. cerebral rebellion), analyzing the Edenic pastoral as temporary sanctuary, examining gustatory and sensory imagery as phenomenological resistance, understanding the chess metaphor's proleptic doom, and exploring how the Party weaponizes intimacy in Room 101</li>
  <li><strong>Body Paragraph 3 - Novel Form as Resistance:</strong> The essay's most sophisticated move—arguing that while Winston's consciousness is extinguished, the novel's heteroglossic architecture (diary, manifesto, appendix) and especially the Appendix's past tense about Newspeak imply the Party's eventual fall. Integrates Weber's "iron cage," Frankfurt School critiques of instrumental reason, and Arendt's concept of natality preserved through storytelling</li>
  <li><strong>Conclusion:</strong> Redefining endurance not as individual triumph but as collective memory, positioning readers as the interpretive community that preserves what totalitarianism seeks to erase</li>
</ul>

<p><strong>Theoretical Frameworks Demonstrated:</strong></p>
<ul>
  <li>Bakhtin's heteroglossia and dialogism</li>
  <li>Wittgenstein's linguistic determinism</li>
  <li>Weber's "iron cage" of modernity</li>
  <li>Arendt's analysis of totalitarian ontology</li>
  <li>Frankfurt School (Adorno/Horkheimer) on instrumental reason</li>
  <li>Phenomenology of embodied consciousness</li>
  <li>Feminist readings of embodied resistance</li>
  <li>New Historicism (contextualizing Orwell's biography and post-war Europe)</li>
</ul>

<p><strong>Meta-Cognitive Skills Revealed:</strong></p>
<ul>
  <li>How to select and deploy theoretical frameworks that genuinely illuminate rather than decorate</li>
  <li>Strategies for integrating quotations into your own rhetoric (not quarantining them in block quotes)</li>
  <li>When and how to challenge dominant critical readings</li>
  <li>Maintaining thematic coherence across complex arguments</li>
  <li>Using structural parallelism between essay organization and text's thematic architecture</li>
  <li>Balancing accessibility with intellectual rigor</li>
  <li>Creating argumentative voltas that surprise without seeming arbitrary</li>
</ul>`,

      howItWasCreated: `<p>This essay emerged from years of teaching HSC English at the highest level, working with Extension 1 and Extension 2 students who demanded intellectual depth beyond formulaic Band 6 techniques.</p>

<p>The analytical approach reflects genuine engagement with Orwell's text as literature that matters—not as HSC content to be processed. Every theoretical framework deployed (Bakhtin, Wittgenstein, Weber, Arendt) emerges organically from close reading rather than being imposed externally. The annotations make visible the complete thought process: why these theories, why this evidence, why this structural choice, why challenge this interpretation.</p>

<p>The metatextual argument about the novel's form as resistance represents sophisticated literary criticism: the claim that the Appendix's past tense implies the Party's fall is debated in Orwell scholarship, and the essay engages this debate honestly while advancing a defensible interpretation.</p>

<p>Every annotation is pedagogical: it doesn't just explain what was done, but <em>why</em> it works, how you could apply similar thinking to your own texts, and what intellectual risks are being taken. This is teaching analytical thought as a craft with learnable techniques, not mystifying it as innate genius.</p>

<p>The essay also demonstrates how to write about political literature without flattening its complexity—Orwell's democratic socialist commitments, his dying of tuberculosis while writing, his insistence that "every line of serious work that I have written since 1936 has been written, directly or indirectly, against totalitarianism." This context isn't decoration; it's essential to understanding what the novel achieves formally.</p>`,

      // Delivery
      format: 'PDF',
      whatYouGet: `<ul>
  <li><strong>11-page annotated exemplar essay (PDF):</strong> Complete essay text with extensive margin annotations (often longer than the paragraphs themselves) explaining theoretical choices, analytical moves, structural decisions, and pedagogical rationale</li>
  <li><strong>Theoretical framework explanations:</strong> Annotations clarify what Bakhtin's heteroglossia means, how Wittgenstein's linguistic philosophy applies to Newspeak, why Weber's "iron cage" illuminates Room 101, how Arendt's totalitarianism analysis deepens the argument</li>
  <li><strong>Meta-cognitive commentary:</strong> Every significant choice explained: why begin with historical context, why deploy this metaphor here, why challenge received readings, how to maintain thematic coherence, when to risk sophisticated claims</li>
  <li><strong>Evidence integration strategies:</strong> Demonstrates weaving quotations into your own prose, analyzing similes/metaphors in depth, connecting symbols across the text's architecture</li>
  <li><strong>Structural analysis:</strong> Shows how essay organization mirrors the novel's thematic structure (memory/desire/love parallel to Ministry of Truth/Junior Anti-Sex League/Room 101)</li>
</ul>

<p>Instant download after purchase. The PDF is designed for deep study—print it, annotate the annotations, trace how arguments develop across paragraphs, identify techniques you can adapt to your own texts.</p>`,

      // Pricing (Epic 8: Fair pricing methodology)
      // Comparable pricing: Premium HSC textbooks/study guides = $35-50 AUD
      // Value proposition: Equivalent depth to 1-2 tutoring sessions ($70-150) but reusable
      // Premium but accessible: Signals quality without pricing out serious students
      // Fair price: $39 AUD positions as premium study resource, not tutoring replacement
      priceInCents: 3900, // $39 AUD
      currency: 'AUD',

      // Cross-linking (Epic 8: Credibility before commerce)
      relatedPostSlugs: [], // Would link to essays about analytical frameworks if they existed
      relatedProjectSlugs: [], // Would link to MarkPoint or other teaching projects

      // Metadata
      featured: true,
      displayOrder: 1,
      published: true,

      // SEO
      metaTitle: 'Annotated 1984 Exemplar Essay - HSC Common Module Band 6',
      metaDescription:
        'Rigorously annotated Band 6 exemplar essay analyzing Orwell\'s 1984 through Bakhtin, Wittgenstein, Weber, and Arendt. Comprehensive meta-cognitive annotations reveal sophisticated analytical thinking for HSC English Advanced/Extension students.',
      ogImage: null,

      // File path for download
      downloadUrls: ['/resources/1984-annotated-exemplar-essay.pdf'],

      // Timestamps
      updatedAt: new Date(),
    },
  });

  console.log(`Created product: ${product1.title}`);

  // You can add more products here following the same pattern
  // Each must pass Epic 8 inclusion standards

  console.log('Product seeding complete!');
}
