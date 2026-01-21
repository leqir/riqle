'use client';

/**
 * Animated Wrapper Component
 *
 * Client component that provides smooth animations for the account page.
 * Separated from server component to avoid styled-jsx errors.
 */
export function AnimatedWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }
      `}</style>
      {children}
    </>
  );
}
