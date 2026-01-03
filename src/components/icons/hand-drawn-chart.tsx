/**
 * Hand-drawn Chart Icon - HEYTEA Style
 */

'use client';

import { motion } from 'framer-motion';

export function HandDrawnChart({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Axes - wobbly hand-drawn */}
      <path
        d="M 20 75 L 20 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-purple-500"
      />
      <path
        d="M 20 75 L 80 75"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-purple-500"
      />

      {/* Upward trend line - wavy */}
      <motion.path
        d="M 25 65 Q 35 60 40 55 Q 50 45 58 40 Q 68 32 75 28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className="text-purple-600"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Data points */}
      {[
        { x: 25, y: 65, delay: 0.3 },
        { x: 40, y: 55, delay: 0.6 },
        { x: 58, y: 40, delay: 0.9 },
        { x: 75, y: 28, delay: 1.2 },
      ].map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="3"
          fill="currentColor"
          className="text-purple-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: point.delay, type: "spring" }}
        />
      ))}

      {/* Arrow at end */}
      <motion.path
        d="M 75 28 L 70 32 M 75 28 L 72 23"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-purple-600"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />

      {/* Sparkle accent */}
      <motion.path
        d="M 68 18 L 69 20 L 71 20 L 69 21 L 70 23 L 68 22 L 66 23 L 67 21 L 65 20 L 67 20 Z"
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
