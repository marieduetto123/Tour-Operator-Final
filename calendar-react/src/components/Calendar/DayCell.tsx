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
  if (format === 'pct')      return `${Math.round(val)}%`;
  if (format === 'currency') return val >= 1000 ? `$${(val / 1000).toFixed(0)}k` : `$${Math.round(val)}`;
  if (format === 'rooms')    return String(Math.round(val));
  return val.toFixed(1);
}

function heatmapClass(metrics: DayMetrics, type: string): string {
  if (type === 'hotel-occ') return `hotel-occ-${Math.min(10, Math.max(1, Math.ceil(metrics.hotelOcc / 10)))}`;
  if (type === 'seg-occ')   return `seg-occ-${Math.min(10, Math.max(1, Math.ceil(metrics.toOcc / 10)))}`;
  return '';
}

const LABEL_CLASS: Record<string, string> = {
  hotel:   'metric-label-hotel',
  to:      'metric-label-to',
  compare: 'metric-label-compare',
};

export default function DayCell({
  day, metrics, isLocked, isPartial, events, isToday,
  isInRange, isRangeStart, isRangeEnd,
  activeCellMetrics, metricDefs, heatmapType, compact, onSelect,
}: DayCellProps) {
  const hmCls    = heatmapClass(metrics, heatmapType);
  const inRangeBg = isInRange && !isRangeStart && !isRangeEnd ? 'rgba(0,100,97,.07)' : undefined;
  const ringStyle = (isRangeStart || isRangeEnd)
    ? { boxShadow: 'inset 0 0 0 2px #006461' }
    : isToday
    ? { boxShadow: 'inset 0 0 0 2px #3B82F6' }
    : undefined;

  return (
    <div
      className={['cal-day', hmCls, isLocked ? 'locked' : '', compact ? 'compact' : ''].filter(Boolean).join(' ')}
      style={{ ...(inRangeBg ? { background: inRangeBg } : {}), ...ringStyle }}
      onClick={onSelect}
    >
      {/* Day number row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{
          fontSize: 13, fontWeight: 500, lineHeight: 1,
          color: isToday ? '#3B82F6' : 'var(--text-secondary)',
          fontFamily: 'Lato, sans-serif',
        }}>
          {day}
        </span>
        {events.length > 0 && (
          <TodayIcon sx={{ fontSize: 13, color: 'var(--accent)', opacity: 0.85, mt: '-1px' }} />
        )}
      </div>

      {/* Closed / Partial badges — pill style matching source */}
      {isLocked && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 3,
          background: '#ffebee', color: '#991f1f',
          borderRadius: 9999, padding: '3px 7px',
          fontSize: 12, lineHeight: 1, marginBottom: 3,
        }}>
          <LockIcon sx={{ fontSize: 10 }} />
          Closed
        </div>
      )}
      {!isLocked && isPartial && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 3,
          background: '#fff1de', color: '#ff9800',
          borderRadius: 9999, padding: '3px 7px',
          fontSize: 12, lineHeight: 1, marginBottom: 3,
        }}>
          <LockIcon sx={{ fontSize: 10 }} />
          Partial
        </div>
      )}

      {/* Metric rows — hidden in compact mode */}
      {!compact && activeCellMetrics.map(key => {
        const def = metricDefs.find(d => d.key === key);
        if (!def) return null;
        const val = metrics[key as keyof DayMetrics] as number;
        return (
          <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
            <span className={LABEL_CLASS[def.type]} style={{ fontSize: 12, fontWeight: 500, fontFamily: 'Lato, sans-serif' }}>
              {def.label}
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Lato, sans-serif' }}>
              {formatVal(val, def.format)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
