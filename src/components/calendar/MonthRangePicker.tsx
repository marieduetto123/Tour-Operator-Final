import { useEffect, useRef } from 'react';
import { ALL_MONTHS } from '@/data/calendarData';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

type Props = {
  open: boolean;
  year: number;
  startIdx: number;
  endIdx: number;
  onClose: () => void;
  onYearChange: (delta: number) => void;
  onSelectMonth: (idx: number) => void;
  onApply: () => void;
  onCancel: () => void;
};

export function MonthRangePicker({
  open,
  year,
  startIdx,
  endIdx,
  onClose,
  onYearChange,
  onSelectMonth,
  onApply,
  onCancel,
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

  const renderYear = (y: number, side: 'left' | 'right') => (
    <div className="flex-1 p-3">
      <div className="mb-3 flex items-center justify-between">
        {side === 'left' ? (
          <button type="button" onClick={() => onYearChange(-1)} className="rounded p-1 hover:bg-slate-100" aria-label="Previous year">
            ‹
          </button>
        ) : (
          <span className="w-6" />
        )}
        <span className="text-sm font-semibold text-slate-800">{y}</span>
        {side === 'right' ? (
          <button type="button" onClick={() => onYearChange(1)} className="rounded p-1 hover:bg-slate-100" aria-label="Next year">
            ›
          </button>
        ) : (
          <span className="w-6" />
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MONTH_SHORT.map((label, mi) => {
          const idx = ALL_MONTHS.findIndex((m) => m.year === y && m.month === mi + 1);
          if (idx < 0) return null;
          const inRange = idx >= Math.min(startIdx, endIdx) && idx <= Math.max(startIdx, endIdx);
          const isStart = idx === startIdx;
          const isEnd = idx === endIdx;
          return (
            <button
              key={`${y}-${label}`}
              type="button"
              onClick={() => onSelectMonth(idx)}
              className={`rounded-md px-2 py-2 text-sm font-medium transition-colors ${
                inRange ? 'bg-teal-800 text-white' : 'text-slate-700 hover:bg-slate-100'
              } ${isStart || isEnd ? 'ring-2 ring-teal-400 ring-offset-1' : ''}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );

  const startName = ALL_MONTHS[startIdx]?.name ?? '';
  const endName = ALL_MONTHS[endIdx]?.name ?? '';

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-50 mt-1 w-[520px] max-w-[95vw] rounded-lg border border-slate-200 bg-white shadow-xl"
    >
      <div className="flex border-b border-slate-200">
        {renderYear(year, 'left')}
        {renderYear(year + 1, 'right')}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-4 py-3">
        <span className="text-sm text-slate-600">
          {startName && endName ? `${startName.split(' ')[0]} – ${endName}` : 'Select range'}
        </span>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">
            Cancel
          </button>
          <button type="button" onClick={onApply} className="rounded bg-teal-800 px-3 py-1.5 text-sm text-white hover:bg-teal-900">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
