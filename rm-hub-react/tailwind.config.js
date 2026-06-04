/** Duetto tokens — primary set from duetto-design-system skill, extended w/ project tokens used by existing UI. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#d7f7ed',
          100: '#5ceade',
          500: '#0E7B80',
          700: '#006461',
          800: '#004948',
          900: '#053c3c',
        },
        lucentGreen: { 70: '#c4ff45', 200: '#a9df40' },
        lime: '#C4FF45',
        grey: { 600: '#63696f', 700: '#4f5b60', 800: '#354549' },
        surface: { white: '#ffffff', muted: '#f5f5f5', overlay: '#eaeeef', page: '#FAFAFA' },
        text: {
          primary: '#1c1c1c',
          secondary: '#4f5b60',
          inverse: '#ffffff',
          disabled: '#aeb4ba',
          muted: '#8A9096',
        },
        border: { emphasis: '#aeb4ba', default: '#DDE1E2', subtle: '#EAEEEF', strong: '#8A9096' },
        topbar: '#0E2124',
        error: '#D32F2F',
        warn: '#FF9800',
        tableHeader: '#F8F9FD',
      },
      fontFamily: {
        sans: ['Lato', 'Inter', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: { '2xs': '11px' },
    },
  },
  plugins: [],
};
