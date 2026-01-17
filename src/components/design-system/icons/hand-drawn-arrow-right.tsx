/**
 * HandDrawnArrowRight Icon
 *
 * Hand-drawn arrow icon with wobbly, imperfect lines matching Korean aesthetic.
 * Stroke: 2-2.5px, quadratic curves for wobble.
 */

export function HandDrawnArrowRight({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Arrow shaft - wobbly line */}
      <path
        d="M 4 12 Q 8 11.7 12 12 Q 16 12.3 19 12"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Arrow head - hand-drawn */}
      <path
        d="M 14 7 Q 15.5 8.5 19 12 Q 15.5 15.5 14 17"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}
