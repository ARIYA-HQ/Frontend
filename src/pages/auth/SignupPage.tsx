import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeSlashIcon, EyeIcon, UserIcon, BuildingStorefrontIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import { Button } from '../../components/ui/Button';

const SignupPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('personal_planner');

  const handleProceed = () => {
    if (role === 'vendor') {
      navigate('/auth/vendor-signup');
    } else if (role === 'professional_event_planner') {
      navigate('/auth/professional-planner-signup');
    } else {
      // Both planner types go to planner signup, potentially with a query param
      // For now we just route them to the existing planner signup
      navigate('/auth/planner-signup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-900 selection:bg-[#D0771E]/30">
      {/* --- LEFT SIDE: SELECTION --- */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 sm:p-12 lg:p-20 relative">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D0771E]/5 dark:bg-[#D0771E]/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 -z-10"></div>

        {/* Top Bar with Logo and Login Link */}
        <div className="flex justify-between items-center mb-16 lg:mb-24">
          <div className="text-[#D0771E] font-black text-4xl tracking-tighter uppercase italic">Àriyá</div>
          <Link to="/auth/login" className="flex items-center gap-3 group">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-400 group-hover:text-[#D0771E] transition-all">Existing account?</span>
            <div className="h-10 px-5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white group-hover:bg-[#1D2939] dark:group-hover:bg-gray-700 group-hover:text-white transition-all">
              Log In
            </div>
          </Link>
        </div>

        <div className="max-w-xl w-full mx-auto lg:mx-0 flex-1 flex flex-col justify-center">
          <div className="mb-12">
            <h2 className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.4em] mb-4">Onboarding Studio</h2>
            <h1 className="text-4xl lg:text-5xl font-black text-[#1D2939] dark:text-white mb-6 uppercase tracking-tighter leading-tight">
              Choose Your <br /> <span className="text-[#D0771E]">Identity.</span>
            </h1>
            <p className="text-[11px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest leading-relaxed max-w-sm">
              Select the path that best describes your goals in the Ariya ecosystem.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {/* Role: Personal Planner */}
            <div
              onClick={() => setRole('personal_planner')}
              className={`p-6 rounded-[24px] border-2 cursor-pointer transition-all duration-500 flex items-center gap-6 group ${role === 'personal_planner'
                  ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 shadow-xl dark:shadow-none'
                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-[#D0771E]/30 dark:hover:border-[#D0771E]/50'
                }`}
            >
              <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center transition-all duration-500 ${role === 'personal_planner' ? 'bg-white/10 dark:bg-gray-700/50' : 'bg-gray-50 dark:bg-gray-700 group-hover:bg-[#D0771E]/10 dark:group-hover:bg-[#D0771E]/20'
                }`}>
                <UserIcon className={`w-8 h-8 ${role === 'personal_planner' ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-[#D0771E]'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-base font-black uppercase tracking-tighter mb-1 ${role === 'personal_planner' ? 'text-white' : 'text-[#1D2939] dark:text-white'}`}>Personal Planner</h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${role === 'personal_planner' ? 'text-gray-400' : 'text-gray-400 dark:text-gray-400'}`}>Planning my own events</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${role === 'personal_planner' ? 'border-[#D0771E] bg-[#D0771E]' : 'border-gray-100 dark:border-gray-600'
                }`}>
                {role === 'personal_planner' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
              </div>
            </div>

            {/* Role: Professional Event Planner */}
            <div
              onClick={() => setRole('professional_event_planner')}
              className={`p-6 rounded-[24px] border-2 cursor-pointer transition-all duration-500 flex items-center gap-6 group ${role === 'professional_event_planner'
                  ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 shadow-xl dark:shadow-none'
                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-[#D0771E]/30 dark:hover:border-[#D0771E]/50'
                }`}
            >
              <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center transition-all duration-500 ${role === 'professional_event_planner' ? 'bg-white/10 dark:bg-gray-700/50' : 'bg-gray-50 dark:bg-gray-700 group-hover:bg-[#D0771E]/10 dark:group-hover:bg-[#D0771E]/20'
                }`}>
                <BriefcaseIcon className={`w-8 h-8 ${role === 'professional_event_planner' ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-[#D0771E]'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-base font-black uppercase tracking-tighter mb-1 ${role === 'professional_event_planner' ? 'text-white' : 'text-[#1D2939] dark:text-white'}`}>Professional Event Planner</h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${role === 'professional_event_planner' ? 'text-gray-400' : 'text-gray-400 dark:text-gray-400'}`}>Managing client events</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${role === 'professional_event_planner' ? 'border-[#D0771E] bg-[#D0771E]' : 'border-gray-100 dark:border-gray-600'
                }`}>
                {role === 'professional_event_planner' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
              </div>
            </div>

            {/* Role: Vendor */}
            <div
              onClick={() => setRole('vendor')}
              className={`p-6 rounded-[24px] border-2 cursor-pointer transition-all duration-500 flex items-center gap-6 group ${role === 'vendor'
                  ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 shadow-xl dark:shadow-none'
                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-[#D0771E]/30 dark:hover:border-[#D0771E]/50'
                }`}
            >
              <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center transition-all duration-500 ${role === 'vendor' ? 'bg-white/10 dark:bg-gray-700/50' : 'bg-gray-50 dark:bg-gray-700 group-hover:bg-[#D0771E]/10 dark:group-hover:bg-[#D0771E]/20'
                }`}>
                <BuildingStorefrontIcon className={`w-8 h-8 ${role === 'vendor' ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-[#D0771E]'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-base font-black uppercase tracking-tighter mb-1 ${role === 'vendor' ? 'text-white' : 'text-[#1D2939] dark:text-white'}`}>Professional Vendor</h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${role === 'vendor' ? 'text-gray-400' : 'text-gray-400 dark:text-gray-400'}`}>Offering premium services</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${role === 'vendor' ? 'border-[#D0771E] bg-[#D0771E]' : 'border-gray-100 dark:border-gray-600'
                }`}>
                {role === 'vendor' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
              </div>
            </div>
          </div>

          <Button
            onClick={handleProceed}
            className="w-full h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl dark:shadow-none hover:translate-x-2 transition-all group flex items-center justify-center gap-4"
          >
            Initialize Onboarding
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

        {/* Footer Credits */}
        <div className="flex gap-8 mt-12 py-6 border-t border-gray-50 dark:border-gray-700 lg:absolute lg:bottom-12 lg:left-20">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-500">Verified by Ariya Security Layer</span>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D0771E]">Join 10k+ Members</span>
        </div>
      </div>

      {/* --- RIGHT SIDE: VISUAL PANE --- */}
      <div className="hidden lg:flex w-1/2 relative min-h-screen overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1400&auto=format&fit=crop"
          alt="Event Selection"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] transition-transform duration-[30s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[#1D2939]/40 mix-blend-color"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D2939] via-[#1D2939]/20 to-transparent"></div>

        <div className="absolute inset-x-0 bottom-0 p-24">
          <div className="max-w-lg">
            <div className="w-32 h-1 bg-[#D0771E] mb-12"></div>
            <h2 className="text-white text-5xl font-black leading-tight uppercase tracking-tighter mb-8">
              Empowering <br /> Creators, <br /> Inspiring <span className="text-[#D0771E]">Celebrations.</span>
            </h2>
            <div className="p-8 rounded-[40px] bg-white/10 backdrop-blur-xl border border-white/10 inline-flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Network Status: Optimized</span>
              </div>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                Accelerate your planning workflow with our <br /> AI-driven logistics engine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;