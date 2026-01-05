import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  ArrowDownTrayIcon,
  UserPlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  TagIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';
import { mockGuests } from '../../data/mockData';

const GuestList = () => {
  const [guests, setGuests] = useState(mockGuests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<any>(null);
  const [activeGroup, setActiveGroup] = useState('All');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dietaryRestrictions: '',
    plusOnes: 0,
    groupId: 'Standard'
  });

  const groups = ['All', ...new Set(guests.map(g => g.groupId || 'Unassigned'))];

  const filteredGuests = activeGroup === 'All'
    ? guests
    : guests.filter(g => (g.groupId || 'Unassigned') === activeGroup);

  const handleOpenModal = (guest?: any) => {
    if (guest) {
      setEditingGuest(guest);
      setFormData({
        name: guest.name,
        email: guest.email,
        phone: guest.phone || '',
        dietaryRestrictions: guest.dietaryRestrictions || '',
        plusOnes: guest.plusOnes,
        groupId: guest.groupId || 'Standard'
      });
    } else {
      setEditingGuest(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        dietaryRestrictions: '',
        plusOnes: 0,
        groupId: 'Standard'
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGuest) {
      setGuests(prev => prev.map(g => g.id === editingGuest.id ? { ...g, ...formData } : g));
    } else {
      const guestObj = {
        ...formData,
        id: `guest - ${Date.now()} `,
        eventId: 'event-1',
        rsvpStatus: 'pending' as const,
      };
      setGuests(prev => [...prev, guestObj]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteGuest = (id: string) => {
    if (window.confirm('Remove this guest from the list?')) {
      setGuests(prev => prev.filter(guest => guest.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: 'pending' | 'confirmed' | 'declined') => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, rsvpStatus: status } : g));
  };

  const handleExport = (type: string) => {
    alert(`Exporting ${filteredGuests.length} guests as ${type}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'declined': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default: return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 dark:bg-gray-900">
      <PageHeader
        breadcrumb="Guest Management"
        title="Guest List"
        subtitle="Coordinate attendees and special requirements"
        actions={
          <>
            <button
              onClick={() => handleExport('CSV')}
              className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="px-8 py-4 bg-[#D0771E] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 flex items-center gap-2 transform active:scale-95"
            >
              <UserPlusIcon className="w-4 h-4" />
              Add Guest
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Guests', value: guests.length, color: 'text-gray-900 dark:text-white' },
          { label: 'Confirmed', value: guests.filter(g => g.rsvpStatus === 'confirmed').length, color: 'text-green-600 dark:text-green-400' },
          { label: 'Pending', value: guests.filter(g => g.rsvpStatus === 'pending').length, color: 'text-orange-600 dark:text-orange-400' },
          { label: 'Declined', value: guests.filter(g => g.rsvpStatus === 'declined').length, color: 'text-red-500 dark:text-red-400' },
        ].map((stat, i) => (
          <PremiumCard key={i} hover={false} className="p-8 dark:shadow-none">
            <dt className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">{stat.label}</dt>
            <dd className={`text-4xl font-black tracking-tighter ${stat.color} leading-none`}>{stat.value}</dd>
          </PremiumCard>
        ))}
      </div>

      <PremiumTabs
        tabs={groups.map(g => ({ id: g, label: g }))}
        activeTab={activeGroup}
        onChange={setActiveGroup}
        className="mb-8"
      />

      {/* Table Card */}
      <PremiumCard hover={false} className="border-none shadow-2xl shadow-gray-100/50 dark:shadow-none">
        <div className="p-0">
          <div className="overflow-x-auto text-left">
            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Guest Details</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Contact</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Group</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">RSVP Status</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Dietary</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-50 dark:divide-gray-700">
                {filteredGuests.length > 0 ? filteredGuests.map((guest) => (
                  <tr key={guest.id} className="group hover:bg-orange-50/30 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-xs font-black text-[#D0771E] dark:text-orange-400">
                          {guest.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white uppercase">{guest.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">+{guest.plusOnes} Plus Ones</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 font-medium">
                          <EnvelopeIcon className="h-3 w-3" /> {guest.email}
                        </div>
                        {guest.phone && (
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 font-medium">
                            <PhoneIcon className="h-3 w-3" /> {guest.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        <TagIcon className="h-3 w-3" /> {guest.groupId || 'Unassigned'}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <select
                        value={guest.rsvpStatus}
                        onChange={(e) => handleStatusChange(guest.id, e.target.value as any)}
                        className={`text-[10px] font-black uppercase tracking-widest rounded-lg border-none focus:ring-0 cursor-pointer ${getStatusColor(guest.rsvpStatus)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>
                    <td className="px-6 py-5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {guest.dietaryRestrictions || 'None'}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(guest)} className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] dark:hover:text-orange-400 bg-white dark:bg-gray-700 rounded-lg shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-600 transition-all">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteGuest(guest.id)} className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 bg-white dark:bg-gray-700 rounded-lg shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-600 transition-all">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="text-gray-400 dark:text-gray-500 font-medium italic">No guests found in this group.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </PremiumCard>

      {/* Guest Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 text-left align-middle shadow-2xl dark:shadow-none transition-all">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <Dialog.Title as="h3" className="text-xl font-black text-gray-900 dark:text-white uppercase">
                        {editingGuest ? 'Edit Guest' : 'Add New Guest'}
                      </Dialog.Title>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">Guest invitee profile</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"><XMarkIcon className="w-6 h-6" /></button>
                  </div>

                  <form onSubmit={handleSaveGuest} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input required type="text" className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Michael Smith" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Email</label>
                        <input required type="email" className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="mike@example.com" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                        <input type="tel" className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+234..." />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Group</label>
                        <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3 pr-10 appearance-none" value={formData.groupId} onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}>
                          <option>Standard</option>
                          <option>VIP</option>
                          <option>Family</option>
                          <option>Friends</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Plus Ones</label>
                        <input type="number" min="0" className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3" value={formData.plusOnes} onChange={(e) => setFormData({ ...formData, plusOnes: Number(e.target.value) })} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Dietary Restrictions</label>
                      <input type="text" className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3" value={formData.dietaryRestrictions} onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })} placeholder="Vegan, No shellfish, etc." />
                    </div>
                    <button type="submit" className="w-full py-4 bg-[#D0771E] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl dark:shadow-none shadow-orange-900/20 active:scale-95 transition-all">
                      {editingGuest ? 'Update Guest' : 'Add to List'}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition >
    </div >
  );
};

export default GuestList;