/**
 * Hand-drawn Book Icon - HEYTEA Style
 */

'use client';

import { motion } from 'framer-motion';

export function HandDrawnBook({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Book cover - hand-drawn */}
      <motion.path
        d="M 25 20 L 23 75 Q 23 78 26 78 L 74 78 Q 77 78 77 75 L 75 20 Q 75 17 72 17 L 28 17 Q 25 17 25 20 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className="text-blue-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Pages - slightly offset wobbly lines */}
      <path
        d="M 30 20 L 28 75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-blue-400"
      />
      <path
        d="M 33 20 L 31 75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-blue-300"
      />

      {/* Bookmark ribbon - wavy */}
      <motion.path
        d="M 50 17 L 50 50 Q 52 48 54 50 L 54 17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        className="text-cyan-400"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Text lines - wobbly */}
      {[35, 45, 55, 65].map((y, i) => (
        <motion.line
          key={i}
          x1="40"
          y1={y}
          x2="70"
          y2={y}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-blue-300"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}
