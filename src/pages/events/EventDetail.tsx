import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PremiumTabs from '../../components/ui/PremiumTabs';
import { mockEvents, mockGuests, mockBudget } from '../../data/mockData';
import {
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  MapPinIcon,
  SparklesIcon,
  ClockIcon,
  ShoppingBagIcon,
  PlusIcon,
  XMarkIcon,
  CheckCircleIcon,
  DocumentArrowUpIcon
} from '@heroicons/react/24/outline';
import EditEventModal from '../../components/events/EditEventModal';
import ShareModal from '../../components/ui/ShareModal';

// Interfaces for our state
interface Task {
  id: string;
  title: string;
  due: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  tag: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  date: string;
}

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
  date: string;
}

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [event] = useState(mockEvents.find(e => e.id === eventId) || mockEvents[0]);
  const [guests] = useState(mockGuests.filter(g => g.eventId === eventId));
  const [budget] = useState(mockBudget);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(mockEvents.find(e => e.id === eventId) || mockEvents[0]);

  // Interactive State
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Finalize seating chart', due: 'Tomorrow', priority: 'High', completed: false, tag: 'Planning' },
    { id: '2', title: 'Confirm photographer timeline', due: 'Next Week', priority: 'Medium', completed: false, tag: 'Vendor' },
    { id: '3', title: 'Send final count to caterer', due: 'Completed', priority: 'High', completed: true, tag: 'Vendor' },
    { id: '4', title: 'Book rehearsal dinner venue', due: 'Overdue', priority: 'High', completed: false, tag: 'Venue' },
    { id: '5', title: 'Select first dance song', due: 'Next Month', priority: 'Low', completed: false, tag: 'Music' },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Ceremony Music', content: 'Need to finalize the prelude songs. Bride prefers classical strings.', color: 'bg-yellow-100 text-yellow-900', date: '2 days ago' },
    { id: '2', title: 'Dietary Restrictions', content: 'Table 4 has two gluten-free guests. Make sure catering is aware.', color: 'bg-blue-100 text-blue-900', date: '1 week ago' },
    { id: '3', title: 'Photographer Shot List', content: 'Remember to ask for sunset photos by the lake.', color: 'bg-green-100 text-green-900', date: '3 weeks ago' },
    { id: '4', title: 'Florist Meeting', content: 'Discuss changing centerpieces to lower profile for better conversation.', color: 'bg-pink-100 text-pink-900', date: '1 month ago' },
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Vendor Contracts.pdf', size: '2.4 MB', type: 'PDF', date: 'Oct 24, 2024' },
    { id: '2', name: 'Seating Chart v2.png', size: '4.1 MB', type: 'IMG', date: 'Nov 01, 2024' },
    { id: '3', name: 'Menu Selection.docx', size: '1.2 MB', type: 'DOC', date: 'Oct 15, 2024' },
    { id: '4', name: 'Guest List Final.xlsx', size: '845 KB', type: 'XLS', date: 'Nov 05, 2024' },
    { id: '5', name: 'Run of Show.pdf', size: '1.8 MB', type: 'PDF', date: 'Nov 10, 2024' },
    { id: '6', name: 'Invoice #4022.pdf', size: '156 KB', type: 'PDF', date: 'Nov 12, 2024' },
  ]);

  // Handlers
  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Planning Task',
      due: 'Next Week',
      priority: 'Medium',
      completed: false,
      tag: 'General'
    };
    setTasks([newTask, ...tasks]);
  };

  const addNote = () => {
    const colors = ['bg-yellow-100 text-yellow-900', 'bg-blue-100 text-blue-900', 'bg-green-100 text-green-900', 'bg-pink-100 text-pink-900', 'bg-purple-100 text-purple-900'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: 'Click to edit this note...',
      color: randomColor,
      date: 'Just now'
    };
    setNotes([newNote, ...notes]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setDocuments([newDoc, ...documents]);
    }
  };

  const handleUpdateEvent = (updatedEvent: any) => {
    setCurrentEvent({ ...currentEvent, ...updatedEvent });
  };

  // Calculate budget stats
  const totalSpent = budget.items.reduce((sum, item) => sum + item.spentAmount, 0);
  const remainingBudget = budget.totalBudget - totalSpent;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 pt-12">
        {/* Header Section */}
        <button
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-3 h-3" />
          Collections
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-black bg-black text-white px-3 py-1 uppercase tracking-[0.2em]">Confirmed</span>
              <span className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.2em]">{event.eventType}</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-black dark:text-white uppercase tracking-tighter italic mb-6 leading-none">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              <div className="flex items-center gap-2"><CalendarDaysIcon className="w-4 h-4" /> {event.date}</div>
              <div className="flex items-center gap-2"><MapPinIcon className="w-4 h-4" /> {event.location}</div>
              <div className="flex items-center gap-2"><UserGroupIcon className="w-4 h-4" /> {event.guestCount} Guests</div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D0771E] transition-all rounded-xl shadow-xl shadow-gray-200 dark:shadow-none"
            >
              Edit Manifest
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-8 py-4 bg-white border-2 border-black text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all rounded-xl"
            >
              Share Concept
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-12">
          <PremiumTabs
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'vendors', label: 'Vendors' },
              { id: 'budget', label: 'Budget' },
              { id: 'guests', label: 'Guests' },
              { id: 'seating', label: 'Seating' },
              { id: 'tasks', label: 'Tasks' },
              { id: 'documents', label: 'Documents' },
              { id: 'notes', label: 'Notes' },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Right Column: Financials & Quick Actions */}
            <div className="lg:col-span-12 space-y-12">
              {/* Financial Allocation */}
              <section className="bg-black text-white p-10 rounded-[3rem] shadow-2xl shadow-orange-100 dark:shadow-none border-4 border-[#D0771E]">
                <h2 className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.3em] mb-8">Financial Allocation</h2>
                <div className="space-y-8">
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Authorized</div>
                    <div className="text-4xl font-black italic tracking-tighter">${budget.totalBudget.toLocaleString()}</div>
                  </div>
                  <div className="h-0.5 bg-gray-900 w-full" />
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Utilized</div>
                      <div className="text-xl font-black">${totalSpent.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Available</div>
                      <div className="text-xl font-black text-[#D0771E]">${remainingBudget.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                      <span>Progressive Spend</span>
                      <span>{Math.round((totalSpent / budget.totalBudget) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-1">
                      <div
                        className="bg-[#D0771E] h-1 rounded-full shadow-[0_0_10px_rgba(208,119,30,0.5)] dark:shadow-none transition-all duration-1000"
                        style={{ width: `${(totalSpent / budget.totalBudget) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/budget')}
                    className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] border border-[#D0771E] text-[#D0771E] hover:bg-[#D0771E] hover:text-white transition-all rounded-xl"
                  >
                    Enter Financial Portal
                  </button>
                </div>
              </section>

              {/* Concept Suite */}
              <section className="bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800">
                <h2 className="text-[10px] font-black text-black dark:text-white uppercase tracking-[0.3em] mb-8">Concept Suite</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => navigate('/website')} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl hover:shadow-lg dark:hover:shadow-none transition-all border border-transparent hover:border-orange-100 group">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-[#D0771E] group-hover:bg-[#D0771E] group-hover:text-white transition-colors">
                      <SparklesIcon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">Website Design</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase">92% Complete</div>
                    </div>
                  </button>
                  <button onClick={() => navigate('/vendors')} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl hover:shadow-lg dark:hover:shadow-none transition-all border border-transparent hover:border-orange-100 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ShoppingBagIcon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">Vendor Network</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase">12 Booked</div>
                    </div>
                  </button>
                  <button onClick={() => navigate('/tasks')} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl hover:shadow-lg dark:hover:shadow-none transition-all border border-transparent hover:border-orange-100 group">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <ClockIcon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">Operational Timeline</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase">4 Urgent</div>
                    </div>
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="space-y-8">
            {/* Countdown Section */}
            <div className="bg-gradient-to-r from-[#D0771E] to-orange-600 dark:from-[#B8651A] dark:to-orange-700 rounded-3xl p-12 text-white text-center">
              <div className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-90">Days Until Event</div>
              <div className="text-8xl font-black mb-4">45</div>
              <div className="text-sm font-bold opacity-90">{event.date} • {event.location}</div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight mb-12">Event Milestones</h2>

              <div className="space-y-8">
                {/* Timeline Item - Completed */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-black">✓</div>
                    <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-black text-black dark:text-white">Venue Booked</h3>
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Completed</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Garden Estate confirmed and deposit paid</p>
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500">3 months ago</span>
                  </div>
                </div>

                {/* Timeline Item - Completed */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-black">✓</div>
                    <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-black text-black dark:text-white">Invitations Sent</h3>
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Completed</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">150 invitations sent to guests</p>
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500">2 months ago</span>
                  </div>
                </div>

                {/* Timeline Item - In Progress */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#D0771E] flex items-center justify-center text-white font-black animate-pulse">!</div>
                    <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-black text-black dark:text-white">RSVP Deadline</h3>
                      <span className="text-xs font-bold text-[#D0771E]">In Progress</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Waiting for final guest confirmations</p>
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Due in 15 days</span>
                  </div>
                </div>

                {/* Timeline Item - Upcoming */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 font-black">○</div>
                    <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-black text-gray-400 dark:text-gray-500">Final Vendor Payments</h3>
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Upcoming</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Complete all vendor payments</p>
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Due in 30 days</span>
                  </div>
                </div>

                {/* Timeline Item - Upcoming */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 font-black">○</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-black text-gray-400 dark:text-gray-500">Event Day</h3>
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Upcoming</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">The big day arrives!</p>
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500">In 45 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === 'vendors' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight">Vendor Team</h2>
              <button
                onClick={() => navigate('/vendors')}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80 transition-all rounded-xl"
              >
                Browse Vendors
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { category: 'Venue', name: 'Grand Garden Estate', status: 'Booked', cost: '$15,000', image: 'bg-green-100' },
                { category: 'Catering', name: 'Divine Tastes', status: 'Booked', cost: '$12,500', image: 'bg-orange-100' },
                { category: 'Photography', name: 'Capture Moments', status: 'Booked', cost: '$4,200', image: 'bg-blue-100' },
                { category: 'Florist', name: 'Bloom & Wild', status: 'Contract Sent', cost: '$3,500', image: 'bg-pink-100' },
                { category: 'Music', name: 'Groove Band', status: 'Pending', cost: '$2,800', image: 'bg-purple-100' },
                { category: 'Transport', name: '-', status: 'Not Started', cost: '-', image: 'bg-gray-100' },
              ].map((vendor, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-none transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl ${vendor.image} flex items-center justify-center text-xl font-bold`}>
                      {vendor.category[0]}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${vendor.status === 'Booked' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      vendor.status === 'Not Started' ? 'bg-gray-100 dark:bg-gray-700 text-gray-400' :
                        'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                      }`}>
                      {vendor.status}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{vendor.category}</div>
                    <div className="text-lg font-bold text-black dark:text-white mb-1">{vendor.name}</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{vendor.cost}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div className="space-y-8">
            {/* Budget Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black text-white p-8 rounded-3xl">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Budget</div>
                <div className="text-3xl font-black mb-1">${budget.totalBudget.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Hard Cap</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Spent</div>
                <div className="text-3xl font-black text-black dark:text-white mb-1">${totalSpent.toLocaleString()}</div>
                <div className="text-xs text-gray-400">{Math.round((totalSpent / budget.totalBudget) * 100)}% utilized</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/10 p-8 rounded-3xl border border-orange-100 dark:border-orange-900/20">
                <div className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest mb-2">Remaining</div>
                <div className="text-3xl font-black text-[#D0771E] mb-1">${remainingBudget.toLocaleString()}</div>
                <div className="text-xs text-orange-400/80">Available to allocate</div>
              </div>
            </div>

            {/* Budget Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-[10px] font-black text-black dark:text-white uppercase tracking-[0.2em] mb-8">Category Breakdown</h3>
              <div className="space-y-6">
                {budget.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <div className="font-bold text-black dark:text-white mb-1">{item.category}</div>
                        <div className="text-xs text-gray-400 font-medium tracking-wide">
                          ${item.spentAmount.toLocaleString()} of ${item.allocatedAmount.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-black ${item.spentAmount > item.allocatedAmount ? 'text-red-500' : 'text-green-500'}`}>
                          {Math.round((item.spentAmount / item.allocatedAmount) * 100)}%
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${item.spentAmount > item.allocatedAmount ? 'bg-red-500' : 'bg-[#D0771E]'}`}
                        style={{ width: `${Math.min((item.spentAmount / item.allocatedAmount) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Guests Tab */}
        {activeTab === 'guests' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black text-white p-6 rounded-3xl">
                <div className="text-[10px] font-black tracking-widest uppercase mb-1 opacity-60">Total Guests</div>
                <div className="text-3xl font-black">{event.guestCount}</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-6 rounded-3xl">
                <div className="text-[10px] font-black tracking-widest uppercase mb-1 opacity-60">Confirmed</div>
                <div className="text-3xl font-black">{guests.filter(g => g.rsvpStatus === 'confirmed').length}</div>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 p-6 rounded-3xl">
                <div className="text-[10px] font-black tracking-widest uppercase mb-1 opacity-60">Pending</div>
                <div className="text-3xl font-black">{guests.filter(g => g.rsvpStatus === 'pending').length}</div>
              </div>
              <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-6 rounded-3xl">
                <div className="text-[10px] font-black tracking-widest uppercase mb-1 opacity-60">Declined</div>
                <div className="text-3xl font-black">{guests.filter(g => g.rsvpStatus === 'declined').length}</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-black text-black dark:text-white uppercase tracking-tight">Guest List</h3>
                <button
                  onClick={() => navigate('/guests')}
                  className="text-[10px] font-black uppercase tracking-widest text-[#D0771E] hover:text-black dark:hover:text-white transition-colors"
                >
                  Manage Guests →
                </button>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {guests.slice(0, 5).map((guest) => (
                  <div key={guest.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-500 dark:text-gray-400">
                        {guest.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-black dark:text-white">{guest.name}</div>
                        <div className="text-xs text-gray-400 font-medium">{guest.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${guest.rsvpStatus === 'confirmed' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                        guest.rsvpStatus === 'declined' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                          'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                        }`}>
                        {guest.rsvpStatus}
                      </span>
                      <div className="text-xs font-bold text-gray-400 w-8 text-center">+{guest.plusOnes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Seating Tab */}
        {activeTab === 'seating' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight">Seating Plan</h2>
              <button
                onClick={() => navigate('/seating')}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80 transition-all rounded-xl"
              >
                Open Seating Tool
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 min-h-[400px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((tableNum) => (
                  <div key={tableNum} className="relative aspect-square">
                    <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700 flex items-center justify-center flex-col z-10 w-2/3 h-2/3 m-auto">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Table</div>
                      <div className="text-2xl font-black text-black dark:text-white">{tableNum}</div>
                      <div className="text-xs font-bold text-[#D0771E] mt-1">8/8 Seats</div>
                    </div>
                    {/* Visual seats around table */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg) translate(90px) rotate(-${i * 45}deg)`
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight">Tasks Review</h2>
              <button
                onClick={addTask}
                className="px-6 py-3 bg-[#D0771E] text-white text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80 transition-all rounded-xl shadow-lg shadow-orange-500/20 dark:shadow-none flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" /> Add Task
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600'}`}>
                      {task.completed && <CheckCircleIcon className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-black dark:text-white'}`}>{task.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{task.tag}</span>
                        <span className={`text-[10px] font-bold ${task.due === 'Overdue' ? 'text-red-500' : 'text-gray-400'}`}>Due: {task.due}</span>
                        {task.completed && <span className="text-[10px] font-bold text-green-500">Completed</span>}
                      </div>
                    </div>
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${task.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                        task.priority === 'Medium' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                          'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}

                {tasks.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <p>No tasks yet. Add one to get started!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight">Event Documents</h2>
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80 transition-all rounded-xl flex items-center gap-2"
                >
                  <DocumentArrowUpIcon className="w-4 h-4" /> Upload New
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-none transition-all group cursor-pointer relative">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700/50 mb-6 flex items-center justify-center font-black text-xs text-gray-400 group-hover:bg-[#D0771E] group-hover:text-white transition-colors">
                    {doc.type}
                  </div>
                  <div className="font-bold text-black dark:text-white mb-2 truncate" title={doc.name}>{doc.name}</div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>{doc.size}</span>
                    <span>{doc.date}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDocuments(documents.filter(d => d.id !== doc.id));
                    }}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {documents.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl">
                  <p>No documents uploaded yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight">Event Notes</h2>
              <button
                onClick={addNote}
                className="px-6 py-3 bg-[#fef3c7] text-amber-900 text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80 transition-all rounded-xl border border-amber-200 flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" /> New Note
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div key={note.id} className={`${note.color} p-8 rounded-3xl shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none transition-all relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                  <h3 className="text-lg font-black mb-4">{note.title}</h3>
                  <p className="font-medium opacity-80 mb-6 leading-relaxed">{note.content}</p>
                  <div className="flex justify-between items-end">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      Last edited: {note.date}
                    </div>
                    <button
                      onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                      className="text-black/20 hover:text-red-600 transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {notes.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
                  <p>No notes yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={currentEvent}
        onSave={handleUpdateEvent}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={currentEvent.title}
        url={`https://ariya.com/events/${currentEvent.id}`}
      />
    </div >
  );
};

export default EventDetail;