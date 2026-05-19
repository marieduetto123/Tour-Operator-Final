import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { CompareMode } from '@/lib/calendar/metrics';

type PillDef = {
  key: string;
  label: string;
  curr: number;
  ref: number;
  isPercent?: boolean;
};

export function ComparePills({
  pills,
  compare,
}: {
  pills: PillDef[];
  compare: CompareMode;
}) {
  if (compare === 'none') return null;

  const visible = pills.filter((p) => {
    if (compare === 'stly') return p.key === 'stly';
    if (compare === 'ly') return p.key === 'ly';
    if (compare === 'fcst' || compare === 'budget') return p.key === 'fcst';
    return true;
  });

  if (visible.length === 0) return null;

  return (
    <div className="wb-compare-pills">
      {visible.map((p) => {
        const diff = p.curr - p.ref;
        if (diff === 0) return null;
        const up = diff > 0;
        const mag = p.isPercent
          ? `${Math.abs(Math.round(diff))}%`
          : `${Math.abs(Math.round(diff))}`;
        return (
          <span key={p.key} className={`wb-cmp-pill${up ? ' wb-cmp-pill--up' : ' wb-cmp-pill--dn'}`}>
            {up ? (
              <ArrowUpwardIcon sx={{ fontSize: 12 }} />
            ) : (
              <ArrowDownwardIcon sx={{ fontSize: 12 }} />
            )}
            <span>
              {mag} vs {p.label}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function SubCompareChip({
  label,
  refVal,
  compare,
}: {
  label: string;
  refVal: number | string;
  compare: CompareMode;
}) {
  if (compare === 'none') return null;
  const show =
    compare === 'stly'
      ? label === 'STLY'
      : compare === 'ly'
        ? label === 'LY'
        : compare === 'fcst' || compare === 'budget'
          ? label === 'Fc'
          : true;
  if (!show) return null;

  return (
    <span className="wb-sub-cmp-chip">
      <TrendingUpIcon sx={{ fontSize: 11 }} />
      <span>
        {label}:{refVal}
      </span>
    </span>
  );
}
