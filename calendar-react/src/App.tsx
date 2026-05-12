import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Calendar from './components/Calendar/Calendar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#C4FF45' : '#006461',
        dark: darkMode ? '#a9df40' : '#053c3c',
        contrastText: darkMode ? '#0E2124' : '#ffffff',
      },
      secondary: {
        main: '#D7F7ED',
        contrastText: '#053c3c',
      },
      background: {
        default: darkMode ? '#0E2124' : '#FAFAFA',
        paper:   darkMode ? '#122a2d' : '#FFFFFF',
      },
      text: {
        primary:   darkMode ? '#FFFFFF'  : '#1C1C1C',
        secondary: darkMode ? '#c8e6e5' : '#4F5B60',
        disabled:  '#AEB4BA',
      },
      divider: darkMode ? '#254548' : '#DDE1E2',
    },
    typography: {
      fontFamily: 'Lato, sans-serif',
      fontSize: 13,
    },
    shape: { borderRadius: 4 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontFamily: 'Lato, sans-serif',
            fontWeight: 400,
            letterSpacing: 0,
          },
          sizeSmall:  { fontSize: 13, height: 32 },
          sizeMedium: { fontSize: 14, height: 36 },
          sizeLarge:  { fontSize: 14, height: 44 },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: { fontFamily: 'Lato, sans-serif', fontSize: 13 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontFamily: 'Lato, sans-serif' },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: { fontFamily: 'Lato, sans-serif', fontSize: 12 },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 8,
            boxShadow: '0 8px 28px rgba(0,0,0,.12)',
            border: '1px solid #DDE1E2',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={darkMode ? 'dark' : ''} style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <Calendar darkMode={darkMode} onDarkModeToggle={() => setDarkMode(d => !d)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
