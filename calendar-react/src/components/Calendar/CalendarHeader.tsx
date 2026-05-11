import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CheckIcon from '@mui/icons-material/Check';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LockIcon from '@mui/icons-material/Lock';
import type { CalView, CompareMode, CalFilters, CellMetricKey, CellMetricDef, HeatmapType } from './types';

interface CalendarHeaderProps {
  calView: CalView;
  onCalViewChange: (v: CalView) => void;
  onPrev: () => void;
  onNext: () => void;
  rangeLabel: string;
  compareMode: CompareMode;
  onCompareModeChange: (m: CompareMode) => void;
  filters: CalFilters;
  onFiltersChange: (f: CalFilters) => void;
  activeCellMetrics: CellMetricKey[];
  onCellMetricsChange: (keys: CellMetricKey[]) => void;
  metricDefs: CellMetricDef[];
  heatmapType: HeatmapType;
  onHeatmapChange: (t: HeatmapType) => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  bulkSelectMode: boolean;
  onBulkSelectToggle: () => void;
}

const VIEW_OPTIONS: { label: string; value: CalView }[] = [
  { label: '1M', value: 1 },
  { label: '2M', value: 2 },
  { label: '3M', value: 3 },
  { label: '6M', value: 6 },
  { label: '12M', value: 12 },
];

const COMPARE_OPTIONS: { label: string; value: CompareMode }[] = [
  { label: 'None', value: 'none' },
  { label: 'vs LY', value: 'ly' },
  { label: 'vs STLY', value: 'stly' },
  { label: 'vs Forecast', value: 'fcst' },
  { label: 'vs Budget', value: 'budget' },
];

const HEATMAP_TYPES: { label: string; value: HeatmapType }[] = [
  { label: 'None', value: 'none' },
  { label: 'Hotel Occupancy', value: 'hotel-occ' },
  { label: 'TO Occupancy', value: 'seg-occ' },
  { label: 'Remaining Rooms', value: 'remaining' },
  { label: 'Stop Sales', value: 'stop-sales' },
];

const TO_OPTIONS = [
  { label: 'All Operators', value: 'all' },
  { label: 'Sunwing', value: 'sunwing' },
  { label: 'TUI', value: 'tui' },
  { label: 'Thomas Cook', value: 'thomas-cook' },
  { label: 'Club Med', value: 'club-med' },
  { label: 'Jet2holidays', value: 'jet2' },
];

const ROOM_OPTIONS = [
  { label: 'All Rooms', value: 'all' },
  { label: 'Standard', value: 'standard' },
  { label: 'Superior', value: 'superior' },
  { label: 'Deluxe', value: 'deluxe' },
  { label: 'Suite', value: 'suite' },
];

const BOARD_OPTIONS = [
  { label: 'All Plans', value: 'all' },
  { label: 'All Inclusive', value: 'ai' },
  { label: 'Half Board', value: 'hb' },
  { label: 'Bed & Breakfast', value: 'bb' },
  { label: 'Room Only', value: 'ro' },
];

const MARKET_OPTIONS = [
  { label: 'All Origins', value: 'all' },
  { label: 'UK', value: 'UK' },
  { label: 'Spain', value: 'SP' },
  { label: 'US', value: 'US' },
  { label: 'Mexico', value: 'MX' },
];

