import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    XMarkIcon,
    PaperClipIcon,
    MicrophoneIcon,
    PaperAirplaneIcon,
    VideoCameraIcon,
    PhoneIcon,
    MagnifyingGlassIcon,
    EllipsisVerticalIcon,
    FaceSmileIcon,
    ShieldCheckIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../ui/Button';

interface VendorChatProps {
    isOpen: boolean;
    onClose: () => void;
    inquiry: any;
}

const VendorChat = ({ isOpen, onClose, inquiry }: VendorChatProps) => {
    const messages = [
        { id: 1, sender: 'client', text: "Hi, are you available for an event on the 23rd of this month, at Gbagada express side in Lagos. Let me know I have an event around that side", time: '11:23 AM' },
        { id: 2, sender: 'client', text: "Hi, are you available for an event on the 23rd of this month, at Gbagada express side in Lagos. Let me know I have an event around that side", time: '11:23 AM' },
        { id: 3, sender: 'me', text: "Hi, are you available for an event on the 23rd of this month, at Gbagada express side in Lagos. Let me know I have an event around that side", time: '11:23 AM' },
        { id: 4, sender: 'me', text: "Hi, are you available for an event on the 23rd of this month, at Gbagada express side in Lagos. Let me know I have an event around that side", time: '11:23 AM' },
        { id: 5, sender: 'client', text: "Hi, are you available for an event on the 23rd of this month, at Gbagada express side in Lagos. Let me know I have an event around that side", time: '11:23 AM' },
        { id: 6, sender: 'client', text: "Hi, are you available for an event on the 23rd of this month, at Gbagada express side in Lagos. Let me know I have an event around that side", time: '11:23 AM' },
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
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-6xl">
                                    <div className="flex h-full flex-row bg-[#F3F0EB] dark:bg-gray-950 shadow-2xl overflow-hidden relative">

                                        <button
                                            onClick={onClose}
                                            className="absolute top-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#1D2939] dark:text-white rounded-2xl shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all"
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>

                                        {/* Main Chat Area */}
                                        <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-2xl relative z-10">
                                            {/* Header */}
                                            <div className="px-10 py-6 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-5">
                                                        <div className="relative group">
                                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#D0771E] to-[#1A051D] rounded-[24px] opacity-20 blur-sm group-hover:opacity-40 transition-opacity"></div>
                                                            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop" alt="Client" className="w-12 h-12 rounded-[20px] object-cover relative ring-2 ring-white dark:ring-gray-800" />
                                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white dark:border-gray-900 rounded-full"></div>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-base font-black text-[#1D2939] dark:text-white tracking-tight">Oluwatobiloba Babatunde</h3>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                                <p className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest">Active Now</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 mr-16">
                                                        <button className="p-3 text-gray-400 hover:text-[#D0771E] hover:bg-orange-50 dark:hover:bg-gray-800 rounded-2xl transition-all">
                                                            <VideoCameraIcon className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-3 text-gray-400 hover:text-[#D0771E] hover:bg-orange-50 dark:hover:bg-gray-800 rounded-2xl transition-all">
                                                            <PhoneIcon className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-3 text-gray-400 hover:text-[#D0771E] hover:bg-orange-50 dark:hover:bg-gray-800 rounded-2xl transition-all">
                                                            <MagnifyingGlassIcon className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-3 text-gray-400 hover:text-[#D0771E] hover:bg-orange-50 dark:hover:bg-gray-800 rounded-2xl transition-all">
                                                            <EllipsisVerticalIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Safety Banner */}
                                            <div className="bg-gradient-to-r from-[#1A051D] to-[#2D0A31] px-10 py-3 relative overflow-hidden">
                                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                                                <p className="text-[9px] font-black text-white/90 text-center flex items-center justify-center gap-3 relative z-10 uppercase tracking-[0.15em]">
                                                    <ShieldCheckIcon className="w-4 h-4 text-[#D0771E]" />
                                                    <span>ARIYA SAFETY LAYER: PLEASE KEEP ALL MESSAGES & PAYMENTS WITHIN THE PLATFORM</span>
                                                </p>
                                            </div>

                                            {/* Messages */}
                                            <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10 bg-[#F9FAFB]/50 dark:bg-gray-900 scrollbar-hide">
                                                <div className="flex items-center gap-6 py-4">
                                                    <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
                                                    <span className="text-[9px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.25em]">Today, March 24</span>
                                                    <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
                                                </div>

                                                {messages.map((msg) => (
                                                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                                        <div className={`max-w-[75%] space-y-2`}>
                                                            <div className={`p-6 rounded-[32px] text-sm font-medium leading-relaxed shadow-sm transition-all hover:shadow-md ${msg.sender === 'me'
                                                                ? 'bg-[#1D2939] dark:bg-[#D0771E] text-white rounded-tr-none'
                                                                : 'bg-white dark:bg-gray-800 text-[#1D2939] dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none'
                                                                }`}>
                                                                {msg.text}
                                                            </div>
                                                            <div className={`flex items-center gap-2 px-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                                                <p className="text-[9px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">{msg.time}</p>
                                                                {msg.sender === 'me' && <ShieldCheckIcon className="w-3 h-3 text-[#D0771E]" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Input Area */}
                                            <div className="p-10 bg-white dark:bg-gray-900 border-t border-gray-50 dark:border-gray-800">
                                                <div className="flex items-center gap-6 bg-gray-50/80 dark:bg-gray-800/50 p-3 pr-3 rounded-[32px] border border-gray-100 dark:border-gray-700 focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border-[#D0771E]/30 focus-within:ring-4 focus-within:ring-[#D0771E]/5 transition-all">
                                                    <div className="flex items-center gap-1 pl-2">
                                                        <button className="p-3 text-gray-400 hover:text-[#D0771E] hover:bg-white dark:hover:bg-gray-800 rounded-2xl transition-all">
                                                            <PaperClipIcon className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-3 text-gray-400 hover:text-[#D0771E] hover:bg-white dark:hover:bg-gray-800 rounded-2xl transition-all">
                                                            <FaceSmileIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <textarea
                                                        rows={1}
                                                        placeholder="Write your message..."
                                                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium py-3 px-2 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                                                    ></textarea>
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-4 bg-[#1D2939] dark:bg-[#D0771E] text-white rounded-[24px] shadow-xl shadow-gray-200 dark:shadow-none hover:bg-[#D0771E] dark:hover:bg-[#b06318] hover:scale-105 active:scale-95 transition-all">
                                                            <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Sidebar: Client Details */}
                                        <div className="w-96 flex flex-col h-full bg-[#F3F0EB] dark:bg-gray-950 items-center py-12 px-10 overflow-y-auto overflow-x-hidden border-l border-gray-100 dark:border-gray-800">
                                            <div className="relative mb-8 group">
                                                <div className="absolute -inset-2 bg-gradient-to-tr from-[#D0771E] to-transparent rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 animate-spin-slow"></div>
                                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" alt="Client Large" className="w-32 h-32 rounded-[48px] object-cover ring-8 ring-white/50 dark:ring-gray-800/50 shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-105" />
                                                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-[#D0771E] rounded-2xl flex items-center justify-center text-white border-4 border-[#F3F0EB] dark:border-gray-950 z-20 shadow-lg">
                                                    <MagnifyingGlassIcon className="w-5 h-5" />
                                                </div>
                                            </div>

                                            <div className="text-center mb-10 w-full px-4">
                                                <h4 className="text-xl font-black text-[#1D2939] dark:text-white tracking-tight">Oluwatobiloba Babatunde</h4>
                                                <p className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.25em] mt-2">Premium Planner • Lagos</p>
                                            </div>

                                            <div className="w-full space-y-6">
                                                <div className="p-8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-[32px] border border-white/50 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                                                    <p className="text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-[0.2em] mb-4">Direct Communication</p>
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                                                <ArrowPathIcon className="w-4 h-4" />
                                                            </div>
                                                            <p className="text-xs font-black text-[#1D2939] dark:text-white">oluwa.babs@example.com</p>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                                                <PhoneIcon className="w-4 h-4" />
                                                            </div>
                                                            <p className="text-xs font-black text-[#1D2939] dark:text-white">+234 802 345 6789</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-8 bg-gradient-to-br from-[#1D2939] to-[#2D3848] dark:from-black dark:to-gray-900 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                                                    <p className="text-[9px] font-black uppercase text-[#D0771E] tracking-[0.2em] mb-4">Linked Inquiry</p>
                                                    <h5 className="text-sm font-black mb-1">Product Launch Event</h5>
                                                    <p className="text-[10px] font-medium text-gray-400">Status: Accepted In-App</p>
                                                    <div className="mt-8 pt-6 border-t border-white/10">
                                                        <Button variant="outline" className="w-full h-11 border-white/20 text-white hover:bg-white/10 text-[9px] font-black uppercase tracking-widest rounded-xl">View Requirements</Button>
                                                    </div>
                                                </div>

                                                <div className="pt-6">
                                                    <Button variant="ghost" className="w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-[10px] font-black uppercase tracking-widest h-12 rounded-2xl">Block Requester</Button>
                                                </div>
                                            </div>
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

export default VendorChat;
