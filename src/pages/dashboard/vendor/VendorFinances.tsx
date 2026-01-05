import { useState } from 'react';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    PlusIcon,
    ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumTabs from '../../../components/ui/PremiumTabs';
import StatCard from '../../../components/dashboard/StatCard';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';
import {
    Invoice,
    FINANCE_STATS,
    INITIAL_PAYMENTS,
    OUTSTANDING_PAYMENTS,
    REVENUE_DATA
} from '../../../data/mockFinances';

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

    const [payments, setPayments] = useState<Invoice[]>(INITIAL_PAYMENTS);
    const [outstanding, setOutstanding] = useState<Invoice[]>(OUTSTANDING_PAYMENTS);

    const tabs = [
        { id: 'Payments', label: 'Payments' },
        { id: 'Outstanding Payments', label: 'Outstanding Payments' },
        { id: 'Trends and Insights', label: 'Trends and Insights' }
    ];

    const handleMarkAsPaid = (invoice: Invoice) => {
        const updatedInvoice: Invoice = { ...invoice, status: 'PAID', timestamp: 'Just now', paymentMethod: 'Manual Entry' };
        setOutstanding(prev => prev.filter(i => i.id !== invoice.id));
        setPayments(prev => [updatedInvoice, ...prev]);

        // If viewing details of this invoice, close or update it
        if (selectedInvoice?.id === invoice.id) {
            setSelectedInvoice(updatedInvoice);
            // Keep drawer open but update content or close if preferred
        }
    };

    const handleDelete = (id: string, isPaid: boolean) => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            if (isPaid) {
                setPayments(prev => prev.filter(i => i.id !== id));
            } else {
                setOutstanding(prev => prev.filter(i => i.id !== id));
            }
            if (selectedInvoice?.id === id) setIsDetailOpen(false);
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
        <div className="grid grid-cols-1 gap-6 animate-fade-in">
            {data.length > 0 ? data.map((item) => (
                <PremiumCard key={item.id} className="p-10 group hover:border-[#D0771E]/30 transition-all border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-[#1D2939] dark:text-white group-hover:text-[#D0771E] transition-colors tracking-tight cursor-pointer" onClick={() => { setSelectedInvoice(item); setIsDetailOpen(true); }}>
                                {item.clientName}
                            </h3>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D0771E] py-1 px-3 bg-[#D0771E]/5 dark:bg-[#D0771E]/10 rounded-full border border-[#D0771E]/10 dark:border-[#D0771E]/20">
                                    Invoice #{item.invoiceNumber}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">{item.timestamp}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'PAID' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : item.status === 'OVERDUE' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]'}`}></div>
                            <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${item.status === 'PAID' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800' :
                                item.status === 'OVERDUE' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800' :
                                    'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-100 dark:border-orange-800'
                                }`}>
                                {item.status}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 my-10 py-8 border-y border-gray-50/50 dark:border-gray-800">
                        <div className="space-y-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Total Amount</span>
                            <p className="text-sm font-black text-[#1D2939] dark:text-white">{item.amount}</p>
                        </div>
                        <div className="space-y-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Due Date</span>
                            <p className="text-sm font-black text-[#1D2939] dark:text-white">{item.date}</p>
                        </div>
                        <div className="space-y-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Payment Method</span>
                            <p className="text-sm font-black text-[#1D2939] dark:text-white capitalize">{item.paymentMethod}</p>
                        </div>
                        <div className="space-y-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">VAT / Fees</span>
                            <p className="text-sm font-black text-[#1D2939] dark:text-white">{item.tax}</p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Description & Notes</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#D0771E]">{item.service}</span>
                        </div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-[1.8] max-w-5xl line-clamp-2">
                            {item.notes}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50/50 dark:border-gray-800">
                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                            {item.status === 'PAID' ? (
                                <Button className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white">
                                    View Receipt
                                </Button>
                            ) : (
                                <Button className={`h-12 px-8 rounded-2xl shadow-xl ${item.status === 'OVERDUE' ? 'shadow-red-100 dark:shadow-none bg-rose-500 text-white' : 'shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white'}`} onClick={() => handleMarkAsPaid(item)}>
                                    Mark as Paid
                                </Button>
                            )}

                            <Button variant="outline" className="h-12 px-8 rounded-2xl border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                                Download PDF
                            </Button>
                            <Button variant="ghost" className="h-12 px-8 rounded-2xl text-gray-400 hover:text-[#1D2939] dark:hover:text-white font-black uppercase tracking-widest text-[10px]" onClick={() => { setSelectedInvoice(item); setIsDetailOpen(true); }}>
                                View Details
                            </Button>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-gray-100 dark:border-gray-700 text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20" onClick={() => handleDelete(item.id, item.status === 'PAID')}>
                                <PlusIcon className="w-4 h-4 mx-auto rotate-45" />
                            </Button>
                            <Button variant="outline" className="h-10 px-6 rounded-xl border-gray-100 dark:border-gray-700 text-[#D0771E] bg-orange-50/50 dark:bg-orange-900/10 text-[9px] font-black uppercase tracking-widest" onClick={() => { setSelectedInvoice(item); setIsDetailOpen(true); }}>
                                Manage Invoice
                            </Button>
                        </div>
                    </div>
                </PremiumCard>
            )) : (
                <div className="text-center py-20 bg-white dark:bg-gray-900/50 rounded-[40px] border border-gray-50 dark:border-gray-800">
                    <p className="text-sm font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">No invoices found matching your search</p>
                </div>
            )}
        </div>
    );

    const renderNewInvoiceModal = () => {
        if (!showNewInvoiceModal) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2939]/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <PremiumCard className="w-full max-w-xl p-0 animate-in zoom-in-95 duration-300 shadow-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <div className="px-10 py-10 bg-[#F3F0EB]/30 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1D2939] dark:text-white">New Invoice</h3>
                        <button onClick={() => setShowNewInvoiceModal(false)} className="p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-colors">
                            <PlusIcon className="w-6 h-6 rotate-45 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                    <div className="p-10 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Client Name</label>
                            <input type="text" value={newInvoiceForm.clientName} onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, clientName: e.target.value })} placeholder="e.g. Sarah Johnson" className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black uppercase text-[#1D2939] dark:text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Amount (₦)</label>
                                <input type="text" value={newInvoiceForm.amount} onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, amount: e.target.value })} placeholder="e.g. 5,000,000" className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black uppercase text-[#1D2939] dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Due Date</label>
                                <input type="text" value={newInvoiceForm.date} onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, date: e.target.value })} placeholder="e.g. Sept 20, 2024" className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black uppercase text-[#1D2939] dark:text-white" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Notes</label>
                            <textarea value={newInvoiceForm.notes} onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, notes: e.target.value })} placeholder="Description of services..." className="w-full h-32 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-medium resize-none text-[#1D2939] dark:text-white" />
                        </div>
                        <div className="pt-4 flex gap-4">
                            <Button variant="outline" className="flex-1 rounded-2xl h-14 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300" onClick={() => setShowNewInvoiceModal(false)}>Cancel</Button>
                            <Button className="flex-1 rounded-2xl h-14 shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white" onClick={handleSaveNewInvoice}>Create & Send</Button>
                        </div>
                    </div>
                </PremiumCard>
            </div>
        );
    };

    const renderDetailDrawer = () => {
        if (!selectedInvoice || !isDetailOpen) return null;
        return (
            <div className="fixed inset-0 z-[60] flex justify-end bg-black/20 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="w-full max-w-2xl bg-white dark:bg-gray-900 h-full shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto border-l border-gray-100 dark:border-gray-800">
                    <div className="p-12">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h3 className="text-3xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter mb-2">{selectedInvoice.clientName}</h3>
                                <p className="text-sm font-black text-[#D0771E] uppercase tracking-widest">Invoice #{selectedInvoice.invoiceNumber}</p>
                            </div>
                            <button onClick={() => setIsDetailOpen(false)} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-colors text-gray-500 dark:text-gray-400">
                                <PlusIcon className="w-8 h-8 rotate-45" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-12 mb-12 py-10 border-y border-gray-50 dark:border-gray-800">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Status</p>
                                <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${selectedInvoice.status === 'PAID' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800' :
                                    selectedInvoice.status === 'OVERDUE' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800' :
                                        'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-100 dark:border-orange-800'
                                    }`}>
                                    {selectedInvoice.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Amount Due</p>
                                <p className="text-2xl font-black text-[#1D2939] dark:text-white">{selectedInvoice.amount}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Service Type</p>
                                <p className="text-sm font-black text-[#1D2939] dark:text-white uppercase">{selectedInvoice.service}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Due Date</p>
                                <p className="text-sm font-black text-[#1D2939] dark:text-white uppercase">{selectedInvoice.date}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-12">
                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Invoice Description</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                {selectedInvoice.notes}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 space-y-6 mb-12">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-[#1D2939] dark:text-white">{selectedInvoice.amount}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                <span>Tax (VAT 5%)</span>
                                <span className="text-[#1D2939] dark:text-white">{selectedInvoice.tax}</span>
                            </div>
                            <div className="h-px bg-gray-100 dark:bg-gray-700"></div>
                            <div className="flex justify-between items-center text-lg font-black uppercase tracking-widest">
                                <span className="text-[#1D2939] dark:text-white">Total</span>
                                <span className="text-[#D0771E]">{selectedInvoice.amount}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <Button className="h-16 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white" onClick={() => { if (selectedInvoice.status !== 'PAID') handleMarkAsPaid(selectedInvoice); setIsDetailOpen(false); }}>
                                {selectedInvoice.status === 'PAID' ? 'Resend Receipt' : 'Mark as Paid'}
                            </Button>
                            <Button variant="outline" className="h-16 rounded-2xl border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                                Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderChart = () => (
        <PremiumCard className="p-10 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 animate-fade-in">
            <div className="flex items-center justify-between mb-12">
                <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Revenue vs Expenses</h3>
                <select className="h-11 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-[#D0771E]/20 transition-all cursor-pointer outline-none">
                    <option>Last 6 months</option>
                    <option>This Year</option>
                </select>
            </div>
            <div className="h-[300px] flex items-end justify-between px-4 pb-8 border-b border-dashed border-gray-100 dark:border-gray-800 relative">
                {/* Y-axis grid lines */}
                <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none flex flex-col justify-between pb-8">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-full h-px bg-gray-50 dark:bg-gray-800/50"></div>
                    ))}
                </div>

                {REVENUE_DATA.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 group z-10 relative">
                        <div className="flex items-end justify-center w-full gap-2 h-[200px]">
                            {/* Revenue Bar */}
                            <div
                                className="w-4 md:w-8 bg-[#D0771E] rounded-t-lg transition-all duration-500 hover:brightness-110 relative group/bar"
                                style={{ height: `${(data.revenue / 30000000) * 100}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-black dark:bg-white text-white dark:text-black text-[9px] font-black px-2 py-1 rounded whitespace-nowrap z-20">
                                    ₦{(data.revenue / 1000000).toFixed(1)}M
                                </div>
                            </div>

                            {/* Expenses Bar */}
                            <div
                                className="w-4 md:w-8 bg-gray-200 dark:bg-gray-700 rounded-t-lg transition-all duration-500 hover:brightness-90 relative group/exp"
                                style={{ height: `${(data.expenses / 30000000) * 100}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/exp:opacity-100 transition-opacity bg-gray-600 text-white text-[9px] font-black px-2 py-1 rounded whitespace-nowrap z-20">
                                    ₦{(data.expenses / 1000000).toFixed(1)}M
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{data.month}</div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#D0771E]"></div>
                    <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Expenses</span>
                </div>
            </div>
        </PremiumCard>
    );

    return (
        <div className="max-w-[1600px] mx-auto px-8 py-8 flex flex-col gap-10">
            {renderNewInvoiceModal()}
            {renderDetailDrawer()}
            <PageHeader
                breadcrumb="Operations"
                title="Finances"
                subtitle="Manage payments, invoices and financial performance"
                actions={
                    <Button className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white" onClick={() => setShowNewInvoiceModal(true)}>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Create Invoice
                    </Button>
                }
            />

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {FINANCE_STATS.map((stat, idx) => (
                    <StatCard
                        key={idx}
                        label={stat.label}
                        value={stat.value}
                        icon={<stat.icon className="w-5 h-5 text-white" />}
                        iconBgColor={stat.color}
                        textColor="text-gray-900 dark:text-white"
                    />
                ))}
            </div>

            <div className="space-y-8">
                {/* Tabs & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-100 dark:border-gray-800">
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
                                className="w-full md:w-64 pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent rounded-xl text-xs font-black placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white focus:ring-2 focus:ring-[#D0771E]/20 focus:bg-white dark:focus:bg-gray-900 focus:border-[#D0771E] transition-all outline-none"
                            />
                        </div>
                        <Button variant="outline" className="h-11 rounded-xl px-5 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                            <FunnelIcon className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Tab content */}
                <div className="min-h-[400px]">
                    {activeTab === 'Payments' && renderInvoiceList(filteredPayments)}
                    {activeTab === 'Outstanding Payments' && renderInvoiceList(filteredOutstanding)}
                    {activeTab === 'Trends and Insights' && renderChart()}
                </div>
            </div>
        </div>
    );
};

export default VendorFinances;
