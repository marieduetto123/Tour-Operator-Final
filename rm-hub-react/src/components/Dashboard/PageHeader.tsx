import { useState } from 'react';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import Popover from '@mui/material/Popover';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import Button from 'components/Button/Button';
import { format } from 'date-fns';

type Props = { title: string };

export default function PageHeader({ title }: Props) {
  const [search, setSearch] = useState('');
  const [start, setStart] = useState<Date>(new Date(2025, 6, 17));
  const [end, setEnd] = useState<Date>(new Date(2025, 6, 25));
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [draftStart, setDraftStart] = useState<Date>(start);
  const [draftEnd, setDraftEnd] = useState<Date>(end);

  const label = `${format(start, 'MM/dd/yyyy')} – ${format(end, 'MM/dd/yyyy')}`;

  const onApply = () => {
    setStart(draftStart);
    setEnd(draftEnd);
    setAnchor(null);
  };

  return (
    <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
      <Typography variant="h1">{title}</Typography>
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1.5 px-2.5"
          style={{
            minWidth: 220,
            height: 36,
            background: 'var(--surface-1)',
            border: '1px solid var(--border)',
            borderRadius: 6,
          }}
        >
          <SearchIcon sx={{ fontSize: 18, color: '#AEB4BA' }} />
          <InputBase
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            sx={{ fontSize: 13, flex: 1 }}
          />
          {search && (
            <IconButton size="small" onClick={() => setSearch('')} aria-label="Clear">
              <CloseIcon sx={{ fontSize: 18, color: '#6B7280' }} />
            </IconButton>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            setDraftStart(start);
            setDraftEnd(end);
            setAnchor(e.currentTarget);
          }}
          className="flex items-center gap-2 px-3 cursor-pointer"
          style={{
            height: 36,
            background: 'var(--surface-1)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            color: 'var(--text-primary)',
            fontSize: 13,
          }}
        >
          <CalendarTodayIcon sx={{ fontSize: 18 }} />
          <span>{label}</span>
        </button>
        <Popover
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <div className="p-3">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="flex gap-4">
                <DateCalendar value={draftStart} onChange={(d) => d && setDraftStart(d)} />
                <DateCalendar value={draftEnd} onChange={(d) => d && setDraftEnd(d)} />
              </div>
            </LocalizationProvider>
            <div className="flex items-center justify-between mt-2 px-2">
              <Typography variant="body2">
                {format(draftStart, 'MM/dd/yyyy')} – {format(draftEnd, 'MM/dd/yyyy')}
              </Typography>
              <div className="flex items-center gap-2">
                <Button variant="outlined" color="primary" size="small" onClick={() => setAnchor(null)}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" size="small" onClick={onApply}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
}
