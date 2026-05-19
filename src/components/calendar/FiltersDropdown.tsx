import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FILTER_SECTIONS, type FilterGroupId, type FilterState } from '@/data/filterOptions';

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  draft: FilterState;
  onToggle: (id: FilterGroupId, value: string) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
  pickupDays: number;
  onPickupChange: (n: number) => void;
};

export function FiltersDropdown({
  open,
  anchorEl,
  draft,
  onToggle,
  onClose,
  onReset,
  onApply,
  pickupDays,
  onPickupChange,
}: Props) {
  return (
    <Popover
      open={open && Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        paper: {
          className: 'cal-dropdown-panel cal-filters-dropdown',
          sx: { width: 256, maxHeight: '70vh', overflow: 'auto' },
        },
      }}
    >
      <Paper elevation={0} sx={{ py: 1 }}>
        {FILTER_SECTIONS.map((section, si) => (
          <Box key={section.id} sx={si > 0 ? { borderTop: 1, borderColor: 'divider' } : undefined}>
            <Typography
              variant="caption"
              className="wv-ms-hdr-label"
              sx={{
                display: 'block',
                px: 1.5,
                py: 1,
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: 'text.secondary',
              }}
            >
              {section.title}
            </Typography>
            {section.options.map((opt) => {
              const checked = draft[section.id].includes(opt.value);
              return (
                <FormControlLabel
                  key={opt.value}
                  className="wv-ms-item"
                  sx={{ display: 'flex', mx: 0, px: 1.5, py: 0.25 }}
                  control={
                    <Checkbox
                      size="small"
                      color="primary"
                      checked={checked}
                      onChange={() => onToggle(section.id, opt.value)}
                    />
                  }
                  label={<Typography variant="body2">{opt.label}</Typography>}
                />
              );
            })}
          </Box>
        ))}
        <Box sx={{ borderTop: 1, borderColor: 'divider', px: 1.5, py: 1 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5, fontWeight: 600, color: 'text.secondary' }}>
            CUSTOMIZE PICKUP{' '}
            <Box component="span" sx={{ fontWeight: 600, color: 'primary.main', textTransform: 'none' }}>
              {pickupDays >= 365 ? 'All time' : `${pickupDays}d`}
            </Box>
          </Typography>
          <TextField
            type="number"
            size="small"
            fullWidth
            slotProps={{ htmlInput: { min: 1, max: 365 } }}
            value={pickupDays}
            onChange={(e) => onPickupChange(Math.max(1, Number(e.target.value) || 1))}
          />
        </Box>
        <Divider />
        <Box className="cal-filters-footer" sx={{ display: 'flex', gap: 1, px: 1.5, pt: 1 }}>
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            size="small"
            startIcon={<CloseIcon sx={{ fontSize: 14 }} />}
            onClick={onReset}
          >
            Reset all
          </Button>
          <Button variant="contained" color="primary" fullWidth size="small" className="cal-filter-apply-btn" onClick={onApply}>
            Apply
          </Button>
        </Box>
      </Paper>
    </Popover>
  );
}
