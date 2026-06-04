import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type Props = { collapsed: boolean; onToggleCollapsed: () => void };

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
  { to: '/contacts', label: 'Contacts & Contracts', icon: <PeopleIcon sx={{ fontSize: 18 }} /> },
  { to: '/analysis', label: 'Audit', icon: <TrendingUpIcon sx={{ fontSize: 18 }} />, hidden: true },
  { to: '/communications', label: 'Communications & Notes', icon: <ChatIcon sx={{ fontSize: 18 }} /> },
  { to: '/configuration', label: 'Configuration', icon: <SettingsIcon sx={{ fontSize: 18 }} /> },
];

export default function Sidebar({ collapsed, onToggleCollapsed }: Props) {
  const width = collapsed ? 56 : 220;
  return (
    <aside
      className="fixed left-0 z-[50] flex flex-col"
      style={{
        top: 72,
        height: 'calc(100vh - 72px)',
        width,
        minWidth: width,
        background: 'var(--surface-1)',
        borderRight: '1px solid var(--border)',
        transition: 'width .2s',
      }}
    >
      <nav className="py-3 flex-1 overflow-y-auto">
        {items
          .filter((i) => !i.hidden)
          .map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-[14px] font-medium no-underline border-l-[3px] ${
                  isActive
                    ? 'border-l-[#006461] text-[#006461] font-bold'
                    : 'border-l-transparent text-[#8A9096] hover:text-[#4F5B60] hover:bg-[#F5F5F5]'
                }`
              }
              style={({ isActive }) =>
                isActive ? { background: 'var(--accent-bg)' } : undefined
              }
            >
              {i.icon}
              {!collapsed && <span>{i.label}</span>}
            </NavLink>
          ))}
      </nav>
      <div className="p-2 flex justify-end">
        <IconButton size="small" onClick={onToggleCollapsed} title={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
        </IconButton>
      </div>
    </aside>
  );
}
