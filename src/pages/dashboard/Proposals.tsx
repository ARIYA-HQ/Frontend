import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';

const Proposals = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10 dark:bg-gray-900">
      <PageHeader
        breadcrumb="Professional Dashboard"
        title="Proposals"
        subtitle="Create and manage proposals for your clients"
      />

      <PremiumCard className="p-10 dark:shadow-none">
        <div className="text-center py-20">
          <h3 className="text-2xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-4">
            Proposals Coming Soon
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We're building a proposal management system to help you create, send, and track proposals for your clients.
          </p>
        </div>
      </PremiumCard>
    </div>
  );
};

export default Proposals;

