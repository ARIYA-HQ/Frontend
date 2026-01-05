import React, { useState } from 'react';
import { XMarkIcon, ChevronRightIcon, BanknotesIcon, UserIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

interface CreateQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (quote: any) => void;
}

const CreateQuoteModal: React.FC<CreateQuoteModalProps> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        eventName: '',
        serviceType: 'Photography',
        amount: '',
        expiryDate: '',
        notes: ''
    });

    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => {
            setIsSuccess(true);
            if (onSave) onSave(formData);
        }, 800);
    };

    const handleDone = () => {
        setIsSuccess(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-10">
                <div className="w-screen max-w-md transform transition-all">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">

                        {/* Header */}
                        <div className="px-6 py-8 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Create New Quote</h2>
                                <button type="button" className="rounded-full p-2 bg-gray-50 text-gray-400 hover:text-[#D0771E] hover:bg-orange-50 transition-colors" onClick={onClose}>
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Generate and send a professional proposal</p>
                        </div>

                        {/* Content */}
                        <div className="relative flex-1 px-6 py-8">
                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 animate-bounce">
                                        <BanknotesIcon className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Quote Sent!</h3>
                                    <p className="text-sm font-medium text-gray-500 max-w-xs italic">
                                        Your quote for {formData.amount} has been sent to {formData.clientName}. We'll notify you when they respond.
                                    </p>
                                    <button onClick={handleDone} className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#D0771E] transition-all">
                                        Back to Operations
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Client Name</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. Sarah Johnson"
                                                value={formData.clientName}
                                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                                className="block w-full rounded-2xl border-0 bg-gray-50 py-4 pl-12 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all shadow-sm"
                                            />
                                            <UserIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Event Name / Reference</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. Johnson Wedding 2024"
                                                value={formData.eventName}
                                                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                                                className="block w-full rounded-2xl border-0 bg-gray-50 py-4 pl-12 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all shadow-sm"
                                            />
                                            <BriefcaseIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Service Category</label>
                                        <select
                                            value={formData.serviceType}
                                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                            className="block w-full rounded-2xl border-0 bg-gray-50 py-4 px-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all shadow-sm"
                                        >
                                            <option>Photography</option>
                                            <option>Catering</option>
                                            <option>Venue Decoration</option>
                                            <option>Music/Entertainment</option>
                                            <option>Full Planning</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Quote Amount (₦)</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="number"
                                                placeholder="0.00"
                                                value={formData.amount}
                                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                className="block w-full rounded-2xl border-0 bg-gray-50 py-4 pl-12 text-sm font-black text-[#D0771E] focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all shadow-sm"
                                            />
                                            <span className="absolute left-4 top-4 font-black text-gray-400">₦</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Quote Valid Until</label>
                                        <input
                                            type="date"
                                            value={formData.expiryDate}
                                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                            className="block w-full rounded-2xl border-0 bg-gray-50 py-4 px-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all shadow-sm"
                                        />
                                    </div>

                                    <div className="pt-8 space-y-4">
                                        <button
                                            type="submit"
                                            className="w-full rounded-2xl bg-[#D0771E] px-6 py-4 text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-orange-600 hover:shadow-orange-300 transition-all focus:outline-none flex items-center justify-center gap-2 group"
                                        >
                                            Send Proposal
                                            <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateQuoteModal;
