import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F1',
        teal: {
          DEFAULT: '#1A6B6B',
          light: '#E6F4F4',
          medium: '#2E8B8B',
          dark: '#0F4444',
        },
        amber: {
          DEFAULT: '#F4883A',
          light: '#FEF0E6',
          dark: '#B85C1A',
        },
        green: {
          DEFAULT: '#2D7A4F',
          light: '#E8F5EE',
        },
        red: {
          DEFAULT: '#C0392B',
          light: '#FDEDED',
        },
        slate: {
          DEFAULT: '#2C3E50',
          light: '#EEF2F7',
        },
        ink: {
          DEFAULT: '#1E1A14',
          2: '#4A4540',
        },
        muted: '#9A928A',
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui'],
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia'],
      },
      borderRadius: {
        '2xl': '28px',
        xl: '20px',
        lg: '14px',
        md: '10px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(30,26,20,0.10)',
        'card-sm': '0 2px 10px rgba(30,26,20,0.07)',
        'card-lg': '0 12px 40px rgba(30,26,20,0.15)',
        teal: '0 6px 24px rgba(26,107,107,0.35)',
        amber: '0 6px 24px rgba(244,136,58,0.35)',
        slate: '0 6px 24px rgba(44,62,80,0.30)',
      },
      keyframes: {
        'pulse-ring': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(26,107,107,0.3)' },
          '50%': { boxShadow: '0 0 0 12px rgba(26,107,107,0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        blink: 'blink 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
