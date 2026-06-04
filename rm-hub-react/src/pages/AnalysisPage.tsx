import PageHeader from 'components/Dashboard/PageHeader';
import TrendsCard from 'components/Dashboard/TrendsCard';
import RoomTypeCard from 'components/Dashboard/RoomTypeCard';

export default function AnalysisPage() {
  return (
    <div className="px-6 py-5">
      <PageHeader title="Analysis" />
      <TrendsCard />
      <RoomTypeCard />
    </div>
  );
}
