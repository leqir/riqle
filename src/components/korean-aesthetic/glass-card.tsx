/**
 * GlassCard Component - Light Mode Futuristic Glassmorphism
 *
 * Features:
 * - Light, airy glassmorphism effect
 * - Subtle neon border accents
 * - Hand-drawn imperfections (HEYTEA style)
 * - Smooth animations
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
    cyan: 'border-cyan-400/40 hover:border-cyan-500/60 shadow-cyan-200/20',
    pink: 'border-pink-400/40 hover:border-pink-500/60 shadow-pink-200/20',
    purple: 'border-purple-400/40 hover:border-purple-500/60 shadow-purple-200/20',
    green: 'border-green-400/40 hover:border-green-500/60 shadow-green-200/20',
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border bg-white/60 backdrop-blur-xl ${neonColors[neonColor]} shadow-xl transition-all duration-300 hover:bg-white/70 hover:shadow-2xl ${className}`}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${neonColor}-100/20 to-transparent`}
        />
      </div>

      {/* Hand-drawn imperfections (HEYTEA style) */}
      {imperfection === 'torn' && (
        <div className="absolute right-0 top-0 h-16 w-16 bg-stone-100/30 opacity-40" />
      )}

      {imperfection === 'tape' && (
        <div className="absolute right-4 top-0 h-12 w-16 bg-stone-200/20 opacity-30" />
      )}

      {imperfection === 'smudge' && (
        <div className="bg-gradient-radial absolute bottom-0 right-0 h-24 w-24 from-stone-200/10 to-transparent blur-sm" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
