import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import PremiumCard from '../../components/ui/PremiumCard';
import { Button } from '../../components/ui/Button';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAFAFA] dark:bg-gray-900 relative overflow-hidden font-inter">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D0771E]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D0771E]/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <PremiumCard className="max-w-md w-full p-10 text-center relative z-10 border-none shadow-2xl shadow-orange-100/50 dark:shadow-none">
                <div className="flex justify-center mb-8 relative">
                    <div className="w-24 h-24 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center animate-pulse-slow">
                        <ExclamationTriangleIcon className="w-12 h-12 text-[#D0771E]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1D2939] dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 font-black text-xs shadow-lg transform rotate-12">
                        ?
                    </div>
                </div>

                <h1 className="text-8xl font-black text-[#D0771E] leading-none mb-2 tracking-tighter">404</h1>

                <h2 className="text-2xl font-bold text-[#1D2939] dark:text-white uppercase tracking-tight mb-4">
                    Page Not Found
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 leading-relaxed font-medium">
                    The page you are looking for might have been moved, deleted, or possibly never existed.
                </p>

                <div className="space-y-3">
                    <Button
                        onClick={() => navigate('/dashboard')}
                        className="w-full h-12 bg-[#1D2939] dark:bg-white text-white dark:text-gray-900 hover:bg-[#D0771E] hover:text-white dark:hover:bg-[#D0771E] dark:hover:text-white rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 group"
                    >
                        <HomeIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        Back to Dashboard
                    </Button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full py-3 text-[#1D2939] dark:text-gray-300 hover:text-[#D0771E] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeftIcon className="w-3 h-3" />
                        Go Back
                    </button>
                </div>
            </PremiumCard>

            {/* Floating Footer */}
            <div className="absolute bottom-6 text-[10px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-[0.2em]">
                Àriyá • Event Intelligence
            </div>
        </div>
    );
};

export default NotFound;
