import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';

export const duettoTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: tokens.teal[700], dark: tokens.teal[900], light: tokens.teal[50], contrastText: tokens.text.inverse },
    secondary: { main: tokens.teal[50], dark: tokens.teal[100], contrastText: tokens.text.primary },
    background: { default: tokens.surface.page, paper: tokens.surface.white },
    text: { primary: tokens.text.primary, secondary: tokens.text.secondary, disabled: tokens.text.disabled },
    divider: tokens.border.default,
    error: { main: tokens.error },
    warning: { main: tokens.warn },
  },
  typography: {
    fontFamily: 'Lato, Inter, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 13,
    h1: { fontSize: 22, fontWeight: 700, color: tokens.text.primary },
    h2: { fontSize: 18, fontWeight: 700, color: tokens.text.primary },
    h3: { fontSize: 15, fontWeight: 700, color: tokens.text.primary },
    body1: { fontSize: 13, color: tokens.text.primary },
    body2: { fontSize: 12, color: tokens.text.secondary },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500, boxShadow: 'none', ':hover': { boxShadow: 'none' } },
        sizeSmall: { height: 32, paddingLeft: 12, paddingRight: 12 },
        sizeMedium: { height: 36, paddingLeft: 16, paddingRight: 16 },
        sizeLarge: { height: 44, paddingLeft: 20, paddingRight: 20 },
        containedPrimary: {
          backgroundColor: tokens.teal[700], color: tokens.text.inverse,
          ':hover': { backgroundColor: tokens.teal[900] },
          ':active': { backgroundColor: tokens.teal[900] },
          '&.Mui-disabled': { backgroundColor: tokens.surface.muted, color: tokens.text.disabled },
        },
        containedSecondary: {
          backgroundColor: tokens.teal[50], color: tokens.text.primary,
          ':hover': { backgroundColor: tokens.teal[100] },
        },
        outlinedPrimary: {
          backgroundColor: tokens.surface.white, borderColor: tokens.grey[600], color: tokens.teal[700],
          ':hover': { backgroundColor: tokens.surface.muted, borderColor: tokens.grey[800] },
        },
        textPrimary: {
          color: tokens.teal[700],
          ':hover': { backgroundColor: tokens.surface.muted },
          ':active': { backgroundColor: tokens.surface.overlay },
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', fontWeight: 500, color: tokens.text.secondary, borderColor: tokens.grey[600],
          '&.Mui-selected': {
            backgroundColor: tokens.teal[700], color: tokens.text.inverse,
            ':hover': { backgroundColor: tokens.teal[900] },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: tokens.teal[700], height: 2 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none', fontWeight: 600, fontSize: 13, color: tokens.text.secondary, minHeight: 40,
          '&.Mui-selected': { color: tokens.teal[700] },
        },
      },
    },
  },
});
