/**
 * Hand-drawn Target Icon - HEYTEA Style
 */

'use client';

import { motion } from 'framer-motion';

export function HandDrawnTarget({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle - wobbly hand-drawn */}
      <motion.circle
        cx="50"
        cy="50"
        r="35"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        className="text-blue-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Middle circle */}
      <motion.circle
        cx="50"
        cy="50"
        r="23"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        className="text-blue-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 1.2 }}
      />

      {/* Inner circle */}
      <motion.circle
        cx="50"
        cy="50"
        r="12"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-blue-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      />

      {/* Center dot */}
      <motion.circle
        cx="50"
        cy="50"
        r="4"
        fill="currentColor"
        className="text-blue-600"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      />

      {/* Arrow pointing to center - hand-drawn */}
      <motion.path
        d="M 75 25 L 58 42 M 75 25 L 68 28 M 75 25 L 72 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-cyan-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
    </svg>
  );
}
