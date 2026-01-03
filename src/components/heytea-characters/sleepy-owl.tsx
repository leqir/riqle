/**
 * SleepyOwl Character Component
 *
 * HEYTEA-inspired companion character.
 * Perpetually tired, sits on corners, has coffee cup.
 * Emotions: neutral, happy, worried, tired, sleeping
 */

'use client';

import { motion } from 'framer-motion';

interface SleepyOwlProps {
  emotion?: 'neutral' | 'happy' | 'worried' | 'tired' | 'sleeping';
  className?: string;
}

export function SleepyOwl({ emotion = 'neutral', className = 'w-16 h-16' }: SleepyOwlProps) {
  const eyeVariants = {
    neutral: { scaleY: 0.5 },
    happy: { scaleY: 0.3 },
    worried: { scaleY: 0.7 },
    tired: { scaleY: 0.4 },
    sleeping: { scaleY: 0.05 },
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Owl body - hand-drawn outline */}
        <path
          d="M 20 35 Q 20 25 30 20 Q 40 18 50 20 Q 60 25 60 35 Q 62 50 55 58 Q 40 65 25 58 Q 18 50 20 35 Z"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          className="text-stone-300"
        />

        {/* Ears (tufts) */}
        <path
          d="M 28 20 L 25 10 Q 26 12 28 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-stone-300"
        />
        <path
          d="M 52 20 L 55 10 Q 54 12 52 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-stone-300"
        />

        {/* Eyes - animated based on emotion */}
        <motion.circle
          cx="32"
          cy="38"
          r="4"
          fill="currentColor"
          className="text-stone-300"
          animate={eyeVariants[emotion]}
          transition={{ duration: 0.3 }}
        />
        <motion.circle
          cx="48"
          cy="38"
          r="4"
          fill="currentColor"
          className="text-stone-300"
          animate={eyeVariants[emotion]}
          transition={{ duration: 0.3 }}
        />

        {/* Beak */}
        <path
          d="M 40 42 L 38 48 L 42 48 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-stone-300"
        />

        {/* Coffee cup */}
        <g transform="translate(55, 50)">
          {/* Cup body */}
          <path
            d="M 0 0 Q -2 8 2 12 L 10 12 Q 14 8 12 0 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-cyan-500/50"
          />
          {/* Handle */}
          <path
            d="M 12 3 Q 16 3 16 6 Q 16 9 12 9"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-cyan-500/50"
          />
          {/* Steam */}
          <motion.path
            d="M 4 -2 Q 3 -6 4 -8"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-cyan-500/30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.path
            d="M 8 -2 Q 9 -6 8 -8"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-cyan-500/30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </g>
      </svg>
    </div>
  );
}
