import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';

const Report = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10 dark:bg-gray-900">
      <PageHeader
        breadcrumb="Professional Dashboard"
        title="Reports"
        subtitle="View and generate reports for your client events"
      />

      <PremiumCard className="p-10 dark:shadow-none">
        <div className="text-center py-20">
          <h3 className="text-2xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-4">
            Reports Coming Soon
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We're building comprehensive reporting features to help you track and analyze your event planning performance.
          </p>
        </div>
      </PremiumCard>
    </div>
  );
};

export default Report;

