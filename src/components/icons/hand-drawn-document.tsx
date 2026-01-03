/**
 * Hand-drawn Document Icon - HEYTEA Style
 */

'use client';

import { motion } from 'framer-motion';

export function HandDrawnDocument({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Document outline - wobbly rectangle */}
      <motion.path
        d="M 28 20 L 28 80 Q 28 82 30 82 L 70 82 Q 72 82 72 80 L 72 35 L 57 20 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-stone-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Folded corner */}
      <path
        d="M 57 20 L 57 32 Q 57 35 60 35 L 72 35"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-stone-300"
      />

      {/* Text lines - wobbly */}
      {[48, 56, 64, 72].map((y, i) => (
        <motion.line
          key={i}
          x1="36"
          y1={y}
          x2="64"
          y2={y}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-stone-300"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
        />
      ))}
    </svg>
  );
}
