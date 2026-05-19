import { useCallback, useEffect, useMemo, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { ALL_MONTHS } from '@/data/calendarData';

const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  appliedStartIdx: number;
  appliedEndIdx: number;
  onClose: () => void;
  onApply: (startIdx: number, endIdx: number) => void;
  onCancel: () => void;
};

/** 0 = none, 1 = picking end, 2 = range complete */
type PickPhase = 0 | 1 | 2;

function monthIndexForYear(year: number, month1Based: number) {
  return ALL_MONTHS.findIndex((m) => m.year === year && m.month === month1Based);
}

function YearMonthGrid({
  year,
  bounds,
  onMonthClick,
  onMonthHover,
  onMonthHoverOut,
}: {
  year: number;
  bounds: { lo: number; hi: number } | null;
  onMonthClick: (idx: number) => void;
  onMonthHover: (idx: number) => void;
  onMonthHoverOut: () => void;
}) {
  return (
    <Box className="caldr-mgrid">
      {MONTH_ABBR.map((abbr, mi) => {
        const idx = monthIndexForYear(year, mi + 1);
        const inData = idx >= 0;
        const lo = bounds?.lo ?? -1;
        const hi = bounds?.hi ?? -1;
        const inRange = inData && bounds && idx >= lo && idx <= hi;
        const isStart = inRange && idx === lo;
        const isEnd = inRange && idx === hi;
        const isMid = inRange && !isStart && !isEnd;
        const prevInRange = inData && bounds && idx > lo && idx - 1 >= lo;
        const nextInRange = inData && bounds && idx < hi && idx + 1 <= hi;

        const classes = [
          'caldr-cell',
          `col-${mi % 4}`,
          !inData ? 'empty' : '',
          isStart && isEnd ? 'range-start range-end' : '',
          isStart && !isEnd ? 'range-start' : '',
          isEnd && !isStart ? 'range-end' : '',
          isMid ? 'in-range' : '',
          inRange && !prevInRange ? 'edge-left' : '',
          inRange && !nextInRange ? 'edge-right' : '',
        ]
          .filter(Boolean)
          .join(' ');

        if (!inData) {
          return (
            <div key={`${year}-${abbr}`} className={classes} aria-hidden>
              <span className="caldr-cell-bg" />
              <span className="caldr-cell-lbl">{abbr}</span>
            </div>
          );
        }

        return (
          <button
            key={`${year}-${abbr}`}
            type="button"
            className={classes}
            onClick={() => onMonthClick(idx)}
            onMouseEnter={() => onMonthHover(idx)}
            onMouseLeave={onMonthHoverOut}
          >
            <span className="caldr-cell-bg" aria-hidden />
            <span className="caldr-cell-lbl">{abbr}</span>
          </button>
        );
      })}
    </Box>
  );
}

