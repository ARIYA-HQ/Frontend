import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import UpgradeModal from '../../components/ui/UpgradeModal';
import { useEntitlement } from '../../contexts/EntitlementContext';
import DashboardHero from '../../components/dashboard/DashboardHero';
import StatCard from '../../components/dashboard/StatCard';
import RecentActivities from '../../components/dashboard/RecentActivities';
import UrgentActionCard from '../../components/dashboard/UrgentActionCard';
import SmartSuggestionCard from '../../components/dashboard/SmartSuggestionCard';
import { CurrencyDollarIcon, BuildingStorefrontIcon, UserGroupIcon, ClipboardDocumentCheckIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';
import { authService } from '../../services/authService';

const PlannerDashboard = () => {
  const navigate = useNavigate();
  const { checkEntitlement } = useEntitlement();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<any>('create_event');

  const handleCreateEvent = () => {
    const entitlement = checkEntitlement('create_event');
    if (!entitlement.allowed) {
      setUpgradeFeature('create_event');
      setShowUpgradeModal(true);
      return;
    }
    navigate('/events/new');
  };
  const currentUser = authService.getCurrentUser();
  const isProfessionalPlanner = currentUser?.role === 'professional_event_planner';

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10 dark:bg-gray-900 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        breadcrumb={isProfessionalPlanner ? "Professional Dashboard" : "Overview"}
        title={isProfessionalPlanner ? "Client Events Dashboard" : "Dashboard"}
        subtitle={isProfessionalPlanner
          ? "Welcome back! Here's an overview of your client event planning progress."
          : "Welcome back! Here's an overview of your event planning progress."
        }
      />

      {/* Hero Banner */}
      <DashboardHero />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Column (2/3) */}
        <div className="lg:col-span-2 space-y-10">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {isProfessionalPlanner ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Actions & Suggestions Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Urgent Actions */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em] ml-2">
                {isProfessionalPlanner ? "Client Priorities" : "Urgent Actions"}
              </h3>
              <div className="space-y-4">
                {isProfessionalPlanner ? (
                  <>
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
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>

            {/* Smart Suggestions */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em] ml-2">
                {isProfessionalPlanner ? "Business Insights" : "Smart Suggestions"}
              </h3>
              <div className="space-y-4">
                {isProfessionalPlanner ? (
                  <>
                    <SmartSuggestionCard
                      title="Expand vendor network"
                      subtitle="Based on your recent event types"
                      priority="Medium"
                      onClick={() => navigate('/vendors')}
                    />
                    <Button
                      onClick={handleCreateEvent}
                      className="bg-[#D0771E] hover:bg-[#B56619] text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-orange-900/10 hover:shadow-orange-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <PlusIcon className="w-5 h-5" />
                      <span className="font-medium">New Event</span>
                    </Button>
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
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar Column (1/3) - Recent Activities */}
        <div className="h-full">
          <PremiumCard className="p-10 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
            <RecentActivities />
          </PremiumCard>
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        featureId={upgradeFeature}
      />
    </div>
  );
};

export default PlannerDashboard;

