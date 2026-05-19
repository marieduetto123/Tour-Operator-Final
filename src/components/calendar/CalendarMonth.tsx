import { useMemo } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { DOW_LABELS, EVENT_DAYS, type MonthMeta } from '@/data/calendarData';
import type { MetricKey } from '@/data/calendarData';
import { useCalendar } from '@/context/CalendarContext';
import { dayKey, type CompareMode } from '@/lib/calendar/metrics';
import { CalendarDay } from './CalendarDay';

const DOW_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DOW_COMPACT = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

type Props = {
  month: MonthMeta;
  selectedMetrics: MetricKey[];
  selectMode: boolean;
  selectedDays: Set<string>;
  compact: boolean;
  compare: CompareMode;
  onSelectDay: (iso: string) => void;
  onOpenDay: (month: number, day: number, label: string) => void;
};

export function CalendarMonth({
  month,
  selectedMetrics,
  selectMode,
  selectedDays,
  compact,
  compare,
  onSelectDay,
  onOpenDay,
}: Props) {
  const { isLocked, isPartial } = useCalendar();
  const pad = (month.firstDay + 6) % 7;
  const dowLabels = compact ? DOW_COMPACT : DOW_SHORT;
  const closedCount = useMemo(() => {
    let n = 0;
    for (let d = 1; d <= month.days; d++) {
      const k = dayKey(month.month, d);
      if (isLocked(k) || isPartial(k)) n++;
    }
    return n;
  }, [month, isLocked, isPartial]);

  const blanks = Array.from({ length: pad }, (_, i) => (
    <div
      key={`blank-${i}`}
      className={compact ? 'cal-day empty' : 'cal-day-empty'}
      aria-hidden
    />
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
        compact={compact}
        compare={compare}
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
          <span className="cal-lock-badge">
            <LockIcon sx={{ fontSize: 12 }} />
            {closedCount}
          </span>
        )}
      </header>
      <div className="cal-dow">
        {DOW_LABELS.map((label, i) => (
          <span key={label}>{dowLabels[i]}</span>
        ))}
      </div>
      <div className="cal-days">
        {blanks}
        {days}
      </div>
    </article>
  );
}
