import { ShieldCheckIcon, UserCircleIcon, IdentificationIcon } from '@heroicons/react/24/outline';

export const TEAM_MEMBERS = [
    {
        id: 1,
        name: 'Olivia Rhye',
        role: 'Admin',
        email: 'olivia@ariyahq.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'Active',
        permissions: ['Full Access', 'Billing', 'Team Management'],
        lastActive: '2 mins ago'
    },
    {
        id: 2,
        name: 'Phoenix Baker',
        role: 'Senior Planner',
        email: 'phoenix@ariyahq.com',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'Active',
        permissions: ['Event Creation', 'Vendor Management', 'Guest Lists'],
        lastActive: '1 hour ago'
    },
    {
        id: 3,
        name: 'Lana Steiner',
        role: 'Coordinator',
        email: 'lana@ariyahq.com',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'Pending',
        permissions: ['Guest Lists', 'Task Management'],
        lastActive: 'Invitation Sent'
    },
    {
        id: 4,
        name: 'Demi Wilkinson',
        role: 'Financial Lead',
        email: 'demi@ariyahq.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'Active',
        permissions: ['Budgeting', 'Invoice Management'],
        lastActive: '3 hours ago'
    }
];

export const TEAM_ROLES = [
    { name: 'Admin', description: 'Full access to all features, billing, and team management.', icon: ShieldCheckIcon },
    { name: 'Senior Planner', description: 'Manage events, vendors, and core planning tools.', icon: UserCircleIcon },
    { name: 'Coordinator', description: 'Access to guest lists and task tracking only.', icon: IdentificationIcon },
    { name: 'Financial Lead', description: 'Solely manages budgets and vendor payments.', icon: IdentificationIcon }
];
