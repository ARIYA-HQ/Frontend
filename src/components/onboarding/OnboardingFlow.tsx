import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SparklesIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BriefcaseIcon,
  PhotoIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import type { User } from '../../types';
import PremiumCard from '../ui/PremiumCard';
import { Button } from '../ui/Button';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  actionText: string;
  actionPath: string;
  icon: React.ForwardRefExoticComponent<any>;
}

interface OnboardingFlowProps {
  user: User;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // Different onboarding flows based on user role
  const eventPlannerSteps: OnboardingStep[] = [
    {
      id: 1,
      title: "Create Your First Event",
      description: "Start by creating your first event. Add details like date, location, and guest count.",
      actionText: "Create Event",
      actionPath: "/events/create",
      icon: CalendarDaysIcon
    },
    {
      id: 2,
      title: "Plan with AI",
      description: "Let our AI assistant help you plan your event with smart recommendations.",
      actionText: "Try AI Planner",
      actionPath: "/dashboard/ai-planner",
      icon: SparklesIcon
    },
    {
      id: 3,
      title: "Find Vendors",
      description: "Browse and connect with trusted vendors for your event needs.",
      actionText: "Browse Vendors",
      actionPath: "/vendors",
      icon: BriefcaseIcon
    },
    {
      id: 4,
      title: "Invite Guests",
      description: "Send invitations and track RSVPs all in one place.",
      actionText: "Manage Guests",
      actionPath: "/dashboard/guests",
      icon: UserGroupIcon
    }
  ];

  const professionalPlannerSteps: OnboardingStep[] = [
    {
      id: 1,
      title: "Set Up Your Profile",
      description: "Complete your professional profile to attract clients and showcase your expertise.",
      actionText: "Complete Profile",
      actionPath: "/profile",
      icon: UserCircleIcon
    },
    {
      id: 2,
      title: "Add Your Portfolio",
      description: "Showcase your previous work to build trust with potential clients.",
      actionText: "Add Portfolio",
      actionPath: "/portfolio",
      icon: PhotoIcon
    },
    {
      id: 3,
      title: "Set Your Availability",
      description: "Update your calendar with available dates for client events.",
      actionText: "Manage Calendar",
      actionPath: "/calendar",
      icon: CalendarDaysIcon
    },
    {
      id: 4,
      title: "Find Your First Client",
      description: "Connect with potential clients and start building your business.",
      actionText: "Find Clients",
      actionPath: "/clients",
      icon: SparklesIcon
    }
  ];

  const vendorSteps: OnboardingStep[] = [
    {
      id: 1,
      title: "Complete Your Profile",
      description: "Add your business information, services, and portfolio to attract clients.",
      actionText: "Edit Profile",
      actionPath: "/profile",
      icon: UserCircleIcon
    },
    {
      id: 2,
      title: "Set Availability",
      description: "Update your calendar with available dates for bookings.",
      actionText: "Manage Calendar",
      actionPath: "/calendar",
      icon: CalendarDaysIcon
    },
    {
      id: 3,
      title: "Add Services",
      description: "List your services and pricing to help clients understand what you offer.",
      actionText: "Add Services",
      actionPath: "/services",
      icon: BriefcaseIcon
    },
    {
      id: 4,
      title: "Get Bookings",
      description: "Start receiving booking requests from event planners.",
      actionText: "View Requests",
      actionPath: "/bookings",
      icon: CheckBadgeIcon
    }
  ];

  // Determine steps based on user role
  const steps = user.role === 'vendor'
    ? vendorSteps
    : user.role === 'professional_event_planner'
      ? professionalPlannerSteps
      : eventPlannerSteps;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAction = () => {
    navigate(steps[currentStep].actionPath);
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.4em] mb-4">Onboarding Phase</h2>
        <h1 className="text-4xl lg:text-5xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter leading-tight">
          Welcome to <span className="text-[#D0771E]">Àriyá.</span>
        </h1>
        <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-4">
          Establish your digital presence in {steps.length} simple phases.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-12 relative flex justify-between items-center max-w-2xl mx-auto">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-10 rounded-full">
          <div
            className="h-full bg-[#D0771E] transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(208,119,30,0.4)]"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border-2
              ${index <= currentStep
                ? 'bg-[#1D2939] dark:bg-gray-800 border-[#1D2939] dark:border-gray-700 text-white shadow-lg'
                : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-300'}`}
          >
            <span className="text-xs font-black">{index + 1}</span>
          </div>
        ))}
      </div>

      {/* Step Card */}
      <PremiumCard className="p-12 mb-10 border-none shadow-2xl shadow-orange-100 dark:shadow-none bg-white dark:bg-gray-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D0771E] opacity-[0.03] blur-[80px] rounded-full transform translate-x-1/3 -translate-y-1/3" />

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-24 h-24 rounded-3xl bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500">
            <StepIcon className="w-12 h-12 text-[#D0771E]" />
          </div>

          <h2 className="text-3xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-4">
            {steps[currentStep].title}
          </h2>
          <p className="text-sm font-bold text-gray-400 dark:text-gray-400 max-w-md mx-auto mb-12 leading-relaxed uppercase tracking-wide">
            {steps[currentStep].description}
          </p>

          <Button
            onClick={handleAction}
            className="px-10 h-16 bg-[#1D2939] dark:bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] hover:bg-[#D0771E] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3"
          >
            {steps[currentStep].actionText}
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </PremiumCard>

      {/* Navigation */}
      <div className="flex justify-between items-center max-w-sm mx-auto">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all
            ${currentStep === 0
              ? 'text-gray-200 cursor-not-allowed'
              : 'text-gray-400 hover:text-[#D0771E]'}`}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Previous Phase
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white hover:text-[#D0771E] transition-all group"
        >
          {currentStep === steps.length - 1 ? 'Skip to Dashboard' : 'Next Phase'}
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default OnboardingFlow;