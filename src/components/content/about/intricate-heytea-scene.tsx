/**
 * Intricate HEYTEA-Inspired Character Scenes
 * Sophisticated hand-drawn illustrations for each section
 */

'use client';

import { motion } from 'framer-motion';

interface IntricateHeyteaSceneProps {
  scene: 'philosophy' | 'technical' | 'creative';
  className?: string;
}

export function IntricateHeyteaScene({ scene, className = '' }: IntricateHeyteaSceneProps) {
  if (scene === 'philosophy') {
    return (
      <svg viewBox="0 0 500 600" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Background gradient circles */}
        <defs>
          <radialGradient id="grad-purple-phi" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="grad-blue-phi" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="300" r="220" fill="url(#grad-purple-phi)" />
        <circle cx="250" cy="300" r="140" fill="url(#grad-blue-phi)" />

        {/* Large detailed owl character - center */}
        <g transform="translate(180, 200)">
          {/* Body with feather texture */}
          <motion.path
            d="M 30 80 Q 25 50 35 30 Q 70 10 105 30 Q 115 50 110 80 Q 115 130 100 165 Q 70 185 40 165 Q 25 130 30 80 Z"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-stone-300"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Detailed feather patterns */}
          {[...Array(12)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${40 + i * 7} ${90 + (i % 3) * 8} Q ${42 + i * 7} ${95 + (i % 3) * 8} ${40 + i * 7} ${100 + (i % 3) * 8}`}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-200"
              opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.8 }}
            />
          ))}

          {/* Tufted ears with detail */}
          <motion.path
            d="M 35 30 L 22 5 Q 25 8 30 18 Q 33 25 35 30"
            stroke="currentColor"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            className="text-stone-300"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d="M 105 30 L 118 5 Q 115 8 110 18 Q 107 25 105 30"
            stroke="currentColor"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            className="text-stone-300"
            animate={{ rotate: [2, -2, 2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Large expressive eyes with eyelashes */}
          <g>
            <motion.circle
              cx="55"
              cy="70"
              r="12"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-stone-300"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.circle
              cx="55"
              cy="70"
              r="6"
              fill="currentColor"
              className="text-purple-400"
              animate={{ scale: [1, 0.95, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Eyelashes */}
            {[-15, -8, 0, 8, 15].map((angle, i) => (
              <line
                key={i}
                x1={55 + Math.cos((angle * Math.PI) / 180) * 12}
                y1={70 + Math.sin((angle * Math.PI) / 180) * 12}
                x2={55 + Math.cos((angle * Math.PI) / 180) * 17}
                y2={70 + Math.sin((angle * Math.PI) / 180) * 17}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-stone-300"
              />
            ))}
          </g>

          <g>
            <motion.circle
              cx="85"
              cy="70"
              r="12"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-stone-300"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.circle
              cx="85"
              cy="70"
              r="6"
              fill="currentColor"
              className="text-purple-400"
              animate={{ scale: [1, 0.95, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Eyelashes */}
            {[-15, -8, 0, 8, 15].map((angle, i) => (
              <line
                key={i}
                x1={85 + Math.cos((angle * Math.PI) / 180) * 12}
                y1={70 + Math.sin((angle * Math.PI) / 180) * 12}
                x2={85 + Math.cos((angle * Math.PI) / 180) * 17}
                y2={70 + Math.sin((angle * Math.PI) / 180) * 17}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-stone-300"
              />
            ))}
          </g>

          {/* Detailed beak */}
          <path
            d="M 70 85 L 63 98 Q 70 102 77 98 Z"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinejoin="round"
            className="text-amber-600"
          />

          {/* Wing with feather detail */}
          <g>
            <path
              d="M 30 100 Q 8 110 5 130 Q 10 150 30 145"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-stone-300"
            />
            {[...Array(4)].map((_, i) => (
              <path
                key={i}
                d={`M ${12 + i * 5} ${115 + i * 8} Q ${10 + i * 5} ${120 + i * 8} ${12 + i * 5} ${125 + i * 8}`}
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="text-stone-200"
              />
            ))}
          </g>

          {/* Coffee cup with intricate details */}
          <g transform="translate(105, 140)">
            <path
              d="M 0 0 Q -4 25 8 35 L 28 35 Q 40 25 36 0 Z"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-cyan-500"
            />
            <path
              d="M 36 8 Q 50 8 50 18 Q 50 28 36 28"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-cyan-500"
            />
            {/* Coffee liquid with ripples */}
            <ellipse cx="18" cy="5" rx="16" ry="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400" opacity="0.6" />
            <ellipse cx="18" cy="8" rx="14" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-300" opacity="0.4" />

            {/* Animated steam with curves */}
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M ${10 + i * 7} -8 Q ${9 + i * 7} -20 ${10 + i * 7} -28 Q ${11 + i * 7} -35 ${10 + i * 7} -40`}
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                className="text-cyan-400"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}

            {/* Cup handle detail */}
            <path
              d="M 36 10 Q 38 10 38 12 M 36 16 Q 38 16 38 18"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              className="text-cyan-400"
            />
          </g>
        </g>

        {/* Floating books with intricate details */}
        <g transform="translate(50, 150)">
          <motion.g
            animate={{ rotate: [-3, 3, -3], y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <rect
              x="0"
              y="0"
              width="55"
              height="70"
              rx="3"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-blue-400"
            />
            <rect x="4" y="0" width="5" height="70" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
            {[12, 20, 28, 36, 44].map((y, i) => (
              <line key={i} x1="12" y1={y} x2="48" y2={y} stroke="currentColor" strokeWidth="2" className="text-blue-300" />
            ))}
            {/* Book tab */}
            <path d="M 27 0 L 27 30 Q 29 28 31 30 L 31 0" stroke="currentColor" strokeWidth="2" fill="none" className="text-cyan-400" />
          </motion.g>
        </g>

        <g transform="translate(380, 200)">
          <motion.g
            animate={{ rotate: [4, -4, 4], y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          >
            <rect
              x="0"
              y="0"
              width="60"
              height="75"
              rx="3"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-purple-400"
            />
            <rect x="4" y="0" width="5" height="75" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-300" />
            {[15, 25, 35, 45, 55].map((y, i) => (
              <line key={i} x1="14" y1={y} x2="52" y2={y} stroke="currentColor" strokeWidth="2" className="text-purple-300" />
            ))}
          </motion.g>
        </g>

        {/* Floating sparkles - hand-drawn stars */}
        {[
          { x: 100, y: 450, delay: 0 },
          { x: 180, y: 480, delay: 0.3 },
          { x: 280, y: 465, delay: 0.6 },
          { x: 360, y: 480, delay: 0.9 },
          { x: 420, y: 450, delay: 1.2 },
        ].map((star, i) => (
          <motion.path
            key={i}
            d={`M ${star.x} ${star.y} L ${star.x + 2} ${star.y + 4} L ${star.x + 5} ${star.y + 4} L ${star.x + 3} ${star.y + 6} L ${star.x + 4} ${star.y + 9} L ${star.x} ${star.y + 7} L ${star.x - 4} ${star.y + 9} L ${star.x - 3} ${star.y + 6} L ${star.x - 5} ${star.y + 4} L ${star.x - 2} ${star.y + 4} Z`}
            fill="currentColor"
            className="text-purple-300"
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}

        {/* Decorative wavy line at bottom */}
        <motion.path
          d="M 50 520 Q 125 510 200 520 Q 300 530 350 520 Q 400 510 450 520"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 4"
          className="text-stone-200"
          animate={{ strokeDashoffset: [0, -24] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    );
  }

  if (scene === 'technical') {
    return (
      <svg viewBox="0 0 500 600" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Background gradient circles */}
        <defs>
          <radialGradient id="grad-cyan-tech" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="grad-blue-tech" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="300" r="220" fill="url(#grad-cyan-tech)" />
        <circle cx="250" cy="300" r="140" fill="url(#grad-blue-tech)" />

        {/* Large robot character - center */}
        <g transform="translate(180, 180)">
          {/* Body with panel details */}
          <motion.path
            d="M 40 100 Q 35 90 40 80 L 40 60 Q 40 55 45 55 L 95 55 Q 100 55 100 60 L 100 80 Q 105 90 100 100 L 100 160 Q 100 165 95 165 L 45 165 Q 40 165 40 160 Z"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-stone-300"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Panel details */}
          {[...Array(8)].map((_, i) => (
            <motion.rect
              key={i}
              x={50 + (i % 2) * 25}
              y={100 + Math.floor(i / 2) * 15}
              width="12"
              height="8"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}

          {/* Antenna with signal waves */}
          <motion.path
            d="M 70 55 L 70 35 Q 70 30 75 30 L 78 30"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className="text-stone-300"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle
            cx="80"
            cy="30"
            r="4"
            fill="currentColor"
            className="text-cyan-500"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Signal waves */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="80"
              cy="30"
              r={8 + i * 6}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-cyan-400"
              animate={{
                opacity: [0.6, 0, 0.6],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}

          {/* Eyes - digital display style */}
          <g>
            <motion.rect
              x="52"
              y="68"
              width="12"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-stone-300"
            />
            <motion.rect
              x="55"
              y="72"
              width="6"
              height="6"
              fill="currentColor"
              className="text-cyan-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </g>

          <g>
            <motion.rect
              x="76"
              y="68"
              width="12"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-stone-300"
            />
            <motion.rect
              x="79"
              y="72"
              width="6"
              height="6"
              fill="currentColor"
              className="text-cyan-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </g>

          {/* Gear arm accessory */}
          <g transform="translate(105, 110)">
            <circle
              cx="0"
              cy="0"
              r="15"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-stone-300"
            />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <rect
                  key={i}
                  x={Math.cos((angle * Math.PI) / 180) * 12 - 2}
                  y={Math.sin((angle * Math.PI) / 180) * 12 - 3}
                  width="4"
                  height="6"
                  fill="currentColor"
                  className="text-stone-200"
                />
              ))}
            </motion.g>
          </g>

          {/* Code bracket symbols floating */}
          <motion.text
            x="120"
            y="70"
            fontSize="24"
            fill="currentColor"
            className="text-blue-400 font-mono"
            animate={{ y: [70, 60, 70], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {'</>'}
          </motion.text>
        </g>

        {/* Floating code symbols */}
        {[
          { x: 80, y: 200, text: '{', delay: 0 },
          { x: 400, y: 250, text: '}', delay: 0.5 },
          { x: 120, y: 400, text: '( )', delay: 1 },
          { x: 370, y: 420, text: '[ ]', delay: 1.5 },
        ].map((symbol, i) => (
          <motion.text
            key={i}
            x={symbol.x}
            y={symbol.y}
            fontSize="28"
            fill="currentColor"
            className="text-blue-300 font-mono"
            animate={{
              y: [symbol.y, symbol.y - 15, symbol.y],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: symbol.delay,
            }}
          >
            {symbol.text}
          </motion.text>
        ))}

        {/* Binary rain effect */}
        {[...Array(8)].map((_, i) => (
          <motion.text
            key={i}
            x={60 + i * 50}
            y={100}
            fontSize="14"
            fill="currentColor"
            className="text-cyan-300 font-mono"
            animate={{
              y: [100, 500],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear",
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.text>
        ))}

        {/* Decorative wavy circuit line */}
        <motion.path
          d="M 50 520 Q 100 515 150 520 L 200 520 Q 250 525 300 520 L 350 520 Q 400 515 450 520"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 4"
          className="text-stone-200"
          animate={{ strokeDashoffset: [0, -24] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    );
  }

  if (scene === 'creative') {
    return (
      <svg viewBox="0 0 500 600" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Background gradient circles */}
        <defs>
          <radialGradient id="grad-pink-creative" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="grad-purple-creative" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="300" r="220" fill="url(#grad-pink-creative)" />
        <circle cx="250" cy="300" r="140" fill="url(#grad-purple-creative)" />

        {/* Large fox character - center */}
        <g transform="translate(180, 190)">
          {/* Body with brush strokes */}
          <motion.path
            d="M 35 90 Q 30 70 35 60 Q 50 45 70 45 Q 90 45 105 60 Q 110 70 105 90 Q 110 130 95 160 Q 70 175 45 160 Q 30 130 35 90 Z"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-stone-300"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Fur texture strokes */}
          {[...Array(10)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${45 + i * 6} ${100 + (i % 2) * 10} Q ${47 + i * 6} ${105 + (i % 2) * 10} ${45 + i * 6} ${110 + (i % 2) * 10}`}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-stone-200"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.8 }}
            />
          ))}

          {/* Pointed ears */}
          <motion.path
            d="M 40 60 L 25 30 Q 28 35 35 50 Q 38 56 40 60"
            stroke="currentColor"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            className="text-stone-300"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d="M 100 60 L 115 30 Q 112 35 105 50 Q 102 56 100 60"
            stroke="currentColor"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            className="text-stone-300"
            animate={{ rotate: [2, -2, 2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Eyes - creative and expressive */}
          <g>
            <motion.circle
              cx="58"
              cy="80"
              r="11"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-stone-300"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.circle
              cx="58"
              cy="80"
              r="5"
              fill="currentColor"
              className="text-pink-500"
              animate={{ scale: [1, 0.95, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>

          <g>
            <motion.circle
              cx="82"
              cy="80"
              r="11"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-stone-300"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.circle
              cx="82"
              cy="80"
              r="5"
              fill="currentColor"
              className="text-pink-500"
              animate={{ scale: [1, 0.95, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>

          {/* Snout */}
          <path
            d="M 70 95 L 65 105 Q 70 108 75 105 Z"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinejoin="round"
            className="text-stone-400"
          />

          {/* Paint palette in paw */}
          <g transform="translate(95, 150)">
            <path
              d="M 5 0 Q 2 -5 8 -10 Q 20 -15 30 -8 Q 35 -3 35 5 Q 33 12 27 15 Q 22 17 20 12 Q 18 8 21 5 Q 8 8 5 0 Z"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              className="text-purple-500"
            />
            {/* Paint dots */}
            {[
              { x: 12, y: -5, color: 'text-red-400' },
              { x: 20, y: -8, color: 'text-yellow-400' },
              { x: 26, y: -3, color: 'text-blue-400' },
            ].map((dot, i) => (
              <circle
                key={i}
                cx={dot.x}
                cy={dot.y}
                r="2"
                fill="currentColor"
                className={dot.color}
              />
            ))}
          </g>
        </g>

        {/* Floating design elements - color swatches */}
        {[
          { x: 90, y: 180, color: 'text-red-400', delay: 0 },
          { x: 380, y: 220, color: 'text-blue-400', delay: 0.3 },
          { x: 120, y: 380, color: 'text-yellow-400', delay: 0.6 },
          { x: 360, y: 420, color: 'text-green-400', delay: 0.9 },
        ].map((swatch, i) => (
          <motion.circle
            key={i}
            cx={swatch.x}
            cy={swatch.y}
            r="18"
            fill="currentColor"
            className={swatch.color}
            opacity="0.6"
            animate={{
              y: [swatch.y, swatch.y - 12, swatch.y],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: swatch.delay,
            }}
          />
        ))}

        {/* Brush stroke trails */}
        {[
          { path: 'M 60 250 Q 100 240 140 250', delay: 0 },
          { path: 'M 340 300 Q 380 290 420 300', delay: 0.5 },
        ].map((stroke, i) => (
          <motion.path
            key={i}
            d={stroke.path}
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            className="text-purple-300"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: stroke.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Creative sparkles - stars */}
        {[
          { x: 100, y: 450, delay: 0 },
          { x: 200, y: 470, delay: 0.3 },
          { x: 300, y: 460, delay: 0.6 },
          { x: 400, y: 475, delay: 0.9 },
        ].map((star, i) => (
          <motion.path
            key={i}
            d={`M ${star.x} ${star.y} L ${star.x + 2} ${star.y + 5} L ${star.x + 6} ${star.y + 5} L ${star.x + 3} ${star.y + 7} L ${star.x + 4} ${star.y + 11} L ${star.x} ${star.y + 8} L ${star.x - 4} ${star.y + 11} L ${star.x - 3} ${star.y + 7} L ${star.x - 6} ${star.y + 5} L ${star.x - 2} ${star.y + 5} Z`}
            fill="currentColor"
            className="text-pink-400"
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}

        {/* Decorative wavy design line */}
        <motion.path
          d="M 50 520 Q 125 510 200 520 Q 300 530 350 520 Q 400 510 450 520"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 4"
          className="text-stone-200"
          animate={{ strokeDashoffset: [0, -24] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    );
  }

  // Default fallback
  return <div className={className}></div>;
}
