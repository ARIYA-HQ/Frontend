import React from 'react';
import { ArrowPathIcon, WrenchScrewdriverIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import PremiumCard from '../../components/ui/PremiumCard';
import { Button } from '../../components/ui/Button';

const Maintenance: React.FC = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAFAFA] dark:bg-gray-900 relative overflow-hidden font-inter">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-[#D0771E]/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <PremiumCard className="max-w-md w-full p-10 text-center relative z-10 border-none shadow-2xl shadow-orange-100/50 dark:shadow-none">
                <div className="flex justify-center mb-8 relative">
                    <div className="w-24 h-24 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center animate-pulse">
                        <WrenchScrewdriverIcon className="w-10 h-10 text-[#D0771E]" />
                    </div>
                    {/* Animated gear or secondary icon could go here */}
                    <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-[#1D2939] dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 shadow-lg animate-spin-slow">
                        <ArrowPathIcon className="w-5 h-5" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-[#1D2939] dark:text-white mb-3 tracking-tight">
                    System Maintenance
                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                    We are currently performing scheduled maintenance to improve your experience. Services will be back shortly.
                </p>

                <div className="space-y-4">
                    <div className="p-4 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30">
                        <p className="text-xs font-bold text-[#D0771E] uppercase tracking-widest mb-1">Estimated Return</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">~15 Minutes</p>
                    </div>

                    <Button
                        onClick={handleRefresh}
                        className="w-full h-12 bg-[#1D2939] dark:bg-white text-white dark:text-gray-900 hover:bg-[#D0771E] hover:text-white dark:hover:bg-[#D0771E] dark:hover:text-white rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowPathIcon className="w-4 h-4" />
                        Check for Updates
                    </Button>

                    <button className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-colors flex items-center justify-center gap-2 w-full py-2">
                        <EnvelopeIcon className="w-3.5 h-3.5" />
                        Contact Support
                    </button>
                </div>
            </PremiumCard>

            {/* Floating Footer */}
            <div className="absolute bottom-6 text-[10px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-[0.2em]">
                Àriyá • Status: Updating...
            </div>
        </div>
    );
};

export default Maintenance;
