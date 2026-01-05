import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    EyeIcon,
    XMarkIcon,
    CloudArrowUpIcon,
    ChevronDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    EyeSlashIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Button } from '../../components/ui/Button';

type Step = 1 | 2 | 3 | 4;

const VendorSignup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        categories: [] as string[],
        country: '',
        state: '',
        city: '',
    });

    const categories = [
        "Photographer", "Videographer", "Officiant", "Caterers",
        "DJ/Band/Musicians", "Sound Technician", "Makeup Artist",
        "Venues", "Rental Company", "Cake/Dessert Vendor",
        "Lighting Technician", "Transportation Services",
        "Hair & Makeup Artists", "Photo Booth Provider",
        "Decorators/Event Designer", "Bartending Service",
        "Event Security", "Comedian", "Dancer", "Magician",
        "Rentals", "Others"
    ];

    const toggleCategory = (cat: string) => {
        setFormData(prev => {
            if (prev.categories.includes(cat)) {
                return { ...prev, categories: prev.categories.filter(c => c !== cat) };
            }
            if (prev.categories.length < 3) {
                return { ...prev, categories: [...prev.categories, cat] };
            }
            return prev;
        });
    };

    const nextStep = () => setStep(prev => (prev < 4 ? prev + 1 : prev) as Step);
    const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev) as Step);

    const renderVisualPane = () => {
        let imageUrl = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1400&auto=format&fit=crop";
        if (step === 1) imageUrl = "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1400&auto=format&fit=crop";
        if (step === 2) imageUrl = "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1400&auto=format&fit=crop";
        if (step >= 3) imageUrl = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop";

        return (
            <div className="hidden lg:flex w-1/2 relative min-h-screen sticky top-0 overflow-hidden">
                <img
                    src={imageUrl}
                    alt="Celebration"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] scale-110 transition-transform duration-[20s]"
                />

                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-[#1D2939]/40 mix-blend-color"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D2939] via-[#1D2939]/20 to-transparent"></div>

                <div className="absolute inset-x-0 bottom-0 p-24">
                    <div className="max-w-xl">
                        <div className="w-16 h-1 bg-[#D0771E] mb-12"></div>
                        <h2 className="text-white text-5xl xl:text-6xl font-black leading-[1.1] mb-8 uppercase tracking-tighter">
                            Your <br /> Craft, <br /> Our <span className="text-[#D0771E]">Canvas.</span>
                        </h2>
                        <div className="p-8 rounded-[40px] bg-white/10 backdrop-blur-xl border border-white/10 inline-flex items-center gap-6">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#1D2939] overflow-hidden bg-white/20">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="Vendor" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.4em]">Integrated with 2k+ Planners</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-900 selection:bg-[#D0771E]/30 transition-colors">
            {/* --- LEFT SIDE: FORM PANE --- */}
            <div className={`w-full lg:w-1/2 flex flex-col p-8 sm:p-12 lg:p-20 relative transition-all duration-700`}>
                {/* Background Accent */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#F3F0EB]/50 dark:bg-gray-800/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10"></div>
                
                {/* Progress Tracking */}
                <div className="fixed top-0 left-0 w-1/2 h-1 bg-gray-50 dark:bg-gray-800 z-[60]">
                    <div
                        className="h-full bg-[#D0771E] transition-all duration-1000 ease-out shadow-[0_0_15px_#D0771E]"
                        style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                </div>

                {/* Top Bar with Logo */}
                <div className="flex justify-between items-center mb-16 lg:mb-24">
                    <div className="text-[#D0771E] font-black text-4xl tracking-tighter uppercase italic">Àriyá</div>
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[9px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">Enterprise Onboarding</span>
                            <span className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Step {step} of 4</span>
                        </div>
                        {step > 1 && (
                            <button
                                onClick={prevStep}
                                className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-[#1D2939] dark:text-white hover:bg-[#1D2939] dark:hover:bg-gray-700 hover:text-white transition-all shadow-sm dark:shadow-none"
                            >
                                <ArrowLeftIcon className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="max-w-md w-full mx-auto lg:mx-0 flex-1 flex flex-col justify-center">
                    {/* STEP 1: ACCOUNT CREATION */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-12">
                                <h1 className="text-4xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter leading-tight">Professional <br /> <span className="text-[#D0771E]">Identity.</span></h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">Establish your vendor presence within our elite ecosystem.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">First Name</label>
                                        <input
                                            type="text"
                                            placeholder="John"
                                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Last Name</label>
                                        <input
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Business Email</label>
                                    <input
                                        type="email"
                                        placeholder="business@example.com"
                                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                            />
                                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-500 hover:text-[#D0771E] transition-colors"><EyeIcon className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Confirm</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                            />
                                            <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-500 hover:text-[#D0771E] transition-colors"><EyeIcon className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={nextStep}
                                    className="w-full h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-orange-100 dark:shadow-none hover:translate-y-[-2px] transition-all mt-6"
                                >
                                    Continue Onboarding
                                </Button>
                            </div>

                            <div className="relative my-12">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-50 dark:border-gray-800"></div></div>
                                <div className="relative flex justify-center"><span className="px-6 bg-white dark:bg-gray-900 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600 italic">Trusted Partner Protocol</span></div>
                            </div>

                            <div className="text-center font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 text-[10px]">
                                Already managing a portfolio? <Link to="/auth/login" className="text-[#D0771E] ml-2 border-b border-[#D0771E]/20 hover:border-[#D0771E] transition-all pb-0.5">Authorize Entry</Link>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: CATEGORIES */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-10">
                                <h2 className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.4em] mb-4">Service Matrix</h2>
                                <h1 className="text-3xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter leading-tight">Define Your <br /> <span className="text-[#D0771E]">Domain.</span></h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Select up to 3 specialties to define your catalog.</p>
                            </div>

                            <div className="flex flex-wrap gap-2.5 mb-12 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => toggleCategory(cat)}
                                        className={`px-5 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${formData.categories.includes(cat)
                                            ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 text-white shadow-xl dark:shadow-none'
                                            : 'bg-white dark:bg-gray-800 border-gray-50 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-[#D0771E]/30 dark:hover:border-[#D0771E]/50 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#1D2939] dark:hover:text-white'
                                            }`}
                                    >
                                        {cat}
                                        {formData.categories.includes(cat) && <CheckIcon className="w-3.5 h-3.5 text-[#D0771E]" />}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <Button
                                    onClick={nextStep}
                                    className="w-full h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-orange-100 dark:shadow-none"
                                >
                                    Proceed to Logistics
                                </Button>
                                <button onClick={nextStep} className="w-full text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors py-4">Skip selection</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: LOCATION */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-12">
                                <h2 className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.4em] mb-4">Operations Hub</h2>
                                <h1 className="text-4xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter">Operational <br /> <span className="text-[#D0771E]">Radius.</span></h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Specify your primary base of operations.</p>
                            </div>

                            <div className="space-y-6 mb-12">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Country / Nation</label>
                                    <div className="relative">
                                        <select className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white appearance-none">
                                            <option>Nigeria</option>
                                            <option>United Kingdom</option>
                                            <option>United States</option>
                                            <option>Canada</option>
                                        </select>
                                        <ChevronDownIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">State / Region</label>
                                    <div className="relative">
                                        <select className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white appearance-none">
                                            <option>Lagos State</option>
                                            <option>Abuja FCT</option>
                                            <option>London</option>
                                            <option>New York</option>
                                        </select>
                                        <ChevronDownIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">City Center</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Ikoyi"
                                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    onClick={nextStep}
                                    className="w-full h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-orange-100 dark:shadow-none"
                                >
                                    Proceed to Media Assets
                                </Button>
                                <button onClick={nextStep} className="w-full text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors py-4">Skip for now</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: MEDIA UPLOAD */}
                    {step === 4 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-12">
                                <h1 className="text-4xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter leading-tight">Visual <br /> <span className="text-[#D0771E]">Signature.</span></h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Upload your corporate identification and brand assets.</p>
                            </div>

                            <div className="space-y-6 mb-12">
                                <div className="space-y-2 text-center group">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white text-left block ml-1 mb-2">Professional Portrait</label>
                                    <div className="border-[3px] border-dashed border-gray-50 dark:border-gray-800 rounded-[40px] p-12 flex flex-col items-center justify-center gap-4 bg-gray-50/10 dark:bg-gray-800/20 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 hover:border-[#D0771E]/30 dark:hover:border-[#D0771E]/50 transition-all cursor-pointer relative overflow-hidden group">
                                        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-xl dark:shadow-none group-hover:scale-110 group-hover:bg-[#1D2939] dark:group-hover:bg-gray-700 transition-all duration-500">
                                            <CloudArrowUpIcon className="w-8 h-8 text-[#D0771E] group-hover:text-white" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D2939] dark:text-white">Ingest JPG/PNG</p>
                                            <p className="text-[9px] text-gray-300 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">High fidelity required</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-center">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white text-left block ml-1 mb-2">Corporate Logotype</label>
                                    <div className="border-[3px] border-dashed border-gray-50 dark:border-gray-800 rounded-[40px] p-12 flex flex-col items-center justify-center gap-4 bg-gray-50/10 dark:bg-gray-800/20 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 hover:border-[#D0771E]/30 dark:hover:border-[#D0771E]/50 transition-all cursor-pointer group">
                                        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-xl dark:shadow-none group-hover:scale-110 group-hover:bg-[#1D2939] dark:group-hover:bg-gray-700 transition-all duration-500">
                                            <CloudArrowUpIcon className="w-8 h-8 text-[#D0771E] group-hover:text-white" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D2939] dark:text-white">Brandmark SVG/PNG</p>
                                            <p className="text-[9px] text-gray-300 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Logo assets (Primary)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    onClick={() => navigate('/onboarding')}
                                    className="w-full h-18 bg-[#1D2939] dark:bg-gray-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl dark:shadow-none hover:scale-[1.05] transition-all flex items-center justify-center gap-4 group"
                                >
                                    Start Onboarding
                                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                                </Button>
                                <button onClick={() => navigate('/onboarding')} className="w-full text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors py-4">Skip for later</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Footer Links */}
                <div className="flex gap-10 pt-16 border-t border-gray-50 dark:border-gray-800 mt-auto items-center">
                    <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors">Vendor Policy</button>
                    <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors">Compliance</button>
                    <div className="ml-auto flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1D2939] dark:text-white">Ariya Cloud Secure</span>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: VISUAL PANE --- */}
            {renderVisualPane()}
        </div>
    );
};

export default VendorSignup;
