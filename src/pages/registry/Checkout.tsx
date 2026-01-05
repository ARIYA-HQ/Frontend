import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRightIcon,
    ChevronLeftIcon,
    TruckIcon,
    CreditCardIcon,
    CheckCircleIcon,
    MapPinIcon,
    ShoppingBagIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../../contexts/CartContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart } = useCart();
    const [step, setStep] = useState(1);

    // Form States
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('card');

    const formatPrice = (price: number) => {
        return '₦' + price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    };

    const subtotal = cart.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
    const shippingFee = 5000;
    const total = subtotal + shippingFee;

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleCompleteOrder = () => {
        // Mock order completion
        setTimeout(() => {
            setStep(4);
            clearCart();
        }, 1500);
    };

    // --- Sub-components for Steps ---

    const StepIndicator = () => (
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
            {[
                { n: 1, label: 'Review', icon: ShoppingBagIcon },
                { n: 2, label: 'Shipping', icon: TruckIcon },
                { n: 3, label: 'Payment', icon: CreditCardIcon },
            ].map((s) => (
                <div key={s.n} className="flex items-center group">
                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step >= s.n ? 'bg-[#D0771E] text-white shadow-lg shadow-orange-200' : 'bg-white text-gray-400 border border-gray-200'
                            }`}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.n ? 'text-[#D0771E]' : 'text-gray-400'
                            }`}>{s.label}</span>
                    </div>
                    {s.n < 3 && (
                        <div className="w-20 sm:w-32 h-[2px] bg-gray-100 mx-4 -mt-6 relative overflow-hidden">
                            <div className={`absolute inset-0 bg-[#D0771E] transition-transform duration-500 origin-left ${step > s.n ? 'scale-x-100' : 'scale-x-0'
                                }`} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const Step1Review = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Your Items ({cart.length})</h3>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {cart.map((item) => (
                            <div key={item.cartId} className="p-6 flex gap-6 hover:bg-gray-50/50 transition-colors group">
                                <img src={item.image} alt="" className="w-24 h-24 rounded-xl object-cover shadow-sm" />
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.brand}</p>
                                            <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                                            {item.selectedColor && (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: item.selectedColor }} />
                                                    <span className="text-[10px] text-gray-500 font-bold uppercase">Variant Selected</span>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.cartId)}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="mt-auto flex justify-between items-center">
                                        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                            <span className="text-xs font-bold text-gray-500">Qty:</span>
                                            <span className="text-sm font-black text-gray-900">{item.quantity}</span>
                                        </div>
                                        <p className="text-sm font-black text-[#D0771E]">{formatPrice(item.unitPrice * item.quantity)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 pb-4 border-b border-gray-50">Order Summary</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">Subtotal</span>
                            <span className="text-gray-900 font-bold">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">Shipping</span>
                            <span className="text-green-600 font-bold">{formatPrice(shippingFee)}</span>
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-sm font-black text-gray-900 uppercase">Total</span>
                            <span className="text-xl font-black text-[#D0771E]">{formatPrice(total)}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleNext}
                        className="w-full mt-8 py-4 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 active:scale-[0.98]"
                    >
                        Proceed to Shipping
                    </button>
                    <p className="mt-4 text-[9px] text-center text-gray-400 font-bold uppercase tracking-tighter">Secure checkout by Ariya Pay</p>
                </div>
            </div>
        </div>
    );

    const Step2Shipping = () => (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-50">
                    <MapPinIcon className="w-6 h-6 text-[#D0771E]" />
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Contact & Shipping Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Legal Name</label>
                        <input
                            type="text"
                            className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-[#D0771E] focus:border-[#D0771E] transition-all"
                            placeholder="e.g. Sarah Michael"
                            value={shippingInfo.fullName}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-[#D0771E] focus:border-[#D0771E] transition-all"
                            placeholder="sarah@example.com"
                            value={shippingInfo.email}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-[#D0771E] focus:border-[#D0771E] transition-all"
                            placeholder="+234 ..."
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Delivery Address</label>
                        <textarea
                            className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-[#D0771E] focus:border-[#D0771E] transition-all"
                            rows={3}
                            placeholder="Street address, Apartment, Suite, etc."
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">City</label>
                        <input
                            type="text"
                            className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-[#D0771E] focus:border-[#D0771E] transition-all"
                            placeholder="Lagos"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">State</label>
                            <input
                                type="text"
                                className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-[#D0771E] focus:border-[#D0771E] transition-all"
                                placeholder="Lagos State"
                                value={shippingInfo.state}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Zip Code</label>
                            <input
                                type="text"
                                className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-[#D0771E] focus:border-[#D0771E] transition-all"
                                placeholder="100001"
                                value={shippingInfo.zipCode}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-12 pb-2">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-8 py-4 bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-[0.98]"
                    >
                        <ChevronLeftIcon className="w-4 h-4" />
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex-1 py-4 bg-[#D0771E] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 active:scale-[0.98]"
                    >
                        Continue to Payment
                    </button>
                </div>
            </div>
        </div>
    );

    const Step3Payment = () => (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-50">
                            <CreditCardIcon className="w-6 h-6 text-[#D0771E]" />
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Select Payment Method</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { id: 'card', label: 'Credit or Debit Card', desc: 'Secure payment via Paystack/Flutterwave', icon: CreditCardIcon },
                                { id: 'transfer', label: 'Bank Transfer', desc: 'Direct deposit into Ariya Escrow account', icon: ShoppingBagIcon },
                            ].map((method) => (
                                <div
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${paymentMethod === method.id ? 'border-[#D0771E] bg-orange-50/20' : 'border-gray-50 bg-white hover:border-gray-100'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${paymentMethod === method.id ? 'border-[#D0771E]' : 'border-gray-200'
                                        }`}>
                                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-[#D0771E]" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-sm font-bold text-gray-900">{method.label}</p>
                                            <method.icon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium">{method.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {paymentMethod === 'card' && (
                            <div className="mt-8 p-6 bg-gray-50 rounded-2xl space-y-4 border border-gray-100">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                    Express Card Payment
                                </div>
                                <div className="space-y-4 opacity-60 pointer-events-none">
                                    <div className="h-12 bg-white rounded-xl border border-gray-200 w-full" />
                                    <div className="flex gap-4">
                                        <div className="h-12 bg-white rounded-xl border border-gray-200 flex-1" />
                                        <div className="h-12 bg-white rounded-xl border border-gray-200 flex-1" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold italic">This is a mock payment interface for simulation.</p>
                            </div>
                        )}

                        <div className="flex gap-4 mt-12 pb-2">
                            <button
                                onClick={handleBack}
                                className="px-8 py-4 bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-[0.98]"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleCompleteOrder}
                                className="flex-1 py-4 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-[0.98]"
                            >
                                Complete Purchase — {formatPrice(total)}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 pb-4 border-b border-gray-50">Delivery Summary</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                                    <UserIcon className="w-4 h-4 text-[#D0771E]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Recipient</p>
                                    <p className="text-xs font-bold text-gray-700">{shippingInfo.fullName || ' Sarah Michael'}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                                    <MapPinIcon className="w-4 h-4 text-[#D0771E]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Address</p>
                                    <p className="text-xs font-bold text-gray-700 leading-relaxed">{shippingInfo.address || 'Loading address...'}</p>
                                    <p className="text-[10px] font-bold text-gray-500">{shippingInfo.city}, {shippingInfo.state}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const Step4Success = () => (
        <div className="max-w-xl mx-auto py-12 text-center animate-bounce-in">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircleIcon className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Order Confirmed!</h2>
            <p className="text-gray-500 font-medium mb-8">Thank you for your purchase. We've sent a confirmation email to {shippingInfo.email || 'Sarah Michael'}. Your order #ARI-9034-2026 is being processed.</p>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8 text-left">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Summary</span>
                    <span className="text-xs font-black text-[#D0771E]">#ARI-9034-2026</span>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-xs font-bold text-gray-500">Total Items</span>
                        <span className="text-xs font-black text-gray-900">{cart.length || 3} Gifts</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs font-bold text-gray-500">Amount Paid</span>
                        <span className="text-sm font-black text-gray-900">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs font-bold text-gray-500">Est. Delivery</span>
                        <span className="text-xs font-black text-green-600">3 - 5 Business Days</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => navigate('/registry')}
                    className="flex-1 py-4 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-[0.98]"
                >
                    Back to Registry
                </button>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest hover:border-gray-300 transition-all active:scale-[0.98]"
                >
                    Return to Dashboard
                </button>
            </div>
        </div>
    );

    // --- Main Page Structure ---

    if (cart.length === 0 && step < 4) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBagIcon className="w-10 h-10 text-gray-300" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Your bag is empty</h2>
                <p className="text-gray-500 font-medium mb-8 max-w-sm">Looks like you haven't added any gifts to your bag yet. Head back to the registry to explore awesome items!</p>
                <button
                    onClick={() => navigate('/registry')}
                    className="px-12 py-4 bg-[#D0771E] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-100"
                >
                    Browse Registry
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Breadcrumbs & Title */}
            <div className="mb-10 animate-fade-in-down">
                <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
                    <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/registry')}>Registry</span>
                    <ChevronRightIcon className="w-3 h-3" />
                    <span className="text-gray-900">Checkout</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/registry')}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none">Complete Purchase</h1>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Finalize your wedding registry gifts</p>
                    </div>
                </div>
            </div>

            {/* Stepper Logic */}
            {step < 4 && <StepIndicator />}

            {/* Step Views */}
            <div className="mt-8">
                {step === 1 && <Step1Review />}
                {step === 2 && <Step2Shipping />}
                {step === 3 && <Step3Payment />}
                {step === 4 && <Step4Success />}
            </div>
        </div>
    );
};

// --- Missing Icons ---
const XMarkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

export default Checkout;
