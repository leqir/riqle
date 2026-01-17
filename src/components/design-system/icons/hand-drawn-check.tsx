/**
 * HandDrawnCheck Icon
 *
 * Sketchy checkmark with imperfect curves, Korean aesthetic.
 */

export function HandDrawnCheck({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M 5 13 Q 7 14.5 9 16 Q 13 10 19 6"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}
