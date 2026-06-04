import { BarChart } from '@mui/x-charts/BarChart';
import SectionCard from 'components/Sections/SectionCard';
import { tokens } from 'theme/tokens';

const SEGMENTS = ['Direct', 'OTA', 'GDS', 'Wholesale', 'Tour Op'];
const ROOMS = ['Standard', 'Deluxe', 'Suite', 'Family'];

const series = ROOMS.map((r, i) => ({
  label: r,
  data: SEGMENTS.map((_, j) => 40 + ((i * 17 + j * 9) % 80)),
  color: [tokens.teal[700], tokens.teal[500], tokens.lucentGreen[200], tokens.teal[100]][i],
  stack: 'rooms',
}));

export default function RoomTypeCard() {
  return (
    <SectionCard id="room-type" title="Room type sales by segment">
      <div style={{ height: 320 }}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: SEGMENTS }]}
          series={series}
          margin={{ left: 56, right: 16, top: 16, bottom: 36 }}
        />
      </div>
    </SectionCard>
  );
}
