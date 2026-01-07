import { useState } from 'react';
import {
  ArrowDownTrayIcon,
  ClockIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';
import PremiumTabs from '../../components/ui/PremiumTabs';
import { Button } from '../../components/ui/Button';

const Report = () => {
  const [activeTab, setActiveTab] = useState('Financials');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Your 'Boardroom Ready' PDF report has been generated and is ready for download.");
    }, 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10 dark:bg-gray-900 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        breadcrumb="Professional Dashboard"
        title="Intelligence Reports"
        subtitle="High-fidelity insights and performance analytics"
        actions={
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="h-12 px-6 rounded-2xl group border-gray-100 dark:border-gray-700"
            >
              <ClockIcon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Schedule
            </Button>
            <Button
              onClick={handleGeneratePDF}
              isDisabled={isGenerating}
              className="h-12 px-8 rounded-2xl shadow-xl shadow-[#D0771E]/20 dark:shadow-none bg-[#D0771E] text-white"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
              ) : (
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              )}
              {isGenerating ? "Exporting..." : "Download PDF"}
            </Button>
          </div>
        }
      />

      <PremiumTabs
        tabs={[
          { id: 'Financials', label: 'Financial Summary' },
          { id: 'Guests', label: 'Guest Insights' },
          { id: 'Vendors', label: 'Vendor Performance' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="space-y-8">
        {activeTab === 'Financials' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PremiumCard className="lg:col-span-2 p-10 space-y-8">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Budget Utilization</h3>
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Across all 2025 events</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-[#D0771E]">₦245.8M</div>
                  <div className="text-[9px] font-black text-green-500 uppercase tracking-widest">12% Under Budget</div>
                </div>
              </div>

              <div className="h-64 flex items-end gap-3 px-4">
                {[45, 60, 55, 80, 75, 90, 65, 85, 70, 95, 100, 80].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                    <div
                      className="w-full bg-[#D0771E]/10 dark:bg-orange-900/20 group-hover:bg-[#D0771E] transition-all rounded-t-lg"
                      style={{ height: `${h}%` }}
                    ></div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1D2939] text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Month {i + 1}: {h}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-50 dark:border-gray-800">
                {['Q1', 'Q2', 'Q3', 'Q4'].map(q => (
                  <div key={q} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{q}</div>
                ))}
              </div>
            </PremiumCard>

            <div className="space-y-6">
              <PremiumCard className="p-8 border-l-4 border-l-green-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-xl text-green-600">
                    <BanknotesIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black text-green-600 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-md uppercase tracking-widest">+₦4.2M</span>
                </div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Cost Savings</h4>
                <div className="text-2xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">₦18,250,400</div>
                <p className="text-[9px] font-medium text-gray-400 mt-2 italic">Based on vendor negotiation AI tips</p>
              </PremiumCard>

              <PremiumCard className="p-8 border-l-4 border-l-orange-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl text-orange-600">
                    <ExclamationCircleIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black text-orange-600 bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-md uppercase tracking-widest">3 Events</span>
                </div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Overage Risks</h4>
                <div className="text-2xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">₦2,100,000</div>
                <p className="text-[9px] font-medium text-gray-400 mt-2 italic">Pending décor upgrades in Q3</p>
              </PremiumCard>

              <PremiumCard className="p-8 border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-blue-600">
                    <ArrowTrendingUpIcon className="w-6 h-6" />
                  </div>
                </div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">ROI Score</h4>
                <div className="text-2xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">9.4/10</div>
                <p className="text-[9px] font-medium text-gray-400 mt-2 italic">Top 5% in Lagos Planner Network</p>
              </PremiumCard>
            </div>
          </div>
        )}

        {activeTab === 'Guests' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PremiumCard className="p-10">
              <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-8">Attendance Intelligence</h3>
              <div className="space-y-6">
                {[
                  { event: "Tosin's Wedding", guests: 350, attended: 312, color: 'bg-green-500' },
                  { event: "Tech Summit 2025", guests: 1200, attended: 1050, color: 'bg-[#D0771E]' },
                  { event: "Charity Gala", guests: 200, attended: 195, color: 'bg-blue-500' }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-tight">{item.event}</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{Math.round((item.attended / item.guests) * 100)}% Confirmed</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${(item.attended / item.guests) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </PremiumCard>

            <PremiumCard className="p-10 flex flex-col justify-center items-center text-center">
              <div className="w-48 h-48 rounded-full border-[16px] border-[#F3F0EB] dark:border-gray-800 flex flex-col items-center justify-center relative">
                <div className="absolute top-0 right-0 w-20 h-20 border-[16px] border-[#D0771E] rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}></div>
                <span className="text-3xl font-black text-[#1D2939] dark:text-white">72%</span>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Confirmed RSVPs</span>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-8 w-full">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <div className="text-xl font-black text-[#1D2939] dark:text-white">1,557</div>
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Guests</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <div className="text-xl font-black text-[#D0771E]">42%</div>
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">First-Time Clients</div>
                </div>
              </div>
            </PremiumCard>
          </div>
        )}

        {activeTab === 'Vendors' && (
          <PremiumCard className="p-0 overflow-hidden">
            <div className="p-10 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Top Performing Vendors</h3>
              <span className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest">Ranked by Reliability</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F3F0EB]/30 dark:bg-gray-800/50">
                    <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Vendor Name</th>
                    <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Usage Rate</th>
                    <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Avg Response</th>
                    <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800">
                  {[
                    { name: 'Lens Queen Studios', usage: 12, response: '14 mins', score: 9.8 },
                    { name: 'Events by Clara', usage: 8, response: '22 mins', score: 9.5 },
                    { name: 'Royal Decorations', usage: 15, response: '45 mins', score: 8.9 },
                    { name: 'Tastee Catering', usage: 22, response: '12 mins', score: 9.2 }
                  ].map((vendor, i) => (
                    <tr key={i} className="hover:bg-gray-50 group transition-colors dark:hover:bg-gray-800">
                      <td className="px-10 py-6 border-none">
                        <div className="text-sm font-black text-[#1D2939] dark:text-white group-hover:text-[#D0771E] uppercase tracking-tight">{vendor.name}</div>
                      </td>
                      <td className="px-10 py-6 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest italic border-none">{vendor.usage} Projects</td>
                      <td className="px-10 py-6 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest italic border-none">{vendor.response}</td>
                      <td className="px-10 py-6 border-none">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span className="text-sm font-black text-gray-900 dark:text-white">{vendor.score}/10</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PremiumCard>
        )}
      </div>
    </div>
  );
};

export default Report;
