/**
 * Elaborate Target Icon - Highly Detailed HEYTEA Style
 * Large, intricate, sophisticated (NOT vibe coded/simple)
 */

'use client';

import { motion } from 'framer-motion';

export function ElaborateTarget({ className = 'w-20 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outermost circle with decorative notches */}
      <motion.circle
        cx="100"
        cy="100"
        r="75"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        className="text-blue-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Decorative notches on outer circle */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const outerR = 75;
        const innerR = 68;
        return (
          <motion.line
            key={i}
            x1={100 + Math.cos(angle) * outerR}
            y1={100 + Math.sin(angle) * outerR}
            x2={100 + Math.cos(angle) * innerR}
            y2={100 + Math.sin(angle) * innerR}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-blue-500"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
          />
        );
      })}

      {/* Second circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="58"
        stroke="currentColor"
        strokeWidth="3.5"
        fill="none"
        className="text-blue-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.4, duration: 1.5 }}
      />

      {/* Third circle with dashed pattern */}
      <motion.circle
        cx="100"
        cy="100"
        r="42"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="8 4"
        fill="none"
        className="text-blue-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.7, duration: 1.3 }}
      />

      {/* Fourth circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="26"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        className="text-blue-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />

      {/* Center bullseye with glow */}
      <motion.circle
        cx="100"
        cy="100"
        r="12"
        fill="currentColor"
        className="text-blue-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="18"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-blue-400"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Crosshairs with intricate details */}
      <g>
        {/* Horizontal crosshair */}
        <motion.line
          x1="20"
          y1="100"
          x2="80"
          y2="100"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-cyan-500"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        />
        <motion.line
          x1="120"
          y1="100"
          x2="180"
          y2="100"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-cyan-500"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        />

        {/* Vertical crosshair */}
        <motion.line
          x1="100"
          y1="20"
          x2="100"
          y2="80"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-cyan-500"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        />
        <motion.line
          x1="100"
          y1="120"
          x2="100"
          y2="180"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-cyan-500"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        />

        {/* Crosshair endpoints */}
        {[
          { x: 20, y: 100 },
          { x: 180, y: 100 },
          { x: 100, y: 20 },
          { x: 100, y: 180 },
        ].map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="currentColor"
            className="text-cyan-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 + i * 0.1, type: "spring" }}
          />
        ))}
      </g>

      {/* Sophisticated arrow pointing to center */}
      <motion.g
        initial={{ x: 50, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 1, type: "spring" }}
      >
        {/* Arrow shaft */}
        <path
          d="M 160 40 L 118 82"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-cyan-500"
        />
        {/* Arrow head */}
        <path
          d="M 118 82 L 128 78 M 118 82 L 122 92"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-500"
        />
        {/* Arrow fletching */}
        <path
          d="M 160 40 L 155 35 M 160 40 L 165 35 M 160 40 L 155 45 M 160 40 L 165 45"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-cyan-400"
        />
      </motion.g>

      {/* Orbiting indicator dots */}
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={i}
          cx="100"
          cy="100"
          r="3"
          fill="currentColor"
          className="text-blue-400"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
          style={{
            transformOrigin: '100px 100px',
            transform: `rotate(${i * 60}deg) translate(50px)`,
          }}
        />
      ))}
    </svg>
  );
}
