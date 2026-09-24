/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6ED',
          200: '#F4ECE0',
          300: '#E9DBC8',
          400: '#DCC5A9',
        },
        mahalla: {
          green: {
            light: '#40916C',
            DEFAULT: '#2D6A4F',
            deep: '#1B4332',
            dark: '#081C15',
          },
          navy: {
            light: '#1B3147',
            DEFAULT: '#0F1E2E',
            dark: '#0A1118',
          },
          terracotta: {
            light: '#E07A5F',
            DEFAULT: '#C86D51',
            dark: '#9E472A',
          },
          gold: {
            light: '#F4A261',
            DEFAULT: '#D4A373',
            dark: '#B07D48',
          },
          brown: {
            light: '#936639',
            DEFAULT: '#7F4F24',
            dark: '#582F0E',
          },
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(127, 79, 36, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'warm-md': '0 8px 24px -4px rgba(88, 47, 14, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.05)',
        'warm-lg': '0 16px 36px -6px rgba(45, 106, 79, 0.18), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'glow-green': '0 0 24px rgba(64, 145, 108, 0.35)',
        'glow-gold': '0 0 24px rgba(212, 163, 115, 0.4)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'sun-glow': 'sunGlow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        sunGlow: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.08)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
