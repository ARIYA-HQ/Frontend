import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronDownIcon,
    CheckCircleIcon,
    SparklesIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import userService from '../../services/userService';
import { redirectToRoleSubdomain } from '../../utils/subdomain';

type Step = 1 | 2 | 3 | 4;

const ProfessionalPlannerSignup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>(1);
    const [showPassword, setShowPassword] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        businessType: '',
        country: 'Nigeria',
        state: '',
        city: '',
        yearsExperience: '',
        services: [] as string[],
        style: ''
    });

    const businessTypes = ["Sole Proprietorship", "Partnership", "LLC", "Corporation", "Other"];

    const services = [
        "Wedding Planning", "Corporate Events", "Birthday Parties", "Baby Showers",
        "Anniversary Events", "Conferences", "Fundraisers", "Product Launches",
        "Fashion Shows", "Private Parties", "Cultural Events", "Other"
    ];

    const nextStep = () => {
        if (step < 4) setStep(step + 1 as Step);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1 as Step);
    };

    const handleServiceToggle = (service: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    const handleRegister = async () => {
        try {
            // Prepare user data
            const userData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
                role: 'professional_event_planner' as const,
                businessName: formData.businessName,
                businessType: formData.businessType,
                experience: formData.yearsExperience,
                services: formData.services,
                style: formData.style,
                location: `${formData.city}, ${formData.state}, ${formData.country}`
            };

            // Call the registration API
            const response = await userService.register(userData);

            if (response.data) {
                // Store user data and token
                localStorage.setItem('user', JSON.stringify(response.data));
                // response.data as User usually wouldn't have token unless it's an AuthResponse
                // If the API returns { user, token } in data, we handle accordingly
                // For now, let's assume standard data return
                redirectToRoleSubdomain('professional_event_planner');
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const renderVisualPane = () => (
        <div className="hidden lg:flex w-1/2 relative min-h-screen overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop"
                alt="Event Planning"
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[20s]"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-[#1D2939]/30 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D2939] via-transparent to-transparent opacity-90"></div>

            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-24">
                <div className="max-w-xl">
                    <div className="w-12 h-1 bg-[#D0771E] mb-10"></div>
                    <h2 className="text-white text-5xl xl:text-6xl font-black leading-[1.1] mb-8 uppercase tracking-tighter">
                        Architecting <br /> Professional <br /> <span className="text-[#D0771E]">Experiences.</span>
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1D2939] overflow-hidden bg-gray-200 dark:bg-gray-700">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">Trusted by 5k+ Planners</p>
                    </div>
                </div>
            </div>

            {/* Glassmorphic Badge */}
            <div className="absolute top-20 right-20 p-8 rounded-[40px] bg-white dark:bg-gray-800/5 backdrop-blur-2xl border border-white/10 shadow-2xl dark:shadow-none">
                <p className="text-white text-[10px] font-black uppercase tracking-[0.5em] mb-1">Ariya Intelligence</p>
                <div className="flex items-center gap-4">
                    <div className="h-1.5 w-32 bg-white dark:bg-gray-800/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#D0771E] w-3/4 animate-pulse"></div>
                    </div>
                    <span className="text-white text-[10px] font-black">75%</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-800 dark:bg-gray-900 selection:bg-[#D0771E]/30 transition-colors">
            {/* --- LEFT SIDE: SIGNUP FORM --- */}
            <div className={`w-full ${step === 4 ? 'lg:w-full' : 'lg:w-1/2'} flex flex-col p-8 sm:p-12 lg:p-20 relative`}>
                {/* Background Accent */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#F3F0EB]/50 dark:bg-gray-800/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10"></div>

                {/* Top Bar with Logo and Login Link */}
                <div className="flex justify-between items-center mb-16 lg:mb-24">
                    <div className="text-[#D0771E] font-black text-4xl tracking-tighter uppercase italic">Àriyá</div>
                    <button
                        onClick={() => navigate('/auth/login')}
                        className="flex items-center gap-3 group"
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-hover:text-[#D0771E] transition-colors duration-300">Already have an account?</span>
                        <div className="h-10 px-6 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-[#D0771E] border border-gray-100 dark:border-gray-700 group-hover:bg-[#D0771E] group-hover:text-white group-hover:border-[#D0771E] transition-all duration-300">
                            Log In
                        </div>
                    </button>
                </div>

                <div className={`${step === 4 ? 'max-w-2xl text-center' : 'max-w-md'} w-full mx-auto lg:mx-0 flex-1 flex flex-col justify-center`}>
                    {/* Step Indicator */}
                    {step !== 4 && (
                        <div className="mb-8">
                            <div className="flex justify-between mb-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-center flex-1 last:flex-none">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${i + 1 <= step
                                                ? 'bg-[#1D2939] dark:bg-gray-800 text-white shadow-lg'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                                                }`}
                                        >
                                            <span className="text-[10px] font-black">{i + 1}</span>
                                        </div>
                                        {i < 3 && (
                                            <div
                                                className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${i + 1 < step ? 'bg-[#D0771E]' : 'bg-gray-100 dark:bg-gray-800'
                                                    }`}
                                            ></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                Professional Initialize • Phase {step} of 4
                            </p>
                        </div>
                    )}

                    {/* Step 1: Personal Information */}
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-[#1D2939] dark:text-white mb-2 uppercase tracking-tighter leading-tight">Elite <span className="text-[#D0771E]">Architect</span></h2>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">
                                    Establish your professional presence in our ecosystem.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1">First Name</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1">Business Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                        placeholder="john@architecture.com"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1">Secure Pass</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500 pr-14"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#D0771E] transition-colors"
                                            >
                                                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1">Verify</label>
                                        <input
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={nextStep}
                                isDisabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password}
                                className="w-full h-16 bg-[#1D2939] dark:bg-gray-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl dark:shadow-none hover:bg-[#D0771E] transition-all flex items-center justify-center gap-3 mt-8 disabled:opacity-50"
                            >
                                Proceed to Business
                                <ArrowRightIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    )}

                    {/* Step 2: Business Identity */}
                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-[#1D2939] dark:text-white mb-2 uppercase tracking-tighter leading-tight">Business <span className="text-[#D0771E]">Identity</span></h2>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">
                                    Define your professional establishment.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1">Establishment Name</label>
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                        className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                        placeholder="Architecture of Events"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1">Entity Type</label>
                                        <div className="relative">
                                            <select
                                                value={formData.businessType}
                                                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                                                className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white appearance-none"
                                                required
                                            >
                                                <option value="">Select Type</option>
                                                {businessTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            <ChevronDownIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 dark:text-gray-500 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1">Experience (Years)</label>
                                        <input
                                            type="number"
                                            value={formData.yearsExperience}
                                            onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                                            className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                            placeholder="5"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-8">
                                <Button onClick={prevStep} className="h-16 bg-gray-50 dark:bg-gray-800 text-[#1D2939] dark:text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-sm hover:-translate-x-1 transition-all">
                                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                    Phase 1
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    isDisabled={!formData.businessName || !formData.businessType || !formData.yearsExperience}
                                    className="h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl dark:shadow-none hover:translate-x-2 transition-all disabled:opacity-50"
                                >
                                    Logistics Phase
                                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Logistics & Services */}
                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-[#1D2939] dark:text-white mb-2 uppercase tracking-tighter leading-tight">Logistics & <span className="text-[#D0771E]">Reach</span></h2>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">
                                    Define your geographic focus and core offerings.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Metropolitan City</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Lagos"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">State / Code</label>
                                        <input
                                            type="text"
                                            placeholder="Code"
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Primary Specializations</label>
                                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
                                        {services.map(service => (
                                            <button
                                                key={service}
                                                onClick={() => handleServiceToggle(service)}
                                                className={`px-4 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${formData.services.includes(service)
                                                    ? 'bg-[#1D2939] border-[#1D2939] text-white shadow-lg'
                                                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400'
                                                    }`}
                                            >
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-8">
                                <Button onClick={prevStep} className="h-16 bg-gray-50 dark:bg-gray-800 text-[#1D2939] dark:text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-sm hover:-translate-x-1 transition-all">
                                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                    Phase 2
                                </Button>
                                <Button
                                    onClick={handleRegister}
                                    isDisabled={formData.services.length === 0 || !formData.city}
                                    className="h-16 bg-[#1D2939] dark:bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl dark:shadow-none hover:bg-[#D0771E] transition-all disabled:opacity-50"
                                >
                                    Finalize Journey
                                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Completion */}
                    {step === 4 && (
                        <div className="animate-in zoom-in fade-in duration-700 flex flex-col items-center justify-center py-20 px-8">
                            {/* Background Accents */}
                            <div className="fixed inset-0 bg-[#F3F0EB]/30 dark:bg-gray-900/50 -z-10 animate-pulse"></div>

                            <div className="w-40 h-40 bg-white dark:bg-gray-800 rounded-[60px] shadow-2xl dark:shadow-none flex items-center justify-center mb-12 relative group">
                                <CheckCircleIcon className="w-20 h-20 text-[#D0771E] relative z-10 transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-2 border-4 border-dashed border-[#D0771E]/20 rounded-[50px] animate-spin-slow"></div>
                                <SparklesIcon className="absolute -top-4 -right-4 w-12 h-12 text-[#D0771E] animate-bounce" />
                            </div>

                            <h1 className="text-5xl font-black text-[#1D2939] dark:text-white mb-6 uppercase tracking-tight leading-none">Architect <span className="text-[#D0771E]">Verified.</span></h1>
                            <p className="text-sm font-medium text-gray-400 dark:text-gray-500 max-w-sm mb-12 leading-relaxed uppercase tracking-widest text-[10px]">
                                Your professional enclave is ready. <br /> Continue to your dashboard to begin operations.
                            </p>

                            <Button
                                onClick={() => redirectToRoleSubdomain('professional_event_planner')}
                                className="w-full max-w-xs h-18 bg-[#1D2939] dark:bg-gray-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl dark:shadow-none hover:scale-110 transition-all mb-8 group flex items-center justify-center gap-4"
                            >
                                Enter Dashboard
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                            </Button>

                            <p className="text-[10px] text-gray-300 dark:text-gray-600 font-black uppercase tracking-[0.5em] animate-pulse">Ariya - Plan with perfection</p>
                        </div>
                    )}
                </div>

                {/* Bottom Footer Links */}
                {step !== 4 && (
                    <div className="flex gap-10 pt-16 mt-auto border-t border-gray-50 dark:border-gray-800">
                        <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors">Privacy Infrastructure</button>
                        <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors">Legal Terms</button>
                    </div>
                )}
            </div>

            {/* --- RIGHT SIDE: VISUAL PANE --- */}
            {step !== 4 && renderVisualPane()}
        </div>
    );
};

export default ProfessionalPlannerSignup;