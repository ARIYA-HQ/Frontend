import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  actionText: string;
  actionPath: string;
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
      actionPath: "/events/create"
    },
    {
      id: 2,
      title: "Plan with AI",
      description: "Let our AI assistant help you plan your event with smart recommendations.",
      actionText: "Try AI Planner",
      actionPath: "/dashboard/ai-planner"
    },
    {
      id: 3,
      title: "Find Vendors",
      description: "Browse and connect with trusted vendors for your event needs.",
      actionText: "Browse Vendors",
      actionPath: "/vendors"
    },
    {
      id: 4,
      title: "Invite Guests",
      description: "Send invitations and track RSVPs all in one place.",
      actionText: "Manage Guests",
      actionPath: "/dashboard/guests"
    }
  ];

  const professionalPlannerSteps: OnboardingStep[] = [
    {
      id: 1,
      title: "Set Up Your Profile",
      description: "Complete your professional profile to attract clients and showcase your expertise.",
      actionText: "Complete Profile",
      actionPath: "/profile"
    },
    {
      id: 2,
      title: "Add Your Portfolio",
      description: "Showcase your previous work to build trust with potential clients.",
      actionText: "Add Portfolio",
      actionPath: "/portfolio"
    },
    {
      id: 3,
      title: "Set Your Availability",
      description: "Update your calendar with available dates for client events.",
      actionText: "Manage Calendar",
      actionPath: "/calendar"
    },
    {
      id: 4,
      title: "Find Your First Client",
      description: "Connect with potential clients and start building your business.",
      actionText: "Find Clients",
      actionPath: "/clients"
    }
  ];

  const vendorSteps: OnboardingStep[] = [
    {
      id: 1,
      title: "Complete Your Profile",
      description: "Add your business information, services, and portfolio to attract clients.",
      actionText: "Edit Profile",
      actionPath: "/profile"
    },
    {
      id: 2,
      title: "Set Availability",
      description: "Update your calendar with available dates for bookings.",
      actionText: "Manage Calendar",
      actionPath: "/calendar"
    },
    {
      id: 3,
      title: "Add Services",
      description: "List your services and pricing to help clients understand what you offer.",
      actionText: "Add Services",
      actionPath: "/services"
    },
    {
      id: 4,
      title: "Get Bookings",
      description: "Start receiving booking requests from event planners.",
      actionText: "View Requests",
      actionPath: "/bookings"
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
      // Complete onboarding
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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Ariya</h1>
        <p className="text-gray-600">Let's get you set up in just a few steps</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="text-center">
          <div className="mx-auto bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <span className="text-indigo-600 text-2xl font-bold">{currentStep + 1}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
          
          <button
            onClick={handleAction}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {steps[currentStep].actionText}
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
            currentStep === 0
              ? 'text-gray-400 bg-gray-100'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingFlow;