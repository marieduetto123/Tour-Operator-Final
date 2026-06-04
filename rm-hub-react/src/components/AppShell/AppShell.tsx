import { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import BreadcrumbBar from './BreadcrumbBar';
import Sidebar from './Sidebar';

const CRUMB_MAP: Record<string, string> = {
  '/dashboard': 'tour operator',
  '/contacts': 'contacts & contracts',
  '/analysis': 'analysis',
  '/communications': 'communications & notes',
  '/configuration': 'configuration',
};

type Props = { children: ReactNode };

export default function AppShell({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const current = CRUMB_MAP[pathname] ?? 'tour operator';
  const sidebarWidth = collapsed ? 56 : 220;
  return (
    <>
      <TopBar onHamburger={() => setCollapsed((v) => !v)} />
      <BreadcrumbBar current={current} />
      <div className="flex" style={{ paddingTop: 72 }}>
        <Sidebar collapsed={collapsed} onToggleCollapsed={() => setCollapsed((v) => !v)} />
        <main className="flex-1" style={{ marginLeft: sidebarWidth, transition: 'margin-left .2s' }}>
          {children}
        </main>
      </div>
    </>
  );
}
