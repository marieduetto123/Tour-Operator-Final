import { useRef, useState } from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import LockIcon from '@mui/icons-material/Lock';
import TuneIcon from '@mui/icons-material/Tune';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { CellMetricsPanel, cellMetricsButtonLabel } from './CellMetricsPanel';
import { FiltersDropdown } from './FiltersDropdown';
import { MonthRangePicker } from './MonthRangePicker';
import type { FilterGroupId, FilterState } from '@/data/filterOptions';
import type { MetricKey } from '@/data/calendarData';
import type { CompareMode } from '@/lib/calendar/metrics';
import { heatmapTypeLabel } from '@/lib/calendar/heatmap';
import type { HeatmapType } from '@/data/heatmapTypes';

type Props = {
  selectMode: boolean;
  onToggleSelectMode: () => void;
  selectedCount: number;
  onOpenCloseOut: () => void;
  compare: CompareMode;
  onCompareChange: (v: CompareMode) => void;
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
  onFilterToggle: (id: FilterGroupId, value: string) => void;
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
  rangeStartIdx: number;
  rangeEndIdx: number;
  onRangeApply: (startIdx: number, endIdx: number) => void;
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
  onFilterToggle,
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
  rangeStartIdx,
  rangeEndIdx,
  onRangeApply,
  onDatePickerClose,
}: Props) {
  const metricsRef = useRef<HTMLButtonElement>(null);
  const filtersRef = useRef<HTMLButtonElement>(null);
  const [dateAnchor, setDateAnchor] = useState<HTMLElement | null>(null);

  return (
    <Box component="header" className="cal-header">
      <Typography component="h2" className="cal-title" variant="h6">
        Calendar
      </Typography>

      <Box className="cal-header-right">
        <Button
          className={`mo-select-dates-btn${selectMode ? ' active' : ''}`}
          onClick={onToggleSelectMode}
          color="inherit"
        >
          {selectMode ? `Selecting (${selectedCount})` : 'Select Dates'}
        </Button>

        <Button
          className="wv-closeout-primary"
          variant="contained"
          color="primary"
          startIcon={<LockIcon sx={{ fontSize: 16 }} />}
          onClick={onOpenCloseOut}
        >
          Close/Re-Open
        </Button>

        <Button
          ref={metricsRef}
          className={`wv-topbar-text-btn${metricsOpen ? ' active' : ''}`}
          color="inherit"
          startIcon={<TuneIcon sx={{ fontSize: 16 }} />}
          endIcon={<ExpandMoreIcon sx={{ fontSize: 14, opacity: 0.65 }} />}
          onClick={() => onMetricsOpen(!metricsOpen)}
        >
          {cellMetricsButtonLabel(appliedMetrics)}
        </Button>
        <CellMetricsPanel
          open={metricsOpen}
          anchorEl={metricsRef.current}
          draft={metricDraft}
          onToggle={onMetricToggle}
          onClose={() => onMetricsOpen(false)}
          onReset={onMetricsReset}
          onApply={onMetricsApply}
        />

        <FormControl size="small" className="wv-outline-select-wrap">
          <Select
            value={compare}
            onChange={(e) => onCompareChange(e.target.value as CompareMode)}
            className="wv-outline-select"
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="ly">vs LY</MenuItem>
            <MenuItem value="stly">vs STLY</MenuItem>
            <MenuItem value="fcst">vs Locked Forecast</MenuItem>
            <MenuItem value="budget">vs Locked Budget</MenuItem>
            <MenuItem value="none">No Compare</MenuItem>
          </Select>
        </FormControl>

        <Badge
          badgeContent={activeFilterCount}
          color="primary"
          invisible={activeFilterCount === 0}
          className="filter-badge-wrap"
        >
          <Button
            ref={filtersRef}
            className={`wv-topbar-text-btn${filtersOpen || activeFilterCount > 0 ? ' active' : ''}`}
            color="inherit"
            startIcon={<FilterListIcon sx={{ fontSize: 16 }} />}
            endIcon={<ExpandMoreIcon sx={{ fontSize: 14, opacity: 0.65 }} />}
            onClick={() => onFiltersOpen(!filtersOpen)}
          >
            Filters
          </Button>
        </Badge>
          <FiltersDropdown
            open={filtersOpen}
            anchorEl={filtersRef.current}
            draft={filterDraft}
            onToggle={onFilterToggle}
            onClose={() => onFiltersOpen(false)}
            onReset={onFiltersReset}
            onApply={onFiltersApply}
            pickupDays={pickupDays}
            onPickupChange={onPickupChange}
          />

        <Button
          className={`wv-topbar-text-btn${heatmapOpen || heatmapActive ? ' active' : ''}`}
          color="inherit"
          startIcon={<GridViewIcon sx={{ fontSize: 16 }} />}
          onClick={onHeatmapOpen}
        >
          {heatmapActive && heatmapType ? heatmapTypeLabel(heatmapType) : 'Heatmap'}
        </Button>

        <Button
          ref={setDateAnchor}
          className="drp-trigger"
          color="inherit"
          startIcon={<DateRangeIcon sx={{ fontSize: 16 }} />}
          onClick={(e) => {
            e.stopPropagation();
            onDatePickerToggle();
          }}
        >
          {dateLabel}
        </Button>
        <MonthRangePicker
          open={datePickerOpen}
          anchorEl={dateAnchor}
          appliedStartIdx={rangeStartIdx}
          appliedEndIdx={rangeEndIdx}
          onClose={onDatePickerClose}
          onApply={(start, end) => {
            onRangeApply(start, end);
            onDatePickerClose();
          }}
          onCancel={() => {
            onDatePickerClose();
          }}
        />
      </Box>
    </Box>
  );
}
