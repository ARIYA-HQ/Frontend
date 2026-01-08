import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { FeatureId, PRICING_TIERS, CURRENCY } from '../../data/pricing';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    featureId: FeatureId;
}

const UpgradeModal = ({ isOpen, onClose, featureId }: UpgradeModalProps) => {
    const getOfferDetails = () => {
        switch (featureId) {
            case 'create_event':
                return {
                    title: 'Host More Events',
                    description: 'You have reached the limit for free events. Upgrade to create unlimited events and manage multiple clients.',
                    price: PRICING_TIERS.PROFESSIONAL.SUBSCRIPTIONS.UNLIMITED_EVENTS,
                    benefits: ['Unlimited Events', 'Client Management', 'Priority Support'],
                    actionText: 'Unlock Unlimited Events'
                };
            case 'remove_branding':
                return {
                    title: 'Remove Ariya Branding',
                    description: 'Make this event truly yours. Remove the "Powered by Ariya" badge from your website and invitations.',
                    price: PRICING_TIERS.PERSONAL.UNLOCKS.REMOVE_BRANDING,
                    benefits: ['White-label Website', 'Custom Domain Support', 'Professional Look'],
                    actionText: 'Remove Branding'
                };
            case 'add_team_member':
                return {
                    title: 'Grow Your Team',
                    description: 'Collaborate seamlessly. Add team members to manage tasks, guests, and vendors together.',
                    price: PRICING_TIERS.PROFESSIONAL.SUBSCRIPTIONS.TEAM_SEAT,
                    benefits: ['Role-based Access', 'Activity Logging', 'Collaborative Planning'],
                    actionText: 'Add Seat'
                };
            case 'advanced_analytics':
                return {
                    title: 'Unlock Professional Insights',
                    description: 'See exactly how your business is performing with advanced analytics and reporting.',
                    price: PRICING_TIERS.PROFESSIONAL.SUBSCRIPTIONS.ADVANCED_ANALYTICS,
                    benefits: ['Conversion Tracking', 'Revenue Forecasting', 'Client Demographics'],
                    actionText: 'Get Analytics'
                };
            default:
                return {
                    title: 'Upgrade to Premium',
                    description: 'Unlock this feature and much more with our premium plans.',
                    price: 9000,
                    benefits: ['Premium Features', 'Priority Support'],
                    actionText: 'Upgrade Now'
                };
        }
    };

    const offer = getOfferDetails();

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100 dark:border-gray-700">

                                {/* Close Button */}
                                <div className="absolute right-4 top-4">
                                    <button
                                        type="button"
                                        className="rounded-full bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10 mb-4 sm:mb-0">
                                        <SparklesIcon className="h-6 w-6 text-orange-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title as="h3" className="text-xl font-black leading-6 text-gray-900 dark:text-white uppercase tracking-tight">
                                            {offer.title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {offer.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                            <ul className="space-y-3">
                                                {offer.benefits.map((benefit, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-100 dark:border-gray-700 items-center justify-between">
                                    <Button
                                        type="button"
                                        className="w-full sm:w-auto inline-flex w-full justify-center rounded-xl bg-orange-600 px-6 py-3 text-sm font-black text-white shadow-sm hover:bg-orange-500 sm:ml-3 uppercase tracking-widest"
                                        onClick={() => {
                                            // In a real app, this would trigger Stripe/Paystack
                                            alert(`Starting checkout for ${offer.price}`);
                                            onClose();
                                        }}
                                    >
                                        {offer.actionText} • {CURRENCY}{offer.price.toLocaleString()}
                                    </Button>
                                    <p className="hidden sm:block text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                        Secure Payment
                                    </p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default UpgradeModal;
