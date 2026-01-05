import { useState } from 'react';
import {
  CreditCardIcon,
  CalendarDaysIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Subscription = () => {
  // Mock subscription data
  const [currentPlan] = useState({
    name: 'Professional',
    price: 29,
    period: 'month',
    features: [
      'Unlimited event listings',
      'Priority customer support',
      'Advanced analytics',
      'Custom branding',
      'Up to 10 team members'
    ],
    renewalDate: '2023-12-15'
  });

  // Mock plans data
  const plans = [
    {
      id: 'basic',
      name: 'Starter',
      price: 9,
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        '5 event listings',
        'Standard support',
        'Basic analytics',
        'Email support'
      ],
      cta: 'Current Plan',
      featured: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 29,
      period: 'month',
      description: 'For growing businesses',
      features: [
        'Unlimited event listings',
        'Priority customer support',
        'Advanced analytics',
        'Custom branding',
        'Up to 10 team members'
      ],
      cta: 'Current Plan',
      featured: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'month',
      description: 'For large organizations',
      features: [
        'Unlimited everything',
        '24/7 dedicated support',
        'Custom integrations',
        'Personal account manager',
        'Unlimited team members'
      ],
      cta: 'Upgrade',
      featured: false
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 uppercase">SUBSCRIPTION</h1>
        <p className="mt-1 text-sm text-gray-500 font-medium">Manage your subscription and billing</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-8 border-b border-gray-50">
          <div>
            <h3 className="text-lg font-bold text-gray-900 uppercase">Your Plan: {currentPlan.name}</h3>
            <p className="mt-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Renews on {currentPlan.renewalDate}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-3xl font-bold text-[#D0771E]">${currentPlan.price}<span className="text-xs font-bold text-gray-400 uppercase tracking-wider"> / {currentPlan.period}</span></div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-6">Included Features</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="p-1 bg-green-50 rounded-full">
                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-xs font-bold text-gray-500">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 uppercase mb-8">Choose Your Plan</h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col p-8 rounded-xl transition-all border ${plan.featured
                ? 'border-[#D0771E] shadow-xl shadow-orange-100/50 scale-[1.02] z-10 bg-white'
                : 'border-gray-100 hover:border-gray-200 bg-gray-50/30'
                }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D0771E] text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 uppercase">{plan.name}</h4>
                <p className="mt-1 text-xs font-bold text-gray-400 uppercase tracking-wider">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">/ {plan.period}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-bold text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${plan.cta === 'Current Plan'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : plan.featured
                    ? 'bg-[#D0771E] text-white shadow-lg shadow-orange-100/50 hover:scale-[1.02]'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                disabled={plan.cta === 'Current Plan'}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Information */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mt-8">
        <h3 className="text-lg font-bold text-gray-900 uppercase mb-8">Billing Information</h3>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 mb-10">
          <div className="p-6 bg-gray-50/30 rounded-xl border border-gray-100">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Method</label>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                <CreditCardIcon className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <span className="block text-sm font-bold text-gray-900">•••• •••• •••• 4242</span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Expires 12/25</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50/30 rounded-xl border border-gray-100">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Next Billing Date</label>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                <CalendarDaysIcon className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <span className="block text-sm font-bold text-gray-900">{currentPlan.renewalDate}</span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Amount: $29.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-3 border border-gray-100 text-[10px] font-bold uppercase tracking-widest rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all hover:scale-[1.02]">
            Update Payment Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;