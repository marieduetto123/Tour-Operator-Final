import { useState, useMemo } from 'react';
import type { CalView, CompareMode, CalFilters, CellMetricKey, HeatmapType } from './types';
import { ALL_MONTHS, CAL_METRIC_DEFS } from './data';
import CalendarHeader from './CalendarHeader';
import CalendarLegend from './CalendarLegend';
import CalendarMonth from './CalendarMonth';

const DEFAULT_METRICS: CellMetricKey[] = ['hotelOcc', 'toOcc'];
const DEFAULT_FILTERS: CalFilters = { to: 'all', room: 'all', board: 'all', market: 'all', pickup: [1, 3, 7] };

interface CalendarProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export default function Calendar({ darkMode, onDarkModeToggle }: CalendarProps) {
  const [calView, setCalView] = useState<CalView>(2);
  const [startIdx, setStartIdx] = useState(0);
  const [compareMode, setCompareMode] = useState<CompareMode>('none');
  const [filters, setFilters] = useState<CalFilters>(DEFAULT_FILTERS);
  const [activeCellMetrics, setActiveCellMetrics] = useState<CellMetricKey[]>(DEFAULT_METRICS);
  const [heatmapType, setHeatmapType] = useState<HeatmapType>('hotel-occ');
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [rangeStart, setRangeStart] = useState<{ month: number; day: number } | null>(null);
  const [rangeEnd, setRangeEnd] = useState<{ month: number; day: number } | null>(null);
  const [picking, setPicking] = useState(false);

  const visibleMonths = useMemo(
    () => ALL_MONTHS.slice(startIdx, startIdx + calView),
    [startIdx, calView],
  );

  const compact = calView >= 3;

  const rangeLabel = useMemo(() => {
    if (visibleMonths.length === 0) return '';
    if (visibleMonths.length === 1) return visibleMonths[0].name;
    return `${visibleMonths[0].name.split(' ')[0]} – ${visibleMonths[visibleMonths.length - 1].name}`;
  }, [visibleMonths]);

  function handlePrev() {
    setStartIdx(i => Math.max(0, i - 1));
  }

  function handleNext() {
    setStartIdx(i => Math.min(ALL_MONTHS.length - calView, i + 1));
  }

  function handleViewChange(v: CalView) {
    setCalView(v);
    setStartIdx(i => Math.min(i, ALL_MONTHS.length - v));
  }

  function handleDayClick(month: number, day: number) {
    if (bulkSelectMode) return;
    if (!picking) {
      setRangeStart({ month, day });
      setRangeEnd(null);
      setPicking(true);
    } else {
      setRangeEnd({ month, day });
      setPicking(false);
    }
  }

  // Grid cols based on view
  const gridCols: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    6: 'grid-cols-3 xl:grid-cols-6',
    12: 'grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6',
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <CalendarHeader
        calView={calView}
        onCalViewChange={handleViewChange}
        onPrev={handlePrev}
        onNext={handleNext}
        rangeLabel={rangeLabel}
        compareMode={compareMode}
        onCompareModeChange={setCompareMode}
        filters={filters}
        onFiltersChange={setFilters}
        activeCellMetrics={activeCellMetrics}
        onCellMetricsChange={setActiveCellMetrics}
        metricDefs={CAL_METRIC_DEFS}
        heatmapType={heatmapType}
        onHeatmapChange={setHeatmapType}
        darkMode={darkMode}
        onDarkModeToggle={onDarkModeToggle}
        bulkSelectMode={bulkSelectMode}
        onBulkSelectToggle={() => setBulkSelectMode(b => !b)}
      />

      <CalendarLegend />

      <div className={`grid ${gridCols[calView] ?? 'grid-cols-2'} gap-4 p-4`}>
        {visibleMonths.map(m => (
          <CalendarMonth
            key={`${m.year}-${m.month}`}
            monthData={m}
            activeCellMetrics={activeCellMetrics}
            metricDefs={CAL_METRIC_DEFS}
            heatmapType={heatmapType}
            compact={compact}
            toFilter={filters.to}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onDayClick={handleDayClick}
          />
        ))}
      </div>
    </div>
  );
}
