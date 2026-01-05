import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { PremiumInput } from '../ui/PremiumInput';
import type { Client } from '../../data/mockClients';

interface ClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (client: Partial<Client>) => void;
    client?: Client | null;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, onSave, client }) => {
    const [formData, setFormData] = useState<Partial<Client>>({
        name: '',
        email: '',
        phone: '',
        location: '',
        status: 'active',
        eventType: 'Wedding',
        totalSpent: 0,
        totalEvents: 1
    });

    useEffect(() => {
        if (client) {
            setFormData(client);
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                location: '',
                status: 'active',
                eventType: 'Wedding',
                totalSpent: 0,
                totalEvents: 1,
                lastContact: 'Just now', // Default for new
                nextEvent: '',
            });
        }
    }, [client, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900">
                    <div>
                        <h2 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter italic">
                            {client ? 'Edit Client' : 'Add New Client'}
                        </h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                            {client ? 'Update client details' : 'Enter client information'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PremiumInput
                            label="Client Name"
                            placeholder="e.g. Johnson Wedding"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <PremiumInput
                            label="Location"
                            placeholder="e.g. New York, NY"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                        <PremiumInput
                            label="Email Address"
                            type="email"
                            placeholder="client@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <PremiumInput
                            label="Phone Number"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">
                                Status
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E]"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                            >
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">
                                Event Type
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E]"
                                value={formData.eventType}
                                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                            >
                                <option value="Wedding">Wedding</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Anniversary">Anniversary</option>
                                <option value="Mitzvah">Mitzvah</option>
                                <option value="Galas">Galas</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="bg-[#D0771E] hover:bg-[#b86619] text-white shadow-lg shadow-orange-500/20"
                        >
                            {client ? 'Save Changes' : 'Create Client'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientModal;
