import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import {
  UserGroupIcon,
  PlusIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import PremiumCard from '../../components/ui/PremiumCard';
import PremiumTabs from '../../components/ui/PremiumTabs';
import { PremiumSearch } from '../../components/ui/PremiumInput';
import { MOCK_CLIENTS } from '../../data/mockClients';
import type { Client } from '../../data/mockClients';
import ClientModal from '../../components/clients/ClientModal';

const ClientsPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [activeTab, setActiveTab] = useState('All Clients');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('All Events');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Handlers
  const handleAddClient = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleDeleteClient = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSaveClient = (clientData: Partial<Client>) => {
    if (editingClient) {
      // Edit Mode
      setClients(prev => prev.map(c =>
        c.id === editingClient.id ? { ...c, ...clientData } as Client : c
      ));
    } else {
      // Add Mode
      const newClient: Client = {
        ...clientData,
        id: `client-${Date.now()}`,
        lastContact: 'Just now',
        status: clientData.status || 'active',
        eventType: clientData.eventType || 'Wedding',
        totalEvents: clientData.totalEvents || 0,
        totalSpent: clientData.totalSpent || 0
      } as Client;
      setClients(prev => [newClient, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredClients = clients.filter(client => {
    // Search Filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.location.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Tab Filtering
    if (activeTab === 'Active' && client.status !== 'active') return false;
    if (activeTab === 'Pending' && client.status !== 'pending') return false;
    if (activeTab === 'Archived' && (client.status !== 'completed' && client.status !== 'archived')) return false;

    // Event Type Filtering
    if (selectedEventType !== 'All Events' && client.eventType !== selectedEventType) return false;

    return true;
  });

  // Calculate stats
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const pendingLeads = clients.filter(c => c.status === 'pending').length;

  // Calculate event type counts
  const eventTypeCounts = clients.reduce((acc, client) => {
    if (client.eventType) {
      acc[client.eventType] = (acc[client.eventType] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#D0771E]/10 text-[#D0771E] border border-[#D0771E]/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20';
      case 'completed': return 'bg-green-500/10 text-green-600 border border-green-500/20';
      case 'archived': return 'bg-gray-500/10 text-gray-600 border border-gray-500/20';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-20">
      <div className="w-full px-8">
        {/* Page Header */}
        <PageHeader
          breadcrumb="Client Management"
          title="Clients"
          subtitle="Manage your client relationships and track their events"
          actions={
            <Button
              variant="primary"
              onClick={handleAddClient}
              className="bg-[#D0771E] hover:bg-[#b86619] text-white h-12 rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20 dark:shadow-none flex items-center gap-2 transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              Add Client
            </Button>
          }
        />

        {/* Tabs */}
        <PremiumTabs
          tabs={[
            { id: 'All Clients', label: 'All Clients' },
            { id: 'Active', label: 'Active' },
            { id: 'Pending', label: 'Pending / Leads' },
            { id: 'Archived', label: 'Archived' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Column */}
          <div className="w-full lg:w-[280px] flex-shrink-0 space-y-8">
            {/* Search & Filter Card */}
            <div className="sticky top-8 space-y-6">
              <PremiumCard className="p-4 border-gray-100/50 dark:border-gray-700/50 shadow-none bg-transparent dark:bg-transparent">
                <div className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-4 px-2">Search & Filter</div>
                <div className="space-y-4">
                  <PremiumSearch
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />

                  <div className="space-y-2">
                    <div className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest px-2 mt-6 mb-2">Event Types</div>
                    <button
                      onClick={() => setSelectedEventType('All Events')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs transition-all duration-300
                        ${selectedEventType === 'All Events'
                          ? 'bg-[#D0771E] text-white font-black shadow-lg dark:shadow-none transform scale-105'
                          : 'text-gray-500 dark:text-gray-400 font-bold hover:bg-white dark:hover:bg-gray-800 hover:shadow-md dark:hover:shadow-none hover:text-gray-900 dark:hover:text-white border border-transparent hover:border-gray-50 dark:hover:border-gray-700'}
                    `}
                    >
                      <span className="uppercase tracking-widest">All Events</span>
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${selectedEventType === 'All Events' ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>{filteredClients.length}</span>
                    </button>
                    {Object.entries(eventTypeCounts).map(([type, count]) => (
                      <button
                        key={type}
                        onClick={() => setSelectedEventType(selectedEventType === type ? 'All Events' : type)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs transition-all duration-300
                        ${selectedEventType === type
                            ? 'bg-[#D0771E] text-white font-black shadow-lg dark:shadow-none transform scale-105'
                            : 'text-gray-500 dark:text-gray-400 font-bold hover:bg-white dark:hover:bg-gray-800 hover:shadow-md dark:hover:shadow-none hover:text-gray-900 dark:hover:text-white border border-transparent hover:border-gray-50 dark:hover:border-gray-700'}
                    `}
                      >
                        <span className="uppercase tracking-widest">{type}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${selectedEventType === type ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>{count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </PremiumCard>

              {/* Quick Stats Card */}
              <PremiumCard className="p-6 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">Overview</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#D0771E]/10 rounded-lg text-[#D0771E]">
                        <UserGroupIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">{totalClients}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                        <PlusIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Active</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">{activeClients}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-600">
                        <UserGroupIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Pending</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">{pendingLeads}</span>
                  </div>
                </div>
              </PremiumCard>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <PremiumCard className="overflow-hidden border-gray-100 dark:border-gray-700 shadow-xl dark:shadow-none bg-white dark:bg-gray-800">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                      <th scope="col" className="py-6 px-8 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Client</th>
                      <th scope="col" className="py-6 px-6 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Contact Info</th>
                      <th scope="col" className="py-6 px-6 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Status</th>
                      <th scope="col" className="py-6 px-6 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Next Event</th>
                      <th scope="col" className="py-6 px-6 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Spent</th>
                      <th scope="col" className="py-6 px-6 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer" onClick={() => navigate(`/clients/${client.id}`)}>
                        <td className="py-6 px-8 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-black text-sm uppercase ${client.avatar || 'bg-gray-100 text-gray-500'}`}>
                              {client.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-black text-[#1D2939] dark:text-white group-hover:text-[#D0771E] transition-colors">{client.name}</div>
                              <div className="flex items-center gap-1 mt-1 text-xs font-bold text-gray-400 dark:text-gray-500">
                                <MapPinIcon className="w-3 h-3" />
                                {client.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-6 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300">
                              <EnvelopeIcon className="w-3.5 h-3.5 text-gray-400" />
                              {client.email}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                              <PhoneIcon className="w-3.5 h-3.5 text-gray-400" />
                              {client.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-6 whitespace-nowrap">
                          <span className={`px-3 py-1.5 inline-flex text-[10px] font-black uppercase tracking-wider rounded-full ${getStatusColor(client.status)}`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="py-6 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-bold">
                          {client.nextEvent ? (
                            <div className="flex items-center gap-2">
                              <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                              <span>{client.nextEvent}</span>
                            </div>
                          ) : (
                            <span className="text-gray-300 dark:text-gray-600 text-xs uppercase tracking-wider">—</span>
                          )}
                        </td>
                        <td className="py-6 px-6 whitespace-nowrap text-sm font-black text-gray-900 dark:text-white">
                          ${(client.totalSpent || 0).toLocaleString()}
                        </td>
                        <td className="py-6 px-6 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClient(client);
                              }}
                              className="p-2 text-gray-400 hover:text-[#D0771E] hover:bg-[#D0771E]/10 rounded-full transition-colors"
                              title="Edit Client"
                            >
                              <PencilSquareIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteClient(client.id, e)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                              title="Delete Client"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/clients/${client.id}`);
                              }}
                              className="p-2 text-gray-400 hover:text-[#D0771E] hover:bg-[#D0771E]/10 rounded-full transition-colors"
                              title="View Dashboard"
                            >
                              <ArrowRightIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredClients.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <UserGroupIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">No Clients Found</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Try adjusting your filters</p>
                </div>
              )}
            </PremiumCard>
          </div>
        </div>
      </div>

      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
        client={editingClient}
      />
    </div>
  );
};

export default ClientsPage;