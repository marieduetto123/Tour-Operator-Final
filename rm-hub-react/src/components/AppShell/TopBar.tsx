import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';

type Props = { onHamburger: () => void };

const TABS = [
  { label: 'Home' },
  { label: 'Advance' },
  { label: 'Pricing & Strategy', dropdown: true },
  { label: 'Forecasts & Budgets', dropdown: true },
  { label: 'Reports', dropdown: true },
  { label: 'Groups', dropdown: true },
  { label: 'Travel Distribution Hub', dropdown: true, active: true, key: 'tdh' },
];

const MEGA_LINKS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Contacts & Contracts', to: '/contacts' },
  { label: 'Analysis', to: '/analysis' },
  { label: 'Communications & Notes', to: '/communications' },
  { label: 'Configuration', to: '/configuration' },
];

export default function TopBar({ onHamburger }: Props) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const nav = useNavigate();
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] flex items-stretch justify-between h-10 px-3.5 pl-6"
      style={{ background: 'var(--topbar)' }}
    >
      <div className="flex items-stretch h-full">
        <IconButton onClick={onHamburger} size="small" sx={{ color: '#fff', mr: 1 }} aria-label="Open menu">
          <MenuIcon fontSize="small" />
        </IconButton>
        <div className="flex items-center pr-8 shrink-0">
          <span className="text-white font-bold tracking-wide text-[15px]">duetto</span>
        </div>
        <nav className="flex items-stretch h-full">
          {TABS.map((t) => {
            const isTDH = t.key === 'tdh';
            return (
              <a
                key={t.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (isTDH) setAnchor(e.currentTarget as HTMLElement);
                }}
                className={`flex items-center gap-0.5 px-4 text-[13px] whitespace-nowrap transition-colors no-underline ${
                  t.active
                    ? 'bg-lime text-[#0E2124] font-normal'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {t.label}
                {t.dropdown && <ExpandMoreIcon sx={{ fontSize: 16 }} />}
              </a>
            );
          })}
        </nav>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          {MEGA_LINKS.map((m) => (
            <MenuItem
              key={m.to}
              onClick={() => {
                setAnchor(null);
                nav(m.to);
              }}
            >
              {m.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className="flex items-center gap-1">
        <IconButton size="small" sx={{ color: 'rgba(255,255,255,.8)' }} title="Toggle theme">
          <DarkModeIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton size="small" sx={{ color: 'rgba(255,255,255,.8)' }} title="Notifications">
          <Badge
            badgeContent="99+"
            color="error"
            sx={{ '& .MuiBadge-badge': { fontSize: 7, height: 14, minWidth: 14, fontWeight: 700 } }}
          >
            <NotificationsIcon sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>
        <IconButton size="small" sx={{ color: 'rgba(255,255,255,.8)' }} title="Help">
          <HelpOutlineIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton size="small" sx={{ color: 'rgba(255,255,255,.8)' }} title="Settings">
          <SettingsIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <div
          className="ml-1 flex items-center justify-center text-white font-bold text-[12px] cursor-pointer"
          style={{ width: 32, height: 32, borderRadius: '50%', background: '#FF5900' }}
        >
          M
        </div>
      </div>
    </header>
  );
}
