import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  GlobeAltIcon,
  EyeIcon,
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PhotoIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  GiftIcon,
  HeartIcon,
  StarIcon,
  BriefcaseIcon,
  CakeIcon,
  LockClosedIcon,
  ChevronDownIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
  LinkIcon,
  XMarkIcon,
  RocketLaunchIcon,
  PlusIcon,
  SparklesIcon,
  ShieldCheckIcon,
  SwatchIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';
import { FormField } from '../../components/ui/FormField'; /* Using existing FormField if compatible or manual input */
import { Button } from '../../components/ui/Button';

type EventType = 'wedding' | 'corporate' | 'birthday' | 'baby_shower' | 'gala' | 'graduation';

interface Template {
  id: string;
  type: EventType;
  name: string;
  image: string;
  description: string;
  isPremium: boolean;
}

interface Website {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  status: 'live' | 'draft';
  url: string;
  updatedAt: string;
  image: string;
}

const EventWebsite = () => {
  const [currentView, setCurrentView] = useState<'management' | 'builder'>('management');
  const [managementTab, setManagementTab] = useState<'my-websites' | 'portraits' | 'favourites' | 'settings'>('my-websites');
  const [activeTab, setActiveTab] = useState<'templates' | 'content' | 'style' | 'settings'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState('wedding-0');
  const [eventType, setEventType] = useState<EventType>('wedding');
  const [expandedSection, setExpandedSection] = useState<string | null>('header');

  // UI Flows
  const [isLivePreview, setIsLivePreview] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'optimizing' | 'deploying' | 'success'>('idle');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Visibility State
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    infoBar: true,
    welcome: true,
    story: true,
    footer: true,
    rsvp: true,
    registry: true
  });

  // Website Content State
  const [content, setContent] = useState({
    title: 'Sarah & Michael',
    subtitle: 'Are getting married!',
    date: 'June 15, 2024',
    location: 'Grand Ballroom, Downtown Hotel',
    welcomeMessage: 'Join us for a celebration of love and joy. We can\'t wait to share this special day with you.',
    aboutSectionTitle: 'Our Story',
    aboutSectionBody: 'We met at a coffee shop in 2018...',
    actionButtonText: 'RSVP Now'
  });

  // Style Config State
  const [style, setStyle] = useState({
    primaryColor: '#D0771E',
    secondaryColor: '#FFF8F1',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    layoutMode: 'centered' as 'centered' | 'split' | 'minimal'
  });

  // Mock Websites data
  const [myWebsites, setMyWebsites] = useState<Website[]>([
    { id: '1', title: 'Sarah & Michael Wedding', description: 'Our classical wedding website theme.', eventType: 'wedding', status: 'live', url: 'ariya.io/sarah-michael', updatedAt: '2 hours ago', image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128' },
    { id: '2', title: 'Global Tech Summit 2024', description: 'Corporate conference with dark mode.', eventType: 'corporate', status: 'live', url: 'ariya.io/tech-summit', updatedAt: '1 day ago', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c' },
    { id: '3', title: 'Amina\'s Graduation', description: 'Celebrating academic excellence.', eventType: 'graduation', status: 'draft', url: 'ariya.io/amina-grad', updatedAt: '3 days ago', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1' },
    { id: '4', title: 'Midnight Masquerade', description: 'Charity gala with gold accents.', eventType: 'gala', status: 'live', url: 'ariya.io/gala-2024', updatedAt: 'Dec 15, 2023', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622' },
    { id: '5', title: 'Baby Arinze Shower', description: 'Soft boho colors for the new arrival.', eventType: 'baby_shower', status: 'draft', url: 'ariya.io/arinze-baby', updatedAt: 'Dec 20, 2023', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba' },
  ]);

  // Generate templates
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const generateTemplates = (type: EventType): Template[] => {
      const baseImages = {
        wedding: 'https://images.unsplash.com/photo-1519225421980-715cb0202128',
        corporate: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
        birthday: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
        baby_shower: 'https://images.unsplash.com/photo-1519689680058-324335c77eba',
        gala: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
        graduation: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'
      };
      const names = ['Elegance', 'Modern', 'Minimal', 'Luxe', 'Classic', 'Royal', 'Simple', 'Bold', 'Soft', 'Legacy'];
      return Array.from({ length: 10 }, (_, i) => ({
        id: `${type}-${i}`,
        type,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${names[i]}`,
        image: `${baseImages[type]}?q=80&w=1000&auto=format&fit=crop&sig=${i}`,
        description: i < 5 ? 'Free for all users.' : 'Unlock with Premium plan.',
        isPremium: i >= 5
      }));
    };

    const types: EventType[] = ['wedding', 'corporate', 'birthday', 'baby_shower', 'gala', 'graduation'];
    setAllTemplates(types.flatMap(type => generateTemplates(type)));
  }, []);

  // Dynamic defaults
  useEffect(() => {
    const typeDefaults: Record<EventType, any> = {
      corporate: {
        content: { title: 'Innovation Summit 2024', subtitle: 'Building the Future Together', date: 'Sept 22, 2024', location: 'Tech Hub Center', welcomeMessage: 'Join industry experts for a day of networking.', aboutSectionTitle: 'Event Agenda', aboutSectionBody: 'Keynotes, workshops, and more.', actionButtonText: 'Register Now' },
        style: { primaryColor: '#2563EB', secondaryColor: '#F8FAFC', fontHeading: 'font-sans', fontBody: 'font-sans', layoutMode: 'split' }
      },
      birthday: {
        content: { title: 'Alex\'s 30th Birthday', subtitle: 'Celebration of a Decade', date: 'Aug 12, 2024', location: 'The Garden Loft', welcomeMessage: 'Raise a glass to 30 years!', aboutSectionTitle: 'The Birthday Boy', aboutSectionBody: 'Alex is hitting the big 3-0!', actionButtonText: 'Count Me In' },
        style: { primaryColor: '#DB2777', secondaryColor: '#FFF1F2', fontHeading: 'font-serif', fontBody: 'font-sans', layoutMode: 'centered' }
      },
      baby_shower: {
        content: { title: 'A Little One is Coming', subtitle: 'Celebrating Baby Arinze', date: 'May 10, 2024', location: 'The Tea Room', welcomeMessage: 'Join us for brunch showering the parents.', aboutSectionTitle: 'The Registry', aboutSectionBody: 'Grateful for your support.', actionButtonText: 'Send RSVP' },
        style: { primaryColor: '#0891B2', secondaryColor: '#ECFEFF', fontHeading: 'font-serif', fontBody: 'font-sans', layoutMode: 'centered' }
      },
      gala: {
        content: { title: 'Midnight Masquerade', subtitle: 'Supporting Education', date: 'Nov 15, 2024', location: 'Ritz Carlton', welcomeMessage: 'An evening of elegance and impact.', aboutSectionTitle: 'Our Mission', aboutSectionBody: 'Providing scholarships for youth.', actionButtonText: 'Get Tickets' },
        style: { primaryColor: '#A855F7', secondaryColor: '#FAF5FF', fontHeading: 'font-serif', fontBody: 'font-sans', layoutMode: 'centered' }
      },
      graduation: {
        content: { title: 'Class of 2024', subtitle: 'A New Journey Begins', date: 'July 5, 2024', location: 'Grand Hall', welcomeMessage: 'Celebrate the achievements of 2024 grads.', aboutSectionTitle: 'The Journey', aboutSectionBody: 'Four years of hard work.', actionButtonText: 'Attend Party' },
        style: { primaryColor: '#059669', secondaryColor: '#F0FDF4', fontHeading: 'font-mono', fontBody: 'font-sans', layoutMode: 'split' }
      },
      wedding: {
        content: { title: 'Sarah & Michael', subtitle: 'Are getting married!', date: 'June 15, 2024', location: 'Grand Ballroom', welcomeMessage: 'Join us for a celebration of love.', aboutSectionTitle: 'Our Story', aboutSectionBody: 'We met at a coffee shop.', actionButtonText: 'RSVP Now' },
        style: { primaryColor: '#D0771E', secondaryColor: '#FFF8F1', fontHeading: 'font-serif', fontBody: 'font-sans', layoutMode: 'centered' }
      }
    };

    const defaults = typeDefaults[eventType];
    if (defaults && currentView === 'builder') {
      setContent(defaults.content);
      setStyle(defaults.style);
      setSelectedTemplate(`${eventType}-0`);
    }
  }, [eventType, currentView]);

  const handlePublish = () => {
    setShowPublishModal(true);
    setPublishStatus('publishing');

    setTimeout(() => setPublishStatus('optimizing'), 1000);
    setTimeout(() => setPublishStatus('deploying'), 2000);
    setTimeout(() => {
      setPublishStatus('success');
      const newSite: Website = {
        id: Math.random().toString(),
        title: content.title,
        description: content.subtitle,
        eventType: eventType,
        status: 'live',
        url: `ariya.io/${content.title.toLowerCase().replace(/[^a-z0-0]/g, '-')}`,
        updatedAt: 'Just now',
        image: allTemplates.find(t => t.id === selectedTemplate)?.image || ''
      };
      setMyWebsites([newSite, ...myWebsites]);
    }, 3500);
  };

  const toggleStatus = (id: string) => {
    setMyWebsites(myWebsites.map(site =>
      site.id === id ? { ...site, status: site.status === 'live' ? 'draft' : 'live' } : site
    ));
  };

  const deleteWebsite = (id: string) => {
    if (window.confirm('Are you sure you want to delete this website? This action cannot be undone.')) {
      setMyWebsites(myWebsites.filter(site => site.id !== id));
    }
  };

  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setTimeout(() => setIsBroadcasting(false), 3000);
  };

  // THE PREVIEW COMPONENT
  const WebsitePreview = ({ isLive }: { isLive?: boolean }) => (
    <div className={`w-full ${isLive ? '' : 'max-w-5xl'} bg-white dark:bg-gray-800 ${isLive ? '' : 'shadow-[0_48px_160px_-40px_rgba(0,0,0,0.2)] dark:shadow-none rounded-[48px]'} overflow-hidden transition-all duration-700 min-h-screen flex flex-col ${style.fontBody} relative`}>

      {/* THEME PREVIEW LOCK OVERLAY */}
      {!isLive && allTemplates.find(t => t.id === selectedTemplate)?.isPremium && (
        <div className="absolute inset-0 z-40 backdrop-blur-md bg-white/40 dark:bg-gray-900/60 flex flex-col items-center justify-center p-12 text-center">
          <div className="bg-amber-400 text-white p-6 rounded-full shadow-2xl dark:shadow-none mb-8 animate-bounce">
            <LockClosedIcon className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter max-w-md leading-[0.9] mb-4 uppercase">Unlock Premium Design</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-10 max-w-sm">This exquisite template is reserved for Ariya Pro users.</p>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="px-12 py-5 bg-gray-900 dark:bg-gray-700 text-white rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-2xl dark:shadow-none hover:bg-black dark:hover:bg-gray-600 transition-all transform hover:scale-105 active:scale-95"
          >
            Upgrade to Unlock
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      {visibleSections.hero && (
        <div
          className={`relative ${isLive ? 'h-screen' : 'h-[650px]'} flex items-center p-24 text-white overflow-hidden transition-all duration-1000`}
          style={{
            backgroundColor: style.primaryColor,
            backgroundImage: `url(${allTemplates.find(t => t.id === selectedTemplate)?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>

          <div className={`relative z-10 w-full animate-fadeInUp ${style.layoutMode === 'centered' ? 'text-center' : 'text-left max-w-3xl'}`}>
            <div className="flex items-center justify-center gap-4 mb-8 opacity-80">
              <div className="h-[2px] w-8 bg-white/40"></div>
              <div className={`uppercase tracking-[0.6em] text-[10px] font-black ${style.fontBody}`}>
                Est. {content.date.split(',')[0]}
              </div>
              <div className="h-[2px] w-8 bg-white/40"></div>
            </div>
            <h1 className={`${isLive ? 'text-8xl md:text-[10rem]' : 'text-7xl md:text-9xl'} font-black leading-[0.85] mb-12 tracking-tighter ${style.fontHeading}`}
              style={{ textShadow: '0 20px 80px rgba(0,0,0,0.5)' }}
            >
              {content.title}
            </h1>
            <p className="text-2xl md:text-3xl font-light italic opacity-95 max-w-2xl mx-auto mb-16 leading-tight tracking-tight">
              {content.subtitle}
            </p>

            {visibleSections.rsvp && (
              <button className={`px-12 py-6 bg-white text-gray-950 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:scale-110 transition-all shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)] group overflow-hidden relative`}>
                <span className="relative z-10">{content.actionButtonText}</span>
                <div className="absolute inset-0 bg-orange-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* INFO STRIP */}
      {visibleSections.infoBar && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-50 dark:border-gray-700 flex items-stretch divide-x divide-gray-50 dark:divide-gray-700 overflow-hidden">
          {[
            { label: 'Official Date', val: content.date, icon: CalendarDaysIcon },
            { label: 'Grand Venue', val: content.location, icon: MapPinIcon },
            { label: 'Presence', val: 'Guest List', icon: UserGroupIcon },
            { label: 'Questions', val: 'FAQ Guide', icon: GlobeAltIcon },
          ].map((item, idx) => (
            <div key={idx} className="flex-1 p-12 text-center hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-500 group relative">
              <div className="absolute top-0 left-0 w-full h-[4px] opacity-0 group-hover:opacity-100 transition-all duration-700" style={{ backgroundColor: style.primaryColor }}></div>
              <item.icon className="w-10 h-10 mx-auto mb-5 text-gray-200 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white group-hover:scale-110 transition-all duration-500" />
              <div className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-2">{item.label}</div>
              <div className="text-sm font-black text-gray-900 dark:text-white tracking-tight">{item.val}</div>
            </div>
          ))}
        </div>
      )}

      {/* WELCOME BLOCK */}
      {visibleSections.welcome && (
        <div className="p-32 text-center max-w-5xl mx-auto">
          <div className="inline-block px-5 py-2 bg-gray-50 dark:bg-gray-700 rounded-full text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-10">Welcome</div>
          <h2 className={`text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-12 tracking-tighter leading-[0.9] ${style.fontHeading}`}>
            Prepare for an <br />
            <span style={{ color: style.primaryColor }}>Unforgettable Experience</span>
          </h2>
          <p className="text-2xl text-gray-400 dark:text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
            "{content.welcomeMessage}"
          </p>
        </div>
      )}

      {/* DETAIL SECTION */}
      {visibleSections.story && (
        <div className={`grid grid-cols-1 md:grid-cols-2 bg-gray-50/50 dark:bg-gray-800/50`}>
          <div className="p-32 flex flex-col justify-center">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 block" style={{ color: style.primaryColor }}>{eventType === 'corporate' ? 'Mission' : 'The Legacy'}</span>
            <h3 className={`text-5xl font-black text-gray-900 dark:text-white mb-10 leading-[0.85] tracking-tighter ${style.fontHeading}`}>{content.aboutSectionTitle}</h3>
            <p className="text-xl text-gray-500 dark:text-gray-300 leading-loose font-medium mb-12">
              {content.aboutSectionBody}
            </p>
            <button className="self-start text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 bg-gray-900 dark:bg-gray-700 text-white rounded-2xl hover:bg-black dark:hover:bg-gray-600 transition-colors shadow-2xl dark:shadow-none">
              Read More
            </button>
          </div>
          <div className={`${isLive ? 'h-[800px]' : 'h-[650px]'} relative overflow-hidden group`}>
            <img src={allTemplates.filter(t => t.type === eventType)[1]?.image} className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000" alt="Detail" />
          </div>
        </div>
      )}

      {/* FOOTER */}
      {visibleSections.footer && (
        <div className="bg-gray-950 dark:bg-gray-900 p-32 text-center text-white">
          <div className={`text-5xl font-black mb-6 tracking-tighter ${style.fontHeading}`}>{content.title}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.4em] mb-20 font-black">{content.date} • {content.location}</div>
          <div className="pt-20 border-t border-white/5 dark:border-gray-700 flex flex-col items-center">
            <div className="text-[8px] font-black text-gray-700 dark:text-gray-400 uppercase tracking-[0.6em] mb-4">Crafted with Precision</div>
            <div className="text-xl font-black tracking-tighter">ARIYA <span className="text-gray-600 dark:text-gray-500">STUDIO</span></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F6F8] dark:bg-gray-900 flex flex-col relative leading-relaxed overflow-hidden">

      {/* PUBLISH MODAL */}
      <Transition appear show={showPublishModal} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setShowPublishModal(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-[40px] bg-white dark:bg-gray-800 p-12 text-center shadow-2xl dark:shadow-none transition-all">
                  <button onClick={() => setShowPublishModal(false)} className="absolute top-8 right-8 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <XMarkIcon className="w-8 h-8" />
                  </button>

                  {publishStatus !== 'success' ? (
                    <div className="py-8 space-y-8">
                      <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 border-4 border-gray-100 dark:border-gray-700 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-[#D0771E] rounded-full border-t-transparent animate-spin"></div>
                        <RocketLaunchIcon className="w-10 h-10 text-[#D0771E] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tight mb-2 uppercase text-[#1D2939] dark:text-white">
                          {publishStatus === 'publishing' && 'Initializing Upload...'}
                          {publishStatus === 'optimizing' && 'Optimizing Assets...'}
                          {publishStatus === 'deploying' && 'Pushing to Production...'}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Sit tight, we're building your digital experience.</p>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D0771E] transition-all duration-1000"
                          style={{ width: publishStatus === 'publishing' ? '30%' : publishStatus === 'optimizing' ? '65%' : '90%' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-10 animate-fadeIn">
                      <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto shadow-sm dark:shadow-none">
                        <CheckCircleIcon className="w-12 h-12" />
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-4xl font-black tracking-tighter uppercase text-[#1D2939] dark:text-white">Website Live!</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xs mx-auto">Spread the word! Your guests can now access your event portal.</p>
                      </div>
                      <div className="bg-orange-50/50 dark:bg-orange-900/20 p-6 rounded-[32px] flex items-center justify-between gap-4 border border-orange-100 dark:border-orange-900/30">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <GlobeAltIcon className="w-5 h-5 text-[#D0771E] shrink-0" />
                          <span className="text-sm font-black truncate tracking-tight text-gray-700 dark:text-gray-300">ariya.io/{content.title.toLowerCase().replace(/[^a-z0-0]/g, '-')}</span>
                        </div>
                        <button
                          onClick={() => handleCopyLink(`ariya.io/${content.title.toLowerCase().replace(/[^a-z0-0]/g, '-')}`)}
                          className={`p-3 rounded-2xl transition-all border ${copiedLink ? 'bg-green-500 text-white border-green-400' : 'bg-white dark:bg-gray-700 text-[#D0771E] border-orange-100 dark:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-gray-600 shadow-sm dark:shadow-none'}`}
                        >
                          {copiedLink ? <CheckCircleIcon className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                        </button>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => { setIsLivePreview(true); setShowPublishModal(false); }} className="flex-1 py-5 bg-[#1D2939] dark:bg-gray-700 text-white rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-black dark:hover:bg-gray-600 transition-all shadow-xl dark:shadow-none shadow-gray-200">Visit Live Site</button>
                        <button onClick={() => { setCurrentView('management'); setShowPublishModal(false); }} className="flex-1 py-5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-100 dark:hover:bg-gray-600 transition-all border border-gray-200 dark:border-gray-600">Back to Hub</button>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* UPGRADE MODAL */}
      <Transition appear show={showUpgradeModal} as={Fragment}>
        <Dialog as="div" className="relative z-[110]" onClose={() => setShowUpgradeModal(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-[48px] bg-white dark:bg-gray-800 p-12 text-center shadow-2xl dark:shadow-none transition-all relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 opacity-5 dark:opacity-10 rounded-bl-full -mr-32 -mt-32" />

                  <button onClick={() => setShowUpgradeModal(false)} className="absolute top-8 right-8 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <XMarkIcon className="w-8 h-8" />
                  </button>

                  <div className="relative">
                    <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-inner dark:shadow-none transform -rotate-3 group-hover:rotate-0 transition-transform">
                      <SparklesIcon className="w-10 h-10" />
                    </div>

                    <h2 className="text-5xl font-black tracking-tighter uppercase mb-2 text-[#1D2939] dark:text-white">Ariya <span className="text-amber-500">Pro</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-12 max-w-sm mx-auto uppercase tracking-widest text-[10px]">ELEVATE YOUR EVENT EXPERIENCE</p>

                    <div className="grid grid-cols-3 gap-6 mb-12 text-left">
                      {[
                        { title: 'Premium Themes', desc: 'Unlock 50+ hand-crafted high-end designs', icon: SwatchIcon },
                        { title: 'Custom Domain', desc: 'Use your own professional URL', icon: GlobeAltIcon },
                        { title: 'Passcode Protection', desc: 'Private portal for exclusive guests', icon: ShieldCheckIcon },
                      ].map((feature, i) => (
                        <div key={i} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-3xl border border-gray-100 dark:border-gray-600 hover:border-amber-200 dark:hover:border-amber-500/50 transition-colors">
                          <feature.icon className="w-6 h-6 text-amber-500 mb-4" />
                          <h4 className="text-[10px] font-black uppercase text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold leading-tight">{feature.desc}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowUpgradeModal(false)}
                      className="w-full py-6 bg-[#1D2939] dark:bg-gray-700 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl dark:shadow-none hover:bg-black dark:hover:bg-gray-600 transition-all transform active:scale-[0.98]"
                    >
                      Unlock For $19/Month
                    </button>
                    <p className="mt-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Cancel anytime • 14-day money back guarantee</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* FULL SCREEN LIVE PREVIEW OVERLAY */}
      {isLivePreview && (
        <div className="fixed inset-0 z-[90] bg-white dark:bg-gray-900 flex flex-col animate-fadeIn">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 px-10 py-5 flex justify-between items-center fixed top-0 w-full z-50 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-6">
              <button onClick={() => setIsLivePreview(false)} className="p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all border border-gray-100 dark:border-gray-700">
                <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D0771E]">Live Experience Preview</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-8 py-3 rounded-full text-xs font-black text-gray-500 dark:text-gray-400 tracking-tighter border border-gray-100 dark:border-gray-700 lowercase shadow-inner dark:shadow-none">
              ariya.io/{content.title.toLowerCase().replace(/[^a-z0-0]/g, '-')}
            </div>
            <button
              onClick={handleBroadcast}
              disabled={isBroadcasting}
              className={`${isBroadcasting ? 'bg-green-500' : 'bg-[#D0771E] hover:bg-orange-600'} text-white px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl dark:shadow-none shadow-orange-100 active:scale-95 transition-all flex items-center gap-2`}
            >
              {isBroadcasting ? (
                <>
                  <CheckCircleIcon className="w-4 h-4" />
                  Broadcasted!
                </>
              ) : (
                <>
                  <RocketLaunchIcon className="w-4 h-4" />
                  Broadcast Link
                </>
              )}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pt-24 bg-gray-50 dark:bg-gray-900">
            <WebsitePreview isLive={true} />
          </div>
        </div>
      )}

      {/* MAIN VIEW LOGIC */}
      {/* MAIN VIEW LOGIC */}
      {currentView === 'management' ? (
        <div className="max-w-[1600px] mx-auto pb-20 dark:bg-gray-900">
          <div className="w-full px-8">
            {/* Header */}
            <PageHeader
              breadcrumb="Website"
              title="Event Websites"
              subtitle="Manage, customize, and publish your digital event experiences"
              actions={
                <button
                  onClick={() => { setEventType('wedding'); setCurrentView('builder'); }}
                  className="px-6 py-3 bg-[#262626] dark:bg-gray-700 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black dark:hover:bg-gray-600 transition-all flex items-center gap-2 shadow-lg dark:shadow-none"
                >
                  <PlusIcon className="w-4 h-4" /> Create New Site
                </button>
              }
            />

            {/* Tabs */}
            <PremiumTabs
              tabs={[
                { id: 'my-websites', label: 'My Websites' },
                { id: 'portraits', label: 'Portraits' },
                { id: 'favourites', label: 'Favourites' },
                { id: 'settings', label: 'Settings' }
              ]}
              activeTab={managementTab}
              onChange={(id) => setManagementTab(id as any)}
              className="mb-10"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {/* Add New Project Card */}
              <div
                onClick={() => { setEventType('wedding'); setCurrentView('builder'); }}
                className="bg-white dark:bg-gray-800 rounded-3xl flex flex-col items-center justify-center cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-[#D0771E] hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 transition-all group aspect-[3/4]"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#262626] dark:group-hover:bg-gray-600 group-hover:text-white transition-all">
                  <PlusIcon className="w-8 h-8" />
                </div>
                <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">New Portal</p>
              </div>

              {/* Website Cards */}
              {myWebsites.filter(site => {
                if (managementTab === 'my-websites') return true;
                if (managementTab === 'portraits') return site.status === 'live';
                return true;
              }).map((site) => (
                <div key={site.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 transition-all cursor-pointer group flex flex-col aspect-[3/4] relative">
                  {/* Image/Preview Section */}
                  <div className="flex-1 w-full relative overflow-hidden bg-[#FFF8F0] dark:bg-gray-900">
                    <img
                      src={site.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={site.title}
                    />

                    {/* Status Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm dark:shadow-none flex items-center gap-1.5 z-10 ${site.status === 'live' ? 'bg-green-500 text-white' : 'bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white backdrop-blur-sm'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-current ${site.status === 'live' ? 'animate-pulse' : ''}`}></div>
                      {site.status}
                    </div>

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 gap-3 z-20 backdrop-blur-sm">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEventType(site.eventType); setCurrentView('builder'); setContent({ ...content, title: site.title }); }}
                        className="w-full py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg dark:shadow-none"
                      >
                        Edit Design
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleStatus(site.id); }}
                        className="w-full py-3 bg-white/10 dark:bg-gray-800/50 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 dark:hover:bg-gray-700/50 transition-colors border border-white/20 dark:border-gray-600"
                      >
                        {site.status === 'live' ? 'Unpublish' : 'Go Live'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteWebsite(site.id); }}
                        className="w-full py-3 bg-red-500/10 dark:bg-red-900/30 text-red-400 dark:text-red-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 dark:hover:bg-red-600 hover:text-white transition-colors border border-red-500/20 dark:border-red-900/30"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 bg-white dark:bg-gray-800 border-t border-gray-50 dark:border-gray-700">
                    <h3 className="font-black text-gray-900 dark:text-white text-sm mb-2 truncate uppercase tracking-tight">
                      {site.title}
                    </h3>
                    <div className="flex items-center gap-2 opacity-60">
                      <GlobeAltIcon className="w-3 h-3 text-[#D0771E]" />
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold truncate lowercase tracking-wide">
                        {site.url}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
          {/* Builder Toolbar */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-8 py-4 flex justify-between items-center shrink-0 z-20 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setCurrentView('management')}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white border border-gray-100 dark:border-gray-600 hover:shadow-md dark:hover:shadow-none transition-all active:scale-95 flex items-center gap-2 group"
              >
                <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Back</span>
              </button>
              <div className="h-8 w-px bg-gray-100 dark:bg-gray-700"></div>
              <div>
                <div className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Studio Editor</div>
                <h1 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter">{content.title}</h1>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsLivePreview(true)}
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-[10px] font-black uppercase text-[#1D2939] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 tracking-widest transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Preview Site
              </button>
              <button
                onClick={handlePublish}
                className="px-8 py-3 bg-[#D0771E] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg dark:shadow-none shadow-orange-100 hover:bg-orange-600 transition-all flex items-center gap-2 active:scale-95"
              >
                <RocketLaunchIcon className="w-4 h-4" /> Go Live
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Controls */}
            <div className="w-[420px] border-r border-gray-100 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none">
              <div className="px-6 pt-6">
                <PremiumTabs
                  tabs={[
                    { id: 'templates', label: 'Theme' },
                    { id: 'content', label: 'Content' },
                    { id: 'style', label: 'Style' },
                    { id: 'settings', label: 'Settings' }
                  ]}
                  activeTab={activeTab}
                  onChange={(id) => setActiveTab(id as any)}
                  className="mb-0"
                />
              </div>

              <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                {activeTab === 'templates' && (
                  <div className="space-y-12">
                    <PremiumCard className="p-6 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-none">
                      <div className="flex items-center gap-3 mb-6">
                        <SparklesIcon className="w-5 h-5 text-[#D0771E]" />
                        <h3 className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Occasion Filtering</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'wedding', label: 'Wedding', icon: HeartIcon },
                          { id: 'corporate', label: 'Corporate', icon: BriefcaseIcon },
                          { id: 'birthday', label: 'Birthday', icon: CakeIcon },
                          { id: 'baby_shower', label: 'Baby', icon: GiftIcon },
                          { id: 'gala', label: 'Gala', icon: StarIcon },
                          { id: 'graduation', label: 'Graduation', icon: AcademicCapIcon },
                        ].map(item => (
                          <button key={item.id} onClick={() => setEventType(item.id as EventType)} className={`flex flex-col items-center gap-2 p-5 rounded-3xl border-2 transition-all ${eventType === item.id ? 'bg-white dark:bg-gray-700 border-[#D0771E] text-[#D0771E] shadow-xl dark:shadow-none' : 'border-transparent text-gray-400 dark:text-gray-500 opacity-60 hover:opacity-100 grayscale hover:grayscale-0'}`}>
                            <item.icon className="w-6 h-6" />
                            <span className="text-[8px] font-black uppercase tracking-wider">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </PremiumCard>

                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Available Themes</h3>
                      <div className="grid grid-cols-1 gap-6">
                        {allTemplates.filter(t => t.type === eventType).map(template => (
                          <div key={template.id} onClick={() => setSelectedTemplate(template.id)} className={`group relative rounded-[32px] border-4 overflow-hidden cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-[#D0771E] shadow-2xl dark:shadow-none scale-[1.02]' : 'border-white dark:border-gray-800 hover:border-gray-100 dark:hover:border-gray-700 ring-1 ring-gray-100 dark:ring-gray-700'}`}>
                            <div className="aspect-[21/10] relative">
                              <img src={template.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={template.name} />
                              {template.isPremium && (
                                <div className="absolute top-4 right-4 bg-amber-400 text-white text-[8px] font-black px-4 py-1.5 rounded-full shadow-lg dark:shadow-none flex items-center gap-1.5">
                                  <SparklesIcon className="w-3 h-3" /> PRO
                                </div>
                              )}
                              <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${selectedTemplate === template.id ? 'bg-[#D0771E]/20 opacity-100' : 'bg-black/0 opacity-0 group-hover:opacity-100 group-hover:bg-black/20'}`}>
                                {selectedTemplate === template.id && <CheckCircleIcon className="w-12 h-12 text-white drop-shadow-2xl" />}
                              </div>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800 flex justify-between items-center">
                              <div className="font-black text-xs uppercase text-[#1D2939] dark:text-white tracking-tighter">{template.name}</div>
                              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">{template.isPremium ? '$19 / Mo' : 'FREE'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'content' && (
                  <div className="space-y-8 pb-12">
                    <PremiumCard className="p-6 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 px-1">Structure Visibility</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.keys(visibleSections).map(sec => (
                          <button key={sec} onClick={() => toggleSection(sec as any)} className={`flex items-center justify-between px-5 py-4 rounded-[20px] border-2 transition-all ${visibleSections[sec as keyof typeof visibleSections] ? 'bg-white dark:bg-gray-700 border-orange-100 dark:border-orange-900/30 text-[#D0771E] shadow-md dark:shadow-none' : 'border-transparent text-gray-300 dark:text-gray-600'}`}>
                            <span className="text-[9px] font-black uppercase tracking-widest">{sec}</span>
                            {visibleSections[sec as keyof typeof visibleSections] ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </PremiumCard>

                    <div className="space-y-4">
                      {[
                        { id: 'header', label: 'Hero Contents', icon: PhotoIcon, fields: [{ key: 'title', label: 'Main Display Title' }, { key: 'subtitle', label: 'Supporting Tagline' }] },
                        { id: 'logistics', label: 'Event Logistics', icon: CalendarDaysIcon, fields: [{ key: 'date', label: 'Formal Date' }, { key: 'location', label: 'Venue Address' }] },
                        { id: 'details', label: 'Custom Blocks', icon: DocumentTextIcon, fields: [{ key: 'welcomeMessage', label: 'Welcome Note', type: 'textarea' }, { key: 'actionButtonText', label: 'Main CTA Text' }] }
                      ].map(sec => (
                        <div key={sec.id} className={`rounded-[32px] border-2 transition-all bg-white dark:bg-gray-800 ${expandedSection === sec.id ? 'border-orange-100 dark:border-orange-900/30 shadow-xl dark:shadow-none' : 'border-gray-50 dark:border-gray-700'}`}>
                          <button onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)} className="w-full flex items-center justify-between px-8 py-6">
                            <div className="flex items-center gap-5"><div className={`p-2.5 rounded-xl ${expandedSection === sec.id ? 'bg-orange-50 dark:bg-orange-900/20 text-[#D0771E]' : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}><sec.icon className="w-5 h-5" /></div><span className="text-xs font-black uppercase text-[#1D2939] dark:text-white tracking-tighter">{sec.label}</span></div>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform ${expandedSection === sec.id ? 'rotate-180 text-[#D0771E]' : 'text-gray-300 dark:text-gray-600'}`} />
                          </button>
                          {expandedSection === sec.id && (
                            <div className="px-8 pb-10 space-y-6 animate-fadeIn">
                              {sec.fields.map(f => (
                                <div key={f.key}>
                                  <label className="block text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-1">{f.label}</label>
                                  {f.type === 'textarea' ? (
                                    <textarea
                                      value={(content as any)[f.key]}
                                      onChange={e => setContent({ ...content, [f.key]: e.target.value })}
                                      className="w-full rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-[#D0771E] text-sm font-bold dark:text-white p-5 transition-all outline-none resize-none"
                                      rows={3}
                                    />
                                  ) : (
                                    <input
                                      value={(content as any)[f.key]}
                                      onChange={e => setContent({ ...content, [f.key]: e.target.value })}
                                      className="w-full rounded-2xl bg-gray-50 dark:bg-gray-700 border-none focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-[#D0771E] text-sm font-bold dark:text-white p-5 outline-none"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'style' && (
                  <div className="space-y-12 pb-12">
                    <PremiumCard className="p-6 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-10 text-center">Brand Signature</h3>
                      <div className="grid grid-cols-5 gap-6">
                        {['#1D2939', '#D0771E', '#2563EB', '#059669', '#A855F7'].map(c => (
                          <button key={c} onClick={() => setStyle({ ...style, primaryColor: c })} className={`w-12 h-12 rounded-[18px] ring-offset-4 dark:ring-offset-gray-800 ring-4 transition-all hover:scale-110 active:scale-90 ${style.primaryColor === c ? 'ring-[#D0771E] shadow-2xl dark:shadow-none shadow-orange-200' : 'ring-transparent'}`} style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </PremiumCard>

                    <div className="space-y-10">
                      <div className="flex items-center gap-3 px-4">
                        <SwatchIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <h3 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Typeface Systems</h3>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { id: 'serif', name: 'Editorial Luxe', font: 'font-serif' },
                          { id: 'sans', name: 'Modern Kinetic', font: 'font-sans' },
                          { id: 'mono', name: 'Digital Minimal', font: 'font-mono' },
                        ].map(f => (
                          <button
                            key={f.id}
                            onClick={() => setStyle({ ...style, fontHeading: f.font })}
                            className={`w-full p-8 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group ${style.fontHeading === f.font ? 'border-[#D0771E] bg-orange-50/10 dark:bg-orange-900/20 shadow-xl dark:shadow-none' : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'}`}
                          >
                            <div className={`text-2xl font-black ${f.font} text-[#1D2939] dark:text-white mb-1`}>{f.name}</div>
                            <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Selected Hierarchy</div>
                            {style.fontHeading === f.font && <CheckCircleIcon className="absolute top-8 right-8 w-8 h-8 text-[#D0771E]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <PremiumCard className="p-8 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 shadow-none">
                      <h4 className="text-amber-800 dark:text-amber-300 font-black text-xs uppercase mb-4 flex items-center gap-2">
                        <SparklesIcon className="w-4 h-4" /> Pro Features Available
                      </h4>
                      <p className="text-amber-700/80 dark:text-amber-300/80 text-xs font-bold leading-relaxed mb-6">Unlock custom domains and advanced security with an Ariya Pro subscription.</p>
                      <button
                        onClick={() => setShowUpgradeModal(true)}
                        className="w-full py-4 bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg dark:shadow-none shadow-amber-200 hover:bg-amber-600 transition-all"
                      >
                        Upgrade Now
                      </button>
                    </PremiumCard>

                    {[
                      { label: 'Custom Domain', val: 'Not Linked', icon: GlobeAltIcon, disabled: true },
                      { label: 'Security Passcode', val: 'Disabled', icon: ShieldCheckIcon, disabled: true },
                      { label: 'Search Indexing', val: 'Enabled', icon: RocketLaunchIcon, disabled: false },
                    ].map((item, i) => (
                      <div key={i} className={`p-8 rounded-[32px] border-2 border-gray-50 dark:border-gray-700 flex items-center justify-between ${item.disabled ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        <div className="flex items-center gap-5">
                          <item.icon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                          <div>
                            <div className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest mb-1">{item.label}</div>
                            <div className="text-xs font-bold text-gray-400 dark:text-gray-500">{item.val}</div>
                          </div>
                        </div>
                        <ChevronDownIcon className="w-5 h-5 text-gray-200 dark:text-gray-600" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Main Preview Area */}
            <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8 overflow-hidden relative">
              <div className="relative w-full max-w-[1200px] h-full shadow-2xl dark:shadow-none shadow-gray-200/50 rounded-[32px] overflow-hidden bg-white dark:bg-gray-800 border-[8px] border-white dark:border-gray-800 ring-1 ring-gray-100 dark:ring-gray-700 transform transition-all">
                <div className="w-full h-full overflow-y-auto scrollbar-hide">
                  <WebsitePreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventWebsite;