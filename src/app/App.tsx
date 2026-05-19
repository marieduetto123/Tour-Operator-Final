import { CalendarApp } from '@/components/calendar';
import { CalendarProvider } from '@/context/CalendarContext';

export default function App() {
  return (
    <CalendarProvider>
      <main className="calendar-page">
        <CalendarApp />
      </main>
    </CalendarProvider>
  );
}
