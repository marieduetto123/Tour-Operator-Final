import {
  HOTEL_CAPACITY,
  LOW_TO_DAYS,
  METRIC_OPTIONS,
  type MetricKey,
} from '@/data/calendarData';

export type CellMetrics = {
  hotelOcc: number;
  toOcc: number;
  hotelAdr: number;
  toAdr: number;
  hotelRev: number;
  toRev: number;
  hotelRn: number;
  toRn: number;
};

export function dayKey(month: number, day: number) {
  return `${month}-${day}`;
}

export function getOccupancy(month: number, day: number) {
  const key = dayKey(month, day);
  if (LOW_TO_DAYS[key]) return LOW_TO_DAYS[key];
  const s = month * 31 + day;
  const hotel = 20 + Math.abs((s * 47 + 31 + s * s * 3) % 72);
  const to = Math.max(5, Math.min(hotel, hotel + Math.floor((s * 17 + 7) % 21) - 10));
  return { hotel, to };
}

export function buildCellMetrics(month: number, day: number): CellMetrics {
  const { hotel, to: toRaw } = getOccupancy(month, day);
  const to = Math.min(95, toRaw);
  const cellAdr = 150 + Math.abs((month * 47 + day * 31) % 130);
  const cellRev = Math.floor((hotel * cellAdr * HOTEL_CAPACITY) / 100 / 1.1);
  const cellRnSold = Math.floor((hotel * HOTEL_CAPACITY) / 100);
  const toRnSold = Math.round((HOTEL_CAPACITY * to) / 100);
  const toAdrVal = Math.max(80, cellAdr - 20 - Math.abs((month * 3 + day * 7) % 15));
  const toRevVal = Math.floor(toRnSold * toAdrVal);

  return {
    hotelOcc: hotel,
    toOcc: to,
    hotelAdr: cellAdr,
    toAdr: toAdrVal,
    hotelRev: cellRev,
    toRev: toRevVal,
    hotelRn: cellRnSold,
    toRn: toRnSold,
  };
}

export function formatMoney(n: number) {
  const v = Math.round(Math.abs(n));
  if (v >= 10000) return `$${Math.round(v / 1000)}k`;
  if (v >= 1000) return `$${(v / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return `$${v}`;
}

export type MetricRow = { shortLabel: string; value: string; tone: 'hotel' | 'to' };

const METRIC_MAP: Record<
  MetricKey,
  { field: keyof CellMetrics; suffix?: string; isMoney?: boolean; short: string }
> = {
  hocc: { field: 'hotelOcc', suffix: '%', short: 'Occ' },
  tocc: { field: 'toOcc', suffix: '%', short: 'Occ' },
  hadr: { field: 'hotelAdr', isMoney: true, short: 'ADR' },
  tadr: { field: 'toAdr', isMoney: true, short: 'ADR' },
  hrev: { field: 'hotelRev', isMoney: true, short: 'Rev' },
  trev: { field: 'toRev', isMoney: true, short: 'Rev' },
  hrn: { field: 'hotelRn', short: 'RN' },
  trn: { field: 'toRn', short: 'RN' },
};

export function buildMetricRows(metrics: CellMetrics, selected: MetricKey[]): MetricRow[] {
  return selected.map((key) => {
    const map = METRIC_MAP[key];
    const raw = metrics[map.field];
    const value = map.isMoney
      ? formatMoney(raw)
      : map.suffix
        ? `${Math.round(raw)}${map.suffix}`
        : String(Math.round(raw));
    return {
      shortLabel: map.short,
      value,
      tone: key.startsWith('t') ? 'to' : 'hotel',
    };
  });
}

export function toRooms(pct: number) {
  return Math.round((HOTEL_CAPACITY * pct) / 100);
}

export function isToday(month: number, day: number) {
  return month === 3 && day === 9;
}

export function metricLabelForKeys(keys: MetricKey[]) {
  if (keys.length === 0) return 'Cell Metrics';
  if (keys.length <= 2) {
    return keys
      .map((k) => METRIC_OPTIONS.find((o) => o.key === k)?.group)
      .filter(Boolean)
      .join(', ');
  }
  return `${keys.length} metrics`;
}
