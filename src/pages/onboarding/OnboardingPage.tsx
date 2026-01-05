import React, { useEffect, useState } from 'react';
import OnboardingFlow from '../../components/onboarding/OnboardingFlow';
import { User } from '../../types';

const OnboardingPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData: User = JSON.parse(storedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading onboarding...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OnboardingFlow user={user} />
      </div>
    </div>
  );
};

export default OnboardingPage;