import { Icon } from '@/components/ui/Icon';
import { CellMetricsPanel, cellMetricsButtonLabel } from './CellMetricsPanel';
import { FiltersDropdown } from './FiltersDropdown';
import { MonthRangePicker } from './MonthRangePicker';
import type { FilterGroupId, FilterState } from '@/data/filterOptions';
import type { MetricKey } from '@/data/calendarData';
import { heatmapTypeLabel } from '@/lib/calendar/heatmap';
import type { HeatmapType } from '@/data/heatmapTypes';

type Props = {
  selectMode: boolean;
  onToggleSelectMode: () => void;
  selectedCount: number;
  onOpenCloseOut: () => void;
  compare: string;
  onCompareChange: (v: string) => void;
  metricsOpen: boolean;
  onMetricsOpen: (open: boolean) => void;
  metricDraft: MetricKey[];
  appliedMetrics: MetricKey[];
  onMetricToggle: (key: MetricKey) => void;
  onMetricsReset: () => void;
  onMetricsApply: () => void;
  filtersOpen: boolean;
  onFiltersOpen: (open: boolean) => void;
  filterDraft: FilterState;
  onFilterChange: (id: FilterGroupId, value: string) => void;
  onFiltersReset: () => void;
  onFiltersApply: () => void;
  activeFilterCount: number;
  pickupDays: number;
  onPickupChange: (n: number) => void;
  heatmapOpen: boolean;
  onHeatmapOpen: () => void;
  heatmapActive: boolean;
  heatmapType: HeatmapType | '';
  dateLabel: string;
  datePickerOpen: boolean;
  onDatePickerToggle: () => void;
  pickerYear: number;
  rangeStartIdx: number;
  rangeEndIdx: number;
  onPickerYearChange: (d: number) => void;
  onPickerSelectMonth: (idx: number) => void;
  onPickerApply: () => void;
  onPickerCancel: () => void;
  onDatePickerClose: () => void;
};

export function CalendarHeader({
  selectMode,
  onToggleSelectMode,
  selectedCount,
  onOpenCloseOut,
  compare,
  onCompareChange,
  metricsOpen,
  onMetricsOpen,
  metricDraft,
  appliedMetrics,
  onMetricToggle,
  onMetricsReset,
  onMetricsApply,
  filtersOpen,
  onFiltersOpen,
  filterDraft,
  onFilterChange,
  onFiltersReset,
  onFiltersApply,
  activeFilterCount,
  pickupDays,
  onPickupChange,
  heatmapOpen,
  onHeatmapOpen,
  heatmapActive,
  heatmapType,
  dateLabel,
  datePickerOpen,
  onDatePickerToggle,
  pickerYear,
  rangeStartIdx,
  rangeEndIdx,
  onPickerYearChange,
  onPickerSelectMonth,
  onPickerApply,
  onPickerCancel,
  onDatePickerClose,
}: Props) {
  return (
    <header className="cal-header">
      <h2 className="cal-title">Calendar</h2>

      <div className="cal-header-right">
        <button
          type="button"
          onClick={onToggleSelectMode}
          className={`mo-select-dates-btn${selectMode ? ' active' : ''}`}
        >
          {selectMode ? `Selecting (${selectedCount})` : 'Select Dates'}
        </button>

        <button type="button" onClick={onOpenCloseOut} className="wv-closeout-primary">
          <Icon name="lock" style={{ fontSize: 16 }} />
          Close/Re-Open
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => onMetricsOpen(!metricsOpen)}
            className={`wv-topbar-text-btn${metricsOpen ? ' active' : ''}`}
          >
            <Icon name="tune" style={{ fontSize: 16 }} />
            {cellMetricsButtonLabel(appliedMetrics)}
            <Icon name="expand_more" style={{ fontSize: 14, opacity: 0.65 }} />
          </button>
          <CellMetricsPanel
            open={metricsOpen}
            draft={metricDraft}
            onToggle={onMetricToggle}
            onClose={() => onMetricsOpen(false)}
            onReset={onMetricsReset}
            onApply={onMetricsApply}
          />
        </div>

        <select
          value={compare}
          onChange={(e) => onCompareChange(e.target.value)}
          className="wv-outline-select"
        >
          <option value="ly">vs LY</option>
          <option value="stly">vs STLY</option>
          <option value="fcst">vs Locked Forecast</option>
          <option value="budget">vs Locked Budget</option>
          <option value="none">No Compare</option>
        </select>

        <div className="relative">
          <button
            type="button"
            onClick={() => onFiltersOpen(!filtersOpen)}
            className={`wv-topbar-text-btn${filtersOpen || activeFilterCount > 0 ? ' active' : ''}`}
          >
            <Icon name="filter_list" style={{ fontSize: 16 }} />
            Filters
            {activeFilterCount > 0 && (
              <span className="filter-count-badge">{activeFilterCount}</span>
            )}
            <Icon name="expand_more" style={{ fontSize: 14, opacity: 0.65 }} />
          </button>
          <FiltersDropdown
            open={filtersOpen}
            draft={filterDraft}
            onChange={onFilterChange}
            onClose={() => onFiltersOpen(false)}
            onReset={onFiltersReset}
            onApply={onFiltersApply}
            pickupDays={pickupDays}
            onPickupChange={onPickupChange}
          />
        </div>

        <button
          type="button"
          onClick={onHeatmapOpen}
          className={`wv-topbar-text-btn${heatmapOpen || heatmapActive ? ' active' : ''}`}
        >
          <Icon name="grid_view" style={{ fontSize: 16 }} />
          {heatmapActive && heatmapType ? heatmapTypeLabel(heatmapType) : 'Heatmap'}
        </button>

        <div className="relative">
          <button type="button" onClick={onDatePickerToggle} className="drp-trigger">
            <Icon name="date_range" style={{ fontSize: 16 }} />
            <span>{dateLabel}</span>
          </button>
          <MonthRangePicker
            open={datePickerOpen}
            year={pickerYear}
            startIdx={rangeStartIdx}
            endIdx={rangeEndIdx}
            onClose={onDatePickerClose}
            onYearChange={onPickerYearChange}
            onSelectMonth={onPickerSelectMonth}
            onApply={onPickerApply}
            onCancel={onPickerCancel}
          />
        </div>
      </div>
    </header>
  );
}
