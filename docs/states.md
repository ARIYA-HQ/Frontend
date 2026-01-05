# UX States Documentation

This document outlines the various states for each module in the AriyaHQ application to ensure consistent user experience.

## Dashboard Module

### Empty State
- Display welcome message: "Welcome to Ariya! Get started by creating your first event"
- Show call-to-action button: "Create Your First Event"
- Include brief onboarding tips or video

### Loading State
- Show skeleton cards with shimmer effect
- Display progress indicators for each stat card
- Maintain card layout but with loading animation

### Partial State
- Show available data with clear indicators of what's missing
- Example: "You have 2 events but no AI recommendations yet"
- Suggest next actions based on available data

### Error State
- Display error message: "Unable to load dashboard data"
- Provide retry button
- Show alternative content if possible

## Events Module

### Empty State
- Message: "No events yet. Create your first event to get started."
- Primary CTA: "Create Event"
- Secondary CTA: "Import Event" or "Use Template"

### Loading State
- Skeleton cards for event list
- Progress indicator for each event card
- Preserve layout structure during loading

### Partial State
- Show events that loaded successfully
- Clear indicators for failed events
- Option to retry loading failed events

### Error State
- Message: "Unable to load events"
- Retry button
- Option to create a new event

## Vendors Module

### Empty State
- Message: "No vendors added yet"
- Primary CTA: "Add Vendor"
- Secondary options: "Browse Marketplace", "Invite Vendor"

### Loading State
- Skeleton cards for vendor list
- Loading animation for vendor details
- Preserve grid/list layout

### Partial State
- Show available vendors with clear status indicators
- Highlight vendors that need attention
- Show missing vendor information

### Error State
- Message: "Unable to load vendors"
- Retry button
- Option to add vendor manually

## AI Planner Module

### Empty State
- Message: "No AI recommendations yet"
- Explain how AI planner works
- Suggest actions to generate recommendations

### Loading State
- Show "Thinking..." or "Analyzing..." indicator
- Progress bar for AI processing
- Maintain layout with loading states

### Partial State
- Show available recommendations with confidence indicators
- Clear indication of pending recommendations
- Option to request more recommendations

### Error State
- Message: "AI service temporarily unavailable"
- Explanation of what happened
- Option to try again or use manual planning