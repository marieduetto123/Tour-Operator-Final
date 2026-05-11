import LockIcon from '@mui/icons-material/Lock';
import TodayIcon from '@mui/icons-material/Today';

export default function CalendarLegend() {
  return (
    <div className="flex items-center gap-4 px-4 py-2 border-b border-[var(--border)] bg-[var(--surface-1)] flex-wrap">
      <span className="text-[11px] text-[var(--text-muted)] font-medium">Legend:</span>

      <LegendItem>
        <LockIcon sx={{ fontSize: 11, color: '#D32F2F' }} />
        <span>Fully closed</span>
      </LegendItem>

      <LegendItem>
        <LockIcon sx={{ fontSize: 11, color: '#FF9800' }} />
        <span>Partial close</span>
      </LegendItem>

      <LegendItem>
        <TodayIcon sx={{ fontSize: 11, color: 'var(--accent)' }} />
        <span>Has event</span>
      </LegendItem>

      <LegendItem>
        <span className="w-3 h-3 rounded-sm" style={{ background: '#2E65E8' }} />
        <span>High hotel occupancy</span>
      </LegendItem>

      <LegendItem>
        <span className="w-3 h-3 rounded-sm" style={{ background: '#D33030' }} />
        <span>High TO occupancy</span>
      </LegendItem>

      <LegendItem>
        <span className="w-2 h-2 rounded-full bg-[#006461]" />
        <span className="font-medium" style={{ color: '#006461' }}>H</span>
        <span>= Hotel</span>
      </LegendItem>

      <LegendItem>
        <span className="w-2 h-2 rounded-full bg-[#8C7843]" />
        <span className="font-medium" style={{ color: '#8C7843' }}>TO</span>
        <span>= Tour Operator</span>
      </LegendItem>
    </div>
  );
}

function LegendItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
      {children}
    </div>
  );
}
