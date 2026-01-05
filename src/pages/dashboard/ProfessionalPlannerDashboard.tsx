import { useNavigate } from 'react-router-dom';
import DashboardHero from '../../components/dashboard/DashboardHero';
import StatCard from '../../components/dashboard/StatCard';
import RecentActivities from '../../components/dashboard/RecentActivities';
import UrgentActionCard from '../../components/dashboard/UrgentActionCard';
import SmartSuggestionCard from '../../components/dashboard/SmartSuggestionCard';
import { CurrencyDollarIcon, BuildingStorefrontIcon, UserGroupIcon, ClipboardDocumentCheckIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';

const ProfessionalPlannerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10 dark:bg-gray-900">
      <PageHeader
        breadcrumb="Professional Dashboard"
        title="Client Events Dashboard"
        subtitle="Welcome back! Here's an overview of your client event planning progress."
      />

      {/* Hero Banner */}
      <DashboardHero />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Column (2/3) */}
        <div className="lg:col-span-2 space-y-10">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard
              label="Client Budget Health"
              value="₦45,000,000"
              icon={<CurrencyDollarIcon className="w-5 h-5 text-[#D0771E]" />}
              onClick={() => navigate('/budget')}
            />
            <StatCard
              label="Active Client Events"
              value="8"
              icon={<BriefcaseIcon className="w-5 h-5 text-[#D0771E]" />}
              onClick={() => navigate('/events')}
            />
            <StatCard
              label="Client Vendors Booked"
              value="24"
              icon={<BuildingStorefrontIcon className="w-5 h-5 text-[#D0771E]" />}
              onClick={() => navigate('/dashboard/my-vendors')}
            />
            <StatCard
              label="Client Satisfaction"
              value="4.8/5"
              icon={<UserGroupIcon className="w-5 h-5 text-[#D0771E]" />}
              onClick={() => navigate('/clients')}
            />
          </div>

          {/* Actions & Suggestions Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Urgent Actions */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em] ml-2">Client Priorities</h3>
              <div className="space-y-4">
                <UrgentActionCard
                  title="Client meeting tomorrow"
                  subtitle="Prepare presentation for Johnson wedding"
                  variant="info"
                  onClick={() => navigate('/clients')}
                />
                <UrgentActionCard
                  title="Vendor contract review"
                  subtitle="Review and approve contract for upcoming event"
                  variant="warning"
                  onClick={() => navigate('/dashboard/my-vendors')}
                />
                <UrgentActionCard
                  title="Client budget approval"
                  subtitle="Awaiting approval for additional services"
                  variant="info"
                  onClick={() => navigate('/budget')}
                />
              </div>
            </div>

            {/* Smart Suggestions */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em] ml-2">Business Insights</h3>
              <div className="space-y-4">
                <SmartSuggestionCard
                  title="Expand vendor network"
                  subtitle="Based on your recent event types"
                  priority="Medium"
                  onClick={() => navigate('/vendors')}
                />
                <SmartSuggestionCard
                  title="Client retention strategy"
                  subtitle="Follow up with recent event clients"
                  priority="High"
                  onClick={() => navigate('/clients')}
                />
                <SmartSuggestionCard
                  title="Marketing opportunity"
                  subtitle="Share recent event success stories"
                  priority="Low"
                  onClick={() => navigate('/portfolio')}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar Column (1/3) - Recent Activities */}
        <div className="h-full">
          <PremiumCard className="p-10 h-full">
            <RecentActivities />
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPlannerDashboard;