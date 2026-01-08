export const CURRENCY = '₦';

export const TRANSACTION_FEE = 1000;

export const PRICING_TIERS = {
    PERSONAL: {
        FREE_EVENT_LIMIT: 1,
        UNLOCKS: {
            REMOVE_BRANDING: 9000,
            EXTRA_EVENT: 7500,
            PREMIUM_WEBSITE: 15000,
            PREMIUM_DESIGN: 7500,
        }
    },
    PROFESSIONAL: {
        FREE_EVENT_LIMIT: 2,
        SUBSCRIPTIONS: {
            UNLIMITED_EVENTS: 30000, // Monthly
            CLIENT_BRANDING: 9000,   // Monthly
            ADVANCED_ANALYTICS: 9000, // Monthly
            WHITE_LABEL: 15000,      // Monthly
            TEAM_SEAT: 15000,        // Per seat
        },
        BUNDLES: {
            PRO: 30000,
            AGENCY: 150000,
        }
    },
    VENDOR: {
        VISIBILITY: {
            FEATURED_7_DAYS: 15000,
            FEATURED_30_DAYS: 45000,
            CATEGORY_BOOST: 30000, // Monthly
            LOCATION_BOOST: 30000, // Monthly
        }
    }
};

export const DIGITAL_PRODUCTS = {
    TEMPLATES: {
        BUDGET: 6000,
        PROPOSAL: 9000,
        FULL_TOOLKIT: 30000,
    },
    DESIGN_SERVICES: {
        INVITATION: 30000,
        FULL_EVENT: 150000,
    },
    CARDS: {
        SINGLE: 3000,
        BUNDLE_5: 12000,
        EVENT_PACK: 30000,
    }
};

export const REGISTRY_FEES = {
    PREMIUM_CONTROLS: 7500,
    ACCELERATED_PAYOUTS: 6000,
    BRANDING: 9000,
    FULL_PACK: 15000
}

export type FeatureId =
    | 'create_event'
    | 'remove_branding'
    | 'add_team_member'
    | 'advanced_analytics'
    | 'premium_themes'
    | 'client_portal';

export const ENTITLEMENTS = {
    personal_planner: {
        maxEvents: PRICING_TIERS.PERSONAL.FREE_EVENT_LIMIT,
        canRemoveBranding: false, // Requires unlock
        canAddTeam: false,
        analyticsLevel: 'basic',
    },
    pro_planner: {
        maxEvents: PRICING_TIERS.PROFESSIONAL.FREE_EVENT_LIMIT,
        canRemoveBranding: false, // Requires subscription
        canAddTeam: true, // Paid per seat
        analyticsLevel: 'basic', // Advanced is paid
    },
    vendor: {
        maxEvents: 0, // Vendors don't plan events primarily in this context usually, or irrelevant
        canRemoveBranding: true,
    }
};
