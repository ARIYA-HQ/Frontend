import { useState, useMemo, Fragment, useEffect } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  CalendarIcon,
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  ListBulletIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Dialog, Transition, Menu } from '@headlessui/react';
import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';
import { Button } from '../../components/ui/Button';
import PremiumTabs from '../../components/ui/PremiumTabs';

interface Transaction {
  id: string;
  date: string;
  payee: string;
  categoryId: string;
  categoryName: string;
  amount: number;
  status: 'CLEARED' | 'PENDING' | 'RECURRING';
  note?: string;
  attachment?: string; // Receipt URL
}

interface BudgetCategory {
  id: string;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  color: string;
}

const mockCategories: BudgetCategory[] = [
  { id: '1', name: 'Venue & Catering', allocatedAmount: 15000, spentAmount: 8500, color: '#D0771E' },
  { id: '2', name: 'Photography & Video', allocatedAmount: 5000, spentAmount: 1200, color: '#1D2939' },
  { id: '3', name: 'Decor & Flowers', allocatedAmount: 4000, spentAmount: 4200, color: '#D0771E' },
  { id: '4', name: 'Entertainment', allocatedAmount: 3000, spentAmount: 500, color: '#1D2939' },
];

const mockTransactions: Transaction[] = [
  { id: 't1', date: '2024-03-20', payee: 'Grand Plaza Hotel', categoryId: '1', categoryName: 'Venue & Catering', amount: 5000, status: 'CLEARED' },
  { id: 't2', date: '2024-03-18', payee: 'Lens & Light Studio', categoryId: '2', categoryName: 'Photography & Video', amount: 1200, status: 'CLEARED' },
  { id: 't3', date: '2024-03-15', payee: 'Floral Art Co.', categoryId: '3', categoryName: 'Decor & Flowers', amount: 2500, status: 'CLEARED' },
  { id: 't4', date: '2024-03-10', payee: 'DJ Spark Events', categoryId: '4', categoryName: 'Entertainment', amount: 500, status: 'PENDING' },
];

