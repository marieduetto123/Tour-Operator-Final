import { useCallback, useMemo, useState } from 'react';
import { ALL_MONTHS, type MetricKey } from '@/data/calendarData';
import { useCalendar } from '@/context/CalendarContext';
import { buildCellMetrics } from '@/lib/calendar/metrics';
import { heatmapCssVars } from '@/lib/calendar/heatmap';
import { CalendarHeader } from './CalendarHeader';
import { CalendarLegend } from './CalendarLegend';
import { CalendarMonth } from './CalendarMonth';
import { CloseOutModal } from './CloseOutModal';
import { DayDetailModal } from './DayDetailModal';
import { HeatmapModal } from './HeatmapModal';
import { Icon } from '@/components/ui/Icon';
import { WeeklyView } from './WeeklyView';
import type { FilterGroupId } from '@/data/filterOptions';

const DEFAULT_METRICS: MetricKey[] = ['hocc', 'tocc'];
const VISIBLE_COUNT = 2;

type ViewMode = 'monthly' | 'weekly';
type DayModal = { month: number; day: number; label: string };

function rangeLabel(startIdx: number, count: number) {
  const visible = ALL_MONTHS.slice(startIdx, startIdx + count);
  if (visible.length === 0) return '';
  if (visible.length <= 2) return visible[0].name;
  return `${visible[0].name.split(' ')[0]} – ${visible[visible.length - 1].name}`;
}

function fullDateRangeLabel(start: number, end: number) {
  const a = ALL_MONTHS[start];
  const b = ALL_MONTHS[end];
  if (!a || !b) return 'Jan 2026 – Dec 2026';
  return `${a.name.split(' ')[0]} ${a.year} – ${b.name.split(' ')[0]} ${b.year}`;
}

