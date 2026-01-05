import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { PremiumInput } from '../ui/PremiumInput';
import { Proposal } from '../../data/mockProposals';
import { MOCK_CLIENTS } from '../../data/mockClients';

interface ProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (proposal: Partial<Proposal>) => void;
    proposal?: Proposal | null;
}

const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose, onSave, proposal }) => {
    const [formData, setFormData] = useState<Partial<Proposal>>({
        title: '',
        clientId: '',
        clientName: '',
        value: 0,
        status: 'draft',
        dueDate: '',
        description: '',
        items: 1,
        tags: []
    });

    useEffect(() => {
        if (proposal) {
            setFormData(proposal);
        } else {
            setFormData({
                title: '',
                clientId: '',
                clientName: '',
                value: 0,
                status: 'draft',
                dueDate: '',
                description: '',
                items: 1,
                tags: []
            });
        }
    }, [proposal, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Find client name from ID if client changed
        const selectedClient = MOCK_CLIENTS.find(c => c.id === formData.clientId);
        const submissionData = {
            ...formData,
            clientName: selectedClient ? selectedClient.name : formData.clientName
        };
        onSave(submissionData);
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
                            {proposal ? 'Edit Proposal' : 'New Proposal'}
                        </h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                            {proposal ? 'Update proposal details' : 'Draft a new proposal'}
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
                        <div className="md:col-span-2">
                            <PremiumInput
                                label="Proposal Title"
                                placeholder="e.g. Full Wedding Planning"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">
                                Client
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E]"
                                value={formData.clientId}
                                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select a Client</option>
                                {MOCK_CLIENTS.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                        </div>

                        <PremiumInput
                            label="Total Value ($)"
                            type="number"
                            placeholder="0.00"
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                            required
                        />

                        <PremiumInput
                            label="Due / Expiry Date"
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
                                <option value="draft">Draft</option>
                                <option value="sent">Sent</option>
                                <option value="accepted">Accepted</option>
                                <option value="declined">Declined</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1 mb-2 block">
                                Description / Notes
                            </label>
                            <textarea
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] min-h-[100px] resize-none"
                                placeholder="Brief description of the proposal..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
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
                            {proposal ? 'Save Changes' : 'Create Proposal'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProposalModal;
