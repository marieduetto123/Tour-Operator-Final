import { useMemo } from 'react';
import { DOW_LABELS, EVENT_DAYS, type MonthMeta } from '@/data/calendarData';
import type { MetricKey } from '@/data/calendarData';
import { useCalendar } from '@/context/CalendarContext';
import { dayKey } from '@/lib/calendar/metrics';
import { CalendarDay } from './CalendarDay';

const DOW_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type Props = {
  month: MonthMeta;
  selectedMetrics: MetricKey[];
  selectMode: boolean;
  selectedDays: Set<string>;
  onSelectDay: (iso: string) => void;
  onOpenDay: (month: number, day: number, label: string) => void;
};

export function CalendarMonth({
  month,
  selectedMetrics,
  selectMode,
  selectedDays,
  onSelectDay,
  onOpenDay,
}: Props) {
  const { isLocked } = useCalendar();
  const pad = (month.firstDay + 6) % 7;
  const closedCount = useMemo(() => {
    let n = 0;
    for (let d = 1; d <= month.days; d++) {
      if (isLocked(dayKey(month.month, d))) n++;
    }
    return n;
  }, [month, isLocked]);

  const blanks = Array.from({ length: pad }, (_, i) => (
    <div key={`blank-${i}`} className="cal-day-empty" />
  ));
  const days = Array.from({ length: month.days }, (_, i) => {
    const d = i + 1;
    const key = dayKey(month.month, d);
    const iso = `2026-${String(month.month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return (
      <CalendarDay
        key={key}
        month={month.month}
        day={d}
        hasEvent={EVENT_DAYS.has(key)}
        selectedMetrics={selectedMetrics}
        selectMode={selectMode}
        isSelected={selectedDays.has(iso)}
        onSelectDay={onSelectDay}
        onOpenDay={onOpenDay}
      />
    );
  });

  return (
    <article className="cal-month">
      <header className="cal-month-hdr">
        <h3 className="cal-month-name">{month.name}</h3>
        {closedCount > 0 && (
          <span className="cal-lock-badge">{closedCount} closed</span>
        )}
      </header>
      <div className="cal-dow">
        {DOW_LABELS.map((label, i) => (
          <span key={label}>{DOW_SHORT[i]}</span>
        ))}
      </div>
      <div className="cal-days">
        {blanks}
        {days}
      </div>
    </article>
  );
}
