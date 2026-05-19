import { Fragment, useMemo, useState } from 'react';
import { DOW_SHORT } from '@/data/calendarData';
import { useCalendar } from '@/context/CalendarContext';
import { buildCellMetrics, buildMetricRows, dayKey } from '@/lib/calendar/metrics';
import type { MetricKey } from '@/data/calendarData';
import { FiltersDropdown } from './FiltersDropdown';
import { Icon } from '@/components/ui/Icon';
import { CellMetricsPanel, cellMetricsButtonLabel } from './CellMetricsPanel';

type Props = {
  selectedMetrics: MetricKey[];
  onBack: () => void;
  onMetricsChange: (keys: MetricKey[]) => void;
};

function weekDaysForAnchor(month: number, startDay: number) {
  const days: { month: number; day: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = startDay + i;
    const m = month;
    days.push({ month: m, day: d });
  }
  return days;
}

type AccordionSection = {
  id: string;
  title: string;
  rows: { label: string; values: string[] }[];
};

export function WeeklyView({ selectedMetrics, onBack, onMetricsChange }: Props) {
  const {
    weekAnchor,
    setWeekAnchor,
    getFilteredOccupancy,
    isLocked,
    isPartial,
    filterDraft,
    setFilterDraft,
    applyFilters,
    resetFilters,
    activeFilterCount,
    filters,
    setCloseOutOpen,
  } = useCalendar();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [metricDraft, setMetricDraft] = useState<MetricKey[]>(selectedMetrics);
  const [pickupDays, setPickupDays] = useState(365);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const days = useMemo(
    () => weekDaysForAnchor(weekAnchor.month, weekAnchor.day),
    [weekAnchor],
  );

  const monthLabel = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ][weekAnchor.month];

  const metricRows = days.map(({ month, day }) => {
    const m = buildCellMetrics(month, day);
    return buildMetricRows(m, selectedMetrics);
  });

  const sections: AccordionSection[] = [
    {
      id: 'otb',
      title: 'On The Books',
      rows: selectedMetrics.map((key, ri) => ({
        label: key.startsWith('t') ? `TO ${key.slice(1)}` : `Hotel ${key.slice(1)}`,
        values: days.map((_, di) => metricRows[di][ri]?.value ?? '—'),
      })),
    },
    {
      id: 'pickup',
      title: 'Pickup',
      rows: [
        {
          label: 'Hotel Pickup',
          values: days.map(({ month, day }) => {
            const p = 5 + Math.abs((month * 7 + day) % 12);
            return `${p >= 0 ? '+' : ''}${p}`;
          }),
        },
      ],
    },
    {
      id: 'closeouts',
      title: 'Close Outs',
      rows: [
        {
          label: 'Status',
          values: days.map(({ month, day }) => {
            const k = dayKey(month, day);
            if (isLocked(k)) return 'Closed';
            if (isPartial(k)) return 'Partial';
            return 'Open';
          }),
        },
      ],
    },
  ];

  const shiftWeek = (delta: number) => {
    setWeekAnchor({
      month: weekAnchor.month,
      day: Math.max(1, Math.min(28, weekAnchor.day + delta * 7)),
    });
  };

  return (
    <section className="section-card" id="weekView">
      <header className="wv-topbar">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onBack} className="wv-back-btn">
            <Icon name="chevron_left" style={{ fontSize: 16 }} />
            Back to month
          </button>
          <span className="wv-topbar-title">Calendar</span>
        </div>
        <div className="cal-header-right">
          <button type="button" onClick={() => setCloseOutOpen(true)} className="wv-closeout-primary">
            <Icon name="lock" style={{ fontSize: 16 }} />
            Close/Re-Open
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              className={`wv-topbar-text-btn${filtersOpen || activeFilterCount > 0 ? ' active' : ''}`}
            >
              <Icon name="filter_list" style={{ fontSize: 16 }} />
              Filters
              {activeFilterCount > 0 && (
                <span className="filter-count-badge">{activeFilterCount}</span>
              )}
            </button>
            <FiltersDropdown
              open={filtersOpen}
              draft={filterDraft}
              onChange={(id, value) => setFilterDraft((f) => ({ ...f, [id]: value }))}
              onClose={() => setFiltersOpen(false)}
              onReset={() => {
                resetFilters();
                setFiltersOpen(false);
              }}
              onApply={() => {
                applyFilters();
                setFiltersOpen(false);
              }}
              pickupDays={pickupDays}
              onPickupChange={setPickupDays}
            />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMetricsOpen((o) => !o)}
              className={`wv-topbar-text-btn${metricsOpen ? ' active' : ''}`}
            >
              <Icon name="tune" style={{ fontSize: 16 }} />
              {cellMetricsButtonLabel(selectedMetrics)}
              <Icon name="expand_more" style={{ fontSize: 14, opacity: 0.65 }} />
            </button>
            <CellMetricsPanel
              open={metricsOpen}
              draft={metricDraft}
              onToggle={(key) =>
                setMetricDraft((prev) => {
                  if (prev.includes(key)) return prev.filter((k) => k !== key);
                  if (prev.length >= 4) return prev;
                  return [...prev, key];
                })
              }
              onClose={() => setMetricsOpen(false)}
              onReset={() => setMetricDraft(['hocc', 'tocc'])}
              onApply={() => {
                onMetricsChange(metricDraft);
                setMetricsOpen(false);
              }}
            />
          </div>
        </div>
      </header>

      <div className="wv-groupby-bar">
        <div className="wv-date-shuffler" style={{ marginLeft: 0, width: '100%', justifyContent: 'center' }}>
        <button type="button" onClick={() => shiftWeek(-1)} className="wv-nav-btn">
          <Icon name="chevron_left" />
        </button>
        <span className="wv-range">
          {monthLabel} {weekAnchor.day}–{weekAnchor.day + 6}, 2026
          {filters.operator !== 'all' && (
            <span className="ml-2 text-xs font-normal text-teal-800">
              · {filters.operator}
            </span>
          )}
        </span>
        <button type="button" onClick={() => shiftWeek(1)} className="wv-nav-btn">
          <Icon name="chevron_right" />
        </button>
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white pb-2 pr-4 text-left text-xs font-semibold uppercase text-slate-500">
                Metric
              </th>
              {days.map(({ day }, i) => (
                <th key={day} className="px-2 pb-2 text-center text-xs font-semibold text-slate-600">
                  <div>{DOW_SHORT[i]}</div>
                  <div className="text-base font-bold text-slate-900">{day}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <Fragment key={section.id}>
                <tr
                  className="cursor-pointer bg-slate-50"
                  onClick={() =>
                    setCollapsed((c) => ({ ...c, [section.id]: !c[section.id] }))
                  }
                >
                  <td colSpan={8} className="py-2 pl-1 font-semibold text-slate-800">
                    <Icon
                      name={collapsed[section.id] ? 'chevron_right' : 'expand_more'}
                      className="mr-1 align-middle text-base"
                    />
                    {section.title}
                  </td>
                </tr>
                {!collapsed[section.id] &&
                  section.rows.map((row) => (
                    <tr key={`${section.id}-${row.label}`} className="border-t border-slate-100">
                      <td className="sticky left-0 z-10 bg-white py-2 pr-4 text-slate-600">
                        {row.label}
                      </td>
                      {row.values.map((val, i) => {
                        const { month, day } = days[i];
                        const { hotel, to } = getFilteredOccupancy(month, day);
                        const occ = selectedMetrics[0]?.startsWith('t') ? to : hotel;
                        return (
                          <td
                            key={i}
                            className={`px-2 py-2 text-center font-semibold tabular-nums ${
                              occ >= 85 ? 'text-red-700' : occ >= 70 ? 'text-amber-700' : 'text-slate-900'
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
