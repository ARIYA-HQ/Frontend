import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    XMarkIcon,
    CreditCardIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    ArrowRightIcon,
    ChevronLeftIcon
} from '@heroicons/react/24/outline';

interface BookingPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: any;
    onSuccess: () => void;
}

const BookingPaymentModal = ({ isOpen, onClose, booking, onSuccess }: BookingPaymentModalProps) => {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const ariyaFee = (booking?.amount || 0) * 0.05; // 5% fee
    const totalAmount = (booking?.amount || 0) + ariyaFee;

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
            setTimeout(() => {
                onSuccess();
            }, 2000);
        }, 2000);
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[200]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" />
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-[32px] bg-white dark:bg-gray-900 text-left shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                {/* Header */}
                                <div className="px-8 pt-8 pb-4 flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                            {step === 3 ? 'Payment Success' : 'Secure Checkout'}
                                        </h3>
                                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">
                                            Booking Ref: #BK-{booking?.id?.slice(-6).toUpperCase()}
                                        </p>
                                    </div>
                                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D0771E] focus-visible:ring-offset-gray-900">
                                        <XMarkIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    </button>
                                </div>

                                <div className="px-8 pb-8">
                                    {step === 1 && (
                                        <div className="animate-fade-in space-y-6">
                                            {/* Summary Card */}
                                            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 space-y-4 border border-gray-100 dark:border-gray-700">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight text-[11px]">Vendor Service</span>
                                                    <span className="text-gray-900 dark:text-white font-black">₦{booking?.amount?.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight text-[11px]">Ariya Escrow Fee (5%)</span>
                                                    <span className="text-gray-900 dark:text-white font-black">₦{ariyaFee.toLocaleString()}</span>
                                                </div>
                                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                                    <span className="text-xs font-black text-gray-900 dark:text-white uppercase">Total to Pay</span>
                                                    <span className="text-xl font-black text-[#D0771E]">₦{totalAmount.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-4 bg-orange-50/50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-900/40">
                                                <ShieldCheckIcon className="w-5 h-5 text-[#D0771E] flex-shrink-0" />
                                                <p className="text-[10px] font-bold text-orange-900 dark:text-orange-200 leading-relaxed uppercase tracking-tight">
                                                    Your funds will be held in Ariya Escrow and only released to the vendor upon your confirmation of service.
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => setStep(2)}
                                                className="w-full py-5 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 dark:shadow-none flex items-center justify-center gap-2"
                                            >
                                                Proceed to Payment
                                                <ArrowRightIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="animate-fade-in space-y-6">
                                            <div className="grid grid-cols-1 gap-3">
                                                {[
                                                    { id: 'card', label: 'Credit / Debit Card', icon: CreditCardIcon },
                                                    { id: 'transfer', label: 'Bank Transfer', icon: ShieldCheckIcon }
                                                ].map((method) => (
                                                    <div
                                                        key={method.id}
                                                        onClick={() => setPaymentMethod(method.id)}
                                                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === method.id ? 'border-[#D0771E] bg-orange-50/20 dark:bg-orange-900/20' : 'border-gray-50 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-100 dark:hover:border-gray-500'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? 'bg-[#D0771E] text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-400'
                                                                }`}>
                                                                <method.icon className="w-5 h-5" />
                                                            </div>
                                                            <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{method.label}</span>
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-[#D0771E]' : 'border-gray-200 dark:border-gray-700'
                                                            }`}>
                                                            {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-[#D0771E]" />}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setStep(1)}
                                                    className="w-16 h-16 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                                >
                                                    <ChevronLeftIcon className="w-6 h-6" />
                                                </button>
                                                <button
                                                    disabled={isProcessing}
                                                    onClick={handlePayment}
                                                    className="flex-1 py-5 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-100 dark:shadow-none flex items-center justify-center gap-2"
                                                >
                                                    {isProcessing ? (
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        `Pay ₦${totalAmount.toLocaleString()}`
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="animate-bounce-in py-8 text-center space-y-6">
                                            <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                                <CheckCircleIcon className="w-12 h-12 text-green-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Funds Secured!</h4>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                                                    You've successfully deposited ₦{totalAmount.toLocaleString()} into escrow for {booking?.serviceType}.
                                                </p>
                                            </div>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">
                                                The vendor has been notified and the service status is now "Booked".
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default BookingPaymentModal;
