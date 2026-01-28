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
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        chalk: ['var(--font-chalk)', 'cursive'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.03), 0 0 0 1px rgb(0 0 0 / 0.02)',
        'card-hover': '0 8px 16px -4px rgb(0 0 0 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.02)',
      },
    },
  },
  plugins: [],
};

export default config;
