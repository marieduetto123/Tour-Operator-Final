import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CheckIcon from '@mui/icons-material/Check';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LockIcon from '@mui/icons-material/Lock';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
  { label: 'None',        value: 'none'   },
  { label: 'vs LY',       value: 'ly'     },
  { label: 'vs STLY',     value: 'stly'   },
  { label: 'vs Forecast', value: 'fcst'   },
  { label: 'vs Budget',   value: 'budget' },
];

const HEATMAP_TYPES: { label: string; value: HeatmapType }[] = [
  { label: 'None',             value: 'none'       },
  { label: 'Hotel Occupancy',  value: 'hotel-occ'  },
  { label: 'TO Occupancy',     value: 'seg-occ'    },
  { label: 'Remaining Rooms',  value: 'remaining'  },
  { label: 'Stop Sales',       value: 'stop-sales' },
];

const TO_OPTIONS      = [{ label: 'All Operators', value: 'all' }, { label: 'Sunwing', value: 'sunwing' }, { label: 'TUI', value: 'tui' }, { label: 'Thomas Cook', value: 'thomas-cook' }, { label: 'Club Med', value: 'club-med' }, { label: 'Jet2holidays', value: 'jet2' }];
const ROOM_OPTIONS    = [{ label: 'All Rooms', value: 'all' }, { label: 'Standard', value: 'standard' }, { label: 'Superior', value: 'superior' }, { label: 'Deluxe', value: 'deluxe' }, { label: 'Suite', value: 'suite' }];
const BOARD_OPTIONS   = [{ label: 'All Plans', value: 'all' }, { label: 'All Inclusive', value: 'ai' }, { label: 'Half Board', value: 'hb' }, { label: 'Bed & Breakfast', value: 'bb' }, { label: 'Room Only', value: 'ro' }];
const MARKET_OPTIONS  = [{ label: 'All Origins', value: 'all' }, { label: 'UK', value: 'UK' }, { label: 'Spain', value: 'SP' }, { label: 'US', value: 'US' }, { label: 'Mexico', value: 'MX' }];

