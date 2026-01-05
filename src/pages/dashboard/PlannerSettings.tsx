import React, { useState } from 'react';
import {
    UserCircleIcon,
    ShieldCheckIcon,
    BellIcon,
    CreditCardIcon,
    CameraIcon,
    ChevronRightIcon,
    GlobeAltIcon,
    LinkIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    ExclamationCircleIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';
import { FormField } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';

const PlannerSettings = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const [isSaving, setIsSaving] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: 'Olivia',
        lastName: 'Rhye',
        email: 'olivia@ariyahq.com',
        bio: 'Passionate event planner with over 8 years of experience creating unforgettable weddings and corporate galas.',
        website: 'www.ariyahq.com',
        instagram: '@olivia_events',
        linkedin: 'linkedin.com/in/oliviarhye'
    });
    const [securityData, setSecurityData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: true
    });
    const [notifications, setNotifications] = useState({
        email: true,
        browser: true,
        marketing: false,
        push: true
    });

    const securityAudit = [
        { id: 1, event: 'Successful Login', location: 'Lagos, Nigeria', device: 'Chrome on macOS', time: '2 mins ago', status: 'success' },
        { id: 2, event: 'Password Changed', location: 'Lagos, Nigeria', device: 'Chrome on macOS', time: '2 days ago', status: 'success' },
        { id: 3, event: 'Failed Login Attempt', location: 'London, UK', device: 'Safari on iPhone', time: '1 week ago', status: 'warning' },
    ];

    const tabs = [
        { name: 'Profile', icon: UserCircleIcon },
        { name: 'Security', icon: ShieldCheckIcon },
        { name: 'Notifications', icon: BellIcon },
        { name: 'Billing', icon: CreditCardIcon },
    ];

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Settings saved successfully!');
        }, 1000);
    };

    return (
        <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col dark:bg-gray-900">
            <div className="mb-8">
                <PageHeader
                    title="Settings"
                    subtitle="Manage your account preferences and security"
                    breadcrumb="Dashboard > Settings"
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-10 flex-1 min-h-0">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-80 shrink-0">
                    <nav className="flex flex-col gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`group w-full flex items-center justify-between gap-3 px-6 py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === tab.name
                                    ? 'bg-[#1D2939] dark:bg-gray-700 text-white shadow-xl dark:shadow-none shadow-gray-200 translate-x-1'
                                    : 'text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-800 hover:text-[#1D2939] dark:hover:text-white hover:shadow-lg dark:hover:shadow-none hover:shadow-gray-100'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl transition-colors ${activeTab === tab.name ? 'bg-white/10' : 'bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700'}`}>
                                        <tab.icon className="w-5 h-5 text-current" />
                                    </div>
                                    <span>{tab.name}</span>
                                </div>
                                {activeTab === tab.name && <ChevronRightIcon className="w-4 h-4 text-white" />}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {activeTab === 'Profile' && (
                        <PremiumCard className="animate-fade-in p-0 overflow-hidden dark:shadow-none">
                            <div className="p-8 border-b border-gray-50 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
                                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Public Profile</h2>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Manage how your account appears to vendors and partners</p>
                            </div>

                            <div className="p-10">
                                <div className="flex items-center gap-10 mb-12">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-[40px] bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-2xl dark:shadow-none overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                            <img
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <CameraIcon className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 p-3 bg-[#D0771E] text-white rounded-2xl shadow-xl dark:shadow-none hover:scale-110 active:scale-95 transition-all">
                                            <CameraIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Profile Photo</h3>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest leading-loose">
                                            PNG, JPG or GIF. Max 5MB.<br />
                                            We recommend a 400x400px image.
                                        </p>
                                        <div className="flex gap-3 pt-2">
                                            <Button variant="outline" size="sm" className="bg-white dark:bg-gray-800">Remove</Button>
                                            <Button variant="secondary" size="sm">Change</Button>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleSave} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormField
                                            label="First Name"
                                            name="firstName"
                                            value={profileData.firstName}
                                            onChange={(val) => setProfileData(prev => ({ ...prev, firstName: val }))}
                                            placeholder="Enter your first name"
                                        />
                                        <FormField
                                            label="Last Name"
                                            name="lastName"
                                            value={profileData.lastName}
                                            onChange={(val) => setProfileData(prev => ({ ...prev, lastName: val }))}
                                            placeholder="Enter your last name"
                                        />
                                    </div>

                                    <FormField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(val) => setProfileData(prev => ({ ...prev, email: val }))}
                                        placeholder="your@email.com"
                                    />

                                    <FormField
                                        label="Bio"
                                        name="bio"
                                        type="textarea"
                                        value={profileData.bio}
                                        onChange={(val) => setProfileData(prev => ({ ...prev, bio: val }))}
                                        placeholder="Brief description of yourself"
                                        rows={4}
                                    />

                                    <div className="pt-10 border-t border-gray-100 dark:border-gray-700">
                                        <h3 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-widest mb-8">Social Links</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <FormField
                                                label="Website"
                                                name="website"
                                                value={profileData.website}
                                                onChange={(val) => setProfileData(prev => ({ ...prev, website: val }))}
                                                placeholder="www.example.com"
                                                className="pl-12"
                                            >
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                                    <GlobeAltIcon className="w-5 h-5" />
                                                </div>
                                            </FormField>
                                            <FormField
                                                label="Instagram"
                                                name="instagram"
                                                value={profileData.instagram}
                                                onChange={(val) => setProfileData(prev => ({ ...prev, instagram: val }))}
                                                placeholder="@username"
                                                className="pl-12"
                                            >
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                                    <LinkIcon className="w-5 h-5" />
                                                </div>
                                            </FormField>
                                            <FormField
                                                label="LinkedIn"
                                                name="linkedin"
                                                value={profileData.linkedin}
                                                onChange={(val) => setProfileData(prev => ({ ...prev, linkedin: val }))}
                                                placeholder="linkedin.com/in/username"
                                                className="pl-12"
                                            >
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                                    <LinkIcon className="w-5 h-5" />
                                                </div>
                                            </FormField>
                                        </div>
                                    </div>

                                    <div className="pt-6 flex justify-end">
                                        <Button
                                            type="submit"
                                            isLoading={isSaving}
                                            className="px-12 py-5 shadow-2xl dark:shadow-none shadow-orange-200"
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </PremiumCard>
                    )}

                    {activeTab === 'Security' && (
                        <PremiumCard className="animate-fade-in p-0 overflow-hidden dark:shadow-none">
                            <div className="p-8 border-b border-gray-50 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
                                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Security & Privacy</h2>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Manage your password and account security</p>
                            </div>

                            <div className="p-10">
                                <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
                                    <div className="space-y-8">
                                        <FormField
                                            label="Current Password"
                                            name="currentPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={securityData.currentPassword}
                                            onChange={(val) => setSecurityData(prev => ({ ...prev, currentPassword: val }))}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <FormField
                                                label="New Password"
                                                name="newPassword"
                                                type="password"
                                                placeholder="••••••••"
                                                value={securityData.newPassword}
                                                onChange={(val) => setSecurityData(prev => ({ ...prev, newPassword: val }))}
                                            />
                                            <FormField
                                                label="Confirm New Password"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="••••••••"
                                                value={securityData.confirmPassword}
                                                onChange={(val) => setSecurityData(prev => ({ ...prev, confirmPassword: val }))}
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-10 border-t border-gray-100 dark:border-gray-700 pb-10">
                                        <h3 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-widest mb-8">Account Security</h3>
                                        <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 group hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl dark:hover:shadow-none hover:shadow-gray-100 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white dark:bg-gray-700 rounded-2xl shadow-sm dark:shadow-none group-hover:bg-[#1D2939] dark:group-hover:bg-gray-600 group-hover:text-white transition-colors">
                                                    <ShieldCheckIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-1">Two-Factor Authentication</h4>
                                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">Add an extra layer of security to your account.</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSecurityData(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                                                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-[3px] border-transparent transition-colors duration-200 ease-in-out ${securityData.twoFactorEnabled ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                                            >
                                                <span className={`${securityData.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-200 shadow-md dark:shadow-none ring-0 transition duration-200 ease-in-out`} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-gray-100 dark:border-gray-700 pb-10">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Recent Security Activity</h3>
                                            <button className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors">See all activity →</button>
                                        </div>
                                        <div className="space-y-4">
                                            {securityAudit.map((log) => (
                                                <div key={log.id} className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-[24px] border border-gray-50 dark:border-gray-700 hover:border-gray-100 dark:hover:border-gray-600 hover:shadow-sm dark:hover:shadow-none transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-2 rounded-xl ${log.status === 'success' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                                                            {log.status === 'success' ? <ArrowPathIcon className="w-4 h-4" /> : <ExclamationCircleIcon className="w-4 h-4" />}
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">{log.event}</div>
                                                            <div className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-0.5">{log.device} • {log.location}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-[9px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest italic">{log.time}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center justify-between p-8 bg-red-50/50 dark:bg-red-900/20 rounded-[32px] border border-red-100/30 dark:border-red-900/30">
                                            <div>
                                                <h4 className="text-xs font-black text-red-900 dark:text-red-300 uppercase tracking-widest mb-1">Deactivate Account</h4>
                                                <p className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase tracking-widest opacity-80 max-w-sm">Once you deactivate your account, there is no going back. All your data will be permanently removed.</p>
                                            </div>
                                            <Button variant="destructive" size="sm" className="px-8 py-3 h-auto">Deactivate</Button>
                                        </div>
                                    </div>
                                    <div className="pt-6 flex justify-end">
                                        <Button type="submit" className="px-12 py-5 shadow-2xl dark:shadow-none shadow-orange-200">
                                            Update Password
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </PremiumCard>
                    )}

                    {activeTab === 'Notifications' && (
                        <PremiumCard className="animate-fade-in p-0 overflow-hidden dark:shadow-none">
                            <div className="p-8 border-b border-gray-50 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
                                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Notifications</h2>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Control how you receive alerts and updates</p>
                            </div>

                            <div className="p-10">
                                <div className="space-y-6">
                                    {[
                                        { id: 'email', title: 'Email Notifications', desc: 'Receive daily digests and important updates via email.' },
                                        { id: 'browser', title: 'Browser Notifications', desc: 'Get real-time alerts for new messages and tasks.' },
                                        { id: 'marketing', title: 'Marketing Emails', desc: 'Receive news about features and platform updates.' },
                                        { id: 'push', title: 'Push Notifications', desc: 'Direct alerts to your mobile device for high-priority events.' },
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl dark:hover:shadow-none hover:shadow-gray-100 rounded-[32px] border border-gray-100 dark:border-gray-700 transition-all group">
                                            <div className="flex items-center gap-5">
                                                <div className={`p-4 rounded-[20px] transition-colors ${notifications[item.id as keyof typeof notifications] ? 'bg-[#1D2939] dark:bg-gray-700 text-white shadow-lg dark:shadow-none shadow-gray-200' : 'bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                                                    <BellIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-1 group-hover:text-[#D0771E] transition-colors">{item.title}</h4>
                                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">{item.desc}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof notifications] }))}
                                                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-[3px] border-transparent transition-colors duration-200 ease-in-out ${notifications[item.id as keyof typeof notifications] ? 'bg-orange-500 shadow-lg dark:shadow-none shadow-orange-100' : 'bg-gray-200 dark:bg-gray-700'}`}
                                            >
                                                <span className={`${notifications[item.id as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                                    <Button onClick={handleSave} className="px-12 py-5 shadow-2xl dark:shadow-none shadow-orange-200">Save Preferences</Button>
                                </div>
                            </div>
                        </PremiumCard>
                    )}

                    {activeTab === 'Billing' && (
                        <PremiumCard className="animate-fade-in p-0 overflow-hidden dark:shadow-none">
                            <div className="p-8 border-b border-gray-50 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
                                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Billing & Subscription</h2>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Manage your plan and payment methods</p>
                            </div>

                            <div className="p-10">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                                    <div className="p-10 bg-gray-50 dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:scale-110 transition-transform duration-700">
                                            <CreditCardIcon className="w-32 h-32" />
                                        </div>
                                        <div className="w-20 h-20 bg-white dark:bg-gray-700 shadow-xl dark:shadow-none shadow-gray-200/50 rounded-[28px] flex items-center justify-center mb-8 relative z-10">
                                            <CreditCardIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-2">Free Plan</h3>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-8">Basic individual features</p>
                                        <div className="text-4xl font-black text-[#1D2939] dark:text-white mb-10">$0<span className="text-sm text-gray-400 dark:text-gray-500 font-bold uppercase ml-2 tracking-widest">/mo</span></div>

                                        <ul className="space-y-4 text-left w-full mb-10">
                                            {[
                                                'Up to 3 active events',
                                                'Basic guest lists',
                                                'Standard email support',
                                                'Manual budget tracking'
                                            ].map((benefit) => (
                                                <li key={benefit} className="flex items-center gap-3 text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                                    <CheckCircleIcon className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0" />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button variant="outline" className="w-full py-5 h-auto bg-white dark:bg-gray-800 opacity-50 cursor-not-allowed">Current Plan</Button>
                                    </div>

                                    <div className="p-10 bg-[#1D2939] dark:bg-gray-800 rounded-[40px] border-4 border-[#D0771E] flex flex-col items-center text-center relative overflow-hidden group shadow-2xl dark:shadow-none shadow-orange-100">
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D0771E]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                                        <div className="absolute top-6 right-6 px-4 py-1.5 bg-[#D0771E] text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg dark:shadow-none">Most Popular</div>

                                        <div className="w-20 h-20 bg-white/10 dark:bg-gray-700/50 rounded-[28px] flex items-center justify-center mb-8 relative z-10 text-[#D0771E]">
                                            <SparklesIcon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Pro Planner</h3>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-8">Full professional suite</p>
                                        <div className="text-4xl font-black text-white mb-10">$29<span className="text-sm text-gray-400 dark:text-gray-500 font-bold uppercase ml-2 tracking-widest">/mo</span></div>

                                        <ul className="space-y-4 text-left w-full mb-10">
                                            {[
                                                'Unlimited events & guests',
                                                'AI event concept generator',
                                                'Premium stationery templates',
                                                'Advanced financial analytics',
                                                'Priority 24/7 concierge'
                                            ].map((benefit) => (
                                                <li key={benefit} className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest">
                                                    <CheckCircleIcon className="w-4 h-4 text-[#D0771E] shrink-0" />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="w-full py-5 h-auto bg-[#D0771E] hover:bg-white hover:text-[#D0771E] transition-all border-none shadow-xl dark:shadow-none shadow-orange-950/20">Upgrade Now</Button>
                                    </div>
                                </div>
                                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 dark:text-gray-500">
                                            <CreditCardIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Last Billing Date</div>
                                            <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">January 12, 2026</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest">View Invoice History →</Button>
                                </div>
                            </div>
                        </PremiumCard>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlannerSettings;
