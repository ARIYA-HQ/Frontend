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
import { redirectToRoleSubdomain } from '../../utils/subdomain';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const PlannerSignup = () => {
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
        eventType: '',
        eventDate: '',
        country: '',
        state: '',
        city: '',
        budget: '',
        guests: '',
        services: [] as string[],
        style: ''
    });

    const eventTypes = ["Wedding", "Birthday", "Corporate", "Baby Shower", "Anniversary", "Sports", "Concert", "Bridal Showers", "Fashion Shows", "Workshops"];

    const services = [
        "Photographer", "Videographer", "Officiant", "Caterers",
        "DJ/Band/Musicians", "Sound Technician", "Makeup Artist",
        "Venues", "Rental Company", "Cake/Dessert Vendor",
        "Lighting Technician", "Transportation Services",
        "Hair & Makeup Artists", "Photo Booth Provider",
        "Decorators/Event Designer", "Bartending Service",
        "Event Security", "Comedian", "Dancer", "Magician",
        "Rentals", "Others"
    ];

    const styles = ["Classic", "Modern", "Rustic", "Bold", "Cultural", "Mixed"];

    const toggleService = (service: string) => {
        setFormData(prev => {
            if (prev.services.includes(service)) {
                return { ...prev, services: prev.services.filter(s => s !== service) };
            }
            return { ...prev, services: [...prev.services, service] };
        });
    };

    const nextStep = () => setStep(prev => (prev < 9 ? prev + 1 : prev) as Step);
    const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev) as Step);

    const progress = (step / 9) * 100;

    const renderVisualPane = () => {
        const imageUrl = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop";

        return (
            <div className="hidden lg:flex w-1/2 relative min-h-screen sticky top-0 overflow-hidden">
                <img
                    src={imageUrl}
                    alt="Celebration"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] scale-110"
                />
                <div className="absolute inset-0 bg-[#1D2939]/40 mix-blend-multiply"></div>
                <div className="absolute inset-x-0 bottom-0 p-24 bg-gradient-to-t from-[#1D2939]/90 via-[#1D2939]/40 to-transparent">
                    <div className="max-w-xl">
                        <div className="w-12 h-1 bg-[#D0771E] mb-10"></div>
                        <h2 className="text-white text-5xl xl:text-6xl font-black leading-[1.1] mb-8 uppercase tracking-tighter">
                            Planning <br /> Perfection <br /> <span className="text-[#D0771E]">Together.</span>
                        </h2>
                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-4">
                                {[3, 5, 7, 9].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1D2939] overflow-hidden bg-white/10 backdrop-blur-md">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">Join 15k+ Premium Planners</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-900 selection:bg-[#D0771E]/30 transition-colors">
            {/* --- LEFT SIDE: FORM PANE --- */}
            <div className={`w-full ${step === 9 ? 'lg:w-full' : 'lg:w-1/2'} flex flex-col p-8 sm:p-12 lg:p-20 relative transition-all duration-700`}>
                {/* Background Accent */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#F3F0EB]/50 dark:bg-gray-800/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10"></div>
                
                {/* Progress Bar */}
                {step !== 9 && (
                    <div className="fixed top-0 left-0 w-full h-1 bg-gray-50 dark:bg-gray-800 z-[60]">
                        <div
                            className="h-full bg-[#D0771E] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(208,119,30,0.5)]"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                {/* Top Nav */}
                <div className="flex justify-between items-center mb-16 lg:mb-20">
                    <div className="text-[#D0771E] font-black text-4xl tracking-tighter uppercase italic">Àriyá</div>
                    {step !== 9 && (
                        <div className="flex items-center gap-6">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-[9px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">Onboarding Phase</span>
                                <span className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Step {step} of 9</span>
                            </div>
                            {step > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-[#1D2939] dark:text-white hover:bg-[#1D2939] dark:hover:bg-gray-700 hover:text-white transition-all"
                                >
                                    <ArrowLeftIcon className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className={`${step === 9 ? 'max-w-2xl text-center' : 'max-w-md'} w-full mx-auto lg:mx-0 flex-1 flex flex-col justify-center`}>

                    {/* STEP 1: ACCOUNT CREATION */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-10">
                                <h1 className="text-4xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter">Initialize Account</h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">Enter your professional details to establish your planner identity.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">First Name</label>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Last Name</label>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Secure Access Code"
                                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                        />
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-500 hover:text-[#D0771E] transition-colors outline-none"
                                        >
                                            {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    onClick={nextStep}
                                    className="w-full h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-orange-100 dark:shadow-none hover:translate-y-[-2px] transition-all mt-4"
                                >
                                    Proceed to Event Profiles
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: EVENT TYPE */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter leading-tight">What type of <span className="text-[#D0771E]">Event</span> are you architecting?</h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Select the primary focus of your milestone.</p>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-12">
                                {eventTypes.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setFormData({ ...formData, eventType: type })}
                                        className={`px-6 py-4 rounded-2xl border text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${formData.eventType === type
                                            ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 text-white shadow-xl dark:shadow-none translate-y-[-2px]'
                                            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-[#1D2939] dark:text-white hover:border-[#D0771E] dark:hover:border-[#D0771E]/50 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            } `}
                                    >
                                        {type}
                                        {formData.eventType === type && <CheckIcon className="w-4 h-4 text-[#D0771E]" />}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button onClick={nextStep} className="w-full h-16 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-[#D0771E] shadow-orange-100 dark:shadow-none">Proceed to Scheduling</Button>
                                <button onClick={nextStep} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors py-4">Skip for later</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: EVENT DATE */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter leading-tight">When is the <span className="text-[#D0771E]">Commencement?</span></h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Select your target timeline for the event.</p>
                            </div>

                            <div className="space-y-4 mb-12">
                                {["Within 3 Months", "In 6 Months", "In 1 Year", "Undetermined"].map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setFormData({ ...formData, eventDate: time })}
                                        className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 ${formData.eventDate === time
                                            ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 text-white shadow-xl dark:shadow-none'
                                            : 'bg-white dark:bg-gray-800 border-gray-50 dark:border-gray-700 hover:border-[#D0771E] dark:hover:border-[#D0771E]/50 text-[#1D2939] dark:text-white'
                                            }`}
                                    >
                                        <span className="text-sm font-black uppercase tracking-widest">{time}</span>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.eventDate === time ? 'bg-[#D0771E] border-[#D0771E]' : 'border-gray-100 dark:border-gray-600'}`}>
                                            {formData.eventDate === time && <CheckIcon className="w-3 h-3 text-white" />}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button onClick={nextStep} className="w-full h-16 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-[#D0771E] shadow-orange-100 dark:shadow-none">Proceed to Location</Button>
                                <button onClick={nextStep} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors py-4">Skip for later</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: LOCATION */}
                    {step === 4 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter leading-tight">Where is the <span className="text-[#D0771E]">Geographic Focus?</span></h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest font-mono">Input coordinates for logistical mapping.</p>
                            </div>

                            <div className="space-y-6 mb-12">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Country</label>
                                    <div className="relative">
                                        <select className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white appearance-none">
                                            <option>Nigeria</option>
                                            <option>United Kingdom</option>
                                            <option>United States</option>
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
                                            <option>Port Harcourt</option>
                                        </select>
                                        <ChevronDownIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Metropolitan City</label>
                                    <input type="text" placeholder="Ex: Victoria Island" className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button onClick={nextStep} className="w-full h-16 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-[#D0771E] shadow-orange-100 dark:shadow-none">Configure Budget</Button>
                                <button onClick={nextStep} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors py-4">Skip for later</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: BUDGET */}
                    {step === 5 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter leading-tight">Financial <span className="text-[#D0771E]">Parameters?</span></h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Define your investment range for the event.</p>
                            </div>

                            <div className="space-y-6 mb-12">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1 block">Expected Budget Spectrum</label>
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { label: "Essential", range: "₦5M - ₦10M" },
                                            { label: "Elite", range: "₦10M - ₦25M" },
                                            { label: "Imperial", range: "₦25M - ₦100M+" }
                                        ].map(tier => (
                                            <button
                                                key={tier.label}
                                                onClick={() => setFormData({ ...formData, budget: tier.label })}
                                                className={`p-6 rounded-2xl border-2 text-left flex items-center justify-between transition-all duration-300 ${formData.budget === tier.label ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 text-white' : 'bg-white dark:bg-gray-800 border-gray-50 dark:border-gray-700 hover:border-[#D0771E] dark:hover:border-[#D0771E]/50'
                                                    }`}
                                            >
                                                <div>
                                                    <span className="text-sm font-black uppercase tracking-widest block">{tier.label}</span>
                                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 font-mono mt-1">{tier.range}</span>
                                                </div>
                                                <div className={`w-8 h-8 rounded-[12px] flex items-center justify-center ${formData.budget === tier.label ? 'bg-[#D0771E]' : 'bg-gray-50 dark:bg-gray-700'}`}>
                                                    <CheckIcon className={`w-5 h-5 ${formData.budget === tier.label ? 'text-white' : 'text-gray-200 dark:text-gray-400'}`} />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-gray-300 dark:text-gray-600 mt-4 italic text-center">Calculated based on location and event archetype.</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button onClick={nextStep} className="w-full h-16 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-[#D0771E] shadow-orange-100 dark:shadow-none">Set Capacity</Button>
                                <button onClick={nextStep} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors py-4">Skip for later</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 6: GUESTS */}
                    {step === 6 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter leading-tight">Scale & <span className="text-[#D0771E]">Capacity?</span></h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Expected guest attendance for logistics mapping.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-12">
                                {["50 - 100", "100 - 250", "250 - 500", "500 - 1000", "1000 - 5000", "5000+"].map(cap => (
                                    <button
                                        key={cap}
                                        onClick={() => setFormData({ ...formData, guests: cap })}
                                        className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${formData.guests === cap
                                            ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 text-white shadow-xl dark:shadow-none translate-y-[-2px]'
                                            : 'bg-white dark:bg-gray-800 border-gray-50 dark:border-gray-700 text-[#1D2939] dark:text-white hover:border-[#D0771E] dark:hover:border-[#D0771E]/50 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <span className="text-xl font-black block">{cap}</span>
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mt-1">Guests</span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button onClick={nextStep} className="w-full h-16 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-[#D0771E] shadow-orange-100 dark:shadow-none">Service Requirements</Button>
                                <button onClick={nextStep} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors py-4">Skip for later</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 7: SERVICES */}
                    {step === 7 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter leading-tight">Service <span className="text-[#D0771E]">Ecosystem?</span></h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest text-[#D0771E]">Select the premium vendors required for your vision.</p>
                            </div>

                            <div className="flex flex-wrap gap-2.5 mb-12 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                                {services.map(service => (
                                    <button
                                        key={service}
                                        onClick={() => toggleService(service)}
                                        className={`px-5 py-3.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${formData.services.includes(service)
                                            ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 text-white shadow-xl dark:shadow-none'
                                            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-[#D0771E] dark:hover:border-[#D0771E]/50 hover:text-[#1D2939] dark:hover:text-white'
                                            }`}
                                    >
                                        {service}
                                        {formData.services.includes(service) && <div className="w-2 h-2 rounded-full bg-[#D0771E] shadow-[0_0_8px_#D0771E]"></div>}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button onClick={nextStep} className="w-full h-16 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-[#D0771E] shadow-orange-100 dark:shadow-none">Aesthetic Aesthetic</Button>
                                <button onClick={nextStep} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors py-4">Skip for later</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 8: STYLE */}
                    {step === 8 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter leading-tight">Mood & <span className="text-[#D0771E]">Aesthetic?</span></h1>
                                <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest italic">Define the atmospheric soul of your event.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-12">
                                {styles.map(style => (
                                    <button
                                        key={style}
                                        onClick={() => setFormData({ ...formData, style })}
                                        className={`p-10 rounded-[40px] border-2 transition-all duration-500 flex flex-col items-center justify-center gap-4 group ${formData.style === style
                                            ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 shadow-2xl dark:shadow-none scale-105'
                                            : 'bg-white dark:bg-gray-800 border-gray-50 dark:border-gray-700 hover:border-[#D0771E]/30 dark:hover:border-[#D0771E]/50'
                                            }`}
                                    >
                                        <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center transition-all ${formData.style === style ? 'bg-white/10 dark:bg-gray-700/50' : 'bg-gray-50 dark:bg-gray-700 group-hover:bg-[#D0771E]/10 dark:group-hover:bg-[#D0771E]/20'}`}>
                                            <SparklesIcon className={`w-8 h-8 ${formData.style === style ? 'text-white' : 'text-gray-200 dark:text-gray-500 group-hover:text-[#D0771E]'}`} />
                                        </div>
                                        <span className={`text-sm font-black uppercase tracking-widest ${formData.style === style ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-[#1D2939] dark:group-hover:text-white'}`}>{style}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button onClick={nextStep} className="w-full h-16 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-[#D0771E] shadow-orange-100 dark:shadow-none shadow-2xl">Finalize Onboarding</Button>
                                <button onClick={nextStep} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors py-4">Skip it all</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 9: SUCCESS */}
                    {step === 9 && (
                        <div className="animate-in zoom-in fade-in duration-700 flex flex-col items-center justify-center py-20 px-8">
                            {/* Background Accents */}
                            <div className="fixed inset-0 bg-[#F3F0EB]/30 dark:bg-gray-900/50 -z-10 animate-pulse"></div>

                            <div className="w-40 h-40 bg-white dark:bg-gray-800 rounded-[60px] shadow-2xl dark:shadow-none flex items-center justify-center mb-12 relative group">
                                <CheckCircleIcon className="w-20 h-20 text-[#D0771E] relative z-10 transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-2 border-4 border-dashed border-[#D0771E]/20 rounded-[50px] animate-spin-slow"></div>
                                <SparklesIcon className="absolute -top-4 -right-4 w-12 h-12 text-[#D0771E] animate-bounce" />
                            </div>

                            <h1 className="text-5xl font-black text-[#1D2939] dark:text-white mb-6 uppercase tracking-tight">Onboarding <span className="text-[#D0771E]">Complete.</span></h1>
                            <p className="text-sm font-medium text-gray-400 dark:text-gray-500 max-w-sm mb-12 leading-relaxed">
                                Welcome to Ariya, <strong className="text-[#1D2939] dark:text-white font-black font-serif italic text-lg">{formData.firstName || 'Elite Planner'}</strong>. <br /> Your architectural journey into premium events begins now.
                            </p>

                            <Button
                                onClick={() => redirectToRoleSubdomain('personal_planner')}
                                className="w-full max-w-xs h-18 bg-[#1D2939] dark:bg-gray-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl dark:shadow-none hover:scale-110 transition-all mb-8 group flex items-center justify-center gap-4"
                            >
                                Start Onboarding
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                            </Button>

                            <p className="text-[10px] text-gray-300 dark:text-gray-600 font-black uppercase tracking-[0.5em] animate-pulse">Ariya - Plan with perfection</p>
                        </div>
                    )}
                </div>

                {/* Bottom Footer Links */}
                {step !== 9 && (
                    <div className="flex gap-10 pt-16 mt-auto">
                        <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors">Privacy Infrastructure</button>
                        <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors">Legal Terms</button>
                    </div>
                )}
            </div>

            {/* --- RIGHT SIDE: VISUAL PANE --- */}
            {step !== 9 && renderVisualPane()}
        </div>
    );
};

export default PlannerSignup;
