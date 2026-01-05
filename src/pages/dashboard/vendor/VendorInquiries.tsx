import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  BanknotesIcon,
  ClipboardDocumentListIcon,
  ChartPieIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumTabs from '../../../components/ui/PremiumTabs';
import StatCard from '../../../components/dashboard/StatCard';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';
import QuoteEngine from '../../../components/dashboard/vendor/QuoteEngine';
import VendorChat from '../../../components/dashboard/vendor/VendorChat';

const VendorInquiries = () => {
  const [activeTab, setActiveTab] = useState('Inquiries');
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteMode, setQuoteMode] = useState<'create' | 'view'>('create');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const tabs = [
    { id: 'Inquiries', label: 'Inquiries' },
    { id: 'Quotes', label: 'Quotes' }
  ];

  const stats = [
    { label: 'Inquiries Value', value: '₦45,000,000', icon: BanknotesIcon, color: 'bg-[#D0771E]' },
    { label: 'Total Inquiries', value: '1,200', icon: ClipboardDocumentListIcon, color: 'bg-indigo-600' },
    { label: 'Acceptance Rate', value: '54%', icon: ChartPieIcon, color: 'bg-emerald-600' },
    { label: 'Avg Response Time', value: '2.3 Days', icon: ClockIcon, color: 'bg-purple-600' },
  ];

  const inquiries = [
    {
      id: 1,
      company: 'Unity Bank',
      event: 'Product Launch Event',
      date: 'March 15, 2025',
      budget: '$5,000 - $8,000',
      guests: '100 people',
      location: 'Asokoro Abuja, Nigeria',
      description: "We're organizing our annual company retreat and need comprehensive photography coverage. The event spans 3 days and includes keynote sessions, breakout meetings, networking events, and team building activities...",
      status: 'ACCEPTED',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      company: 'Unity Bank',
      event: 'Product Launch Event',
      date: 'March 15, 2025',
      budget: '$5,000 - $8,000',
      guests: '100 people',
      location: 'Asokoro Abuja, Nigeria',
      description: "We're organizing our annual company retreat and need comprehensive photography coverage. The event spans 3 days and includes keynote sessions, breakout meetings, networking events, and team building activities...",
      status: 'SENT',
      timestamp: '2 hours ago'
    },
    {
      id: 3,
      company: 'Unity Bank',
      event: 'Product Launch Event',
      date: 'March 15, 2025',
      budget: '$5,000 - $8,000',
      guests: '100 people',
      location: 'Asokoro Abuja, Nigeria',
      description: "We're organizing our annual company retreat and need comprehensive photography coverage. The event spans 3 days and includes keynote sessions, breakout meetings, networking events, and team building activities...",
      status: 'VIEWED',
      timestamp: '2 hours ago'
    }
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
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            icon={<stat.icon className="w-5 h-5 text-white" />}
            iconBgColor={stat.color}
          />
        ))}
      </div>

      <div className="space-y-8">
        {/* Tabs & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-100">
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
                className="w-full md:w-64 pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-xs font-black placeholder:text-gray-400 focus:ring-2 focus:ring-[#D0771E]/20 focus:bg-white focus:border-[#D0771E] transition-all outline-none"
              />
            </div>
            <Button variant="outline" className="h-11 rounded-xl px-5 border-gray-100">
              <FunnelIcon className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="grid grid-cols-1 gap-6">
          {inquiries.map((item) => (
            <PremiumCard key={item.id} className="p-10 group hover:border-[#D0771E]/30 transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#1D2939] group-hover:text-[#D0771E] transition-colors tracking-tight">
                    {item.company}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D0771E] py-1 px-3 bg-[#D0771E]/5 rounded-full border border-[#D0771E]/10">
                      {item.event}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'ACCEPTED' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]'}`}></div>
                  <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${item.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border border-green-100' :
                    item.status === 'SENT' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                      'bg-gray-50 text-gray-600 border border-gray-100'
                    }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 my-10 py-8 border-y border-gray-50/50">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Event Date</span>
                  <p className="text-xs font-black text-[#1D2939]">{item.date}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Proposed Budget</span>
                  <p className="text-xs font-black text-[#1D2939]">{item.budget}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Guest Count</span>
                  <p className="text-xs font-black text-[#1D2939]">{item.guests}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Event Location</span>
                  <p className="text-xs font-black text-[#1D2939]">{item.location}</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Requirement Details</span>
                <p className="text-xs font-medium text-gray-500 leading-[1.8] max-w-5xl">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50/50">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {item.status === 'SENT' ? (
                    <Button
                      onClick={() => {
                        setSelectedInquiry(item);
                        setQuoteMode('view');
                        setIsQuoteOpen(true);
                      }}
                      className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100"
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
                      className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100"
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
                    className="h-12 px-8 rounded-2xl border-gray-100 text-gray-600"
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
                    className="h-12 px-8 rounded-2xl text-gray-400 hover:text-[#1D2939] font-black uppercase tracking-widest text-[10px]"
                  >
                    View Details
                  </Button>
                </div>

                {item.status === 'SENT' && (
                  <Button variant="outline" className="h-10 px-6 rounded-xl border-gray-100 text-purple-700 bg-purple-50 hover:bg-purple-100 text-[9px]">
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