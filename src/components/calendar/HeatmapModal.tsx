import CloseIcon from '@mui/icons-material/Close';
import HotelIcon from '@mui/icons-material/Hotel';
import LockIcon from '@mui/icons-material/Lock';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { SvgIconComponent } from '@mui/icons-material';
import {
  HEATMAP_TYPE_OPTIONS,
  HM_METRIC_COLORS,
  HM_STOP_SALES_COLORS,
  ROOM_TYPE_OPTIONS,
  type HeatmapState,
  type HeatmapType,
} from '@/data/heatmapTypes';

const TYPE_ICONS: Record<HeatmapType, SvgIconComponent> = {
  stopsales: LockIcon,
  hotelocc: HotelIcon,
  remaining: MeetingRoomIcon,
  mealplan: RestaurantIcon,
  toforecast: TrendingUpIcon,
};

type Props = {
  open: boolean;
  draft: HeatmapState;
  onChange: (next: HeatmapState) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
};

export function HeatmapModal({ open, draft, onChange, onClose, onReset, onApply }: Props) {
  const isStop = draft.type === 'stopsales';

  const setType = (type: HeatmapType) => onChange({ ...draft, type });

  const setThreshold = (which: 'grey' | 'green', val: number) => {
    if (which === 'grey') onChange({ ...draft, greyThreshold: val });
    else onChange({ ...draft, greenThreshold: val });
  };

  const setColor = (key: 'grey' | 'blue' | 'green', hex: string) => {
    onChange({ ...draft, colors: { ...draft.colors, [key]: hex } });
  };

  const thresholdRows = isStop
    ? [
        { key: 'grey' as const, label: 'Closed', desc: 'Full close out day', color: HM_STOP_SALES_COLORS.closed },
        { key: 'blue' as const, label: 'Partial', desc: 'At least 1 partial close out', color: HM_STOP_SALES_COLORS.partial },
        { key: 'green' as const, label: 'Open', desc: 'No stop sale', color: HM_STOP_SALES_COLORS.open },
      ]
    : [
        { key: 'grey' as const, label: 'Grey', desc: 'Above threshold', color: HM_METRIC_COLORS.grey, input: true, which: 'grey' as const },
        { key: 'green' as const, label: 'Green', desc: 'Below threshold', color: HM_METRIC_COLORS.green, input: true, which: 'green' as const },
        { key: 'blue' as const, label: 'Blue', desc: 'Between thresholds', color: HM_METRIC_COLORS.blue, input: false },
      ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
        Heatmap
        <IconButton aria-label="Close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Select a heatmap type, then configure each colour threshold
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1, mb: 2 }}>
          {HEATMAP_TYPE_OPTIONS.map((opt) => {
            const Icon = TYPE_ICONS[opt.key];
            const selected = draft.type === opt.key;
            return (
              <Button
                key={opt.key}
                variant="outlined"
                color={selected ? 'primary' : 'inherit'}
                onClick={() => setType(opt.key)}
                sx={{
                  justifyContent: 'flex-start',
                  gap: 1,
                  py: 1,
                  textAlign: 'left',
                  borderColor: selected ? 'primary.main' : 'divider',
                  bgcolor: selected ? 'action.selected' : 'transparent',
                }}
                startIcon={
                  <Radio checked={selected} size="small" sx={{ p: 0 }} tabIndex={-1} />
                }
              >
                <Icon color="primary" fontSize="small" />
                {opt.label}
              </Button>
            );
          })}
        </Box>

        {draft.type && (
          <>
            {isStop && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase' }}>
                  Room Type
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {ROOM_TYPE_OPTIONS.map((rt) => {
                    const on = draft.stopSalesRoomTypes.includes(rt);
                    return (
                      <Chip
                        key={rt}
                        label={rt}
                        size="small"
                        color={on ? 'primary' : 'default'}
                        onClick={() => {
                          const next = on
                            ? draft.stopSalesRoomTypes.filter((x) => x !== rt)
                            : [...draft.stopSalesRoomTypes, rt];
                          onChange({ ...draft, stopSalesRoomTypes: next });
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>
            )}

            {!isStop && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={draft.condition.enabled}
                    onChange={(e) =>
                      onChange({
                        ...draft,
                        condition: { ...draft.condition, enabled: e.target.checked },
                      })
                    }
                  />
                }
                label="Add condition"
                sx={{ mb: 1 }}
              />
            )}

            {draft.condition.enabled && !isStop && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <FormControl size="small">
                  <Select
                    value={draft.condition.metric}
                    onChange={(e) =>
                      onChange({
                        ...draft,
                        condition: {
                          ...draft.condition,
                          metric: e.target.value as typeof draft.condition.metric,
                        },
                      })
                    }
                  >
                    <MenuItem value="hotel">Hotel Occ (%)</MenuItem>
                    <MenuItem value="remainRooms">Remaining Rooms</MenuItem>
                    <MenuItem value="totalGuests">Meal Plan Guests</MenuItem>
                    <MenuItem value="toOtb">TO OTB (rooms)</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small">
                  <Select
                    value={draft.condition.op}
                    onChange={(e) =>
                      onChange({
                        ...draft,
                        condition: {
                          ...draft.condition,
                          op: e.target.value as typeof draft.condition.op,
                        },
                      })
                    }
                  >
                    <MenuItem value=">">&gt; above</MenuItem>
                    <MenuItem value=">=">&gt;= at least</MenuItem>
                    <MenuItem value="<">&lt; below</MenuItem>
                    <MenuItem value="<=">&lt;= at most</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="number"
                  size="small"
                  sx={{ width: 88 }}
                  value={draft.condition.value}
                  onChange={(e) =>
                    onChange({
                      ...draft,
                      condition: { ...draft.condition, value: Number(e.target.value) },
                    })
                  }
                />
              </Box>
            )}

            <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase' }}>
              Colour Thresholds
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {thresholdRows.map((row) => (
                <Box
                  key={row.key}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    p: 1.5,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      component="input"
                      type="color"
                      value={draft.colors[row.key] ?? row.color}
                      onChange={(e) => setColor(row.key, e.target.value)}
                      sx={{ width: 40, height: 40, border: 0, cursor: 'pointer', p: 0 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Change
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {row.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.desc}
                    </Typography>
                    {'input' in row && row.input && (
                      <TextField
                        type="number"
                        size="small"
                        sx={{ mt: 0.5, width: 96 }}
                        value={row.which === 'grey' ? draft.greyThreshold : draft.greenThreshold}
                        onChange={(e) => setThreshold(row.which!, Number(e.target.value))}
                      />
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 2, py: 1.5, gap: 1 }}>
        <Button variant="outlined" color="inherit" fullWidth onClick={onReset}>
          Reset
        </Button>
        <Button variant="contained" color="primary" fullWidth disabled={!draft.type} onClick={onApply}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
