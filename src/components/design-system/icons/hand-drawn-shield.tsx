/**
 * Hand-drawn Shield Icon - HEYTEA Style
 */

'use client';

import { motion } from 'framer-motion';

export function HandDrawnShield({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Shield outline - hand-drawn wobbly */}
      <motion.path
        d="M 50 15 Q 30 18 20 25 L 22 50 Q 25 75 50 85 Q 75 75 78 50 L 80 25 Q 70 18 50 15 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-purple-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Inner pattern - hand-drawn */}
      <path
        d="M 50 25 L 50 70"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-purple-400"
      />
      <path
        d="M 35 40 L 65 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-purple-400"
      />

      {/* Checkmark - wobbly */}
      <motion.path
        d="M 38 50 L 46 58 L 62 42"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-purple-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />

      {/* Decorative dots */}
      {[...Array(3)].map((_, i) => (
        <motion.circle
          key={i}
          cx={35 + i * 15}
          cy={65}
          r="2"
          fill="currentColor"
          className="text-purple-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + i * 0.1, type: "spring" }}
        />
      ))}
    </svg>
  );
}
