/**
 * UI Components Barrel Export
 * Centralized exports for all UI components
 */

// Premium Components (Primary)
export { PremiumButton, type PremiumButtonProps } from './PremiumButton';
export { PremiumInput, PremiumSearch, type PremiumInputProps } from './PremiumInput';
export { default as PremiumCard, type PremiumCardProps } from './PremiumCard';
export { default as PremiumTabs } from './PremiumTabs';

// Loading Components
export { LoadingSpinner, type LoadingSpinnerProps } from './LoadingSpinner';
export { LoadingState, type LoadingStateProps } from './LoadingState';
export { Skeleton, type SkeletonProps } from './Skeleton';

// Standard Components (Legacy - consider migrating to Premium)
export { Button, type ButtonComponentProps } from './Button';
export { Input, input, type InputComponentProps } from './Input';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, type CardProps } from './Card';

// Layout Components
export { default as Header } from './Header';
export { default as Sidebar } from './Sidebar';
export { default as PageHeader } from './PageHeader';
export { default as Breadcrumbs } from './Breadcrumbs';
export { default as Breadcrumb } from './Breadcrumb';

// Utility Components
export { default as Avatar } from './Avatar';
export { default as ErrorMessage } from './ErrorMessage';
export { default as FormField } from './FormField';
export { default as ThemeToggle } from './ThemeToggle';
export { default as Typography } from './Typography';

