export type FilterGroupId = 'operator' | 'room' | 'board' | 'market' | 'pickup';

export type FilterState = Record<FilterGroupId, string>;

export const DEFAULT_FILTERS: FilterState = {
  operator: 'all',
  room: 'all',
  board: 'all',
  market: 'all',
  pickup: 'all',
};

export const TO_FILTER_MULT: Record<string, number> = {
  all: 1.0,
  sunwing: 0.82,
  tui: 1.18,
  'thomas-cook': 0.71,
  'club-med': 1.08,
  jet2: 0.95,
};

export const FILTER_SECTIONS: {
  id: FilterGroupId;
  title: string;
  options: { value: string; label: string }[];
}[] = [
  {
    id: 'operator',
    title: 'OPERATOR',
    options: [
      { value: 'all', label: 'All Operators' },
      { value: 'sunwing', label: 'Sunwing' },
      { value: 'tui', label: 'TUI' },
      { value: 'thomas-cook', label: 'Thomas Cook' },
      { value: 'club-med', label: 'Club Med' },
      { value: 'jet2', label: 'Jet2holidays' },
    ],
  },
  {
    id: 'room',
    title: 'ROOM TYPE',
    options: [
      { value: 'all', label: 'All Rooms' },
      { value: 'standard', label: 'Standard' },
      { value: 'superior', label: 'Superior' },
      { value: 'deluxe', label: 'Deluxe' },
      { value: 'suite', label: 'Suite' },
    ],
  },
  {
    id: 'board',
    title: 'MEAL PLAN',
    options: [
      { value: 'all', label: 'All Plans' },
      { value: 'ai', label: 'All Inclusive' },
      { value: 'hb', label: 'Half Board' },
      { value: 'bb', label: 'Bed & Breakfast' },
      { value: 'ro', label: 'Room Only' },
    ],
  },
  {
    id: 'market',
    title: 'SOURCE GEO',
    options: [
      { value: 'all', label: 'All Origins' },
      { value: 'UK', label: 'UK' },
      { value: 'SP', label: 'Spain' },
      { value: 'US', label: 'US' },
      { value: 'MX', label: 'Mexico' },
    ],
  },
];
