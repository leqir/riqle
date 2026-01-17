/**
 * HandDrawnSparkles Icon
 *
 * AI magic sparkles - 4-point stars with hand-drawn wobble.
 */

export function HandDrawnSparkles({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Large sparkle */}
      <path
        d="M 12 3 L 13 8 L 18 9 L 13 10 L 12 15 L 11 10 L 6 9 L 11 8 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />

      {/* Small sparkle top-right */}
      <path
        d="M 19 5 L 19.5 7 L 21 7.5 L 19.5 8 L 19 10 L 18.5 8 L 17 7.5 L 18.5 7 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Small sparkle bottom-left */}
      <path
        d="M 5 14 L 5.5 16 L 7 16.5 L 5.5 17 L 5 19 L 4.5 17 L 3 16.5 L 4.5 16 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
