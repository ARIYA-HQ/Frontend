import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    EyeIcon,
    XMarkIcon,
    ChevronDownIcon,
    CheckCircleIcon,
    SparklesIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Button } from '../../components/ui/Button';
import userService from '../../services/userService';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
        country: '',
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

    const styles = [
        "Classic", "Modern", "Rustic", "Elegant", "Casual", "Vintage", 
        "Bohemian", "Minimalist", "Luxury", "Garden", "Beach", "Other"
    ];

    const nextStep = () => {
        if (step < 9) setStep(step + 1 as Step);
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
                role: 'professional_event_planner',
                businessName: formData.businessName,
                businessType: formData.businessType,
                experience: formData.yearsExperience,
                services: formData.services,
                style: formData.style,
                location: `${formData.city}, ${formData.state}, ${formData.country}`
            };

            // Call the registration API
            const response = await userService.register(userData);

            if (response.success) {
                // Store user data and token
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('authToken', response.data.token || '');
                
                // Navigate to onboarding
                navigate('/onboarding');
            } else {
                console.error('Registration failed:', response.message);
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
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1D2939] overflow-hidden bg-gray-200">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">Trusted by 5k+ Planners</p>
                    </div>
                </div>
            </div>

            {/* Glassmorphic Badge */}
            <div className="absolute top-20 right-20 p-8 rounded-[40px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <p className="text-white text-[10px] font-black uppercase tracking-[0.5em] mb-1">Ariya Intelligence</p>
                <div className="flex items-center gap-4">
                    <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#D0771E] w-3/4 animate-pulse"></div>
                    </div>
                    <span className="text-white text-[10px] font-black">75%</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white selection:bg-[#D0771E]/30">
            {/* --- LEFT SIDE: SIGNUP FORM --- */}
            <div className="w-full lg:w-1/2 flex flex-col p-8 sm:p-12 lg:p-20 relative">
                {/* Background Accent */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#F3F0EB]/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10"></div>

                {/* Top Bar with Logo and Login Link */}
                <div className="flex justify-between items-center mb-16 lg:mb-24">
                    <div className="text-[#D0771E] font-black text-4xl tracking-tighter uppercase italic">Àriyá</div>
                    <button 
                        onClick={() => navigate('/auth/login')}
                        className="flex items-center gap-3 group"
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#D0771E] transition-colors duration-300">Already have an account?</span>
                        <div className="h-10 px-6 rounded-xl bg-gray-50 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-[#D0771E] border border-gray-100 group-hover:bg-[#D0771E] group-hover:text-white group-hover:border-[#D0771E] transition-all duration-300">
                            Log In
                        </div>
                    </button>
                </div>

                <div className="max-w-md w-full mx-auto lg:mx-0 flex-1 flex flex-col justify-center">
                    {/* Step Indicator */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-4">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            i + 1 <= step
                                                ? 'bg-[#D0771E] text-white'
                                                : 'bg-gray-200 text-gray-500'
                                        }`}
                                    >
                                        {i + 1}
                                    </div>
                                    {i < 8 && (
                                        <div
                                            className={`flex-1 h-1 ${
                                                i + 1 < step ? 'bg-[#D0771E]' : 'bg-gray-200'
                                            }`}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Professional Planner Onboarding • Step {step} of 9
                        </p>
                    </div>

                    {/* Step 1: Personal Information */}
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-[#1D2939] mb-2 uppercase tracking-tighter">Personal Details</h2>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                                    Let's start with your basic information.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">First Name</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold placeholder:text-gray-300"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold placeholder:text-gray-300"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold placeholder:text-gray-300"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">Password</label>
                                        <div className="relative group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold placeholder:text-gray-300"
                                                placeholder="Create a password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#D0771E] transition-colors"
                                            >
                                                {showPassword ? <EyeIcon className="w-6 h-6" /> : <EyeSlashIcon className="w-6 h-6" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">Confirm Password</label>
                                        <input
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                            className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold placeholder:text-gray-300"
                                            placeholder="Confirm password"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-8">
                                <div></div> {/* Spacer */}
                                <Button
                                    onClick={nextStep}
                                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password || formData.password !== formData.confirmPassword}
                                    className="h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl hover:translate-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue Onboarding
                                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Business Information */}
                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-[#1D2939] mb-2 uppercase tracking-tighter">Business Details</h2>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                                    Tell us about your event planning business.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">Business Name</label>
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                                        className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold placeholder:text-gray-300"
                                        placeholder="Your business name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">Business Type</label>
                                    <div className="relative">
                                        <select
                                            value={formData.businessType}
                                            onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                                            className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold appearance-none"
                                            required
                                        >
                                            <option value="">Select business type</option>
                                            {businessTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">Years of Experience</label>
                                    <input
                                        type="number"
                                        value={formData.yearsExperience}
                                        onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
                                        className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold placeholder:text-gray-300"
                                        placeholder="Years of experience"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between pt-8">
                                <Button
                                    onClick={prevStep}
                                    className="h-16 bg-gray-100 text-[#1D2939] rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-sm hover:translate-x-[-2px] transition-all"
                                >
                                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                    Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    disabled={!formData.businessName || !formData.businessType || !formData.yearsExperience}
                                    className="h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl hover:translate-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue Onboarding
                                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Location */}
                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-[#1D2939] mb-2 uppercase tracking-tighter">Location</h2>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                                    Where is your business located?
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">Country</label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                                        className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold placeholder:text-gray-300"
                                        placeholder="Country"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">State/Province</label>
                                        <input
                                            type="text"
                                            value={formData.state}
                                            onChange={(e) => setFormData({...formData, state: e.target.value})}
                                            className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold placeholder:text-gray-300"
                                            placeholder="State"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] ml-1">City</label>
                                        <input
                                            type="text"
                                            value={formData.city}
                                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                                            className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold placeholder:text-gray-300"
                                            placeholder="City"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-8">
                                <Button
                                    onClick={prevStep}
                                    className="h-16 bg-gray-100 text-[#1D2939] rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-sm hover:translate-x-[-2px] transition-all"
                                >
                                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                    Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    disabled={!formData.country || !formData.state || !formData.city}
                                    className="h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl hover:translate-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue Onboarding
                                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Services Offered */}
                    {step === 4 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-[#1D2939] mb-2 uppercase tracking-tighter">Services</h2>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                                    What event planning services do you offer?
                                </p>
                            </div>

                            <div className="space-y-4">
                                {services.map(service => (
                                    <div 
                                        key={service}
                                        onClick={() => handleServiceToggle(service)}
                                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                                            formData.services.includes(service)
                                                ? 'bg-[#1D2939] border-[#1D2939] text-white'
                                                : 'bg-white border-gray-100 hover:border-[#D0771E]/30'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                            formData.services.includes(service)
                                                ? 'border-[#D0771E] bg-[#D0771E]'
                                                : 'border-gray-300'
                                        }`}>
                                            {formData.services.includes(service) && (
                                                <CheckIcon className="w-4 h-4 text-white" />
                                            )}
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-tighter">{service}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between pt-8">
                                <Button
                                    onClick={prevStep}
                                    className="h-16 bg-gray-100 text-[#1D2939] rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-sm hover:translate-x-[-2px] transition-all"
                                >
                                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                    Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    disabled={formData.services.length === 0}
                                    className="h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl hover:translate-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue Onboarding
                                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Steps 5-8: Placeholder for additional steps */}
                    {step > 4 && step < 9 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-[#1D2939] mb-2 uppercase tracking-tighter">
                                    {step === 5 && 'Portfolio Setup'}
                                    {step === 6 && 'Pricing Structure'}
                                    {step === 7 && 'Availability'}
                                    {step === 8 && 'Profile Completion'}
                                </h2>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                                    {step === 5 && 'Add images of your previous work.'}
                                    {step === 6 && 'Set your pricing for different services.'}
                                    {step === 7 && 'Define your availability for new clients.'}
                                    {step === 8 && 'Complete your professional profile.'}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <p className="text-gray-600">This step would contain specific information for professional event planners.</p>
                                <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
                                    Content for step {step}
                                </div>
                            </div>

                            <div className="flex justify-between pt-8">
                                <Button
                                    onClick={prevStep}
                                    className="h-16 bg-gray-100 text-[#1D2939] rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-sm hover:translate-x-[-2px] transition-all"
                                >
                                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                    Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    className="h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl hover:translate-x-2 transition-all"
                                >
                                    Continue Onboarding
                                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 9: Completion */}
                    {step === 9 && (
                        <div className="animate-in zoom-in fade-in duration-700 flex flex-col items-center justify-center py-20 px-8">
                            {/* Background Accents */}
                            <div className="fixed inset-0 bg-[#F3F0EB]/30 -z-10 animate-pulse"></div>

                            <div className="w-40 h-40 bg-white rounded-[60px] shadow-2xl flex items-center justify-center mb-12 relative group">
                                <CheckCircleIcon className="w-20 h-20 text-[#D0771E] relative z-10 transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-2 border-4 border-dashed border-[#D0771E]/20 rounded-[50px] animate-spin-slow"></div>
                                <SparklesIcon className="absolute -top-4 -right-4 w-12 h-12 text-[#D0771E] animate-bounce" />
                            </div>

                            <h1 className="text-5xl font-black text-[#1D2939] mb-6 uppercase tracking-tight">Onboarding <span className="text-[#D0771E]">Complete.</span></h1>
                            <p className="text-sm font-medium text-gray-400 max-w-sm mb-12 leading-relaxed">
                                Welcome to Ariya, <strong className="text-[#1D2939] font-black font-serif italic text-lg">{formData.firstName || 'Professional Planner'}</strong>. <br /> Your journey to managing client events begins now.
                            </p>

                            <Button
                                onClick={handleRegister}
                                className="w-full max-w-xs h-18 bg-[#1D2939] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-110 transition-all mb-8 group flex items-center justify-center gap-4"
                            >
                                Start Professional Journey
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                            </Button>

                            <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.5em] animate-pulse">Ariya - Plan with perfection</p>
                        </div>
                    )}
                </div>

                {/* Bottom Footer Links */}
                {step !== 9 && (
                    <div className="flex gap-10 pt-16 mt-auto">
                        <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 hover:text-[#D0771E] transition-colors">Privacy Infrastructure</button>
                        <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 hover:text-[#D0771E] transition-colors">Legal Terms</button>
                    </div>
                )}
            </div>

            {/* --- RIGHT SIDE: VISUAL PANE --- */}
            {step !== 9 && renderVisualPane()}
        </div>
    );
};

export default ProfessionalPlannerSignup;