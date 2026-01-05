import React, { useState, useEffect } from 'react';
import { demoService } from '../services/demoService';

const DemoModeToggle: React.FC = () => {
  const [isDemoMode, setIsDemoMode] = useState(demoService.isEnabled());

  useEffect(() => {
    setIsDemoMode(demoService.isEnabled());
  }, []);

  const toggleDemoMode = () => {
    const newStatus = demoService.toggle();
    setIsDemoMode(newStatus);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleDemoMode}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
          isDemoMode 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-indigo-600 hover:bg-indigo-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
        {isDemoMode ? 'Demo Mode On' : 'Demo Mode Off'}
      </button>
    </div>
  );
};

export default DemoModeToggle;