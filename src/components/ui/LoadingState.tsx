import React from 'react';
import PremiumCard from './PremiumCard';
import { LoadingSpinner } from './LoadingSpinner';

export interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...',
  fullScreen = false,
  className = ''
}) => {
  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <LoadingSpinner size="lg" aria-label={message} />
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {message}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <PremiumCard className="p-8">
          {content}
        </PremiumCard>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  );
};

export default LoadingState;

