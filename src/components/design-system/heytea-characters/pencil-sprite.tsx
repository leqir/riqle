/**
 * PencilSprite Character Component
 *
 * HEYTEA-inspired companion character.
 * Tiny figure made of mechanical pencil with eraser hair.
 * States: idle, excited, helping, tired, jumping, worried
 */

'use client';

import { motion } from 'framer-motion';

interface PencilSpriteProps {
  state?: 'idle' | 'excited' | 'helping' | 'tired' | 'jumping' | 'worried';
  className?: string;
}

export function PencilSprite({ state = 'idle', className = 'w-12 h-16' }: PencilSpriteProps) {
  const jumpVariants = {
    idle: { y: 0 },
    excited: { y: [-2, -5, -2, 0] },
    jumping: { y: [-8, -12, -8, 0] },
    tired: { y: 2 },
    helping: { y: 0 },
    worried: { y: [0, -1, 0] },
  };

  return (
    <div className={`relative ${className}`}>
      <motion.svg
        viewBox="0 0 40 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        animate={jumpVariants[state]}
        transition={{
          duration: state === 'excited' || state === 'jumping' ? 0.6 : 1.5,
          repeat: state === 'idle' ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        {/* Pencil body (mechanical pencil) */}
        <path
          d="M 18 25 L 18 45 L 22 45 L 22 25 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-stone-300"
        />

        {/* Grip lines */}
        <line
          x1="18"
          y1="35"
          x2="22"
          y2="35"
          stroke="currentColor"
          strokeWidth="1"
          className="text-stone-400"
        />
        <line
          x1="18"
          y1="37"
          x2="22"
          y2="37"
          stroke="currentColor"
          strokeWidth="1"
          className="text-stone-400"
        />
        <line
          x1="18"
          y1="39"
          x2="22"
          y2="39"
          stroke="currentColor"
          strokeWidth="1"
          className="text-stone-400"
        />

        {/* Pencil tip */}
        <path
          d="M 18 45 L 20 50 L 22 45 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-stone-300"
        />

        {/* Lead (neon cyan) */}
        <circle cx="20" cy="51" r="1.5" fill="currentColor" className="text-cyan-500" />

        {/* Eraser hair (messy) */}
        <g>
          {/* Main eraser */}
          <path
            d="M 17 20 Q 17 15 20 15 Q 23 15 23 20 L 22 25 L 18 25 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-pink-500/50"
          />

          {/* Messy hair strands */}
          <path
            d="M 18 15 Q 17 10 18 8"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-pink-500/50"
          />
          <path
            d="M 20 15 Q 20 9 20 7"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-pink-500/50"
          />
          <path
            d="M 22 15 Q 23 10 22 8"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-pink-500/50"
          />
        </g>

        {/* Eyes (neon cyan dots) */}
        {state !== 'tired' ? (
          <>
            <circle cx="18" cy="22" r="1.5" fill="currentColor" className="text-cyan-500" />
            <circle cx="22" cy="22" r="1.5" fill="currentColor" className="text-cyan-500" />
          </>
        ) : (
          <>
            {/* Tired eyes (half-closed) */}
            <line
              x1="17"
              y1="22"
              x2="19"
              y2="22"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-cyan-500"
            />
            <line
              x1="21"
              y1="22"
              x2="23"
              y2="22"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-cyan-500"
            />
          </>
        )}

        {/* Arms (tiny) */}
        <g>
          <path
            d="M 17 30 L 12 32"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-stone-300"
          />
          <path
            d="M 23 30 L 28 32"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-stone-300"
          />
        </g>

        {/* Chalk dust trail when moving */}
        {(state === 'helping' || state === 'excited') && (
          <g>
            {[...Array(3)].map((_, i) => (
              <motion.circle
                key={i}
                cx={20 + (i - 1) * 4}
                cy={52 + i * 3}
                r={0.5}
                fill="currentColor"
                className="text-stone-300/30"
                animate={{
                  opacity: [0.3, 0, 0.3],
                  y: [0, 5, 10],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </g>
        )}

        {/* Excited stars */}
        {state === 'excited' && (
          <g>
            <motion.path
              d="M 8 20 L 9 22 L 11 22 L 9 23 L 10 25 L 8 24 L 6 25 L 7 23 L 5 22 L 7 22 Z"
              fill="currentColor"
              className="text-cyan-500/50"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
            <motion.path
              d="M 32 18 L 33 20 L 35 20 L 33 21 L 34 23 L 32 22 L 30 23 L 31 21 L 29 20 L 31 20 Z"
              fill="currentColor"
              className="text-cyan-500/50"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.3,
              }}
            />
          </g>
        )}
      </motion.svg>
    </div>
  );
}
