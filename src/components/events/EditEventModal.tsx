import React, { useState } from 'react';
import { XMarkIcon, CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface EditEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: any;
    onSave: (updatedEvent: any) => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ isOpen, onClose, event, onSave }) => {
    const [formData, setFormData] = useState({
        title: event.title,
        date: event.date,
        location: event.location,
        guestCount: event.guestCount,
        eventType: event.eventType
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="fixed inset-y-0 right-0 z-50 flex max-w-full sm:pl-10">
                <div className="w-screen max-w-full sm:max-w-md transform transition-all">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">

                        {/* Header */}
                        <div className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tight italic">Edit Manifest</h2>
                                <button type="button" className="rounded-full p-2 bg-gray-50 text-gray-400 hover:text-[#D0771E] hover:bg-orange-50 transition-colors" onClick={onClose}>
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update your primary event details</p>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit} className="relative flex-1 px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Event Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="block w-full rounded-2xl border-0 bg-gray-50 py-4 pl-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Event Type</label>
                                <select
                                    value={formData.eventType}
                                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                    className="block w-full rounded-2xl border-0 bg-gray-50 py-4 pl-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all"
                                >
                                    <option>Wedding</option>
                                    <option>Corporate</option>
                                    <option>Birthday</option>
                                    <option>Concert</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Event Date</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="block w-full rounded-2xl border-0 bg-gray-50 py-4 pl-4 pr-10 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all"
                                    />
                                    <CalendarIcon className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="block w-full rounded-2xl border-0 bg-gray-50 py-4 pl-4 pr-10 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all"
                                    />
                                    <MapPinIcon className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Expected Guests</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={formData.guestCount}
                                        onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) })}
                                        className="block w-full rounded-2xl border-0 bg-gray-50 py-4 pl-4 pr-10 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#D0771E] focus:bg-white transition-all"
                                    />
                                    <UserGroupIcon className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    className="w-full rounded-2xl bg-[#D0771E] px-6 py-4 text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-orange-600 hover:shadow-orange-300 transition-all focus:outline-none"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEventModal;
