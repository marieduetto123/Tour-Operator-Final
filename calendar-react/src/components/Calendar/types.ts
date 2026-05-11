export type CalView = 1 | 2 | 3 | 6 | 12;
export type CompareMode = 'none' | 'ly' | 'stly' | 'fcst' | 'budget';
export type FilterTO = 'all' | 'sunwing' | 'tui' | 'thomas-cook' | 'club-med' | 'jet2';
export type FilterRoom = 'all' | 'standard' | 'superior' | 'deluxe' | 'suite';
export type FilterBoard = 'all' | 'ai' | 'hb' | 'bb' | 'ro';
export type FilterMarket = 'all' | 'UK' | 'SP' | 'US' | 'MX';
export type HeatmapType = 'none' | 'hotel-occ' | 'seg-occ' | 'remaining' | 'stop-sales';

export interface CalFilters {
  to: FilterTO;
  room: FilterRoom;
  board: FilterBoard;
  market: FilterMarket;
  pickup: [number, number, number];
}

export interface MonthData {
  name: string;
  year: number;
  month: number; // 1-indexed
  days: number;
  firstDay: number; // 0=Mon
  lockedCount: number;
  stats: { occ: string; occDelta: string; adr: string; adrDelta: string; rev: string; revDelta: string };
}

export interface DayMetrics {
  hotelOcc: number;
  toOcc: number;
  lyOcc: number;
  fcstOcc: number;
  hotelAdr: number;
  toAdr: number;
  hotelRev: number;
  toRev: number;
  hotelPickup: number;
  toPickup: number;
  remainRooms: number;
  avgAdults: number;
  avgChildren: number;
  availRooms: number;
  avgLos: number;
  avgLeadTime: number;
  totalGuests: number;
  revpar: number;
}

export type CellMetricKey =
  | 'hotelOcc' | 'toOcc' | 'lyOcc' | 'fcstOcc'
  | 'hotelAdr' | 'toAdr'
  | 'hotelRev' | 'toRev'
  | 'hotelPickup' | 'toPickup'
  | 'remainRooms' | 'revpar'
  | 'avgAdults' | 'avgChildren' | 'totalGuests'
  | 'availRooms' | 'avgLos' | 'avgLeadTime';

export interface CellMetricDef {
  key: CellMetricKey;
  label: string;
  type: 'hotel' | 'to' | 'compare';
  format: 'pct' | 'currency' | 'number' | 'rooms';
}

export interface PartialClosure {
  tos: string[];
  roomTypes: string[];
  boards: string[];
  appliedBy: string;
  appliedAt: string;
}

export interface CalEvent {
  name: string;
  type: 'One-time' | 'Recurring';
  date: string;
}
