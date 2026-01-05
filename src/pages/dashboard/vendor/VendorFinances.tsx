import { useState } from 'react';
import {
    BanknotesIcon,
    ClockIcon,
    ChartBarIcon,
    ArrowTrendingDownIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    PlusIcon,
    ChevronRightIcon,
    DocumentTextIcon,
    ArrowDownTrayIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumTabs from '../../../components/ui/PremiumTabs';
import StatCard from '../../../components/dashboard/StatCard';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';

interface Invoice {
    id: string;
    clientName: string;
    service: string;
    amount: string;
    date: string;
    status: 'PAID' | 'PENDING' | 'OVERDUE';
    invoiceNumber: string;
    paymentMethod?: string;
    tax?: string;
    notes?: string;
    timestamp: string;
}

const VendorFinances = () => {
    const [activeTab, setActiveTab] = useState('Payments');
    const [searchQuery, setSearchQuery] = useState('');
    const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [newInvoiceForm, setNewInvoiceForm] = useState<Partial<Invoice>>({
        clientName: '',
        service: 'Wedding Photography',
        amount: '',
        date: '',
        notes: ''
    });

    const [payments, setPayments] = useState<Invoice[]>([
        {
            id: '1',
            clientName: 'Sarah Johnson',
            service: 'Wedding Photography',
            amount: '₦40,000,000',
            date: 'Aug 15, 2024',
            status: 'PAID',
            invoiceNumber: 'INV-2024-001',
            paymentMethod: 'Bank Transfer',
            tax: '₦2,000,000',
            notes: 'Final payment for the summer wedding package. Includes 10 hours of coverage and premium photo album.',
            timestamp: '2 hours ago'
        },
        {
            id: '2',
            clientName: 'Michael Chen',
            service: 'Event Cinematography',
            amount: '₦25,000,000',
            date: 'Aug 10, 2024',
            status: 'PAID',
            invoiceNumber: 'INV-2024-002',
            paymentMethod: 'Card Payment',
            tax: '₦1,250,000',
            notes: 'Deposit for the corporate gala video services.',
            timestamp: '1 day ago'
        },
    ]);

    const [outstanding, setOutstanding] = useState<Invoice[]>([
        {
            id: '5',
            clientName: 'Sarah Johnson',
            service: 'Wedding Photography',
            amount: '₦40,000,000',
            date: 'Aug 15, 2024',
            status: 'PENDING',
            invoiceNumber: 'INV-2024-005',
            paymentMethod: 'Pending',
            tax: '₦2,000,000',
            notes: 'Awaiting client approval of the updated service contract for the bridal shower.',
            timestamp: '5 hours ago'
        },
        {
            id: '7',
            clientName: 'Jessica Lee',
            service: 'Product Launch',
            amount: '₦8,000,000',
            date: 'Jul 15, 2024',
            status: 'OVERDUE',
            invoiceNumber: 'INV-2024-007',
            paymentMethod: 'Overdue',
            tax: '₦400,000',
            notes: 'Final invoice for the tech summit photography. Second reminder already sent.',
            timestamp: '1 week ago'
        },
    ]);

    const tabs = [
        { id: 'Payments', label: 'Payments' },
        { id: 'Outstanding Payments', label: 'Outstanding Payments' },
        { id: 'Trends and Insights', label: 'Trends and Insights' }
    ];

    const stats = [
        { label: 'Total Revenue', value: '₦45,000,000', icon: BanknotesIcon, color: 'bg-emerald-600' },
        { label: 'Outstanding', value: '₦4,000,000', icon: ClockIcon, color: 'bg-[#D0771E]' },
        { label: 'Net Profit', value: '₦5,000,000', icon: ChartBarIcon, color: 'bg-indigo-600' },
        { label: 'Expenses', value: '₦5,000,000', icon: ArrowTrendingDownIcon, color: 'bg-rose-600' },
    ];

    const handleMarkAsPaid = (invoice: Invoice) => {
        const updatedInvoice: Invoice = { ...invoice, status: 'PAID', timestamp: 'Just now', paymentMethod: 'Manual Entry' };
        setOutstanding(prev => prev.filter(i => i.id !== invoice.id));
        setPayments(prev => [updatedInvoice, ...prev]);
    };

    const handleDelete = (id: string, isPaid: boolean) => {
        if (isPaid) {
            setPayments(prev => prev.filter(i => i.id !== id));
        } else {
            setOutstanding(prev => prev.filter(i => i.id !== id));
        }
    };

    const handleSaveNewInvoice = () => {
        if (!newInvoiceForm.clientName || !newInvoiceForm.amount) return;

        const newInvoice: Invoice = {
            id: Math.random().toString(36).substr(2, 9),
            clientName: newInvoiceForm.clientName || '',
            service: newInvoiceForm.service || 'Photography',
            amount: `₦${newInvoiceForm.amount}`,
            date: newInvoiceForm.date || 'TBD',
            status: 'PENDING',
            invoiceNumber: `INV-2024-${Math.floor(Math.random() * 900) + 100}`,
            paymentMethod: 'Pending',
            tax: '₦0',
            notes: newInvoiceForm.notes || '',
            timestamp: 'Just now'
        };

        setOutstanding(prev => [newInvoice, ...prev]);
        setShowNewInvoiceModal(false);
        setNewInvoiceForm({
            clientName: '',
            service: 'Photography',
            amount: '',
            date: '',
            notes: ''
        });
    };

    const filteredPayments = payments.filter(i =>
        i.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredOutstanding = outstanding.filter(i =>
        i.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderInvoiceList = (data: Invoice[]) => (
        <div className="grid grid-cols-1 gap-6">
            {data.length > 0 ? data.map((item) => (
                <PremiumCard key={item.id} className="p-10 group hover:border-[#D0771E]/30 transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-[#1D2939] group-hover:text-[#D0771E] transition-colors tracking-tight cursor-pointer" onClick={() => { setSelectedInvoice(item); setIsDetailOpen(true); }}>
                                {item.clientName}
                            </h3>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D0771E] py-1 px-3 bg-[#D0771E]/5 rounded-full border border-[#D0771E]/10">
                                    Invoice #{item.invoiceNumber}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.timestamp}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'PAID' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : item.status === 'OVERDUE' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]'}`}></div>
                            <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${item.status === 'PAID' ? 'bg-green-50 text-green-700 border border-green-100' :
                                    item.status === 'OVERDUE' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                                        'bg-orange-50 text-orange-700 border border-orange-100'
                                }`}>
                                {item.status}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 my-10 py-8 border-y border-gray-50/50">
                        <div className="space-y-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Total Amount</span>
                            <p className="text-sm font-black text-[#1D2939]">{item.amount}</p>
                        </div>
                        <div className="space-y-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Due Date</span>
                            <p className="text-sm font-black text-[#1D2939]">{item.date}</p>
                        </div>
                        <div className="space-y-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Payment Method</span>
                            <p className="text-sm font-black text-[#1D2939] capitalize">{item.paymentMethod}</p>
                        </div>
                        <div className="space-y-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">VAT / Fees</span>
                            <p className="text-sm font-black text-[#1D2939]">{item.tax}</p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Description & Notes</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#D0771E]">{item.service}</span>
                        </div>
                        <p className="text-xs font-medium text-gray-500 leading-[1.8] max-w-5xl line-clamp-2">
                            {item.notes}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50/50">
                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                            {item.status === 'PAID' ? (
                                <Button className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100">
                                    View Receipt
                                </Button>
                            ) : item.status === 'OVERDUE' ? (
                                <Button variant="destructive" className="h-12 px-8 rounded-2xl shadow-xl shadow-red-100" onClick={() => handleMarkAsPaid(item)}>
                                    Mark as Paid
                                </Button>
                            ) : (
                                <Button className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100" onClick={() => handleMarkAsPaid(item)}>
                                    Mark as Paid
                                </Button>
                            )}

                            <Button variant="outline" className="h-12 px-8 rounded-2xl border-gray-100 text-gray-600">
                                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                                Download PDF
                            </Button>
                            <Button variant="ghost" className="h-12 px-8 rounded-2xl text-gray-400 hover:text-[#1D2939] font-black uppercase tracking-widest text-[10px]" onClick={() => { setSelectedInvoice(item); setIsDetailOpen(true); }}>
                                View Details
                            </Button>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-gray-100 text-gray-400 hover:text-rose-500" onClick={() => handleDelete(item.id, item.status === 'PAID')}>
                                <PlusIcon className="w-4 h-4 mx-auto rotate-45" />
                            </Button>
                            <Button variant="outline" className="h-10 px-6 rounded-xl border-gray-100 text-[#D0771E] bg-orange-50/50 text-[9px] font-black uppercase tracking-widest" onClick={() => { setSelectedInvoice(item); setIsDetailOpen(true); }}>
                                Manage Invoice
                            </Button>
                        </div>
                    </div>
                </PremiumCard>
            )) : (
                <div className="text-center py-20 bg-white rounded-[40px] border border-gray-50">
                    <p className="text-sm font-black text-gray-300 uppercase tracking-widest">No invoices found matching your search</p>
                </div>
            )}
        </div>
    );

    const renderNewInvoiceModal = () => {
        if (!showNewInvoiceModal) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2939]/40 backdrop-blur-sm animate-in fade-in duration-300">
                <PremiumCard className="w-full max-w-xl p-0 animate-in zoom-in-95 duration-300 shadow-2xl overflow-hidden">
                    <div className="px-10 py-10 bg-[#F3F0EB]/30 border-b flex justify-between items-center">
                        <h3 className="text-2xl font-black uppercase tracking-tighter">New Invoice</h3>
                        <button onClick={() => setShowNewInvoiceModal(false)} className="p-3 hover:bg-black/5 rounded-2xl transition-colors">
                            <PlusIcon className="w-6 h-6 rotate-45" />
                        </button>
                    </div>
                    <div className="p-10 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Name</label>
                            <input type="text" value={newInvoiceForm.clientName} onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, clientName: e.target.value })} placeholder="e.g. Sarah Johnson" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black uppercase" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount (₦)</label>
                                <input type="text" value={newInvoiceForm.amount} onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, amount: e.target.value })} placeholder="e.g. 5,000,000" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black uppercase" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Due Date</label>
                                <input type="text" value={newInvoiceForm.date} onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, date: e.target.value })} placeholder="e.g. Sept 20, 2024" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black uppercase" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Notes</label>
                            <textarea value={newInvoiceForm.notes} onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, notes: e.target.value })} placeholder="Description of services..." className="w-full h-32 p-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-medium resize-none" />
                        </div>
                        <div className="pt-4 flex gap-4">
                            <Button variant="outline" className="flex-1 rounded-2xl h-14" onClick={() => setShowNewInvoiceModal(false)}>Cancel</Button>
                            <Button className="flex-1 rounded-2xl h-14 shadow-orange-100" onClick={handleSaveNewInvoice}>Create & Send</Button>
                        </div>
                    </div>
                </PremiumCard>
            </div>
        );
    };

    const renderDetailDrawer = () => {
        if (!selectedInvoice || !isDetailOpen) return null;
        return (
            <div className="fixed inset-0 z-[60] flex justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="w-full max-w-2xl bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
                    <div className="p-12">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h3 className="text-3xl font-black text-[#1D2939] uppercase tracking-tighter mb-2">{selectedInvoice.clientName}</h3>
                                <p className="text-sm font-black text-[#D0771E] uppercase tracking-widest">Invoice #{selectedInvoice.invoiceNumber}</p>
                            </div>
                            <button onClick={() => setIsDetailOpen(false)} className="p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                                <PlusIcon className="w-8 h-8 rotate-45" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-12 mb-12 py-10 border-y border-gray-50">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Status</p>
                                <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${selectedInvoice.status === 'PAID' ? 'bg-green-50 text-green-700 border border-green-100' :
                                        selectedInvoice.status === 'OVERDUE' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                                            'bg-orange-50 text-orange-700 border border-orange-100'
                                    }`}>
                                    {selectedInvoice.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Amount Due</p>
                                <p className="text-2xl font-black text-[#1D2939]">{selectedInvoice.amount}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Service Type</p>
                                <p className="text-sm font-black text-[#1D2939] uppercase">{selectedInvoice.service}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Due Date</p>
                                <p className="text-sm font-black text-[#1D2939] uppercase">{selectedInvoice.date}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-12">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoice Description</p>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                {selectedInvoice.notes}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-8 space-y-6 mb-12">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                <span className="text-gray-400">Subtotal</span>
                                <span className="text-[#1D2939]">{selectedInvoice.amount}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                <span className="text-gray-400">Tax (VAT 5%)</span>
                                <span className="text-[#1D2939]">{selectedInvoice.tax}</span>
                            </div>
                            <div className="h-px bg-gray-100"></div>
                            <div className="flex justify-between items-center text-lg font-black uppercase tracking-widest">
                                <span className="text-[#1D2939]">Total</span>
                                <span className="text-[#D0771E]">{selectedInvoice.amount}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <Button className="h-16 rounded-2xl shadow-xl shadow-orange-100" onClick={() => { if (selectedInvoice.status !== 'PAID') handleMarkAsPaid(selectedInvoice); setIsDetailOpen(false); }}>
                                {selectedInvoice.status === 'PAID' ? 'Resend Receipt' : 'Mark as Paid'}
                            </Button>
                            <Button variant="outline" className="h-16 rounded-2xl border-gray-100">
                                Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-[1600px] mx-auto px-8 py-8 flex flex-col gap-10">
            {renderNewInvoiceModal()}
            {renderDetailDrawer()}
            <PageHeader
                breadcrumb="Operations"
                title="Finances"
                subtitle="Manage payments, invoices and financial performance"
                actions={
                    <Button className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100 bg-[#D0771E]" onClick={() => setShowNewInvoiceModal(true)}>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Create Invoice
                    </Button>
                }
            />

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard
                        key={idx}
                        label={stat.label}
                        value={stat.value}
                        icon={<stat.icon className="w-5 h-5 text-white" />}
                        iconBgColor={stat.color}
                    />
                ))}
            </div>

            <div className="space-y-8">
                {/* Tabs & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-100">
                    <PremiumTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onChange={setActiveTab}
                    />

                    {/* Search & Filter */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D0771E] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search Payments"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-xs font-black placeholder:text-gray-400 focus:ring-2 focus:ring-[#D0771E]/20 focus:bg-white focus:border-[#D0771E] transition-all outline-none"
                            />
                        </div>
                        <Button variant="outline" className="h-11 rounded-xl px-5 border-gray-100">
                            <FunnelIcon className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Tab content */}
                <div className="min-h-[400px]">
                    {activeTab === 'Payments' && renderInvoiceList(filteredPayments)}
                    {activeTab === 'Outstanding Payments' && renderInvoiceList(filteredOutstanding)}
                    {activeTab === 'Trends and Insights' && (
                        <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-20 bg-white rounded-[40px] border border-gray-100">
                            <div className="w-20 h-20 rounded-[32px] bg-indigo-50 flex items-center justify-center mb-6">
                                <ChartBarIcon className="w-10 h-10 text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-black text-[#1D2939] uppercase tracking-tight mb-2">Trends & Insights coming soon</h3>
                            <p className="text-sm text-gray-400 max-w-sm font-medium">We're building powerful data visualizations to help you track your business growth and financial performance.</p>
                            <Button variant="outline" className="mt-8 rounded-2xl px-10 h-12 uppercase text-[10px] font-black tracking-widest text-gray-500">Connect Bank Account</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorFinances;
