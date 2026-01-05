import { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumTabs from '../../../components/ui/PremiumTabs';
import StatCard from '../../../components/dashboard/StatCard';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';
import QuoteEngine from '../../../components/dashboard/vendor/QuoteEngine';
import VendorChat from '../../../components/dashboard/vendor/VendorChat';
import { PIPELINE_STATS, MOCK_INQUIRIES } from '../../../data/mockPipeline';
import { DemoDataService } from '../../../services/DemoDataService';
import type { DemoInquiry } from '../../../services/DemoDataService';

const VendorInquiries = () => {
  const [activeTab, setActiveTab] = useState('Inquiries');
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteMode, setQuoteMode] = useState<'create' | 'view'>('create');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    // Load demo inquiries and map them to the UI structure
    const demoInquiries = DemoDataService.getInquiries();
    const mappedDemo = demoInquiries.map((inq: DemoInquiry) => ({
      id: inq.id,
      company: inq.clientName,
      event: inq.type,
      date: inq.eventDate,
      budget: inq.budget,
      guests: 'TBD', // Not in basic inquiry
      location: 'TBD',
      description: inq.details,
      status: inq.status === 'New' ? 'NEW' : inq.status.toUpperCase(),
      timestamp: inq.date === new Date().toISOString().split('T')[0] ? 'Just now' : inq.date
    }));

    // Merge with mock inquiries (avoiding duplicates if common IDs are found - though unlikely)
    setInquiries([...mappedDemo, ...MOCK_INQUIRIES]);
  }, []);

  const tabs = [
    { id: 'Inquiries', label: 'Inquiries' },
    { id: 'Quotes', label: 'Quotes' }
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10">
      <PageHeader
        breadcrumb="Operations"
        title="Pipeline"
        subtitle="Manage leads, inquiries, and quotation requests"
      />

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {PIPELINE_STATS.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            icon={<stat.icon className="w-5 h-5 text-white" />}
            iconBgColor={stat.color}
            textColor="text-gray-900 dark:text-white"
          />
        ))}
      </div>

      <div className="space-y-8">
        {/* Tabs & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-100 dark:border-gray-800">
          <PremiumTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Search & Filter */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D0771E] transition-colors" />
              <input
                type="text"
                placeholder="Search Inquiries"
                className="w-full md:w-64 pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent rounded-xl text-xs font-black placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white focus:ring-2 focus:ring-[#D0771E]/20 focus:bg-white dark:focus:bg-gray-900 focus:border-[#D0771E] transition-all outline-none"
              />
            </div>
            <Button variant="outline" className="h-11 rounded-xl px-5 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
              <FunnelIcon className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="grid grid-cols-1 gap-6 animate-fade-in">
          {inquiries.map((item) => (
            <PremiumCard key={item.id} className="p-10 group hover:border-[#D0771E]/30 transition-all border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#1D2939] dark:text-white group-hover:text-[#D0771E] transition-colors tracking-tight">
                    {item.company}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D0771E] py-1 px-3 bg-[#D0771E]/5 dark:bg-[#D0771E]/10 rounded-full border border-[#D0771E]/10 dark:border-[#D0771E]/20">
                      {item.event}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">{item.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'ACCEPTED' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : item.status === 'NEW' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)] animate-pulse' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]'}`}></div>
                  <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${item.status === 'ACCEPTED' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800' :
                    item.status === 'NEW' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800' :
                      item.status === 'SENT' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-800' :
                        'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700'
                    }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 my-10 py-8 border-y border-gray-50/50 dark:border-gray-800">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Event Date</span>
                  <p className="text-xs font-black text-[#1D2939] dark:text-white">{item.date}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Proposed Budget</span>
                  <p className="text-xs font-black text-[#1D2939] dark:text-white">{item.budget}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Guest Count</span>
                  <p className="text-xs font-black text-[#1D2939] dark:text-white">{item.guests}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Event Location</span>
                  <p className="text-xs font-black text-[#1D2939] dark:text-white">{item.location}</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Requirement Details</span>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-[1.8] max-w-5xl">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50/50 dark:border-gray-800">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {item.status === 'SENT' ? (
                    <Button
                      onClick={() => {
                        setSelectedInquiry(item);
                        setQuoteMode('view');
                        setIsQuoteOpen(true);
                      }}
                      className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white"
                    >
                      Follow Up
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setSelectedInquiry(item);
                        setQuoteMode('create');
                        setIsQuoteOpen(true);
                      }}
                      className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white"
                    >
                      Create Quote
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedInquiry(item);
                      setIsChatOpen(true);
                    }}
                    className="h-12 px-8 rounded-2xl border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Send Message
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedInquiry(item);
                      setQuoteMode('view');
                      setIsQuoteOpen(true);
                    }}
                    className="h-12 px-8 rounded-2xl text-gray-400 hover:text-[#1D2939] dark:hover:text-white font-black uppercase tracking-widest text-[10px]"
                  >
                    View Details
                  </Button>
                </div>

                {item.status === 'SENT' && (
                  <Button variant="outline" className="h-10 px-6 rounded-xl border-gray-100 dark:border-gray-700 text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-[9px]">
                    Resend Quote
                  </Button>
                )}
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>

      {/* Drawers */}
      <QuoteEngine
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        inquiry={selectedInquiry}
        mode={quoteMode}
      />
      <VendorChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        inquiry={selectedInquiry}
      />
    </div>
  );
};

export default VendorInquiries;