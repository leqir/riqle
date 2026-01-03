/**
 * Detailed Character Scene - Sophisticated HEYTEA-inspired illustrations
 * These are large, detailed compositions that span half the page
 */

'use client';

import { motion } from 'framer-motion';

interface DetailedCharacterSceneProps {
  scene: 'formation' | 'engineering' | 'design' | 'marketing' | 'sales' | 'growth';
  className?: string;
}

export function DetailedCharacterScene({ scene, className = '' }: DetailedCharacterSceneProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {scene === 'formation' && (
          <g>
            {/* Background gradient circles */}
            <circle cx="200" cy="250" r="180" fill="url(#grad-purple)" opacity="0.1" />
            <circle cx="200" cy="250" r="120" fill="url(#grad-blue)" opacity="0.1" />

            {/* Central owl character - much larger and detailed */}
            <g transform="translate(150, 180)">
              {/* Owl body - detailed hand-drawn */}
              <path
                d="M 20 50 Q 15 30 30 15 Q 50 5 70 15 Q 85 30 80 50 Q 85 80 70 100 Q 50 110 30 100 Q 15 80 20 50 Z"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-stone-300"
              />

              {/* Detailed feather patterns */}
              {[...Array(8)].map((_, i) => (
                <path
                  key={i}
                  d={`M ${30 + i * 8} ${60 + (i % 2) * 5} Q ${32 + i * 8} ${65 + (i % 2) * 5} ${30 + i * 8} ${70 + (i % 2) * 5}`}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  className="text-stone-200"
                  opacity="0.5"
                />
              ))}

              {/* Tufted ears with detail */}
              <path
                d="M 28 15 L 20 -5 Q 22 -2 25 5 Q 26 10 28 15"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className="text-stone-300"
              />
              <path
                d="M 72 15 L 80 -5 Q 78 -2 75 5 Q 74 10 72 15"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className="text-stone-300"
              />

              {/* Large expressive eyes */}
              <motion.circle
                cx="40"
                cy="45"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-stone-300"
                animate={{ scaleY: [1, 0.3, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <circle cx="40" cy="45" r="4" fill="currentColor" className="text-purple-400" />

              <motion.circle
                cx="60"
                cy="45"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-stone-300"
                animate={{ scaleY: [1, 0.3, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <circle cx="60" cy="45" r="4" fill="currentColor" className="text-purple-400" />

              {/* Detailed beak */}
              <path
                d="M 50 55 L 45 65 L 50 67 L 55 65 Z"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className="text-amber-600"
              />

              {/* Wing detail */}
              <path
                d="M 20 60 Q 5 65 0 75 Q 5 85 20 80"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className="text-stone-300"
              />

              {/* Coffee cup with steam */}
              <g transform="translate(75, 85)">
                <path
                  d="M 0 0 Q -3 15 5 22 L 20 22 Q 28 15 25 0 Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  className="text-cyan-500"
                />
                <path
                  d="M 25 5 Q 35 5 35 12 Q 35 19 25 19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  className="text-cyan-500"
                />
                {/* Animated steam */}
                {[0, 1, 2].map((i) => (
                  <motion.path
                    key={i}
                    d={`M ${8 + i * 4} -5 Q ${7 + i * 4} -15 ${8 + i * 4} -20`}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-cyan-400"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </g>
            </g>

            {/* Floating books around the owl */}
            <g transform="translate(50, 100)">
              <motion.rect
                x="0"
                y="0"
                width="40"
                height="50"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-blue-400"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <line x1="5" y1="10" x2="35" y2="10" stroke="currentColor" strokeWidth="1.5" className="text-blue-300" />
              <line x1="5" y1="15" x2="30" y2="15" stroke="currentColor" strokeWidth="1.5" className="text-blue-300" />
            </g>

            <g transform="translate(280, 150)">
              <motion.rect
                x="0"
                y="0"
                width="45"
                height="55"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-purple-400"
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              />
              <line x1="5" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" className="text-purple-300" />
              <line x1="5" y1="15" x2="35" y2="15" stroke="currentColor" strokeWidth="1.5" className="text-purple-300" />
            </g>

            {/* Floating sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={i}
                cx={80 + i * 50}
                cy={350 + (i % 2) * 40}
                r="3"
                fill="currentColor"
                className="text-purple-300"
                animate={{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Decorative text path */}
            <path
              d="M 50 400 Q 200 380 350 400"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              className="text-stone-200"
              strokeDasharray="5,5"
            />

            {/* Gradients */}
            <defs>
              <radialGradient id="grad-purple" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="grad-blue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>
          </g>
        )}

        {scene === 'engineering' && (
          <g>
            {/* Detailed engineering workspace */}
            <circle cx="200" cy="250" r="180" fill="url(#grad-blue)" opacity="0.1" />

            {/* Computer/IDE representation */}
            <g transform="translate(100, 150)">
              {/* Monitor */}
              <rect
                x="0"
                y="0"
                width="200"
                height="140"
                rx="5"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-blue-400"
              />

              {/* Code lines with syntax highlighting effect */}
              {[...Array(8)].map((_, i) => (
                <g key={i}>
                  <line
                    x1="10"
                    y1={15 + i * 15}
                    x2={60 + Math.random() * 100}
                    y2={15 + i * 15}
                    stroke="currentColor"
                    strokeWidth="2"
                    className={i % 3 === 0 ? 'text-cyan-400' : i % 3 === 1 ? 'text-purple-400' : 'text-blue-300'}
                  />
                </g>
              ))}

              {/* Monitor stand */}
              <rect x="85" y="140" width="30" height="40" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-blue-400" />
              <rect x="60" y="180" width="80" height="5" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-blue-400" />
            </g>

            {/* Detailed cat coding companion */}
            <g transform="translate(50, 300)">
              {/* Cat sitting at desk */}
              <ellipse cx="50" cy="60" rx="40" ry="30" stroke="currentColor" strokeWidth="3" fill="none" className="text-stone-300" />

              {/* Ears */}
              <path d="M 20 35 L 10 15 L 25 30 Z" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-stone-300" />
              <path d="M 80 35 L 90 15 L 75 30 Z" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-stone-300" />

              {/* Eyes focused on screen */}
              <circle cx="40" cy="50" r="4" fill="currentColor" className="text-cyan-500" />
              <circle cx="60" cy="50" r="4" fill="currentColor" className="text-cyan-500" />

              {/* Paw on keyboard */}
              <ellipse cx="50" cy="75" rx="15" ry="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-stone-300" />
            </g>

            {/* Floating tech icons */}
            <g transform="translate(270, 100)">
              <motion.rect
                x="0"
                y="0"
                width="60"
                height="60"
                rx="8"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className="text-purple-400"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <text x="15" y="40" className="fill-purple-400 text-2xl font-bold">{'{}'}</text>
            </g>

            {/* Database cylinder */}
            <g transform="translate(260, 320)">
              <ellipse cx="40" cy="10" rx="35" ry="10" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-blue-400" />
              <line x1="5" y1="10" x2="5" y2="50" stroke="currentColor" strokeWidth="2.5" className="text-blue-400" />
              <line x1="75" y1="10" x2="75" y2="50" stroke="currentColor" strokeWidth="2.5" className="text-blue-400" />
              <ellipse cx="40" cy="50" rx="35" ry="10" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-blue-400" />

              {/* Data flow lines */}
              {[...Array(3)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="40"
                  y1={20 + i * 10}
                  x2="40"
                  y2={25 + i * 10}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-cyan-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </g>

            <defs>
              <radialGradient id="grad-blue-eng" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>
          </g>
        )}

        {scene === 'design' && (
          <g>
            {/* Design tools and aesthetics */}
            <circle cx="200" cy="250" r="180" fill="url(#grad-purple-design)" opacity="0.1" />

            {/* Pencil character - large and detailed */}
            <g transform="translate(150, 100)">
              {/* Large mechanical pencil body */}
              <rect x="40" y="50" width="20" height="150" rx="3" stroke="currentColor" strokeWidth="3" fill="none" className="text-stone-300" />

              {/* Grip texture */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="40"
                  y1={120 + i * 5}
                  x2="60"
                  y2={120 + i * 5}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-stone-400"
                />
              ))}

              {/* Pencil tip */}
              <path d="M 40 200 L 50 220 L 60 200 Z" stroke="currentColor" strokeWidth="3" fill="none" className="text-stone-300" />
              <circle cx="50" cy="222" r="3" fill="currentColor" className="text-cyan-500" />

              {/* Eraser top with texture */}
              <rect x="38" y="30" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="3" fill="none" className="text-pink-400" />

              {/* Eraser hair strands */}
              {[-8, -4, 0, 4, 8].map((offset, i) => (
                <motion.path
                  key={i}
                  d={`M ${50 + offset} 30 Q ${50 + offset} 15 ${50 + offset + (i % 2 ? 3 : -3)} 10`}
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-pink-400"
                  animate={{ d: `M ${50 + offset} 30 Q ${50 + offset} 15 ${50 + offset + (i % 2 ? 5 : -5)} 8` }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                />
              ))}

              {/* Eyes */}
              <circle cx="45" cy="40" r="3" fill="currentColor" className="text-cyan-500" />
              <circle cx="55" cy="40" r="3" fill="currentColor" className="text-cyan-500" />

              {/* Arms drawing */}
              <path d="M 40 100 L 20 110" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-stone-300" />
              <path d="M 60 100 L 80 110" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-stone-300" />
            </g>

            {/* Color palette */}
            <g transform="translate(50, 300)">
              {[
                { cx: 20, cy: 20, color: 'text-red-400' },
                { cx: 50, cy: 20, color: 'text-blue-400' },
                { cx: 80, cy: 20, color: 'text-yellow-400' },
                { cx: 110, cy: 20, color: 'text-green-400' },
                { cx: 140, cy: 20, color: 'text-purple-400' },
              ].map((circle, i) => (
                <motion.circle
                  key={i}
                  cx={circle.cx}
                  cy={circle.cy}
                  r="12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  className={circle.color}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </g>

            {/* Floating design elements */}
            <g transform="translate(250, 200)">
              {/* Bezier curve */}
              <path d="M 0 0 Q 30 -30 60 0" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-purple-400" />
              <circle cx="0" cy="0" r="4" fill="currentColor" className="text-purple-400" />
              <circle cx="30" cy="-30" r="4" fill="currentColor" className="text-purple-400" />
              <circle cx="60" cy="0" r="4" fill="currentColor" className="text-purple-400" />
            </g>

            {/* Grid paper background */}
            {[...Array(8)].map((_, i) => (
              <g key={i}>
                <line
                  x1={50 + i * 40}
                  y1="400"
                  x2={50 + i * 40}
                  y2="480"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-stone-200"
                  opacity="0.3"
                />
                <line
                  x1="50"
                  y1={400 + i * 10}
                  x2="350"
                  y2={400 + i * 10}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-stone-200"
                  opacity="0.3"
                />
              </g>
            ))}

            <defs>
              <radialGradient id="grad-purple-design" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
              </radialGradient>
            </defs>
          </g>
        )}

        {/* Add more scenes as needed */}
      </svg>
    </div>
  );
}
