import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { PencilSquareIcon, CheckCircleIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { PlusIcon } from '@heroicons/react/24/outline';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';
import { Button } from '../../components/ui/Button';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Vendor {
    id: number;
    category: string;
    name: string;
    cost: number;
    status: 'locked' | 'pending' | 'recommended';
    rating: number;
    reviews: number;
}

const AIEventDashboard = () => {
    const location = useLocation();
    const eventData = location.state?.eventData || {};
    const [activeTab, setActiveTab] = useState('Overview');
    const [showEditModal, setShowEditModal] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [visionPrompt, setVisionPrompt] = useState(`An elegant wedding for ${eventData.guestCount || 150} guests in ${eventData.location || "Lagos"} on ${eventData.eventDate || "June 15, 2025"}. I want to maintain a premium feel while optimizing for cultural elements.`);

    const [suggestions, setSuggestions] = useState([
        { id: 1, title: 'Garden Ceremony & Ballroom Reception', desc: 'Perfect blend of outdoor romance and indoor elegance' },
        { id: 2, title: 'Waterfront Sunset Wedding', desc: 'Stunning Lagos lagoon backdrop for unforgettable photos' }
    ]);

    // Default values falling back to eventData or defaults
    const [eventName] = useState(eventData.eventName || "Tosin & John's Wedding");
    const [guestCount] = useState(eventData.guestCount || 150);
    const [eventDate] = useState(eventData.eventDate || "June 15, 2025");
    const [eventLocation] = useState(eventData.location || "Lagos");

    // Dynamic State
    const [totalBudget, setTotalBudget] = useState<number>(100000000); // Default 100M
    const [budgetInput, setBudgetInput] = useState<string>("100000000");

    // Mock Vendors Data
    const [vendors, setVendors] = useState<Vendor[]>([
        { id: 1, category: 'Venue', name: 'Grand Ballroom Lagos', cost: 35000000, status: 'recommended', rating: 4.9, reviews: 40 },
        { id: 2, category: 'Venue', name: 'Eko Convention Centre', cost: 45000000, status: 'recommended', rating: 4.8, reviews: 120 },
        { id: 3, category: 'Venue', name: 'Civic Centre', cost: 30000000, status: 'recommended', rating: 4.7, reviews: 85 },
        { id: 4, category: 'Catering', name: 'Tastee Fried Chicken', cost: 25000000, status: 'recommended', rating: 4.5, reviews: 200 },
        { id: 5, category: 'Catering', name: 'Kilimanjaro', cost: 20000000, status: 'recommended', rating: 4.4, reviews: 150 },
        { id: 6, category: 'Decor', name: 'Events by Clara', cost: 15000000, status: 'recommended', rating: 4.9, reviews: 60 },
        { id: 7, category: 'Decor', name: 'Royal Decorations', cost: 12000000, status: 'recommended', rating: 4.6, reviews: 45 },
        { id: 8, category: 'Photography', name: 'Lens Queen Studios', cost: 10000000, status: 'recommended', rating: 4.9, reviews: 90 },
        { id: 9, category: 'Photography', name: 'Capture Moments', cost: 8000000, status: 'recommended', rating: 4.7, reviews: 55 },
        { id: 10, category: 'Entertainment', name: 'DJ Spinall', cost: 10000000, status: 'recommended', rating: 5.0, reviews: 300 },
        { id: 11, category: 'Entertainment', name: 'Live Band X', cost: 5000000, status: 'recommended', rating: 4.6, reviews: 40 },
    ]);

    // Categories and their recommended percentage allocation
    const allocationRules: Record<string, number> = {
        'Venue': 0.35,
        'Catering': 0.25,
        'Decor': 0.15,
        'Photography': 0.10,
        'Entertainment': 0.10,
        'Transportation': 0.05
    };

    // Calculate Allocations based on Total Budget
    const allocations = useMemo(() => {
        const result: Record<string, number> = {};
        Object.keys(allocationRules).forEach(key => {
            result[key] = totalBudget * allocationRules[key];
        });
        return result;
    }, [totalBudget]);

    // Calculate Actual Spend (Locked Vendors)
    const lockedVendors = useMemo(() => vendors.filter(v => v.status === 'locked'), [vendors]);
    const actualSpend = useMemo(() => lockedVendors.reduce((sum, v) => sum + v.cost, 0), [lockedVendors]);
    const remainingBudget = totalBudget - actualSpend;

    // Toggle Vendor Lock Status (Ensure only one locked per category)
    const toggleLockVendor = (vendorId: number) => {
        setVendors(prev => {
            const targetVendor = prev.find(v => v.id === vendorId);
            if (!targetVendor) return prev;

            const isLocking = targetVendor.status !== 'locked'; // We are about to lock it
            const category = targetVendor.category;

            return prev.map(v => {
                // If we are locking this vendor, unlock any other locked vendor in the same category
                if (isLocking && v.category === category && v.id !== vendorId && v.status === 'locked') {
                    return { ...v, status: 'recommended' };
                }
                // Update the target vendor
                if (v.id === vendorId) {
                    return { ...v, status: isLocking ? 'locked' : 'recommended' };
                }
                return v;
            });
        });
    };

    // Handle AI Regeneration
    const handleUpdatePlan = (newPrompt?: string) => {
        setIsRegenerating(true);
        if (newPrompt) setVisionPrompt(newPrompt);

        // Simulate AI Thinking
        setTimeout(() => {
            const scenarios = [
                [
                    { id: 101, title: 'Boutique Art Gallery Affair', desc: 'Intimate, sophisticated setting for modern couples.' },
                    { id: 102, title: 'Penthouse Skyline Celebration', desc: 'Panoramic city views with minimalist decor.' }
                ],
                [
                    { id: 201, title: 'Traditional Royal Palace Gala', desc: 'Rich cultural heritage meets grand scale luxury.' },
                    { id: 202, title: 'Estate Heritage Grounds', desc: 'Classic architecture with sprawling manicured gardens.' }
                ]
            ];

            setSuggestions(scenarios[Math.floor(Math.random() * scenarios.length)]);
            setIsRegenerating(false);
            setShowEditModal(false);
        }, 2000);
    };

    // Handle Budget Update
    const handleBudgetUpdate = () => {
        const value = parseInt(budgetInput.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(value) && value > 0) {
            setTotalBudget(value);
            // Re-shuffle vendors based on budget tier
            setVendors(prev => [...prev].sort(() => Math.random() - 0.5));
        }
    };

    // Chart Data Construction
    const chartData = useMemo(() => {
        const labels = Object.keys(allocationRules);
        const dataValues = labels.map(label => allocations[label]);
        return {
            labels,
            datasets: [{
                data: dataValues,
                backgroundColor: ['#10B981', '#3B82F6', '#D946EF', '#F59E0B', '#8B5CF6', '#6B7280'],
                borderWidth: 0,
            }]
        };
    }, [allocations]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="max-w-[1600px] mx-auto pb-20 dark:bg-gray-900 transition-colors">
            <div className="w-full px-8">

                {/* Header */}
                <PageHeader
                    breadcrumb="Events"
                    title={eventName} // Dynamic
                    subtitle={`${eventDate} • ${guestCount} Guests • ${eventLocation}`} // Dynamic
                    actions={
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="h-[48px] px-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-[10px] font-black text-[#D0771E] uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2 dark:shadow-none"
                        >
                            <PencilSquareIcon className="w-4 h-4" />
                            Edit Details
                        </button>
                    }
                />

                {/* Edit Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2939]/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <PremiumCard className="w-full max-w-xl animate-in zoom-in-95 duration-300 bg-white dark:bg-gray-900 border-none shadow-2xl p-0 overflow-hidden">
                            <div className="px-10 py-10 bg-[#F3F0EB]/30 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1D2939] dark:text-white">Refine AI Prompt</h3>
                                <button onClick={() => setShowEditModal(false)} className="p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-colors">
                                    <PlusIcon className="w-6 h-6 rotate-45 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>
                            <div className="p-10 space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Your Vision</label>
                                    <textarea
                                        className="w-full h-40 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-medium text-[#1D2939] dark:text-white resize-none"
                                        placeholder="Describe any changes to your event vision..."
                                        value={visionPrompt}
                                        onChange={(e) => setVisionPrompt(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 h-14 rounded-2xl" onClick={() => setShowEditModal(false)}>Cancel</Button>
                                    <Button
                                        className="flex-1 h-14 rounded-2xl bg-[#D0771E] text-white"
                                        isDisabled={isRegenerating}
                                        onClick={() => handleUpdatePlan()}
                                    >
                                        {isRegenerating ? "Regenerating..." : "Update Plan"}
                                    </Button>
                                </div>
                            </div>
                        </PremiumCard>
                    </div>
                )}

                {/* Tabs */}
                <PremiumTabs
                    tabs={[
                        { id: 'Overview', label: 'Overview' },
                        { id: 'Budget Planning', label: 'Budget Planning' },
                        { id: 'Vendor Recommendation', label: 'Vendor Recommendation' },
                        { id: 'Cost Optimization', label: 'Cost Optimization' }
                    ]}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                {/* Content */}
                <div className="mt-8">
                    {/* OVERVIEW TAB */}
                    {activeTab === 'Overview' && (
                        <div className="space-y-8">
                            {/* Suggestions */}
                            <PremiumCard className="bg-gradient-to-r from-[#FFFBF0] dark:from-orange-900/20 to-white dark:to-gray-800 border-orange-100 dark:border-orange-900/30 p-8 shadow-orange-100/50 dark:shadow-none">
                                <h3 className="flex items-center text-lg font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">
                                    <SparklesIcon className="w-5 h-5 text-[#D0771E] mr-2" />
                                    AI Event Suggestions
                                </h3>
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wide">Based on your preferences for an elegant wedding with {guestCount} guests in {eventLocation}</p>

                                <div className="space-y-4 min-h-[160px] relative">
                                    {isRegenerating ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-[1px] rounded-2xl z-10">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-8 h-8 border-4 border-[#D0771E]/20 border-t-[#D0771E] rounded-full animate-spin"></div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[#D0771E]">Designing your vision...</span>
                                            </div>
                                        </div>
                                    ) : null}

                                    {suggestions.map((s) => (
                                        <div key={s.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-none transition-shadow cursor-pointer group">
                                            <h4 className="font-black text-gray-900 dark:text-white text-sm mb-1 uppercase tracking-tight group-hover:text-[#D0771E] transition-colors">{s.title}</h4>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{s.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </PremiumCard>

                            {/* Columns */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Planning Progress */}
                                <PremiumCard className="p-8">
                                    <h3 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Planning Progress</h3>
                                    <div className="space-y-4">
                                        {Object.keys(allocationRules).map((category, i) => {
                                            const isLocked = vendors.some(v => v.category === category && v.status === 'locked');
                                            return (
                                                <div key={i} className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                                    <span className="font-bold text-gray-700 dark:text-gray-300">{category}</span>
                                                    {isLocked ? (
                                                        <span className="flex items-center text-green-600 dark:text-green-400 font-black text-[10px] uppercase tracking-widest bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md border border-green-100 dark:border-green-800">
                                                            <LockClosedIcon className="w-3 h-3 mr-1" /> Locked
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 dark:text-gray-500 font-black text-[10px] uppercase tracking-widest bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">Pending</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </PremiumCard>

                                {/* Budget Overview */}
                                <PremiumCard className="p-8">
                                    <h3 className="font-black text-gray-900 dark:text-white mb-2 uppercase tracking-widest text-xs">Budget Overview</h3>
                                    <div className="text-4xl font-black text-[#D0771E] mb-1 tracking-tighter">{formatCurrency(totalBudget)}</div>
                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-8 uppercase tracking-widest">Total estimated budget</p>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                            <span className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide text-xs">Actual Spend (Locked)</span>
                                            <span className="font-black text-gray-900 dark:text-white">{formatCurrency(actualSpend)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                            <span className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide text-xs">Remaining Budget</span>
                                            <span className="font-black text-gray-900 dark:text-white">{formatCurrency(remainingBudget)}</span>
                                        </div>
                                    </div>
                                </PremiumCard>
                            </div>
                        </div>
                    )}

                    {/* BUDGET PLANNING TAB */}
                    {activeTab === 'Budget Planning' && (
                        <div className="space-y-8">
                            <PremiumCard className="p-8">
                                <div className="mb-8 max-w-md">
                                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Total Budget</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={budgetInput}
                                            onChange={(e) => setBudgetInput(e.target.value)}
                                            className="block w-full rounded-xl border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] text-sm font-bold py-3 px-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                        />
                                        <button
                                            onClick={handleBudgetUpdate}
                                            className="bg-[#262626] dark:bg-gray-700 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black dark:hover:bg-gray-600 transition-all shadow-lg dark:shadow-none shadow-gray-200"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Allocation Sliders */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Budget Allocation</h3>
                                            <span className="text-[10px] font-black text-[#D0771E] bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-full uppercase tracking-widest">AI Recommended</span>
                                        </div>
                                        <div className="space-y-6">
                                            {Object.keys(allocationRules).map((category, i) => (
                                                <div key={i} className="flex items-center gap-4 text-sm group">
                                                    <span className="w-24 font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide">{category}</span>
                                                    <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[#D0771E] group-hover:bg-amber-600 transition-colors" style={{ width: `${allocationRules[category] * 100}%` }}></div>
                                                    </div>
                                                    <span className="w-12 text-gray-400 dark:text-gray-500 font-bold text-xs">{(allocationRules[category] * 100).toFixed(0)}%</span>
                                                    <span className="w-28 font-black text-gray-900 dark:text-white text-right text-xs uppercase tracking-wide truncate">{formatCurrency(allocations[category])}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Donut Chart */}
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 flex flex-col items-center border border-gray-100 dark:border-gray-700">
                                        <h3 className="font-black text-gray-900 dark:text-white mb-6 self-start uppercase tracking-widest text-xs">Budget Breakdown</h3>
                                        <div className="w-48 h-48 relative mb-6">
                                            <Doughnut
                                                data={chartData}
                                                options={{
                                                    cutout: '70%',
                                                    plugins: { legend: { display: false } }
                                                }}
                                            />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total</span>
                                                <span className="font-black text-gray-900 dark:text-white text-xs">{formatCurrency(totalBudget)}</span>
                                            </div>
                                        </div>

                                        <div className="w-full space-y-3">
                                            {Object.keys(allocationRules).map((category, i) => (
                                                <div key={i} className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[#D0771E]"></span> {/* Simplified color for list */}
                                                        <span className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wide text-[10px]">{category}</span>
                                                    </div>
                                                    <span className="font-black text-gray-900 dark:text-white">{formatCurrency(allocations[category])}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </PremiumCard>
                        </div>
                    )}

                    {/* VENDOR RECOMMENDATION TAB */}
                    {activeTab === 'Vendor Recommendation' && (
                        <div className="space-y-6">
                            {['Venue', 'Entertainment', 'Catering', 'Photography', 'Decor'].map((category, idx) => (
                                <PremiumCard key={idx} className="p-8">
                                    <div className="flex justify-between items-start mb-6 border-b border-gray-50 dark:border-gray-700 pb-4">
                                        <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm">{category}</h3>
                                        <div className="text-right">
                                            <div className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Allocated Budget</div>
                                            <div className="font-black text-[#D0771E] tracking-tight">{formatCurrency(allocations[category] || 0)}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {vendors.filter(v => v.category === category).map((vendor, i) => (
                                            <div key={i} className="flex flex-col sm:flex-row justify-between items-center bg-gray-50/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 gap-6 hover:border-gray-200 dark:hover:border-gray-600 transition-colors">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-tight">{vendor.name}</span>
                                                        {vendor.status === 'locked' && <LockClosedIcon className="w-3 h-3 text-green-600 dark:text-green-400" />}
                                                        <div className="flex items-center text-xs font-bold text-[#E8B716] bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-md border border-yellow-100 dark:border-yellow-800">
                                                            <span className="mr-1">★</span> {vendor.rating} ({vendor.reviews})
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-black text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">{formatCurrency(vendor.cost)}</span>
                                                        {vendor.cost <= (allocations[category] || 0) ? (
                                                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Within Budget</span>
                                                        ) : (
                                                            <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Slightly Above</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => toggleLockVendor(vendor.id)}
                                                    className={`
                                                    px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 text-white transition-all shadow-lg dark:shadow-none
                                                    ${vendor.status === 'locked'
                                                            ? 'bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 shadow-green-200'
                                                            : 'bg-[#262626] dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 shadow-gray-200'}
                                                `}>
                                                    <LockClosedIcon className="w-3 h-3" />
                                                    {vendor.status === 'locked' ? 'Locked In' : 'Lock In'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </PremiumCard>
                            ))}
                        </div>
                    )}

                    {/* COST OPTIMIZATION TAB */}
                    {activeTab === 'Cost Optimization' && (
                        <div className="space-y-6">
                            {/* AI Cost Optimization Card */}
                            <PremiumCard className="bg-gradient-to-br from-green-50 dark:from-green-900/20 to-white dark:to-gray-800 border-green-100 dark:border-green-900/30 p-8 shadow-green-50 dark:shadow-none">
                                <div className="flex items-center gap-2 mb-2">
                                    <SparklesIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm">AI Cost Optimization</h3>
                                </div>
                                <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-8 uppercase tracking-wide">Smart suggestions to maximize your budget efficiency</p>

                                <div className="space-y-4">
                                    {[
                                        "Consider a weekday event for 20% venue savings",
                                        "Buffet style can save ₦500,000 for your guest count",
                                        "Local florists offer 30% better value than imports",
                                        "Morning ceremonies reduce entertainment costs"
                                    ].map((tip, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-green-100 dark:border-green-900/30 shadow-sm dark:shadow-none">
                                            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                                                <CheckCircleIcon className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{tip}</span>
                                        </div>
                                    ))}
                                </div>
                            </PremiumCard>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Potential Savings */}
                                <PremiumCard className="p-8">
                                    <h3 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Potential Savings</h3>
                                    <div className="space-y-4 mb-8">
                                        {[
                                            { label: "Buffet style savings", amount: "₦900,000" },
                                            { label: "Buffet vs plated service", amount: "₦500,000" },
                                            { label: "Local florist selection", amount: "₦300,000" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                                <span className="text-xs text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wide">{item.label}</span>
                                                <span className="text-green-600 dark:text-green-400 font-black text-sm">{item.amount}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center pt-6 border-t border-gray-50 dark:border-gray-700">
                                        <span className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Total Potential Savings</span>
                                        <span className="font-black text-green-600 dark:text-green-400 text-xl tracking-tight">₦1,700,000</span>
                                    </div>
                                </PremiumCard>

                                {/* Feedback */}
                                <PremiumCard className="p-8 flex flex-col justify-center text-center">
                                    <h3 className="font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Help Improve AI</h3>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">Your feedback helps us provide better suggestions for future events</p>

                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={() => alert("Thank you for your feedback!")}
                                            className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-100 dark:hover:bg-green-900/40 transition-all border border-green-100 dark:border-green-800"
                                        >
                                            <CheckCircleIcon className="w-4 h-4" />
                                            Helpful
                                        </button>
                                        <button
                                            onClick={() => alert("Feedback mode coming soon")}
                                            className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700"
                                        >
                                            <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                                            Feedback
                                        </button>
                                    </div>
                                </PremiumCard>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIEventDashboard;

