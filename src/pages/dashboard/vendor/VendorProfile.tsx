import { useState } from 'react';
import {
  UserIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumCard from '../../../components/ui/PremiumCard';
import PremiumTabs from '../../../components/ui/PremiumTabs';
import { Button } from '../../../components/ui/Button';

const VendorProfile = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const [activeSubTab, setActiveSubTab] = useState('Personal Information');

  const tabs = [
    { id: 'Account', label: 'Account' },
    { id: 'Notification', label: 'Notification' },
    { id: 'Integrations', label: 'Integrations' },
    { id: 'Security', label: 'Security' },
    { id: 'Billing', label: 'Billing' },
  ];

  const accountSubTabs = [
    { name: 'Personal Information', icon: UserIcon },
    { name: 'Business Information', icon: BuildingOfficeIcon },
  ];

  const renderAccount = () => (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-72 flex flex-col gap-4">
        <PremiumCard className="p-4 bg-white/50 backdrop-blur-sm border-gray-50">
          <div className="space-y-1">
            {accountSubTabs.map((sub) => (
              <button
                key={sub.name}
                onClick={() => setActiveSubTab(sub.name)}
                className={`w-full px-5 py-4 flex items-center gap-4 rounded-2xl transition-all ${activeSubTab === sub.name
                  ? 'bg-[#1D2939] text-white shadow-xl shadow-gray-200'
                  : 'text-gray-400 hover:bg-white hover:shadow-lg'
                  }`}
              >
                <sub.icon className={`w-5 h-5 ${activeSubTab === sub.name ? 'text-white' : 'text-gray-400'}`} />
                <span className="text-[11px] font-black uppercase tracking-widest">{sub.name}</span>
              </button>
            ))}
          </div>
        </PremiumCard>

        <PremiumCard className="p-8 bg-[#1D2939] text-white overflow-hidden relative group">
          <div className="relative z-10">
            <h4 className="text-sm font-black uppercase tracking-widest mb-2">Ariya Pro</h4>
            <p className="text-[10px] text-gray-400 font-medium mb-4 leading-relaxed">Upgrade to unlock advanced analytics and premium profile badges.</p>
            <button className="text-[10px] font-black uppercase border-b border-[#D0771E] pb-1 hover:text-[#D0771E] transition-colors">Learn More</button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        </PremiumCard>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <PremiumCard className="p-10">
          {activeSubTab === 'Personal Information' ? (
            <div className="space-y-10">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#1D2939] uppercase tracking-tighter">Personal Information</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Public details that showcase your professional identity</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Anderson"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">Professional Title</label>
                  <input
                    type="text"
                    defaultValue="Senior Event Planner & Coordinator"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    defaultValue="john.anderson@eliteevents.com"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">Phone Number</label>
                  <input
                    type="text"
                    defaultValue="+234 801 234 5678"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">Years of Experience</label>
                  <div className="relative">
                    <select className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold appearance-none">
                      <option>6 - 10 Years</option>
                      <option>0 - 2 Years</option>
                      <option>2 - 5 Years</option>
                      <option>10+ Years</option>
                    </select>
                    <ChevronDownIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">Professional Bio</label>
                  <textarea
                    rows={6}
                    defaultValue="With over 8 years of experience in luxury event planning, I specialize in creating unforgettable experiences for weddings, corporate events, and social celebrations. My attention to detail and commitment to excellence has earned me recognition as one of Lagos' premier event coordinators."
                    className="w-full p-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-medium resize-none leading-relaxed"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="h-14 px-12 rounded-2xl shadow-xl shadow-orange-100 bg-[#D0771E]">
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#1D2939] uppercase tracking-tighter">Business Information</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Corporate details for official verification</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">Business Name</label>
                  <input
                    type="text"
                    defaultValue="Elite Event Solutions"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">Registration Number</label>
                  <input
                    type="text"
                    defaultValue="RC123456789"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">Business Type</label>
                  <div className="relative">
                    <select className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold appearance-none">
                      <option>Event Planning</option>
                      <option>Photography</option>
                      <option>Catering</option>
                    </select>
                    <ChevronDownIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest">Languages Spoken</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['English', 'Yoruba', 'French'].map((lang) => (
                      <span key={lang} className="px-4 py-2 bg-orange-50 text-[#D0771E] text-[10px] font-black border border-orange-100 rounded-xl flex items-center gap-2">
                        {lang}
                        <button className="hover:text-orange-700">×</button>
                      </span>
                    ))}
                    <button className="px-4 py-2 bg-gray-50 text-gray-400 text-[10px] font-black rounded-xl border border-dashed border-gray-200 hover:bg-gray-100">+ Add</button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="h-14 px-12 rounded-2xl shadow-xl shadow-orange-100 bg-[#D0771E]">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </PremiumCard>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <PremiumCard className="p-10">
      <div className="space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#1D2939] uppercase tracking-tighter">Notification Settings</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Manage your communication preferences</p>
        </div>

        <div className="space-y-12">
          {[
            {
              title: 'Business Inquiries', items: [
                { title: 'New Inquiry', desc: 'Alerts for potential new clients', channels: ['Email', 'App'] },
                { title: 'Response Reminder', desc: 'Friendly nudges for untracked messages', channels: ['App'] }
              ]
            },
            {
              title: 'Financials', items: [
                { title: 'Payment Receipt', desc: 'Confirmations for successful bookings', channels: ['Email'] },
                { title: 'Invoice Overdue', desc: 'Reminders for outstanding balances', channels: ['Email', 'App'] }
              ]
            }
          ].map((category, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.2em]">{category.title}</h3>
              <div className="space-y-6">
                {category.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-6 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 -mx-6 px-6 rounded-2xl transition-all group">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-[#1D2939]">{item.title}</h4>
                      <p className="text-[10px] font-medium text-gray-400">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="flex gap-2">
                        {item.channels.map(chan => (
                          <span key={chan} className="px-3 py-1 bg-white border border-gray-100 text-gray-400 text-[9px] font-black rounded-lg uppercase tracking-tighter">
                            {chan}
                          </span>
                        ))}
                      </div>
                      <button className="w-12 h-6 bg-[#D0771E] rounded-full relative transition-all shadow-inner ring-4 ring-[#D0771E]/10">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <Button className="h-14 px-12 rounded-2xl shadow-xl shadow-orange-100 bg-[#D0771E]">
            Save Preferences
          </Button>
        </div>
      </div>
    </PremiumCard>
  );

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 flex flex-col gap-10">
      <PageHeader
        breadcrumb="Operations"
        title="Settings"
        subtitle="Manage your business profile and preferences"
        actions={
          <div className="flex gap-4">
            <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 bg-white">
              View Public Profile
            </Button>
          </div>
        }
      />

      <div className="space-y-8">
        {/* Tabs */}
        <div className="pb-2 border-b border-gray-100">
          <PremiumTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px] pb-20">
          {activeTab === 'Account' && renderAccount()}
          {activeTab === 'Notification' && renderNotifications()}
          {['Integrations', 'Security', 'Billing'].includes(activeTab) && (
            <div className="bg-white rounded-[40px] border border-gray-50 p-20 text-center">
              <div className="w-20 h-20 rounded-[32px] bg-gray-50 flex items-center justify-center mx-auto mb-6">
                <LockClosedIcon className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-black text-[#1D2939] uppercase tracking-tight mb-2">{activeTab} coming soon</h3>
              <p className="text-sm text-gray-400 max-w-sm mx-auto font-medium">We're expanding our settings module to give you more control over your experience.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;