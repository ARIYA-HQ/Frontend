import { useState } from 'react';
import {
    FunnelIcon,
    ArrowDownTrayIcon,
    PlusIcon,
    TrashIcon,
    PencilSquareIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';
import { PremiumSearch } from '../../components/ui/PremiumInput';
import AddGuestModal from '../../components/guests/AddGuestModal';
import SeatingChart from '../../components/guests/SeatingChart';
import StatCard from '../../components/dashboard/StatCard';

interface Table {
    id: string;
    name: string;
    type: 'round' | 'rectangle';
    capacity: number;
    guestIds: number[];
    x: number;
    y: number;
}

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const Guests = () => {
    const [activeTab, setActiveTab] = useState('Guest List');
    const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);

    // Seating State
    const [tables, setTables] = useState<Table[]>([
        { id: 't1', name: 'Premium Row', type: 'round', capacity: 8, guestIds: [], x: 200, y: 150 },
        { id: 't2', name: 'Family Table', type: 'rectangle', capacity: 8, guestIds: [], x: 600, y: 150 },
    ]);

    // Mock Stats
    const stats = [
        { label: 'Total Guest', value: '1,500', color: 'text-[#D0771E]' },
        { label: 'Guest Accepted', value: '1,200', color: 'text-[#D0771E]' },
        { label: 'Guest Pending', value: '100', color: 'text-[#D0771E]' },
        { label: 'Guest Declined', value: '300', color: 'text-[#D0771E]' },
    ];

    // Mock Guest Data
    const [guests, setGuests] = useState([
        { id: 1, name: 'Mary Olivia Jane', role: 'Maid of honour', email: 'olivia@untitledui.com', phone: '+1 (555) 123-4567', status: 'Confirmed', extras: 1, category: 'Family', dietary: 'Vegetarian', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', checkedIn: true, assignedTableId: undefined },
        { id: 2, name: 'Olaoluwa Taiwo', role: 'Uncle', email: 'olivia@untitledui.com', phone: '+1 (555) 123-4567', status: 'Declined', extras: 2, category: 'Friend', dietary: 'None', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', checkedIn: false, assignedTableId: undefined },
        { id: 3, name: 'Philip Isaiah Crown', role: 'Former Colleague', email: 'olivia@untitledui.com', phone: '+1 (555) 123-4567', status: 'Confirmed', extras: 0, category: 'Work', dietary: 'Gluten-free', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', checkedIn: false, assignedTableId: undefined },
        { id: 4, name: 'Demi Wilkinson', role: 'Friend from school', email: 'olivia@untitledui.com', phone: '+1 (555) 123-4567', status: 'Confirmed', extras: 0, category: 'Work', dietary: 'None', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', checkedIn: true, assignedTableId: undefined },
        { id: 5, name: 'Candice Wu', role: '@candice', email: 'olivia@untitledui.com', phone: '+1 (555) 123-4567', status: 'Pending', extras: 0, category: 'Work', dietary: 'None', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', checkedIn: false, assignedTableId: undefined },
        { id: 6, name: 'Natali Craig', role: '@natali', email: 'olivia@untitledui.com', phone: '+1 (555) 123-4567', status: 'Pending', extras: 0, category: 'Work', dietary: 'None', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', checkedIn: false, assignedTableId: undefined },
        { id: 7, name: 'Drew Cano', role: '@drew', email: 'olivia@untitledui.com', phone: '+1 (555) 123-4567', status: 'Declined', extras: 0, category: 'Work', dietary: 'None', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', checkedIn: false, assignedTableId: undefined },
        { id: 8, name: 'Orlando Diggs', role: '@orlando', email: 'olivia@untitledui.com', phone: '+1 (555) 123-4567', status: 'Declined', extras: 0, category: 'Work', dietary: 'None', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', checkedIn: false, assignedTableId: undefined },
        { id: 9, name: 'Andi Lane', role: '@andi', email: 'olivia@untitledui.com', phone: '+1 (555) 123-4567', status: 'Pending', extras: 0, category: 'Work', dietary: 'None', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', checkedIn: false, assignedTableId: undefined },
        { id: 10, name: 'Kate Morrison', role: '@kate', email: 'olivia@untitledui.com', phone: '+1 (555) 123-4567', status: 'Declined', extras: 0, category: 'Work', dietary: 'None', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', checkedIn: false, assignedTableId: undefined },
    ]);

    const handleToggleCheckIn = (guestId: number) => {
        setGuests((prev: any[]) => prev.map((g: any) => g.id === guestId ? { ...g, checkedIn: !g.checkedIn } : g));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Declined': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Family': return 'bg-purple-100 text-purple-700';
            case 'Friend': return 'bg-blue-100 text-blue-700';
            case 'Work': return 'bg-indigo-100 text-indigo-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F6F8] dark:bg-gray-900 pb-12">
            <PageHeader
                breadcrumb="Guests"
                title={activeTab}
                subtitle="Track every detail of your guest invitations and seating"
                actions={
                    <div className="flex gap-4">
                        <button className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Export
                        </button>
                        <button
                            onClick={() => setIsAddGuestModalOpen(true)}
                            className="px-8 py-4 bg-[#D0771E] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg dark:shadow-none flex items-center gap-2 transform active:scale-95"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Add Guests
                        </button>
                    </div>
                }
            />

            <div className="mb-10">
                <PremiumTabs
                    tabs={[
                        { id: 'Guest List', label: 'Guest List' },
                        { id: 'RSVP', label: 'RSVP' },
                        { id: 'Seating Chart', label: 'Seating Chart' },
                        { id: 'Guest Analytics', label: 'Guest Analytics' },
                        { id: 'Check-ins', label: 'Check-ins' }
                    ]}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                    className="border-none"
                />
            </div>

            {/* Stats Grid - Always visible? Or only on Guest List? Design implies always vs tab content. Let's keep it above for now unless tab changes layout drastically */}
            {activeTab === 'Guest List' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                    {stats.map((stat, idx) => (
                        <StatCard
                            key={idx}
                            label={stat.label}
                            value={stat.value}
                            icon={<PlusIcon className="w-5 h-5" />}
                            iconBgColor="bg-orange-50"
                        />
                    ))}
                    {/* Invitation Link Card */}
                    <PremiumCard className="bg-[#FFF8F3]/50 dark:bg-orange-900/10 border-[#FADEC9]/50 dark:border-orange-800/30 flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Invitation Link</span>
                            <DocumentDuplicateIcon className="w-4 h-4 text-[#D0771E] cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 border border-[#FADEC9] dark:border-orange-800/30 rounded-xl px-4 py-2 text-[10px] font-black text-[#D0771E] truncate tracking-widest uppercase">
                            Ariya.com/Invitation
                        </div>
                    </PremiumCard>
                </div>
            )}

            {/* Guest List Content */}
            {activeTab === 'Guest List' && (
                <PremiumCard hover={false} className="border-none shadow-2xl dark:shadow-none p-0 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex flex-col sm:flex-row gap-6 justify-between items-center">
                        <div className="flex gap-4 w-full sm:w-auto">
                            <PremiumSearch
                                placeholder="Search guests..."
                                className="max-w-xs"
                            />
                            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                                <FunnelIcon className="w-4 h-4" />
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Table Header Section */}
                    <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Main Guest Guest List</h2>
                            <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-purple-100/50 dark:border-purple-800/30">1,500 Guests</span>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#FCFCFC] dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700 font-inter">
                                <tr>
                                    <th className="px-8 py-5 w-10 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">
                                        <input type="checkbox" className="w-4 h-4 rounded border-[#D9D9D9] dark:border-gray-600 text-[#D0771E] focus:ring-[#D0771E]" />
                                    </th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Name</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Contact</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest text-center">Extras</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest text-center">Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Dietary</th>
                                    <th className="px-8 py-5 w-24"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-700 font-inter">
                                {guests.map((guest: any) => (
                                    <tr key={guest.id} className="hover:bg-[#FCFCFC] dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <input type="checkbox" className="w-4 h-4 rounded border-[#D9D9D9] dark:border-gray-600 text-[#D0771E] focus:ring-[#D0771E]" />
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <img src={guest.avatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm dark:shadow-none" />
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900 dark:text-white">{guest.name}</div>
                                                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest">{guest.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="text-xs font-bold text-gray-600 dark:text-gray-300">{guest.email}</div>
                                            <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-0.5">{guest.phone}</div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={`inline-flex items-center px-3 py-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(guest.status)}`}>
                                                {guest.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center text-sm font-black text-gray-700 dark:text-white">
                                            {guest.extras}
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getCategoryColor(guest.category)}`}>
                                                {guest.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-xs font-bold text-gray-500 dark:text-gray-400">
                                            {guest.dietary}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-[#D0771E] hover:bg-orange-50 rounded-lg transition-colors">
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <ChevronLeftIcon className="w-4 h-4" />
                            Previous
                        </button>
                        <div className="hidden sm:flex gap-2 text-sm">
                            <button className="px-3 py-1 rounded bg-gray-100 text-gray-900 font-medium">1</button>
                            <button className="px-3 py-1 rounded text-gray-600 hover:bg-gray-50">2</button>
                            <button className="px-3 py-1 rounded text-gray-600 hover:bg-gray-50">3</button>
                            <span className="px-2 py-1 text-gray-400">...</span>
                            <button className="px-3 py-1 rounded text-gray-600 hover:bg-gray-50">8</button>
                            <button className="px-3 py-1 rounded text-gray-600 hover:bg-gray-50">9</button>
                            <button className="px-3 py-1 rounded text-gray-600 hover:bg-gray-50">10</button>
                        </div>
                        <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Next
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                </PremiumCard>
            )}

            {/* RSVP Content */}
            {activeTab === 'RSVP' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PremiumCard hover={false} className="border-none shadow-2xl shadow-gray-100/50 flex flex-col items-center">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">RSVP Status Breakdown</h3>
                            <div className="w-56 h-56 relative">
                                <Doughnut
                                    data={{
                                        labels: ['Confirmed', 'Declined', 'Pending'],
                                        datasets: [{
                                            data: [1200, 300, 100],
                                            backgroundColor: ['#D0771E', '#1D2939', '#FADEC9'],
                                            borderWidth: 0,
                                            hoverOffset: 10,
                                            borderRadius: 4
                                        }]
                                    }}
                                    options={{
                                        cutout: '80%',
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: {
                                                backgroundColor: '#1D2939',
                                                titleFont: { size: 10, weight: 'bold', family: 'Inter' },
                                                bodyFont: { size: 10, family: 'Inter' },
                                                padding: 16,
                                                cornerRadius: 12,
                                                displayColors: false
                                            }
                                        }
                                    }}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <div className="text-3xl font-black text-gray-900 tracking-tighter">1,500</div>
                                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Total RSVP</div>
                                </div>
                            </div>
                            <div className="mt-10 space-y-4 w-full">
                                <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#D0771E]"></div>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Confirmed</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-900">1,200</span>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#1D2939]"></div>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Declined</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-900">300</span>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#FADEC9]"></div>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pending</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-900">100</span>
                                </div>
                            </div>
                        </PremiumCard>
                        <PremiumCard hover={false} className="md:col-span-2 border-none shadow-2xl shadow-gray-100/50 p-10 font-sans">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">Recent Responses Flow</h3>
                            <div className="space-y-6">
                                {guests.filter((g: any) => g.status !== 'Pending').slice(0, 5).map((guest: any) => (
                                    <div key={guest.id} className="flex items-center justify-between p-6 bg-gray-50/30 rounded-3xl border border-gray-50/50 hover:bg-orange-50/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <img src={guest.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt="" />
                                            <div>
                                                <div className="text-sm font-black text-gray-900">{guest.name}</div>
                                                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{guest.category}</div>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(guest.status)}`}>
                                            {guest.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </PremiumCard>
                    </div>
                </div>
            )}

            {/* Guest Analytics Content */}
            {activeTab === 'Guest Analytics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <PremiumCard hover={false} className="border-none shadow-2xl shadow-gray-100/50 p-10">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10 text-left">Category Distribution</h3>
                        <div className="h-64">
                            <Bar
                                data={{
                                    labels: ['Family', 'Friends', 'Work', 'VIP'],
                                    datasets: [{
                                        label: 'Guests',
                                        data: [450, 600, 300, 150],
                                        backgroundColor: '#D0771E',
                                        borderRadius: 12,
                                        barThickness: 32
                                    }]
                                }}
                                options={{
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: { beginAtZero: true, grid: { color: '#F2F4F7' }, ticks: { font: { size: 10, weight: 'bold' } } },
                                        x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } }
                                    }
                                }}
                            />
                        </div>
                    </PremiumCard>
                    <PremiumCard hover={false} className="border-none shadow-2xl shadow-gray-100/50 p-10">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10 text-left">Dietary Trends</h3>
                        <div className="h-64 flex items-center justify-center">
                            <Doughnut
                                data={{
                                    labels: ['None', 'Vegetarian', 'Gluten-free', 'Halal', 'Others'],
                                    datasets: [{
                                        data: [1000, 200, 150, 100, 50],
                                        backgroundColor: ['#1D2939', '#D0771E', '#FADEC9', '#475467', '#98A2B3'],
                                        borderWidth: 0,
                                        hoverOffset: 12,
                                        borderRadius: 4
                                    }]
                                }}
                                options={{
                                    cutout: '75%',
                                    plugins: {
                                        legend: {
                                            position: 'right' as const,
                                            labels: {
                                                boxWidth: 6,
                                                usePointStyle: true,
                                                padding: 24,
                                                font: { size: 10, weight: 'bold', family: 'Inter' }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </PremiumCard>
                </div>
            )}

            {/* Check-ins Content */}
            {activeTab === 'Check-ins' && (
                <PremiumCard hover={false} className="border-none shadow-2xl shadow-gray-100/50 p-0 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/10">
                        <div>
                            <h2 className="text-xl font-black text-[#1D2939] uppercase tracking-tight">On-site Check-in</h2>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Manage guest arrivals in real-time</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black text-[#D0771E]">
                                {guests.filter(g => g.checkedIn).length} / {guests.length}
                            </div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Attendance Rate</div>
                        </div>
                    </div>
                    <div className="overflow-x-auto text-left">
                        <table className="w-full">
                            <thead className="bg-[#FCFCFC] border-b border-gray-100">
                                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <th className="px-8 py-5">Guest</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {guests.map((guest: any) => (
                                    <tr key={guest.id} className="hover:bg-orange-50/20 transition-colors">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3 text-left">
                                                <img src={guest.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" alt="" />
                                                <div className="text-sm font-bold text-gray-900">{guest.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{guest.category}</td>
                                        <td className="px-8 py-4 text-center">
                                            {guest.checkedIn ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100/50">
                                                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                                                    Arrived
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending Arrival</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <button
                                                onClick={() => handleToggleCheckIn(guest.id)}
                                                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all transform active:scale-95 ${guest.checkedIn
                                                    ? 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                    : 'bg-[#1D2939] text-white hover:bg-black shadow-lg shadow-gray-200'
                                                    }`}
                                            >
                                                {guest.checkedIn ? 'Undo' : 'Check-In'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </PremiumCard>
            )}

            {/* Seating Chart Content */}
            {activeTab === 'Seating Chart' && (
                <PremiumCard hover={false} className="border-none shadow-2xl shadow-gray-100/50 p-0 h-[calc(100vh-280px)] overflow-hidden">
                    <SeatingChart
                        guests={guests.map((g: any) => ({ ...g, group: g.category }))}
                        tables={tables}
                        setTables={setTables}
                        setGuests={setGuests}
                    />
                </PremiumCard>
            )}

            {/* Modals */}
            <AddGuestModal isOpen={isAddGuestModalOpen} onClose={() => setIsAddGuestModalOpen(false)} />
        </div>
    );
};

export default Guests;
