/**
 * CurrentFocus Component
 *
 * Purpose: Provide directional clarity about what Nathanael is focused on NOW.
 * Enables employers to quickly assess alignment without guessing intent.
 *
 * Story 4.8 Requirements:
 * - 1-2 short paragraphs
 * - Covers: current interests, types of problems, areas to deepen
 * - NO grand mission statements or vague ambitions
 * - Keep it concrete and bounded
 * - Feels practical, not aspirational
 */

export function CurrentFocus() {
  return (
    <div className="space-y-6">
      <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight text-stone-900">
        What I&apos;m focused on now
      </h2>

      <p className="text-base leading-relaxed text-stone-700">
        Right now, I&apos;m working on building MarkPoint&apos;s core infrastructure—specifically,
        the challenge of creating educational tools that help students internalize cognitive
        frameworks rather than just memorize content. This requires balancing technical architecture
        with pedagogical clarity, which aligns with my experience in both teaching and product
        development.
      </p>

      <p className="text-base leading-relaxed text-stone-700">
        I&apos;m particularly interested in deepening my understanding of how systems scale without
        losing coherence—especially as it relates to education, where bad scaling often destroys the
        very thing that made something work. This work informs how I approach product design, team
        building, and business sustainability at MarkPoint.
      </p>
    </div>
  );
}
