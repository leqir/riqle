/**
 * Hand-drawn Palette Icon - HEYTEA Style
 */

'use client';

import { motion } from 'framer-motion';

export function HandDrawnPalette({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Palette shape - kidney bean wobbly outline */}
      <motion.path
        d="M 25 45 Q 22 30 35 22 Q 55 15 70 25 Q 80 35 80 50 Q 78 65 65 70 Q 55 73 50 65 Q 48 60 52 55 Q 30 58 25 45 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-purple-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      {/* Paint dollops - circles with slight wobble */}
      {[
        { cx: 38, cy: 32, color: 'text-red-400', delay: 0.5 },
        { cx: 55, cy: 28, color: 'text-yellow-400', delay: 0.6 },
        { cx: 66, cy: 38, color: 'text-blue-400', delay: 0.7 },
        { cx: 40, cy: 48, color: 'text-green-400', delay: 0.8 },
        { cx: 60, cy: 52, color: 'text-purple-400', delay: 0.9 },
      ].map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r="4"
          fill="currentColor"
          className={dot.color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: dot.delay, type: "spring", stiffness: 200 }}
        />
      ))}

      {/* Thumb hole */}
      <motion.ellipse
        cx="52"
        cy="60"
        rx="6"
        ry="8"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        className="text-purple-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      />

      {/* Brush - hand-drawn */}
      <motion.g
        initial={{ x: 20, y: -20, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <path
          d="M 72 15 L 78 21"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-amber-700"
        />
        <path
          d="M 78 21 Q 82 24 85 28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-stone-400"
        />
      </motion.g>
    </svg>
  );
}
