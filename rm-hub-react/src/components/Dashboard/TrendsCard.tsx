import { useMemo, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SectionCard from 'components/Sections/SectionCard';
import { tokens } from 'theme/tokens';

const METRICS = [
  { v: 'revenue', l: 'Revenue' },
  { v: 'adr', l: 'ADR' },
  { v: 'nights', l: 'Room Nights' },
  { v: 'occ', l: 'Occupancy' },
  { v: 'bookings', l: 'Contract Bookings' },
  { v: 'avg_guests', l: 'Avg Guests' },
  { v: 'total_guests', l: 'Total Guests' },
  { v: 'contracted_rates', l: 'Contracted Rates' },
  { v: 'allotments', l: 'Allotments / Guarantees' },
];

export default function TrendsCard() {
  const [metric, setMetric] = useState('total_guests');
  const data = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        value: 1000 + Math.round(Math.sin(i / 3) * 250 + i * 18),
      })),
    [],
  );
  const subtitle =
    `${METRICS.find((m) => m.v === metric)?.l} – Segment Comparison`;
  return (
    <SectionCard
      id="revenue-trend"
      title="Trends"
      subtitle={subtitle}
      actions={
        <Select
          size="small"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          sx={{ minWidth: 200, height: 36 }}
        >
          {METRICS.map((m) => (
            <MenuItem key={m.v} value={m.v}>
              {m.l}
            </MenuItem>
          ))}
        </Select>
      }
    >
      <div style={{ height: 320 }}>
        <LineChart
          xAxis={[{ data: data.map((d) => d.day), label: 'Day' }]}
          series={[
            {
              data: data.map((d) => d.value),
              label: METRICS.find((m) => m.v === metric)?.l,
              color: tokens.teal[700],
              area: true,
            },
          ]}
          margin={{ left: 56, right: 16, top: 16, bottom: 36 }}
          sx={{
            '.MuiAreaElement-root': { fillOpacity: 0.12 },
          }}
        />
      </div>
    </SectionCard>
  );
}
