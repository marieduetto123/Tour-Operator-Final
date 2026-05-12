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
  rangeEnd:   { month: number; day: number } | null;
  onDayClick: (month: number, day: number) => void;
}

function inRange(
  month: number, day: number,
  start: { month: number; day: number } | null,
  end:   { month: number; day: number } | null,
) {
  if (!start || !end) return false;
  const d = month * 100 + day, s = start.month * 100 + start.day, e = end.month * 100 + end.day;
  return d >= Math.min(s, e) && d <= Math.max(s, e);
}

export default function CalendarMonth({
  monthData, activeCellMetrics, metricDefs, heatmapType, compact, toFilter,
  rangeStart, rangeEnd, onDayClick,
}: CalendarMonthProps) {
  const { month, year, days, firstDay, lockedCount, name, stats } = monthData;
  const today         = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
  const todayDay      = isCurrentMonth ? today.getDate() : -1;

  const cells: React.ReactNode[] = [];

  /* Leading empty cells */
  for (let i = 0; i < firstDay; i++) {
    cells.push(
      <div key={`e${i}`} style={{
        height: compact ? 80 : 220,
        borderRight: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB',
        background: 'var(--surface-3)',
        opacity: 0.4,
      }} />
    );
  }

  /* Day cells */
  for (let d = 1; d <= days; d++) {
    const key     = `${month}-${d}`;
    const metrics = getDayMetrics(month, d, toFilter);
    cells.push(
      <DayCell
        key={key}
        day={d}
        metrics={metrics}
        isLocked={LOCKED_DAYS.has(key)}
        isPartial={!!PARTIAL_CLOSURES[key]}
        partialClosures={PARTIAL_CLOSURES[key] ?? []}
        events={CAL_EVENTS[key] ?? []}
        isToday={d === todayDay}
        isInRange={inRange(month, d, rangeStart, rangeEnd)}
        isRangeStart={!!(rangeStart && rangeStart.month === month && rangeStart.day === d)}
        isRangeEnd={!!(rangeEnd   && rangeEnd.month   === month && rangeEnd.day   === d)}
        activeCellMetrics={activeCellMetrics}
        metricDefs={metricDefs}
        heatmapType={heatmapType}
        compact={compact}
        onSelect={() => onDayClick(month, d)}
      />
    );
  }

  const deltaColor = (d: string) => d.startsWith('-') ? '#dc2626' : '#16a34a';

  return (
    /* Section card — no border, uses shadow only */
    <div style={{
      background: 'var(--surface-1)',
      borderRadius: 4,
      boxShadow: 'var(--shadow)',
      overflow: 'hidden',
    }}>
      {/* Month header — matches .section-header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        background: 'var(--table-header-bg)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{name}</span>
          {lockedCount > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#D32F2F' }}>
              <LockIcon sx={{ fontSize: 10 }} />{lockedCount}
            </span>
          )}
        </div>
        {/* Stats row — matches monthly summary metrics */}
        <div style={{ display: 'flex', gap: 14, fontSize: 11 }}>
          <StatCell label="Occ" value={stats.occ} delta={stats.occDelta} deltaColor={deltaColor(stats.occDelta)} />
          <StatCell label="ADR" value={stats.adr} />
          <StatCell label="Rev" value={stats.rev} delta={stats.revDelta} deltaColor={deltaColor(stats.revDelta)} />
        </div>
      </div>

      {/* Day-of-week header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'var(--surface-3)' }}>
        {DOW.map(d => (
          <div key={d} style={{
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-muted)',
            padding: '5px 0',
            borderRight: '1px solid var(--border-sub)',
          }}>{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        borderTop: '1px solid #E5E7EB',
        borderLeft: '1px solid #E5E7EB',
      }}>
        {cells}
      </div>
    </div>
  );
}

function StatCell({ label, value, delta, deltaColor }: {
  label: string; value: string; delta?: string; deltaColor?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
      <span style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 12 }}>{value}</span>
        {delta && <span style={{ fontSize: 10, fontWeight: 700, color: deltaColor }}>{delta}</span>}
      </div>
    </div>
  );
}
