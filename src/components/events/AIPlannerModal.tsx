import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronUpDownIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface AIPlannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (formData: any) => void;
}

const occasionOptions = [
    { name: 'Wedding' },
    { name: 'Birthday' },
    { name: 'Corporate Event' },
    { name: 'Conference' },
    { name: 'Baby Shower' },
    { name: 'Graduation' },
    { name: 'Anniversary' },
    { name: 'Engagement' },
];

const budgetRanges = [
    { name: 'NGN 1M - NGN 5M' },
    { name: 'NGN 5M - NGN 10M' },
    { name: 'NGN 10M - NGN 30M' },
    { name: 'NGN 30M - NGN 50M' },
    { name: 'NGN 50M+' },
];

const atmosphereOptions = [
    { name: 'Elegant' },
    { name: 'Modern' },
    { name: 'Traditional' },
    { name: 'Casual' },
    { name: 'Romantic' },
    { name: 'Fun' },
    { name: 'Luxury' },
    { name: 'Vintage' },
];

const serviceOptions = [
    { name: 'Venue' },
    { name: 'Catering' },
    { name: 'Photographer' },
    { name: 'Sound/Audio' },
    { name: 'Decor' },
    { name: 'Security' },
    { name: 'Entertainment' },
    { name: 'Transportation' },
];

