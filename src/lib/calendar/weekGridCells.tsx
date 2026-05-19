import type { ReactNode } from 'react';
import { HOTEL_CAPACITY } from '@/data/calendarData';
import type { CompareMode } from '@/lib/calendar/metrics';
import type { WeekDayData, WbRow } from '@/lib/calendar/weekGridData';
import { RT_CAPS } from '@/lib/calendar/weekGridData';
import { ComparePills, SubCompareChip } from '@/lib/calendar/weekGridCompare';

const WB_TO = '#004948';
const WB_OTHER = '#52d9ce';

function mealPct(d: WeekDayData, key: string) {
  const map: Record<string, number> = { ai: d.aiPct, bb: d.bbPct, hb: d.hbPct, ro: d.roPct };
  return map[key] ?? 0;
}

/** Stacked progress bar: TO share + Other segments (occupancy-scale %). */
function toOtherBar(d: WeekDayData) {
  return [
    { pct: d.to, color: WB_TO },
    { pct: d.otherPct, color: WB_OTHER },
  ];
}

/** TO vs Hotel RN as % of capacity (meal plans, room-type sold). */
function toHotelRnBar(toRn: number, hotelRn: number) {
  return [
    { pct: Math.min(100, (toRn / HOTEL_CAPACITY) * 100), color: WB_TO },
    { pct: Math.min(100, (hotelRn / HOTEL_CAPACITY) * 100), color: WB_OTHER },
  ];
}

function wbGrad(clr: string) {
  if (clr === '#004948') return 'linear-gradient(to right,#004948,#007a75)';
  if (clr === '#52d9ce') return 'linear-gradient(to right,#52d9ce,#8aeee8)';
  if (clr === '#445e0d') return 'linear-gradient(to right,#445e0d,#6a9014)';
  if (clr === '#D97706') return 'linear-gradient(to right,#D97706,#F59E0B)';
  if (clr === '#967EF3') return 'linear-gradient(to right,#967EF3,#a78bfa)';
  if (clr === '#16a34a') return 'linear-gradient(to right,#16a34a,#22c55e)';
  if (clr === '#d7f7ed') return '#d7f7ed';
  return clr;
}

function barTrack(segments: { pct: number; color: string }[], markerPct?: number | null) {
  return (
    <div className="wb-bar-wrap">
      <div className="wv-occ-bar-track">
        {segments.map((s, i) => (
          <div
            key={i}
            className="wv-occ-seg"
            style={{ width: `${Math.max(0, Math.min(100, s.pct))}%`, background: wbGrad(s.color) }}
          />
        ))}
      </div>
      {markerPct != null && !Number.isNaN(markerPct) ? (
        <span className="wb-bar-marker" style={{ left: `${Math.max(0, Math.min(100, markerPct))}%` }} />
      ) : null}
    </div>
  );
}

function SectionCell({
  primary,
  pills,
  compare,
  segments,
  markerPct,
  footer,
}: {
  primary: ReactNode;
  pills: { key: string; label: string; curr: number; ref: number; isPercent?: boolean }[];
  compare: CompareMode;
  segments: { pct: number; color: string }[];
  markerPct?: number | null;
  footer?: ReactNode;
}) {
  return (
    <div
      className={`wb-acc-cell${primary != null && primary !== '' ? '' : ' wb-acc-cell--no-metric'}`}
    >
      <div className="wb-acc-head">
        <span
          className={`wb-metric-primary${primary != null && primary !== '' ? '' : ' wb-metric-primary--empty'}`}
        >
          {primary != null && primary !== '' ? primary : '\u00a0'}
        </span>
        <div className="wb-pills-slot">
          <ComparePills pills={pills} compare={compare} />
        </div>
      </div>
      {segments.length > 0 ? (
        <div className="wb-acc-bar-slot">{barTrack(segments, markerPct)}</div>
      ) : null}
      {footer ? <div className="wb-acc-footer">{footer}</div> : null}
    </div>
  );
}

