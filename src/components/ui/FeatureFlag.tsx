import React from 'react';
import { featureFlagService } from '../services/featureFlagService';

interface FeatureFlagProps {
  flag: keyof ReturnType<typeof featureFlagService.getAll>;
  fallback?: React.ReactNode; // Content to show when flag is false
  children: React.ReactNode;
}

const FeatureFlag: React.FC<FeatureFlagProps> = ({ flag, fallback = null, children }) => {
  const isEnabled = featureFlagService.get(flag);
  
  if (isEnabled) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
};

export default FeatureFlag;