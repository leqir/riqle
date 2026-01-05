/**
 * Elaborate Sparkles Icon - Highly Detailed HEYTEA Style
 * Large, intricate, sophisticated (NOT vibe coded/simple)
 */

'use client';

import { motion } from 'framer-motion';

export function ElaborateSparkles({ className = 'w-20 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Main large central star with intricate details */}
      <motion.path
        d="M 100 30 L 106 78 L 120 74 L 114 88 L 130 98 L 110 102 L 116 120 L 100 108 L 84 120 L 90 102 L 70 98 L 86 88 L 80 74 L 94 78 Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-purple-500"
        initial={{ pathLength: 0, rotate: -180, scale: 0 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Inner star pattern */}
      <motion.path
        d="M 100 50 L 103 75 L 112 72 L 108 82 L 118 90 L 106 92 L 110 105 L 100 97 L 90 105 L 94 92 L 82 90 L 92 82 L 88 72 L 97 75 Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        className="text-purple-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      />

      {/* Radiating lines from center */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const innerR = 25;
        const outerR = 40;
        return (
          <motion.line
            key={i}
            x1={100 + Math.cos(angle) * innerR}
            y1={100 + Math.sin(angle) * innerR}
            x2={100 + Math.cos(angle) * outerR}
            y2={100 + Math.sin(angle) * outerR}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-purple-300"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8 + i * 0.05, duration: 0.6 }}
          />
        );
      })}

      {/* Medium sparkle - top right with details */}
      <motion.g
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
      >
        <path
          d="M 150 50 L 152 60 L 160 58 L 156 66 L 164 72 L 154 74 L 156 84 L 150 78 L 144 84 L 146 74 L 136 72 L 144 66 L 140 58 L 148 60 Z"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-cyan-400"
        />
        {/* Inner glow */}
        <circle cx="150" cy="68" r="8" fill="currentColor" className="text-cyan-400" opacity="0.3" />
        {/* Detail lines */}
        {[0, 90, 180, 270].map((angle, i) => (
          <line
            key={i}
            x1={150 + Math.cos((angle * Math.PI) / 180) * 12}
            y1={68 + Math.sin((angle * Math.PI) / 180) * 12}
            x2={150 + Math.cos((angle * Math.PI) / 180) * 18}
            y2={68 + Math.sin((angle * Math.PI) / 180) * 18}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-cyan-300"
          />
        ))}
      </motion.g>

      {/* Large sparkle - bottom left with intricate details */}
      <motion.g
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.7 }}
      >
        <path
          d="M 50 130 L 52 145 L 64 142 L 59 152 L 70 162 L 58 164 L 60 178 L 50 170 L 40 178 L 42 164 L 30 162 L 41 152 L 36 142 L 48 145 Z"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-purple-400"
        />
        {/* Decorative circles around */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <circle
            key={i}
            cx={50 + Math.cos((angle * Math.PI) / 180) * 22}
            cy={155 + Math.sin((angle * Math.PI) / 180) * 22}
            r="2"
            fill="currentColor"
            className="text-purple-300"
          />
        ))}
      </motion.g>

      {/* Small intricate sparkles scattered */}
      {[
        { x: 170, y: 120, color: 'text-blue-400', delay: 0 },
        { x: 30, y: 60, color: 'text-pink-400', delay: 0.4 },
        { x: 160, y: 160, color: 'text-purple-300', delay: 0.8 },
      ].map((sparkle, idx) => (
        <motion.g
          key={idx}
          animate={{
            scale: [0.9, 1.3, 0.9],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: sparkle.delay }}
        >
          {/* Cross shape */}
          <line
            x1={sparkle.x}
            y1={sparkle.y - 8}
            x2={sparkle.x}
            y2={sparkle.y + 8}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={sparkle.color}
          />
          <line
            x1={sparkle.x - 8}
            y1={sparkle.y}
            x2={sparkle.x + 8}
            y2={sparkle.y}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={sparkle.color}
          />
          {/* Diagonal cross */}
          <line
            x1={sparkle.x - 6}
            y1={sparkle.y - 6}
            x2={sparkle.x + 6}
            y2={sparkle.y + 6}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={sparkle.color}
            opacity="0.7"
          />
          <line
            x1={sparkle.x + 6}
            y1={sparkle.y - 6}
            x2={sparkle.x - 6}
            y2={sparkle.y + 6}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={sparkle.color}
            opacity="0.7"
          />
        </motion.g>
      ))}

      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45);
        return (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r="2"
            fill="currentColor"
            className="text-purple-400"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.2,
            }}
            style={{
              transformOrigin: '100px 100px',
              transform: `rotate(${angle}deg) translate(55px)`,
            }}
          />
        );
      })}
    </svg>
  );
}
