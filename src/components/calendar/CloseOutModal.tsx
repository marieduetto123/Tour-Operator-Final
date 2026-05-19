import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useCalendar } from '@/context/CalendarContext';
import { dayKey } from '@/lib/calendar/metrics';

type CloseType = 'full' | 'los' | 'reopen';

type DateRange = { id: number; from: string; to: string };

const OPERATORS = ['TUI Group', 'Thomas Cook', 'Sunwing', 'Club Med', 'Jet2 Holidays'];
const ROOM_TYPES = ['Standard Double', 'Superior Double', 'Junior Suite', 'Suite', 'Deluxe Ocean View'];
const BOARD_TYPES = ['All Inclusive', 'Full Board', 'Half Board', 'Bed & Breakfast', 'Room Only'];

let rangeId = 0;

function parseIsoRange(from: string, to: string): string[] {
  if (!from || !to) return [];
  const start = new Date(from);
  const end = new Date(to);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];
  const keys: string[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    keys.push(
      `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`,
    );
    cur.setDate(cur.getDate() + 1);
  }
  return keys;
}

function isoToKey(iso: string) {
  const [, m, d] = iso.split('-').map(Number);
  return dayKey(m, d);
}

type Props = {
  selectedDays: Set<string>;
  onClose: () => void;
};

export function CloseOutModal({ selectedDays, onClose }: Props) {
  const { lockDay, unlockDay, setPartial, setCloseOutOpen } = useCalendar();
  const [closeType, setCloseType] = useState<CloseType>('full');
  const [minNights, setMinNights] = useState(3);
  const [ranges, setRanges] = useState<DateRange[]>([
    { id: ++rangeId, from: '2026-03-01', to: '2026-03-07' },
  ]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendAction, setSendAction] = useState<'email' | 'internal' | 'both'>('email');

  const addRange = () => {
    setRanges((r) => [...r, { id: ++rangeId, from: '', to: '' }]);
  };

  const removeRange = (id: number) => {
    setRanges((r) => r.filter((x) => x.id !== id));
  };

  const updateRange = (id: number, field: 'from' | 'to', val: string) => {
    setRanges((r) => r.map((x) => (x.id === id ? { ...x, [field]: val } : x)));
  };

  const handleConfirm = () => {
    const keysFromRanges = ranges.flatMap((r) => parseIsoRange(r.from, r.to).map(isoToKey));
    const keysFromSelection = [...selectedDays].map((iso) => {
      const [, m, d] = iso.split('-').map(Number);
      return dayKey(m, d);
    });
    const keys = new Set([...keysFromRanges, ...keysFromSelection]);

    keys.forEach((key) => {
      if (closeType === 'reopen') {
        unlockDay(key);
        setPartial(key, false);
      } else if (closeType === 'full') {
        lockDay(key);
      } else {
        setPartial(key, true);
      }
    });

    setCloseOutOpen(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[450] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="close-out-title"
        className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h3 id="close-out-title" className="text-base font-semibold text-slate-900">
            Close out sales
          </h3>
          <button type="button" onClick={onClose} className="rounded p-1 text-slate-500 hover:bg-slate-100">
            <Icon name="close" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-3 text-sm">
          <section>
            <p className="mb-2 text-slate-600">Please select</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {(
                [
                  { type: 'full' as const, label: 'Close all Day', icon: 'lock' },
                  { type: 'los' as const, label: 'Min Length of Stay', icon: 'lock' },
                  { type: 'reopen' as const, label: 'Re-Open', icon: 'lock_open' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setCloseType(opt.type)}
                  className={`flex flex-col items-center gap-1 rounded-lg border p-3 ${
                    closeType === opt.type
                      ? 'border-teal-800 bg-teal-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon name={opt.icon} className="text-teal-800" />
                  <span className="text-center text-xs font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </section>

          {closeType === 'los' && (
            <section>
              <label className="mb-1 block text-xs font-medium text-slate-600">Minimum Nights</label>
              <input
                type="number"
                min={1}
                max={30}
                value={minNights}
                onChange={(e) => setMinNights(Number(e.target.value))}
                className="w-24 rounded border border-slate-300 px-2 py-1"
              />
            </section>
          )}

          <section>
            <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Date ranges</p>
            {ranges.map((r) => (
              <div key={r.id} className="mb-2 flex flex-wrap items-center gap-2">
                <input
                  type="date"
                  value={r.from}
                  onChange={(e) => updateRange(r.id, 'from', e.target.value)}
                  className="rounded border border-slate-300 px-2 py-1 text-sm"
                />
                <span className="text-slate-400">–</span>
                <input
                  type="date"
                  value={r.to}
                  onChange={(e) => updateRange(r.id, 'to', e.target.value)}
                  className="rounded border border-slate-300 px-2 py-1 text-sm"
                />
                {ranges.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRange(r.id)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Icon name="close" className="text-base" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addRange}
              className="inline-flex items-center gap-1 text-sm text-teal-800 hover:underline"
            >
              <Icon name="add" className="text-base" />
              Add Date Range
            </button>
            {selectedDays.size > 0 && (
              <p className="mt-2 text-xs text-slate-500">
                Also applies to {selectedDays.size} selected day(s) from the calendar
              </p>
            )}
          </section>

          <section>
            <p className="mb-2 text-xs font-semibold uppercase text-slate-500">What to close</p>
            <p className="text-xs text-slate-500">
              Operators: {OPERATORS.slice(0, 3).join(', ')}… · Rooms: {ROOM_TYPES[0]}… · Board:{' '}
              {BOARD_TYPES[0]}…
            </p>
          </section>

          <section>
            <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Contact sales team</p>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Sales message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </section>

          <section>
            <p className="mb-2 text-xs font-semibold text-slate-700">Send Action</p>
            {(
              [
                { v: 'email' as const, l: 'Email Operators' },
                { v: 'internal' as const, l: 'Internal Note' },
                { v: 'both' as const, l: 'Both' },
              ] as const
            ).map((opt) => (
              <label key={opt.v} className="mb-1 flex items-center gap-2">
                <input
                  type="radio"
                  name="sendAction"
                  checked={sendAction === opt.v}
                  onChange={() => setSendAction(opt.v)}
                />
                {opt.l}
              </label>
            ))}
          </section>
        </div>

        <div className="flex gap-2 border-t border-slate-200 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded border border-slate-300 py-2 text-sm hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 rounded bg-teal-800 py-2 text-sm text-white hover:bg-teal-900"
          >
            {closeType === 'reopen' ? 'Re-Open' : 'Close Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
