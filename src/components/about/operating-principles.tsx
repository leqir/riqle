/**
 * OperatingPrinciples Component
 *
 * Purpose: Show how Nathanael makes decisions through observable principles.
 * Enables employers to assess culture fit without abstract virtues.
 *
 * Story 4.9 Requirements:
 * - 3-5 principles max
 * - Short, declarative statements
 * - Each principle observable in your work
 * - NO moralizing or abstract virtues
 * - NO long explanations
 * - Principles must be lived-in, not aspirational
 */

const principles = [
  'Clarity over cleverness',
  'Build before you scale',
  'Evidence before persuasion',
  'Respect user attention',
  'Boring is often better',
];

export function OperatingPrinciples() {
  return (
    <div className="space-y-6">
      <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight text-stone-900">
        How I work
      </h2>

      <ul className="space-y-3">
        {principles.map((principle, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-base leading-relaxed text-stone-700"
          >
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500"></span>
            {principle}
          </li>
        ))}
      </ul>
    </div>
  );
}
