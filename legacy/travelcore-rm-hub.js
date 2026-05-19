var _realAgGrid = window.agGrid || null; // capture real AG Grid before shim
(function(){
  function makeGrid(el, opts){
    if(!el) return {};
    var cols = opts.columnDefs || [];
    var rows = opts.rowData || [];
    function render(rowData){
      var s = '<div style="overflow:auto;width:100%"><table style="width:100%;border-collapse:collapse;font-size:13px">';
      s += '<thead><tr>';
      cols.forEach(function(c){
        s += '<th style="text-align:left;padding:8px 12px;background:#f1f5f9;border-bottom:2px solid #e2e8f0;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.4px;white-space:nowrap">'+(c.headerName||c.field||'')+'</th>';
      });
      s += '</tr></thead><tbody>';
      rowData.forEach(function(row,i){
        s += '<tr style="background:'+(i%2?'#f8fafc':'#fff')+';border-bottom:1px solid #f1f5f9">';
        cols.forEach(function(c){
          var v = row[c.field];
          if(v==null) v='';
          if(c.cellRenderer){try{v=c.cellRenderer({value:v,data:row});}catch(e){}}
          s += '<td style="padding:8px 12px;color:#374151">'+v+'</td>';
        });
        s += '</tr>';
      });
      s += '</tbody></table></div>';
      el.style.height='';
      el.innerHTML=s;
    }
    render(rows);
    return {
      setGridOption:function(k,v){if(k==='rowData')render(v);},
      setColumnsVisible:function(){},
      setQuickFilter:function(q){
        var filtered=rows.filter(function(r){
          return !q||Object.values(r).some(function(v){return String(v).toLowerCase().includes(q.toLowerCase());});
        });
        render(filtered);
      },
      destroy:function(){}
    };
  }
  window.agGrid = {
    createGrid: makeGrid,
    themeQuartz: { withParams: function(p){ return p||{}; } }
  };
})();

window.html2canvas=function(){return Promise.resolve(document.createElement("canvas"))};

'use strict';
var sharedTheme = agGrid.themeQuartz.withParams({
  accentColor: '#0E7B80',
  backgroundColor: '#ffffff',
  foregroundColor: '#181D1F',
  headerBackgroundColor: '#F8F9FA',
  headerTextColor: '#374151',
  borderColor: '#E9ECEF',
  rowBorder: true,
  columnBorder: false,
  rowHoverColor: 'rgba(0,0,0,0.03)',
  selectedRowBackgroundColor: 'rgba(14,123,128,0.08)',
  oddRowBackgroundColor: '#ffffff',
  fontFamily: 'Lato, sans-serif',
  fontSize: 14,
  headerFontSize: 11,
  headerFontWeight: 700,
  wrapperBorderRadius: 8,
  wrapperBorder: true,
  spacing: 8,
  cellHorizontalPadding: 16,
});
function _closeAllDropdowns(exceptId) {
  var ids = ['calFiltersDropdown','wvFiltersDropdown','calMetricsDropdown','calCloseDropdown','wvCloseDropdown','calDRPanel'];
  ids.forEach(function(id) {
    if (id === exceptId) return;
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  ['calFiltersBtn','wvFiltersBtn','calMetricsBtn','calCloseOutBtn'].forEach(function(bid) {
    var b = document.getElementById(bid);
    if (b) b.classList.remove('active');
  });
}

const ALL_MONTHS = [
  { name: 'January 2026',  year: 2026, month: 1, days: 31, firstDay: 4,
    stats: { occ: '62%', occDelta: '+2.10', adr: '$165', adrDelta: '+1.80', rev: '$421k', revDelta: '+3.90' }, lockedCount: 1 },
  { name: 'February 2026', year: 2026, month: 2, days: 28, firstDay: 0,
    stats: { occ: '65%', occDelta: '+4.37', adr: '$178', adrDelta: '+3.90', rev: '$483k', revDelta: '+6.47' }, lockedCount: 2 },
  { name: 'March 2026',    year: 2026, month: 3, days: 31, firstDay: 0,
    stats: { occ: '66%', occDelta: '+3.42', adr: '$183', adrDelta: '+1 vs LY', rev: '$562k', revDelta: '+6 vs LY' }, lockedCount: 3 },
  { name: 'April 2026',    year: 2026, month: 4, days: 30, firstDay: 3,
    stats: { occ: '66%', occDelta: '+2.12', adr: '$188', adrDelta: '+1.18', rev: '$570k', revDelta: '+6.18' }, lockedCount: 2 },
  { name: 'May 2026',      year: 2026, month: 5, days: 31, firstDay: 5,
    stats: { occ: '71%', occDelta: '+5.20', adr: '$196', adrDelta: '+4.10', rev: '$641k', revDelta: '+8.30' }, lockedCount: 1 },
  { name: 'June 2026',     year: 2026, month: 6, days: 30, firstDay: 1,
    stats: { occ: '74%', occDelta: '+3.80', adr: '$210', adrDelta: '+5.60', rev: '$712k', revDelta: '+9.10' }, lockedCount: 0 },
  { name:'July 2026',      year:2026, month:7,  days:31, firstDay:3, lockedCount:2, stats:{occ:'78%',occDelta:'+2.1',adr:'$172',adrDelta:'+$8',rev:'$562k',revDelta:'+6.1%'} },
  { name:'August 2026',    year:2026, month:8,  days:31, firstDay:6, lockedCount:4, stats:{occ:'91%',occDelta:'+5.3',adr:'$198',adrDelta:'+$14',rev:'$710k',revDelta:'+9.2%'} },
  { name:'September 2026', year:2026, month:9,  days:30, firstDay:2, lockedCount:1, stats:{occ:'74%',occDelta:'+1.8',adr:'$162',adrDelta:'+$5',rev:'$490k',revDelta:'+3.5%'} },
  { name:'October 2026',   year:2026, month:10, days:31, firstDay:4, lockedCount:3, stats:{occ:'69%',occDelta:'-1.2',adr:'$148',adrDelta:'-$3',rev:'$434k',revDelta:'-2.1%'} },
  { name:'November 2026',  year:2026, month:11, days:30, firstDay:0, lockedCount:2, stats:{occ:'62%',occDelta:'-3.4',adr:'$138',adrDelta:'-$7',rev:'$375k',revDelta:'-5.8%'} },
  { name:'December 2026',  year:2026, month:12, days:31, firstDay:2, lockedCount:5, stats:{occ:'85%',occDelta:'+4.1',adr:'$205',adrDelta:'+$18',rev:'$692k',revDelta:'+8.4%'} },
];

let calStartIdx = 0; // start at January
let calView = 2;        // default 2 months on load
let calDisplayView = 2; // default 2 months on load
const CAL_DAY_HEIGHT = '180px';

/** Compact $ for monthly day cells — keeps full values readable in narrow cells */
function calFmtCellMoney(n) {
  var neg = n < 0;
  var v = Math.round(Math.abs(n));
  var s;
  if (v >= 1000000) s = '$' + (v / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  else if (v >= 10000) s = '$' + Math.round(v / 1000) + 'k';
  else if (v >= 1000) s = '$' + (v / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  else s = '$' + v;
  return neg ? '-' + s : s;
}
function calFmtCellMoneyFull(n) {
  return (n < 0 ? '-' : '') + '$' + Math.round(Math.abs(n)).toLocaleString('en-US');
}

function calApplyDayCellHeights() {
  const grid = document.getElementById('calMonths');
  if (!grid) return;
  const isCompact = calDisplayView >= 3;
  const h = isCompact ? '36px' : CAL_DAY_HEIGHT;
  document.documentElement.style.setProperty('--cal-day-height', h);
  var styleEl = document.getElementById('cal-day-height-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'cal-day-height-style';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = isCompact
    ? '#calMonths.cal-compact .cal-day,#calMonths.cal-compact .cal-day.empty{height:36px!important;min-height:36px!important;max-height:36px!important}'
    : '#calMonths:not(.cal-compact) .cal-day,#calMonths:not(.cal-compact) .cal-day.empty{height:' + h + '!important;min-height:' + h + '!important;max-height:' + h + '!important}#calMonths:not(.cal-compact) .cal-days{grid-auto-rows:' + h + '}';
  grid.setAttribute('data-cal-day-height', h);
  grid.querySelectorAll('.cal-day').forEach(function (el) {
    el.style.setProperty('height', h, 'important');
    el.style.setProperty('min-height', h, 'important');
    el.style.setProperty('max-height', h, 'important');
  });
}
let calRangeFrom   = new Date(2026, 0, 1);  // active date-range start (global)
let calRangeTo     = new Date(2026, 11, 31); // active date-range end   (global)
let calDateRangeStart = null; // start of selected date range (for navigation)
let calSelStart  = null;  // { month, day } — range start
let calSelEnd    = null;  // { month, day } — range end
let calSelPicking = false; // true after first click, waiting for end

// Filter bar state
const TO_FILTER_MULT = { all:1.0, sunwing:0.82, tui:1.18, 'thomas-cook':0.71, 'club-med':1.08 };
let calFiltTO = 'all';
let calCompareMode = 'none'; // 'ly', 'stly', 'fcst', 'budget', 'none'
function calSetCompare(val) {
  calCompareMode = val || 'none';
  var sel = document.getElementById('calCompare');
  if (sel) sel.value = calCompareMode;
  renderCalendar();
}
var CAL_CMP_MIN_CELL_W = 108;
var CAL_FULL_UNITS_MIN_CELL_W = 112;

function calMetricUseFull() {
  if (calDisplayView >= 3) return false;
  return _calMeasureDayCellWidth() >= CAL_FULL_UNITS_MIN_CELL_W;
}

function calCmpRowSeed(month, day, rowIdx, label) {
  var s = String(label || '');
  var h = 0;
  for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs((month * 37 + day * 19 + rowIdx * 11 + (h % 997)) % 997);
}

// Per-metric compare multiplier so day cells mix up/down arrows (not one direction for all rows)
function calCmpRefMult(baseMult, rowIdx, month, day, label) {
  if (!baseMult) return baseMult;
  var h = calCmpRowSeed(month, day, rowIdx, label);
  var wantUp = (rowIdx + Math.floor(h / 31)) % 2 === 0;
  var jitter = 0.90 + (h % 11) * 0.008;
  if (wantUp) {
    if (baseMult < 1) return baseMult * jitter;
    return 0.86 + (h % 13) * 0.006;
  }
  if (baseMult < 1) return 1.03 + (h % 9) * 0.005;
  return baseMult * (1.05 + (h % 7) * 0.006);
}

function calCmpRefValue(current, baseMult, rowIdx, month, day, label) {
  if (current == null || isNaN(current) || !baseMult) return current;
  return parseFloat(current) * calCmpRefMult(baseMult, rowIdx, month, day, label);
}

function calCmpRefAdditive(current, baseDelta, rowIdx, month, day, label) {
  if (current == null || isNaN(current)) return null;
  var cur = parseFloat(current);
  var base = cur + (baseDelta || 0);
  var h = calCmpRowSeed(month, day, rowIdx, label);
  var wantUp = (rowIdx + Math.floor(h / 31)) % 2 === 0;
  var extra = 2 + (h % 6);
  if (wantUp) return base < cur ? base : cur - extra;
  return base > cur ? base : cur + extra;
}

function _calMeasureDayCellWidth() {
  var grid = document.getElementById('calMonths');
  if (!grid || grid.classList.contains('cal-compact')) return 0;
  var cell = grid.querySelector('.cal-day:not(.empty)');
  return cell ? cell.getBoundingClientRect().width : 0;
}

function _calSyncCellCompareVisibility() {
  var grid = document.getElementById('calMonths');
  if (!grid) return;
  // Inline arrows in day cells only when there is room; compare still applies to eye popup + accordions
  var cellW = _calMeasureDayCellWidth();
  var hasInlineSpace = calDisplayView < 3 && cellW >= CAL_CMP_MIN_CELL_W;
  var showInlineCmp = hasInlineSpace && calCompareMode !== 'none';
  grid.classList.toggle('cal-cmp-visible', showInlineCmp);
  var wrap = document.getElementById('calCompareWrap');
  if (wrap) wrap.classList.remove('cmp-disabled');
  var sel = document.getElementById('calCompare');
  if (sel) sel.disabled = false;
}

function _calUpdateCompareState() {
  _calSyncCellCompareVisibility();
}
window.addEventListener('resize', _calUpdateCompareState);

var _calCompareResizeObs = null;
function _calBindCompareResizeObserver() {
  var grid = document.getElementById('calMonths');
  if (!grid || _calCompareResizeObs) return;
  _calCompareResizeObs = new ResizeObserver(function () {
    _calSyncCellCompareVisibility();
  });
  _calCompareResizeObs.observe(grid);
}
const ALLOTMENTS = {
  sunwing:       { total: 42, pct: 0.88 },
  tui:           { total: 55, pct: 0.72 },
  'thomas-cook': { total: 30, pct: 0.58 },
  'club-med':    { total: 25, pct: 0.94 },
};

// Heatmap + close-out colour tokens (shared across calendar, week view, reports)
const HM_METRIC_COLORS = { grey: '#D33030', blue: '#FDF6F6', green: '#2E65E8' };
const HM_STOP_SALES_COLORS = { closed: '#D32F2F', partial: '#FFB90F', open: '#388C3F' };
const CLOSE_OUT_COLORS = {
  full: HM_STOP_SALES_COLORS.closed,
  fullBg: '#FFEBEE',
  partial: HM_STOP_SALES_COLORS.partial,
  partialBg: '#FFF8E6',
  open: HM_STOP_SALES_COLORS.open,
  openBg: '#E8F5E9'
};

// Closed-out days
const LOCKED_DAYS = new Set(['2-1', '2-23', '3-3', '3-17', '4-8']);

// Metadata for fully-locked days (who applied the closeout and when)
const LOCKED_DAYS_META = {
  '2-1':  { appliedBy: 'Sarah M.',  appliedAt: '2026-01-14T08:47:00' },
  '2-23': { appliedBy: 'James K.',  appliedAt: '2026-02-06T15:22:00' },
  '3-3':  { appliedBy: 'Ana L.',    appliedAt: '2026-02-12T09:05:00' },
  '3-17': { appliedBy: 'Priya T.',  appliedAt: '2026-02-28T11:34:00' },
  '4-8':  { appliedBy: 'Carlos R.', appliedAt: '2026-03-21T16:58:00' },
};

// Partial closures: specific TOs, room types, board types closed out per date
// PARTIAL_CLOSURES: each day has an array of strategies.
// Each rule: { tos:[], roomTypes:[], boards:[], appliedBy:'', appliedAt:'' }
// Empty array = applies to ALL of that dimension.
// Multiple strategies on same day = independent close-out entries.
const PARTIAL_CLOSURES = {
  '2-5':  [
    { tos:['Sunshine Tours'], roomTypes:['Suite','Jr. Suite'], boards:[],         appliedBy:'Sarah M.',  appliedAt:'2026-01-22T10:14:00' },
    { tos:[],                 roomTypes:['Standard'],           boards:['ro'],    appliedBy:'James K.',  appliedAt:'2026-01-22T10:31:00' },
  ],
  '2-12': [
    { tos:[],                 roomTypes:['Standard','Deluxe'],  boards:['ro','hb'], appliedBy:'Priya T.',  appliedAt:'2026-01-30T14:09:00' },
  ],
  '2-18': [
    { tos:['Global Adv.','City Breaks'], roomTypes:[], boards:[],                appliedBy:'Carlos R.', appliedAt:'2026-02-03T09:52:00' },
  ],
  '2-25': [
    { tos:['Adventure'],      roomTypes:['Family'],             boards:['ro'],    appliedBy:'Ana L.',    appliedAt:'2026-02-10T16:41:00' },
    { tos:[],                 roomTypes:[],                     boards:['hb'],    appliedBy:'Ana L.',    appliedAt:'2026-02-10T16:55:00' },
  ],
  '3-4':  [
    { tos:['Sunshine Tours','Beach Hols'], roomTypes:[], boards:['ro'],           appliedBy:'Sarah M.',  appliedAt:'2026-02-11T08:30:00' },
  ],
  '3-7':  [
    { tos:[],                 roomTypes:['Suite','Jr. Suite','Family'], boards:['ai'], appliedBy:'James K.',  appliedAt:'2026-02-18T11:07:00' },
    { tos:['Global Adv.'],    roomTypes:['Standard'],           boards:[],        appliedBy:'James K.',  appliedAt:'2026-02-18T11:22:00' },
  ],
  '3-9':  [
    { tos:['Global Adv.','City Breaks'], roomTypes:['Standard'], boards:[],       appliedBy:'Priya T.',  appliedAt:'2026-02-20T13:45:00' },
    { tos:[],                 roomTypes:[],                     boards:['ro'],    appliedBy:'Carlos R.', appliedAt:'2026-02-20T14:03:00' },
  ],
  '3-11': [
    { tos:[],                 roomTypes:['Deluxe','Suite'],     boards:['ro','hb'], appliedBy:'Sarah M.',  appliedAt:'2026-02-24T09:18:00' },
  ],
  '3-13': [
    { tos:['Sunshine Tours'], roomTypes:[],                     boards:['ai','ro'], appliedBy:'Ana L.',    appliedAt:'2026-02-26T10:44:00' },
    { tos:[],                 roomTypes:['Jr. Suite'],           boards:[],        appliedBy:'Ana L.',    appliedAt:'2026-02-26T10:57:00' },
  ],
  '3-15': [
    { tos:['Beach Hols','City Breaks'], roomTypes:['Standard','Superior'], boards:['bb'], appliedBy:'James K.',  appliedAt:'2026-02-28T08:12:00' },
    { tos:['Adventure'],      roomTypes:[],                     boards:['ai'],    appliedBy:'Priya T.',  appliedAt:'2026-02-28T08:29:00' },
  ],
  '3-18': [
    { tos:['Global Adv.'],    roomTypes:['Jr. Suite'],           boards:[],       appliedBy:'Carlos R.', appliedAt:'2026-03-04T15:33:00' },
  ],
  '3-20': [
    { tos:[],                 roomTypes:['Family'],             boards:['ro','hb'], appliedBy:'Sarah M.',  appliedAt:'2026-03-06T11:20:00' },
  ],
  '3-22': [
    { tos:['Adventure'],      roomTypes:['Suite'],              boards:[],        appliedBy:'Priya T.',  appliedAt:'2026-03-09T09:05:00' },
    { tos:[],                 roomTypes:[],                     boards:['bb'],    appliedBy:'Priya T.',  appliedAt:'2026-03-09T09:17:00' },
  ],
  '3-25': [
    { tos:['Sunshine Tours'], roomTypes:['Standard'],           boards:['ro'],    appliedBy:'James K.',  appliedAt:'2026-03-10T14:48:00' },
    { tos:['Global Adv.'],    roomTypes:['Deluxe'],             boards:['ro'],    appliedBy:'James K.',  appliedAt:'2026-03-10T15:02:00' },
    { tos:[],                 roomTypes:[],                     boards:['hb'],    appliedBy:'Ana L.',    appliedAt:'2026-03-11T08:31:00' },
  ],
  '3-28': [
    { tos:['City Breaks'],    roomTypes:[],                     boards:['ai','fb'], appliedBy:'Carlos R.', appliedAt:'2026-03-13T10:19:00' },
  ],
  '4-5':  [
    { tos:['Sunshine Tours'], roomTypes:[],                     boards:['ai','ro'], appliedBy:'Sarah M.',  appliedAt:'2026-03-19T09:40:00' },
  ],
  '4-12': [
    { tos:['Beach Hols'],     roomTypes:['Suite'],              boards:[],        appliedBy:'Ana L.',    appliedAt:'2026-03-25T11:55:00' },
    { tos:['Adventure'],      roomTypes:['Family'],             boards:[],        appliedBy:'Ana L.',    appliedAt:'2026-03-25T12:08:00' },
    { tos:[],                 roomTypes:[],                     boards:['ro'],    appliedBy:'James K.',  appliedAt:'2026-03-26T08:44:00' },
  ],
  '4-17': [
    { tos:[],                 roomTypes:['Standard','Superior','Deluxe'], boards:['ro'], appliedBy:'Priya T.',  appliedAt:'2026-04-01T13:27:00' },
  ],
  '4-20': [
    { tos:['Global Adv.','City Breaks'], roomTypes:['Jr. Suite'], boards:['hb','bb'], appliedBy:'Carlos R.', appliedAt:'2026-04-03T10:06:00' },
  ],
  '4-25': [
    { tos:['Adventure'],      roomTypes:['Family'],             boards:[],        appliedBy:'Sarah M.',  appliedAt:'2026-04-08T09:33:00' },
  ],
};

// Blue online/offline dot days
const SPECIAL_DOTS = { '3-8': '#2563EB', '4-3': '#2563EB', '2-14': '#2563EB' };

// ── Calendar Events data
const CAL_EVENTS = {
  "1-1":  [{ name: "New Year Rate Launch",     type: "One-time",  date: "1/1/2026"  }],
  "1-3":  [{ name: "Weekend Opener",           type: "Recurring", date: "1/3/2026"  }],
  "1-5":  [{ name: "January Flash Sale",       type: "One-time",  date: "1/5/2026"  }],
  "1-7":  [{ name: "Midweek Special",          type: "Recurring", date: "1/7/2026"  }],
  "1-10": [{ name: "Weekend Rate Boost",       type: "Recurring", date: "1/10/2026" }],
  "1-12": [{ name: "Winter Warmup Package",    type: "One-time",  date: "1/12/2026" }],
  "1-15": [{ name: "Mid-Month Review",         type: "One-time",  date: "1/15/2026" },
            { name: "Weekend Flash Sale",      type: "Recurring", date: "1/15/2026" }],
  "1-17": [{ name: "Midweek Offer",            type: "Recurring", date: "1/17/2026" }],
  "1-19": [{ name: "Martin Luther King Rate",  type: "One-time",  date: "1/19/2026" }],
  "1-21": [{ name: "Winter Rate Push",         type: "Recurring", date: "1/21/2026" }],
  "1-24": [{ name: "Weekend Package",          type: "Recurring", date: "1/24/2026" }],
  "1-26": [{ name: "Late Jan Flash Sale",      type: "One-time",  date: "1/26/2026" }],
  "1-28": [{ name: "Midweek Promo",            type: "Recurring", date: "1/28/2026" }],
  "1-31": [{ name: "Month-End Rate Review",    type: "One-time",  date: "1/31/2026" }],
  "2-14": [{ name: "Valentine Day Promo",      type: "One-time",  date: "2/14/2026" }],
  "2-28": [{ name: "Q1 Rate Review",           type: "One-time",  date: "2/28/2026" }],
  "3-1":  [{ name: "Spring Season Launch",     type: "One-time",  date: "3/1/2026"  }],
  "3-3":  [{ name: "Weekend Flash Sale",       type: "Recurring", date: "3/3/2026"  }],
  "3-5":  [{ name: "Midweek Offer",            type: "Recurring", date: "3/5/2026"  }],
  "3-8":  [{ name: "International Womens Day", type: "One-time",  date: "3/8/2026"  },
            { name: "Weekend Rate Boost",      type: "Recurring", date: "3/8/2026"  }],
  "3-10": [{ name: "Spring Promotion",         type: "Recurring", date: "3/10/2026" }],
  "3-12": [{ name: "Midweek Special",          type: "Recurring", date: "3/12/2026" }],
  "3-15": [{ name: "Mid-Month Rate Review",    type: "One-time",  date: "3/15/2026" }],
  "3-17": [{ name: "St Patricks Day Event",    type: "One-time",  date: "3/17/2026" }],
  "3-19": [{ name: "Weekend Package",          type: "Recurring", date: "3/19/2026" }],
  "3-20": [{ name: "Spring Equinox Special",   type: "One-time",  date: "3/20/2026" }],
  "3-24": [{ name: "Midweek Offer",            type: "Recurring", date: "3/24/2026" }],
  "3-29": [{ name: "Easter Long Weekend",      type: "One-time",  date: "3/29/2026" }],
  "3-31": [{ name: "Month-End Flash Sale",     type: "One-time",  date: "3/31/2026" }],
  "4-1":  [{ name: "April Fools Flash Sale",   type: "One-time",  date: "4/1/2026"  }],
  "4-3":  [{ name: "Weekend Rate Boost",       type: "Recurring", date: "4/3/2026"  }],
  "4-5":  [{ name: "Spring Bank Holiday Rate", type: "One-time",  date: "4/5/2026"  }],
  "4-7":  [{ name: "Midweek Promo",            type: "Recurring", date: "4/7/2026"  }],
  "4-10": [{ name: "Good Friday Close",        type: "One-time",  date: "4/10/2026" }],
  "4-12": [{ name: "Easter Sunday Package",    type: "One-time",  date: "4/12/2026" }],
  "4-14": [{ name: "Post-Easter Offer",        type: "One-time",  date: "4/14/2026" }],
  "4-17": [{ name: "Weekend Package",          type: "Recurring", date: "4/17/2026" }],
  "4-20": [{ name: "Earth Day Eco Rate",       type: "One-time",  date: "4/20/2026" }],
  "4-22": [{ name: "Midweek Special",          type: "Recurring", date: "4/22/2026" }],
  "4-25": [{ name: "Weekend Flash Sale",       type: "Recurring", date: "4/25/2026" }],
  "4-26": [{ name: "Sunday Funday Package",    type: "One-time",  date: "4/26/2026" }],
  "4-28": [{ name: "Midweek Offer",            type: "Recurring", date: "4/28/2026" }],
  "4-29": [{ name: "Late April Promo",         type: "One-time",  date: "4/29/2026" },
            { name: "Weekend Rate Boost",      type: "Recurring", date: "4/29/2026" }],
  "5-1":  [{ name: "May Day Special",          type: "One-time",  date: "5/1/2026"  }],
  "5-3":  [{ name: "Weekend Package",          type: "Recurring", date: "5/3/2026"  }],
  "5-5":  [{ name: "Cinco de Mayo Promo",      type: "One-time",  date: "5/5/2026"  }],
  "5-7":  [{ name: "Midweek Flash Sale",       type: "Recurring", date: "5/7/2026"  }],
  "5-10": [{ name: "Mothers Day Package",      type: "One-time",  date: "5/10/2026" }],
  "5-12": [{ name: "Spring Offer",             type: "Recurring", date: "5/12/2026" }],
};


// Total hotel capacity (rooms)
const HOTEL_CAPACITY = 210;

// Demo days: hotel is high-demand but TO rooms sold are much lower (contrast examples)
const LOW_TO_DAYS = {
  '2-7':  { hotel: 87, to: 18 },
  '2-15': { hotel: 82, to: 22 },
  '2-22': { hotel: 91, to: 14 },
  '3-5':  { hotel: 85, to: 19 },
  '3-11': { hotel: 79, to: 25 },
  '3-20': { hotel: 88, to: 12 },
  '4-2':  { hotel: 84, to: 17 },
  '4-14': { hotel: 90, to: 21 },
  '4-21': { hotel: 78, to: 16 },
};

function getOccupancy(month, day) {
  const key = `${month}-${day}`;
  if (LOW_TO_DAYS[key]) return LOW_TO_DAYS[key];
  const s = month * 31 + day;
  const hotel = 20 + Math.abs((s * 47 + 31 + s * s * 3) % 72); // 20-92%
  // TO occupancy is a subset of hotel — must not exceed it
  const to    = Math.max(5, Math.min(hotel, hotel + Math.floor((s * 17 + 7) % 21) - 10));
  return { hotel, to };
}

// Convert occupancy % to room count
function toRooms(pct) { return Math.round(HOTEL_CAPACITY * pct / 100); }

/* Map occupancy % to 10-step Heatmap Blue scale (hotel) — Figma 2026 Design System */
function getHotelClass(pct) { return ''; }

/* Heatmap removed */
function getSegClass(pct) { return ''; }

/* Pick white vs black label text from computed background (heatmap + occ fills) */
function calLuminanceFromColor(css) {
  if (!css || css === 'transparent') return 1;
  var m = css.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (!m) return 1;
  var r = +m[1], g = +m[2], b = +m[3], a = m[4] !== undefined ? +m[4] : 1;
  r = Math.round(r * a + 255 * (1 - a));
  g = Math.round(g * a + 255 * (1 - a));
  b = Math.round(b * a + 255 * (1 - a));
  var lin = function(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function calApplyCellContrast() {
  document.querySelectorAll('#calMonths .cal-day:not(.empty)').forEach(function(day) {
    var lum = calLuminanceFromColor(getComputedStyle(day).backgroundColor);
    var onDark = lum <= 0.45;
    day.classList.toggle('cal-on-dark', onDark);
    day.classList.toggle('cal-on-light', !onDark);
    var content = day.querySelector('.cell-content');
    if (content) {
      if (day.classList.contains('locked') || day.classList.contains('cal-partial-close')) {
        var lumC = calLuminanceFromColor(getComputedStyle(content).backgroundColor);
        var cDark = lumC <= 0.45;
        content.classList.toggle('cal-on-dark', cDark);
        content.classList.toggle('cal-on-light', !cDark);
      } else {
        content.classList.remove('cal-on-dark', 'cal-on-light');
      }
    }
  });
}
window.calApplyCellContrast = calApplyCellContrast;

// Legacy alias
function getCellClass(hotel) { return getHotelClass(hotel); }

function getPickupPct(month, day) {
  const s = month * 31 + day;
  return Math.abs((s * 37 + 19 + s * s * 5) % 28);
}
function getGuaranteeFill(month, day) {
  const s = month * 31 + day;
  return 40 + Math.abs((s * 29 + 11) % 50);
}

let calMetric = 'occupancy';

const CAL_METRIC_DEFS = {
  hotelOcc:    { label: 'H-Occ',   color: '#5883ed', maxVal: 100,   fmt: function(v){ return v + '%'; },                        name: 'Hotel Occ',       group: 'Occupancy'  },
  toOcc:       { label: 'TO-Occ',   color: '#006461', maxVal: 100,   fmt: function(v){ return v + '%'; },                        name: 'TO Occ',           group: 'Occupancy'  },
  lyOcc:       { label: 'LY-Occ',  color: '#93c5fd', maxVal: 100,   fmt: function(v){ return v + '%'; },                        name: 'LY Occ',          group: 'Occupancy'  },
  fcstOcc:     { label: 'Fc-Occ',  color: '#fbbf24', maxVal: 100,   fmt: function(v){ return v + '%'; },                        name: 'Fcst Occ',        group: 'Occupancy'  },
  hotelAdr:    { label: 'H-ADR',   color: '#7c3aed', maxVal: 300,   fmt: function(v){ return '$' + v; },                        name: 'Hotel ADR',       group: 'ADR'        },
  toAdr:       { label: 'TO-ADR',   color: '#4f46e5', maxVal: 300,   fmt: function(v){ return '$' + v; },                        name: 'TO ADR',           group: 'ADR'        },
  lyAdr:       { label: 'LY-ADR',  color: '#c4b5fd', maxVal: 300,   fmt: function(v){ return '$' + v; },                        name: 'LY ADR',          group: 'ADR'        },
  fcstAdr:     { label: 'Fc-ADR',  color: '#fde68a', maxVal: 300,   fmt: function(v){ return '$' + v; },                        name: 'Fcst ADR',        group: 'ADR'        },
  hotelRev:    { label: 'H-Rev',   color: '#ea580c', maxVal: 50000, fmt: function(v){ return '$' + Math.round(v/1000) + 'k'; }, name: 'Hotel Revenue',   group: 'Revenue'    },
  toRev:       { label: 'TO-Rev',   color: '#b45309', maxVal: 50000, fmt: function(v){ return '$' + Math.round(v/1000) + 'k'; }, name: 'TO Revenue',       group: 'Revenue'    },
  lyRev:       { label: 'LY-Rev',  color: '#fdba74', maxVal: 50000, fmt: function(v){ return '$' + Math.round(v/1000) + 'k'; }, name: 'LY Revenue',      group: 'Revenue'    },
  fcstRev:     { label: 'Fc-Rev',  color: '#fcd34d', maxVal: 50000, fmt: function(v){ return '$' + Math.round(v/1000) + 'k'; }, name: 'Fcst Revenue',    group: 'Revenue'    },
  hotelPickup: { label: 'H-Pkp',   color: '#16a34a', maxVal: 30,    fmt: function(v){ return (v>=0?'+':'') + v; },              name: 'Hotel Pickup',    group: 'Pickup'     },
  toPickup:    { label: 'TO-Pkp',   color: '#0d9488', maxVal: 30,    fmt: function(v){ return (v>=0?'+':'') + v; },              name: 'TO Pickup',        group: 'Pickup'     },
  hotelRn:     { label: 'H-RN',    color: '#2e65e8', maxVal: 210,   fmt: function(v){ return String(v); },                      name: 'Hotel RN Sold',   group: 'RN Sold'    },
  toRn:        { label: 'TO-RN',    color: '#0284c7', maxVal: 210,   fmt: function(v){ return String(v); },                      name: "TO RN Sold",       group: 'RN Sold'    },
  hotelTrev:   { label: 'H-TRV',   color: '#9333ea', maxVal: 500,   fmt: function(v){ return '$' + v; },                        name: 'Hotel RevPAR',    group: 'RevPAR'     },
  toTrev:      { label: 'TO-TRV',   color: '#7c3aed', maxVal: 500,   fmt: function(v){ return '$' + v; },                        name: 'TO RevPAR',        group: 'RevPAR'     },
  lyRevpar:    { label: 'LY-RVP',  color: '#d8b4fe', maxVal: 500,   fmt: function(v){ return '$' + v; },                        name: 'LY RevPAR',       group: 'RevPAR'     },
  fcstRevpar:  { label: 'Fc-RVP',  color: '#fef08a', maxVal: 500,   fmt: function(v){ return '$' + v; },                        name: 'Fcst RevPAR',     group: 'RevPAR'     },
  remainRooms:  { label: 'Rem',    color: '#16a34a', maxVal: 210,   fmt: function(v){ return String(v); },                        name: 'Remaining Rooms',    group: 'Other'         },
  avgAdults:    { label: 'AdA',    color: '#2e65e8', maxVal: 4,     fmt: function(v){ return v.toFixed(1); },                     name: 'Avg Adults',         group: 'Other'         },
  avgChildren:  { label: 'CHD',   color: '#d33030', maxVal: 2,     fmt: function(v){ return v.toFixed(1); },                     name: 'Avg Children',       group: 'Other'         },
  availRooms:   { label: 'AvR',   color: '#16a34a', maxVal: 210,   fmt: function(v){ return String(v); },                        name: 'Avail Rooms',        group: 'Other'         },
  availGuar:    { label: 'AvG',   color: '#ea580c', maxVal: 30,    fmt: function(v){ return String(v); },                        name: 'Avail Guar.',        group: 'Other'         },
  avgLos:       { label: 'LOS',   color: '#0891b2', maxVal: 14,    fmt: function(v){ return v.toFixed(1) + 'n'; },               name: 'Avg LOS',            group: 'Stay Behaviour'},
  avgLeadTime:  { label: 'Lead',  color: '#6366f1', maxVal: 365,   fmt: function(v){ return v + 'd'; },                          name: 'Avg Lead Time',      group: 'Stay Behaviour'},
  bizMixTO:     { label: 'TO%',   color: '#006461', maxVal: 100,   fmt: function(v){ return v + '%'; },                          name: 'TO Mix %',           group: 'Business Mix'  },
  bizMixDirect: { label: 'Dir%',  color: '#0284c7', maxVal: 100,   fmt: function(v){ return v + '%'; },                          name: 'Direct Mix %',       group: 'Business Mix'  },
  bizMixOTA:    { label: 'OTA%',  color: '#D97706', maxVal: 100,   fmt: function(v){ return v + '%'; },                          name: 'OTA Mix %',          group: 'Business Mix'  },
  rateTO:       { label: 'TO-R',  color: '#0f766e', maxVal: 500,   fmt: function(v){ return '$' + v; },                          name: 'TO Contract Rate',   group: 'Selling Rates' },
  ratePromo:    { label: 'Prmo%', color: '#d97706', maxVal: 50,    fmt: function(v){ return v + '%'; },                          name: 'Promotion %',        group: 'Selling Rates' },
  rateBase:     { label: 'Base',  color: '#9333ea', maxVal: 500,   fmt: function(v){ return '$' + v; },                          name: 'Base Segment Rate',  group: 'Selling Rates' },
};
let calCellMetrics = ['hotelOcc', 'toOcc'];

let showForecast = false;
function getForecast(month, day) {
  var v = Math.floor(Math.abs((month * 67 + day * 43 + month * day * 3) % 22)) - 8;
  var base = getOccupancy(month, day);
  return {
    hotel: Math.max(5, Math.min(100, base.hotel + v)),
    to:    Math.max(5, Math.min(100, base.to + Math.floor(v * 0.6))),
    adr:   150 + Math.abs((month * 47 + day * 31) % 130) + v * 3,
    rev:   (base.hotel + v) * (150 + Math.abs((month * 47 + day * 31) % 130)) * HOTEL_CAPACITY / 100 * 1.1,
  };
}

let bulkSelectMode = false;
let bulkSelected = new Set();

function renderCalendar() {
  const container = document.getElementById('calMonths');
  if (!container) return;

  const visible = ALL_MONTHS.slice(calStartIdx, calStartIdx + calView);

  // Update nav range label — target the dedicated date-nav row element
  const rangeLabel = calView <= 2
    ? visible[0].name
    : `${visible[0].name.split(' ')[0]} – ${visible[visible.length-1].name}`;
  const rangeEl = document.getElementById('calRange') || document.querySelector('.cal-range');
  if (rangeEl) rangeEl.textContent = rangeLabel;
  var moRangeEl = document.getElementById('moShufRange');
  if (moRangeEl) moRangeEl.textContent = rangeLabel;

  // Grid columns — max 4 per row
  var gridCols = calView;
  if (calDisplayView >= 3) gridCols = Math.min(calView, 3);
  container.style.gridTemplateColumns = 'repeat(' + gridCols + ', 1fr)';

  const _isCompactView = (calDisplayView >= 3);
  const DOW = _isCompactView ? ['M','T','W','T','F','S','S'] : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  container.innerHTML = visible.map(m => {
    let cells = '';
    const mondayFirst = (m.firstDay + 6) % 7;
    for (let i = 0; i < mondayFirst; i++) {
      cells += `<div class="cal-day empty"></div>`;
    }
    for (let d = 1; d <= m.days; d++) {
      const key     = `${m.month}-${d}`;
      const isLocked = LOCKED_DAYS.has(key);
      const isToday  = (m.month === 3 && d === 9);
      const dot      = SPECIAL_DOTS[key];
      const { hotel, to: toRaw } = getOccupancy(m.month, d);
      const toMult = (typeof TO_FILTER_MULT !== 'undefined' && TO_FILTER_MULT[calFiltTO]) ? TO_FILTER_MULT[calFiltTO] : 1;
      const to = Math.min(95, Math.round(toRaw * toMult));

      let metricVal = hotel;
      if (calMetric === 'pickup') metricVal = getPickupPct(m.month, d);
      else if (calMetric === 'guarantees') metricVal = getGuaranteeFill(m.month, d);
      const isActionNeeded = hotel >= 65 && to < 40 && !isLocked;
      const cellClass = isActionNeeded ? getSegClass(to) : getHotelClass(metricVal);

      const cellAdr = 150 + Math.abs((m.month * 47 + d * 31) % 130);
      const cellRev = Math.floor(hotel * cellAdr * HOTEL_CAPACITY / 100 * 1.1);
      const cellRnSold = Math.floor(hotel * HOTEL_CAPACITY / 100);
      const cellPickup = getPickupPct(m.month, d) - 10;
      const _pdv = (typeof pickupDayValues !== 'undefined' && pickupDayValues) || window.pickupDayValues || [1, 3, 7];
      const cellRemainRooms = HOTEL_CAPACITY - cellRnSold;
      const cellAvgAdults = parseFloat((1.8 + Math.abs((m.month * 11 + d * 7) % 3) * 0.1).toFixed(1));
      const cellAvgChildren = parseFloat((0.3 + Math.abs((m.month * 7 + d * 13) % 5) * 0.1).toFixed(1));
      const cellTrevpar = 180 + Math.abs((m.month * 53 + d * 29) % 200);
      const cellAvailGuar = Math.max(0, 5 + Math.floor(Math.abs((m.month * 7 + d * 11) % 20)));
      const toRnSold   = Math.round(HOTEL_CAPACITY * to / 100);
      const toAdrVal   = Math.max(80, cellAdr - 20 - Math.abs((m.month * 3 + d * 7) % 15));
      const toRevVal   = Math.floor(toRnSold * toAdrVal);
      const toPickupV  = Math.max(0, Math.floor(cellPickup * to / Math.max(1, hotel)));
      const toTrevVal  = Math.max(50, cellTrevpar - 30 - Math.abs((m.month * 5 + d * 3) % 20));
      const lyF   = 0.88 + Math.abs((m.month * 3 + d * 7) % 8) * 0.005;
      const fcF   = 1.04 + Math.abs((m.month * 5 + d * 11) % 6) * 0.005;
      const cellMetricVals = {
        hotelOcc: hotel, toOcc: to,
        lyOcc: Math.round(hotel * lyF), fcstOcc: Math.min(100, Math.round(hotel * fcF)),
        hotelAdr: cellAdr, toAdr: toAdrVal,
        lyAdr: Math.round(cellAdr * lyF), fcstAdr: Math.round(cellAdr * fcF),
        hotelRev: cellRev, toRev: toRevVal,
        lyRev: Math.round(cellRev * lyF), fcstRev: Math.round(cellRev * fcF),
        hotelPickup: cellPickup, toPickup: toPickupV,
        hotelPickup_0: Math.max(0, Math.round(cellPickup * (_pdv[0]<=1?0.3:_pdv[0]<=3?0.6:_pdv[0]<=7?1:Math.min(2,_pdv[0]/7)))),
        hotelPickup_1: Math.max(0, Math.round(cellPickup * (_pdv[1]<=1?0.3:_pdv[1]<=3?0.6:_pdv[1]<=7?1:Math.min(2,_pdv[1]/7)))),
        hotelPickup_2: Math.max(0, Math.round(cellPickup * (_pdv[2]<=1?0.3:_pdv[2]<=3?0.6:_pdv[2]<=7?1:Math.min(2,_pdv[2]/7)))),
        toPickup_0: Math.max(0, Math.round(toPickupV * (_pdv[0]<=1?0.3:_pdv[0]<=3?0.6:_pdv[0]<=7?1:Math.min(2,_pdv[0]/7)))),
        toPickup_1: Math.max(0, Math.round(toPickupV * (_pdv[1]<=1?0.3:_pdv[1]<=3?0.6:_pdv[1]<=7?1:Math.min(2,_pdv[1]/7)))),
        toPickup_2: Math.max(0, Math.round(toPickupV * (_pdv[2]<=1?0.3:_pdv[2]<=3?0.6:_pdv[2]<=7?1:Math.min(2,_pdv[2]/7)))),
        hotelRn: cellRnSold, toRn: toRnSold,
        hotelTrev: cellTrevpar, toTrev: toTrevVal,
        lyRevpar: Math.round(cellTrevpar * lyF), fcstRevpar: Math.round(cellTrevpar * fcF),
        remainRooms: cellRemainRooms,
        avgAdults: cellAvgAdults, avgChildren: cellAvgChildren,
        availRooms: cellRemainRooms, availGuar: cellAvailGuar,
        avgLos:       parseFloat((2.8 + Math.abs((m.month*11+d*7)%5)*0.3).toFixed(1)),
        avgLeadTime:  18 + Math.abs((m.month*13+d*11)%60),
        bizMixTO:     28 + Math.abs((m.month*7+d*5)%25),
        bizMixDirect: 30 + Math.abs((m.month*5+d*9)%20),
        bizMixOTA:    20 + Math.abs((m.month*9+d*3)%18),
        rateTO:       Math.round(cellAdr * 0.82),
        ratePromo:    5 + Math.abs((m.month*3+d*7)%18),
        rateBase:     Math.round(cellAdr * 1.08),
        totalGuests:  Math.round(hotel * HOTEL_CAPACITY / 100 * (cellAvgAdults + cellAvgChildren)),
      };
      // ── Icons (Material: apartment = hotel, confirmation_number = TO) ──
      const icoHotel = `<span class="material-icons cell-m-ico" style="font-size:10px;color:#b0b5ba">apartment</span>`;
      const icoTO    = `<span class="material-icons cell-m-ico" style="font-size:10px;color:#b0b5ba">confirmation_number</span>`;
      // Lock icons for pill chips — Figma 1145-37471 / 1145-37492
      const _lockFilled   = '<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" style="flex-shrink:0"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>';
      const _lockOutlined = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" style="flex-shrink:0"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
      const eyeSvg  = `<button class="cell-eye" aria-label="Quick view" data-month="${m.month}" data-day="${d}"><span class="material-icons" style="font-size:14px">visibility</span></button>`;

      // ── Build metric rows from Cell Metrics selection ──
      const isCompact = (calDisplayView >= 3);
      const metricRows = (function() {
        if (isCompact) return '';
        // Use cmBuildRows to get what user selected in Cell Metrics panel
        var _useFullMetrics = calMetricUseFull();
        var rows = (typeof window.cmBuildRows === 'function')
          ? window.cmBuildRows(cellMetricVals, _useFullMetrics)
          : [
              { label: 'H-Occ', value: hotel + '%', raw: hotel, color: '#5883ed' },
              { label: 'TO-Occ', value: to + '%',    raw: to,    color: '#006461' },
            ];

        // Compare multipliers
        var _stlyF = 0.85 + Math.abs((m.month * 5 + d * 3) % 10) * 0.006;
        var _fcstF = 1.04 + Math.abs((m.month * 5 + d * 11) % 6) * 0.005;
        var _budgF = 0.95 + Math.abs((m.month * 9 + d * 4) % 8) * 0.004;
        var _cmpMult = calCompareMode === 'ly' ? lyF
          : calCompareMode === 'stly' ? _stlyF
          : calCompareMode === 'fcst' ? _fcstF
          : calCompareMode === 'budget' ? _budgF : 0;

        var _hasCmp = !!_cmpMult;
        return rows.map(function(r, _ri, _ra) {
          // Determine if this is a Hotel (H-) or TO (TO-) metric by label prefix
          var lbl = r.label || '';
          var isTO = lbl.substring(0, 3) === 'TO-';
          var isH  = lbl.charAt(0) === 'H' && lbl.charAt(1) === '-';
          var metricColorClass = isTO ? 'cell-m-to' : 'cell-m-hotel';
          // Short label: strip H-/TO- prefix, then strip LY-/STLY-/Fcst- for cleanliness
          var shortLabel = isTO ? lbl.substring(3) : (isH ? lbl.substring(2) : lbl);
          shortLabel = shortLabel.replace(/^LY-|^STLY-|^Fcst-/, '');

          // Detect metric unit from value string and label (value takes priority)
          var _sl = shortLabel.toLowerCase();
          var _v = r.value;
          var _hasUnit = _v.indexOf('%') >= 0 || _v.indexOf('$') >= 0 || _v.indexOf('RN') >= 0 || _v.indexOf('n') >= 0 || _v.indexOf('d') >= 0;
          var _isPercent = _v.indexOf('%') >= 0 || (!_hasUnit && (_sl.indexOf('occ') >= 0 || _sl.indexOf('mix') >= 0));
          var _isDollarK = _v.indexOf('$') >= 0 && _v.indexOf('k') >= 0;
          var _isDollar = !_isDollarK && (_v.indexOf('$') >= 0 || (!_hasUnit && (_sl.indexOf('adr') >= 0 || (_sl.indexOf('rev') >= 0 && _sl.indexOf('revpar') < 0) || _sl.indexOf('revpar') >= 0 || _sl.indexOf('rate') >= 0 || _sl === 'base')));

          // Inline compare: difference vs LY / STLY / Fcst / Budget + arrow
          var cmpHtml = '';
          if (_hasCmp && _cmpMult && r.raw != null && !isNaN(r.raw)) {
            var cmpRaw = calCmpRefValue(r.raw, _cmpMult, _ri, m.month, d, shortLabel);
            var diff = r.raw - cmpRaw;
            var absDiff = Math.abs(diff);
            var diffStr;
            if (_isDollarK || _isDollar) {
              diffStr = calFmtCellMoney(absDiff);
            } else if (_isPercent) {
              diffStr = Math.round(absDiff) + '%';
            } else if (_v.indexOf('RN') >= 0 || _sl.indexOf('rn') >= 0) {
              diffStr = Math.round(absDiff) + ' RN';
            } else if (_v.indexOf('n') >= 0 && _sl.indexOf('los') >= 0) {
              diffStr = (Math.round(absDiff * 10) / 10).toFixed(1) + (_useFullMetrics ? ' nights' : 'n');
            } else if (_v.indexOf('d') >= 0 && _sl.indexOf('lead') >= 0) {
              diffStr = Math.round(absDiff) + (_useFullMetrics ? ' days' : 'd');
            } else {
              diffStr = String(Math.round(absDiff));
            }
            if (diff !== 0) {
              var cmpClr = diff > 0 ? '#388C3F' : '#D32F2F';
              var arrow = diff > 0 ? 'arrow_upward' : 'arrow_downward';
              cmpHtml = '<span class="cell-m-cmp" style="color:' + cmpClr + '">'
                + '<span class="material-icons cell-m-cmp-arrow">' + arrow + '</span>'
                + '<span class="cell-m-cmp-amt">' + diffStr + '</span></span>';
            }
          }

          // Ensure primary value has unit when missing
          var displayVal = r.value;
          var valTitle = '';
          if (_isPercent && _v.indexOf('%') < 0) displayVal = Math.round(r.raw) + '%';
          else if (_isDollarK || _isDollar) {
            displayVal = calFmtCellMoney(r.raw);
            valTitle = calFmtCellMoneyFull(r.raw);
          }

          if (r._html) return '<div class="cell-m-row cell-m-row-stacked ' + metricColorClass + '">'
            + '<span class="cell-m-label">' + shortLabel + '</span>'
            + r._html + '</div>';
          return '<div class="cell-m-row ' + metricColorClass + '">'
            + '<span class="cell-m-label" title="' + shortLabel + '">' + shortLabel + '</span>'
            + '<span class="cell-m-val"' + (valTitle ? ' title="' + valTitle + '"' : '') + '>' + displayVal + '</span>'
            + cmpHtml
            + '</div>';
        }).join('');
      })();

      const calCl = PARTIAL_CLOSURES[m.month + '-' + d];
      const hasCalCl = !isLocked && calCl && Array.isArray(calCl) && calCl.length > 0;
      const hasCalEvents = (typeof CAL_EVENTS !== 'undefined') && CAL_EVENTS[m.month + '-' + d] && CAL_EVENTS[m.month + '-' + d].length > 0;
      const _isStopSalesActive = typeof window.hmIsStopSales === 'function' && window.hmIsStopSales();
      const isBulkSel = bulkSelectMode && isLocked && bulkSelected.has(key);
      const isInRange = calSelStart && calSelEnd && (function(){
        var s = calSelStart, e = calSelEnd;
        if (s.month === e.month && s.day === e.day) return false;
        var before = s.month < m.month || (s.month === m.month && s.day <= d);
        var after = e.month > m.month || (e.month === m.month && e.day >= d);
        return before && after;
      })();
      const hmDayData = {
        hotel: hotel, to: to,
        remainRooms: cellMetricVals ? (cellMetricVals.remainRooms || 0) : 0,
        totalGuests: cellMetricVals ? (cellMetricVals.totalGuests || 0) : 0,
        isFullClose: isLocked,
        hasPartialClose: isActionNeeded,
        closureRules: calCl || [],
        toOtb: to * 1.8,
        toFcst: to * 1.6 + Math.abs((m.month * 7 + d * 11) % 15)
      };
      const hmClass = (typeof window.hmGetCellClass === 'function') ? window.hmGetCellClass(hmDayData) : '';
      const classes = ['cal-day', cellClass, hmClass, isLocked ? 'locked' : '', hasCalCl ? 'cal-partial-close' : '', isToday ? 'today' : '', isActionNeeded ? 'action-needed' : '', bulkSelectMode && isLocked ? 'bulk-selectable' : '', isBulkSel ? 'bulk-sel' : '', isInRange ? 'in-range' : '', hasCalEvents ? 'has-events' : ''].filter(Boolean).join(' ');

      const hotelRooms = toRooms(hotel);
      const toRoomsSold = toRooms(to);
      const capTipAttr = isLocked ? '' : ` onmouseenter="calShowCapTip(event,${hotel},${hotelRooms},${to},${toRoomsSold},${210-hotelRooms-toRoomsSold},${m.month},${d})" onmouseleave="calHideCapTip()"`;
      const moIso = `${m.year}-${String(m.month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const moChk = _moSelectedDays.has(moIso) ? ' checked' : '';
      cells += `<div class="${classes}" data-month="${m.month}" data-day="${d}"${capTipAttr}>
        <div class="cell-day-hdr">
          <input type="checkbox" class="wv-day-chk mo-day-chk"${moChk} onclick="event.stopPropagation();moDayCheck('${moIso}',this)" title="Select for close-out">
          <span class="day-num">${d}</span>
          <span class="cell-hdr-spacer">${eyeSvg}</span>
        </div>
        ${!isCompact ? '<div class="cell-close-slot">'
          + (isLocked ? '<span class="cell-closed-label">Closed' + _lockFilled + '</span>' : '')
          + (hasCalCl ? '<span class="cell-partial-close-label" style="cursor:pointer" onmouseenter="calShowEventTip(event,\'' + m.month + '-' + d + '\')" onmouseleave="calHideEventTip()">Partial' + _lockFilled + '</span>' : '')
          + '</div>' : ''}
        ${!isCompact ? `<div class="cell-content${calCompareMode !== 'none' ? ' cmp-active' : ''}">${metricRows}</div>` : ''}
        ${!isCompact && hasCalEvents ? '<span class="cell-event-ico" onmouseenter="calShowEventTip(event,\''+m.month+'-'+d+'\')" onmouseleave="calHideEventTip()"><span class="material-icons" style="font-size:16px;color:#006461">today</span></span>' : ''}
      </div>`;
    }

    const s = m.stats;

    // Monthly summary data (seeded per month)
    const mSeed = m.month * 17;
    const mOcc   = 58 + mSeed % 28;
    const mAdr   = 142 + mSeed % 60;
    const mRev   = Math.round(mOcc * mAdr * 210 / 100 * m.days / 1000);
    const mRn    = Math.round(mOcc * 210 / 100 * m.days);
    const mRevpar= Math.round(mAdr * mOcc / 100);
    const mPickup= 8 + mSeed % 18;
    // Avg Adults / Avg Children
    const mAvgA  = (1.8 + mSeed%3*0.1).toFixed(1);
    const mAvgC  = (0.3 + mSeed%2*0.1).toFixed(1);
    // Avail rooms/guar
    const mAvailR= 210 - Math.round(mOcc*210/100);
    const mAvailG= 8 + mSeed%12;
    // TO RN sold
    const mToOcc = 28 + mSeed % 20;
    const mToRn  = Math.round(mToOcc * 210 / 100 * m.days);
    const mToAdr = Math.round(mAdr * 0.88);
    const mToRev = Math.round(mToRn * mToAdr / 1000);
    // Meal plan breakdown
    const mpAI   = Math.round(mRn * 0.52);
    const mpHB   = Math.round(mRn * 0.24);
    const mpBB   = Math.round(mRn * 0.14);
    const mpRO   = mRn - mpAI - mpHB - mpBB;
    // Room avail by type
    const avStd  = Math.round(mAvailR * 0.40);
    const avDel  = Math.round(mAvailR * 0.22);
    const avSte  = Math.round(mAvailR * 0.18);
    const avFam  = mAvailR - avStd - avDel - avSte;

    // Compute locked day counts from live data
    const _mPrefix = m.month + '-';
    const _actualFullLocked = Array.from(LOCKED_DAYS).filter(k => k.startsWith(_mPrefix)).length;
    const _actualPartLocked = Object.keys(PARTIAL_CLOSURES).filter(k => k.startsWith(_mPrefix) && !LOCKED_DAYS.has(k)).length;
    const _totalLocked = _actualFullLocked + _actualPartLocked;

    return `
      <div class="cal-month">
        <div class="cal-month-hdr">
          <span class="cal-month-name">${m.name}</span>
          ${!(typeof window.hmIsStopSales === 'function' && window.hmIsStopSales()) && _totalLocked > 0 ? `<span class="cal-lock-badge"><span class="material-icons" style="font-size:12px">lock</span>${_totalLocked}</span>` : ''}
        </div>
        <div class="cal-dow">${DOW.map(d => `<span>${d}</span>`).join('')}</div>
        <div class="cal-days">${cells}</div>
        
        <div class="cal-month-summary">
        </div>
      </div>`;
  }).join('');

  // Re-attach popup listeners after re-render
  const calMonths = document.getElementById('calMonths');
  if (calMonths) calMonths._popupBound = false; // reset so popup IIFE re-binds below

  // Re-apply any active range selection
  applyCalSelection();
  calApplyDayCellHeights();
  _calSyncCellCompareVisibility();
  _calBindCompareResizeObserver();
  // Monthly summary (1M/2M/3M)
  renderCalMonthlySummary();
  requestAnimationFrame(function() {
    requestAnimationFrame(calApplyCellContrast);
  });
  if (typeof window.hmSyncCalViewClass === 'function') window.hmSyncCalViewClass();
}

// Keep old name for legacy call at bottom
function buildCalendar() { renderCalendar(); }

// ── Monthly summary accordion state ──────────────────────────────────────────
var _calAccState = { daily: false, more: false, meals: false, biz: false, tc: false, overview: true };

window.calAccClick = function(hdr) {
  var sect = hdr.closest('.wv-acc-sect');
  var body = hdr.nextElementSibling;
  if (!sect || !body) return;
  var isOpen = sect.classList.contains('wv-acc-open');
  // Toggle all sections with same data-cal-section (multi-month view has duplicates)
  var key = hdr.dataset.calSection;
  _calAccState[key] = isOpen; // isOpen means it was open and is now closing
  document.querySelectorAll('.cal-summary-wrap .wv-acc-hdr[data-cal-section="' + key + '"]').forEach(function(h) {
    var s = h.closest('.wv-acc-sect');
    var b = h.nextElementSibling;
    if (s) s.classList.toggle('wv-acc-open', !isOpen);
    if (b) b.classList.toggle('wv-body-hidden', isOpen);
    // Rotate chevron
    var chev = h.querySelector('.wv-acc-chev svg');
    if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
  });
};

// ── Monthly Summary Metrics (1M / 2M / 3M) ─────────────────────────────────
function renderCalMonthlySummary() {
  var el = document.getElementById('calMonthlySummary');
  if (!el) return;
  if (calDisplayView > 3) { el.style.display = 'none'; return; }
  el.style.display = 'block';

  var visible = ALL_MONTHS.slice(calStartIdx, calStartIdx + calView);
  var isSingle = calView === 1;
  var WV = 250;

  // ── Helpers ────────────────────────────────────────────────────────────
  function fR(v){ return v>=1000000?'$'+(v/1000000).toFixed(1)+'M':'$'+Math.round(v/1000)+'k'; }

  function dualBar(tPct, hPct, clr) {
    return '<div style="height:3px;border-radius:2px;margin-top:3px;background:#e5e7eb;position:relative">'
      +(hPct!=null?'<div style="position:absolute;top:0;left:0;height:100%;width:'+Math.min(92,hPct)+'%;background:#d1d5db;border-radius:2px"></div>':'')
      +'<div style="position:absolute;top:0;left:0;height:100%;width:'+Math.min(92,tPct)+'%;background:'+clr+';border-radius:2px"></div>'
      +'</div>';
  }
  function sBar(segs) {
    return '<div style="height:5px;background:#e5e7eb;border-radius:3px;display:flex;overflow:hidden;margin:3px 0">'
      +segs.map(function(s){return '<div style="width:'+s.p+'%;background:'+s.c+'"></div>';}).join('')
      +'</div>';
  }
  function refChips(pairs) {
    var CSS={stly:'background:#e0e7ff;color:#4338ca',ly:'background:#dcfce7;color:#15803d',fcst:'background:#fef9c3;color:#a16207'};
    return '<div style="display:flex;gap:2px;flex-wrap:wrap;margin-top:2px">'
      +pairs.map(function(p){return '<span style="font-size:7px;font-weight:700;padding:1px 4px;border-radius:3px;'+CSS[p.k]+'">'+p.l+' '+p.v+'</span>';}).join('')
      +'</div>';
  }
  function mRow(lbl, tVal, hVal, tPct, hPct, clr, refs) {
    return '<div style="display:flex;align-items:center;gap:3px;margin-bottom:4px">'
      +'<span style="font-size:8px;color:#6b7280;flex:1;min-width:0">'+lbl+'</span>'
      +(hVal?'<span style="display:flex;flex-direction:column;align-items:flex-end">'
        +'<span style="font-size:6px;font-weight:700;color:#9ca3af;text-transform:uppercase">Hotel</span>'
        +'<span style="font-size:8px;color:#6b7280">'+hVal+'</span></span>':'')
      +'<span style="display:flex;flex-direction:column;align-items:flex-end;margin-left:6px">'
      +'<span style="font-size:6px;font-weight:700;color:'+clr+';text-transform:uppercase">TO</span>'
      +'<span style="font-size:9px;font-weight:800;color:'+clr+'">'+tVal+'</span></span>'
      +'</div>'
      +(tPct!=null?dualBar(tPct,hPct,clr):'')
      +(refs?refChips(refs):'');
  }
  function colHdr(clr) {
    return '<div style="display:flex;justify-content:flex-end;gap:12px;margin-bottom:5px;padding-bottom:3px;border-bottom:1px solid #f3f4f6">'
      +'<span style="font-size:6.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.3px">Hotel</span>'
      +'<span style="font-size:6.5px;font-weight:700;color:'+(clr||'#006461')+';text-transform:uppercase;letter-spacing:.3px;min-width:24px;text-align:right">TO</span>'
      +'</div>';
  }
  var chevUp   = '<span class="material-icons" style="font-size:16px">expand_less</span>';
  var chevDown = '<span class="material-icons" style="font-size:16px">expand_more</span>';
  function sec(title, key, content) {
    var collapsed = _calAccState[key] !== false ? !!_calAccState[key] : false;
    return '<div class="wv-acc-sect' + (collapsed ? '' : ' wv-acc-open') + '">'
      + '<div class="wv-acc-hdr" data-cal-section="' + key + '" onclick="calAccClick(this)">'
      + '<span class="wv-acc-chev" style="color:#006461">' + (collapsed ? chevDown : chevUp) + '</span>'
      + '<span class="wv-acc-title">' + title + '</span>'
      + '</div>'
      + '<div class="wv-acc-body' + (collapsed ? ' wv-body-hidden' : '') + '" style="padding:8px 10px 6px">'
      + content
      + '</div></div>';
  }

  // ── Aggregate per-month ─────────────────────────────────────────────────
  var months = visible.map(function(m) {
    var nd = m.days, nm = m.month;
    var sumHotel=0,sumTo=0,sumAdr=0,sumToAdr=0,sumRev=0,sumHRev=0;
    var sumPickup=0,sumHPickup=0,sumRevpar=0,sumHRevpar=0;
    var sumRn=0,sumHRn=0;
    var sumLos=0,sumHLos=0,sumLead=0,sumHLead=0;
    var sumTotA=0,sumTotC=0,sumHTotA=0,sumHTotC=0;
    var sumAvailRooms=0,sumAvailGuar=0;
    var sumAi=0,sumBb=0,sumHb=0;
    var sumToMix=0,sumDirMix=0,sumOtaMix=0;
    var sumFit=0,sumDyn=0,sumSer=0,sumOther=0,sumFree=0;
    var sumOnline=0;
    var tcRateSum=[0,0,0,0,0];
    for (var d = 1; d <= nd; d++) {
      var hh = getOccupancy(nm, d);
      var hotel=hh.hotel, to=hh.to;
      var adr=150+Math.abs((nm*47+d*31)%130);
      var v=Math.abs((nm*127+d*53+nm*d*7+d*d*3))%100;
      var toAdr=Math.max(80,adr-20-Math.abs((nm*3+d*7)%15));
      var toRn=Math.round(WV*to/100), hnRn=Math.round(WV*hotel/100);
      var avgA=(1.8+v%3*0.1), avgC=(0.3+v%2*0.1);
      sumHotel+=hotel; sumTo+=to;
      sumAdr+=adr; sumToAdr+=toAdr;
      sumRev+=Math.floor(toRn*toAdr); sumHRev+=Math.floor(hnRn*adr);
      sumRn+=toRn; sumHRn+=hnRn;
      sumPickup+=Math.max(0,Math.floor((v%25+5)*to/Math.max(1,hotel)));
      sumHPickup+=Math.floor(v%25+5);
      sumRevpar+=Math.max(50,(adr+80)-30-Math.abs((nm*5+d*3)%20));
      sumHRevpar+=adr+80;
      sumLos+=2.8+v%5*0.3; sumHLos+=2.8+v%5*0.3+0.4;
      sumLead+=18+v%60; sumHLead+=18+v%60+12;
      sumTotA+=Math.round(toRn*avgA); sumTotC+=Math.round(toRn*avgC);
      sumHTotA+=Math.round(hnRn*(avgA+0.3)); sumHTotC+=Math.round(hnRn*(avgC+0.1));
      sumAvailRooms+=Math.max(0,102-Math.floor(hotel*1.02));
      sumAvailGuar+=Math.floor(8+v%5);
      sumAi+=Math.max(45,Math.min(68,55+(nm*7+d*3)%14));
      sumBb+=Math.max(14,Math.min(28,20+(nm*11+d*5)%11));
      sumHb+=Math.max(6,Math.min(16,10+(nm*5+d*7)%9));
      sumToMix+=28+Math.abs((nm*7+d*5)%25);
      sumDirMix+=30+Math.abs((nm*5+d*9)%20);
      sumOtaMix+=20+Math.abs((nm*9+d*3)%18);
      var fitP=Math.round(to*0.45),dynP=Math.round(to*0.35),serP=to-fitP-dynP;
      sumFit+=fitP; sumDyn+=dynP; sumSer+=serP;
      sumOther+=Math.max(0,hotel-to); sumFree+=Math.max(0,100-hotel);
      sumOnline+=Math.max(30,Math.min(80,45+Math.abs((nm*13+d*7)%35)));
      for(var ii=0;ii<5;ii++) tcRateSum[ii]+=adr-15+Math.abs((nm*(ii+3)+d*(ii+5))%50);
    }
    var n=nd;
    var avgH=Math.round(sumHotel/n), avgT=Math.round(sumTo/n);
    var avgAdr=Math.round(sumAdr/n), avgToAdr2=Math.round(sumToAdr/n);
    var avgRev=fR(Math.round(sumRev/n)), avgHRev=fR(Math.round(sumHRev/n));
    var totalRev=fR(sumRev), totalHRev=fR(sumHRev);
    var avgRevpar=Math.round(sumRevpar/n), avgHRevpar=Math.round(sumHRevpar/n);
    var avgPickup=Math.round(sumPickup/n), avgHPickup=Math.round(sumHPickup/n);
    var avgRn=Math.round(sumRn/n), avgHRn=Math.round(sumHRn/n);
    var avgLos=(sumLos/n).toFixed(1)+'n', avgHLos=(sumHLos/n).toFixed(1)+'n';
    var avgLead=Math.round(sumLead/n)+'d', avgHLead=Math.round(sumHLead/n)+'d';
    var avgAvailRooms=Math.round(sumAvailRooms/n), avgAvailGuar=Math.round(sumAvailGuar/n);
    var totA=Math.round(sumTotA/n), totC=Math.round(sumTotC/n);
    var hTotA=Math.round(sumHTotA/n), hTotC=Math.round(sumHTotC/n);
    var avgA=(sumTotA/Math.max(1,sumRn)).toFixed(1), avgC=(sumTotC/Math.max(1,sumRn)).toFixed(1);
    var hAvgA=(sumHTotA/Math.max(1,sumHRn)).toFixed(1), hAvgC=(sumHTotC/Math.max(1,sumHRn)).toFixed(1);
    var totG=Math.round((sumTotA+sumTotC)/n), hTotG=Math.round((sumHTotA+sumHTotC)/n);
    var avgAi=Math.round(sumAi/n), avgBb=Math.round(sumBb/n), avgHb=Math.round(sumHb/n);
    var avgRo=100-avgAi-avgBb-avgHb;
    var toPct2=avgT/Math.max(1,avgH);
    var aiTo=Math.max(0,Math.round(avgAi*toPct2*0.9)), bbTo=Math.max(0,Math.round(avgBb*toPct2*0.85));
    var hbTo=Math.max(0,Math.round(avgHb*toPct2*0.8)), roTo=Math.max(0,Math.round(avgRo*toPct2*0.95));
    var avgToMix2=Math.round(sumToMix/n), avgDirMix2=Math.round(sumDirMix/n), avgOtaMix2=Math.round(sumOtaMix/n);
    var avgOtherMix=Math.max(0,100-avgToMix2-avgDirMix2-avgOtaMix2);
    var avgFit=Math.round(sumFit/n), avgDyn=Math.round(sumDyn/n), avgSer=Math.round(sumSer/n);
    var avgOtherSeg=Math.round(sumOther/n), avgFree=Math.round(sumFree/n);
    var fitRm=Math.round(WV*avgFit/100), dynRm=Math.round(WV*avgDyn/100), serRm=Math.round(WV*avgSer/100);
    var othRm=Math.round(WV*avgOtherSeg/100), freeRm=Math.round(WV*avgFree/100);
    var avgOnline=Math.round(sumOnline/n);
    var tcRates=tcRateSum.map(function(s){return Math.round(s/n);});
    var baseRate=avgAdr+8;
    // STLY/LY/Fcst
    var sdlyT=Math.max(5,avgT-9), lyT=Math.max(5,avgT-6), fcstT=Math.min(100,avgT+4);
    var sdlyAdr=avgToAdr2-8, lyAdr=avgToAdr2-4, fcstAdr=avgToAdr2+6;
    var sdlyRev=fR(Math.floor(sumRev*0.9/n)), lyRev=fR(Math.floor(sumRev*0.95/n)), fcstRev=fR(Math.floor(sumRev*1.06/n));
    var sdlyRevpar=Math.max(40,avgRevpar-8), lyRevpar=Math.max(40,avgRevpar-4);
    var sdlyRn=Math.round(avgRn*0.88), lyRn=Math.round(avgRn*0.93), fcstRn=Math.round(avgRn*1.06);
    var isEbb=(new Date(2026,nm-1,1)).getDay()<3;
    // ── Close-out counts for this month ──
    var fullCoCount=0, partCoCount=0;
    var _coRtSet=new Set(), _coBdSet=new Set(), _coToSet=new Set();
    for (var _cd=1; _cd<=nd; _cd++) {
      var _cKey=nm+'-'+_cd;
      if (LOCKED_DAYS.has(_cKey)) fullCoCount++;
      var _pRules=PARTIAL_CLOSURES[_cKey];
      if (_pRules && _pRules.length>0) {
        partCoCount++;
        _pRules.forEach(function(r){
          (r.roomTypes||[]).forEach(function(rt){ _coRtSet.add(rt); });
          (r.boards||[]).forEach(function(b){ _coBdSet.add(b.toUpperCase()); });
          (r.tos||[]).forEach(function(t){ _coToSet.add(t); });
        });
      }
    }
    var coRoomTypes=Array.from(_coRtSet), coBoards=Array.from(_coBdSet), coTOs=Array.from(_coToSet);
    return {name:m.name,avgH,avgT,avgAdr,avgToAdr:avgToAdr2,avgRev,avgHRev,totalRev,totalHRev,
      avgRevpar,avgHRevpar,avgPickup,avgHPickup,avgRn,avgHRn,
      avgLos,avgHLos,avgLead,avgHLead,totA,totC,hTotA,hTotC,avgA,avgC,hAvgA,hAvgC,totG,hTotG,
      avgAvailRooms,avgAvailGuar,
      avgAi,avgBb,avgHb,avgRo,aiTo,bbTo,hbTo,roTo,
      avgToMix:avgToMix2,avgDirMix:avgDirMix2,avgOtaMix:avgOtaMix2,avgOtherMix,
      avgFit,avgDyn,avgSer,avgOtherSeg,avgFree,fitRm,dynRm,serRm,othRm,freeRm,avgOnline,
      tcRates,baseRate,isEbb,
      sdlyT,lyT,fcstT,sdlyAdr,lyAdr,fcstAdr,sdlyRev,lyRev,fcstRev,
      sdlyRevpar,lyRevpar,sdlyRn,lyRn,fcstRn,
      fullCoCount,partCoCount,nd,nm,coRoomTypes,coBoards,coTOs};
  });

  var tcOps=[['Sunshine Tours','#3b82f6'],['Global Adv.','#967EF3'],['Beach Hols','#0ea5e9'],['City Breaks','#10b981'],['Adventure','#f59e0b']];

  // ── Build Daily-B style grid ──────────────────────────────────────────
  // Reuse wb- classes from the weekly view but with month columns

  function moGrad(clr) {
    if (clr==='#004948') return 'linear-gradient(to right,#004948,#007a75)';
    if (clr==='#52d9ce') return 'linear-gradient(to right,#52d9ce,#8aeee8)';
    if (clr==='#006461') return 'linear-gradient(to right,#006461,#009c96)';
    if (clr==='#0891b2') return 'linear-gradient(to right,#0891b2,#22d3ee)';
    if (clr==='#6366f1') return 'linear-gradient(to right,#6366f1,#818cf8)';
    if (clr==='#5883ed') return 'linear-gradient(to right,#5883ed,#93b4f6)';
    if (clr==='#D97706') return 'linear-gradient(to right,#D97706,#F59E0B)';
    if (clr==='#967EF3') return 'linear-gradient(to right,#967EF3,#a78bfa)';
    if (clr==='#3b82f6') return 'linear-gradient(to right,#3b82f6,#60a5fa)';
    if (clr==='#f59e0b') return 'linear-gradient(to right,#f59e0b,#fbbf24)';
    if (clr==='#0284c7') return 'linear-gradient(to right,#0284c7,#38bdf8)';
    if (clr==='#16a34a') return 'linear-gradient(to right,#16a34a,#22c55e)';
    if (clr==='#9333ea') return 'linear-gradient(to right,#9333ea,#a855f7)';
    if (clr==='#10b981') return 'linear-gradient(to right,#10b981,#34d399)';
    if (clr==='#0ea5e9') return 'linear-gradient(to right,#0ea5e9,#38bdf8)';
    if (clr==='#d33030') return 'linear-gradient(to right,#d33030,#ef4444)';
    return clr;
  }
  function moBar(pct, clr) {
    return '<div class="wv-occ-bar-track"><div style="width:'+pct+'%;background:'+moGrad(clr)+';height:6px"></div></div>';
  }
  function moStackBar(segs) {
    return '<div class="wv-occ-bar-track">'
      + segs.map(function(s){ return '<div style="width:'+s.p+'%;background:'+moGrad(s.c)+';height:6px"></div>'; }).join('')
      + '</div>';
  }

  // Collapse state — reuse _calAccState with 'mo_' prefix for groups
  if (!_calAccState._moInit) {
    _calAccState._moInit = true;
    _calAccState.mo_daily = false;
    _calAccState.mo_more = false;
    _calAccState.mo_meals = false;
    _calAccState.mo_biz = false;
    _calAccState.mo_tc = false;
    _calAccState.mo_closeouts = false;
    _calAccState.mo_avail = false;
  }

  // Row definitions (same pattern as Daily B)
  var moRows = [];
  // ── Close Outs group (top)
  moRows.push({type:'top', id:'mo_closeouts', label:'Close Outs'});
  moRows.push({type:'sect', id:'mos_co_full', label:'Full Close Out', parent:'mo_closeouts'});
  moRows.push({type:'sect', id:'mos_co_part', label:'Partial Lock', parent:'mo_closeouts'});
  moRows.push({type:'sub', id:'mos_co_rooms', label:'Room Types', dot:'#fca5a5', parent:'mos_co_part', gp:'mo_closeouts'});
  moRows.push({type:'sub', id:'mos_co_boards', label:'Board Types', dot:'#fde68a', parent:'mos_co_part', gp:'mo_closeouts'});
  moRows.push({type:'sub', id:'mos_co_tos', label:'Tour Operators', dot:'#d8b4fe', parent:'mos_co_part', gp:'mo_closeouts'});

  // ── Daily Metrics group
  moRows.push({type:'top', id:'mo_daily', label:'Daily Metrics'});
  moRows.push({type:'sect', id:'mos_occ', label:'Occupancy', parent:'mo_daily'});
  moRows.push({type:'sub', id:'mos_occ_htl', label:'Hotel', dot:'#52d9ce', parent:'mos_occ', gp:'mo_daily'});
  moRows.push({type:'sub', id:'mos_occ_to', label:'Tour Operator', dot:'#004948', parent:'mos_occ', gp:'mo_daily'});
  moRows.push({type:'sect', id:'mos_adr', label:'ADR', parent:'mo_daily'});
  moRows.push({type:'sub', id:'mos_adr_htl', label:'Hotel', dot:'#52d9ce', parent:'mos_adr', gp:'mo_daily'});
  moRows.push({type:'sub', id:'mos_adr_to', label:'Tour Operator', dot:'#004948', parent:'mos_adr', gp:'mo_daily'});
  moRows.push({type:'sect', id:'mos_rev', label:'Revenue /day', parent:'mo_daily'});
  moRows.push({type:'sub', id:'mos_rev_htl', label:'Hotel', dot:'#52d9ce', parent:'mos_rev', gp:'mo_daily'});
  moRows.push({type:'sub', id:'mos_rev_to', label:'Tour Operator', dot:'#004948', parent:'mos_rev', gp:'mo_daily'});
  moRows.push({type:'sect', id:'mos_rn', label:'RN Sold /day', parent:'mo_daily'});
  moRows.push({type:'sub', id:'mos_rn_htl', label:'Hotel', dot:'#52d9ce', parent:'mos_rn', gp:'mo_daily'});
  moRows.push({type:'sub', id:'mos_rn_to', label:'Tour Operator', dot:'#004948', parent:'mos_rn', gp:'mo_daily'});
  moRows.push({type:'sect', id:'mos_revpar', label:'RevPAR', parent:'mo_daily'});
  moRows.push({type:'sub', id:'mos_revpar_htl', label:'Hotel', dot:'#52d9ce', parent:'mos_revpar', gp:'mo_daily'});
  moRows.push({type:'sub', id:'mos_revpar_to', label:'Tour Operator', dot:'#004948', parent:'mos_revpar', gp:'mo_daily'});

  // ── Segments group

  // ── Other Metrics group
  moRows.push({type:'top', id:'mo_more', label:'Other Metrics'});
  moRows.push({type:'sect', id:'mos_hotel_metrics', label:'Hotel', parent:'mo_more'});
  moRows.push({type:'sub', id:'mos_pickup_h', label:'Pickup', dot:'#52d9ce', parent:'mos_hotel_metrics', gp:'mo_more'});
  moRows.push({type:'sub', id:'mos_los_h', label:'Avg LOS', dot:'#52d9ce', parent:'mos_hotel_metrics', gp:'mo_more'});
  moRows.push({type:'sub', id:'mos_lead_h', label:'Lead Time', dot:'#52d9ce', parent:'mos_hotel_metrics', gp:'mo_more'});
  moRows.push({type:'sub', id:'mos_avga_h', label:'Avg Adults', dot:'#52d9ce', parent:'mos_hotel_metrics', gp:'mo_more'});
  moRows.push({type:'sub', id:'mos_avgc_h', label:'Avg Children', dot:'#52d9ce', parent:'mos_hotel_metrics', gp:'mo_more'});
  moRows.push({type:'sub', id:'mos_totg_h', label:'Total Guests', dot:'#52d9ce', parent:'mos_hotel_metrics', gp:'mo_more'});
  moRows.push({type:'sect', id:'mos_to_metrics', label:'Tour Operator', parent:'mo_more'});
  moRows.push({type:'sub', id:'mos_pickup_t', label:'Pickup', dot:'#004948', parent:'mos_to_metrics', gp:'mo_more'});
  moRows.push({type:'sub', id:'mos_los_t', label:'Avg LOS', dot:'#004948', parent:'mos_to_metrics', gp:'mo_more'});
  moRows.push({type:'sub', id:'mos_lead_t', label:'Lead Time', dot:'#004948', parent:'mos_to_metrics', gp:'mo_more'});
  moRows.push({type:'sub', id:'mos_avga_t', label:'Avg Adults', dot:'#004948', parent:'mos_to_metrics', gp:'mo_more'});
  moRows.push({type:'sub', id:'mos_avgc_t', label:'Avg Children', dot:'#004948', parent:'mos_to_metrics', gp:'mo_more'});
  moRows.push({type:'sub', id:'mos_totg_t', label:'Total Guests', dot:'#004948', parent:'mos_to_metrics', gp:'mo_more'});

  // ── Availability group
  moRows.push({type:'top', id:'mo_avail', label:'Availability'});
  moRows.push({type:'sect', id:'mos_avail_hotel', label:'Hotel', parent:'mo_avail'});
  moRows.push({type:'sub', id:'mos_avail_rooms', label:'Avail Rooms', dot:'#52d9ce', parent:'mos_avail_hotel', gp:'mo_avail'});
  moRows.push({type:'sect', id:'mos_avail_to', label:'Tour Operator', parent:'mo_avail'});
  moRows.push({type:'sub', id:'mos_availg_rooms', label:'Avail Guaranteed', dot:'#004948', parent:'mos_avail_to', gp:'mo_avail'});

  // ── Business Mix group
  moRows.push({type:'top', id:'mo_biz', label:'Business Mix'});
  moRows.push({type:'sect', id:'mos_biz_to', label:'Tour Operator Mix %', parent:'mo_biz'});
  moRows.push({type:'sect', id:'mos_biz_dir', label:'Direct Mix %', parent:'mo_biz'});
  moRows.push({type:'sect', id:'mos_biz_ota', label:'OTA Mix %', parent:'mo_biz'});

  // ── Selling Rates group
  moRows.push({type:'top', id:'mo_tc', label:'Selling Rates'});
  moRows.push({type:'sect', id:'mos_tc_contract', label:'Tour Operator Contract Rate', parent:'mo_tc'});
  moRows.push({type:'sect', id:'mos_tc_promo', label:'Promotion %', parent:'mo_tc'});
  moRows.push({type:'sect', id:'mos_tc_base', label:'Base Segment Rate', parent:'mo_tc'});

  // ── Meal Plans group
  moRows.push({type:'top', id:'mo_meals', label:'Meal Plans'});
  moRows.push({type:'sect', id:'mos_mpsum', label:'Summary', parent:'mo_meals'});
  moRows.push({type:'sub', id:'mos_mp_ai', label:'All Inclusive', dot:'#006461', parent:'mos_mpsum', gp:'mo_meals'});
  moRows.push({type:'sub', id:'mos_mp_bb', label:'Bed & Breakfast', dot:'#3b82f6', parent:'mos_mpsum', gp:'mo_meals'});
  moRows.push({type:'sub', id:'mos_mp_hb', label:'Half Board', dot:'#967EF3', parent:'mos_mpsum', gp:'mo_meals'});
  moRows.push({type:'sub', id:'mos_mp_ro', label:'Room Only', dot:'#f59e0b', parent:'mos_mpsum', gp:'mo_meals'});

  // ── Business Mix group
  moRows.push({type:'top', id:'mo_biz', label:'Business Mix'});
  moRows.push({type:'sect', id:'mos_bizbar', label:'Summary', parent:'mo_biz'});
  moRows.push({type:'sub', id:'mos_biz_to', label:'TO', dot:'#006461', parent:'mos_bizbar', gp:'mo_biz'});
  moRows.push({type:'sub', id:'mos_biz_dir', label:'Direct', dot:'#0284c7', parent:'mos_bizbar', gp:'mo_biz'});
  moRows.push({type:'sub', id:'mos_biz_ota', label:'OTA', dot:'#D97706', parent:'mos_bizbar', gp:'mo_biz'});
  moRows.push({type:'sub', id:'mos_biz_oth', label:'Other', dot:'#9ca3af', parent:'mos_bizbar', gp:'mo_biz'});

  // ── Room Availability group
  moRows.push({type:'top', id:'mo_avail', label:'Room Availability'});
  var MO_RT_NAMES = ['Standard','Superior','Deluxe','Suite','Jr. Suite','Family'];
  var MO_RT_CAPS  = [51,36,27,12,15,9];
  MO_RT_NAMES.forEach(function(name, i) {
    moRows.push({type:'sect', id:'moavrt'+i,       label:name,                    parent:'mo_avail', rtIdx:i});
    moRows.push({type:'sub',  id:'moavrt'+i+'_to', label:'TO Sold',               dot:'#004948', parent:'moavrt'+i, gp:'mo_avail', rtIdx:i, rtSub:'to'});
    moRows.push({type:'sub',  id:'moavrt'+i+'_ot', label:'Other Segments',        dot:'#52d9ce', parent:'moavrt'+i, gp:'mo_avail', rtIdx:i, rtSub:'other'});
    moRows.push({type:'sub',  id:'moavrt'+i+'_tn', label:'Tentative Sold (Group)',dot:'#967EF3', parent:'moavrt'+i, gp:'mo_avail', rtIdx:i, rtSub:'tentative'});
    moRows.push({type:'sub',  id:'moavrt'+i+'_oo', label:'Out-of-Order',          dot:'#ef4444', parent:'moavrt'+i, gp:'mo_avail', rtIdx:i, rtSub:'ooo'});
    moRows.push({type:'sub',  id:'moavrt'+i+'_al', label:'Alloc Rem.',            dot:'#D97706', parent:'moavrt'+i, gp:'mo_avail', rtIdx:i, rtSub:'alloc'});
    moRows.push({type:'sub',  id:'moavrt'+i+'_av', label:'Total Hotel Occupancy', dot:'#445e0d', parent:'moavrt'+i, gp:'mo_avail', rtIdx:i, rtSub:'avail', isRem:true});
  });

  // ── Travel Co. Rates group
  moRows.push({type:'top', id:'mo_tc', label:'Travel Co. Rates'});
  tcOps.forEach(function(op,i){
    moRows.push({type:'sect', id:'mos_tc'+i, label:op[0], parent:'mo_tc', toIdx:i, toClr:op[1]});
  });
  moRows.push({type:'sect', id:'mos_tcbase', label:'Base Seg. Rate', parent:'mo_tc', toBase:true});

  // Helper: check if row is hidden by collapsed parent
  function moIsHidden(row) {
    if (row.type === 'top') return false;
    // Group collapsed?
    if (row.type === 'sect' && _calAccState[row.parent]) return true;
    if (row.type === 'sub') {
      if (_calAccState[row.gp]) return true;
      if (_calAccState[row.parent]) return true;
    }
    return false;
  }

  var _moSectIds = {};
  var _moSectsWithKids = {};
  moRows.forEach(function(r){ if (r.type === 'sect') _moSectIds[r.id] = true; });
  moRows.forEach(function(r){ if (r.parent && _moSectIds[r.parent]) _moSectsWithKids[r.parent] = true; });

  var html = '<div class="wb-layout">';

  // ── Header row with month names ─────────────────────────────────────────
  html += '<div class="wb-row wb-hdr-row">';
  html += '<div class="wb-label-cell wb-hdr-label-cell"></div>';
  months.forEach(function(mo) {
    html += '<div class="wb-data-cell wb-hdr-cell"><span class="wb-hdr-dow">'+mo.name+'</span></div>';
  });
  html += '</div>';

  // ── Data rows ───────────────────────────────────────────────────────────
  moRows.forEach(function(row) {
    var collapsed = !!_calAccState[row.id];
    var hidden = moIsHidden(row);
    var rowCls = 'wb-row wb-row-' + row.type + (hidden ? ' wb-row-hidden' : '');

    html += '<div class="' + rowCls + '" data-mo-id="' + row.id + '">';

    // ── Label cell
    if (row.type === 'top') {
      html += '<div class="wb-label-cell wb-grp-hdr" onclick="moToggle(\'' + row.id + '\')">'
            + '<span class="wb-chev">' + (collapsed ? chevDown : chevUp) + '</span>'
            + '<span class="wb-grp-label">' + row.label + '</span></div>';
    } else if (row.type === 'sect') {
      var _moHasKids = _moSectsWithKids[row.id];
      html += '<div class="wb-label-cell wb-sect-lbl"' + (_moHasKids ? ' onclick="moToggle(\'' + row.id + '\')"' : '') + '>'
            + (_moHasKids ? '<span class="wb-chev">' + (collapsed ? chevDown : chevUp) + '</span>' : '')
            + '<span class="wb-sect-label">' + row.label + '</span></div>';
    } else {
      var dotHtml = row.dot ? '<span class="wb-sub-dot" style="background:' + row.dot + '"></span>' : '';
      html += '<div class="wb-label-cell wb-sub-lbl-cell">'
            + dotHtml
            + '<span class="wb-sub-label' + (row.isRem ? ' wb-sub-lbl-rem' : '') + '">' + row.label + '</span></div>';
    }

    // ── Data cells (one per month)
    months.forEach(function(mo) {
      var cc = '';

      if (row.type === 'top') {
        cc = '';  // group header — empty data cells

      } else if (row.type === 'sect') {
        switch (row.id) {
          case 'mos_occ':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.avgH+'%</span></div>'
              + '<div class="wv-occ-bar-track">'
              + '<div style="width:'+mo.avgT+'%;background:'+moGrad('#004948')+';height:6px"></div>'
              + '<div style="width:'+Math.max(0,mo.avgH-mo.avgT)+'%;background:'+moGrad('#52d9ce')+';height:6px"></div>'
              + '</div>';
            break;
          case 'mos_adr':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">$'+mo.avgToAdr+'</span></div>'
              + moBar(Math.round(mo.avgToAdr/3.5), '#004948');
            break;
          case 'mos_rev':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.avgRev+'</span></div>'
              + '<div style="font-size:10px;color:#9ca3af;margin-top:1px">Total: '+mo.totalRev+'</div>';
            break;
          case 'mos_revpar':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">$'+mo.avgRevpar+'</span></div>'
              + moBar(Math.round(mo.avgRevpar/4), '#004948');
            break;
          case 'mos_pickup':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">+'+mo.avgPickup+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: +'+mo.avgHPickup+'</span></div>'
              + moBar(Math.min(90,mo.avgPickup*3), '#004948');
            break;
          case 'mos_onoff':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.avgOnline+'% online</span></div>'
              + '<div class="wv-occ-bar-track">'
              + '<div style="width:'+mo.avgOnline+'%;background:'+moGrad('#004948')+';height:6px"></div>'
              + '<div style="width:'+(100-mo.avgOnline)+'%;background:'+moGrad('#52d9ce')+';height:6px"></div>'
              + '</div>';
            break;
          case 'mos_segbar':
            cc = moStackBar([{p:mo.avgFit,c:'#006461'},{p:mo.avgDyn,c:'#0891b2'},{p:mo.avgSer,c:'#6366f1'},{p:mo.avgOtherSeg,c:'#5883ed'},{p:mo.avgFree,c:'#e5e7eb'}])
              + '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:3px">'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#006461">FIT '+mo.avgFit+'%</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#0891b2">Dyn '+mo.avgDyn+'%</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#6366f1">Ser '+mo.avgSer+'%</span>'
              + '</div>';
            break;
          case 'mos_rn':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.avgRn+' rn</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+mo.avgHRn+'</span></div>'
              + moBar(Math.round(mo.avgRn/WV*100), '#004948') + moBar(Math.round(mo.avgHRn/WV*100), '#52d9ce');
            break;
          case 'mos_avga':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.avgA+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+mo.hAvgA+'</span></div>'
              + moBar(Math.min(90,parseFloat(mo.avgA)/3*100), '#004948');
            break;
          case 'mos_avgc':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.avgC+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+mo.hAvgC+'</span></div>'
              + moBar(Math.min(90,parseFloat(mo.avgC)/2*100), '#d33030');
            break;
          case 'mos_tota':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.totA+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+mo.hTotA+'</span></div>';
            break;
          case 'mos_totc':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.totC+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+mo.hTotC+'</span></div>';
            break;
          case 'mos_totg':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.totG+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+mo.hTotG+'</span></div>';
            break;
          case 'mos_los':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.avgLos+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+mo.avgHLos+'</span></div>'
              + moBar(Math.min(90,parseFloat(mo.avgLos)/10*100), '#004948');
            break;
          case 'mos_lead':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.avgLead+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+mo.avgHLead+'</span></div>'
              + moBar(Math.min(90,parseInt(mo.avgLead)/90*100), '#004948');
            break;
          case 'mos_avail':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.avgAvailRooms+' rm</span></div>'
              + moBar(Math.min(90,Math.round(mo.avgAvailRooms/WV*100)), '#16a34a');
            break;
          case 'mos_availg':
            cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+mo.avgAvailGuar+' rm</span></div>'
              + moBar(Math.min(90,Math.round(mo.avgAvailGuar/20*100)), '#004948');
            break;
          case 'mos_mpsum':
            { var _moGPR=parseFloat(mo.hAvgA)+parseFloat(mo.hAvgC);
              var _msAiR=Math.round(mo.avgHRn*mo.avgAi/100),_msAiSt=Math.round(_msAiR*_moGPR);
              var _msBbR=Math.round(mo.avgHRn*mo.avgBb/100),_msBbSt=Math.round(_msBbR*_moGPR);
              var _msHbR=Math.round(mo.avgHRn*mo.avgHb/100),_msHbSt=Math.round(_msHbR*_moGPR);
              var _msRoR=Math.round(mo.avgHRn*mo.avgRo/100),_msRoSt=Math.round(_msRoR*_moGPR);
            cc = moStackBar([{p:mo.avgAi,c:'#006461'},{p:mo.avgBb,c:'#3b82f6'},{p:mo.avgHb,c:'#967EF3'},{p:mo.avgRo,c:'#f59e0b'}])
              + '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:3px">'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#006461">AI '+mo.avgAi+'% · '+_msAiSt+' seats</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#3b82f6">BB '+mo.avgBb+'% · '+_msBbSt+' seats</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#967EF3">HB '+mo.avgHb+'% · '+_msHbSt+' seats</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#f59e0b">RO '+mo.avgRo+'% · '+_msRoSt+' seats</span>'
              + '</div>'; }
            break;
          case 'mos_bizbar':
            cc = moStackBar([{p:mo.avgToMix,c:'#006461'},{p:mo.avgDirMix,c:'#0284c7'},{p:mo.avgOtaMix,c:'#D97706'},{p:mo.avgOtherMix,c:'#9ca3af'}])
              + '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:3px">'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#006461">TO '+mo.avgToMix+'%</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#0284c7">D '+mo.avgDirMix+'%</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#D97706">OTA '+mo.avgOtaMix+'%</span>'
              + '</div>';
            break;
          case 'mos_co_full':
            if (mo.fullCoCount > 0) {
              cc = '<div class="wb-sect-val">'
                + '<span class="material-icons" style="font-size:13px;color:' + CLOSE_OUT_COLORS.full + ';vertical-align:middle;margin-right:3px">lock</span>'
                + '<span class="wv-occ-total" style="color:' + CLOSE_OUT_COLORS.full + '">' + mo.fullCoCount + ' day' + (mo.fullCoCount!==1?'s':'') + '</span>'
                + '<span style="font-size:10px;color:#9ca3af;margin-left:6px">/ ' + mo.nd + '</span>'
                + '</div>'
                + moBar(Math.min(90, Math.round(mo.fullCoCount/mo.nd*100)), CLOSE_OUT_COLORS.full);
            } else {
              cc = '<div class="wb-sect-val" style="color:#9ca3af;font-size:12px">None</div>';
            }
            break;
          case 'mos_co_part':
            if (mo.partCoCount > 0) {
              cc = '<div class="wb-sect-val">'
                + '<span class="material-icons" style="font-size:13px;color:' + CLOSE_OUT_COLORS.partial + ';vertical-align:middle;margin-right:3px">lock_open</span>'
                + '<span class="wv-occ-total" style="color:' + CLOSE_OUT_COLORS.partial + '">' + mo.partCoCount + ' day' + (mo.partCoCount!==1?'s':'') + '</span>'
                + '<span style="font-size:10px;color:#9ca3af;margin-left:6px">/ ' + mo.nd + '</span>'
                + '</div>'
                + moBar(Math.min(90, Math.round(mo.partCoCount/mo.nd*100)), CLOSE_OUT_COLORS.partial);
            } else {
              cc = '<div class="wb-sect-val" style="color:#9ca3af;font-size:12px">None</div>';
            }
            break;
          case 'mos_tcbase': {
            cc = '<div class="wb-sect-val"><span class="wv-occ-total" style="font-weight:700;color:#1C1C1C">$'+mo.baseRate+'</span></div>'
              + moBar(Math.min(90,Math.round(mo.baseRate/280*100)), '#004948');
            break;
          }
          default:
            // Room Availability (dynamic rtIdx)
            if (row.rtIdx !== undefined) {
              var moInv  = MO_RT_CAPS[row.rtIdx];
              var moSold = Math.min(moInv, Math.floor(moInv * mo.avgH / 110));
              var moToS  = Math.min(moSold, Math.round(moSold * mo.avgT / Math.max(1, mo.avgH)));
              var moOtS  = moSold - moToS;
              var moTent = Math.max(0, Math.floor(2+Math.abs((mo.nm*(row.rtIdx+4)+mo.nd*(row.rtIdx+2))%6)));
              var moAlloc = Math.floor(moInv * 0.8 + Math.abs((mo.nm*(row.rtIdx+3)+mo.nd*(row.rtIdx+5))%15));
              var moAlRem = Math.max(0, moAlloc - moToS);
              var moAvRm  = Math.max(0, moInv - moSold - moTent);
              var moToP  = Math.round(moToS/moInv*100), moOtP = Math.round(moOtS/moInv*100);
              var moTnP  = Math.round(moTent/moInv*100);
              var moAlP  = Math.round(moAlRem/moInv*100), moAvP = Math.max(0, 100-moToP-moOtP-moTnP-moAlP);
              var moAvClr = moAvRm <= 0 ? '#dc2626' : '#004948';
              cc = '<div class="wb-sect-val"><span class="wv-occ-total" style="color:'+(moAvRm<=0?'#16a34a':moAvClr)+'">'
                + (moAvRm <= 0 ? '0 available' : moAvRm+' avail') + '</span>'
                + '<span style="font-size:12px;color:#9ca3af;margin-left:4px">/ '+moInv+'</span></div>'
                + '<div class="wv-occ-bar-track">'
                + '<div style="width:'+moToP+'%;background:'+moGrad('#004948')+';height:6px"></div>'
                + '<div style="width:'+moOtP+'%;background:'+moGrad('#52d9ce')+';height:6px"></div>'
                + '<div style="width:'+moTnP+'%;background:'+moGrad('#967EF3')+';height:6px"></div>'
                + '<div style="width:'+moAlP+'%;background:'+moGrad('#D97706')+';height:6px"></div>'
                + '<div style="width:'+moAvP+'%;background:'+moGrad('#d7f7ed')+';height:6px"></div>'
                + '</div>';
            // Travel Co. rates (dynamic toIdx)
            } else if (row.toIdx !== undefined) {
              var isEbb = mo.isEbb;
              var promoTxt = isEbb ? 'EBB 10%' : 'Contract';
              var promoClr = isEbb ? '#16a34a' : '#2563eb';
              cc = '<div class="wb-sect-val" style="justify-content:space-between">'
                + '<span class="wv-occ-total" style="color:#1C1C1C">$'+mo.tcRates[row.toIdx]+'</span>'
                + '<span style="font-size:11px;font-weight:700;padding:1px 5px;border-radius:3px;background:'+promoClr+'22;color:'+promoClr+';border:1px solid '+promoClr+'44">'+promoTxt+'</span>'
                + '</div>'
                + moBar(Math.min(90,Math.round(mo.tcRates[row.toIdx]/280*100)), '#004948');
            }
            break;
        }

      } else {
        // Sub rows
        var v1 = '';
        switch (row.id) {
          case 'mos_occ_to':    v1 = mo.avgT+'%'; break;
          case 'mos_occ_htl':   v1 = mo.avgH+'%'; break;
          case 'mos_adr_to':    v1 = '$'+mo.avgToAdr; break;
          case 'mos_adr_htl':   v1 = '$'+mo.avgAdr; break;
          case 'mos_rev_to':    v1 = mo.avgRev; break;
          case 'mos_rev_htl':   v1 = mo.avgHRev; break;
          case 'mos_onoff_on':  v1 = mo.avgOnline+'%'; break;
          case 'mos_onoff_off': v1 = (100-mo.avgOnline)+'%'; break;
          case 'mos_seg_fit':   v1 = mo.avgFit+'% · '+mo.fitRm+' RN'; break;
          case 'mos_seg_dyn':   v1 = mo.avgDyn+'% · '+mo.dynRm+' RN'; break;
          case 'mos_seg_ser':   v1 = mo.avgSer+'% · '+mo.serRm+' RN'; break;
          case 'mos_seg_oth':   v1 = mo.avgOtherSeg+'% · '+mo.othRm+' RN'; break;
          case 'mos_seg_rem':   v1 = mo.avgFree+'% · '+mo.freeRm+' RN'; break;
          case 'mos_mp_ai':     { var _moAiRm=Math.round(mo.avgHRn*mo.avgAi/100),_moAiSt=Math.round(_moAiRm*(parseFloat(mo.hAvgA)+parseFloat(mo.hAvgC))); v1=mo.avgAi+'% · '+_moAiRm+'r · '+_moAiSt+' seats'; } break;
          case 'mos_mp_bb':     { var _moBbRm=Math.round(mo.avgHRn*mo.avgBb/100),_moBbSt=Math.round(_moBbRm*(parseFloat(mo.hAvgA)+parseFloat(mo.hAvgC))); v1=mo.avgBb+'% · '+_moBbRm+'r · '+_moBbSt+' seats'; } break;
          case 'mos_mp_hb':     { var _moHbRm=Math.round(mo.avgHRn*mo.avgHb/100),_moHbSt=Math.round(_moHbRm*(parseFloat(mo.hAvgA)+parseFloat(mo.hAvgC))); v1=mo.avgHb+'% · '+_moHbRm+'r · '+_moHbSt+' seats'; } break;
          case 'mos_mp_ro':     { var _moRoRm=Math.round(mo.avgHRn*mo.avgRo/100),_moRoSt=Math.round(_moRoRm*(parseFloat(mo.hAvgA)+parseFloat(mo.hAvgC))); v1=mo.avgRo+'% · '+_moRoRm+'r · '+_moRoSt+' seats'; } break;
          case 'mos_biz_to':    v1 = mo.avgToMix+'%'; break;
          case 'mos_biz_dir':   v1 = mo.avgDirMix+'%'; break;
          case 'mos_biz_ota':   v1 = mo.avgOtaMix+'%'; break;
          case 'mos_biz_oth':   v1 = mo.avgOtherMix+'%'; break;
          case 'mos_co_rooms':  v1 = mo.coRoomTypes.length>0 ? mo.coRoomTypes.join(', ') : '—'; break;
          case 'mos_co_boards': v1 = mo.coBoards.length>0    ? mo.coBoards.join(', ')    : '—'; break;
          case 'mos_co_tos':    v1 = mo.coTOs.length>0       ? mo.coTOs.join(', ')       : '—'; break;
        }
        // Room Availability sub-rows (dynamic rtSub)
        if (row.rtSub !== undefined) {
          var moInv2   = MO_RT_CAPS[row.rtIdx];
          var moSold2  = Math.min(moInv2, Math.floor(moInv2 * mo.avgH / 110));
          var moToS2   = Math.min(moSold2, Math.round(moSold2 * mo.avgT / Math.max(1, mo.avgH)));
          var moOtS2   = moSold2 - moToS2;
          var moAlloc2 = Math.floor(moInv2 * 0.8 + Math.abs((mo.nm*(row.rtIdx+3)+mo.nd*(row.rtIdx+5))%15));
          var moAlRem2 = Math.max(0, moAlloc2 - moToS2);
          var moAvRm2  = Math.max(0, moInv2 - moSold2);
          var remCls = '';
          if      (row.rtSub === 'to')        v1 = moToS2 + ' RN';
          else if (row.rtSub === 'other')     v1 = moOtS2 + ' RN';
          else if (row.rtSub === 'tentative') { var moTent2 = Math.max(0, Math.floor(2+Math.abs((mo.nm*(row.rtIdx+4)+mo.nd*(row.rtIdx+2))%6))); v1 = moTent2 + ' RN'; }
          else if (row.rtSub === 'ooo')       { var moOoo2  = Math.max(0, Math.floor(Math.abs((mo.nm*(row.rtIdx+1)+mo.nd*(row.rtIdx+3))%4))); v1 = moOoo2 + ' RN'; }
          else if (row.rtSub === 'alloc')     v1 = moAlRem2 + ' RN';
          else if (row.rtSub === 'avail')     { v1 = moAvRm2 + ' RN'; remCls = moAvRm2 === 0 ? ' wb-sub-val-rem' : ''; }
          cc = '<span class="wb-sub-val' + remCls + '">' + v1 + '</span>';
        } else {
          cc = '<span class="wb-sub-val">' + v1 + '</span>';
        }
      }

      html += '<div class="wb-data-cell">' + cc + '</div>';
    });

    html += '</div>';
  });

  html += '</div>'; // close wb-layout

  // Wrap in overview accordion
  var ovLabel = months.length===1 ? months[0].name+' Overview' : months[0].name+' – '+months[months.length-1].name+' Overview';
  var ovCollapsed = _calAccState['overview'] === false ? false : true;
  var ovChev = ovCollapsed
    ? '<span class="material-icons" style="font-size:16px">expand_more</span>'
    : '<span class="material-icons" style="font-size:16px">expand_less</span>';

  el.innerHTML = '<div class="cal-summary-wrap" style="background:#fff">'
    +'<div class="wv-acc-sect' + (ovCollapsed ? '' : ' wv-acc-open') + '" style="border:1px solid #dde1e2;border-radius:0;overflow:hidden">'
    +'<div class="wv-acc-hdr" data-cal-section="overview" onclick="calAccClick(this)" style="background:#fff;border-bottom:none;border-radius:0">'
    +'<span class="wv-acc-chev" style="color:#006461">'+ovChev+'</span>'
    +'<span class="wv-acc-title" style="font-weight:700">'+ovLabel+'</span>'
    +'</div>'
    +'<div class="wv-acc-body' + (ovCollapsed ? ' wv-body-hidden' : '') + '" style="padding:0;background:#fff">'
    +html
    +'</div></div>'
    +'</div>';
}

// ── Monthly overview toggle handler ──────────────────────────────────────
window.moToggle = function(id) {
  _calAccState[id] = !_calAccState[id];
  renderCalMonthlySummary();
};

// ── Monthly tab bar interactions ──────────────────────────────────────────
// Tab clicks: Monthly stays in month view; Daily/Close Outs/Close Out Report switch to week view
document.querySelectorAll('.mo-grp-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var tab = this.dataset.mogroupby;
    if (tab === 'monthly') return; // already on monthly
    // Map monthly tab names to weekly groupby values
    var groupbyMap = { daily: 'dailyB', closeouts: 'roomType', coReport: 'coReport' };
    var wvGrp = groupbyMap[tab] || 'dailyB';
    // Switch to week view with this groupby active
    wvGroupBy = wvGrp;
    openWeekView(wvMonth, wvWeekStart);
    // Highlight correct tab in weekly bar
    document.querySelectorAll('#weekView .wv-groupby-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.groupby === wvGrp);
    });
    _updateAccBtnState();
  });
});

window.moAccCloseAll = function() {
  ['mo_daily','mo_more','mo_meals','mo_biz','mo_avail','mo_tc','overview'].forEach(function(k) { _calAccState[k] = true; });
  renderCalMonthlySummary();
};
window.moAccOpenAll = function() {
  ['mo_daily','mo_more','mo_meals','mo_biz','mo_avail','mo_tc','overview'].forEach(function(k) { _calAccState[k] = false; });
  renderCalMonthlySummary();
};

// ── View toggle: 1 / 3 / 6 / 12 months ───────────────────────────────────
window.calSetDisplayView = function(n) {
  calDisplayView = n;
  calView = n;

  // Update select value
  var selEl = document.getElementById('calViewSelect');
  if (selEl) selEl.value = String(n);

  // Disable Cell Metrics control in 6/12 mode (heatmap only — no cell content)
  var metricsWrap = document.getElementById('calMetricsWrap');
  var metricsBtn  = document.getElementById('calMetricsBtn');
  if (metricsWrap && metricsBtn) {
    var isCompact = (n >= 3);
    metricsBtn.disabled = isCompact;
    metricsWrap.classList.toggle('cal-metrics-disabled', isCompact);
    // Close dropdown if open
    if (isCompact) {
      var dd = document.getElementById('calMetricsDropdown');
      if (dd) dd.style.display = 'none';
    }
  }

  // Show/hide monthly tab bar (only for 1/2/3 month views)
  var moBar = document.getElementById('moGroupbyBar');
  if (moBar) moBar.style.display = (n <= 3) ? '' : 'none';

  // Apply compact CSS class + view class
  var grid = document.getElementById('calMonths');
  if (grid) {
    if (n >= 3) { grid.classList.add('cal-compact'); }
    else { grid.classList.remove('cal-compact'); }
    if (n === 12) grid.classList.add('cal-12m');
    else grid.classList.remove('cal-12m');
    // View-specific class for responsive breakpoints
    grid.className = grid.className.replace(/\bcal-view-\d+\b/g, '');
    grid.classList.add('cal-view-' + n);
  }
  // Update compare dropdown state based on breakpoint
  _calUpdateCompareState();

  // Clamp start index
  calStartIdx = Math.min(calStartIdx, Math.max(0, ALL_MONTHS.length - calView));
  renderCalendar();

  // Re-apply compact class + out-of-range after render
  setTimeout(function() {
    var g = document.getElementById('calMonths');
    if (g) {
      if (n >= 3) g.classList.add('cal-compact');
      else g.classList.remove('cal-compact');
      if (n === 12) g.classList.add('cal-12m');
      else g.classList.remove('cal-12m');
      g.className = g.className.replace(/\bcal-view-\d+\b/g, '');
      g.classList.add('cal-view-' + n);
    }
    calApplyDayCellHeights();
    _calSyncCellCompareVisibility();
    if (typeof applyOutOfRange === 'function') applyOutOfRange();
  }, 80);
};

// Monthly view filter dropdown toggle
window.calToggleMFilt = function(panelId, btn) {
  const panels = ['calFiltTOPanel','calFiltRTPanel','calFiltMPPanel','calFiltOriginPanel'];
  const btns   = ['calFiltTOBtn','calFiltRTBtn','calFiltMPBtn','calFiltOriginBtn'];
  const targetPanel = document.getElementById(panelId);
  const isCurrentlyOpen = targetPanel && targetPanel.style.display !== 'none';
  // Close all other dropdowns (including rev chart, cal/wv filters) before opening
  if (!isCurrentlyOpen) _closeAllDropdowns(panelId);
  panels.forEach(function(pid, i) {
    const p = document.getElementById(pid);
    if (!p) return;
    if (pid === panelId) {
      p.style.display = isCurrentlyOpen ? 'none' : 'block';
      const b = document.getElementById(btns[i]);
      if (b) b.classList.toggle('active', !isCurrentlyOpen);
    } else {
      p.style.display = 'none';
      const b = document.getElementById(btns[i]);
      if (b) b.classList.remove('active');
    }
  });
};

// Close monthly filter dropdowns when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.cal-mfilt-wrap')) {
    ['calFiltTOPanel','calFiltRTPanel','calFiltMPPanel','calFiltOriginPanel'].forEach(function(pid) {
      const p = document.getElementById(pid);
      if (p) p.style.display = 'none';
    });
    ['calFiltTOBtn','calFiltRTBtn','calFiltMPBtn','calFiltOriginBtn'].forEach(function(bid) {
      const b = document.getElementById(bid);
      if (b) b.classList.remove('active');
    });
  }
});

/* ─── CALENDAR RANGE SELECTION ─── */
function calDv(m, d) { return m * 100 + d; }

function applyCalSelection(hoverMonth, hoverDay) {
  const cells = document.querySelectorAll('#calMonths .cal-day:not(.empty)');
  const sv = calSelStart ? calDv(calSelStart.month, calSelStart.day) : null;
  let ev = calSelEnd ? calDv(calSelEnd.month, calSelEnd.day)
         : (calSelPicking && hoverMonth) ? calDv(hoverMonth, hoverDay)
         : null;

  const lo = (sv !== null && ev !== null) ? Math.min(sv, ev) : sv;
  const hi = (sv !== null && ev !== null) ? Math.max(sv, ev) : null;

  cells.forEach(cell => {
    cell.classList.remove('cal-sel-lo', 'cal-sel-hi', 'cal-sel-mid');
    if (sv === null) return;
    const v = calDv(+cell.dataset.month, +cell.dataset.day);
    if (v === lo)                        cell.classList.add('cal-sel-lo');
    else if (hi && v === hi)             cell.classList.add('cal-sel-hi');
    else if (hi && v > lo && v < hi)     cell.classList.add('cal-sel-mid');
  });

  // Update header-right: show range-mode (hide all but Select Range + Close Out)
  const hdrRight = document.querySelector('.cal-header-right');
  if (hdrRight) hdrRight.classList.toggle('range-mode', !!(calSelStart || calSelPicking));

  // Update Select Range button label
  const selBtn = document.getElementById('calSelBtn');
  if (selBtn) {
    if (calSelStart && calSelEnd) {
      const MNAMES = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const startV = calDv(calSelStart.month, calSelStart.day);
      const endV   = calDv(calSelEnd.month,   calSelEnd.day);
      const loD = startV <= endV ? calSelStart : calSelEnd;
      const hiD = startV <= endV ? calSelEnd   : calSelStart;
      selBtn.innerHTML = svgCal + ` ${MNAMES[loD.month]} ${loD.day} – ${MNAMES[hiD.month]} ${hiD.day}` + svgChevronDown;
    } else if (calSelStart && !calSelEnd) {
      selBtn.innerHTML = svgCal + ' Pick end…';
    }
  }

  // Update grid picking cursor
  const grid = document.getElementById('calMonths');
  if (grid) grid.classList.toggle('range-picking', calSelPicking);
}

const svgCal = `<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12" style="flex-shrink:0"><rect x="1" y="2" width="12" height="11" rx="1"/><line x1="4" y1="1" x2="4" y2="3"/><line x1="10" y1="1" x2="10" y2="3"/><line x1="1" y1="6" x2="13" y2="6"/></svg>`;
const svgChevronDown = `<span class="material-icons" style="font-size:14px;flex-shrink:0;margin-left:2px">expand_more</span>`;

function clearCalSelection() {
  calSelStart = null; calSelEnd = null; calSelPicking = false;
  // Reset Close button appearance
  const closeBtn = document.getElementById('calCloseOutBtn');
  if (closeBtn) { closeBtn.style.background = ''; closeBtn.style.color = ''; }
  const hdrRight = document.querySelector('.cal-header-right');
  if (hdrRight) hdrRight.classList.remove('range-mode');
  applyCalSelection();
}

/* ─── CALENDAR NAV & VIEW SELECTOR ─── */
(function () {
  function clamp() {
    calStartIdx = Math.max(0, Math.min(calStartIdx, ALL_MONTHS.length - calView));
  }

  function renderAndRestoreCompact() {
    renderCalendar();
    var g = document.getElementById('calMonths');
    if (g) {
      if (calDisplayView >= 3) g.classList.add('cal-compact');
      else g.classList.remove('cal-compact');
      if (calDisplayView === 12) g.classList.add('cal-12m');
      else g.classList.remove('cal-12m');
    }
    calApplyDayCellHeights();
    _calSyncCellCompareVisibility();
    if (typeof applyOutOfRange === 'function') applyOutOfRange();
  }

  // New date-nav row buttons — move by calDisplayView months in 6/12 mode
  document.getElementById('calPrev')
    ?.addEventListener('click', () => {
      calStartIdx -= (calDisplayView >= 6 ? calDisplayView : 1);
      clamp(); renderAndRestoreCompact();
      if (typeof calDRSyncToNav === 'function') calDRSyncToNav();
    });
  document.getElementById('calNext')
    ?.addEventListener('click', () => {
      calStartIdx += (calDisplayView >= 6 ? calDisplayView : 1);
      clamp(); renderAndRestoreCompact();
      if (typeof calDRSyncToNav === 'function') calDRSyncToNav();
    });

  // Monthly tab-bar shuffler (mirrors calPrev/calNext)
  document.getElementById('moShufPrev')
    ?.addEventListener('click', () => {
      calStartIdx -= (calDisplayView >= 6 ? calDisplayView : 1);
      clamp(); renderAndRestoreCompact();
      if (typeof calDRSyncToNav === 'function') calDRSyncToNav();
    });
  document.getElementById('moShufNext')
    ?.addEventListener('click', () => {
      calStartIdx += (calDisplayView >= 6 ? calDisplayView : 1);
      clamp(); renderAndRestoreCompact();
      if (typeof calDRSyncToNav === 'function') calDRSyncToNav();
    });

  // Legacy selectors (kept for safety)
  document.querySelector('.cal-nav-left .cal-nav-btn:first-child')
    ?.addEventListener('click', () => { calStartIdx--; clamp(); renderCalendar(); if (typeof calDRSyncToNav === 'function') calDRSyncToNav(); });
  document.querySelector('.cal-nav-left .cal-nav-btn:last-child')
    ?.addEventListener('click', () => { calStartIdx++; clamp(); renderCalendar(); if (typeof calDRSyncToNav === 'function') calDRSyncToNav(); });

  document.querySelector('.cal-nav-right .cal-selector select')
    ?.addEventListener('change', e => {
      calView = parseInt(e.target.value, 10);
      clamp();
      renderCalendar();
    });
})();

/* ─── CLOSE DROPDOWN (replaces standalone Select Range button) ─── */
(function () {
  // Toggle the Close dropdown
  window.calCloseDropdownToggle = function(e) {
    e.stopPropagation();
    var dd = document.getElementById('calCloseDropdown');
    if (!dd) return;
    var open = dd.style.display !== 'none';
    dd.style.display = open ? 'none' : 'block';
  };

  // "Select range" option — enter range-picking mode (same as old calSelBtn)
  window.calCloseSelectRange = function() {
    document.getElementById('calCloseDropdown').style.display = 'none';
    if (calSelStart) { clearCalSelection(); return; }
    calSelPicking = true;
    const hdrRight = document.getElementById('calMonths')?.closest('.section-card')
                       ?.querySelector('.cal-header-right');
    if (hdrRight) hdrRight.classList.add('range-mode');
    const grid = document.getElementById('calMonths');
    if (grid) grid.classList.add('range-picking');
    // Update Close button label to show picking state
    const closeBtn = document.getElementById('calCloseOutBtn');
    if (closeBtn) {
      closeBtn.style.background = '#006461';
      closeBtn.style.color = '#fff';
    }
  };

  // "Custom" option — open modal with no pre-populated dates
  window.calCloseCustom = function() {
    var dd = document.getElementById('calCloseDropdown');
    if (dd) dd.style.display = 'none';
    if (typeof window._coOpenModal === 'function') window._coOpenModal('', '', 'cal');
  };

  // Monthly Close Out button (opens modal directly)
  window.moOpenCloseOut = function() {
    if (typeof window._coOpenModal === 'function') window._coOpenModal('', '', 'cal');
  };

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    var wrap = document.getElementById('calCloseWrap');
    var dd   = document.getElementById('calCloseDropdown');
    if (dd && wrap && !wrap.contains(e.target)) dd.style.display = 'none';
  });

  // Escape cancels range picking
  document.addEventListener('keydown', e => { if (e.key === 'Escape') clearCalSelection(); });
})();
(function () {
  const popup  = document.getElementById('dayPopup');
  const close  = document.getElementById('popupClose');
  const dateEl = document.getElementById('popupDate');
  if (!popup) return;

  const DAY_NAMES   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const MONTH_NAMES = ['','January','February','March','April','May','June',
                        'July','August','September','October','November','December'];

  function openPopup(cell, month, day) {
    const dm = month, dd = day;
    const d = new Date(2026, dm - 1, dd);
    const TODAY_POPUP = new Date(2026, 2, 9);
    const popupDba = Math.round((d - TODAY_POPUP) / 86400000);
    const popupDbaHtml = popupDba === 0
      ? ' <span style="font-size:9px;font-weight:700;color:#006461;background:#ccfbf1;padding:1px 6px;border-radius:4px;margin-left:4px;vertical-align:middle">Today</span>'
      : popupDba > 0
      ? ' <span style="font-size:9px;font-weight:700;color:#006461;background:#ccfbf1;padding:1px 6px;border-radius:4px;margin-left:4px;vertical-align:middle">' + popupDba + ' DBA</span>'
      : '';
    dateEl.innerHTML = DAY_NAMES[d.getDay()] + ', ' + MONTH_NAMES[dm] + ' ' + dd + ', 2026' + popupDbaHtml;

    // ── Read active filters ──
    const _fCal = typeof filterState !== 'undefined' ? filterState.cal : {};
    const toKey  = _fCal.calFiltTO || calFiltTO || 'all';
    const _rtFilt = _fCal.calFiltRoom || 'all';
    const _bdFilt = _fCal.calFiltBoard || 'all';
    const _mkFilt = _fCal.calFiltMarket || 'all';
    const _hasAnyFilter = toKey !== 'all' || _rtFilt !== 'all' || _bdFilt !== 'all' || _mkFilt !== 'all';

    // ── Compute base values ──
    const { hotel: hotelBase, to: toRaw } = getOccupancy(dm, dd);
    const toMult = TO_FILTER_MULT[toKey] || 1.0;
    const toBase = Math.min(95, Math.round(toRaw * toMult));
    const toLabel = toKey !== 'all'
      ? toKey.charAt(0).toUpperCase() + toKey.slice(1).replace(/-/g,' ')
      : 'All Operators';

    const adrBase = 150 + Math.abs((dm * 47 + dd * 31) % 130);
    const v       = Math.abs((dm * 127 + dd * 53 + dm * dd * 7 + dd * dd * 3)) % 100;

    // ── Apply filter multipliers to metrics ──
    // Room type filter: each room type represents a share of total inventory
    var _rtMult = 1.0;
    if (_rtFilt !== 'all') {
      var _rtShares = {standard:0.34,superior:0.24,deluxe:0.18,suite:0.08,'jr. suite':0.10,family:0.06};
      var _rtParts = _rtFilt.split(',');
      _rtMult = _rtParts.reduce(function(a,b){ return a + (_rtShares[b.trim().toLowerCase()] || 0.15); }, 0);
      _rtMult = Math.min(1, _rtMult);
    }
    // Board type filter
    var _bdMult = 1.0;
    if (_bdFilt !== 'all') {
      var _bdShares = {ai:0.55,bb:0.20,hb:0.15,ro:0.10,fb:0.05};
      var _bdParts = _bdFilt.split(',');
      _bdMult = _bdParts.reduce(function(a,b){ return a + (_bdShares[b.trim()] || 0.15); }, 0);
      _bdMult = Math.min(1, _bdMult);
    }
    // Market filter
    var _mkMult = _mkFilt !== 'all' ? 0.6 : 1.0;

    var _filterMult = _rtMult * _bdMult * _mkMult;
    // Filtered occupancy: scale rooms sold by filter scope
    var hotel = _hasAnyFilter ? Math.max(5, Math.round(hotelBase * _filterMult)) : hotelBase;
    var to    = _hasAnyFilter ? Math.max(2, Math.round(toBase * _filterMult))    : toBase;
    // Filtered ADR: slight variation by room type (suites higher, standard lower)
    var _adrAdj = 0;
    if (_rtFilt !== 'all') {
      var _rtAdrMap = {standard:-15,superior:0,deluxe:20,suite:80,'jr. suite':50,family:10};
      var _rtFirst = _rtFilt.split(',')[0].trim().toLowerCase();
      _adrAdj = _rtAdrMap[_rtFirst] || 0;
    }
    var adr = adrBase + _adrAdj;
    var rev = Math.floor(hotel * adr * HOTEL_CAPACITY / 100 * 1.1);
    var onlinePct = Math.max(30, Math.min(80, 45 + Math.abs((dm * 13 + dd * 7) % 35)));
    var offlinePct = 100 - onlinePct;
    var adrBar = Math.min(95, 40 + Math.abs((dm * 11 + dd * 19) % 55));
    var revBar = Math.min(95, Math.round((35 + Math.abs((dm * 17 + dd * 13) % 60)) * _filterMult));
    var hotelSDLY = Math.max(5, hotel - 3 - (v % 5));
    var toSDLY    = Math.max(5, to    - 2 - (v % 4));
    var adrSDLY   = adr - 8;
    var revSDLY   = Math.floor(rev * 0.9);
    const pad = function(n){ return String(n).padStart(2,'0'); };

    // update operator label
    const opEl = document.getElementById('popupOperator');
    if (opEl) opEl.textContent = toLabel;

    // ── Computed values ──
    var sign       = function(n){ return n >= 0 ? '+' + n : String(n); };
    var otherPct   = Math.max(0, hotel - to);
    var freePct    = 100 - hotel;
    var filteredCap = _hasAnyFilter ? Math.round(HOTEL_CAPACITY * _rtMult) : HOTEL_CAPACITY;
    var toRms      = Math.round(filteredCap * to       / 100);
    var otherRms   = Math.round(filteredCap * otherPct / 100);
    var freeRms    = Math.max(0, filteredCap - toRms - otherRms);
    var rnSold     = Math.floor(hotel * filteredCap / 100);
    var availRooms = Math.max(0, filteredCap - rnSold);
    var availGuar  = Math.max(0, Math.floor((8 + v % 5) * _filterMult));
    var sdlyR      = Math.floor(rev * 0.9);

    // Filter label for sections
    var _filtLabel = '';
    if (_hasAnyFilter) {
      var _parts = [];
      if (toKey !== 'all') _parts.push(toLabel);
      if (_rtFilt !== 'all') _parts.push(_rtFilt.split(',').map(function(s){return s.trim();}).join(', '));
      if (_bdFilt !== 'all') { var _bm={ai:'AI',bb:'B&B',hb:'HB',ro:'RO',fb:'FB'}; _parts.push(_bdFilt.split(',').map(function(b){return _bm[b.trim()]||b;}).join(', ')); }
      if (_mkFilt !== 'all') _parts.push('Market: '+_mkFilt);
      _filtLabel = '<div style="font-size:8px;font-weight:600;color:#006461;background:#d7f7ed;padding:2px 8px;border-radius:4px;margin-bottom:6px;text-align:center">Filtered: '+_parts.join(' · ')+'</div>';
    }

    var _basePickup = Math.max(1, Math.floor((v%25+5)*_filterMult));
    // Derived values for More Metrics rows
    var _dmAvgA = (1.8+v%3*0.1), _dmAvgC = (0.3+v%2*0.1);
    var _totAdultsTO   = Math.round(toRms * _dmAvgA);
    var _totChildrenTO = Math.round(toRms * _dmAvgC);
    var _totGuestsTO   = _totAdultsTO + _totChildrenTO;
    var _avgLos        = (2.8+v%5*0.3).toFixed(1) + 'n';
    var _avgLosStly    = (Math.max(1, 2.8+v%5*0.3-0.2)).toFixed(1) + 'n';
    var _avgLead       = (18+v%60) + 'd';
    var _avgLeadStly   = Math.max(5, 18+v%60-5) + 'd';
    var detRows = [
      ['RN Sold',      rnSold,                            Math.floor(rnSold*0.88),          '+' + Math.floor(v%30+5)],
      ['RevPAR',       '$' + Math.round(adr*hotel/100),   '$' + Math.floor(adr*0.92),       '+' + (10+v%20)+'%'],
      (function(){ var dv=pickupDayValues[0]||1, sc=dv<=1?0.3:dv<=3?0.6:dv<=7?1:Math.min(2,dv/7); return ['Pickup', '+'+Math.max(0,Math.round(_basePickup*sc)), '+0', '+'+Math.floor((v%15+5)*sc)]; })(),
      ['Avg Adults',   _dmAvgA.toFixed(1),               '1.9',                            '-0.1'],
      ['Avg Children', _dmAvgC.toFixed(1),               '0.4',                            '-0.1'],
      ['Total Adults',   _totAdultsTO,                   Math.round(_totAdultsTO*0.93),    '+' + Math.floor(v%8+2)],
      ['Total Children', _totChildrenTO,                 Math.round(_totChildrenTO*0.93),  '+' + Math.floor(v%5+1)],
      ['Total Guests',   _totGuestsTO,                   Math.round(_totGuestsTO*0.93),    '+' + Math.floor(v%10+3)],
      ['Avg LOS',        _avgLos,                        _avgLosStly,                      '+0.2n'],
      ['Lead Time',      _avgLead,                       _avgLeadStly,                     '+5d'],
      ['Avail Rooms',  availRooms,                         availRooms+3,                     '-' + (Math.floor(v%8)+1)],
      ['Avail Guar.',  availGuar,                          availGuar+2,                      '-' + (Math.floor(v%4)+1)],
    ];

    // Meal plans — filtered by board type
    var aiPct = Math.max(45, Math.min(68, 55 + (dm*7+dd*3)%14));
    var bbPct = Math.max(14, Math.min(28, 20 + (dm*11+dd*5)%11));
    var hbPct = Math.max(6,  Math.min(16, 10 + (dm*5+dd*7)%9));
    var roPct = Math.max(2,  100 - aiPct - bbPct - hbPct);
    var mealPlans = [
      { short:'AI', pct:aiPct, color:'#004948', key:'ai' },
      { short:'BB', pct:bbPct, color:'#52d9ce', key:'bb' },
      { short:'HB', pct:hbPct, color:'#C4FF45', key:'hb' },
      { short:'RO', pct:roPct, color:'#D97706', key:'ro' },
    ];
    // When board filter active, filter meal plans to only show selected
    if (_bdFilt !== 'all') {
      var _bdSel = _bdFilt.split(',').map(function(s){ return s.trim(); });
      mealPlans = mealPlans.filter(function(mp){ return _bdSel.indexOf(mp.key) >= 0; });
      if (mealPlans.length === 0) mealPlans = [{ short:'AI', pct:aiPct, color:'#004948', key:'ai' }]; // fallback
      // Normalize percentages to 100%
      var _mpTotal = mealPlans.reduce(function(a,p){ return a+p.pct; },0);
      if (_mpTotal > 0) mealPlans.forEach(function(p){ p.pct = Math.round(p.pct / _mpTotal * 100); });
    }
    var mealBarHtml = '<div class="wv-meals-bar" style="margin:4px 0 6px">'
      + mealPlans.map(function(p){ return '<div style="width:'+p.pct+'%;background:'+p.color+';height:100%"></div>'; }).join('')
      + '</div>';
    var _popAvgGPR = (1.8+v%3*0.1+0.3) + (0.3+v%2*0.1+0.1);
    var mealRowsHtml = mealPlans.map(function(p) {
      var rooms = Math.round(rnSold * p.pct / 100);
      var seats = Math.round(rooms * _popAvgGPR);
      var lyPct = Math.max(1, p.pct - 3 + (dm+dd)%5 - 2);
      var diff  = p.pct - lyPct;
      return '<div class="wv-meal-row">'
        +'<span class="wv-meal-dot" style="background:'+p.color+'"></span>'
        +'<span class="wv-meal-name">'+p.short+'</span>'
        +'<div class="wv-meal-bar-track"><div class="wv-meal-bar-fill" style="width:'+p.pct+'%;background:'+p.color+'"></div></div>'
        +'<span class="wv-meal-pct">'+p.pct+'%</span>'
        +'<span class="wv-meal-rooms">'+rooms+' rm</span>'
        +'<span class="wv-meal-rooms" style="color:#374151">'+seats+' seats</span>'
        +'<span class="wv-meal-delta '+(diff>=0?'pos':'neg')+'">'+(diff>=0?'+':'')+diff+'pp</span>'
        +'</div>';
    }).join('');

    // Room availability — filtered by active calendar filters
    var rtRowsAll = [['Standard',51],['Superior',36],['Deluxe',27],['Suite',12],['Jr. Suite',15],['Family',9]];
    // Filter room types when a specific room filter is active
    var rtRows = _rtFilt !== 'all' ? rtRowsAll.filter(function(r) {
      var selected = _rtFilt.split(',');
      return selected.some(function(s) { return s.trim().toLowerCase() === r[0].toLowerCase(); });
    }) : rtRowsAll;
    if (rtRows.length === 0) rtRows = rtRowsAll; // fallback if no match

    // Per-room-type sold: compute bookings specific to active filters
    // TO share per room type (seed-based variation)
    var _toShareMap = {'sunshine-tours':[.22,.20,.18,.25,.20,.22],'global-adv':[.20,.22,.24,.20,.22,.18],
      'beach-hols':[.18,.16,.20,.15,.18,.24],'city-breaks':[.24,.22,.18,.20,.20,.18],'adventure':[.16,.20,.20,.20,.20,.18]};
    // Board share per room type
    var _bdShareMap = {ai:[.55,.50,.45,.35,.40,.60],bb:[.20,.22,.24,.25,.25,.18],
      hb:[.15,.16,.18,.22,.20,.14],ro:[.10,.12,.13,.18,.15,.08]};

    var rtHTML = rtRows.map(function(row) {
      var name = row[0], inv = row[1];
      var origIdx = rtRowsAll.findIndex(function(r){ return r[0] === name; });
      var colorIdx = origIdx >= 0 ? origIdx : 0;
      // Base sold for this room type from overall hotel occupancy
      var baseSold = Math.min(inv, Math.floor(inv * hotelBase / 110));
      // Apply per-room-type filter multipliers
      var rtFiltMult = 1.0;
      if (toKey !== 'all') {
        var _ts = _toShareMap[toKey];
        rtFiltMult *= _ts ? _ts[origIdx] || 0.20 : 0.20;
      }
      if (_bdFilt !== 'all') {
        var _bdParts = _bdFilt.split(',').map(function(s){ return s.trim(); });
        var _bdSum = _bdParts.reduce(function(a,b){
          var _bs = _bdShareMap[b];
          return a + (_bs ? _bs[origIdx] || 0.15 : 0.15);
        }, 0);
        rtFiltMult *= Math.min(1, _bdSum);
      }
      if (_mkFilt !== 'all') rtFiltMult *= 0.6;
      var sold = _hasAnyFilter
        ? Math.min(inv, Math.max(0, Math.round(baseSold * rtFiltMult)))
        : baseSold;
      var avail = Math.max(0, inv - sold);
      var pct   = Math.round(sold / inv * 100);
      var barClr  = avail === 0 ? '#dc2626' : pct >= 85 ? '#ea580c' : pct >= 60 ? '#f59e0b' : '#16a34a';
      var availClr = avail === 0 ? '#dc2626' : avail <= 3 ? '#d97706' : '#16a34a';
      var rowBg = avail === 0 ? 'background:#fff1f2;border-radius:4px;padding:2px 4px;margin:1px -4px;' : 'padding:2px 0;';
      return '<div class="popup-rt-row" style="flex-direction:column;gap:2px;align-items:stretch;'+rowBg+'">'
        +'<div style="display:flex;align-items:center;gap:4px">'
        +'<span class="popup-rt-sw" style="background:'+RT_COLORS[colorIdx]+'"></span>'
        +'<span class="popup-rt-nm" style="flex:1">'+name+'</span>'
        +(_hasAnyFilter
          ? '<span style="font-size:12px;font-weight:600;color:#004948;margin-right:2px">'+sold+'<span style="color:#94a3b8;font-weight:400"> booked</span></span>'
          : '')
        +(avail === 0
          ? '<span style="font-size:12px;font-weight:700;color:#16a34a">0 available</span>'
          : '<span style="font-size:12px;font-weight:700;color:'+availClr+'">'+avail+' avail</span>')
        +'</div>'
        +'<div style="height:6px;border-radius:2px;background:#e5e7eb;overflow:hidden;margin-left:11px">'
        +'<div style="height:100%;width:'+pct+'%;background:'+barClr+';border-radius:2px"></div>'
        +'</div>'
        +'</div>';
    }).join('');

    // TO Rates — filtered by active TO filter
    var toNamesAll  = ['Sunshine Tours','Global Adv.','Beach Hols','City Breaks','Adventure'];
    var toColorsAll = ['#3b82f6','#967EF3','#0ea5e9','#10b981','#f59e0b'];
    var _toFilterMap = {'sunshine-tours':0,'global-adv':1,'beach-hols':2,'city-breaks':3,'adventure':4};
    var toNames = toNamesAll, toColors = toColorsAll;
    if (toKey !== 'all' && _toFilterMap[toKey] !== undefined) {
      var _tfi = _toFilterMap[toKey];
      toNames = [toNamesAll[_tfi]];
      toColors = [toColorsAll[_tfi]];
    }
    var toRatesHTML = toNames.map(function(name, i) {
      var origIdx = toNamesAll.indexOf(name);
      if (origIdx < 0) origIdx = i;
      var toRate  = adr - 15 + Math.abs((dm*(origIdx+3) + dd*(origIdx+5)) % 50);
      var toAllot = 5  + Math.abs((dm*(origIdx+2) + dd*(origIdx+3)) % 20);
      var toUsed  = Math.max(0, toAllot - Math.floor(hotel / 20));
      var barPct  = Math.round((toUsed / toAllot) * 100);
      var barCls  = barPct >= 90 ? 'wv-to-bar-high' : barPct >= 60 ? 'wv-to-bar-mid' : 'wv-to-bar-low';
      return '<div class="wv-to-rate-row">'
        +'<span class="wv-to-dot" style="background:'+toColors[i]+'"></span>'
        +'<span class="wv-to-name">'+name+'</span>'
        +'<div class="wv-to-bar-wrap"><div class="wv-to-bar '+barCls+'" style="width:'+barPct+'%"></div></div>'
        +'<span class="wv-to-rate">$'+toRate+'</span>'
        +'<span class="wv-to-allot">'+(toAllot-toUsed)+' rooms</span>'
        +'</div>';
    }).join('');

    // Restrictions for eye popup
    const popupCl = PARTIAL_CLOSURES[dm + '-' + dd];
    const hasPopupCl = popupCl && Array.isArray(popupCl) && popupCl.length > 0;
    function popupClChip(label, color) {
      return '<span class="wv-cl-chip" style="color:'+color+';background:'+color+'18;border-color:'+color+'3a">'+label+'</span>';
    }
    const BMAP_P={ai:'All Inclusive',bb:'Bed & Breakfast',hb:'Half Board',ro:'Room Only',fb:'Full Board'};
    const popupClHtml = !hasPopupCl ? '' : (function(){
      const ruleCards = popupCl.map(function(rule, ri){
        const toPart = rule.tos.length ? rule.tos.map(function(n){ return popupClChip(n, TO_COLORS_MAP[n]||'#dc2626'); }).join('') : popupClChip('All Operators','#9ca3af');
        const rtPart = rule.roomTypes.length ? rule.roomTypes.map(function(n){ return popupClChip(n, RT_NAME_COLORS[n]||'#b45309'); }).join('') : popupClChip('All Room Types','#9ca3af');
        const bdPart = rule.boards.length ? rule.boards.map(function(b){ return popupClChip(BMAP_P[b]||b,'#7c3aed'); }).join('') : popupClChip('All Meal Plans','#9ca3af');
        return '<div style="margin-bottom:4px;padding:4px 0;border-bottom:1px solid #f3f4f6">'
          +'<span style="font-size:12px;font-weight:700;color:#D32F2F">Strategy</span>'
          +'<div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:3px">'+toPart+rtPart+bdPart+'</div>'
          +'</div>';
      }).join('');
      return '<div class="popup-metrics-section popup-closures-section">'
        +'<div class="popup-metrics-title" style="color:#D32F2F">CLOSED OUT</div>'
        +ruleCards+'</div>';
    })();

    // ── Figma two-column popup builders (200px left | ~148px right) ──
    var _C1='#004948',_C2='#52d9ce',_C3='#D97706',_CSTLY='#C4FF45',_CREM='#445e0d';
    var _hasCmp = calCompareMode !== 'none';
    var _cm = (function(){
      switch(calCompareMode) {
        case 'stly':   return {occD:-(3+v%5), adrD:-8, rev:0.90, rn:0.88, revpar:0.92, pu:0.88, avgA:0.92, avgC:0.90, tot:0.90};
        case 'ly':     return {occD:-(4+v%6), adrD:-12, rev:0.87, rn:0.85, revpar:0.89, pu:0.85, avgA:0.89, avgC:0.87, tot:0.87};
        case 'fcst':   return {occD:(2+v%3), adrD:5, rev:1.04, rn:1.03, revpar:1.05, pu:1.06, avgA:1.03, avgC:1.02, tot:1.03};
        case 'budget': return {occD:(1+v%2), adrD:3, rev:1.02, rn:1.01, revpar:1.03, pu:1.02, avgA:1.01, avgC:1.01, tot:1.01};
        default:       return null;
      }
    })();
    // Inline compare: difference amount + arrow (monthly eye popup)
    function _pCmpSfx(curr, comp, fmtFn) {
      if (!_hasCmp || curr == null || comp == null) return '';
      var c = parseFloat(curr), p = parseFloat(comp);
      if (isNaN(c) || isNaN(p)) return '';
      var diff = c - p;
      if (diff === 0) return '';
      var absDiff = Math.abs(diff);
      var fmt = fmtFn || function(d) { return String(Math.round(d)); };
      var diffStr = fmt(absDiff);
      var clr = diff > 0 ? '#388C3F' : '#D32F2F';
      var arrow = diff > 0 ? 'arrow_upward' : 'arrow_downward';
      return '<span class="pb-cmp-delta" style="color:' + clr + '">'
        + '<span class="material-icons pb-cmp-arrow">' + arrow + '</span>'
        + '<span class="pb-cmp-amt">' + diffStr + '</span></span>';
    }
    var _sectIdx=0;
    // Progress bars — rendered inside right column
    function _pBar(pct,c){return'<div class="pb-bar"><div class="pb-bar-fill" style="width:'+Math.max(2,pct)+'%;background:'+c+'"></div></div>';}
    function _pSbar(segs){return'<div class="pb-bar" style="display:flex">'+segs.map(function(s){return'<div style="width:'+s.p+'%;background:'+s.c+';height:100%"></div>';}).join('')+'</div>';}
    // Group header (44px, full-width, collapsible)
    function _pGrpStart(label,clr,uid){
      var isRed=clr==='#dc2626';
      var lclr=isRed?'#dc2626':'#111827';
      var bgclr=isRed?'#fff5f5':'#f8fafa';
      return '<div class="pb-2col pb-grp-toggle" data-grpid="'+uid+'" style="background:'+bgclr+'">'
        +'<div class="pb-col-l" style="padding-left:0">'
        +'<span class="pb-chev pb-grp-chevron" style="color:'+(isRed?'#dc2626':'#6b7280')+';margin-left:13px"></span>'
        +'<span style="font-size:13px;font-weight:700;color:'+lclr+';letter-spacing:0.01em">'+label+'</span>'
        +'</div>'
        +'<div class="pb-col-r" style="border-left:none"></div>'
        +'</div>'
        +'<div class="pb-grp-body" data-grpid="'+uid+'">';
    }
    function _pGrpEnd(){return'</div>';}
    // Primary metric row (53px, collapsible, with value + bar in right col)
    function _pSectS(label,val,barHtml,curr,comp,fmtFn){
      var sid='ps'+(_sectIdx++);
      var valDisp = '<div class="pb-val-col"><span class="pb-m-val" style="font-size:13px;font-weight:700;color:#111827;line-height:1.2">'+val+'</span>'
        + _pCmpSfx(curr, comp, fmtFn) + '</div>';
      return '<div>'
        +'<div class="pb-2col pb-sect-hdr" data-sectid="'+sid+'">'
        +'<div class="pb-col-l" style="padding-left:0">'
        +'<span class="pb-chev pb-sect-chevron" style="margin-left:19px"></span>'
        +'<span style="font-size:13px;font-weight:500;color:#374151;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">'+label+'</span>'
        +'</div>'
        +'<div class="pb-col-r">'
        + valDisp
        +(barHtml||'')
        +'</div>'
        +'</div>'
        +'<div class="pb-sect-body" data-sectid="'+sid+'">';
    }
    function _pSectE(){return'</div></div>';}
    // Non-collapsible metric row (44px)
    function _pSect(label,val,barHtml){
      return '<div class="pb-2col" style="min-height:44px;border-bottom:1px solid #f3f4f6">'
        +'<div class="pb-col-l" style="padding-left:33px">'
        +'<span style="font-size:13px;font-weight:500;color:#374151">'+label+'</span>'
        +'</div>'
        +'<div class="pb-col-r pb-val-col-wrap">'
        +'<div class="pb-val-col"><span class="pb-m-val" style="font-size:13px;font-weight:700;color:#111827">'+val+'</span></div>'
        +(barHtml||'')
        +'</div>'
        +'</div>';
    }
    // Sub-row (32px, bullet dot on left, value left-aligned + compare inline)
    function _pSub(label,val,dot,isRem,curr,comp,fmtFn){
      var lclr=isRem?'#16a34a':'#6b7280';
      var vclr=isRem?'#16a34a':'#111827';
      var dotHtml=dot
        ?'<span style="width:9px;height:9px;border-radius:50%;background:'+dot+';flex-shrink:0"></span>'
        :'<span style="width:9px;flex-shrink:0"></span>';
      return '<div class="pb-2col pb-sub-row">'
        +'<div class="pb-col-l" style="padding-left:27px;gap:6px">'
        +dotHtml
        +'<span style="font-size:12px;color:'+lclr+';overflow:hidden;white-space:nowrap;text-overflow:ellipsis">'+label+'</span>'
        +'</div>'
        +'<div class="pb-col-r pb-val-col-wrap">'
        +'<div class="pb-val-col">'
        +'<span class="pb-m-val" style="font-size:12px;font-weight:600;color:'+vclr+'">'+val+'</span>'
        + _pCmpSfx(curr,comp,fmtFn)
        +'</div></div>'
        +'</div>';
    }
    function _pRef(stlyVal,delta){
      return '<div class="pb-2col" style="padding-bottom:2px">'
        +'<div class="pb-col-l" style="padding-left:36px"></div>'
        +'<div class="pb-col-r" style="flex-direction:row;gap:4px;padding:2px 0;align-items:center">'
        +'<span class="wv-ref-tag wv-ref-sdly" style="font-size:9px">STLY '+stlyVal+'</span>'
        +'<span class="wv-ref-tag '+(String(delta).startsWith('+')?'wv-ref-fcst':'wv-ref-sdly')+'" style="font-size:9px">'+delta+'</span>'
        +'</div>'
        +'</div>';
    }

    var _pb = '';
    _pb += _filtLabel;

    // ── Close Outs ──
    _pb += _pGrpStart('Close Outs', '#D32F2F', 'co');
    if (hasPopupCl || LOCKED_DAYS.has(dm+'-'+dd)) {
      _pb += popupClHtml;
    } else {
      _pb += _pSub('Room Types', '—', '#9ca3af');
      _pb += _pSub('Board Types', '—', '#9ca3af');
      _pb += _pSub('Tour Operators', '—', '#9ca3af');
    }
    _pb += _pGrpEnd();

    // ── Computed values for TO sub-rows ──
    var _toAdr   = Math.max(80, adr - 20 - Math.abs((dm*3+dd*7)%15));
    var _toRev   = Math.floor(toRms * _toAdr);
    var _toRevS  = _toRev >= 1000000 ? '$'+((_toRev/1000000).toFixed(1))+'M' : '$'+Math.round(_toRev/1000)+'k';
    var _toRevpar = Math.max(50, (adr+80) - 30 - Math.abs((dm*5+dd*3)%20));
    var _hRevpar  = Math.round(adr * hotel / 100);
    var _hPickup  = Math.floor(v%25+5);
    var _hAvgA    = (_dmAvgA + 0.3).toFixed(1);
    var _hAvgC    = (_dmAvgC + 0.1).toFixed(1);
    var _hTotA    = Math.round(rnSold * parseFloat(_hAvgA));
    var _hTotC    = Math.round(rnSold * parseFloat(_hAvgC));
    var _hTotG    = _hTotA + _hTotC;
    var _hLos     = (2.8+v%5*0.3+0.4).toFixed(1)+'n';
    var _hLead    = (18+v%60+12)+'d';

    // ── Daily Metrics ── (compare = delta + arrow, inline on values)
    var _fmtPct = function(d) { return Math.round(d) + '%'; };
    var _fmtUsd = function(d) { return '$' + Math.round(d); };
    var _fmtUsdK = function(d) { return calFmtCellMoney(d); };
    var _fmtPu = function(d) { return '+' + Math.round(d); };
    var _fmtDec1 = function(d) { return (Math.round(d * 10) / 10).toFixed(1); };
    var _fmtLos = function(d) { return (Math.round(d * 10) / 10).toFixed(1) + 'n'; };
    var _fmtLead = function(d) { return Math.round(d) + 'd'; };
    var _pCmpRow = 0;
    function _popCmpMul(cur, mult, lbl) {
      if (!_hasCmp || !_cm || cur == null) return null;
      return calCmpRefValue(cur, mult, _pCmpRow++, dm, dd, lbl);
    }
    function _popCmpAdd(cur, delta, lbl) {
      if (!_hasCmp || !_cm || cur == null) return null;
      var v = calCmpRefAdditive(cur, delta, _pCmpRow++, dm, dd, lbl);
      return v == null ? null : v;
    }
    _pb += _pGrpStart('Daily Metrics', _C1, 'dm');
    var _cmpHotelOcc = _hasCmp && _cm ? Math.max(5, _popCmpAdd(hotel, _cm.occD, 'Occ')) : null;
    _pb += _pSectS('Occupancy', hotel+'%', _pSbar([{p:to,c:_C1},{p:otherPct,c:_C2}]), hotel, _cmpHotelOcc, _fmtPct);
    _pb += _pSub('Travel Distribution Hubs', toRms+' RN  '+to+'%', _C1);
    _pb += _pSub('Other Segments', otherRms+' RN  '+otherPct+'%', _C2);
    _pb += _pSub('Total Hotel Occupancy', freeRms+' RN  '+freePct+'%', _CREM, true);
    _pb += _pSectE();
    var _cmpOnl = _hasCmp && _cm ? Math.min(100, Math.max(10, Math.round(_popCmpMul(onlinePct, _cm.rev, 'Online')))) : null;
    _pb += _pSectS('Online / Offline', onlinePct+'%', _pSbar([{p:onlinePct,c:_C1},{p:offlinePct,c:_C2}]));
    _pb += _pSub('Online', onlinePct+'%', _C1, false, onlinePct, _cmpOnl, _fmtPct);
    _pb += _pSub('Offline', offlinePct+'%', _C2);
    _pb += _pSectE();
    var _cmpToAdr = _hasCmp && _cm ? _popCmpAdd(_toAdr, _cm.adrD, 'TO-ADR') : null;
    var _cmpHtlAdr = _hasCmp && _cm ? _popCmpAdd(adr, _cm.adrD, 'H-ADR') : null;
    _pb += _pSectS('ADR', '$'+adr, _pBar(adrBar, _C1), adr, _cmpHtlAdr, _fmtUsd);
    _pb += _pSub('TO', '$'+_toAdr, _C1, false, _toAdr, _cmpToAdr, _fmtUsd);
    _pb += _pSub('Hotel', '$'+adr, _C2, false, adr, _cmpHtlAdr, _fmtUsd);
    _pb += _pSectE();
    var _cmpToRev = _hasCmp && _cm ? Math.floor(_popCmpMul(_toRev, _cm.rev, 'TO-Rev')) : null;
    var _cmpHtlRev = _hasCmp && _cm ? _popCmpMul(rev, _cm.rev, 'H-Rev') : null;
    _pb += _pSectS('Revenue', '$'+Math.floor(rev/1000)+'k', _pBar(revBar, _C1), rev, _cmpHtlRev, _fmtUsdK);
    _pb += _pSub('TO', _toRevS, _C1, false, _toRev, _cmpToRev, _fmtUsdK);
    _pb += _pSub('Hotel', '$'+Math.floor(rev/1000)+'k', _C2, false, rev, _cmpHtlRev, _fmtUsdK);
    _pb += _pSectE();
    _pb += _pGrpEnd();

    // ── More Metrics ── (compare = delta + arrow on TO / Hotel)
    _pb += _pGrpStart('More Metrics', _C1, 'mm');
    var _cmpRnTo = _hasCmp && _cm ? Math.floor(_popCmpMul(toRms, _cm.rn, 'TO-RN')) : null;
    var _cmpRnHtl = _hasCmp && _cm ? Math.floor(_popCmpMul(rnSold, _cm.rn, 'H-RN')) : null;
    _pb += _pSectS('RN Sold', toRms, _pBar(Math.min(92, 55+(v%37)), _C1), toRms, _cmpRnTo);
    _pb += _pSub('TO', String(toRms), _C1, false, toRms, _cmpRnTo);
    _pb += _pSub('Hotel', String(rnSold), _C2, false, rnSold, _cmpRnHtl);
    _pb += _pSectE();
    var _cmpRevparH = _hasCmp && _cm ? Math.floor(_popCmpMul(_hRevpar, _cm.revpar, 'H-RevPAR')) : null;
    _pb += _pSectS('RevPAR', '$'+_toRevpar, _pBar(Math.min(92, 65+v%25), _C1));
    _pb += _pSub('TO', '$'+_toRevpar, _C1);
    _pb += _pSub('Hotel', '$'+_hRevpar, _C2, false, _hRevpar, _cmpRevparH, _fmtUsd);
    _pb += _pSectE();
    var _puDvP = pickupDayValues[0] || 1;
    var _puScP = _puDvP<=1?0.3:_puDvP<=3?0.6:_puDvP<=7?1:Math.min(2,_puDvP/7);
    var _puToP = Math.max(0, Math.round(_basePickup * _puScP));
    var _puHP  = Math.max(0, Math.round(_hPickup * _puScP));
    var _cmpPuTo = _hasCmp && _cm ? Math.max(0, Math.round(_popCmpMul(_puToP, _cm.pu, 'TO-Pu'))) : null;
    var _cmpPuHtl = _hasCmp && _cm ? Math.max(0, Math.round(_popCmpMul(_puHP, _cm.pu, 'H-Pu'))) : null;
    _pb += _pSectS('Pickup', '+'+_puToP, _pBar(Math.min(92, 30+v%50), _C1));
    _pb += _pSub('TO', '+'+_puToP, _C1, false, _puToP, _cmpPuTo, _fmtPu);
    _pb += _pSub('Hotel', '+'+_puHP, _C2, false, _puHP, _cmpPuHtl, _fmtPu);
    _pb += _pSectE();
    var _cmpAvgAT = _hasCmp && _cm ? _popCmpMul(_dmAvgA, _cm.avgA, 'TO-AvgA') : null;
    var _cmpAvgAH = _hasCmp && _cm ? _popCmpMul(parseFloat(_hAvgA), _cm.avgA, 'H-AvgA') : null;
    _pb += _pSectS('Average Adults', _dmAvgA.toFixed(1), _pBar(Math.min(92, 55+v%30), _C1));
    _pb += _pSub('TO', _dmAvgA.toFixed(1), _C1, false, _dmAvgA, _cmpAvgAT, _fmtDec1);
    _pb += _pSub('Hotel', _hAvgA, _C2, false, parseFloat(_hAvgA), _cmpAvgAH, _fmtDec1);
    _pb += _pSectE();
    var _cmpAvgCT = _hasCmp && _cm ? _popCmpMul(_dmAvgC, _cm.avgC, 'TO-AvgC') : null;
    var _cmpAvgCH = _hasCmp && _cm ? _popCmpMul(parseFloat(_hAvgC), _cm.avgC, 'H-AvgC') : null;
    _pb += _pSectS('Average Children', _dmAvgC.toFixed(1), _pBar(Math.min(92, 20+v%40), _C1));
    _pb += _pSub('TO', _dmAvgC.toFixed(1), _C1, false, _dmAvgC, _cmpAvgCT, _fmtDec1);
    _pb += _pSub('Hotel', _hAvgC, _C2, false, parseFloat(_hAvgC), _cmpAvgCH, _fmtDec1);
    _pb += _pSectE();
    var _cmpTotAT = _hasCmp && _cm ? Math.round(_popCmpMul(_totAdultsTO, _cm.tot, 'TO-TotA')) : null;
    var _cmpTotAH = _hasCmp && _cm ? Math.round(_popCmpMul(_hTotA, _cm.tot, 'H-TotA')) : null;
    _pb += _pSectS('Total Adults', _totAdultsTO, _pBar(Math.min(92, 60+v%28), _C1));
    _pb += _pSub('TO', String(_totAdultsTO), _C1, false, _totAdultsTO, _cmpTotAT);
    _pb += _pSub('Hotel', String(_hTotA), _C2, false, _hTotA, _cmpTotAH);
    _pb += _pSectE();
    var _cmpTotCT = _hasCmp && _cm ? Math.round(_popCmpMul(_totChildrenTO, _cm.tot, 'TO-TotC')) : null;
    var _cmpTotCH = _hasCmp && _cm ? Math.round(_popCmpMul(_hTotC, _cm.tot, 'H-TotC')) : null;
    _pb += _pSectS('Total Children', _totChildrenTO, _pBar(Math.min(92, 15+v%35), _C1));
    _pb += _pSub('TO', String(_totChildrenTO), _C1, false, _totChildrenTO, _cmpTotCT);
    _pb += _pSub('Hotel', String(_hTotC), _C2, false, _hTotC, _cmpTotCH);
    _pb += _pSectE();
    var _cmpTotGT = _hasCmp && _cm ? Math.round(_popCmpMul(_totGuestsTO, _cm.tot, 'TO-TotG')) : null;
    var _cmpTotGH = _hasCmp && _cm ? Math.round(_popCmpMul(_hTotG, _cm.tot, 'H-TotG')) : null;
    _pb += _pSectS('Total Guests', _totGuestsTO, _pBar(Math.min(92, 55+v%35), _C1));
    _pb += _pSub('TO', String(_totGuestsTO), _C1, false, _totGuestsTO, _cmpTotGT);
    _pb += _pSub('Hotel', String(_hTotG), _C2, false, _hTotG, _cmpTotGH);
    _pb += _pSectE();
    var _cmpLosT = _hasCmp && _cm ? _popCmpMul(parseFloat(_avgLos), _cm.rev, 'TO-LOS') : null;
    var _cmpLosH = _hasCmp && _cm ? _popCmpMul(parseFloat(_hLos), _cm.rev, 'H-LOS') : null;
    _pb += _pSectS('Average LOS', _avgLos, _pBar(Math.min(92, 40+v%40), _C1));
    _pb += _pSub('TO', _avgLos, _C1, false, parseFloat(_avgLos), _cmpLosT, _fmtLos);
    _pb += _pSub('Hotel', _hLos, _C2, false, parseFloat(_hLos), _cmpLosH, _fmtLos);
    _pb += _pSectE();
    var _cmpLeadT = _hasCmp && _cm ? Math.round(_popCmpMul(parseInt(_avgLead, 10), _cm.rev, 'TO-Lead')) : null;
    var _cmpLeadH = _hasCmp && _cm ? Math.round(_popCmpMul(parseInt(_hLead, 10), _cm.rev, 'H-Lead')) : null;
    _pb += _pSectS('Lead Time', _avgLead, _pBar(Math.min(92, 25+v%55), _C1));
    _pb += _pSub('TO', _avgLead, _C1, false, parseInt(_avgLead, 10), _cmpLeadT, _fmtLead);
    _pb += _pSub('Hotel', _hLead, _C2, false, parseInt(_hLead, 10), _cmpLeadH, _fmtLead);
    _pb += _pSectE();
    // Avail Rooms (hotel-only)
    _pb += _pSect('Avail Rooms', availRooms+' RN', _pBar(Math.min(92, Math.max(5, hotel*0.8)), _C1));
    // Avail Guar.
    _pb += _pSect('Avail Guar.', availGuar+' RN', _pBar(Math.min(92, 10+v%50), _C1));
    _pb += _pGrpEnd();

    // ── Meal Plans ──
    _pb += _pGrpStart('Meal Plans', _C1, 'mp');
    // Summary bar + legend across full width
    _pb += '<div style="padding:6px 12px 4px">'
      +'<div class="pb-bar" style="display:flex;height:8px;border-radius:4px">'
      +mealPlans.map(function(p){ return '<div style="width:'+p.pct+'%;background:'+p.color+';height:100%"></div>'; }).join('')
      +'</div>'
      +'<div style="display:flex;flex-wrap:wrap;gap:4px 12px;padding:5px 0 2px">'
      +mealPlans.map(function(p){ return '<span style="font-size:10px;color:#374151;display:flex;align-items:center;gap:3px">'
        +'<span style="width:6px;height:6px;border-radius:50%;background:'+p.color+';flex-shrink:0"></span>'
        +p.short+' '+p.pct+'%</span>'; }).join('')
      +'</div></div>';
    // Meal Plans — each plan as collapsible section with sub-rows
    var _mpToPct = to / Math.max(1, hotel);
    var _mpAvgA = 1.8 + (dm*11+dd*7)%3 * 0.1, _mpAvgC = 0.3 + (dm*7+dd*13)%5 * 0.1;
    var _mpBaseAdr = adr, _mpToAdrGross = Math.round(adr * 0.82);
    var _mpLongNames = {AI:'All Inclusive', BB:'Bed & Breakfast', HB:'Half Board', RO:'Room Only', FB:'Full Board'};
    mealPlans.forEach(function(mp){
      var totalPlanRooms = Math.round(rnSold * mp.pct / 100);
      var toRoomsAmt     = Math.round(totalPlanRooms * _mpToPct);
      var hRooms = totalPlanRooms;
      var toGst = Math.round(toRoomsAmt * (_mpAvgA + _mpAvgC));
      var hGst  = Math.round(hRooms * (_mpAvgA + _mpAvgC));
      var tRev = Math.round(toRoomsAmt * _mpToAdrGross);
      var hRev = Math.round(hRooms * _mpBaseAdr);
      var tRevStr = tRev >= 1000 ? '$'+Math.round(tRev/1000)+'k' : '$'+tRev;
      var hRevStr = hRev >= 1000 ? '$'+Math.round(hRev/1000)+'k' : '$'+hRev;
      _pb += _pSectS(_mpLongNames[mp.short]||mp.short, mp.pct+'% · '+totalPlanRooms+' RN', _pBar(mp.pct, mp.color));
      _pb += _pSub('TO', toRoomsAmt+' RN · '+toGst+' G · '+tRevStr+' · $'+_mpToAdrGross, '#004948');
      _pb += _pSub('Hotel', hRooms+' RN · '+hGst+' G · '+hRevStr+' · $'+_mpBaseAdr, '#52d9ce');
      _pb += _pSectE();
    });
    _pb += _pGrpEnd();

    // ── Business Mix ── (matches weekly: before Room Availability)
    var _toMixPct    = 28 + Math.abs((dm*7+dd*5)%25);
    var _dirMixPct   = 30 + Math.abs((dm*5+dd*9)%20);
    var _otaMixPct   = 20 + Math.abs((dm*9+dd*3)%18);
    var _otherMixPct = Math.max(0, 100 - _toMixPct - _dirMixPct - _otaMixPct);
    var _bizMixSegs  = [
      { label:'TO',     pct:_toMixPct,    color:'#006461' },
      { label:'Direct', pct:_dirMixPct,   color:'#0284c7' },
      { label:'OTA',    pct:_otaMixPct,   color:'#D97706' },
      { label:'Other',  pct:_otherMixPct, color:'#9ca3af' },
    ];
    _pb += _pGrpStart('Business Mix', _C1, 'biz');
    _pb += '<div style="padding:6px 12px 4px">'
      +'<div class="pb-bar" style="display:flex;height:8px;border-radius:4px">'
      +_bizMixSegs.map(function(s){ return '<div style="width:'+s.pct+'%;background:'+s.color+';height:100%"></div>'; }).join('')
      +'</div></div>';
    _bizMixSegs.forEach(function(s){ _pb += _pSub(s.label, s.pct+'%', s.color); });
    _pb += _pGrpEnd();

    // ── Room Availability — stacked capacity bar + table (matches weekly daily view) ──
    var _rtAll = [['Standard',51],['Superior',36],['Deluxe',27],['Suite',12],['Jr. Suite',15],['Family',9]];
    var _rtTotalCap = _rtAll.reduce(function(s,r){ return s+r[1]; }, 0);
    var _rtData = _rtAll.map(function(r, i) {
      var inv = r[1];
      var totalSoldRt = Math.min(inv, Math.floor(inv * hotel / 110));
      var toSoldRt    = Math.min(totalSoldRt, Math.round(totalSoldRt * to / Math.max(1, hotel)));
      var otherSoldRt = totalSoldRt - toSoldRt;
      var toAlloc     = Math.floor(inv * 0.8 + Math.abs((dm*(i+3)+dd*(i+5))%15));
      var toAllocRem  = Math.max(0, toAlloc - toSoldRt);
      var avail       = Math.max(0, inv - totalSoldRt);
      return { inv:inv, toSold:toSoldRt, other:otherSoldRt, allocRem:toAllocRem, avail:avail };
    });
    var _rtTotToSold  = _rtData.reduce(function(s,d){ return s+d.toSold; }, 0);
    var _rtTotOther   = _rtData.reduce(function(s,d){ return s+d.other; }, 0);
    var _rtTotAlloc   = _rtData.reduce(function(s,d){ return s+d.allocRem; }, 0);
    var _rtTotAvail   = _rtData.reduce(function(s,d){ return s+d.avail; }, 0);
    var _rtToSoldPct  = Math.round(_rtTotToSold / _rtTotalCap * 100);
    var _rtOtherPct   = Math.round(_rtTotOther  / _rtTotalCap * 100);
    var _rtAllocPct   = Math.round(_rtTotAlloc  / _rtTotalCap * 100);
    var _rtAvailPct   = Math.max(0, 100 - _rtToSoldPct - _rtOtherPct - _rtAllocPct);
    var _rtCapBar = '<div class="wv-cap-bar-wrap">'
      +'<div class="wv-cap-bar">'
      +'<div style="width:'+_rtToSoldPct+'%;background:#006461;height:100%" title="TO Sold"></div>'
      +'<div style="width:'+_rtOtherPct+'%;background:#3b82f6;height:100%" title="Other Sold"></div>'
      +'<div style="width:'+_rtAllocPct+'%;background:#fb923c;opacity:.6;height:100%" title="T Alloc Remaining"></div>'
      +'<div style="width:'+_rtAvailPct+'%;background:#d1fae5;height:100%" title="Available"></div>'
      +'</div>'
      +'<div class="wv-cap-legend">'
      +'<span class="wv-cap-leg-item"><span class="wv-cap-leg-dot" style="background:#006461"></span>TO Sold<b>'+_rtTotToSold+'</b></span>'
      +'<span class="wv-cap-leg-item"><span class="wv-cap-leg-dot" style="background:#3b82f6"></span>Other <b>'+_rtTotOther+'</b></span>'
      +'<span class="wv-cap-leg-item"><span class="wv-cap-leg-dot" style="background:#fb923c"></span>T Alloc Rem. <b>'+_rtTotAlloc+'</b></span>'
      +'<span class="wv-cap-leg-item"><span class="wv-cap-leg-dot" style="background:#16a34a"></span>Avail <b>'+_rtTotAvail+'</b></span>'
      +'</div>'
      +'<div class="wv-cap-total">Capacity: <b>'+_rtTotalCap+' rooms</b></div>'
      +'</div>';
    var _rtTblHdr = '<div class="wv-cap-tbl-hdr">'
      +'<span class="wv-cap-th-type">Room Type</span>'
      +'<span class="wv-cap-th">Cap</span>'
      +'<span class="wv-cap-th" style="color:#006461">TO</span>'
      +'<span class="wv-cap-th" style="color:#3b82f6">Other</span>'
      +'<span class="wv-cap-th" style="color:#fb923c">Alloc↑</span>'
      +'<span class="wv-cap-th" style="color:#16a34a">Avail</span>'
      +'</div>';
    // Room Availability — each room type as collapsible section
    _pb += _pGrpStart('Room Availability'+(_hasAnyFilter?' (Filtered)':''), _C1, 'ra');
    // Capacity summary bar across full width
    _pb += '<div style="padding:6px 12px 4px">'
      +'<div class="pb-bar" style="display:flex;height:8px;border-radius:4px">'
      +'<div style="width:'+_rtToSoldPct+'%;background:#006461;height:100%"></div>'
      +'<div style="width:'+_rtOtherPct+'%;background:#3b82f6;height:100%"></div>'
      +'<div style="width:'+_rtAllocPct+'%;background:#fb923c;opacity:.7;height:100%"></div>'
      +'<div style="width:'+_rtAvailPct+'%;background:#d1fae5;height:100%"></div>'
      +'</div>'
      +'<div style="display:flex;flex-wrap:wrap;gap:4px 8px;padding:4px 0 2px">'
      +'<span style="font-size:9px;color:#4F5B60;display:flex;align-items:center;gap:2px"><span style="width:6px;height:6px;border-radius:1px;background:#006461;flex-shrink:0"></span>TO Sold '+_rtTotToSold+'</span>'
      +'<span style="font-size:9px;color:#4F5B60;display:flex;align-items:center;gap:2px"><span style="width:6px;height:6px;border-radius:1px;background:#3b82f6;flex-shrink:0"></span>Other '+_rtTotOther+'</span>'
      +'<span style="font-size:9px;color:#4F5B60;display:flex;align-items:center;gap:2px"><span style="width:6px;height:6px;border-radius:1px;background:#fb923c;flex-shrink:0"></span>Alloc Rem. '+_rtTotAlloc+'</span>'
      +'<span style="font-size:9px;color:#4F5B60;display:flex;align-items:center;gap:2px"><span style="width:6px;height:6px;border-radius:1px;background:#16a34a;flex-shrink:0"></span>Avail '+_rtTotAvail+'</span>'
      +'</div>'
      +'<div style="font-size:9px;color:#9ca3af">Capacity: '+_rtTotalCap+' rooms</div>'
      +'</div>';
    _rtAll.forEach(function(r, i) {
      var d = _rtData[i];
      var availClr = d.avail === 0 ? '#ef4444' : '#16a34a';
      var tentSold = Math.floor(Math.abs((dm*(i+2)+dd*(i+4))%5));
      var ooo      = Math.floor(Math.abs((dm*(i+1)+dd*(i+3))%3));
      var totalOcc = d.toSold + d.other + tentSold + ooo;
      var tsPct = d.inv > 0 ? Math.round(d.toSold / d.inv * 100) : 0;
      var osPct = d.inv > 0 ? Math.round(d.other / d.inv * 100) : 0;
      var alPct = d.inv > 0 ? Math.round(d.allocRem / d.inv * 100) : 0;
      var avPct = Math.max(0, 100 - tsPct - osPct - alPct);
      var stBarHtml = '<div class="pb-bar" style="display:flex">'
        +'<div style="width:'+tsPct+'%;background:#006461;height:100%"></div>'
        +'<div style="width:'+osPct+'%;background:#3b82f6;height:100%"></div>'
        +'<div style="width:'+alPct+'%;background:#fb923c;opacity:.7;height:100%"></div>'
        +'<div style="width:'+avPct+'%;background:#d1fae5;height:100%"></div>'
        +'</div>';
      var closedBadge = d.avail === 0
        ? ' <span style="font-size:9px;font-weight:700;color:'+CLOSE_OUT_COLORS.full+';background:'+CLOSE_OUT_COLORS.fullBg+';padding:1px 4px;border-radius:3px">CLOSED</span>' : '';
      var valHtml = '<span style="color:'+availClr+';font-size:13px;font-weight:700">'+d.avail+' avail</span>'
        +'<span style="font-size:10px;color:#9ca3af;font-weight:400;margin-left:3px">/ '+d.inv+'</span>';
      var sid = 'ps'+(_sectIdx++);
      _pb += '<div>'
        +'<div class="pb-2col pb-sect-hdr" data-sectid="'+sid+'" style="'+(d.avail===0?'background:#fff8f8;':'')+'">'
        +'<div class="pb-col-l" style="padding-left:0">'
        +'<span class="pb-chev pb-sect-chevron" style="margin-left:19px"></span>'
        +'<span style="font-size:13px;font-weight:500;color:#374151;display:flex;align-items:center;gap:4px">'
        +'<span style="width:8px;height:8px;border-radius:2px;background:'+RT_COLORS[i]+';flex-shrink:0"></span>'
        +r[0]+closedBadge
        +'</span>'
        +'</div>'
        +'<div class="pb-col-r" style="justify-content:flex-start;padding-top:10px;padding-bottom:6px">'
        +valHtml+stBarHtml
        +'</div>'
        +'</div>'
        +'<div class="pb-sect-body" data-sectid="'+sid+'">';
      _pb += _pSub('TO Sold', d.toSold+' RN', '#006461');
      _pb += _pSub('Other Segments', d.other+' RN', '#3b82f6');
      _pb += _pSub('Tentative Sold (Group)', tentSold+' RN', '#8b5cf6');
      _pb += _pSub('Out-of-Order', ooo+' RN', '#ef4444');
      _pb += _pSub('Alloc Rem.', d.allocRem+' RN', '#fb923c');
      _pb += _pSub('Total Hotel Occ.', totalOcc+' RN', '#374151');
      _pb += _pSectE();
    });
    _pb += _pGrpEnd();

    // ── Travel Co. Rates ──
    var _ratesDow = (new Date(2026, dm-1, dd)).getDay();
    var _isEbbDay = _ratesDow < 3; // Sun/Mon/Tue = EBB day
    var _baseSegRate = adr + 8;
    _pb += _pGrpStart('Travel Co. Rates', _C1, 'to');
    toNames.forEach(function(name, i) {
      var origIdx = toNamesAll.indexOf(name);
      if (origIdx < 0) origIdx = i;
      var toRate  = adr - 15 + Math.abs((dm*(origIdx+3) + dd*(origIdx+5)) % 50);
      var toAllot = 5  + Math.abs((dm*(origIdx+2) + dd*(origIdx+3)) % 20);
      var toUsed  = Math.max(0, toAllot - Math.floor(hotel / 20));
      var remRooms = toAllot - toUsed;
      var barPct   = Math.round((toAllot - remRooms) / toAllot * 100);
      var promoTag = _isEbbDay
        ? '<span style="font-size:9px;font-weight:700;padding:1px 4px;border-radius:3px;background:#16a34a;color:#fff;flex-shrink:0">EBB</span>'
        : '<span style="font-size:9px;font-weight:700;padding:1px 4px;border-radius:3px;border:1px solid #2563eb;color:#2563eb;flex-shrink:0">Contract</span>';
      _pb += '<div class="pb-2col pb-sub-row" style="min-height:44px">'
        +'<div class="pb-col-l" style="padding-left:27px;gap:6px">'
        +'<span style="width:9px;height:9px;border-radius:50%;background:'+toColors[i]+';flex-shrink:0"></span>'
        +'<span style="font-size:12px;color:#374151;flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">'+name+'</span>'
        +'<span style="font-size:10px;color:#9ca3af;flex-shrink:0">'+remRooms+'r</span>'
        +promoTag
        +'</div>'
        +'<div class="pb-col-r" style="justify-content:flex-start;padding-top:8px;padding-bottom:4px">'
        +'<span style="font-size:13px;font-weight:700;color:#111827">$'+toRate+'</span>'
        +_pBar(barPct, toColors[i])
        +'</div>'
        +'</div>';
    });
    // Base Rate separator row
    _pb += '<div class="pb-2col" style="min-height:40px;border-top:1px solid #e5e7eb">'
      +'<div class="pb-col-l" style="padding-left:27px;gap:6px">'
      +'<span style="width:9px;height:9px;border-radius:50%;background:#9333ea;flex-shrink:0"></span>'
      +'<span style="font-size:12px;font-weight:700;color:#374151">Base Rate</span>'
      +'</div>'
      +'<div class="pb-col-r" style="justify-content:center">'
      +'<span style="font-size:13px;font-weight:700;color:#9333ea">$'+_baseSegRate+'</span>'
      +'</div>'
      +'</div>';
    _pb += _pGrpEnd();

    var _popupBodyEl = document.getElementById('popupBody');
    _popupBodyEl.innerHTML = _pb;

    // Wire up collapsible group headers
    _popupBodyEl.querySelectorAll('.pb-grp-toggle').forEach(function(hdr) {
      hdr.addEventListener('click', function(e) {
        e.stopPropagation();
        var uid  = this.dataset.grpid;
        var body = _popupBodyEl.querySelector('.pb-grp-body[data-grpid="'+uid+'"]');
        if (!body) return;
        var collapsed = body.style.display === 'none';
        body.style.display = collapsed ? '' : 'none';
        var chev = this.querySelector('.pb-grp-chevron');
        if (chev) chev.classList.toggle('collapsed', !collapsed);
      });
    });
    // Wire up collapsible section headers
    _popupBodyEl.querySelectorAll('.pb-sect-hdr').forEach(function(hdr) {
      hdr.addEventListener('click', function(e) {
        e.stopPropagation();
        var sid  = this.dataset.sectid;
        if (!sid) return;
        var body = _popupBodyEl.querySelector('.pb-sect-body[data-sectid="'+sid+'"]');
        if (!body) return;
        var collapsed = body.style.display === 'none';
        body.style.display = collapsed ? '' : 'none';
        var chev = this.querySelector('.pb-sect-chevron');
        if (chev) chev.classList.toggle('collapsed', !collapsed);
      });
    });

    // ── Position popup ──
    const rect = cell.getBoundingClientRect();
    const popW = 350;
    let left = rect.right + 10;
    let top  = rect.top;
    if (left + popW > window.innerWidth - 12) left = rect.left - popW - 10;
    popup.style.left = left + 'px';
    popup.style.top  = top  + 'px';
    popup.style.maxHeight = (window.innerHeight - top - 20) + 'px';
    popup.classList.remove('tw-hidden');
    popup.classList.add('tw-flex');
  }

  function closePopup() { popup.classList.add('tw-hidden'); popup.classList.remove('tw-flex'); }

  document.getElementById('calMonths').addEventListener('click', e => {
    const cell = e.target.closest('.cal-day:not(.empty)');
    if (!cell) return;
    const m = +cell.dataset.month, d = +cell.dataset.day;
    const isLocked = cell.classList.contains('locked');

    if (bulkSelectMode && isLocked) {
      var bKey = cell.dataset.month + '-' + cell.dataset.day;
      if (bulkSelected.has(bKey)) { bulkSelected.delete(bKey); cell.classList.remove('bulk-sel'); }
      else { bulkSelected.add(bKey); cell.classList.add('bulk-sel'); }
      var cnt = bulkSelected.size;
      document.getElementById('bulkCount').textContent = cnt === 0 ? 'Click closed dates to select' : cnt + ' date' + (cnt > 1 ? 's' : '') + ' selected';
      document.getElementById('bulkReopenBtn').disabled = cnt === 0;
      return;
    }

    // In range-selection mode: locked days skip range selection but fall through to week view
    if (calSelPicking || (calSelStart && !calSelEnd)) {
      if (!isLocked) {
        if (!calSelStart) {
          calSelStart  = { month: m, day: d };
          calSelPicking = true;
        } else {
          calSelEnd    = { month: m, day: d };
          calSelPicking = false;
          // Open Close Out modal pre-populated with the selected range
          (function() {
            var s = calSelStart, en = calSelEnd;
            var startV = s.month * 100 + s.day, endV = en.month * 100 + en.day;
            var lo = startV <= endV ? s : en, hi = startV <= endV ? en : s;
            var pad = function(n){ return String(n).padStart(2,'0'); };
            var fromStr = '2026-' + pad(lo.month) + '-' + pad(lo.day);
            var toStr   = '2026-' + pad(hi.month) + '-' + pad(hi.day);
            if (typeof window._coOpenModal === 'function') window._coOpenModal(fromStr, toStr, 'cal');
          })();
        }
        applyCalSelection();
        e.stopPropagation();
        return;
      }
      // Locked day clicked in range mode → still navigate to week view (fall through)
    }

    // Eye icon → quick-view popup (all days including closed/partial)
    const eye = e.target.closest('.cell-eye');
    if (eye) {
      openPopup(cell, +eye.dataset.month, +eye.dataset.day);
      e.stopPropagation();
      return;
    }

    // Cell click behaviour depends on view mode
    if (calDisplayView >= 6) {
      // 6M / 12M: always open quick-view popup, never week view
      openPopup(cell, m, d);
    } else {
      // 1M / 2M / 3M: open week view (existing behaviour)
      openWeekView(m, d);
    }
    e.stopPropagation();
  });

  // Hover preview during picking
  document.getElementById('calMonths').addEventListener('mouseover', e => {
    if (!calSelPicking) return;
    const cell = e.target.closest('.cal-day:not(.empty)');
    if (!cell) return;
    applyCalSelection(+cell.dataset.month, +cell.dataset.day);
  });

  close.addEventListener('click', closePopup);
  document.addEventListener('click', e => { if (!popup.contains(e.target)) closePopup(); });
  popup.addEventListener('click', e => {
    // "View Week" button — navigate to week view for this day
    if (e.target.closest('.popup-btn-week')) {
      const dateText = document.getElementById('popupDate')?.textContent || '';
      const match = dateText.match(/(\w+), (\w+) (\d+)/);
      if (match) {
        const MMAP = {January:1,February:2,March:3,April:4,May:5,June:6,July:7,August:8,September:9,October:10,November:11,December:12};
        const goMonth = MMAP[match[2]] || 3;
        const goDay   = +match[3];
        closePopup();
        openWeekView(goMonth, goDay);
        setTimeout(function() {
          const wv = document.getElementById('weekView');
          if (!wv) return;
          const rect = wv.getBoundingClientRect();
          const scrollTop = window.pageYOffset + rect.top - 12;
          window.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
        }, 60);
      }
      return; // don't stopPropagation so the document click outside handler also fires (harmless)
    }
    e.stopPropagation();
  });
})();
const DOW_FULL = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const RT_COLORS = ['#ff5900','#547733','#604f35','#3f3e78','#967ef3','#248b86'];
const RT_NAMES  = ['Standard','Superior','Deluxe','Suite','Jr. Suite','Family'];
const SEG_COLORS = ['#3b82f6','#967EF3','#0ea5e9','#10b981','#f59e0b','#ec4899'];

// Color maps for partial closure chips
const TO_COLORS_MAP = {
  'Sunshine Tours':'#3b82f6', 'Global Adv.':'#967EF3',
  'Beach Hols':'#0ea5e9',     'City Breaks':'#10b981', 'Adventure':'#f59e0b',
};
const RT_NAME_COLORS = {
  'Standard':'#ff5900', 'Superior':'#547733', 'Deluxe':'#604f35',
  'Suite':'#3f3e78',    'Jr. Suite':'#967ef3', 'Family':'#248b86',
};

// Build closures section HTML for weekly column
function buildClosuresHtml(dm, dd) {
  const cl = PARTIAL_CLOSURES[dm + '-' + dd];
  if (!cl || !Array.isArray(cl) || cl.length === 0) return '';
  const lockIcon = '<svg viewBox="0 0 10 12" fill="none" stroke="#D32F2F" stroke-width="1.5" width="8" height="10" style="flex-shrink:0"><rect x="1" y="5" width="8" height="7" rx="1"/><path d="M3 5V3.5a2 2 0 0 1 4 0V5"/></svg>';
  const BMAP={ai:'All Inclusive',bb:'Bed & Breakfast',hb:'Half Board',ro:'Room Only',fb:'Full Board'};
  function chip(label, color) {
    return '<span class="wv-cl-chip" style="color:'+color+';background:'+color+'18;border-color:'+color+'3a">'+label+'</span>';
  }
  const rows = cl.map(function(rule, ri) {
    const toChips = rule.tos.length ? rule.tos.map(function(n){ return chip(n, TO_COLORS_MAP[n]||'#dc2626'); }).join('') : chip('All TO','#dc2626');
    const rtChips = rule.roomTypes.length ? rule.roomTypes.map(function(n){ return chip(n, RT_NAME_COLORS[n]||'#b45309'); }).join('') : chip('All Rooms','#b45309');
    const bdChips = rule.boards.length ? rule.boards.map(function(b){ return chip(BMAP[b]||b, BOARD_COLORS[b]||'#7c3aed'); }).join('') : chip('All Plans','#7c3aed');
    return '<div class="wv-cl-row" style="padding:4px 0;border-bottom:1px solid #f3f4f6">'
      +'<span class="wv-cl-cat" style="font-size:9px;color:#9ca3af;min-width:16px">'+(ri+1)+'.</span>'
      +'<div style="display:flex;flex-wrap:wrap;gap:3px">'
      +toChips+rtChips+bdChips
      +'</div></div>';
  });
  return '<div class="wv-closures-wrap">'
    + '<div class="wv-closures-title">'+lockIcon+' Closed Out</div>'
    + rows.join('')
    + '</div>';
}

let wvYear = 2026; let wvMonth = 3; let wvWeekStart = 1; // day of month for week start

// Weekly view range selection
let wvSelStart   = null;  // { month, day }
let wvSelEnd     = null;  // { month, day }
let wvSelPicking = false; // true after first click, awaiting end

// Weekly section collapse state (persists across rebuilds)
const wvCollapsed = { daily: false, detailed: false, meals: false, avail: false, availAlloc: false, toRates: false, promos: false, mealsSummary: true };
// LY comparison mode: 'sdly' | 'final-ly' | 'forecast'
let wvCompMode = 'sdly';
// Active weekly content tab
let wvActiveTab = 'occupancy';
// Weekly group-by: 'combined' | 'roomType' | 'boardType'
let wvGroupBy = 'dailyB';
let wvSegMode = 'combined'; // 'combined' | 'individual'
let wvCompare = new Set();  // multi-select Set of active compares: 'stly' | 'ly' | 'fcst'

function wvCmpDdToggle(e) {
  if (e) e.stopPropagation();
  var menu = document.getElementById('wvCmpDdMenu');
  var btn  = document.getElementById('wvCmpDdBtn');
  if (!menu || !btn) return;
  var opening = !menu.classList.contains('open');
  menu.classList.toggle('open', opening);
  btn.classList.toggle('open', opening);
}
function wvCmpDdToggle2(e) {
  if (e) e.stopPropagation();
  var menu = document.getElementById('wvCmpDdMenu2');
  var btn  = document.getElementById('wvCmpDdBtn2');
  if (!menu || !btn) return;
  var opening = !menu.classList.contains('open');
  menu.classList.toggle('open', opening);
  btn.classList.toggle('open', opening);
}
// Close both dropdowns when clicking outside
document.addEventListener('click', function(e) {
  ['wvCmpDd','wvCmpDd2'].forEach(function(id) {
    var dd = document.getElementById(id);
    if (dd && !dd.contains(e.target)) {
      var sfx = id === 'wvCmpDd' ? '' : '2';
      var m = document.getElementById('wvCmpDdMenu'+sfx), b = document.getElementById('wvCmpDdBtn'+sfx);
      if (m) m.classList.remove('open');
      if (b) b.classList.remove('open');
    }
  });
});
function wvSyncCmpDd() {
  var _names = {stly:'STLY', ly:'LY', fcst:'Fcst'};
  var labelTxt = wvCompare.size === 0
    ? 'Compare'
    : ['stly','ly','fcst'].filter(function(k){ return wvCompare.has(k); }).map(function(k){ return _names[k]; }).join(', ');
  // Sync both dropdown instances
  ['wvCmpDdMenu', 'wvCmpDdMenu2'].forEach(function(menuId) {
    document.querySelectorAll('#'+menuId+' .wv-cmp-dd-item').forEach(function(item) {
      var k = item.dataset.cmp;
      var active = (k === 'none') ? wvCompare.size === 0 : wvCompare.has(k);
      item.classList.toggle('active', active);
      var chk = item.querySelector('.wv-cmp-chk');
      if (chk) chk.checked = active;
    });
  });
  var lbl1 = document.getElementById('wvCmpDdLabel');
  if (lbl1) lbl1.textContent = labelTxt;
  var lbl2 = document.getElementById('wvCmpDdLabel2');
  if (lbl2) lbl2.textContent = labelTxt;
}
function wvSetCompare(val) {
  if (val === 'none') {
    wvCompare.clear();
  } else {
    if (wvCompare.has(val)) wvCompare.delete(val);
    else wvCompare.add(val);
  }
  wvSyncCmpDd();
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
}

// "/ compareVal" inline suffix appended to main value text
function wvCmpValSuffix(stlyStr, lyStr, fcstStr) {
  if (wvCompare.size === 0) return '';
  var parts = [];
  if (wvCompare.has('stly') && stlyStr && stlyStr !== 'null') parts.push(stlyStr);
  if (wvCompare.has('ly')   && lyStr   && lyStr   !== 'null') parts.push(lyStr);
  if (wvCompare.has('fcst') && fcstStr && fcstStr !== 'null') parts.push(fcstStr);
  return parts.map(function(s){ return '<span class="wv-cmp-sep"> / </span><span class="wv-cmp-val-txt">' + s + '</span>'; }).join('');
}

// Multi-compare inline suffix — shows "/ STLY:val / LY:val" etc. for all active
function _wvMultiCmpSfx(curr, stlyVal, lyVal, fcstVal, fmtFn) {
  if (wvCompare.size === 0) return '';
  var _ORDER = [['stly','STLY',stlyVal],['ly','LY',lyVal],['fcst','Fc',fcstVal]];
  return _ORDER.filter(function(t){ return wvCompare.has(t[0]) && t[2] != null; }).map(function(t) {
    var s = fmtFn(t[2]);
    var cls = 'wv-cmp-neutral';
    var c = parseFloat(curr), p = parseFloat(t[2]);
    if (!isNaN(c) && !isNaN(p)) { if (c > p) cls = 'wv-cmp-up'; else if (c < p) cls = 'wv-cmp-dn'; }
    return '<span class="wv-cmp-sep"> / </span><span class="wv-cmp-val-txt '+cls+'">'+t[1]+':'+s+'</span>';
  }).join('');
}

// Multi-compare trend badges
function _wvMultiTrendBadge(curr, stlyVal, lyVal, fcstVal) {
  if (wvCompare.size === 0) return '';
  var _ORDER = [['stly','STLY',stlyVal],['ly','LY',lyVal],['fcst','Fc',fcstVal]];
  return _ORDER.filter(function(t){ return wvCompare.has(t[0]) && t[2]!=null && !isNaN(curr) && !isNaN(t[2]) && t[2]!==0; }).map(function(t) {
    var diff = curr - t[2], pct = Math.round(Math.abs(diff)/Math.abs(t[2])*100);
    var cls = diff>0?'cell-cmp-up':diff<0?'cell-cmp-dn':'';
    var arrow = diff>0?'arrow_upward':diff<0?'arrow_downward':'';
    var arrowHtml = arrow ? '<span class="material-icons" style="font-size:12px">'+arrow+'</span>' : '';
    return '<span class="cell-cmp '+cls+'" style="margin-left:3px">'+arrowHtml+pct+'% vs '+t[1]+'</span>';
  }).join('');
}

// Right-side header block: "mainVal / cmpVal" (no chip)
function wvHdrRight(mainVal, stlyStr, lyStr, fcstStr) {
  const valSuffix = wvCmpValSuffix(stlyStr, lyStr, fcstStr);
  return '<div class="wv-hdr-right">'
    + '<span class="wv-occ-total">' + mainVal + valSuffix + '</span>'
    + '</div>';
}
// Tracks which TO detail panels are open (key: 'tos_ri_bi' for BT, 'rtos_ri' for RT)
const wvTosOpen = {};

// Re-open a range of days (removes from LOCKED_DAYS)
function reopenRange(start, end) {
  const startV = start.month * 100 + start.day;
  const endV   = end.month * 100 + end.day;
  const loD = startV <= endV ? start : end;
  const hiD = startV <= endV ? end   : start;
  let cur = new Date(2026, loD.month - 1, loD.day);
  const endDate = new Date(2026, hiD.month - 1, hiD.day);
  while (cur <= endDate) {
    LOCKED_DAYS.delete(`${cur.getMonth()+1}-${cur.getDate()}`);
    cur.setDate(cur.getDate() + 1);
  }
  renderCalendar();
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
}

function clearWvSelection() {
  wvSelStart = null; wvSelEnd = null; wvSelPicking = false;
  // Reset Close button appearance
  const closeBtn = document.getElementById('wvCloseOutBtn');
  if (closeBtn) { closeBtn.style.background = ''; closeBtn.style.color = ''; closeBtn.style.boxShadow = ''; }
  const right = document.querySelector('.wv-topbar-right');
  if (right) right.classList.remove('range-mode');
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
}

function getWeekDays(year, month, startDay) {
  // Returns array of 7 {month, day} objects starting from startDay
  const days = [];
  const dim = [0,31,28,31,30,31,30,31,31,30,31,30,31];
  let m = month, d = startDay;
  for (let i = 0; i < 7; i++) {
    days.push({ year, month: m, day: d });
    d++;
    if (d > dim[m]) { d = 1; m++; if (m > 12) m = 1; }
  }
  return days;
}

function renderWeekView(month, day) {
  const weekStartDay = day;
  wvMonth = month;
  wvWeekStart = weekStartDay;

  // Sync calendar filters → weekly so selections persist across views
  syncFiltersCalToWv();
  applyFilterUI('wvFiltersDropdown');
  _syncPickupBtnUI('wv');

  const calSection = document.getElementById('demand-calendar');
  const wvSection  = document.getElementById('weekView');
  if (calSection) calSection.style.display = 'none';
  if (wvSection)  wvSection.classList.add('visible');
  var backArrow = document.getElementById('wvBack');
  if (backArrow) backArrow.style.display = 'inline-flex';
  var hdrCtr = document.getElementById('wvHeaderCenter');
  if (hdrCtr) hdrCtr.style.display = 'flex';
  var moBar = document.getElementById('moGroupbyBar');
  if (moBar) moBar.style.display = 'none';

  buildWeekGrid(month, weekStartDay, day);
}

function openWeekView(month, day) { renderWeekView(month, day); _updateAccBtnState(); }

/* ── Metrics selector state ── */
const wvMetricState = {
  capacity: true, adr: true, revenue: true, onlineOffline: true, roomTypes: true,
  avail: true, availAlloc: true, toRates: true,
  dm_rnSold: true, dm_pickup: true, dm_pickup_0: true, dm_pickup_1: true, dm_pickup_2: true,
  dm_avgAdults: true, dm_avgChildren: true, dm_totalAdults: true, dm_totalChildren: true, dm_trevpar: true,
  dm_availRooms: true, dm_availGuar: true,
  dm_avgLos: true, dm_avgLeadTime: true, dm_totalGuests: true,
  bizMix: true, mealsSummary: true,
  cmp_sdly: true, cmp_final_ly: true, cmp_forecast: true, cmp_hotel: true,
  dm_closeouts: true, dm_co_rooms: true, dm_co_boards: true, dm_co_tos: true,
};

function wvAcc(title, section, bodyHtml, badge) {
  const collapsed = wvCollapsed[section];
  // SVG chevrons — up (open) / down (closed) — Figma expand_less / expand_more style
  const chevUp   = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  const chevDown = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  return '<div class="wv-acc-sect' + (collapsed ? '' : ' wv-acc-open') + '">'
    + '<div class="wv-acc-hdr" data-section="' + section + '">'
    + '<span class="wv-acc-chev">' + (collapsed ? chevDown : chevUp) + '</span>'
    + '<span class="wv-acc-title">' + title + '</span>'
    + (badge ? '<span class="wv-acc-badge">' + badge + '</span>' : '')
    + '</div>'
    + '<div class="wv-acc-body' + (collapsed ? ' wv-body-hidden' : '') + '">'
    + bodyHtml
    + '</div>'
    + '</div>';
}

/* ── Close-out metadata helpers ─────────────────────────────────────────── */
function coFmtDate(iso) {
  if (!iso) return '';
  var d = new Date(iso);
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var h = d.getHours(), m = d.getMinutes();
  return d.getDate() + ' ' + MONTHS[d.getMonth()] + ', ' + (h < 10 ? '0'+h : h) + ':' + (m < 10 ? '0'+m : m);
}
function coInitials(name) {
  return (name || '').split(' ').map(function(p){ return p[0]||''; }).join('').toUpperCase().slice(0,2);
}
function coMetaHtml(appliedBy, appliedAt, extraStyle) {
  if (!appliedBy) return '';
  var ini = coInitials(appliedBy);
  var dt  = coFmtDate(appliedAt);
  return '<div class="co-rule-meta" style="'+(extraStyle||'')+'">'
    + '<span class="co-meta-avatar">'+ini+'</span>'
    + '<span class="co-meta-text"><strong>'+appliedBy+'</strong>'+(dt ? ' · '+dt : '')+'</span>'
    + '</div>';
}

/* ── Close-out "+N more" toggle ──────────────────────────────────────────── */
window.coToggleMore = function(uid) {
  var moreSpan = document.getElementById('coh_' + uid);
  var plusSpan = document.querySelector('[onclick="coToggleMore(\'' + uid + '\')"]');
  if (!moreSpan || !plusSpan) return;
  var isHidden = moreSpan.style.display === 'none';
  moreSpan.style.display = isHidden ? 'inline' : 'none';
  plusSpan.textContent = isHidden ? '− less' : '+' + plusSpan.dataset.n + ' more';
};

/* ── Room Type → Meal Plan nested accordion renderer ─────────────────────
   For each room type, shows all board types as sub-accordions.
   Each board type shows the full combined metric set, scaled to that segment.
*/
function buildRoomTypeBoardView(dm, dd, hotel, to, adr, rev, v) {
  const isFullyLocked = LOCKED_DAYS.has(dm + '-' + dd);
  const rules = PARTIAL_CLOSURES[dm + '-' + dd] || [];
  const lockSvg = '<svg viewBox="0 0 10 12" fill="none" stroke="currentColor" stroke-width="1.6" width="11" height="13"><rect x="1" y="5" width="8" height="7" rx="1"/><path d="M3 5V3.5a2 2 0 0 1 4 0V5"/></svg>';
  const noCloseSvg = '<svg viewBox="0 0 14 14" fill="none" stroke="#15803d" stroke-width="1.6" width="12" height="12"><path d="M2 7l4 4 6-6"/></svg>';
  const BMAP = {ai:'All Inclusive',bb:'Bed & Breakfast',hb:'Half Board',ro:'Room Only',fb:'Full Board'};

  if (isFullyLocked) {
    var _lm = LOCKED_DAYS_META[dm + '-' + dd] || {};
    return '<div class="wv-closeouts-wrap">'
      + '<div class="co-full-banner">'+lockSvg+' Full Day Close Out — All inventory closed'
      + coMetaHtml(_lm.appliedBy, _lm.appliedAt, 'margin-top:6px;opacity:.85')
      + '</div>'
      + '</div>';
  }

  if (rules.length === 0) {
    return '<div class="wv-closeouts-wrap">'
      + '<div class="co-section-title">Close Outs</div>'
      + '<div class="co-all-open">'+noCloseSvg+' No close outs — all channels open</div>'
      + '</div>';
  }

  // ── Dimension chip helpers ────────────────────────────────────────────
  function chip(label, clr, bg) {
    return '<span class="co-chip" style="background:'+(bg||clr+'18')+';color:'+clr+';border-color:'+clr+'55">'+label+'</span>';
  }
  function toChip(name) { return chip(name, TO_COLORS_MAP[name]||'#dc2626'); }
  function rtChip(name) { return chip(name, RT_NAME_COLORS[name]||'#b45309'); }
  function bdChip(b)    { return chip(BMAP[b]||b, '#7c3aed'); }
  function allChip(label) { return chip(label, '#6b7280', '#f3f4f6'); }

  var _coUidSeq = 0;
  function chipsMore(items, chipFn, max) {
    if (items.length <= max) return items.map(chipFn).join('');
    var uid = 'cob_' + dm + dd + '_' + (++_coUidSeq);
    var shown  = items.slice(0, max).map(chipFn).join('');
    var hidden = items.slice(max).map(chipFn).join('');
    return shown
      + '<span id="coh_' + uid + '" style="display:none">' + hidden + '</span>'
      + '<span class="co-more-pill" onclick="coToggleMore(\'' + uid + '\')" data-n="' + (items.length - max) + '">+' + (items.length - max) + ' more</span>';
  }

  const ruleCards = rules.map(function(rule, ri) {
    const hasTO = rule.tos.length > 0;
    const hasRT = rule.roomTypes.length > 0;
    const hasBD = rule.boards.length > 0;

    const toPart = hasTO
      ? chipsMore(rule.tos, toChip, 2)
      : allChip('All Operators');
    const rtPart = hasRT
      ? chipsMore(rule.roomTypes, rtChip, 2)
      : allChip('All Room Types');
    const bdPart = hasBD
      ? chipsMore(rule.boards, bdChip, 2)
      : allChip('All Meal Plans');

    return '<div class="co-rule-card">'
      + '<div class="co-rule-num">'+lockSvg+' Strategy ' + (ri+1) + coMetaHtml(rule.appliedBy, rule.appliedAt, 'margin-left:auto') + '</div>'
      + '<div class="co-rule-row">'
      + '<div class="co-rule-dim"><span class="co-rule-dim-lbl">Operator</span><div class="co-chips co-chips-inline">'+toPart+'</div></div>'
      + '<div class="co-rule-sep">+</div>'
      + '<div class="co-rule-dim"><span class="co-rule-dim-lbl">Room Type</span><div class="co-chips co-chips-inline">'+rtPart+'</div></div>'
      + '<div class="co-rule-sep">+</div>'
      + '<div class="co-rule-dim"><span class="co-rule-dim-lbl">Meal Plan</span><div class="co-chips co-chips-inline">'+bdPart+'</div></div>'
      + '</div></div>';
  }).join('');

  return '<div class="wv-closeouts-wrap">'
    + '<div class="co-section-title">Close Outs</div>'
    + ruleCards
    + '</div>';
}


// ── Close Out Report View — grouped-by-day card layout ───────────────────────
function buildCoReportView(days) {
  var BMAP    = {ai:'All Inclusive',bb:'Bed & Breakfast',hb:'Half Board',ro:'Room Only',fb:'Full Board'};
  var DOW2    = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MNAMES2 = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var TODAY_R = new Date(2026, 2, 9);

  var lockSvg  = '<svg viewBox="0 0 10 12" fill="none" stroke="currentColor" stroke-width="1.6" width="10" height="12"><rect x="1" y="5" width="8" height="7" rx="1"/><path d="M3 5V3.5a2 2 0 0 1 4 0V5"/></svg>';
  var checkSvg = '<svg viewBox="0 0 14 14" fill="none" stroke="#15803d" stroke-width="2" width="11" height="11"><path d="M2 7l4 4 6-6"/></svg>';

  // ── Chip helpers ─────────────────────────────────────────────────────────────
  function chip(label, clr, bg) {
    return '<span class="co-rpt-chip" style="background:'+(bg||clr+'18')+';color:'+clr+';border-color:'+clr+'44">'+label+'</span>';
  }
  function allDimChip(label) { return chip(label, '#6b7280', '#f3f4f6'); }

  function chipsMore(items, mapFn, max, uid) {
    if (items.length <= max) return items.map(mapFn).join('');
    var shown  = items.slice(0, max).map(mapFn).join('');
    var hidden = items.slice(max).map(mapFn).join('');
    return shown
      + '<span id="coh_'+uid+'" style="display:none">'+hidden+'</span>'
      + '<span class="co-more-pill" onclick="coToggleMore(\''+uid+'\')" data-n="'+(items.length-max)+'">+'+(items.length-max)+' more</span>';
  }

  // ── Day cards ─────────────────────────────────────────────────────────────────
  var cardsHtml = days.map(function(dv) {
    var dm = dv.month, day = dv.day, key = dm+'-'+day;
    var isFullyLocked = LOCKED_DAYS.has(key);
    var rules = PARTIAL_CLOSURES[key] || [];
    var dt  = new Date(2026, dm-1, day);
    var dow = DOW2[dt.getDay()];
    var dba = Math.round((dt - TODAY_R) / 86400000);
    var isToday = dba === 0;
    var evts = (typeof CAL_EVENTS !== 'undefined' && CAL_EVENTS[key]) ? CAL_EVENTS[key] : null;

    var stateClass = isFullyLocked ? 'co-rpt-day--locked' : rules.length > 0 ? 'co-rpt-day--partial' : 'co-rpt-day--open';
    var todayClass = isToday ? ' co-rpt-day--today' : '';

    // ── Day header ──────────────────────────────────────────────────────────
    var dbaLabel = dba === 0 ? 'Today' : dba > 0 ? dba+'d DBA' : '';
    var evtDot   = evts ? '<span class="co-rpt-evt-dot" title="'+evts.map(function(e){return e.name;}).join(', ')+'"></span>' : '';
    var badge = isFullyLocked
      ? '<span class="co-rpt-badge co-rpt-badge--locked">'+lockSvg+' Full Day Closed</span>'
      : rules.length > 0
        ? '<span class="co-rpt-badge co-rpt-badge--partial">'+rules.length+' rule'+(rules.length>1?'s':'')+'</span>'
        : '<span class="co-rpt-badge co-rpt-badge--open">'+checkSvg+' Open</span>';

    var hdr = '<div class="co-rpt-day-hdr">'
      + '<div class="co-rpt-day-date">'+MNAMES2[dm]+' '+day+'</div>'
      + '<div class="co-rpt-day-sub">'+dow+(dbaLabel ? ' <span class="co-rpt-dba">· '+dbaLabel+'</span>' : '')+evtDot+'</div>'
      + badge
      + '</div>';

    // ── Day body ─────────────────────────────────────────────────────────────
    var body;
    if (isFullyLocked) {
      var lm = LOCKED_DAYS_META[key] || {};
      body = '<div class="co-rpt-full-lock">'
        + lockSvg + ' All inventory closed for this date'
        + (lm.appliedBy ? coMetaHtml(lm.appliedBy, lm.appliedAt, 'margin-top:5px') : '')
        + '</div>';
    } else if (rules.length === 0) {
      body = '<div class="co-rpt-all-open">'+checkSvg+' No restrictions — all channels open</div>';
    } else {
      // Column-label header (shown once per card, above the strategy rows)
      body = '<div class="co-rpt-col-hdr">'
        + '<div class="co-rpt-col-hdr-num"></div>'
        + '<div class="co-rpt-col-hdr-dim">Operator</div>'
        + '<div class="co-rpt-col-hdr-sep"></div>'
        + '<div class="co-rpt-col-hdr-dim">Room Type</div>'
        + '<div class="co-rpt-col-hdr-sep"></div>'
        + '<div class="co-rpt-col-hdr-dim">Meal Plan</div>'
        + '<div class="co-rpt-col-hdr-meta">Applied by</div>'
        + '</div>';

      body += rules.map(function(rule, ri) {
        var uid = 'rpt_'+dm+'_'+day+'_'+ri;
        var toFn = function(n) { return chip(n, TO_COLORS_MAP[n]||'#dc2626'); };
        var rtFn = function(n) { return chip(n, RT_NAME_COLORS[n]||'#b45309'); };
        var bdFn = function(b) { return chip(BMAP[b]||b, '#7c3aed'); };

        var toPart = rule.tos.length        ? chipsMore(rule.tos,        toFn, 2, uid+'_to') : allDimChip('All Operators');
        var rtPart = rule.roomTypes.length  ? chipsMore(rule.roomTypes,  rtFn, 2, uid+'_rt') : allDimChip('All Room Types');
        var bdPart = rule.boards.length     ? chipsMore(rule.boards,     bdFn, 2, uid+'_bd') : allDimChip('All Meal Plans');

        var metaPart = rule.appliedBy
          ? '<div class="co-rule-meta">'
            + '<span class="co-meta-avatar" style="width:16px;height:16px;font-size:7.5px">'+coInitials(rule.appliedBy)+'</span>'
            + '<span class="co-meta-text"><strong>'+rule.appliedBy+'</strong>'+(rule.appliedAt ? '<br><span style="font-weight:400">'+coFmtDate(rule.appliedAt)+'</span>' : '')+'</span>'
            + '</div>'
          : '';

        var STRAT_COLORS = ['#dc2626','#b45309','#7c3aed','#0891b2','#16a34a'];
        var sClr = STRAT_COLORS[ri % STRAT_COLORS.length];

        return '<div class="co-rpt-strat-row">'
          + '<div class="co-rpt-strat-num" style="background:'+sClr+'18;color:'+sClr+';border-color:'+sClr+'33">'+(ri+1)+'</div>'
          + '<div class="co-rpt-strat-dim"><div class="co-rpt-chips">'+toPart+'</div></div>'
          + '<div class="co-rpt-strat-sep">+</div>'
          + '<div class="co-rpt-strat-dim"><div class="co-rpt-chips">'+rtPart+'</div></div>'
          + '<div class="co-rpt-strat-sep">+</div>'
          + '<div class="co-rpt-strat-dim"><div class="co-rpt-chips">'+bdPart+'</div></div>'
          + '<div class="co-rpt-strat-meta">'+metaPart+'</div>'
          + '</div>';
      }).join('');
    }

    return '<div class="co-rpt-day-card '+stateClass+todayClass+'">'
      + hdr
      + '<div class="co-rpt-day-body">'+body+'</div>'
      + '</div>';
  }).join('');

  return '<div class="co-rpt-list">'+cardsHtml+'</div>';
}


// ── Close-Out Heat Map by Room Type ──────────────────────────────────────────
function buildCoHeatmap(days) {
  var RT = ['Standard','Superior','Deluxe','Suite','Jr. Suite','Family'];
  var DOW_S = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MNAMES_S = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var lockSvg = '<svg viewBox="0 0 10 12" fill="none" stroke="currentColor" stroke-width="1.4" width="9" height="11"><rect x="1" y="5" width="8" height="7" rx="1"/><path d="M3 5V3.5a2 2 0 0 1 4 0V5"/></svg>';

  // For each day+room type, determine close-out status:
  // 'full' = full day locked, 'closed' = room type specifically closed, 'partial' = day has closures but not this RT, 'open' = no closures
  function getStatus(dm, dd, rt) {
    var key = dm + '-' + dd;
    if (LOCKED_DAYS.has(key)) return 'full';
    var rules = PARTIAL_CLOSURES[key] || [];
    if (rules.length === 0) return 'open';
    // Check if any rule targets this room type (or all room types)
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.roomTypes.length === 0) return 'closed'; // applies to all room types
      if (r.roomTypes.indexOf(rt) >= 0) return 'closed';
    }
    return 'partial'; // day has closures but not for this room type
  }

  var cellClasses = { full:'co-hm-full', closed:'co-hm-closed', partial:'co-hm-partial', open:'co-hm-open' };
  var cellTitles  = { full:'Full day closed', closed:'Closed out', partial:'Other closures (open for this type)', open:'Open' };

  // Build header row (days)
  var hdrCells = '<div class="co-hm-corner">Room Type</div>' + days.map(function(dv) {
    var dt = new Date(2026, dv.month - 1, dv.day);
    var isToday = dv.month === 3 && dv.day === 9;
    return '<div class="co-hm-hdr' + (isToday ? ' co-hm-today' : '') + '">'
      + '<span class="co-hm-dow">' + DOW_S[dt.getDay()] + '</span>'
      + '<span class="co-hm-date">' + MNAMES_S[dv.month] + ' ' + dv.day + '</span>'
      + '</div>';
  }).join('');

  // Build rows (one per room type)
  var bodyRows = RT.map(function(rt) {
    var rtClr = RT_NAME_COLORS[rt] || '#6b7280';
    var cells = days.map(function(dv) {
      var status = getStatus(dv.month, dv.day, rt);
      var icon = status === 'full' || status === 'closed' ? lockSvg : '';
      return '<div class="co-hm-cell ' + cellClasses[status] + '" title="' + rt + ' — ' + MNAMES_S[dv.month] + ' ' + dv.day + ': ' + cellTitles[status] + '">'
        + icon
        + '</div>';
    }).join('');
    return '<div class="co-hm-row">'
      + '<div class="co-hm-label"><span class="co-hm-dot" style="background:' + rtClr + '"></span>' + rt + '</div>'
      + cells
      + '</div>';
  }).join('');

  // Legend
  var legend = '<div class="co-hm-legend">'
    + '<span class="co-hm-leg"><span class="co-hm-leg-sw co-hm-full"></span>Full Close Out</span>'
    + '<span class="co-hm-leg"><span class="co-hm-leg-sw co-hm-closed"></span>Room Type Closed</span>'
    + '<span class="co-hm-leg"><span class="co-hm-leg-sw co-hm-partial"></span>Other Closures</span>'
    + '<span class="co-hm-leg"><span class="co-hm-leg-sw co-hm-open"></span>Open</span>'
    + '</div>';

  return '<div class="co-hm-wrap">'
    + '<div class="co-hm-title">' + lockSvg + ' Close Out Heat Map — Room Types</div>'
    + '<div class="co-hm-grid" style="grid-template-columns:140px repeat(' + days.length + ',1fr)">'
    + hdrCells + bodyRows
    + '</div>'
    + legend
    + '</div>';
}

// ── Monthly view day close-out checkboxes ────────────────────────────────────
var _moSelectedDays = new Set(); // ISO date strings selected for close-out in monthly view
var _moSelectMode   = false;     // true when "Select Dates" mode is active

function moExitSelectMode() {
  if (!_moSelectMode) return;
  _moSelectMode = false;
  var btn       = document.getElementById('moSelectDatesBtn');
  var lbl       = document.getElementById('moSelectDatesLabel');
  var container = document.getElementById('calMonths') || document.querySelector('.cal-months-grid') || document.querySelector('.wv-months-wrap');
  if (btn) btn.classList.remove('active');
  if (lbl) lbl.textContent = 'Select Dates';
  if (container) container.classList.remove('mo-select-active');
  _moSelectedDays.clear();
  document.querySelectorAll('.mo-day-chk').forEach(function(c){ c.checked = false; });
  _updateMoFooter();
  _syncCloseOutBtn();
}
window.moExitSelectMode = moExitSelectMode;

window.moToggleSelectMode = function() {
  if (_moSelectMode) {
    moExitSelectMode();
    return;
  }
  _moSelectMode = true;
  var btn       = document.getElementById('moSelectDatesBtn');
  var lbl       = document.getElementById('moSelectDatesLabel');
  var container = document.getElementById('calMonths') || document.querySelector('.cal-months-grid') || document.querySelector('.wv-months-wrap');
  if (btn) btn.classList.add('active');
  if (lbl) lbl.textContent = 'Cancel';
  if (container) container.classList.add('mo-select-active');
};

function _updateMoFooter() {
  var footer = document.getElementById('moSelFooter');
  if (!footer) return;
  var count = _moSelectedDays.size;
  if (_moSelectMode && count > 0) {
    footer.classList.add('visible');
    var countEl = document.getElementById('moSelCount');
    if (countEl) countEl.textContent = count + ' date' + (count !== 1 ? 's' : '') + ' selected';
  } else {
    footer.classList.remove('visible');
  }
}

window.moDayCheck = function(dateStr, cb) {
  if (cb.checked) _moSelectedDays.add(dateStr);
  else _moSelectedDays.delete(dateStr);
  _updateMoFooter();
  _syncCloseOutBtn();
};

window.moOpenCloseOut = function() {
  var dates = Array.from(_moSelectedDays).sort();
  if (!dates.length) return;
  if (typeof window._coOpenModalDays === 'function') {
    window._coOpenModalDays(dates, 'cal');
  } else if (typeof window._coOpenModal === 'function') {
    window._coOpenModal(dates[0], dates[dates.length - 1], 'cal');
  }
};

// Smart single button: pre-fill dates if cells selected, else open empty
window.moSmartClose = function() {
  var dates = Array.from(_moSelectedDays).sort();
  if (dates.length) {
    if (typeof window._coOpenModalDays === 'function') window._coOpenModalDays(dates, 'cal');
    else if (typeof window._coOpenModal === 'function') window._coOpenModal(dates[0], dates[dates.length - 1], 'cal');
  } else {
    if (typeof window._coOpenModal === 'function') window._coOpenModal('', '', 'cal');
  }
};

window.wvSmartClose = function() {
  var wvDates = Array.from(_wvSelectedDays).sort();
  var wbDates = Array.from(_wbSelectedDays).sort();
  var dates = wvDates.concat(wbDates).filter(function(v,i,a){ return a.indexOf(v)===i; }).sort();
  if (dates.length) {
    if (typeof window._coOpenModalDays === 'function') window._coOpenModalDays(dates, 'wv');
    else if (typeof window._coOpenModal === 'function') window._coOpenModal(dates[0], dates[dates.length - 1], 'wv');
  } else {
    if (typeof window._coOpenModal === 'function') window._coOpenModal('', '', 'wv');
  }
};

// ── Weekly view day close-out checkboxes ─────────────────────────────────────
var _wvSelectedDays = new Set(); // ISO date strings selected for close-out in weekly view

window.wvDayCheck = function(dateStr, cb) {
  if (cb.checked) _wvSelectedDays.add(dateStr);
  else _wvSelectedDays.delete(dateStr);
  _syncCloseOutBtn();
};

window.wvOpenCloseOut = function() {
  var dates = Array.from(_wvSelectedDays).sort();
  if (!dates.length) return;
  if (typeof window._coOpenModalDays === 'function') {
    window._coOpenModalDays(dates, 'wv');
  } else if (typeof window._coOpenModal === 'function') {
    window._coOpenModal(dates[0], dates[dates.length - 1], 'wv');
  }
};

// Keep Close/Re-Open button always visible (opens modal with or without selected dates)
function _syncCloseOutBtn() {
  var btn = document.getElementById('moCloseOutBtn');
  if (!btn) return;
  btn.style.display = '';
}

// ── Daily B View ─────────────────────────────────────────────────────────────
var _wbCollapsed    = {};   // shared collapse state (used by both HTML fallback and AG Grid)
var _wbAllIds       = [];   // all toggleable row IDs in Daily B (populated on each render)
var _wbSelectedDays = new Set(); // ISO date strings selected for close-out in Daily B
var _wbGroupOrder   = null; // null = default; array of group keys for custom Daily B order

var WB_GROUPS_DEF = [
  { key: 'g_closeouts', lbl: 'Close Outs',      clr: '#D32F2F' },
  { key: 'g_daily',   lbl: 'Daily Metrics',    clr: '#006461' },
  { key: 'g_more',    lbl: 'More Metrics',     clr: '#2e65e8' },
  { key: 'g_meals',   lbl: 'Meal Plans',       clr: '#f59e0b' },
  { key: 'g_biz',     lbl: 'Business Mix',     clr: '#7c3aed' },
  { key: 'g_avail',   lbl: 'Room Availability',clr: '#0891b2' },
  { key: 'g_torates', lbl: 'Travel Co. Rates', clr: '#0f766e' },
];
var _dailyBGridApi = null;
var _dbAllRows     = [];
var _dbGrpRenderrs = [];

function _getDBVisibleRows() {
  return _dbAllRows.filter(function(r) {
    if (r.type === 'grp') return true;
    if (_wbCollapsed[r.grpKey]) return false;
    if (r.type === 'sect') return true;
    if (_wbCollapsed[r.sectKey]) return false;
    return true;
  }).map(function(r) {
    return { _type:r.type, _lbl:r.lbl, _clr:r.clr||'#374151',
             _dot:r.dot||null, _isRem:r.isRem||false,
             _grpKey:r.grpKey||null, _sectKey:r.sectKey||null, _fn:r.fn||null,
             _noChev:r.noChev||false };
  });
}
function _toggleDBGrp(grpKey) {
  _wbCollapsed[grpKey] = !_wbCollapsed[grpKey];
  _dbGrpRenderrs.forEach(function(gr){ if (gr._grpKey===grpKey) gr._syncChev(); });
  if (_dailyBGridApi) _dailyBGridApi.setGridOption('rowData', _getDBVisibleRows());
}
function _toggleDBSect(sectKey) {
  _wbCollapsed[sectKey] = !_wbCollapsed[sectKey];
  if (_dailyBGridApi) _dailyBGridApi.setGridOption('rowData', _getDBVisibleRows());
}

function wbToggle(id) {
  _wbCollapsed[id] = !_wbCollapsed[id];
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
}
function wbSetAll(collapse) {
  // Set ALL tracked IDs and any keys already in the collapse map
  _wbAllIds.forEach(function(id) { _wbCollapsed[id] = collapse; });
  for (var k in _wbCollapsed) {
    if (_wbCollapsed.hasOwnProperty(k)) _wbCollapsed[k] = collapse;
  }
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
}

// ── Daily B day close-out selection ────────────────────────────────────────
window.wbDayToggle = function(dateStr) {
  if (_wbSelectedDays.has(dateStr)) {
    _wbSelectedDays.delete(dateStr);
  } else {
    _wbSelectedDays.add(dateStr);
  }
  // Update just this header cell's selected class (no full rebuild)
  var cell = document.querySelector('.wb-hdr-cell[data-wb-date="' + dateStr + '"]');
  if (cell) cell.classList.toggle('wb-hdr-selected', _wbSelectedDays.has(dateStr));
  _syncCloseOutBtn();
};

window.wbOpenCloseOut = function() {
  var dates = Array.from(_wbSelectedDays).sort();
  if (!dates.length) return;
  if (typeof window._coOpenModalDays === 'function') {
    window._coOpenModalDays(dates, 'wv');
  } else if (typeof window._coOpenModal === 'function') {
    window._coOpenModal(dates[0], dates[dates.length - 1], 'wv');
  }
};

function buildDailyBView(days, month, activeDay) {
  var DOW_SHORT  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var WV_CAP     = 250;
  var RT_NAMES   = ['Standard','Superior','Deluxe','Suite','Jr. Suite','Family'];
  var RT_CAPS    = [51,36,27,12,15,9];
  var TO_NAMES   = ['Sunshine Tours','Global Adv.','Beach Hols','City Breaks','Adventure'];
  var TO_COLORS  = ['#3b82f6','#967EF3','#0ea5e9','#10b981','#f59e0b'];

  // ── Per-day values ────────────────────────────────────────────────────────
  var dd7 = days.map(function(dv) {
    var dm = dv.month, dd = dv.day;
    var hh = getOccupancy(dm, dd); var hotel = hh.hotel, to = hh.to;
    var adr   = 150 + Math.abs((dm*47+dd*31)%130);
    var v     = Math.abs((dm*127+dd*53+dm*dd*7+dd*dd*3))%100;
    var toAdr = Math.max(80, adr - 20 - Math.abs((dm*3+dd*7)%15));
    var toRn  = Math.round(WV_CAP * to / 100);
    var hnRn  = Math.round(WV_CAP * hotel / 100);
    var toRev = Math.floor(toRn * toAdr);
    var hnRev = Math.floor(hnRn * adr);
    var otherPct = Math.max(0, hotel - to);
    var otherRms = Math.round(WV_CAP * otherPct / 100);
    var freeRms  = WV_CAP - toRn - otherRms;
    var onlinePct = Math.max(30, Math.min(80, 45 + Math.abs((dm*13+dd*7)%35)));
    var adrBar = Math.min(90, Math.round(toAdr / 280 * 100));
    var revBar = Math.min(90, Math.round(toRev / 4500000 * 100));
    var sdlyH  = Math.max(5, hotel - 9), lyH = Math.max(5, hotel - 6), fcstH = Math.min(100, hotel + 4);
    var sdlyA  = adr - 8, lyA = adr - 4, fcstA = adr + 6;
    var sdlyRn = Math.round(toRn * 0.88), lyRn = Math.round(toRn * 0.93), fcstRn = Math.round(toRn * 1.06);
    var sdlyR  = Math.floor(Math.round(WV_CAP * sdlyH / 100) * sdlyA);
    var lyR    = Math.floor(hnRev * 0.95), fcstR = Math.floor(hnRev * 1.06);
    var revpar = Math.max(50, (adr+80) - 30 - Math.abs((dm*5+dd*3)%20));
    var hRevpar = Math.round(adr * hotel / 100);
    var toRevpar = Math.round(toAdr * to / 100);
    var sdlyRevpar = Math.max(40, revpar - 8), lyRevpar = Math.max(40, revpar - 4);
    var pickup = Math.max(0, Math.floor((v%25+5)*to/Math.max(1,hotel)));
    var hPickup = Math.floor(v%25+5);
    var avgA  = (1.8+v%3*0.1).toFixed(1), avgC = (0.3+v%2*0.1).toFixed(1);
    var hAvgA = (parseFloat(avgA)+0.3).toFixed(1), hAvgC = (parseFloat(avgC)+0.1).toFixed(1);
    var totAT = Math.round(toRn*parseFloat(avgA)),  totCT = Math.round(toRn*parseFloat(avgC));
    var totAH = Math.round(hnRn*parseFloat(hAvgA)), totCH = Math.round(hnRn*parseFloat(hAvgC));
    var totG  = Math.round(toRn*(parseFloat(avgA)+parseFloat(avgC)));
    var hTotG = Math.round(hnRn*(parseFloat(hAvgA)+parseFloat(hAvgC)));
    var avgLos = (2.8+v%5*0.3).toFixed(1)+'n', hLos = (2.8+v%5*0.3+0.4).toFixed(1)+'n';
    var avgLead = (18+v%60)+'d', hLead = (18+v%60+12)+'d';
    var availRooms = Math.max(0, 102-Math.floor(hotel*1.02));
    var availGuar  = Math.floor(8+v%5);
    var aiPct = Math.max(45, Math.min(68, 55+(dm*7+dd*3)%14));
    var bbPct = Math.max(14, Math.min(28, 20+(dm*11+dd*5)%11));
    var hbPct = Math.max(6,  Math.min(16, 10+(dm*5+dd*7)%9));
    var roPct = 100 - aiPct - bbPct - hbPct;
    var toPct = to / Math.max(1, hotel);
    var toMix   = 28+Math.abs((dm*7+dd*5)%25);
    var dirMix  = 30+Math.abs((dm*5+dd*9)%20);
    var otaMix  = 20+Math.abs((dm*9+dd*3)%18);
    var otherMix = Math.max(0, 100-toMix-dirMix-otaMix);
    function fR(val){return val>=1000000?'$'+(val/1000000).toFixed(1)+'M':'$'+Math.round(val/1000)+'k';}
    return {dm, dd, hotel, to, adr, toAdr, toRn, hnRn, toRev, hnRev,
            otherPct, otherRms, freeRms, onlinePct, adrBar, revBar,
            sdlyH, lyH, fcstH, sdlyA, lyA, fcstA, sdlyRn, lyRn, fcstRn,
            sdlyR, lyR, fcstR, revpar, hRevpar, toRevpar, sdlyRevpar, lyRevpar,
            pickup, hPickup, avgA, avgC, hAvgA, hAvgC,
            totAT, totCT, totAH, totCH, totG, hTotG,
            avgLos, hLos, avgLead, hLead, availRooms, availGuar,
            aiPct, bbPct, hbPct, roPct, toPct, toMix, dirMix, otaMix, otherMix, fR, v};
  });

  // ── Row schema (built per group, then assembled in custom order) ──────────
  var _cmpOrder = ['stly','ly','fcst'], _cmpNames = {stly:'STLY',ly:'LY',fcst:'Fcst'};
  var _cmpDots = {stly:'#C4FF45', ly:'#facc15', fcst:'#fb923c'};
  var compLabel = _cmpOrder.filter(function(k){ return wvCompare.has(k); }).map(function(k){ return _cmpNames[k]; }).join('/') || 'STLY';
  function pushCmpRows(arr, prefix, parent, extra) {
    // No-op: comparison metrics now display inline, not as standalone rows
  }
  var grp = { g_closeouts:[], g_daily:[], g_more:[], g_meals:[], g_biz:[], g_avail:[], g_torates:[] };
  window._wbGrpData = grp; // expose for Table Settings modal

  // Group: Close Outs (details directly under group — summary shown in collapsed header)
  if (wvMetricState.dm_closeouts) {
    grp.g_closeouts.push({type:'top', id:'g_closeouts', label:'Close Outs'});
    if (wvMetricState.dm_co_rooms)  grp.g_closeouts.push({type:'sub', id:'co_rooms',  label:'Room Types',     dot:'#6b7280', parent:'g_closeouts'});
    if (wvMetricState.dm_co_boards) grp.g_closeouts.push({type:'sub', id:'co_boards', label:'Board Types',    dot:'#6b7280', parent:'g_closeouts'});
    if (wvMetricState.dm_co_tos)    grp.g_closeouts.push({type:'sub', id:'co_tos',    label:'Tour Operators', dot:'#6b7280', parent:'g_closeouts'});
  }

  // Group: Daily Metrics
  grp.g_daily.push({type:'top', id:'g_daily', label:'Daily Metrics'});
  if (wvMetricState.capacity) {
    grp.g_daily.push({type:'sect', id:'occ',       label:'Occupancy',               parent:'g_daily'});
    grp.g_daily.push({type:'sub',  id:'occ_tdh',   label:'Travel Distribution Hubs',dot:'#004948', parent:'occ'});
    grp.g_daily.push({type:'sub',  id:'occ_other', label:'Other Segments',          dot:'#52d9ce', parent:'occ'});
    grp.g_daily.push({type:'sub',  id:'occ_rem',   label:'Total Hotel Occupancy',   dot:'#445e0d', parent:'occ', isRem:true});
  }
  if (wvMetricState.onlineOffline) {
    grp.g_daily.push({type:'sect', id:'onoff',     label:'Online / Offline', parent:'g_daily'});
    grp.g_daily.push({type:'sub',  id:'onoff_on',  label:'Online',  dot:'#004948', parent:'onoff'});
    grp.g_daily.push({type:'sub',  id:'onoff_off', label:'Offline', dot:'#52d9ce', parent:'onoff'});
  }
  if (wvMetricState.adr) {
    grp.g_daily.push({type:'sect', id:'adr',       label:'ADR',          parent:'g_daily'});
    grp.g_daily.push({type:'sub',  id:'adr_t',     label:'TO',            dot:'#004948', parent:'adr'});
    grp.g_daily.push({type:'sub',  id:'adr_hotel', label:'Hotel',         dot:'#52d9ce', parent:'adr'});
  }
  if (wvMetricState.revenue) {
    grp.g_daily.push({type:'sect', id:'rev',       label:'Revenue',       parent:'g_daily'});
    grp.g_daily.push({type:'sub',  id:'rev_t',     label:'TO',            dot:'#004948', parent:'rev'});
    grp.g_daily.push({type:'sub',  id:'rev_hotel', label:'Hotel',         dot:'#52d9ce', parent:'rev'});
  }

  // Group: More Metrics
  var hasMore = wvMetricState.dm_rnSold || wvMetricState.dm_trevpar || wvMetricState.dm_pickup ||
                wvMetricState.dm_avgAdults || wvMetricState.dm_avgChildren ||
                wvMetricState.dm_totalAdults || wvMetricState.dm_totalChildren ||
                wvMetricState.dm_totalGuests || wvMetricState.dm_avgLos ||
                wvMetricState.dm_avgLeadTime || wvMetricState.dm_availRooms || wvMetricState.dm_availGuar;
  if (hasMore) {
    grp.g_more.push({type:'top', id:'g_more', label:'More Metrics'});
    if (wvMetricState.dm_rnSold) {
      grp.g_more.push({type:'sect', id:'rn',       label:'RN Sold',    parent:'g_more'});
      grp.g_more.push({type:'sub',  id:'rn_t',     label:'TO',          dot:'#004948', parent:'rn'});
      grp.g_more.push({type:'sub',  id:'rn_hotel', label:'Hotel',       dot:'#52d9ce', parent:'rn'});
    }
    if (wvMetricState.dm_trevpar) {
      grp.g_more.push({type:'sect', id:'revpar_s',    label:'RevPAR',    parent:'g_more'});
      grp.g_more.push({type:'sub',  id:'revpar_t',    label:'TO',        dot:'#004948', parent:'revpar_s'});
      grp.g_more.push({type:'sub',  id:'revpar_h',    label:'Hotel',     dot:'#52d9ce', parent:'revpar_s'});
    }
    if (wvMetricState.dm_pickup && wvMetricState['dm_pickup_0'] !== false) {
      var _puDv = pickupDayValues[0] || 1;
      grp.g_more.push({type:'sect', id:'pickup_0', label:'Pickup', parent:'g_more', puIdx: 0, puDv: _puDv});
      grp.g_more.push({type:'sub',  id:'pickup_0_t', label:'TO',    dot:'#004948', parent:'pickup_0', puIdx: 0, puDv: _puDv});
      grp.g_more.push({type:'sub',  id:'pickup_0_h', label:'Hotel', dot:'#52d9ce', parent:'pickup_0', puIdx: 0, puDv: _puDv});
    }
    if (wvMetricState.dm_avgAdults) {
      grp.g_more.push({type:'sect', id:'avga_s', label:'Average Adults', parent:'g_more'});
      grp.g_more.push({type:'sub',  id:'avga_t',    label:'TO',          dot:'#004948', parent:'avga_s'});
      grp.g_more.push({type:'sub',  id:'avga_h',    label:'Hotel',       dot:'#52d9ce', parent:'avga_s'});
    }
    if (wvMetricState.dm_avgChildren) {
      grp.g_more.push({type:'sect', id:'avgc_s', label:'Average Children', parent:'g_more'});
      grp.g_more.push({type:'sub',  id:'avgc_t',    label:'TO',            dot:'#004948', parent:'avgc_s'});
      grp.g_more.push({type:'sub',  id:'avgc_h',    label:'Hotel',         dot:'#52d9ce', parent:'avgc_s'});
    }
    if (wvMetricState.dm_totalAdults) {
      grp.g_more.push({type:'sect', id:'tota_s', label:'Total Adults', parent:'g_more'});
      grp.g_more.push({type:'sub',  id:'tota_t',    label:'TO',        dot:'#004948', parent:'tota_s'});
      grp.g_more.push({type:'sub',  id:'tota_h',    label:'Hotel',     dot:'#52d9ce', parent:'tota_s'});
    }
    if (wvMetricState.dm_totalChildren) {
      grp.g_more.push({type:'sect', id:'totc_s', label:'Total Children', parent:'g_more'});
      grp.g_more.push({type:'sub',  id:'totc_t',    label:'TO',          dot:'#004948', parent:'totc_s'});
      grp.g_more.push({type:'sub',  id:'totc_h',    label:'Hotel',       dot:'#52d9ce', parent:'totc_s'});
    }
    if (wvMetricState.dm_totalGuests) {
      grp.g_more.push({type:'sect', id:'totg_s', label:'Total Guests', parent:'g_more'});
      grp.g_more.push({type:'sub',  id:'totg_t',    label:'TO',        dot:'#004948', parent:'totg_s'});
      grp.g_more.push({type:'sub',  id:'totg_h',    label:'Hotel',     dot:'#52d9ce', parent:'totg_s'});
    }
    if (wvMetricState.dm_avgLos) {
      grp.g_more.push({type:'sect', id:'los_s', label:'Average LOS', parent:'g_more'});
      grp.g_more.push({type:'sub',  id:'los_t', label:'TO',          dot:'#004948', parent:'los_s'});
      grp.g_more.push({type:'sub',  id:'los_h', label:'Hotel',       dot:'#52d9ce', parent:'los_s'});
    }
    if (wvMetricState.dm_avgLeadTime) {
      grp.g_more.push({type:'sect', id:'lead_s', label:'Lead Time', parent:'g_more'});
      grp.g_more.push({type:'sub',  id:'lead_t', label:'TO',        dot:'#004948', parent:'lead_s'});
      grp.g_more.push({type:'sub',  id:'lead_h', label:'Hotel',     dot:'#52d9ce', parent:'lead_s'});
    }
    if (wvMetricState.dm_availRooms) grp.g_more.push({type:'sect', id:'avail_s',  label:'Avail Rooms', parent:'g_more'});
    if (wvMetricState.dm_availGuar)  grp.g_more.push({type:'sect', id:'availg_s', label:'Avail Guar.', parent:'g_more'});
  }

  // Group: Meal Plans
  if (wvMetricState.mealsSummary) {
    grp.g_meals.push({type:'top',  id:'g_meals', label:'Meal Plans'});
    var _mpPlans = [
      {key:'ai', label:'All Inclusive'},
      {key:'bb', label:'Bed & Breakfast'},
      {key:'hb', label:'Half Board'},
      {key:'ro', label:'Room Only'}
    ];
    _mpPlans.forEach(function(p) {
      grp.g_meals.push({type:'sect', id:'mp_'+p.key,       label:p.label, parent:'g_meals', mpKey:p.key});
      grp.g_meals.push({type:'sub',  id:'mp_'+p.key+'_t',  label:'TO',    dot:'#004948', parent:'mp_'+p.key, mpKey:p.key});
      grp.g_meals.push({type:'sub',  id:'mp_'+p.key+'_h',  label:'Hotel', dot:'#52d9ce', parent:'mp_'+p.key, mpKey:p.key});
    });
    grp.g_meals.push({type:'sect', id:'mp_sum',  label:'Summary',         parent:'g_meals'});
  }

  // Group: Business Mix
  if (wvMetricState.bizMix) {
    grp.g_biz.push({type:'top',  id:'g_biz',    label:'Business Mix'});
    grp.g_biz.push({type:'sect', id:'biz',       label:'Business Mix', parent:'g_biz'});
    grp.g_biz.push({type:'sub',  id:'biz_to',    label:'TO',          dot:'#004948', parent:'biz'});
    grp.g_biz.push({type:'sub',  id:'biz_dir',   label:'Direct',      dot:'#52d9ce', parent:'biz'});
    grp.g_biz.push({type:'sub',  id:'biz_ota',   label:'OTA',         dot:'#D97706', parent:'biz'});
    grp.g_biz.push({type:'sub',  id:'biz_other', label:'Other',       dot:'#9ca3af', parent:'biz'});
  }

  // Group: Room Availability
  if (wvMetricState.avail || wvMetricState.availAlloc) {
    grp.g_avail.push({type:'top', id:'g_avail', label:'Room Availability'});
    RT_NAMES.forEach(function(name, i) {
      grp.g_avail.push({type:'sect', id:'avrt'+i,       label:name,        parent:'g_avail', rtIdx:i});
      grp.g_avail.push({type:'sub',  id:'avrt'+i+'_to', label:'TO Sold',   dot:'#004948', parent:'avrt'+i, rtIdx:i, rtSub:'to'});
      grp.g_avail.push({type:'sub',  id:'avrt'+i+'_ot', label:'Other Segments', dot:'#52d9ce', parent:'avrt'+i, rtIdx:i, rtSub:'other'});
      grp.g_avail.push({type:'sub',  id:'avrt'+i+'_tn', label:'Tentative Sold (Group)',    dot:'#967EF3', parent:'avrt'+i, rtIdx:i, rtSub:'tentative'});
      grp.g_avail.push({type:'sub',  id:'avrt'+i+'_oo', label:'Out-of-Order',             dot:'#ef4444', parent:'avrt'+i, rtIdx:i, rtSub:'ooo'});
      grp.g_avail.push({type:'sub',  id:'avrt'+i+'_al', label:'Alloc Rem.',dot:'#D97706', parent:'avrt'+i, rtIdx:i, rtSub:'alloc'});
      grp.g_avail.push({type:'sub',  id:'avrt'+i+'_av', label:'Total Hotel Occupancy', dot:'#445e0d', parent:'avrt'+i, rtIdx:i, rtSub:'avail', isRem:true});
    });
  }

  // Group: Travel Co. Rates
  if (wvMetricState.toRates) {
    grp.g_torates.push({type:'top', id:'g_torates', label:'Travel Co. Rates'});
    TO_NAMES.forEach(function(name, i) {
      grp.g_torates.push({type:'sect', id:'torate'+i, label:name, parent:'g_torates', toIdx:i});
    });
    grp.g_torates.push({type:'sect', id:'torate_base', label:'Base Rate', parent:'g_torates', toBase:true});
  }

  // ── Assemble rows in custom order ─────────────────────────────────────────
  var wbOrder = (_wbGroupOrder && _wbGroupOrder.length) ? _wbGroupOrder : WB_GROUPS_DEF.map(function(g){return g.key;});
  var rows = [];
  wbOrder.forEach(function(key) { if (grp[key]) rows = rows.concat(grp[key]); });

  // ── Helpers ────────────────────────────────────────────────────────────────
  var chevUp   = '<span class="material-icons" style="font-size:14px">expand_less</span>';
  var chevDown = '<span class="material-icons" style="font-size:14px">expand_more</span>';

  // Populate module-level ID list for Open All / Close All
  _wbAllIds = rows.filter(function(r){ return r.type==='top'||r.type==='sect'; }).map(function(r){ return r.id; });

  // Default collapse state: top-groups open, sub-sections closed (only set if not yet toggled by user)
  rows.forEach(function(r) {
    if (r.type === 'sect' && !Object.prototype.hasOwnProperty.call(_wbCollapsed, r.id)) {
      _wbCollapsed[r.id] = true;
    }
  });

  // Flat id→row map for fast grandparent lookup
  var rowMap = {};
  rows.forEach(function(r){ rowMap[r.id] = r; });

  var _sectsWithKids = {};
  rows.forEach(function(r){ if (r.parent && rowMap[r.parent] && rowMap[r.parent].type === 'sect') _sectsWithKids[r.parent] = true; });

  function isHidden(row) {
    if (!row.parent) return false;
    if (_wbCollapsed[row.parent]) return true;
    var par = rowMap[row.parent];
    if (par && par.parent && _wbCollapsed[par.parent]) return true;
    return false;
  }

  var TODAY_WV = new Date(2026, 2, 9);

  function cmpSfx(cmpStr, curr, comp) {
    if (!cmpStr || wvCompare.size === 0) return '';
    var cls = 'wv-cmp-neutral';
    if (curr != null && comp != null && !isNaN(parseFloat(curr)) && !isNaN(parseFloat(comp))) {
      var c = parseFloat(curr), p = parseFloat(comp);
      if (c > p) cls = 'wv-cmp-up';
      else if (c < p) cls = 'wv-cmp-dn';
    }
    return '<span class="wv-cmp-sep"> / </span><span class="wv-cmp-val-txt ' + cls + '">' + cmpStr + '</span>';
  }

  // trendBadge wraps badges in a single container so wb-sect-val always has
  // exactly 2 flex children (value + badges), keeping space-between sane with multiple compares
  function trendBadge(curr, stlyComp, lyComp, fcstComp) {
    var b = _wvMultiTrendBadge(curr, stlyComp, lyComp, fcstComp);
    return b ? '<span style="display:inline-flex;gap:2px;flex-wrap:wrap;align-items:center">' + b + '</span>' : '';
  }

  function wbGrad(clr) {
    if (clr==='#004948') return 'linear-gradient(to right,#004948,#007a75)';
    if (clr==='#52d9ce') return 'linear-gradient(to right,#52d9ce,#8aeee8)';
    if (clr==='#445e0d') return 'linear-gradient(to right,#445e0d,#6a9014)';
    if (clr==='#D97706') return 'linear-gradient(to right,#D97706,#F59E0B)';
    if (clr==='#967EF3') return 'linear-gradient(to right,#967EF3,#a78bfa)';
    if (clr==='#16a34a') return 'linear-gradient(to right,#16a34a,#22c55e)';
    if (clr==='#C4FF45') return 'linear-gradient(to right,#C4FF45,#D4FF73)';
    return clr;
  }
  function wbStackBar(segs) {
    return '<div style="height:6px;background:'+wbGrad('#e5e7eb')+';border-radius:2px;display:flex;overflow:hidden;margin-top:3px">'
      + segs.map(function(s){ return '<div style="width:'+s.p+'%;background:'+wbGrad(s.c)+'"></div>'; }).join('')
      + '</div>';
  }

  // Wrap a bar HTML string with a comparison marker line
  function wbBarMark(barHtml, compPct) {
    if (wvCompare.size === 0 || compPct == null || isNaN(compPct)) return barHtml;
    var pct = Math.min(100, Math.max(0, compPct));
    return '<div style="position:relative">'
      + barHtml
      + '<div style="position:absolute;left:'+pct+'%;top:0;height:6px;width:2.5px;background:'+wbGrad('#C4FF45')+';transform:translateX(-50%);z-index:2;border-radius:1px;pointer-events:none;box-shadow:0 0 3px rgba(196,255,69,0.6)"></div>'
      + '</div>';
  }

  // ── Build HTML ─────────────────────────────────────────────────────────────
  var html = '<div class="wb-layout">';

  // Sticky date-header row
  html += '<div class="wb-row wb-hdr-row">';
  html += '<div class="wb-label-cell wb-hdr-label-cell"></div>';
  days.forEach(function(dv) {
    var dt   = new Date(dv.year, dv.month - 1, dv.day);
    var dow  = DOW_SHORT[dt.getDay()];
    var isAct = dv.day === activeDay && dv.month === month;
    var dba  = Math.round((dt - TODAY_WV) / 86400000);
    var dbaStr = dba === 0 ? 'Today' : dba > 0 ? dba + ' DBA' : '';
    var mm2 = String(dv.month).padStart(2,'0'), dd2 = String(dv.day).padStart(2,'0');
    var isoDate = '2026-' + mm2 + '-' + dd2;
    var isSel = _wbSelectedDays.has(isoDate);
    var _coKey2 = dv.month+'-'+dv.day;
    var _coFull2 = LOCKED_DAYS.has(_coKey2);
    var _coPart2 = (PARTIAL_CLOSURES[_coKey2] || []).length > 0;
    var _lockColor = isSel ? '#f43f5e' : _coFull2 ? '#fca5a5' : _coPart2 ? '#fde68a' : 'rgba(255,255,255,0.35)';
    var _lockWidth = (isSel || _coFull2 || _coPart2) ? '1.5' : '1.3';
    var _lockIcon = _coFull2
          ? '<span class="wb-hdr-lock-icon" title="Closed out"><span class="material-icons" style="font-size:13px;color:#fca5a5">lock</span></span>'
          : _coPart2
          ? '<span class="wb-hdr-lock-icon" title="Partially closed out"><span class="material-icons" style="font-size:13px;color:#fde68a">lock_open</span></span>'
          : '';
    var _wbEvtKey = dv.month + '-' + dv.day;
    var _wbHasEvt = (typeof CAL_EVENTS !== 'undefined' && CAL_EVENTS[_wbEvtKey]);
    var _evtIcon = _wbHasEvt
          ? '<span class="wv-event-cal-icon has-events" data-event-key="' + _wbEvtKey + '" onmouseenter="calShowEventTip(event,\'' + _wbEvtKey + '\')" onmouseleave="calHideEventTip()" style="display:inline-flex;align-items:center"><span class="material-icons" style="font-size:14px;color:#c4ff45">today</span></span>'
          : '';
    html += '<div class="wb-data-cell wb-hdr-cell'
          + (isAct ? ' wb-hdr-active' : '')
          + (isSel ? ' wb-hdr-selected' : '')
          + '" data-wb-date="' + isoDate + '" title="Select for close-out">'
          + '<input type="checkbox" class="wv-day-chk wb-day-chk"' + (isSel ? ' checked' : '') + ' onclick="event.stopPropagation();wbDayToggle(\'' + isoDate + '\');this.checked=_wbSelectedDays.has(\'' + isoDate + '\')" title="Select for close-out">'
          + '<span class="wb-hdr-dow">' + dow + '</span>'
          + '<span class="wb-hdr-date">' + dv.day + '/' + dv.month + '</span>'
          + _evtIcon
          + (dbaStr ? '<span style="font-size:10px;background:rgba(255,255,255,0.2);border-radius:3px;padding:0 4px;color:#fff;white-space:nowrap">'+dbaStr+'</span>' : '')
          + _lockIcon
          + '</div>';
  });
  html += '</div>';

  // Data rows
  rows.forEach(function(row) {
    var collapsed = !!_wbCollapsed[row.id];
    var hidden    = isHidden(row);
    var rowCls    = 'wb-row wb-row-' + row.type + (hidden ? ' wb-row-hidden' : '');

    html += '<div class="' + rowCls + '" data-wb-id="' + row.id + '"'
          + (row.parent ? ' data-wb-parent="' + row.parent + '"' : '') + '>';

    // ── Label cell ──────────────────────────────────────────────────────────
    if (row.type === 'top') {
      html += '<div class="wb-label-cell wb-grp-hdr" onclick="wbToggle(\'' + row.id + '\')">'
            + '<span class="wb-chev">' + (collapsed ? chevDown : chevUp) + '</span>'
            + '<span class="wb-grp-label">' + row.label + '</span>'
            + '</div>';
    } else if (row.type === 'sect') {
        var _hasKids = _sectsWithKids[row.id];
        html += '<div class="wb-label-cell wb-sect-lbl"' + (_hasKids ? ' onclick="wbToggle(\'' + row.id + '\')"' : '') + '>'
              + (_hasKids ? '<span class="wb-chev">' + (collapsed ? chevDown : chevUp) + '</span>' : '')
              + '<span class="wb-sect-label">' + row.label + '</span>'
              + '</div>';
    } else {
      var dotHtml = row.dot ? '<span class="wb-sub-dot" style="background:' + row.dot + '"></span>' : '';
      html += '<div class="wb-label-cell wb-sub-lbl-cell">'
            + dotHtml
            + '<span class="wb-sub-label' + (row.isRem ? ' wb-sub-lbl-rem' : '') + '">' + row.label + '</span>'
            + '</div>';
    }

    // ── Data cells (one per day) ────────────────────────────────────────────
    days.forEach(function(dv, i) {
      var d = dd7[i];
      var cellContent = '';

      if (row.type === 'top') {
        // Close Outs group shows summary in collapsed state
        if (row.id === 'g_closeouts' && collapsed) {
          var _coKey3 = d.dm+'-'+d.dd;
          var _coFull3 = LOCKED_DAYS.has(_coKey3);
          var _coPart3 = PARTIAL_CLOSURES[_coKey3] || [];
          var _lockIco3 = '<span class="material-icons" style="font-size:13px;vertical-align:middle;margin-right:3px">';
          if (_coFull3) {
            cellContent = '<div style="display:flex;align-items:center;gap:4px;padding:2px 0">'+_lockIco3+'lock</span><span style="font-size:12px;font-weight:600;color:var(--text-primary)">Full Close Out</span></div>';
          } else if (_coPart3.length > 0) {
            cellContent = '<div style="display:flex;align-items:center;gap:4px;padding:2px 0">'+_lockIco3+'lock</span><span style="font-size:12px;font-weight:600;color:var(--text-primary)">'+_coPart3.length+' rule'+(_coPart3.length>1?'s':'')+'</span></div>';
          } else {
            cellContent = '<div style="display:flex;align-items:center;gap:4px;padding:2px 0"><span class="material-icons" style="font-size:13px;color:#059669;vertical-align:middle;margin-right:3px">check_circle</span><span style="font-size:12px;color:var(--text-primary)">Open</span></div>';
          }
        } else {
          cellContent = '';
        }

      } else if (row.type === 'sect') {
        var cs = '';

        // ── Room Availability (dynamic rtIdx) ────────────────────────────────
        if (row.rtIdx !== undefined) {
          var inv  = RT_CAPS[row.rtIdx];
          var sold = Math.min(inv, Math.floor(inv * d.hotel / 110));
          var toS  = Math.min(sold, Math.round(sold * d.to / Math.max(1, d.hotel)));
          var otS  = sold - toS;
          var tent = Math.max(0, Math.floor(2+Math.abs((d.dm*(row.rtIdx+4)+d.dd*(row.rtIdx+2))%6)));
          var alloc = Math.floor(inv * 0.8 + Math.abs((d.dm*(row.rtIdx+3)+d.dd*(row.rtIdx+5))%15));
          var allocRem = Math.max(0, alloc - toS);
          var avRm = Math.max(0, inv - sold - tent);
          var toP  = Math.round(toS/inv*100), otP = Math.round(otS/inv*100);
          var tnP  = Math.round(tent/inv*100);
          var alP  = Math.round(allocRem/inv*100), avP = Math.max(0, 100-toP-otP-tnP-alP);
          var avClr = avRm <= 0 ? '#dc2626' : '#004948';
          cellContent = '<div class="wb-sect-val"><span class="wv-occ-total" style="color:'+(avRm<=0?'#16a34a':avClr)+'">'
            + (avRm <= 0 ? '0 available' : avRm+' avail') + '</span>'
            + '<span style="font-size:12px;color:#9ca3af;margin-left:4px">/ '+inv+'</span></div>'
            + '<div class="wv-occ-bar-track">'
            + '<div style="width:'+toP+'%;background:'+wbGrad('#004948')+';height:6px"></div>'
            + '<div style="width:'+otP+'%;background:'+wbGrad('#52d9ce')+';height:6px"></div>'
            + '<div style="width:'+tnP+'%;background:'+wbGrad('#967EF3')+';height:6px"></div>'
            + '<div style="width:'+alP+'%;background:'+wbGrad('#D97706')+';height:6px"></div>'
            + '<div style="width:'+avP+'%;background:'+wbGrad('#d7f7ed')+';height:6px"></div>'
            + '</div>';

        // ── Travel Co. Rates (dynamic toIdx) ──────────────────────────────────
        } else if (row.toIdx !== undefined) {
          var toRate  = d.adr - 15 + Math.abs((d.dm*(row.toIdx+3)+d.dd*(row.toIdx+5))%50);
          var toAllot = 5 + Math.abs((d.dm*(row.toIdx+2)+d.dd*(row.toIdx+3))%20);
          var toUsed  = Math.max(0, toAllot - Math.floor(d.hotel/20));
          var toRem   = toAllot - toUsed;
          var barPct  = Math.round(toUsed/toAllot*100);
          var isEbb   = (new Date(2026,d.dm-1,d.dd)).getDay() < 3;
          var promoTxt = isEbb ? 'EBB 10%' : 'Contract';
          var promoClr = isEbb ? '#16a34a' : '#2563eb';
          cellContent = '<div class="wb-sect-val" style="justify-content:space-between">'
            + '<span class="wv-occ-total">$'+toRate+'</span>'
            + '<span style="font-size:12px;color:#9ca3af">'+toRem+'r</span>'
            + '<span style="font-size:11px;font-weight:700;padding:1px 5px;border-radius:3px;background:'+promoClr+'22;color:'+promoClr+';border:1px solid '+promoClr+'44">'+promoTxt+'</span>'
            + '</div>'
            + '<div class="wv-occ-bar-track"><div style="width:'+barPct+'%;background:'+wbGrad('#004948')+';height:6px"></div></div>';

        } else if (row.toBase) {
          var baseRate = d.adr + 8;
          cellContent = '<div class="wb-sect-val"><span class="wv-occ-total" style="font-weight:700">$'+baseRate+'</span></div>'
            + '<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,Math.round(baseRate/280*100))+'%;background:'+wbGrad('#004948')+';height:6px"></div></div>';

        } else if (row.puIdx !== undefined) {
          // ── Pickup per-window parent row ──
          var _psc = row.puDv<=1?0.3:row.puDv<=3?0.6:row.puDv<=7?1:Math.min(2,row.puDv/7);
          var _ppv = Math.max(0, Math.round(d.pickup * _psc));
          cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">+'+_ppv+'</span></div>'
            + '<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,_ppv*3)+'%;background:'+wbGrad('#004948')+';height:6px"></div></div>';

        } else if (row.mpKey !== undefined) {
          // ── Meal Plan parent row (dynamic) ──
          var _mpPct = d[row.mpKey+'Pct'];
          var _mpHRm = Math.round(d.hnRn*_mpPct/100), _mpSeats = Math.round(_mpHRm*(parseFloat(d.hAvgA)+parseFloat(d.hAvgC)));
          cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+_mpPct+'%</span><span style="font-size:11px;color:#6b7280;margin-left:4px">'+_mpHRm+' RN</span></div>'
            +'<div style="font-size:11px;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:-2px">'+_mpSeats+' seats</div>'
            + '<div class="wv-occ-bar-track"><div style="width:'+_mpPct+'%;background:'+wbGrad('#004948')+';height:6px"></div></div>';

        } else {
        // colors are read from the first sub-row's dot for each section
        function wbBar(pct, clr) {
          return '<div class="wv-occ-bar-track"><div style="width:'+pct+'%;background:'+wbGrad(clr)+';height:6px"></div></div>';
        }
        switch (row.id) {
          // ── Daily Metrics ──────────────────────────────────────────────────
          case 'occ': {
            var _cv0 = wvCompare.has('stly')?d.sdlyH:wvCompare.has('ly')?d.lyH:wvCompare.has('fcst')?d.fcstH:null;
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.hotel+'%</span>'+trendBadge(d.hotel,d.sdlyH,d.lyH,d.fcstH)+'</div>'
              + wbBarMark('<div class="wv-occ-bar-track">'
                + '<div style="width:'+d.to+'%;background:'+wbGrad('#004948')+';height:6px"></div>'
                + '<div style="width:'+d.otherPct+'%;background:'+wbGrad('#52d9ce')+';height:6px"></div>'
                + '</div>', _cv0);
            break;
          }
          case 'onoff': {
            var _onSeed = Math.abs((d.dm*11+d.dd*7)%10);
            var _onStly = Math.max(20, d.onlinePct - 4 - _onSeed);
            var _onLy   = Math.max(20, d.onlinePct - 2 - _onSeed/2);
            var _onFcst = Math.min(90, d.onlinePct + 2 + _onSeed/2);
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.onlinePct+'%</span>'+trendBadge(d.onlinePct,_onStly,_onLy,_onFcst)+'</div>'
              + '<div class="wv-occ-bar-track">'
              + '<div style="width:'+d.onlinePct+'%;background:'+wbGrad('#004948')+';height:6px"></div>'
              + '<div style="width:'+(100-d.onlinePct)+'%;background:'+wbGrad('#52d9ce')+';height:6px"></div>'
              + '</div>';
            break;
          }
          case 'adr': {
            var _cv0 = wvCompare.has('stly')?d.sdlyA:wvCompare.has('ly')?d.lyA:wvCompare.has('fcst')?d.fcstA:null;
            var cvPct = _cv0!=null?Math.min(90,Math.round(_cv0/280*100)):null;
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">$'+d.toAdr+'</span>'+trendBadge(d.toAdr,d.sdlyA,d.lyA,d.fcstA)+'</div>'
              + wbBarMark(wbBar(d.adrBar, '#004948'), cvPct);
            break;
          }
          case 'rev': {
            var _cv0 = wvCompare.has('stly')?d.sdlyR:wvCompare.has('ly')?d.lyR:wvCompare.has('fcst')?d.fcstR:null;
            var cvPct = _cv0!=null?Math.min(90,Math.round(_cv0/4500000*100)):null;
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.fR(d.toRev)+'</span>'+trendBadge(d.toRev,d.sdlyR,d.lyR,d.fcstR)+'</div>'
              + wbBarMark(wbBar(d.revBar, '#004948'), cvPct);
            break;
          }
          // ── More Metrics ───────────────────────────────────────────────────
          case 'rn': {
            var _cv0 = wvCompare.has('stly')?d.sdlyRn:wvCompare.has('ly')?d.lyRn:wvCompare.has('fcst')?d.fcstRn:null;
            var cvPct = _cv0!=null?Math.round(_cv0/WV_CAP*100):null;
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.toRn+'</span>'+trendBadge(d.toRn,d.sdlyRn,d.lyRn,d.fcstRn)+'</div>'
              + wbBarMark(wbBar(Math.round(d.toRn/WV_CAP*100), '#004948'), cvPct) + wbBar(Math.round(d.hnRn/WV_CAP*100), '#52d9ce');
            break;
          }
          case 'revpar_s': {
            var _cv0 = wvCompare.has('stly')?d.sdlyRevpar:wvCompare.has('ly')?d.lyRevpar:null;
            var cvPct = _cv0!=null?Math.min(90,Math.round(_cv0/4)):null;
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">$'+d.hRevpar+'</span>'+trendBadge(d.hRevpar,d.sdlyRevpar,d.lyRevpar,null)+'</div>'
              + wbBarMark(wbBar(Math.min(90,Math.round(d.hRevpar/4)), '#004948'), cvPct);
            break;
          }
          case 'avga_s':
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgA+'</span></div>'
              + wbBar(Math.min(90,parseFloat(d.avgA)/3*100), '#004948') + wbBar(Math.min(90,parseFloat(d.hAvgA)/3*100), '#52d9ce');
            break;
          case 'avgc_s':
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgC+'</span></div>'
              + wbBar(Math.min(90,parseFloat(d.avgC)/2*100), '#004948') + wbBar(Math.min(90,parseFloat(d.hAvgC)/2*100), '#52d9ce');
            break;
          case 'tota_s':
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.totAT+'</span></div>'
              + wbBar(Math.min(90,Math.round(d.totAT/500*100)), '#004948') + wbBar(Math.min(90,Math.round(d.totAH/500*100)), '#52d9ce');
            break;
          case 'totc_s':
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.totCT+'</span></div>'
              + wbBar(Math.min(90,Math.round(d.totCT/100*100)), '#004948') + wbBar(Math.min(90,Math.round(d.totCH/100*100)), '#52d9ce');
            break;
          case 'totg_s':
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.totG+'</span></div>'
              + wbBar(Math.min(90,Math.round(d.totG/600*100)), '#004948') + wbBar(Math.min(90,Math.round(d.hTotG/600*100)), '#52d9ce');
            break;
          case 'los_s':
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgLos+'</span></div>'
              + wbBar(Math.min(90,parseFloat(d.avgLos)/10*100), '#004948') + wbBar(Math.min(90,parseFloat(d.hLos)/10*100), '#52d9ce');
            break;
          case 'lead_s':
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgLead+'</span></div>'
              + wbBar(Math.min(90,parseInt(d.avgLead)/90*100), '#004948') + wbBar(Math.min(90,parseInt(d.hLead)/90*100), '#52d9ce');
            break;
          case 'avail_s':
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.availRooms+' rm</span></div>'
              + wbBar(Math.min(90,Math.round(d.availRooms/WV_CAP*100)), '#16a34a');
            break;
          case 'availg_s':
            cellContent = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.availGuar+' rm</span></div>'
              + wbBar(Math.min(90,Math.round(d.availGuar/20*100)), '#004948');
            break;
          // ── Meal Plans Summary ────────────────────────────────────────────
          case 'mp_sum':
            { var _sumGPR=parseFloat(d.hAvgA)+parseFloat(d.hAvgC);
              var _aiR=Math.round(d.hnRn*d.aiPct/100),_aiSt=Math.round(_aiR*_sumGPR);
              var _bbR=Math.round(d.hnRn*d.bbPct/100),_bbSt=Math.round(_bbR*_sumGPR);
              var _hbR=Math.round(d.hnRn*d.hbPct/100),_hbSt=Math.round(_hbR*_sumGPR);
              var _roR=Math.round(d.hnRn*d.roPct/100),_roSt=Math.round(_roR*_sumGPR);
            cellContent = wbStackBar([{p:d.aiPct,c:'#004948'},{p:d.bbPct,c:'#52d9ce'},{p:d.hbPct,c:'#D97706'},{p:d.roPct,c:'#d7f7ed'}])
              + '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:3px">'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#004948">AI '+d.aiPct+'% · '+_aiSt+' seats</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#52d9ce">BB '+d.bbPct+'% · '+_bbSt+' seats</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#D97706">HB '+d.hbPct+'% · '+_hbSt+' seats</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#6b7280">RO '+d.roPct+'% · '+_roSt+' seats</span>'
              + '</div>'; }
            break;
          // (co_summary removed — summary now shown in collapsed group header)
          // ── Business Mix — stacked using sub-row dot colors ─────────────────
          case 'biz':
            cellContent = wbStackBar([{p:d.toMix,c:'#004948'},{p:d.dirMix,c:'#52d9ce'},{p:d.otaMix,c:'#D97706'},{p:d.otherMix,c:'#9ca3af'}])
              + '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:3px">'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#004948">TO '+d.toMix+'%</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#52d9ce">D '+d.dirMix+'%</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#D97706">OTA '+d.otaMix+'%</span>'
              + '<span style="font-size:12px;font-family:Lato,sans-serif;color:#9ca3af">Oth '+d.otherMix+'%</span>'
              + '</div>';
            break;
        }
        }

      } else {
        // Sub-row
        var v1 = '', v2 = '', remCls = row.isRem ? ' wb-sub-val-rem' : '';
        // Room availability sub-rows (dynamic)
        if (row.puIdx !== undefined) {
          // ── Pickup per-window sub-rows ──
          var _psc2 = row.puDv<=1?0.3:row.puDv<=3?0.6:row.puDv<=7?1:Math.min(2,row.puDv/7);
          if (row.id.endsWith('_stly')) {
            var _pStly = Math.max(0, Math.round(d.hPickup * _psc2 * (0.84 + Math.abs((d.dm*3+d.dd*7)%10)*0.004)));
            v1 = '+'+_pStly;
          } else if (row.id.endsWith('_ly')) {
            var _pLy = Math.max(0, Math.round(d.hPickup * _psc2 * (0.90 + Math.abs((d.dm*3+d.dd*7)%10)*0.003)));
            v1 = '+'+_pLy;
          } else if (row.id.endsWith('_fcst')) {
            var _pFcst = Math.max(0, Math.round(d.hPickup * _psc2 * (1.03 + Math.abs((d.dm*3+d.dd*7)%10)*0.005)));
            v1 = '+'+_pFcst;
          } else if (row.id.endsWith('_t')) {
            v1 = '+'+Math.max(0, Math.round(d.pickup * _psc2));
          } else {
            v1 = '+'+Math.max(0, Math.round(d.hPickup * _psc2));
          }
        } else if (row.mpKey !== undefined) {
          // ── Meal Plan TO / Hotel sub-rows ──
          var _mPct2 = d[row.mpKey+'Pct'];
          var _mSfx = row.id.split('_').pop();
          if (_mSfx === 't') {
            var _tRm = Math.round(d.toRn*_mPct2/100);
            var _tGpr = parseFloat(d.avgA)+parseFloat(d.avgC);
            var _tG = Math.round(_tRm*_tGpr);
            var _tRv = Math.round(_tRm*d.toAdr);
            v1 = _tRm+' RN · '+_tG+' G · '+((_tRv>=1000)?'$'+Math.round(_tRv/1000)+'k':'$'+_tRv)+' · $'+d.toAdr;
          } else {
            var _hRm = Math.round(d.hnRn*_mPct2/100);
            var _hGpr = parseFloat(d.hAvgA)+parseFloat(d.hAvgC);
            var _hG = Math.round(_hRm*_hGpr);
            var _hRv = Math.round(_hRm*d.adr);
            v1 = _hRm+' RN · '+_hG+' G · '+((_hRv>=1000)?'$'+Math.round(_hRv/1000)+'k':'$'+_hRv)+' · $'+d.adr;
          }
          v2 = '';
        } else if (row.rtSub !== undefined) {
          var inv2  = RT_CAPS[row.rtIdx];
          var sold2 = Math.min(inv2, Math.floor(inv2 * d.hotel / 110));
          var toS2  = Math.min(sold2, Math.round(sold2 * d.to / Math.max(1, d.hotel)));
          var otS2  = sold2 - toS2;
          var alloc2 = Math.floor(inv2 * 0.8 + Math.abs((d.dm*(row.rtIdx+3)+d.dd*(row.rtIdx+5))%15));
          var alRem2 = Math.max(0, alloc2 - toS2);
          var avRm2  = Math.max(0, inv2 - sold2);
          if      (row.rtSub === 'to')    v1 = toS2 + ' RN';
          else if (row.rtSub === 'other') v1 = otS2 + ' RN';
          else if (row.rtSub === 'tentative') { var tent2 = Math.max(0, Math.floor(2+Math.abs((d.dm*(row.rtIdx+4)+d.dd*(row.rtIdx+2))%6))); v1 = tent2 + ' RN'; }
          else if (row.rtSub === 'ooo') { var ooo2 = Math.max(0, Math.floor(Math.abs((d.dm*(row.rtIdx+1)+d.dd*(row.rtIdx+3))%4))); v1 = ooo2 + ' RN'; }
          else if (row.rtSub === 'alloc') v1 = alRem2 + ' RN';
          else if (row.rtSub === 'avail') { v1 = avRm2 + ' RN'; remCls = avRm2 === 0 ? ' wb-sub-val-rem' : ''; }
        } else {
        switch (row.id) {
          // close outs
          // close out details
          case 'co_rooms': {
            var _crKey = d.dm+'-'+d.dd;
            if (LOCKED_DAYS.has(_crKey)) { v1 = 'All'; }
            else { var _crR = PARTIAL_CLOSURES[_crKey] || [], _crRt = [];
              _crR.forEach(function(r){ _crRt = _crRt.concat(r.roomTypes); });
              _crRt = _crRt.filter(function(v,i,a){ return a.indexOf(v)===i; });
              v1 = _crRt.length > 0 ? _crRt.join(', ') : '—';
            }
          } break;
          case 'co_boards': {
            var _cbKey = d.dm+'-'+d.dd;
            var bdMap = {ai:'AI',bb:'B&B',hb:'HB',ro:'RO'};
            if (LOCKED_DAYS.has(_cbKey)) { v1 = 'All'; }
            else { var _cbR = PARTIAL_CLOSURES[_cbKey] || [], _cbBd = [];
              _cbR.forEach(function(r){ _cbBd = _cbBd.concat(r.boards); });
              _cbBd = _cbBd.filter(function(v,i,a){ return a.indexOf(v)===i; }).map(function(b){ return bdMap[b]||b; });
              v1 = _cbBd.length > 0 ? _cbBd.join(', ') : '—';
            }
          } break;
          case 'co_tos': {
            var _ctKey = d.dm+'-'+d.dd;
            if (LOCKED_DAYS.has(_ctKey)) { v1 = 'All'; }
            else { var _ctR = PARTIAL_CLOSURES[_ctKey] || [], _ctTo = [];
              _ctR.forEach(function(r){ _ctTo = _ctTo.concat(r.tos); });
              _ctTo = _ctTo.filter(function(v,i,a){ return a.indexOf(v)===i; });
              v1 = _ctTo.length > 0 ? _ctTo.join(', ') : '—';
            }
          } break;
          // occupancy
          case 'occ_tdh':    v1 = d.toRn+' RN'; v2 = d.to+'%'; break;
          case 'occ_other':  v1 = d.otherRms+' RN'; v2 = d.otherPct+'%'; break;
          case 'occ_rem':    v1 = d.freeRms+' RN';  v2 = Math.max(0,100-d.hotel)+'%';     break;
          // online/offline
          case 'onoff_on':   v1 = d.onlinePct+'%';                                          break;
          case 'onoff_off':  v1 = (100-d.onlinePct)+'%';                                    break;
          // adr
          case 'adr_t':      v1 = '$'+d.toAdr;                                              break;
          case 'adr_hotel':  v1 = '$'+d.adr;                                                break;
          // revenue
          case 'rev_t':      v1 = d.fR(d.toRev);                                            break;
          case 'rev_hotel':  v1 = d.fR(d.hnRev);                                            break;
          // rn sold
          case 'rn_t':       v1 = d.toRn+' RN';                                            break;
          case 'rn_hotel':   v1 = d.hnRn+' RN';                                            break;
          // revpar
          case 'revpar_t':   v1 = '$'+d.toRevpar;                                           break;
          case 'revpar_h':   v1 = '$'+d.hRevpar;                                            break;
          // avg adults / children
          case 'avga_t':     v1 = d.avgA;                                                   break;
          case 'avga_h':     v1 = d.hAvgA;                                                  break;
          case 'avgc_t':     v1 = d.avgC;                                                   break;
          case 'avgc_h':     v1 = d.hAvgC;                                                  break;
          // total adults / children / guests
          case 'tota_t':     v1 = d.totAT;                                                  break;
          case 'tota_h':     v1 = d.totAH;                                                  break;
          case 'totc_t':     v1 = d.totCT;                                                  break;
          case 'totc_h':     v1 = d.totCH;                                                  break;
          case 'totg_t':     v1 = d.totG;                                                   break;
          case 'totg_h':     v1 = d.hTotG;                                                  break;
          // avg los / lead time
          case 'los_t':      v1 = d.avgLos;                                                 break;
          case 'los_h':      v1 = d.hLos;                                                   break;
          case 'lead_t':     v1 = d.avgLead;                                                break;
          case 'lead_h':     v1 = d.hLead;                                                  break;
          // business mix
          case 'biz_to':     v1 = d.toMix+'%';                                              break;
          case 'biz_dir':    v1 = d.dirMix+'%';                                             break;
          case 'biz_ota':    v1 = d.otaMix+'%';                                             break;
          case 'biz_other':  v1 = d.otherMix+'%';                                           break;
        }
        } // end rtSub else
        // Compare chip for sub-rows (Fcst / LY / STLY — mirrors Forecast behaviour)
        var fcstChip = '';
        var _isCmpRow = row.id.endsWith('_stly') || row.id.endsWith('_ly') || row.id.endsWith('_fcst');
        if (wvCompare.size > 0 && v1 && !_isCmpRow) {
          var _fSeed = Math.abs((d.dm * 7 + d.dd * 13 + (row.rtIdx||0) * 5 + row.id.charCodeAt(row.id.length-1)) % 20);
          var _fNum = parseFloat(String(v1).replace(/[^0-9.\-]/g, ''));
          if (!isNaN(_fNum)) {
            // When current value is 0, use a seed-based fallback so comparisons are still meaningful
            var _fBase = _fNum !== 0 ? _fNum : (18 + _fSeed * 3);
            var _fCmpDefs = [
              {k:'stly', ref: Math.round(_fBase*(0.84+_fSeed*0.004)), l:'STLY'},
              {k:'ly',   ref: Math.round(_fBase*(0.89+_fSeed*0.004)), l:'LY'},
              {k:'fcst', ref: Math.round(_fBase*(0.92+_fSeed*0.008)), l:'Fc'}
            ];
            _fCmpDefs.filter(function(x){ return wvCompare.has(x.k); }).forEach(function(x) {
              var _fDiff = _fNum - x.ref;
              var _fClr = _fDiff > 0 ? '#059669' : _fDiff < 0 ? '#dc2626' : '#6b7280';
              var _fIco = _fDiff > 0 ? 'trending_up' : _fDiff < 0 ? 'trending_down' : 'remove';
              fcstChip += '<span style="font-size:10px;color:'+_fClr+';margin-left:4px;display:inline-flex;align-items:center;gap:1px;opacity:0.85">'
                + '<span class="material-icons" style="font-size:11px">'+_fIco+'</span>'
                + x.l+':'+x.ref+'</span>';
            });
          }
        }
        cellContent = '<div class="wb-sub-vals' + remCls + '">'
                    + '<span class="wb-sub-v1">' + v1 + fcstChip + '</span>'
                    + (v2 ? '<span class="wb-sub-v2">' + v2 + '</span>' : '')
                    + '</div>';
      }

      var _dayLocked = LOCKED_DAYS.has(dv.month+'-'+dv.day);
      html += '<div class="wb-data-cell wb-' + row.type + '-cell' + (_dayLocked ? ' wb-col-locked' : '') + '">' + cellContent + '</div>';
    });

    html += '</div>'; // wb-row
  });

  html += '</div>'; // wb-layout
  return html;
}

/* ── Daily B AG Grid ─────────────────────────────────────────────────────── */
function initDailyBGrid(days, month, activeDay, containerEl) {
  var AG = _realAgGrid;
  if (!AG || typeof AG.createGrid !== 'function') {
    containerEl.style.cssText = 'display:flex;flex-direction:column;overflow-x:auto;';
    containerEl.innerHTML = buildDailyBView(days, month, activeDay);
    return;
  }
  if (_dailyBGridApi) { try { _dailyBGridApi.destroy(); } catch(e){} _dailyBGridApi = null; }
  containerEl.innerHTML = '';
  containerEl.style.cssText = '';
  containerEl.style.padding = '0';
  var wrapper = document.createElement('div');
  wrapper.className = 'ag-theme-quartz daily-b-ag-wrap';
  containerEl.appendChild(wrapper);

  var DOW_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MNAMES_S  = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var TODAY_WV  = new Date(2026, 2, 9);
  var WV_CAP    = 250;
  var RT_NAMES  = ['Standard','Superior','Deluxe','Suite','Jr. Suite','Family'];
  var RT_CAPS   = [51,36,27,12,15,9];
  var TO_NAMES  = ['Sunshine Tours','Global Adv.','Beach Hols','City Breaks','Adventure'];

  // Per-day data
  var dd7 = days.map(function(dv) {
    var dm = dv.month, dd = dv.day;
    var hh = getOccupancy(dm, dd); var hotel = hh.hotel, to = hh.to;
    var adr   = 150 + Math.abs((dm*47+dd*31)%130);
    var v     = Math.abs((dm*127+dd*53+dm*dd*7+dd*dd*3))%100;
    var toAdr = Math.max(80, adr - 20 - Math.abs((dm*3+dd*7)%15));
    var toRn  = Math.round(WV_CAP * to / 100);
    var hnRn  = Math.round(WV_CAP * hotel / 100);
    var toRev = Math.floor(toRn * toAdr);
    var hnRev = Math.floor(hnRn * adr);
    var otherPct = Math.max(0, hotel - to);
    var otherRms = Math.round(WV_CAP * otherPct / 100);
    var freeRms  = WV_CAP - toRn - otherRms;
    var onlinePct = Math.max(30, Math.min(80, 45 + Math.abs((dm*13+dd*7)%35)));
    var adrBar = Math.min(90, Math.round(toAdr / 280 * 100));
    var revBar = Math.min(90, Math.round(toRev / 4500000 * 100));
    var sdlyH  = Math.max(5, hotel - 9), lyH = Math.max(5, hotel - 6), fcstH = Math.min(100, hotel + 4);
    var sdlyA  = adr - 8, lyA = adr - 4, fcstA = adr + 6;
    var sdlyRn = Math.round(toRn * 0.88), lyRn = Math.round(toRn * 0.93), fcstRn = Math.round(toRn * 1.06);
    var sdlyR  = Math.floor(Math.round(WV_CAP * sdlyH / 100) * sdlyA);
    var lyR    = Math.floor(hnRev * 0.95), fcstR = Math.floor(hnRev * 1.06);
    var revpar = Math.max(50, (adr+80) - 30 - Math.abs((dm*5+dd*3)%20));
    var hRevpar = Math.round(adr * hotel / 100);
    var toRevpar = Math.round(toAdr * to / 100);
    var sdlyRevpar = Math.max(40, revpar - 8), lyRevpar = Math.max(40, revpar - 4);
    var pickup = Math.max(0, Math.floor((v%25+5)*to/Math.max(1,hotel)));
    var hPickup = Math.floor(v%25+5);
    var avgA = (1.8+v%3*0.1).toFixed(1), avgC = (0.3+v%2*0.1).toFixed(1);
    var hAvgA = (parseFloat(avgA)+0.3).toFixed(1), hAvgC = (parseFloat(avgC)+0.1).toFixed(1);
    var totAT = Math.round(toRn*parseFloat(avgA)),  totCT = Math.round(toRn*parseFloat(avgC));
    var totAH = Math.round(hnRn*parseFloat(hAvgA)), totCH = Math.round(hnRn*parseFloat(hAvgC));
    var totG  = Math.round(toRn*(parseFloat(avgA)+parseFloat(avgC)));
    var hTotG = Math.round(hnRn*(parseFloat(hAvgA)+parseFloat(hAvgC)));
    var avgLos = (2.8+v%5*0.3).toFixed(1)+'n', hLos = (2.8+v%5*0.3+0.4).toFixed(1)+'n';
    var avgLead = (18+v%60)+'d', hLead = (18+v%60+12)+'d';
    var availRooms = Math.max(0, 102-Math.floor(hotel*1.02));
    var availGuar  = Math.floor(8+v%5);
    var aiPct = Math.max(45, Math.min(68, 55+(dm*7+dd*3)%14));
    var bbPct = Math.max(14, Math.min(28, 20+(dm*11+dd*5)%11));
    var hbPct = Math.max(6,  Math.min(16, 10+(dm*5+dd*7)%9));
    var roPct = 100 - aiPct - bbPct - hbPct;
    var toPct = to / Math.max(1, hotel);
    var toMix = 28+Math.abs((dm*7+dd*5)%25), dirMix = 30+Math.abs((dm*5+dd*9)%20), otaMix = 20+Math.abs((dm*9+dd*3)%18);
    var otherMix = Math.max(0, 100-toMix-dirMix-otaMix);
    var tcRates = [0,1,2,3,4].map(function(i){ return adr-15+Math.abs((dm*(i+3)+dd*(i+5))%50); });
    var baseRate = adr + 8;
    var isEbbDay = (new Date(2026,dm-1,dd)).getDay() < 3;
    function fR(val){return val>=1000000?'$'+(val/1000000).toFixed(1)+'M':'$'+Math.round(val/1000)+'k';}
    return {dm,dd,hotel,to,adr,toAdr,toRn,hnRn,toRev,hnRev,otherPct,otherRms,freeRms,
            onlinePct,adrBar,revBar,sdlyH,lyH,fcstH,sdlyA,lyA,fcstA,sdlyRn,lyRn,fcstRn,
            sdlyR,lyR,fcstR,revpar,hRevpar,toRevpar,sdlyRevpar,lyRevpar,pickup,hPickup,
            avgA,avgC,hAvgA,hAvgC,totAT,totCT,totAH,totCH,totG,hTotG,
            avgLos,hLos,avgLead,hLead,availRooms,availGuar,
            aiPct,bbPct,hbPct,roPct,toPct,toMix,dirMix,otaMix,otherMix,
            tcRates,baseRate,isEbbDay,fR,v};
  });

  // ── Render helpers ────────────────────────────────────────────────────────
  var C1='#004948', C2='#52d9ce', C3='#D97706', C4='#d7f7ed', CSTLY='#C4FF45', CREM='#445e0d';
  function cmpSfx(s, curr, comp) {
    if (!s || wvCompare.size === 0) return '';
    var cls = 'wv-cmp-neutral';
    if (curr != null && comp != null && !isNaN(parseFloat(curr)) && !isNaN(parseFloat(comp))) {
      var c = parseFloat(curr), p = parseFloat(comp);
      if (c > p) cls = 'wv-cmp-up';
      else if (c < p) cls = 'wv-cmp-dn';
    }
    return '<span class="wv-cmp-sep"> / </span><span class="wv-cmp-val-txt '+cls+'">'+s+'</span>';
  }
  function wbGrad2(clr) {
    if (clr==='#004948') return 'linear-gradient(to right,#004948,#007a75)';
    if (clr==='#52d9ce') return 'linear-gradient(to right,#52d9ce,#8aeee8)';
    if (clr==='#445e0d') return 'linear-gradient(to right,#445e0d,#6a9014)';
    if (clr==='#967EF3') return 'linear-gradient(to right,#967EF3,#a78bfa)';
    if (clr==='#D97706') return 'linear-gradient(to right,#D97706,#F59E0B)';
    if (clr==='#16a34a') return 'linear-gradient(to right,#16a34a,#22c55e)';
    if (clr==='#C4FF45') return 'linear-gradient(to right,#C4FF45,#D4FF73)';
    return clr;
  }
  function bar(pct, clr) {
    return '<div style="display:flex;height:6px;border-radius:2px;overflow:hidden;background:#e5e7eb;width:100%"><div style="width:'+pct+'%;background:'+wbGrad2(clr)+';height:6px"></div></div>';
  }
  function sBar(segs) {
    return '<div style="display:flex;height:6px;border-radius:2px;overflow:hidden;background:#e5e7eb;width:100%">'
      + segs.map(function(s){ return '<div style="width:'+s.p+'%;background:'+wbGrad2(s.c)+';height:6px"></div>'; }).join('')+'</div>';
  }
  function sCell(val, barHtml) {
    return '<div style="font-size:14px;font-weight:400;color:#111827;margin-bottom:4px;padding:0 10px">'+val+'</div>'
      +'<div style="padding:0">'+barHtml+'</div>';
  }
  function rCell(v1, v2, rem) {
    var c = rem ? '#388c3f' : '#111827', c2 = rem ? '#388c3f' : '#6b7280';
    return '<div style="display:flex;justify-content:flex-end;align-items:center;gap:8px;height:100%;padding:0 2px">'
      +'<span style="font-size:14px;color:'+c+'">'+v1+'</span>'
      +(v2?'<span style="font-size:14px;color:'+c2+'">'+v2+'</span>':'')
      +'</div>';
  }
  // Compare chip for TO sub-rows in board view — loops over all active compares
  function _wbCmpChip(numStr, seedN, d) {
    if (wvCompare.size === 0) return '';
    var _s = Math.abs((d.dm * 7 + d.dd * 13 + seedN) % 20);
    var _n = parseFloat(String(numStr).replace(/[^0-9.\-]/g, ''));
    if (isNaN(_n) || _n === 0) return '';
    var _defs = [{k:'stly',m:0.84+_s*0.004,l:'STLY'},{k:'ly',m:0.89+_s*0.004,l:'LY'},{k:'fcst',m:0.92+_s*0.008,l:'Fc'}];
    return _defs.filter(function(x){ return wvCompare.has(x.k); }).map(function(x) {
      var _v = Math.round(_n * x.m), _d2 = _n - _v;
      var _c = _d2 > 0 ? '#059669' : _d2 < 0 ? '#dc2626' : '#6b7280';
      var _i = _d2 > 0 ? 'trending_up' : _d2 < 0 ? 'trending_down' : 'remove';
      return '<span style="font-size:10px;color:'+_c+';margin-left:3px;display:inline-flex;align-items:center;gap:1px;opacity:0.85">'
        +'<span class="material-icons" style="font-size:11px">'+_i+'</span>'+x.l+':'+_v+'</span>';
    }).join('');
  }

  // ── Row builder ───────────────────────────────────────────────────────────
  _dbAllRows = []; _dbGrpRenderrs = [];
  var _gi=0, _si=0, _curGK=null, _curSK=null;
  function grp(lbl,clr){ _curGK='G'+(_gi++); _curSK=null; _dbAllRows.push({type:'grp',lbl:lbl,clr:clr||C1,grpKey:_curGK}); }
  function sect(lbl,clr,dot,fn,noChev){ _curSK='S'+(_si++); _dbAllRows.push({type:'sect',lbl:lbl,clr:clr||C1,dot:dot,fn:fn,grpKey:_curGK,sectKey:_curSK,noChev:!!noChev}); }
  function sub(lbl,dot,isRem,fn){ _dbAllRows.push({type:'sub',lbl:lbl,dot:dot,isRem:isRem||false,fn:fn,grpKey:_curGK,sectKey:_curSK}); }

  // ── Close Outs ─────────────────────────────────────────────────────────────
  grp('Close Outs', '#D32F2F');
  var bdMap = {ai:'AI',bb:'B&B',hb:'HB',ro:'RO'};
  sub('Room Types', '#6b7280', false, function(d){
    var k=d.dm+'-'+d.dd;
    if (LOCKED_DAYS.has(k)) return rCell('All');
    var rules=PARTIAL_CLOSURES[k]||[], rt=[];
    rules.forEach(function(r){rt=rt.concat(r.roomTypes);});
    rt=rt.filter(function(v,i,a){return a.indexOf(v)===i;});
    return rCell(rt.length?rt.join(', '):'—');
  });
  sub('Board Types', '#6b7280', false, function(d){
    var k=d.dm+'-'+d.dd;
    if (LOCKED_DAYS.has(k)) return rCell('All');
    var rules=PARTIAL_CLOSURES[k]||[], bd=[];
    rules.forEach(function(r){bd=bd.concat(r.boards);});
    bd=bd.filter(function(v,i,a){return a.indexOf(v)===i;}).map(function(b){return bdMap[b]||b;});
    return rCell(bd.length?bd.join(', '):'—');
  });
  sub('Tour Operators', '#6b7280', false, function(d){
    var k=d.dm+'-'+d.dd;
    if (LOCKED_DAYS.has(k)) return rCell('All');
    var rules=PARTIAL_CLOSURES[k]||[], to=[];
    rules.forEach(function(r){to=to.concat(r.tos);});
    to=to.filter(function(v,i,a){return a.indexOf(v)===i;});
    return rCell(to.length?to.join(', '):'—');
  });

  // ── Daily Metrics ─────────────────────────────────────────────────────────
  grp('Daily Metrics', C1);
  if (wvMetricState.capacity) {
    sect('Occupancy', C1, C1, function(d){ var cs=_wvMultiCmpSfx(d.hotel,d.sdlyH,d.lyH,d.fcstH,function(v){return v+'%';}); return sCell(d.hotel+'%'+cs, sBar([{p:d.to,c:C1},{p:d.hotel,c:C2}])); });
    sub('Tour Operator', C1, false, function(d){ return rCell(d.toRn+' RN', d.to+'%'+_wbCmpChip(d.to, 1, d)); });
    sub('Hotel', C2, false, function(d){ return rCell(d.freeRms+' RN',d.hotel+'%'); });
  }
  if (wvMetricState.onlineOffline) {
    sect('Online / Offline', C1, C1, function(d){ return sCell(d.onlinePct+'%', sBar([{p:d.onlinePct,c:C1},{p:100-d.onlinePct,c:C2}])); });
    sub('Online',  C1, false, function(d){ return rCell(d.onlinePct+'%'); });
    sub('Offline', C2, false, function(d){ return rCell((100-d.onlinePct)+'%'); });
  }
  if (wvMetricState.adr) {
    sect('ADR', C1, C1, function(d){ var cs=_wvMultiCmpSfx(d.toAdr,d.sdlyA,d.lyA,d.fcstA,function(v){return '$'+v;}); return sCell('$'+d.toAdr+cs, bar(d.adrBar,C1)); });
    sub('TO',    C1,    false, function(d){ return rCell('$'+d.toAdr + _wbCmpChip(d.toAdr, 2, d)); });
    sub('Hotel', C2,   false, function(d){ return rCell('$'+d.adr); });
  }
  if (wvMetricState.revenue) {
    sect('Revenue', C1, C1, function(d){ var cs=_wvMultiCmpSfx(d.toRev,d.sdlyR,d.lyR,d.fcstR,d.fR); return sCell(d.fR(d.toRev)+cs, bar(d.revBar,C1)); });
    sub('TO',     C1,    false, function(d){ return rCell(d.fR(d.toRev) + _wbCmpChip(d.toRev, 3, d)); });
    sub('Hotel',  C2,    false, function(d){ return rCell(d.fR(d.hnRev)); });
  }

  // ── More Metrics ──────────────────────────────────────────────────────────
  var hasMore = wvMetricState.dm_rnSold||wvMetricState.dm_trevpar||wvMetricState.dm_pickup||
    wvMetricState.dm_avgAdults||wvMetricState.dm_avgChildren||wvMetricState.dm_totalAdults||
    wvMetricState.dm_totalChildren||wvMetricState.dm_totalGuests||wvMetricState.dm_avgLos||
    wvMetricState.dm_avgLeadTime||wvMetricState.dm_availRooms||wvMetricState.dm_availGuar;
  if (hasMore) {
    grp('More Metrics', C1);
    if (wvMetricState.dm_rnSold) {
      sect('RN Sold', C1, C1, function(d){ var cs=_wvMultiCmpSfx(d.toRn,d.sdlyRn,d.lyRn,d.fcstRn,String); return sCell(d.toRn+cs, bar(Math.round(d.toRn/WV_CAP*100),C1)+'<div style="margin-top:2px">'+bar(Math.round(d.hnRn/WV_CAP*100),C2)+'</div>'); });
      sub('TO',     C1,    false, function(d){ return sCell(d.toRn+' RN'+_wbCmpChip(d.toRn, 4, d), bar(Math.round(d.toRn/WV_CAP*100),C1)); });
      sub('Hotel',  C2,    false, function(d){ return sCell(d.hnRn+' RN', bar(Math.round(d.hnRn/WV_CAP*100),C2)); });
    }
    if (wvMetricState.dm_trevpar) {
      sect('RevPAR', C1, C1, function(d){ var cs=_wvMultiCmpSfx(d.hRevpar,d.sdlyRevpar,d.lyRevpar,null,function(v){return '$'+v;}); return sCell('$'+d.hRevpar+cs, bar(Math.min(90,Math.round(d.hRevpar/4)),C1)); });
      sub('TO',       C1,    false, function(d){ return sCell('$'+d.toRevpar, bar(Math.min(90,Math.round(d.toRevpar/4)),C1)); });
      sub('Hotel',    C2,    false, function(d){ return sCell('$'+d.hRevpar, bar(Math.min(90,Math.round(d.hRevpar/4)),C2)); });
    }
    if (wvMetricState.dm_pickup && wvMetricState['dm_pickup_0'] !== false) {
      var _puDv2 = pickupDayValues[0] || 1;
      sect('Pickup', C1, C1, function(d) {
        var sc = _puDv2<=1?0.3:_puDv2<=3?0.6:_puDv2<=7?1:Math.min(2,_puDv2/7);
        var pv = Math.max(0, Math.round(d.pickup * sc));
        var pvBar = Math.min(90, pv * 3);
        return sCell('+'+pv, bar(pvBar, C1));
      });
      sub('TO',    C1, false, function(d) {
        var sc = _puDv2<=1?0.3:_puDv2<=3?0.6:_puDv2<=7?1:Math.min(2,_puDv2/7);
        var pv = Math.max(0, Math.round(d.pickup * sc));
        return sCell('+'+pv, bar(Math.min(90, pv*3), C1));
      });
      sub('Hotel', C2, false, function(d) {
        var sc = _puDv2<=1?0.3:_puDv2<=3?0.6:_puDv2<=7?1:Math.min(2,_puDv2/7);
        var hpv = Math.max(0, Math.round(d.hPickup * sc));
        return sCell('+'+hpv, bar(Math.min(90, hpv*3), C2));
      });
    }
    if (wvMetricState.dm_avgAdults) {
      sect('Average Adults', C1, C1, function(d){ return sCell(d.avgA, bar(Math.min(90,parseFloat(d.avgA)/3*100),C1)+'<div style="margin-top:2px">'+bar(Math.min(90,parseFloat(d.hAvgA)/3*100),C2)+'</div>'); });
      sub('TO', C1, false, function(d){ return sCell(d.avgA, bar(Math.min(90,parseFloat(d.avgA)/3*100),C1)); });
      sub('Hotel', C2, false, function(d){ return sCell(d.hAvgA, bar(Math.min(90,parseFloat(d.hAvgA)/3*100),C2)); });
    }
    if (wvMetricState.dm_avgChildren) {
      sect('Average Children', C1, C1, function(d){ return sCell(d.avgC, bar(Math.min(90,parseFloat(d.avgC)/2*100),C1)+'<div style="margin-top:2px">'+bar(Math.min(90,parseFloat(d.hAvgC)/2*100),C2)+'</div>'); });
      sub('TO', C1, false, function(d){ return sCell(d.avgC, bar(Math.min(90,parseFloat(d.avgC)/2*100),C1)); });
      sub('Hotel', C2, false, function(d){ return sCell(d.hAvgC, bar(Math.min(90,parseFloat(d.hAvgC)/2*100),C2)); });
    }
    if (wvMetricState.dm_totalAdults) {
      sect('Total Adults', C1, C1, function(d){ return sCell(String(d.totAT), bar(Math.min(90,Math.round(d.totAT/500*100)),C1)+'<div style="margin-top:2px">'+bar(Math.min(90,Math.round(d.totAH/500*100)),C2)+'</div>'); });
      sub('TO', C1, false, function(d){ return sCell(String(d.totAT), bar(Math.min(90,Math.round(d.totAT/500*100)),C1)); });
      sub('Hotel', C2, false, function(d){ return sCell(String(d.totAH), bar(Math.min(90,Math.round(d.totAH/500*100)),C2)); });
    }
    if (wvMetricState.dm_totalChildren) {
      sect('Total Children', C1, C1, function(d){ return sCell(String(d.totCT), bar(Math.min(90,Math.round(d.totCT/100*100)),C1)+'<div style="margin-top:2px">'+bar(Math.min(90,Math.round(d.totCH/100*100)),C2)+'</div>'); });
      sub('TO', C1, false, function(d){ return sCell(String(d.totCT), bar(Math.min(90,Math.round(d.totCT/100*100)),C1)); });
      sub('Hotel', C2, false, function(d){ return sCell(String(d.totCH), bar(Math.min(90,Math.round(d.totCH/100*100)),C2)); });
    }
    if (wvMetricState.dm_totalGuests) {
      sect('Total Guests', C1, C1, function(d){ return sCell(String(d.totG), bar(Math.min(90,Math.round(d.totG/600*100)),C1)+'<div style="margin-top:2px">'+bar(Math.min(90,Math.round(d.hTotG/600*100)),C2)+'</div>'); });
      sub('TO', C1, false, function(d){ return sCell(String(d.totG), bar(Math.min(90,Math.round(d.totG/600*100)),C1)); });
      sub('Hotel', C2, false, function(d){ return sCell(String(d.hTotG), bar(Math.min(90,Math.round(d.hTotG/600*100)),C2)); });
    }
    if (wvMetricState.dm_avgLos) {
      sect('Average LOS', C1, C1, function(d){ return sCell(d.avgLos, bar(Math.min(90,parseFloat(d.avgLos)/10*100),C1)+'<div style="margin-top:2px">'+bar(Math.min(90,parseFloat(d.hLos)/10*100),C2)+'</div>'); });
      sub('TO', C1, false, function(d){ return sCell(d.avgLos, bar(Math.min(90,parseFloat(d.avgLos)/10*100),C1)); });
      sub('Hotel', C2, false, function(d){ return sCell(d.hLos, bar(Math.min(90,parseFloat(d.hLos)/10*100),C2)); });
    }
    if (wvMetricState.dm_avgLeadTime) {
      sect('Lead Time', C1, C1, function(d){ return sCell(d.avgLead, bar(Math.min(90,parseInt(d.avgLead)/90*100),C1)+'<div style="margin-top:2px">'+bar(Math.min(90,parseInt(d.hLead)/90*100),C2)+'</div>'); });
      sub('TO', C1, false, function(d){ return sCell(d.avgLead, bar(Math.min(90,parseInt(d.avgLead)/90*100),C1)); });
      sub('Hotel', C2, false, function(d){ return sCell(d.hLead, bar(Math.min(90,parseInt(d.hLead)/90*100),C2)); });
    }
    if (wvMetricState.dm_availRooms) {
      sect('Avail Rooms', '#16a34a', '#16a34a', function(d){ return sCell(d.availRooms+' RN', bar(Math.min(90,Math.round(d.availRooms/WV_CAP*100)),'#16a34a')); });
    }
    if (wvMetricState.dm_availGuar) {
      sect('Avail Guar.', C1, C1, function(d){ return sCell(d.availGuar+' RN', bar(Math.min(90,Math.round(d.availGuar/20*100)),C1)); });
    }
  }

  // ── Meal Plans ────────────────────────────────────────────────────────────
  if (wvMetricState.mealsSummary) {
    grp('Meal Plans', C1);
    [['All Inclusive','aiPct'],['Bed & Breakfast','bbPct'],['Half Board','hbPct'],['Room Only','roPct']].forEach(function(mp){
      var k=mp[1];
      sect(mp[0], C1, C1, (function(k){ return function(d){ var rn=Math.round(d.hnRn*d[k]/100); return sCell(d[k]+'% · '+rn+' RN', bar(d[k],C1)); }; })(k));
      sub('TO', C1, false, (function(k){ return function(d){
        var tRm=Math.round(d.toRn*d[k]/100), tGpr=parseFloat(d.avgA)+parseFloat(d.avgC), tG=Math.round(tRm*tGpr), tRv=Math.round(tRm*d.toAdr);
        return sCell(tRm+' RN · '+tG+' G · '+((tRv>=1000)?'$'+Math.round(tRv/1000)+'k':'$'+tRv)+' · $'+d.toAdr, bar(Math.min(90,Math.round(tRm/Math.max(1,d.toRn)*100)),C1));
      }; })(k));
      sub('Hotel', C2, false, (function(k){ return function(d){
        var hRm=Math.round(d.hnRn*d[k]/100), hGpr=parseFloat(d.hAvgA)+parseFloat(d.hAvgC), hG=Math.round(hRm*hGpr), hRv=Math.round(hRm*d.adr);
        return sCell(hRm+' RN · '+hG+' G · '+((hRv>=1000)?'$'+Math.round(hRv/1000)+'k':'$'+hRv)+' · $'+d.adr, bar(Math.min(90,Math.round(hRm/Math.max(1,d.hnRn)*100)),C2));
      }; })(k));
    });
    sect('Summary', C1, C1, function(d){
      var _aiR=Math.round(d.hnRn*d.aiPct/100), _bbR=Math.round(d.hnRn*d.bbPct/100), _hbR=Math.round(d.hnRn*d.hbPct/100), _roR=Math.round(d.hnRn*d.roPct/100);
      return sBar([{p:d.aiPct,c:C1},{p:d.bbPct,c:C2},{p:d.hbPct,c:C3},{p:d.roPct,c:C4}])
        +'<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:3px">'
        +'<span style="font-size:12px;color:'+C1+'">AI '+d.aiPct+'% · '+_aiR+'</span>'
        +'<span style="font-size:12px;color:'+C2+'">BB '+d.bbPct+'% · '+_bbR+'</span>'
        +'<span style="font-size:12px;color:'+C3+'">HB '+d.hbPct+'% · '+_hbR+'</span>'
        +'<span style="font-size:12px;color:#6b7280">RO '+d.roPct+'% · '+_roR+'</span></div>';
    });
  }

  // ── Business Mix ──────────────────────────────────────────────────────────
  if (wvMetricState.bizMix) {
    grp('Business Mix', C1);
    sect('Business Mix', C1, C1, function(d){
      return sBar([{p:d.toMix,c:C1},{p:d.dirMix,c:C2},{p:d.otaMix,c:C3},{p:d.otherMix,c:'#9ca3af'}])
        +'<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:3px">'
        +'<span style="font-size:12px;color:'+C1+'">TO '+d.toMix+'%</span>'
        +'<span style="font-size:12px;color:'+C2+'">D '+d.dirMix+'%</span>'
        +'<span style="font-size:12px;color:'+C3+'">OTA '+d.otaMix+'%</span>'
        +'<span style="font-size:12px;color:#9ca3af">Oth '+d.otherMix+'%</span></div>';
    });
    sub('TO', C1, false, function(d){ return rCell(d.toMix+'%'); });
    sub('Direct', C2, false, function(d){ return rCell(d.dirMix+'%'); });
    sub('OTA', C3, false, function(d){ return rCell(d.otaMix+'%'); });
    sub('Other', '#9ca3af', false, function(d){ return rCell(d.otherMix+'%'); });
  }

  // ── Room Availability ─────────────────────────────────────────────────────
  if (wvMetricState.avail || wvMetricState.availAlloc) {
    grp('Room Availability', C1);
    RT_NAMES.forEach(function(name, rtI) {
      var inv = RT_CAPS[rtI];
      sect(name, C1, C1, (function(inv,rtI){ return function(d) {
        var sold=Math.min(inv,Math.floor(inv*d.hotel/110));
        var toS=Math.min(sold,Math.round(sold*d.to/Math.max(1,d.hotel)));
        var otS=sold-toS;
        var tent=Math.max(0,Math.floor(2+Math.abs((d.dm*(rtI+4)+d.dd*(rtI+2))%6)));
        var alRem=Math.max(0,Math.floor(inv*0.8+Math.abs((d.dm*(rtI+3)+d.dd*(rtI+5))%15))-toS);
        var avRm=Math.max(0,inv-sold-tent);
        var toP=Math.round(toS/inv*100),otP=Math.round(otS/inv*100),tnP=Math.round(tent/inv*100),alP=Math.round(alRem/inv*100);
        var avClr=avRm<=0?'#16a34a':C1;
        return '<div style="font-size:14px;color:'+avClr+';margin-bottom:5px">'
          +(avRm<=0?'0 available':avRm+' avail')
          +'<span style="font-size:12px;color:#9ca3af;margin-left:4px">/ '+inv+'</span></div>'
          +sBar([{p:toP,c:C1},{p:otP,c:C2},{p:tnP,c:'#967EF3'},{p:alP,c:C3},{p:Math.max(0,100-toP-otP-tnP-alP),c:C4}]);
      }; })(inv,rtI));
      sub('TO Sold', C1, false, (function(inv){ return function(d){ var s=Math.min(inv,Math.floor(inv*d.hotel/110)); return rCell(Math.min(s,Math.round(s*d.to/Math.max(1,d.hotel)))+' RN'); }; })(inv));
      sub('Other Segments', C2, false, (function(inv){ return function(d){ var s=Math.min(inv,Math.floor(inv*d.hotel/110)); var t=Math.min(s,Math.round(s*d.to/Math.max(1,d.hotel))); return rCell((s-t)+' RN'); }; })(inv));
      sub('Tentative Sold (Group)', '#967EF3', false, (function(inv,rtI){ return function(d){ var tent=Math.max(0,Math.floor(2+Math.abs((d.dm*(rtI+4)+d.dd*(rtI+2))%6))); return rCell(tent+' RN'); }; })(inv,rtI));
      sub('Out-of-Order', '#ef4444', false, (function(inv,rtI){ return function(d){ var ooo=Math.max(0,Math.floor(Math.abs((d.dm*(rtI+1)+d.dd*(rtI+3))%4))); return rCell(ooo+' RN'); }; })(inv,rtI));
      sub('Total Hotel Occupancy', CREM, true, (function(inv){ return function(d){ var avRm=Math.max(0,inv-Math.min(inv,Math.floor(inv*d.hotel/110))); return sCell(avRm+' RN', bar(Math.min(90,Math.round(avRm/inv*100)),'#16a34a')); }; })(inv));
    });
  }

  // ── Travel Co. Rates ──────────────────────────────────────────────────────
  if (wvMetricState.toRates) {
    grp('Travel Co. Rates', C1);
    TO_NAMES.forEach(function(name, toI) {
      sect(name, C1, C1, (function(toI){ return function(d) {
        var toRate=d.adr-15+Math.abs((d.dm*(toI+3)+d.dd*(toI+5))%50);
        var toAllot=5+Math.abs((d.dm*(toI+2)+d.dd*(toI+3))%20);
        var toUsed=Math.max(0,toAllot-Math.floor(d.hotel/20));
        var promoTxt=d.isEbbDay?'EBB 10%':'Contract', promoClr=d.isEbbDay?'#16a34a':'#2563eb';
        return '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">'
          +'<span style="font-size:14px;color:#111827">$'+toRate+'</span>'
          +'<span style="font-size:12px;color:#9ca3af">'+(toAllot-toUsed)+'r</span>'
          +'<span style="font-size:11px;font-weight:700;padding:1px 5px;border-radius:3px;background:'+promoClr+'22;color:'+promoClr+';border:1px solid '+promoClr+'44">'+promoTxt+'</span></div>'
          +bar(Math.round(toUsed/toAllot*100),C1);
      }; })(toI));
    });
    sect('Base Rate', C1, C1, function(d){ return sCell('$'+d.baseRate, bar(Math.min(90,Math.round(d.baseRate/280*100)),C1)); });
  }

  // ── Group header renderer ─────────────────────────────────────────────────
  function GrpRenderer() { this._iconEl=null; this._grpKey=null; }
  GrpRenderer.prototype.init = function(p) {
    var self=this, r=p.data;
    this._grpKey=r._grpKey;
    var isC=!!_wbCollapsed[r._grpKey], clr=r._clr;
    this.gui=document.createElement('div');
    this.gui.style.cssText='display:flex;align-items:center;gap:9px;width:100%;height:100%;box-sizing:border-box;cursor:pointer;user-select:none;padding:0 14px;background:#f8f9fd;border-left:3px solid '+clr+';border-top:1px solid #dde1e2;border-bottom:1px solid #dde1e2;';
    var iconWrap=document.createElement('span');
    this._iconEl=iconWrap;
    iconWrap.style.cssText='display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:20px;height:20px;border-radius:5px;background:'+clr+'22;color:'+clr+';box-shadow:0 1px 3px '+clr+'33;transform:rotate('+(isC?'-90deg':'0deg')+');transition:transform .2s ease;';
    iconWrap.innerHTML='<span class="material-icons" style="font-size:12px">expand_more</span>';
    var label=document.createElement('span');
    label.style.cssText='font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.65px;color:#1e2d3a;';
    label.textContent=r._lbl;
    this.gui.appendChild(iconWrap); this.gui.appendChild(label);
    this.gui.addEventListener('click', function(){ _toggleDBGrp(r._grpKey); });
    _dbGrpRenderrs.push(self);
  };
  GrpRenderer.prototype._syncChev=function(){ if(this._iconEl) this._iconEl.style.transform='rotate('+(_wbCollapsed[this._grpKey]?'-90deg':'0deg')+')'; };
  GrpRenderer.prototype.getGui=function(){ return this.gui; };
  GrpRenderer.prototype.destroy=function(){ var i=_dbGrpRenderrs.indexOf(this); if(i!==-1) _dbGrpRenderrs.splice(i,1); };

  // ── Day header factory ────────────────────────────────────────────────────
  function makeDayHeader(dv, isActive, isToday, isLocked, dba, evts) {
    var dm=dv.month, dd=dv.day;
    var bg=isLocked?'#374151':isActive?'#006461':isToday?'#125756':'#1a5e5b';
    var tb=isActive?'3px solid rgba(255,255,255,0.5)':isToday?'3px solid rgba(255,255,255,0.3)':isLocked?'3px solid #D32F2F':'3px solid transparent';
    var dc=isLocked?'#fca5a5':'#fff', sc=isLocked?'rgba(252,165,165,0.85)':'rgba(255,255,255,0.75)';
    var dbaStr=dba===0?'Today':dba>0?dba+' DBA':'';
    function H(){}
    H.prototype.init=function(){ this.gui=document.createElement('div'); this.gui.style.cssText='background:'+bg+';width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px 6px;box-sizing:border-box;gap:2px;border-top:'+tb+';border-right:1px solid rgba(255,255,255,0.12);'; this.gui.innerHTML='<div style="font-weight:700;font-size:13px;color:'+dc+'">'+(isLocked?'🔒 ':'')+DOW_SHORT[new Date(2026,dm-1,dd).getDay()]+' '+dd+'</div><div style="font-size:11px;color:'+sc+';display:flex;align-items:center;gap:4px"><span>'+MNAMES_S[dm]+'</span>'+(dbaStr?'<span style="background:rgba(255,255,255,0.2);border-radius:3px;padding:0 4px;font-size:10px;color:#fff">'+dbaStr+'</span>':'')+(evts?'<span style="width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.9);display:inline-block"></span>':'')+'</div>'; };
    H.prototype.getGui=function(){ return this.gui; };
    H.prototype.destroy=function(){};
    return H;
  }

  // ── Column defs ───────────────────────────────────────────────────────────
  var colDefs = [];
  colDefs.push({
    field:'_lbl', headerName:'', pinned:'left', lockPinned:true, width:190,
    suppressMovable:true, resizable:false,
    cellRenderer: function(p) {
      var r=p.data;
      if (r._type==='sect') {
        var el=document.createElement('div');
        el.style.cssText='display:flex;align-items:center;gap:6px;width:100%;height:100%;box-sizing:border-box;user-select:none;padding:0 10px 0 8px;'+(r._noChev?'':'cursor:pointer;');
        if (!r._noChev) {
          var iw=document.createElement('span');
          var isC=!!_wbCollapsed[r._sectKey];
          iw.style.cssText='display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:16px;height:16px;border-radius:4px;background:'+r._clr+'18;color:'+r._clr+';transform:rotate('+(isC?'-90deg':'0deg')+');transition:transform .2s ease;';
          iw.innerHTML='<span class="material-icons" style="font-size:11px">expand_more</span>';
          el.appendChild(iw);
          el.addEventListener('click', function(){ _toggleDBSect(r._sectKey); });
        }
        var lbl=document.createElement('span');
        lbl.style.cssText='font-size:14px;font-weight:400;color:#1c1c1c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:Lato,sans-serif;';
        lbl.textContent=r._lbl;
        el.appendChild(lbl);
        return el;
      }
      var el2=document.createElement('div');
      el2.style.cssText='display:flex;align-items:center;gap:5px;padding:0 8px 0 26px;width:100%;height:100%;box-sizing:border-box;font-family:Lato,sans-serif;';
      if (r._dot) { var dot=document.createElement('span'); dot.style.cssText='width:9px;height:9px;border-radius:2px;background:'+r._dot+';flex-shrink:0;display:inline-block;'; el2.appendChild(dot); }
      var lb2=document.createElement('span');
      lb2.style.cssText='font-size:14px;color:'+(r._isRem?'#388c3f':'#1c1c1c')+';font-weight:'+(r._isRem?'600':'400')+';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      lb2.textContent=r._lbl; el2.appendChild(lb2);
      return el2;
    },
    cellStyle: function(p) {
      var r=p.data;
      if (r._type==='sect') return {background:'#fff',borderBottom:'1px solid #dde1e2',borderRight:'2px solid #dde1e2',display:'flex',alignItems:'center'};
      return {background:r._isRem?'#fff8f5':'#fff',borderBottom:'1px solid #f3f4f6',borderRight:'2px solid #dde1e2'};
    },
  });

  days.forEach(function(dv, di) {
    var dm=dv.month, dd=dv.day;
    var isToday=dm===3&&dd===9, isActive=dm===month&&dd===activeDay;
    var isLocked=LOCKED_DAYS.has(dm+'-'+dd);
    var dt=new Date(2026,dm-1,dd), dba=Math.round((dt-TODAY_WV)/86400000);
    var evts=(typeof CAL_EVENTS!=='undefined'&&CAL_EVENTS[dm+'-'+dd])?CAL_EVENTS[dm+'-'+dd]:null;
    colDefs.push({
      field:'day'+di, flex:1, minWidth:90, suppressMovable:true, resizable:false,
      headerComponent: makeDayHeader(dv,isActive,isToday,isLocked,dba,evts),
      cellRenderer: function(p) {
        var r=p.data; if(r._type==='grp') return '';
        var d=dd7[di]; return r._fn?r._fn(d):'';
      },
      cellStyle: function(p) {
        var r=p.data;
        if (r._type==='sect') return {background:'#fff',padding:'7px 0 5px',borderBottom:'1px solid #dde1e2',borderRight:'1px solid #e5e7eb'};
        return {background:r._isRem?'#fff8f5':'#fff',padding:'0 10px',borderBottom:'1px solid #f3f4f6',borderRight:'1px solid #e5e7eb',display:'flex',alignItems:'center'};
      },
    });
  });

  // ── Create grid ───────────────────────────────────────────────────────────
  _dailyBGridApi = AG.createGrid(wrapper, {
    columnDefs: colDefs,
    rowData: _getDBVisibleRows(),
    headerHeight: 50,
    domLayout: 'autoHeight',
    suppressHorizontalScroll: false,
    alwaysShowHorizontalScroll: true,
    suppressCellFocus: true,
    suppressRowClickSelection: true,
    getRowHeight: function(p) {
      if (p.data._type==='grp')  return 40;
      if (p.data._type==='sect') return 58;
      return 33;
    },
    isFullWidthRow: function(p) { return p.rowNode.data._type==='grp'; },
    fullWidthCellRenderer: GrpRenderer,
    defaultColDef: { sortable:false, resizable:false },
    getRowStyle: function(p) {
      var t=p.data._type;
      if (t==='grp')  return {borderTop:'1px solid #dde1e2',borderBottom:'1px solid #dde1e2'};
      if (t==='sect') return {background:'#fff'};
      return {background:p.data._isRem?'#fff8f5':'#fff'};
    },
  });
}

// ── Daily H View — horizontal layout with sticky label column ─────────────────
function buildDailyHView(days, activeMonth, activeDay) {
  var DOW_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MNAMES_S  = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var TODAY_WV  = new Date(2026, 2, 9);
  var WV_CAP    = 250;

  // ── Per-day computed data ─────────────────────────────────────────────────
  var dayData = days.map(function(dv) {
    var dm = dv.month, dd = dv.day;
    var hh = getOccupancy(dm, dd); var hotel = hh.hotel, to = hh.to;
    var adr = 150 + Math.abs((dm*47+dd*31)%130);
    var v   = Math.abs((dm*127+dd*53+dm*dd*7+dd*dd*3))%100;
    var toAdr = Math.max(80, adr-20-Math.abs((dm*3+dd*7)%15));
    var toRn  = Math.round(WV_CAP * to / 100);
    var hnRn  = Math.round(WV_CAP * hotel / 100);
    var toRev = Math.floor(toRn * toAdr);
    var hnRev = Math.floor(hnRn * adr);
    var otherPct = Math.max(0, hotel - to), freePct = Math.max(0, 100 - hotel);
    var toRms = toRn, otherRms = Math.round(WV_CAP*otherPct/100);
    var freeRms = WV_CAP - toRms - otherRms;
    var fitPct = Math.round(to*0.45), dynPct = Math.round(to*0.35), serPct = to - fitPct - dynPct;
    var onlinePct = Math.max(30, Math.min(80, 45+Math.abs((dm*13+dd*7)%35)));
    var adrBar = Math.min(95, 40+Math.abs((dm*11+dd*19)%55));
    var revBar = Math.min(95, 35+Math.abs((dm*17+dd*13)%60));
    var revpar = Math.max(50, (adr+80)-30-Math.abs((dm*5+dd*3)%20));
    var pickup = Math.max(0, Math.floor((v%25+5)*to/Math.max(1,hotel)));
    var hPickup = Math.floor(v%25+5);
    var sdlyH=Math.max(5,hotel-9), lyH=Math.max(5,hotel-6), fcstH=Math.min(100,hotel+4);
    var sdlyA=adr-8, lyA=adr-4, fcstA=adr+6;
    var sdlyR=Math.floor(hnRev*0.9), lyR=Math.floor(hnRev*0.95), fcstR=Math.floor(hnRev*1.06);
    function fR(v){return v>=1000000?'$'+(v/1000000).toFixed(1)+'M':'$'+Math.round(v/1000)+'k';}
    var avgA=(1.8+v%3*0.1).toFixed(1), avgC=(0.3+v%2*0.1).toFixed(1);
    var hAvgA=(parseFloat(avgA)+0.3).toFixed(1), hAvgC=(parseFloat(avgC)+0.1).toFixed(1);
    var totG=Math.round(toRn*(parseFloat(avgA)+parseFloat(avgC)));
    var hTotG=Math.round(hnRn*(parseFloat(hAvgA)+parseFloat(hAvgC)));
    var totAT=Math.round(toRn*parseFloat(avgA)), totCT=Math.round(toRn*parseFloat(avgC));
    var totAH=Math.round(hnRn*parseFloat(hAvgA)), totCH=Math.round(hnRn*parseFloat(hAvgC));
    var avgLos=(2.8+v%5*0.3).toFixed(1)+'n', hLos=(2.8+v%5*0.3+0.4).toFixed(1)+'n';
    var avgLead=(18+v%60)+'d', hLead=(18+v%60+12)+'d';
    var availRooms=Math.max(0,102-Math.floor(hotel*1.02));
    var availGuar=Math.floor(8+v%5);
    var aiPct=Math.max(45,Math.min(68,55+(dm*7+dd*3)%14));
    var bbPct=Math.max(14,Math.min(28,20+(dm*11+dd*5)%11));
    var hbPct=Math.max(6,Math.min(16,10+(dm*5+dd*7)%9));
    var roPct=100-aiPct-bbPct-hbPct;
    var toPct=to/Math.max(1,hotel);
    var toMix=28+Math.abs((dm*7+dd*5)%25), dirMix=30+Math.abs((dm*5+dd*9)%20), otaMix=20+Math.abs((dm*9+dd*3)%18);
    var otherMix=Math.max(0,100-toMix-dirMix-otaMix);
    var tcRates=[0,1,2,3,4].map(function(i){return adr-15+Math.abs((dm*(i+3)+dd*(i+5))%50);});
    var baseRate=adr+8;
    var isEbbDay=(new Date(2026,dm-1,dd)).getDay()<3;
    var sdlyRn=Math.round(toRn*0.88), lyRn=Math.round(toRn*0.93), fcstRn=Math.round(toRn*1.06);
    var sdlyRevpar=Math.max(40,revpar-8), lyRevpar=Math.max(40,revpar-4);
    return {dm,dd,hotel,to,adr,toAdr,toRn,hnRn,toRev,hnRev,otherPct,freePct,toRms,otherRms,freeRms,
      fitPct,dynPct,serPct,onlinePct,adrBar,revBar,revpar,sdlyRevpar,lyRevpar,pickup,hPickup,
      sdlyH,lyH,fcstH,sdlyA,lyA,fcstA,sdlyR,lyR,fcstR,fR,
      avgA,avgC,hAvgA,hAvgC,totG,hTotG,totAT,totCT,totAH,totCH,
      avgLos,hLos,avgLead,hLead,availRooms,availGuar,
      aiPct,bbPct,hbPct,roPct,toPct,toMix,dirMix,otaMix,otherMix,
      tcRates,baseRate,isEbbDay,sdlyRn,lyRn,fcstRn};
  });

  // ── Cell renderers ─────────────────────────────────────────────────────────
  // Segmented bar (like wv-occ-bar-track)
  function segBar(segs, ticks) {
    return '<div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;position:relative;margin:2px 0">'
      + segs.map(function(s){return '<div style="position:absolute;top:0;left:'+s.o+'%;width:'+s.w+'%;height:100%;background:'+s.c+'"></div>';}).join('')
      + (ticks||'')
      + '</div>';
  }
  // Simple horizontal bar (T solid, Hotel faded behind)
  function dualBar(tPct, hPct, clr) {
    return '<div style="height:4px;background:#e5e7eb;border-radius:2px;position:relative;margin:3px 0">'
      + (hPct!=null?'<div style="position:absolute;top:0;left:0;height:100%;width:'+Math.min(92,hPct)+'%;background:#d1d5db;border-radius:2px"></div>':'')
      + '<div style="position:absolute;top:0;left:0;height:100%;width:'+Math.min(92,tPct)+'%;background:'+clr+';border-radius:2px"></div>'
      + '</div>';
  }
  // Stacked bar (for meal plans / biz mix)
  function stackBar(segs) {
    return '<div style="height:5px;background:#e5e7eb;border-radius:3px;display:flex;overflow:hidden;margin:3px 0">'
      + segs.map(function(s){return '<div style="width:'+s.p+'%;background:'+s.c+'"></div>';}).join('')
      + '</div>';
  }
  // Ref chips row
  function refChips(pairs) {
    var CSS = {stly:'background:#e0e7ff;color:#4338ca',ly:'background:#dcfce7;color:#15803d',fcst:'background:#fef9c3;color:#a16207'};
    return '<div style="display:flex;gap:2px;flex-wrap:wrap;margin-top:2px">'
      + pairs.filter(Boolean).map(function(p){
          var s=CSS[p.k]||'background:#f3f4f6;color:#374151';
          return '<span style="font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;'+s+'">'+p.lbl+' '+p.v+'</span>';
        }).join('')
      + '</div>';
  }
  // Promo badge
  function promoBadge(d) {
    var clr = d.isEbbDay?'#16a34a':'#2563eb';
    var lbl = d.isEbbDay?'EBB 10%':'Contract';
    return '<span style="font-size:7.5px;font-weight:700;padding:1px 5px;border-radius:3px;background:'+clr+'20;color:'+clr+';border:1px solid '+clr+'44">'+lbl+'</span>';
  }
  // Value + Hotel chip inline
  function valH(tVal, hVal, tClr) {
    return '<div style="display:flex;align-items:baseline;gap:4px;justify-content:space-between">'
      + '<span style="font-size:8px;color:#9ca3af">'+hVal+'</span>'
      + '<span style="font-size:11px;font-weight:800;color:'+tClr+'">'+tVal+'</span>'
      + '</div>';
  }

  // ── Row definitions ─────────────────────────────────────────────────────────
  var ROWS = [];
  function sec(lbl,clr)  { ROWS.push({type:'sec',lbl:lbl,clr:clr||'#374151'}); }
  function par(lbl,clr)  { ROWS.push({type:'par',lbl:lbl,clr:clr||'#374151'}); }
  function row(lbl,fn)   { ROWS.push({type:'row',lbl:lbl,fn:fn}); }

  // ── DAILY METRICS ─────────────────────────────────────────────────────────
  sec('Daily Metrics','#006461');
  par('Occupancy','#006461');
  row('T / Hotel', function(d){
    var segs=[
      {o:0,      w:d.fitPct,   c:'#006461'},
      {o:d.fitPct,w:d.dynPct,  c:'#0891b2'},
      {o:d.fitPct+d.dynPct,w:d.serPct,c:'#6366f1'},
      {o:d.to,   w:Math.max(0,d.otherPct), c:'#5883ed'},
    ];
    var chips = [];
    if(wvCompare.size > 0) chips.push({k:'stly',lbl:'STLY',v:d.sdlyH+'%'});
    if(wvCompare.size > 0) chips.push({k:'ly',  lbl:'LY',  v:d.lyH+'%'});
    if(wvCompare.size > 0) chips.push({k:'fcst',lbl:'Fcst',v:d.fcstH+'%'});
    return valH(d.to+'%', d.hotel+'%', '#006461')
      + segBar(segs)
      + (chips.length > 0 ? refChips(chips) : '');
  });
  row('Online / Offline', function(d){
    return stackBar([{p:d.onlinePct,c:'#3b82f6'},{p:100-d.onlinePct,c:'#f97316'}])
      +'<div style="display:flex;justify-content:space-between">'
      +'<span style="font-size:8px;color:#3b82f6">'+d.onlinePct+'% online</span>'
      +'<span style="font-size:8px;color:#f97316">'+(100-d.onlinePct)+'% offline</span>'
      +'</div>';
  });

  par('ADR','#7c3aed');
  row('T / Hotel', function(d){
    var df=d.toAdr-d.adr;
    var chips = [];
    if(wvCompare.size > 0) chips.push({k:'stly',lbl:'STLY',v:'$'+d.sdlyA});
    if(wvCompare.size > 0) chips.push({k:'ly',lbl:'LY',v:'$'+d.lyA});
    if(wvCompare.size > 0) chips.push({k:'fcst',lbl:'Fcst',v:'$'+d.fcstA});
    return valH('$'+d.toAdr,'$'+d.adr,'#7c3aed')
      + dualBar(d.adrBar, Math.min(95,d.adrBar+12), '#7c3aed')
      + '<div style="display:flex;align-items:center;gap:4px;margin-top:2px">'
      + '<span style="font-size:8px;font-weight:700;color:'+(df<=0?'#16a34a':'#dc2626')+'">'+(df>=0?'+':'−')+'$'+Math.abs(df)+' diff</span>'
      + '</div>'
      + (chips.length > 0 ? refChips(chips) : '');
  });

  par('Revenue','#ea580c');
  row('T / Hotel', function(d){
    var chips = [];
    if(wvCompare.size > 0) chips.push({k:'stly',lbl:'STLY',v:d.fR(d.sdlyR)});
    if(wvCompare.size > 0) chips.push({k:'ly',lbl:'LY',v:d.fR(d.lyR)});
    if(wvCompare.size > 0) chips.push({k:'fcst',lbl:'Fcst',v:d.fR(d.fcstR)});
    return valH(d.fR(d.toRev), d.fR(d.hnRev), '#ea580c')
      + dualBar(d.revBar, Math.min(95,d.revBar+10), '#ea580c')
      + (chips.length > 0 ? refChips(chips) : '');
  });

  par('RevPAR','#9333ea');
  row('T / Hotel', function(d){
    var chips = [];
    if(wvCompare.size > 0) chips.push({k:'stly',lbl:'STLY',v:'$'+d.sdlyRevpar});
    if(wvCompare.size > 0) chips.push({k:'ly',lbl:'LY',v:'$'+d.lyRevpar});
    return valH('$'+d.revpar, '$'+(d.revpar+22), '#9333ea')
      + dualBar(Math.round(d.revpar/4), Math.round((d.revpar+22)/4), '#9333ea')
      + (chips.length > 0 ? refChips(chips) : '');
  });

  par('Pickup','#16a34a');
  row('T / Hotel', function(d){
    return valH('+'+d.pickup, '+'+d.hPickup, '#16a34a');
  });

  // Segments
  par('Segments (T)','#0891b2');
  row('FIT / Dyn / Series', function(d){
    return stackBar([{p:d.fitPct,c:'#006461'},{p:d.dynPct,c:'#0891b2'},{p:d.serPct,c:'#6366f1'}])
      +'<div style="display:flex;gap:6px;font-size:8px;flex-wrap:wrap;margin-top:1px">'
      +'<span style="color:#006461">FIT '+d.fitPct+'%</span>'
      +'<span style="color:#0891b2">Dyn '+d.dynPct+'%</span>'
      +'<span style="color:#6366f1">Series '+d.serPct+'%</span>'
      +'</div>';
  });

  // ── MORE METRICS ──────────────────────────────────────────────────────────
  sec('More Metrics','#2e65e8');
  par('RN Sold','#2e65e8');
  row('T / Hotel', function(d){
    var chips = [];
    if(wvCompare.size > 0) chips.push({k:'stly',lbl:'STLY',v:d.sdlyRn});
    if(wvCompare.size > 0) chips.push({k:'ly',lbl:'LY',v:d.lyRn});
    if(wvCompare.size > 0) chips.push({k:'fcst',lbl:'Fcst',v:d.fcstRn});
    return valH(d.toRn, d.hnRn, '#2e65e8')
      + dualBar(Math.round(d.toRn/WV_CAP*100), Math.round(d.hnRn/WV_CAP*100), '#2e65e8')
      + (chips.length > 0 ? refChips(chips) : '');
  });

  par('Avg Adults','#2e65e8');
  row('T / Hotel', function(d){ return valH(d.avgA, d.hAvgA, '#2e65e8'); });

  par('Avg Children','#d33030');
  row('T / Hotel', function(d){ return valH(d.avgC, d.hAvgC, '#d33030'); });

  par('Total Adults','#2e65e8');
  row('T / Hotel', function(d){ return valH(d.totAT, d.totAH, '#2e65e8'); });

  par('Total Children','#d33030');
  row('T / Hotel', function(d){ return valH(d.totCT, d.totCH, '#d33030'); });

  par('Total Guests','#0369a1');
  row('T / Hotel', function(d){ return valH(d.totG, d.hTotG, '#0369a1'); });

  par('Avg LOS','#0891b2');
  row('T / Hotel', function(d){ return valH(d.avgLos, d.hLos, '#0891b2'); });

  par('Lead Time','#6366f1');
  row('T / Hotel', function(d){ return valH(d.avgLead, d.hLead, '#6366f1'); });

  par('Avail Rooms','#16a34a');
  row('Hotel', function(d){ return '<span style="font-size:11px;font-weight:800;color:#16a34a">'+d.availRooms+' rm</span>'; });

  par('Avail Guar.','#ea580c');
  row('T', function(d){ return '<span style="font-size:11px;font-weight:800;color:#ea580c">'+d.availGuar+' rm</span>'; });

  // ── MEAL PLANS ────────────────────────────────────────────────────────────
  sec('Meal Plans','#967EF3');
  var mpDefs = [['All Inclusive','#006461','aiPct'],['Bed & Bkfst','#3b82f6','bbPct'],['Half Board','#967EF3','hbPct'],['Room Only','#f59e0b','roPct']];
  mpDefs.forEach(function(mp){
    par(mp[0],mp[1]);
    var key=mp[2];
    row('Hotel / TO %', function(d){
      var hPct = d[key];
      var toPct2 = Math.max(0, Math.round(hPct * d.toPct * 0.9));
      return valH(hPct+'%', 'TO '+toPct2+'%', mp[1])
        + dualBar(hPct, null, mp[1]);
    });
  });
  // Summary stacked bar
  par('Summary','#967EF3');
  row('AI / BB / HB / RO', function(d){
    return stackBar([{p:d.aiPct,c:'#006461'},{p:d.bbPct,c:'#3b82f6'},{p:d.hbPct,c:'#967EF3'},{p:d.roPct,c:'#f59e0b'}])
      +'<div style="display:flex;gap:5px;font-size:8px;flex-wrap:wrap">'
      +'<span style="color:#006461">AI '+d.aiPct+'%</span>'
      +'<span style="color:#3b82f6">BB '+d.bbPct+'%</span>'
      +'<span style="color:#967EF3">HB '+d.hbPct+'%</span>'
      +'<span style="color:#f59e0b">RO '+d.roPct+'%</span>'
      +'</div>';
  });

  // ── BUSINESS MIX ─────────────────────────────────────────────────────────
  sec('Business Mix','#0284c7');
  par('TO / Direct / OTA','#0284c7');
  row('Mix %', function(d){
    return stackBar([{p:d.toMix,c:'#006461'},{p:d.dirMix,c:'#0284c7'},{p:d.otaMix,c:'#D97706'},{p:d.otherMix,c:'#9ca3af'}])
      +'<div style="display:flex;gap:5px;font-size:8px;flex-wrap:wrap">'
      +'<span style="color:#006461">TO '+d.toMix+'%</span>'
      +'<span style="color:#0284c7">Direct '+d.dirMix+'%</span>'
      +'<span style="color:#D97706">OTA '+d.otaMix+'%</span>'
      +'<span style="color:#9ca3af">Other '+d.otherMix+'%</span>'
      +'</div>';
  });

  // ── TRAVEL CO. RATES ─────────────────────────────────────────────────────
  sec('Travel Co. Rates','#0f766e');
  var toOps=[['Sunshine Tours','#3b82f6'],['Global Adv.','#967EF3'],['Beach Hols','#0ea5e9'],['City Breaks','#10b981'],['Adventure','#f59e0b']];
  toOps.forEach(function(op,i){
    par(op[0],op[1]);
    row('Rate / Promo', function(d){
      return '<div style="display:flex;align-items:center;justify-content:space-between;gap:4px">'
        +'<span style="font-size:11px;font-weight:800;color:'+op[1]+'">$'+d.tcRates[i]+'</span>'
        +promoBadge(d)
        +'</div>';
    });
  });
  par('Base Rate','#9333ea');
  row('Rate', function(d){
    return '<span style="font-size:11px;font-weight:800;color:#9333ea">$'+d.baseRate+'</span>';
  });

  // ── Build table ─────────────────────────────────────────────────────────────
  var LABEL_W = '140px';
  var thBase = 'padding:5px 8px;font-size:10px;font-weight:700;text-align:center;border-left:1px solid rgba(255,255,255,.2)';

  var hdrRow = '<tr>'
    +'<th style="position:sticky;left:0;z-index:6;background:#1a5e5b;color:#fff;padding:6px 10px;min-width:'+LABEL_W+';text-align:left;border-right:2px solid #006461;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.4px">Metric</th>';
  days.forEach(function(dv) {
    var dm=dv.month, dd=dv.day;
    var isToday=dm===3&&dd===9, isActive=dm===activeMonth&&dd===activeDay;
    var isLocked=LOCKED_DAYS.has(dm+'-'+dd);
    var dt=new Date(2026,dm-1,dd);
    var dba=Math.round((dt-TODAY_WV)/86400000);
    var dbaStr=dba===0?'Today':dba>0?dba+' DBA':'';
    var evts=(typeof CAL_EVENTS!=='undefined'&&CAL_EVENTS[dm+'-'+dd])?CAL_EVENTS[dm+'-'+dd]:null;
    var bg=isLocked?'#D32F2F':isActive?'#006461':isToday?'#0d8a87':'#1a5e5b';
    var bl=isActive?'2px solid #C4FF45':isToday?'2px solid rgba(255,255,255,.5)':'1px solid rgba(255,255,255,.15)';
    hdrRow+='<th style="'+thBase+';background:'+bg+';border-left:'+bl+';min-width:130px;color:#fff;vertical-align:top">'
      +'<div style="font-weight:800;font-size:11px">'+(isLocked?'🔒 ':'')+MNAMES_S[dm]+' '+dd+'</div>'
      +'<div style="display:flex;align-items:center;justify-content:center;gap:4px;font-size:8px;opacity:.85">'
      +'<span>'+DOW_SHORT[dt.getDay()]+'</span>'
      +(dbaStr?'<span>'+dbaStr+'</span>':'')
      +(evts?'<span style="width:7px;height:7px;border-radius:2px;background:#C4FF45;display:inline-block" title="'+evts.map(function(e){return e.name;}).join(', ')+'"></span>':'')
      +'</div>'
      +'</th>';
  });
  hdrRow += '</tr>';

  var dataRows = ROWS.map(function(r, ri) {
    if (r.type === 'sec') {
      return '<tr><td colspan="'+(days.length+1)+'" style="background:'+r.clr+';color:#fff;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;padding:5px 10px;position:sticky;left:0">'+r.lbl+'</td></tr>';
    }
    if (r.type === 'par') {
      return '<tr style="background:#f8fafc"><td style="position:sticky;left:0;z-index:4;background:#f1f5f9;padding:4px 10px 4px 14px;font-size:9px;font-weight:700;color:'+r.clr+';border-right:2px solid #006461;border-bottom:1px solid #e5e7eb;white-space:nowrap">'
        +r.lbl+'</td>'
        +days.map(function(){return '<td style="background:#f8fafc;border-bottom:1px solid #e5e7eb;border-left:1px solid #f0f0f0"></td>';}).join('')
        +'</tr>';
    }
    // value row — alternating bg
    var bg = ri%2===0?'#fff':'#fafafa';
    var cells = days.map(function(dv, di) {
      var d = dayData[di];
      var isLocked = LOCKED_DAYS.has(d.dm+'-'+d.dd);
      if (isLocked) {
        return '<td style="text-align:center;padding:5px 8px;font-size:11px;color:#9ca3af;border-left:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6">—</td>';
      }
      var html = r.fn(d);
      return '<td style="padding:5px 8px;vertical-align:top;border-left:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6;min-width:130px">'+html+'</td>';
    }).join('');
    return '<tr style="background:'+bg+'">'
      +'<td style="position:sticky;left:0;z-index:4;background:'+bg+';padding:4px 10px 4px 24px;font-size:8.5px;font-weight:600;color:#6b7280;border-right:2px solid #006461;border-bottom:1px solid #f3f4f6;white-space:nowrap">'+r.lbl+'</td>'
      +cells+'</tr>';
  }).join('');

  return '<div class="wv-report-wrap"><table class="wv-report-tbl"><thead>'+hdrRow+'</thead><tbody>'+dataRows+'</tbody></table></div>';
}

window.calToggleMonthlySummary = function() {
  var detail = document.getElementById('calMsDetail');
  var chev   = document.getElementById('calMsChev');
  if (!detail) return;
  var open = detail.style.display === 'none' || !detail.style.display;
  detail.style.display = open ? 'block' : 'none';
  if (chev) chev.style.transform = open ? 'rotate(180deg)' : '';
  window._calMsSummaryOpen = open;
};

var _wv7dAccState = {};
var _wv7dSummaryData = null;

window.wv7dToggle = function(id) {
  _wv7dAccState[id] = !_wv7dAccState[id];
  var c = document.getElementById('wvSummaryContainer');
  if (c && _wv7dSummaryData) c.innerHTML = _buildWv7dSummaryHtml(_wv7dSummaryData);
};

window._buildWv7dSummaryHtml = function(d) {
  var WV = 250;
  var tcOps = [['Sunshine Tours','#3b82f6'],['Global Adv.','#967EF3'],['Beach Hols','#0ea5e9'],['City Breaks','#10b981'],['Adventure','#f59e0b']];
  var chevUp   = '<span class="material-icons" style="font-size:16px">expand_less</span>';
  var chevDown = '<span class="material-icons" style="font-size:16px">expand_more</span>';

  function bar(pct, clr) {
    return '<div class="wv-occ-bar-track"><div style="width:'+Math.min(92,pct)+'%;background:'+clr+';height:6px"></div></div>';
  }
  function stackBar(segs) {
    return '<div class="wv-occ-bar-track">'
      +segs.map(function(s){return '<div style="width:'+s.p+'%;background:'+s.c+';height:6px"></div>';}).join('')+'</div>';
  }
  function refChips(pairs) {
    var CSS={stly:'background:#e0e7ff;color:#4338ca',ly:'background:#dcfce7;color:#15803d',fcst:'background:#fef9c3;color:#a16207'};
    return '<div style="display:flex;gap:2px;flex-wrap:wrap;margin-top:2px">'
      +pairs.map(function(p){return '<span style="font-size:7px;font-weight:700;padding:1px 4px;border-radius:3px;'+CSS[p.k]+'">'+p.l+' '+p.v+'</span>';}).join('')+'</div>';
  }

  // Row definitions (same groups as monthly)
  var rows = [];
  rows.push({type:'top', id:'wv7d_co', label:'Close Outs'});
  rows.push({type:'sect', id:'mos_co_full', label:'Full Close Out', parent:'wv7d_co'});
  rows.push({type:'sect', id:'mos_co_part', label:'Partial Lock', parent:'wv7d_co'});

  rows.push({type:'top', id:'wv7d_daily', label:'Daily Metrics'});
  rows.push({type:'sect', id:'mos_occ', label:'Occupancy', parent:'wv7d_daily'});
  rows.push({type:'sub', id:'mos_occ_to',   label:'TO',    dot:'#004948', parent:'mos_occ', gp:'wv7d_daily'});
  rows.push({type:'sub', id:'mos_occ_htl',  label:'Hotel', dot:'#52d9ce', parent:'mos_occ', gp:'wv7d_daily'});
  rows.push({type:'sect', id:'mos_adr', label:'ADR', parent:'wv7d_daily'});
  rows.push({type:'sub', id:'mos_adr_to',  label:'TO ADR',    dot:'#004948', parent:'mos_adr', gp:'wv7d_daily'});
  rows.push({type:'sub', id:'mos_adr_htl', label:'Hotel ADR', dot:'#52d9ce', parent:'mos_adr', gp:'wv7d_daily'});
  rows.push({type:'sect', id:'mos_rev', label:'Revenue', parent:'wv7d_daily'});
  rows.push({type:'sub', id:'mos_rev_to',  label:'TO Revenue',    dot:'#004948', parent:'mos_rev', gp:'wv7d_daily'});
  rows.push({type:'sub', id:'mos_rev_htl', label:'Hotel Revenue', dot:'#52d9ce', parent:'mos_rev', gp:'wv7d_daily'});
  rows.push({type:'sect', id:'mos_revpar', label:'RevPAR', parent:'wv7d_daily'});
  rows.push({type:'sect', id:'mos_pickup', label:'Pickup', parent:'wv7d_daily'});
  rows.push({type:'sect', id:'mos_onoff', label:'Online / Offline', parent:'wv7d_daily'});
  rows.push({type:'sub', id:'mos_onoff_on',  label:'Online',  dot:'#3b82f6', parent:'mos_onoff', gp:'wv7d_daily'});
  rows.push({type:'sub', id:'mos_onoff_off', label:'Offline', dot:'#f97316', parent:'mos_onoff', gp:'wv7d_daily'});


  rows.push({type:'top', id:'wv7d_more', label:'More Metrics'});
  rows.push({type:'sect', id:'mos_rn',    label:'RN Sold',       parent:'wv7d_more'});
  rows.push({type:'sect', id:'mos_avga',  label:'Avg Adults',    parent:'wv7d_more'});
  rows.push({type:'sect', id:'mos_avgc',  label:'Avg Children',  parent:'wv7d_more'});
  rows.push({type:'sect', id:'mos_tota',  label:'Total Adults',  parent:'wv7d_more'});
  rows.push({type:'sect', id:'mos_totc',  label:'Total Children',parent:'wv7d_more'});
  rows.push({type:'sect', id:'mos_totg',  label:'Total Guests',  parent:'wv7d_more'});
  rows.push({type:'sect', id:'mos_los',   label:'Avg LOS',       parent:'wv7d_more'});
  rows.push({type:'sect', id:'mos_lead',  label:'Lead Time',     parent:'wv7d_more'});
  rows.push({type:'sect', id:'mos_avail', label:'Avail Rooms',   parent:'wv7d_more'});
  rows.push({type:'sect', id:'mos_availg',label:'Avail Guar.',   parent:'wv7d_more'});

  rows.push({type:'top', id:'wv7d_meals', label:'Meal Plans'});
  rows.push({type:'sect', id:'mos_mpsum', label:'Summary', parent:'wv7d_meals'});
  rows.push({type:'sub', id:'mos_mp_ai', label:'All Inclusive',  dot:'#006461', parent:'mos_mpsum', gp:'wv7d_meals'});
  rows.push({type:'sub', id:'mos_mp_bb', label:'Bed & Breakfast',dot:'#3b82f6', parent:'mos_mpsum', gp:'wv7d_meals'});
  rows.push({type:'sub', id:'mos_mp_hb', label:'Half Board',     dot:'#967EF3', parent:'mos_mpsum', gp:'wv7d_meals'});
  rows.push({type:'sub', id:'mos_mp_ro', label:'Room Only',      dot:'#f59e0b', parent:'mos_mpsum', gp:'wv7d_meals'});

  rows.push({type:'top', id:'wv7d_biz', label:'Business Mix'});
  rows.push({type:'sect', id:'mos_bizbar', label:'Summary', parent:'wv7d_biz'});
  rows.push({type:'sub', id:'mos_biz_to',  label:'TO',     dot:'#006461', parent:'mos_bizbar', gp:'wv7d_biz'});
  rows.push({type:'sub', id:'mos_biz_dir', label:'Direct', dot:'#0284c7', parent:'mos_bizbar', gp:'wv7d_biz'});
  rows.push({type:'sub', id:'mos_biz_ota', label:'OTA',    dot:'#D97706', parent:'mos_bizbar', gp:'wv7d_biz'});
  rows.push({type:'sub', id:'mos_biz_oth', label:'Other',  dot:'#9ca3af', parent:'mos_bizbar', gp:'wv7d_biz'});

  rows.push({type:'top', id:'wv7d_tc', label:'Travel Co. Rates'});
  tcOps.forEach(function(op,i){ rows.push({type:'sect', id:'mos_tc'+i, label:op[0], parent:'wv7d_tc', toIdx:i, toClr:op[1]}); });
  rows.push({type:'sect', id:'mos_tcbase', label:'Base Seg. Rate', parent:'wv7d_tc', toBase:true});

  function isHidden(row) {
    if(row.type==='top') return false;
    if(row.type==='sect' && _wv7dAccState[row.parent]) return true;
    if(row.type==='sub'){ if(_wv7dAccState[row.gp]) return true; if(_wv7dAccState[row.parent]) return true; }
    return false;
  }

  var promoLabel = d.isEbbWeek ? 'EBB 10%' : 'Contract';
  var promoClr   = d.isEbbWeek ? '#16a34a' : '#2563eb';

  var html = '<div class="wb-layout">';
  rows.forEach(function(row) {
    var collapsed = !!_wv7dAccState[row.id];
    var hidden = isHidden(row);
    html += '<div class="wb-row wb-row-'+row.type+(hidden?' wb-row-hidden':'')+'">';

    // Label cell
    if(row.type==='top'){
      html += '<div class="wb-label-cell wb-grp-hdr" onclick="wv7dToggle(\''+row.id+'\')">'
             +'<span class="wb-chev">'+(collapsed?chevDown:chevUp)+'</span>'
             +'<span class="wb-grp-label">'+row.label+'</span></div>';
    } else if(row.type==='sect'){
      html += '<div class="wb-label-cell wb-sect-lbl" onclick="wv7dToggle(\''+row.id+'\')">'
             +'<span class="wb-chev">'+(collapsed?chevDown:chevUp)+'</span>'
             +'<span class="wb-sect-label">'+row.label+'</span></div>';
    } else {
      html += '<div class="wb-label-cell wb-sub-lbl-cell">'
             +(row.dot?'<span class="wb-sub-dot" style="background:'+row.dot+'"></span>':'')
             +'<span class="wb-sub-label'+(row.isRem?' wb-sub-lbl-rem':'')+'">'+(row.label)+'</span></div>';
    }

    // Data cell
    var cc = '';
    if(row.type==='top'){
      cc = '';
    } else if(row.type==='sect'){
      switch(row.id){
        case 'mos_co_full':
          cc = d.fullCoCount7>0
            ? '<div class="wb-sect-val"><span class="material-icons" style="font-size:13px;color:'+CLOSE_OUT_COLORS.full+';vertical-align:middle;margin-right:3px">lock</span><span class="wv-occ-total" style="color:'+CLOSE_OUT_COLORS.full+'">'+d.fullCoCount7+' day'+(d.fullCoCount7!==1?'s':'')+'</span><span style="font-size:10px;color:#9ca3af;margin-left:6px">/ '+d.n7+'</span></div>'+bar(Math.min(90,Math.round(d.fullCoCount7/d.n7*100)),CLOSE_OUT_COLORS.full)
            : '<div class="wb-sect-val" style="color:#9ca3af;font-size:12px">None</div>';
          break;
        case 'mos_co_part':
          cc = d.partCoCount7>0
            ? '<div class="wb-sect-val"><span class="material-icons" style="font-size:13px;color:'+CLOSE_OUT_COLORS.partial+';vertical-align:middle;margin-right:3px">lock_open</span><span class="wv-occ-total" style="color:'+CLOSE_OUT_COLORS.partial+'">'+d.partCoCount7+' day'+(d.partCoCount7!==1?'s':'')+'</span><span style="font-size:10px;color:#9ca3af;margin-left:6px">/ '+d.n7+'</span></div>'+bar(Math.min(90,Math.round(d.partCoCount7/d.n7*100)),CLOSE_OUT_COLORS.partial)
            : '<div class="wb-sect-val" style="color:#9ca3af;font-size:12px">None</div>';
          break;
        case 'mos_occ':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgHotel+'%</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+d.avgTo+'%;background:#004948;height:6px"></div><div style="width:'+Math.max(0,d.avgHotel-d.avgTo)+'%;background:#52d9ce;height:6px"></div></div>'
             +refChips([{k:'stly',l:'STLY',v:d.sdlyTo+'%'},{k:'ly',l:'LY',v:d.lyTo+'%'},{k:'fcst',l:'Fcst',v:d.fcstTo+'%'}]);
          break;
        case 'mos_adr':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">$'+d.avgToAdr+'</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.round(d.avgToAdr/3.5)+'%;background:#004948;height:6px"></div></div>'
             +refChips([{k:'stly',l:'STLY',v:'$'+d.sdlyAdr},{k:'ly',l:'LY',v:'$'+d.lyAdr},{k:'fcst',l:'Fcst',v:'$'+d.fcstAdr}]);
          break;
        case 'mos_rev':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.totalRevStr+'</span></div>'
             +refChips([{k:'stly',l:'STLY',v:d.sdlyRev},{k:'ly',l:'LY',v:d.lyRev},{k:'fcst',l:'Fcst',v:d.fcstRev}]);
          break;
        case 'mos_revpar':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">$'+d.avgRevpar+'</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.round(d.avgRevpar/4)+'%;background:#004948;height:6px"></div></div>'
             +refChips([{k:'stly',l:'STLY',v:'$'+d.sdlyRevpar},{k:'ly',l:'LY',v:'$'+d.lyRevpar}]);
          break;
        case 'mos_pickup':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">+'+d.sumPickup+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: +'+d.sumHotelPickup+'</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,d.sumPickup/10)+'%;background:#004948;height:6px"></div></div>';
          break;
        case 'mos_onoff':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgOnline+'% online</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+d.avgOnline+'%;background:#004948;height:6px"></div><div style="width:'+(100-d.avgOnline)+'%;background:#52d9ce;height:6px"></div></div>';
          break;
        case 'mos_segbar':
          cc = stackBar([{p:d.avgFitPct,c:'#006461'},{p:d.avgDynPct,c:'#0891b2'},{p:d.avgSerPct,c:'#6366f1'},{p:d.avgOtherPct,c:'#5883ed'},{p:d.avgFreePct,c:'#e5e7eb'}])
             +'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:3px">'
             +'<span style="font-size:12px;font-family:Lato,sans-serif;color:#006461">FIT '+d.avgFitPct+'%</span>'
             +'<span style="font-size:12px;font-family:Lato,sans-serif;color:#0891b2">Dyn '+d.avgDynPct+'%</span>'
             +'<span style="font-size:12px;font-family:Lato,sans-serif;color:#6366f1">Ser '+d.avgSerPct+'%</span></div>';
          break;
        case 'mos_rn':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.sumRn+' rn</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+d.avgRnH+'</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.min(92,Math.round(d.sumRn/WV*100))+'%;background:#004948;height:6px"></div></div>'
             +refChips([{k:'stly',l:'STLY',v:d.sdlyRn+' RN'},{k:'ly',l:'LY',v:d.lyRn+' RN'},{k:'fcst',l:'Fcst',v:d.fcstRn+' RN'}]);
          break;
        case 'mos_avga':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+(d.avgTotAdults/Math.max(1,d.sumRn)).toFixed(1)+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+(d.avgHotelTotAdults/Math.max(1,d.avgRnH*d.n7)).toFixed(1)+'</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,(d.avgTotAdults/Math.max(1,d.sumRn))/3*100)+'%;background:#004948;height:6px"></div></div>';
          break;
        case 'mos_avgc':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+(d.avgTotChildren/Math.max(1,d.sumRn)).toFixed(1)+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+(d.avgHotelTotChildren/Math.max(1,d.avgRnH*d.n7)).toFixed(1)+'</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,(d.avgTotChildren/Math.max(1,d.sumRn))/2*100)+'%;background:#d33030;height:6px"></div></div>';
          break;
        case 'mos_tota':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgTotAdults+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+d.avgHotelTotAdults+'</span></div>'; break;
        case 'mos_totc':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgTotChildren+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+d.avgHotelTotChildren+'</span></div>'; break;
        case 'mos_totg':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgTotGuests+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+d.avgHotelTotGuests+'</span></div>'; break;
        case 'mos_los':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgLos+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+d.avgHotelLos+'</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,parseFloat(d.avgLos)/10*100)+'%;background:#004948;height:6px"></div></div>'; break;
        case 'mos_lead':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgLead+'</span><span style="font-size:11px;color:#9ca3af;margin-left:6px">H: '+d.avgHotelLead+'</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,parseInt(d.avgLead)/90*100)+'%;background:#004948;height:6px"></div></div>'; break;
        case 'mos_avail':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgAvailRooms+' rm</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,Math.round(d.avgAvailRooms/WV*100))+'%;background:#16a34a;height:6px"></div></div>'; break;
        case 'mos_availg':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total">'+d.avgAvailGuar+' rm</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,Math.round(d.avgAvailGuar/20*100))+'%;background:#004948;height:6px"></div></div>'; break;
        case 'mos_mpsum':
          { var _7sGPR=d.avgHotelTotGuests/Math.max(1,d.avgRnH*d.n7);
            var _7sAiR=Math.round(d.avgRnH*d.avgAiPct/100),_7sAiSt=Math.round(_7sAiR*_7sGPR);
            var _7sBbR=Math.round(d.avgRnH*d.avgBbPct/100),_7sBbSt=Math.round(_7sBbR*_7sGPR);
            var _7sHbR=Math.round(d.avgRnH*d.avgHbPct/100),_7sHbSt=Math.round(_7sHbR*_7sGPR);
            var _7sRoR=Math.round(d.avgRnH*d.avgRoPct/100),_7sRoSt=Math.round(_7sRoR*_7sGPR);
          cc = stackBar([{p:d.avgAiPct,c:'#006461'},{p:d.avgBbPct,c:'#3b82f6'},{p:d.avgHbPct,c:'#967EF3'},{p:d.avgRoPct,c:'#f59e0b'}])
             +'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:3px">'
             +'<span style="font-size:12px;font-family:Lato,sans-serif;color:#006461">AI '+d.avgAiPct+'% · '+_7sAiSt+' seats</span>'
             +'<span style="font-size:12px;font-family:Lato,sans-serif;color:#3b82f6">BB '+d.avgBbPct+'% · '+_7sBbSt+' seats</span>'
             +'<span style="font-size:12px;font-family:Lato,sans-serif;color:#967EF3">HB '+d.avgHbPct+'% · '+_7sHbSt+' seats</span>'
             +'<span style="font-size:12px;font-family:Lato,sans-serif;color:#f59e0b">RO '+d.avgRoPct+'% · '+_7sRoSt+' seats</span></div>'; }
          break;
        case 'mos_bizbar':
          cc = stackBar([{p:d.avgToMix,c:'#006461'},{p:d.avgDirMix,c:'#0284c7'},{p:d.avgOtaMix,c:'#D97706'},{p:d.avgOtherMix,c:'#9ca3af'}])
             +'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:3px">'
             +'<span style="font-size:12px;font-family:Lato,sans-serif;color:#006461">TO '+d.avgToMix+'%</span>'
             +'<span style="font-size:12px;font-family:Lato,sans-serif;color:#0284c7">D '+d.avgDirMix+'%</span>'
             +'<span style="font-size:12px;font-family:Lato,sans-serif;color:#D97706">OTA '+d.avgOtaMix+'%</span></div>';
          break;
        case 'mos_tcbase':
          cc = '<div class="wb-sect-val"><span class="wv-occ-total" style="font-weight:700;color:#1C1C1C">$'+(d.avgHotelAdr+8)+'</span></div>'
             +'<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,Math.round((d.avgHotelAdr+8)/280*100))+'%;background:#004948;height:6px"></div></div>';
          break;
        default:
          if(row.toIdx!==undefined){
            cc = '<div class="wb-sect-val" style="justify-content:space-between">'
               +'<span class="wv-occ-total" style="color:#1C1C1C">$'+d.avgTcRates[row.toIdx]+'</span>'
               +'<span style="font-size:11px;font-weight:700;padding:1px 5px;border-radius:3px;background:'+promoClr+'22;color:'+promoClr+';border:1px solid '+promoClr+'44">'+promoLabel+'</span>'
               +'</div>'
               +'<div class="wv-occ-bar-track"><div style="width:'+Math.min(90,Math.round(d.avgTcRates[row.toIdx]/280*100))+'%;background:#004948;height:6px"></div></div>';
          }
          break;
      }
    } else {
      // Sub rows — same as monthly
      var v1 = '';
      switch(row.id){
        case 'mos_occ_to':     v1 = d.avgTo+'%'; break;
        case 'mos_occ_htl':    v1 = d.avgHotel+'%'; break;
        case 'mos_adr_to':     v1 = '$'+d.avgToAdr; break;
        case 'mos_adr_htl':    v1 = '$'+d.avgHotelAdr; break;
        case 'mos_rev_to':     v1 = d.totalRevStr; break;
        case 'mos_rev_htl':    v1 = d.totalHotelRevStr; break;
        case 'mos_onoff_on':   v1 = d.avgOnline+'%'; break;
        case 'mos_onoff_off':  v1 = (100-d.avgOnline)+'%'; break;
        case 'mos_seg_fit':    v1 = d.avgFitPct+'% · '+d.avgFitRms+' RN'; break;
        case 'mos_seg_dyn':    v1 = d.avgDynPct+'% · '+d.avgDynRms+' RN'; break;
        case 'mos_seg_ser':    v1 = d.avgSerPct+'% · '+d.avgSerRms+' RN'; break;
        case 'mos_seg_oth':    v1 = d.avgOtherPct+'% · '+d.avgOtherRms+' RN'; break;
        case 'mos_seg_rem':    v1 = d.avgFreePct+'% · '+d.avgFreeRms+' RN'; break;
        case 'mos_mp_ai':      { var _7gpr=d.avgHotelTotGuests/Math.max(1,d.avgRnH*d.n7),_7aiRm=Math.round(d.avgRnH*d.avgAiPct/100),_7aiSt=Math.round(_7aiRm*_7gpr); v1=d.avgAiPct+'% · '+_7aiRm+'r · '+_7aiSt+' seats'; } break;
        case 'mos_mp_bb':      { var _7gprb=d.avgHotelTotGuests/Math.max(1,d.avgRnH*d.n7),_7bbRm=Math.round(d.avgRnH*d.avgBbPct/100),_7bbSt=Math.round(_7bbRm*_7gprb); v1=d.avgBbPct+'% · '+_7bbRm+'r · '+_7bbSt+' seats'; } break;
        case 'mos_mp_hb':      { var _7gprh=d.avgHotelTotGuests/Math.max(1,d.avgRnH*d.n7),_7hbRm=Math.round(d.avgRnH*d.avgHbPct/100),_7hbSt=Math.round(_7hbRm*_7gprh); v1=d.avgHbPct+'% · '+_7hbRm+'r · '+_7hbSt+' seats'; } break;
        case 'mos_mp_ro':      { var _7gprr=d.avgHotelTotGuests/Math.max(1,d.avgRnH*d.n7),_7roRm=Math.round(d.avgRnH*d.avgRoPct/100),_7roSt=Math.round(_7roRm*_7gprr); v1=d.avgRoPct+'% · '+_7roRm+'r · '+_7roSt+' seats'; } break;
        case 'mos_biz_to':     v1 = d.avgToMix+'%'; break;
        case 'mos_biz_dir':    v1 = d.avgDirMix+'%'; break;
        case 'mos_biz_ota':    v1 = d.avgOtaMix+'%'; break;
        case 'mos_biz_oth':    v1 = d.avgOtherMix+'%'; break;
      }
      cc = '<span class="wb-sub-val">'+v1+'</span>';
    }

    html += '<div class="wb-data-cell">'+cc+'</div>';
    html += '</div>'; // close wb-row
  });
  html += '</div>'; // close wb-layout

  // Wrap in outer accordion (same as monthly "Overview")
  var ovCollapsed = _wv7dAccState['wv7d_overview'] === true;
  var ovChev = ovCollapsed
    ? '<span class="material-icons" style="font-size:16px">expand_more</span>'
    : '<span class="material-icons" style="font-size:16px">expand_less</span>';
  return '<div class="cal-summary-wrap" style="background:#fff">'
    +'<div class="wv-acc-sect'+(ovCollapsed?'':' wv-acc-open')+'" style="border:1px solid #dde1e2;border-radius:0;overflow:hidden">'
    +'<div class="wv-acc-hdr" onclick="wv7dToggle(\'wv7d_overview\')" style="background:#fff;border-bottom:none;border-radius:0">'
    +'<span class="wv-acc-chev" style="color:#006461">'+ovChev+'</span>'
    +'<span class="wv-acc-title" style="font-weight:700">7 Day Metrics Summary</span>'
    +'</div>'
    +'<div class="wv-acc-body'+(ovCollapsed?' wv-body-hidden':'')+'" style="padding:0;background:#fff">'
    +html
    +'</div></div></div>';
};

/* ── Daily-H AG Grid ─────────────────────────────────────────────────────── */
var _dailyHGridApi  = null;
var _dhCollapsed    = {};   // persists collapse state between tab/week switches
var _dhAllRows      = [];   // flat ROWS array; rebuilt each time initDailyHGrid runs
var _dhSecRenderers = [];   // live SecRenderer instances → used for Open/Close All chevron sync
var _dhParCells     = [];   // live par cell DOM refs for chevron sync
var _dhMetricOrder  = null; // null = default; array of parKey strings = custom order
var _dhLastInitArgs = null; // saved args for grid rebuild after reorder
var _wvSectionOrder = null; // null = default; array of section keys for combined view
var _drColOrder     = null; // null = default; array of group names for Daily R
var _drLastInitArgs = null; // saved args for Daily R rebuild

// Section/group definitions used by the reorder modal
var WV_SECTIONS_DEF = [
  { key:'daily',        lbl:'Daily Metrics',        clr:'#006461' },
  { key:'detailed',     lbl:'More Metrics',          clr:'#2e65e8' },
  { key:'meals',        lbl:'Meal Plans',            clr:'#7c3aed' },
  { key:'mealsSummary', lbl:'Meal Plans Summary',    clr:'#7c3aed' },
  { key:'avail',        lbl:'Room Availability',     clr:'#16a34a' },
  { key:'toRates',      lbl:'Travel Company Rates',  clr:'#0f766e' },
  { key:'bizMix',       lbl:'Business Mix',          clr:'#0284c7' },
];
var DR_GROUPS_DEF = [
  { key:'Daily Metrics',    clr:'#006461' },
  { key:'Room Avail.',      clr:'#16a34a' },
  { key:'Segments (T)',     clr:'#0891b2' },
  { key:'Business Mix',     clr:'#0284c7' },
  { key:'Meal Plans',       clr:'#7c3aed' },
  { key:'Travel Co. Rates', clr:'#0f766e' },
];

// Reorder ROWS by a custom par-key sequence (preserves sec headers above their first par)
function reorderDHRows(rows, order) {
  // Parse into groups: { sec, pars: [{par, rows:[]}] }
  var sections = [], curSec = null, curPar = null;
  rows.forEach(function(r) {
    if (r.type === 'sec') { curSec = { sec: r, pars: [] }; sections.push(curSec); curPar = null; }
    else if (r.type === 'par') { curPar = { par: r, rows: [] }; if (curSec) curSec.pars.push(curPar); }
    else if (r.type === 'row') { if (curPar) curPar.rows.push(r); }
  });
  // Build lookup: parKey → { section, parGroup }
  var parMap = {};
  sections.forEach(function(sec) {
    sec.pars.forEach(function(pg) { parMap[pg.par.parKey] = { sec: sec, pg: pg }; });
  });
  // Emit rows in specified order, emitting sec header the first time it appears
  var result = [], usedSecs = {};
  order.forEach(function(pk) {
    var entry = parMap[pk];
    if (!entry) return;
    var secKey = entry.sec.sec.secKey;
    if (!usedSecs[secKey]) { result.push(entry.sec.sec); usedSecs[secKey] = true; }
    result.push(entry.pg.par);
    entry.pg.rows.forEach(function(r) { result.push(r); });
  });
  return result;
}

function _getDHVisibleRowData() {
  return _dhAllRows.filter(function(r) {
    if (r.type === 'sec') return true;
    if (_dhCollapsed[r.secKey]) return false;
    if (r.type === 'par') return true;
    if (_dhCollapsed[r.parKey]) return false;
    return true;
  }).map(function(r) {
    return { _type:r.type, _lbl:r.lbl, _clr:r.clr||'#374151', _fn:r.fn||null,
             _secKey:r.secKey||null, _parKey:r.parKey||null };
  });
}
function _toggleDHSection(secKey) {
  _dhCollapsed[secKey] = !_dhCollapsed[secKey];
  if (_dailyHGridApi) _dailyHGridApi.setGridOption('rowData', _getDHVisibleRowData());
}
function _toggleDHPar(parKey) {
  _dhCollapsed[parKey] = !_dhCollapsed[parKey];
  if (_dailyHGridApi) _dailyHGridApi.setGridOption('rowData', _getDHVisibleRowData());
}
function dhSetAll(collapse) {
  // Set all known rows
  _dhAllRows.forEach(function(r) {
    if (r.type === 'sec') _dhCollapsed[r.secKey] = collapse;
    if (r.type === 'par') _dhCollapsed[r.parKey] = collapse;
  });
  // Also set any keys already in the collapse map to catch stragglers
  for (var k in _dhCollapsed) {
    if (_dhCollapsed.hasOwnProperty(k)) _dhCollapsed[k] = collapse;
  }
  // Sync chevrons on still-visible sec/par renderers before rebuilding rowData
  _dhSecRenderers.forEach(function(sr) { sr._syncChevron(); });
  _dhParCells.forEach(function(pc) {
    var rot = _dhCollapsed[pc._parKey] ? '-90deg' : '0deg';
    if (pc._iconEl) pc._iconEl.style.transform = 'rotate(' + rot + ')';
  });
  if (_dailyHGridApi) _dailyHGridApi.setGridOption('rowData', _getDHVisibleRowData());
}

function initDailyHGrid(days, activeMonth, activeDay, containerEl) {
  _dhLastInitArgs = { days: days, month: activeMonth, day: activeDay, container: containerEl };
  var AG = _realAgGrid;
  if (!AG || typeof AG.createGrid !== 'function') {
    containerEl.innerHTML = buildDailyHView(days, activeMonth, activeDay);
    return;
  }

  if (_dailyHGridApi) { try { _dailyHGridApi.destroy(); } catch(e){} _dailyHGridApi = null; }
  containerEl.innerHTML = '';
  containerEl.style.padding = '0';

  var wrapper = document.createElement('div');
  wrapper.className = 'ag-theme-quartz daily-h-ag-wrap';
  containerEl.appendChild(wrapper);

  var DOW_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MNAMES_S  = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var TODAY_WV  = new Date(2026, 2, 9);
  var WV_CAP    = 250;

  // ── Per-day computed data ─────────────────────────────────────────────────
  var dayData = days.map(function(dv) {
    var dm = dv.month, dd = dv.day;
    var hh = getOccupancy(dm, dd); var hotel = hh.hotel, to = hh.to;
    var adr = 150 + Math.abs((dm*47+dd*31)%130);
    var v   = Math.abs((dm*127+dd*53+dm*dd*7+dd*dd*3))%100;
    var toAdr = Math.max(80, adr-20-Math.abs((dm*3+dd*7)%15));
    var toRn  = Math.round(WV_CAP * to / 100);
    var hnRn  = Math.round(WV_CAP * hotel / 100);
    var toRev = Math.floor(toRn * toAdr);
    var hnRev = Math.floor(hnRn * adr);
    var otherPct = Math.max(0, hotel - to), freePct = Math.max(0, 100 - hotel);
    var toRms = toRn, otherRms = Math.round(WV_CAP*otherPct/100);
    var freeRms = WV_CAP - toRms - otherRms;
    var fitPct = Math.round(to*0.45), dynPct = Math.round(to*0.35), serPct = to - fitPct - dynPct;
    var onlinePct = Math.max(30, Math.min(80, 45+Math.abs((dm*13+dd*7)%35)));
    var adrBar = Math.min(95, 40+Math.abs((dm*11+dd*19)%55));
    var revBar = Math.min(95, 35+Math.abs((dm*17+dd*13)%60));
    var revpar = Math.max(50, (adr+80)-30-Math.abs((dm*5+dd*3)%20));
    var pickup = Math.max(0, Math.floor((v%25+5)*to/Math.max(1,hotel)));
    var hPickup = Math.floor(v%25+5);
    var sdlyH=Math.max(5,hotel-9), lyH=Math.max(5,hotel-6), fcstH=Math.min(100,hotel+4);
    var sdlyA=adr-8, lyA=adr-4, fcstA=adr+6;
    var sdlyR=Math.floor(hnRev*0.9), lyR=Math.floor(hnRev*0.95), fcstR=Math.floor(hnRev*1.06);
    function fR(v){return v>=1000000?'$'+(v/1000000).toFixed(1)+'M':'$'+Math.round(v/1000)+'k';}
    var avgA=(1.8+v%3*0.1).toFixed(1), avgC=(0.3+v%2*0.1).toFixed(1);
    var hAvgA=(parseFloat(avgA)+0.3).toFixed(1), hAvgC=(parseFloat(avgC)+0.1).toFixed(1);
    var totG=Math.round(toRn*(parseFloat(avgA)+parseFloat(avgC)));
    var hTotG=Math.round(hnRn*(parseFloat(hAvgA)+parseFloat(hAvgC)));
    var totAT=Math.round(toRn*parseFloat(avgA)), totCT=Math.round(toRn*parseFloat(avgC));
    var totAH=Math.round(hnRn*parseFloat(hAvgA)), totCH=Math.round(hnRn*parseFloat(hAvgC));
    var avgLos=(2.8+v%5*0.3).toFixed(1)+'n', hLos=(2.8+v%5*0.3+0.4).toFixed(1)+'n';
    var avgLead=(18+v%60)+'d', hLead=(18+v%60+12)+'d';
    var availRooms=Math.max(0,102-Math.floor(hotel*1.02));
    var availGuar=Math.floor(8+v%5);
    var aiPct=Math.max(45,Math.min(68,55+(dm*7+dd*3)%14));
    var bbPct=Math.max(14,Math.min(28,20+(dm*11+dd*5)%11));
    var hbPct=Math.max(6,Math.min(16,10+(dm*5+dd*7)%9));
    var roPct=100-aiPct-bbPct-hbPct;
    var toPct=to/Math.max(1,hotel);
    var toMix=28+Math.abs((dm*7+dd*5)%25), dirMix=30+Math.abs((dm*5+dd*9)%20), otaMix=20+Math.abs((dm*9+dd*3)%18);
    var otherMix=Math.max(0,100-toMix-dirMix-otaMix);
    var tcRates=[0,1,2,3,4].map(function(i){return adr-15+Math.abs((dm*(i+3)+dd*(i+5))%50);});
    var baseRate=adr+8;
    var isEbbDay=(new Date(2026,dm-1,dd)).getDay()<3;
    var sdlyRn=Math.round(toRn*0.88), lyRn=Math.round(toRn*0.93), fcstRn=Math.round(toRn*1.06);
    var sdlyRevpar=Math.max(40,revpar-8), lyRevpar=Math.max(40,revpar-4);
    return {dm,dd,hotel,to,adr,toAdr,toRn,hnRn,toRev,hnRev,otherPct,freePct,toRms,otherRms,freeRms,
      fitPct,dynPct,serPct,onlinePct,adrBar,revBar,revpar,sdlyRevpar,lyRevpar,pickup,hPickup,
      sdlyH,lyH,fcstH,sdlyA,lyA,fcstA,sdlyR,lyR,fcstR,fR,
      avgA,avgC,hAvgA,hAvgC,totG,hTotG,totAT,totCT,totAH,totCH,
      avgLos,hLos,avgLead,hLead,availRooms,availGuar,
      aiPct,bbPct,hbPct,roPct,toPct,toMix,dirMix,otaMix,otherMix,
      tcRates,baseRate,isEbbDay,sdlyRn,lyRn,fcstRn};
  });

  // ── Cell render helpers ───────────────────────────────────────────────────
  function segBar(segs) {
    return '<div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;position:relative;margin:2px 0">'
      + segs.map(function(s){return '<div style="position:absolute;top:0;left:'+s.o+'%;width:'+s.w+'%;height:100%;background:'+s.c+'"></div>';}).join('')
      + '</div>';
  }
  function dualBar(tPct, hPct, clr) {
    return '<div style="height:4px;background:#e5e7eb;border-radius:2px;position:relative;margin:3px 0">'
      + (hPct!=null?'<div style="position:absolute;top:0;left:0;height:100%;width:'+Math.min(92,hPct)+'%;background:#d1d5db;border-radius:2px"></div>':'')
      + '<div style="position:absolute;top:0;left:0;height:100%;width:'+Math.min(92,tPct)+'%;background:'+clr+';border-radius:2px"></div>'
      + '</div>';
  }
  function stackBar(segs) {
    return '<div style="height:5px;background:#e5e7eb;border-radius:3px;display:flex;overflow:hidden;margin:3px 0">'
      + segs.map(function(s){return '<div style="width:'+s.p+'%;background:'+s.c+'"></div>';}).join('')
      + '</div>';
  }
  function refChips(pairs) {
    var CSS = {stly:'background:#e0e7ff;color:#4338ca',ly:'background:#dcfce7;color:#15803d',fcst:'background:#fef9c3;color:#a16207'};
    return '<div style="display:flex;gap:3px;flex-wrap:wrap;margin-top:3px">'
      + pairs.filter(Boolean).map(function(p){
          var s=CSS[p.k]||'background:#f3f4f6;color:#374151';
          return '<span style="font-size:8.5px;font-weight:700;padding:1px 5px;border-radius:3px;'+s+'">'+p.lbl+' '+p.v+'</span>';
        }).join('')
      + '</div>';
  }
  function promoBadge(d) {
    var clr = d.isEbbDay?'#16a34a':'#2563eb';
    var lbl = d.isEbbDay?'EBB 10%':'Contract';
    return '<span style="font-size:8.5px;font-weight:700;padding:1px 6px;border-radius:3px;background:'+clr+'20;color:'+clr+';border:1px solid '+clr+'44">'+lbl+'</span>';
  }
  function valH(tVal, hVal, tClr) {
    return '<div style="display:flex;align-items:baseline;gap:4px;justify-content:space-between">'
      + '<span style="font-size:9px;color:#9ca3af">'+hVal+'</span>'
      + '<span style="font-size:12px;font-weight:800;color:'+tClr+'">'+tVal+'</span>'
      + '</div>';
  }

  // ── Row definitions ───────────────────────────────────────────────────────
  var ROWS = [];
  var _dhSecIdx = 0, _dhParIdx = 0;
  var _dhCurSecKey = null, _dhCurParKey = null;

  function sec(lbl, clr) {
    _dhCurSecKey = 'S' + (_dhSecIdx++);
    _dhCurParKey = null;
    ROWS.push({ type:'sec', lbl:lbl, clr:clr||'#374151', secKey:_dhCurSecKey });
  }
  function par(lbl, clr) {
    _dhCurParKey = 'P' + (_dhParIdx++);
    ROWS.push({ type:'par', lbl:lbl, clr:clr||'#374151', secKey:_dhCurSecKey, parKey:_dhCurParKey });
  }
  function row(lbl, fn) {
    ROWS.push({ type:'row', lbl:lbl, fn:fn, secKey:_dhCurSecKey, parKey:_dhCurParKey });
  }

  // Delegate to module-level (so Open All / Close All can reach them)
  var getDHVisibleRowData = _getDHVisibleRowData;
  var toggleDHSection     = _toggleDHSection;
  var toggleDHPar         = _toggleDHPar;

  // Reset live renderer refs for this grid instance
  _dhSecRenderers = [];
  _dhParCells     = [];

  sec('Daily Metrics','#006461');
  par('Occupancy','#006461');
  row('T / Hotel', function(d){
    var segs=[{o:0,w:d.fitPct,c:'#006461'},{o:d.fitPct,w:d.dynPct,c:'#0891b2'},{o:d.fitPct+d.dynPct,w:d.serPct,c:'#6366f1'},{o:d.to,w:Math.max(0,d.otherPct),c:'#5883ed'}];
    return valH(d.to+'%',d.hotel+'%','#006461')+segBar(segs)+refChips([{k:'stly',lbl:'STLY',v:d.sdlyH+'%'},{k:'ly',lbl:'LY',v:d.lyH+'%'},{k:'fcst',lbl:'Fcst',v:d.fcstH+'%'}]);
  });
  row('Online / Offline', function(d){
    return stackBar([{p:d.onlinePct,c:'#3b82f6'},{p:100-d.onlinePct,c:'#f97316'}])
      +'<div style="display:flex;justify-content:space-between"><span style="font-size:8px;color:#3b82f6">'+d.onlinePct+'% online</span><span style="font-size:8px;color:#f97316">'+(100-d.onlinePct)+'% offline</span></div>';
  });
  par('ADR','#7c3aed');
  row('T / Hotel', function(d){
    var df=d.toAdr-d.adr;
    return valH('$'+d.toAdr,'$'+d.adr,'#7c3aed')+dualBar(d.adrBar,Math.min(95,d.adrBar+12),'#7c3aed')
      +'<div style="display:flex;align-items:center;gap:4px;margin-top:2px"><span style="font-size:8px;font-weight:700;color:'+(df<=0?'#16a34a':'#dc2626')+'">'+(df>=0?'+':'−')+'$'+Math.abs(df)+' diff</span></div>'
      +refChips([{k:'stly',lbl:'STLY',v:'$'+d.sdlyA},{k:'ly',lbl:'LY',v:'$'+d.lyA},{k:'fcst',lbl:'Fcst',v:'$'+d.fcstA}]);
  });
  par('Revenue','#ea580c');
  row('T / Hotel', function(d){
    return valH(d.fR(d.toRev),d.fR(d.hnRev),'#ea580c')+dualBar(d.revBar,Math.min(95,d.revBar+10),'#ea580c')+refChips([{k:'stly',lbl:'STLY',v:d.fR(d.sdlyR)},{k:'ly',lbl:'LY',v:d.fR(d.lyR)},{k:'fcst',lbl:'Fcst',v:d.fR(d.fcstR)}]);
  });
  par('RevPAR','#9333ea');
  row('T / Hotel', function(d){
    return valH('$'+d.revpar,'$'+(d.revpar+22),'#9333ea')+dualBar(Math.round(d.revpar/4),Math.round((d.revpar+22)/4),'#9333ea')+refChips([{k:'stly',lbl:'STLY',v:'$'+d.sdlyRevpar},{k:'ly',lbl:'LY',v:'$'+d.lyRevpar}]);
  });
  par('Pickup','#16a34a');
  row('T / Hotel', function(d){ return valH('+'+d.pickup,'+'+d.hPickup,'#16a34a'); });
  par('Segments (T)','#0891b2');
  row('FIT / Dyn / Series', function(d){
    return stackBar([{p:d.fitPct,c:'#006461'},{p:d.dynPct,c:'#0891b2'},{p:d.serPct,c:'#6366f1'}])
      +'<div style="display:flex;gap:6px;font-size:8px;flex-wrap:wrap;margin-top:1px"><span style="color:#006461">FIT '+d.fitPct+'%</span><span style="color:#0891b2">Dyn '+d.dynPct+'%</span><span style="color:#6366f1">Series '+d.serPct+'%</span></div>';
  });

  sec('More Metrics','#2e65e8');
  par('RN Sold','#2e65e8');
  row('T / Hotel', function(d){
    return valH(d.toRn,d.hnRn,'#2e65e8')+dualBar(Math.round(d.toRn/WV_CAP*100),Math.round(d.hnRn/WV_CAP*100),'#2e65e8')+refChips([{k:'stly',lbl:'STLY',v:d.sdlyRn},{k:'ly',lbl:'LY',v:d.lyRn},{k:'fcst',lbl:'Fcst',v:d.fcstRn}]);
  });
  par('Avg Adults','#2e65e8');    row('T / Hotel', function(d){ return valH(d.avgA,d.hAvgA,'#2e65e8'); });
  par('Avg Children','#d33030');  row('T / Hotel', function(d){ return valH(d.avgC,d.hAvgC,'#d33030'); });
  par('Total Adults','#2e65e8'); row('T / Hotel', function(d){ return valH(d.totAT,d.totAH,'#2e65e8'); });
  par('Total Children','#d33030'); row('T / Hotel', function(d){ return valH(d.totCT,d.totCH,'#d33030'); });
  par('Total Guests','#0369a1'); row('T / Hotel', function(d){ return valH(d.totG,d.hTotG,'#0369a1'); });
  par('Avg LOS','#0891b2');       row('T / Hotel', function(d){ return valH(d.avgLos,d.hLos,'#0891b2'); });
  par('Lead Time','#6366f1');     row('T / Hotel', function(d){ return valH(d.avgLead,d.hLead,'#6366f1'); });
  par('Avail Rooms','#16a34a');   row('Hotel', function(d){ return '<span style="font-size:11px;font-weight:800;color:#16a34a">'+d.availRooms+' rm</span>'; });
  par('Avail Guar.','#ea580c');   row('T', function(d){ return '<span style="font-size:11px;font-weight:800;color:#ea580c">'+d.availGuar+' rm</span>'; });

  sec('Meal Plans','#967EF3');
  var mpDefs=[['All Inclusive','#006461','aiPct'],['Bed & Bkfst','#3b82f6','bbPct'],['Half Board','#967EF3','hbPct'],['Room Only','#f59e0b','roPct']];
  mpDefs.forEach(function(mp){
    par(mp[0],mp[1]);
    var key=mp[2];
    row('Hotel / TO %', function(d){
      var hPct=d[key], toPct2=Math.max(0,Math.round(hPct*d.toPct*0.9));
      return valH(hPct+'%','TO '+toPct2+'%',mp[1])+dualBar(hPct,null,mp[1]);
    });
  });
  par('Summary','#967EF3');
  row('AI / BB / HB / RO', function(d){
    return stackBar([{p:d.aiPct,c:'#006461'},{p:d.bbPct,c:'#3b82f6'},{p:d.hbPct,c:'#967EF3'},{p:d.roPct,c:'#f59e0b'}])
      +'<div style="display:flex;gap:5px;font-size:8px;flex-wrap:wrap"><span style="color:#006461">AI '+d.aiPct+'%</span><span style="color:#3b82f6">BB '+d.bbPct+'%</span><span style="color:#967EF3">HB '+d.hbPct+'%</span><span style="color:#f59e0b">RO '+d.roPct+'%</span></div>';
  });

  sec('Business Mix','#0284c7');
  par('TO / Direct / OTA','#0284c7');
  row('Mix %', function(d){
    return stackBar([{p:d.toMix,c:'#006461'},{p:d.dirMix,c:'#0284c7'},{p:d.otaMix,c:'#D97706'},{p:d.otherMix,c:'#9ca3af'}])
      +'<div style="display:flex;gap:5px;font-size:8px;flex-wrap:wrap"><span style="color:#006461">TO '+d.toMix+'%</span><span style="color:#0284c7">Direct '+d.dirMix+'%</span><span style="color:#D97706">OTA '+d.otaMix+'%</span><span style="color:#9ca3af">Other '+d.otherMix+'%</span></div>';
  });

  sec('Travel Co. Rates','#0f766e');
  var toOps=[['Sunshine Tours','#3b82f6'],['Global Adv.','#967EF3'],['Beach Hols','#0ea5e9'],['City Breaks','#10b981'],['Adventure','#f59e0b']];
  toOps.forEach(function(op,i){
    par(op[0],op[1]);
    row('Rate / Promo', (function(op,i){ return function(d){
      return '<div style="display:flex;align-items:center;justify-content:space-between;gap:4px"><span style="font-size:11px;font-weight:800;color:'+op[1]+'">$'+d.tcRates[i]+'</span>'+promoBadge(d)+'</div>';
    };})(op,i));
  });
  par('Base Rate','#9333ea');
  row('Rate', function(d){ return '<span style="font-size:11px;font-weight:800;color:#9333ea">$'+d.baseRate+'</span>'; });

  // ── Day column header component factory ───────────────────────────────────
  function makeDayHeader(dv, isActive, isToday, isLocked, dba, evts) {
    var dm = dv.month, dd = dv.day;
    var bg       = isLocked ? '#374151' : isActive ? '#006461' : isToday ? '#125756' : '#1a5e5b';
    var topBorder= isActive ? '3px solid rgba(255,255,255,0.5)' : isToday ? '3px solid rgba(255,255,255,0.3)' : isLocked ? '3px solid #dc2626' : '3px solid transparent';
    var dayClr   = isLocked ? '#fca5a5' : '#fff';
    var subClr   = isLocked ? 'rgba(252,165,165,0.85)' : 'rgba(255,255,255,0.75)';
    var dbaStr   = dba === 0 ? 'Today' : dba > 0 ? dba + ' DBA' : '';
    function H() {}
    H.prototype.init = function(p) {
      this.gui = document.createElement('div');
      this.gui.style.cssText = 'background:'+bg+';width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px 6px;box-sizing:border-box;gap:2px;border-top:'+topBorder+';border-right:1px solid rgba(255,255,255,0.12);';
      this.gui.innerHTML =
        '<div style="font-weight:700;font-size:12px;color:'+dayClr+'">'+(isLocked?'🔒 ':'')+DOW_SHORT[new Date(2026,dm-1,dd).getDay()]+' '+dd+'</div>'
        +'<div style="font-size:10px;color:'+subClr+';display:flex;align-items:center;gap:4px">'
        +'<span>'+MNAMES_S[dm]+'</span>'
        +(dbaStr?'<span style="background:rgba(255,255,255,0.2);border-radius:3px;padding:0 4px;font-size:9px;color:#fff">'+dbaStr+'</span>':'')
        +(evts?'<span style="width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.9);display:inline-block"></span>':'')
        +'</div>';
    };
    H.prototype.getGui = function() { return this.gui; };
    H.prototype.destroy = function() {};
    return H;
  }

  // ── Full-width section-header renderer — HR demo-inspired ────────────────
  function SecRenderer() { this._iconEl = null; this._secKey = null; }
  SecRenderer.prototype.init = function(p) {
    var self = this;
    var r    = p.data;
    this._secKey = r._secKey;

    var isCollapsed = !!_dhCollapsed[r._secKey];
    var clr = r._clr;

    this.gui = document.createElement('div');
    this.gui.style.cssText =
      'display:flex;align-items:center;gap:9px;width:100%;height:100%;box-sizing:border-box;'
      + 'cursor:pointer;user-select:none;padding:0 14px;'
      + 'background:#f8f9fd;'
      + 'border-left:3px solid ' + clr + ';'
      + 'border-top:1px solid #dde1e2;border-bottom:1px solid #dde1e2;';

    // Rounded icon badge (HR demo style)
    var iconWrap = document.createElement('span');
    this._iconEl = iconWrap;
    iconWrap.style.cssText =
      'display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;'
      + 'width:20px;height:20px;border-radius:5px;'
      + 'background:' + clr + '22;color:' + clr + ';'
      + 'box-shadow:0 1px 3px ' + clr + '33;'
      + 'transform:rotate(' + (isCollapsed ? '-90deg' : '0deg') + ');'
      + 'transition:transform .2s ease;';
    iconWrap.innerHTML = '<span class="material-icons" style="font-size:12px">expand_more</span>';

    var label = document.createElement('span');
    label.style.cssText =
      'font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.65px;color:#1e2d3a';
    label.textContent = r._lbl;

    this.gui.appendChild(iconWrap);
    this.gui.appendChild(label);
    this.gui.addEventListener('click', function() { toggleDHSection(r._secKey); });

    // Register for Open All / Close All sync
    _dhSecRenderers.push(self);
  };
  SecRenderer.prototype._syncChevron = function() {
    if (this._iconEl) {
      this._iconEl.style.transform = 'rotate(' + (_dhCollapsed[this._secKey] ? '-90deg' : '0deg') + ')';
    }
  };
  SecRenderer.prototype.getGui    = function() { return this.gui; };
  SecRenderer.prototype.destroy   = function() {
    var i = _dhSecRenderers.indexOf(this);
    if (i !== -1) _dhSecRenderers.splice(i, 1);
  };

  // ── Column defs ───────────────────────────────────────────────────────────
  var colDefs = [];

  // Metric label (pinned left)
  colDefs.push({
    field: '_lbl',
    headerName: 'Metric',
    pinned: 'left',
    lockPinned: true,
    width: 170,
    suppressMovable: true,
    resizable: false,
    cellRenderer: function(p) {
      var r = p.data;
      if (r._type === 'par') {
        var el = document.createElement('div');
        var isCollapsed = !!_dhCollapsed[r._parKey];
        var clr = r._clr;
        el.style.cssText = 'display:flex;align-items:center;gap:7px;cursor:pointer;width:100%;height:100%;box-sizing:border-box;user-select:none;padding:0 10px 0 16px;';

        // Small rounded icon badge — HR demo sub-group style
        var iconWrap = document.createElement('span');
        iconWrap.style.cssText =
          'display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;'
          + 'width:16px;height:16px;border-radius:4px;'
          + 'background:' + clr + '18;color:' + clr + ';'
          + 'transform:rotate(' + (isCollapsed ? '-90deg' : '0deg') + ');'
          + 'transition:transform .2s ease;';
        iconWrap.innerHTML = '<span class="material-icons" style="font-size:11px">expand_more</span>';

        var label = document.createElement('span');
        label.style.cssText = 'font-size:10px;font-weight:600;color:#374151;letter-spacing:.15px';
        label.textContent = r._lbl;

        el.appendChild(iconWrap);
        el.appendChild(label);
        el.addEventListener('click', function() { toggleDHPar(r._parKey); });

        // Register for Open All / Close All sync
        var ref = { _parKey: r._parKey, _iconEl: iconWrap };
        _dhParCells.push(ref);
        return el;
      }
      return '<span style="font-size:9.5px;font-weight:500;color:#536271;padding-left:24px">'+r._lbl+'</span>';
    },
    cellStyle: function(p) {
      var r = p.data, idx = p.node.rowIndex;
      if (r._type === 'par') return { background:'#f8f9fd', display:'flex', alignItems:'center', padding:'4px 10px 4px 0', borderBottom:'1px solid #dde1e2', borderRight:'2px solid #dde1e2' };
      return { background:'#fff', padding:'6px 12px 6px 28px', borderRight:'2px solid #dde1e2' };
    },
  });

  // One column per day
  days.forEach(function(dv, di) {
    var dm = dv.month, dd = dv.day;
    var isToday  = dm===3 && dd===9;
    var isActive = dm===activeMonth && dd===activeDay;
    var isLocked = LOCKED_DAYS.has(dm+'-'+dd);
    var dt  = new Date(2026, dm-1, dd);
    var dba = Math.round((dt - TODAY_WV) / 86400000);
    var evts = (typeof CAL_EVENTS!=='undefined' && CAL_EVENTS[dm+'-'+dd]) ? CAL_EVENTS[dm+'-'+dd] : null;

    colDefs.push({
      field: 'day'+di,
      width: 148,
      suppressMovable: true,
      resizable: false,
      headerComponent: makeDayHeader(dv, isActive, isToday, isLocked, dba, evts),
      cellRenderer: function(p) {
        var r = p.data;
        if (r._type !== 'row') return '';
        var d = dayData[di];
        if (LOCKED_DAYS.has(d.dm+'-'+d.dd)) return '<span style="color:#9ca3af;font-size:12px">—</span>';
        return r._fn(d);
      },
      cellStyle: function(p) {
        var r = p.data, idx = p.node.rowIndex;
        if (r._type === 'par') return { background:'#f8f9fd', padding:'4px 8px', borderBottom:'1px solid #dde1e2', borderRight:'1px solid #dde1e2' };
        return { background:'#fff', padding:'6px 10px', borderRight:'1px solid #dde1e2' };
      },
    });
  });

  // ── Apply custom metric order if set ─────────────────────────────────────
  if (_dhMetricOrder && _dhMetricOrder.length) {
    ROWS = reorderDHRows(ROWS, _dhMetricOrder);
  }

  // ── Expose rows to module level (for Open All / Close All) ──────────────
  _dhAllRows = ROWS;

  // Default collapse state: sections open, parent-rows closed (only set if not yet toggled by user)
  ROWS.forEach(function(r) {
    if (r.type === 'par' && !Object.prototype.hasOwnProperty.call(_dhCollapsed, r.parKey)) {
      _dhCollapsed[r.parKey] = true;
    }
  });

  // ── Build row data (respecting accordion collapse state) ─────────────────
  var rowData = getDHVisibleRowData();

  // ── Create grid ───────────────────────────────────────────────────────────
  _dailyHGridApi = AG.createGrid(wrapper, {
    columnDefs: colDefs,
    rowData: rowData,
    headerHeight: 54,
    domLayout: 'autoHeight',
    suppressHorizontalScroll: false,
    alwaysShowHorizontalScroll: true,
    suppressCellFocus: true,
    suppressRowClickSelection: true,
    getRowHeight: function(p) {
      if (p.data._type === 'sec') return 36;
      if (p.data._type === 'par') return 30;
      // 'row' type: let autoHeight per column determine height
    },
    isFullWidthRow: function(p) {
      return p.rowNode.data._type === 'sec';
    },
    fullWidthCellRenderer: SecRenderer,
    defaultColDef: {
      sortable: false,
      resizable: false,
      autoHeight: true,
    },
    getRowStyle: function(p) {
      var t = p.data._type, idx = p.node.rowIndex;
      if (t === 'sec') return { background:'#f8f9fd', borderTop:'1px solid #dde1e2', borderBottom:'1px solid #dde1e2' };
      if (t === 'par') return { background:'#f8f9fd' };
      if (idx%2===0) return { background:'#fff' };
      return { background:'#fff' };
    },
  });
}

/* ── Close Out Report AG Grid ────────────────────────────────────────────── */
var _coReportGridApi = null;

function initCoReportGrid(days, containerEl) {
  var AG = _realAgGrid;
  if (!AG || typeof AG.createGrid !== 'function') {
    containerEl.innerHTML = buildCoReportView(days);
    return;
  }

  if (_coReportGridApi) { try { _coReportGridApi.destroy(); } catch(e){} _coReportGridApi = null; }
  containerEl.innerHTML = '';
  containerEl.style.padding = '0';

  var wrapper = document.createElement('div');
  wrapper.className = 'ag-theme-quartz co-report-ag-wrap';
  containerEl.appendChild(wrapper);

  var BMAP   = {ai:'All Inclusive', bb:'B&B', hb:'Half Board', ro:'Room Only', fb:'Full Board'};
  var MNAMES = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DOW    = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var TODAY  = new Date(2026, 2, 9);
  var STRAT_COLORS = ['#dc2626','#b45309','#7c3aed','#0891b2','#16a34a'];

  // ── determine max strategies ────────────────────────────────────────────
  var maxStrats = 0;
  days.forEach(function(dv) {
    var r = PARTIAL_CLOSURES[dv.month + '-' + dv.day];
    if (r && r.length > maxStrats) maxStrats = r.length;
  });
  if (maxStrats === 0) maxStrats = 1;

  // ── chip renderer ───────────────────────────────────────────────────────
  function chip(label, color) {
    return '<span style="display:inline-flex;align-items:center;font-size:9px;font-weight:600;padding:1px 6px;border-radius:3px;background:'+color+'18;color:'+color+';border:1px solid '+color+'44;white-space:nowrap;margin:1px 2px">'+label+'</span>';
  }
  var lockSvg = '<svg viewBox="0 0 10 12" fill="none" stroke="currentColor" stroke-width="1.6" width="9" height="10" style="flex-shrink:0"><rect x="1" y="5" width="8" height="7" rx="1"/><path d="M3 5V3.5a2 2 0 0 1 4 0V5"/></svg>';
  var openSvg = '<svg viewBox="0 0 14 14" fill="none" stroke="#15803d" stroke-width="1.8" width="10" height="10"><path d="M2 7l4 4 6-6"/></svg>';

  // ── row data ────────────────────────────────────────────────────────────
  var rowData = days.map(function(dv) {
    var dm = dv.month, dd = dv.day;
    var key = dm + '-' + dd;
    var isFullyLocked = LOCKED_DAYS.has(key);
    var rules = PARTIAL_CLOSURES[key] || [];
    var dt  = new Date(2026, dm - 1, dd);
    var dba = Math.round((dt - TODAY) / 86400000);
    var row = {
      _date:     MNAMES[dm] + ' ' + dd,
      _dow:      DOW[dt.getDay()],
      _dba:      dba === 0 ? 'Today' : dba > 0 ? dba + ' DBA' : '',
      _isToday:  dm === 3 && dd === 9,
      _isLocked: isFullyLocked,
      _evts:     (typeof CAL_EVENTS !== 'undefined' && CAL_EVENTS[key]) ? CAL_EVENTS[key] : null,
    };
    for (var si = 0; si < maxStrats; si++) {
      var rule = isFullyLocked ? null : rules[si];
      row['s' + si + '_hasRule']  = !!rule;
      row['s' + si + '_isLocked'] = isFullyLocked && si === 0; // lock shown once in first strat
      row['s' + si + '_tos']    = rule ? rule.tos    : [];
      row['s' + si + '_rooms']  = rule ? rule.roomTypes : [];
      row['s' + si + '_boards'] = rule ? rule.boards  : [];
    }
    return row;
  });

  // ── custom colored group header ─────────────────────────────────────────
  function makeStratHeader(color) {
    function H() {}
    H.prototype.init = function(p) {
      this.gui = document.createElement('div');
      this.gui.style.cssText = 'background:' + color + ';color:#fff;font-size:10px;font-weight:700;letter-spacing:.3px;display:flex;align-items:center;padding:0 10px;width:100%;height:100%';
      this.gui.textContent = p.displayName;
    };
    H.prototype.getGui = function() { return this.gui; };
    H.prototype.destroy = function() {};
    return H;
  }

  // ── column defs ─────────────────────────────────────────────────────────
  var colDefs = [
    {
      headerName: 'Stay Date', pinned: 'left', lockPinned: true, width: 118, suppressSizeToFit: true,
      sortable: false, resizable: false,
      cellStyle: { padding: '4px 8px', lineHeight: '1.4', display: 'flex', alignItems: 'center' },
      cellRenderer: function(p) {
        var d = p.data;
        return '<div style="line-height:1.5">'
          + '<div style="font-weight:800;font-size:11px;color:' + (d._isLocked ? '#dc2626' : '#111827') + '">'
          + (d._isLocked ? lockSvg + ' ' : '') + d._date + '</div>'
          + '<div style="font-size:9px;color:#6b7280;display:flex;align-items:center;gap:4px;margin-top:1px">'
          + '<span>' + d._dow + '</span>'
          + (d._dba ? '<span style="color:#006461;font-weight:700">' + d._dba + '</span>' : '')
          + (d._evts ? '<span title="' + d._evts.map(function(e){return e.name;}).join(', ') + '" style="width:7px;height:7px;border-radius:2px;background:#C4FF45;display:inline-block;flex-shrink:0"></span>' : '')
          + '</div>'
          + (d._isToday ? '<div style="width:20px;height:2px;background:#006461;border-radius:1px;margin-top:2px"></div>' : '')
          + '</div>';
      }
    }
  ];

  // Strategy column groups
  for (var si = 0; si < maxStrats; si++) {
    (function(idx) {
      var clr  = STRAT_COLORS[idx % STRAT_COLORS.length];
      var pfx  = 's' + idx;

      function opCell(p) {
        var d = p.data;
        if (d[pfx + '_isLocked']) {
          return '<span style="color:#dc2626;font-size:10px;font-weight:700;display:flex;align-items:center;gap:4px">' + lockSvg + ' Full Day Closed</span>';
        }
        if (!d[pfx + '_hasRule']) {
          return idx === 0 && !d._isLocked
            ? '<span style="color:#15803d;display:flex;align-items:center;gap:4px">' + openSvg + '<span style="font-size:10px">Open</span></span>'
            : '';
        }
        var tos = d[pfx + '_tos'];
        return tos.length
          ? tos.map(function(n){ return chip(n, TO_COLORS_MAP[n] || '#dc2626'); }).join('')
          : '<span style="font-size:9px;color:#9ca3af;font-style:italic">All operators</span>';
      }

      function rtCell(p) {
        var d = p.data;
        if (!d[pfx + '_hasRule'] || d[pfx + '_isLocked']) return '';
        var rooms = d[pfx + '_rooms'];
        return rooms.length
          ? rooms.map(function(n){ return chip(n, RT_NAME_COLORS[n] || '#b45309'); }).join('')
          : '<span style="font-size:9px;color:#9ca3af;font-style:italic">All rooms</span>';
      }

      function bdCell(p) {
        var d = p.data;
        if (!d[pfx + '_hasRule'] || d[pfx + '_isLocked']) return '';
        var bds = d[pfx + '_boards'];
        return bds.length
          ? bds.map(function(b){ return chip(BMAP[b] || b, '#7c3aed'); }).join('')
          : '<span style="font-size:9px;color:#9ca3af;font-style:italic">All plans</span>';
      }

      colDefs.push({
        headerName: 'Strategy ' + (idx + 1),
        headerGroupComponent: makeStratHeader(clr),
        children: [
          { headerName: 'Operator',  field: pfx + '_tos',    width: 150, sortable: false, resizable: true, cellRenderer: opCell },
          { headerName: 'Room Type', field: pfx + '_rooms',  width: 130, sortable: false, resizable: true, cellRenderer: rtCell },
          { headerName: 'Meal Plan', field: pfx + '_boards', width: 120, sortable: false, resizable: true, cellRenderer: bdCell },
        ]
      });
    })(si);
  }

  // Full Day column
  colDefs.push({
    headerName: 'Full Day', width: 90, sortable: false, resizable: false,
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' },
    cellRenderer: function(p) {
      return p.data._isLocked
        ? '<span style="color:#dc2626;font-weight:700;display:flex;align-items:center;gap:4px">' + lockSvg + ' Closed</span>'
        : '<span style="color:#15803d;display:flex;align-items:center;gap:4px">' + openSvg + '<span style="font-size:10px">Open</span></span>';
    }
  });

  // ── create grid ─────────────────────────────────────────────────────────
  _coReportGridApi = AG.createGrid(wrapper, {
    columnDefs: colDefs,
    rowData: rowData,
    rowHeight: 44,
    headerHeight: 28,
    groupHeaderHeight: 28,
    domLayout: 'autoHeight',
    suppressHorizontalScroll: false,
    alwaysShowHorizontalScroll: true,
    defaultColDef: {
      sortable: false,
      resizable: true,
      cellStyle: { fontSize: '11px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', padding: '4px 8px' },
    },
    getRowStyle: function(p) {
      if (p.data._isLocked) return { background: '#fef2f2' };
      if (p.data._isToday)  return { background: 'rgba(0,100,97,0.06)' };
      if (p.node.rowIndex % 2) return { background: '#fafafa' };
    },
  });
}

/* ── Daily Revenue AG Grid ───────────────────────────────────────────────── */
var _dailyRevGridApi = null;

function initDailyRevGrid(days, containerEl) {
  _drLastInitArgs = { days: days, container: containerEl };
  var AG = _realAgGrid;
  if (!AG || typeof AG.createGrid !== 'function') {
    containerEl.innerHTML = buildReportView(days);
    return;
  }

  // destroy previous
  if (_dailyRevGridApi) { try { _dailyRevGridApi.destroy(); } catch(e){} _dailyRevGridApi = null; }
  containerEl.innerHTML = '';
  containerEl.style.padding = '0';

  var wrapper = document.createElement('div');
  wrapper.className = 'ag-theme-quartz daily-rev-ag-wrap';
  containerEl.appendChild(wrapper);

  // ── per-day data ──────────────────────────────────────────────────────────
  var WV_CAP = 250;
  var MNAMES = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DOW    = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var TODAY  = new Date(2026,2,9);

  var rowData = days.map(function(dv){
    var dm=dv.month, d2=dv.day;
    var hh=getOccupancy(dm,d2); var hotel=hh.hotel, to=hh.to;
    var adr=150+Math.abs((dm*47+d2*31)%130);
    var v=Math.abs((dm*127+d2*53+dm*d2*7+d2*d2*3))%100;
    var toAdr=Math.max(80,adr-20-Math.abs((dm*3+d2*7)%15));
    var toRn=Math.round(WV_CAP*to/100), hnRn=Math.round(WV_CAP*hotel/100);
    var toRev=Math.floor(toRn*toAdr), hnRev=Math.floor(hnRn*adr);
    var otherPct=Math.max(0,hotel-to), freePct=Math.max(0,100-hotel);
    var toRms=toRn, otherRms=Math.round(WV_CAP*otherPct/100);
    var freeRms=WV_CAP-toRms-otherRms;
    var fitPct=Math.round(to*0.45), dynPct=Math.round(to*0.35), serPct=to-fitPct-dynPct;
    var revpar=Math.max(50,(adr+80)-30-Math.abs((dm*5+d2*3)%20));
    var hotelRevpar=adr+80;
    var pickup=Math.max(0,Math.floor((v%25+5)*to/Math.max(1,hotel)));
    var hotelPickup=Math.floor(v%25+5);
    var sdlyH=Math.max(5,hotel-9), lyH=Math.max(5,hotel-6), fcstH=Math.min(100,hotel+4);
    var sdlyA=adr-8, lyA=adr-4, fcstA=adr+6;
    var sdlyR=Math.floor(hnRev*0.9), lyR=Math.floor(hnRev*0.95), fcstR=Math.floor(hnRev*1.06);
    var sdlyRevpar=Math.max(40,revpar-8), lyRevpar=Math.max(40,revpar-4);
    var toMix=28+Math.abs((dm*7+d2*5)%25), dirMix=30+Math.abs((dm*5+d2*9)%20);
    var otaMix=20+Math.abs((dm*9+d2*3)%18), otherMix=Math.max(0,100-toMix-dirMix-otaMix);
    var aiPct=Math.max(45,Math.min(68,55+(dm*7+d2*3)%14));
    var bbPct=Math.max(14,Math.min(28,20+(dm*11+d2*5)%11));
    var hbPct=Math.max(6,Math.min(16,10+(dm*5+d2*7)%9));
    var roPct=100-aiPct-bbPct-hbPct;
    var tcRates=[0,1,2,3,4].map(function(i){return adr-15+Math.abs((dm*(i+3)+d2*(i+5))%50);});
    var baseRate=adr+8;
    var dt=new Date(2026,dm-1,d2);
    var dow=DOW[dt.getDay()];
    var dba=Math.round((dt-TODAY)/86400000);
    var dbaStr=dba===0?'Today':dba>0?dba+' DBA':'';
    function fR(x){return x>=1000000?'$'+(x/1000000).toFixed(1)+'M':'$'+Math.round(x/1000)+'k';}
    var onPct=Math.max(30,Math.min(80,45+Math.abs((dm*13+d2*7)%35)));
    return {
      _date:MNAMES[dm]+' '+d2, _dow:dow, _dba:dbaStr, _isToday:dm===3&&d2===9,
      occ_t:to+'%',    occ_h:hotel+'%',  occ_stly:sdlyH+'%', occ_ly:lyH+'%', occ_fcst:fcstH+'%',
      adr_t:'$'+toAdr, adr_h:'$'+adr,   adr_diff:(toAdr-adr>=0?'+':'')+(toAdr-adr),
      adr_stly:'$'+sdlyA, adr_ly:'$'+lyA, adr_fcst:'$'+fcstA,
      rev_t:fR(toRev),  rev_h:fR(hnRev), rev_stly:fR(sdlyR), rev_ly:fR(lyR), rev_fcst:fR(fcstR),
      rp_t:'$'+revpar,  rp_h:'$'+hotelRevpar, rp_stly:'$'+sdlyRevpar, rp_ly:'$'+lyRevpar,
      pk_t:'+'+pickup,  pk_h:'+'+hotelPickup,
      td_rms:toRms+' RN',    td_pct:to+'%',
      os_rms:otherRms+' RN', os_pct:otherPct+'%',
      rem_rms:freeRms+' RN', rem_pct:Math.max(0,Math.round(freePct))+'%',
      on_on:onPct+'%', on_off:(100-onPct)+'%',
      fit_rms:Math.round(250*fitPct/100)+' RN', fit_pct:fitPct+'%',
      dyn_rms:Math.round(250*dynPct/100)+' RN', dyn_pct:dynPct+'%',
      ser_rms:Math.round(250*serPct/100)+' RN', ser_pct:serPct+'%',
      biz_to:toMix+'%', biz_dir:dirMix+'%', biz_ota:otaMix+'%', biz_oth:otherMix+'%',
      mp_ai_h:Math.round(hnRn*aiPct/100), mp_ai_t:Math.round(toRn*aiPct/100), mp_ai_pct:aiPct+'%',
      mp_bb_h:Math.round(hnRn*bbPct/100), mp_bb_t:Math.round(toRn*bbPct/100), mp_bb_pct:bbPct+'%',
      mp_hb_h:Math.round(hnRn*hbPct/100), mp_hb_t:Math.round(toRn*hbPct/100), mp_hb_pct:hbPct+'%',
      mp_ro_h:Math.round(hnRn*roPct/100), mp_ro_t:Math.round(toRn*roPct/100), mp_ro_pct:roPct+'%',
      tc_0:'$'+tcRates[0], tc_1:'$'+tcRates[1], tc_2:'$'+tcRates[2],
      tc_3:'$'+tcRates[3], tc_4:'$'+tcRates[4], tc_base:'$'+baseRate,
    };
  });

  // ── helpers ───────────────────────────────────────────────────────────────
  function cs(color, bold){ return { color:color, fontWeight:bold?'700':'400', display:'flex', alignItems:'center' }; }
  function csFn(fn){ return function(p){ return fn(p); }; }
  var BASE_COL = {
    sortable: false, resizable: true, suppressMovable: false,
    cellStyle: { fontSize:'11px', display:'flex', alignItems:'center' },
    headerComponentParams: {}
  };

  // ── column defs ───────────────────────────────────────────────────────────
  // Group colDefs keyed by headerName for reorder support
  var drGroupColDefs = {
    'Daily Metrics':
    { headerName:'Daily Metrics', headerClass:'drg-top drg-daily', openByDefault:true, children:[
      { headerName:'Occupancy', children:[
        {field:'occ_t',    headerName:'T',     width:65, cellStyle:cs('#006461',true)},
        {field:'occ_h',    headerName:'Hotel', width:70, cellStyle:cs('#374151')},
        {field:'occ_stly', headerName:'STLY',  width:68, cellStyle:cs('#9ca3af')},
        {field:'occ_ly',   headerName:'LY',    width:65, cellStyle:cs('#9ca3af')},
        {field:'occ_fcst', headerName:'Fcst',  width:68, cellStyle:cs('#f59e0b')},
      ]},
      { headerName:'ADR', children:[
        {field:'adr_t',    headerName:'T',     width:70, cellStyle:cs('#7c3aed',true)},
        {field:'adr_h',    headerName:'Hotel', width:70, cellStyle:cs('#374151')},
        {field:'adr_diff', headerName:'Diff',  width:65, cellStyle:csFn(function(p){return {color:p.value&&p.value.charAt(0)==='-'?'#dc2626':'#16a34a',display:'flex',alignItems:'center'};})},
        {field:'adr_stly', headerName:'STLY',  width:70, cellStyle:cs('#9ca3af')},
        {field:'adr_ly',   headerName:'LY',    width:70, cellStyle:cs('#9ca3af')},
        {field:'adr_fcst', headerName:'Fcst',  width:70, cellStyle:cs('#f59e0b')},
      ]},
      { headerName:'Revenue', children:[
        {field:'rev_t',    headerName:'T',     width:80, cellStyle:cs('#ea580c',true)},
        {field:'rev_h',    headerName:'Hotel', width:80, cellStyle:cs('#374151')},
        {field:'rev_stly', headerName:'STLY',  width:80, cellStyle:cs('#9ca3af')},
        {field:'rev_ly',   headerName:'LY',    width:80, cellStyle:cs('#9ca3af')},
        {field:'rev_fcst', headerName:'Fcst',  width:80, cellStyle:cs('#f59e0b')},
      ]},
      { headerName:'RevPAR', children:[
        {field:'rp_t',    headerName:'T',     width:70, cellStyle:cs('#9333ea',true)},
        {field:'rp_h',    headerName:'Hotel', width:70, cellStyle:cs('#374151')},
        {field:'rp_stly', headerName:'STLY',  width:70, cellStyle:cs('#9ca3af')},
        {field:'rp_ly',   headerName:'LY',    width:70, cellStyle:cs('#9ca3af')},
      ]},
      { headerName:'Pickup', children:[
        {field:'pk_t', headerName:'T',     width:65, cellStyle:cs('#16a34a',true)},
        {field:'pk_h', headerName:'Hotel', width:70, cellStyle:cs('#374151')},
      ]},
    ]},
    'Room Avail.':
    { headerName:'Room Avail.', headerClass:'drg-top drg-avail', openByDefault:true, children:[
      { headerName:'T Dist. Hubs', children:[
        {field:'td_rms', headerName:'Rooms', width:85, cellStyle:cs('#006461',true)},
        {field:'td_pct', headerName:'%',     width:60, cellStyle:cs('#006461')},
      ]},
      { headerName:'Other Segs', children:[
        {field:'os_rms', headerName:'Rooms', width:85, cellStyle:cs('#5883ed')},
        {field:'os_pct', headerName:'%',     width:60, cellStyle:cs('#5883ed')},
      ]},
      { headerName:'Remaining', children:[
        {field:'rem_rms', headerName:'Rooms', width:85, cellStyle:cs('#16a34a',true)},
        {field:'rem_pct', headerName:'%',     width:60, cellStyle:cs('#16a34a')},
      ]},
      { headerName:'Online/Offline', children:[
        {field:'on_on',  headerName:'Online',  width:75, cellStyle:cs('#3b82f6')},
        {field:'on_off', headerName:'Offline', width:75, cellStyle:cs('#f97316')},
      ]},
    ]},
    'Segments (T)':
    { headerName:'Segments (T)', headerClass:'drg-top drg-segs', openByDefault:true, children:[
      { headerName:'Static FIT', children:[
        {field:'fit_rms', headerName:'Rooms', width:85, cellStyle:cs('#006461',true)},
        {field:'fit_pct', headerName:'%',     width:60},
      ]},
      { headerName:'TO Dynamic', children:[
        {field:'dyn_rms', headerName:'Rooms', width:85, cellStyle:cs('#0891b2',true)},
        {field:'dyn_pct', headerName:'%',     width:60},
      ]},
      { headerName:'Tour Series', children:[
        {field:'ser_rms', headerName:'Rooms', width:85, cellStyle:cs('#6366f1',true)},
        {field:'ser_pct', headerName:'%',     width:60},
      ]},
    ]},
    'Business Mix':
    { headerName:'Business Mix', headerClass:'drg-top drg-biz', openByDefault:true, children:[
      {field:'biz_to',  headerName:'TO',     width:75, cellStyle:cs('#006461',true)},
      {field:'biz_dir', headerName:'Direct', width:85, cellStyle:cs('#0284c7',true)},
      {field:'biz_ota', headerName:'OTA',    width:75, cellStyle:cs('#D97706',true)},
      {field:'biz_oth', headerName:'Other',  width:75, cellStyle:cs('#9ca3af')},
    ]},
    'Meal Plans':
    { headerName:'Meal Plans', headerClass:'drg-top drg-meals', openByDefault:false, children:[
      { headerName:'AI', children:[
        {field:'mp_ai_h',   headerName:'Hotel', width:72, cellStyle:cs('#374151')},
        {field:'mp_ai_t',   headerName:'T',     width:65, cellStyle:cs('#006461',true)},
        {field:'mp_ai_pct', headerName:'Occ',   width:65},
      ]},
      { headerName:'BB', children:[
        {field:'mp_bb_h',   headerName:'Hotel', width:72, cellStyle:cs('#374151')},
        {field:'mp_bb_t',   headerName:'T',     width:65, cellStyle:cs('#3b82f6',true)},
        {field:'mp_bb_pct', headerName:'Occ',   width:65},
      ]},
      { headerName:'HB', children:[
        {field:'mp_hb_h',   headerName:'Hotel', width:72, cellStyle:cs('#374151')},
        {field:'mp_hb_t',   headerName:'T',     width:65, cellStyle:cs('#967EF3',true)},
        {field:'mp_hb_pct', headerName:'Occ',   width:65},
      ]},
      { headerName:'RO', children:[
        {field:'mp_ro_h',   headerName:'Hotel', width:72, cellStyle:cs('#374151')},
        {field:'mp_ro_t',   headerName:'T',     width:65, cellStyle:cs('#f59e0b',true)},
        {field:'mp_ro_pct', headerName:'Occ',   width:65},
      ]},
    ]},
    'Travel Co. Rates':
    { headerName:'Travel Co. Rates', headerClass:'drg-top drg-tc', openByDefault:true, children:[
      {field:'tc_0',    headerName:'Sunshine',    width:92, cellStyle:cs('#3b82f6',true)},
      {field:'tc_1',    headerName:'Global Adv.', width:105, cellStyle:cs('#967EF3',true)},
      {field:'tc_2',    headerName:'Beach Hols',  width:100, cellStyle:cs('#0ea5e9',true)},
      {field:'tc_3',    headerName:'City Breaks',  width:100, cellStyle:cs('#10b981',true)},
      {field:'tc_4',    headerName:'Adventure',   width:92, cellStyle:cs('#f59e0b',true)},
      {field:'tc_base', headerName:'Base Rate',   width:92, cellStyle:cs('#9333ea',true)},
    ]},
  };

  // Build ordered colDefs (pinned date + groups in custom or default order)
  var groupOrder = (_drColOrder && _drColOrder.length) ? _drColOrder : DR_GROUPS_DEF.map(function(g){return g.key;});
  var colDefs = [{
    headerName:'Stay Date', pinned:'left', lockPinned:true, width:140, suppressSizeToFit:true,
    cellRenderer: function(p){
      var d=p.data;
      return '<div style="line-height:1.4;padding:2px 0">'
        +'<div style="font-weight:800;font-size:11px;color:#111827">'+d._date+'</div>'
        +'<div style="font-size:9px;color:#6b7280;display:flex;align-items:center;gap:4px">'
        +'<span>'+d._dow+'</span>'
        +(d._dba?'<span style="color:#006461;font-weight:700">'+d._dba+'</span>':'')
        +'</div>'
        +(d._isToday?'<div style="width:24px;height:2px;background:#006461;border-radius:1px;margin-top:2px"></div>':'')
        +'</div>';
    }
  }];
  groupOrder.forEach(function(k){ if(drGroupColDefs[k]) colDefs.push(drGroupColDefs[k]); });

  // ── create grid ───────────────────────────────────────────────────────────
  _dailyRevGridApi = AG.createGrid(wrapper, {
    columnDefs: colDefs,
    rowData: rowData,
    rowHeight: 42,
    headerHeight: 26,
    groupHeaderHeight: 26,
    domLayout: 'autoHeight',
    suppressHorizontalScroll: false,
    alwaysShowHorizontalScroll: true,
    defaultColDef: Object.assign({}, BASE_COL),
    getRowStyle: function(p){
      if(p.data._isToday) return {background:'rgba(0,100,97,0.06)',fontWeight:'700'};
      if(p.node.rowIndex%2) return {background:'#fafafa'};
    },
    onGridReady: function(e){ e.api.sizeColumnsToFit && false; /* keep explicit widths */ },
  });
}

// ── Report View ──────────────────────────────────────────────────────────────
function buildReportView(days) {
  var WV_CAP2 = 250;
  var collapsed = window._rptCollapsed || {};

  // ── Per-day data helper ───────────────────────────────────────────────────
  function dd(dm, dd2) {
    var hh = getOccupancy(dm, dd2); var hotel=hh.hotel, to=hh.to;
    var adr  = 150+Math.abs((dm*47+dd2*31)%130);
    var v    = Math.abs((dm*127+dd2*53+dm*dd2*7+dd2*dd2*3))%100;
    var toAdr= Math.max(80,adr-20-Math.abs((dm*3+dd2*7)%15));
    var toRn = Math.round(WV_CAP2*to/100);
    var hnRn = Math.round(WV_CAP2*hotel/100);
    var toRev= Math.floor(toRn*toAdr);
    var hnRev= Math.floor(hnRn*adr);
    var otherPct=Math.max(0,hotel-to), freePct=100-hotel;
    var toRms=Math.round(WV_CAP2*to/100), otherRms=Math.round(WV_CAP2*otherPct/100);
    var freeRms=WV_CAP2-toRms-otherRms;
    var fitPct=Math.round(to*0.45),dynPct=Math.round(to*0.35),serPct=to-fitPct-dynPct;
    var onlinePct=Math.max(30,Math.min(80,45+Math.abs((dm*13+dd2*7)%35)));
    var adrBar=Math.min(95,40+Math.abs((dm*11+dd2*19)%55));
    var revBar=Math.min(95,35+Math.abs((dm*17+dd2*13)%60));
    var revpar=Math.max(50,(adr+80)-30-Math.abs((dm*5+dd2*3)%20));
    var hotelRevpar=adr+80;
    var pickup=Math.max(0,Math.floor((v%25+5)*to/Math.max(1,hotel)));
    var hotelPickup=Math.floor(v%25+5);
    var avgA=(1.8+v%3*0.1).toFixed(1), avgC=(0.3+v%2*0.1).toFixed(1);
    var hAvgA=(parseFloat(avgA)+0.3).toFixed(1), hAvgC=(parseFloat(avgC)+0.1).toFixed(1);
    var totG=Math.round(toRn*(parseFloat(avgA)+parseFloat(avgC)));
    var hTotG=Math.round(hnRn*(parseFloat(hAvgA)+parseFloat(hAvgC)));
    var avgLos=(2.8+v%5*0.3).toFixed(1)+'n', hLos=(2.8+v%5*0.3+0.4).toFixed(1)+'n';
    var avgLead=(18+v%60)+'d', hLead=(18+v%60+12)+'d';
    var availRooms=Math.max(0,102-Math.floor(hotel*1.02));
    var availGuar=Math.floor(8+v%5);
    var aiPct=Math.max(45,Math.min(68,55+(dm*7+dd2*3)%14));
    var bbPct=Math.max(14,Math.min(28,20+(dm*11+dd2*5)%11));
    var hbPct=Math.max(6,Math.min(16,10+(dm*5+dd2*7)%9));
    var roPct=100-aiPct-bbPct-hbPct;
    var toPct=to/Math.max(1,hotel);
    var mealPlans=[
      {n:'AI',s:'All Inclusive',pct:aiPct,toPct:Math.round(aiPct*toPct*(0.9+(dm+dd2)%3*0.05)),c:'#006461'},
      {n:'BB',s:'Bed & Breakfast',pct:bbPct,toPct:Math.round(bbPct*toPct*(0.85+(dm*3+dd2)%3*0.05)),c:'#3b82f6'},
      {n:'HB',s:'Half Board',pct:hbPct,toPct:Math.round(hbPct*toPct*(0.8+(dm+dd2*2)%3*0.05)),c:'#967EF3'},
      {n:'RO',s:'Room Only',pct:roPct,toPct:Math.round(roPct*toPct*(0.95+(dm*2+dd2)%3*0.03)),c:'#f59e0b'},
    ];
    var toMix=28+Math.abs((dm*7+dd2*5)%25),dirMix=30+Math.abs((dm*5+dd2*9)%20),otaMix=20+Math.abs((dm*9+dd2*3)%18);
    var otherMix=Math.max(0,100-toMix-dirMix-otaMix);
    var tcRates=[0,1,2,3,4].map(function(i){return adr-15+Math.abs((dm*(i+3)+dd2*(i+5))%50);});
    var baseRate=adr+8;
    var sdlyH=Math.max(5,hotel-9),lyH=Math.max(5,hotel-6),fcstH=Math.min(100,hotel+4);
    var sdlyA=adr-8,lyA=adr-4,fcstA=adr+6;
    var sdlyR=Math.floor(hnRev*0.9),lyR=Math.floor(hnRev*0.95),fcstR=Math.floor(hnRev*1.06);
    // EBB 10% for first 3 days of week, Contract for other 4
    var dayOfWeek2=(new Date(2026,dm-1,dd2)).getDay(); // 0=Sun
    var isEbb2=dayOfWeek2<3; // Sun/Mon/Tue → EBB, rest → Contract
    var ebbPromo={n:'Early Bird 10%',t:'EBB 10%',d:10,c:'#16a34a'};
    var contractPromo={n:'Contract Rate',t:'Contract',d:0,c:'#2563eb'};
    var tcPromos=[0,1,2,3,4].map(function(i){
      return isEbb2 ? ebbPromo : contractPromo;
    });
      var sdlyRevpar=Math.max(40,revpar-8), lyRevpar=Math.max(40,revpar-4);
      var sdlyRn=Math.round(toRn*0.88), lyRn=Math.round(toRn*0.93), fcstRn=Math.round(toRn*1.06);
      var totAdultsT=Math.round(toRn*parseFloat(avgA)), totChildrenT=Math.round(toRn*parseFloat(avgC));
      var totAdultsH=Math.round(hnRn*parseFloat(hAvgA)), totChildrenH=Math.round(hnRn*parseFloat(hAvgC));
      // Meal plan guest counts (rooms * avg occupancy)
      mealPlans=mealPlans.map(function(p,pi){
        var hotelRms=Math.round(hnRn*p.pct/100);
        var toRmsPlan=Math.max(0,Math.round(toRn*Math.max(0,p.toPct)/100));
        var hAdults=Math.round(hotelRms*parseFloat(hAvgA)), hChildren=Math.round(hotelRms*parseFloat(hAvgC));
        var tAdults=Math.round(toRmsPlan*parseFloat(avgA)), tChildren=Math.round(toRmsPlan*parseFloat(avgC));
        // ADR Gross = adr, ADR Net = adr * 0.88 (net of commission)
        var hAdrGross=adr+[0,4,-2,6][pi%4], hAdrNet=Math.round(hAdrGross*0.88);
        var tAdrGross=toAdr+[0,3,-1,5][pi%4], tAdrNet=Math.round(tAdrGross*0.88);
        var hRev=Math.floor(hotelRms*hAdrGross), tRev=Math.floor(toRmsPlan*tAdrGross);
        return Object.assign({},p,{
          toPct:Math.max(0,p.toPct),
          hotelRms:hotelRms, toRms:toRmsPlan,
          hAdults:hAdults,   tAdults:tAdults,
          hChildren:hChildren, tChildren:tChildren,
          hGuests:hAdults+hChildren, tGuests:tAdults+tChildren,
          hRev:hRev, tRev:tRev,
          hAdrGross:hAdrGross, tAdrGross:tAdrGross,
          hAdrNet:hAdrNet, tAdrNet:tAdrNet,
          hotelGuests:hAdults+hChildren, toGuests:tAdults+tChildren
        });
      });
        var RT2=[['Standard',51],['Superior',36],['Deluxe',27],['Suite',12],['Jr. Suite',15],['Family',9]];
        var rtRows2=RT2.map(function(r,ri){
          var inv=r[1];
          var totalSold=Math.min(inv,Math.floor(inv*hotel/110));
          var toSold=Math.min(totalSold,Math.round(totalSold*to/Math.max(1,hotel)));
          var otherSold=totalSold-toSold;
          var toAlloc=Math.floor(inv*0.8+Math.abs((dm*(ri+3)+dd2*(ri+5))%15));
          var avail=Math.max(0,inv-totalSold);
          return{name:r[0],cap:inv,toRn:toSold,otherRn:otherSold,alloc:toAlloc,avail:avail};
        });
        return {hotel,to,adr,toAdr,toRn,hnRn,toRev,hnRev,otherPct,freePct,toRms,otherRms,freeRms,
          fitPct,dynPct,serPct,onlinePct,revpar,hotelRevpar,sdlyRevpar,lyRevpar,pickup,hotelPickup,
          avgA,avgC,hAvgA,hAvgC,totG,hTotG,avgLos,hLos,avgLead,hLead,availRooms,availGuar,
          aiPct,bbPct,hbPct,roPct,mealPlans,toMix,dirMix,otaMix,otherMix,tcRates,tcPromos,baseRate,
          sdlyH,lyH,fcstH,sdlyA,lyA,fcstA,sdlyR,lyR,fcstR,
          sdlyRn,lyRn,fcstRn,totAdultsT,totChildrenT,totAdultsH,totChildrenH,rtRows2,v};
  }

  function fmtRev(v){return v>=1000000?'$'+(v/1000000).toFixed(1)+'M':'$'+Math.round(v/1000)+'k';}
  var GROUPS = [
    // ── Daily Metrics ────────────────────────────────────────────────────────
    { id:'daily', label:'Daily Metrics', clr:'#006461', metrics:[
      { lbl:'Occupancy', cols:[
        {child:'T',     fn:function(d){return{t:d.to+'%',      clr:'#006461',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:d.hotel+'%',   clr:'#374151'};}},
        {child:'STLY',  fn:function(d){return{t:d.sdlyH+'%',   clr:'#9ca3af'};}},
        {child:'LY',    fn:function(d){return{t:d.lyH+'%',     clr:'#9ca3af'};}},
        {child:'Fcst',  fn:function(d){return{t:d.fcstH+'%',   clr:'#f59e0b'};}},
      ]},
      { lbl:'T Dist. Hubs', cols:[
        {child:'Rooms', fn:function(d){return{t:d.toRms+' RN', clr:'#006461',bold:true};}},
        {child:'%',     fn:function(d){return{t:d.to+'%',      clr:'#006461'};}},
      ]},
      { lbl:'Other Segs', cols:[
        {child:'Rooms', fn:function(d){return{t:d.otherRms+' RN',clr:'#5883ed'};}},
        {child:'%',     fn:function(d){return{t:d.otherPct+'%', clr:'#5883ed'};}},
      ]},
      { lbl:'Remaining', cols:[
        {child:'Rooms', fn:function(d){return{t:d.freeRms+' RN',clr:'#16a34a',bold:true};}},
        {child:'%',     fn:function(d){return{t:Math.max(0,Math.round(d.freePct))+'%',clr:'#16a34a'};}},
      ]},
      { lbl:'Online/Offline', cols:[
        {child:'Online', fn:function(d){return{t:d.onlinePct+'%',      clr:'#3b82f6'};}},
        {child:'Offline',fn:function(d){return{t:(100-d.onlinePct)+'%',clr:'#f97316'};}},
      ]},
      { lbl:'ADR', cols:[
        {child:'T',     fn:function(d){return{t:'$'+d.toAdr,  clr:'#7c3aed',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:'$'+d.adr,    clr:'#374151'};}},
        {child:'Diff',  fn:function(d){var df=d.toAdr-d.adr;return{t:(df>=0?'+':'')+df,clr:df>=0?'#16a34a':'#dc2626'};}},
        {child:'STLY',  fn:function(d){return{t:'$'+d.sdlyA,  clr:'#9ca3af'};}},
        {child:'LY',    fn:function(d){return{t:'$'+d.lyA,    clr:'#9ca3af'};}},
        {child:'Fcst',  fn:function(d){return{t:'$'+d.fcstA,  clr:'#f59e0b'};}},
      ]},
      { lbl:'Revenue', cols:[
        {child:'T',     fn:function(d){return{t:fmtRev(d.toRev), clr:'#ea580c',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:fmtRev(d.hnRev), clr:'#374151'};}},
        {child:'STLY',  fn:function(d){return{t:fmtRev(d.sdlyR), clr:'#9ca3af'};}},
        {child:'LY',    fn:function(d){return{t:fmtRev(d.lyR),   clr:'#9ca3af'};}},
        {child:'Fcst',  fn:function(d){return{t:fmtRev(d.fcstR), clr:'#f59e0b'};}},
      ]},
      { lbl:'RevPAR', cols:[
        {child:'T',     fn:function(d){return{t:'$'+d.revpar,      clr:'#9333ea',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:'$'+d.hotelRevpar, clr:'#374151'};}},
        {child:'STLY',  fn:function(d){return{t:'$'+d.sdlyRevpar,  clr:'#9ca3af'};}},
        {child:'LY',    fn:function(d){return{t:'$'+d.lyRevpar,    clr:'#9ca3af'};}},
      ]},
      { lbl:'Pickup', cols:[
        {child:'T',     fn:function(d){return{t:'+'+d.pickup,      clr:'#16a34a',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:'+'+d.hotelPickup, clr:'#374151'};}},
      ]},
    ]},

    // ── Segments (T only) ────────────────────────────────────────────────────
    { id:'segs', label:'Segments (T)', clr:'#0891b2', metrics:[
      { lbl:'Static FIT', cols:[
        {child:'Rooms', fn:function(d){return{t:Math.round(250*d.fitPct/100)+' RN',clr:'#006461',bold:true};}},
        {child:'%',     fn:function(d){return{t:d.fitPct+'%', clr:'#006461'};}},
      ]},
      { lbl:'TO Dynamic', cols:[
        {child:'Rooms', fn:function(d){return{t:Math.round(250*d.dynPct/100)+' RN',clr:'#0891b2',bold:true};}},
        {child:'%',     fn:function(d){return{t:d.dynPct+'%', clr:'#0891b2'};}},
      ]},
      { lbl:'Tour Series', cols:[
        {child:'Rooms', fn:function(d){return{t:Math.round(250*d.serPct/100)+' RN',clr:'#6366f1',bold:true};}},
        {child:'%',     fn:function(d){return{t:d.serPct+'%', clr:'#6366f1'};}},
      ]},
    ]},

    // ── More Metrics ─────────────────────────────────────────────────────────
    { id:'more', label:'More Metrics', clr:'#2e65e8', metrics:[
      { lbl:'RN Sold', cols:[
        {child:'T',     fn:function(d){return{t:d.toRn,        clr:'#2e65e8',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:d.hnRn,        clr:'#374151'};}},
        {child:'STLY',  fn:function(d){return{t:d.sdlyRn,      clr:'#9ca3af'};}},
        {child:'LY',    fn:function(d){return{t:d.lyRn,        clr:'#9ca3af'};}},
        {child:'Fcst',  fn:function(d){return{t:d.fcstRn,      clr:'#f59e0b'};}},
      ]},
      { lbl:'Avg Adults', cols:[
        {child:'T',     fn:function(d){return{t:d.avgA,        clr:'#2e65e8',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:d.hAvgA,       clr:'#374151'};}},
      ]},
      { lbl:'Avg Children', cols:[
        {child:'T',     fn:function(d){return{t:d.avgC,        clr:'#d33030',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:d.hAvgC,       clr:'#374151'};}},
      ]},
      { lbl:'Total Adults', cols:[
        {child:'T',     fn:function(d){return{t:d.totAdultsT,  clr:'#2e65e8',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:d.totAdultsH,  clr:'#374151'};}},
      ]},
      { lbl:'Total Children', cols:[
        {child:'T',     fn:function(d){return{t:d.totChildrenT,clr:'#d33030',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:d.totChildrenH,clr:'#374151'};}},
      ]},
      { lbl:'Tot. Guests', cols:[
        {child:'T',     fn:function(d){return{t:d.totG,        clr:'#0369a1',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:d.hTotG,       clr:'#374151'};}},
      ]},
      { lbl:'Avg LOS', cols:[
        {child:'T',     fn:function(d){return{t:d.avgLos,      clr:'#0891b2',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:d.hLos,        clr:'#374151'};}},
      ]},
      { lbl:'Lead Time', cols:[
        {child:'T',     fn:function(d){return{t:d.avgLead,     clr:'#6366f1',bold:true};}},
        {child:'Hotel', fn:function(d){return{t:d.hLead,       clr:'#374151'};}},
      ]},
    ]},

    // ── Room Availability (per room type) ─────────────────────────────────────
    { id:'avail', label:'Room Availability', clr:'#16a34a',
      get metrics(){
        var cols=['Standard','Superior','Deluxe','Suite','Jr. Suite','Family'];
        var mets=cols.map(function(nm,ri){
          var cap2=[51,36,27,12,15,9][ri];
          return { lbl:nm+' ('+cap2+')', cols:[
            {child:'TO RN', fn:function(d){var r=d.rtRows2[ri];return{t:r.toRn,   clr:'#006461',bold:true};}},
            {child:'Other', fn:function(d){var r=d.rtRows2[ri];return{t:r.otherRn,clr:'#5883ed'};}},
            {child:'Alloc', fn:function(d){var r=d.rtRows2[ri];return{t:r.alloc,  clr:'#fb923c'};}},
            {child:'Avail', fn:function(d){var r=d.rtRows2[ri];var av=r.avail;return{t:av,clr:av===0?'#ef4444':'#16a34a',bold:true};}},
          ]};
        });
        // Add totals row
        mets.push({ lbl:'TOTAL', cols:[
          {child:'Cap',   fn:function(d){return{t:d.rtRows2.reduce(function(s,r){return s+r.cap;},0),    clr:'#374151',bold:true};}},
          {child:'TO RN', fn:function(d){return{t:d.rtRows2.reduce(function(s,r){return s+r.toRn;},0),   clr:'#006461',bold:true};}},
          {child:'Other', fn:function(d){return{t:d.rtRows2.reduce(function(s,r){return s+r.otherRn;},0),clr:'#5883ed',bold:true};}},
          {child:'Alloc', fn:function(d){return{t:d.rtRows2.reduce(function(s,r){return s+r.alloc;},0),  clr:'#fb923c',bold:true};}},
          {child:'Avail', fn:function(d){var av=d.rtRows2.reduce(function(s,r){return s+r.avail;},0);return{t:av,clr:av===0?'#ef4444':'#16a34a',bold:true};}},
        ]});
        return mets;
      }
    },

    // ── Meal Plans — 4 separate collapsible groups ────────────────────────────
    { id:'mp_ai', label:'Meal Plan: AI', clr:'#006461', metrics:[
      { lbl:'Rooms Sold', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[0].hotelRms,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[0].toRms,    clr:'#006461',bold:true};}},
      ]},
      { lbl:'Occ %', cols:[
        {child:'Hotel', fn:function(d){return{t:d.aiPct+'%',                             clr:'#374151'};}},
        {child:'TO',    fn:function(d){return{t:Math.max(0,d.mealPlans[0].toPct)+'%',   clr:'#006461',bold:true};}},
      ]},
      { lbl:'Adults', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[0].hAdults,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[0].tAdults,  clr:'#006461',bold:true};}},
      ]},
      { lbl:'Children', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[0].hChildren,clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[0].tChildren,clr:'#006461',bold:true};}},
      ]},
      { lbl:'Tot. Guests', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[0].hGuests,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[0].tGuests,  clr:'#006461',bold:true};}},
      ]},
      { lbl:'Revenue', cols:[
        {child:'Hotel', fn:function(d){return{t:fmtRev(d.mealPlans[0].hRev),clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:fmtRev(d.mealPlans[0].tRev),clr:'#006461',bold:true};}},
      ]},
      { lbl:'ADR Gross', cols:[
        {child:'Hotel', fn:function(d){return{t:'$'+d.mealPlans[0].hAdrGross,clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:'$'+d.mealPlans[0].tAdrGross,clr:'#006461',bold:true};}},
      ]},
      { lbl:'ADR Net', cols:[
        {child:'Hotel', fn:function(d){return{t:'$'+d.mealPlans[0].hAdrNet, clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:'$'+d.mealPlans[0].tAdrNet, clr:'#006461',bold:true};}},
      ]},
    ]},
    { id:'mp_bb', label:'Meal Plan: BB', clr:'#3b82f6', metrics:[
      { lbl:'Rooms Sold', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[1].hotelRms,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[1].toRms,    clr:'#3b82f6',bold:true};}},
      ]},
      { lbl:'Occ %', cols:[
        {child:'Hotel', fn:function(d){return{t:d.bbPct+'%',                             clr:'#374151'};}},
        {child:'TO',    fn:function(d){return{t:Math.max(0,d.mealPlans[1].toPct)+'%',   clr:'#3b82f6',bold:true};}},
      ]},
      { lbl:'Adults', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[1].hAdults,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[1].tAdults,  clr:'#3b82f6',bold:true};}},
      ]},
      { lbl:'Children', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[1].hChildren,clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[1].tChildren,clr:'#3b82f6',bold:true};}},
      ]},
      { lbl:'Tot. Guests', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[1].hGuests,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[1].tGuests,  clr:'#3b82f6',bold:true};}},
      ]},
      { lbl:'Revenue', cols:[
        {child:'Hotel', fn:function(d){return{t:fmtRev(d.mealPlans[1].hRev),clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:fmtRev(d.mealPlans[1].tRev),clr:'#3b82f6',bold:true};}},
      ]},
      { lbl:'ADR Gross', cols:[
        {child:'Hotel', fn:function(d){return{t:'$'+d.mealPlans[1].hAdrGross,clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:'$'+d.mealPlans[1].tAdrGross,clr:'#3b82f6',bold:true};}},
      ]},
      { lbl:'ADR Net', cols:[
        {child:'Hotel', fn:function(d){return{t:'$'+d.mealPlans[1].hAdrNet, clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:'$'+d.mealPlans[1].tAdrNet, clr:'#3b82f6',bold:true};}},
      ]},
    ]},
    { id:'mp_hb', label:'Meal Plan: HB', clr:'#967EF3', metrics:[
      { lbl:'Rooms Sold', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[2].hotelRms,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[2].toRms,    clr:'#967EF3',bold:true};}},
      ]},
      { lbl:'Occ %', cols:[
        {child:'Hotel', fn:function(d){return{t:d.hbPct+'%',                             clr:'#374151'};}},
        {child:'TO',    fn:function(d){return{t:Math.max(0,d.mealPlans[2].toPct)+'%',   clr:'#967EF3',bold:true};}},
      ]},
      { lbl:'Adults', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[2].hAdults,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[2].tAdults,  clr:'#967EF3',bold:true};}},
      ]},
      { lbl:'Children', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[2].hChildren,clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[2].tChildren,clr:'#967EF3',bold:true};}},
      ]},
      { lbl:'Tot. Guests', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[2].hGuests,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[2].tGuests,  clr:'#967EF3',bold:true};}},
      ]},
      { lbl:'Revenue', cols:[
        {child:'Hotel', fn:function(d){return{t:fmtRev(d.mealPlans[2].hRev),clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:fmtRev(d.mealPlans[2].tRev),clr:'#967EF3',bold:true};}},
      ]},
      { lbl:'ADR Gross', cols:[
        {child:'Hotel', fn:function(d){return{t:'$'+d.mealPlans[2].hAdrGross,clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:'$'+d.mealPlans[2].tAdrGross,clr:'#967EF3',bold:true};}},
      ]},
      { lbl:'ADR Net', cols:[
        {child:'Hotel', fn:function(d){return{t:'$'+d.mealPlans[2].hAdrNet, clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:'$'+d.mealPlans[2].tAdrNet, clr:'#967EF3',bold:true};}},
      ]},
    ]},
    { id:'mp_ro', label:'Meal Plan: RO', clr:'#f59e0b', metrics:[
      { lbl:'Rooms Sold', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[3].hotelRms,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[3].toRms,    clr:'#f59e0b',bold:true};}},
      ]},
      { lbl:'Occ %', cols:[
        {child:'Hotel', fn:function(d){return{t:d.roPct+'%',                             clr:'#374151'};}},
        {child:'TO',    fn:function(d){return{t:Math.max(0,d.mealPlans[3].toPct)+'%',   clr:'#f59e0b',bold:true};}},
      ]},
      { lbl:'Adults', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[3].hAdults,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[3].tAdults,  clr:'#f59e0b',bold:true};}},
      ]},
      { lbl:'Children', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[3].hChildren,clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[3].tChildren,clr:'#f59e0b',bold:true};}},
      ]},
      { lbl:'Tot. Guests', cols:[
        {child:'Hotel', fn:function(d){return{t:d.mealPlans[3].hGuests,  clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:d.mealPlans[3].tGuests,  clr:'#f59e0b',bold:true};}},
      ]},
      { lbl:'Revenue', cols:[
        {child:'Hotel', fn:function(d){return{t:fmtRev(d.mealPlans[3].hRev),clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:fmtRev(d.mealPlans[3].tRev),clr:'#f59e0b',bold:true};}},
      ]},
      { lbl:'ADR Gross', cols:[
        {child:'Hotel', fn:function(d){return{t:'$'+d.mealPlans[3].hAdrGross,clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:'$'+d.mealPlans[3].tAdrGross,clr:'#f59e0b',bold:true};}},
      ]},
      { lbl:'ADR Net', cols:[
        {child:'Hotel', fn:function(d){return{t:'$'+d.mealPlans[3].hAdrNet, clr:'#374151'};}},
        {child:'T',     fn:function(d){return{t:'$'+d.mealPlans[3].tAdrNet, clr:'#f59e0b',bold:true};}},
      ]},
    ]},

    // ── Business Mix ─────────────────────────────────────────────────────────
    { id:'biz', label:'Business Mix', clr:'#0284c7', metrics:[
      { lbl:'TO',     cols:[{child:'%',fn:function(d){return{t:d.toMix+'%',   clr:'#006461',bold:true};}}]},
      { lbl:'Direct', cols:[{child:'%',fn:function(d){return{t:d.dirMix+'%',  clr:'#0284c7',bold:true};}}]},
      { lbl:'OTA',    cols:[{child:'%',fn:function(d){return{t:d.otaMix+'%',  clr:'#D97706',bold:true};}}]},
      { lbl:'Other',  cols:[{child:'%',fn:function(d){return{t:d.otherMix+'%',clr:'#9ca3af',bold:true};}}]},
    ]},

    // ── Travel Co. Rates ─────────────────────────────────────────────────────
    { id:'tc', label:'Travel Co. Rates', clr:'#0f766e', metrics:[
      { lbl:'Sunshine',    cols:[{child:'Rate',fn:function(d){return{t:'$'+d.tcRates[0],clr:'#3b82f6',bold:true,badge:d.tcPromos[0]};}}]},
      { lbl:'Global Adv.', cols:[{child:'Rate',fn:function(d){return{t:'$'+d.tcRates[1],clr:'#967EF3',bold:true,badge:d.tcPromos[1]};}}]},
      { lbl:'Beach Hols',  cols:[{child:'Rate',fn:function(d){return{t:'$'+d.tcRates[2],clr:'#0ea5e9',bold:true,badge:d.tcPromos[2]};}}]},
      { lbl:'City Breaks', cols:[{child:'Rate',fn:function(d){return{t:'$'+d.tcRates[3],clr:'#10b981',bold:true,badge:d.tcPromos[3]};}}]},
      { lbl:'Adventure',   cols:[{child:'Rate',fn:function(d){return{t:'$'+d.tcRates[4],clr:'#f59e0b',bold:true,badge:d.tcPromos[4]};}}]},
      { lbl:'Base Rate',   cols:[{child:'Rate',fn:function(d){return{t:'$'+d.baseRate,  clr:'#9333ea',bold:true};}}]},
    ]},
  ];

  // ── Flatten cols for data rendering ──────────────────────────────────────
  GROUPS.forEach(function(g){
    g.cols = [];
    g.metrics.forEach(function(m){ m.cols.forEach(function(c){ g.cols.push(c); }); });
  });

  // ── Expose toggle ─────────────────────────────────────────────────────────
  window._rptCollapsed = collapsed;
  window.wvRptToggleGroup = function(gid){
    window._rptCollapsed[gid] = !window._rptCollapsed[gid];
    var grid=document.getElementById('weekGrid');
    if(grid) grid.innerHTML = buildReportView(window._wvRptDays||days);
  };
  window._wvRptDays = days;

  // ── Build 3-level header rows: Section > Metric > Child ──────────────────
  var DOW2=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MNAMES2=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var TODAY_R=new Date(2026,2,9);

  // Row 1: section groups
  var hRow1='<tr class="wv-rpt-grp-hdr"><th class="wv-rpt-th-date" rowspan="3" style="min-width:110px">Stay Date<br><span style="font-size:8px;font-weight:500;opacity:.7">DOW · DBA</span></th>';
  // Row 2: metric parents
  var hRow2='<tr style="background:#f8fafc;border-top:1px solid #e5e7eb">';
  // Row 3: child labels
  var hRow3='<tr class="wv-rpt-sub-hdr">';

  GROUPS.forEach(function(g){
    var vis=!collapsed[g.id];
    var totalCols=vis?g.cols.length:1;
    // Row 1: section header spanning all child cols
    hRow1+='<th colspan="'+totalCols+'" onclick="wvRptToggleGroup(\''+g.id+'\')" '
      +'style="background:'+g.clr+';border-left:2px solid rgba(255,255,255,.25);cursor:pointer">'
      +(vis?'':'▶ ')+g.label+(vis?' ▾':' ◀')+'</th>';

    if(!vis){
      hRow2+='<th style="background:#f5f5f5;color:'+g.clr+';border-left:2px solid #e5e7eb;cursor:pointer;text-align:center;font-size:11px" onclick="wvRptToggleGroup(\''+g.id+'\')">···</th>';
      hRow3+='<th style="background:#f5f5f5;border-left:2px solid #e5e7eb"></th>';
    } else {
      // Row 2: metric parents — each spanning its children
      var isFirst=true;
      g.metrics.forEach(function(m){
        var bl=isFirst?'border-left:2px solid rgba(0,0,0,.10);':'border-left:1px solid #e9ecef;';
        isFirst=false;
        var mClr=g.clr;
        hRow2+='<th colspan="'+m.cols.length+'" style="'+bl+'background:#f1f5f9;color:#374151;font-size:8.5px;font-weight:700;text-align:center;padding:3px 6px;text-transform:none;letter-spacing:0;border-bottom:1px solid #d1d5db">'+m.lbl+'</th>';
        // Row 3: children
        m.cols.forEach(function(c,ci){
          var cbl=ci===0?bl:'';
          hRow3+='<th style="'+cbl+'font-size:8px;color:'+mClr+';font-weight:700">'+c.child+'</th>';
        });
      });
    }
  });
  hRow1+='</tr>'; hRow2+='</tr>'; hRow3+='</tr>';
  var hdrHtml = hRow1+hRow2+hRow3;


  // ── Build data rows ───────────────────────────────────────────────────────
  var rows=days.map(function(dv,idx){
    var dm=dv.month,day=dv.day;
    var data=dd(dm,day);
    var isToday=dm===3&&day===9;
    var isLocked=LOCKED_DAYS.has(dm+'-'+day);
    var dt=new Date(2026,dm-1,day);
    var dow=DOW2[dt.getDay()];
    var dba=Math.round((dt-TODAY_R)/86400000);
    var dbaStr=dba===0?'Today':dba>0?dba+' DBA':'';
    var occBg=data.hotel>=85?'rgba(94,131,237,.15)':data.hotel>=70?'rgba(94,131,237,.08)':data.hotel>=55?'rgba(94,131,237,.04)':'#fff';

    var trCls=isToday?'wv-rpt-row-today':isLocked?'wv-rpt-row-locked':idx%2?'wv-rpt-row-odd':'';
    var trCls=isToday?'wv-rpt-row-today':isLocked?'wv-rpt-row-locked':idx%2?'wv-rpt-row-odd':'';
    var r='<tr class="'+trCls+'">';
    var evtKey2=dm+'-'+day;
    var evts2=(typeof CAL_EVENTS!=='undefined'&&CAL_EVENTS[evtKey2])?CAL_EVENTS[evtKey2]:null;
    // Date cell
    r+='<td class="wv-rpt-cell-date" style="background:'+occBg+'">'
      +'<div style="font-weight:800;font-size:11px">'+(isLocked?'🔒 ':'')+MNAMES2[dm]+' '+day+'</div>'
      +'<div style="display:flex;align-items:center;gap:4px;font-size:8px;color:#6b7280">'
      +'<span>'+dow+'</span>'
      +(dbaStr?'<span style="color:#006461;font-weight:700">'+dbaStr+'</span>':'')
      +(evts2?'<span title="'+evts2.map(function(e){return e.name;}).join(', ')+'" '
        +'style="width:8px;height:8px;border-radius:2px;background:#C4FF45;flex-shrink:0;cursor:help;display:inline-block"></span>':'')
      +'</div>'
      +(isToday?'<div style="width:24px;height:2px;background:#006461;border-radius:1px;margin-top:2px"></div>':'')
      +'</td>';

    GROUPS.forEach(function(g){
      if(collapsed[g.id]){
        r+='<td class="wv-rpt-td" style="text-align:center;color:'+g.clr+';border-left:2px solid #e5e7eb;font-size:13px">···</td>';
        return;
      }
      g.cols.forEach(function(c,ci){
        var res=c.fn(data);
        var bl=ci===0?'border-left:2px solid rgba(0,0,0,.06);':'';
        var clr=res.clr||(!res.plain&&!res.bar?g.clr:'#006461');
        r+='<td class="wv-rpt-td" style="'+bl+'">';
        if(res.badge){
          r+='<div style="display:flex;align-items:center;gap:3px;justify-content:flex-end">'
            +'<span style="font-size:7px;font-weight:700;background:'+res.badge.c+';color:#fff;border-radius:2px;padding:1px 3px">'+res.badge.t+'</span>'
            +'<span style="font-weight:'+(res.bold?'800':'700')+';color:'+clr+'">'+res.t+'</span>'
            +'</div>';
        } else {
          // No bars — show Hotel (grey) then T (coloured) side by side
          var tClr = res.clr || (res.bar ? res.bar.c : g.clr);
          if(res.h) r+='<span style="font-size:8.5px;color:#9ca3af;margin-right:4px">'+res.h+'</span>';
          r+='<span style="font-size:9px;font-weight:'+(res.bold?'800':'700')+';color:'+tClr+'">'+res.t+'</span>';
        }
        r+='</td>';
      });
    });
    r+='</tr>';
    return r;
  }).join('');
  return '<div class="wv-report-wrap"><table class="wv-report-tbl"><thead>'+hdrHtml+'</thead><tbody>'+rows+'</tbody></table></div>';
}


window.wvSetSegMode = function(mode) {
  wvSegMode = mode;
  document.getElementById('wvSegCombined').classList.toggle('active', mode === 'combined');
  document.getElementById('wvSegIndividual').classList.toggle('active', mode === 'individual');
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
};

// DOM-reorder .wv-acc-sect elements within each .wv-acc-group per _wvSectionOrder
function applyWvSectionOrder(grid) {
  if (!_wvSectionOrder || !_wvSectionOrder.length) return;
  grid.querySelectorAll('.wv-acc-group').forEach(function(group) {
    var sects = {};
    group.querySelectorAll('.wv-acc-sect').forEach(function(el) {
      var hdr = el.querySelector('.wv-acc-hdr[data-section]');
      if (hdr) sects[hdr.dataset.section] = el;
    });
    // Append in desired order; any key missing from sects is silently skipped
    _wvSectionOrder.forEach(function(key) {
      if (sects[key]) group.appendChild(sects[key]);
    });
  });
}

function buildWeekGrid(month, weekStart, activeDay) {
  const days = getWeekDays(2026, month, weekStart);
  const rangeEl = document.getElementById('wvRange');
  const m0 = days[0], m6 = days[6];
  const MNAMES = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  rangeEl.textContent = m0.month === m6.month
    ? `${MNAMES[m0.month]} ${m0.day} – ${m6.day}, 2026`
    : `${MNAMES[m0.month]} ${m0.day} – ${MNAMES[m6.month]} ${m6.day}, 2026`;
  // Re-render picker grid if panel is open (keeps highlight in sync with prev/next nav)
  var _pp = document.getElementById('wvWeekPickPanel');
  if (_pp && _pp.style.display !== 'none') { wvwpViewMonth = month; wvwpViewYear = wvYear; wvwpRender(); }

  const grid = document.getElementById('weekGrid');

  // Always hide section panel immediately — only shown at end for 'combined' tab
  (function(){ var p = document.getElementById('wvSectionPanel'); if (p) p.style.display = 'none'; })();

  // destroy daily rev grid when switching away
  if (wvGroupBy !== 'report' && _dailyRevGridApi) {
    try { _dailyRevGridApi.destroy(); } catch(e) {}
    _dailyRevGridApi = null;
  }
  // destroy co report grid when switching away
  if (wvGroupBy !== 'coReport' && _coReportGridApi) {
    try { _coReportGridApi.destroy(); } catch(e) {}
    _coReportGridApi = null;
  }
  // destroy daily-H grid when switching away
  if (wvGroupBy !== 'dailyH' && _dailyHGridApi) {
    try { _dailyHGridApi.destroy(); } catch(e) {}
    _dailyHGridApi = null;
  }
  // ── Report view: AG Grid ──────────────────────────────────────────────────
  if (wvGroupBy === 'report') {
    initDailyRevGrid(days, grid);
    return;
  }
  if (wvGroupBy === 'coReport') {
    initCoReportGrid(days, grid);
    return;
  }
  if (wvGroupBy === 'dailyH') {
    initDailyHGrid(days, month, activeDay, grid);
    return;
  }
  // ── Build 7-day aggregate summary (runs for all views including dailyB) ──
  var sumRn=0,sumHotelRn=0,sumRev=0,sumHotelRev=0,sumAdr=0,sumHotelAdr=0;
  var sumHotel=0,sumTo=0,sumPickup=0,sumHotelPickup=0;
  var sumAvgLos=0,sumHotelLos=0,sumAvgLead=0,sumHotelLead=0;
  var sumTotAdults=0,sumTotChildren=0,sumHotelAdults=0,sumHotelChildren=0;
  var sumRevpar=0,sumHotelRevpar=0,sumAvailRooms=0,sumAvailGuar=0;
  var sumAiPct=0,sumBbPct=0,sumHbPct=0,sumRoPct=0;
  var sumToMix=0,sumDirMix=0,sumOtaMix=0;
  var sumFitPct=0,sumDynPct=0,sumSerPct=0,sumOnline=0,sumOtherPct=0,sumFreePct=0;
  var sumTcRates=[[0,0],[0,0],[0,0],[0,0],[0,0]]; // [sum,count] per operator
  days.forEach(function(dv) {
    const dm2=dv.month,dd2=dv.day;
    const {hotel:h2,to:t2}=getOccupancy(dm2,dd2);
    const adr2=150+Math.abs((dm2*47+dd2*31)%130);
    const v2=Math.abs((dm2*127+dd2*53+dm2*dd2*7+dd2*dd2*3))%100;
    const toAdr2=Math.max(80,adr2-20-Math.abs((dm2*3+dd2*7)%15));
    const rn2=Math.round(250*t2/100);
    const rnH2=Math.round(250*h2/100);
    const rev2=Math.floor(rn2*toAdr2);
    const revH2=Math.floor(rnH2*adr2);
    sumRn+=rn2; sumHotelRn+=rnH2;
    sumRev+=rev2; sumHotelRev+=revH2;
    sumAdr+=toAdr2; sumHotelAdr+=adr2;
    sumHotel+=h2; sumTo+=t2;
    sumPickup+=Math.max(0,Math.floor((v2%25+5)*t2/Math.max(1,h2)));
    sumHotelPickup+=Math.floor(v2%25+5);
    sumAvgLos+=2.8+v2%5*0.3; sumHotelLos+=2.8+v2%5*0.3+0.4;
    sumAvgLead+=18+v2%60; sumHotelLead+=18+v2%60+12;
    const avgA2=(1.8+v2%3*0.1); const avgC2=(0.3+v2%2*0.1);
    sumTotAdults+=Math.round(rn2*avgA2); sumTotChildren+=Math.round(rn2*avgC2);
    sumHotelAdults+=Math.round(rnH2*(avgA2+0.3)); sumHotelChildren+=Math.round(rnH2*(avgC2+0.1));
    sumRevpar+=Math.max(50,(adr2+80)-30-Math.abs((dm2*5+dd2*3)%20));
    sumHotelRevpar+=adr2+80;
    sumAvailRooms+=Math.max(0,102-Math.floor(h2*1.02));
    sumAvailGuar+=Math.floor(8+v2%5);
    sumAiPct+=Math.max(45,Math.min(68,55+(dm2*7+dd2*3)%14));
    sumBbPct+=Math.max(14,Math.min(28,20+(dm2*11+dd2*5)%11));
    sumHbPct+=Math.max(6,Math.min(16,10+(dm2*5+dd2*7)%9));
    sumToMix+=28+Math.abs((dm2*7+dd2*5)%25);
    sumDirMix+=30+Math.abs((dm2*5+dd2*9)%20);
    sumOtaMix+=20+Math.abs((dm2*9+dd2*3)%18);
    sumFitPct+=Math.round(t2*0.45); sumDynPct+=Math.round(t2*0.35);
    sumSerPct+=t2-Math.round(t2*0.45)-Math.round(t2*0.35);
    sumOtherPct+=Math.max(0,h2-t2); sumFreePct+=Math.max(0,100-h2);
    sumOnline+=Math.max(30,Math.min(80,45+Math.abs((dm2*13+dd2*7)%35)));
    [0,1,2,3,4].forEach(function(i){
      sumTcRates[i][0]+=adr2-15+Math.abs((dm2*(i+3)+dd2*(i+5))%50);
      sumTcRates[i][1]++;
    });
  });
  const n7=days.length;
  const avgToAdr=Math.round(sumAdr/n7),avgHotelAdr=Math.round(sumHotelAdr/n7);
  const avgHotel=Math.round(sumHotel/n7),avgTo=Math.round(sumTo/n7);
  const revStr=s=>s>=1000000?'$'+(s/1000000).toFixed(1)+'M':'$'+Math.round(s/1000)+'k';
  const totalRevStr=revStr(sumRev),totalHotelRevStr=revStr(sumHotelRev);
  const avgLos=(sumAvgLos/n7).toFixed(1)+'n',avgHotelLos=(sumHotelLos/n7).toFixed(1)+'n';
  const avgLead=Math.round(sumAvgLead/n7)+'d',avgHotelLead=Math.round(sumHotelLead/n7)+'d';
  const avgRevpar=Math.round(sumRevpar/n7),avgHotelRevpar=Math.round(sumHotelRevpar/n7);
  const avgAvailRooms=Math.round(sumAvailRooms/n7),avgAvailGuar=Math.round(sumAvailGuar/n7);
  const avgAiPct=Math.round(sumAiPct/n7),avgBbPct=Math.round(sumBbPct/n7);
  const avgHbPct=Math.round(sumHbPct/n7),avgRoPct=100-avgAiPct-avgBbPct-avgHbPct;
  const avgToMix=Math.round(sumToMix/n7),avgDirMix=Math.round(sumDirMix/n7);
  const avgOtaMix=Math.round(sumOtaMix/n7);
  const avgOtherMix=Math.max(0,100-avgToMix-avgDirMix-avgOtaMix);
  const avgRnH=Math.round(sumHotelRn/n7);
  const avgFitPct=Math.round(sumFitPct/n7),avgDynPct=Math.round(sumDynPct/n7),avgSerPct=Math.round(sumSerPct/n7);
  const avgOnline=Math.round(sumOnline/n7);
  const avgOtherPct=Math.round(sumOtherPct/n7),avgFreePct=Math.round(sumFreePct/n7);
  const WV_SUM=250;
  const avgFitRms=Math.round(WV_SUM*avgFitPct/100),avgDynRms=Math.round(WV_SUM*avgDynPct/100),avgSerRms=Math.round(WV_SUM*avgSerPct/100);
  const avgOtherRms=Math.round(WV_SUM*avgOtherPct/100),avgFreeRms=Math.round(WV_SUM*avgFreePct/100);
  const avgTcRates=sumTcRates.map(function(r){return Math.round(r[0]/Math.max(1,r[1]));});
  // STLY/LY/Fcst approximations
  const sdlyTo=Math.max(5,avgTo-9),lyTo=Math.max(5,avgTo-6),fcstTo=Math.min(100,avgTo+4);
  const sdlyAdr=avgToAdr-8,lyAdr=avgToAdr-4,fcstAdr=avgToAdr+6;
  const sdlyRev=revStr(Math.floor(sumRev*0.9)),lyRev=revStr(Math.floor(sumRev*0.95)),fcstRev=revStr(Math.floor(sumRev*1.06));
  const sdlyRn=Math.round(sumRn*0.88),lyRn=Math.round(sumRn*0.93),fcstRn=Math.round(sumRn*1.06);
  const sdlyRevpar=Math.max(40,avgRevpar-8),lyRevpar=Math.max(40,avgRevpar-4);
  const avgTotGuests=sumTotAdults+sumTotChildren,avgHotelTotGuests=sumHotelAdults+sumHotelChildren;
  const avgTotAdults=sumTotAdults,avgTotChildren=sumTotChildren;
  const avgHotelTotAdults=sumHotelAdults,avgHotelTotChildren=sumHotelChildren;
  // Promo
  const firstDay=days[0]; const isEbbWeek=(new Date(2026,firstDay.month-1,firstDay.day)).getDay()<3;

  // ── Helpers ─────────────────────────────────────────────────────────────
  function mBar(pct,col,col2,pct2){
    return '<div style="height:3px;background:#e5e7eb;border-radius:2px;margin-top:3px;position:relative">'
      +'<div style="height:100%;width:'+pct+'%;background:'+col+';border-radius:2px;position:absolute"></div>'
      +(col2&&pct2?'<div style="height:100%;width:'+pct2+'%;background:'+col2+';border-radius:2px;position:absolute;opacity:0.4"></div>':'')
      +'</div>';
  }
  function dualBar(tPct,hPct,clr){
    return '<div style="height:3px;border-radius:2px;margin-top:2px;background:#e5e7eb;position:relative">'
      +(hPct!=null?'<div style="height:100%;width:'+Math.min(92,hPct)+'%;background:#d1d5db;border-radius:2px;position:absolute"></div>':'')
      +'<div style="height:100%;width:'+Math.min(92,tPct)+'%;background:'+clr+';border-radius:2px;position:absolute"></div>'
      +'</div>';
  }
  function stackBar(segs){
    return '<div style="height:5px;background:#e5e7eb;border-radius:3px;margin:3px 0;display:flex;overflow:hidden">'
      +segs.map(function(s){return '<div style="width:'+s.p+'%;background:'+s.c+'"></div>';}).join('')
      +'</div>';
  }
  function sumRefRow(pairs){
    var CSS={stly:'background:#e0e7ff;color:#4338ca',ly:'background:#dcfce7;color:#15803d',fcst:'background:#fef9c3;color:#a16207'};
    return '<div style="display:flex;gap:2px;flex-wrap:wrap;margin-top:2px">'
      +pairs.map(function(p){return '<span style="font-size:7px;font-weight:700;padding:1px 4px;border-radius:3px;'+CSS[p.k]+'">'+p.l+' '+p.v+'</span>';}).join('')
      +'</div>';
  }
  function mRow2(lbl,tVal,hVal,barT,barHPct,clr,refs){
    var barHtml=barT!=null?dualBar(barT,barHPct,clr):'';
    return '<div style="display:flex;align-items:center;gap:3px;margin-bottom:4px">'
      +'<span style="font-size:8px;color:#6b7280;flex:1;min-width:0">'+lbl+'</span>'
      +(hVal&&hVal!=='\u2014'
        ?'<span style="display:flex;flex-direction:column;align-items:flex-end">'
         +'<span style="font-size:6.5px;font-weight:700;color:#9ca3af;letter-spacing:.3px;text-transform:uppercase">Hotel</span>'
         +'<span style="font-size:8px;font-weight:600;color:#6b7280">'+hVal+'</span>'
         +'</span>':''
      )
      +'<span style="display:flex;flex-direction:column;align-items:flex-end;margin-left:6px">'
      +'<span style="font-size:6.5px;font-weight:700;color:'+clr+';letter-spacing:.3px;text-transform:uppercase">TO</span>'
      +'<span style="font-size:9px;font-weight:800;color:'+clr+'">'+tVal+'</span>'
      +'</span>'
      +'</div>'
      +barHtml
      +(refs?sumRefRow(refs):'');
  }
  function colHdr(tClr){
    return '<div style="display:flex;justify-content:flex-end;gap:12px;margin-bottom:5px;padding-bottom:3px;border-bottom:1px solid #f3f4f6">'
      +'<span style="font-size:6.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.3px">Hotel</span>'
      +'<span style="font-size:6.5px;font-weight:700;color:'+(tClr||'#006461')+';text-transform:uppercase;letter-spacing:.3px;min-width:24px;text-align:right">TO</span>'
      +'</div>';
  }
  function sumSec(title,content){
    return '<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:9px 11px">'
      +'<div style="font-size:8px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid #f3f4f6">'+title+'</div>'
      +content
      +'</div>';
  }
  function dotLegend(items){
    return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 8px;margin-top:4px">'
      +items.map(function(it){
        return '<div style="display:flex;align-items:center;gap:4px"><span style="width:6px;height:6px;border-radius:50%;background:'+it[2]+';flex-shrink:0"></span><span style="font-size:8px;color:#374151">'+it[0]+' '+it[1]+'</span></div>';
      }).join('')
      +'</div>';
  }

  // ── Sections ─────────────────────────────────────────────────────────────
  const secOcc = sumSec('Daily Metrics',
    colHdr('#006461')
    +mRow2('Occupancy',avgTo+'%',avgHotel+'%',avgTo,Math.min(92,avgHotel),'#006461',
        [{k:'stly',l:'STLY',v:sdlyTo+'%'},{k:'ly',l:'LY',v:lyTo+'%'},{k:'fcst',l:'Fcst',v:fcstTo+'%'}])
    +mRow2('ADR','$'+avgToAdr,'$'+avgHotelAdr,Math.round(avgToAdr/3.5),Math.round(avgHotelAdr/3.5),'#7c3aed',
        [{k:'stly',l:'STLY',v:'$'+sdlyAdr},{k:'ly',l:'LY',v:'$'+lyAdr},{k:'fcst',l:'Fcst',v:'$'+fcstAdr}])
    +mRow2('Revenue',totalRevStr,totalHotelRevStr,Math.min(92,Math.round(sumRev/sumHotelRev*70)),70,'#ea580c',
        [{k:'stly',l:'STLY',v:sdlyRev},{k:'ly',l:'LY',v:lyRev},{k:'fcst',l:'Fcst',v:fcstRev}])
    +mRow2('RevPAR','$'+avgRevpar,'$'+avgHotelRevpar,Math.round(avgRevpar/4),Math.round(avgHotelRevpar/4),'#9333ea',
        [{k:'stly',l:'STLY',v:'$'+sdlyRevpar},{k:'ly',l:'LY',v:'$'+lyRevpar}])
    +mRow2('Pickup','+'+sumPickup,'+'+sumHotelPickup,null,null,'#16a34a')
    +stackBar([{p:avgFitPct,c:'#006461'},{p:avgDynPct,c:'#0891b2'},{p:avgSerPct,c:'#6366f1'},{p:Math.max(0,avgTo-avgFitPct-avgDynPct-avgSerPct),c:'#5883ed'}])
    +'<div style="margin-top:4px;display:flex;flex-direction:column;gap:2px">'
    +[['Static FIT',avgFitPct,avgFitRms,'#006461'],['TO Dynamic',avgDynPct,avgDynRms,'#0891b2'],['Tour Series',avgSerPct,avgSerRms,'#6366f1'],['Other Segs',avgOtherPct,avgOtherRms,'#5883ed'],['Remaining',avgFreePct,avgFreeRms,'#16a34a']].map(function(s){
      return '<div style="display:flex;align-items:center;gap:4px"><span style="width:6px;height:6px;border-radius:50%;background:'+s[3]+';flex-shrink:0"></span>'
        +'<span style="font-size:8px;color:#374151;flex:1">'+s[0]+'</span>'
        +'<span style="font-size:8px;color:#9ca3af">'+s[2]+' rm</span>'
        +'<span style="font-size:8px;font-weight:700;color:'+s[3]+';min-width:24px;text-align:right">'+s[1]+'%</span>'
        +'</div>';
    }).join('')
    +'</div>'
    +'<div style="display:flex;justify-content:space-between;margin-top:5px;padding-top:4px;border-top:1px solid #f3f4f6">'
    +'<span style="font-size:8px;color:#3b82f6">🌐 '+avgOnline+'% online</span>'
    +'<span style="font-size:8px;color:#f97316">📴 '+(100-avgOnline)+'% offline</span>'
    +'</div>'
  );

  const secMore = sumSec('More Metrics',
    colHdr('#2e65e8')
    +mRow2('RN Sold',sumRn+' RN',sumHotelRn+' RN',Math.min(92,Math.round(sumRn/sumHotelRn*70)),70,'#2e65e8',
        [{k:'stly',l:'STLY',v:sdlyRn},{k:'ly',l:'LY',v:lyRn},{k:'fcst',l:'Fcst',v:fcstRn}])
    +mRow2('Avg Adults',(sumTotAdults/sumRn).toFixed(1),(sumHotelAdults/sumHotelRn).toFixed(1),null,null,'#2e65e8')
    +mRow2('Avg Children',(sumTotChildren/sumRn).toFixed(1),(sumHotelChildren/sumHotelRn).toFixed(1),null,null,'#d33030')
    +mRow2('Total Adults',avgTotAdults,avgHotelTotAdults,null,null,'#2e65e8')
    +mRow2('Total Children',avgTotChildren,avgHotelTotChildren,null,null,'#d33030')
    +mRow2('Total Guests',avgTotGuests,avgHotelTotGuests,null,null,'#0369a1')
    +mRow2('Avg LOS',avgLos,avgHotelLos,null,null,'#0891b2')
    +mRow2('Avg Lead',avgLead,avgHotelLead,null,null,'#6366f1')
    +mRow2('Avail Rooms',avgAvailRooms+' RN','\u2014',Math.min(92,Math.round(avgAvailRooms/250*100)),null,'#16a34a')
    +mRow2('Avail Guar.',avgAvailGuar+' RN','\u2014',null,null,'#ea580c')
  );

  // Meal Plans with per-plan T%
  const toPct7=avgTo/Math.max(1,avgHotel);
  const aiToP=Math.max(0,Math.round(avgAiPct*toPct7*0.9));
  const bbToP=Math.max(0,Math.round(avgBbPct*toPct7*0.85));
  const hbToP=Math.max(0,Math.round(avgHbPct*toPct7*0.80));
  const roToP=Math.max(0,Math.round(avgRoPct*toPct7*0.95));
  const secMeals = sumSec('Meal Plans',
    stackBar([{p:avgAiPct,c:'#006461'},{p:avgBbPct,c:'#3b82f6'},{p:avgHbPct,c:'#967EF3'},{p:avgRoPct,c:'#f59e0b'}])
    +'<div style="font-size:7px;color:#9ca3af;text-align:right;margin-bottom:2px">Hotel % · TO %</div>'
    +[['AI (All Inclusive)',avgAiPct,aiToP,'#006461'],['BB (Bed & Bkfst)',avgBbPct,bbToP,'#3b82f6'],
      ['HB (Half Board)',avgHbPct,hbToP,'#967EF3'],['RO (Room Only)',avgRoPct,roToP,'#f59e0b']].map(function(p){
      return '<div style="display:flex;align-items:center;gap:4px;margin-bottom:2px">'
        +'<span style="width:6px;height:6px;border-radius:50%;background:'+p[3]+';flex-shrink:0"></span>'
        +'<span style="font-size:8px;color:#374151;flex:1">'+p[0]+'</span>'
        +'<span style="font-size:8px;color:#6b7280">'+p[1]+'%</span>'
        +'<span style="font-size:8px;font-weight:700;color:'+p[3]+';min-width:22px;text-align:right">'+p[2]+'%</span>'
        +'</div>';
    }).join('')
  );

  const secBiz = sumSec('Business Mix',
    stackBar([{p:avgToMix,c:'#006461'},{p:avgDirMix,c:'#0284c7'},{p:avgOtaMix,c:'#D97706'},{p:avgOtherMix,c:'#9ca3af'}])
    +dotLegend([['TO',avgToMix+'%','#006461'],['Direct',avgDirMix+'%','#0284c7'],['OTA',avgOtaMix+'%','#D97706'],['Other',avgOtherMix+'%','#9ca3af']])
  );

  // Room Types section
  const RT2_DEF = [['Standard',51],['Superior',36],['Deluxe',27],['Suite',12],['Jr. Suite',15],['Family',9]];
  const RT_SUM_COLORS = ['#006461','#0891b2','#6366f1','#f59e0b','#ec4899','#10b981'];
  const totalCap = RT2_DEF.reduce(function(s,r){return s+r[1];},0);
  const secRoomTypes = sumSec('Room Types',
    stackBar(RT2_DEF.map(function(r,ri){return {p:Math.round(r[1]/totalCap*100),c:RT_SUM_COLORS[ri]};}))
    +RT2_DEF.map(function(r,ri){
      var cap=r[1];
      var totalSold=Math.min(cap,Math.floor(cap*avgHotel/110));
      var toRn=Math.min(totalSold,Math.round(totalSold*avgTo/Math.max(1,avgHotel)));
      var avail=Math.max(0,cap-totalSold);
      var occPct=Math.round(totalSold/cap*100);
      return '<div style="display:flex;align-items:center;gap:4px;margin-bottom:3px">'
        +'<span style="width:6px;height:6px;border-radius:50%;background:'+RT_SUM_COLORS[ri]+';flex-shrink:0"></span>'
        +'<span style="font-size:8px;color:#374151;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+r[0]+'</span>'
        +'<span style="font-size:7.5px;color:#9ca3af;min-width:32px;text-align:right">'+avail+' avail</span>'
        +'<span style="font-size:8px;font-weight:700;color:'+RT_SUM_COLORS[ri]+';min-width:26px;text-align:right">'+toRn+'rn</span>'
        +'</div>';
    }).join('')
    +'<div style="margin-top:4px;padding-top:4px;border-top:1px solid #f3f4f6;display:flex;justify-content:space-between">'
    +'<span style="font-size:7.5px;color:#9ca3af">Cap: '+totalCap+' rooms</span>'
    +'<span style="font-size:7.5px;font-weight:700;color:#006461">'+Math.round(RT2_DEF.reduce(function(s,r){return s+Math.min(r[1],Math.floor(r[1]*avgHotel/110));},0)/totalCap*100)+'% sold</span>'
    +'</div>'
  );

  const tcOps=[['Sunshine Tours','#3b82f6'],['Global Adv.','#967EF3'],['Beach Hols','#0ea5e9'],['City Breaks','#10b981'],['Adventure','#f59e0b']];
  const promoLabel=isEbbWeek?'EBB 10%':'Contract';
  const promoClr  =isEbbWeek?'#16a34a':'#2563eb';
  const secTC = sumSec('Travel Co. Rates',
    tcOps.map(function(op,i){
      return '<div style="display:flex;align-items:center;gap:5px;margin-bottom:3px">'
        +'<span style="width:6px;height:6px;border-radius:50%;background:'+op[1]+';flex-shrink:0"></span>'
        +'<span style="font-size:8px;color:#374151;flex:1">'+op[0]+'</span>'
        +'<span style="font-size:7px;font-weight:700;padding:1px 4px;border-radius:3px;background:'+promoClr+'20;color:'+promoClr+';border:1px solid '+promoClr+'44">'+promoLabel+'</span>'
        +'<span style="font-size:9px;font-weight:700;color:'+op[1]+'">$'+avgTcRates[i]+'</span>'
        +'</div>';
    }).join('')
    +'<div style="margin-top:5px;padding-top:4px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center">'
    +'<span style="font-size:8px;color:#9333ea;font-weight:700">Base Seg. Rate</span>'
    +'<span style="font-size:9px;font-weight:800;color:#9333ea">$'+(avgHotelAdr+8)+'</span>'
    +'</div>'
  );

  // Close-out counts for the 7 days
  var fullCoCount7=0, partCoCount7=0;
  days.forEach(function(dv){
    if(LOCKED_DAYS.has(dv.month+'-'+dv.day)) fullCoCount7++;
    var pr=PARTIAL_CLOSURES[dv.month+'-'+dv.day];
    if(pr&&pr.length) partCoCount7++;
  });

  // Init accordion state once
  if(!_wv7dAccState._init){
    _wv7dAccState._init=true;
    _wv7dAccState['wv7d_overview']=true; // outer accordion closed on first load
    ['wv7d_co','wv7d_daily','wv7d_seg','wv7d_more','wv7d_meals','wv7d_biz','wv7d_tc',
     'mos_co_full','mos_co_part','mos_occ','mos_adr','mos_rev','mos_revpar','mos_pickup','mos_onoff',
     'mos_segbar','mos_rn','mos_avga','mos_avgc','mos_tota','mos_totc','mos_totg','mos_los','mos_lead',
     'mos_avail','mos_availg','mos_mpsum','mos_bizbar',
     'mos_tc0','mos_tc1','mos_tc2','mos_tc3','mos_tc4','mos_tcbase'
    ].forEach(function(k){_wv7dAccState[k]=false;});
  }

  _wv7dSummaryData = {
    avgTo:avgTo, avgHotel:avgHotel,
    avgToAdr:avgToAdr, avgHotelAdr:avgHotelAdr,
    totalRevStr:totalRevStr, totalHotelRevStr:totalHotelRevStr,
    avgRevpar:avgRevpar, avgHotelRevpar:avgHotelRevpar,
    sumPickup:sumPickup, sumHotelPickup:sumHotelPickup,
    sumRn:sumRn, avgRnH:avgRnH,
    avgLos:avgLos, avgHotelLos:avgHotelLos,
    avgLead:avgLead, avgHotelLead:avgHotelLead,
    avgAvailRooms:avgAvailRooms, avgAvailGuar:avgAvailGuar,
    avgTotGuests:avgTotGuests, avgHotelTotGuests:avgHotelTotGuests,
    avgTotAdults:avgTotAdults, avgTotChildren:avgTotChildren,
    avgHotelTotAdults:avgHotelTotAdults, avgHotelTotChildren:avgHotelTotChildren,
    avgAiPct:avgAiPct, avgBbPct:avgBbPct, avgHbPct:avgHbPct, avgRoPct:avgRoPct,
    aiToP:aiToP, bbToP:bbToP, hbToP:hbToP, roToP:roToP,
    avgToMix:avgToMix, avgDirMix:avgDirMix, avgOtaMix:avgOtaMix, avgOtherMix:avgOtherMix,
    avgFitPct:avgFitPct, avgDynPct:avgDynPct, avgSerPct:avgSerPct, avgOtherPct:avgOtherPct, avgFreePct:avgFreePct,
    avgFitRms:avgFitRms, avgDynRms:avgDynRms, avgSerRms:avgSerRms, avgOtherRms:avgOtherRms, avgFreeRms:avgFreeRms,
    avgOnline:avgOnline, avgTcRates:avgTcRates,
    sdlyTo:sdlyTo, lyTo:lyTo, fcstTo:fcstTo,
    sdlyAdr:sdlyAdr, lyAdr:lyAdr, fcstAdr:fcstAdr,
    sdlyRev:sdlyRev, lyRev:lyRev, fcstRev:fcstRev,
    sdlyRn:sdlyRn, lyRn:lyRn, fcstRn:fcstRn,
    sdlyRevpar:sdlyRevpar, lyRevpar:lyRevpar,
    isEbbWeek:isEbbWeek, fullCoCount7:fullCoCount7, partCoCount7:partCoCount7, n7:n7
  };

  var summaryContainer = document.getElementById('wvSummaryContainer');
  if(summaryContainer) summaryContainer.innerHTML = _buildWv7dSummaryHtml(_wv7dSummaryData);

  // Close-out heat map removed
  var coHeatmapContainer = document.getElementById('coHeatmapContainer');
  if (coHeatmapContainer) coHeatmapContainer.innerHTML = '';

  // ── Render grid based on view mode ──────────────────────────────────────
  if (wvGroupBy === 'dailyB') {
    grid.style.cssText = 'display:flex;flex-direction:column;flex:1;min-width:0;';
    grid.innerHTML = buildDailyBView(days, month, activeDay);
    return;
  }
  grid.style.cssText = '';

  grid.innerHTML = days.map(({ month: dm, day: dd }) => {
    const isToday  = dm === 3 && dd === 9;
    const isActive = dm === month && dd === activeDay;
    const isLocked = LOCKED_DAYS.has(`${dm}-${dd}`);
    const { hotel, to } = getOccupancy(dm, dd);
    const d0 = new Date(2026, dm - 1, dd);
    const dowName = DOW_FULL[d0.getDay()];
    const adr = 150 + Math.abs((dm * 47 + dd * 31) % 130);
    const rev = (hotel * adr * 1.1).toFixed(0);
    const v = Math.abs((dm * 127 + dd * 53 + dm * dd * 7 + dd * dd * 3)) % 100;

    const colClass = ['wv-col', isActive ? 'wv-active' : '', isToday ? 'wv-today' : ''].filter(Boolean).join(' ');

    const onlinePct = Math.max(30, Math.min(80, 45 + Math.abs((dm * 13 + dd * 7) % 35)));
    const adrBar = Math.min(95, 40 + Math.abs((dm * 11 + dd * 19) % 55));
    const revBar = Math.min(95, 35 + Math.abs((dm * 17 + dd * 13) % 60));

    const rtAvail = RT_NAMES.map((n, i) => {
      const alloc = 10 + Math.abs((dm * (i+3) + dd * (i+7)) % 35);
      const avail = Math.max(0, alloc - Math.floor(hotel / 15));
      return { n, alloc, avail };
    });

    // Weekly range selection classes
    const wvDv = dm * 100 + dd;
    const wvSv = wvSelStart ? wvSelStart.month * 100 + wvSelStart.day : null;
    const wvEv = wvSelEnd   ? wvSelEnd.month   * 100 + wvSelEnd.day   : null;
    const wvLo = (wvSv !== null && wvEv !== null) ? Math.min(wvSv, wvEv) : wvSv;
    const wvHi = (wvSv !== null && wvEv !== null) ? Math.max(wvSv, wvEv) : null;
    const wvSelClass = wvLo !== null && wvDv === wvLo ? ' wv-sel-lo'
                     : wvHi !== null && wvDv === wvHi ? ' wv-sel-hi'
                     : wvHi !== null && wvDv > wvLo && wvDv < wvHi ? ' wv-sel-mid'
                     : '';

    // DBA: days from today (March 9 2026) to the stay date
    const TODAY_WV = new Date(2026, 2, 9);  // March 9 2026 prototype today
    const stayDate = new Date(2026, dm - 1, dd);
    const dba = Math.round((stayDate - TODAY_WV) / 86400000);
    const dbaStr = dba === 0 ? 'Today' : dba > 0 ? dba + ' DBA' : '';
    const hdrDateStr = `${dowName} ${dm}/${dd}/25`;
    // Event icon for this day
    const wvEventKey = `${dm}-${dd}`;
    const wvEvents = (typeof CAL_EVENTS !== 'undefined' && CAL_EVENTS[wvEventKey]) ? CAL_EVENTS[wvEventKey] : null;
    const wvEventIconHtml = wvEvents
      ? `<span class="wv-event-cal-icon has-events" data-event-key="${wvEventKey}" onmouseenter="calShowEventTip(event,'${wvEventKey}')" onmouseleave="calHideEventTip()"><span class="material-icons" style="font-size:14px;color:#c4ff45">today</span></span>`
      : '';
    const isActionNeeded = hotel >= 65 && to < 40 && !isLocked;
    let wvMetricVal = hotel;
    if (wvActiveTab === 'pickup') wvMetricVal = getPickupPct(dm, dd);
    else if (wvActiveTab === 'guarantees') wvMetricVal = getGuaranteeFill(dm, dd);
    const hdrHeatClass = isLocked ? '' : (isActionNeeded ? getSegClass(to) : getHotelClass(wvMetricVal));
    const clHtml = !isLocked ? buildClosuresHtml(dm, dd) : '';
    const hasColCl = clHtml.length > 0;
    const restrictPanelId = `wvrp-${dm}-${dd}`;
    const wvIso = `2026-${String(dm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;
    const wvChk = _wvSelectedDays.has(wvIso) ? ' checked' : '';
    return `<div class="${colClass}${isLocked ? ' wv-locked' : ''}${wvSelClass}" data-dm="${dm}" data-dd="${dd}">
      <div class="wv-col-hdr ${hdrHeatClass}${isLocked ? ' closed' : ''}${isToday ? ' wv-col-hdr-today' : ''}">
        <input type="checkbox" class="wv-day-chk" data-wv-date="${wvIso}"${wvChk} onclick="event.stopPropagation();wvDayCheck('${wvIso}',this)" title="Select for close-out">
        <div style="display:flex;flex-direction:column;gap:1px;min-width:0;flex:1">
          <div style="display:flex;align-items:center;gap:4px">
            <span class="wv-col-hdr-date">${hdrDateStr}</span>
            ${wvEventIconHtml}
          </div>
          <span class="wv-col-hdr-dba" style="font-size:9px;font-weight:600;color:#fff;opacity:.75;letter-spacing:.2px">${dbaStr}</span>
        </div>
        ${isLocked ? `<svg class="wv-lock-icon" viewBox="0 0 10 12" fill="none" stroke="#D32F2F" stroke-width="1.6" width="11" height="13"><rect x="1" y="5" width="8" height="7" rx="1"/><path d="M3 5V3.5a2 2 0 0 1 4 0V5"/></svg>` : ''}
        ${hasColCl ? `<button class="wv-partial-lock-btn" data-restrict-id="${restrictPanelId}" title="View closed out"><svg viewBox="0 0 10 12" fill="none" stroke="currentColor" stroke-width="1.6" width="10" height="12"><rect x="1" y="5" width="8" height="7" rx="1"/><path d="M3 5V3.5a2 2 0 0 1 4 0V5"/></svg></button>` : ''}
        ${isToday ? `<span class="wv-today-badge">TODAY</span>` : ''}
      </div>
      ${hasColCl ? `<div class="wv-restrict-panel" id="${restrictPanelId}">${clHtml}</div>` : ''}
      <div class="wv-acc-group">
      ${wvGroupBy === 'roomType' ? buildRoomTypeBoardView(dm, dd, hotel, to, adr, rev, v) : ''}
      ${wvGroupBy === 'combined' ? (wvMetricState.capacity||wvMetricState.onlineOffline||wvMetricState.adr||wvMetricState.revenue) ? wvAcc('Daily Metrics', 'daily', (function(){
        const showS = wvMetricState.cmp_sdly, showL = wvMetricState.cmp_final_ly, showF = wvMetricState.cmp_forecast, showH = wvMetricState.cmp_hotel;
        // Reference values — Hotel STLY / Final LY / Forecast
        const sdlyH = Math.max(5, hotel-9),   lyH = Math.max(5, hotel-6),   fcstH = Math.min(100, hotel+4);
        const sdlyA = adr-8,                   lyA = adr-4,                  fcstA = adr+6;
        const sdlyR = Math.floor(rev*0.9),     lyR = Math.floor(rev*0.95),   fcstR = Math.floor(rev*1.06);
        // Operator (TO) compare values — used by the Compare dropdown (wvCompare)
        const toAdrV0 = Math.max(80, adr - 20 - Math.abs((dm*3+dd*7)%15));
        const toRns0  = Math.round(250 * to / 100);
        const toRevV0 = Math.floor(toRns0 * toAdrV0);
        const sdlyTo = Math.max(5, to-9),      lyTo = Math.max(5, to-6),     fcstTo = Math.min(100, to+4);
        const sdlyToAdr = toAdrV0-5,           lyToAdr = toAdrV0-3,          fcstToAdr = toAdrV0+4;
        const sdlyToRev = Math.floor(toRevV0*0.9), lyToRev = Math.floor(toRevV0*0.95), fcstToRev = Math.floor(toRevV0*1.06);
        // Helper: compact compare chips for an operator metric (respects wvCompare dropdown)
        function _opCmp(curr, sdly, ly, fcst, fmt) {
          if (wvCompare.size === 0) return '';
          var defs = [{k:'stly',l:'STLY',v:sdly},{k:'ly',l:'LY',v:ly},{k:'fcst',l:'Fcst',v:fcst}];
          var chips = defs.filter(function(x){return wvCompare.has(x.k)&&x.v!=null;}).map(function(x){
            var n=parseFloat(curr),p=parseFloat(x.v),clr=!isNaN(n)&&!isNaN(p)?(n>p?'#059669':n<p?'#dc2626':'#8A9096'):'#8A9096';
            return '<span style="font-size:8.5px;padding:1px 4px;border-radius:3px;background:'+clr+'18;color:'+clr+';font-weight:700;white-space:nowrap">'+x.l+' '+fmt(x.v)+'</span>';
          }).join('');
          return chips ? '<div style="display:flex;gap:3px;margin-top:2px;flex-wrap:wrap;padding-left:14px">'+chips+'</div>' : '';
        }
        const adrBarRef = Math.max(3, adrBar-15), revBarRef = Math.max(3, revBar-15);
        // Build multi-colored tick marks
        function occTicks() {
          return (showS?`<div class="wv-occ-ref-tick wv-tick-sdly" style="left:${sdlyH}%" title="STLY ${sdlyH}%"></div>`:'')
               + (showL?`<div class="wv-occ-ref-tick wv-tick-ly"   style="left:${lyH}%"   title="LY ${lyH}%"></div>`:'')
               + (showF?`<div class="wv-occ-ref-tick wv-tick-fcst" style="left:${fcstH}%" title="Fcst ${fcstH}%"></div>`:'');
        }
        function barTicks(sP, lP, fP) {
          return (showS?`<div class="wv-bar-ref-tick wv-tick-sdly" style="left:${sP}%"></div>`:'')
               + (showL?`<div class="wv-bar-ref-tick wv-tick-ly"   style="left:${lP}%"></div>`:'')
               + (showF?`<div class="wv-bar-ref-tick wv-tick-fcst" style="left:${fP}%"></div>`:'');
        }
        // Build ref-tag rows
        function refRow(sv, lv, fv) {
          const parts = [];
          if (showS && sv != null) parts.push('<span class="wv-ref-tag wv-ref-sdly">STLY '+sv+'</span>');
          if (showL && lv != null) parts.push('<span class="wv-ref-tag wv-ref-ly">LY '+lv+'</span>');
          if (showF) parts.push('<span class="wv-ref-tag wv-ref-fcst">Fcst '+fv+'</span>');
          return parts.length ? '<div class="wv-ref-row">'+parts.join('')+'</div>' : '';
        }
        return `<div class="wv-quick">
          ${wvMetricState.capacity ? (function(){
            const WV_CAP   = 250;
            const otherPct = Math.max(0, hotel - to);
            const freePct  = 100 - hotel;
            const toRms    = Math.round(WV_CAP * to       / 100);
            const otherRms = Math.round(WV_CAP * otherPct / 100);
            const freeRms  = WV_CAP - toRms - otherRms;

            // Bar track
            var barInner;
            if (wvSegMode === 'individual') {
              const fitPct2 = Math.round(to * 0.45), dynPct2 = Math.round(to * 0.35), serPct2 = to - fitPct2 - dynPct2;
              barInner = '<div class="wv-occ-seg" style="width:'+fitPct2+'%;background:#006461" title="Static FIT: '+fitPct2+'%"></div>'
                       + '<div class="wv-occ-seg" style="width:'+dynPct2+'%;background:#0891b2" title="TO Dynamic: '+dynPct2+'%"></div>'
                       + '<div class="wv-occ-seg" style="width:'+serPct2+'%;background:#6366f1" title="Tour Series: '+serPct2+'%"></div>'
                       + '<div class="wv-occ-seg wv-occ-other" style="width:'+otherPct+'%" title="Other: '+otherPct+'%"></div>';
            } else {
              barInner = '<div class="wv-occ-seg wv-occ-to" style="width:'+to+'%" title="TO: '+to+'%"></div>'
                       + '<div class="wv-occ-seg wv-occ-other" style="width:'+otherPct+'%" title="Other: '+otherPct+'%"></div>';
            }

            // Breakdown rows
            var bdRows;
            if (wvSegMode === 'individual') {
              const fitPct = Math.round(to * 0.45), dynPct = Math.round(to * 0.35), serPct = to - fitPct - dynPct;
              const fitRms = Math.round(WV_CAP * fitPct / 100), dynRms = Math.round(WV_CAP * dynPct / 100), serRms = Math.round(WV_CAP * serPct / 100);
              // Individual segment compare values (derived from TO compare)
              const sdlyFit = Math.round(sdlyTo*0.45), lyFit = Math.round(lyTo*0.45), fcstFit = Math.round(fcstTo*0.45);
              const sdlyDyn = Math.round(sdlyTo*0.35), lyDyn = Math.round(lyTo*0.35), fcstDyn = Math.round(fcstTo*0.35);
              const sdlySer = Math.max(0,sdlyTo-sdlyFit-sdlyDyn), lySer = Math.max(0,lyTo-lyFit-lyDyn), fcstSer = Math.max(0,fcstTo-fcstFit-fcstDyn);
              function brRow(clr,lbl,rms,pct,extra,rmsCls){
                return '<div class="wv-occ-br-row'+(extra?' '+extra:'')+'"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:'+clr+'"></span><span class="wv-occ-br-lbl">'+lbl+'</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms'+(rmsCls?' '+rmsCls:'')+'">'+rms+' RN</span><span class="wv-occ-br-pct">'+pct+'%</span></div></div>';
              }
              bdRows = brRow('#006461','Static FIT Rates',fitRms,fitPct)
                +_opCmp(fitPct, sdlyFit, lyFit, fcstFit, function(v){return v+'%';})
                +brRow('#0891b2','TO Dynamic',dynRms,dynPct)
                +_opCmp(dynPct, sdlyDyn, lyDyn, fcstDyn, function(v){return v+'%';})
                +brRow('#6366f1','Tour Series',serRms,serPct)
                +_opCmp(serPct, sdlySer, lySer, fcstSer, function(v){return v+'%';})
                +brRow('#47c5bc','Other Segments',otherRms,otherPct)
                +brRow('#388C3F','Remaining',freeRms,freePct,'wv-occ-br-remain','wv-remain-count');
            } else {
              function brRow(clr,lbl,rms,pct,extra,rmsCls){
                return '<div class="wv-occ-br-row'+(extra?' '+extra:'')+'"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:'+clr+'"></span><span class="wv-occ-br-lbl">'+lbl+'</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms'+(rmsCls?' '+rmsCls:'')+'">'+rms+' RN</span><span class="wv-occ-br-pct">'+pct+'%</span></div></div>';
              }
              bdRows = brRow('#006461','Travel Distribution Hubs',toRms,to)
                +_opCmp(to, sdlyTo, lyTo, fcstTo, function(v){return v+'%';})
                +brRow('#47c5bc','Other Segments',otherRms,otherPct)
                +brRow('#388C3F','Remaining',freeRms,freePct,'wv-occ-br-remain','wv-remain-count');
            }

            return '<div class="wv-occ-bar-wrap">'
              +'<div class="wv-occ-bar-labels"><span class="wv-q-label">Occupancy</span>'+wvHdrRight(hotel+'%',sdlyH+'%',lyH+'%',fcstH+'%')+'</div>'
              +'<div class="wv-occ-bar-track" style="position:relative">'+barInner+occTicks()+'</div>'
              +'<div class="wv-occ-breakdown">'+bdRows+'</div>'
              +'</div>';
          })() : ''}
          ${wvMetricState.onlineOffline ? `<div><div class="wv-occ-bar-labels"><span class="wv-q-label">Online / Offline</span><span class="wv-occ-total">${onlinePct}%</span></div><div class="wv-occ-bar-track"><div style="width:${onlinePct}%;background:#3b82f6;height:7px"></div><div style="width:${100-onlinePct}%;background:#f97316;height:7px"></div></div><div class="wv-occ-breakdown"><div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#3b82f6"></span><span class="wv-occ-br-lbl">Online</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">${onlinePct}%</span></div></div><div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#f97316"></span><span class="wv-occ-br-lbl">Offline</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">${100-onlinePct}%</span></div></div></div></div>` : ''}
          ${wvMetricState.adr ? (function(){
            const toAdrV    = Math.max(80, adr - 20 - Math.abs((dm*3+dd*7)%15));
            const hotelAdrV = adr;
            const hotelAdrTick = Math.min(95, adrBar + 12);
            const diff      = hotelAdrV - toAdrV;
            const diffSign  = diff >= 0 ? '+$'+diff : '-$'+Math.abs(diff);
            const diffColor = diff >= 0 ? '#16a34a' : '#dc2626';
            var segRows = '';
            if (showH) {
              if (wvSegMode === 'individual') {
                const fitAdr = Math.round(toAdrV * 0.97), dynAdr = Math.round(toAdrV * 1.04), serAdr = Math.round(toAdrV * 0.91);
                const sdlyFitAdr = Math.round(sdlyToAdr * 0.97), lyFitAdr = Math.round(lyToAdr * 0.97), fcstFitAdr = Math.round(fcstToAdr * 0.97);
                const sdlyDynAdr = Math.round(sdlyToAdr * 1.04), lyDynAdr = Math.round(lyToAdr * 1.04), fcstDynAdr = Math.round(fcstToAdr * 1.04);
                const sdlySerAdr = Math.round(sdlyToAdr * 0.91), lySerAdr = Math.round(lyToAdr * 0.91), fcstSerAdr = Math.round(fcstToAdr * 0.91);
                segRows = '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#006461"></span><span class="wv-occ-br-lbl">Static FIT Rates</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">$'+fitAdr+'</span></div></div>'
                  +_opCmp(fitAdr, sdlyFitAdr, lyFitAdr, fcstFitAdr, function(v){return '$'+v;})
                  +'<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#0891b2"></span><span class="wv-occ-br-lbl">TO Dynamic</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">$'+dynAdr+'</span></div></div>'
                  +_opCmp(dynAdr, sdlyDynAdr, lyDynAdr, fcstDynAdr, function(v){return '$'+v;})
                  +'<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#6366f1"></span><span class="wv-occ-br-lbl">Tour Series</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">$'+serAdr+'</span></div></div>'
                  +_opCmp(serAdr, sdlySerAdr, lySerAdr, fcstSerAdr, function(v){return '$'+v;});
              } else {
                segRows = '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#94b1f5"></span><span class="wv-occ-br-lbl">TO ADR</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">$'+toAdrV+'</span></div></div>'
                  +_opCmp(toAdrV, sdlyToAdr, lyToAdr, fcstToAdr, function(v){return '$'+v;});
              }
              segRows += '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#e5e7eb"></span><span class="wv-occ-br-lbl">Difference</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms" style="color:'+diffColor+'">'+diffSign+'</span></div></div>';
            }
            const hdrRow = '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#7c3aed"></span><span class="wv-occ-br-lbl">Hotel ADR</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">$'+hotelAdrV+'</span></div></div>';
            const htick  = showH ? '<div class="wv-bar-ref-tick" style="left:'+hotelAdrTick+'%;background:#7c3aed;width:2px;position:absolute;top:0;bottom:0"></div>' : '';
            return '<div>'
              +'<div class="wv-occ-bar-labels"><span class="wv-q-label">TO ADR</span>'+wvHdrRight('$'+toAdrV,'$'+sdlyA,'$'+(lyA??sdlyA),'$'+fcstA)+'</div>'
              +'<div class="wv-occ-bar-track" style="position:relative;overflow:visible"><div style="width:'+adrBar+'%;height:7px;background:#94b1f5;border-radius:4px;flex-shrink:0"></div>'+htick+barTicks(Math.max(3,adrBarRef-5),adrBarRef,Math.min(92,adrBarRef+5))+'</div>'
              +(showH ? '<div class="wv-occ-breakdown">'+hdrRow+segRows+'</div>' : '')
              +'</div>';
          })() : ''}
          ${wvMetricState.revenue ? (function(){
            const toAdrV2   = Math.max(80, adr - 20 - Math.abs((dm*3+dd*7)%15));
            const toRns     = Math.round(250 * to / 100);
            const toRevV    = Math.floor(toRns * toAdrV2);
            const hotelRevV = Number(rev);
            const hotelRevTick = Math.min(95, revBar + 10);
            const toShare   = hotelRevV > 0 ? Math.round(toRevV / hotelRevV * 100) : 0;
            const toRevStr  = '$'+Math.round(toRevV/1000)+'k';
            const hotRevStr = '$'+Math.round(hotelRevV/1000)+'k';
            var segRows = '';
            if (showH) {
              if (wvSegMode === 'individual') {
                const fitRev = Math.round(toRevV * 0.45), dynRev = Math.round(toRevV * 0.35), serRev = toRevV - fitRev - Math.round(toRevV*0.35);
                const fStr = fitRev>=1000 ? '$'+Math.round(fitRev/1000)+'k' : '$'+fitRev;
                const dStr = dynRev>=1000 ? '$'+Math.round(dynRev/1000)+'k' : '$'+dynRev;
                const sStr = serRev>=1000 ? '$'+Math.round(serRev/1000)+'k' : '$'+serRev;
                const sdlyFitRev = Math.round(sdlyToRev * 0.45), lyFitRev = Math.round(lyToRev * 0.45), fcstFitRev = Math.round(fcstToRev * 0.45);
                const sdlyDynRev = Math.round(sdlyToRev * 0.35), lyDynRev = Math.round(lyToRev * 0.35), fcstDynRev = Math.round(fcstToRev * 0.35);
                const sdlySerRev = sdlyToRev - sdlyFitRev - sdlyDynRev, lySerRev = lyToRev - lyFitRev - lyDynRev, fcstSerRev = fcstToRev - fcstFitRev - fcstDynRev;
                function fmtRev(v){return v>=1000?'$'+Math.round(v/1000)+'k':'$'+v;}
                segRows = '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#006461"></span><span class="wv-occ-br-lbl">Static FIT Rates</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">'+fStr+'</span></div></div>'
                  +_opCmp(fitRev, sdlyFitRev, lyFitRev, fcstFitRev, fmtRev)
                  +'<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#0891b2"></span><span class="wv-occ-br-lbl">TO Dynamic</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">'+dStr+'</span></div></div>'
                  +_opCmp(dynRev, sdlyDynRev, lyDynRev, fcstDynRev, fmtRev)
                  +'<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#6366f1"></span><span class="wv-occ-br-lbl">Tour Series</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">'+sStr+'</span></div></div>'
                  +_opCmp(serRev, sdlySerRev, lySerRev, fcstSerRev, fmtRev);
              } else {
                segRows = '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#eba2a2"></span><span class="wv-occ-br-lbl">TO Revenue</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">'+toRevStr+'</span></div></div>'
                  +_opCmp(toRevV, sdlyToRev, lyToRev, fcstToRev, function(v){return '$'+Math.round(v/1000)+'k';});
              }
            }
            const hotRevRow = '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#ea580c"></span><span class="wv-occ-br-lbl">Hotel Revenue</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">'+hotRevStr+'</span></div></div>';
            const htick     = showH ? '<div class="wv-bar-ref-tick" style="left:'+hotelRevTick+'%;background:#ea580c;width:2px;position:absolute;top:0;bottom:0"></div>' : '';
            return '<div>'
              +'<div class="wv-occ-bar-labels"><span class="wv-q-label">TO Revenue</span>'+wvHdrRight(toRevStr,'$'+Math.floor(sdlyR/1000)+'k','$'+Math.floor((lyR??sdlyR)/1000)+'k','$'+Math.floor(fcstR/1000)+'k')+'</div>'
              +'<div class="wv-occ-bar-track" style="position:relative;overflow:visible"><div style="width:'+revBar+'%;height:7px;background:#eba2a2;border-radius:4px;flex-shrink:0"></div>'+htick+barTicks(Math.max(3,revBarRef-5),revBarRef,Math.min(92,revBarRef+5))+'</div>'
              +(showH ? '<div class="wv-occ-breakdown">'+hotRevRow+segRows+'</div>' : '')
              +'</div>';
          })() : ''}
        </div>`;
      })()) : '' : ''}
      ${wvGroupBy === 'combined' ? ['dm_rnSold','dm_pickup_0','dm_pickup_1','dm_pickup_2','dm_avgAdults','dm_avgChildren','dm_totalAdults','dm_totalChildren','dm_trevpar','dm_availRooms','dm_availGuar'].some(function(k){return wvMetricState[k];}) ? wvAcc('More Metrics', 'detailed', (function(){
          const showS = wvMetricState.cmp_sdly, showL = wvMetricState.cmp_final_ly, showF = wvMetricState.cmp_forecast, showH = wvMetricState.cmp_hotel;
          const availRooms = Math.max(0, 102 - Math.floor(hotel * 1.02));
          // All three reference sets
          const S = { rn: Math.floor(hotel*0.82), adr: adr-8, rev: Math.floor(rev*0.9/1000), pkup: '+0', adA: '1.9', adC: '0.4', trev: Math.floor(adr*0.92), avR: availRooms+3, avG: Math.floor(8+v%5)+2 };
          const L = { rn: Math.floor(hotel*0.90), adr: adr-4, rev: Math.floor(rev*0.95/1000), pkup: '+2', adA: '1.95', adC: '0.35', trev: Math.floor(adr*0.96), avR: availRooms+2, avG: Math.floor(8+v%5)+1 };
          const F = { rn: Math.min(102,Math.floor(hotel*1.1)+3), adr: adr+6, rev: Math.floor(rev*1.06/1000), pkup: '+'+Math.floor(v%10+8), adA: '2.0', adC: '0.4', trev: Math.floor(adr*1.08), avR: availRooms-1, avG: Math.floor(8+v%5)-1 };
          // Hotel indicator values (higher than TO)
          const dmToAdr = Math.max(80, adr - 20 - Math.abs((dm*3+dd*7)%15));
          const dmToRn  = Math.round(HOTEL_CAPACITY * to / 100);
          const toFrac   = hotel > 0 ? to / hotel : 0; // fraction of hotel rooms that are TO
          const dmHotelRn = Math.round(HOTEL_CAPACITY * hotel / 100);
          const WV_CAP_DMH = 250;
          const dmToRev = Math.floor(dmToRn * dmToAdr);
          const dmToTrev = Math.floor(dmToRev / WV_CAP_DMH);
          const dmHotelTrev = Math.floor(rev / dmHotelRn);
          const dmToPickup = Math.max(0, Math.floor((v%25+5) * to / Math.max(1, hotel)));
          const dmHotelPickup = Math.floor(v%25+5);
          function dmRefRow(sv, lv, fv, hv) {
            const parts = [];
            if (showS && sv != null) parts.push('<span class="wv-ref-tag wv-ref-sdly">STLY '+sv+'</span>');
            if (showL && lv != null) parts.push('<span class="wv-ref-tag wv-ref-ly">LY '+lv+'</span>');
            if (showF && fv != null) parts.push('<span class="wv-ref-tag wv-ref-fcst">Fcst '+fv+'</span>');
            // Hotel chip removed — Hotel shown in breakdown rows below
            return parts.length ? '<div class="wv-ref-row">'+parts.join('')+'</div>' : '';
          }
          function dmTicks(bp, hbp) {
            const sp = Math.max(3, bp-15), lp = Math.max(3, bp-10), fp = Math.min(92, bp+5);
            return (showS?'<div class="wv-dm-sdly-mark wv-tick-sdly" style="left:'+sp+'%"></div>':'')
                 + (showL?'<div class="wv-dm-sdly-mark wv-tick-ly" style="left:'+lp+'%"></div>':'')
                 + (showF?'<div class="wv-dm-sdly-mark wv-tick-fcst" style="left:'+fp+'%"></div>':'')
                 // Hotel tick removed — shown in breakdown rows
          }
          // rows: [lbl, toVal, sv, lv, fv, barClr, barPct, key, hotelVal, hotelBarPct]
          const dmAvgAdults   = (1.8+v%3*.1).toFixed(1);
          const dmAvgChildren = (0.3+v%2*.1).toFixed(1);
          const dmTotalAdults   = Math.round(dmToRn * parseFloat(dmAvgAdults));
          const dmTotalChildren = Math.round(dmToRn * parseFloat(dmAvgChildren));
          // Hotel-level values for guest/LOS/lead time metrics
          const hotelAvgAdults   = (parseFloat(dmAvgAdults)   + 0.3).toFixed(1); // hotel slightly higher
          const hotelAvgChildren = (parseFloat(dmAvgChildren) + 0.1).toFixed(1);
          const hotelTotalAdults   = Math.round(dmHotelRn * parseFloat(hotelAvgAdults));
          const hotelTotalChildren = Math.round(dmHotelRn * parseFloat(hotelAvgChildren));
          const hotelAvgLos      = ((2.8+v%5*.3) + 0.4).toFixed(1)+'n';
          const hotelAvgLeadTime = (18+v%60+12)+'d';
          const dmTotalGuestsT   = Math.round(dmToRn * (parseFloat(dmAvgAdults) + parseFloat(dmAvgChildren)));
          const hotelTotalGuests = Math.round(dmHotelRn * (parseFloat(hotelAvgAdults) + parseFloat(hotelAvgChildren)));
          return [
            ['RN Sold',        dmToRn,         S.rn,  L.rn,  F.rn,  '#2e65e8', Math.min(92, 55+(v%37)),             'dm_rnSold',       dmHotelRn,         Math.min(92, 55+(v%37)+10)],
            {__type:'pickup_group', __dmToPickup:dmToPickup, __dmHotelPickup:dmHotelPickup, __toFrac:toFrac, __v:v},
            ['Avg Adults',     dmAvgAdults,    null,  null,  null,  '#2e65e8', Math.min(92, 55+v%30),               'dm_avgAdults',    hotelAvgAdults,    Math.min(92, 55+v%30+8)],
            ['Avg Children',   dmAvgChildren,  null,  null,  null,  '#d33030', Math.min(92, 20+v%40),               'dm_avgChildren',  hotelAvgChildren,  Math.min(92, 20+v%40+8)],
            ['Total Adults',   dmTotalAdults,  null,  null,  null,  '#2e65e8', Math.min(92, 60+v%28),               'dm_totalAdults',  hotelTotalAdults,  Math.min(92, 60+v%28+8)],
            ['Total Children', dmTotalChildren,null,  null,  null,  '#d33030', Math.min(92, 15+v%35),               'dm_totalChildren',hotelTotalChildren,Math.min(92, 15+v%35+8)],
            ['RevPAR',         '$'+dmToTrev,   '$'+S.trev, '$'+L.trev, null,  '#2e65e8', Math.min(92, 65+v%25),    'dm_trevpar',      '$'+dmHotelTrev,   Math.min(92, 65+v%25+10)],
            ['Avail Rooms',    availRooms,     null,  null,  null,  '#16a34a', Math.min(92, Math.max(5, hotel*0.8)),'dm_availRooms',   '__hotelOnly',     null],
            ['Avail Guar.',    Math.floor(8+v%5), null,null, null,  '#2e65e8', Math.min(92, 10+v%50),               'dm_availGuar',    null,              null],
            ['Avg LOS',        (2.8+v%5*.3).toFixed(1)+'n', null,null,null,'#0891b2', Math.min(92, 40+v%40), 'dm_avgLos',       hotelAvgLos,       Math.min(92, 40+v%40+8)],
            ['Avg Lead Time',  (18+v%60)+'d',               null,null,null,'#6366f1', Math.min(92, 25+v%55), 'dm_avgLeadTime',  hotelAvgLeadTime,  Math.min(92, 25+v%55+8)],
            ['Total Guests',   dmTotalGuestsT, null,null,null,'#0369a1', Math.min(92, 55+v%35),               'dm_totalGuests',  hotelTotalGuests,  Math.min(92, 55+v%35+8)],
          ].filter(function(row){
            if (row.__type==='pickup_group') return wvMetricState.dm_pickup;
            return wvMetricState[row[7]];
          }).map(function(row){
            // ── Grouped pickup cells (one per active window) ─────────────
            if (row.__type === 'pickup_group') {
              var _puDv3 = pickupDayValues[0] || 1;
              var _puSc3 = _puDv3<=1?0.3:_puDv3<=3?0.6:_puDv3<=7?1:Math.min(2,_puDv3/7);
              var _puToP  = Math.max(0, Math.round(row.__dmToPickup * _puSc3));
              var _puHtlP = Math.max(0, Math.round(row.__dmHotelPickup * _puSc3));
              var _puBp   = Math.min(92, 30 + row.__v % 50);
              var _puTPct = Math.round(_puBp * Math.min(1, row.__toFrac));
              var _puHPct = Math.round(_puBp * 1.1);
              var _puBar = '<div class="wv-dm-bar-wrap" style="position:relative">'
                +'<div class="wv-dm-bar-fill" style="width:'+_puHPct+'%;background:#006461;opacity:0.2"></div>'
                +'<div class="wv-dm-bar-fill" style="width:'+_puTPct+'%;background:#006461"></div>'
                +'</div>';
              var _puBd = '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#006461;opacity:.45"></span><span class="wv-occ-br-lbl">Hotel</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">+'+_puHtlP+'</span></div></div>'
                +'<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#006461"></span><span class="wv-occ-br-lbl" style="color:#006461">TO</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms" style="color:#006461">+'+_puToP+'</span></div></div>';
              return '<div>'
                +'<div class="wv-occ-bar-labels"><span class="wv-q-label">Pickup</span>'
                +'<div class="wv-hdr-right"><span class="wv-occ-total" style="color:#006461">+'+_puToP+'</span></div></div>'
                +_puBar
                +'<div class="wv-occ-breakdown" style="margin-top:2px">'+_puBd+'</div>'
                +'</div>';
            }
            const lbl=row[0],val=row[1],sv=row[2],lv=row[3],fv=row[4],barClr=row[5],barPct=row[6],hv=row[8],hbp=row[9];
            const isHotelOnly = hv === '__hotelOnly';
            const hvDisplay   = (hv && hv !== '__hotelOnly') ? hv : null;
            // Bar: Hotel faded full + T teal solid
            const tBarPct  = isHotelOnly ? 0 : Math.round(barPct * Math.min(1, toFrac));
            const hBarPct2 = hbp != null ? hbp : barPct;
            const dualBar  = '<div class="wv-dm-bar-wrap" style="position:relative">'
              +'<div class="wv-dm-bar-fill" style="width:'+hBarPct2+'%;background:'+barClr+(isHotelOnly?'':';opacity:0.25')+'"></div>'
              +(isHotelOnly ? '' : '<div class="wv-dm-bar-fill" style="width:'+tBarPct+'%;background:#006461"></div>')
              +dmTicks(barPct,hbp)
              +'</div>';
            // Breakdown rows
            var bdRows = '';
            if (isHotelOnly) {
              bdRows = '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:'+barClr+'"></span><span class="wv-occ-br-lbl">Hotel</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">'+val+'</span></div></div>';
            } else {
              // Tour operator value first
              bdRows += '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#006461"></span><span class="wv-occ-br-lbl" style="color:#006461">Tour Operator</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms" style="color:#006461">'+val+'</span></div></div>';
              // Hotel value if it exists
              if (hvDisplay != null) {
                bdRows += '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:'+barClr+';opacity:.45"></span><span class="wv-occ-br-lbl">Hotel</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms">'+hvDisplay+'</span></div></div>';
              }
              const canIndiv = (row[7]==='dm_rnSold'||row[7]==='dm_pickup'||row[7]==='dm_trevpar'||row[7]==='dm_avgAdults'||row[7]==='dm_avgChildren'||row[7]==='dm_totalAdults'||row[7]==='dm_totalChildren'||row[7]==='dm_avgLos'||row[7]==='dm_avgLeadTime'||row[7]==='dm_totalGuests');
              if (wvSegMode === 'individual' && canIndiv) {
                const rawVal = parseFloat(String(val).replace(/[^0-9.-]/g,'')) || 0;
                const isPickup = row[7]==='dm_pickup', isRev = row[7]==='dm_trevpar',
                      isLos = row[7]==='dm_avgLos', isLead = row[7]==='dm_avgLeadTime';
                const fmtSeg = function(f){ return isRev ? '$'+Math.round(rawVal*f) : isLos ? (rawVal*f).toFixed(1)+'n' : isLead ? Math.round(rawVal*f)+'d' : isPickup ? (rawVal*f>=0?'+':'')+Math.round(rawVal*f) : String(Math.round(rawVal*f)); };
                bdRows += '<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#006461"></span><span class="wv-occ-br-lbl" style="color:#006461">Static FIT</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms" style="color:#006461">'+fmtSeg(0.45)+'</span></div></div>'
                  +'<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#0891b2"></span><span class="wv-occ-br-lbl" style="color:#0891b2">TO Dynamic</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms" style="color:#0891b2">'+fmtSeg(0.35)+'</span></div></div>'
                  +'<div class="wv-occ-br-row"><div class="wv-occ-br-left"><span class="wv-occ-br-dot" style="background:#6366f1"></span><span class="wv-occ-br-lbl" style="color:#6366f1">Tour Series</span></div><div class="wv-occ-br-right"><span class="wv-occ-br-rms" style="color:#6366f1">'+fmtSeg(0.20)+'</span></div></div>';
              }
            }
            const headerClr = isHotelOnly ? '#181d1f' : '#006461';
            const dmHdrRight = (sv != null || lv != null || fv != null)
              ? wvHdrRight(val, sv != null ? String(sv) : null, lv != null ? String(lv) : null, fv != null ? String(fv) : null)
              : '<div class="wv-hdr-right"><span class="wv-occ-total" style="color:'+headerClr+'">'+val+'</span></div>';
            return '<div>'
              +'<div class="wv-occ-bar-labels"><span class="wv-q-label">'+lbl+'</span>'+dmHdrRight+'</div>'
              +dualBar
              +'<div class="wv-occ-breakdown" style="margin-top:2px">'+bdRows+'</div>'
              +'</div>';
          }).join('');
        })())  : '' : ''}
      ${wvGroupBy === 'combined' ? wvAcc('Meal Plans', 'meals', (function(){
          const aiPct  = Math.max(45, Math.min(68, 55 + (dm*7+dd*3)%14));
          const bbPct  = Math.max(14, Math.min(28, 20 + (dm*11+dd*5)%11));
          const hbPct  = Math.max(6,  Math.min(16, 10 + (dm*5+dd*7)%9));
          const roPct  = Math.max(2,  100 - aiPct - bbPct - hbPct);
          const totalRooms = Math.floor(hotel * 1.1);
          // TO meal plan percentages (subset of hotel)
          const toPct = to / Math.max(1, hotel); // fraction of rooms that are TO
          const toAiPct  = Math.round(aiPct  * toPct * (0.9 + (dm+dd)%3 * 0.05));
          const toBbPct  = Math.round(bbPct  * toPct * (0.85 + (dm*3+dd)%3 * 0.05));
          const toHbPct  = Math.round(hbPct  * toPct * (0.8  + (dm+dd*2)%3 * 0.05));
          const toRoPct  = Math.round(roPct  * toPct * (0.95 + (dm*2+dd)%3 * 0.03));
          const plans = [
            { name:'All Inclusive',   short:'AI', pct:aiPct, toPct:toAiPct,  color:'#004948' },
            { name:'Bed & Breakfast', short:'BB', pct:bbPct, toPct:toBbPct,  color:'#52d9ce' },
            { name:'Half Board',      short:'HB', pct:hbPct, toPct:toHbPct,  color:'#C4FF45' },
            { name:'Room Only',       short:'RO', pct:roPct, toPct:toRoPct,  color:'#D97706' },
          ];
          const barHtml = '<div class="wv-meals-bar">'
            + plans.map(p=>'<div style="width:'+p.pct+'%;background:'+p.color+';height:100%"></div>').join('')
            + '</div>';
          const baseAdr     = adr;
          const toAdrGross  = Math.round(adr * 0.82);
          const avgAdultsV  = 1.8 + (dm*11+dd*7)%3 * 0.1;
          const avgChildrenV= 0.3 + (dm*7+dd*13)%5 * 0.1;

          const rowsHtml = plans.map(function(p){
            const totalPlanRooms = Math.round(totalRooms * p.pct / 100);
            const toRoomsAmt     = Math.round(totalRooms * p.toPct / 100);
            const hGuests   = Math.round(totalPlanRooms * (avgAdultsV + avgChildrenV));
            const hRev      = Math.round(totalPlanRooms * baseAdr);
            const hRevStr   = hRev >= 1000 ? '$'+Math.round(hRev/1000)+'k' : '$'+hRev;
            const tGuests   = Math.round(toRoomsAmt * (avgAdultsV + avgChildrenV));
            const tRev      = Math.round(toRoomsAmt * toAdrGross);
            const tRevStr   = tRev >= 1000 ? '$'+Math.round(tRev/1000)+'k' : '$'+tRev;
            const headerRow = '<div class="wv-occ-br-row" style="grid-template-columns:8px 1fr 28px;padding:3px 8px">'
              +'<span class="wv-occ-br-dot" style="background:'+p.color+'"></span>'
              +'<span class="wv-occ-br-lbl" style="font-weight:700">'+p.short+' <span style="font-weight:400;color:#9ca3af">'+p.name+'</span></span>'
              +'<span class="wv-occ-br-pct">'+p.pct+'%</span>'
              +'</div>';
            const toRow = '<div class="wv-occ-br-row" style="grid-template-columns:8px 1fr auto;padding:1px 8px 1px 20px">'
              +'<span class="wv-occ-br-dot" style="background:#004948"></span>'
              +'<span class="wv-occ-br-lbl" style="color:#006461">TO</span>'
              +'<span class="wv-occ-br-rms" style="color:#006461">'+toRoomsAmt+' RN · '+tGuests+' G · '+tRevStr+' · $'+toAdrGross+'</span>'
              +'</div>';
            const hotelRow = '<div class="wv-occ-br-row" style="grid-template-columns:8px 1fr auto;padding:1px 8px 1px 20px">'
              +'<span class="wv-occ-br-dot" style="background:#52d9ce"></span>'
              +'<span class="wv-occ-br-lbl">Hotel</span>'
              +'<span class="wv-occ-br-rms">'+totalPlanRooms+' RN · '+hGuests+' G · '+hRevStr+' · $'+baseAdr+'</span>'
              +'</div>';
            return headerRow + toRow + hotelRow;
          }).join('');
          return barHtml + rowsHtml;
        })()) : ''}
      ${wvGroupBy === 'combined' ? wvMetricState.mealsSummary ? (function(){
        const aiPct2 = Math.max(45, Math.min(68, 55 + (dm*7+dd*3)%14));
        const bbPct2 = Math.max(14, Math.min(28, 20 + (dm*11+dd*5)%11));
        const hbPct2 = Math.max(6,  Math.min(16, 10 + (dm*5+dd*7)%9));
        const roPct2 = Math.max(2,  100 - aiPct2 - bbPct2 - hbPct2);
        const totalRooms2 = Math.floor(hotel * 1.1);
        const toPct2 = to / Math.max(1, hotel);
        const plans2 = [
          { name:'All Inclusive',   short:'AI', pct:aiPct2, toPct: Math.round(aiPct2 * toPct2 * (0.9  + (dm+dd)%3 * 0.05)), color:'#004948' },
          { name:'Bed & Breakfast', short:'BB', pct:bbPct2, toPct: Math.round(bbPct2 * toPct2 * (0.85 + (dm*3+dd)%3 * 0.05)), color:'#52d9ce' },
          { name:'Half Board',      short:'HB', pct:hbPct2, toPct: Math.round(hbPct2 * toPct2 * (0.8  + (dm+dd*2)%3 * 0.05)), color:'#C4FF45' },
          { name:'Room Only',       short:'RO', pct:roPct2, toPct: Math.round(roPct2 * toPct2 * (0.95 + (dm*2+dd)%3 * 0.03)), color:'#D97706' },
        ];
        const avgAdV2   = 1.8 + (dm*11+dd*7)%3 * 0.1;
        const avgChV2   = 0.3 + (dm*7+dd*13)%5 * 0.1;
        const rows2 = plans2.map(function(p){
          const planRooms = Math.round(totalRooms2 * p.pct / 100);
          const toRooms   = Math.round(totalRooms2 * p.toPct / 100);
          const guests    = Math.round(planRooms * (avgAdV2 + avgChV2));
          const toGuestPct= planRooms > 0 ? Math.round(toRooms / planRooms * 100) : 0;
          return '<div class="wv-occ-br-row" style="grid-template-columns:8px 1fr 28px 40px;padding:2px 8px">'            +'<span class="wv-occ-br-dot" style="background:'+p.color+'"></span>'            +'<span class="wv-occ-br-lbl" style="font-weight:700">'+p.short+'</span>'            +'<span class="wv-occ-br-pct">'+p.pct+'%</span>'            +'<span class="wv-occ-br-rms" style="color:#374151">'+guests+' TG</span>'            +'</div>';
        }).join('');
        const hdr2 = '<div style="display:flex;justify-content:flex-end;gap:6px;padding:1px 8px 2px">'          +'<span style="font-size:7px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.3px;width:40px;text-align:right">TG</span>'          +'</div>';
        return wvAcc('Meal Plans Summary', 'mealsSummary', hdr2 + rows2);
      })() : '' : ''}
      ${wvGroupBy === 'combined' ? (wvMetricState.avail || wvMetricState.availAlloc) ? wvAcc('Room Availability', 'avail', (function(){
          const RT = [['Standard',51],['Superior',36],['Deluxe',27],['Suite',12],['Jr. Suite',15],['Family',9]];
          const totalCap = RT.reduce(function(s,r){ return s+r[1]; }, 0);
          // Per room type calculations
          const rtData = RT.map(function(r, i){
            const inv = r[1];
            const totalSoldRt = Math.min(inv, Math.floor(inv * hotel / 110));
            const toSoldRt    = Math.min(totalSoldRt, Math.round(totalSoldRt * to / Math.max(1, hotel)));
            const otherSoldRt = totalSoldRt - toSoldRt;
            const toAlloc     = Math.floor(inv * 0.8 + Math.abs((dm*(i+3)+dd*(i+5))%15));
            const toAllocRem  = Math.max(0, toAlloc - toSoldRt);
            const avail       = Math.max(0, inv - totalSoldRt);
            return { inv, totalSoldRt, toSoldRt, otherSoldRt, toAlloc, toAllocRem, avail };
          });
          const totalSold      = rtData.reduce(function(s,d){ return s+d.totalSoldRt; }, 0);
          const totalToSold    = rtData.reduce(function(s,d){ return s+d.toSoldRt; }, 0);
          const totalOtherSold = rtData.reduce(function(s,d){ return s+d.otherSoldRt; }, 0);
          const totalAvail     = totalCap - totalSold;
          const totalToAllocRem= rtData.reduce(function(s,d){ return s+d.toAllocRem; }, 0);
          // Stacked capacity bar
          const toSoldPct    = Math.round(totalToSold    / totalCap * 100);
          const otherSoldPct = Math.round(totalOtherSold / totalCap * 100);
          const toAllocPct   = Math.round(totalToAllocRem/ totalCap * 100);
          const availPct     = Math.max(0, 100 - toSoldPct - otherSoldPct - toAllocPct);
          const capBar = '<div class="wv-cap-bar-wrap">'
            +'<div class="wv-cap-bar">'
            +'<div style="width:'+toSoldPct+'%;background:#006461;height:100%" title="TO Sold"></div>'
            +'<div style="width:'+otherSoldPct+'%;background:#3b82f6;height:100%" title="Other Sold"></div>'
            +'<div style="width:'+toAllocPct+'%;background:#fb923c;opacity:0.6;height:100%" title="T Alloc Remaining"></div>'
            +'<div style="width:'+availPct+'%;background:#d1fae5;height:100%" title="Available"></div>'
            +'</div>'
            +'<div class="wv-cap-legend">'
            +'<span class="wv-cap-leg-item"><span class="wv-cap-leg-dot" style="background:#006461"></span>TO Sold<b>'+totalToSold+'</b></span>'
            +'<span class="wv-cap-leg-item"><span class="wv-cap-leg-dot" style="background:#3b82f6"></span>Other <b>'+totalOtherSold+'</b></span>'
            +'<span class="wv-cap-leg-item"><span class="wv-cap-leg-dot" style="background:#fb923c"></span>T Alloc Rem. <b>'+totalToAllocRem+'</b></span>'
            +'<span class="wv-cap-leg-item"><span class="wv-cap-leg-dot" style="background:#16a34a"></span>Avail <b>'+totalAvail+'</b></span>'
            +'</div>'
            +'<div class="wv-cap-total">Capacity: <b>'+totalCap+' rooms</b> · '+Math.round(totalSold/totalCap*100)+'% occupied</div>'
            +'</div>';
          const tblHdr = '<div class="wv-cap-tbl-hdr">'
            +'<span class="wv-cap-th-type">Room Type</span>'
            +'<span class="wv-cap-th">Cap</span>'
            +'<span class="wv-cap-th" style="color:#006461">TO</span>'
            +'<span class="wv-cap-th" style="color:#3b82f6">Other</span>'
            +'<span class="wv-cap-th" style="color:#fb923c">Alloc↑</span>'
            +'<span class="wv-cap-th" style="color:#16a34a">Avail</span>'
            +'</div>';
          const rows = RT.map(function(r, i){
            const d = rtData[i];
            const availClr = d.avail === 0 ? '#ef4444' : '#16a34a';
            const toSoldPctRt    = d.inv > 0 ? Math.round(d.toSoldRt    / d.inv * 100) : 0;
            const otherSoldPctRt = d.inv > 0 ? Math.round(d.otherSoldRt / d.inv * 100) : 0;
            const toAllocPctRt   = d.inv > 0 ? Math.round(d.toAllocRem  / d.inv * 100) : 0;
            const availPctRt     = Math.max(0, 100 - toSoldPctRt - otherSoldPctRt - toAllocPctRt);
            return '<div class="wv-cap-rt-row">'
              +'<div class="wv-cap-rt-name">'
              +'<span class="wv-cap-rt-sw" style="background:'+RT_COLORS[i]+'"></span>'
              +'<span class="wv-cap-rt-lbl">'+r[0]+(d.avail===0?' <span class="wv-rt-closed-badge">CLOSED</span>':'')+'</span>'
              +'</div>'
              +'<span class="wv-cap-td">'+d.inv+'</span>'
              +'<span class="wv-cap-td" style="color:#006461">'+d.toSoldRt+'</span>'
              +'<span class="wv-cap-td" style="color:#3b82f6">'+d.otherSoldRt+'</span>'
              +'<span class="wv-cap-td" style="color:#fb923c">'+d.toAllocRem+'</span>'
              +'<span class="wv-cap-td" style="color:'+availClr+'">'+d.avail+'</span>'
              +'</div>';
          }).join('');
          return capBar + tblHdr + rows;
        })()) : '' : ''}
      ${wvGroupBy === 'combined' ? wvMetricState.toRates ? (function(){
        const seed = (dm * 37 + dd * 17) % 100;
        // EBB 10% for first 3 days of week (Sun/Mon/Tue), Contract for other 4
        const dayOfWeekD = (new Date(2026, dm-1, dd)).getDay();
        const isEbbDay   = dayOfWeekD < 3;
        const allPromos  = isEbbDay
          ? [{ name:'Early Bird 10%', type:'EBB 10%', discount:10, color:'#16a34a' }]
          : [{ name:'Contract Rate',  type:'Contract',discount:0,  color:'#2563eb' }];
        const toOperators = [
          { name:'Sunshine Tours', color:'#3b82f6' },
          { name:'Global Adv.',    color:'#967EF3' },
          { name:'Beach Hols',     color:'#0ea5e9' },
          { name:'City Breaks',    color:'#10b981' },
          { name:'Adventure',      color:'#f59e0b' },
        ];
        const baseSegRate = adr + 8;  // Base Segment Selling Rate (higher than TO rates)
        const rows = toOperators.map(function(op, i) {
          const toRate  = adr - 15 + Math.abs((dm*(i+3) + dd*(i+5)) % 50);
          const toAllot = 5  + Math.abs((dm*(i+2) + dd*(i+3)) % 20);
          const toUsed  = Math.max(0, toAllot - Math.floor(hotel / 20));
          const barPct  = Math.round((toUsed / toAllot) * 100);
          const barCls  = barPct >= 90 ? 'wv-to-bar-high' : barPct >= 60 ? 'wv-to-bar-mid' : 'wv-to-bar-low';
          // All operators get same promo (EBB or Contract based on day of week)
          const hasPromo = true;
          const promo = allPromos[0];
          const promoTag = hasPromo
            ? `<span class="wv-to-promo-tag" style="background:${promo.color}" data-tooltip="${promo.name}${promo.discount>0?' (−'+promo.discount+'%)':''}">${promo.type}</span>`
            : `<span class="wv-to-promo-none">—</span>`;
          const tooltipText = hasPromo ? `Promo: ${promo.name}` : '';
          return `<div class="wv-to-rate-row" title="${tooltipText}">
            <span class="wv-to-dot" style="background:${op.color}"></span>
            <span class="wv-to-name">${op.name}</span>
            ${promoTag}
            <span class="wv-to-rate">$${toRate}</span>
            <span class="wv-to-allot">${toAllot - toUsed}r</span>
          </div>`;
        }).join('');
        const baseRateLine = '<div class="wv-to-rate-row" style="border-top:1px solid #e5e7eb;margin-top:4px;padding-top:4px">'
          +'<span class="wv-to-dot" style="background:#9333ea"></span>'
          +'<span class="wv-to-name" style="font-weight:700;color:#374151">Base Segment Rate</span>'
          +'<span style="flex:1"></span>'
          +'<span class="wv-to-rate" style="font-weight:700;color:#9333ea">$'+baseSegRate+'</span>'
          +'</div>';
        return wvAcc('Travel Company Rates', 'toRates', rows + baseRateLine);
      })() : '' : ''}
      ${wvGroupBy === 'combined' ? wvMetricState.bizMix ? (function(){
        const toMix    = 28 + Math.abs((dm*7+dd*5)%25);
        const directMix= 30 + Math.abs((dm*5+dd*9)%20);
        const otaMix   = 20 + Math.abs((dm*9+dd*3)%18);
        const otherMix = Math.max(0, 100 - toMix - directMix - otaMix);
        const segments = [
          { name:'Operator', short:'TO',     pct: toMix,    color:'#006461' },
          { name:'Direct',        short:'Direct', pct: directMix,color:'#0284c7' },
          { name:'OTA',           short:'OTA',    pct: otaMix,   color:'#D97706' },
          { name:'Other',         short:'Other',  pct: otherMix, color:'#9ca3af' },
        ];
        const barHtml = '<div class="wv-meals-bar">'
          + segments.map(s=>'<div style="width:'+s.pct+'%;background:'+s.color+';height:100%"></div>').join('')
          + '</div>';
        const rowsHtml = segments.map(function(s){
          // Individual mode: replace TO row with 3 sub-segments; all other rows unchanged
          if (wvSegMode === 'individual' && s.short === 'TO') {
            const fitP2 = Math.round(s.pct * 0.45), dynP2 = Math.round(s.pct * 0.35), serP2 = s.pct - fitP2 - dynP2;
            return '<div class="wv-meal-row"><span class="wv-meal-dot" style="background:#006461"></span><span class="wv-meal-name">Static FIT</span><span class="wv-meal-pct">'+fitP2+'%</span></div>'
              +'<div class="wv-meal-row"><span class="wv-meal-dot" style="background:#0891b2"></span><span class="wv-meal-name">TO Dynamic</span><span class="wv-meal-pct">'+dynP2+'%</span></div>'
              +'<div class="wv-meal-row"><span class="wv-meal-dot" style="background:#6366f1"></span><span class="wv-meal-name">Tour Series</span><span class="wv-meal-pct">'+serP2+'%</span></div>';
          }
          return '<div class="wv-meal-row"><span class="wv-meal-dot" style="background:'+s.color+'"></span><span class="wv-meal-name">'+s.short+'</span><span class="wv-meal-pct">'+s.pct+'%</span></div>';
        }).join('');
        return wvAcc('Business Mix', 'bizMix', barHtml + rowsHtml);
      })() : '' : ''}
      </div>
    </div>`;
  }).join('');

  if (wvGroupBy === 'report' || wvGroupBy === 'coReport' || wvGroupBy === 'dailyH' || wvGroupBy === 'dailyB') return;

  // Apply custom section order for combined view
  if (wvGroupBy === 'combined' && _wvSectionOrder) applyWvSectionOrder(grid);

  // ── Equalize section body heights across day columns ──────────────────────
  // Returns a map of section → max body height (for panel sync)
  var sectionHeightMap = {};
  (function equalizeWvBodies() {
    var sections = ['daily','detailed','meals','mealsSummary','avail','toRates','bizMix'];
    if (wvGroupBy === 'roomType') sections = ['rt_0','rt_1','rt_2','rt_3','rt_4','rt_5'];
    sections.forEach(function(sec) {
      var bodies = [];
      grid.querySelectorAll('.wv-acc-hdr[data-section="' + sec + '"]').forEach(function(hdr) {
        var b = hdr.nextElementSibling;
        if (b && b.classList.contains('wv-acc-body')) bodies.push(b);
      });
      bodies.forEach(function(b) { b.style.minHeight = ''; });
      var maxH = 0;
      bodies.forEach(function(b) {
        if (!b.classList.contains('wv-body-hidden') && b.scrollHeight > maxH) maxH = b.scrollHeight;
      });
      if (maxH > 0) {
        bodies.forEach(function(b) {
          if (!b.classList.contains('wv-body-hidden')) b.style.minHeight = maxH + 'px';
        });
        sectionHeightMap[sec] = maxH;
      }
    });
  })();

  // ── Build left section panel (combined mode only) ─────────────────────────
  var panel = document.getElementById('wvSectionPanel');
  if (!panel) return;

  if (wvGroupBy !== 'combined') {
    panel.style.display = 'none';
    return;
  }

  // Collect sections in order from first day column
  var sectionItems = [];
  var seen = {};
  grid.querySelectorAll('.wv-acc-hdr[data-section]').forEach(function(hdr) {
    var sec = hdr.dataset.section;
    if (seen[sec]) return;
    seen[sec] = true;
    var titleEl = hdr.querySelector('.wv-acc-title');
    var badgeEl = hdr.querySelector('.wv-acc-badge');
    sectionItems.push({
      sec: sec,
      title: titleEl ? titleEl.textContent : sec,
      badge: badgeEl ? badgeEl.textContent : ''
    });
  });

  var spChevUp   = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  var spChevDown = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

  // Measure col-hdr height so we can add a matching spacer at the top of the panel
  var firstColHdr = grid.querySelector('.wv-col-hdr');
  var colHdrH = firstColHdr ? Math.round(firstColHdr.getBoundingClientRect().height) : 0;

  panel.innerHTML = '<div class="wvsp-hdr-spacer" style="height:' + colHdrH + 'px;flex-shrink:0;border-bottom:2px solid #006461"></div>'
    + sectionItems.map(function(item) {
    var collapsed = !!wvCollapsed[item.sec];
    return '<div class="wvsp-item' + (collapsed ? '' : ' wvsp-open') + '" onclick="wvToggleSection(\'' + item.sec + '\')" data-section="' + item.sec + '">'
      + '<span class="wvsp-chev">' + (collapsed ? spChevDown : spChevUp) + '</span>'
      + '<span class="wvsp-title">' + item.title + '</span>'
      + (item.badge ? '<span class="wv-acc-badge">' + item.badge + '</span>' : '')
      + '</div>';
  }).join('');

  panel.style.display = '';

  // Sync close-out button with weekly checkbox state
  _syncCloseOutBtn();

  // Sync panel item heights to actual rendered section heights (not body.scrollHeight
  // which can diverge from layout height once flex/grid stretching is applied)
  sectionItems.forEach(function(item) {
    var panelItem = panel.querySelector('[data-section="' + item.sec + '"]');
    if (!panelItem) return;
    var collapsed = !!wvCollapsed[item.sec];
    if (collapsed) {
      panelItem.style.height = '';
      panelItem.style.minHeight = '';
      return;
    }
    // Use the actual rendered section height from the grid (tallest column wins)
    var maxSectH = 0;
    grid.querySelectorAll('.wv-acc-hdr[data-section="' + item.sec + '"]').forEach(function(hdr) {
      var sect = hdr.closest('.wv-acc-sect');
      if (sect) {
        var h = Math.round(sect.getBoundingClientRect().height);
        if (h > maxSectH) maxSectH = h;
      }
    });
    if (maxSectH > 0) {
      panelItem.style.height = maxSectH + 'px';
      panelItem.style.minHeight = maxSectH + 'px';
    }
  });
}

// ── Section panel toggle ──────────────────────────────────────────────────
window.wvToggleSection = function(section) {
  if (!wvCollapsed.hasOwnProperty(section)) wvCollapsed[section] = true;
  wvCollapsed[section] = !wvCollapsed[section];
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
};

// ── Open All / Close All (works for both combined and room & board views) ─
const COMBINED_SECTIONS = ['daily','detailed','meals','avail','availAlloc','toRates','promos'];

// ── Room Type & Board default state: RT open, BT and sub-sections closed ────
(function initRtDefaults() {
  [0,1,2,3,4,5].forEach(function(ri) {
    if (!Object.prototype.hasOwnProperty.call(wvCollapsed, 'rt_' + ri)) wvCollapsed['rt_' + ri] = false;
    [0,1,2,3].forEach(function(bi) {
      ['bt_','btdet_','btavail_','btto_'].forEach(function(pfx) {
        var k = pfx + ri + '_' + bi;
        if (!Object.prototype.hasOwnProperty.call(wvCollapsed, k)) wvCollapsed[k] = true;
      });
    });
  });
}());
function setAllAccordions(collapse) {
  if (wvGroupBy === 'dailyH') {
    dhSetAll(collapse);
    return;
  }
  if (wvGroupBy === 'dailyB') {
    wbSetAll(collapse);
    return;
  }
  if (wvGroupBy === 'combined') {
    COMBINED_SECTIONS.forEach(function(k) { wvCollapsed[k] = collapse; });
    // Also set any other keys in wvCollapsed so inner accordions collapse too
    for (var ck in wvCollapsed) {
      if (wvCollapsed.hasOwnProperty(ck)) wvCollapsed[ck] = collapse;
    }
  } else {
    // RT level
    [0,1,2,3,4,5].forEach(function(ri) {
      wvCollapsed['rt_' + ri] = collapse;
      // BT level
      [0,1,2,3].forEach(function(bi) {
        wvCollapsed['bt_' + ri + '_' + bi] = collapse;
        // Sub-section level
        wvCollapsed['btdet_'   + ri + '_' + bi] = collapse;
        wvCollapsed['btavail_' + ri + '_' + bi] = collapse;
        wvCollapsed['btto_'    + ri + '_' + bi] = collapse;
      });
    });
  }
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
}
document.getElementById('wvRtCloseAll')?.addEventListener('click', function() { setAllAccordions(true); });
document.getElementById('wvRtOpenAll')?.addEventListener('click',  function() { setAllAccordions(false); });

function _updateAccBtnState() {
  var disabled = (wvGroupBy === 'roomType' || wvGroupBy === 'coReport');
  // Open/Close All
  ['wvRtCloseAll','wvRtOpenAll'].forEach(function(id) {
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.disabled = disabled;
    btn.style.opacity = disabled ? '0.35' : '';
    btn.style.cursor  = disabled ? 'not-allowed' : '';
  });
  // Table Settings & Filters buttons
  ['wvTableSettingsBtn','wvFiltersBtn'].forEach(function(id) {
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.disabled = disabled;
    btn.style.opacity      = disabled ? '0.35' : '';
    btn.style.cursor       = disabled ? 'not-allowed' : '';
    btn.style.pointerEvents = disabled ? 'none' : '';
  });
  // Compare pills
  var pillsWrap = document.getElementById('wvCmpPills');
  if (pillsWrap) {
    pillsWrap.querySelectorAll('.wv-cmp-pill').forEach(function(p) {
      p.disabled = disabled;
      p.style.opacity       = disabled ? '0.35' : '';
      p.style.cursor        = disabled ? 'not-allowed' : '';
      p.style.pointerEvents = disabled ? 'none' : '';
    });
  }
}

// ── Reorder Modal (shared across Daily, Daily H, Daily R) ─────────────────
var _tsDragEl = null;

// Mapping: sect/group IDs → wvMetricState keys
var _tsMetricMap = {
  // Group-level (top)
  g_closeouts: ['dm_closeouts'],
  g_daily:   ['capacity','onlineOffline','adr','revenue'],
  g_more:    ['dm_rnSold','dm_trevpar','dm_pickup','dm_avgAdults','dm_avgChildren',
              'dm_totalAdults','dm_totalChildren','dm_totalGuests','dm_avgLos','dm_avgLeadTime',
              'dm_availRooms','dm_availGuar'],
  g_meals:   ['mealsSummary'],
  g_biz:     ['bizMix'],
  g_avail:   ['avail','availAlloc'],
  g_torates: ['toRates'],
  // Close-outs sub-rows
  co_rooms: ['dm_co_rooms'], co_boards: ['dm_co_boards'], co_tos: ['dm_co_tos'],
  // Sect-level (child)
  occ: ['capacity'], onoff: ['onlineOffline'], adr: ['adr'], rev: ['revenue'],
  rn: ['dm_rnSold'], revpar_s: ['dm_trevpar'], pickup_s: ['dm_pickup'],
  avga_s: ['dm_avgAdults'], avgc_s: ['dm_avgChildren'],
  tota_s: ['dm_totalAdults'], totc_s: ['dm_totalChildren'],
  totg_s: ['dm_totalGuests'], los_s: ['dm_avgLos'], lead_s: ['dm_avgLeadTime'],
  avail_s: ['dm_availRooms'], availg_s: ['dm_availGuar'],
  biz: ['bizMix'],
  mp_ai: ['mealsSummary'], mp_bb: ['mealsSummary'], mp_hb: ['mealsSummary'],
  mp_ro: ['mealsSummary'], mp_sum: ['mealsSummary']
};
var _tsCheckSvg = '<svg viewBox="0 0 18 18" width="14" height="14" fill="none"><path d="M3.5 9l3.5 3.5 7-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var _tsDragSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">'
  + '<circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/>'
  + '<circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/>'
  + '<circle cx="9" cy="15" r="1.5"/><circle cx="15" cy="15" r="1.5"/>'
  + '<circle cx="9" cy="20" r="1.5"/><circle cx="15" cy="20" r="1.5"/></svg>';

function _tsToggleCb(cb) {
  cb.classList.toggle('unchecked');
  cb.innerHTML = cb.classList.contains('unchecked') ? '' : _tsCheckSvg;
}

function _tsAddRow(list, key, label, depth, draggable, checked) {
  if (checked === undefined) checked = true;
  var row = document.createElement('div');
  row.className = 'ts-tree-row';
  row.style.paddingLeft = (8 + depth * 24) + 'px';
  if (draggable) row.draggable = true;
  row.dataset.parKey = key;
  row.dataset.depth = depth;

  // Checkbox
  var cb = document.createElement('span');
  cb.className = 'ts-checkbox' + (checked ? '' : ' unchecked');
  cb.innerHTML = checked ? _tsCheckSvg : '';
  cb.addEventListener('click', function(e) {
    e.stopPropagation();
    _tsToggleCb(cb);
    // If parent, toggle all children too
    if (depth === 0) {
      var isChecked = !cb.classList.contains('unchecked');
      var sib = row.nextElementSibling;
      while (sib && parseInt(sib.dataset.depth || 0) > 0) {
        var childCb = sib.querySelector('.ts-checkbox');
        if (childCb) {
          if (isChecked) { childCb.classList.remove('unchecked'); childCb.innerHTML = _tsCheckSvg; }
          else { childCb.classList.add('unchecked'); childCb.innerHTML = ''; }
        }
        sib = sib.nextElementSibling;
      }
    }
  });

  // Label
  var lbl = document.createElement('span');
  lbl.className = 'ts-tree-lbl';
  lbl.textContent = label;
  if (depth === 0) lbl.style.fontWeight = '600';

  // Drag handle (right side)
  var handle = document.createElement('span');
  handle.className = 'ts-drag-handle';
  handle.innerHTML = _tsDragSvg;

  row.appendChild(cb);
  row.appendChild(lbl);
  row.appendChild(handle);

  // Drag events (only for draggable rows)
  if (draggable) {
    row.addEventListener('dragstart', function(e) {
      _tsDragEl = row; row.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    row.addEventListener('dragend', function() {
      row.classList.remove('dragging'); _tsDragEl = null;
      list.querySelectorAll('.ts-tree-row').forEach(function(r) { r.classList.remove('drop-above','drop-below'); });
    });
  }
  row.addEventListener('dragover', function(e) {
    e.preventDefault();
    if (!_tsDragEl || _tsDragEl === row) return;
    var mid = row.getBoundingClientRect().top + row.offsetHeight / 2;
    row.classList.remove('drop-above','drop-below');
    row.classList.add(e.clientY < mid ? 'drop-above' : 'drop-below');
  });
  row.addEventListener('dragleave', function() { row.classList.remove('drop-above','drop-below'); });
  row.addEventListener('drop', function(e) {
    e.preventDefault();
    row.classList.remove('drop-above','drop-below');
    if (!_tsDragEl || _tsDragEl === row) return;
    var mid = row.getBoundingClientRect().top + row.offsetHeight / 2;
    list.insertBefore(_tsDragEl, e.clientY < mid ? row : row.nextSibling);
  });

  list.appendChild(row);
  return row;
}

function _tsIsChecked(key) {
  var mks = _tsMetricMap[key];
  if (!mks || mks.length === 0) return true;
  for (var i = 0; i < mks.length; i++) {
    if (wvMetricState[mks[i]]) return true;
  }
  return false;
}

function _buildReorderList(list, items) {
  // items: [{ key, lbl, children: [{ key, lbl, children: [...] }] }]
  list.innerHTML = '';
  items.forEach(function(p) {
    _tsAddRow(list, p.key, p.lbl, 0, true, _tsIsChecked(p.key));
    if (p.children) {
      p.children.forEach(function(c) {
        _tsAddRow(list, c.key, c.lbl, 1, false, _tsIsChecked(c.key));
        if (c.children) {
          c.children.forEach(function(sc) {
            _tsAddRow(list, sc.key, sc.lbl, 2, false, _tsIsChecked(sc.key));
          });
        }
      });
    }
  });
}

// Select All / Deselect All for Table Settings
window.tsFilterRows = function(query) {
  var q = query.trim().toLowerCase();
  var list = document.getElementById('dhReorderList');
  if (!list) return;
  var rows = list.querySelectorAll('.ts-tree-row');
  if (!q) {
    rows.forEach(function(r) { r.style.display = ''; });
    return;
  }
  // First pass: mark which rows match
  var matchSet = new Set();
  rows.forEach(function(r) {
    var lbl = (r.querySelector('.ts-tree-lbl') || {}).textContent || '';
    if (lbl.toLowerCase().includes(q)) matchSet.add(r);
  });
  // Second pass: show matched rows + their depth-0 parents
  rows.forEach(function(r) {
    var depth = parseInt(r.dataset.depth || 0);
    if (matchSet.has(r)) {
      r.style.display = '';
      // Show parent depth-0 row
      if (depth > 0) {
        var prev = r.previousElementSibling;
        while (prev) {
          if (parseInt(prev.dataset.depth || 0) === 0) { prev.style.display = ''; break; }
          prev = prev.previousElementSibling;
        }
      }
    } else {
      r.style.display = 'none';
    }
  });
};

window.tsCheckAll = function(checked) {
  var list = document.getElementById('dhReorderList');
  if (!list) return;
  list.querySelectorAll('.ts-checkbox').forEach(function(cb) {
    if (checked) { cb.classList.remove('unchecked'); cb.innerHTML = _tsCheckSvg; }
    else { cb.classList.add('unchecked'); cb.innerHTML = ''; }
  });
};

window.dhOpenReorder = function() {
  var modal = document.getElementById('dhReorderModal');
  var list  = document.getElementById('dhReorderList');
  if (!modal || !list) return;

  // Title is now fixed in HTML as "Table Settings"

  if (wvGroupBy === 'dailyH') {
    // Build hierarchical items: sec → par as children
    var items = [], curSec = null;
    _dhAllRows.forEach(function(r) {
      if (r.type === 'sec') {
        curSec = { key: r.secKey, lbl: r.lbl, children: [] };
        items.push(curSec);
      }
      if (r.type === 'par' && curSec) {
        curSec.children.push({ key: r.parKey, lbl: r.lbl });
      }
    });
    _buildReorderList(list, items);

  } else if (wvGroupBy === 'combined') {
    var renderedSecs = {};
    var g = document.getElementById('weekGrid');
    if (g) g.querySelectorAll('.wv-acc-hdr[data-section]').forEach(function(el) { renderedSecs[el.dataset.section] = true; });
    var curOrder = (_wvSectionOrder && _wvSectionOrder.length) ? _wvSectionOrder : WV_SECTIONS_DEF.map(function(s){return s.key;});
    var items = [];
    curOrder.forEach(function(k) {
      if (!renderedSecs[k]) return;
      var def = WV_SECTIONS_DEF.filter(function(s){return s.key===k;})[0];
      if (def) items.push({ key: k, lbl: def.lbl });
    });
    WV_SECTIONS_DEF.forEach(function(s) {
      if (renderedSecs[s.key] && curOrder.indexOf(s.key) === -1)
        items.push({ key: s.key, lbl: s.lbl });
    });
    _buildReorderList(list, items);

  } else if (wvGroupBy === 'report') {
    var curOrder = (_drColOrder && _drColOrder.length) ? _drColOrder : DR_GROUPS_DEF.map(function(g){return g.key;});
    var items = curOrder.map(function(k) {
      var def = DR_GROUPS_DEF.filter(function(g){return g.key===k;})[0] || { clr:'#374151' };
      return { key: k, lbl: k };
    });
    _buildReorderList(list, items);
  } else if (wvGroupBy === 'dailyB') {
    var curOrder = (_wbGroupOrder && _wbGroupOrder.length) ? _wbGroupOrder : WB_GROUPS_DEF.map(function(g){return g.key;});
    var gd = window._wbGrpData || {};
    var items = curOrder.map(function(k) {
      var def = WB_GROUPS_DEF.filter(function(g){return g.key===k;})[0] || { lbl: k, clr: '#374151' };
      var children = [];
      var rows = gd[k] || [];
      // Build sect → sub hierarchy
      var curSect = null;
      rows.forEach(function(r) {
        if (r.type === 'top') return;
        if (r.type === 'sect') {
          curSect = { key: r.id, lbl: r.label, children: [] };
          children.push(curSect);
        } else if (r.type === 'sub' && curSect) {
          curSect.children.push({ key: r.id, lbl: r.label });
        } else if (r.type === 'sub') {
          children.push({ key: r.id, lbl: r.label });
        }
      });
      return { key: k, lbl: def.lbl, children: children };
    });
    _buildReorderList(list, items);
  }

  modal.style.display = 'flex';
  var srch = document.getElementById('tsSearchInput');
  if (srch) { srch.value = ''; tsFilterRows(''); srch.focus(); }
};

window.dhReorderModalBg = function(e) {
  if (e.target.id === 'dhReorderModal') e.target.style.display = 'none';
};

window.dhApplyReorder = function() {
  var list = document.getElementById('dhReorderList');
  var order = [];
  list.querySelectorAll('.ts-tree-row[data-depth="0"]').forEach(function(li) { order.push(li.dataset.parKey); });

  // Update wvMetricState from checkbox states
  if (wvGroupBy === 'dailyB' || wvGroupBy === 'dailyH') {
    list.querySelectorAll('.ts-tree-row').forEach(function(row) {
      var key = row.dataset.parKey;
      var isChecked = !row.querySelector('.ts-checkbox').classList.contains('unchecked');
      var metricKeys = _tsMetricMap[key];
      if (metricKeys) {
        metricKeys.forEach(function(mk) { wvMetricState[mk] = isChecked; });
      }
    });
  }

  document.getElementById('dhReorderModal').style.display = 'none';
  if (wvGroupBy === 'dailyH') {
    _dhMetricOrder = order;
    var a = _dhLastInitArgs;
    if (a) initDailyHGrid(a.days, a.month, a.day, a.container);
  } else if (wvGroupBy === 'combined') {
    _wvSectionOrder = order;
    buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
  } else if (wvGroupBy === 'report') {
    _drColOrder = order;
    var a = _drLastInitArgs;
    if (a) initDailyRevGrid(a.days, a.container);
  } else if (wvGroupBy === 'dailyB') {
    _wbGroupOrder = order;
    buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
  }
};

window.dhResetReorder = function() {
  document.getElementById('dhReorderModal').style.display = 'none';
  if (wvGroupBy === 'dailyH') {
    _dhMetricOrder = null;
    var a = _dhLastInitArgs;
    if (a) initDailyHGrid(a.days, a.month, a.day, a.container);
  } else if (wvGroupBy === 'combined') {
    _wvSectionOrder = null;
    buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
  } else if (wvGroupBy === 'report') {
    _drColOrder = null;
    var a = _drLastInitArgs;
    if (a) initDailyRevGrid(a.days, a.container);
  } else if (wvGroupBy === 'dailyB') {
    _wbGroupOrder = null;
    buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
  }
};

// ── Group-by toggle ───────────────────────────────────────────────────────
document.querySelectorAll('#weekView .wv-groupby-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    // "Monthly" tab in weekly bar → switch back to month view
    if (this.dataset.groupby === 'monthly') {
      goToMonthView();
      return;
    }
    wvGroupBy = this.dataset.groupby;
    document.querySelectorAll('#weekView .wv-groupby-btn').forEach(function(b) { b.classList.remove('active'); });
    this.classList.add('active');
    _updateAccBtnState();
    // Table Settings inline button visibility handled by topbar
    buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
  });
});

// Return to monthly calendar view
window.goToMonthView = function() {
  // Sync weekly filters → calendar so selections persist across views
  syncFiltersWvToCal();
  applyFilterUI('calFiltersDropdown');
  _syncPickupBtnUI('cal');

  document.getElementById('demand-calendar').style.display = '';
  document.getElementById('weekView').classList.remove('visible');
  var backArrow = document.getElementById('wvBack');
  if (backArrow) backArrow.style.display = 'none';
  var hdrCtr = document.getElementById('wvHeaderCenter');
  if (hdrCtr) hdrCtr.style.display = 'none';
  // Show monthly tab bar and reset "Monthly" as active tab
  var moBar = document.getElementById('moGroupbyBar');
  if (moBar) moBar.style.display = (calDisplayView <= 3) ? '' : 'none';
  document.querySelectorAll('.mo-grp-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.mogroupby === 'monthly');
  });
  renderCalendar();
};

// Week nav + back (legacy arrow in cal-header also calls goToMonthView)
document.getElementById('wvBack')?.addEventListener('click', goToMonthView);
document.getElementById('wvPrev')?.addEventListener('click', () => {
  const dim = [0,31,28,31,30,31,30,31,31,30,31,30,31];
  wvWeekStart -= 1;
  if (wvWeekStart < 1) { wvMonth--; if (wvMonth < 1) wvMonth = 12; wvWeekStart = dim[wvMonth]; }
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
});
document.getElementById('wvNext')?.addEventListener('click', () => {
  const dim = [0,31,28,31,30,31,30,31,31,30,31,30,31];
  wvWeekStart += 1;
  if (wvWeekStart > dim[wvMonth]) { wvMonth++; if (wvMonth > 12) wvMonth = 1; wvWeekStart = 1; }
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
});

// ── Week date picker ──────────────────────────────────────────────
// ── Week date-picker popup ────────────────────────────────────────
var wvwpViewMonth = 3, wvwpViewYear = 2026;

function wvWeekPickToggle() {
  var panel = document.getElementById('wvWeekPickPanel');
  if (!panel) return;
  if (panel.style.display !== 'none') { panel.style.display = 'none'; return; }
  wvwpViewMonth = wvMonth; wvwpViewYear = wvYear;
  wvwpRender();
  var btn = document.getElementById('wvWeekPickBtn');
  var rect = btn.getBoundingClientRect();
  panel.style.left = rect.left + 'px';
  panel.style.top  = (rect.bottom + 4) + 'px';
  panel.style.display = 'block';
}
function wvwpNav(dir) {
  wvwpViewMonth += dir;
  if (wvwpViewMonth < 1)  { wvwpViewMonth = 12; wvwpViewYear--; }
  if (wvwpViewMonth > 12) { wvwpViewMonth = 1;  wvwpViewYear++; }
  wvwpRender();
}
function wvwpDayIdx(m, d) {
  var dim = [0,31,28,31,30,31,30,31,31,30,31,30,31];
  var idx = d; for (var i = 1; i < m; i++) idx += dim[i]; return idx;
}
function wvwpRender() {
  var MNAMES = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
  var DNAMES = ['Mo','Tu','We','Th','Fr','Sa','Su'];
  var dim    = [0,31,28,31,30,31,30,31,31,30,31,30,31];
  document.getElementById('wvwpTitle').textContent = MNAMES[wvwpViewMonth] + ' ' + wvwpViewYear;
  var startIdx = wvwpDayIdx(wvMonth, wvWeekStart), endIdx = startIdx + 6;
  var firstDow  = new Date(wvwpViewYear, wvwpViewMonth - 1, 1).getDay(); // 0=Sun
  var startOff  = (firstDow + 6) % 7; // Mon-based offset
  var html = '';
  DNAMES.forEach(function(n){ html += '<div class="wvwp-day-hdr">'+n+'</div>'; });
  for (var i = 0; i < startOff; i++) html += '<div class="wvwp-day wvwp-empty"><div class="wvwp-day-bg"></div><div class="wvwp-day-lbl"></div></div>';
  for (var d = 1; d <= dim[wvwpViewMonth]; d++) {
    var idx = wvwpDayIdx(wvwpViewMonth, d);
    var cls = 'wvwp-day';
    if (idx === startIdx) cls += ' wvwp-week-start';
    if (idx === endIdx)   cls += ' wvwp-week-end';
    if (idx > startIdx && idx < endIdx) cls += ' wvwp-in-week';
    html += '<div class="'+cls+'" onclick="wvPickWeekDay('+wvwpViewMonth+','+d+')">'
          + '<div class="wvwp-day-bg"></div><div class="wvwp-day-lbl">'+d+'</div></div>';
  }
  document.getElementById('wvwpGrid').innerHTML = html;
}
function wvPickWeekDay(m, d) {
  wvMonth = m; wvWeekStart = d;
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
  document.getElementById('wvWeekPickPanel').style.display = 'none';
}
// Close picker on outside click
document.addEventListener('click', function(e) {
  var wrap = document.getElementById('wvWeekPickWrap');
  if (wrap && !wrap.contains(e.target)) {
    var p = document.getElementById('wvWeekPickPanel');
    if (p) p.style.display = 'none';
  }
});

// ── Partial closure padlock toggle ───────────────────────────────
document.getElementById('weekGrid')?.addEventListener('click', function(e) {
  const btn = e.target.closest('.wv-partial-lock-btn');
  if (!btn) return;
  e.stopPropagation();
  const panel = document.getElementById(btn.dataset.restrictId);
  if (!panel) return;
  const open = panel.classList.toggle('wv-restrict-open');
  btn.classList.toggle('wv-partial-lock-active', open);
});

// ── Orange padlock TO detail toggle ──────────────────────────────────────
document.getElementById('weekGrid')?.addEventListener('click', function(e) {
  const btn = e.target.closest('.wv-tos-btn');
  if (!btn) return;
  e.stopPropagation();
  const key = btn.dataset.toskey;
  wvTosOpen[key] = !wvTosOpen[key];
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
});

// ── Weekly Range Selection ────────────────────────────────────────
(function() {
  const MNAMES = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const svgCalSm = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>`;

  // wvSelBtn removed — range selection now triggered via wvCloseSelectRange()

  document.getElementById('weekGrid')?.addEventListener('click', function(e) {
    if (!wvSelPicking && !wvSelStart) return;
    const col = e.target.closest('.wv-col[data-dm]');
    if (!col) return;
    const dm = +col.dataset.dm, dd = +col.dataset.dd;

    if (!wvSelStart) {
      wvSelStart = { month: dm, day: dd };
      wvSelPicking = true;
      const btn = document.getElementById('wvSelBtn');
      if (btn) btn.innerHTML = svgCalSm + ' Pick end…';
    } else {
      wvSelEnd = { month: dm, day: dd };
      wvSelPicking = false;
      // Open Close Out modal pre-populated with range
      (function() {
        var s = wvSelStart, en = wvSelEnd;
        var startV = s.month * 100 + s.day, endV = en.month * 100 + en.day;
        var lo = startV <= endV ? s : en, hi = startV <= endV ? en : s;
        var pad = function(n){ return String(n).padStart(2,'0'); };
        var fromStr = '2026-' + pad(lo.month) + '-' + pad(lo.day);
        var toStr   = '2026-' + pad(hi.month) + '-' + pad(hi.day);
        if (typeof window._coOpenModal === 'function') window._coOpenModal(fromStr, toStr, 'wv');
      })();
    }
    buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && wvSelStart) clearWvSelection();
  });
})();

/* ─── WEEK VIEW CLOSE DROPDOWN ─── */
(function() {
  window.wvCloseDropdownToggle = function(e) {
    e.stopPropagation();
    var dd = document.getElementById('wvCloseDropdown');
    if (!dd) return;
    dd.style.display = dd.style.display !== 'none' ? 'none' : 'block';
  };

  window.wvCloseSelectRange = function() {
    document.getElementById('wvCloseDropdown').style.display = 'none';
    if (wvSelStart) { clearWvSelection(); return; }
    wvSelPicking = true;
    const right = document.querySelector('.wv-topbar-right');
    if (right) right.classList.add('range-mode');
    // Highlight the Close button to show picking state
    const closeBtn = document.getElementById('wvCloseOutBtn');
    if (closeBtn) { closeBtn.style.background = '#006461'; closeBtn.style.color = '#fff'; }
  };

  window.wvCloseCustom = function() {
    var dd = document.getElementById('wvCloseDropdown');
    if (dd) dd.style.display = 'none';
    if (typeof window._coOpenModal === 'function') window._coOpenModal('', '', 'wv');
  };

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    var wrap = document.getElementById('wvCloseWrap');
    var dd   = document.getElementById('wvCloseDropdown');
    if (dd && wrap && !wrap.contains(e.target)) dd.style.display = 'none';
  });
})();

// ── Weekly section collapse (roomType mode — headers still in grid) ───────
document.getElementById('weekGrid')?.addEventListener('click', function(e) {
  const el = e.target.closest('.wv-acc-hdr, .wv-collapse-btn');
  if (!el) return;
  if (wvGroupBy === 'combined') return; // handled by section panel
  e.stopPropagation();
  const section = el.dataset.section;
  if (section) {
    if (!wvCollapsed.hasOwnProperty(section)) wvCollapsed[section] = true;
    wvCollapsed[section] = !wvCollapsed[section];
  }
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
});

// ── Metrics selector ─────────────────────────────────────────────
function updateMetricCheckboxes() {
  document.querySelectorAll('.wv-ms-cb[data-key]').forEach(function(cb) {
    cb.classList.toggle('checked', !!wvMetricState[cb.dataset.key]);
  });
}

document.addEventListener('click', function(e) {
  const btn = e.target.closest('#wvMetricsBtn');
  if (btn) {
    const dd = document.getElementById('wvMetricsDropdown');
    const isOpen = dd.style.display !== 'none';
    dd.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) { renderPickupMetricItems(); updateMetricCheckboxes(); }
    e.stopPropagation(); return;
  }
  const cb = e.target.closest('.wv-ms-cb[data-key]');
  if (cb) {
    const key = cb.dataset.key;
    wvMetricState[key] = !wvMetricState[key];
    // Keep dm_pickup master in sync with individual window toggles
    if (key.startsWith('dm_pickup_')) {
      wvMetricState.dm_pickup = [0,1,2].some(function(i){ return !!wvMetricState['dm_pickup_'+i]; });
    }
    updateMetricCheckboxes();
    buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
    return;
  }
  if (e.target.id === 'wvMsClearCard') {
    ['capacity','adr','revenue','onlineOffline','roomTypes','avail','availAlloc','toRates'].forEach(function(k){ wvMetricState[k] = false; });
    updateMetricCheckboxes();
    buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart); return;
  }
  if (e.target.id === 'wvMsClearDetail') {
    ['dm_rnSold','dm_pickup','dm_pickup_0','dm_pickup_1','dm_pickup_2','dm_avgAdults','dm_avgChildren','dm_totalAdults','dm_totalChildren','dm_trevpar','dm_availRooms','dm_availGuar'].forEach(function(k){ wvMetricState[k] = false; });
    updateMetricCheckboxes();
    buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart); return;
  }
  if (!e.target.closest('#wvMetricsWrap')) {
    const dd = document.getElementById('wvMetricsDropdown');
    if (dd) dd.style.display = 'none';
  }
});

// "View Week" button handled inside popup click listener (see popup IIFE above)

/* ─── RE-OPEN SALES (week view per-day + monthly bulk) ─── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.wv-reopen-btn');
  if (btn) {
    const m = +btn.dataset.month, d = +btn.dataset.day;
    const key = `${m}-${d}`;
    if (confirm(`Re-open sales for ${['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m]} ${d}?`)) {
      LOCKED_DAYS.delete(key);
      buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
      renderCalendar();
    }
  }
});

// Monthly "Re-open Visible" button
document.querySelector('.btn-reopen')?.addEventListener('click', () => {
  if (LOCKED_DAYS.size) {
    if (confirm(`Re-open all ${LOCKED_DAYS.size} locked date(s)?`)) {
      LOCKED_DAYS.clear();
      renderCalendar();
    }
  } else {
    alert('No locked dates currently.');
  }
});
(function () {
  const overlay  = document.getElementById('closeOutOverlay');
  const modal    = document.getElementById('closeOutModal');
  const closeBtn = document.getElementById('closeOutClose');
  const cancelBtn = document.getElementById('closeOutCancel');
  if (!overlay || !modal) return;

  // ── Static data ────────────────────────────────────────────────
  const OPERATORS  = ['TUI Group','Thomas Cook','Sunwing','Club Med','Jet2 Holidays'];
  const ROOM_TYPES = ['Standard Double','Superior Double','Junior Suite','Suite','Deluxe Ocean View'];
  const BOARD_TYPES = ['All Inclusive','Full Board','Half Board','Bed & Breakfast','Room Only'];

  let drIdSeq   = 0;  // date-range id counter
  let ruleIdSeq = 0;  // rule id counter

  // ── Helpers ────────────────────────────────────────────────────
  function pad(n) { return String(n).padStart(2,'0'); }

  function buildChips(items, selectedSet, ruleId, field) {
    var allActive = selectedSet.has('all');
    var html = '<div class="co-chips-wrap">';
    var allCls = 'co-chip co-chip-all' + (allActive ? ' active' : '');
    html += '<span class="' + allCls + '" data-rid="' + ruleId + '" data-fld="' + field + '" data-val="__all__" onclick="coChipClick(this)">'
      + (allActive ? '&#10003; ' : '') + 'All</span>';
    items.forEach(function(item) {
      var active = !allActive && selectedSet.has(item);
      var cls = 'co-chip' + (active ? ' active' : '');
      var safe = item.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
      html += '<span class="' + cls + '" data-rid="' + ruleId + '" data-fld="' + field + '" data-val="' + safe + '" onclick="coChipClick(this)">'
        + (active ? '&#10003; ' : '') + item + '</span>';
    });
    html += '</div>';
    return html;
  }

  // ── Date Range rows ────────────────────────────────────────────
  var dateRanges = []; // [{id, from, to}]

  window.coAddDateRange = function(fromVal, toVal) {
    var id = ++drIdSeq;
    dateRanges.push({ id: id, from: fromVal || '', to: toVal || '' });
    renderDateRanges();
  };

  window.coRemoveDateRange = function(id) {
    dateRanges = dateRanges.filter(function(dr) { return dr.id !== id; });
    renderDateRanges();
  };

  window.coDRChange = function(id, field, val) {
    var dr = dateRanges.find(function(d) { return d.id === id; });
    if (dr) dr[field] = val;
  };

  function fmtDRDate(iso) {
    if (!iso) return '';
    var parts = iso.split('-');
    return parts[1] + '/' + parts[2] + '/' + parts[0];
  }

  // ── Close-out date range picker (shared panel) ─────────────
  var _coDRPickState = { drId: null, from: null, to: null, pickingTo: false, hover: null, viewYear: 2026, viewMonth: 2 };
  var _MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var _DOWS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  function _coDRFmt(d) { return (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear(); }
  function _coDRSame(a,b) { return a&&b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate(); }

  function _coDRBuildMonth(y,m) {
    var first = new Date(y,m,1).getDay(), days = new Date(y,m+1,0).getDate();
    var h = '<div><div style="display:grid;grid-template-columns:repeat(7,36px);gap:2px 0;margin-bottom:2px">';
    _DOWS.forEach(function(d){ h+='<div class="caldr-dow">'+d+'</div>'; });
    h += '</div><div style="display:grid;grid-template-columns:repeat(7,36px);gap:2px 0">';
    for(var i=0;i<first;i++) h+='<div class="caldr-day caldr-empty"></div>';
    for(var d=1;d<=days;d++){
      var ts=new Date(y,m,d).getTime();
      h+='<div class="caldr-day" data-ts="'+ts+'" onclick="coDRPickDay('+ts+')">'+d+'</div>';
    }
    h+='</div></div>'; return h;
  }

  function _coDRRefresh() {
    var s=_coDRPickState, grids=document.getElementById('coDRPickGrids');
    if(!grids) return;
    var rangeEnd=s.pickingTo?(s.hover||null):s.to;
    grids.querySelectorAll('.caldr-day[data-ts]').forEach(function(el){
      var dt=new Date(parseInt(el.dataset.ts));
      el.className='caldr-day';
      var today=new Date(2026,2,29);
      if(_coDRSame(dt,today)) el.classList.add('caldr-today');
      if(s.from&&_coDRSame(dt,s.from)) el.classList.add('caldr-start');
      if(rangeEnd&&_coDRSame(dt,rangeEnd)) el.classList.add('caldr-end');
      if(s.from&&rangeEnd&&!_coDRSame(s.from,rangeEnd)){
        var lo=s.from<rangeEnd?s.from:rangeEnd, hi=s.from<rangeEnd?rangeEnd:s.from;
        if(dt>=lo&&dt<=hi) el.classList.add('caldr-in-range');
      }
    });
    var banner=document.getElementById('coDRPickBanner');
    if(banner) banner.style.display=s.pickingTo?'':'none';
    var foot=document.getElementById('coDRPickFooter');
    if(foot){
      if(s.from&&(s.to||rangeEnd)) foot.textContent=_coDRFmt(s.from)+' \u2013 '+_coDRFmt(rangeEnd||s.to);
      else if(s.from) foot.textContent=_coDRFmt(s.from)+' \u2013 ... (click end date)';
      else foot.textContent='Select start date';
    }
  }

  function _coDRRender() {
    var s=_coDRPickState;
    var lbl1=document.getElementById('coDRLeftLbl'), lbl2=document.getElementById('coDRRightLbl');
    var grids=document.getElementById('coDRPickGrids');
    if(!grids) return;
    var m2m=s.viewMonth+1, m2y=s.viewYear;
    if(m2m>11){m2m=0;m2y++;}
    if(lbl1) lbl1.textContent=_MONTHS[s.viewMonth]+' '+s.viewYear;
    if(lbl2) lbl2.textContent=_MONTHS[m2m]+' '+m2y;
    grids.innerHTML=_coDRBuildMonth(s.viewYear,s.viewMonth)+_coDRBuildMonth(m2y,m2m);
    _coDRRefresh();
    grids.querySelectorAll('.caldr-day[data-ts]').forEach(function(el){
      el.addEventListener('mouseenter',function(){
        if(s.pickingTo){s.hover=new Date(parseInt(this.dataset.ts));_coDRRefresh();}
      });
    });
    grids.addEventListener('mouseleave',function(){if(s.pickingTo){s.hover=null;_coDRRefresh();}});
  }

  window.coDRPickDay = function(ts) {
    var s=_coDRPickState, dt=new Date(ts);
    if(!s.pickingTo){s.from=dt;s.to=null;s.hover=null;s.pickingTo=true;}
    else{
      if(_coDRSame(dt,s.from)){s.to=dt;}
      else if(dt<s.from){s.to=s.from;s.from=dt;}
      else{s.to=dt;}
      s.pickingTo=false;s.hover=null;
    }
    _coDRRefresh();
  };

  window.coDRPickNav = function(delta) {
    var s=_coDRPickState;
    s.viewMonth+=delta;
    while(s.viewMonth>11){s.viewMonth-=12;s.viewYear++;}
    while(s.viewMonth<0){s.viewMonth+=12;s.viewYear--;}
    _coDRRender();
  };

  window.coDRPickCancel = function() {
    document.getElementById('coDRPanel').style.display='none';
    _coDRPickState.pickingTo=false;_coDRPickState.hover=null;
  };

  window.coDRPickApply = function() {
    var s=_coDRPickState;
    if(!s.from||!s.to) return;
    document.getElementById('coDRPanel').style.display='none';
    s.pickingTo=false;
    var dr=dateRanges.find(function(d){return d.id===s.drId;});
    if(dr){
      var pad2=function(n){return n<10?'0'+n:''+n;};
      dr.from=s.from.getFullYear()+'-'+pad2(s.from.getMonth()+1)+'-'+pad2(s.from.getDate());
      dr.to=s.to.getFullYear()+'-'+pad2(s.to.getMonth()+1)+'-'+pad2(s.to.getDate());
    }
    renderDateRanges();
  };

  window.coDRPickPreset = function(key) {
    var s=_coDRPickState;
    var from=new Date(2026,2,29);from.setHours(0,0,0,0);
    var to=new Date(from);
    if(key==='today'){to=new Date(from);}
    else if(key==='7d'){to.setDate(to.getDate()+6);}
    else if(key==='14d'){to.setDate(to.getDate()+13);}
    else if(key==='1m'){to.setMonth(to.getMonth()+1);to.setDate(to.getDate()-1);}
    else if(key==='2m'){to.setMonth(to.getMonth()+2);to.setDate(to.getDate()-1);}
    else if(key==='3m'){to.setMonth(to.getMonth()+3);to.setDate(to.getDate()-1);}
    s.from=from;s.to=to;s.pickingTo=false;s.hover=null;
    _coDRRender();
  };

  function openCoDRPicker(drId, triggerEl) {
    var s=_coDRPickState;
    s.drId=drId;
    var dr=dateRanges.find(function(d){return d.id===drId;});
    if(dr&&dr.from){var p=dr.from.split('-');s.from=new Date(+p[0],+p[1]-1,+p[2]);s.viewYear=+p[0];s.viewMonth=+p[1]-1;}
    else{s.from=null;s.viewYear=2026;s.viewMonth=2;}
    if(dr&&dr.to){var p2=dr.to.split('-');s.to=new Date(+p2[0],+p2[1]-1,+p2[2]);}else{s.to=null;}
    s.pickingTo=false;s.hover=null;
    var panel=document.getElementById('coDRPanel');
    if(!panel) return;
    var rect=triggerEl.getBoundingClientRect();
    var panelW=Math.min(720,window.innerWidth*0.95);
    var left=rect.left;
    if(left+panelW>window.innerWidth-8) left=Math.max(8,window.innerWidth-panelW-8);
    var top=rect.bottom+6;
    if(top+400>window.innerHeight) top=Math.max(8,rect.top-410);
    panel.style.left=left+'px';
    panel.style.top=top+'px';
    panel.style.width=panelW+'px';
    panel.style.display='block';
    _coDRRender();
  }

  // Close picker on outside click
  document.addEventListener('click',function(e){
    var panel=document.getElementById('coDRPanel');
    if(!panel||panel.style.display==='none') return;
    if(panel.contains(e.target)) return;
    if(e.target.closest('.co2-dr-trigger')) return;
    panel.style.display='none';
    _coDRPickState.pickingTo=false;
  },true);

  function renderDateRanges() {
    var list = document.getElementById('coDateRangeList');
    if (!list) return;
    list.innerHTML = dateRanges.map(function(dr, idx) {
      var label = (fmtDRDate(dr.from) || 'Start') + ' - ' + (fmtDRDate(dr.to) || 'End');
      return '<div class="co2-dr-wrap">'
        + '<span class="co2-dr-label">Date Range ' + (idx + 1) + '</span>'
        + '<div class="co2-dr-trigger" data-drid="' + dr.id + '">'
        + '<span class="material-icons co2-dr-cal-ico">calendar_today</span>'
        + '<span class="co2-dr-text">' + label + '</span>'
        + (dateRanges.length > 1 ? '<button type="button" class="co2-dr-remove" data-drid="' + dr.id + '" onclick="event.stopPropagation();coRemoveDateRange(+this.dataset.drid)" title="Remove">&times;</button>' : '')
        + '</div></div>';
    }).join('');

    // Click trigger opens the date picker popup
    list.querySelectorAll('.co2-dr-trigger').forEach(function(trig) {
      trig.addEventListener('click', function(e) {
        if (e.target.closest('.co2-dr-remove')) return;
        var drId = parseInt(trig.dataset.drid);
        openCoDRPicker(drId, trig);
      });
    });
  }

  // ── Restriction Strategies ─────────────────────────────────────────
  var rules = [];

  window.coAddRule = function() {
    var id = ++ruleIdSeq;
    rules.push({ id: id, ops: new Set(['all']), rooms: new Set(['all']), boards: new Set(['all']) });
    renderRules();
  };

  window.coRemoveRule = function(id) {
    rules = rules.filter(function(r) { return r.id !== id; });
    renderRules();
  };

  // Chip click — uses data attributes, no quoting issues
  window.coChipClick = function(el) {
    var ruleId = parseInt(el.dataset.rid);
    var field  = el.dataset.fld;
    var value  = el.dataset.val === '__all__' ? 'all' : el.dataset.val;
    var rule = rules.find(function(r) { return r.id === ruleId; });
    if (!rule) return;
    var set = rule[field];
    if (value === 'all') {
      set.clear(); set.add('all');
    } else {
      set.delete('all');
      if (set.has(value)) set.delete(value);
      else set.add(value);
      if (set.size === 0) set.add('all');
    }
    renderRules();
  };

  function buildMSDropdown(items, selectedSet, ruleId, field) {
    var trigText = selectedSet.has('all') ? 'All'
      : selectedSet.size <= 2 ? Array.from(selectedSet).join(', ')
      : selectedSet.size + ' selected';
    var ddItems = items.map(function(item) {
      var isOn = selectedSet.has(item);
      return '<label class="co2-ms-item"><input type="checkbox" class="ds-checkbox" value="' + item + '"'
        + (isOn ? ' checked' : '')
        + ' data-rid="' + ruleId + '" data-fld="' + field + '"'
        + ' onchange="coMSChange(this)">' + item + '</label>';
    }).join('');
    return '<div class="co2-ms-wrap" data-rid="' + ruleId + '" data-fld="' + field + '">'
      + '<div class="co2-ms-trigger" onclick="coMSToggle(this)">'
      + '<span class="co2-ms-text">' + trigText + '</span>'
      + '<span class="material-icons co2-select-arrow">arrow_drop_down</span></div>'
      + '<div class="co2-ms-list">' + ddItems + '</div>'
      + '</div>';
  }

  function buildChipsForSet(selectedSet, ruleId, field) {
    if (selectedSet.has('all') || selectedSet.size === 0) return '';
    return '<div class="co2-ms-chips">' + Array.from(selectedSet).map(function(v) {
      return '<span class="co2-ms-chip">' + v
        + '<span class="co2-ms-chip-x" data-rid="' + ruleId + '" data-fld="' + field + '" data-val="' + v + '" onclick="coMSRemoveChip(this)">&times;</span>'
        + '</span>';
    }).join('') + '</div>';
  }

  function renderRules() {
    var list = document.getElementById('coRuleList');
    if (!list) return;
    list.innerHTML = rules.map(function(rule, idx) {
      return '<div class="co2-strategy-group">'
        + (rules.length > 1 ? '<button type="button" class="co2-strategy-remove" data-ruleid="' + rule.id + '" onclick="coRemoveRule(+this.dataset.ruleid)" title="Remove strategy">&times; Remove</button>' : '')
        + '<div class="co2-field-group"><label class="co2-field-label">Operators</label>'
        + buildMSDropdown(OPERATORS, rule.ops, rule.id, 'ops')
        + buildChipsForSet(rule.ops, rule.id, 'ops') + '</div>'
        + '<div class="co2-field-group"><label class="co2-field-label">Room Types</label>'
        + buildMSDropdown(ROOM_TYPES, rule.rooms, rule.id, 'rooms')
        + buildChipsForSet(rule.rooms, rule.id, 'rooms') + '</div>'
        + '<div class="co2-field-group"><label class="co2-field-label">Meal Plans</label>'
        + buildMSDropdown(BOARD_TYPES, rule.boards, rule.id, 'boards')
        + buildChipsForSet(rule.boards, rule.id, 'boards') + '</div>'
        + '</div>';
    }).join('');
  }

  window.coMSToggle = function(trigger) {
    var wrap = trigger.closest('.co2-ms-wrap');
    var list = wrap.querySelector('.co2-ms-list');
    var isOpen = list.classList.contains('open');
    // Close all others
    document.querySelectorAll('.co2-ms-list.open').forEach(function(l) { l.classList.remove('open'); });
    document.querySelectorAll('.co2-ms-trigger.open').forEach(function(t) { t.classList.remove('open'); });
    if (!isOpen) {
      list.classList.add('open');
      trigger.classList.add('open');
    }
  };

  window.coMSChange = function(cb) {
    var ruleId = parseInt(cb.dataset.rid);
    var field = cb.dataset.fld;
    var rule = rules.find(function(r) { return r.id === ruleId; });
    if (!rule) return;
    var val = cb.value;
    if (cb.checked) {
      rule[field].delete('all');
      rule[field].add(val);
    } else {
      rule[field].delete(val);
    }
    if (rule[field].size === 0) rule[field].add('all');
    renderRules();
  };

  window.coMSRemoveChip = function(el) {
    var ruleId = parseInt(el.dataset.rid);
    var field = el.dataset.fld;
    var val = el.dataset.val;
    var rule = rules.find(function(r) { return r.id === ruleId; });
    if (!rule) return;
    rule[field].delete(val);
    if (rule[field].size === 0) rule[field].add('all');
    renderRules();
  };

  // Close dropdowns on click outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.co2-ms-wrap')) {
      document.querySelectorAll('.co2-ms-list.open').forEach(function(l) { l.classList.remove('open'); });
      document.querySelectorAll('.co2-ms-trigger.open').forEach(function(t) { t.classList.remove('open'); });
    }
  });


  // ── Open modal ─────────────────────────────────────────────────
  function resetModalState() {
    const title = document.getElementById('closeOutTitle');
    if (title) title.textContent = 'Close or re-open sales';
    const confirmBtn = document.getElementById('coConfirmBtn');
    if (confirmBtn) { confirmBtn.textContent = 'Close Out'; confirmBtn.style.background = ''; confirmBtn.style.borderColor = ''; }
    document.querySelectorAll('.co2-type-card').forEach(function(c) { c.classList.remove('active'); });
    const firstCard = document.querySelector('.co2-type-card[data-type="full"]');
    if (firstCard) firstCard.classList.add('active');
    const losField = document.getElementById('coLosField');
    if (losField) losField.style.display = 'none';
    // Reset send action radio to email
    var emailRadio = document.querySelector('input[name="coSendAction"][value="email"]');
    if (emailRadio) emailRadio.checked = true;
  }

  function openModal(fromDate, toDate, ctx) {
    overlay.classList.add('open');
    resetModalState();

    // Reset date ranges
    drIdSeq = 0; dateRanges = [];
    var from = fromDate, to = toDate;
    if (!from || !to) {
      // Auto-fill from calendar or weekly selection
      const rs = (calSelStart && calSelEnd) ? calSelStart : (wvSelStart && wvSelEnd) ? wvSelStart : null;
      const re = (calSelStart && calSelEnd) ? calSelEnd   : (wvSelStart && wvSelEnd) ? wvSelEnd   : null;
      if (rs && re) {
        const sv = rs.month*100+rs.day, ev = re.month*100+re.day;
        const lo = sv<=ev?rs:re, hi = sv<=ev?re:rs;
        from = '2026-'+pad(lo.month)+'-'+pad(lo.day);
        to   = '2026-'+pad(hi.month)+'-'+pad(hi.day);
      }
    }
    coAddDateRange(from || '', to || '');

    // Pre-populate rules from active filter state
    ruleIdSeq = 0; rules = [];
    _coPrePopulateRule(ctx || 'wv');
  }

  function closeModal() { overlay.classList.remove('open'); }

  // ── Event wiring ───────────────────────────────────────────────
  document.addEventListener('click', e => {
    const _coTrigger = e.target.closest('.popup-btn-closeout, .wv-lock-btn');
    if (_coTrigger) {
      // Detect which view triggered the modal: cal = monthly calendar, wv = weekly/daily view
      var _coCtx = _coTrigger.classList.contains('popup-btn-closeout') ? 'cal' : 'wv';
      openModal(undefined, undefined, _coCtx);
    }
  });

  closeBtn && closeBtn.addEventListener('click', closeModal);
  cancelBtn && cancelBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  // ── Action selector (now radio buttons) ────────────────────────
  function getSelectedAction() {
    var checked = document.querySelector('input[name="coSendAction"]:checked');
    return checked ? checked.value : 'email';
  }

  // ── Restriction type card toggle ──────────────────────────────
  document.getElementById('coTypeGroup')?.addEventListener('click', e => {
    const btn = e.target.closest('.co2-type-card');
    if (!btn) return;
    document.querySelectorAll('.co2-type-card').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.dataset.type;
    const losField = document.getElementById('coLosField');
    if (losField) losField.style.display = type === 'los' ? '' : 'none';
    const isReopen = type === 'reopen';
    const title = document.getElementById('closeOutTitle');
    if (title) title.textContent = 'Close or re-open sales';
    const confirmBtn = document.getElementById('coConfirmBtn');
    if (confirmBtn) {
      confirmBtn.textContent = isReopen ? 'Re-Open' : 'Close Out';
      confirmBtn.style.background = '';
      confirmBtn.style.borderColor = '';
    }
  });

  // ── Confirm ────────────────────────────────────────────────────
  document.getElementById('coConfirmBtn').addEventListener('click', () => {
    const activeCard = document.querySelector('.co2-type-card.active');
    const isReopen   = activeCard && activeCard.dataset.type === 'reopen';
    const action     = getSelectedAction();
    const email      = document.getElementById('coEmail')?.value || '';
    const message    = document.getElementById('coMessage')?.value || '';

    // Parse ISO date string as local time (not UTC) to avoid off-by-one day in non-UTC zones
    function parseLocalDate(iso) {
      var p = iso.split('-');
      return new Date(+p[0], +p[1]-1, +p[2]);
    }

    // Apply calendar lock/unlock for each date range
    dateRanges.forEach(function(dr) {
      if (!dr.from || !dr.to) return;
      var cur = parseLocalDate(dr.from), end = parseLocalDate(dr.to);
      // Ensure correct order
      if (cur > end) { var tmp = cur; cur = end; end = tmp; }
      while (cur <= end) {
        const m = cur.getMonth()+1, d = cur.getDate();
        if (isReopen) LOCKED_DAYS.delete(m+'-'+d);
        else          LOCKED_DAYS.add(m+'-'+d);
        cur.setDate(cur.getDate()+1);
      }
    });

    // Simulate actions (prototype feedback)
    if (action === 'email' || action === 'both') {
      const rulesSummary = rules.map(function(r, i) {
        const ops = r.ops.has('all') ? 'All Operators' : Array.from(r.ops).join(', ');
        return 'Strategy ' + (i+1) + ': ' + ops;
      }).join(' | ');
      console.log('[Close Out] Email action — recipients:', rulesSummary, '| message:', message || '(none)');
    }
    if (action === 'internal' || action === 'both') {
      console.log('[Close Out] Internal note recorded — message:', message || '(none)');
    }

    // Clear selected days and exit monthly Select Dates mode after close-out
    _moSelectedDays.clear();
    _wbSelectedDays.clear();
    _wvSelectedDays.clear();
    if (typeof moExitSelectMode === 'function') moExitSelectMode();
    _syncCloseOutBtn();

    renderCalendar();
    buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
    closeModal();
  });

  // ── Shared: build a pre-populated rule from the active view's filter state ──
  function _coPrePopulateRule(ctx) {
    var _TO_MAP    = { sunwing: 'Sunwing', tui: 'TUI Group', 'thomas-cook': 'Thomas Cook', 'club-med': 'Club Med' };
    var _ROOM_MAP  = { standard: 'Standard Double', superior: 'Superior Double', deluxe: 'Deluxe Ocean View', suite: 'Suite' };
    var _BOARD_MAP = { ai: 'All Inclusive', bb: 'Bed & Breakfast', ro: 'Room Only', hb: 'Half Board', fb: 'Full Board' };
    var _opsSet = new Set(['all']), _roomsSet = new Set(['all']), _boardsSet = new Set(['all']);
    if (typeof filterState !== 'undefined') {
      // 'cal' = monthly calendar view, 'wv' = weekly/daily view
      var _isCal = (ctx === 'cal');
      var _filtTO    = _isCal ? filterState.cal.calFiltTO    : filterState.wv.wvFiltTO;
      var _filtRoom  = _isCal ? filterState.cal.calFiltRoom  : filterState.wv.wvFiltRoom;
      var _filtBoard = _isCal ? filterState.cal.calFiltBoard : filterState.wv.wvFiltBoard;
      // Handle comma-separated multi-select values
      function _mapMulti(raw, map) {
        if (!raw || raw === 'all') return new Set(['all']);
        var mapped = raw.split(',').map(function(v){ return map[v.trim()]; }).filter(Boolean);
        return mapped.length ? new Set(mapped) : new Set(['all']);
      }
      _opsSet   = _mapMulti(_filtTO,    _TO_MAP);
      _roomsSet = _mapMulti(_filtRoom,  _ROOM_MAP);
      _boardsSet = _mapMulti(_filtBoard, _BOARD_MAP);
    }
    rules.push({ id: ++ruleIdSeq, ops: _opsSet, rooms: _roomsSet, boards: _boardsSet });
    renderRules();
  }

  // Open modal with specific individual days (not a range)
  function openModalDays(daysArr, ctx) {
    overlay.classList.add('open');
    resetModalState();

    // Add each selected day as its own date range (from=to)
    drIdSeq = 0; dateRanges = [];
    daysArr.forEach(function(d) {
      coAddDateRange(d, d);
    });

    // Pre-populate rules from active filter state
    ruleIdSeq = 0; rules = [];
    _coPrePopulateRule(ctx || 'wv');
  }

  // Expose openModal globally so inline calls work
  window._coOpenModal = openModal;
  window._coOpenModalDays = openModalDays;
})();

/* ─── MONTHLY FILTER DROPDOWN — toggle open/close ─── */
(function() {
  const filtersBtn = document.getElementById('calFiltersBtn');
  const filtersDd  = document.getElementById('calFiltersDropdown');
  if (!filtersBtn || !filtersDd) return;

  filtersBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = filtersDd.style.display !== 'none';
    if (!isOpen) _closeAllDropdowns('calFiltersDropdown');
    filtersDd.style.display = isOpen ? 'none' : '';
    filtersBtn.classList.toggle('active', !isOpen);
  });

  document.addEventListener('click', function(e) {
    if (!document.getElementById('calFiltersWrap')?.contains(e.target)) {
      if (filtersDd) filtersDd.style.display = 'none';
      filtersBtn.classList.remove('active');
    }
  });
})();

/* ─── FILTER STATE (for list-form filters) ─── */
const filterState = {
  cal: { calFiltTO: 'all', calFiltRoom: 'all', calFiltBoard: 'all', calFiltMarket: 'all', calFiltPickup: 'all' },
  wv:  { wvFiltTO:  'all', wvFiltRoom:  'all', wvFiltBoard:  'all', wvFiltMarket:  'all', wvFiltPickup:  'all' },
};

/* Update pickup button/input active state to match current filterState */
function _syncPickupBtnUI(panel) {
  var val    = panel === 'cal' ? filterState.cal.calFiltPickup : filterState.wv.wvFiltPickup;
  var wrap   = document.getElementById(panel === 'cal' ? 'calPickupBtns'  : 'wvPickupBtns');
  var lbl    = document.getElementById(panel === 'cal' ? 'calPickupLabel' : 'wvPickupLabel');
  var hidden = document.getElementById(panel === 'cal' ? 'calFiltPickup'  : 'wvFiltPickup');
  var isAll  = (!val || val === 'all' || val === '365');
  if (hidden) hidden.value = isAll ? 'all' : String(val);
  if (lbl)    lbl.textContent = isAll ? 'All time' : (val == '1' ? '1 day' : val + ' days');
  if (wrap) {
    // All button
    wrap.querySelectorAll('.pickup-day-btn').forEach(function(b) {
      b.classList.toggle('active', isAll && b.dataset.val === 'all');
    });
    // Number inputs — activate whichever input currently shows this value
    var matched = false;
    wrap.querySelectorAll('.pickup-day-input').forEach(function(inp) {
      var matches = !isAll && String(inp.value) === String(val);
      inp.classList.toggle('active', matches);
      if (matches) matched = true;
    });
    // If a custom value (not matching any preset input), activate first input and set its value
    if (!isAll && !matched) {
      var inputs = wrap.querySelectorAll('.pickup-day-input');
      if (inputs.length) {
        inputs.forEach(function(i) { i.classList.remove('active'); });
        inputs[0].value = val;
        inputs[0].classList.add('active');
      }
    }
  }
}

/* Sync filters between cal↔wv so switching views preserves selections */
function syncFiltersCalToWv() {
  filterState.wv.wvFiltTO     = filterState.cal.calFiltTO;
  filterState.wv.wvFiltRoom   = filterState.cal.calFiltRoom;
  filterState.wv.wvFiltBoard  = filterState.cal.calFiltBoard;
  filterState.wv.wvFiltMarket = filterState.cal.calFiltMarket;
  filterState.wv.wvFiltPickup = filterState.cal.calFiltPickup;
}
function syncFiltersWvToCal() {
  filterState.cal.calFiltTO     = filterState.wv.wvFiltTO;
  filterState.cal.calFiltRoom   = filterState.wv.wvFiltRoom;
  filterState.cal.calFiltBoard  = filterState.wv.wvFiltBoard;
  filterState.cal.calFiltMarket = filterState.wv.wvFiltMarket;
  filterState.cal.calFiltPickup = filterState.wv.wvFiltPickup;
  calFiltTO = (filterState.cal.calFiltTO === 'all' || !filterState.cal.calFiltTO) ? 'all' : filterState.cal.calFiltTO.split(',')[0];
}

function getFilterVal(id) {
  const ctx = (id.startsWith('wv')) ? filterState.wv : filterState.cal;
  return ctx[id] || 'all';
}

function applyFilterUI(dropdownId) {
  const dd = document.getElementById(dropdownId);
  if (!dd) return;
  dd.querySelectorAll('.wv-fi-rb').forEach(function(rb) {
    const fid = rb.dataset.fid, val = rb.dataset.val;
    const ctx = (fid.startsWith('wv')) ? filterState.wv : filterState.cal;
    const cur = ctx[fid] || 'all';
    if (val === 'all') {
      rb.classList.toggle('checked', cur === 'all');
    } else {
      rb.classList.toggle('checked', cur !== 'all' && cur.split(',').indexOf(val) !== -1);
    }
  });
  // update filter count badge
  const countId = dropdownId === 'calFiltersDropdown' ? 'calFilterCount' : 'wvFilterCount';
  const badge = document.getElementById(countId);
  if (badge) {
    const ctx = dropdownId === 'calFiltersDropdown' ? filterState.cal : filterState.wv;
    const n = Object.keys(ctx).filter(function(k){ return ctx[k] !== 'all'; }).length;
    badge.textContent = n;
    badge.style.display = n > 0 ? '' : 'none';
  }
}

// Multiselect checkbox click handler — attached directly to each filter dropdown
// so it fires before any document-level outside-click close handler can see the event.
function _handleWvFiRbClick(e) {
  const rb = e.target.closest('.wv-fi-rb');
  if (!rb) return;
  e.stopPropagation(); // keep dropdown open
  const fid = rb.dataset.fid;
  const val = rb.dataset.val;
  if (!fid || !val) return;
  const ctx = (fid.startsWith('wv')) ? filterState.wv : filterState.cal;
  const dd = rb.closest('.cal-filters-dropdown');

  if (val === 'all') {
    ctx[fid] = 'all';
  } else {
    const current = ctx[fid] || 'all';
    const parts = current === 'all' ? [] : current.split(',');
    const idx = parts.indexOf(val);
    if (idx === -1) parts.push(val);
    else            parts.splice(idx, 1);
    ctx[fid] = parts.length > 0 ? parts.join(',') : 'all';
  }

  if (dd) {
    dd.querySelectorAll('.wv-fi-rb[data-fid="' + fid + '"]').forEach(function(item) {
      const v = item.dataset.val;
      const cur = ctx[fid] || 'all';
      if (v === 'all') {
        item.classList.toggle('checked', cur === 'all');
      } else {
        item.classList.toggle('checked', cur !== 'all' && cur.split(',').indexOf(v) !== -1);
      }
    });
    const countId = dd.id === 'calFiltersDropdown' ? 'calFilterCount' : 'wvFilterCount';
    const badge = document.getElementById(countId);
    if (badge) {
      const stateCtx = dd.id === 'calFiltersDropdown' ? filterState.cal : filterState.wv;
      const n = Object.keys(stateCtx).filter(function(k){ return stateCtx[k] !== 'all' && stateCtx[k] !== '365'; }).length;
      badge.textContent = n;
      badge.style.display = n > 0 ? '' : 'none';
    }
  }

  if (fid === 'calFiltTO') {
    const cur = ctx[fid];
    calFiltTO = (cur === 'all' || !cur) ? 'all' : cur.split(',')[0];
    renderCalendar();
  }
}
// Attach to each filter dropdown element so stopPropagation prevents outside-close handlers
['calFiltersDropdown', 'wvFiltersDropdown'].forEach(function(id) {
  var el = document.getElementById(id);
  if (el) el.addEventListener('click', _handleWvFiRbClick);
});

// Apply button — re-renders
document.getElementById('calFilterApply')?.addEventListener('click', function() {
  calFiltTO = filterState.cal.calFiltTO;
  const dd = document.getElementById('calFiltersDropdown');
  if (dd) dd.style.display = 'none';
  document.getElementById('calFiltersBtn')?.classList.remove('active');
  renderCalendar();
});
document.getElementById('wvFilterApply')?.addEventListener('click', function() {
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
  const dd = document.getElementById('wvFiltersDropdown');
  if (dd) dd.style.display = 'none';
  document.getElementById('wvFiltersBtn')?.classList.remove('active');
});

// Reset buttons
document.getElementById('calFilterReset')?.addEventListener('click', function() {
  Object.keys(filterState.cal).forEach(function(k){ filterState.cal[k] = 'all'; });
  calFiltTO = 'all';
  pickupBtnReset('cal');
  applyFilterUI('calFiltersDropdown');
  renderCalendar();
});
document.getElementById('wvFilterReset')?.addEventListener('click', function() {
  Object.keys(filterState.wv).forEach(function(k){ filterState.wv[k] = 'all'; });
  pickupBtnReset('wv');
  applyFilterUI('wvFiltersDropdown');
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
});

/* ─── WEEKLY METRIC TABS ─── */
document.getElementById('wvMetricTabs')?.addEventListener('click', function(e) {
  const btn = e.target.closest('.cal-metric-tab');
  if (!btn) return;
  document.querySelectorAll('#wvMetricTabs .cal-metric-tab').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  wvActiveTab = btn.dataset.metric || 'occupancy';
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
});

/* ─── COMP MODE PILLS (delegated) ─── */
document.addEventListener('click', function(e) {
  const pill = e.target.closest('.wv-comp-pill');
  if (!pill) return;
  e.stopPropagation();
  wvCompMode = pill.dataset.comp || 'sdly';
  buildWeekGrid(wvMonth, wvWeekStart, wvWeekStart);
});

/* ─── METRIC TABS ─── */
document.getElementById('calMetricTabs')?.addEventListener('click', e => {
  const btn = e.target.closest('.cal-metric-tab');
  if (!btn) return;
  document.querySelectorAll('.cal-metric-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  calMetric = btn.dataset.metric;
  renderCalendar();
});

// ── Monthly cell metrics selector ──────────────────────────
document.addEventListener('click', function(e) {
  if (e.target.closest('#calMetricsBtn')) {
    var btn = document.getElementById('calMetricsBtn');
    var rect = btn.getBoundingClientRect();

    // ── Daily R mode: show AG Grid column panel ──────────────
    if (wvGroupBy === 'report' && _dailyRevGridApi) {
      var drp = document.getElementById('dailyRevColPanel');
      if (drp) {
        var isOpen = drp.style.display !== 'none';
        drp.style.display = isOpen ? 'none' : 'block';
        if (!isOpen) {
          drp.style.top  = (rect.bottom + 4) + 'px';
          drp.style.left = rect.left + 'px';
        }
        e.stopPropagation(); return;
      }
    }

    // ── Normal calendar mode ──────────────────────────────────
    var dd  = document.getElementById('calMetricsDropdown');
    var wrap = document.getElementById('calMetricsWrap');
    var calCard = document.getElementById('demand-calendar');
    var isOpen = dd && dd.style.display !== 'none';
    if (isOpen) {
      dd.style.display = 'none';
      if (wrap) wrap.classList.remove('cal-metrics-open');
      if (calCard) calCard.classList.remove('cal-metrics-panel-open');
      e.stopPropagation(); return;
    }
    dd.style.display = 'flex';
    if (wrap) wrap.classList.add('cal-metrics-open');
    if (calCard) calCard.classList.add('cal-metrics-panel-open');
    if (window.cmSyncOnOpen) window.cmSyncOnOpen();
    e.stopPropagation(); return;
  }
  // Metric checkbox clicks are handled by inline onclick="cmToggleMetric()" — just stop propagation here
  if (e.target.closest('.cal-md-cb[data-cm-key]')) {
    e.stopPropagation(); return;
  }
  if (!e.target.closest('#calMetricsWrap') && !e.target.closest('#dailyRevColPanel')) {
    var dd2 = document.getElementById('calMetricsDropdown');
    var wrap2 = document.getElementById('calMetricsWrap');
    var calCard2 = document.getElementById('demand-calendar');
    if (dd2) dd2.style.display = 'none';
    if (wrap2) wrap2.classList.remove('cal-metrics-open');
    if (calCard2) calCard2.classList.remove('cal-metrics-panel-open');
    var drp2 = document.getElementById('dailyRevColPanel');
    if (drp2) drp2.style.display = 'none';
  }
});

// ── Daily R column group toggle ──────────────────────────────
var _drColVisibility = {
  daily: true, avail: true, segs: true, biz: true, meals: false, tc: true
};
var _drColFields = {
  daily: ['occ_t','occ_h','occ_stly','occ_ly','occ_fcst','adr_t','adr_h','adr_diff','adr_stly','adr_ly','adr_fcst','rev_t','rev_h','rev_stly','rev_ly','rev_fcst','rp_t','rp_h','rp_stly','rp_ly','pk_t','pk_h'],
  avail: ['td_rms','td_pct','os_rms','os_pct','rem_rms','rem_pct','on_on','on_off'],
  segs:  ['fit_rms','fit_pct','dyn_rms','dyn_pct','ser_rms','ser_pct'],
  biz:   ['biz_to','biz_dir','biz_ota','biz_oth'],
  meals: ['mp_ai_h','mp_ai_t','mp_ai_pct','mp_bb_h','mp_bb_t','mp_bb_pct','mp_hb_h','mp_hb_t','mp_hb_pct','mp_ro_h','mp_ro_t','mp_ro_pct'],
  tc:    ['tc_0','tc_1','tc_2','tc_3','tc_4','tc_base']
};
window.drColToggle = function(group, checkbox) {
  if (!_dailyRevGridApi) return;
  var visible = checkbox.checked;
  _drColVisibility[group] = visible;
  _dailyRevGridApi.setColumnsVisible(_drColFields[group], visible);
};


// ── Bulk select ──────────────────────────────────────────────
document.getElementById('calBulkBtn')?.addEventListener('click', function() {
  bulkSelectMode = !bulkSelectMode;
  this.classList.toggle('active', bulkSelectMode);
  if (!bulkSelectMode) { bulkSelected.clear(); }
  document.getElementById('bulkBanner').style.display = bulkSelectMode ? 'flex' : 'none';
  renderCalendar();
});
document.getElementById('bulkCancelBtn')?.addEventListener('click', function() {
  bulkSelectMode = false; bulkSelected.clear();
  document.getElementById('calBulkBtn')?.classList.remove('active');
  document.getElementById('bulkBanner').style.display = 'none';
  renderCalendar();
});
document.getElementById('bulkReopenBtn')?.addEventListener('click', function() {
  bulkSelected.forEach(function(key) { LOCKED_DAYS.delete(key); });
  bulkSelected.clear(); bulkSelectMode = false;
  document.getElementById('calBulkBtn')?.classList.remove('active');
  document.getElementById('bulkBanner').style.display = 'none';
  renderCalendar();
});

// ── Filter chips ─────────────────────────────────────────────
document.addEventListener('click', function(e) {
  var chip = e.target.closest('.fchip[data-fq-filter]');
  if (!chip) return;
  var filterId = chip.dataset.fqFilter;
  var val = chip.dataset.fqValue;
  var el = document.getElementById(filterId);
  if (el) { el.value = val; el.dispatchEvent(new Event('change')); }
  // Update active state
  document.querySelectorAll('.fchip[data-fq-filter="' + filterId + '"]').forEach(function(c) {
    c.classList.toggle('fchip-active', c.dataset.fqValue === val);
  });
  // Show/hide active filter tags
  updateActiveChipTags();
});

function updateActiveChipTags() {
  var wrap = document.getElementById('fchipsActiveWrap');
  if (!wrap) return;
  var defs = [
    { id: 'calFiltRoom',   label: 'Room' },
    { id: 'calFiltBoard',  label: 'Board' },
    { id: 'calFiltMarket', label: 'Source Geo' },
    { id: 'calFiltPickup', label: 'Pickup' },
  ];
  var html = defs.map(function(d) {
    var el = document.getElementById(d.id);
    if (!el || el.value === 'all') return '';
    var text = (el.options && el.options[el.selectedIndex]) ? el.options[el.selectedIndex].text : el.value;
    return '<span class="fchip fchip-tag">' + d.label + ': ' + text + '<button class="fchip-x" data-close-filter="' + d.id + '">×</button></span>';
  }).filter(Boolean).join('');
  wrap.innerHTML = html;
  var bar = document.getElementById('filterChipsBar');
  if (bar) bar.style.display = html ? '' : 'none';
}

document.addEventListener('click', function(e) {
  var xBtn = e.target.closest('.fchip-x[data-close-filter]');
  if (!xBtn) return;
  var id = xBtn.dataset.closeFilter;
  var el = document.getElementById(id);
  if (el) { el.value = 'all'; el.dispatchEvent(new Event('change')); }
  updateActiveChipTags();
});

// ── Pickup day inputs + All button ───────────────────────────
function _pickupSetFilter(panel, val) {
  var isAll = (val === 'all');
  var labelText = isAll ? 'All time' : (val == 1 ? '1 day' : val + ' days');
  var hiddenVal = isAll ? 'all' : String(val);
  var lbl    = document.getElementById(panel === 'cal' ? 'calPickupLabel' : 'wvPickupLabel');
  var hidden = document.getElementById(panel === 'cal' ? 'calFiltPickup'  : 'wvFiltPickup');
  if (lbl)    lbl.textContent = labelText;
  if (hidden) { hidden.value = hiddenVal; hidden.dispatchEvent(new Event('change')); }
}
window.pickupInputFocus = function(input, panel) {
  var wrap = input.closest('.pickup-btns-wrap');
  if (wrap) {
    wrap.querySelectorAll('.pickup-day-btn').forEach(function(b)  { b.classList.remove('active'); });
    wrap.querySelectorAll('.pickup-day-input').forEach(function(i) { i.classList.remove('active'); });
    input.classList.add('active');
  }
  var val = parseInt(input.value) || 1;
  _pickupSetFilter(panel, val);
};
window.pickupInputChange = function(input, panel) {
  var val = parseInt(input.value);
  if (!val || val < 1) return;
  if (val > 365) { input.value = 365; val = 365; }
  _pickupSetFilter(panel, val);
  if (typeof renderPickupMetricItems === 'function') renderPickupMetricItems();
};
window.pickupBtnClick = function(btn, panel) {
  var wrap = btn.closest('.pickup-btns-wrap');
  if (wrap) {
    wrap.querySelectorAll('.pickup-day-btn').forEach(function(b)  { b.classList.remove('active'); });
    wrap.querySelectorAll('.pickup-day-input').forEach(function(i) { i.classList.remove('active'); });
    btn.classList.add('active');
  }
  _pickupSetFilter(panel, 'all');
};
function pickupBtnReset(panel) {
  var wrap = document.getElementById(panel === 'cal' ? 'calPickupBtns' : 'wvPickupBtns');
  if (wrap) {
    wrap.querySelectorAll('.pickup-day-input').forEach(function(i) { i.classList.remove('active'); });
    wrap.querySelectorAll('.pickup-day-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.val === 'all');
    });
  }
  var lbl = document.getElementById(panel === 'cal' ? 'calPickupLabel' : 'wvPickupLabel');
  if (lbl) lbl.textContent = 'All time';
}

// ── Pickup metric items (dynamic labels based on input values) ───────────
var pickupDayValues = [1];
window.pickupDayValues = pickupDayValues; // expose globally for renderCalendar (which is at global scope)

// Build a 2-row grid: window numbers on top, values below
function _mkPickupGrid(getValFn) {
  var hdrs = '', vals = '', n = 0;
  pickupDayValues.forEach(function(dv, i) {
    if (!wvMetricState['dm_pickup_' + i]) return;
    n++;
    hdrs += '<div class="wv-pickup-hdr-cell">' + dv + '</div>';
    vals += '<div class="wv-pickup-val-cell">' + getValFn(dv, i) + '</div>';
  });
  if (!n) return '';
  return '<div class="wv-pickup-grid" style="grid-template-columns:repeat(' + n + ',1fr)">'
    + hdrs + vals + '</div>';
}
function getPickupInputValues() {
  var wrap = document.getElementById('wvPickupBtns') || document.getElementById('calPickupBtns');
  if (!wrap) return [1];
  var inp = wrap.querySelector('.pickup-day-input');
  var v = inp ? parseInt(inp.value) : 1;
  return [(v && v > 0) ? v : 1];
}
window.renderPickupMetricItems = function() {
  pickupDayValues = getPickupInputValues();
  window.pickupDayValues = pickupDayValues;
  var container = document.getElementById('wvPickupMetricItems');
  if (!container) return;
  var key = 'dm_pickup_0';
  if (!(key in wvMetricState)) wvMetricState[key] = true;
  var checked = wvMetricState[key] !== false;
  container.innerHTML = '<label class="wv-ms-item"><span class="wv-ms-cb' + (checked ? ' checked' : '') + '" data-key="' + key + '"></span><span class="wv-ms-label">Pickup</span></label>';
  wvMetricState.dm_pickup = !!wvMetricState['dm_pickup_0'];
};
setTimeout(function() { window.renderPickupMetricItems(); }, 600);
(function() {
  var MONTH_ABBR    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var drLeftYear    = 2026; // left panel year; right panel = drLeftYear+1

  /*
   * Three-phase click cycle:
   *   phase 0 — nothing selected (drSelStartIdx = null)
   *   phase 1 — start chosen, waiting for end (drSelEndIdx = null)
   *   phase 2 — full range selected
   * Clicking any month in phase 2 clears back to phase 0.
   */
  var drSelStartIdx = null; // null = no selection
  var drSelEndIdx   = null;
  var drHoverIdx    = null; // preview end while selecting
  var drPhase       = 0;

  /* End fallback: if no explicit end, auto = start + 11 (capped) */
  function getEndIdx(startIdx) {
    return Math.min(startIdx + 11, ALL_MONTHS.length - 1);
  }

  /* Active range bounds (includes hover preview while picking end) */
  function getRangeBounds() {
    if (drSelStartIdx === null) return null;
    var lo = drSelStartIdx;
    var hi = drSelStartIdx;
    if (drPhase === 2 && drSelEndIdx !== null) {
      lo = Math.min(drSelStartIdx, drSelEndIdx);
      hi = Math.max(drSelStartIdx, drSelEndIdx);
    } else if (drPhase === 1) {
      var hover = drHoverIdx !== null ? drHoverIdx : drSelStartIdx;
      lo = Math.min(drSelStartIdx, hover);
      hi = Math.max(drSelStartIdx, hover);
    }
    return { lo: lo, hi: hi };
  }

  /* Build the 4×3 month grid for a given year into containerId */
  function renderGrid(containerId, year) {
    var el = document.getElementById(containerId);
    if (!el) return;
    var bounds = getRangeBounds();

    el.innerHTML = MONTH_ABBR.map(function(name, mi) {
      var col = mi % 4;
      var idx = -1;
      for (var i = 0; i < ALL_MONTHS.length; i++) {
        if (ALL_MONTHS[i].year === year && ALL_MONTHS[i].month === (mi + 1)) { idx = i; break; }
      }
      var inData = idx >= 0;
      var lo = bounds ? bounds.lo : -1;
      var hi = bounds ? bounds.hi : -1;
      var inRange = inData && bounds && idx >= lo && idx <= hi;
      var isStart = inRange && idx === lo;
      var isEnd   = inRange && idx === hi;
      var isMid   = inRange && !isStart && !isEnd;
      var prevInRange = inData && bounds && idx > lo && (idx - 1) >= lo;
      var nextInRange = inData && bounds && idx < hi && (idx + 1) <= hi;
      var edgeLeft  = inRange && !prevInRange;
      var edgeRight = inRange && !nextInRange;

      var cls = 'caldr-cell col-' + col;
      if (!inData) cls += ' empty';
      else if (isStart && isEnd) cls += ' range-start range-end';
      else if (isStart) cls += ' range-start';
      else if (isEnd) cls += ' range-end';
      else if (isMid) cls += ' in-range';
      if (edgeLeft)  cls += ' edge-left';
      if (edgeRight) cls += ' edge-right';

      var handlers = '';
      if (inData) {
        handlers = ' onclick="calDRMonthClick(' + idx + ')"'
          + ' onmouseenter="calDRMonthHover(' + idx + ')"'
          + ' onmouseleave="calDRMonthHoverOut()"';
      }
      return '<div class="' + cls + '"' + handlers + '>'
           + '<span class="caldr-cell-bg"></span>'
           + '<span class="caldr-cell-lbl">' + name + '</span>'
           + '</div>';
    }).join('');
  }

  /* Render both panels + footer */
  function renderBothGrids() {
    var leftYearEl  = document.getElementById('calDRLeftYear');
    var rightYearEl = document.getElementById('calDRRightYear');
    if (leftYearEl)  leftYearEl.textContent  = drLeftYear;
    if (rightYearEl) rightYearEl.textContent = drLeftYear + 1;
    renderGrid('calDRLeftGrid',  drLeftYear);
    renderGrid('calDRRightGrid', drLeftYear + 1);
    var foot = document.getElementById('calDRFooterLabel');
    if (foot) {
      if (drPhase === 0 || drSelStartIdx === null) {
        foot.textContent = 'Select a start month';
      } else if (drPhase === 1) {
        var b = getRangeBounds();
        var startM = b ? ALL_MONTHS[b.lo] : null;
        var endM   = b ? ALL_MONTHS[b.hi] : null;
        if (startM && endM && b.lo !== b.hi) {
          foot.textContent = startM.name + ' \u2013 ' + endM.name;
        } else {
          foot.textContent = (startM ? startM.name : '') + ' \u2013 ?  (select end month)';
        }
      } else {
        var b2 = getRangeBounds();
        var startM = b2 ? ALL_MONTHS[b2.lo] : null;
        var endM   = b2 ? ALL_MONTHS[b2.hi] : null;
        foot.textContent = (startM ? startM.name : '') + ' \u2013 ' + (endM ? endM.name : '');
      }
    }
    /* Dim Apply when range not complete */
    var applyBtn = document.querySelector('#calDRPanel .drp-apply');
    if (applyBtn) {
      var ready = drPhase === 2;
      applyBtn.classList.toggle('is-disabled', !ready);
      applyBtn.disabled = !ready;
    }
  }

  window.calDRMonthHover = function(idx) {
    if (drPhase !== 1 || drHoverIdx === idx) return;
    drHoverIdx = idx;
    renderBothGrids();
  };
  window.calDRMonthHoverOut = function() {
    if (drPhase !== 1 || drHoverIdx === null) return;
    drHoverIdx = null;
    renderBothGrids();
  };

  /* ── Month click ── */
  window.calDRMonthClick = function(idx) {
    if (drPhase === 1) {
      /* Second click: set end; swap if needed so start ≤ end */
      drSelEndIdx = idx;
      if (drSelEndIdx < drSelStartIdx) {
        var tmp = drSelStartIdx; drSelStartIdx = drSelEndIdx; drSelEndIdx = tmp;
      }
      drHoverIdx = null;
      drPhase = 2;
    } else {
      /* Phase 0 or 2: any click starts a fresh selection */
      drSelStartIdx = idx;
      drSelEndIdx   = null;
      drHoverIdx    = null;
      drPhase       = 1;
    }
    renderBothGrids();
  };

  /* ── Navigate years (both panels move together) ── */
  window.calDRNav = function(delta) {
    drLeftYear += delta;
    renderBothGrids();
  };

  /* ── Open / close ── */
  window.calDRToggle = function() {
    var panel   = document.getElementById('calDRPanel');
    var trigger = document.getElementById('calDRTrigger');
    if (!panel) return;
    if (panel.style.display !== 'none') {
      panel.style.display = 'none';
      if (trigger) trigger.classList.remove('active');
      return;
    }
    /* Sync to current calendar state — open with a confirmed range showing */
    drSelStartIdx = calStartIdx;
    drSelEndIdx   = Math.min(calStartIdx + calDisplayView - 1, ALL_MONTHS.length - 1);
    drPhase       = 2;
    drHoverIdx    = null;
    drLeftYear    = ALL_MONTHS[calStartIdx] ? ALL_MONTHS[calStartIdx].year : 2026;
    panel.style.left = '';
    panel.style.top  = '';
    panel.style.display = 'block';
    if (trigger) trigger.classList.add('active');
    renderBothGrids();
  };

  window.calDRCancel = function() {
    var panel = document.getElementById('calDRPanel');
    var trigger = document.getElementById('calDRTrigger');
    if (panel) panel.style.display = 'none';
    if (trigger) trigger.classList.remove('active');
  };

  window.calDRApply = function() {
    if (drPhase !== 2 || drSelStartIdx === null || drSelEndIdx === null) return; // range not complete
    var panel = document.getElementById('calDRPanel');
    var trigger = document.getElementById('calDRTrigger');
    if (panel) panel.style.display = 'none';
    if (trigger) trigger.classList.remove('active');
    var startM = ALL_MONTHS[drSelStartIdx];
    var endM   = ALL_MONTHS[drSelEndIdx];
    var lbl = document.getElementById('calDRLabel');
    if (lbl) lbl.textContent = (startM ? startM.name : '') + ' \u2013 ' + (endM ? endM.name : '');
    calStartIdx = drSelStartIdx;
    /* Derive view length from selected range */
    var viewLen = drSelEndIdx - drSelStartIdx + 1;
    calView = viewLen; calDisplayView = viewLen;
    if (typeof calSetDisplayView === 'function') calSetDisplayView(viewLen);
    else renderCalendar();
    renderCalMonthlySummary();
  };

  /* ── Close on outside click ── */
  document.addEventListener('click', function(e) {
    var panel = document.getElementById('calDRPanel');
    var wrap  = document.getElementById('calDRWrap');
    var trigger = document.getElementById('calDRTrigger');
    if (!panel || panel.style.display === 'none') return;
    if (wrap && wrap.contains(e.target)) return;
    panel.style.display = 'none';
    if (trigger) trigger.classList.remove('active');
  }, true);

  /* ── Sync picker state to current nav position (called after arrow nav) ── */
  window.calDRSyncToNav = function() {
    drSelStartIdx = calStartIdx;
    drSelEndIdx   = Math.min(calStartIdx + calDisplayView - 1, ALL_MONTHS.length - 1);
    drPhase       = 2;
    drLeftYear    = ALL_MONTHS[calStartIdx] ? ALL_MONTHS[calStartIdx].year : 2026;
    var startM = ALL_MONTHS[drSelStartIdx];
    var endM   = ALL_MONTHS[drSelEndIdx];
    var lbl = document.getElementById('calDRLabel');
    if (lbl) lbl.textContent = (startM ? startM.name : '') + ' – ' + (endM ? endM.name : '');
  };

  /* ── Compatibility no-ops ── */
  window.applyOutOfRange     = function() {};
  window.applyCalDisplayRange = function() {};

  /* ── Init: 2 months from Jan 2026 on first load ── */
  setTimeout(function() {
    calStartIdx   = 0;
    drSelStartIdx = 0;
    drSelEndIdx   = Math.min(1, ALL_MONTHS.length - 1);
    drPhase       = 2;
    var lbl = document.getElementById('calDRLabel');
    if (lbl) lbl.textContent = ALL_MONTHS[0].name + ' \u2013 ' + ALL_MONTHS[Math.min(1, ALL_MONTHS.length-1)].name;
    if (typeof calSetDisplayView === 'function') calSetDisplayView(2);
    else { calView = 2; calDisplayView = 2; renderCalendar(); }
    renderCalMonthlySummary();
    calApplyDayCellHeights();
  }, 400);

})();


/* ═══ CALENDAR EVENT TOOLTIPS ═══ */
(function() {
  var tip = null;

  function getTip() {
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'cal-event-tooltip';
      tip.style.display = 'none';
      document.body.appendChild(tip);
    }
    return tip;
  }

  window.calShowEventTip = function(e, key) {
    var events = (typeof CAL_EVENTS !== 'undefined' && key) ? CAL_EVENTS[key] : null;
    var closures = (typeof PARTIAL_CLOSURES !== 'undefined' && key) ? PARTIAL_CLOSURES[key] : null;
    var hasEvents = events && events.length > 0;
    var hasClosures = closures && Array.isArray(closures) && closures.length > 0;

    // Hide rooms/capacity tooltip first
    window.calHideCapTip();

    var t = getTip();
    var calSvg = '<span class="material-icons" style="font-size:18px;color:#006461;vertical-align:middle;margin-right:2px">today</span>';
    var html = '';

    if (!hasEvents && !hasClosures) {
      // No events — show "No events" placeholder
      html = '<div style="color:#6b7280;font-size:12px;padding:2px 0;display:flex;align-items:center;gap:6px">'
           + calSvg + '<span>No events</span></div>';
    } else {
      if (hasEvents) {
        html += '<div class="cal-event-tooltip-title">' + calSvg + ' Events</div>'
          + events.map(function(ev) {
              return '<div style="margin-bottom:' + (events.length > 1 ? '6px' : '0') + '">'
                + '<div class="cal-event-tooltip-name">• ' + ev.name + '</div>'
                + '<div class="cal-event-tooltip-meta">| ' + ev.type + '<br>' + ev.date + '</div>'
                + '</div>';
            }).join('');
      }
      if (hasClosures) {
        if (hasEvents) html += '<div style="border-top:1px solid #e5e7eb;margin:8px 0 6px"></div>';
        html += '<div class="cal-event-tooltip-title"><span class="material-icons" style="font-size:18px;color:#fbbf24;vertical-align:middle;margin-right:2px">lock_open</span> Closures</div>'
          + closures.map(function(cl) {
              var parts = [];
              if (cl.tos && cl.tos.length) parts.push(cl.tos.join(', '));
              if (cl.roomTypes && cl.roomTypes.length) parts.push(cl.roomTypes.join(', '));
              if (cl.boards && cl.boards.length) parts.push(cl.boards.map(function(b){return b.toUpperCase();}).join(', '));
              return '<div style="margin-bottom:4px"><div class="cal-event-tooltip-name">• ' + (parts.join(' · ') || 'All') + '</div>'
                + '<div class="cal-event-tooltip-meta">| ' + (cl.appliedBy || '') + '</div></div>';
            }).join('');
      }
    }

    t.innerHTML = html;

    // Position below the icon — support all icon class types
    var _evEl = e.target.closest('.wv-event-cal-icon')
             || e.target.closest('.cell-event-icon')
             || e.target.closest('.cell-event-ico');
    if (!_evEl) return;
    var rect = _evEl.getBoundingClientRect();
    t.style.display = 'block';
    var tW = t.offsetWidth || 180;
    var tH = t.offsetHeight || 80;

    var left = rect.left;
    var top  = rect.bottom + 7;

    // Keep within viewport
    if (left + tW > window.innerWidth - 8) left = window.innerWidth - tW - 8;
    if (left < 8) left = 8;
    if (top + tH > window.innerHeight - 8) top = rect.top - tH - 7;

    t.style.left = left + 'px';
    t.style.top  = top  + 'px';
  };

  window.calHideEventTip = function() {
    var t = getTip();
    t.style.display = 'none';
  };

  // Also hide on scroll
  window.addEventListener('scroll', window.calHideEventTip, true);

window.calShowCapTip = function(e, hotel, hotelRooms, to, toRooms, avail, month, day) {
  // Hide events tooltip first
  window.calHideEventTip();

  var tip = document.getElementById('calCapTip');
  if (!tip) return;

  // Check if room type filter is active
  var _fCal = typeof filterState !== 'undefined' ? filterState.cal : {};
  var _rtFilt = _fCal.calFiltRoom || 'all';
  var _rtShares = {standard:0.34,superior:0.24,deluxe:0.18,suite:0.08,'jr. suite':0.10,family:0.06};
  var filteredCap = HOTEL_CAPACITY;
  var rtLabel = '';
  var isFiltered = _rtFilt !== 'all';

  if (isFiltered) {
    var _rtParts = _rtFilt.split(',');
    var _rtMult = _rtParts.reduce(function(a,b){ return a + (_rtShares[b.trim().toLowerCase()] || 0.15); }, 0);
    _rtMult = Math.min(1, _rtMult);
    filteredCap = Math.round(HOTEL_CAPACITY * _rtMult);
    rtLabel = _rtParts.map(function(s){ return s.trim().charAt(0).toUpperCase() + s.trim().slice(1); }).join(', ');
  }

  var filtHotelRooms = Math.round(filteredCap * hotel / 100);
  var filtToRooms = Math.round(filteredCap * to / 100);
  var filtAvail = Math.max(0, filteredCap - filtHotelRooms);

  var infoIco = '<span class="material-icons" style="font-size:20px;color:#00298C;flex-shrink:0">info</span>';
  var html = '';
  if (isFiltered) {
    html += '<div class="cal-cap-tip-filter">'
      + infoIco
      + '<span class="cal-cap-tip-filter-text">Filtered: ' + rtLabel + ' (' + filteredCap + ' rooms)</span>'
      + '</div>';
  }
  var availCls = 'cal-cap-tip-line cal-cap-tip-line--avail ' + (filtAvail < 10 ? 'cal-cap-tip-line--low' : 'cal-cap-tip-line--ok');
  html += '<div class="cal-cap-tip-line cal-cap-tip-line--hotel">Hotel: ' + hotel + '% (' + filtHotelRooms + ' rooms)</div>'
    + '<div class="cal-cap-tip-line">TO: ' + to + '% (' + filtToRooms + ' rooms)</div>'
    + '<div class="' + availCls + '">'
    + filtAvail + ' rooms available' + (isFiltered ? ' (' + rtLabel + ')' : '') + '</div>';

  tip.innerHTML = html;
  tip.style.display = 'block';
  var x = e.clientX + 14, y = e.clientY - 10;
  if (x + 240 > window.innerWidth) x = e.clientX - 250;
  if (y + 100 > window.innerHeight) y = e.clientY - 110;
  tip.style.left = x + 'px';
  tip.style.top  = y + 'px';
};
window.calHideCapTip = function() {
  var tip = document.getElementById('calCapTip');
  if (tip) tip.style.display = 'none';
};
})();


/* ═══ MONTHLY CALENDAR MULTI-SELECT FILTERS ═══ */
(function() {
  // Track selected values per filter group
  var calFilterState = { to: ['all'], rt: ['all'], mp: ['all'], origin: ['all'], pickup: 365 };

  // Labels for display
  var LABELS = {
    to:     { all: 'Operator', map: { sunwing:'Sunwing', tui:'TUI', 'thomas-cook':'Thomas Cook', 'club-med':'Club Med', jet2:'Jet2' } },
    rt:     { all: 'Room Type',     map: { standard:'Standard', superior:'Superior', deluxe:'Deluxe', suite:'Suite' } },
    mp:     { all: 'Meal Plan',     map: { ai:'All Incl.', hb:'Half Board', bb:'B&B', ro:'Room Only' } },
    origin: { all: 'Source Geo',        map: { UK:'UK', SP:'Spain', US:'US', MX:'Mexico' } },
  };

  function updateLabel(filt) {
    var state = calFilterState[filt];
    var lbl   = document.getElementById('calFilt' + filt.charAt(0).toUpperCase() + filt.slice(1) + 'Label');
    if (!lbl) return;
    if (!state || state.includes('all') || state.length === 0) {
      lbl.textContent = LABELS[filt].all;
    } else if (state.length === 1) {
      lbl.textContent = LABELS[filt].map[state[0]] || state[0];
    } else {
      lbl.textContent = state.length + ' selected';
    }
  }

  window.calMsChange = function(filt, cb) {
    var val = cb.value;
    var allCbs = document.querySelectorAll('.cal-ms[data-filt="' + filt + '"]');

    if (val === 'all') {
      // Check/uncheck all
      allCbs.forEach(function(c) { c.checked = cb.checked; });
      calFilterState[filt] = cb.checked ? ['all'] : [];
    } else {
      var allCb = document.querySelector('.cal-ms[data-filt="' + filt + '"][value="all"]');
      var selected = Array.from(allCbs)
        .filter(function(c) { return c.value !== 'all' && c.checked; })
        .map(function(c) { return c.value; });

      if (selected.length === 0) {
        // Nothing selected — revert to all
        if (allCb) allCb.checked = true;
        calFilterState[filt] = ['all'];
      } else {
        if (allCb) allCb.checked = false;
        calFilterState[filt] = selected;
      }
    }
    updateLabel(filt);
  };

  window.calPickupNumUpdate = function(val) {
    val = val ? parseInt(val) : null;
    calFilterState.pickup = val;
    var lbl = document.getElementById('calFiltPickupLabel');
    if (lbl) lbl.textContent = val ? 'Pickup: ' + val + 'd' : 'Pickup Window';
    var hidden = document.getElementById('calFiltPickup');
    if (hidden) hidden.value = val || '';
  };

  window.calApplyFilters = function() {
    // Sync calFiltTO from filterState for rendering
    if (typeof filterState !== 'undefined' && typeof calFiltTO !== 'undefined') {
      calFiltTO = filterState.cal.calFiltTO || 'all';
    }
    // Close consolidated dropdown
    var dd = document.getElementById('calFiltersDropdown');
    if (dd) dd.style.display = 'none';
    var btn = document.getElementById('calFiltBtn');
    if (btn) btn.classList.remove('active');
    renderCalendar();
  };

  window.calPickupSliderUpdate = function(val) {
    window.calPickupNumUpdate(val);
    var disp = document.getElementById('calFiltPickupVal');
    if (disp) disp.textContent = val ? val + 'd' : '365d';
  };

  window.calToggleFilters = function(btn) {
    var dd = document.getElementById('calFiltersDropdown');
    if (!dd) return;
    var open = dd.style.display !== 'none';
    dd.style.display = open ? 'none' : 'block';
    if (btn) btn.classList.toggle('active', !open);
  };

  window.calResetFilters = function() {
    // Reset unified filterState.cal
    if (typeof filterState !== 'undefined') {
      Object.keys(filterState.cal).forEach(function(k) {
        filterState.cal[k] = 'all';
      });
      if (typeof calFiltTO !== 'undefined') calFiltTO = 'all';
    }
    // Reset pickup buttons
    if (typeof pickupBtnReset === 'function') pickupBtnReset('cal');
    // Refresh checkbox UI
    if (typeof applyFilterUI === 'function') applyFilterUI('calFiltersDropdown');
    // Close dropdown
    var dd = document.getElementById('calFiltersDropdown');
    if (dd) dd.style.display = 'none';
    var btn = document.getElementById('calFiltBtn');
    if (btn) btn.classList.remove('active');
    renderCalendar();
  };

  // Also update calToggleMFilt to include pickup panel
  var _origToggle = window.calToggleMFilt;
  window.calToggleMFilt = function(panelId, btn) {
    var allPanels = ['calFiltTOPanel','calFiltRTPanel','calFiltMPPanel','calFiltOriginPanel','calFiltPickupPanel'];
    var allBtns   = ['calFiltTOBtn','calFiltRTBtn','calFiltMPBtn','calFiltOriginBtn','calFiltPickupBtn'];
    allPanels.forEach(function(pid, i) {
      var p = document.getElementById(pid);
      if (!p) return;
      if (pid === panelId) {
        var isOpen = p.style.display !== 'none';
        p.style.display = isOpen ? 'none' : 'block';
        var b = document.getElementById(allBtns[i]);
        if (b) b.classList.toggle('active', !isOpen);
      } else {
        p.style.display = 'none';
        var b2 = document.getElementById(allBtns[i]);
        if (b2) b2.classList.remove('active');
      }
    });
  };

  // Close consolidated filters dropdown on outside click
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#calFiltersWrap')) {
      var dd = document.getElementById('calFiltersDropdown');
      if (dd) dd.style.display = 'none';
      var btn = document.getElementById('calFiltBtn');
      if (btn) btn.classList.remove('active');
    }
  });
})();


/* ═══ CELL METRICS v2 — Segment mode + LY/STLY/Fcst for H & T ═══ */
(function() {

  // ── State ──────────────────────────────────────────────────────
  var cmMode      = 'individual'; // always individual (segments always shown)
  var cmSegs      = ['fit','dynamic','series']; // all selected by default
  var cmMetrics   = ['hocc','tocc','hrn','availRooms'];  // default: 4 metrics on monthly calendar
  var cmHotel     = true;         // include Hotel row

  var SEG_COLORS = { fit: '#0891b2', dynamic: '#7c3aed', series: '#f59e0b' };
  var SEG_LABELS = { fit: 'FIT', dynamic: 'Dyn', series: 'Ser' };
  var SEG_FULL   = { fit: 'Static FIT', dynamic: 'TO Dynamic', series: 'Tour Series' };

  var METRIC_DEFS = {
    occ:         { label:'Occ',       color:'#5883ed', fmt: function(v){ return v+'%'; },        maxVal:100   },
    adr:         { label:'ADR',       color:'#7c3aed', fmt: function(v){ return '$'+v; },         maxVal:400   },
    rev:         { label:'Rev',       color:'#ea580c', fmt: function(v){ return '$'+Math.round(v/1000)+'k'; }, maxVal:50000 },
    pickup:      { label:'Pkp',       color:'#16a34a', fmt: function(v){ return (v>=0?'+':'')+v; }, maxVal:30 },
    rn:          { label:'RN',        color:'#2e65e8', fmt: function(v){ return String(v); },     maxVal:210   },
    revpar:      { label:'RevPAR',    color:'#9333ea', fmt: function(v){ return '$'+v; },         maxVal:500   },
    ly:          { label:'LY',        color:'#93c5fd', fmt: function(v){ return v; },             maxVal:100   },
    stly:        { label:'STLY',      color:'#6ee7b7', fmt: function(v){ return v; },             maxVal:100   },
    fcst:        { label:'Fcst',      color:'#fbbf24', fmt: function(v){ return v; },             maxVal:100   },
    avgLos:      { label:'LOS',       color:'#0891b2', fmt: function(v){ return v.toFixed(1)+'n';}, maxVal:14 },
    avgLeadTime: { label:'Lead',      color:'#6366f1', fmt: function(v){ return v+'d'; },         maxVal:365   },
    avgAdults:   { label:'AdA',       color:'#2e65e8', fmt: function(v){ return v.toFixed(1); },  maxVal:4     },
    avgChildren: { label:'CHD',       color:'#d33030', fmt: function(v){ return v.toFixed(1); },  maxVal:2     },
    availRooms:  { label:'AvR',       color:'#16a34a', fmt: function(v){ return String(v); },     maxVal:210   },
    availGuar:   { label:'AvG',       color:'#ea580c', fmt: function(v){ return String(v); },     maxVal:30    },
    bizMixTO:    { label:'TO%',       color:'#006461', fmt: function(v){ return v+'%'; },         maxVal:100   },
    bizMixDirect:{ label:'Dir%',      color:'#0284c7', fmt: function(v){ return v+'%'; },         maxVal:100   },
    bizMixOTA:   { label:'OTA%',      color:'#D97706', fmt: function(v){ return v+'%'; },         maxVal:100   },
    rateTO:      { label:'TO-R',      color:'#0f766e', fmt: function(v){ return '$'+v; },         maxVal:500   },
    ratePromo:   { label:'Prmo%',     color:'#d97706', fmt: function(v){ return v+'%'; },         maxVal:50    },
    rateBase:    { label:'Base',      color:'#9333ea', fmt: function(v){ return '$'+v; },         maxVal:500   },
  };

  // ── Compute how many rows the current config produces ──────────
  function countRows() {
    // In new model each checked item = 1 row
    // In individual mode, each metric × each segment = rows
    if (cmMode === 'individual') {
      var segCount = cmSegs.length || 1;
      return Math.min(cmMetrics.length * segCount, 99);
    }
    return cmMetrics.length;
  }

  function countCheckedMetrics() {
    return document.querySelectorAll('#calMetricsDropdown .cal-md-cb[onclick*="cmToggleMetric"].checked').length;
  }

  function syncDisabled() {
    var checked = countCheckedMetrics();
    var atLimit = checked >= 4;
    document.querySelectorAll('#calMetricsDropdown .cal-md-cb[onclick*="cmToggleMetric"]').forEach(function(cb) {
      var isChecked = cb.classList.contains('checked');
      if (atLimit && !isChecked) {
        cb.classList.add('cm-disabled');
      } else {
        cb.classList.remove('cm-disabled');
      }
      var row = cb.closest('.cm-menu-row');
      if (row) row.style.opacity = (atLimit && !isChecked) ? '0.38' : '';
    });
  }

  function updateHint(isAdding) {
    var checked = countCheckedMetrics();
    var hint = document.getElementById('calCmHint');
    if (hint) {
      hint.textContent = checked + ' / 4 rows';
      hint.style.color = checked >= 4 ? '#D33030' : '#AEB4BA';
    }
    var applyBtn = document.getElementById('cmApplyBtn');
    if (applyBtn) { applyBtn.disabled = false; applyBtn.style.background = '#006461'; applyBtn.style.cursor = 'pointer'; applyBtn.style.opacity = '1'; }
    syncDisabled();
  }

  // ── Mode toggle ────────────────────────────────────────────────
  window.cmSetMode = function() {}; // toggle removed — mode is always individual

  // ── Segment toggle (min 1 must always stay selected) ───────────
  window.cmToggleSeg = function(key, cb) {
    var willUncheck = cb.classList.contains('checked');
    if (willUncheck && cmSegs.length <= 1) return; // block deselecting last one
    cb.classList.toggle('checked');
    var idx = cmSegs.indexOf(key);
    if (cb.classList.contains('checked')) {
      if (idx < 0) cmSegs.push(key);
    } else {
      if (idx >= 0) cmSegs.splice(idx, 1);
    }
    _syncSegAllCb();
    updateHint();
    renderCalendar();
  };

  // ── Toggle all segments (clicking All selects all; if all selected, no-op since min 1) ──
  window.cmToggleAllSegs = function(cb) {
    var allSelected = cmSegs.length === 3;
    if (allSelected) return; // already all selected — nothing to do
    cmSegs = ['fit','dynamic','series'];
    document.querySelectorAll('#cmSegSection .cal-md-cb[data-seg-key]').forEach(function(el) {
      el.classList.add('checked');
    });
    cb.classList.add('checked');
    updateHint();
    renderCalendar();
  };

  function _syncSegAllCb() {
    var allCb = document.getElementById('cmSegAllCb');
    if (allCb) allCb.classList.toggle('checked', cmSegs.length === 3);
  }

  // ── Metric toggle (updates pending state only — Apply to commit) ─
  // ── Tree menu expand/collapse (MELIA menu items) ─────────────────
  window.cmToggleMenuGroup = function(btn) {
    var children = btn.nextElementSibling;
    if (!children || !children.classList.contains('cm-menu-children')) return;
    var open = children.style.display === 'none';
    children.style.display = open ? 'block' : 'none';
    var chev = btn.querySelector('.cm-menu-chevron');
    if (chev) chev.style.transform = open ? 'rotate(90deg)' : '';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  window.cmToggleSection = function(sectionId, headerEl) {
    if (headerEl) cmToggleMenuGroup(headerEl);
  };

  window.cmSearchFilter = function(query) {
    var q = (query || '').trim().toLowerCase();
    var menu = document.getElementById('cmMetricsMenu');
    if (!menu) return;
    menu.querySelectorAll('.cm-menu-group').forEach(function(group) {
      var groupKey = (group.getAttribute('data-cm-search') || '').toLowerCase();
      var anyVisible = false;
      group.querySelectorAll('.cm-menu-row--leaf').forEach(function(row) {
        var key = (row.getAttribute('data-cm-search') || row.textContent || '').toLowerCase();
        var show = !q || key.indexOf(q) >= 0 || groupKey.indexOf(q) >= 0;
        row.classList.toggle('cm-search-hidden', !show);
        if (show) anyVisible = true;
      });
      group.classList.toggle('cm-search-hidden', q.length > 0 && !anyVisible && groupKey.indexOf(q) < 0);
      if (q && anyVisible) {
        group.querySelectorAll('.cm-menu-children').forEach(function(ch) { ch.style.display = 'block'; });
        group.querySelectorAll('.cm-menu-row--group .cm-menu-chevron').forEach(function(c) { c.style.transform = 'rotate(90deg)'; });
      }
    });
  };

  // Keys starting with 't' = Combined column; 'h' = Individual (Hotel) column.
  // Selecting from one group clears all selections from the other.
  // ── Metric toggle — Hotel (h) and T (t) columns can both be selected freely.
  // Only rule: max 4 total (enforced by updateHint / Apply button disable).
  window.cmToggleMetric = function(key, cb) {
    if (cb.classList.contains('checked')) {
      // Removing — don't show over-limit warning
      cb.classList.remove('checked');
      var idx = cmMetrics.indexOf(key);
      if (idx >= 0) cmMetrics.splice(idx, 1);
      updateHint(false);
    } else {
      if (countCheckedMetrics() >= 4) { cmModalSnackbarShow(); return; }
      cb.classList.add('checked');
      if (cmMetrics.indexOf(key) < 0) cmMetrics.push(key);
      updateHint(true);
    }
    // Don't call renderCalendar() here — wait for Apply
  };

  // ── Modal snackbar (bottom of dropdown) ───────────────────────
  var _cmSnackTimer = null;
  window.cmModalSnackbarShow = function() {
    var el = document.getElementById('cmModalSnackbar');
    if (!el) return;
    el.style.display = 'flex';
    clearTimeout(_cmSnackTimer);
    _cmSnackTimer = setTimeout(function() { el.style.display = 'none'; }, 3500);
  };
  window.cmModalSnackbarHide = function() {
    var el = document.getElementById('cmModalSnackbar');
    if (el) el.style.display = 'none';
    clearTimeout(_cmSnackTimer);
  };

  // ── Apply: commit metric selections and re-render ──────────────
  // ── Called on dropdown open: sync checked state + apply disabled ─
  window.cmSyncOnOpen = function() {
    document.querySelectorAll('#calMetricsDropdown .cal-md-cb[data-cm-key]').forEach(function(cb) {
      cb.classList.toggle('checked', cmMetrics.indexOf(cb.dataset.cmKey) >= 0);
    });
    var search = document.getElementById('cmSearchInput');
    if (search) { search.value = ''; cmSearchFilter(''); }
    updateHint();
  };

  window.cmApplyMetrics = function() {
    var dd = document.getElementById('calMetricsDropdown');
    var wrap = document.getElementById('calMetricsWrap');
    var calCard = document.getElementById('demand-calendar');
    if (dd) dd.style.display = 'none';
    if (wrap) wrap.classList.remove('cal-metrics-open');
    if (calCard) calCard.classList.remove('cal-metrics-panel-open');
    renderCalendar();
  };

  // ── Reset: uncheck all metrics ──────────────────────────────────
  window.cmResetMetrics = function() {
    cmMetrics = [];
    document.querySelectorAll('#calMetricsDropdown .cal-md-cb').forEach(function(cb) {
      cb.classList.remove('checked');
    });
    updateHint();
  };

  // ── Hotel toggle ───────────────────────────────────────────────
  var hotelToggle = document.getElementById('cmHotelToggle');
  if (hotelToggle) {
    hotelToggle.addEventListener('change', function() {
      cmHotel = this.checked;
      var track = document.getElementById('cmHotelTrack');
      var thumb = document.getElementById('cmHotelThumb');
      if (track) track.style.background = cmHotel ? '#006461' : '#d1d5db';
      if (thumb) thumb.style.left = cmHotel ? '16px' : '2px';
      updateHint();
      renderCalendar();
    });
  }

  window.cmUpdateHint = function() { updateHint(); };

  var cmMenu = document.getElementById('cmMetricsMenu');
  if (cmMenu) {
    cmMenu.addEventListener('click', function(e) {
      var row = e.target.closest('label.cm-menu-row--leaf');
      if (!row || e.target.closest('.cal-md-cb')) return;
      var cb = row.querySelector('.cal-md-cb[data-cm-key]');
      if (cb) cmToggleMetric(cb.dataset.cmKey, cb);
    });
  }


  // ── Build metric rows for a cell ──────────────────────────────
  // Exposed globally so renderCalendar can call it
  window.cmBuildRows = function(cellVals, useFull) {
    // New granular key map
    var KEY_MAP = {
      hocc:'hotelOcc', tocc:'toOcc', hadr:'hotelAdr', tadr:'toAdr',
      hrev:'hotelRev', trev:'toRev', hpickup:'hotelPickup', tpickup:'toPickup',
      hrn:'hotelRn', trn:'toRn', hrevpar:'hotelTrev', trevpar:'toTrev',
      havgAdults:'avgAdults', tavgAdults:'avgAdults',
      havgChildren:'avgChildren', tavgChildren:'avgChildren',
      havgLos:'avgLos', tavgLos:'avgLos',
      havgLeadTime:'avgLeadTime', tavgLeadTime:'avgLeadTime',
      htotalGuests:'totalGuests', ttotalGuests:'totalGuests',
      // Per-metric LY (maps to base metric, scaled)
      hlyOcc:'hotelOcc', tlyOcc:'toOcc',
      hlyAdr:'hotelAdr', tlyAdr:'toAdr',
      hlyRev:'hotelRev', tlyRev:'toRev',
      hlyRn:'hotelRn',   tlyRn:'toRn',
      hlyRevpar:'hotelTrev', tlyRevpar:'toTrev',
      hlyLos:'avgLos',   tlyLos:'avgLos',
      // STLY
      hstlyOcc:'hotelOcc', tstlyOcc:'toOcc',
      hstlyAdr:'hotelAdr', tstlyAdr:'toAdr',
      hstlyRev:'hotelRev', tstlyRev:'toRev',
      hstlyRn:'hotelRn',   tstlyRn:'toRn',
      hstlyRevpar:'hotelTrev', tstlyRevpar:'toTrev',
      hstlyLos:'avgLos',   tstlyLos:'avgLos',
      // Fcst
      hfcstOcc:'hotelOcc', tfcstOcc:'toOcc',
      hfcstAdr:'hotelAdr', tfcstAdr:'toAdr',
      hfcstRev:'hotelRev', tfcstRev:'toRev',
      hfcstRn:'hotelRn',   tfcstRn:'toRn',
      hfcstRevpar:'hotelTrev', tfcstRevpar:'toTrev',
      hfcstLos:'avgLos',   tfcstLos:'avgLos',
      // Old compat
      hly:'hotelOcc', tly:'toOcc', hstly:'hotelOcc', tstly:'toOcc',
      hfcst:'hotelOcc', tfcst:'toOcc',
    };
    var KEY_LABELS = {
      hocc:'H-Occ', tocc:'TO-Occ', hadr:'H-ADR', tadr:'TO-ADR',
      hrev:'H-Rev', trev:'TO-Rev', hpickup:'H-PU', tpickup:'TO-PU',
      hrn:'H-RN', trn:'TO-RN', hrevpar:'H-RevPAR', trevpar:'TO-RevPAR',
      havgAdults:'H-AD', tavgAdults:'TO-AD',
      havgChildren:'H-CHD', tavgChildren:'TO-CHD',
      havgLos:'H-LOS', tavgLos:'TO-LOS',
      havgLeadTime:'H-ALT', tavgLeadTime:'TO-ALT',
      htotalGuests:'H-PAX', ttotalGuests:'TO-PAX',
      // Per-metric LY colors (blue family)
      hlyOcc:'#93c5fd', tlyOcc:'#6ee7b7',
      hstlyOcc:'#bfdbfe', tstlyOcc:'#a7f3d0',
      hfcstOcc:'#fde68a', tfcstOcc:'#fef3c7',
      hlyAdr:'#c4b5fd', tlyAdr:'#a5b4fc',
      hstlyAdr:'#ddd6fe', tstlyAdr:'#c7d2fe',
      hfcstAdr:'#fde68a', tfcstAdr:'#fef08a',
      hlyRev:'#fdba74', tlyRev:'#fcd34d',
      hstlyRev:'#fed7aa', tstlyRev:'#fef3c7',
      hfcstRev:'#fcd34d', tfcstRev:'#fef9c3',
      hlyRn:'#93c5fd', tlyRn:'#7dd3fc',
      hstlyRn:'#bfdbfe', tstlyRn:'#bae6fd',
      hfcstRn:'#fbbf24', tfcstRn:'#fde68a',
      hlyRevpar:'#d8b4fe', tlyRevpar:'#c4b5fd',
      hstlyRevpar:'#ede9fe', tstlyRevpar:'#e0e7ff',
      hfcstRevpar:'#fef08a', tfcstRevpar:'#fefce8',
      hlyLos:'#a5f3fc', tlyLos:'#67e8f9',
      hstlyLos:'#cffafe', tstlyLos:'#e0f2fe',
      hfcstLos:'#fde68a', tfcstLos:'#fef9c3',
      // Per-metric LY/STLY/Fcst
      hlyOcc:'H-LY-Occ', tlyOcc:'TO-LY-Occ',
      hlyAdr:'H-LY-ADR', tlyAdr:'TO-LY-ADR',
      hlyRev:'H-LY-Rev', tlyRev:'TO-LY-Rev',
      hlyRn:'H-LY-RN', tlyRn:'TO-LY-RN',
      hlyRevpar:'H-LY-RevPAR', tlyRevpar:'TO-LY-RevPAR',
      hlyLos:'H-LY-LOS', tlyLos:'TO-LY-LOS',
      hstlyOcc:'H-STLY-Occ', tstlyOcc:'TO-STLY-Occ',
      hstlyAdr:'H-STLY-ADR', tstlyAdr:'TO-STLY-ADR',
      hstlyRev:'H-STLY-Rev', tstlyRev:'TO-STLY-Rev',
      hstlyRn:'H-STLY-RN', tstlyRn:'TO-STLY-RN',
      hstlyRevpar:'H-STLY-RevPAR', tstlyRevpar:'TO-STLY-RevPAR',
      hstlyLos:'H-STLY-LOS', tstlyLos:'TO-STLY-LOS',
      hfcstOcc:'H-Fcst-Occ', tfcstOcc:'TO-Fcst-Occ',
      hfcstAdr:'H-Fcst-ADR', tfcstAdr:'TO-Fcst-ADR',
      hfcstRev:'H-Fcst-Rev', tfcstRev:'TO-Fcst-Rev',
      hfcstRn:'H-Fcst-RN', tfcstRn:'TO-Fcst-RN',
      hfcstRevpar:'H-Fcst-RevPAR', tfcstRevpar:'TO-Fcst-RevPAR',
      hfcstLos:'H-Fcst-LOS', tfcstLos:'TO-Fcst-LOS',
      hly:'H-LY', tly:'TO-LY', hstly:'H-STLY', tstly:'TO-STLY', hfcst:'H-Fcst', tfcst:'TO-Fcst',
      availRooms:'ADR', availGuar:'T-AvG',
      bizMixTO:'TO%', bizMixDirect:'Dir%', bizMixOTA:'OTA%',
      rateTO:'TO-R', ratePromo:'Prmo%', rateBase:'Base',
    };
    // Full (unabbreviated) labels — used when cells have enough space (1-month view)
    var KEY_LABELS_FULL = {
      hocc:'H-Occupancy', tocc:'TO-Occupancy', hadr:'H-ADR', tadr:'TO-ADR',
      hrev:'H-Revenue', trev:'TO-Revenue', hpickup:'H-Pickup', tpickup:'TO-Pickup',
      hrn:'H-RN', trn:'TO-RN', hrevpar:'H-RevPAR', trevpar:'TO-RevPAR',
      havgAdults:'H-Average Adults', tavgAdults:'TO-Average Adults',
      havgChildren:'H-Average Children', tavgChildren:'TO-Average Children',
      havgLos:'H-LOS', tavgLos:'TO-LOS',
      havgLeadTime:'H-Avg Lead Time', tavgLeadTime:'TO-Avg Lead Time',
      htotalGuests:'H-Total Guests', ttotalGuests:'TO-Total Guests',
      hlyOcc:'H-LY-Occupancy', tlyOcc:'TO-LY-Occupancy',
      hlyAdr:'H-LY-ADR', tlyAdr:'TO-LY-ADR',
      hlyRev:'H-LY-Revenue', tlyRev:'TO-LY-Revenue',
      hlyRn:'H-LY-RN', tlyRn:'TO-LY-RN',
      hlyRevpar:'H-LY-RevPAR', tlyRevpar:'TO-LY-RevPAR',
      hlyLos:'H-LY-LOS', tlyLos:'TO-LY-LOS',
      hstlyOcc:'H-STLY-Occupancy', tstlyOcc:'TO-STLY-Occupancy',
      hstlyAdr:'H-STLY-ADR', tstlyAdr:'TO-STLY-ADR',
      hstlyRev:'H-STLY-Revenue', tstlyRev:'TO-STLY-Revenue',
      hstlyRn:'H-STLY-RN', tstlyRn:'TO-STLY-RN',
      hstlyRevpar:'H-STLY-RevPAR', tstlyRevpar:'TO-STLY-RevPAR',
      hstlyLos:'H-STLY-LOS', tstlyLos:'TO-STLY-LOS',
      hfcstOcc:'H-Fcst-Occupancy', tfcstOcc:'TO-Fcst-Occupancy',
      hfcstAdr:'H-Fcst-ADR', tfcstAdr:'TO-Fcst-ADR',
      hfcstRev:'H-Fcst-Revenue', tfcstRev:'TO-Fcst-Revenue',
      hfcstRn:'H-Fcst-RN', tfcstRn:'TO-Fcst-RN',
      hfcstRevpar:'H-Fcst-RevPAR', tfcstRevpar:'TO-Fcst-RevPAR',
      hfcstLos:'H-Fcst-LOS', tfcstLos:'TO-Fcst-LOS',
      hly:'H-LY', tly:'TO-LY', hstly:'H-STLY', tstly:'TO-STLY', hfcst:'H-Fcst', tfcst:'TO-Fcst',
      availRooms:'Available Rooms', availGuar:'Avail. Guar',
      bizMixTO:'TO Mix', bizMixDirect:'Direct Mix', bizMixOTA:'OTA Mix',
      rateTO:'TO Rate', ratePromo:'Promo %', rateBase:'Base Rate',
    };
    var KEY_COLORS = {
      hocc:'#5883ed', tocc:'#006461', hadr:'#7c3aed', tadr:'#4f46e5',
      hrev:'#ea580c', trev:'#b45309', hpickup:'#16a34a', tpickup:'#0d9488',
      hrn:'#2e65e8',  trn:'#0284c7',  hrevpar:'#9333ea', trevpar:'#7c3aed',
      havgAdults:'#2e65e8', tavgAdults:'#60a5fa',
      havgChildren:'#d33030', tavgChildren:'#f87171',
      havgLos:'#0891b2', tavgLos:'#22d3ee',
      havgLeadTime:'#6366f1', tavgLeadTime:'#a5b4fc',
      htotalGuests:'#0369a1', ttotalGuests:'#0ea5e9',
      hly:'#93c5fd', tly:'#6ee7b7', hstly:'#bfdbfe', tstly:'#a7f3d0',
      hfcst:'#fbbf24', tfcst:'#fde68a',
      availRooms:'#16a34a', availGuar:'#ea580c',
      bizMixTO:'#006461', bizMixDirect:'#0284c7', bizMixOTA:'#D97706',
      rateTO:'#0f766e', ratePromo:'#d97706', rateBase:'#9333ea',
    };
    var COMP_MULTS = {
      hly:.88, tly:.88, hstly:.83, tstly:.83, hfcst:1.04, tfcst:1.04,
      hlyOcc:.88, tlyOcc:.88, hstlyOcc:.83, tstlyOcc:.83, hfcstOcc:1.04, tfcstOcc:1.04,
      hlyAdr:.91, tlyAdr:.91, hstlyAdr:.87, tstlyAdr:.87, hfcstAdr:1.03, tfcstAdr:1.03,
      hlyRev:.89, tlyRev:.89, hstlyRev:.85, tstlyRev:.85, hfcstRev:1.05, tfcstRev:1.05,
      hlyRn:.88, tlyRn:.88, hstlyRn:.83, tstlyRn:.83, hfcstRn:1.04, tfcstRn:1.04,
      hlyRevpar:.90, tlyRevpar:.90, hstlyRevpar:.86, tstlyRevpar:.86, hfcstRevpar:1.04, tfcstRevpar:1.04,
      hlyLos:.95, tlyLos:.95, hstlyLos:.92, tstlyLos:.92, hfcstLos:1.02, tfcstLos:1.02,
    };
    var COMP_KEYS = [
      'hly','tly','hstly','tstly','hfcst','tfcst',
      'hlyOcc','tlyOcc','hstlyOcc','tstlyOcc','hfcstOcc','tfcstOcc',
      'hlyAdr','tlyAdr','hstlyAdr','tstlyAdr','hfcstAdr','tfcstAdr',
      'hlyRev','tlyRev','hstlyRev','tstlyRev','hfcstRev','tfcstRev',
      'hlyRn','tlyRn','hstlyRn','tstlyRn','hfcstRn','tfcstRn',
      'hlyRevpar','tlyRevpar','hstlyRevpar','tstlyRevpar','hfcstRevpar','tfcstRevpar',
      'hlyLos','tlyLos','hstlyLos','tstlyLos','hfcstLos','tfcstLos',
    ];
    var SRC_KEYS  = ['hocc','tocc','hadr','tadr','hrev','trev','hpickup','tpickup',
                     'hrn','trn','hrevpar','trevpar','havgAdults','tavgAdults',
                     'havgChildren','tavgChildren','havgLos','tavgLos','havgLeadTime','tavgLeadTime',
                     'htotalGuests','ttotalGuests'];
    var SINGLE_KEYS = ['availRooms','availGuar','bizMixTO','bizMixDirect','bizMixOTA',
                       'rateTO','ratePromo','rateBase'];

    // Pick full or abbreviated labels based on available cell space
    var labels = useFull ? KEY_LABELS_FULL : KEY_LABELS;

    var rows = [];

    cmMetrics.forEach(function(key) {
      if (rows.length >= 4) return;

      // Pickup keys: render single value row
      if (key === 'hpickup' || key === 'tpickup') {
        var isH = key === 'hpickup';
        var pfx = isH ? 'hotelPickup' : 'toPickup';
        var clr = isH ? '#16a34a' : '#0d9488';
        var dv = pickupDayValues[0] || 1;
        var pv = cellVals[pfx + '_0'];
        if (pv === undefined) {
          var sc = dv<=1?0.3:dv<=3?0.6:dv<=7?1:Math.min(2,dv/7);
          pv = Math.max(0, Math.round((cellVals[pfx]||0) * sc));
        }
        var puLbl = (isH ? 'H-' : 'TO-') + (useFull ? 'Pickup' : 'PU');
        rows.push({ label: puLbl, color: clr, value: '+' + pv, raw: pv });
        return;
      }

      // Segment-filtered metric: one row, value scaled by selected segments
      if (cmMode === 'individual' && SRC_KEYS.indexOf(key) >= 0 && COMP_KEYS.indexOf(key) < 0) {
        var baseVal = cellVals[KEY_MAP[key]] || 0;
        var segMults = { fit:0.62, dynamic:0.53, series:0.31 };
        var totalMult = 0.62 + 0.53 + 0.31;
        var selMult = 0;
        cmSegs.forEach(function(s){ selMult += (segMults[s] || 0); });
        var scale = totalMult > 0 ? selMult / totalMult : 1;
        var v = Math.round(baseVal * scale);
        var metricLbl = labels[key] ? labels[key].replace(/^[HT]-/,'') : key;
        var clr = KEY_COLORS[key] || '#006461';
        rows.push({ label: metricLbl, color: clr, value: String(v), raw: v });
        return;
      }

      // Comparison keys (LY/STLY/Fcst per source)
      if (COMP_KEYS.indexOf(key) >= 0) {
        var isH   = key.charAt(0) === 'h';
        var mult  = COMP_MULTS[key] || 1;
        var lbl   = labels[key] || KEY_LABELS[key] || key;
        var clr   = KEY_COLORS[key] || (isH ? '#93c5fd' : '#6ee7b7');
        // Determine base value from the metric suffix
        var baseVal = 0;
        var fmtFn = function(v){ return v+'%'; };
        if (key.indexOf('Occ') >= 0 || key === 'hly' || key === 'tly' || key === 'hstly' || key === 'tstly' || key === 'hfcst' || key === 'tfcst') {
          baseVal = cellVals[isH ? 'hotelOcc' : 'toOcc'] || 0;
          fmtFn = function(v){ return v+'%'; };
        } else if (key.indexOf('Adr') >= 0) {
          baseVal = cellVals[isH ? 'hotelAdr' : 'toAdr'] || 0;
          fmtFn = function(v){ return '$'+v; };
        } else if (key.indexOf('Rev') >= 0 && key.indexOf('Revpar') < 0) {
          baseVal = cellVals[isH ? 'hotelRev' : 'toRev'] || 0;
          fmtFn = function(v){ return '$'+Math.round(v/1000)+'k'; };
        } else if (key.indexOf('Rn') >= 0) {
          baseVal = cellVals[isH ? 'hotelRn' : 'toRn'] || 0;
          fmtFn = function(v){ return String(v); };
        } else if (key.indexOf('Revpar') >= 0) {
          baseVal = cellVals[isH ? 'hotelTrev' : 'toTrev'] || 0;
          fmtFn = function(v){ return '$'+v; };
        } else if (key.indexOf('Los') >= 0) {
          baseVal = cellVals['avgLos'] || 0;
          fmtFn = function(v){ return v.toFixed ? v.toFixed(1)+'n' : v+'n'; };
        }
        var v = typeof baseVal === 'number' ? Math.round(baseVal * mult * 10) / 10 : baseVal;
        rows.push({ label: lbl, color: clr, value: fmtFn(v), raw: v });
        return;
      }

      // Granular H/T keys — explicit format by key suffix
      if (SRC_KEYS.indexOf(key) >= 0) {
        var rawKey = KEY_MAP[key];
        var v = cellVals[rawKey] || 0;
        var lbl = labels[key] || KEY_LABELS[key] || key;
        var clr = KEY_COLORS[key] || '#6b7280';
        var formatted;
        var k = key.toLowerCase();
        if (k.indexOf('revpar') >= 0 || k.indexOf('adr') >= 0) {
          // Dollar per-room metric: $NNN
          formatted = '$' + Math.round(v);
        } else if (k.indexOf('rev') >= 0) {
          // Total revenue: $NNk
          formatted = '$' + Math.round(v / 1000) + 'k';
        } else if (k.indexOf('occ') >= 0) {
          formatted = Math.round(v) + '%';
        } else if (k.indexOf('pickup') >= 0) {
          formatted = (v >= 0 ? '+' : '') + Math.round(v);
        } else if (k.indexOf('rn') >= 0) {
          formatted = Math.round(v) + ' RN';
        } else if (k.indexOf('avglos') >= 0 || k.indexOf('los') >= 0) {
          formatted = (parseFloat(v)||0).toFixed(1) + (useFull ? ' nights' : 'n');
        } else if (k.indexOf('lead') >= 0) {
          formatted = Math.round(v) + (useFull ? ' days' : 'd');
        } else if (k.indexOf('adults') >= 0 || k.indexOf('children') >= 0 || k.indexOf('guests') >= 0) {
          formatted = String(Math.round(v));
        } else {
          formatted = String(Math.round(v));
        }
        rows.push({ label: lbl, color: clr, value: formatted, raw: v });
        return;
      }

      // Single/shared keys (Business Mix, Selling Rates, Avail)
      if (SINGLE_KEYS.indexOf(key) >= 0) {
        var v = cellVals[key] || 0;
        var lbl2 = labels[key] || KEY_LABELS[key] || key;
        var clr2 = KEY_COLORS[key] || '#6b7280';
        var fmt2;
        if (key === 'availRooms' || key === 'availGuar') fmt2 = Math.round(v) + ' RN';
        else if (key.indexOf('Mix') >= 0) fmt2 = Math.round(v) + '%';
        else if (key.indexOf('rate') >= 0 || key.indexOf('Rate') >= 0 || key === 'rateTO' || key === 'rateBase') fmt2 = '$' + Math.round(v);
        else if (key === 'ratePromo') fmt2 = Math.round(v) + '%';
        else fmt2 = String(Math.round(v));
        rows.push({ label: lbl2, color: clr2, value: fmt2, raw: v });
      }
    });

    return rows.slice(0, 4);
  };
  function adjustColor(hex) {
    // Slightly darken/saturate for T vs Hotel
    return hex;
  }

  // Init: pre-check default metrics in the UI and update hint
  setTimeout(function() {
    cmMetrics.forEach(function(key) {
      var cb = document.querySelector('#calMetricsDropdown .cal-md-cb[data-cm-key="' + key + '"]');
      if (cb) cb.classList.add('checked');
    });
    updateHint();
  }, 300);

})();


/* ═══ HEATMAP CONFIGURATOR ═══════════════════════════════════════ */
(function() {

  // ── State ──────────────────────────────────────────────────────
  var hmState = {
    type: '',        // active heatmap type key
    grey:  { threshold: 85, params: {} },
    green: { threshold: 60, params: {} },
    blue:  { params: {} },
    enabled: false,
    condition: { enabled: false, metric: 'hotel', op: '>', value: 50 },
    stopSalesRoomTypes: [],  // [] = all room types, or array of selected room type names
    colors: {}  // custom color overrides, e.g. { grey: '#D32F2F', blue: '#FFB90F', green: '#388C3F' }
  };

  // ── Type definitions ───────────────────────────────────────────
  // Each type defines what grey/green/blue mean and what inputs to show
  var HM_TYPES = {
    stopsales: {
      label: 'Stop Sales',
      icon: '🔒',
      svgPath: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z',
      grey:  { desc: 'Full close out day',              input: null },
      green: { desc: 'No stop sale',                    input: null },
      blue:  { desc: 'At least 1 partial close out',    input: null }
    },
    hotelocc: {
      label: 'Hotel Occupancy',
      icon: '🏨',
      svgPath: 'M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z',
      grey:  { desc: 'Occupancy above (%)',  input: { param: 'greyT',  def: 85, unit: '%' } },
      green: { desc: 'Occupancy below (%)',  input: { param: 'greenT', def: 60, unit: '%' } },
      blue:  { desc: 'Between Grey & Green thresholds', input: null }
    },
    remaining: {
      label: 'Remaining Rooms',
      icon: '🛏',
      svgPath: 'M19 7h-8v7H3V5H1v15h2v-3h18v3h2V11c0-2.21-1.79-4-4-4z',
      grey:  { desc: 'Remaining rooms less than',  input: { param: 'greyT',  def: 10, unit: 'RN', allowUnitToggle: true } },
      green: { desc: 'Remaining rooms more than',  input: { param: 'greenT', def: 50, unit: 'RN', allowUnitToggle: true } },
      blue:  { desc: 'Between Grey & Green thresholds', input: null }
    },
    mealplan: {
      label: 'Meal Plan Guests',
      icon: '🍽',
      svgPath: 'M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z',
      grey:  { desc: 'Total guests above', input: { param: 'greyT',  def: 200, unit: 'guests' } },
      green: { desc: 'Total guests below', input: { param: 'greenT', def: 100, unit: 'guests' } },
      blue:  { desc: 'Between Grey & Green thresholds', input: null }
    },
    toforecast: {
      label: 'TO Forecast',
      icon: '📊',
      svgPath: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z',
      grey:  { desc: 'OTB exceeds the forecast by', input: { param: 'greyT',  def: 20, unit: 'RN', allowUnitToggle: true } },
      green: { desc: 'OTB is below the forecast by', input: { param: 'greenT', def: 20, unit: 'RN', allowUnitToggle: true } },
      blue:  { desc: 'OTB within forecast variance', input: null }
    }
  };

  // ── Open / Close ───────────────────────────────────────────────
  window.hmToggle = function() {
    var m = document.getElementById('hmModal');
    if (!m) return;
    var open = m.style.display === 'flex';
    m.style.display = open ? 'none' : 'flex';
    var btn = document.getElementById('hmBtn');
    if (btn) btn.classList.toggle('active', !open);
    if (!open && hmState.type) hmRenderColours(hmState.type);
  };

  window.hmModalBg = function(e) {
    if (e.target.id === 'hmModal') hmToggle();
  };

  // ── Select heatmap type ────────────────────────────────────────
  window.hmSelectType = function(type) {
    hmState.type = type;
    hmState.colors = {};
    // Update card active state
    document.querySelectorAll('.hm-type-option').forEach(function(c) {
      c.classList.toggle('active', c.dataset.hmtype === type);
    });
    hmRenderColours(type);
  };

  // ── Render colour rows for selected type ──────────────────────
  function hmRenderColours(type) {
    var def = HM_TYPES[type];
    if (!def) return;
    var section = document.getElementById('hmColourSection');
    var rows    = document.getElementById('hmColourRows');
    if (!section || !rows) return;
    section.style.display = '';

    // Show condition section only for Stop Sales
    var condSection = document.getElementById('hmConditionSection');
    if (condSection) condSection.style.display = type === 'stopsales' ? 'block' : 'none';
    if (type === 'stopsales') {
      var condCb = document.getElementById('hmCondEnabled');
      if (condCb) condCb.checked = hmState.condition.enabled;
      var condCtrls = document.getElementById('hmCondControls');
      if (condCtrls) condCtrls.style.display = hmState.condition.enabled ? 'block' : 'none';
      var condMetric = document.getElementById('hmCondMetric');
      if (condMetric) condMetric.value = hmState.condition.metric;
      var condOp = document.getElementById('hmCondOp');
      if (condOp) condOp.value = hmState.condition.op;
      var condVal = document.getElementById('hmCondValue');
      if (condVal) condVal.value = hmState.condition.value;
    }

    // Figma 2026 swatches
    var isStopSales  = type === 'stopsales';
    var isToForecast = type === 'toforecast';
    var colours = [
      { key: 'grey',  swatch: isStopSales ? HM_STOP_SALES_COLORS.closed  : HM_METRIC_COLORS.grey,  label: isStopSales ? 'Closed'  : isToForecast ? 'Above Forecast' : 'Grey',  cfg: def.grey  },
      { key: 'blue',  swatch: isStopSales ? HM_STOP_SALES_COLORS.partial : HM_METRIC_COLORS.blue,  label: isStopSales ? 'Partial' : isToForecast ? 'Within Range'   : 'Blue',  cfg: def.blue  },
      { key: 'green', swatch: isStopSales ? HM_STOP_SALES_COLORS.open    : HM_METRIC_COLORS.green, label: isStopSales ? 'Open'    : isToForecast ? 'Below Forecast'  : 'Green', cfg: def.green }
    ];

    rows.innerHTML = colours.map(function(c) {
      var currentClr = hmState.colors[c.key] || c.swatch;
      var bodyHtml = '';
      // Only show the label for stop-sales or TO-forecast; hide generic Grey/Blue/Green
      var showLabel = isStopSales || isToForecast;
      if (c.cfg.input) {
        var val = hmState[c.key][c.cfg.input.param] !== undefined
          ? hmState[c.key][c.cfg.input.param]
          : c.cfg.input.def;
        var curUnit = (c.cfg.input.allowUnitToggle && hmState[c.key].unitType) ? hmState[c.key].unitType : c.cfg.input.unit;
        var unitToggleHtml = c.cfg.input.allowUnitToggle
          ? '<select class="hm-unit-select" onchange="hmUnitChange(\'' + c.key + '\',this.value)">'
            + '<option value="RN"' + (curUnit === 'RN' ? ' selected' : '') + '>RN</option>'
            + '<option value="%"'   + (curUnit === '%'   ? ' selected' : '') + '>%</option>'
            + '</select>'
          : '<span class="hm-unit-label">' + c.cfg.input.unit + '</span>';
        bodyHtml = '<div class="hm-threshold-body">'
          + (showLabel ? '<div class="hm-threshold-name">' + c.label + '</div>' : '')
          + '<div class="hm-threshold-field">'
          + '<div class="hm-threshold-field-label">' + c.cfg.desc + '</div>'
          + '<div style="display:flex;align-items:center;gap:6px">'
          + '<input type="number" class="hm-input" min="0" max="9999" value="' + val + '"'
          + ' data-hm-color="' + c.key + '" data-hm-param="' + c.cfg.input.param + '"'
          + ' onchange="hmParamChange(this)" placeholder="' + c.cfg.input.def + '">'
          + unitToggleHtml
          + '</div>'
          + '</div></div>';
      } else {
        bodyHtml = '<div class="hm-threshold-body">'
          + (showLabel ? '<div class="hm-threshold-name">' + c.label + '</div>' : '')
          + '<div class="hm-threshold-between">' + c.cfg.desc + '</div>'
          + '</div>';
      }
      var rowCls = 'hm-threshold-row' + (!c.cfg.input ? ' hm-threshold-no-input' : '');
      return '<div class="' + rowCls + '">'
        + '<div class="hm-threshold-swatch-col">'
        + '<div class="hm-threshold-swatch hm-swatch-pick" style="background:' + currentClr + ';cursor:pointer;position:relative" title="Click to change colour">'
        + '<input type="color" value="' + currentClr + '" data-hm-swatch="' + c.key + '"'
        + ' onchange="hmSwatchChange(this)" oninput="hmSwatchChange(this)"'
        + ' style="position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer">'
        + '</div>'
        + '<button type="button" class="hm-change-colour-btn" onclick="this.previousElementSibling.querySelector(\'input[type=color]\').click()">Change colour</button>'
        + '</div>'
        + bodyHtml
        + '</div>';
    }).join('');

    // Stop Sales room type selector + chips
    var rtSection = document.getElementById('hmRtSection');
    if (rtSection) {
      if (isStopSales) {
        rtSection.style.display = '';
        var rtOpts = ['Standard','Superior','Deluxe','Suite','Jr. Suite','Family'];
        var ddList = document.getElementById('hmRtDDList');
        if (ddList) {
          var sel = hmState.stopSalesRoomTypes || [];
          ddList.innerHTML = rtOpts.map(function(rt) {
            var isOn = sel.indexOf(rt) >= 0;
            return '<label class="hm-rt-dd-item"><input type="checkbox" class="ds-checkbox" value="' + rt + '"' + (isOn ? ' checked' : '') + ' onchange="hmRtItemChange()">' + rt + '</label>';
          }).join('');
        }
        hmRtUpdateTrigger();
        hmRtRenderChips();
      } else {
        rtSection.style.display = 'none';
      }
    }
    // Hide old rtFilter if it exists
    var rtFilterEl = document.getElementById('hmRtFilter');
    if (rtFilterEl) { rtFilterEl.innerHTML = ''; rtFilterEl.style.display = 'none'; }
  }

  // ── Param change ───────────────────────────────────────────────
  window.hmParamChange = function(el) {
    var color = el.dataset.hmColor;
    var param = el.dataset.hmParam;
    if (!hmState[color]) hmState[color] = { params: {} };
    hmState[color][param] = parseFloat(el.value) || 0;
  };

  window.hmUnitChange = function(colorKey, unit) {
    if (!hmState[colorKey]) hmState[colorKey] = { params: {} };
    hmState[colorKey].unitType = unit;
    hmRenderColours(hmState.type);
  };

  // ── Swatch colour change ────────────────────────────────────────
  window.hmSwatchChange = function(el) {
    var key = el.dataset.hmSwatch;
    hmState.colors[key] = el.value;
    // Update swatch preview immediately
    var swatch = el.parentElement;
    if (swatch) swatch.style.background = el.value;
  };

  // ── Room type selector (Figma style) ──────────────────────────
  window.hmRtToggleDD = function() {
    var box = document.getElementById('hmRtSelectBox');
    var list = document.getElementById('hmRtDDList');
    if (!box || !list) return;
    var isOpen = list.classList.contains('open');
    if (isOpen) {
      list.classList.remove('open');
      box.classList.remove('open');
    } else {
      list.classList.add('open');
      box.classList.add('open');
    }
  };

  // Keep heatmap room-type dropdown open when clicking inside it
  (function() {
    var list = document.getElementById('hmRtDDList');
    if (list) list.addEventListener('click', function(e) { e.stopPropagation(); });
  })();

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    var wrap = document.querySelector('.hm-rt-selector-wrap');
    if (wrap && !wrap.contains(e.target)) {
      var list = document.getElementById('hmRtDDList');
      var box = document.getElementById('hmRtSelectBox');
      if (list) list.classList.remove('open');
      if (box) box.classList.remove('open');
    }
  });

  window.hmRtItemChange = function() {
    hmRtReadSelect();
    hmRtUpdateTrigger();
    hmRtRenderChips();
  };

  function hmRtUpdateTrigger() {
    var sel = hmState.stopSalesRoomTypes || [];
    var txt = document.getElementById('hmRtSelectText');
    if (!txt) return;
    txt.textContent = sel.length === 0 ? 'All' : sel.length + ' selected';
  }

  function hmRtRenderChips() {
    var el = document.getElementById('hmRtChips');
    if (!el) return;
    var sel = hmState.stopSalesRoomTypes || [];
    if (sel.length === 0) { el.innerHTML = ''; return; }
    el.innerHTML = sel.map(function(rt) {
      return '<span class="hm-rt-chip">' + rt + '</span>';
    }).join('');
  }

  window.hmRtReadSelect = function() {
    var ddList = document.getElementById('hmRtDDList');
    if (!ddList) return;
    var arr = [];
    ddList.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
      if (cb.checked) arr.push(cb.value);
    });
    hmState.stopSalesRoomTypes = arr;
  };

  // ── Condition toggle ───────────────────────────────────────────
  window.hmCondToggle = function(cb) {
    var ctrls = document.getElementById('hmCondControls');
    if (ctrls) ctrls.style.display = cb.checked ? 'block' : 'none';
  };

  // ── Apply ──────────────────────────────────────────────────────
  window.hmApply = function() {
    // Read any number inputs
    document.querySelectorAll('#hmModal .hm-input').forEach(function(el) {
      var c = el.dataset.hmColor, p = el.dataset.hmParam;
      if (c && p) hmState[c][p] = parseFloat(el.value) || 0;
    });
    hmState.enabled = !!hmState.type;
    // Read room types from select
    hmRtReadSelect();
    // Read condition
    var condCb     = document.getElementById('hmCondEnabled');
    var condMetric = document.getElementById('hmCondMetric');
    var condOp     = document.getElementById('hmCondOp');
    var condValEl  = document.getElementById('hmCondValue');
    hmState.condition = {
      enabled: !!(condCb && condCb.checked),
      metric:  condMetric ? condMetric.value : 'hotel',
      op:      condOp     ? condOp.value     : '>',
      value:   condValEl  ? (parseFloat(condValEl.value) || 0) : 50
    };
    // Apply custom heatmap colours as CSS variables
    hmApplyColors();
    // Update button to reflect active heatmap type
    hmUpdateBtn();
    hmToggle();
    renderCalendar();
  };

  function hmApplyColors() {
    var grid = document.getElementById('calMonths');
    if (!grid) return;
    var isStopSales = hmState.type === 'stopsales';
    var defaults = isStopSales
      ? { grey: HM_STOP_SALES_COLORS.closed, blue: HM_STOP_SALES_COLORS.partial, green: HM_STOP_SALES_COLORS.open }
      : { grey: HM_METRIC_COLORS.grey, blue: HM_METRIC_COLORS.blue, green: HM_METRIC_COLORS.green };
    var gc = hmState.colors.grey  || defaults.grey;
    var bc = hmState.colors.blue  || defaults.blue;
    var gnc = hmState.colors.green || defaults.green;
    grid.style.setProperty('--hm-grey-bg',  gc + '30');
    grid.style.setProperty('--hm-grey-bdr', gc);
    grid.style.setProperty('--hm-blue-bg',  bc + '30');
    grid.style.setProperty('--hm-blue-bdr', bc);
    grid.style.setProperty('--hm-green-bg', gnc + '30');
    grid.style.setProperty('--hm-green-bdr',gnc);
    // Stop sales specific aliases
    grid.style.setProperty('--hm-closed-bg',  gc + '40');
    grid.style.setProperty('--hm-closed-bdr', gc);
    grid.style.setProperty('--hm-partial-bg', bc + '30');
    grid.style.setProperty('--hm-partial-bdr',bc);
    grid.style.setProperty('--hm-open-bg',    gnc + '30');
    grid.style.setProperty('--hm-open-bdr',   gnc);
    hmSyncCalViewClass();
  }

  function hmSyncCalViewClass() {
    var grid = document.getElementById('calMonths');
    if (!grid) return;
    grid.classList.toggle('hm-view', !!(hmState.enabled && hmState.type));
  }
  window.hmSyncCalViewClass = hmSyncCalViewClass;

  function hmUpdateBtn() {
    var iconEl   = document.getElementById('hmBtnIcon');
    var defaultIconEl = document.getElementById('hmBtnDefaultIcon');
    var labelEl  = document.getElementById('hmBtnLabel');
    var btn      = document.getElementById('hmBtn');
    if (!labelEl) return;
    if (hmState.enabled && hmState.type && HM_TYPES[hmState.type]) {
      var def = HM_TYPES[hmState.type];
      // Show SVG icon inside a hollow chip
      if (iconEl) {
        iconEl.innerHTML = '<span class="hm-btn-chip"><svg viewBox="0 0 24 24" fill="#006461" width="14" height="14"><path d="' + def.svgPath + '"/></svg></span>';
        iconEl.style.display = 'inline-flex';
      }
      if (defaultIconEl) defaultIconEl.style.display = 'none';
      labelEl.textContent = 'Heatmap';
      if (btn) btn.classList.add('active');
    } else {
      // Restore defaults
      if (iconEl)        { iconEl.innerHTML = ''; iconEl.style.display = 'none'; }
      if (defaultIconEl) defaultIconEl.style.display = '';
      labelEl.textContent = 'Heatmap';
      if (btn) btn.classList.remove('active');
    }
  }

  // ── Reset ──────────────────────────────────────────────────────
  window.hmReset = function() {
    hmState = { type: '', grey: { params:{} }, green: { params:{} }, blue: { params:{} }, enabled: false,
                condition: { enabled: false, metric: 'hotel', op: '>', value: 50 }, stopSalesRoomTypes: [], colors: {} };
    // Clear custom color CSS variables
    var grid = document.getElementById('calMonths');
    if (grid) ['--hm-grey-bg','--hm-grey-bdr','--hm-blue-bg','--hm-blue-bdr','--hm-green-bg','--hm-green-bdr',
               '--hm-closed-bg','--hm-closed-bdr','--hm-partial-bg','--hm-partial-bdr','--hm-open-bg','--hm-open-bdr']
      .forEach(function(v){ grid.style.removeProperty(v); });
    hmSyncCalViewClass();
    document.querySelectorAll('.hm-type-option').forEach(function(c) { c.classList.remove('active'); });
    var section = document.getElementById('hmColourSection');
    if (section) section.style.display = 'none';
    var rows = document.getElementById('hmColourRows');
    if (rows) rows.innerHTML = '';
    var condSection = document.getElementById('hmConditionSection');
    if (condSection) condSection.style.display = 'none';
    var condCb = document.getElementById('hmCondEnabled');
    if (condCb) condCb.checked = false;
    var condCtrls = document.getElementById('hmCondControls');
    if (condCtrls) condCtrls.style.display = 'none';
    var rtFilter = document.getElementById('hmRtFilter');
    if (rtFilter) { rtFilter.innerHTML = ''; rtFilter.style.display = 'none'; }
    var rtSect = document.getElementById('hmRtSection');
    if (rtSect) rtSect.style.display = 'none';
    var rtDDList = document.getElementById('hmRtDDList');
    if (rtDDList) rtDDList.innerHTML = '';
    var rtBox = document.getElementById('hmRtSelectBox');
    if (rtBox) rtBox.classList.remove('open');
    var rtSelectText = document.getElementById('hmRtSelectText');
    if (rtSelectText) rtSelectText.textContent = 'All';
    var rtChips = document.getElementById('hmRtChips');
    if (rtChips) rtChips.innerHTML = '';
    hmUpdateBtn();
    renderCalendar();
  };

  // ── Get cell colour class ──────────────────────────────────────
  window.hmIsStopSales = function() {
    return hmState.enabled && hmState.type === 'stopsales';
  };

  window.hmGetCellClass = function(dayData) {
    if (!hmState.enabled || !hmState.type) return '';

    // Condition gate — skip colouring if condition not met
    if (hmState.condition.enabled) {
      var cond = hmState.condition;
      var mval;
      switch (cond.metric) {
        case 'hotel':       mval = dayData.hotel;       break;
        case 'remainRooms': mval = dayData.remainRooms; break;
        case 'totalGuests': mval = dayData.totalGuests; break;
        case 'toOtb':       mval = dayData.toOtb;       break;
        default:            mval = 0;
      }
      var pass = false;
      switch (cond.op) {
        case '>':  pass = mval >  cond.value; break;
        case '>=': pass = mval >= cond.value; break;
        case '<':  pass = mval <  cond.value; break;
        case '<=': pass = mval <= cond.value; break;
      }
      if (!pass) return '';
    }

    var type = hmState.type;
    var gT  = parseFloat(hmState.grey.greyT)   || 0;
    var gnT = parseFloat(hmState.green.greenT) || 0;

    // Stop sales room type helpers (multiselect)
    function ssRtClosed() {
      var rts = hmState.stopSalesRoomTypes;
      if (!rts || rts.length === 0) return false; // no room type filter (All)
      var rules = dayData.closureRules || [];
      // Check if ALL selected room types are closed
      for (var ri = 0; ri < rts.length; ri++) {
        var found = false;
        for (var i = 0; i < rules.length; i++) {
          var r = rules[i];
          if (r.roomTypes.length === 0 || r.roomTypes.indexOf(rts[ri]) >= 0) { found = true; break; }
        }
        if (!found) return false; // at least one selected RT is not closed
      }
      return true; // all selected RTs are closed
    }

    function testGrey() {
      if (type === 'stopsales') {
        if (dayData.isFullClose) return true;
        if (hmState.stopSalesRoomTypes && hmState.stopSalesRoomTypes.length) return ssRtClosed();
        return false;
      }
      if (type === 'hotelocc')   return dayData.hotel >= gT;
      if (type === 'remaining')  return dayData.remainRooms < gT;
      if (type === 'mealplan')   return dayData.totalGuests >= gT;
      if (type === 'toforecast') return (dayData.toOtb - dayData.toFcst) >= gT;
      return false;
    }
    function testGreen() {
      if (type === 'stopsales') {
        if (dayData.isFullClose) return false;
        if (hmState.stopSalesRoomTypes && hmState.stopSalesRoomTypes.length) return !ssRtClosed();
        return !dayData.hasPartialClose;
      }
      if (type === 'hotelocc')   return dayData.hotel < gnT;
      if (type === 'remaining')  return dayData.remainRooms > gnT;
      if (type === 'mealplan')   return dayData.totalGuests < gnT;
      if (type === 'toforecast') return (dayData.toFcst - dayData.toOtb) >= gnT;
      return false;
    }
    function testBlue() {
      if (type === 'stopsales') {
        if (dayData.isFullClose) return false;
        if (hmState.stopSalesRoomTypes && hmState.stopSalesRoomTypes.length) return false; // RT filter → binary closed/open only
        return dayData.hasPartialClose;
      }
      // Between grey and green for threshold types
      var lo = Math.min(gT, gnT), hi = Math.max(gT, gnT);
      if (type === 'hotelocc')   return dayData.hotel >= lo && dayData.hotel <= hi;
      if (type === 'remaining')  return dayData.remainRooms >= lo && dayData.remainRooms <= hi;
      if (type === 'mealplan')   return dayData.totalGuests >= lo && dayData.totalGuests <= hi;
      if (type === 'toforecast') { var diff = Math.abs(dayData.toOtb - dayData.toFcst); return diff >= lo && diff <= hi; }
      return false;
    }

    // Stop Sales uses semantic colour classes; other types use generic ones
    if (type === 'stopsales') {
      if (testGrey())  return 'hm-closed';
      if (testBlue())  return 'hm-partial';
      if (testGreen()) return 'hm-open';
      return '';
    }
    if (testGrey())  return 'hm-grey';
    if (testGreen()) return 'hm-green';
    if (testBlue())  return 'hm-blue';
    return '';
  };

})();

/* ─── INIT ─── */
buildCalendar();
