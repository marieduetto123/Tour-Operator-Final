import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCalendar } from '@/context/CalendarContext';
import { dayKey } from '@/lib/calendar/metrics';

type CloseType = 'full' | 'los' | 'reopen';

type DateRange = { id: number; from: string; to: string };

const OPERATORS = ['TUI Group', 'Thomas Cook', 'Sunwing', 'Club Med', 'Jet2 Holidays'];
const ROOM_TYPES = ['Standard Double', 'Superior Double', 'Junior Suite', 'Suite', 'Deluxe Ocean View'];
const BOARD_TYPES = ['All Inclusive', 'Full Board', 'Half Board', 'Bed & Breakfast', 'Room Only'];

let rangeId = 0;

function parseIsoRange(from: string, to: string): string[] {
  if (!from || !to) return [];
  const start = new Date(from);
  const end = new Date(to);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];
  const keys: string[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    keys.push(
      `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`,
    );
    cur.setDate(cur.getDate() + 1);
  }
  return keys;
}

function isoToKey(iso: string) {
  const [, m, d] = iso.split('-').map(Number);
  return dayKey(m, d);
}

type Props = {
  open: boolean;
  selectedDays: Set<string>;
  onClose: () => void;
};

export function CloseOutModal({ open, selectedDays, onClose }: Props) {
  const { lockDay, unlockDay, setPartial, setCloseOutOpen } = useCalendar();
  const [closeType, setCloseType] = useState<CloseType>('full');
  const [minNights, setMinNights] = useState(3);
  const [ranges, setRanges] = useState<DateRange[]>([
    { id: ++rangeId, from: '2026-03-01', to: '2026-03-07' },
  ]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendAction, setSendAction] = useState<'email' | 'internal' | 'both'>('email');

  const addRange = () => {
    setRanges((r) => [...r, { id: ++rangeId, from: '', to: '' }]);
  };

  const removeRange = (id: number) => {
    setRanges((r) => r.filter((x) => x.id !== id));
  };

  const updateRange = (id: number, field: 'from' | 'to', val: string) => {
    setRanges((r) => r.map((x) => (x.id === id ? { ...x, [field]: val } : x)));
  };

  const handleConfirm = () => {
    const keysFromRanges = ranges.flatMap((r) => parseIsoRange(r.from, r.to).map(isoToKey));
    const keysFromSelection = [...selectedDays].map((iso) => {
      const [, m, d] = iso.split('-').map(Number);
      return dayKey(m, d);
    });
    const keys = new Set([...keysFromRanges, ...keysFromSelection]);

    keys.forEach((key) => {
      if (closeType === 'reopen') {
        unlockDay(key);
        setPartial(key, false);
      } else if (closeType === 'full') {
        lockDay(key);
      } else {
        setPartial(key, true);
      }
    });

    setCloseOutOpen(false);
    onClose();
  };

  const closeOptions = [
    { type: 'full' as const, label: 'Close all Day', icon: LockIcon },
    { type: 'los' as const, label: 'Min Length of Stay', icon: LockIcon },
    { type: 'reopen' as const, label: 'Re-Open', icon: LockOpenIcon },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
        Close out sales
        <IconButton aria-label="Close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Please select
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1 }}>
            {closeOptions.map((opt) => {
              const Icon = opt.icon;
              const selected = closeType === opt.type;
              return (
                <Button
                  key={opt.type}
                  variant="outlined"
                  color={selected ? 'primary' : 'inherit'}
                  onClick={() => setCloseType(opt.type)}
                  sx={{
                    flexDirection: 'column',
                    gap: 0.5,
                    py: 1.5,
                    borderColor: selected ? 'primary.main' : 'divider',
                    bgcolor: selected ? 'action.selected' : 'transparent',
                  }}
                >
                  <Icon color="primary" />
                  <Typography variant="caption" sx={{ fontWeight: 500, textAlign: 'center' }}>
                    {opt.label}
                  </Typography>
                </Button>
              );
            })}
          </Box>
        </Box>

        {closeType === 'los' && (
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Minimum Nights
            </Typography>
            <TextField
              type="number"
              size="small"
              slotProps={{ htmlInput: { min: 1, max: 30 } }}
              value={minNights}
              onChange={(e) => setMinNights(Number(e.target.value))}
              sx={{ width: 96 }}
            />
          </Box>
        )}

        <Box>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase' }}>
            Date ranges
          </Typography>
          {ranges.map((r) => (
            <Box key={r.id} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 1 }}>
              <TextField
                type="date"
                size="small"
                value={r.from}
                onChange={(e) => updateRange(r.id, 'from', e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <Typography color="text.disabled">–</Typography>
              <TextField
                type="date"
                size="small"
                value={r.to}
                onChange={(e) => updateRange(r.id, 'to', e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              {ranges.length > 1 && (
                <IconButton size="small" onClick={() => removeRange(r.id)} aria-label="Remove range">
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
          <Button size="small" color="primary" startIcon={<AddIcon />} onClick={addRange}>
            Add Date Range
          </Button>
          {selectedDays.size > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Also applies to {selectedDays.size} selected day(s) from the calendar
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5, fontWeight: 600, textTransform: 'uppercase' }}>
            What to close
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Operators: {OPERATORS.slice(0, 3).join(', ')}… · Rooms: {ROOM_TYPES[0]}… · Board:{' '}
            {BOARD_TYPES[0]}…
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase' }}>
            Contact sales team
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            size="small"
            multiline
            rows={3}
            placeholder="Sales message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600 }}>
            Send Action
          </Typography>
          <RadioGroup value={sendAction} onChange={(_, v) => setSendAction(v as typeof sendAction)}>
            <FormControlLabel value="email" control={<Radio size="small" />} label="Email Operators" />
            <FormControlLabel value="internal" control={<Radio size="small" />} label="Internal Note" />
            <FormControlLabel value="both" control={<Radio size="small" />} label="Both" />
          </RadioGroup>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 2, py: 1.5, gap: 1 }}>
        <Button variant="outlined" color="inherit" fullWidth onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={handleConfirm}>
          {closeType === 'reopen' ? 'Re-Open' : 'Close Out'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