export function MonthRangePicker({
  open,
  anchorEl,
  appliedStartIdx,
  appliedEndIdx,
  onClose,
  onApply,
  onCancel,
}: Props) {
  const [leftYear, setLeftYear] = useState(ALL_MONTHS[appliedStartIdx]?.year ?? 2026);
  const [startIdx, setStartIdx] = useState<number | null>(appliedStartIdx);
  const [endIdx, setEndIdx] = useState<number | null>(appliedEndIdx);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [phase, setPhase] = useState<PickPhase>(2);

  const resetFromApplied = useCallback(() => {
    const lo = Math.min(appliedStartIdx, appliedEndIdx);
    const hi = Math.max(appliedStartIdx, appliedEndIdx);
    setStartIdx(lo);
    setEndIdx(hi);
    setHoverIdx(null);
    setPhase(2);
    setLeftYear(ALL_MONTHS[lo]?.year ?? 2026);
  }, [appliedStartIdx, appliedEndIdx]);

  useEffect(() => {
    if (!open) return;
    resetFromApplied();
  }, [open, resetFromApplied]);

  const bounds = useMemo(() => {
    if (startIdx === null) return null;
    if (phase === 2 && endIdx !== null) {
      return { lo: Math.min(startIdx, endIdx), hi: Math.max(startIdx, endIdx) };
    }
    if (phase === 1) {
      const hover = hoverIdx ?? startIdx;
      return { lo: Math.min(startIdx, hover), hi: Math.max(startIdx, hover) };
    }
    return { lo: startIdx, hi: startIdx };
  }, [startIdx, endIdx, hoverIdx, phase]);

  const handleMonthClick = (idx: number) => {
    if (phase === 1 && startIdx !== null) {
      let end = idx;
      let start = startIdx;
      if (end < start) [start, end] = [end, start];
      setStartIdx(start);
      setEndIdx(end);
      setHoverIdx(null);
      setPhase(2);
      return;
    }
    setStartIdx(idx);
    setEndIdx(null);
    setHoverIdx(null);
    setPhase(1);
  };

  const footerLabel = useMemo(() => {
    if (phase === 0 || startIdx === null) return 'Select a start month';
    const lo = bounds?.lo ?? startIdx;
    const hi = bounds?.hi ?? startIdx;
    const startM = ALL_MONTHS[lo];
    const endM = ALL_MONTHS[hi];
    if (phase === 1) {
      if (startM && endM && lo !== hi) {
        return `${startM.name} – ${endM.name}`;
      }
      return `${startM?.name ?? ''} – ? (select end month)`;
    }
    return `${startM?.name ?? ''} – ${endM?.name ?? ''}`;
  }, [bounds, phase, startIdx]);

  const ready = phase === 2 && startIdx !== null && endIdx !== null;

  return (
    <Popover
      open={open && Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          className: 'caldr-panel drp-dropdown',
          sx: { mt: 0.5, maxWidth: '95vw' },
        },
      }}
    >
      <Paper
        elevation={8}
        className="caldr-panel-inner"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Box className="drp-calendars">
          <Box className="drp-month">
            <Box className="drp-month-hdr caldr-year-hdr">
              <IconButton
                size="small"
                className="drp-nav"
                onClick={() => setLeftYear((y) => y - 1)}
                aria-label="Previous year"
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              <Typography component="span" className="drp-month-title caldr-year-title">
                {leftYear}
              </Typography>
              <span className="caldr-nav-spacer" aria-hidden />
            </Box>
            <YearMonthGrid
              year={leftYear}
              bounds={bounds}
              onMonthClick={handleMonthClick}
              onMonthHover={(idx) => {
                if (phase === 1) setHoverIdx(idx);
              }}
              onMonthHoverOut={() => {
                if (phase === 1) setHoverIdx(null);
              }}
            />
          </Box>

          <Box className="drp-month">
            <Box className="drp-month-hdr caldr-year-hdr">
              <span className="caldr-nav-spacer" aria-hidden />
              <Typography component="span" className="drp-month-title caldr-year-title">
                {leftYear + 1}
              </Typography>
              <IconButton
                size="small"
                className="drp-nav"
                onClick={() => setLeftYear((y) => y + 1)}
                aria-label="Next year"
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>
            <YearMonthGrid
              year={leftYear + 1}
              bounds={bounds}
              onMonthClick={handleMonthClick}
              onMonthHover={(idx) => {
                if (phase === 1) setHoverIdx(idx);
              }}
              onMonthHoverOut={() => {
                if (phase === 1) setHoverIdx(null);
              }}
            />
          </Box>
        </Box>

        <Box className="drp-footer">
          <Typography component="span" className="drp-range-text">
            {footerLabel}
          </Typography>
          <Box className="drp-footer-btns">
            <Button className="drp-cancel" color="inherit" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              className={`drp-apply${ready ? '' : ' is-disabled'}`}
              variant="contained"
              color="primary"
              disabled={!ready}
              onClick={() => {
                if (!ready || startIdx === null || endIdx === null) return;
                onApply(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx));
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Paper>
    </Popover>
  );
}
