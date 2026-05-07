/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep teal/emerald palette
        primary: {
          50: '#edfaf5',
          100: '#d2f4e8',
          200: '#a8e8d3',
          300: '#6dd5b5',
          400: '#35ba93',
          500: '#179e7a',
          600: '#0d7f63',
          700: '#0b6652',
          800: '#0b5144',
          900: '#0a4339',
        },
        dark: {
          950: '#060a0d',
          900: '#0b1015',
          800: '#101820',
          700: '#162130',
          600: '#1c2a3d',
          500: '#253447',
        },
        accent: {
          400: '#38d9a9',
          500: '#20c997',
          600: '#12b886',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
