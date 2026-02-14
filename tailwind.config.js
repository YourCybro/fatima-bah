/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0D0D0D',
          'black-soft': '#141414',
          chocolate: '#B88A6A',
          cream: '#F5EDE3',
          tan: '#D6BFAE',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(184,138,106,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(184,138,106,0.5)' },
        },
      },
    },
  },
  plugins: [],
}
