import { useEffect, useRef } from 'react';
import { FILTER_SECTIONS, type FilterGroupId, type FilterState } from '@/data/filterOptions';

type Props = {
  open: boolean;
  draft: FilterState;
  onChange: (id: FilterGroupId, value: string) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
  pickupDays: number;
  onPickupChange: (n: number) => void;
};

export function FiltersDropdown({
  open,
  draft,
  onChange,
  onClose,
  onReset,
  onApply,
  pickupDays,
  onPickupChange,
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

  return (
    <div
      ref={ref}
      className="cal-dropdown-panel max-h-[70vh] w-64 overflow-y-auto py-2"
    >
      {FILTER_SECTIONS.map((section, si) => (
        <div key={section.id} className={si > 0 ? 'border-t border-slate-100' : ''}>
          <p className="px-3 py-2 text-[10px] font-semibold tracking-wide text-slate-500">
            {section.title}
          </p>
          {section.options.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              <input
                type="radio"
                name={section.id}
                checked={draft[section.id] === opt.value}
                onChange={() => onChange(section.id, opt.value)}
                className="text-teal-800"
              />
              <span className="text-slate-700">{opt.label}</span>
            </label>
          ))}
        </div>
      ))}
      <div className="border-t border-slate-100 px-3 py-2">
        <p className="mb-1 text-[10px] font-semibold text-slate-500">
          CUSTOMIZE PICKUP{' '}
          <span className="font-semibold normal-case text-teal-800">
            {pickupDays >= 365 ? 'All time' : `${pickupDays}d`}
          </span>
        </p>
        <input
          type="number"
          min={1}
          max={365}
          value={pickupDays}
          onChange={(e) => onPickupChange(Math.max(1, Number(e.target.value) || 1))}
          className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
        />
      </div>
      <div className="flex gap-2 border-t border-slate-200 px-3 py-2">
        <button
          type="button"
          onClick={onReset}
          className="flex flex-1 items-center justify-center gap-1 rounded border border-slate-300 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
        >
          Reset all
        </button>
        <button
          type="button"
          onClick={onApply}
          className="flex-1 rounded bg-teal-800 py-1.5 text-sm text-white hover:bg-teal-900"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
