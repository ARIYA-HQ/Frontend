import React, { useState } from 'react';
import { XMarkIcon, CloudArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface AddGuestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddGuestModal: React.FC<AddGuestModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'Manual' | 'Spreadsheet'>('Manual');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">

                {/* Backdrop */}
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

                {/* Modal Panel */}
                <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl">

                    {/* Header */}
                    <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Add New Guest</h3>
                        <button onClick={onClose} className="rounded-full p-2 bg-gray-50 text-gray-400 hover:text-[#D0771E] hover:bg-orange-50 transition-colors">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="px-8 border-b border-gray-100">
                        <div className="flex gap-8">
                            <button
                                onClick={() => setActiveTab('Manual')}
                                className={`py-4 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'Manual' ? 'border-[#D0771E] text-[#D0771E]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                Add Manually
                            </button>
                            <button
                                onClick={() => setActiveTab('Spreadsheet')}
                                className={`py-4 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'Spreadsheet' ? 'border-[#D0771E] text-[#D0771E]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                Add from Spreadsheet
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {activeTab === 'Manual' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">First Name</label>
                                        <input type="text" className="block w-full rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Last Name</label>
                                        <input type="text" className="block w-full rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                    <input type="email" className="block w-full rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                                    <input type="tel" className="block w-full rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Category</label>
                                        <select className="block w-full rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all">
                                            <option>Family</option>
                                            <option>Friend</option>
                                            <option>Work</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Dietary Requirements</label>
                                        <select className="block w-full rounded-2xl border-0 bg-gray-50 dark:bg-gray-700 py-3.5 pl-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-600 transition-all">
                                            <option>None</option>
                                            <option>Vegetarian</option>
                                            <option>Vegan</option>
                                            <option>Gluten-free</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Spreadsheet' && (
                            <div className="space-y-8">
                                <div className="space-y-3 bg-green-50/50 p-6 rounded-2xl border border-green-100">
                                    <div className="flex items-center text-xs font-bold text-green-700 gap-3">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                        Enter column headers (Name, Plus One, Address) in row 1
                                    </div>
                                    <div className="flex items-center text-xs font-bold text-green-700 gap-3">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                        Enter guests and partners on same line
                                    </div>
                                    <div className="flex items-center text-xs font-bold text-green-700 gap-3">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                        Ensure file is .csv format
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Upload File</label>
                                    <div className="mt-1 flex justify-center rounded-3xl border-2 border-dashed border-gray-200 px-6 py-12 hover:bg-gray-50 hover:border-[#D0771E]/30 transition-all cursor-pointer group">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-100 transition-colors">
                                                <CloudArrowUpIcon className="h-8 w-8 text-[#D0771E]" aria-hidden="true" />
                                            </div>
                                            <div className="mt-4 text-sm leading-6 text-gray-600">
                                                <span className="font-black text-[#D0771E] uppercase tracking-wide">Browse File</span>
                                                <p className="pl-1 text-xs font-medium text-gray-400 mt-1">or drag and drop here</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="bg-white px-8 py-6 border-t border-gray-100">
                        <button
                            type="button"
                            className="w-full justify-center rounded-2xl bg-[#D0771E] px-4 py-4 text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-orange-600 hover:shadow-orange-300 transition-all focus:outline-none flex items-center gap-2"
                            onClick={onClose}
                        >
                            {activeTab === 'Spreadsheet' ? 'Upload & Process' : 'Add Guest'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddGuestModal;
