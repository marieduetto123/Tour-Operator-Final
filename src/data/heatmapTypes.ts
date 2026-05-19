export type HeatmapType = 'stopsales' | 'hotelocc' | 'remaining' | 'mealplan' | 'toforecast';

export type HeatmapCondition = {
  enabled: boolean;
  metric: 'hotel' | 'remainRooms' | 'totalGuests' | 'toOtb';
  op: '>' | '>=' | '<' | '<=';
  value: number;
};

export type HeatmapState = {
  enabled: boolean;
  type: HeatmapType | '';
  greyThreshold: number;
  greenThreshold: number;
  colors: { grey?: string; blue?: string; green?: string };
  condition: HeatmapCondition;
  stopSalesRoomTypes: string[];
};

export const DEFAULT_HEATMAP: HeatmapState = {
  enabled: false,
  type: '',
  greyThreshold: 85,
  greenThreshold: 60,
  colors: {},
  condition: { enabled: false, metric: 'hotel', op: '>', value: 50 },
  stopSalesRoomTypes: [],
};

export const HM_STOP_SALES_COLORS = {
  closed: '#D32F2F',
  partial: '#FFB90F',
  open: '#388C3F',
};

export const HM_METRIC_COLORS = {
  grey: '#9CA3AF',
  blue: '#3B82F6',
  green: '#22C55E',
};

export const HEATMAP_TYPE_OPTIONS: {
  key: HeatmapType;
  label: string;
  icon: string;
}[] = [
  { key: 'stopsales', label: 'Stop Sales', icon: 'lock' },
  { key: 'hotelocc', label: 'Hotel Occupancy', icon: 'hotel' },
  { key: 'remaining', label: 'Remaining Rooms', icon: 'meeting_room' },
  { key: 'mealplan', label: 'Meal Plan Guests', icon: 'restaurant' },
  { key: 'toforecast', label: 'TO Forecast', icon: 'trending_up' },
];

export const ROOM_TYPE_OPTIONS = ['Standard', 'Superior', 'Deluxe', 'Suite'];
