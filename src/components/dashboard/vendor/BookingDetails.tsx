import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    XMarkIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    SparklesIcon,
    ShieldCheckIcon,
    ArrowPathIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/ui/Button';
import { Booking } from '../../../data/mockData';

interface BookingDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
}

const BookingDetails = ({ isOpen, onClose, booking }: BookingDetailsProps) => {
    if (!booking) return null;

    const timeline = [
        { date: 'March 10, 2024', event: 'Initial Inquiry', description: 'Client submitted event requirements', status: 'completed' },
        { date: 'March 12, 2024', event: 'Quote Sent', description: 'Quote delivered to client via DM', status: 'completed' },
        { date: 'March 15, 2024', event: 'Contract Signed', description: 'Quote delivered to client via email', status: 'completed' },
        { date: 'March 20, 2024', event: 'Deposit Received', description: 'First payment received by vendor', status: 'completed' },
        { date: 'April 1, 2024', event: 'Final Payment Due', description: 'Payment of final fee of vendor', status: 'pending' },
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
                    <div className="fixed inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-md transition-opacity" />
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
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                                    <div className="flex h-full flex-col bg-[#F3F0EB] dark:bg-gray-950 shadow-2xl relative overflow-y-auto">
                                        {/* Header */}
                                        <div className="px-8 py-8 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-[#F3F0EB]/80 dark:bg-gray-950/80 backdrop-blur-xl z-20 flex items-center justify-between">
                                            <div>
                                                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Booking Details</h2>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest">#{booking.id?.slice(0, 8).toUpperCase() || 'REF-8823'}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Order Status: Active</span>
                                                </div>
                                            </div>
                                            <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-gray-800 rounded-2xl transition-all group">
                                                <XMarkIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-[#D0771E]" />
                                            </button>
                                        </div>

                                        <div className="p-8 space-y-12">
                                            {/* Status Summary Banner */}
                                            <div className="p-8 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                                                <div className="flex justify-between items-center">
                                                    <div className="space-y-1.5">
                                                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">CONTRACT STATUS</p>
                                                        <span className="px-4 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-black rounded-full border border-green-100 dark:border-green-800 uppercase tracking-widest">SIGNED</span>
                                                    </div>
                                                    <div className="text-right space-y-1.5">
                                                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">PAYMENT STATUS</p>
                                                        <span className="px-4 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-black rounded-full border border-green-100 dark:border-green-800 uppercase tracking-widest">FULLY PAID</span>
                                                    </div>
                                                </div>
                                                <div className="pt-8 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                                                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">TOTAL AMOUNT PAID</p>
                                                    <span className="text-xl font-black text-[#1D2939] dark:text-white">₦49,030,030</span>
                                                </div>
                                            </div>

                                            {/* Event Core Info */}
                                            <div className="space-y-6">
                                                <h4 className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                                                    <CalendarDaysIcon className="w-4 h-4 text-[#D0771E]" />
                                                    Event Overview
                                                </h4>
                                                <div className="grid grid-cols-2 gap-8 p-8 bg-white/60 dark:bg-gray-900/60 rounded-[32px] border border-white/40 dark:border-gray-800/40">
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">EVENT DATE</p>
                                                        <p className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase">April 12-14, 2024</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">LOCATION</p>
                                                        <p className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase">Transcorp Hilton, Abuja</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">GUEST COUNT</p>
                                                        <p className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase">150 Attendees</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">EVENT TYPE</p>
                                                        <p className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase">Corporate Retreat</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Client Information */}
                                            <div className="space-y-6">
                                                <h4 className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                                                    <UserGroupIcon className="w-4 h-4 text-[#D0771E]" />
                                                    Client Information
                                                </h4>
                                                <div className="grid grid-cols-1 gap-6 p-8 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800">
                                                    <div className="flex justify-between items-center">
                                                        <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">FULL NAME</p>
                                                        <p className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase">{booking.clientName || 'MICHAEL CHAN'}</p>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">PHONE NUMBER</p>
                                                        <p className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase tracking-tight">+234 802 345 6789</p>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">EMAIL ADDRESS</p>
                                                        <p className="text-[11px] font-black text-[#1D2939] dark:text-white hover:text-[#D0771E] transition-colors">michael.chen@company.com</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Services & Package */}
                                            <div className="space-y-6">
                                                <h4 className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                                                    <SparklesIcon className="w-4 h-4 text-[#D0771E]" />
                                                    Services & Package
                                                </h4>
                                                <div className="space-y-4 p-8 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800">
                                                    {[
                                                        { name: 'Full Day Wedding Photography', price: '₦45,303,234' },
                                                        { name: 'Engagement Photo Session', price: '₦150,000' },
                                                        { name: 'Premium Photo Album', price: '₦120,000' },
                                                        { name: 'Online Gallery (1 Year)', price: '₦50,000' }
                                                    ].map((item, idx) => (
                                                        <div key={idx} className="flex justify-between items-center">
                                                            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight">{item.name}</span>
                                                            <span className="text-[11px] font-black text-[#1D2939] dark:text-white">{item.price}</span>
                                                        </div>
                                                    ))}
                                                    <div className="pt-6 mt-6 flex justify-between items-center border-t border-gray-50 dark:border-gray-800">
                                                        <span className="text-xs font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Total Amount</span>
                                                        <span className="text-lg font-black text-[#D0771E]">₦50,030,234</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Milestone Payout Section */}
                                            {booking.status === 'booked' && (
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                                                            <ShieldCheckIcon className="w-4 h-4 text-[#D0771E]" />
                                                            Milestone Payouts
                                                        </h4>
                                                        <span className="px-4 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-green-100 dark:border-green-800 flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                            Escrow Active
                                                        </span>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {[
                                                            { label: 'Initial Deposit (30%)', amount: '₦15,009,070', status: 'Released', date: 'Mar 20, 2024' },
                                                            { label: 'Mid-Project Milestone (40%)', amount: '₦20,012,094', status: 'In Escrow', date: 'Expected Apr 05' },
                                                            { label: 'Final Completion (30%)', amount: '₦15,009,070', status: 'Pending', date: 'Expected Apr 15' }
                                                        ].map((milestone, idx) => (
                                                            <div key={idx} className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-[24px] border border-gray-100 dark:border-gray-800 group hover:border-orange-200 dark:hover:border-orange-900/50 transition-all">
                                                                <div className="space-y-1.5">
                                                                    <p className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-tight">{milestone.label}</p>
                                                                    <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">{milestone.date}</p>
                                                                </div>
                                                                <div className="text-right space-y-2">
                                                                    <p className="text-sm font-black text-[#1D2939] dark:text-white">{milestone.amount}</p>
                                                                    <span className={`text-[8px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full ${milestone.status === 'Released' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                                                        milestone.status === 'In Escrow' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                                                                            'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                                                                        }`}>
                                                                        {milestone.status}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Booking Timeline */}
                                            <div className="space-y-8 pb-32">
                                                <h4 className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                                                    <ArrowPathIcon className="w-4 h-4 text-[#D0771E]" />
                                                    Booking Timeline
                                                </h4>
                                                <div className="space-y-10 relative ml-2">
                                                    <div className="absolute left-[7px] top-2 bottom-0 w-[2.5px] bg-white dark:bg-gray-800 rounded-full"></div>
                                                    {timeline.map((item, idx) => (
                                                        <div key={idx} className="relative pl-10 group">
                                                            <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-[#F3F0EB] dark:border-gray-950 z-10 transition-all group-hover:scale-110 shadow-sm ${item.status === 'completed' ? 'bg-[#D0771E]' : 'bg-white dark:bg-gray-800'}`}></div>
                                                            <div className="space-y-1.5">
                                                                <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{item.date}</p>
                                                                <p className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase tracking-tight">{item.event}</p>
                                                                <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 leading-relaxed max-w-sm">{item.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer Buttons */}
                                        <div className="p-8 border-t border-gray-100 dark:border-gray-800 bg-[#F3F0EB]/90 dark:bg-gray-950/90 backdrop-blur-xl sticky bottom-0 z-20 space-y-4">
                                            <Button className="w-full h-14 rounded-2xl text-[10px] shadow-2xl shadow-orange-200 dark:shadow-none bg-[#D0771E] text-white">
                                                View Contract
                                            </Button>
                                            <Button variant="outline" className="w-full h-14 rounded-2xl text-[10px] bg-white dark:bg-gray-900 border-none shadow-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
                                                Generate Invoice
                                            </Button>
                                            <Button variant="ghost" className="w-full h-10 text-[9px] text-gray-400 dark:text-gray-500 hover:text-[#D0771E] dark:hover:text-[#D0771E]">
                                                Edit Booking Details
                                            </Button>
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

export default BookingDetails;
