/**
 * StudyCat Character Component
 *
 * HEYTEA-inspired companion character.
 * Mostly sleeping, occasionally stretches.
 * Poses: sleeping, stretching, alert, curled
 */

'use client';

import { motion } from 'framer-motion';

interface StudyCatProps {
  pose?: 'sleeping' | 'stretching' | 'alert' | 'curled';
  className?: string;
}

export function StudyCat({ pose = 'sleeping', className = 'w-20 h-20' }: StudyCatProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {pose === 'sleeping' && (
          <>
            {/* Sleeping cat - curled up circle with ears */}
            <motion.circle
              cx="50"
              cy="55"
              r="20"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              className="text-stone-300"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Ears */}
            <path
              d="M 35 40 L 30 32 L 38 38 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-300"
            />
            <path
              d="M 65 40 L 70 32 L 62 38 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-300"
            />

            {/* Paw over face */}
            <path
              d="M 45 50 Q 48 48 52 50"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-300"
            />

            {/* Neon collar */}
            <circle cx="50" cy="50" r="2" fill="currentColor" className="text-cyan-500" />
          </>
        )}

        {pose === 'curled' && (
          <>
            {/* Curled cat */}
            <path
              d="M 30 50 Q 25 40 35 35 Q 50 32 65 35 Q 75 40 70 50 Q 68 60 60 65 Q 50 68 40 65 Q 32 60 30 50 Z"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              className="text-stone-300"
            />

            {/* Ears */}
            <path
              d="M 38 38 L 33 30 L 40 35 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-300"
            />
            <path
              d="M 62 38 L 67 30 L 60 35 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-300"
            />

            {/* Tail wrapped */}
            <path
              d="M 60 65 Q 70 68 75 60"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-300"
            />
          </>
        )}

        {pose === 'alert' && (
          <>
            {/* Alert sitting cat */}
            <path
              d="M 40 60 Q 38 50 40 40 L 45 30 L 55 30 L 60 40 Q 62 50 60 60 L 50 70 Z"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              className="text-stone-300"
            />

            {/* Ears - perked up */}
            <path
              d="M 45 30 L 40 18 L 48 28 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-300"
            />
            <path
              d="M 55 30 L 60 18 L 52 28 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-300"
            />

            {/* Eyes - wide open */}
            <circle cx="45" cy="38" r="3" fill="currentColor" className="text-cyan-500" />
            <circle cx="55" cy="38" r="3" fill="currentColor" className="text-cyan-500" />
          </>
        )}

        {pose === 'stretching' && (
          <>
            {/* Stretching cat */}
            <motion.path
              d="M 30 60 Q 28 50 35 45 L 45 40 Q 50 38 55 40 L 65 45 Q 72 50 70 60"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              className="text-stone-300"
              animate={{
                d: 'M 30 60 Q 28 50 35 42 L 45 35 Q 50 33 55 35 L 65 42 Q 72 50 70 60',
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />

            {/* Front legs stretched */}
            <path
              d="M 35 45 L 30 55"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-300"
            />
            <path
              d="M 65 45 L 70 55"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-300"
            />
          </>
        )}
      </svg>
    </div>
  );
}
