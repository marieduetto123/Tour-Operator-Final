import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { METRIC_OPTIONS, type MetricKey } from '@/data/calendarData';
import { metricLabelForKeys } from '@/lib/calendar/metrics';

const MAX = 4;
const GROUPS = ['Metrics', 'ADR', 'Revenue', 'RN Sold'] as const;

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  draft: MetricKey[];
  onToggle: (key: MetricKey) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
};

export function CellMetricsPanel({
  open,
  anchorEl,
  draft,
  onToggle,
  onClose,
  onReset,
  onApply,
}: Props) {
  const atMax = draft.length >= MAX;

  return (
    <Popover
      open={open && Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{ paper: { className: 'cal-dropdown-panel', sx: { width: 288 } } }}
    >
      <Paper elevation={0} sx={{ py: 1 }}>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            px: 1.5,
            pb: 1,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'text.secondary',
          }}
        >
          Cell metrics (max {MAX})
        </Typography>
        {GROUPS.map((group) => (
          <Box key={group} sx={{ borderTop: 1, borderColor: 'divider', px: 1.5, py: 1 }}>
            <Typography
              variant="caption"
              sx={{ display: 'block', mb: 0.5, fontWeight: 600, textTransform: 'uppercase', color: 'text.disabled' }}
            >
              {group}
            </Typography>
            {METRIC_OPTIONS.filter((o) => o.group === group).map((opt) => {
              const checked = draft.includes(opt.key);
              const disabled = !checked && atMax;
              return (
                <FormControlLabel
                  key={opt.key}
                  sx={{ display: 'flex', width: '100%', mx: 0, mb: 0.25 }}
                  control={
                    <Checkbox
                      size="small"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => onToggle(opt.key)}
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.primary">
                        {opt.label}
                      </Typography>
                      <Typography variant="caption" color="text.disabled" sx={{ ml: 'auto' }}>
                        {opt.prefix}
                      </Typography>
                    </Box>
                  }
                />
              );
            })}
          </Box>
        ))}
        <Divider />
        <Box sx={{ display: 'flex', gap: 1, px: 1.5, pt: 1 }}>
          <Button variant="outlined" color="inherit" fullWidth size="small" onClick={onReset}>
            Reset
          </Button>
          <Button variant="contained" color="primary" fullWidth size="small" onClick={onApply}>
            Apply
          </Button>
        </Box>
      </Paper>
    </Popover>
  );
}

export function cellMetricsButtonLabel(keys: MetricKey[]) {
  return metricLabelForKeys(keys) || 'Cell Metrics';
}
