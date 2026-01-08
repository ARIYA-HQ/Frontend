import { useState } from 'react';
import {
  UserCircleIcon,
  ShieldCheckIcon,
  BellIcon,
  CreditCardIcon,
  CameraIcon,
  ChevronRightIcon,
  BuildingStorefrontIcon,
  GlobeAltIcon,
  LinkIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  LanguageIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import InvoiceHistoryModal from '../../../components/vendors/InvoiceHistoryModal';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumCard from '../../../components/ui/PremiumCard';
import { FormField } from '../../../components/ui/FormField';
import { Button } from '../../../components/ui/Button';

const VendorProfile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isSaving, setIsSaving] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState('NGN');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [languages, setLanguages] = useState(['English', 'Yoruba', 'Igbo']);
  const [newLanguage, setNewLanguage] = useState('');
  const [showLangInput, setShowLangInput] = useState(false);

  const handleAddLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage('');
      setShowLangInput(false);
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter(l => l !== lang));
  };

  // Vendor Personal Data
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Anderson',
    email: 'john.anderson@eliteevents.com',
    phone: '+234 801 234 5678',
    bio: 'With over 8 years of experience in luxury event planning, I specialize in creating unforgettable experiences for weddings, corporate events, and social celebrations.',
    website: 'www.eliteevents.com',
    instagram: '@elite_events_john',
    linkedin: 'linkedin.com/in/johnanderson'
  });

  // Vendor Business Data
  const [businessData, setBusinessData] = useState({
    businessName: 'Elite Event Solutions',
    registrationNumber: 'RC123456789',
    businessType: 'Event Planning',
    // languages: ['English', 'Yoruba', 'French'] // This is now managed by the 'languages' state
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true
  });

  const [notifications, setNotifications] = useState({
    email: true,
    businessInquiries: true,
    marketing: false,
    paymentAlerts: true
  });

  const securityAudit = [
    { id: 1, event: 'Successful Login', location: 'Lagos, Nigeria', device: 'Chrome on macOS', time: '2 mins ago', status: 'success' },
    { id: 2, event: 'Password Changed', location: 'Lagos, Nigeria', device: 'Chrome on macOS', time: '2 days ago', status: 'success' },
    { id: 3, event: 'New Device Login', location: 'Abuja, Nigeria', device: 'Firefox on Windows', time: '5 days ago', status: 'warning' },
  ];

  const tabs = [
    { name: 'Profile', icon: UserCircleIcon },
    { name: 'Business', icon: BuildingStorefrontIcon },
    { name: 'Security', icon: ShieldCheckIcon },
    { name: 'Notifications', icon: BellIcon },
    { name: 'Billing', icon: CreditCardIcon },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, use toast here
    }, 1000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 h-full flex flex-col dark:bg-gray-900">
      <div className="mb-8">
        <PageHeader
          title="Settings"
          subtitle="Manage your business profile and preferences"
          breadcrumb="Dashboard > Vendor > Settings"
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

          {/* Pro Badge */}
          <div className="mt-8 p-8 bg-[#1D2939] dark:bg-gray-800 rounded-[32px] text-white overflow-hidden relative group shadow-2xl dark:shadow-none">
            <div className="relative z-10">
              <h4 className="text-sm font-black uppercase tracking-widest mb-2">Ariya Pro</h4>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium mb-4 leading-relaxed">Upgrade to unlock advanced analytics and premium profile badges.</p>
              <button className="text-[10px] font-black uppercase border-b border-[#D0771E] pb-1 hover:text-[#D0771E] transition-colors">Learn More</button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === 'Profile' && (
            <PremiumCard className="animate-fade-in p-0 overflow-hidden dark:bg-gray-900 border-none dark:shadow-none">
              <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30">
                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Public Profile</h2>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Manage your personal information</p>
              </div>

              <div className="p-10 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-10 mb-12">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[40px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-2xl dark:shadow-none overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
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
                      Professional headshots recommended.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSave} className="space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FormField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={(val) => setProfileData(prev => ({ ...prev, email: val }))}
                      placeholder="your@email.com"
                    />
                    <FormField
                      label="Phone Number"
                      name="phone"
                      value={profileData.phone}
                      onChange={(val) => setProfileData(prev => ({ ...prev, phone: val }))}
                      placeholder="+234..."
                    />
                  </div>

                  <FormField
                    label="Professional Bio"
                    name="bio"
                    type="textarea"
                    value={profileData.bio}
                    onChange={(val) => setProfileData(prev => ({ ...prev, bio: val }))}
                    placeholder="Describe your expertise and services..."
                    rows={4}
                  />

                  <div className="pt-6 flex justify-end">
                    <Button
                      type="submit"
                      isLoading={isSaving}
                      className="px-12 py-5 shadow-2xl shadow-orange-200 dark:shadow-none"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </PremiumCard>
          )}

          {activeTab === 'Business' && (
            <PremiumCard className="animate-fade-in p-0 overflow-hidden dark:bg-gray-900 border-none dark:shadow-none">
              <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30">
                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Business Details</h2>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Manage your company information and presence</p>
              </div>

              <div className="p-10 bg-white dark:bg-gray-900">
                <form onSubmit={handleSave} className="space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FormField
                      label="Business Name"
                      name="businessName"
                      value={businessData.businessName}
                      onChange={(val) => setBusinessData(prev => ({ ...prev, businessName: val }))}
                      placeholder="e.g. Elite Events"
                    />
                    <FormField
                      label="Registration Number (RC)"
                      name="registrationNumber"
                      value={businessData.registrationNumber}
                      onChange={(val) => setBusinessData(prev => ({ ...prev, registrationNumber: val }))}
                      placeholder="RC..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Languages Spoken</label>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {languages.map((lang) => (
                        <span key={lang} className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-[#D0771E] dark:text-orange-400 text-[10px] font-black border border-orange-100 dark:border-orange-900/50 rounded-xl flex items-center gap-2">
                          <LanguageIcon className="w-3 h-3" />
                          {lang}
                          <button onClick={() => removeLanguage(lang)} className="hover:text-orange-700 dark:hover:text-orange-300 ml-1">
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      {showLangInput ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            autoFocus
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
                            className="px-4 py-2 bg-white dark:bg-gray-800 border border-orange-100 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-500 text-[#1D2939] dark:text-white"
                            placeholder="Type language..."
                          />
                          <button onClick={handleAddLanguage} className="p-2 bg-orange-50 dark:bg-orange-900/20 text-[#D0771E] rounded-xl">
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowLangInput(true)}
                          className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-[10px] font-black rounded-xl border border-dashed border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          + Add Language
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="pt-10 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-widest mb-8">Social Links</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
                      className="px-12 py-5 shadow-2xl shadow-orange-200 dark:shadow-none"
                    >
                      Update Business Info
                    </Button>
                  </div>
                </form>
              </div>
            </PremiumCard>
          )}

          {activeTab === 'Security' && (
            <PremiumCard className="animate-fade-in p-0 overflow-hidden dark:bg-gray-900 border-none dark:shadow-none">
              <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30">
                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Security & Privacy</h2>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Manage your password and account security</p>
              </div>

              <div className="p-10 bg-white dark:bg-gray-900">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                  <div className="pt-10 border-t border-gray-100 dark:border-gray-800 pb-10">
                    <h3 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-widest mb-8">Account Security</h3>
                    <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 group hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl dark:hover:shadow-none hover:shadow-gray-100 dark:hover:shadow-none transition-all">
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
                        type="button"
                        onClick={() => setSecurityData(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-[3px] border-transparent transition-colors duration-200 ease-in-out ${securityData.twoFactorEnabled ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                      >
                        <span className={`${securityData.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-200 shadow-md dark:shadow-none ring-0 transition duration-200 ease-in-out`} />
                      </button>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-gray-100 dark:border-gray-800 pb-10">
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

                  <div className="pt-6 flex justify-end">
                    <Button type="submit" className="px-12 py-5 shadow-2xl shadow-orange-200 dark:shadow-none">
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            </PremiumCard>
          )}

          {activeTab === 'Notifications' && (
            <PremiumCard className="animate-fade-in p-0 overflow-hidden dark:bg-gray-900 border-none dark:shadow-none">
              <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30">
                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Notifications</h2>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Control how you receive alerts and updates</p>
              </div>

              <div className="p-10 bg-white dark:bg-gray-900">
                <div className="space-y-6">
                  {[
                    { id: 'email', title: 'Email Notifications', desc: 'Receive daily digests and important updates via email.' },
                    { id: 'businessInquiries', title: 'Business Inquiries', desc: 'Get real-time alerts for new job requests and messages.' },
                    { id: 'paymentAlerts', title: 'Payment Alerts', desc: 'Receive notifications when milestone payments are released.' },
                    { id: 'marketing', title: 'Marketing Emails', desc: 'Receive news about features and platform updates.' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl shadow-gray-100 dark:shadow-none rounded-[32px] border border-gray-100 dark:border-gray-700 transition-all group">
                      <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-[20px] transition-colors ${notifications[item.id as keyof typeof notifications] ? 'bg-[#1D2939] dark:bg-gray-700 text-white shadow-lg shadow-gray-200 dark:shadow-none' : 'bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                          <BellIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-1 group-hover:text-[#D0771E] transition-colors">{item.title}</h4>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof notifications] }))}
                        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-[3px] border-transparent transition-colors duration-200 ease-in-out ${notifications[item.id as keyof typeof notifications] ? 'bg-orange-500 shadow-lg shadow-orange-100 dark:shadow-none' : 'bg-gray-200 dark:bg-gray-700'}`}
                      >
                        <span className={`${notifications[item.id as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow-md dark:shadow-none ring-0 transition duration-200 ease-in-out`} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                  <Button onClick={handleSave} className="px-12 py-5 shadow-2xl shadow-orange-200 dark:shadow-none">Save Preferences</Button>
                </div>
              </div>
            </PremiumCard>
          )}

          {activeTab === 'Billing' && (
            <PremiumCard className="animate-fade-in p-0 overflow-hidden dark:bg-gray-900 border-none dark:shadow-none">
              <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30">
                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">Billing & Subscription</h2>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Manage your vendor plan and payments</p>
              </div>

              <div className="p-10 bg-white dark:bg-gray-900">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="p-10 bg-gray-50 dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center relative overflow-hidden group">
                    <div className="w-20 h-20 bg-white dark:bg-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none rounded-[28px] flex items-center justify-center mb-8 relative z-10">
                      <CreditCardIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-2">Basic Vendor</h3>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-8">Standard listing visibility</p>
                    <div className="text-4xl font-black text-[#1D2939] dark:text-white mb-10">$0<span className="text-sm text-gray-400 dark:text-gray-500 font-bold uppercase ml-2 tracking-widest">/mo</span></div>

                    <ul className="space-y-4 text-left w-full mb-10">
                      {[
                        'Create up to 3 Service Listings',
                        'Basic Analytics Dashboard',
                        'Standard Profile Badge',
                        '5% Transaction Fee'
                      ].map((benefit) => (
                        <li key={benefit} className="flex items-center gap-3 text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full py-5 h-auto bg-white dark:bg-gray-900 opacity-50 cursor-not-allowed">Current Plan</Button>
                  </div>

                  <div className="p-10 bg-[#1D2939] dark:bg-gray-800 rounded-[40px] border-4 border-[#D0771E] flex flex-col items-center text-center relative overflow-hidden group shadow-2xl shadow-orange-100 dark:shadow-none">
                    <div className="absolute top-6 right-6 px-4 py-1.5 bg-[#D0771E] text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg dark:shadow-none">Recommended</div>

                    <div className="w-20 h-20 bg-white/10 dark:bg-gray-700/50 rounded-[28px] flex items-center justify-center mb-8 relative z-10 text-[#D0771E]">
                      <SparklesIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Ariya Pro</h3>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-8">Boosted visibility & lower fees</p>
                    <div className="text-4xl font-black text-white mb-10">$49<span className="text-sm text-gray-400 dark:text-gray-500 font-bold uppercase ml-2 tracking-widest">/mo</span></div>

                    <ul className="space-y-4 text-left w-full mb-10">
                      {[
                        'Unlimited Service Listings',
                        'Featured in Search Results',
                        'Advanced Market Analytics',
                        'Reduced 2.5% Transaction Fee',
                        'Verified Pro Badge'
                      ].map((benefit) => (
                        <li key={benefit} className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest">
                          <CheckCircleIcon className="w-4 h-4 text-[#D0771E] shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full py-5 h-auto bg-[#D0771E] hover:bg-white hover:text-[#D0771E] transition-all border-none shadow-xl shadow-orange-950/20 dark:shadow-none">Upgrade Now</Button>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 dark:text-gray-500">
                      <CreditCardIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Last Billing Date</div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">--</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setIsInvoiceModalOpen(true)}
                    className="text-[10px] font-black uppercase tracking-widest"
                  >
                    View Invoice History →
                  </Button>
                </div>
              </div>
            </PremiumCard>
          )}
        </div>
      </div>

      <InvoiceHistoryModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
      />
    </div>
  );
};

export default VendorProfile;