export function CalendarApp() {
  const {
    filterDraft,
    setFilterDraft,
    applyFilters,
    resetFilters,
    activeFilterCount,
    heatmap,
    heatmapDraft,
    setHeatmapDraft,
    applyHeatmap,
    resetHeatmap,
    closeOutOpen,
    setCloseOutOpen,
    openWeekView,
  } = useCalendar();

  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [startIdx, setStartIdx] = useState(0);
  const [rangeStartIdx, setRangeStartIdx] = useState(0);
  const [rangeEndIdx, setRangeEndIdx] = useState(11);
  const [pickerYear, setPickerYear] = useState(2026);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [pickerDraftStart, setPickerDraftStart] = useState(0);
  const [pickerDraftEnd, setPickerDraftEnd] = useState(11);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedDays, setSelectedDays] = useState<Set<string>>(() => new Set());
  const [appliedMetrics, setAppliedMetrics] = useState<MetricKey[]>(DEFAULT_METRICS);
  const [metricDraft, setMetricDraft] = useState<MetricKey[]>(DEFAULT_METRICS);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [heatmapModalOpen, setHeatmapModalOpen] = useState(false);
  const [pickupDays, setPickupDays] = useState(365);
  const [compare, setCompare] = useState('none');
  const [dayModal, setDayModal] = useState<DayModal | null>(null);

  const visibleMonths = useMemo(
    () => ALL_MONTHS.slice(startIdx, startIdx + VISIBLE_COUNT),
    [startIdx],
  );
  const navLabel = rangeLabel(startIdx, VISIBLE_COUNT);
  const dateLabel = fullDateRangeLabel(rangeStartIdx, rangeEndIdx);
  const hmVars = heatmapCssVars(heatmap);

  const clampStart = useCallback((idx: number) => {
    return Math.max(0, Math.min(idx, ALL_MONTHS.length - VISIBLE_COUNT));
  }, []);

  const handlePrev = () => setStartIdx((i) => clampStart(i - 1));
  const handleNext = () => setStartIdx((i) => clampStart(i + 1));

  const handleSelectDay = (iso: string) => {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(iso)) next.delete(iso);
      else next.add(iso);
      return next;
    });
  };

  const handleOpenDay = (month: number, day: number, label: string) => {
    setDayModal({ month, day, label });
  };

  const handleMetricToggle = (key: MetricKey) => {
    setMetricDraft((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= 4) return prev;
      return [...prev, key];
    });
  };

  const openDatePicker = () => {
    setPickerDraftStart(rangeStartIdx);
    setPickerDraftEnd(rangeEndIdx);
    setDatePickerOpen((o) => !o);
  };

  const handlePickerSelectMonth = (idx: number) => {
    if (pickerDraftStart === pickerDraftEnd) {
      setPickerDraftStart(idx);
      setPickerDraftEnd(idx);
      return;
    }
    if (idx < pickerDraftStart) setPickerDraftStart(idx);
    else setPickerDraftEnd(idx);
  };

  const goWeekly = () => {
    openWeekView(3, 9);
    setViewMode('weekly');
  };

  const modalMetrics = dayModal ? buildCellMetrics(dayModal.month, dayModal.day) : null;

  return (
  <>
    <article className="section-card" id="demand-calendar">
      <div className="wv-groupby-bar">
        <div className="wv-groupby-row">
          <button
            type="button"
            onClick={() => setViewMode('monthly')}
            className={`wv-groupby-btn${viewMode === 'monthly' ? ' active' : ''}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={goWeekly}
            className={`wv-groupby-btn${viewMode === 'weekly' ? ' active' : ''}`}
          >
            Weekly
          </button>
          {viewMode === 'monthly' && (
            <div className="wv-date-shuffler">
              <button type="button" className="wv-nav-btn" onClick={handlePrev} aria-label="Previous months">
                <Icon name="chevron_left" />
              </button>
              <span className="wv-range">{navLabel}</span>
              <button type="button" className="wv-nav-btn" onClick={handleNext} aria-label="Next months">
                <Icon name="chevron_right" />
              </button>
            </div>
          )}
        </div>
      </div>

      {viewMode === 'monthly' && (
        <>
          <CalendarHeader
            selectMode={selectMode}
            onToggleSelectMode={() => {
              setSelectMode((m) => !m);
              if (selectMode) setSelectedDays(new Set());
            }}
            selectedCount={selectedDays.size}
            onOpenCloseOut={() => setCloseOutOpen(true)}
            compare={compare}
            onCompareChange={setCompare}
            metricsOpen={metricsOpen}
            onMetricsOpen={setMetricsOpen}
            metricDraft={metricDraft}
            appliedMetrics={appliedMetrics}
            onMetricToggle={handleMetricToggle}
            onMetricsReset={() => setMetricDraft(DEFAULT_METRICS)}
            onMetricsApply={() => {
              setAppliedMetrics(metricDraft);
              setMetricsOpen(false);
            }}
            filtersOpen={filtersOpen}
            onFiltersOpen={setFiltersOpen}
            filterDraft={filterDraft}
            onFilterChange={(id: FilterGroupId, value) =>
              setFilterDraft((f) => ({ ...f, [id]: value }))
            }
            onFiltersReset={() => {
              resetFilters();
              setFiltersOpen(false);
            }}
            onFiltersApply={() => {
              applyFilters();
              setFiltersOpen(false);
            }}
            activeFilterCount={activeFilterCount}
            pickupDays={pickupDays}
            onPickupChange={setPickupDays}
            heatmapOpen={heatmapModalOpen}
            onHeatmapOpen={() => {
              setHeatmapDraft(heatmap);
              setHeatmapModalOpen(true);
            }}
            heatmapActive={heatmap.enabled}
            heatmapType={heatmap.type}
            dateLabel={dateLabel}
            datePickerOpen={datePickerOpen}
            onDatePickerToggle={openDatePicker}
            pickerYear={pickerYear}
            rangeStartIdx={pickerDraftStart}
            rangeEndIdx={pickerDraftEnd}
            onPickerYearChange={(d) => setPickerYear((y) => y + d)}
            onPickerSelectMonth={handlePickerSelectMonth}
            onPickerApply={() => {
              setRangeStartIdx(pickerDraftStart);
              setRangeEndIdx(pickerDraftEnd);
              setStartIdx(clampStart(pickerDraftStart));
              setDatePickerOpen(false);
            }}
            onPickerCancel={() => {
              setPickerDraftStart(rangeStartIdx);
              setPickerDraftEnd(rangeEndIdx);
              setDatePickerOpen(false);
            }}
            onDatePickerClose={() => setDatePickerOpen(false)}
          />
          <CalendarLegend />
          <div
            className={`cal-months-grid${heatmap.enabled ? ' hm-view' : ''}`}
            style={hmVars}
          >
            {visibleMonths.map((m) => (
              <CalendarMonth
                key={m.month}
                month={m}
                selectedMetrics={appliedMetrics}
                selectMode={selectMode}
                selectedDays={selectedDays}
                onSelectDay={handleSelectDay}
                onOpenDay={handleOpenDay}
              />
            ))}
          </div>
        </>
      )}

      {viewMode === 'weekly' && (
        <WeeklyView
          selectedMetrics={appliedMetrics}
          onBack={() => setViewMode('monthly')}
          onMetricsChange={setAppliedMetrics}
        />
      )}
    </article>

    {dayModal && modalMetrics && (
      <DayDetailModal
        dateLabel={dayModal.label}
        metrics={modalMetrics}
        selectedMetrics={appliedMetrics}
        onClose={() => setDayModal(null)}
      />
    )}

    {closeOutOpen && (
      <CloseOutModal selectedDays={selectedDays} onClose={() => setCloseOutOpen(false)} />
    )}

    <HeatmapModal
      open={heatmapModalOpen}
      draft={heatmapDraft}
      onChange={setHeatmapDraft}
      onClose={() => setHeatmapModalOpen(false)}
      onReset={() => {
        resetHeatmap();
        setHeatmapModalOpen(false);
      }}
      onApply={() => {
        applyHeatmap();
        setHeatmapModalOpen(false);
      }}
    />
  </>
  );
}
