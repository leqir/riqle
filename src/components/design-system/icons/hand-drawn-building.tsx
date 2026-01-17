/**
 * Hand-drawn Building Icon - HEYTEA Style
 */

'use client';

import { motion } from 'framer-motion';

export function HandDrawnBuilding({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Main building body - hand-drawn wobbly lines */}
      <motion.path
        d="M 25 75 L 23 35 Q 23 32 26 32 L 74 32 Q 77 32 77 35 L 75 75 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className="text-blue-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Roof - wavy hand-drawn */}
      <path
        d="M 20 32 L 50 15 Q 51 14 52 15 L 80 32"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className="text-blue-500"
      />

      {/* Windows - slightly imperfect rectangles */}
      {[
        { x: 35, y: 42 },
        { x: 55, y: 42 },
        { x: 35, y: 55 },
        { x: 55, y: 55 },
      ].map((pos, i) => (
        <motion.rect
          key={i}
          x={pos.x}
          y={pos.y}
          width="8"
          height="8"
          rx="1"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-blue-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
        />
      ))}

      {/* Door - slightly wonky */}
      <path
        d="M 45 75 L 45 65 Q 45 63 47 63 L 53 63 Q 55 63 55 65 L 55 75"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        className="text-blue-500"
      />

      {/* Hand-drawn sparkle accents */}
      <motion.path
        d="M 15 25 L 16 27 L 18 27 L 16 28 L 17 30 L 15 29 L 13 30 L 14 28 L 12 27 L 14 27 Z"
        fill="currentColor"
        className="text-cyan-400"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}
