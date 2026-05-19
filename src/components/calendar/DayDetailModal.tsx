import { useCalendar } from '@/context/CalendarContext';
import { Icon } from '@/components/ui/Icon';
import { buildMetricRows, toRooms, type CellMetrics } from '@/lib/calendar/metrics';
import type { MetricKey } from '@/data/calendarData';

type Props = {
  dateLabel: string;
  metrics: CellMetrics;
  selectedMetrics: MetricKey[];
  onClose: () => void;
};

export function DayDetailModal({ dateLabel, metrics, selectedMetrics, onClose }: Props) {
  const { setCloseOutOpen } = useCalendar();
  const rows = buildMetricRows(metrics, selectedMetrics);

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">{dateLabel}</p>
            <p className="text-xs text-slate-500">All Operators</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <Icon name="close" className="text-xl" />
          </button>
        </div>
        <div className="space-y-2 px-4 py-3 text-sm">
          {rows.map((r) => (
            <div key={`${r.shortLabel}-${r.tone}`} className="flex justify-between gap-4">
              <span className={r.tone === 'to' ? 'text-teal-800' : 'text-slate-600'}>
                {r.tone === 'to' ? 'TO' : 'Hotel'} {r.shortLabel}
              </span>
              <span className="font-semibold tabular-nums">{r.value}</span>
            </div>
          ))}
          <p className="border-t border-slate-100 pt-2 text-xs text-slate-500">
            {toRooms(metrics.hotelOcc)} hotel rooms · {toRooms(metrics.toOcc)} TO rooms
          </p>
        </div>
        <div className="flex gap-2 border-t border-slate-200 px-4 py-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              setCloseOutOpen(true);
            }}
            className="flex flex-1 items-center justify-center gap-1 rounded border border-teal-800 px-3 py-2 text-sm text-teal-800 hover:bg-teal-50"
          >
            <Icon name="lock" className="text-base" />
            Close Out
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-1 rounded bg-teal-800 px-3 py-2 text-sm text-white hover:bg-teal-900"
          >
            View More Details
            <Icon name="chevron_right" className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
}
