import Typography from '@mui/material/Typography';
import PageHeader from 'components/Dashboard/PageHeader';
import SectionCard from 'components/Sections/SectionCard';

export default function ConfigurationPage() {
  return (
    <div className="px-6 py-5">
      <PageHeader title="Configuration" />
      <SectionCard title="Settings" subtitle="Manage workspace, users, and integrations">
        <Typography variant="body2">No settings yet.</Typography>
      </SectionCard>
    </div>
  );
}
