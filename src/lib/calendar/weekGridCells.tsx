import type { ReactNode } from 'react';
import { HOTEL_CAPACITY } from '@/data/calendarData';
import type { CompareMode } from '@/lib/calendar/metrics';
import type { WeekDayData, WbRow } from '@/lib/calendar/weekGridData';
import { RT_CAPS } from '@/lib/calendar/weekGridData';

function mealPct(d: WeekDayData, key: string) {
  const map: Record<string, number> = { ai: d.aiPct, bb: d.bbPct, hb: d.hbPct, ro: d.roPct };
  return map[key] ?? 0;
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

function barTrack(segments: { pct: number; color: string }[]) {
  return (
    <div className="wv-occ-bar-track">
      {segments.map((s, i) => (
        <div
          key={i}
          style={{ width: `${s.pct}%`, background: wbGrad(s.color), height: 6 }}
        />
      ))}
    </div>
  );
}

function CmpSuffix({
  curr,
  comp,
}: {
  curr: number;
  comp: number | null;
}) {
  if (comp == null || Number.isNaN(comp)) return null;
  const cls = curr > comp ? 'wv-cmp-up' : curr < comp ? 'wv-cmp-dn' : 'wv-cmp-neutral';
  return (
    <>
      <span className="wv-cmp-sep"> / </span>
      <span className={`wv-cmp-val-txt ${cls}`}>{comp}</span>
    </>
  );
}

function trendBadge(_d: WeekDayData, curr: number, stly: number, ly: number, fcst: number, compare: CompareMode) {
  if (compare === 'none') return null;
  const comp =
    compare === 'stly' ? stly : compare === 'ly' ? ly : compare === 'fcst' ? fcst : compare === 'budget' ? fcst : null;
  if (comp == null) return null;
  return <CmpSuffix curr={curr} comp={comp} />;
}

function sectVal(children: ReactNode) {
  return <div className="wb-sect-val">{children}</div>;
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
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0', fontSize: 12, fontWeight: 600 }}>
        Full Close Out
      </div>
    );
  }
  if (isPartial) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0', fontSize: 12, fontWeight: 600 }}>
        Partial
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0', fontSize: 12, color: '#059669' }}>
      Open
    </div>
  );
}

