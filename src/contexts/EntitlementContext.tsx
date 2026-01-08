import { createContext, useContext, useState, ReactNode } from 'react';
import { ENTITLEMENTS, FeatureId } from '../data/pricing';

// Mock User Type - In a real app this comes from AuthContext
type UserRole = 'personal_planner' | 'pro_planner' | 'vendor';

interface UserUsage {
    activeEvents: number;
    teamMembers: number;
    hasProBundle: boolean;
    unlockedFeatures: string[]; // List of IDs like 'event_2_branding'
}

interface EntitlementContextType {
    role: UserRole;
    usage: UserUsage;
    checkEntitlement: (feature: FeatureId) => { allowed: boolean; reason?: 'limit_reached' | 'locked' | 'upgrade_required' };
    incrementUsage: (metric: keyof UserUsage) => void; // Simulation helper
    unlockFeature: (featureId: string) => void; // Simulation helper
}

const EntitlementContext = createContext<EntitlementContextType | undefined>(undefined);

export const useEntitlement = () => {
    const context = useContext(EntitlementContext);
    if (!context) {
        throw new Error('useEntitlement must be used within an EntitlementProvider');
    }
    return context;
};

export const EntitlementProvider = ({ children }: { children: ReactNode }) => {
    // Mock State - Defaulting to "Pro Planner" for demo purposes
    const [role, setRole] = useState<UserRole>('pro_planner');
    const [usage, setUsage] = useState<UserUsage>({
        activeEvents: 2, // At the limit for Free Pro
        teamMembers: 1,
        hasProBundle: false,
        unlockedFeatures: [],
    });

    const checkEntitlement = (feature: FeatureId) => {
        const rules = ENTITLEMENTS[role];

        switch (feature) {
            case 'create_event':
                if (role === 'vendor') return { allowed: false, reason: 'locked' as const };
                if (!usage.hasProBundle && usage.activeEvents >= rules.maxEvents) {
                    return { allowed: false, reason: 'limit_reached' as const };
                }
                return { allowed: true };

            case 'remove_branding':
                if (usage.unlockedFeatures.includes('branding_global')) return { allowed: true };
                // For per-event, check would be more specific, simplifying for global/demo
                return { allowed: false, reason: 'upgrade_required' as const };

            case 'advanced_analytics':
                if (usage.hasProBundle) return { allowed: true };
                return { allowed: false, reason: 'upgrade_required' as const };

            default:
                return { allowed: true };
        }
    };

    const incrementUsage = (metric: keyof UserUsage) => {
        setUsage(prev => ({
            ...prev,
            [metric]: typeof prev[metric] === 'number' ? prev[metric] + 1 : prev[metric]
        }));
    };

    const unlockFeature = (featureId: string) => {
        setUsage(prev => ({
            ...prev,
            unlockedFeatures: [...prev.unlockedFeatures, featureId]
        }));
    };

    return (
        <EntitlementContext.Provider value={{ role, usage, checkEntitlement, incrementUsage, unlockFeature }}>
            {children}
        </EntitlementContext.Provider>
    );
};
