import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { UserGroupIcon, PhoneIcon, EnvelopeIcon, CalendarDaysIcon, ArrowTrendingUpIcon, CheckCircleIcon, PlusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import PremiumCard from '../../components/ui/PremiumCard';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'completed';
  lastContact: string;
  nextEvent?: string;
  totalEvents: number;
  totalSpent: number;
}

const ClientsPage = () => {
  const navigate = useNavigate();
  const [clients] = useState<Client[]>([
    {
      id: 'client-1',
      name: 'Johnson Wedding',
      email: 'contact@johnson-wedding.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      lastContact: '2024-01-15',
      nextEvent: '2024-06-20',
      totalEvents: 1,
      totalSpent: 85000
    },
    {
      id: 'client-2',
      name: 'TechCorp Conference',
      email: 'events@techcorp.com',
      phone: '+1 (555) 987-6543',
      status: 'active',
      lastContact: '2024-01-10',
      nextEvent: '2024-09-15',
      totalEvents: 3,
      totalSpent: 240000
    },
    {
      id: 'client-3',
      name: 'Emma & Michael',
      email: 'emma.michael@couple.com',
      phone: '+1 (555) 456-7890',
      status: 'pending',
      lastContact: '2024-01-05',
      totalEvents: 0,
      totalSpent: 0
    },
    {
      id: 'client-4',
      name: 'Annual Charity Gala',
      email: 'gala@charity.org',
      phone: '+1 (555) 234-5678',
      status: 'completed',
      lastContact: '2023-12-15',
      totalEvents: 1,
      totalSpent: 65000
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#D0771E]/10 text-[#D0771E]';
      case 'pending': return 'bg-yellow-500/10 text-yellow-600';
      case 'completed': return 'bg-emerald-500/10 text-emerald-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10">
      <PageHeader
        breadcrumb="Client Management"
        title="Client Management"
        subtitle="Manage your client relationships and track their events."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Column (2/3) */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Button
                variant="primary"
                onClick={() => navigate('/clients/new')}
                className="bg-[#D0771E] hover:bg-[#b86619] text-white h-14 rounded-2xl px-6 text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-orange-100"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add New Client
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 h-14 rounded-2xl px-6 text-[11px] font-black uppercase tracking-[0.25em]"
              >
                Import Clients
              </Button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
                className="h-14 pl-14 pr-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] focus:border-transparent text-sm font-bold placeholder:text-gray-400"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PremiumCard className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-[#D0771E]/10">
                  <UserGroupIcon className="w-6 h-6 text-[#D0771E]" />
                </div>
                <div className="ml-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Clients</p>
                  <p className="text-2xl font-black text-[#1D2939]">24</p>
                </div>
              </div>
            </PremiumCard>
            <PremiumCard className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-emerald-500/10">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="ml-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Active Clients</p>
                  <p className="text-2xl font-black text-[#1D2939]">18</p>
                </div>
              </div>
            </PremiumCard>
            <PremiumCard className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <CalendarDaysIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Upcoming Events</p>
                  <p className="text-2xl font-black text-[#1D2939]">12</p>
                </div>
              </div>
            </PremiumCard>
            <PremiumCard className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-purple-500" />
                </div>
                <div className="ml-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Revenue (YTD)</p>
                  <p className="text-2xl font-black text-[#1D2939]">₦1.2M</p>
                </div>
              </div>
            </PremiumCard>
          </div>

          <PremiumCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th scope="col" className="py-5 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Client</th>
                    <th scope="col" className="py-5 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact</th>
                    <th scope="col" className="py-5 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                    <th scope="col" className="py-5 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Next Event</th>
                    <th scope="col" className="py-5 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Events</th>
                    <th scope="col" className="py-5 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-[#D0771E]/10 rounded-2xl flex items-center justify-center">
                            <span className="text-[#D0771E] font-black text-base">{client.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-black text-[#1D2939]">{client.name}</div>
                            <div className="text-xs text-gray-400 font-black mt-1">Last contact: {client.lastContact}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center font-black">
                          <EnvelopeIcon className="w-4 h-4 mr-3 text-gray-400" />
                          {client.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-2 font-black">
                          <PhoneIcon className="w-4 h-4 mr-3 text-gray-400" />
                          {client.phone}
                        </div>
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-black rounded-full ${getStatusColor(client.status)}`}>
                          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap text-sm text-gray-500 font-black">
                        {client.nextEvent || 'N/A'}
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap text-sm text-gray-500 font-black">
                        {client.totalEvents}
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => navigate(`/clients/${client.id}`)}
                          className="text-[#D0771E] hover:text-[#b86619] font-black flex items-center group"
                        >
                          View
                          <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PremiumCard>
        </div>

        {/* Right Sidebar - Client Insights */}
        <div className="space-y-10">
          <PremiumCard className="p-8">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Client Insights</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-black text-[#1D2939]">Top Client</p>
                  <p className="text-xs text-gray-400 font-black">Johnson Wedding</p>
                </div>
                <span className="text-sm font-black text-[#1D2939]">₦85,000</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-black text-[#1D2939]">Avg. Event Value</p>
                  <p className="text-xs text-gray-400 font-black">Per client</p>
                </div>
                <span className="text-sm font-black text-[#1D2939]">₦75,000</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-black text-[#1D2939]">Client Satisfaction</p>
                  <p className="text-xs text-gray-400 font-black">Overall rating</p>
                </div>
                <span className="text-sm font-black text-[#1D2939]">4.8/5</span>
              </div>
            </div>
          </PremiumCard>

          <PremiumCard className="p-8">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <Button
                variant="primary"
                onClick={() => navigate('/clients/new')}
                className="w-full bg-[#D0771E] hover:bg-[#b86619] text-white h-14 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-orange-100"
              >
                Add New Client
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-14 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em]"
              >
                Send Newsletter
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-14 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em]"
              >
                Export Data
              </Button>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;