import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  HomeIcon,
  CalendarDaysIcon,
  BuildingStorefrontIcon,
  BanknotesIcon,
  GlobeAltIcon,
  PhotoIcon,
  GiftIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  ArrowPathIcon,
  ChartBarIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/solid';
import { classNames as cn } from '../../utils/classNames';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
}

const plannerNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Events', href: '/events', icon: CalendarDaysIcon },
  { name: 'Vendors', href: '/vendors', icon: BuildingStorefrontIcon },
  { name: 'My Vendors', href: '/dashboard/my-vendors', icon: BriefcaseIcon },
  { name: 'Budget', href: '/budget', icon: BanknotesIcon },
  { name: 'Website', href: '/website', icon: GlobeAltIcon },
  { name: 'Designs', href: '/designs', icon: PhotoIcon },
  { name: 'Registry', href: '/registry', icon: GiftIcon },
  { name: 'Guests', href: '/guests', icon: UserGroupIcon },
  { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const professionalPlannerNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Events', href: '/events', icon: CalendarDaysIcon },
  { name: 'Vendors', href: '/vendors', icon: BuildingStorefrontIcon },
  { name: 'My Vendors', href: '/dashboard/my-vendors', icon: BriefcaseIcon },
  { name: 'Budget', href: '/budget', icon: BanknotesIcon },
  { name: 'Website', href: '/website', icon: GlobeAltIcon },
  { name: 'Clients', href: '/clients', icon: UserGroupIcon },
  { name: 'Report', href: '/report', icon: DocumentTextIcon },
  { name: 'Proposals', href: '/proposals', icon: DocumentCheckIcon },
  { name: 'Team', href: '/team', icon: UsersIcon },
  { name: 'Designs', href: '/designs', icon: PhotoIcon },
  { name: 'Registry', href: '/registry', icon: GiftIcon },
  { name: 'Guests', href: '/guests', icon: UserGroupIcon },
  { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const vendorNavigation = [
  { name: 'Dashboard', href: '/dashboard/vendor', icon: HomeIcon },
  { name: 'Pipeline', href: '/dashboard/vendor/pipeline', icon: ArrowPathIcon },
  { name: 'Operations', href: '/dashboard/vendor/operations', icon: BriefcaseIcon },
  { name: 'Analytics', href: '/dashboard/vendor/analytics', icon: ChartBarIcon },
  { name: 'Service Listings', href: '/dashboard/vendor/services', icon: BuildingStorefrontIcon },
  { name: 'Calendar', href: '/dashboard/vendor/calendar', icon: CalendarDaysIcon },
  { name: 'Portfolio', href: '/dashboard/vendor/portfolio', icon: PhotoIcon },
  { name: 'Finances', href: '/dashboard/vendor/finances', icon: BanknotesIcon },
  { name: 'Growth', href: '/dashboard/vendor/growth', icon: ArrowTrendingUpIcon },
  { name: 'Messages', href: '/dashboard/vendor/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Settings', href: '/dashboard/vendor/settings', icon: Cog6ToothIcon },
];

const Sidebar = ({ isOpen, onClose, userRole = 'planner' }: SidebarProps) => {
  const location = useLocation();

  // Function to determine the dashboard name based on the user's role
  const getDashboardName = () => {
    switch (userRole) {
      case 'vendor':
        return 'Vendor';
      case 'professional_event_planner':
        return 'Pro Planner';
      case 'personal_planner':
        return 'Planner';
      case 'admin':
        return 'Admin';
      default:
        return 'Planner';
    }
  };

  let navigation;
  if (userRole === 'vendor') {
    navigation = vendorNavigation;
  } else if (userRole === 'professional_event_planner') {
    navigation = professionalPlannerNavigation;
  } else {
    // Default to personal planner navigation for 'personal_planner' or 'planner'
    navigation = plannerNavigation;
  }

  const isCurrent = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={onClose}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Mobile Content */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#F3F0EB] dark:bg-gray-900 px-6 pb-4 transition-colors">
                  <div className="flex h-20 shrink-0 items-center">
                    <div className="text-[#D0771E] font-black text-4xl tracking-tighter uppercase italic">
                      Àriyá
                    </div>
                    <div className="ml-4">
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{getDashboardName()}</span>
                    </div>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-2">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={cn(
                                  isCurrent(item.href)
                                    ? 'bg-[#1D2939] dark:bg-gray-800 text-white shadow-xl dark:shadow-none'
                                    : 'text-[#8C8C8C] dark:text-gray-400 hover:text-[#D0771E] hover:bg-orange-50/50 dark:hover:bg-gray-800/50',
                                  'group flex gap-x-4 rounded-[24px] p-4 text-[13px] leading-none font-black uppercase tracking-[0.15em] transition-all duration-300'
                                )}
                                onClick={onClose}
                              >
                                <item.icon
                                  className={cn(
                                    isCurrent(item.href) ? 'text-white' : 'text-[#8C8C8C] dark:text-gray-400 group-hover:text-[#D0771E]',
                                    'h-5 w-5 shrink-0 transition-colors'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-8 overflow-y-auto bg-[#EEE9E5] dark:bg-gray-900 px-6 pb-4 border-r border-[#E5E0DA] dark:border-gray-800 transition-colors">
          <div className="flex h-24 shrink-0 items-center">
            <div className="text-[#D0771E] font-black text-4xl tracking-tighter uppercase italic">
              Àriyá
            </div>
            <div className="ml-4">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{getDashboardName()}</span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          isCurrent(item.href)
                            ? 'bg-[#1D2939] dark:bg-gray-800 text-white shadow-2xl dark:shadow-none translate-x-1'
                            : 'text-[#8C8C8C] dark:text-gray-400 hover:text-[#D0771E] hover:bg-white dark:hover:bg-gray-800/50 hover:shadow-lg dark:hover:shadow-none',
                          'group flex items-center gap-x-4 rounded-[24px] p-4 text-[13px] leading-none font-black uppercase tracking-[0.15em] transition-all duration-300'
                        )}
                      >
                        <div className={cn(
                          'p-2 rounded-xl transition-colors',
                          isCurrent(item.href) ? 'bg-white/10' : 'bg-transparent group-hover:bg-orange-50 dark:group-hover:bg-gray-700/50'
                        )}>
                          <item.icon
                            className={cn(
                              isCurrent(item.href) ? 'text-white' : 'text-[#8C8C8C] dark:text-gray-400 group-hover:text-[#D0771E]',
                              'h-5 w-5 shrink-0 transition-colors'
                            )}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="relative top-[1px]">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;