export function renderSectCell(row: WbRow, d: WeekDayData, compare: CompareMode) {
  switch (row.id) {
    case 'occ':
      return (
        <>
          {sectVal(
            <>
              <span className="wv-occ-total">{d.hotel}%</span>
              {trendBadge(d, d.hotel, d.sdlyH, d.lyH, d.fcstH, compare)}
            </>,
          )}
          {barTrack([
            { pct: d.to, color: '#004948' },
            { pct: d.otherPct, color: '#52d9ce' },
          ])}
        </>
      );
    case 'onoff':
      return (
        <>
          {sectVal(<span className="wv-occ-total">{d.onlinePct}%</span>)}
          {barTrack([
            { pct: d.onlinePct, color: '#004948' },
            { pct: 100 - d.onlinePct, color: '#52d9ce' },
          ])}
        </>
      );
    case 'adr':
      return (
        <>
          {sectVal(
            <>
              <span className="wv-occ-total">${d.toAdr}</span>
              {trendBadge(d, d.toAdr, d.sdlyA, d.lyA, d.fcstA, compare)}
            </>,
          )}
          {barTrack([{ pct: Math.min(90, Math.round(d.toAdr / 280 * 100)), color: '#004948' }])}
        </>
      );
    case 'rev':
      return (
        <>
          {sectVal(
            <>
              <span className="wv-occ-total">{d.fR(d.toRev)}</span>
              {trendBadge(d, d.toRev, d.sdlyR, d.lyR, d.fcstR, compare)}
            </>,
          )}
          {barTrack([{ pct: Math.min(90, Math.round(d.toRev / 4_500_000 * 100)), color: '#004948' }])}
        </>
      );
    case 'rn':
      return (
        <>
          {sectVal(
            <>
              <span className="wv-occ-total">{d.toRn}</span>
              {trendBadge(d, d.toRn, d.sdlyRn, d.lyRn, d.fcstRn, compare)}
            </>,
          )}
          {barTrack([
            { pct: Math.min(90, Math.round((d.toRn / HOTEL_CAPACITY) * 100)), color: '#004948' },
            { pct: Math.min(90, Math.round((d.hnRn / HOTEL_CAPACITY) * 100)), color: '#52d9ce' },
          ])}
        </>
      );
    case 'revpar_s':
      return (
        <>
          {sectVal(
            <>
              <span className="wv-occ-total">${d.hRevpar}</span>
              {trendBadge(d, d.hRevpar, d.sdlyRevpar, d.lyRevpar, d.hRevpar + 4, compare)}
            </>,
          )}
          {barTrack([{ pct: Math.min(90, Math.round(d.hRevpar / 4)), color: '#004948' }])}
        </>
      );
    case 'pickup_0':
      return (
        <>
          {sectVal(<span className="wv-occ-total">+{d.pickup}</span>)}
          {barTrack([{ pct: Math.min(90, d.pickup * 3), color: '#004948' }])}
        </>
      );
    case 'avga_s':
      return (
        <>
          {sectVal(<span className="wv-occ-total">{d.avgA}</span>)}
          {barTrack([
            { pct: Math.min(90, (parseFloat(d.avgA) / 3) * 100), color: '#004948' },
            { pct: Math.min(90, (parseFloat(d.hAvgA) / 3) * 100), color: '#52d9ce' },
          ])}
        </>
      );
    case 'los_s':
      return (
        <>
          {sectVal(<span className="wv-occ-total">{d.avgLos}</span>)}
          {barTrack([
            { pct: 60, color: '#004948' },
            { pct: 50, color: '#52d9ce' },
          ])}
        </>
      );
    case 'lead_s':
      return (
        <>
          {sectVal(<span className="wv-occ-total">{d.avgLead}</span>)}
          {barTrack([{ pct: Math.min(90, (parseInt(d.avgLead, 10) / 90) * 100), color: '#004948' }])}
        </>
      );
    case 'avail_s':
      return (
        <>
          {sectVal(<span className="wv-occ-total">{d.availRooms} rm</span>)}
          {barTrack([{ pct: Math.min(90, Math.round((d.availRooms / HOTEL_CAPACITY) * 100)), color: '#16a34a' }])}
        </>
      );
    case 'availg_s':
      return (
        <>
          {sectVal(<span className="wv-occ-total">{d.availGuar} rm</span>)}
          {barTrack([{ pct: Math.min(90, Math.round((d.availGuar / 20) * 100)), color: '#004948' }])}
        </>
      );
    case 'biz':
      return (
        <>
          {barTrack([
            { pct: d.toMix, color: '#004948' },
            { pct: d.dirMix, color: '#52d9ce' },
            { pct: d.otaMix, color: '#D97706' },
            { pct: d.otherMix, color: '#9ca3af' },
          ])}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 3, fontSize: 12 }}>
            <span style={{ color: '#004948' }}>TO {d.toMix}%</span>
            <span style={{ color: '#52d9ce' }}>D {d.dirMix}%</span>
            <span style={{ color: '#D97706' }}>OTA {d.otaMix}%</span>
          </div>
        </>
      );
    case 'mp_sum': {
      const gpr = parseFloat(d.hAvgA) + parseFloat(d.hAvgC);
      const aiSt = Math.round(d.hnRn * (d.aiPct / 100) * gpr);
      return (
        <>
          {barTrack([
            { pct: d.aiPct, color: '#004948' },
            { pct: d.bbPct, color: '#52d9ce' },
            { pct: d.hbPct, color: '#D97706' },
            { pct: d.roPct, color: '#d7f7ed' },
          ])}
          <div style={{ fontSize: 12, marginTop: 3 }}>AI {d.aiPct}% · {aiSt} seats</div>
        </>
      );
    }
    default:
      if (row.mpKey) {
        const pct = mealPct(d, row.mpKey);
        const hRm = Math.round(d.hnRn * (pct / 100));
        return (
          <>
            {sectVal(
              <>
                <span className="wv-occ-total">{pct}%</span>
                <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 4 }}>{hRm} RN</span>
              </>,
            )}
            {barTrack([{ pct, color: '#004948' }])}
          </>
        );
      }
      if (row.rtIdx !== undefined) {
        const inv = RT_CAPS[row.rtIdx];
        const sold = Math.min(inv, Math.floor((inv * d.hotel) / 110));
        const avRm = Math.max(0, inv - sold);
        const avClr = avRm <= 0 ? '#dc2626' : '#004948';
        return (
          <>
            {sectVal(
              <span className="wv-occ-total" style={{ color: avRm <= 0 ? '#16a34a' : avClr }}>
                {avRm <= 0 ? '0 available' : `${avRm} avail`}
              </span>,
            )}
            {barTrack([{ pct: Math.min(100, Math.round((sold / inv) * 100)), color: '#004948' }])}
          </>
        );
      }
      if (row.toIdx !== undefined) {
        const toRate = d.adr - 15 + Math.abs((d.dm * (row.toIdx + 3) + d.dd * (row.toIdx + 5)) % 50);
        return (
          <>
            {sectVal(<span className="wv-occ-total">${toRate}</span>)}
            {barTrack([{ pct: 70, color: '#004948' }])}
          </>
        );
      }
      if (row.toBase) {
        const baseRate = d.adr + 8;
        return (
          <>
            {sectVal(<span className="wv-occ-total" style={{ fontWeight: 700 }}>${baseRate}</span>)}
            {barTrack([{ pct: Math.min(90, Math.round(baseRate / 280 * 100)), color: '#004948' }])}
          </>
        );
      }
      return null;
  }
}

