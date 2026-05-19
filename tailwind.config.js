/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          900: '#004948',
          800: '#006461',
          700: '#007a75',
          500: '#0E7B80',
          400: '#52d9ce',
        },
        brand: {
          green: '#16a34a',
          lime: '#C4FF45',
          gold: '#D97706',
        },
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
