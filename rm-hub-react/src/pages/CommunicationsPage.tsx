import Typography from '@mui/material/Typography';
import PageHeader from 'components/Dashboard/PageHeader';
import SectionCard from 'components/Sections/SectionCard';

export default function CommunicationsPage() {
  return (
    <div className="px-6 py-5">
      <PageHeader title="Communications & Notes" />
      <SectionCard title="Recent activity" subtitle="Notes, emails, and call logs">
        <Typography variant="body2">No activity yet.</Typography>
      </SectionCard>
    </div>
  );
}
