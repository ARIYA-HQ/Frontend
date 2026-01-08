import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition, Popover } from '@headlessui/react';
import {
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  ShoppingCartIcon,
  Bars3Icon,
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import { classNames as cn } from '../../utils/classNames';
import { Avatar } from './Avatar';
import { useCart } from '../../contexts/CartContext';
import { XMarkIcon as XMarkIconSolid } from '@heroicons/react/20/solid';

import { useNotifications } from '../../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { cart, removeFromCart } = useCart();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const formatPrice = (price: number) => {
    return '₦' + price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  };

  // Mock search results for simulation
  const quickLinks = [
    { name: 'Wedding Registry', href: '/registry', category: 'Pages' },
    { name: 'Guest List Management', href: '/guests', category: 'Tools' },
    { name: 'Budget Tracking', href: '/budget', category: 'Tools' },
    { name: 'Design Invitations', href: '/designs', category: 'Creative' },
  ];

  const filteredLinks = searchQuery
    ? quickLinks.filter(link => link.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : quickLinks;

  return (
    <div className="sticky top-0 z-40 flex h-16 sm:h-20 shrink-0 items-center gap-x-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-10 transition-colors">
      <button type="button" className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden" onClick={onMenuClick}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </button>

      {/* Separator (keeps left padding consistent when menu button is hidden) */}
      <div className="h-6 w-px bg-gray-100 dark:bg-gray-700 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-12">
        <div className="relative flex flex-1 items-center">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-0 h-5 w-5 text-[#BFBFBF] dark:text-gray-500"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-900 dark:text-white placeholder:text-[#BFBFBF] dark:placeholder:text-gray-500 placeholder:italic focus:ring-0 sm:text-sm"
            placeholder="Search for something..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />

          {/* Search Dropdown Simulation */}
          <Transition
            show={isSearchFocused}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="absolute top-full left-0 mt-2 w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
              <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Quick Navigation</h3>
              </div>
              <div className="p-2 space-y-1">
                {filteredLinks.length > 0 ? filteredLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="flex items-center justify-between p-3 hover:bg-orange-50/50 dark:hover:bg-gray-700/50 rounded-xl transition-all group"
                  >
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-[#D0771E]">{link.name}</span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">{link.category}</span>
                  </Link>
                )) : (
                  <div className="p-4 text-center text-xs text-gray-400 dark:text-gray-500 font-medium">No results found for "{searchQuery}"</div>
                )}
              </div>
            </div>
          </Transition>
        </div>

        <div className="flex items-center gap-x-2 sm:gap-x-4 lg:gap-x-8">
          <div className="flex items-center gap-x-1 sm:gap-x-2">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-x-1 sm:gap-x-2">
            {/* Messages - Hidden on XS */}
            <Popover className="relative hidden sm:block">
              <Popover.Button className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-colors relative outline-none">
                <EnvelopeIcon className="h-6 w-6" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-gray-800" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-3 w-80 transform px-4 sm:px-0">
                  <div className="overflow-hidden rounded-2xl shadow-2xl dark:shadow-none ring-1 ring-black dark:ring-gray-700 ring-opacity-5 bg-white dark:bg-gray-800">
                    <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase">Messages</h3>
                      <Link to="/messages" className="text-[10px] font-bold text-[#D0771E] hover:underline">View All</Link>
                    </div>
                    <div className="p-4 space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex gap-3 items-start p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all cursor-pointer">
                          <Avatar size="sm" src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                          <div>
                            <p className="text-xs font-bold text-gray-900 dark:text-white">Visca Barca</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">Hello एवरीवन, are you available for...</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            {/* Notifications */}
            <Popover className="relative">
              {() => (
                <>
                  <Popover.Button className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-colors outline-none relative">
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800 animate-pulse" />
                    )}
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute right-0 z-10 mt-3 w-96 transform px-4 sm:px-0">
                      <div className="overflow-hidden rounded-2xl shadow-2xl dark:shadow-none ring-1 ring-black dark:ring-gray-700 ring-opacity-5 bg-white dark:bg-gray-800 max-h-[80vh] flex flex-col">
                        <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center shrink-0">
                          <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase">Notifications</h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-[10px] font-bold text-[#D0771E] hover:underline uppercase tracking-wide"
                            >
                              Mark all read
                            </button>
                          )}
                        </div>
                        <div className="overflow-y-auto">
                          {notifications.length > 0 ? (
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                              {notifications.map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${!notification.read ? 'bg-orange-50/30 dark:bg-orange-900/10' : ''}`}
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <div className="flex gap-3">
                                    <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${!notification.read ? 'bg-[#D0771E]' : 'bg-transparent'}`} />
                                    <div className="flex-1 space-y-1">
                                      <p className={`text-xs ${!notification.read ? 'font-black text-gray-900 dark:text-white' : 'font-medium text-gray-600 dark:text-gray-400'}`}>
                                        {notification.title}
                                      </p>
                                      <p className="text-[11px] text-gray-500 dark:text-gray-500 leading-snug">
                                        {notification.message}
                                      </p>
                                      <p className="text-[10px] font-medium text-gray-400">
                                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-8 text-center">
                              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                <BellIcon className="w-6 h-6 text-gray-300 dark:text-gray-500" />
                              </div>
                              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">No New Notifications</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            {/* Cart */}
            <Popover className="relative">
              <Popover.Button className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-colors outline-none relative">
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white shadow-sm dark:shadow-none ring-2 ring-white dark:ring-gray-800">
                    {cart.length}
                  </span>
                )}
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-3 w-80 transform px-4 sm:px-0">
                  <div className="overflow-hidden rounded-2xl shadow-2xl dark:shadow-none ring-1 ring-black dark:ring-gray-700 ring-opacity-5 bg-white dark:bg-gray-800">
                    <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">Shopping Bag</h3>
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">{cart.length} Items</span>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {cart.length > 0 ? (
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                          {cart.map((item) => (
                            <div key={item.cartId} className="p-4 flex gap-3 group">
                              <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-gray-900 dark:text-white line-clamp-1">{item.title}</p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{item.brand} • Qty: {item.quantity}</p>
                                <p className="text-[10px] font-black text-[#D0771E] mt-1">{formatPrice(item.unitPrice * item.quantity)}</p>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.cartId)}
                                className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                              >
                                <XMarkIconSolid className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Your bag is empty</p>
                          <Link to="/vendors" className="mt-4 inline-block text-[10px] font-black text-[#D0771E] uppercase tracking-widest hover:underline">Browse Vendors</Link>
                        </div>
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Subtotal</span>
                          <span className="text-[13px] font-black text-gray-900 dark:text-white">
                            {formatPrice(cart.reduce((total, item) => total + (item.unitPrice * item.quantity), 0))}
                          </span>
                        </div>
                        <Link
                          to="/registry/checkout"
                          className="w-full py-2.5 bg-gray-900 dark:bg-gray-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors shadow-lg dark:shadow-none block text-center"
                        >
                          Checkout Now
                        </Link>
                      </div>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>

          <div className="flex items-center gap-x-4 pl-4 border-l border-gray-100 dark:border-gray-700">
            {/* Nigeria Flag Circle */}
            <div className="hidden sm:block h-8 w-8 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none flex-shrink-0">
              <img
                src="https://flagcdn.com/w80/ng.png"
                alt="Nigeria"
                className="h-full w-full object-cover"
              />
            </div>

            {/* User Avatar Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center outline-none">
                <span className="sr-only">Open user menu</span>
                <Avatar
                  size="sm"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="border-2 border-white dark:border-gray-800 shadow-md dark:shadow-none active:scale-95 transition-transform sm:w-10 sm:h-10"
                />
                <ChevronDownIcon className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-2xl bg-white dark:bg-gray-800 py-2 shadow-2xl dark:shadow-none ring-1 ring-gray-900/5 dark:ring-gray-700 focus:outline-none overflow-hidden">
                  <div className="px-4 py-2 border-b border-gray-50 dark:border-gray-700 mb-1">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Signed in as</p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">Sarah Michael</p>
                  </div>
                  {[
                    { name: 'Your Profile', href: '/profile', icon: UserIcon },
                    { name: 'Settings', href: '/dashboard/vendor/settings', icon: Cog6ToothIcon },
                  ].map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          to={item.href}
                          className={cn(
                            active ? 'bg-orange-50/50 dark:bg-gray-700/50 text-[#D0771E]' : 'text-gray-700 dark:text-gray-300',
                            'flex items-center gap-3 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors'
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                  <div className="border-t border-gray-50 dark:border-gray-700 mt-1 pt-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={cn(
                            active ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
                            'flex w-full items-center gap-3 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors'
                          )}
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4" />
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;