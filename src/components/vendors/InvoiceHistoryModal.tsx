import React from 'react';
import { XMarkIcon, ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface InvoiceHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InvoiceHistoryModal: React.FC<InvoiceHistoryModalProps> = ({ isOpen, onClose }) => {
    const invoices = [
        { id: 'INV-001', date: 'Oct 12, 2023', amount: '₦450,000', status: 'Paid', client: 'Sarah Johnson' },
        { id: 'INV-002', date: 'Nov 05, 2023', amount: '₦1,200,000', status: 'Paid', client: 'Tech Summit' },
        { id: 'INV-003', date: 'Dec 15, 2023', amount: '₦850,000', status: 'Processing', client: 'Alex Birthday' },
        { id: 'INV-004', date: 'Jan 02, 2024', amount: '₦300,000', status: 'Paid', client: 'Baby Shower' },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-[#1D2939] uppercase tracking-tighter italic">Invoice History</h2>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">View and download your past payouts</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-black transition-all">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="space-y-4">
                        {invoices.map((inv) => (
                            <div key={inv.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-gray-200 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-2xl text-gray-400 shadow-sm">
                                        <DocumentTextIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{inv.id} • {inv.date}</div>
                                        <div className="text-sm font-black text-[#1D2939] uppercase tracking-tight">{inv.client}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-12">
                                    <div className="text-right">
                                        <div className="text-sm font-black text-[#D0771E]">{inv.amount}</div>
                                        <div className={`text-[9px] font-black uppercase tracking-widest ${inv.status === 'Paid' ? 'text-green-500' : 'text-orange-500'}`}>{inv.status}</div>
                                    </div>
                                    <button className="p-3 bg-black text-white rounded-xl hover:bg-[#D0771E] transition-all transform hover:scale-110">
                                        <ArrowDownTrayIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Ariya Financials</span>
                    <button onClick={onClose} className="text-[#D0771E]">Close Window</button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceHistoryModal;
