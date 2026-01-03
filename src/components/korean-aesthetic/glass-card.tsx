/**
 * GlassCard Component
 *
 * Glassmorphism card with Korean aesthetic:
 * - Velvet glass effect (8px blur max, 85% opacity min)
 * - Subtle neon border glow
 * - Hand-drawn imperfections (torn corner, rotation)
 * - Chalk dust on hover
 */

'use client';

import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  neonColor?: 'cyan' | 'pink' | 'purple' | 'green';
  imperfection?: 'torn' | 'tape' | 'fold' | 'smudge' | 'none';
}

export function GlassCard({
  children,
  className = '',
  neonColor = 'cyan',
  imperfection = 'none',
}: GlassCardProps) {
  const neonColors = {
    cyan: 'border-cyan-500/30 hover:border-cyan-500/50 shadow-cyan-500/10',
    pink: 'border-pink-500/30 hover:border-pink-500/50 shadow-pink-500/10',
    purple: 'border-purple-500/30 hover:border-purple-500/50 shadow-purple-500/10',
    green: 'border-green-500/30 hover:border-green-500/50 shadow-green-500/10',
  };

  const rotation = imperfection !== 'none' ? `rotate-[${Math.random() * 4 - 2}deg]` : '';

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-white/5 backdrop-blur-md ${neonColors[neonColor]} hover:bg-white/8 shadow-lg transition-all duration-300 hover:shadow-xl ${rotation} ${className} `}
    >
      {/* Neon glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${neonColor}-500/10 to-transparent`}
        />
      </div>

      {/* Imperfection overlays */}
      {imperfection === 'torn' && (
        <div className="clip-path-torn absolute right-0 top-0 h-16 w-16 bg-stone-900/20" />
      )}

      {imperfection === 'tape' && (
        <div className="absolute right-4 top-0 h-12 w-16 bg-stone-400/10 opacity-40" />
      )}

      {imperfection === 'smudge' && (
        <div className="bg-gradient-radial absolute bottom-0 right-0 h-24 w-24 from-stone-400/5 to-transparent blur-sm" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Chalk dust particles on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-stone-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `dust ${1 + Math.random()}s ease-out`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes dust {
          0% {
            transform: translateY(0);
            opacity: 0.3;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
