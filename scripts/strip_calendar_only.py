#!/usr/bin/env python3
"""Keep only the demand calendar + week view component."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

CLOSE_DROPDOWNS = '''function _closeAllDropdowns(exceptId) {
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

'''

def strip_html():
    lines = (ROOT / "travelcore-rm-hub.html").read_text(encoding="utf-8").splitlines(keepends=True)
    out = []
    out.extend(lines[0:39])
    out.append("<body>\n\n")
    out.append('<main class="main calendar-only-main">\n')
    out.append('  <div class="page-content calendar-only-page">\n\n')
    out.extend(lines[448:1223])  # demand-calendar + weekView
    out.append("  </div>\n")
    out.append("</main>\n\n")
    out.extend(lines[2579:2753])   # dayPopup, closeOut, coDRPanel
    out.extend(lines[3509:3510])   # calCapTip
    out.extend(lines[3548:3557])   # moSelFooter
    out.append('  <script src="travelcore-rm-hub.js?v=201"></script>\n')
    out.append("</body>\n</html>\n")
    (ROOT / "travelcore-rm-hub.html").write_text("".join(out), encoding="utf-8")

def strip_js():
    src = (ROOT / "travelcore-rm-hub.js").read_text(encoding="utf-8").splitlines(keepends=True)
    parts = []
    parts.extend(src[0:49])
    parts.extend(src[51:72])
    parts.append(CLOSE_DROPDOWNS)
    parts.extend(src[1243:2975])
    parts.extend(src[2989:3872])
    parts.extend(src[3874:9771])
    parts.extend(src[10083:11075])
    parts.extend(src[14707:16300])
    parts.append("\n/* ─── INIT ─── */\n")
    parts.append("buildCalendar();\n")
    (ROOT / "travelcore-rm-hub.js").write_text("".join(parts), encoding="utf-8")

def strip_css():
    text = (ROOT / "travelcore-rm-hub.css").read_text(encoding="utf-8")
    import re
    for pat in [
        r'/\* Revenue trend[\s\S]*?(?=/\* Demand calendar|/\* Calendar)',
        r'#revenue-trend[^{]*\{[^}]*\}',
        r'#room-type[^{]*\{[^}]*\}',
        r'\.rev-[^{]*\{[^}]*\}',
        r'\.rt-stats[^{]*\{[^}]*\}',
        r'\.rt-stat[^{]*\{[^}]*\}',
        r'\.rt-fn[^{]*\{[^}]*\}',
        r'\.topbar[^{]*\{[^}]*\}',
        r'\.sidebar[^{]*\{[^}]*\}',
        r'\.breadcrumb-bar[^{]*\{[^}]*\}',
        r'\.mega-menu[^{]*\{[^}]*\}',
        r'\.to-page[^{]*\{[^}]*\}',
        r'\.an-page[^{]*\{[^}]*\}',
        r'\.st-tab[^{]*\{[^}]*\}',
        r'\.figma-tb[^{]*\{[^}]*\}',
    ]:
        text = re.sub(pat, '', text, flags=re.S)
    extra = '''
/* Calendar-only page */
.calendar-only-main { margin-left: 0 !important; padding: 16px; min-height: 100vh; box-sizing: border-box; }
.calendar-only-page { max-width: 100%; }
'''
    (ROOT / "travelcore-rm-hub.css").write_text(text + extra, encoding="utf-8")

def delete_extra_files():
    for name in [
        "calendar.html", "tour-operator.html", "rate-management.html",
        "export_calendar.py", "export_dailyb.py",
    ]:
        p = ROOT / name
        if p.exists():
            p.unlink()

if __name__ == "__main__":
    strip_html()
    strip_js()
    strip_css()
    delete_extra_files()
    print("Calendar-only build complete.")
