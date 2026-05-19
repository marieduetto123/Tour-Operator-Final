import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CalendarApp } from '@/components/calendar';
import { CalendarProvider } from '@/context/CalendarContext';
import { appTheme } from '@/theme/theme';

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <CalendarProvider>
        <Box
          component="main"
          className="calendar-page"
          sx={{ minHeight: '100vh' }}
          id="calendar-root"
        >
          <CalendarApp />
        </Box>
      </CalendarProvider>
    </ThemeProvider>
  );
}
