/**
 * Duetto 2026 Design System tokens (from duetto-design-system skill).
 * Project-specific tokens carried over from travelcore-rm-hub.css so layout
 * fidelity holds without inventing new values.
 */
export const tokens = {
  teal: { 50: '#d7f7ed', 100: '#5ceade', 500: '#0E7B80', 700: '#006461', 800: '#004948', 900: '#053c3c' },
  lucentGreen: { 70: '#c4ff45', 200: '#a9df40' },
  grey: { 600: '#63696f', 700: '#4f5b60', 800: '#354549' },
  surface: { white: '#ffffff', muted: '#f5f5f5', overlay: '#eaeeef', page: '#FAFAFA' },
  text: { primary: '#1c1c1c', secondary: '#4f5b60', inverse: '#ffffff', disabled: '#aeb4ba', muted: '#8A9096' },
  border: { default: '#DDE1E2', subtle: '#EAEEEF', strong: '#8A9096', emphasis: '#aeb4ba' },
  topbar: '#0E2124',
  accentBg: 'rgba(0,100,97,.07)',
  tableHeader: '#F8F9FD',
  tableHighlight: '#DBF0F2',
  error: '#D32F2F',
  warn: '#FF9800',
  shadow: '0 1px 3px rgba(0,0,0,.2), 0 2px 1px rgba(0,0,0,.12), 0 1px 1px rgba(0,0,0,.14)',
} as const;
