import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        neon: {
          pink: '#ff2d6a',
          cyan: '#00e5ff',
          purple: '#a855f7',
          green: '#4ade80',
        },
        chalk: {
          white: '#f5f5f4',
          charcoal: '#18181b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        chalk: ['var(--font-chalk)', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