function SubCell({
  primary,
  secondary,
  chips,
  compare,
  isRem,
}: {
  primary: string;
  secondary?: string;
  chips: { label: string; ref: number | string }[];
  compare: CompareMode;
  isRem?: boolean;
}) {
  return (
    <div className={`wb-sub-cell-inner${isRem ? ' wb-sub-cell-inner--rem' : ''}`}>
      <div className="wb-sub-value-line">
        <span className="wb-sub-primary">{primary}</span>
        {secondary ? <span className="wb-sub-secondary">{secondary}</span> : null}
      </div>
      {chips.length > 0 ? (
        <div className="wb-sub-chips-line">
          {chips.map((c) => (
            <SubCompareChip key={c.label} label={c.label} refVal={c.ref} compare={compare} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function renderTopCell(
  row: WbRow,
  _d: WeekDayData,
  collapsed: boolean,
  isLocked: boolean,
  isPartial: boolean,
) {
  if (row.id !== 'g_closeouts' || !collapsed) return null;
  if (isLocked) {
    return <span className="wb-top-summary wb-top-summary--closed">Full Close Out</span>;
  }
  if (isPartial) {
    return <span className="wb-top-summary wb-top-summary--partial">Partial</span>;
  }
  return <span className="wb-top-summary wb-top-summary--open">Open</span>;
}

export function renderSectCell(row: WbRow, d: WeekDayData, compare: CompareMode) {
  const stly = { key: 'stly', label: 'STLY' };
  const ly = { key: 'ly', label: 'LY' };
  const fc = { key: 'fcst', label: 'Fc' };

  switch (row.id) {
    case 'occ':
      return (
        <SectionCell
          compare={compare}
          primary={`${d.hotel}%`}
          pills={[
            { ...stly, curr: d.hotel, ref: d.sdlyH, isPercent: true },
            { ...ly, curr: d.hotel, ref: d.lyH, isPercent: true },
            { ...fc, curr: d.hotel, ref: d.fcstH, isPercent: true },
          ]}
          markerPct={compare !== 'none' ? d.sdlyH : null}
          segments={toOtherBar(d)}
        />
      );
    case 'onoff':
      return (
        <SectionCell
          compare={compare}
          primary={`${d.onlinePct}%`}
          pills={[
            { ...stly, curr: d.onlinePct, ref: Math.max(20, d.onlinePct - 4), isPercent: true },
            { ...ly, curr: d.onlinePct, ref: Math.max(20, d.onlinePct - 2), isPercent: true },
            { ...fc, curr: d.onlinePct, ref: Math.min(90, d.onlinePct + 2), isPercent: true },
          ]}
          segments={[
            { pct: d.onlinePct, color: WB_TO },
            { pct: 100 - d.onlinePct, color: WB_OTHER },
          ]}
        />
      );
    case 'adr':
      return (
        <SectionCell
          compare={compare}
          primary={`$${d.toAdr}`}
          pills={[
            { ...stly, curr: d.toAdr, ref: d.sdlyA },
            { ...ly, curr: d.toAdr, ref: d.lyA },
            { ...fc, curr: d.toAdr, ref: d.fcstA },
          ]}
          markerPct={compare !== 'none' ? d.sdlyH : null}
          segments={toOtherBar(d)}
        />
      );
    case 'rev':
      return (
        <SectionCell
          compare={compare}
          primary={d.fR(d.toRev)}
          pills={[
            { ...stly, curr: d.toRev, ref: d.sdlyR },
            { ...ly, curr: d.toRev, ref: d.lyR },
            { ...fc, curr: d.toRev, ref: d.fcstR },
          ]}
          segments={toOtherBar(d)}
        />
      );
    case 'rn':
      return (
        <SectionCell
          compare={compare}
          primary={String(d.toRn)}
          pills={[
            { ...stly, curr: d.toRn, ref: d.sdlyRn },
            { ...ly, curr: d.toRn, ref: d.lyRn },
            { ...fc, curr: d.toRn, ref: d.fcstRn },
          ]}
          segments={[
            { pct: Math.min(90, Math.round((d.toRn / HOTEL_CAPACITY) * 100)), color: '#004948' },
            { pct: Math.min(90, Math.round((d.hnRn / HOTEL_CAPACITY) * 100)), color: '#52d9ce' },
          ]}
        />
      );
    case 'revpar_s':
      return (
        <SectionCell
          compare={compare}
          primary={`$${d.hRevpar}`}
          pills={[
            { ...stly, curr: d.hRevpar, ref: d.sdlyRevpar },
            { ...ly, curr: d.hRevpar, ref: d.lyRevpar },
            { ...fc, curr: d.hRevpar, ref: d.hRevpar + 4 },
          ]}
          segments={toOtherBar(d)}
        />
      );
    case 'pickup_0':
      return (
        <SectionCell
          compare={compare}
          primary={`+${d.pickup}`}
          pills={[
            { ...stly, curr: d.pickup, ref: Math.max(0, d.hPickup - 2) },
            { ...ly, curr: d.pickup, ref: Math.max(0, d.hPickup - 1) },
            { ...fc, curr: d.pickup, ref: d.pickup + 1 },
          ]}
          segments={toOtherBar(d)}
        />
      );
    case 'avga_s':
      return (
        <SectionCell
          compare={compare}
          primary={d.avgA}
          pills={[]}
          segments={toOtherBar(d)}
        />
      );
    case 'los_s':
      return (
        <SectionCell
          compare={compare}
          primary={d.avgLos}
          pills={[]}
          segments={toOtherBar(d)}
        />
      );
    case 'lead_s':
      return (
        <SectionCell
          compare={compare}
          primary={d.avgLead}
          pills={[]}
          segments={toOtherBar(d)}
        />
      );
    case 'avail_s':
      return (
        <SectionCell
          compare={compare}
          primary={`${d.availRooms} rm`}
          pills={[]}
          segments={toOtherBar(d)}
        />
      );
    case 'availg_s':
      return (
        <SectionCell
          compare={compare}
          primary={`${d.availGuar} rm`}
          pills={[]}
          segments={toOtherBar(d)}
        />
      );
    case 'biz':
      return (
        <SectionCell
          compare={compare}
          primary=""
          pills={[]}
          segments={[
            { pct: d.toMix, color: '#004948' },
            { pct: d.dirMix, color: '#52d9ce' },
            { pct: d.otaMix, color: '#D97706' },
            { pct: d.otherMix, color: '#9ca3af' },
          ]}
          footer={
            <div className="wb-biz-legend">
              <span style={{ color: '#004948' }}>TO {d.toMix}%</span>
              <span style={{ color: '#52d9ce' }}>D {d.dirMix}%</span>
              <span style={{ color: '#D97706' }}>OTA {d.otaMix}%</span>
            </div>
          }
        />
      );
    case 'mp_sum': {
      const gpr = parseFloat(d.hAvgA) + parseFloat(d.hAvgC);
      const aiSt = Math.round(d.hnRn * (d.aiPct / 100) * gpr);
      return (
        <SectionCell
          compare={compare}
          primary=""
          pills={[]}
          segments={[
            { pct: d.aiPct, color: '#004948' },
            { pct: d.bbPct, color: '#52d9ce' },
            { pct: d.hbPct, color: '#D97706' },
            { pct: d.roPct, color: '#d7f7ed' },
          ]}
          footer={
            <div className="wb-biz-legend">
              AI {d.aiPct}% · {aiSt} seats
            </div>
          }
        />
      );
    }
    default:
      if (row.mpKey) {
        const pct = mealPct(d, row.mpKey);
        const toRm = Math.round(d.toRn * (pct / 100));
        const hRm = Math.round(d.hnRn * (pct / 100));
        return (
          <SectionCell
            compare={compare}
            primary={`${pct}%`}
            pills={[]}
            segments={toHotelRnBar(toRm, hRm)}
            footer={<span className="wb-acc-footer-muted">{hRm} RN hotel</span>}
          />
        );
      }
      if (row.rtIdx !== undefined) {
        const inv = RT_CAPS[row.rtIdx];
        const sold = Math.min(inv, Math.floor((inv * d.hotel) / 110));
        const toSold = Math.min(sold, Math.floor((inv * d.to) / 100));
        const otherSold = Math.max(0, sold - toSold);
        const avRm = Math.max(0, inv - sold);
        return (
          <SectionCell
            compare={compare}
            primary={avRm <= 0 ? '0 available' : `${avRm} avail`}
            pills={[]}
            segments={[
              { pct: Math.min(100, (toSold / inv) * 100), color: WB_TO },
              { pct: Math.min(100, (otherSold / inv) * 100), color: WB_OTHER },
            ]}
          />
        );
      }
      if (row.toIdx !== undefined) {
        const toRate = d.adr - 15 + Math.abs((d.dm * (row.toIdx + 3) + d.dd * (row.toIdx + 5)) % 50);
        return (
          <SectionCell
            compare={compare}
            primary={`$${toRate}`}
            pills={[]}
            segments={toOtherBar(d)}
          />
        );
      }
      if (row.toBase) {
        const baseRate = d.adr + 8;
        return (
          <SectionCell
            compare={compare}
            primary={`$${baseRate}`}
            pills={[]}
            segments={toOtherBar(d)}
          />
        );
      }
      return null;
  }
}

export function renderSubCell(row: WbRow, d: WeekDayData, isLocked: boolean, isPartial: boolean, compare: CompareMode) {
  const chips = [
    { label: 'STLY', ref: 20 },
    { label: 'LY', ref: 18 },
    { label: 'Fc', ref: 22 },
  ];

  switch (row.id) {
    case 'co_rooms':
      return (
        <SubCell primary={isLocked ? 'All' : isPartial ? 'Partial' : '—'} chips={[]} compare={compare} />
      );
    case 'co_boards':
      return (
        <SubCell primary={isLocked ? 'All' : isPartial ? 'BB, HB' : '—'} chips={[]} compare={compare} />
      );
    case 'co_tos':
      return (
        <SubCell
          primary={isLocked ? 'All' : isPartial ? 'Sunshine Tours' : '—'}
          chips={[]}
          compare={compare}
        />
      );
    case 'occ_tdh':
      return (
        <SubCell
          primary={`${d.toRn} RN`}
          secondary={`${d.to}%`}
          chips={[{ label: 'STLY', ref: d.sdlyRn }]}
          compare={compare}
        />
      );
    case 'occ_other':
      return (
        <SubCell
          primary={`${d.otherRms} RN`}
          secondary={`${d.otherPct}%`}
          chips={[{ label: 'STLY', ref: d.sdlyRn }]}
          compare={compare}
        />
      );
    case 'occ_rem':
      return (
        <SubCell
          primary={`${d.freeRms} RN`}
          secondary={`${Math.max(0, 100 - d.hotel)}%`}
          chips={[{ label: 'STLY', ref: 20 }]}
          compare={compare}
          isRem
        />
      );
    case 'onoff_on':
      return <SubCell primary={`${d.onlinePct}%`} chips={chips} compare={compare} />;
    case 'onoff_off':
      return <SubCell primary={`${100 - d.onlinePct}%`} chips={chips} compare={compare} />;
    case 'adr_t':
      return <SubCell primary={`$${d.toAdr}`} chips={[{ label: 'STLY', ref: d.sdlyA }]} compare={compare} />;
    case 'adr_hotel':
      return <SubCell primary={`$${d.adr}`} chips={[{ label: 'STLY', ref: d.sdlyA }]} compare={compare} />;
    case 'rev_t':
      return <SubCell primary={d.fR(d.toRev)} chips={[{ label: 'STLY', ref: d.fR(d.sdlyR) }]} compare={compare} />;
    case 'rev_hotel':
      return <SubCell primary={d.fR(d.hnRev)} chips={[{ label: 'STLY', ref: d.fR(d.lyR) }]} compare={compare} />;
    case 'rn_t':
      return <SubCell primary={`${d.toRn} RN`} chips={[{ label: 'STLY', ref: d.sdlyRn }]} compare={compare} />;
    case 'rn_hotel':
      return <SubCell primary={`${d.hnRn} RN`} chips={[{ label: 'STLY', ref: Math.round(d.lyRn) }]} compare={compare} />;
    case 'revpar_t':
      return <SubCell primary={`$${d.toRevpar}`} chips={[{ label: 'STLY', ref: d.sdlyRevpar }]} compare={compare} />;
    case 'revpar_h':
      return <SubCell primary={`$${d.hRevpar}`} chips={[{ label: 'STLY', ref: d.lyRevpar }]} compare={compare} />;
    case 'pickup_0_t':
      return <SubCell primary={`+${d.pickup}`} chips={chips} compare={compare} />;
    case 'pickup_0_h':
      return <SubCell primary={`+${d.hPickup}`} chips={chips} compare={compare} />;
    case 'avga_t':
      return <SubCell primary={d.avgA} chips={chips} compare={compare} />;
    case 'avga_h':
      return <SubCell primary={d.hAvgA} chips={chips} compare={compare} />;
    case 'los_t':
      return <SubCell primary={d.avgLos} chips={chips} compare={compare} />;
    case 'los_h':
      return <SubCell primary={d.hLos} chips={chips} compare={compare} />;
    case 'lead_t':
      return <SubCell primary={d.avgLead} chips={chips} compare={compare} />;
    case 'lead_h':
      return <SubCell primary={d.hLead} chips={chips} compare={compare} />;
    case 'biz_to':
      return <SubCell primary={`${d.toMix}%`} chips={chips} compare={compare} />;
    case 'biz_dir':
      return <SubCell primary={`${d.dirMix}%`} chips={chips} compare={compare} />;
    case 'biz_ota':
      return <SubCell primary={`${d.otaMix}%`} chips={chips} compare={compare} />;
    case 'biz_other':
      return <SubCell primary={`${d.otherMix}%`} chips={chips} compare={compare} />;
    default:
      if (row.mpKey && row.id.endsWith('_t')) {
        return (
          <SubCell
            primary={`${Math.round(d.toRn * (mealPct(d, row.mpKey) / 100))} RN`}
            chips={chips}
            compare={compare}
          />
        );
      }
      if (row.mpKey && row.id.endsWith('_h')) {
        return (
          <SubCell
            primary={`${Math.round(d.hnRn * (mealPct(d, row.mpKey) / 100))} RN`}
            chips={chips}
            compare={compare}
          />
        );
      }
      if (row.rtIdx !== undefined && row.rtSub === 'to') {
        return (
          <SubCell
            primary={`${Math.min(RT_CAPS[row.rtIdx], Math.floor((RT_CAPS[row.rtIdx] * d.to) / 100))} RN`}
            chips={chips}
            compare={compare}
          />
        );
      }
      if (row.rtIdx !== undefined && row.rtSub === 'avail') {
        const inv = RT_CAPS[row.rtIdx];
        const sold = Math.min(inv, Math.floor((inv * d.hotel) / 110));
        return (
          <SubCell
            primary={`${Math.max(0, inv - sold)} RN`}
            chips={chips}
            compare={compare}
            isRem
          />
        );
      }
      return null;
  }
}
