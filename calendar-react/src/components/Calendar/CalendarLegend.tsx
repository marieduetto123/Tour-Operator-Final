import LockIcon from '@mui/icons-material/Lock';
import TodayIcon from '@mui/icons-material/Today';

export default function CalendarLegend() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '6px 16px',
      borderBottom: '1px solid var(--border-sub)',
      background: 'var(--surface-1)',
      flexWrap: 'wrap',
    }}>
      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Legend
      </span>

      <LegendItem icon={<LockIcon sx={{ fontSize: 11, color: '#D32F2F' }} />} label="Full close" />
      <LegendItem icon={<LockIcon sx={{ fontSize: 11, color: '#FF9800' }} />} label="Partial close" />
      <LegendItem icon={<TodayIcon sx={{ fontSize: 11, color: 'var(--accent)' }} />} label="Event" />

      {/* Heatmap swatches */}
      <LegendItem
        icon={<span style={{ width: 12, height: 12, borderRadius: 2, background: '#2E65E8', display: 'inline-block' }} />}
        label="Hotel occ"
      />
      <LegendItem
        icon={<span style={{ width: 12, height: 12, borderRadius: 2, background: '#D33030', display: 'inline-block' }} />}
        label="TO occ"
      />

      {/* Colour key */}
      <LegendItem
        icon={<span style={{ width: 8, height: 8, borderRadius: '50%', background: '#006461', display: 'inline-block' }} />}
        label={<><strong style={{ color: '#006461' }}>H</strong> = Hotel</>}
      />
      <LegendItem
        icon={<span style={{ width: 8, height: 8, borderRadius: '50%', background: '#8C7843', display: 'inline-block' }} />}
        label={<><strong style={{ color: '#8C7843' }}>TO</strong> = Tour Operator</>}
      />
    </div>
  );
}

function LegendItem({ icon, label }: { icon: React.ReactNode; label: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-secondary)' }}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
