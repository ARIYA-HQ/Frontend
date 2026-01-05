import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon, CalendarIcon, ChevronDownIcon, CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface GetQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendorName: string;
}

const steps = ['Event Details', 'Venue Details', 'Guest Info', 'Budget', 'Services'];

const GetQuoteModal: React.FC<GetQuoteModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        eventType: 'Wedding',
        eventName: 'Wedding',
        eventDate: '',
        dateFlexible: false,
        venueName: '',
        venueAddress: '',
        noVenue: false,
        userRole: '',
        guests: '',
        guestTypes: ['Adult', 'Children', 'VIPs'],
        budgetRange: 'NGN 30,000 - NGN 90,000',
        budgetNotHere: false,
        customBudget: '',
        hardBudget: false,
        selectedServices: ['Onsite photography, pre-wedding shoot'],
        package: 'Basic (starts from NGN 600,000.00)'
    });

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        } else {
            // Submit logic here
            setIsSubmitted(true);
        }
    };

    const handleDone = () => {
        setIsSubmitted(false);
        setActiveStep(0);
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-10">
                <div className="w-screen max-w-md transform transition-all sm:duration-500 sm:ease-in-out">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">

                        {/* Header */}
                        <div className="px-6 py-8 border-b border-gray-100 bg-white">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Get Quotes</h2>
                                <button type="button" className="rounded-full p-2 bg-gray-50 text-gray-400 hover:text-[#D0771E] hover:bg-orange-50 transition-colors" onClick={onClose}>
                                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Premium Stepper */}
                            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                                {steps.map((step, index) => (
                                    <button
                                        key={step}
                                        onClick={() => !isSubmitted && setActiveStep(index)}
                                        disabled={isSubmitted}
                                        className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                            ${activeStep === index
                                                ? 'bg-[#262626] text-white shadow-md'
                                                : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                                            }
                        `}
                                    >
                                        {step}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative mt-6 flex-1 px-6 flex flex-col">

                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
                                    <div className="mb-8 relative">
                                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                                        <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 relative z-10">
                                            <CheckCircleIcon className="h-12 w-12" strokeWidth={2} />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">Quote Submitted</h3>
                                    <p className="text-sm font-medium text-gray-500 max-w-xs mx-auto mb-10 leading-relaxed">
                                        Your quote request has been successfully submitted! The vendor will review your details and respond shortly.
                                    </p>

                                    <div className="flex flex-col w-full gap-4">
                                        <button
                                            onClick={() => {
                                                handleDone();
                                                navigate('/dashboard/my-vendors');
                                            }}
                                            className="w-full rounded-2xl bg-[#D0771E] px-6 py-4 text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-orange-600 hover:shadow-orange-300 transition-all focus:outline-none flex items-center justify-center gap-2"
                                        >
                                            Track Inquiries
                                        </button>
                                        <button
                                            onClick={handleDone}
                                            className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-xs font-black text-gray-600 uppercase tracking-widest hover:bg-gray-50 transition-all focus:outline-none"
                                        >
                                            Done
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8 pb-8">
                                    {activeStep === 0 && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Event Type</label>
                                                <div className="relative">
                                                    <select className="block w-full rounded-2xl border-0 bg-gray-50 py-3.5 pl-4 pr-10 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all">
                                                        <option>Wedding</option>
                                                        <option>Corporate</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Event Name</label>
                                                <input type="text" defaultValue="Wedding" className="block w-full rounded-2xl border-0 bg-gray-50 py-3.5 pl-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all placeholder:text-gray-400" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Event Date</label>
                                                <div className="relative">
                                                    <input type="text" placeholder="Select Date" className="block w-full rounded-2xl border-0 bg-gray-50 py-3.5 pl-4 pr-10 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all placeholder:text-gray-400" />
                                                    <CalendarIcon className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#D0771E] focus:ring-[#D0771E] bg-white" />
                                                <label className="ml-3 block text-xs font-bold text-gray-600">My date is flexible</label>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 1 && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Venue Name</label>
                                                <input type="text" placeholder="e.g. The Grand Hotel" className="block w-full rounded-2xl border-0 bg-gray-50 py-3.5 pl-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all placeholder:text-gray-400" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Venue Address</label>
                                                <input type="text" placeholder="Enter full address" className="block w-full rounded-2xl border-0 bg-gray-50 py-3.5 pl-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all placeholder:text-gray-400" />
                                            </div>
                                            <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#D0771E] focus:ring-[#D0771E] bg-white" />
                                                <label className="ml-3 block text-xs font-bold text-gray-600">No venue yet</label>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 2 && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Expected Guests</label>
                                                <input type="text" placeholder="e.g. 150" className="block w-full rounded-2xl border-0 bg-gray-50 py-3.5 pl-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all placeholder:text-gray-400" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Guest Type</label>
                                                <div className="w-full rounded-2xl bg-gray-50 p-3 flex flex-wrap gap-2 items-center min-h-[50px]">
                                                    {['Adult', 'Children', 'VIPs'].map(tag => (
                                                        <span key={tag} className={`inline-flex items-center rounded-xl px-3 py-1.5 text-xs font-bold ring-1 ring-inset transition-all ${tag === 'VIPs' ? 'bg-red-50 text-red-700 ring-red-100' : 'bg-white text-gray-700 ring-gray-100 shadow-sm'}`}>
                                                            {tag}
                                                            <button type="button" className="ml-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full hover:bg-black/5 focus:outline-none">
                                                                <span className="sr-only">Remove {tag}</span>
                                                                <XMarkIcon className="h-3 w-3" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                    <button className="ml-auto p-1 text-gray-400 hover:text-gray-600">
                                                        <ChevronDownIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 3 && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Budget Range</label>
                                                <div className="relative">
                                                    <select className="block w-full rounded-2xl border-0 bg-gray-50 py-3.5 pl-4 pr-10 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all">
                                                        <option>NGN 30,000 - NGN 90,000</option>
                                                        <option>NGN 100,000 - NGN 500,000</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#D0771E] focus:ring-[#D0771E] bg-white" />
                                                <label className="ml-3 block text-xs font-bold text-gray-600">I haven't decided on a budget</label>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Enter Custom Budget</label>
                                                <input type="text" placeholder="NGN 30,000 - NGN 90,000" className="block w-full rounded-2xl border-0 bg-gray-50 py-3.5 pl-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all placeholder:text-gray-400" />
                                            </div>
                                            <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#D0771E] focus:ring-[#D0771E] bg-white" />
                                                <label className="ml-3 block text-xs font-bold text-gray-600">This is a hard budget</label>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 4 && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Selected Services</label>
                                                <div className="relative">
                                                    <select className="block w-full rounded-2xl border-0 bg-gray-50 py-3.5 pl-4 pr-10 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all">
                                                        <option>Onsite photography, pre-wedding shoot...</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Package Preference</label>
                                                <div className="relative">
                                                    <select className="block w-full rounded-2xl border-0 bg-gray-50 py-3.5 pl-4 pr-10 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all">
                                                        <option>Basic (starts from NGN 600,000.00)</option>
                                                        <option>Premium</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        {!isSubmitted && (
                            <div className="border-t border-gray-100 px-6 py-6 bg-white mt-auto">
                                <button
                                    onClick={handleNext}
                                    className="w-full rounded-2xl bg-[#D0771E] px-6 py-4 text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-orange-600 hover:shadow-orange-300 transition-all focus:outline-none focus:ring-2 focus:ring-[#D0771E] focus:ring-offset-2 flex items-center justify-center gap-2 group"
                                >
                                    {activeStep === steps.length - 1 ? 'Submit Request' : 'Continue'}
                                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetQuoteModal;
