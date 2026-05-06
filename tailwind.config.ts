import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-green': '#10b981',
        'primary-navy': '#0f172a',
        'primary-teal': '#14b8a6',
        'primary-purple': '#8b5cf6',
        'accent-blue': '#3b82f6',
        'accent-purple': '#a855f7',
        'accent-pink': '#ec4899',
        'accent-orange': '#f97316',
        'accent-emerald': '#50c878',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