const AIPlannerModal: React.FC<AIPlannerModalProps> = ({ isOpen, onClose, onGenerate }) => {
    const [formData, setFormData] = useState({
        eventName: '',
        occasion: '',
        guestCount: '',
        budgetRange: '',
        atmosphere: '',
        eventDate: '',
        location: ''
    });
    const [selectedServices, setSelectedServices] = useState<{ name: string }[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleServiceToggle = (service: { name: string }) => {
        if (selectedServices.find(s => s.name === service.name)) {
            setSelectedServices(selectedServices.filter(s => s.name !== service.name));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleSubmit = () => {
        // Validate required fields
        if (!formData.eventName || !formData.occasion || !formData.guestCount || !formData.budgetRange || !formData.location) {
            alert('Please fill in all required fields');
            return;
        }

        // Validate guest count is a number
        if (isNaN(Number(formData.guestCount.replace(/,/g, '')))) {
            alert('Please enter a valid number for guests');
            return;
        }

        // Validate date is in the future
        if (formData.eventDate && new Date(formData.eventDate) < new Date()) {
            alert('Event date must be in the future');
            return;
        }

        setIsGenerating(true);
        setTimeout(() => {
            // Prepare form data for submission
            const submitData = {
                ...formData,
                guestCount: Number(formData.guestCount.replace(/,/g, '')),
                selectedServices: selectedServices.map(s => s.name)
            };
            onGenerate(submitData);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/60 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white dark:bg-gray-800 px-8 pb-8 pt-8 text-left shadow-2xl dark:shadow-none transition-all sm:my-8 sm:w-full sm:max-w-xl">

                                {/* Header */}
                                <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-xl">
                                            <SparklesIcon className="w-6 h-6 text-[#D0771E]" />
                                        </div>
                                        <div>
                                            <Dialog.Title as="h3" className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                                AI Event Planner
                                            </Dialog.Title>
                                            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest mt-1">Let AI design your perfect event</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="rounded-full p-2 bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Form */}
                                <div className="space-y-6">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Event Name */}
                                        <div className="md:col-span-2">
                                            <label htmlFor="eventName" className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Event Name/Title</label>
                                            <input
                                                id="eventName"
                                                name="eventName"
                                                type="text"
                                                value={formData.eventName}
                                                onChange={handleInputChange}
                                                className="block w-full rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                                placeholder="e.g. Tosin & John's Wedding"
                                            />
                                        </div>

                                        {/* Occasion */}
                                        <div>
                                            <label htmlFor="occasion" className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Occasion</label>
                                            <div className="relative">
                                                <select
                                                    id="occasion"
                                                    name="occasion"
                                                    value={formData.occasion}
                                                    onChange={handleInputChange}
                                                    className="block w-full appearance-none rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 pr-10 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all shadow-sm dark:shadow-none"
                                                >
                                                    <option value="">Select type</option>
                                                    {occasionOptions.map((option) => (
                                                        <option key={option.name} value={option.name.toLowerCase().replace(/\s+/g, '_')}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                                                    <ChevronUpDownIcon className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Guests */}
                                        <div>
                                            <label htmlFor="guestCount" className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Num. Guests</label>
                                            <input
                                                id="guestCount"
                                                name="guestCount"
                                                type="number"
                                                value={formData.guestCount}
                                                onChange={handleInputChange}
                                                className="block w-full rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                                placeholder="e.g. 500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Budget */}
                                        <div>
                                            <label htmlFor="budgetRange" className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Budget Range</label>
                                            <div className="relative">
                                                <select
                                                    id="budgetRange"
                                                    name="budgetRange"
                                                    value={formData.budgetRange}
                                                    onChange={handleInputChange}
                                                    className="block w-full appearance-none rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 pr-10 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all shadow-sm dark:shadow-none"
                                                >
                                                    <option value="">Select range</option>
                                                    {budgetRanges.map((range) => (
                                                        <option key={range.name} value={range.name}>
                                                            {range.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                                                    <ChevronUpDownIcon className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Atmosphere */}
                                        <div>
                                            <label htmlFor="atmosphere" className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Atmosphere</label>
                                            <div className="relative">
                                                <select
                                                    id="atmosphere"
                                                    name="atmosphere"
                                                    value={formData.atmosphere}
                                                    onChange={handleInputChange}
                                                    className="block w-full appearance-none rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 pr-10 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all shadow-sm dark:shadow-none"
                                                >
                                                    <option value="">Select vide</option>
                                                    {atmosphereOptions.map((option) => (
                                                        <option key={option.name} value={option.name.toLowerCase()}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                                                    <ChevronUpDownIcon className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Services Needed */}
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-3">Services Needed</label>
                                        <div className="flex flex-wrap gap-2">
                                            {serviceOptions.map(service => {
                                                const isSelected = selectedServices.some(s => s.name === service.name);
                                                return (
                                                    <button
                                                        key={service.name}
                                                        type="button"
                                                        onClick={() => handleServiceToggle(service)}
                                                        className={`inline-flex items-center rounded-xl px-3 py-2 text-xs font-bold transition-all border ${isSelected
                                                                ? 'bg-orange-50 dark:bg-orange-900/20 border-[#D0771E] text-[#D0771E] shadow-sm dark:shadow-none'
                                                                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                            }`}
                                                    >
                                                        {service.name}
                                                        {isSelected && <XMarkIcon className="ml-1.5 h-3 w-3" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Date */}
                                        <div>
                                            <label htmlFor="eventDate" className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Date</label>
                                            <div className="relative">
                                                <input
                                                    id="eventDate"
                                                    name="eventDate"
                                                    type="date"
                                                    value={formData.eventDate}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 pr-10 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div>
                                            <label htmlFor="location" className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Location</label>
                                            <div className="relative">
                                                <input
                                                    id="location"
                                                    name="location"
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 pr-10 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                                    placeholder="e.g. Lagos"
                                                />
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 dark:text-gray-500">
                                                    <MapPinIcon className="h-5 w-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <button
                                        type="button"
                                        className="flex w-full justify-center items-center rounded-2xl bg-[#D0771E] px-4 py-4 text-xs font-black text-white uppercase tracking-widest shadow-lg dark:shadow-none hover:bg-orange-600 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D0771E] disabled:opacity-70 disabled:cursor-not-allowed"
                                        onClick={handleSubmit}
                                        disabled={isGenerating}
                                    >
                                        {isGenerating ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                                        ) : (
                                            <SparklesIcon className="w-5 h-5 mr-2 animate-pulse" />
                                        )}
                                        {isGenerating ? 'Designing...' : 'Generate AI Recommendation'}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default AIPlannerModal;
