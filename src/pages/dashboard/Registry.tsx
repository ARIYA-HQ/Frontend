import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Card, CardContent } from '../../components/ui/Card';
import {
  GiftIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CreditCardIcon,
  UserIcon,
  XMarkIcon,
  CheckBadgeIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const Registry = () => {
  const [registryItems, setRegistryItems] = useState([
    { id: 1, name: 'KitchenAid Stand Mixer', price: 379, category: 'Kitchen', purchased: 2, goal: 5 },
    { id: 2, name: 'Le Creuset Dutch Oven', price: 249, category: 'Cookware', purchased: 1, goal: 3 },
    { id: 3, name: 'Luxury Cotton Towels', price: 85, category: 'Bed & Bath', purchased: 0, goal: 4 },
  ]);

  const [cashFunds, setCashFunds] = useState([
    { id: 1, name: 'Vacation Fund', description: 'Help us create unforgettable memories', raised: 1249, goal: 2000, color: 'from-orange-400 to-orange-600' },
  ]);

  const [contributions] = useState([
    { id: 1, name: 'John Smith', item: 'KitchenAid Stand Mixer', amount: 379, date: '2023-11-15' },
    { id: 2, name: 'Sarah Johnson', item: 'Vacation Fund', amount: 500, date: '2023-11-10' },
    { id: 3, name: 'Michael Brown', item: 'Le Creuset Dutch Oven', amount: 249, date: '2023-11-05' },
  ]);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingFund, setEditingFund] = useState<any>(null);

  const [itemFormData, setItemFormData] = useState({
    name: '',
    price: 0,
    category: 'Kitchen',
    goal: 1
  });

  const [fundFormData, setFundFormData] = useState({
    name: '',
    description: '',
    goal: 1000,
    color: 'from-orange-400 to-orange-600'
  });

  const handleOpenItemModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setItemFormData({ ...item });
    } else {
      setEditingItem(null);
      setItemFormData({ name: '', price: 0, category: 'Kitchen', goal: 1 });
    }
    setIsItemModalOpen(true);
  };

  const handleOpenFundModal = (fund?: any) => {
    if (fund) {
      setEditingFund(fund);
      setFundFormData({ ...fund });
    } else {
      setEditingFund(null);
      setFundFormData({ name: '', description: '', goal: 1000, color: 'from-orange-400 to-orange-600' });
    }
    setIsFundModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setRegistryItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...itemFormData } : i));
    } else {
      setRegistryItems(prev => [...prev, { ...itemFormData, id: Date.now(), purchased: 0 }]);
    }
    setIsItemModalOpen(false);
  };

  const handleSaveFund = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFund) {
      setCashFunds(prev => prev.map(f => f.id === editingFund.id ? { ...f, ...fundFormData } : f));
    } else {
      setCashFunds(prev => [...prev, { ...fundFormData, id: Date.now(), raised: 0 }]);
    }
    setIsFundModalOpen(false);
  };

  const handleDeleteItem = (id: number) => {
    if (window.confirm('Delete this registry item?')) {
      setRegistryItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleDeleteFund = (id: number) => {
    if (window.confirm('Delete this cash fund?')) {
      setCashFunds(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 pb-12 h-full flex flex-col gap-8 dark:bg-gray-900">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1">Gift Hub</div>
          <h1 className="text-3xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Event Registry</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Curate your wishlist and track gift contributions</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleOpenFundModal()}
            className="inline-flex items-center px-4 py-2 text-xs font-black uppercase tracking-widest text-[#D0771E] hover:text-[#B6651A] transition-colors"
          >
            <CreditCardIcon className="w-4 h-4 mr-2" />
            Add Fund
          </button>
          <button
            onClick={() => handleOpenItemModal()}
            className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-black uppercase tracking-widest rounded-xl text-white bg-[#D0771E] hover:bg-[#B6651A] transition-all transform active:scale-95 shadow-orange-900/20"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Registry Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {registryItems.map((item) => (
              <div key={item.id} className="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl shadow-gray-100 dark:shadow-none border border-gray-50 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-none transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-2xl">
                    <GiftIcon className="h-6 w-6 text-[#D0771E]" />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenItemModal(item)} className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] dark:hover:text-orange-400 transition-colors">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{item.category}</div>
                  <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-2">{item.name}</h4>
                  <p className="text-2xl font-black text-[#1D2939] dark:text-white tracking-tighter">${item.price}</p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{item.purchased} of {item.goal} Received</span>
                    <span className="text-xs font-bold text-[#D0771E]">{Math.round((item.purchased / item.goal) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#D0771E] h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(item.purchased / item.goal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cash Funds */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Active Cash Funds</h3>
          {cashFunds.map((fund) => (
            <div key={fund.id} className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl shadow-gray-100 dark:shadow-none border border-gray-50 dark:border-gray-700 group">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${fund.color} opacity-10 dark:opacity-5 rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`} />

              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 bg-gradient-to-br ${fund.color} rounded-2xl text-white shadow-lg dark:shadow-none`}>
                    <CreditCardIcon className="h-6 w-6" />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenFundModal(fund)} className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] dark:hover:text-orange-400">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDeleteFund(fund.id)} className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h4 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-1">{fund.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">{fund.description}</p>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Raised</div>
                      <div className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white">${fund.raised.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Goal</div>
                      <div className="text-lg font-bold tracking-tighter text-gray-400 dark:text-gray-500">${fund.goal.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${fund.color} h-3 rounded-full transition-all duration-1000`}
                      style={{ width: `${(fund.raised / fund.goal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => handleOpenFundModal()}
            className="w-full py-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl text-gray-400 dark:text-gray-500 hover:border-[#D0771E] dark:hover:border-orange-500 hover:text-[#D0771E] dark:hover:text-orange-400 transition-all flex flex-col items-center justify-center gap-2 group"
          >
            <PlusIcon className="h-8 w-8 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Create New Fund</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">Live Contribution Feed</div>
        <Card className="rounded-3xl border-none shadow-xl dark:shadow-none overflow-hidden dark:bg-gray-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-50 dark:divide-gray-700">
                <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Contributor</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Item / Fund</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Amount</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-50 dark:divide-gray-700">
                  {contributions.map((contribution) => (
                    <tr key={contribution.id} className="hover:bg-orange-50/30 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                            <UserIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white uppercase">{contribution.name}</div>
                            <div className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Contributed on {contribution.date}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {contribution.item.includes('Fund') ? <HeartIcon className="h-4 w-4 text-red-400" /> : <GiftIcon className="h-4 w-4 text-[#D0771E]" />}
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{contribution.item}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-black text-gray-900 dark:text-white">${contribution.amount}</span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-black uppercase tracking-widest rounded-full">
                          <CheckBadgeIcon className="h-3 w-3" /> Transferred
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Item Modal */}
      <Transition appear show={isItemModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsItemModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 text-left align-middle shadow-2xl dark:shadow-none transition-all">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <Dialog.Title as="h3" className="text-xl font-black text-gray-900 dark:text-white uppercase">{editingItem ? 'Edit Gift Item' : 'New Registry Gift'}</Dialog.Title>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">Physical item details</p>
                    </div>
                    <button onClick={() => setIsItemModalOpen(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"><XMarkIcon className="w-6 h-6" /></button>
                  </div>

                  <form onSubmit={handleSaveItem} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Item Name</label>
                      <input required type="text" className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold dark:text-white" value={itemFormData.name} onChange={(e) => setItemFormData({ ...itemFormData, name: e.target.value })} placeholder="e.g. Dyson V15 Detect" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Category</label>
                        <select className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold dark:text-white appearance-none" value={itemFormData.category} onChange={(e) => setItemFormData({ ...itemFormData, category: e.target.value })}>
                          <option>Kitchen</option>
                          <option>Cookware</option>
                          <option>Bed & Bath</option>
                          <option>Electronics</option>
                          <option>Furniture</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Price ($)</label>
                        <input required type="number" className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold dark:text-white" value={itemFormData.price} onChange={(e) => setItemFormData({ ...itemFormData, price: Number(e.target.value) })} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Goal Quantity</label>
                      <input type="number" min="1" className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold dark:text-white" value={itemFormData.goal} onChange={(e) => setItemFormData({ ...itemFormData, goal: Number(e.target.value) })} />
                    </div>
                    <button type="submit" className="w-full py-4 bg-[#D0771E] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl dark:shadow-none shadow-orange-900/20 active:scale-95 transition-all">
                      {editingItem ? 'Update Item' : 'Add to Registry'}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Fund Modal */}
      <Transition appear show={isFundModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsFundModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 text-left align-middle shadow-2xl dark:shadow-none transition-all">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <Dialog.Title as="h3" className="text-xl font-black text-gray-900 dark:text-white uppercase">{editingFund ? 'Edit Cash Fund' : 'New Cash Fund'}</Dialog.Title>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">Experience and goal-based funding</p>
                    </div>
                    <button onClick={() => setIsFundModalOpen(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"><XMarkIcon className="w-6 h-6" /></button>
                  </div>

                  <form onSubmit={handleSaveFund} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Fund Name</label>
                      <input required type="text" className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold dark:text-white" value={fundFormData.name} onChange={(e) => setFundFormData({ ...fundFormData, name: e.target.value })} placeholder="e.g. Honeymoon in Bali" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Description</label>
                      <textarea className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold dark:text-white resize-none" rows={3} value={fundFormData.description} onChange={(e) => setFundFormData({ ...fundFormData, description: e.target.value })} placeholder="Tell your guests what this fund is for..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Goal Amount ($)</label>
                        <input required type="number" className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold dark:text-white" value={fundFormData.goal} onChange={(e) => setFundFormData({ ...fundFormData, goal: Number(e.target.value) })} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Branding Color</label>
                        <select className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold dark:text-white appearance-none" value={fundFormData.color} onChange={(e) => setFundFormData({ ...fundFormData, color: e.target.value })}>
                          <option value="from-orange-400 to-orange-600">Ariya Orange</option>
                          <option value="from-indigo-400 to-indigo-600">Royal Indigo</option>
                          <option value="from-purple-400 to-purple-600">Plum Purple</option>
                          <option value="from-emerald-400 to-emerald-600">Emerald Green</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-[#D0771E] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl dark:shadow-none shadow-orange-900/20 active:scale-95 transition-all">
                      {editingFund ? 'Update Fund' : 'Create Fund'}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Registry;