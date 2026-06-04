import PageHeader from 'components/Dashboard/PageHeader';
import TrendsCard from 'components/Dashboard/TrendsCard';
import RoomTypeCard from 'components/Dashboard/RoomTypeCard';
import TourOperatorsCard from 'components/Dashboard/TourOperatorsCard';

export default function DashboardPage() {
  return (
    <div className="px-6 py-5">
      <PageHeader title="Travel Distribution Hub" />
      <TrendsCard />
      <RoomTypeCard />
      <TourOperatorsCard />
    </div>
  );
}
