import { useState } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { Icon } from '@/components/ui/Icon';
import {
  buildCellMetrics,
  buildMetricRows,
  dayKey,
  isToday,
} from '@/lib/calendar/metrics';
import {
  buildHeatmapDayData,
  getHeatmapCellClass,
} from '@/lib/calendar/heatmap';
import type { MetricKey } from '@/data/calendarData';
import { DayTooltip } from './DayTooltip';

type Props = {
  month: number;
  day: number;
  hasEvent: boolean;
  selectedMetrics: MetricKey[];
  selectMode: boolean;
  isSelected: boolean;
  onSelectDay: (iso: string) => void;
  onOpenDay: (month: number, day: number, label: string) => void;
};

const MONTH_NAMES = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function CalendarDay({
  month,
  day,
  hasEvent,
  selectedMetrics,
  selectMode,
  isSelected,
  onSelectDay,
  onOpenDay,
}: Props) {
  const { isLocked, isPartial, getFilteredOccupancy, heatmap } = useCalendar();
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);

  const key = dayKey(month, day);
  const locked = isLocked(key);
  const partial = isPartial(key);
  const { hotel, to } = getFilteredOccupancy(month, day);
  const metrics = buildCellMetrics(month, day);
  const rows = buildMetricRows(metrics, selectedMetrics);
  const iso = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const today = isToday(month, day);

  const hmData = buildHeatmapDayData(month, day, locked, partial, to);
  const hmClass = heatmap.enabled ? getHeatmapCellClass(hmData, heatmap) : '';

  const dayClasses = [
    'cal-day',
    locked ? 'cal-day-locked' : '',
    partial ? 'cal-day-partial' : '',
    today ? 'cal-day-today' : '',
    hmClass,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div
        className={dayClasses}
        onMouseEnter={(e) => !locked && setHover({ x: e.clientX, y: e.clientY })}
        onMouseMove={(e) => !locked && hover && setHover({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setHover(null)}
        onDoubleClick={() => onOpenDay(month, day, `${MONTH_NAMES[month]} ${day}, 2026`)}
      >
        <div className="cell-day-hdr">
          {selectMode ? (
            <input
              type="checkbox"
              className="mo-day-chk"
              checked={isSelected}
              onChange={() => onSelectDay(iso)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span />
          )}
          <span className="day-num">{day}</span>
          <button
            type="button"
            className="cell-eye-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDay(month, day, `${MONTH_NAMES[month]} ${day}, 2026`);
            }}
            aria-label="Quick view"
          >
            <Icon name="visibility" style={{ fontSize: 14 }} />
          </button>
        </div>

        {!locked && partial && (
          <div className="cell-close-slot">
            <span className="cell-partial-close-label">
              Partial
              <Icon name="lock" />
            </span>
          </div>
        )}

        {locked ? (
          <div className="cell-closed-block">
            <span className="cell-closed-label-text">Closed</span>
            <Icon name="lock" />
          </div>
        ) : (
          <div className="cell-content">
            {rows.map((r) => (
              <div
                key={`${r.shortLabel}-${r.tone}`}
                className={`cell-m-row ${r.tone === 'to' ? 'cell-m-to' : 'cell-m-hotel'}`}
              >
                <span className="cell-m-label">{r.shortLabel}</span>
                <span className="cell-m-val">{r.value}</span>
              </div>
            ))}
          </div>
        )}

        {hasEvent && !locked && (
          <Icon name="today" className="day-event-icon" />
        )}
      </div>

      {hover && !locked && (
        <DayTooltip x={hover.x} y={hover.y} hotelPct={hotel} toPct={to} />
      )}
    </>
  );
}
