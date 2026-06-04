import PageHeader from 'components/Dashboard/PageHeader';
import TourOperatorsCard from 'components/Dashboard/TourOperatorsCard';

export default function ContactsPage() {
  return (
    <div className="px-6 py-5">
      <PageHeader title="Contacts & Contracts" />
      <TourOperatorsCard />
    </div>
  );
}