export default function CalendarHeader({
  calView, onCalViewChange, onPrev, onNext, rangeLabel,
  compareMode, onCompareModeChange, filters, onFiltersChange,
  activeCellMetrics, onCellMetricsChange, metricDefs,
  heatmapType, onHeatmapChange, darkMode, onDarkModeToggle,
  bulkSelectMode, onBulkSelectToggle,
}: CalendarHeaderProps) {
  const [cmpAnchor,     setCmpAnchor]     = useState<null | HTMLElement>(null);
  const [filterAnchor,  setFilterAnchor]  = useState<null | HTMLElement>(null);
  const [hmAnchor,      setHmAnchor]      = useState<null | HTMLElement>(null);
  const [metricsAnchor, setMetricsAnchor] = useState<null | HTMLElement>(null);
  const [draftFilters,  setDraftFilters]  = useState<CalFilters>(filters);

  const activeFilterCount = [filters.to, filters.room, filters.board, filters.market].filter(v => v !== 'all').length;
  const heatmapActive     = heatmapType !== 'none';
  const compareActive     = compareMode !== 'none';

  function toggleMetric(key: CellMetricKey) {
    const idx = activeCellMetrics.indexOf(key);
    if (idx >= 0) {
      onCellMetricsChange(activeCellMetrics.filter(k => k !== key));
    } else if (activeCellMetrics.length < 4) {
      onCellMetricsChange([...activeCellMetrics, key]);
    }
  }

  function applyFilters() { onFiltersChange(draftFilters); setFilterAnchor(null); }
  function resetFilters()  {
    const r: CalFilters = { to: 'all', room: 'all', board: 'all', market: 'all', pickup: [1, 3, 7] };
    setDraftFilters(r); onFiltersChange(r); setFilterAnchor(null);
  }

  /* ── Shared text-button style (matches .cal-hdr-btn) ── */
  const textBtnSx = {
    height: 36,
    px: '14px',
    borderRadius: '4px',
    fontSize: 13,
    fontWeight: 400,
    color: 'var(--text-secondary)',
    '&:hover': { background: 'var(--surface-3)', color: 'var(--text-primary)' },
  };

  /* ── Active text-button (heatmap/compare engaged) ── */
  const activeTextBtnSx = {
    ...textBtnSx,
    color: 'var(--accent)',
    '&:hover': { background: 'var(--accent-bg)', color: 'var(--accent)' },
  };

  return (
    /* Section card header — matches .section-header / .cal-header */
    <div
      className="flex items-center gap-1 px-4 bg-[var(--surface-1)] border-b border-[var(--border)] flex-wrap"
      style={{ minHeight: 52, position: 'sticky', top: 0, zIndex: 20 }}
    >
      {/* Title — matches .section-title */}
      <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--text-secondary)', marginRight: 8 }}>
        Calendar
      </span>

      <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border)', my: '10px' }} />

      {/* View segmented control — matches .cal-metric-tabs segmented pill */}
      <div
        style={{
          display: 'flex',
          border: '1px solid var(--accent)',
          borderRadius: 4,
          overflow: 'hidden',
          height: 36,
        }}
      >
        {VIEW_OPTIONS.map((opt, i) => (
          <button
            key={opt.value}
            onClick={() => onCalViewChange(opt.value)}
            style={{
              width: 42,
              height: 36,
              border: 'none',
              borderRight: i < VIEW_OPTIONS.length - 1 ? '1px solid var(--accent)' : 'none',
              background: calView === opt.value ? 'var(--accent)' : 'var(--surface-1)',
              color: calView === opt.value
                ? (darkMode ? '#0E2124' : '#fff')
                : 'var(--accent)',
              fontSize: 12,
              fontWeight: 700,
              fontFamily: 'Lato, sans-serif',
              cursor: 'pointer',
              transition: 'background .12s, color .12s',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border)', my: '10px', mx: '4px' }} />

      {/* Date navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton size="small" onClick={onPrev}
          sx={{ color: 'var(--text-secondary)', '&:hover': { background: 'var(--surface-3)' } }}>
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', minWidth: 130, textAlign: 'center' }}>
          {rangeLabel}
        </span>
        <IconButton size="small" onClick={onNext}
          sx={{ color: 'var(--text-secondary)', '&:hover': { background: 'var(--surface-3)' } }}>
          <NavigateNextIcon fontSize="small" />
        </IconButton>
      </div>

      <div style={{ flex: 1 }} />

      {/* Compare — text button, active when engaged */}
      <Button
        variant="text"
        size="small"
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '16px !important' }} />}
        onClick={e => setCmpAnchor(e.currentTarget)}
        sx={compareActive ? activeTextBtnSx : textBtnSx}
      >
        {compareActive ? COMPARE_OPTIONS.find(o => o.value === compareMode)?.label : 'Compare'}
      </Button>
      <Menu anchorEl={cmpAnchor} open={!!cmpAnchor} onClose={() => setCmpAnchor(null)}>
        {COMPARE_OPTIONS.map(opt => (
          <MenuItem key={opt.value} selected={compareMode === opt.value}
            onClick={() => { onCompareModeChange(opt.value); setCmpAnchor(null); }}>
            {compareMode === opt.value
              ? <CheckIcon sx={{ fontSize: 14, mr: 1, color: 'var(--accent)' }} />
              : <span style={{ width: 22, display: 'inline-block' }} />}
            {opt.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Filters — text button, badge when active */}
      <Tooltip title="Filters">
        <Button
          variant="text"
          size="small"
          startIcon={<FilterListIcon sx={{ fontSize: '16px !important' }} />}
          onClick={e => { setDraftFilters(filters); setFilterAnchor(e.currentTarget); }}
          sx={activeFilterCount > 0 ? activeTextBtnSx : textBtnSx}
        >
          Filters
          {activeFilterCount > 0 && (
            <span style={{
              marginLeft: 5, minWidth: 16, height: 16, borderRadius: 8,
              background: 'var(--accent)', color: darkMode ? '#0E2124' : '#fff',
              fontSize: 10, fontWeight: 700, display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center', padding: '0 4px',
            }}>
              {activeFilterCount}
            </span>
          )}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={filterAnchor}
        open={!!filterAnchor}
        onClose={() => setFilterAnchor(null)}
        slotProps={{ paper: { sx: { width: 260, p: '8px 0' } } }}
      >
        <FilterGroup label="OPERATOR"   options={TO_OPTIONS}    value={draftFilters.to}     onChange={v => setDraftFilters(f => ({ ...f, to:     v as CalFilters['to']     }))} />
        <Divider sx={{ my: '6px', borderColor: 'var(--border-sub)' }} />
        <FilterGroup label="ROOM TYPE"  options={ROOM_OPTIONS}  value={draftFilters.room}   onChange={v => setDraftFilters(f => ({ ...f, room:   v as CalFilters['room']   }))} />
        <Divider sx={{ my: '6px', borderColor: 'var(--border-sub)' }} />
        <FilterGroup label="MEAL PLAN"  options={BOARD_OPTIONS} value={draftFilters.board}  onChange={v => setDraftFilters(f => ({ ...f, board:  v as CalFilters['board']  }))} />
        <Divider sx={{ my: '6px', borderColor: 'var(--border-sub)' }} />
        <FilterGroup label="SOURCE GEO" options={MARKET_OPTIONS} value={draftFilters.market} onChange={v => setDraftFilters(f => ({ ...f, market: v as CalFilters['market'] }))} />
        <Divider sx={{ my: '6px', borderColor: 'var(--border-sub)' }} />
        <div style={{ display: 'flex', gap: 8, padding: '4px 12px 8px' }}>
          {/* Cancel — outlined primary per DS */}
          <Button variant="outlined" color="primary" size="small" onClick={resetFilters} sx={{ flex: 1 }}>
            Reset
          </Button>
          {/* Apply — contained primary per DS */}
          <Button variant="contained" color="primary" size="small" onClick={applyFilters} sx={{ flex: 1 }}>
            Apply
          </Button>
        </div>
      </Menu>

      {/* Heatmap — text button, active when type selected */}
      <Tooltip title="Heatmap">
        <Button
          variant="text"
          size="small"
          startIcon={<GridViewIcon sx={{ fontSize: '16px !important' }} />}
          onClick={e => setHmAnchor(e.currentTarget)}
          sx={heatmapActive ? activeTextBtnSx : textBtnSx}
        >
          Heatmap
        </Button>
      </Tooltip>
      <Menu anchorEl={hmAnchor} open={!!hmAnchor} onClose={() => setHmAnchor(null)}>
        {HEATMAP_TYPES.map(opt => (
          <MenuItem key={opt.value} selected={heatmapType === opt.value}
            onClick={() => { onHeatmapChange(opt.value); setHmAnchor(null); }}>
            {heatmapType === opt.value
              ? <CheckIcon sx={{ fontSize: 14, mr: 1, color: 'var(--accent)' }} />
              : <span style={{ width: 22, display: 'inline-block' }} />}
            {opt.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Cell Metrics — text button */}
      <Button
        variant="text"
        size="small"
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '16px !important' }} />}
        onClick={e => setMetricsAnchor(e.currentTarget)}
        sx={textBtnSx}
      >
        Cell Metrics
        <span style={{
          marginLeft: 5, minWidth: 16, height: 16, borderRadius: 8,
          background: 'var(--surface-3)', color: 'var(--text-secondary)',
          fontSize: 10, fontWeight: 700, display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center', padding: '0 4px',
        }}>
          {activeCellMetrics.length}
        </span>
      </Button>
      <Menu
        anchorEl={metricsAnchor}
        open={!!metricsAnchor}
        onClose={() => setMetricsAnchor(null)}
        slotProps={{ paper: { sx: { width: 280, p: '8px 0' } } }}
      >
        <div style={{ padding: '4px 12px 8px', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Select up to 4 metrics
        </div>
        {metricDefs.map(def => {
          const active   = activeCellMetrics.includes(def.key);
          const disabled = !active && activeCellMetrics.length >= 4;
          return (
            <MenuItem key={def.key} disabled={disabled}
              onClick={() => !disabled && toggleMetric(def.key)}
              sx={{ py: '4px', minHeight: 32 }}
            >
              <span style={{
                width: 14, height: 14, borderRadius: 2, marginRight: 8, flexShrink: 0,
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
                background: active ? 'var(--accent)' : 'transparent',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {active && <CheckIcon sx={{ fontSize: 10, color: '#fff' }} />}
              </span>
              <span style={{ flex: 1, fontSize: 13 }}>{def.label}</span>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 4, textTransform: 'capitalize' }}>{def.type}</span>
            </MenuItem>
          );
        })}
      </Menu>

      <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border)', my: '10px', mx: '4px' }} />

      {/* Close Out — outlined primary (inactive) / contained primary (active) per DS */}
      <Button
        variant={bulkSelectMode ? 'contained' : 'outlined'}
        color="primary"
        size="small"
        startIcon={<LockIcon sx={{ fontSize: '14px !important' }} />}
        onClick={onBulkSelectToggle}
      >
        {bulkSelectMode ? 'Cancel' : 'Close Out'}
      </Button>

      {/* Dark mode — icon button */}
      <IconButton size="small" onClick={onDarkModeToggle}
        sx={{ ml: '2px', color: 'var(--text-secondary)', '&:hover': { background: 'var(--surface-3)' } }}>
        {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
      </IconButton>
    </div>
  );
}

/* ── Filter radio group ── */
function FilterGroup({ label, options, value, onChange }: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ padding: '0 4px' }}>
      <div style={{ padding: '2px 8px 4px', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </div>
      {options.map(opt => (
        <MenuItem key={opt.value} selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          sx={{ fontSize: 13, py: '3px', minHeight: 30, borderRadius: '4px' }}
        >
          {value === opt.value
            ? <CheckIcon sx={{ fontSize: 12, mr: 1, color: 'var(--accent)', flexShrink: 0 }} />
            : <span style={{ width: 20, display: 'inline-block', flexShrink: 0 }} />}
          {opt.label}
        </MenuItem>
      ))}
    </div>
  );
}
