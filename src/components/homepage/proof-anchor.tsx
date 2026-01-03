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
      className="group relative block overflow-hidden rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-500/30 hover:shadow-xl"
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 transition-all duration-300 group-hover:from-cyan-500/5 group-hover:to-transparent"></div>

      {/* Content */}
      <div className="relative space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold leading-tight text-stone-900 transition-colors duration-200 group-hover:text-cyan-600">
            {name}
          </h3>
          <svg
            className="h-6 w-6 flex-shrink-0 text-stone-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-cyan-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </div>

        <p className="text-base leading-relaxed text-stone-700">{description}</p>

        <div className="flex items-start gap-2 pt-2">
          <div className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-500"></div>
          <p className="text-sm font-medium leading-relaxed text-stone-600">{outcome}</p>
        </div>
      </div>
    </a>
  );
}
