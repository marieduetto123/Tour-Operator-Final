import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = { current: string; property?: string };

export default function BreadcrumbBar({ current, property = 'Hotel Sevilla' }: Props) {
  return (
    <div
      className="fixed left-0 right-0 z-[99] h-8 flex items-center justify-between pl-6"
      style={{ top: 40, background: '#FAFAFA', borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex items-center text-[12px]">
        <span style={{ color: '#006461' }}>Home</span>
        <ChevronRightIcon sx={{ fontSize: 12, color: '#4F5B60', mx: 0.5 }} />
        <span style={{ color: '#4F5B60' }}>{current}</span>
      </div>
      <div
        className="flex items-center gap-1.5 h-full px-3 min-w-[200px] cursor-pointer text-[13px]"
        style={{
          color: '#006461',
          background: '#fff',
          borderLeft: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <HomeIcon sx={{ fontSize: 18 }} />
        <span className="flex-1">{property}</span>
        <ExpandMoreIcon sx={{ fontSize: 16 }} />
      </div>
    </div>
  );
}
