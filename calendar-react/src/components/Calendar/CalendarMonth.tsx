import LockIcon from '@mui/icons-material/Lock';
import type { MonthData, CellMetricKey, CellMetricDef } from './types';
import { LOCKED_DAYS, PARTIAL_CLOSURES, CAL_EVENTS, getDayMetrics } from './data';
import DayCell from './DayCell';

const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface CalendarMonthProps {
  monthData: MonthData;
  activeCellMetrics: CellMetricKey[];
  metricDefs: CellMetricDef[];
  heatmapType: string;
  compact: boolean;
  toFilter: string;
  rangeStart: { month: number; day: number } | null;
  rangeEnd: { month: number; day: number } | null;
  onDayClick: (month: number, day: number) => void;
}

function inRange(
  month: number, day: number,
  start: { month: number; day: number } | null,
  end: { month: number; day: number } | null,
) {
  if (!start || !end) return false;
  const d = month * 100 + day;
  const s = start.month * 100 + start.day;
  const e = end.month * 100 + end.day;
  const lo = Math.min(s, e);
  const hi = Math.max(s, e);
  return d >= lo && d <= hi;
}

export default function CalendarMonth({
  monthData, activeCellMetrics, metricDefs, heatmapType, compact, toFilter,
  rangeStart, rangeEnd, onDayClick,
}: CalendarMonthProps) {
  const { month, year, days, firstDay, lockedCount, name, stats } = monthData;
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
  const todayDay = isCurrentMonth ? today.getDate() : -1;

  const cells: React.ReactNode[] = [];

  // Leading empty cells
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="border-r border-b border-[#E5E7EB] dark:border-[var(--border)] bg-[var(--surface-3)] opacity-40" style={{ height: compact ? 80 : 220 }} />);
  }

  // Day cells
  for (let d = 1; d <= days; d++) {
    const key = `${month}-${d}`;
    const metrics = getDayMetrics(month, d, toFilter);
    const locked = LOCKED_DAYS.has(key);
    const partial = !!PARTIAL_CLOSURES[key];
    const events = CAL_EVENTS[key] ?? [];
    const isToday = d === todayDay;

    const rangeStartKey = rangeStart && rangeStart.month === month && rangeStart.day === d;
    const rangeEndKey = rangeEnd && rangeEnd.month === month && rangeEnd.day === d;
    const inRangeDay = inRange(month, d, rangeStart, rangeEnd);

    cells.push(
      <DayCell
        key={key}
        day={d}
        metrics={metrics}
        isLocked={locked}
        isPartial={partial}
        partialClosures={PARTIAL_CLOSURES[key] ?? []}
        events={events}
        isToday={isToday}
        isInRange={inRangeDay}
        isRangeStart={!!rangeStartKey}
        isRangeEnd={!!rangeEndKey}
        activeCellMetrics={activeCellMetrics}
        metricDefs={metricDefs}
        heatmapType={heatmapType}
        compact={compact}
        onSelect={() => onDayClick(month, d)}
      />
    );
  }

  return (
    <div className="flex flex-col border border-[#E5E7EB] dark:border-[var(--border)] rounded-sm overflow-hidden">
      {/* Month header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--table-header-bg)] dark:bg-[var(--surface-2)] border-b border-[#E5E7EB] dark:border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[var(--text-primary)]">{name}</span>
          {lockedCount > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-[#D32F2F]">
              <LockIcon sx={{ fontSize: 10 }} />
              {lockedCount}
            </span>
          )}
        </div>
        <div className="flex gap-3 text-[11px] text-[var(--text-muted)]">
          <span>Occ: <strong className="text-[var(--text-primary)]">{stats.occ}</strong> <span className="text-[#16a34a]">{stats.occDelta}</span></span>
          <span>ADR: <strong className="text-[var(--text-primary)]">{stats.adr}</strong></span>
          <span>Rev: <strong className="text-[var(--text-primary)]">{stats.rev}</strong></span>
        </div>
      </div>

      {/* DOW header */}
      <div className="grid grid-cols-7 bg-[var(--surface-3)] dark:bg-[var(--surface-2)]">
        {DOW.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-[var(--text-muted)] py-1 border-r border-[#E5E7EB] dark:border-[var(--border)] last:border-r-0">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {cells}
      </div>
    </div>
  );
}
