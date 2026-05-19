import { Icon } from '@/components/ui/Icon';
import {
  HEATMAP_TYPE_OPTIONS,
  HM_METRIC_COLORS,
  HM_STOP_SALES_COLORS,
  ROOM_TYPE_OPTIONS,
  type HeatmapState,
  type HeatmapType,
} from '@/data/heatmapTypes';

type Props = {
  open: boolean;
  draft: HeatmapState;
  onChange: (next: HeatmapState) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
};

export function HeatmapModal({ open, draft, onChange, onClose, onReset, onApply }: Props) {
  if (!open) return null;

  const isStop = draft.type === 'stopsales';

  const setType = (type: HeatmapType) => onChange({ ...draft, type });

  const setThreshold = (which: 'grey' | 'green', val: number) => {
    if (which === 'grey') onChange({ ...draft, greyThreshold: val });
    else onChange({ ...draft, greenThreshold: val });
  };

  const setColor = (key: 'grey' | 'blue' | 'green', hex: string) => {
    onChange({ ...draft, colors: { ...draft.colors, [key]: hex } });
  };

  const thresholdRows = isStop
    ? [
        { key: 'grey' as const, label: 'Closed', desc: 'Full close out day', color: HM_STOP_SALES_COLORS.closed },
        { key: 'blue' as const, label: 'Partial', desc: 'At least 1 partial close out', color: HM_STOP_SALES_COLORS.partial },
        { key: 'green' as const, label: 'Open', desc: 'No stop sale', color: HM_STOP_SALES_COLORS.open },
      ]
    : [
        { key: 'grey' as const, label: 'Grey', desc: 'Above threshold', color: HM_METRIC_COLORS.grey, input: true, which: 'grey' as const },
        { key: 'green' as const, label: 'Green', desc: 'Below threshold', color: HM_METRIC_COLORS.green, input: true, which: 'green' as const },
        { key: 'blue' as const, label: 'Blue', desc: 'Between thresholds', color: HM_METRIC_COLORS.blue, input: false },
      ];

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h3 className="text-base font-semibold text-slate-900">Heatmap</h3>
          <button type="button" onClick={onClose} className="rounded p-1 text-slate-500 hover:bg-slate-100">
            <Icon name="close" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <p className="mb-3 text-sm text-slate-600">
            Select a heatmap type, then configure each colour threshold
          </p>

          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {HEATMAP_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setType(opt.key)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm ${
                  draft.type === opt.key
                    ? 'border-teal-800 bg-teal-50 text-teal-900'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 rounded-full border-2 ${
                    draft.type === opt.key ? 'border-teal-800 bg-teal-800' : 'border-slate-300'
                  }`}
                />
                <Icon name={opt.icon} className="text-lg text-teal-800" />
                {opt.label}
              </button>
            ))}
          </div>

          {draft.type && (
            <>
              {isStop && (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Room Type</p>
                  <div className="flex flex-wrap gap-1">
                    {ROOM_TYPE_OPTIONS.map((rt) => {
                      const on = draft.stopSalesRoomTypes.includes(rt);
                      return (
                        <button
                          key={rt}
                          type="button"
                          onClick={() => {
                            const next = on
                              ? draft.stopSalesRoomTypes.filter((x) => x !== rt)
                              : [...draft.stopSalesRoomTypes, rt];
                            onChange({ ...draft, stopSalesRoomTypes: next });
                          }}
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            on ? 'bg-teal-800 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {rt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {!isStop && (
                <label className="mb-3 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={draft.condition.enabled}
                    onChange={(e) =>
                      onChange({
                        ...draft,
                        condition: { ...draft.condition, enabled: e.target.checked },
                      })
                    }
                  />
                  Add condition
                </label>
              )}

              {draft.condition.enabled && !isStop && (
                <div className="mb-4 flex flex-wrap gap-2">
                  <select
                    value={draft.condition.metric}
                    onChange={(e) =>
                      onChange({
                        ...draft,
                        condition: {
                          ...draft.condition,
                          metric: e.target.value as typeof draft.condition.metric,
                        },
                      })
                    }
                    className="rounded border border-slate-300 px-2 py-1 text-sm"
                  >
                    <option value="hotel">Hotel Occ (%)</option>
                    <option value="remainRooms">Remaining Rooms</option>
                    <option value="totalGuests">Meal Plan Guests</option>
                    <option value="toOtb">TO OTB (rooms)</option>
                  </select>
                  <select
                    value={draft.condition.op}
                    onChange={(e) =>
                      onChange({
                        ...draft,
                        condition: {
                          ...draft.condition,
                          op: e.target.value as typeof draft.condition.op,
                        },
                      })
                    }
                    className="rounded border border-slate-300 px-2 py-1 text-sm"
                  >
                    <option value=">">&gt; above</option>
                    <option value=">=">&gt;= at least</option>
                    <option value="<">&lt; below</option>
                    <option value="<=">&lt;= at most</option>
                  </select>
                  <input
                    type="number"
                    value={draft.condition.value}
                    onChange={(e) =>
                      onChange({
                        ...draft,
                        condition: { ...draft.condition, value: Number(e.target.value) },
                      })
                    }
                    className="w-20 rounded border border-slate-300 px-2 py-1 text-sm"
                  />
                </div>
              )}

              <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Colour Thresholds</p>
              <div className="space-y-3">
                {thresholdRows.map((row) => (
                  <div key={row.key} className="flex gap-3 rounded-lg border border-slate-100 p-3">
                    <div className="flex flex-col items-center gap-1">
                      <input
                        type="color"
                        value={draft.colors[row.key] ?? row.color}
                        onChange={(e) => setColor(row.key, e.target.value)}
                        className="h-10 w-10 cursor-pointer rounded border-0"
                      />
                      <span className="text-[10px] text-slate-500">Change</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{row.label}</p>
                      <p className="text-xs text-slate-500">{row.desc}</p>
                      {'input' in row && row.input && (
                        <input
                          type="number"
                          className="mt-1 w-24 rounded border border-slate-300 px-2 py-1 text-sm"
                          value={
                            row.which === 'grey' ? draft.greyThreshold : draft.greenThreshold
                          }
                          onChange={(e) => setThreshold(row.which!, Number(e.target.value))}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2 border-t border-slate-200 px-4 py-3">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded border border-slate-300 py-2 text-sm hover:bg-slate-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            disabled={!draft.type}
            className="flex-1 rounded bg-teal-800 py-2 text-sm text-white hover:bg-teal-900 disabled:opacity-40"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
