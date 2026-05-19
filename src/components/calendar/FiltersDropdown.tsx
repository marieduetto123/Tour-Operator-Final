import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
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
          className: 'cal-dropdown-panel cal-filters-dropdown wv-metrics-dropdown',
          sx: { width: 220, maxHeight: 210, overflow: 'hidden', display: 'flex', flexDirection: 'column', p: 0 },
        },
      }}
    >
      <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
        <Box sx={{ overflowY: 'auto', flex: 1, py: 0.5 }}>
          {FILTER_SECTIONS.map((section, si) => (
            <Box key={section.id} sx={si > 0 ? { borderTop: 1, borderColor: 'divider' } : undefined}>
              <Typography
                variant="caption"
                className="wv-ms-hdr-label"
                sx={{
                  display: 'block',
                  px: 1.5,
                  py: 0.5,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'text.secondary',
                  fontSize: 10,
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
                    sx={{ display: 'flex', mx: 0, px: 1.5, py: 0, minHeight: 28 }}
                    control={
                      <Checkbox
                        size="small"
                        color="primary"
                        checked={checked}
                        onChange={() => onToggle(section.id, opt.value)}
                        sx={{ py: 0.25 }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        {opt.label}
                      </Typography>
                    }
                  />
                );
              })}
            </Box>
          ))}
          <Box sx={{ borderTop: 1, borderColor: 'divider', px: 1.5, py: 0.75 }}>
            <Typography
              variant="caption"
              sx={{ display: 'block', mb: 0.25, fontWeight: 600, color: 'text.secondary', fontSize: 10 }}
            >
              CUSTOMIZE PICKUP{' '}
              <Box component="span" sx={{ fontWeight: 600, color: 'primary.main', textTransform: 'none' }}>
                {pickupDays >= 365 ? 'All time' : `${pickupDays}d`}
              </Box>
            </Typography>
            <input
              type="number"
              className="cal-filter-pickup-input"
              min={1}
              max={365}
              value={pickupDays}
              onChange={(e) => onPickupChange(Math.max(1, Number(e.target.value) || 1))}
            />
          </Box>
        </Box>
        <div className="cal-filters-footer">
          <button type="button" className="cal-filter-reset" onClick={onReset}>
            <CloseIcon sx={{ fontSize: 14 }} />
            Reset all
          </button>
          <button type="button" className="cal-filter-apply" onClick={onApply}>
            Apply
          </button>
        </div>
      </Paper>
    </Popover>
  );
}
