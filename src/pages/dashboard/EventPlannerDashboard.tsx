import { useNavigate } from 'react-router-dom';
import DashboardHero from '../../components/dashboard/DashboardHero';
import StatCard from '../../components/dashboard/StatCard';
import RecentActivities from '../../components/dashboard/RecentActivities';
import UrgentActionCard from '../../components/dashboard/UrgentActionCard';
import SmartSuggestionCard from '../../components/dashboard/SmartSuggestionCard';
import { CurrencyDollarIcon, BuildingStorefrontIcon, UserGroupIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';

const EventPlannerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10 dark:bg-gray-900">
      <PageHeader
        breadcrumb="Overview"
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your event planning progress."
      />

      {/* Hero Banner */}
      <DashboardHero />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Column (2/3) */}
        <div className="lg:col-span-2 space-y-10">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard
              label="Budget Health"
              value="₦20,000,000"
              icon={<CurrencyDollarIcon className="w-5 h-5 text-[#D0771E]" />}
              onClick={() => navigate('/budget')}
            />
            <StatCard
              label="Vendors Booked"
              value="12"
              icon={<BuildingStorefrontIcon className="w-5 h-5 text-[#D0771E]" />}
              onClick={() => navigate('/dashboard/my-vendors')}
            />
            <StatCard
              label="Guest RSVP"
              value="1,500"
              icon={<UserGroupIcon className="w-5 h-5 text-[#D0771E]" />}
              onClick={() => navigate('/guests')}
            />
            <StatCard
              label="Task Completed"
              value="9"
              icon={<ClipboardDocumentCheckIcon className="w-5 h-5 text-[#D0771E]" />}
              onClick={() => navigate('/tasks')}
            />
          </div>

          {/* Actions & Suggestions Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Urgent Actions */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em] ml-2">Urgent Actions</h3>
              <div className="space-y-4">
                <UrgentActionCard
                  title="Photographer deposit due"
                  subtitle="3 days overdue • Pay via My Vendors"
                  variant="warning"
                  onClick={() => navigate('/dashboard/my-vendors')}
                />
                <UrgentActionCard
                  title="Create your guest list now"
                  subtitle="Set up your guest list to start tracking RSVPs"
                  variant="danger"
                  onClick={() => navigate('/guests')}
                />
                <UrgentActionCard
                  title="Budget limit approaching"
                  subtitle="You have reached 80% of your allocated budget"
                  variant="warning"
                  onClick={() => navigate('/budget')}
                />
              </div>
            </div>

            {/* Smart Suggestions */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em] ml-2">Smart Suggestions</h3>
              <div className="space-y-4">
                <SmartSuggestionCard
                  title="Add similar vendors to shortlist"
                  subtitle="Based on your interest in Sunset Strings"
                  priority="Medium"
                  onClick={() => navigate('/vendors')}
                />
                <SmartSuggestionCard
                  title="Review your event website"
                  subtitle="Last edited 2 days ago. Go live now."
                  priority="High"
                  onClick={() => navigate('/website')}
                />
                <SmartSuggestionCard
                  title="Draft invitation designs"
                  subtitle="Browse matching stationery suites"
                  priority="Low"
                  onClick={() => navigate('/designs')}
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

export default EventPlannerDashboard;