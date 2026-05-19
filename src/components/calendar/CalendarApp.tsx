import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CompareMode } from '@/lib/calendar/metrics';
import { ALL_MONTHS, type MetricKey } from '@/data/calendarData';
import { DEFAULT_SEGMENTS, SEGMENT_OPTIONS, type SegmentKey } from '@/data/metricTree';
import { useCalendar } from '@/context/CalendarContext';
import { buildCellMetrics } from '@/lib/calendar/metrics';
import {
  buildWbRows,
  defaultWbCollapsed,
  getWeekDays,
  shiftWeekAnchor,
  wbSetAllCollapsed,
  weekRangeLabel,
} from '@/lib/calendar/weekGridData';
import { heatmapCssVars } from '@/lib/calendar/heatmap';
import type { FilterGroupId } from '@/data/filterOptions';
import { toggleFilterValue } from '@/data/filterOptions';
import { CalendarHeader } from './CalendarHeader';
import { CalendarLegend } from './CalendarLegend';
import { CalendarMonth } from './CalendarMonth';
import { CalendarTabBar, type CalendarViewTab } from './CalendarTabBar';
import { CloseOutModal } from './CloseOutModal';
import { DayDetailModal } from './DayDetailModal';
import { HeatmapModal } from './HeatmapModal';
import { SelectDatesFooter } from './SelectDatesFooter';
import { WeeklyView } from './WeeklyView';

const DEFAULT_METRICS: MetricKey[] = ['hocc', 'tocc'];

const MONTH_NAMES = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

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
    filters,
    heatmap,
    heatmapDraft,
    setHeatmapDraft,
    applyHeatmap,
    resetHeatmap,
    closeOutOpen,
    setCloseOutOpen,
    openWeekView,
    weekAnchor,
    setWeekAnchor,
  } = useCalendar();

  const [viewMode, setViewMode] = useState<CalendarViewTab>('monthly');
  const [startIdx, setStartIdx] = useState(0);
  const [rangeStartIdx, setRangeStartIdx] = useState(0);
  const [rangeEndIdx, setRangeEndIdx] = useState(1);
  const [displayView, setDisplayView] = useState(2);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedDays, setSelectedDays] = useState<Set<string>>(() => new Set());
  const [appliedMetrics, setAppliedMetrics] = useState<MetricKey[]>(DEFAULT_METRICS);
  const [metricDraft, setMetricDraft] = useState<MetricKey[]>(DEFAULT_METRICS);
  const [segmentDraft, setSegmentDraft] = useState<SegmentKey[]>(DEFAULT_SEGMENTS);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [heatmapModalOpen, setHeatmapModalOpen] = useState(false);
  const [pickupDays, setPickupDays] = useState(365);
  const [compare, setCompare] = useState<CompareMode>('none');
  const [cmpVisible, setCmpVisible] = useState(false);
  const [dayModal, setDayModal] = useState<DayModal | null>(null);
  const wbRows = useMemo(() => buildWbRows(), []);
  const [wbCollapsed, setWbCollapsed] = useState(() => defaultWbCollapsed(wbRows));
  const gridRef = useRef<HTMLDivElement>(null);

  const isCompact = displayView >= 3;
  const isSingleMonth = displayView === 1;

  const visibleMonths = useMemo(
    () => ALL_MONTHS.slice(startIdx, startIdx + displayView),
    [startIdx, displayView],
  );
  const navLabel = rangeLabel(startIdx, displayView);
  const dateLabel = fullDateRangeLabel(rangeStartIdx, rangeEndIdx);
  const hmVars = heatmapCssVars(heatmap);

  const clampStart = useCallback(
    (idx: number) => Math.max(0, Math.min(idx, ALL_MONTHS.length - displayView)),
    [displayView],
  );

  const handlePrev = () => {
    const step = displayView >= 6 ? displayView : 1;
    setStartIdx((i) => clampStart(i - step));
  };

  const handleNext = () => {
    const step = displayView >= 6 ? displayView : 1;
    setStartIdx((i) => clampStart(i + step));
  };

  const shiftWeek = (delta: number) => {
    setWeekAnchor(shiftWeekAnchor(weekAnchor.month, weekAnchor.day, delta));
  };

  const handleTabChange = (tab: CalendarViewTab) => {
    if (tab === 'weekly') {
      openWeekView(weekAnchor.month || 3, weekAnchor.day || 9);
    }
    setViewMode(tab);
  };

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

  const handleGoToWeek = (month: number, day: number) => {
    if (displayView >= 6) {
      handleOpenDay(month, day, `${MONTH_NAMES[month]} ${day}, 2026`);
      return;
    }
    openWeekView(month, day);
    setViewMode('weekly');
  };

  const handleMetricToggle = (key: MetricKey) => {
    setMetricDraft((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= 4) return prev;
      return [...prev, key];
    });
  };

  const handleSegmentToggle = (key: SegmentKey) => {
    const allKeys = SEGMENT_OPTIONS.map((s) => s.key);
    setSegmentDraft((prev) => {
      if (key === 'all') {
        const allOn = allKeys.every((k) => prev.includes(k));
        return allOn ? [] : [...allKeys];
      }
      return prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
    });
  };

  const exitSelectMode = () => {
    setSelectMode(false);
    setSelectedDays(new Set());
  };

  const handleRangeApply = (start: number, end: number) => {
    const lo = Math.min(start, end);
    const hi = Math.max(start, end);
    const viewLen = hi - lo + 1;
    setRangeStartIdx(lo);
    setRangeEndIdx(hi);
    setDisplayView(viewLen);
    setStartIdx(clampStart(lo));
    setDatePickerOpen(false);
  };

  useEffect(() => {
    const root = document.querySelector('.calendar-page');
    root?.classList.toggle('mo-select-active', selectMode);
    return () => root?.classList.remove('mo-select-active');
  }, [selectMode]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || isCompact || compare === 'none') {
      setCmpVisible(false);
      return;
    }

    const sync = () => {
      const cell = grid.querySelector('.cal-day:not(.cal-day-empty):not(.empty)');
      const w = cell?.getBoundingClientRect().width ?? 0;
      setCmpVisible(w >= 108);
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(grid);
    window.addEventListener('resize', sync);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [compare, isCompact, displayView, startIdx]);

  const modalMetrics = dayModal ? buildCellMetrics(dayModal.month, dayModal.day) : null;

  const gridClass = [
    'cal-months-grid',
    isCompact ? 'cal-compact' : '',
    isSingleMonth ? 'cal-single-month' : '',
    `cal-view-${displayView}`,
    displayView === 12 ? 'cal-12m' : '',
    cmpVisible && compare !== 'none' ? 'cal-cmp-visible' : '',
    heatmap.enabled ? ' hm-view' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const gridCols = isSingleMonth
    ? 1
    : isCompact
      ? Math.min(displayView, 3)
      : displayView;

  const gridStyle = {
    ...hmVars,
    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
  };

  const weekNavLabel = weekRangeLabel(getWeekDays(2026, weekAnchor.month, weekAnchor.day));

  const dateShuffler = viewMode === 'monthly' ? (
    <Box className="wv-date-shuffler">
      <IconButton
        className="wv-nav-btn"
        onClick={handlePrev}
        aria-label="Previous months"
        size="small"
      >
        <ChevronLeftIcon />
      </IconButton>
      <Typography component="span" className="wv-range">
        {navLabel}
      </Typography>
      <IconButton
        className="wv-nav-btn"
        onClick={handleNext}
        aria-label="Next months"
        size="small"
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  ) : (
    <Box className="wv-date-shuffler">
      <IconButton className="wv-nav-btn" onClick={() => shiftWeek(-1)} aria-label="Previous day" size="small">
        <ChevronLeftIcon />
      </IconButton>
      <Typography component="span" className="wv-range">
        {weekNavLabel}
        {!filters.operator.includes('all') && filters.operator.length > 0 && (
          <Typography
            component="span"
            sx={{ ml: 1, fontSize: 12, fontWeight: 400, color: 'primary.main' }}
          >
            · {filters.operator.join(', ')}
          </Typography>
        )}
      </Typography>
      <IconButton className="wv-nav-btn" onClick={() => shiftWeek(1)} aria-label="Next day" size="small">
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );

  const tabBarTrailing =
    viewMode === 'weekly' ? (
      <Box className="ds-tab-bar__trailing-inner">
        <div className="wv-date-acc-controls">
          <button
            type="button"
            className="wv-acc-action-btn"
            onClick={() => setWbCollapsed(wbSetAllCollapsed(wbRows, true))}
          >
            <UnfoldLessIcon sx={{ fontSize: 18 }} aria-hidden />
            Close All
          </button>
          <button
            type="button"
            className="wv-acc-action-btn"
            onClick={() => setWbCollapsed(wbSetAllCollapsed(wbRows, false))}
          >
            <UnfoldMoreIcon sx={{ fontSize: 18 }} aria-hidden />
            Open All
          </button>
        </div>
        {dateShuffler}
      </Box>
    ) : (
      dateShuffler
    );

  return (
    <>
      <Paper component="article" className="section-card" id="demand-calendar" elevation={0}>
        <CalendarHeader
          selectMode={selectMode}
          onToggleSelectMode={() => {
            if (selectMode) exitSelectMode();
            else setSelectMode(true);
          }}
          selectedCount={selectedDays.size}
          onOpenCloseOut={() => setCloseOutOpen(true)}
          compare={compare}
          onCompareChange={setCompare}
          metricsOpen={metricsOpen}
          onMetricsOpen={setMetricsOpen}
          metricDraft={metricDraft}
          segmentDraft={segmentDraft}
          appliedMetrics={appliedMetrics}
          onMetricToggle={handleMetricToggle}
          onSegmentToggle={handleSegmentToggle}
          onMetricsReset={() => {
            setMetricDraft(DEFAULT_METRICS);
            setSegmentDraft(DEFAULT_SEGMENTS);
          }}
          onMetricsApply={() => {
            setAppliedMetrics(metricDraft);
            setMetricsOpen(false);
          }}
          filtersOpen={filtersOpen}
          onFiltersOpen={setFiltersOpen}
          filterDraft={filterDraft}
          onFilterToggle={(id: FilterGroupId, value) =>
            setFilterDraft((f) => ({ ...f, [id]: toggleFilterValue(f[id], value) }))
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
          onDatePickerToggle={() => setDatePickerOpen((o) => !o)}
          rangeStartIdx={rangeStartIdx}
          rangeEndIdx={rangeEndIdx}
          onRangeApply={handleRangeApply}
          onDatePickerClose={() => setDatePickerOpen(false)}
        />

        <CalendarTabBar value={viewMode} onChange={handleTabChange} trailing={tabBarTrailing} />

        {viewMode === 'monthly' ? (
          <Box
            role="tabpanel"
            id="cal-tabpanel-monthly"
            aria-labelledby="cal-tab-monthly"
          >
            <CalendarLegend />
            <Box ref={gridRef} className={gridClass} style={gridStyle}>
              {visibleMonths.map((m) => (
                <CalendarMonth
                  key={m.month}
                  month={m}
                  selectedMetrics={appliedMetrics}
                  selectMode={selectMode}
                  selectedDays={selectedDays}
                  compact={isCompact}
                  compare={compare}
                  onSelectDay={handleSelectDay}
                  onOpenDay={handleOpenDay}
                  onGoToWeek={handleGoToWeek}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <WeeklyView
            month={weekAnchor.month}
            startDay={weekAnchor.day}
            compare={compare}
            selectedMetrics={appliedMetrics}
            collapsed={wbCollapsed}
            onCollapsedChange={setWbCollapsed}
          />
        )}
      </Paper>

      <SelectDatesFooter
        visible={selectMode}
        selectedCount={selectedDays.size}
        onCancel={exitSelectMode}
        onConfirm={() => {
          setCloseOutOpen(true);
          exitSelectMode();
        }}
      />

      {dayModal && modalMetrics && (
        <DayDetailModal
          open={Boolean(dayModal)}
          dateLabel={dayModal.label}
          metrics={modalMetrics}
          selectedMetrics={appliedMetrics}
          onClose={() => setDayModal(null)}
        />
      )}

      <CloseOutModal
        open={closeOutOpen}
        selectedDays={selectedDays}
        onClose={() => setCloseOutOpen(false)}
        onComplete={() => {
          setCloseOutOpen(false);
          exitSelectMode();
        }}
      />

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
