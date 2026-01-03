/**
 * KoreanBackground Component
 *
 * 1AM study room atmosphere with:
 * - Desk lamp glow (warm vignette)
 * - Rain streaks (diagonal, subtle)
 * - Neon sign reflections
 * - Desk objects (pencils, erasers, coffee rings)
 * - Dark base matching Korean study aesthetic
 */

'use client';

export function KoreanBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-stone-900 via-stone-950 to-black">
      {/* Desk lamp glow - bottom-right warm vignette */}
      <div className="pointer-events-none fixed inset-0">
        <div className="bg-gradient-radial absolute bottom-0 right-0 h-[60%] w-[60%] from-amber-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Rain streaks overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[100px] w-[1px] bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(15deg)`,
              animation: `rain ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Neon sign glow bleeding through - cyan and pink */}
      <div className="pointer-events-none fixed inset-0">
        {/* Cyan glow top-left */}
        <div className="absolute left-0 top-0 h-[40%] w-[30%] bg-cyan-500/5 blur-[100px]" />

        {/* Pink glow top-right */}
        <div className="absolute right-0 top-0 h-[30%] w-[25%] bg-pink-500/5 blur-[100px]" />

        {/* Purple glow bottom-center */}
        <div className="absolute bottom-0 left-1/2 h-[25%] w-[30%] -translate-x-1/2 bg-purple-500/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Chalk dust particles (subtle) */}
      <div className="pointer-events-none fixed inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-stone-300/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes rain {
          0% {
            transform: translateY(-100px) rotate(15deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(100vh) rotate(15deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          50% {
            transform: translate(20px, -20px);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
