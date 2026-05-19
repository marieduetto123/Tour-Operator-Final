import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useCalendar } from '@/context/CalendarContext';
import { buildMetricRows, toRooms, type CellMetrics } from '@/lib/calendar/metrics';
import type { MetricKey } from '@/data/calendarData';

type Props = {
  open: boolean;
  dateLabel: string;
  metrics: CellMetrics;
  selectedMetrics: MetricKey[];
  onClose: () => void;
};

export function DayDetailModal({ open, dateLabel, metrics, selectedMetrics, onClose }: Props) {
  const { setCloseOutOpen } = useCalendar();
  const rows = buildMetricRows(metrics, selectedMetrics);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', pr: 1 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {dateLabel}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            All Operators
          </Typography>
        </Box>
        <IconButton aria-label="Close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {rows.map((r) => (
          <Box
            key={`${r.shortLabel}-${r.tone}`}
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 0.5 }}
          >
            <Typography
              variant="body2"
              color={r.tone === 'to' ? 'primary.main' : 'text.secondary'}
            >
              {r.tone === 'to' ? 'TO' : 'Hotel'} {r.shortLabel}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {r.value}
            </Typography>
          </Box>
        ))}
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, pt: 1, borderTop: 1, borderColor: 'divider' }}>
          {toRooms(metrics.hotelOcc)} hotel rooms · {toRooms(metrics.toOcc)} TO rooms
        </Typography>
      </DialogContent>

      <DialogActions sx={{ flexDirection: 'column', gap: 1, px: 2, py: 1.5 }}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<LockIcon />}
          onClick={() => {
            onClose();
            setCloseOutOpen(true);
          }}
        >
          Close Out
        </Button>
        <Button fullWidth variant="contained" color="primary" endIcon={<ChevronRightIcon />}>
          View More Details
        </Button>
      </DialogActions>
    </Dialog>
  );
}
