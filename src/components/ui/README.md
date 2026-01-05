# UI Component Design System

This document outlines the design system rules and guidelines for UI components in the AriyaHQ application.

## Design System Principles

### 1. Component Reusability
- All components should be reusable across the application
- Follow consistent naming conventions
- Use TypeScript interfaces for all props

### 2. Design Token Discipline
- Use only the defined spacing scale: `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64`
- Use only the defined color palette from Tailwind CSS
- Use only the defined border radius scale: `0, 1, 2, 4, 6, 8, 12, 16, 24, 32`

### 3. Untitled UI Icons
- All icons must come from the Untitled UI library
- No custom SVG icons unless explicitly approved
- Use consistent icon sizes (4, 5, 6, 8) for different contexts

## Component Guidelines

### 1. No Custom Primitives Without Justification
- Before creating a new primitive component, check if an existing one can be extended
- If a new primitive is needed, document the justification in the PR
- All new components must follow the existing component structure

### 2. Consistent Spacing
- Use Tailwind's spacing scale consistently
- Maintain consistent padding and margin across components
- Follow the 8-point grid system where possible

### 3. Typography Scale
- Use only the defined typography scale:
  - `text-xs` (12px) for captions and helper text
  - `text-sm` (14px) for secondary text
  - `text-base` (16px) for body text
  - `text-lg` (18px) for subheadings
  - `text-xl` (20px) for headings
  - `text-2xl` (24px) for section headings
  - `text-3xl` (30px) for main headings

## Component Structure

All components should follow this structure:

```tsx
interface ComponentNameProps {
  // Define all props with TypeScript
}

const ComponentName = ({ ... }: ComponentNameProps) => {
  // Component implementation
  return (
    // JSX with consistent styling
  );
};

export default ComponentName;
```

## Accessibility Standards

- All interactive elements must have proper ARIA attributes
- Ensure sufficient color contrast (minimum 4.5:1)
- Support keyboard navigation
- Include proper labeling for screen readers

## State Management

- Handle loading, error, and empty states consistently
- Use skeleton loaders for better perceived performance
- Provide clear feedback for user actions