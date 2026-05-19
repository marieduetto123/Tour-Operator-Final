import { useEffect, useRef } from 'react';
import { METRIC_OPTIONS, type MetricKey } from '@/data/calendarData';
import { metricLabelForKeys } from '@/lib/calendar/metrics';

const MAX = 4;

type Props = {
  open: boolean;
  draft: MetricKey[];
  onToggle: (key: MetricKey) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
};

export function CellMetricsPanel({
  open,
  draft,
  onToggle,
  onClose,
  onReset,
  onApply,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open, onClose]);

  if (!open) return null;

  const groups = ['Occupancy', 'ADR', 'Revenue', 'RN Sold'] as const;
  const atMax = draft.length >= MAX;

  return (
    <div
      ref={ref}
      className="cal-dropdown-panel w-72 py-2"
    >
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        Cell metrics (max {MAX})
      </p>
      {groups.map((group) => (
        <div key={group} className="border-t border-slate-100 px-3 py-2">
          <p className="mb-1.5 text-[10px] font-semibold uppercase text-slate-400">{group}</p>
          {METRIC_OPTIONS.filter((o) => o.group === group).map((opt) => {
            const checked = draft.includes(opt.key);
            const disabled = !checked && atMax;
            return (
              <label
                key={opt.key}
                className={`mb-1 flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-sm ${
                  disabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => onToggle(opt.key)}
                  className="rounded border-slate-300 text-teal-800"
                />
                <span className="text-slate-700">{opt.label}</span>
                <span className="ml-auto text-xs text-slate-400">{opt.prefix}</span>
              </label>
            );
          })}
        </div>
      ))}
      <div className="flex gap-2 border-t border-slate-200 px-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onApply}
          className="flex-1 rounded bg-teal-800 px-3 py-1.5 text-sm text-white hover:bg-teal-900"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export function cellMetricsButtonLabel(keys: MetricKey[]) {
  return metricLabelForKeys(keys) || 'Cell Metrics';
}
