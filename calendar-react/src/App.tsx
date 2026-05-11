import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Calendar from './components/Calendar/Calendar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const muiTheme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
    typography: { fontFamily: 'Lato, sans-serif' },
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
