import type { MonthData, CellMetricDef, PartialClosure, CalEvent } from './types';

export const HOTEL_CAPACITY = 210;

export const ALL_MONTHS: MonthData[] = [
  { name: 'January 2026',   year: 2026, month: 1,  days: 31, firstDay: 4, lockedCount: 0, stats: { occ: '62%', occDelta: '+2.1', adr: '$165', adrDelta: '+1.8', rev: '$421k', revDelta: '+3.9' } },
  { name: 'February 2026',  year: 2026, month: 2,  days: 28, firstDay: 0, lockedCount: 2, stats: { occ: '71%', occDelta: '+4.2', adr: '$178', adrDelta: '+2.3', rev: '$489k', revDelta: '+6.1' } },
  { name: 'March 2026',     year: 2026, month: 3,  days: 31, firstDay: 0, lockedCount: 2, stats: { occ: '84%', occDelta: '+1.5', adr: '$192', adrDelta: '+3.1', rev: '$612k', revDelta: '+4.7' } },
  { name: 'April 2026',     year: 2026, month: 4,  days: 30, firstDay: 3, lockedCount: 1, stats: { occ: '78%', occDelta: '-0.8', adr: '$185', adrDelta: '+0.9', rev: '$571k', revDelta: '+0.1' } },
  { name: 'May 2026',       year: 2026, month: 5,  days: 31, firstDay: 5, lockedCount: 0, stats: { occ: '69%', occDelta: '+3.3', adr: '$172', adrDelta: '+2.0', rev: '$518k', revDelta: '+5.4' } },
  { name: 'June 2026',      year: 2026, month: 6,  days: 30, firstDay: 1, lockedCount: 0, stats: { occ: '91%', occDelta: '+2.7', adr: '$210', adrDelta: '+4.5', rev: '$741k', revDelta: '+7.3' } },
  { name: 'July 2026',      year: 2026, month: 7,  days: 31, firstDay: 3, lockedCount: 0, stats: { occ: '97%', occDelta: '+1.1', adr: '$228', adrDelta: '+3.8', rev: '$812k', revDelta: '+5.0' } },
  { name: 'August 2026',    year: 2026, month: 8,  days: 31, firstDay: 6, lockedCount: 0, stats: { occ: '95%', occDelta: '+0.5', adr: '$222', adrDelta: '+2.1', rev: '$793k', revDelta: '+2.6' } },
  { name: 'September 2026', year: 2026, month: 9,  days: 30, firstDay: 2, lockedCount: 0, stats: { occ: '82%', occDelta: '+3.9', adr: '$195', adrDelta: '+1.7', rev: '$629k', revDelta: '+5.8' } },
  { name: 'October 2026',   year: 2026, month: 10, days: 31, firstDay: 4, lockedCount: 0, stats: { occ: '74%', occDelta: '+2.2', adr: '$182', adrDelta: '+2.8', rev: '$554k', revDelta: '+5.1' } },
  { name: 'November 2026',  year: 2026, month: 11, days: 30, firstDay: 0, lockedCount: 0, stats: { occ: '58%', occDelta: '-1.4', adr: '$158', adrDelta: '+0.4', rev: '$389k', revDelta: '-1.0' } },
  { name: 'December 2026',  year: 2026, month: 12, days: 31, firstDay: 2, lockedCount: 0, stats: { occ: '88%', occDelta: '+5.1', adr: '$215', adrDelta: '+6.2', rev: '$717k', revDelta: '+11.5' } },
];

export const LOCKED_DAYS = new Set(['2-1', '2-23', '3-3', '3-17', '4-8']);

export const PARTIAL_CLOSURES: Record<string, PartialClosure[]> = {
  '2-7':  [{ tos: ['Sunwing'], roomTypes: ['Suite'], boards: [], appliedBy: 'Sarah M.', appliedAt: '2026-01-22T10:14:00' }],
  '2-14': [{ tos: [], roomTypes: ['Deluxe', 'Suite'], boards: ['ro'], appliedBy: 'James R.', appliedAt: '2026-01-28T09:00:00' }],
  '3-8':  [{ tos: ['TUI'], roomTypes: [], boards: ['ai'], appliedBy: 'Sarah M.', appliedAt: '2026-02-10T11:30:00' }],
  '3-15': [{ tos: [], roomTypes: ['Suite'], boards: [], appliedBy: 'Maria D.', appliedAt: '2026-02-18T14:20:00' }],
  '4-3':  [{ tos: ['Thomas Cook'], roomTypes: ['Standard'], boards: ['hb'], appliedBy: 'James R.', appliedAt: '2026-03-01T08:45:00' }],
  '4-18': [{ tos: ['Club Med'], roomTypes: [], boards: [], appliedBy: 'Sarah M.', appliedAt: '2026-03-12T16:10:00' }],
};

export const CAL_EVENTS: Record<string, CalEvent[]> = {
  '1-1':  [{ name: "New Year's Day", type: 'Recurring', date: '2026-01-01' }],
  '2-14': [{ name: "Valentine's Day", type: 'Recurring', date: '2026-02-14' }],
  '3-8':  [{ name: 'Spring Festival', type: 'One-time', date: '2026-03-08' }],
  '4-3':  [{ name: 'Easter Weekend', type: 'Recurring', date: '2026-04-03' }],
  '5-1':  [{ name: 'Labour Day', type: 'Recurring', date: '2026-05-01' }],
  '6-15': [{ name: 'Summer Peak Start', type: 'One-time', date: '2026-06-15' }],
  '7-4':  [{ name: 'Independence Day', type: 'Recurring', date: '2026-07-04' }],
  '8-10': [{ name: 'Hotel Anniversary', type: 'One-time', date: '2026-08-10' }],
  '9-1':  [{ name: 'Peak Season End', type: 'One-time', date: '2026-09-01' }],
  '10-31':[{ name: 'Halloween', type: 'Recurring', date: '2026-10-31' }],
  '12-25':[{ name: 'Christmas Day', type: 'Recurring', date: '2026-12-25' }],
  '12-31':[{ name: "New Year's Eve", type: 'Recurring', date: '2026-12-31' }],
};

