import PageHeader from '../../../components/ui/PageHeader';
import PremiumCard from '../../../components/ui/PremiumCard';

const VendorAnalytics = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10 dark:bg-gray-900">
      <PageHeader
        breadcrumb="Vendor Dashboard"
        title="Analytics"
        subtitle="Track your business performance and insights"
      />

      <PremiumCard className="p-10 dark:shadow-none">
        <div className="text-center py-20">
          <h3 className="text-2xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-4">
            Analytics Coming Soon
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We're building comprehensive analytics features to help you track your business performance, bookings, and growth metrics.
          </p>
        </div>
      </PremiumCard>
    </div>
  );
};

export default VendorAnalytics;

