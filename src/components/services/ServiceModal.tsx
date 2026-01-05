import React, { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { PremiumInput } from '../ui/PremiumInput';
import type { Service } from '../../data/mockServices';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (service: Partial<Service>) => void;
    service?: Service | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, onSave, service }) => {
    const [formData, setFormData] = useState<Partial<Service>>({
        name: '',
        category: 'Wedding Planning',
        price: 0,
        description: '',
        features: [''],
        active: true,
        image: ''
    });

    useEffect(() => {
        if (service) {
            setFormData(service);
        } else {
            setFormData({
                name: '',
                category: 'Wedding Planning',
                price: 0,
                description: '',
                features: [''], // Start with one empty feature
                active: true,
                image: ''
            });
        }
    }, [service, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Clean up empty features
        const cleanedFeatures = formData.features?.filter(f => f.trim() !== '') || [];
        onSave({ ...formData, features: cleanedFeatures });
        onClose();
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...(formData.features || [])];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...(formData.features || []), ''] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...(formData.features || [])];
        newFeatures.splice(index, 1);
        setFormData({ ...formData, features: newFeatures });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900">
                    <div>
                        <h2 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter italic">
                            {service ? 'Edit Service' : 'New Service'}
                        </h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                            {service ? 'Update service details' : 'Add a new service offering'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Scrollable Form Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <PremiumInput
                                    label="Service Name"
                                    placeholder="e.g. Full Wedding Planning"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">
                                    Category
                                </label>
                                <select
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E]"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                >
                                    <option value="Wedding Planning">Wedding Planning</option>
                                    <option value="Corporate Events">Corporate Events</option>
                                    <option value="Party Planning">Party Planning</option>
                                    <option value="Consultation">Consultation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <PremiumInput
                                label="Price ($)"
                                type="number"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                required
                            />

                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1 mb-2 block">
                                    Description
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E] min-h-[100px] resize-none"
                                    placeholder="Describe what's included..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1 mb-2 flex justify-between items-center">
                                    <span>Features / Inclusions</span>
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="text-[#D0771E] hover:text-[#b86619] text-[10px] flex items-center gap-1"
                                    >
                                        <PlusIcon className="w-3 h-3" />
                                        ADD ITEM
                                    </button>
                                </label>
                                <div className="space-y-3">
                                    {formData.features?.map((feature, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D0771E]"
                                                placeholder="e.g. Venue Scouting"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-end gap-3 z-10">
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
                        form="service-form"
                        variant="primary"
                        className="bg-[#D0771E] hover:bg-[#b86619] text-white shadow-lg shadow-orange-500/20"
                    >
                        {service ? 'Save Changes' : 'Create Service'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
