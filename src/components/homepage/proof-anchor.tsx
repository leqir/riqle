/**
 * ProofAnchor Component
 *
 * Displays a single proof item on the homepage second screen.
 * Answers Q3: "Have they built real things?"
 *
 * Requirements (Story 3.4):
 * - Name (clear, direct)
 * - One-line description (what it is)
 * - Outcome or scope (quantified if possible)
 * - Link to deep-dive page
 * - No logo grids
 * - Metrics with context
 * - Maximum 2-3 proof anchors per homepage
 */

export interface ProofAnchorProps {
  name: string;
  description: string;
  outcome: string;
  href: string;
}

export function ProofAnchor({ name, description, outcome, href }: ProofAnchorProps) {
  return (
    <a
      href={href}
      className="group block space-y-2 rounded-lg border border-stone-200 p-6 transition-colors duration-200 hover:border-stone-300"
    >
      <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-[1.3] text-stone-900 transition-colors duration-200 group-hover:text-cyan-500">
        {name}
      </h3>
      <p className="text-[1rem] leading-[1.7] text-stone-700">{description}</p>
      <p className="text-[0.875rem] leading-[1.5] text-stone-600">{outcome}</p>
    </a>
  );
}
