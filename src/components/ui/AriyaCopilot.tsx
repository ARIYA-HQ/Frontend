import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SparklesIcon, XMarkIcon, ChevronRightIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { LightBulbIcon, TrophyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const AriyaCopilot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tips, setTips] = useState<{ icon: any, title: string, text: string }[]>([]);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let newTips = [];

        if (path.includes('seating')) {
            newTips = [
                { icon: ShieldCheckIcon, title: 'Seating Conflict', text: 'Phoenix Baker (VIP) is currently seated at a non-optimal table relative to the Head Table.' },
                { icon: LightBulbIcon, title: 'Optimization Tip', text: 'Grouping by "Family" first could reduce manual seat assignment time by 40%.' }
            ];
        } else if (path.includes('vendor/analytics')) {
            newTips = [
                { icon: TrophyIcon, title: 'Market Insight', text: 'Your conversion rate is 5% higher than the Lagos average for Photography.' },
                { icon: LightBulbIcon, title: 'Growth Opportunity', text: 'Increasing engagement in "Q3" could lead to a ₦15M revenue boost.' }
            ];
        } else if (path.includes('team')) {
            newTips = [
                { icon: ShieldCheckIcon, title: 'Collaboration Tip', text: 'Invite a "Vendor Manager" role to handle marketplace communications directly.' },
                { icon: LightBulbIcon, title: 'Efficiency', text: 'Active presence simulation is helping your team respond 2x faster than last month.' }
            ];
        } else if (path.includes('ai-event-dashboard')) {
            newTips = [
                { icon: SparklesIcon, title: 'Vision Refinement', text: 'Adding "Midnight Blue" to your vision prompt might surface premium decor vendors.' },
                { icon: LightBulbIcon, title: 'Budget Tip', text: 'Your catering allocation is currently 5% higher than the AI recommended baseline.' }
            ];
        } else {
            newTips = [
                { icon: SparklesIcon, title: 'Welcome Back', text: 'I have analyzed your recent activity. Ready to optimize your workflow?' },
                { icon: LightBulbIcon, title: 'Did you know?', text: 'You can now export analytics directly to CSV for board meetings.' }
            ];
        }
        setTips(newTips);
    }, [location.pathname]);

    return (
        <>
            {/* Floating FAB */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#D0771E] text-white rounded-full shadow-[0_20px_50px_rgba(208,119,30,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group ${isOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}`}
            >
                <SparklesIcon className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            </button>

            {/* Sidecar */}
            <div className={`fixed inset-y-0 right-0 z-[110] w-[400px] bg-white dark:bg-gray-900 shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none border-l border-gray-100 dark:border-gray-800 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-8 bg-gradient-to-br from-[#FFFBF0] dark:from-orange-900/20 to-white dark:to-gray-900 border-b border-gray-50 dark:border-gray-800">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#D0771E] rounded-xl text-white">
                                    <SparklesIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight leading-none">Ariya Copilot</h2>
                                    <span className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.2em]">Context-Aware AI</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors">
                                <XMarkIcon className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Proactive intelligence based on your current workspace: <span className="text-[#D0771E] font-black uppercase tracking-widest text-[10px] ml-1">{location.pathname.split('/').pop() || 'overview'}</span></p>
                    </div>

                    {/* Proactive Tips */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Recommended Actions</h3>
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        </div>

                        {tips.map((tip, i) => (
                            <div key={i} className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#D0771E] transition-all hover:translate-x-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-white dark:bg-gray-700 rounded-lg text-[#D0771E] group-hover:bg-[#D0771E] group-hover:text-white transition-colors">
                                        <tip.icon className="w-4 h-4" />
                                    </div>
                                    <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none">{tip.title}</h4>
                                </div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{tip.text}</p>
                                <button className="flex items-center gap-1 text-[10px] font-black text-[#D0771E] uppercase tracking-widest group/btn">
                                    Execute Action <ChevronRightIcon className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}

                        {/* Chat Shortcut */}
                        <div className="mt-12 p-8 bg-[#1D2939] dark:bg-gray-800 rounded-[2.5rem] relative overflow-hidden group cursor-pointer">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D0771E]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#D0771E]/20 transition-all"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <ChatBubbleLeftRightIcon className="w-10 h-10 text-[#D0771E] mb-4" />
                                <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">Need direct help?</h4>
                                <p className="text-[10px] font-medium text-gray-400 mb-6 px-4 uppercase tracking-wide">Ask me anything about your events or marketplace trends.</p>
                                <div className="w-full py-3 bg-[#D0771E] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-colors">Open Chat</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 border-t border-gray-50 dark:border-gray-800 bg-[#FCFCFC] dark:bg-gray-900/50">
                        <div className="flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                            <span>Ariya v2.1-Beta</span>
                            <span className="flex items-center gap-1"><ShieldCheckIcon className="w-3 h-3" /> Secure Engine</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AriyaCopilot;
