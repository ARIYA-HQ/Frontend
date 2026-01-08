import {
  CalendarDaysIcon,
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  StarIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  PresentationChartLineIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../../components/ui/PageHeader';
import StatCard from '../../../components/dashboard/StatCard';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';

const VendorDashboard = () => {
  const metrics = [
    { label: 'Monthly Revenue', value: '₦20,000,000', icon: CurrencyDollarIcon },
    { label: 'Monthly Booking', value: '12', icon: CalendarDaysIcon },
    { label: 'Response Rate', value: '93%', icon: ChatBubbleLeftEllipsisIcon },
    { label: 'Conversion Rate', value: '93%', icon: PresentationChartLineIcon },
  ];

  const pendingActions = [
    { title: '3 New Inquiries', description: 'Respond within 2 hours for best results', color: 'bg-orange-50 text-orange-700 border-orange-100' },
    { title: '2 Client Meetings Today', description: "Sarah's Wedding (2 PM), Corporate Event (4 PM)", color: 'bg-blue-50 text-blue-700 border-blue-100' },
    { title: '1 Contract Pending Signature', description: 'Johnson Anniversary - $2,400', color: 'bg-green-50 text-green-700 border-green-100' },
    { title: '3 New Inquiries', description: 'Respond within 2 hours for best results', color: 'bg-orange-50 text-orange-700 border-orange-100' },
  ];

  const schedule = [
    { date: 'Today', month: 'July 9', time: '8:30 AM', events: ["Sarah's Wedding Tasting", "Corporate Lunch Setup"] },
    { date: 'Today', month: 'July 9', time: '8:30 AM', events: ["Sarah's Wedding Tasting", "Corporate Lunch Setup"] },
    { date: 'Today', month: 'July 9', time: '8:30 AM', events: ["Sarah's Wedding Tasting", "Corporate Lunch Setup"] },
    { date: 'Today', month: 'July 9', time: '8:30 AM', events: ["Sarah's Wedding Tasting", "Corporate Lunch Setup"] },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 h-full flex flex-col gap-8 sm:gap-10 dark:bg-gray-900 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        breadcrumb="Dashboard"
        title="Vendor Dashboard"
        subtitle="Manage your business operations and track performance"
      />

      {/* Banner */}
      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] h-auto sm:h-48 flex items-center px-6 sm:px-16 py-8 sm:py-0 shadow-2xl dark:shadow-none group border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A051D] via-[#2D0A31] to-[#1A051D] group-hover:scale-105 transition-transform duration-700"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-orange-500/30">
                Business Insights
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
              <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">July 2024</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">Good morning, Maya!</h2>
            <p className="text-purple-200/70 text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
              Your catering services are trending this week. You have <span className="text-orange-400 font-bold">3 new inquiries</span> waiting for your response.
            </p>
          </div>
          <Button variant="outline" className="hidden sm:flex border-white/20 text-white hover:bg-white/10 px-8 rounded-full text-[10px]">
            View Analytics
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-10">
        {/* Left Column: Metrics & Schedule */}
        <div className="xl:col-span-2 space-y-8 sm:space-y-10">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {metrics.map((metric, idx) => (
              <StatCard
                key={idx}
                label={metric.label}
                value={metric.value}
                icon={<metric.icon className="w-5 h-5 text-[#D0771E]" />}
              />
            ))}
          </div>

          {/* Schedule */}
          <PremiumCard className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-[#1D2939] dark:text-white uppercase tracking-tight">This Week's Schedule</h3>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">7 Planned sessions / activities</p>
              </div>
              <Button variant="ghost" className="text-[10px] text-[#D0771E] hover:text-[#D0771E] font-black uppercase tracking-widest hover:bg-[#D0771E]/5">
                Explore Calendar
              </Button>
            </div>

            <div className="space-y-4">
              {schedule.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl dark:hover:shadow-none hover:shadow-gray-200/50 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-600 group">
                  <div className="flex flex-col items-center justify-center p-3 bg-[#1D2939] dark:bg-gray-900 text-white rounded-[20px] min-w-[80px] group-hover:bg-[#D0771E] transition-colors">
                    <span className="text-[9px] font-black uppercase tracking-[0.1em] opacity-60 mb-0.5">{item.date}</span>
                    <span className="text-xs font-black whitespace-nowrap uppercase tracking-tighter">{item.month}</span>
                  </div>
                  <div className="flex-1">
                    <ul className="space-y-2">
                      {item.events.map((event, eIdx) => (
                        <li key={eIdx} className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D0771E]"></div>
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-white dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-100 dark:border-gray-800">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>

        {/* Right Column: Pending Actions & Health */}
        <div className="space-y-8 sm:space-y-10">
          {/* Pending Actions */}
          <PremiumCard className="p-6 sm:p-10 h-fit">
            <div className="space-y-1 mb-10">
              <h3 className="text-lg font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Pending Actions</h3>
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Needs your attention</p>
            </div>

            <div className="space-y-4">
              {pendingActions.map((action, idx) => (
                <div key={idx} className={`p-6 rounded-[32px] border ${action.color} group cursor-pointer hover:scale-[1.02] transition-all relative overflow-hidden`}>
                  <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ClockIcon className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[11px] font-black uppercase tracking-widest">
                      {action.title}
                    </h4>
                    <p className="text-[11px] font-medium opacity-70 leading-relaxed pr-8">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </PremiumCard>

          {/* Business Health */}
          <PremiumCard className="p-10">
            <div className="space-y-1 mb-10">
              <h3 className="text-lg font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Business Health</h3>
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Live statistics</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Profile Completion</span>
                    <p className="text-xs font-black text-[#1D2939] dark:text-white">Almost there!</p>
                  </div>
                  <span className="text-xs font-black text-green-600 dark:text-green-500">95%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full w-[95%] shadow-[0_0_10px_rgba(34,197,94,0.3)] dark:shadow-none"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Portfolio Images</span>
                    <p className="text-xs font-black text-[#1D2939] dark:text-white">Needs more visuals</p>
                  </div>
                  <span className="text-xs font-black text-orange-500">10/40</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full w-[25%] shadow-[0_0_10px_rgba(249,115,22,0.3)] dark:shadow-none"></div>
                </div>
              </div>

              <div className="space-y-5 pt-8 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Payment Status</span>
                  <span className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-500 text-[9px] font-black uppercase tracking-widest rounded-full border border-green-100 dark:border-green-800/50">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Verification</span>
                  <span className="flex items-center gap-1.5 text-green-600 dark:text-green-500">
                    <CheckBadgeIcon className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Verified</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Avg Ratings</span>
                  <span className="flex items-center gap-1.5 text-[#1D2939] dark:text-white font-black text-xs">
                    <StarIcon className="w-4 h-4 text-orange-400 fill-orange-400" />
                    4.9 <span className="text-gray-400 dark:text-gray-500 font-bold ml-0.5">(40)</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Profile Views</span>
                  <span className="text-xs font-black text-[#1D2939] dark:text-white">1,234</span>
                </div>
              </div>

              <Button className="w-full h-14 rounded-[24px] text-[10px] shadow-2xl shadow-orange-100 dark:shadow-none mt-4 group">
                <SparklesIcon className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Boost Your Profile
              </Button>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;