export default function CalendarHeader({
  calView, onCalViewChange, onPrev, onNext, rangeLabel,
  compareMode, onCompareModeChange, filters, onFiltersChange,
  activeCellMetrics, onCellMetricsChange, metricDefs,
  heatmapType, onHeatmapChange, darkMode, onDarkModeToggle,
  bulkSelectMode, onBulkSelectToggle,
}: CalendarHeaderProps) {
  const [cmpAnchor, setCmpAnchor] = useState<null | HTMLElement>(null);
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [hmAnchor, setHmAnchor] = useState<null | HTMLElement>(null);
  const [metricsAnchor, setMetricsAnchor] = useState<null | HTMLElement>(null);
  const [draftFilters, setDraftFilters] = useState<CalFilters>(filters);

  const hasActiveFilter = filters.to !== 'all' || filters.room !== 'all' || filters.board !== 'all' || filters.market !== 'all';
  const activeFilterCount = [filters.to, filters.room, filters.board, filters.market].filter(v => v !== 'all').length;

  function toggleMetric(key: CellMetricKey) {
    const idx = activeCellMetrics.indexOf(key);
    if (idx >= 0) {
      onCellMetricsChange(activeCellMetrics.filter(k => k !== key));
    } else if (activeCellMetrics.length < 4) {
      onCellMetricsChange([...activeCellMetrics, key]);
    }
  }

  function applyFilters() {
    onFiltersChange(draftFilters);
    setFilterAnchor(null);
  }

  function resetFilters() {
    const reset: CalFilters = { to: 'all', room: 'all', board: 'all', market: 'all', pickup: [1, 3, 7] };
    setDraftFilters(reset);
    onFiltersChange(reset);
    setFilterAnchor(null);
  }

  const btnSx = {
    fontFamily: 'Lato, sans-serif',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'none' as const,
    color: 'var(--text-secondary)',
    borderColor: 'var(--border)',
    '&:hover': { borderColor: 'var(--border-strong)', background: 'var(--surface-3)' },
  };

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 bg-[var(--surface-1)] border-b border-[var(--border)] flex-wrap"
      style={{ position: 'sticky', top: 0, zIndex: 20 }}
    >
      {/* Title */}
      <span className="text-[15px] font-semibold text-[var(--text-primary)] mr-2 shrink-0">
        Calendar
      </span>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'var(--border)' }} />

      {/* View selector */}
      <div className="flex items-center gap-1 shrink-0">
        {VIEW_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onCalViewChange(opt.value)}
            className={[
              'px-2 py-1 rounded text-[11px] font-semibold transition-colors',
              calView === opt.value
                ? 'bg-[var(--accent)] text-white'
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-3)]',
            ].join(' ')}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'var(--border)' }} />

      {/* Date nav */}
      <div className="flex items-center gap-1 shrink-0">
        <IconButton size="small" onClick={onPrev} sx={{ color: 'var(--text-secondary)' }}>
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>
        <span className="text-[12px] font-medium text-[var(--text-primary)] min-w-[120px] text-center">
          {rangeLabel}
        </span>
        <IconButton size="small" onClick={onNext} sx={{ color: 'var(--text-secondary)' }}>
          <NavigateNextIcon fontSize="small" />
        </IconButton>
      </div>

      <div className="flex-1" />

      {/* Compare */}
      <Button
        variant="outlined"
        size="small"
        onClick={e => setCmpAnchor(e.currentTarget)}
        sx={{ ...btnSx, minWidth: 80 }}
        endIcon={<span style={{ fontSize: 9 }}>▾</span>}
      >
        {compareMode === 'none' ? 'Compare' : COMPARE_OPTIONS.find(o => o.value === compareMode)?.label}
      </Button>
      <Menu anchorEl={cmpAnchor} open={!!cmpAnchor} onClose={() => setCmpAnchor(null)}>
        {COMPARE_OPTIONS.map(opt => (
          <MenuItem
            key={opt.value}
            selected={compareMode === opt.value}
            onClick={() => { onCompareModeChange(opt.value); setCmpAnchor(null); }}
            sx={{ fontSize: 13, fontFamily: 'Lato, sans-serif' }}
          >
            {compareMode === opt.value && <CheckIcon sx={{ fontSize: 14, mr: 1, color: 'var(--accent)' }} />}
            {opt.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Filters */}
      <Tooltip title="Filters">
        <Button
          variant="outlined"
          size="small"
          startIcon={<FilterListIcon sx={{ fontSize: 15 }} />}
          onClick={e => { setDraftFilters(filters); setFilterAnchor(e.currentTarget); }}
          sx={{
            ...btnSx,
            ...(hasActiveFilter ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}),
          }}
        >
          Filters
          {activeFilterCount > 0 && (
            <Chip label={activeFilterCount} size="small" sx={{ ml: 0.5, height: 16, fontSize: 10, background: 'var(--accent)', color: '#fff' }} />
          )}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={filterAnchor}
        open={!!filterAnchor}
        onClose={() => setFilterAnchor(null)}
        slotProps={{ paper: { sx: { width: 260, p: 1 } } }}
      >
        <FilterGroup label="OPERATOR" options={TO_OPTIONS} value={draftFilters.to} onChange={v => setDraftFilters(f => ({ ...f, to: v as CalFilters['to'] }))} />
        <Divider sx={{ my: 1 }} />
        <FilterGroup label="ROOM TYPE" options={ROOM_OPTIONS} value={draftFilters.room} onChange={v => setDraftFilters(f => ({ ...f, room: v as CalFilters['room'] }))} />
        <Divider sx={{ my: 1 }} />
        <FilterGroup label="MEAL PLAN" options={BOARD_OPTIONS} value={draftFilters.board} onChange={v => setDraftFilters(f => ({ ...f, board: v as CalFilters['board'] }))} />
        <Divider sx={{ my: 1 }} />
        <FilterGroup label="SOURCE GEO" options={MARKET_OPTIONS} value={draftFilters.market} onChange={v => setDraftFilters(f => ({ ...f, market: v as CalFilters['market'] }))} />
        <Divider sx={{ my: 1 }} />
        <div className="flex gap-2 px-1 pt-1">
          <Button size="small" onClick={resetFilters} sx={{ fontSize: 12, textTransform: 'none', fontFamily: 'Lato, sans-serif' }}>Reset</Button>
          <Button size="small" variant="contained" onClick={applyFilters} sx={{ fontSize: 12, textTransform: 'none', fontFamily: 'Lato, sans-serif', background: 'var(--accent)', flex: 1 }}>Apply</Button>
        </div>
      </Menu>

      {/* Heatmap */}
      <Tooltip title="Heatmap">
        <Button
          variant="outlined"
          size="small"
          startIcon={<GridViewIcon sx={{ fontSize: 15 }} />}
          onClick={e => setHmAnchor(e.currentTarget)}
          sx={{
            ...btnSx,
            ...(heatmapType !== 'none' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}),
          }}
        >
          Heatmap
        </Button>
      </Tooltip>
      <Menu anchorEl={hmAnchor} open={!!hmAnchor} onClose={() => setHmAnchor(null)}>
        {HEATMAP_TYPES.map(opt => (
          <MenuItem
            key={opt.value}
            selected={heatmapType === opt.value}
            onClick={() => { onHeatmapChange(opt.value); setHmAnchor(null); }}
            sx={{ fontSize: 13, fontFamily: 'Lato, sans-serif' }}
          >
            {heatmapType === opt.value && <CheckIcon sx={{ fontSize: 14, mr: 1, color: 'var(--accent)' }} />}
            {opt.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Cell Metrics */}
      <Button
        variant="outlined"
        size="small"
        onClick={e => setMetricsAnchor(e.currentTarget)}
        sx={{ ...btnSx, minWidth: 90 }}
      >
        Cell Metrics
        <Chip label={activeCellMetrics.length} size="small" sx={{ ml: 0.5, height: 16, fontSize: 10, background: 'var(--surface-3)' }} />
      </Button>
      <Menu
        anchorEl={metricsAnchor}
        open={!!metricsAnchor}
        onClose={() => setMetricsAnchor(null)}
        slotProps={{ paper: { sx: { width: 280, p: 1 } } }}
      >
        <div className="px-2 pt-1 pb-2 text-[11px] text-[var(--text-muted)] font-semibold">
          Select up to 4 metrics
        </div>
        {metricDefs.map(def => {
          const active = activeCellMetrics.includes(def.key);
          const disabled = !active && activeCellMetrics.length >= 4;
          return (
            <MenuItem
              key={def.key}
              onClick={() => !disabled && toggleMetric(def.key)}
              disabled={disabled}
              sx={{ fontSize: 13, fontFamily: 'Lato, sans-serif', py: 0.5 }}
            >
              <span
                className="w-[14px] h-[14px] rounded mr-2 border flex items-center justify-center shrink-0"
                style={{
                  background: active ? 'var(--accent)' : 'transparent',
                  borderColor: active ? 'var(--accent)' : 'var(--border-strong)',
                }}
              >
                {active && <CheckIcon sx={{ fontSize: 10, color: '#fff' }} />}
              </span>
              <span className="flex-1">{def.label}</span>
              <span className="text-[10px] text-[var(--text-muted)] ml-1 capitalize">{def.type}</span>
            </MenuItem>
          );
        })}
      </Menu>

      {/* Close-out / Bulk Select */}
      <Button
        variant={bulkSelectMode ? 'contained' : 'outlined'}
        size="small"
        startIcon={<LockIcon sx={{ fontSize: 14 }} />}
        onClick={onBulkSelectToggle}
        sx={{
          ...btnSx,
          ...(bulkSelectMode ? { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' } : {}),
        }}
      >
        {bulkSelectMode ? 'Cancel' : 'Close Out'}
      </Button>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'var(--border)' }} />

      {/* Dark mode toggle */}
      <IconButton size="small" onClick={onDarkModeToggle} sx={{ color: 'var(--text-secondary)' }}>
        {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
      </IconButton>
    </div>
  );
}

function FilterGroup({
  label, options, value, onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="px-1">
      <div className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">{label}</div>
      {options.map(opt => (
        <MenuItem
          key={opt.value}
          selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          sx={{ fontSize: 12, fontFamily: 'Lato, sans-serif', py: 0.25, minHeight: 28, borderRadius: 1 }}
        >
          {value === opt.value && <CheckIcon sx={{ fontSize: 12, mr: 1, color: 'var(--accent)' }} />}
          {value !== opt.value && <span style={{ width: 20 }} />}
          {opt.label}
        </MenuItem>
      ))}
    </div>
  );
}
