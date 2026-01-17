/**
 * CurrentContext Component
 *
 * Purpose: Immediately establish who Nathanael is NOW before explaining how he got here.
 * Ensures the narrative feels current and relevant, not nostalgic.
 *
 * Story 4.4 Requirements:
 * - One short paragraph
 * - States: what you currently do, what you're focused on, what kind of problems you work on
 * - NO childhood backstory, NO credentials list, NO future promises
 * - Present tense only
 */

export function CurrentContext() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-stone-700">
        I build products, teach systems thinking, and run MarkPoint—a startup focused on educational
        technology that helps students navigate complex academic frameworks. My work sits at the
        intersection of education, product development, and sustainable business models.
      </p>

      <p className="text-lg leading-relaxed text-stone-700">
        Right now, I&apos;m focused on solving problems that sit between technical infrastructure
        and human understanding—problems that require clarity, restraint, and evidence-based
        decision-making rather than clever solutions.
      </p>
    </div>
  );
}
