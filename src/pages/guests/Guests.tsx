import { useState, useEffect } from 'react';
import {
    FunnelIcon,
    ArrowDownTrayIcon,
    PlusIcon,
    TrashIcon,
    PencilSquareIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DocumentDuplicateIcon,
    CheckBadgeIcon,
    ClockIcon,
    XCircleIcon,
    QrCodeIcon,
    MagnifyingGlassIcon,
    UserGroupIcon,
    MapPinIcon,
    CakeIcon,
    EnvelopeOpenIcon
} from '@heroicons/react/24/outline';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Filler
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';
import { PremiumSearch } from '../../components/ui/PremiumInput';
import AddGuestModal from '../../components/guests/AddGuestModal';
import SeatingChart from '../../components/guests/SeatingChart';
import StatCard from '../../components/dashboard/StatCard';
import { api } from '@/api/client';
import type { AxiosResponse } from 'axios';

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
    PointElement,
    LineElement,
    Title,
    Filler
);

const Guests = () => {
    const [activeTab, setActiveTab] = useState('Guest List');
    const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
    const [checkInSearch, setCheckInSearch] = useState('');

    // Seating State
    const [tables, setTables] = useState<Table[]>([
        { id: 't1', name: 'Premium Row', type: 'round', capacity: 8, guestIds: [], x: 200, y: 150 },
        { id: 't2', name: 'Family Table', type: 'rectangle', capacity: 8, guestIds: [], x: 600, y: 150 },
    ]);

    // Mock Stats
    const stats = [
        { label: 'Total Invitees', value: '1,500', color: 'text-[#D0771E]' },
        { label: 'Confirmed', value: '1,200', color: 'text-green-600' },
        { label: 'Waitlist', value: '45', color: 'text-gray-500' },
        { label: 'Declined', value: '300', color: 'text-red-500' },
    ];

    // Mock Guest Data
    const [guests, setGuests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.events.eventsControllerFindAll()
            .then((res: AxiosResponse<any>) => {
                const events = (res.data as unknown) as any[];
                if (events && events.length > 0) {
                    const id = events[0].id;
                    return Promise.all([
                        api.events.guestsControllerFindAll(id),
                        api.events.seatingControllerGetTables(id)
                    ]);
                }
                return Promise.resolve(null);
            })
            .then((results: any) => {
                if (results) {
                    const [guestRes, tableRes] = results;
                    if (guestRes.data) setGuests((guestRes.data as unknown) as any[]);
                    if (tableRes.data) setTables((tableRes.data as unknown) as Table[]);
                }
            })
            .catch(err => console.error('Failed to fetch guests/tables', err))
            .finally(() => setLoading(false));
    }, []);

    const handleToggleCheckIn = (guestId: number) => {
        setLoading(true);
        api.events.eventsControllerFindAll()
            .then((res: AxiosResponse<any>) => {
                const events = (res.data as unknown) as any[];
                if (events[0]) {
                    // Find guest to get current checkedIn status
                    const guest = guests.find((g: any) => g.id === guestId);
                    if (guest) {
                        return api.events.guestsControllerUpdate(events[0].id, guestId.toString(), { checkedIn: !guest.checkedIn } as any);
                    }
                }
            })
            .then((res: AxiosResponse<any>) => {
                if (res?.data) {
                    const updatedGuest = (res.data as unknown) as any;
                    setGuests((prev: any[]) => prev.map((g: any) => g.id === guestId ? updatedGuest : g));
                }
            })
            .catch(err => console.error('Check-in toggle failed', err))
            .finally(() => setLoading(false));
    };

    // Filter guests for Check-in search
    const filteredCheckInGuests = guests.filter(g =>
        g.name.toLowerCase().includes(checkInSearch.toLowerCase()) ||
        g.role.toLowerCase().includes(checkInSearch.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400';
            case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400';
            case 'Declined': return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Family': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400';
            case 'Friend': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400';
            case 'Work': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
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
                        { id: 'RSVP', label: 'RSVP Tracker' },
                        { id: 'Seating Chart', label: 'Seating Chart' },
                        { id: 'Guest Analytics', label: 'Analytics' },
                        { id: 'Check-ins', label: 'Concierge Check-in' }
                    ]}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                    className="border-none"
                />
            </div>

            {/* Guest List Content */}
            {activeTab === 'Guest List' && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                        {stats.map((stat, idx) => (
                            <StatCard
                                key={idx}
                                label={stat.label}
                                value={stat.value}
                                icon={<PlusIcon className="w-5 h-5" />}
                                iconBgColor="bg-orange-50 dark:bg-orange-900/20"
                            />
                        ))}
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

                    <PremiumCard hover={false} className="border-none shadow-2xl dark:shadow-none p-0 overflow-hidden">
                        {/* Toolbar */}
                        <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between items-stretch sm:items-center">
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
                                <h2 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Master Guest List</h2>
                                <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-purple-100/50 dark:border-purple-800/30">{guests.length} Guests</span>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-[1000px] w-full text-left">
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
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(guest.status)}`}>
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
                    </PremiumCard>
                </>
            )}

            {/* RSVP Content */}
            {activeTab === 'RSVP' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <PremiumCard className="p-6 dark:bg-gray-800 border-none">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
                                    <EnvelopeOpenIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Sent</p>
                                    <h3 className="text-2xl font-black text-[#1D2939] dark:text-white">1,500</h3>
                                    <p className="text-[10px] font-bold text-green-500 mt-1">100% Delivered</p>
                                </div>
                            </div>
                        </PremiumCard>
                        <PremiumCard className="p-6 dark:bg-gray-800 border-none">
                            <div className="flex gap-4">
                                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-2xl text-green-600 dark:text-green-400">
                                    <CheckBadgeIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Accepted</p>
                                    <h3 className="text-2xl font-black text-[#1D2939] dark:text-white">1,200</h3>
                                    <p className="text-[10px] font-bold text-green-500 mt-1">80% Response Rate</p>
                                </div>
                            </div>
                        </PremiumCard>
                        <PremiumCard className="p-6 dark:bg-gray-800 border-none">
                            <div className="flex gap-4">
                                <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-2xl text-[#D0771E] dark:text-orange-400">
                                    <ClockIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Pending</p>
                                    <h3 className="text-2xl font-black text-[#1D2939] dark:text-white">100</h3>
                                    <p className="text-[10px] font-bold text-orange-500 mt-1">ACTION NEEDED</p>
                                </div>
                            </div>
                        </PremiumCard>
                        <PremiumCard className="p-6 dark:bg-gray-800 border-none">
                            <div className="flex gap-4">
                                <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-2xl text-red-600 dark:text-red-400">
                                    <XCircleIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Declined</p>
                                    <h3 className="text-2xl font-black text-[#1D2939] dark:text-white">200</h3>
                                    <p className="text-[10px] font-bold text-gray-400 mt-1">13% Total</p>
                                </div>
                            </div>
                        </PremiumCard>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Chart */}
                        <PremiumCard className="lg:col-span-2 p-10 dark:bg-gray-800 border-none min-h-[400px]">
                            <h3 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-widest mb-8">Response Timeline</h3>
                            <div className="h-[300px]">
                                <Line
                                    data={{
                                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                                        datasets: [
                                            {
                                                label: 'Responses',
                                                data: [50, 150, 400, 800, 1200],
                                                borderColor: '#D0771E',
                                                backgroundColor: 'rgba(208, 119, 30, 0.1)',
                                                fill: true,
                                                tension: 0.4
                                            }
                                        ]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } },
                                        scales: {
                                            y: {
                                                grid: { color: 'rgba(0,0,0,0.05)' },
                                                ticks: { font: { weight: 'bold' } }
                                            },
                                            x: {
                                                grid: { display: false },
                                                ticks: { font: { weight: 'bold' } }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </PremiumCard>

                        {/* Recent Activity Feed */}
                        <PremiumCard className="p-0 overflow-hidden dark:bg-gray-800 border-none h-[470px]">
                            <div className="p-8 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                <h3 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Live Activity</h3>
                            </div>
                            <div className="h-[380px] overflow-y-auto p-6 space-y-6">
                                {guests.slice(0, 6).map((guest, i) => (
                                    <div key={i} className="flex gap-4 items-start animate-in slide-in-from-right-4" style={{ animationDelay: `${i * 100}ms` }}>
                                        <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${guest.status === 'Confirmed' ? 'bg-green-500' : guest.status === 'Declined' ? 'bg-red-500' : 'bg-orange-500'}`} />
                                        <div>
                                            <p className="text-xs font-bold text-[#1D2939] dark:text-white">
                                                <span className="font-black">{guest.name}</span> {guest.status === 'Confirmed' ? 'accepted invitation' : 'updated RSVP'}
                                            </p>
                                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1">2 mins ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PremiumCard>
                    </div>
                </div>
            )}

            {/* Guest Analytics Content */}
            {activeTab === 'Guest Analytics' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Breakdown 1: Category */}
                        <PremiumCard className="p-8 dark:bg-gray-800 border-none">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-[#D0771E]">
                                    <UserGroupIcon className="w-5 h-5" />
                                </div>
                                <h3 className="text-xs font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Guest Composition</h3>
                            </div>
                            <div className="h-64 relative">
                                <Doughnut
                                    data={{
                                        labels: ['Family', 'Friends', 'Colleagues', 'VIP'],
                                        datasets: [{
                                            data: [450, 600, 300, 150],
                                            backgroundColor: ['#D0771E', '#1D2939', '#FADEC9', '#EAECF0'],
                                            borderWidth: 0,
                                            hoverOffset: 10,
                                            borderRadius: 4
                                        }]
                                    }}
                                    options={{ cutout: '70%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { size: 10, weight: 'bold' } } } } }}
                                />
                            </div>
                        </PremiumCard>

                        {/* Breakdown 2: Meals */}
                        <PremiumCard className="p-8 dark:bg-gray-800 border-none">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600">
                                    <CakeIcon className="w-5 h-5" />
                                </div>
                                <h3 className="text-xs font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Dietary Requirements</h3>
                            </div>
                            <div className="h-64">
                                <Bar
                                    data={{
                                        labels: ['Standard', 'Vegan', 'GF', 'Halal', 'Nut-Free'],
                                        datasets: [{
                                            label: 'Guests',
                                            data: [850, 120, 80, 150, 45],
                                            backgroundColor: '#1D2939',
                                            borderRadius: 8,
                                            barThickness: 24
                                        }]
                                    }}
                                    options={{
                                        plugins: { legend: { display: false } },
                                        scales: {
                                            x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } },
                                            y: { display: false }
                                        }
                                    }}
                                />
                            </div>
                        </PremiumCard>

                        {/* Breakdown 3: Locations */}
                        <PremiumCard className="p-8 dark:bg-gray-800 border-none">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                                    <MapPinIcon className="w-5 h-5" />
                                </div>
                                <h3 className="text-xs font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Geographic Distribution</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { loc: 'Lagos, NG', val: '65%', color: 'bg-[#D0771E]' },
                                    { loc: 'London, UK', val: '20%', color: 'bg-[#1D2939]' },
                                    { loc: 'New York, USA', val: '10%', color: 'bg-gray-400' },
                                    { loc: 'Others', val: '5%', color: 'bg-gray-200' },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white">
                                            <span>{item.loc}</span>
                                            <span>{item.val}</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color}`} style={{ width: item.val }}></div>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-4 text-center">
                                    <button className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest hover:underline">View Full Map Report</button>
                                </div>
                            </div>
                        </PremiumCard>
                    </div>
                </div>
            )}

            {/* Check-ins Content */}
            {activeTab === 'Check-ins' && (
                <div className="animate-in fade-in duration-500">
                    <div className="bg-[#1D2939] dark:bg-black rounded-[40px] p-10 text-white mb-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D0771E] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
                            <div className="w-full md:w-1/2 space-y-8">
                                <div>
                                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Concierge Check-in Mode</h2>
                                    <p className="text-sm font-medium text-gray-400">Manage guest arrivals in real-time. Use the scanner for QR passes.</p>
                                </div>

                                <div className="relative">
                                    <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search guest name or ticket ID..."
                                        value={checkInSearch}
                                        onChange={(e) => setCheckInSearch(e.target.value)}
                                        className="w-full h-20 pl-16 pr-6 rounded-3xl bg-white/10 border-2 border-white/10 focus:border-[#D0771E] focus:bg-white/20 text-xl font-bold placeholder:text-gray-500 transition-all text-white"
                                    />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#D0771E] rounded-2xl hover:scale-105 active:scale-95 transition-all">
                                        <QrCodeIcon className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-8 text-center bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                                <div>
                                    <div className="text-4xl font-black">{guests.filter(g => g.checkedIn).length}</div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Checked In</div>
                                </div>
                                <div className="w-px bg-white/10"></div>
                                <div>
                                    <div className="text-4xl font-black text-gray-500">{guests.length - guests.filter(g => g.checkedIn).length}</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Pending</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCheckInGuests.map((guest: any) => (
                            <div key={guest.id} className={`p-6 rounded-3xl border cursor-pointer transition-all group ${guest.checkedIn
                                ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30'
                                : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-[#D0771E]/50'
                                }`}
                                onClick={() => handleToggleCheckIn(guest.id)}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <img src={guest.avatar} className={`w-14 h-14 rounded-full object-cover border-4 ${guest.checkedIn ? 'border-green-200' : 'border-gray-100 dark:border-gray-700'}`} alt="" />
                                        <div>
                                            <h3 className="text-lg font-black text-[#1D2939] dark:text-white leading-tight">{guest.name}</h3>
                                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{guest.category}</p>
                                        </div>
                                    </div>
                                    {guest.checkedIn && (
                                        <div className="p-2 bg-green-500 rounded-full text-white">
                                            <CheckBadgeIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Table {Math.floor(Math.random() * 20) + 1}</span>
                                    <button className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${guest.checkedIn
                                        ? 'bg-transparent text-green-700 dark:text-green-500'
                                        : 'bg-[#1D2939] text-white group-hover:bg-[#D0771E]'
                                        }`}>
                                        {guest.checkedIn ? 'Arrived 10:42 AM' : 'Tap to Check-In'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Seating Chart Content */}
            {activeTab === 'Seating Chart' && (
                <PremiumCard hover={false} className="border-none shadow-2xl dark:shadow-none p-0 h-[calc(100vh-280px)] overflow-hidden">
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
