import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CalendarDaysIcon,
    PlusIcon,
    SparklesIcon,
    MapPinIcon,
    UserGroupIcon,
    ClockIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';
import { PremiumSearch } from '../../components/ui/PremiumInput';
import AIPlannerModal from '../../components/events/AIPlannerModal';

const EventList = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('My Events');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);

    const events = [
        {
            id: 1,
            title: "Ade's 30th Birthday Bash",
            type: "Birthday Party",
            date: "OCT 24, 2024",
            time: "7:00 PM",
            location: "Lagos Oriental Hotel",
            guests: 150,
            status: "Planning",
            progress: 65,
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Tech Conference 2024",
            type: "Corporate",
            date: "NOV 15, 2024",
            time: "9:00 AM",
            location: "Eko Convention Centre",
            guests: 500,
            status: "Confirmed",
            progress: 85,
            image: "https://images.unsplash.com/photo-1540575467063-178a5093dffd?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Wedding Anniversary",
            type: "Social",
            date: "DEC 10, 2024",
            time: "6:00 PM",
            location: "Civic Centre, VI",
            guests: 80,
            status: "Draft",
            progress: 20,
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2698&auto=format&fit=crop"
        }
    ];

    const aiFeatures = [
        { text: "Smart Budget Allocation" },
        { text: "Automated Vendor Matching" },
        { text: "Intelligent Timeline Creator" },
        { text: "Guest List Management" }
    ];

    const manualFeatures = [
        { text: "Full Custom Control" },
        { text: "Direct Vendor Chat" },
        { text: "Custom Contract Builder" },
        { text: "Manual Budget Tracking" }
    ];

    const handleGenerate = (formData: any) => {
        console.log('Generating event with data:', formData);
        setIsAIModalOpen(false);
        // Navigate to the new event or dashboard with state
        navigate('/events/ai-dashboard', { state: { eventData: formData } });
    };

    return (
        <div className="max-w-[1600px] mx-auto pb-20">
            <div className="w-full px-8">
                {/* Header */}
                <PageHeader
                    breadcrumb="Guests"
                    title="My Events"
                    subtitle="Manage and track all your celebrations"
                    actions={
                        <button
                            onClick={() => setActiveTab('Create Event')}
                            className="bg-[#262626] dark:bg-gray-800 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-gray-700 transition-all shadow-lg dark:shadow-none flex items-center gap-2 transform active:scale-95"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Create New Event
                        </button>
                    }
                />

                {/* Tabs */}
                <PremiumTabs
                    tabs={[
                        { id: 'My Events', label: 'My Events' },
                        { id: 'Create Event', label: 'Create Event' },
                        { id: 'Archived', label: 'Archived' }
                    ]}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                {/* Content */}
                {activeTab === 'Create Event' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-8">

                        {/* AI Planner Card */}
                        <PremiumCard className="relative overflow-hidden !bg-[#262626] dark:bg-gray-800 border-none p-10 min-h-[500px] flex flex-col justify-between shadow-2xl dark:shadow-none group">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D0771E] opacity-10 blur-[80px] rounded-full transform translate-x-1/3 -translate-y-1/3 group-hover:opacity-20 transition-all duration-700" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl !bg-white/10 dark:bg-gray-700/50 backdrop-blur-md flex items-center justify-center mb-8 border border-white/10 dark:border-gray-600 group-hover:scale-110 transition-transform duration-500 shadow-xl dark:shadow-none">
                                    <SparklesIcon className="w-8 h-8 text-[#D0771E]" />
                                </div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
                                    AI Event Planner
                                </h3>
                                <p className="text-sm font-medium text-gray-400 dark:text-gray-400 mb-8 leading-relaxed max-w-xs">
                                    Let our advanced AI design your perfect event with personalized recommendations and smart budgeting.
                                </p>

                                <ul className="space-y-4">
                                    {aiFeatures.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-xs font-bold text-gray-300 dark:text-gray-300 uppercase tracking-wide group/item">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D0771E] mr-3 group-hover/item:scale-150 transition-transform" />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => setIsAIModalOpen(true)}
                                className="relative z-10 w-full py-5 bg-[#D0771E] hover:bg-[#b56415] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg dark:shadow-none mt-8 flex items-center justify-center gap-2"
                            >
                                <SparklesIcon className="w-4 h-4" />
                                Launch AI Planner
                            </button>
                        </PremiumCard>

                        {/* Manual Planning Card */}
                        <PremiumCard className="relative overflow-hidden bg-white dark:bg-gray-800 p-10 min-h-[500px] flex flex-col justify-between group border-gray-100 dark:border-gray-700">
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-8 shadow-sm dark:shadow-none group-hover:scale-110 transition-transform duration-500">
                                    <CalendarDaysIcon className="w-8 h-8 text-gray-900 dark:text-white" />
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-4">
                                    Manual Planning
                                </h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8 leading-relaxed max-w-xs">
                                    Take full control and build every aspect of your event from the ground up with our pro tools.
                                </p>

                                <ul className="space-y-4">
                                    {manualFeatures.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide group/item">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mr-3 group-hover/item:bg-[#D0771E] transition-colors" />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => navigate('/events/create')}
                                className="relative z-10 w-full py-5 bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all mt-8 flex items-center justify-center gap-2"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Start From Scratch
                            </button>
                        </PremiumCard>

                    </div>
                ) : (
                    <div>
                        {/* Search & Filter Toolbar */}
                        <PremiumCard className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 p-6 border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none">
                            <div className="flex gap-4 items-center w-full md:w-auto flex-1 max-w-xl">
                                <PremiumSearch
                                    placeholder="SEARCH YOUR EVENTS..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full"
                                />
                                <button className="h-[48px] px-6 bg-gray-50 dark:bg-gray-800 rounded-2xl text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center gap-2 border border-gray-100 dark:border-gray-700 whitespace-nowrap">
                                    <AdjustmentsHorizontalIcon className="w-4 h-4" />
                                    Filter list
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-400">Sort by:</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#D0771E] cursor-pointer">Date Created</span>
                            </div>
                        </PremiumCard>

                        {/* Events Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event) => (
                                <PremiumCard
                                    key={event.id}
                                    className="group overflow-hidden border-gray-100 dark:border-gray-700 hover:border-orange-100/50 dark:hover:border-orange-900/30 transition-all duration-500 hover:shadow-xl dark:hover:shadow-none cursor-pointer"
                                    onClick={() => navigate(`/events/${event.id}`)}
                                >
                                    {/* Image Section */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gray-900/10 dark:bg-gray-900/20 group-hover:bg-gray-900/0 transition-colors z-10" />
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className={`
                                                px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-lg dark:shadow-none
                                                ${event.status === 'Confirmed' ? 'bg-green-500/90 dark:bg-green-600 text-white' :
                                                    event.status === 'Planning' ? 'bg-[#D0771E]/90 dark:bg-[#D0771E] text-white' :
                                                        'bg-gray-500/90 dark:bg-gray-600 text-white'}
                                            `}>
                                                {event.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-[9px] font-black text-[#D0771E] uppercase tracking-widest bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-md border border-orange-100 dark:border-orange-800">
                                                {event.type}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2 group-hover:text-[#D0771E] transition-colors line-clamp-1">
                                            {event.title}
                                        </h3>

                                        <div className="space-y-3 mb-8">
                                            <div className="flex items-center gap-3 text-xs font-bold text-gray-500 dark:text-gray-400">
                                                <CalendarDaysIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-bold text-gray-500 dark:text-gray-400">
                                                <ClockIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                {event.time}
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-bold text-gray-500 dark:text-gray-400">
                                                <MapPinIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                {event.location}
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-bold text-gray-500 dark:text-gray-400">
                                                <UserGroupIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                {event.guests} Guests
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div>
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-[9px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Planning Progress</span>
                                                <span className="text-[10px] font-black text-gray-900 dark:text-white">{event.progress}%</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#D0771E] rounded-full transition-all duration-1000 ease-out group-hover:bg-amber-600"
                                                    style={{ width: `${event.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </PremiumCard>
                            ))}

                            {/* Add New Card (in grid) */}
                            <PremiumCard
                                className="group flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-[#D0771E] transition-all cursor-pointer bg-gray-50/50 dark:bg-gray-800/50 hover:bg-orange-50/10 dark:hover:bg-orange-900/10 min-h-[400px]"
                                onClick={() => setActiveTab('Create Event')}
                            >
                                <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 shadow-sm dark:shadow-none flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <PlusIcon className="w-6 h-6 text-gray-400 dark:text-gray-400 group-hover:text-[#D0771E] transition-colors" />
                                </div>
                                <h3 className="text-lg font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2 group-hover:text-[#D0771E] transition-colors">Start New Event</h3>
                                <p className="text-xs text-gray-400 dark:text-gray-400 font-bold text-center max-w-[200px]">Create a new event plan from scratch or use AI</p>
                            </PremiumCard>
                        </div>
                    </div>
                )}
            </div>

            <AIPlannerModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                onGenerate={handleGenerate}
            />
        </div>
    );
};

export default EventList;