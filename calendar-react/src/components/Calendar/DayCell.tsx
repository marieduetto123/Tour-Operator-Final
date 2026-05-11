import TodayIcon from '@mui/icons-material/Today';
import LockIcon from '@mui/icons-material/Lock';
import type { CellMetricDef, CellMetricKey, DayMetrics, PartialClosure, CalEvent } from './types';

interface DayCellProps {
  day: number;
  metrics: DayMetrics;
  isLocked: boolean;
  isPartial: boolean;
  partialClosures: PartialClosure[];
  events: CalEvent[];
  isToday: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  activeCellMetrics: CellMetricKey[];
  metricDefs: CellMetricDef[];
  heatmapType: string;
  compact: boolean;
  onSelect: () => void;
}

function formatVal(val: number, format: string): string {
  if (format === 'pct') return `${Math.round(val)}%`;
  if (format === 'currency') {
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${Math.round(val)}`;
  }
  if (format === 'rooms') return String(Math.round(val));
  return val.toFixed(1);
}

function getHeatmapClass(metrics: DayMetrics, heatmapType: string): string {
  if (heatmapType === 'hotel-occ') {
    const tier = Math.min(10, Math.max(1, Math.ceil(metrics.hotelOcc / 10)));
    return `hotel-occ-${tier}`;
  }
  if (heatmapType === 'seg-occ') {
    const tier = Math.min(10, Math.max(1, Math.ceil(metrics.toOcc / 10)));
    return `seg-occ-${tier}`;
  }
  return '';
}

const metricLabelColor: Record<string, string> = {
  hotel:   'text-[#006461]',
  to:      'text-[#8C7843]',
  compare: 'text-[var(--text-muted)]',
};

export default function DayCell({
  day, metrics, isLocked, isPartial, events, isToday,
  isInRange, isRangeStart, isRangeEnd,
  activeCellMetrics, metricDefs, heatmapType, compact, onSelect,
}: DayCellProps) {
  const heatClass = getHeatmapClass(metrics, heatmapType);

  const ringClass = isRangeStart || isRangeEnd
    ? 'ring-2 ring-[var(--accent)] ring-inset'
    : isInRange
    ? 'bg-[rgba(0,100,97,.08)]'
    : '';

  const baseCls = [
    'cal-day',
    heatClass,
    isLocked ? 'locked' : '',
    isToday ? 'today' : '',
    ringClass,
  ].filter(Boolean).join(' ');

  return (
    <div className={baseCls} onClick={onSelect}>
      {/* Day header */}
      <div className="flex items-start justify-between mb-1">
        <span
          className={[
            'day-num text-[11px] font-semibold leading-none',
            isToday
              ? 'bg-[var(--accent)] text-white rounded-full w-[22px] h-[22px] flex items-center justify-center'
              : 'text-[var(--text-secondary)]',
          ].join(' ')}
        >
          {day}
        </span>
        {events.length > 0 && (
          <TodayIcon sx={{ fontSize: 13, color: 'var(--accent)', opacity: 0.8 }} />
        )}
      </div>

      {/* Lock / partial badges */}
      {isLocked && (
        <div className="flex items-center gap-1 mb-1">
          <LockIcon sx={{ fontSize: 10, color: '#D32F2F' }} />
          <span className="text-[10px] text-[#D32F2F] font-semibold">Closed</span>
        </div>
      )}
      {!isLocked && isPartial && (
        <div className="flex items-center gap-1 mb-1">
          <LockIcon sx={{ fontSize: 10, color: '#FF9800' }} />
          <span className="text-[10px] text-[#FF9800] font-semibold">Partial</span>
        </div>
      )}

      {/* Metric rows */}
      {!compact && activeCellMetrics.map((key) => {
        const def = metricDefs.find(d => d.key === key);
        if (!def) return null;
        const val = metrics[key as keyof DayMetrics] as number;
        return (
          <div key={key} className="flex items-center justify-between mt-[3px]">
            <span className={`text-[10px] font-medium ${metricLabelColor[def.type] ?? ''}`}>
              {def.label}
            </span>
            <span className="text-[11px] font-semibold text-[var(--text-primary)]">
              {formatVal(val, def.format)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
