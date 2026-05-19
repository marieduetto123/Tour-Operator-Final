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

const DOW = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

type DayPoint = { year: number; month: number; day: number };

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  appliedStartIdx: number;
  appliedEndIdx: number;
  onClose: () => void;
  onApply: (startIdx: number, endIdx: number) => void;
  onCancel: () => void;
};

function dayTimestamp(p: DayPoint) {
  return new Date(p.year, p.month - 1, p.day).getTime();
}

function sameDay(a: DayPoint, b: DayPoint) {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

function monthIndexFor(p: DayPoint) {
  return ALL_MONTHS.findIndex((m) => m.year === p.year && m.month === p.month);
}

function formatDay(p: DayPoint) {
  return `${p.month}/${p.day}/${p.year}`;
}

function dayFromMonthMeta(m: (typeof ALL_MONTHS)[number], day: number): DayPoint {
  return { year: m.year, month: m.month, day };
}

function MonthDayGrid({
  meta,
  from,
  to,
  hover,
  pickingEnd,
  onDayClick,
  onDayHover,
  onDayHoverOut,
}: {
  meta: (typeof ALL_MONTHS)[number];
  from: DayPoint | null;
  to: DayPoint | null;
  hover: DayPoint | null;
  pickingEnd: boolean;
  onDayClick: (p: DayPoint) => void;
  onDayHover: (p: DayPoint) => void;
  onDayHoverOut: () => void;
}) {
  const pad = (meta.firstDay + 6) % 7;
  const rangeEnd = pickingEnd ? hover : to;

  const dayClass = (day: number) => {
    const p = dayFromMonthMeta(meta, day);
    const classes = ['caldr-day'];

    if (from) {
      if (sameDay(p, from)) classes.push('caldr-start');
      if (rangeEnd && sameDay(p, rangeEnd)) classes.push('caldr-end');

      if (rangeEnd && !sameDay(from, rangeEnd)) {
        const lo = Math.min(dayTimestamp(from), dayTimestamp(rangeEnd));
        const hi = Math.max(dayTimestamp(from), dayTimestamp(rangeEnd));
        const ts = dayTimestamp(p);
        if (ts >= lo && ts <= hi) classes.push('caldr-in-range');
      }
    }

    return classes.join(' ');
  };

  return (
    <Box className="drp-month drp-month--days">
      <Box className="caldr-dow-row">
        {DOW.map((label, i) => (
          <span key={`${meta.month}-dow-${i}`} className="caldr-dow">
            {label}
          </span>
        ))}
      </Box>
      <Box className="drp-days" onMouseLeave={onDayHoverOut}>
        {Array.from({ length: pad }, (_, i) => (
          <span key={`pad-${i}`} className="caldr-day caldr-empty" />
        ))}
        {Array.from({ length: meta.days }, (_, i) => {
          const day = i + 1;
          const p = dayFromMonthMeta(meta, day);
          return (
            <button
              key={day}
              type="button"
              className={dayClass(day)}
              onClick={() => onDayClick(p)}
              onMouseEnter={() => onDayHover(p)}
            >
              {day}
            </button>
          );
        })}
      </Box>
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
  const [viewIdx, setViewIdx] = useState(appliedStartIdx);
  const [from, setFrom] = useState<DayPoint | null>(null);
  const [to, setTo] = useState<DayPoint | null>(null);
  const [hover, setHover] = useState<DayPoint | null>(null);
  const [pickingEnd, setPickingEnd] = useState(false);

  const resetFromApplied = useCallback(() => {
    const startM = ALL_MONTHS[appliedStartIdx];
    const endM = ALL_MONTHS[appliedEndIdx];
    if (startM && endM) {
      setFrom(dayFromMonthMeta(startM, 1));
      setTo(dayFromMonthMeta(endM, endM.days));
    } else {
      setFrom(null);
      setTo(null);
    }
    setHover(null);
    setPickingEnd(false);
    setViewIdx(appliedStartIdx);
  }, [appliedStartIdx, appliedEndIdx]);

  useEffect(() => {
    if (!open) return;
    resetFromApplied();
  }, [open, resetFromApplied]);

  const leftMonth = ALL_MONTHS[viewIdx];
  const rightMonth = ALL_MONTHS[viewIdx + 1];

  const handleDayClick = (p: DayPoint) => {
    if (!pickingEnd || !from) {
      setFrom(p);
      setTo(null);
      setHover(null);
      setPickingEnd(true);
      return;
    }

    let start = from;
    let end = p;
    if (dayTimestamp(end) < dayTimestamp(start)) {
      [start, end] = [end, start];
    }
    setFrom(start);
    setTo(end);
    setHover(null);
    setPickingEnd(false);
  };

  const shiftView = (delta: number) => {
    setViewIdx((i) => Math.max(0, Math.min(i + delta, ALL_MONTHS.length - 2)));
  };

  const ready = Boolean(from && to && !pickingEnd);

  const footerLabel = useMemo(() => {
    if (!from) return 'Select start date';
    const rangeEnd = pickingEnd ? hover : to;
    if (!rangeEnd) return `${formatDay(from)} – … (select end date)`;
    return `${formatDay(from)} – ${formatDay(rangeEnd)}`;
  }, [from, to, hover, pickingEnd]);

  if (!leftMonth) return null;

  return (
    <Popover
      open={open && Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          className: 'caldr-panel drp-dropdown drp-dropdown--day-range',
          sx: { mt: 0.5, maxWidth: '95vw' },
        },
      }}
    >
      <Paper
        elevation={8}
        className="caldr-panel-inner"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Box className="drp-day-nav-row">
          <IconButton size="small" onClick={() => shiftView(-1)} aria-label="Previous month">
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <Typography component="span" className="drp-day-nav-title">
            {leftMonth.name}
          </Typography>
          {rightMonth ? (
            <Typography component="span" className="drp-day-nav-title">
              {rightMonth.name}
            </Typography>
          ) : (
            <span className="drp-day-nav-title drp-day-nav-title--spacer" aria-hidden />
          )}
          <IconButton size="small" onClick={() => shiftView(1)} aria-label="Next month">
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box className="drp-calendars drp-calendars--days">
          <MonthDayGrid
            meta={leftMonth}
            from={from}
            to={to}
            hover={hover}
            pickingEnd={pickingEnd}
            onDayClick={handleDayClick}
            onDayHover={(p) => {
              if (pickingEnd) setHover(p);
            }}
            onDayHoverOut={() => setHover(null)}
          />
          {rightMonth ? (
            <MonthDayGrid
              meta={rightMonth}
              from={from}
              to={to}
              hover={hover}
              pickingEnd={pickingEnd}
              onDayClick={handleDayClick}
              onDayHover={(p) => {
                if (pickingEnd) setHover(p);
              }}
              onDayHoverOut={() => setHover(null)}
            />
          ) : null}
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
              className="drp-apply"
              variant="contained"
              color="primary"
              disabled={!ready}
              onClick={() => {
                if (!ready || !from || !to) return;
                const lo = monthIndexFor(from);
                const hi = monthIndexFor(to);
                if (lo < 0 || hi < 0) return;
                onApply(Math.min(lo, hi), Math.max(lo, hi));
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