const LOW_TO_DAYS: Record<string, { hotel: number; to: number }> = {
  '2-7':  { hotel: 87, to: 18 },
  '2-14': { hotel: 82, to: 22 },
  '3-8':  { hotel: 91, to: 15 },
  '3-15': { hotel: 88, to: 20 },
  '4-3':  { hotel: 79, to: 25 },
  '4-11': { hotel: 85, to: 19 },
  '4-18': { hotel: 80, to: 23 },
  '4-22': { hotel: 84, to: 17 },
  '2-21': { hotel: 76, to: 28 },
};

const TO_FILTER_MULT: Record<string, number> = {
  all: 1.0, sunwing: 0.82, tui: 1.18, 'thomas-cook': 0.71, 'club-med': 1.08, jet2: 0.94,
};

export function getOccupancy(month: number, day: number, toFilter = 'all'): { hotel: number; to: number } {
  const key = `${month}-${day}`;
  if (LOW_TO_DAYS[key]) return LOW_TO_DAYS[key];
  const seed = (month * 31 + day * 7 + month + day) % 100;
  const hotel = Math.min(97, Math.max(20, 38 + seed * 0.6 + (month >= 6 && month <= 8 ? 25 : 0) + (month === 12 ? 18 : 0)));
  const toBase = hotel * (0.55 + (seed % 30) * 0.008);
  const toMult = TO_FILTER_MULT[toFilter] ?? 1.0;
  return { hotel: Math.round(hotel), to: Math.min(hotel, Math.round(toBase * toMult)) };
}

export function getDayMetrics(month: number, day: number, toFilter = 'all') {
  const { hotel, to } = getOccupancy(month, day, toFilter);
  const seed = (month * 17 + day * 13) % 100;
  const baseAdr = 140 + seed * 0.8 + (month >= 6 && month <= 8 ? 40 : 0);
  const rooms = Math.round((hotel / 100) * HOTEL_CAPACITY);
  return {
    hotelOcc: hotel,
    toOcc: to,
    lyOcc: Math.max(10, hotel - 2 - (seed % 8)),
    fcstOcc: Math.min(100, hotel + 1 + (seed % 5)),
    hotelAdr: Math.round(baseAdr),
    toAdr: Math.round(baseAdr * 0.88),
    hotelRev: Math.round((hotel / 100) * HOTEL_CAPACITY * baseAdr),
    toRev: Math.round((to / 100) * HOTEL_CAPACITY * baseAdr * 0.88),
    hotelPickup: Math.round(rooms * 0.12),
    toPickup: Math.round(rooms * 0.07),
    remainRooms: HOTEL_CAPACITY - rooms,
    avgAdults: 1.8 + (seed % 10) * 0.04,
    avgChildren: 0.3 + (seed % 5) * 0.06,
    availRooms: HOTEL_CAPACITY - Math.round(rooms * 0.95),
    avgLos: 3.5 + (seed % 7) * 0.2,
    avgLeadTime: 42 + seed,
    totalGuests: Math.round(rooms * 1.9),
    revpar: Math.round(baseAdr * (hotel / 100)),
  };
}

export const CAL_METRIC_DEFS: CellMetricDef[] = [
  { key: 'hotelOcc',    label: 'H-Occ',          type: 'hotel',   format: 'pct' },
  { key: 'toOcc',       label: 'TO-Occ',          type: 'to',      format: 'pct' },
  { key: 'lyOcc',       label: 'LY-Occ',          type: 'compare', format: 'pct' },
  { key: 'fcstOcc',     label: 'Fcst-Occ',        type: 'compare', format: 'pct' },
  { key: 'hotelAdr',    label: 'H-ADR',           type: 'hotel',   format: 'currency' },
  { key: 'toAdr',       label: 'TO-ADR',          type: 'to',      format: 'currency' },
  { key: 'hotelRev',    label: 'H-Revenue',       type: 'hotel',   format: 'currency' },
  { key: 'toRev',       label: 'TO-Revenue',      type: 'to',      format: 'currency' },
  { key: 'hotelPickup', label: 'H-Pickup',        type: 'hotel',   format: 'rooms' },
  { key: 'toPickup',    label: 'TO-Pickup',       type: 'to',      format: 'rooms' },
  { key: 'remainRooms', label: 'Rem. Rooms',      type: 'hotel',   format: 'rooms' },
  { key: 'revpar',      label: 'RevPAR',          type: 'hotel',   format: 'currency' },
  { key: 'availRooms',  label: 'Available Rooms', type: 'hotel',   format: 'rooms' },
  { key: 'avgLos',      label: 'Avg LOS',         type: 'hotel',   format: 'number' },
  { key: 'avgLeadTime', label: 'Avg Lead Time',   type: 'hotel',   format: 'number' },
  { key: 'totalGuests', label: 'Total Guests',    type: 'hotel',   format: 'rooms' },
];
