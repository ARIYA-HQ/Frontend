import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    XMarkIcon,
    CalendarIcon,
    ArrowDownTrayIcon,
    PencilSquareIcon,
    DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../ui/Button';
import { FormField } from '../../ui/FormField';
import PremiumCard from '../../ui/PremiumCard';

interface QuoteEngineProps {
    isOpen: boolean;
    onClose: () => void;
    inquiry: any;
    mode?: 'create' | 'view';
}

const QuoteEngine = ({ isOpen, onClose, inquiry, mode = 'create' }: QuoteEngineProps) => {
    const isViewMode = mode === 'view';

    const timeline = [
        { date: 'March 10, 2024', event: 'Initial Inquiry', description: 'Client submitted event requirements', status: 'completed' },
        { date: 'March 12, 2024', event: 'Quote Preparation', description: 'Customized quote created and reviewed', status: 'completed' },
        { date: 'March 15, 2024', event: 'Quote Sent', description: 'Quote delivered to client via email', status: 'completed' },
        { date: 'Pending', event: 'Client Response', description: 'Awaiting client decision', status: 'pending' },
    ];

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[#344054]/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className={`pointer-events-auto w-screen ${isViewMode ? 'max-w-5xl' : 'max-w-2xl'}`}>
                                    <div className="flex h-full flex-col bg-[#F3F0EB] dark:bg-gray-950 shadow-2xl relative overflow-hidden">
                                        {/* Header */}
                                        <div className="flex items-center justify-between px-10 py-8 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-[#F3F0EB]/80 dark:bg-gray-950/80 backdrop-blur-md z-10">
                                            <div>
                                                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-widest">
                                                    {isViewMode ? 'Quote Details' : 'Create Quotation'}
                                                </h2>
                                                <p className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.2em] mt-1">
                                                    {inquiry?.company || 'New Inquiry'} • {inquiry?.event || 'General Event'}
                                                </p>
                                            </div>
                                            <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                                                <XMarkIcon className="w-6 h-6 text-[#1D2939] dark:text-white" />
                                            </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto">
                                            {isViewMode ? (
                                                /* VIEW MODE CONTENT */
                                                <div className="flex flex-col lg:flex-row h-full">
                                                    {/* Main Content */}
                                                    <div className="flex-1 p-10 space-y-10">
                                                        {/* Status Banner */}
                                                        <div className="bg-gradient-to-br from-[#1A051D] via-[#2D0A31] to-[#1A051D] rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl">
                                                            <div className="absolute top-0 right-0 p-8">
                                                                <Button variant="outline" className="h-10 border-white/20 text-white hover:bg-white/10 text-[9px] font-black uppercase tracking-widest">
                                                                    <PencilSquareIcon className="w-4 h-4 mr-2" />
                                                                    Edit Quote
                                                                </Button>
                                                            </div>
                                                            <div className="flex items-center gap-3 mb-6">
                                                                <span className="px-3 py-1 bg-green-500 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                                                    <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
                                                                    ACTIVE • SENT
                                                                </span>
                                                            </div>
                                                            <h3 className="text-3xl font-black mb-1">{inquiry?.company}</h3>
                                                            <p className="text-xs font-black text-[#D0771E] tracking-[0.2em] uppercase mb-8 opacity-90">{inquiry?.event}</p>

                                                            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                                                                <div className="space-y-1">
                                                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Issue Date</p>
                                                                    <p className="text-xs font-black">March 15, 2024</p>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Expiration</p>
                                                                    <p className="text-xs font-black">March 29, 2024</p>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Quote ID</p>
                                                                    <p className="text-xs font-black uppercase">QT-2024-0B87</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Details Grid */}
                                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 p-10 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
                                                            <div className="space-y-1.5">
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#D0771E]">Event Date</p>
                                                                <p className="text-sm font-black text-[#1D2939] dark:text-white">April 12-14, 2024</p>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#D0771E]">Location</p>
                                                                <p className="text-sm font-black text-[#1D2939] dark:text-white">Transcorp Hilton, Abuja</p>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#D0771E]">Duration</p>
                                                                <p className="text-sm font-black text-[#1D2939] dark:text-white">3 Planning Days</p>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#D0771E]">Guest Count</p>
                                                                <p className="text-sm font-black text-[#1D2939] dark:text-white">150 Attendees</p>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#D0771E]">Event Type</p>
                                                                <p className="text-sm font-black text-[#1D2939] dark:text-white">Corporate Retreat</p>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#D0771E]">Coverage</p>
                                                                <p className="text-sm font-black text-[#1D2939] dark:text-white">Comprehensive</p>
                                                            </div>
                                                        </div>

                                                        {/* Services Table */}
                                                        <div className="space-y-6">
                                                            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-[#1D2939] dark:text-white pl-2">Services & Package Breakdown</h4>
                                                            <div className="p-10 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                                                                {[
                                                                    { name: 'Event Photography (3 Days)', price: '₦450,000' },
                                                                    { name: 'Professional Photo Editing', price: '₦85,000' },
                                                                    { name: 'High-Resolution Digital Gallery', price: '₦25,000' },
                                                                    { name: 'Same-Day Highlight Reel', price: '₦40,000' }
                                                                ].map((service, idx) => (
                                                                    <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 px-4 rounded-xl transition-colors">
                                                                        <span className="text-sm font-medium text-[#475467] dark:text-gray-300">{service.name}</span>
                                                                        <span className="text-sm font-black text-[#1D2939] dark:text-white">{service.price}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Totals Summary */}
                                                        <div className="p-10 bg-[#1D2939] dark:bg-black rounded-[32px] text-white space-y-6 shadow-2xl relative overflow-hidden">
                                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full -mr-32 -mt-32"></div>
                                                            <div className="space-y-4 relative z-10">
                                                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                                                                    <span>Subtotal</span>
                                                                    <span>₦600,000</span>
                                                                </div>
                                                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                                                                    <span>Corporate Discount (5%)</span>
                                                                    <span className="text-emerald-400">-₦30,000</span>
                                                                </div>
                                                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                                                                    <span>VAT Compliance (7.5%)</span>
                                                                    <span>₦42,750</span>
                                                                </div>
                                                            </div>
                                                            <div className="pt-8 border-t border-white/10 flex justify-between items-center relative z-10">
                                                                <span className="text-sm font-black uppercase tracking-widest">Total Quotation Value</span>
                                                                <span className="text-3xl font-black text-[#D0771E]">₦612,750</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Sidebar: Timeline & Profile */}
                                                    <div className="w-full lg:w-96 bg-white/40 dark:bg-gray-900/40 p-10 space-y-12 backdrop-blur-sm border-l border-gray-100 dark:border-gray-800">
                                                        {/* Client Profile */}
                                                        <div className="space-y-6">
                                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D0771E]">Requester Profile</h4>
                                                            <div className="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm group">
                                                                <div className="relative mb-6">
                                                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" alt="Client" className="w-24 h-24 rounded-[32px] object-cover shadow-xl group-hover:scale-110 transition-transform duration-500" />
                                                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#D0771E] rounded-2xl flex items-center justify-center text-white border-4 border-white dark:border-gray-900">
                                                                        <CalendarIcon className="w-4 h-4" />
                                                                    </div>
                                                                </div>
                                                                <h4 className="text-lg font-black text-[#1D2939] dark:text-white">Timilehin Oripeloye</h4>
                                                                <p className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest mt-1">Lead Event Planner</p>
                                                                <div className="mt-6 pt-6 border-t border-gray-50 dark:border-gray-800 w-full flex justify-center gap-4">
                                                                    <Button variant="outline" className="h-10 px-6 rounded-xl text-[9px] border-gray-200 dark:border-gray-700 dark:text-gray-300">View Profile</Button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Quote Timeline */}
                                                        <div className="space-y-8">
                                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D0771E]">Audit Trail</h4>
                                                            <div className="space-y-10 pl-2">
                                                                {timeline.map((item, idx) => (
                                                                    <div key={idx} className="relative pl-8">
                                                                        {idx !== timeline.length - 1 && (
                                                                            <div className="absolute left-[3.5px] top-4 bottom-[-40px] w-[1px] border-l-2 border-dashed border-gray-100 dark:border-gray-800"></div>
                                                                        )}
                                                                        <div className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full border-2 dark:border-gray-700 bg-white dark:bg-gray-800 ${item.status === 'completed' ? 'border-[#D0771E] dark:border-[#D0771E] shadow-[0_0_8px_rgba(208,119,30,0.4)]' : 'border-gray-200'}`}></div>
                                                                        <div className="space-y-1.5">
                                                                            <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{item.date}</p>
                                                                            <p className="text-xs font-black text-[#1D2939] dark:text-white uppercase tracking-tight">{item.event}</p>
                                                                            <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 leading-relaxed">{item.description}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="space-y-4 pt-10 border-t border-gray-100 dark:border-gray-800">
                                                            <Button className="w-full h-14 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white flex items-center justify-center gap-3">
                                                                <ArrowDownTrayIcon className="w-5 h-5" />
                                                                Export Quotation
                                                            </Button>
                                                            <Button variant="outline" className="w-full h-14 rounded-2xl border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center gap-3">
                                                                <DocumentDuplicateIcon className="w-5 h-5" />
                                                                Duplicate Quote
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* CREATE MODE CONTENT */
                                                <div className="p-10 space-y-10">
                                                    {/* Section Label */}
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-1.5 h-6 bg-[#D0771E] rounded-full"></div>
                                                        <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-[#1D2939] dark:text-white">Basic Information</h4>
                                                    </div>

                                                    {/* Quote Info Input Group */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-900 p-10 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
                                                        <div className="md:col-span-2">
                                                            <FormField
                                                                label="Quote Title"
                                                                placeholder="Sarah & Johnson's Premium Wedding Package"
                                                            />
                                                        </div>
                                                        <FormField
                                                            label="Event Date"
                                                            placeholder="15 / 06 / 2025"
                                                        />
                                                        <FormField
                                                            label="Expiration Date"
                                                            placeholder="30 / 06 / 2025"
                                                        />
                                                        <div className="md:col-span-2">
                                                            <FormField
                                                                label="Additional Notes & Terms"
                                                                rows={4}
                                                                placeholder="Describe what's included in your service... e.g. Travel costs, editing timeline, equipment list."
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Services Section */}
                                                    <div className="space-y-8">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-1.5 h-6 bg-[#D0771E] rounded-full"></div>
                                                                <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-[#1D2939] dark:text-white">Services & Pricing</h4>
                                                            </div>
                                                            <Button variant="ghost" className="text-[#D0771E] text-[10px] font-black uppercase tracking-widest">+ Add Row</Button>
                                                        </div>

                                                        <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                                                            <div className="p-2 space-y-1">
                                                                {[
                                                                    { name: 'Full Day Event Photography', price: '450,000' },
                                                                    { name: 'Premium Photo Album (High-Gloss)', price: '120,000' }
                                                                ].map((item, idx) => (
                                                                    <div key={idx} className="flex flex-col md:flex-row gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-[24px] transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0">
                                                                        <div className="flex-1">
                                                                            <FormField label="Service Name" defaultValue={item.name} className="bg-transparent border-0 p-0 shadow-none focus:ring-0 text-[#1D2939] dark:text-white" />
                                                                        </div>
                                                                        <div className="w-full md:w-48">
                                                                            <FormField label="Price (₦)" defaultValue={item.price} className="bg-transparent border-0 p-0 shadow-none focus:ring-0 text-[#1D2939] dark:text-white" />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <div className="p-10 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[24px] flex flex-col items-center justify-center group hover:border-[#D0771E]/30 transition-all cursor-pointer">
                                                                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-300 dark:text-gray-600 group-hover:bg-[#D0771E] group-hover:text-white transition-all mb-4">
                                                                        <PencilSquareIcon className="w-6 h-6" />
                                                                    </div>
                                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 dark:text-gray-600 group-hover:text-[#D0771E]">Click to Add More Services</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Totals Summary */}
                                                    <div className="p-10 bg-[#1D2939] dark:bg-black rounded-[32px] text-white space-y-6 shadow-2xl">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                            <div className="space-y-4">
                                                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                                                                    <span>Subtotal</span>
                                                                    <span>₦570,000</span>
                                                                </div>
                                                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                                                                    <span>Processing Fee (5%)</span>
                                                                    <span>₦28,500</span>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                                                                    <span>Tax (VAT 7.5%)</span>
                                                                    <span>₦42,750</span>
                                                                </div>
                                                                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                                                                    <span className="text-sm font-black uppercase tracking-widest">Estimated Total</span>
                                                                    <span className="text-3xl font-black text-[#D0771E]">₦641,250</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer Buttons */}
                                        <div className="p-10 border-t border-gray-100 dark:border-gray-800 bg-[#F3F0EB]/80 dark:bg-gray-950/80 backdrop-blur-md sticky bottom-0 z-10">
                                            {!isViewMode && (
                                                <div className="flex gap-4">
                                                    <Button variant="outline" className="flex-1 h-14 rounded-2xl border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-black uppercase tracking-widest text-[11px]" onClick={onClose}>
                                                        Discard Draft
                                                    </Button>
                                                    <Button className="flex-[2] h-14 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white font-black uppercase tracking-widest text-[11px]">
                                                        Finalize & Send Quotation
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default QuoteEngine;
