#!/usr/bin/env python3
"""Strip Travel Distribution Hub to dashboard only (trends + room type)."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent

def strip_html():
    lines = (ROOT / "travelcore-rm-hub.html").read_text(encoding="utf-8").splitlines(keepends=True)

    out = []
    out.extend(lines[0:39])
    out.append("<body>\n\n")
    out.append("<!-- ═══ TOP APP BAR ═══ -->\n")
    out.append('<motion.div class="sidebar-overlay" id="sidebarOverlay"></motion.div>\n'.replace('motion.', ''))
    out.append('<header class="topbar">\n')
    out.append("  <div class=\"topbar-left\">\n")
    out.extend(lines[45:50])
    out.append("    <nav class=\"topbar-tabs\">\n")
    out.extend(lines[52:66])
    out.append('      <a class="tab active" href="#">Travel Distribution Hub</a>\n')
    out.append("    </nav>\n")
    out.append("  </div>\n")
    out.extend(lines[71:92])
    out.append("\n<!-- ═══ BREADCRUMB BAR (full width) ═══ -->\n")
    out.extend(lines[103:117])
    out.extend(lines[118:123])
    out.append("    <nav class=\"sidebar-nav\">\n")
    out.append('      <a class="nav-item active" href="#" data-label="Dashboard">\n')
    out.append('        <span class="material-icons">dashboard</span>\n')
    out.append("        Dashboard\n")
    out.append("      </a>\n")
    out.append("    </nav>\n")
    out.append('    <button class="sidebar-collapse-btn" id="sidebarCollapseBtn" title="Collapse sidebar">\n')
    out.extend(lines[147:150])
    out.append("    </button>\n")
    out.append("  </aside>\n\n")
    out.append("  <!-- MAIN -->\n")
    out.append("  <main class=\"main\">\n\n")
    out.append("    <div class=\"page-content\">\n\n")
    out.extend(lines[157:443])
    out.extend(lines[1227:1260])
    out.append("    </motion.div><!-- /page-content -->\n".replace('motion.', ''))
    out.append("  </main>\n")
    out.append("</div><!-- /layout -->\n\n")
    out.append('  <script src="travelcore-rm-hub.js?v=200"></script>\n')
    out.append("</body>\n")
    out.append("</html>\n")
    (ROOT / "travelcore-rm-hub.html").write_text("".join(out), encoding="utf-8")

def strip_js():
    src = (ROOT / "travelcore-rm-hub.js").read_text(encoding="utf-8").splitlines(keepends=True)
    parts = []
    parts.extend(src[0:73])
    parts.extend(src[117:1101])
    parts.extend([
        "function _closeAllDropdowns(exceptId) {\n",
        "  ['revBoardDropdown','revSegmentDropdown','revRoomDropdown','revTODropdown','revOriginDropdown','revSourceDropdown','revCmpDropdown','revDRPanel'].forEach(function(id) {\n",
        "    if (id === exceptId) return;\n",
        "    var el = document.getElementById(id);\n",
        "    if (el) el.style.display = 'none';\n",
        "  });\n",
        "  ['revCmpBtn','revBoardBtn','revSegmentBtn','revRoomBtn','revTOBtn','revOriginBtn','revSourceBtn'].forEach(function(bid) {\n",
        "    var b = document.getElementById(bid); if (b) b.classList.remove('active');\n",
        "  });\n",
        "}\n\n",
    ])
    parts.extend(src[1130:1242])
    parts.extend(src[2976:2987])
    parts.extend(src[9772:10009])
    parts.append("\n/* ─── INIT ─── */\n")
    parts.append("updateChart();\n")
    parts.append("buildRoomTypeTable();\n")
    parts.append("updateRevStats();\n\n")
    parts.extend(src[10054:10081])
    parts.extend(src[12375:12393])
    (ROOT / "travelcore-rm-hub.js").write_text("".join(parts), encoding="utf-8")

def strip_css():
    text = (ROOT / "travelcore-rm-hub.css").read_text(encoding="utf-8")
    text = re.sub(r'/\* Demand calendar:.*?(?=\.rt-stats)', '', text, flags=re.S)
    for pat in [
        r'/\* ═{3,} WEEK VIEW[\s\S]*?(?=/\* ═{3,}|\Z)',
        r'/\* ═{3,} DAILY B[\s\S]*?(?=/\* ═{3,}|\Z)',
        r'/\* ═{3,} DAILY H[\s\S]*?(?=/\* ═{3,}|\Z)',
        r'/\* ═{3,} DAILY R[\s\S]*?(?=/\* ═{3,}|\Z)',
        r'/\* ═{3,} CLOSE-OUT[\s\S]*?(?=/\* ═{3,}|\Z)',
        r'/\* ═{3,} TOUR OPERATOR[\s\S]*?(?=/\* ═{3,}|\Z)',
        r'/\* ═{3,} ANALYSIS[\s\S]*?(?=/\* ═{3,}|\Z)',
        r'/\* ═{3,} SETTINGS[\s\S]*?(?=/\* ═{3,}|\Z)',
        r'/\* ═{3,} CONTRACT WIZARD[\s\S]*?(?=/\* ═{3,}|\Z)',
        r'/\* ═{3,} FIGMA EXPORT[\s\S]*?(?=/\* ═{3,}|\Z)',
        r'\.figma-tb[\w-]*\s*\{[^}]*\}',
        r'#demand-calendar[^{]*\{[^}]*\}',
        r'#weekView[^{]*\{[^}]*\}',
        r'\.mo-sel-footer[^{]*\{[^}]*\}',
    ]:
        text = re.sub(pat, '', text, flags=re.S)
    (ROOT / "travelcore-rm-hub.css").write_text(text, encoding="utf-8")

def delete_extra_files():
    for name in [
        "calendar.html",
        "tour-operator.html",
        "rate-management.html",
        "export_calendar.py",
        "export_dailyb.py",
    ]:
        p = ROOT / name
        if p.exists():
            p.unlink()

if __name__ == "__main__":
    strip_html()
    strip_js()
    strip_css()
    delete_extra_files()
    print("Stripped to dashboard-only.")
