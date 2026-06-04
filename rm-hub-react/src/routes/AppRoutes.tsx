import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from 'components/AppShell/AppShell';
import DashboardPage from 'pages/DashboardPage';
import ContactsPage from 'pages/ContactsPage';
import AnalysisPage from 'pages/AnalysisPage';
import CommunicationsPage from 'pages/CommunicationsPage';
import ConfigurationPage from 'pages/ConfigurationPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppShell>
            <DashboardPage />
          </AppShell>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AppShell>
            <DashboardPage />
          </AppShell>
        }
      />
      <Route
        path="/contacts"
        element={
          <AppShell>
            <ContactsPage />
          </AppShell>
        }
      />
      <Route
        path="/analysis"
        element={
          <AppShell>
            <AnalysisPage />
          </AppShell>
        }
      />
      <Route
        path="/communications"
        element={
          <AppShell>
            <CommunicationsPage />
          </AppShell>
        }
      />
      <Route
        path="/configuration"
        element={
          <AppShell>
            <ConfigurationPage />
          </AppShell>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