export function renderSubCell(
  row: WbRow,
  d: WeekDayData,
  isLocked: boolean,
  isPartial: boolean,
) {
  let v1 = '';
  let v2 = '';

  switch (row.id) {
    case 'co_rooms':
      v1 = isLocked ? 'All' : isPartial ? 'Partial' : '—';
      break;
    case 'co_boards':
      v1 = isLocked ? 'All' : isPartial ? 'BB, HB' : '—';
      break;
    case 'co_tos':
      v1 = isLocked ? 'All' : isPartial ? 'Sunshine Tours' : '—';
      break;
    case 'occ_tdh':
      v1 = `${d.toRn} RN`;
      v2 = `${d.to}%`;
      break;
    case 'occ_other':
      v1 = `${d.otherRms} RN`;
      v2 = `${d.otherPct}%`;
      break;
    case 'occ_rem':
      v1 = `${d.freeRms} RN`;
      v2 = `${Math.max(0, 100 - d.hotel)}%`;
      break;
    case 'onoff_on':
      v1 = `${d.onlinePct}%`;
      break;
    case 'onoff_off':
      v1 = `${100 - d.onlinePct}%`;
      break;
    case 'adr_t':
      v1 = `$${d.toAdr}`;
      break;
    case 'adr_hotel':
      v1 = `$${d.adr}`;
      break;
    case 'rev_t':
      v1 = d.fR(d.toRev);
      break;
    case 'rev_hotel':
      v1 = d.fR(d.hnRev);
      break;
    case 'rn_t':
      v1 = `${d.toRn} RN`;
      break;
    case 'rn_hotel':
      v1 = `${d.hnRn} RN`;
      break;
    case 'revpar_t':
      v1 = `$${d.toRevpar}`;
      break;
    case 'revpar_h':
      v1 = `$${d.hRevpar}`;
      break;
    case 'pickup_0_t':
      v1 = `+${d.pickup}`;
      break;
    case 'pickup_0_h':
      v1 = `+${d.hPickup}`;
      break;
    case 'avga_t':
      v1 = d.avgA;
      break;
    case 'avga_h':
      v1 = d.hAvgA;
      break;
    case 'los_t':
      v1 = d.avgLos;
      break;
    case 'los_h':
      v1 = d.hLos;
      break;
    case 'lead_t':
      v1 = d.avgLead;
      break;
    case 'lead_h':
      v1 = d.hLead;
      break;
    case 'biz_to':
      v1 = `${d.toMix}%`;
      break;
    case 'biz_dir':
      v1 = `${d.dirMix}%`;
      break;
    case 'biz_ota':
      v1 = `${d.otaMix}%`;
      break;
    case 'biz_other':
      v1 = `${d.otherMix}%`;
      break;
    default:
      if (row.mpKey && row.id.endsWith('_t')) {
        v1 = `${Math.round(d.toRn * (mealPct(d, row.mpKey) / 100))} RN`;
      } else if (row.mpKey && row.id.endsWith('_h')) {
        v1 = `${Math.round(d.hnRn * (mealPct(d, row.mpKey) / 100))} RN`;
      } else if (row.rtIdx !== undefined && row.rtSub === 'to') {
        v1 = `${Math.min(RT_CAPS[row.rtIdx], Math.floor((RT_CAPS[row.rtIdx] * d.to) / 100))} RN`;
      } else if (row.rtIdx !== undefined && row.rtSub === 'avail') {
        const inv = RT_CAPS[row.rtIdx];
        const sold = Math.min(inv, Math.floor((inv * d.hotel) / 110));
        v1 = `${Math.max(0, inv - sold)} RN`;
      }
  }

  const remCls = row.isRem ? ' wb-sub-val-rem' : '';
  return (
    <div className={`wb-sub-vals${remCls}`}>
      <span className="wb-sub-v1">{v1}</span>
      {v2 ? <span className="wb-sub-v2">{v2}</span> : null}
    </div>
  );
}