const BudgetTracker = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<BudgetCategory[]>(mockCategories);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [globalBudget, setGlobalBudget] = useState(30000);
  const [isEditingGlobal, setIsEditingGlobal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // Management State
  const [isManagementMode, setIsManagementMode] = useState(false);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState<Set<string>>(new Set());

  // Modals state
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null); // Transaction or Category

  // Form states
  const [expenseForm, setExpenseForm] = useState({
    payee: '',
    amount: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
    status: 'CLEARED' as 'CLEARED' | 'PENDING' | 'RECURRING',
    attachment: null as string | null,
    isRecurring: false
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    allocatedAmount: '',
    color: '#D0771E'
  });

  // Calculate stats based on transactions to ensure sync
  const stats = useMemo(() => {
    const allocated = categories.reduce((acc, cat) => acc + cat.allocatedAmount, 0);
    const spent = transactions.reduce((acc, tr) => acc + tr.amount, 0);
    return {
      total: globalBudget,
      allocated,
      unallocated: globalBudget - allocated,
      spent,
      remaining: globalBudget - spent,
      utilization: (spent / globalBudget) * 100
    };
  }, [categories, transactions, globalBudget]);

  // Sync category spent amounts based on transactions
  const enrichedCategories = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      spentAmount: transactions
        .filter(tr => tr.categoryId === cat.id)
        .reduce((acc, tr) => acc + tr.amount, 0)
    }));
  }, [categories, transactions]);

  const filteredCategories = enrichedCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTransactions = transactions.filter(tr => {
    const matchesSearch = tr.payee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tr.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory ? tr.categoryId === filterCategory : true;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Handlers for Expenses
  const handleOpenExpenseModal = (transaction?: Transaction) => {
    if (transaction) {
      setEditingItem(transaction);
      setExpenseForm({
        payee: transaction.payee,
        amount: transaction.amount.toString(),
        categoryId: transaction.categoryId,
        date: transaction.date,
        note: transaction.note || '',
        status: transaction.status,
        attachment: transaction.attachment || null,
        isRecurring: transaction.status === 'RECURRING'
      });
    } else {
      setEditingItem(null);
      setExpenseForm({
        payee: '',
        amount: '',
        categoryId: categories[0]?.id || '',
        date: new Date().toISOString().split('T')[0],
        note: '',
        status: 'CLEARED',
        attachment: null,
        isRecurring: false
      });
    }
    setShowExpenseModal(true);
  };

  const handleSaveExpense = () => {
    if (!expenseForm.payee || !expenseForm.amount || !expenseForm.categoryId) return;
    const amountNum = parseFloat(expenseForm.amount);
    const category = categories.find(c => c.id === expenseForm.categoryId);

    if (editingItem) {
      setTransactions(prev => prev.map(tr =>
        tr.id === editingItem.id
          ? {
            ...tr,
            payee: expenseForm.payee,
            amount: amountNum,
            categoryId: expenseForm.categoryId,
            categoryName: category?.name || 'Unknown',
            date: expenseForm.date,
            note: expenseForm.note,
            status: expenseForm.isRecurring ? 'RECURRING' : expenseForm.status,
            attachment: expenseForm.attachment || undefined
          }
          : tr
      ));
    } else {
      const newTr: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        date: expenseForm.date,
        payee: expenseForm.payee,
        categoryId: expenseForm.categoryId,
        categoryName: category?.name || 'Unknown',
        amount: amountNum,
        status: expenseForm.isRecurring ? 'RECURRING' : expenseForm.status,
        note: expenseForm.note,
        attachment: expenseForm.attachment || undefined
      };
      setTransactions([newTr, ...transactions]);
    }
    setShowExpenseModal(false);
  };

  const handleDeleteExpense = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    const nextSelected = new Set(selectedTransactionIds);
    nextSelected.delete(id);
    setSelectedTransactionIds(nextSelected);
  };

  const handleToggleSelectTransaction = (id: string) => {
    const next = new Set(selectedTransactionIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedTransactionIds(next);
  };

  const handleBulkDeleteTransactions = () => {
    if (confirm(`Are you sure you want to delete ${selectedTransactionIds.size} transactions?`)) {
      setTransactions(prev => prev.filter(t => !selectedTransactionIds.has(t.id)));
      setSelectedTransactionIds(new Set());
      setIsManagementMode(false);
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to storage. Here, create a local URL.
      setExpenseForm(prev => ({ ...prev, attachment: URL.createObjectURL(file) }));
    }
  };

  // Handlers for Categories
  const handleOpenCategoryModal = (category?: BudgetCategory) => {
    if (category) {
      setEditingItem(category);
      setCategoryForm({
        name: category.name,
        allocatedAmount: category.allocatedAmount.toString(),
        color: category.color
      });
    } else {
      setEditingItem(null);
      setCategoryForm({
        name: '',
        allocatedAmount: '',
        color: '#D0771E'
      });
    }
    setShowCategoryModal(true);
  };

  const handleSaveCategory = () => {
    if (!categoryForm.name || !categoryForm.allocatedAmount) return;
    const amountNum = parseFloat(categoryForm.allocatedAmount);

    if (editingItem) {
      setCategories(prev => prev.map(cat =>
        cat.id === editingItem.id
          ? { ...cat, name: categoryForm.name, allocatedAmount: amountNum, color: categoryForm.color }
          : cat
      ));
      // Update transactions that use this category name (if name changed)
      setTransactions(prev => prev.map(tr =>
        tr.categoryId === editingItem.id
          ? { ...tr, categoryName: categoryForm.name }
          : tr
      ));
    } else {
      const newCat: BudgetCategory = {
        id: Math.random().toString(36).substr(2, 9),
        name: categoryForm.name,
        allocatedAmount: amountNum,
        spentAmount: 0,
        color: categoryForm.color
      };
      setCategories([...categories, newCat]);
    }
    setShowCategoryModal(true);
    setShowCategoryModal(false);
  };

  const handleDeleteCategory = (id: string) => {
    // Check if transactions exist
    const hasTransactions = transactions.some(t => t.categoryId === id);
    if (hasTransactions) {
      if (!confirm('This category has transactions. Deleting it will also delete all associated transactions. Proceed?')) return;
      setTransactions(prev => prev.filter(t => t.categoryId !== id));
    }
    setCategories(prev => prev.filter(c => c.id !== id));
    if (filterCategory === id) setFilterCategory(null);
  };

  const tabsConfig = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Transactions', label: 'Transactions' },
    { id: 'Planning', label: 'Planning' }
  ];

  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-400">Financial Intelligence</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Ariya Intel Panel */}
        <PremiumCard className="p-8 bg-[#1D2939] dark:bg-gray-800 border-none relative overflow-hidden group col-span-1">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <ChartBarIcon className="w-24 h-24 text-white" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D0771E] flex items-center justify-center animate-pulse">
                <BanknotesIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D0771E]">Ariya Intel</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <p className="text-[10px] font-bold text-white/90 leading-relaxed font-mono">
                  {stats.remaining < 5000 ? "⚠️ Critical: Available balance dropping below target buffer." : "✨ Strategy: You have ₦" + stats.remaining.toLocaleString() + " optimized for deployment."}
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Spend Velocity</span>
                  <span className="text-[8px] font-black text-emerald-400">Healthy</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[65%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[8px] font-black uppercase tracking-widest text-white/40">Suggested Adjustments</h4>
                <ul className="text-[9px] font-medium text-white/70 space-y-1">
                  <li>• Reallocate 5% from Decor to Buffer</li>
                  <li>• Complete 2 pending payments</li>
                </ul>
              </div>
            </div>
          </div>
        </PremiumCard>

        {/* Categories Grid (Shifted) */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredCategories.map(cat => {
            const percentage = Math.min((cat.spentAmount / (cat.allocatedAmount || 1)) * 100, 100);
            const isOver = cat.spentAmount > cat.allocatedAmount;
            const isActive = filterCategory === cat.id;

            return (
              <PremiumCard
                key={cat.id}
                onClick={() => { setFilterCategory(cat.id); setActiveTab('Transactions'); }}
                className={`p-8 cursor-pointer transition-all group relative overflow-hidden ${isActive ? 'ring-2 ring-[#D0771E] shadow-2xl dark:shadow-none' : 'hover:shadow-2xl dark:hover:shadow-none'
                  }`}
              >
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className={`p-3 rounded-2xl transition-colors ${isActive ? 'bg-[#D0771E]/10 dark:bg-[#D0771E]/20' : 'bg-gray-50 dark:bg-gray-700 group-hover:bg-[#D0771E]/10 dark:group-hover:bg-[#D0771E]/20'
                    }`}>
                    <BanknotesIcon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#D0771E]' : 'text-[#1D2939] dark:text-white group-hover:text-[#D0771E]'
                      }`} />
                  </div>

                  {/* Action Menu */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <Menu as="div" className="relative">
                      <Menu.Button className="p-2 text-gray-300 dark:text-gray-500 hover:text-[#D0771E] transition-colors rounded-xl hover:bg-white dark:hover:bg-gray-700 border-none bg-transparent outline-none">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-2xl bg-white dark:bg-gray-800 shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-700 focus:outline-none p-2">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleOpenCategoryModal(cat)}
                                className={`${active ? 'bg-gray-50 dark:bg-gray-700 text-[#D0771E]' : 'text-gray-700 dark:text-gray-300'} group flex w-full items-center rounded-xl p-3 text-[10px] font-black uppercase tracking-widest transition-colors`}
                              >
                                <PencilIcon className="mr-3 h-4 w-4" /> Edit
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleDeleteCategory(cat.id)}
                                className={`${active ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400' : 'text-gray-700 dark:text-gray-300'} group flex w-full items-center rounded-xl p-3 text-[10px] font-black uppercase tracking-widest transition-colors`}
                              >
                                <TrashIcon className="mr-3 h-4 w-4" /> Delete
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-widest mb-1">{cat.name}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-2xl font-black dark:text-white">₦{cat.spentAmount.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest">of ₦{(cat.allocatedAmount || 0).toLocaleString()}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${isOver ? 'bg-rose-500' : 'bg-[#D0771E]'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400 dark:text-gray-400">Utilization</span>
                      <span className={`text-[9px] font-black uppercase tracking-tighter ${isOver ? 'text-rose-500' : 'text-[#D0771E]'}`}>
                        {isOver ? 'Allocation Exceeded' : `${Math.round(percentage)}%`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Visual Background Element */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-50/50 dark:bg-gray-700/30 rounded-full group-hover:bg-[#D0771E]/5 dark:group-hover:bg-[#D0771E]/10 transition-colors duration-500 blur-2xl"></div>
              </PremiumCard>
            );
          })}

          <button
            onClick={() => handleOpenCategoryModal()}
            className="border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-[40px] p-8 flex flex-col items-center justify-center text-gray-300 dark:text-gray-500 hover:border-[#D0771E]/30 dark:hover:border-[#D0771E]/50 hover:text-[#D0771E] transition-all group min-h-[220px]"
          >
            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#D0771E]/10 dark:group-hover:bg-[#D0771E]/20 transition-colors">
              <PlusIcon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Create Category</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          {filterCategory ? `Ledger: ${categories.find(c => c.id === filterCategory)?.name}` : 'Comprehensive Ledger'}
        </h3>
      </div>
      <PremiumCard className="p-0 overflow-hidden shadow-2xl dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-700 bg-[#F3F0EB]/20 dark:bg-gray-800/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#D0771E] focus:ring-[#D0771E]"
                    onChange={(e) => {
                      if (e.target.checked) setSelectedTransactionIds(new Set(filteredTransactions.map(t => t.id)));
                      else setSelectedTransactionIds(new Set());
                    }}
                    checked={selectedTransactionIds.size > 0 && selectedTransactionIds.size === filteredTransactions.length}
                  />
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Payee</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {filteredTransactions.length > 0 ? filteredTransactions.map(tr => (
                <tr key={tr.id} className={`hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group ${selectedTransactionIds.has(tr.id) ? 'bg-[#D0771E]/5' : ''}`}>
                  <td className="px-8 py-6">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#D0771E] focus:ring-[#D0771E]"
                      checked={selectedTransactionIds.has(tr.id)}
                      onChange={() => handleToggleSelectTransaction(tr.id)}
                    />
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-600 dark:text-gray-300 font-mono">{tr.date}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-tight">{tr.payee}</div>
                        {tr.note && <div className="text-[10px] text-gray-400 dark:text-gray-500 italic mt-0.5">{tr.note}</div>}
                      </div>
                      {tr.attachment && (
                        <div className="p-1 px-2 bg-[#D0771E]/10 rounded-lg text-[#D0771E] text-[8px] font-black uppercase tracking-widest">Receipt</div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button
                      onClick={() => setFilterCategory(tr.categoryId)}
                      className="px-3 py-1 bg-gray-50/80 dark:bg-gray-700/80 text-[10px] font-black uppercase tracking-tighter text-gray-400 dark:text-gray-400 rounded-lg group-hover:bg-[#D0771E]/10 dark:group-hover:bg-[#D0771E]/20 group-hover:text-[#D0771E] transition-all border-none cursor-pointer"
                    >
                      {tr.categoryName}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-[#1D2939] dark:text-white">₦{tr.amount.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${tr.status === 'CLEARED'
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      }`}>
                      {tr.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenExpenseModal(tr)}
                        className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-300 dark:text-gray-500 hover:text-[#D0771E] transition-all shadow-sm dark:shadow-none"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(tr.id)}
                        className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-300 dark:text-gray-500 hover:text-rose-500 transition-all shadow-sm dark:shadow-none"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-[20px] mx-auto mb-4 flex items-center justify-center">
                      <MagnifyingGlassIcon className="w-8 h-8 text-gray-200 dark:text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-400 dark:text-gray-400">No transactions found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PremiumCard>
    </div>
  );

  const renderPlanning = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PremiumCard className="p-10 bg-[#F3F0EB]/30 dark:bg-gray-800/30">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-1/3 space-y-4">
            <h3 className="text-2xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Strategic Planning</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">Adjust your global budget and fine-tune individual category allocations to optimize your event spending strategy.</p>

            <div className="pt-6 space-y-6">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-400">Allocation Health</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${stats.unallocated < 0 ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                    <span className="text-xs font-bold dark:text-white">{stats.unallocated < 0 ? 'Over Allocated' : 'Balance Clean'}</span>
                  </div>
                </div>
                <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-200 dark:text-gray-600" />
              </div>
            </div>
          </div>

          <div className="flex-1 w-full bg-white dark:bg-gray-800 p-10 rounded-[40px] shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-1 block">Global Event Budget (₦)</label>
                <div className="relative group">
                  <input
                    type="number"
                    value={globalBudget}
                    onChange={(e) => setGlobalBudget(parseFloat(e.target.value) || 0)}
                    className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-[#D0771E]/20 text-xl font-black dark:text-white transition-all"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-600 rounded-xl text-gray-300 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChartBarIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-1 block">Unallocated Buffer</label>
                <div className={`h-16 px-8 rounded-2xl flex items-center text-xl font-black ${stats.unallocated < 0
                  ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                  : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'}`}>
                  ₦{stats.unallocated.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-700 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white">Category Allocation Matrix</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-400">{categories.length} Categories</span>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {categories.map(cat => (
                  <div key={cat.id} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-all flex items-center gap-6 group relative">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600 flex items-center justify-center text-[#D0771E] group-hover:bg-[#D0771E] group-hover:text-white transition-all">
                      <ReceiptPercentIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1">
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#1D2939] dark:text-white truncate">{cat.name}</h4>
                        <span className="text-[8px] font-black text-gray-400 uppercase">{Math.round((cat.allocatedAmount / (globalBudget || 1)) * 100)}% Load</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-1.5 flex-1 bg-white dark:bg-gray-600 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D0771E] opacity-60" style={{ width: `${(cat.allocatedAmount / (globalBudget || 1)) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-48 relative">
                      <input
                        type="number"
                        value={cat.allocatedAmount}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setCategories(prev => prev.map(c => c.id === cat.id ? { ...c, allocatedAmount: val } : c));
                        }}
                        className="w-full h-12 px-6 rounded-xl bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E]/20 text-sm font-black dark:text-white text-right"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 dark:text-gray-500 font-bold uppercase">₦</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-700 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white">Recurring Commitments</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#D0771E]">Active Subscriptions</span>
              </div>
              <div className="space-y-4">
                {transactions.filter(t => t.status === 'RECURRING').map(rec => (
                  <div key={rec.id} className="p-5 bg-[#1D2939] rounded-2xl flex items-center justify-between group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#D0771E]">
                        <ArrowPathIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white">{rec.payee}</h4>
                        <p className="text-[8px] font-bold text-white/40 uppercase">{rec.categoryName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-white">₦{rec.amount.toLocaleString()}</div>
                      <div className="text-[8px] font-black text-[#D0771E] uppercase">Monthly</div>
                    </div>
                  </div>
                ))}
                {transactions.filter(t => t.status === 'RECURRING').length === 0 && (
                  <div className="py-10 text-center border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-3xl">
                    <p className="text-[9px] font-black uppercase text-gray-300">No recurring entries detected</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PremiumCard>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6 sm:gap-8 dark:bg-gray-900">
      <PageHeader
        breadcrumb="Financial Planning"
        title="Budget Planner"
        subtitle="Strategic allocation and precise tracking of event funds"
        actions={
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              className={`h-14 px-6 rounded-2xl border-gray-100 dark:border-gray-700 transition-all ${isManagementMode ? 'bg-[#1D2939] text-white border-[#1D2939]' : 'bg-white dark:bg-gray-800 text-[#1D2939] dark:text-white'}`}
              onClick={() => {
                setIsManagementMode(!isManagementMode);
                setSelectedTransactionIds(new Set());
              }}
            >
              {isManagementMode ? <CheckCircleIcon className="w-5 h-5 mr-2" /> : <ListBulletIcon className="w-5 h-5 mr-2" />}
              {isManagementMode ? "Done Managing" : "Manage Ledger"}
            </Button>
            <Button
              onClick={() => handleOpenExpenseModal()}
              className="h-14 px-8 rounded-2xl shadow-xl dark:shadow-none bg-[#D0771E]"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Record Expense
            </Button>
          </div>
        }
      />

      {/* Bulk Actions Bar */}
      {isManagementMode && selectedTransactionIds.size > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-bottom-20 duration-500">
          <div className="px-10 py-6 bg-[#1D2939] dark:bg-gray-800 text-white rounded-[40px] shadow-[0_32px_64px_-20px_rgba(0,0,0,0.4)] flex items-center gap-12 border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Selected</span>
              <span className="text-xl font-black">{selectedTransactionIds.size} Entries</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex items-center gap-6">
              <button
                onClick={handleBulkDeleteTransactions}
                className="flex flex-col items-center gap-1 group transition-all hover:scale-110"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                  <TrashIcon className="w-6 h-6" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-red-400 group-hover:text-white transition-colors">Delete Batch</span>
              </button>
            </div>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl px-8"
              onClick={() => {
                setIsManagementMode(false);
                setSelectedTransactionIds(new Set());
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Professional Summary Header */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <PremiumCard className="p-0 overflow-hidden bg-[#1D2939] border-none text-white lg:col-span-3 relative group">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 translate-x-32 group-hover:translate-x-16 transition-transform duration-1000"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5 relative z-10">
            <div className="p-10 space-y-2 border-white/5">
              <div className="flex items-center gap-2 text-[#D0771E]">
                <AdjustmentsHorizontalIcon className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Global Budget</span>
              </div>
              <h2 className="text-3xl font-black">₦{stats.total.toLocaleString()}</h2>
              <p className="text-[10px] text-gray-500 font-medium">Strategic event target</p>
            </div>
            <div className="p-10 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400">
                <ReceiptPercentIcon className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Allocated</span>
              </div>
              <h2 className="text-3xl font-black">₦{stats.allocated.toLocaleString()}</h2>
              <p className="text-[10px] text-gray-500 font-medium">Sum of category targets</p>
            </div>
            <div className="p-10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Spent to Date</span>
              </div>
              <h2 className="text-3xl font-black">₦{stats.spent.toLocaleString()}</h2>
              <p className="text-[10px] text-gray-500 font-medium font-mono">{transactions.length} verified entries</p>
            </div>
            <div className="p-10 flex flex-col justify-center bg-white/5">
              <div className="flex justify-between items-end mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Burn</span>
                <span className="text-xl font-black">{Math.round(stats.utilization)}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${stats.utilization > 100 ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'bg-[#D0771E]'}`} style={{ width: `${Math.min(stats.utilization, 100)}%` }}></div>
              </div>
            </div>
          </div>
        </PremiumCard>

        <PremiumCard className="p-10 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-xl dark:shadow-none flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
              <ArrowUpIcon className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Available Balance</span>
            </div>
            <h2 className="text-4xl font-black text-[#1D2939] dark:text-white tracking-tighter">₦{stats.remaining.toLocaleString()}</h2>
          </div>
          <div className="pt-4 border-t border-gray-50 dark:border-gray-700 mt-4 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-400">Next Forecast</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-[#D0771E]">Live Intel</span>
          </div>
        </PremiumCard>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <PremiumTabs
            tabs={tabsConfig}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Filter by payee or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-50 dark:border-gray-700 shadow-sm dark:shadow-none focus:ring-4 focus:ring-[#D0771E]/5 text-xs font-medium dark:text-white transition-all"
            />
          </div>
        </div>

        <div className="pb-20">
          {activeTab === 'Overview' && renderOverview()}
          {activeTab === 'Transactions' && renderTransactions()}
          {activeTab === 'Planning' && renderPlanning()}
        </div>
      </div>

      {/* Expense Modal */}
      <Transition.Root show={showExpenseModal} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={setShowExpenseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#1D2939]/40 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-[40px] bg-white text-left shadow-2xl transition-all w-full max-w-xl">
                  <div className="px-10 py-10 bg-[#F3F0EB]/30 border-b flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">{editingItem ? 'Edit entry' : 'Record entry'}</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Financial ledger update</p>
                    </div>
                    <button onClick={() => setShowExpenseModal(false)} className="p-3 hover:bg-black/5 rounded-2xl transition-colors outline-none border-none bg-transparent">
                      <PlusIcon className="w-6 h-6 rotate-45" />
                    </button>
                  </div>

                  <div className="p-10 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Payee / Vendor</label>
                        <input
                          type="text"
                          value={expenseForm.payee}
                          onChange={(e) => setExpenseForm({ ...expenseForm, payee: e.target.value })}
                          placeholder="Who are you paying?"
                          className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold dark:text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Amount (₦)</label>
                          <input
                            type="number"
                            value={expenseForm.amount}
                            onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                            placeholder="0.00"
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold dark:text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Category</label>
                          <div className="relative">
                            <select
                              value={expenseForm.categoryId}
                              onChange={(e) => setExpenseForm({ ...expenseForm, categoryId: e.target.value })}
                              className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold dark:text-white appearance-none"
                            >
                              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                            <ChevronDownIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Date</label>
                          <input
                            type="date"
                            value={expenseForm.date}
                            onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold dark:text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Status</label>
                          <div className="relative">
                            <select
                              value={expenseForm.status}
                              onChange={(e) => setExpenseForm({ ...expenseForm, status: e.target.value as any })}
                              className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold dark:text-white appearance-none"
                            >
                              <option value="CLEARED">Cleared</option>
                              <option value="PENDING">Pending</option>
                            </select>
                            <ChevronDownIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Optional Note</label>
                        <textarea
                          value={expenseForm.note}
                          onChange={(e) => setExpenseForm({ ...expenseForm, note: e.target.value })}
                          placeholder="Add expense details..."
                          className="w-full p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-medium dark:text-white resize-none h-24"
                        ></textarea>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Evidence / Receipt Document</label>
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            id="receipt-upload"
                            className="hidden"
                            accept="image/*,application/pdf"
                            onChange={handleReceiptUpload}
                          />
                          <Button
                            variant="outline"
                            className="h-14 flex-1 border-dashed border-2 border-gray-100 dark:border-gray-700"
                            onClick={() => document.getElementById('receipt-upload')?.click()}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {expenseForm.attachment ? 'Replace Receipt' : 'Attach Digital Receipt'}
                          </Button>
                          {expenseForm.attachment && (
                            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600">
                              <CheckCircleIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                        <div className="space-y-1">
                          <label className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Set as Recurring</label>
                          <p className="text-[9px] text-gray-440 dark:text-gray-500 font-medium">Automatic monthly financial tracking</p>
                        </div>
                        <button
                          onClick={() => setExpenseForm(prev => ({ ...prev, isRecurring: !prev.isRecurring }))}
                          className={`w-14 h-8 rounded-full transition-all relative ${expenseForm.isRecurring ? 'bg-[#D0771E]' : 'bg-gray-200 dark:bg-gray-600'}`}
                        >
                          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${expenseForm.isRecurring ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <Button variant="outline" className="flex-1 rounded-2xl h-14 border-gray-100 dark:border-gray-700" onClick={() => setShowExpenseModal(false)}>Cancel</Button>
                      <Button className="flex-1 rounded-2xl h-14 dark:shadow-none bg-[#D0771E]" onClick={handleSaveExpense}>{editingItem ? 'Update Ledger' : 'Confirm Entry'}</Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Category Modal */}
      <Transition.Root show={showCategoryModal} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={setShowCategoryModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#1D2939]/40 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-[40px] bg-white dark:bg-gray-800 text-left shadow-2xl dark:shadow-none transition-all w-full max-w-xl">
                  <div className="px-10 py-10 bg-[#F3F0EB]/30 dark:bg-gray-700/30 border-b dark:border-gray-700 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">{editingItem ? 'Edit category' : 'New category'}</h3>
                      <p className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Budget architectural update</p>
                    </div>
                    <button onClick={() => setShowCategoryModal(false)} className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-colors outline-none border-none bg-transparent">
                      <PlusIcon className="w-6 h-6 rotate-45 dark:text-gray-400" />
                    </button>
                  </div>

                  <div className="p-10 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Category Name</label>
                        <input
                          type="text"
                          value={categoryForm.name}
                          onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                          placeholder="Ex: Floral Decor"
                          className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold dark:text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Allocated Amount (₦)</label>
                        <input
                          type="number"
                          value={categoryForm.allocatedAmount}
                          onChange={(e) => setCategoryForm({ ...categoryForm, allocatedAmount: e.target.value })}
                          placeholder="0.00"
                          className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <Button variant="outline" className="flex-1 rounded-2xl h-14 border-gray-100 dark:border-gray-700" onClick={() => setShowCategoryModal(false)}>Cancel</Button>
                      <Button className="flex-1 rounded-2xl h-14 dark:shadow-none bg-[#D0771E]" onClick={handleSaveCategory}>{editingItem ? 'Update Category' : 'Create Category'}</Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

// Helper Icon for adjustment matrix
const AdjustmentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

export default BudgetTracker;