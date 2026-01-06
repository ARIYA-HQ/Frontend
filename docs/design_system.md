# Ariya 2.0: Design System & Styling Guide

This document outlines the visual identity and implementation standards for the Ariya platform. Use this as a reference when building new pages or the public-facing website.

---

## 1. Design Philosophy: "Modern Premium"
Ariya 2.0 is designed to feel high-end, trustworthy, and sophisticated.
- **Shadow-free Dark Mode**: We prioritize borders (`border-gray-700`) and subtle background differences over heavy drop shadows in dark mode.
- **High Information Density**: Using small-scale, all-caps, and wide-tracked text (`tracking-widest`) for labels and metadata.
- **Generous Whitespace**: Large padding (typically `p-8` or `p-10`) for core cards.
- **Micro-interactivity**: Every interaction should have a feedback state (e.g., hover-to-play videos, smooth scroll reveals, pulse animations for AI elements).

---

## 2. Core Color Palette

### Primary (Gold/Ariya)
The hero color used for primary actions, success indicators, and branding.
- **Primary 600**: `#D0771E` (Main Brand Color)
- **Primary 100**: `#fbeee6` (Light Backgrounds)

### Neutral Backgrounds (Beige)
Used for the luxurious "Paper" feel in light mode.
- **Beige 100**: `#f3f0eb` (Main Page Background)
- **Beige 50**: `#fbfaf8` (Card Backgrounds)

### Dark Palette (Navy/Gray)
Used for professional context and dark mode.
- **Gray 900**: `#111827` (Dark Mode Body)
- **Gray 800**: `#1f2937` (Dark Mode Cards)
- **Primary Navy**: `#1D2939` (Deep contrast used in Stats and Headers)

---

## 3. Typography
We use **Inter** as the primary typeface for its clarity and versatility.

| Usage | CSS Classes | Characteristics |
|-------|-------------|-----------------|
| **Page Titles** | `text-4xl font-black tracking-tighter` | Bold, condensed spacing |
| **Section Labels**| `text-[10px] font-black uppercase tracking-[0.2em]` | Tiny, heavy, wide tracking |
| **Body Copy** | `text-sm font-medium text-gray-500` | Readable, subtle contrast |
| **Financial/Data**| `font-mono` | Used for dates and numbers |

---

## 4. Layout & Patterns

### Premium Cards (`PremiumCard`)
- **Structure**: Rounded corners (`rounded-[40px]`), subtle border, no shadow in dark mode.
- **Backgrounds**: `bg-white` (Light) / `bg-gray-800` (Dark).
- **Interactive**: Hover effects often include `hover:scale-[1.01]` or subtle bg-color shifts.

### Navigation (`PremiumTabs`)
- **Style**: Pill-based or underline-based.
- **Active State**: Primary color text, background with high contrast or absolute bottom indicator.

### Headers (`PageHeader`)
- **Breadcrumbs**: Small uppercase text above the title.
- **Actions Bar**: Primary actions on the right, typically using `h-14` buttons for a "thick" premium feel.

---

## 5. Animation Classes
Pre-configured in `index.css`:
- `.animate-in .fade-in`: General entrance.
- `.slide-in-from-bottom-4`: Subtle upward motion on load.
- `.animate-pulse`: Used sparingly for "Live" or "AI" indicators (e.g., Ariya Intel).

---

## 6. Iconography
We exclusively use **@heroicons/react** (v24/outline) for a clean, consistent line aesthetic.
- Standard Size: `w-5 h-5` or `w-6 h-6`.
- Decorative Icons (Backgrounds): Used at `opacity-10` and larger sizes (`w-24 h-24`).

---

## 8. Core Component Library

The project relies on a set of high-fidelity UI components found in `src/components/ui`:

| Component | Purpose |
|-----------|---------|
| `PremiumCard` | The foundation for all dashboard widgets and content areas. |
| `PremiumTabs` | Dynamic navigation for sub-views (e.g., Overview, Transactions). |
| `PremiumInput` | Custom styled inputs with floating labels or premium border effects. |
| `PageHeader` | Standardizes page titles, breadcrumbs, and action button placement. |
| `Button` | Multi-variant button (`outline`, `solid`, `ghost`) with specific sizing. |
| `SoftAnalytics` | Pre-styled stats cards for usage throughout the app. |

---

## 9. Developer Utilities
- **Theme Context**: Check `UIContext.tsx` or `theme.ts` for global state management related to light/dark modes.
- **Responsiveness**: Use `hidden md:block` utilities to manage layout density on smaller screens.
- **Animations**: Use `animate-in` and `slide-in-from-bottom-*` classes from `tailwindcss-animate` for polished entry effects.
