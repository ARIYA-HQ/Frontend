import { useState, useMemo } from 'react';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CalendarIcon as CalendarIconOutline,
    PlusIcon,
    AdjustmentsHorizontalIcon,
    ClockIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';

interface Event {
    id: string;
    date: number;
    month: number; // 0-indexed
    year: number;
    title: string;
    color: string;
    company: string;
    location: string;
    time: string;
    clientEmail?: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    description?: string;
}

const VendorCalendar = () => {
    const [view, setView] = useState('Month');
    const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 1)); // Default to Sept 2024 for demo consistency
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [newEventForm, setNewEventForm] = useState<Partial<Event>>({
        title: '',
        company: '',
        location: '',
        time: '10:00 AM',
        status: 'pending',
        color: 'bg-orange-50 text-[#D0771E] border-orange-100'
    });

    const [events, setEvents] = useState<Event[]>([
        { id: '1', date: 30, month: 7, year: 2024, title: "Groomers appt.", color: "bg-orange-50 text-[#D0771E] border-orange-100", company: "PetCare", location: "Lagos", time: "09:00 AM", clientEmail: "care@petcare.com", status: 'confirmed', description: "Monthly grooming session for Max." },
        { id: '2', date: 3, month: 8, year: 2024, title: "Meeting w/ Chris", color: "bg-rose-50 text-rose-700 border-rose-100", company: "Chris & Co", location: "Remote", time: "11:30 AM", clientEmail: "chris@co.com", status: 'confirmed' },
        { id: '3', date: 5, month: 8, year: 2024, title: "Lunch w/ Mom", color: "bg-blue-50 text-blue-700 border-blue-100", company: "Family", location: "Abuja", time: "01:00 PM", status: 'confirmed' },
        { id: '4', date: 15, month: 8, year: 2024, title: "Unity Bank Retreat", color: "bg-orange-50 text-[#D0771E] border-orange-100", company: "Unity Bank", location: "Transcorp Hilton", time: "08:00 AM", clientEmail: "info@unitybank.com", status: 'confirmed' },
        { id: '5', date: 22, month: 8, year: 2024, title: "Important work meeting", color: "bg-rose-50 text-rose-700 border-rose-100", company: "Ariya HQ", location: "Office", time: "02:00 PM", status: 'pending' },
        { id: '6', date: 26, month: 8, year: 2024, title: "Wedding - Adele & John", color: "bg-orange-50 text-[#D0771E] border-orange-100", company: "Private Client", location: "Lagos Event Center", time: "12:00 PM", status: 'confirmed' },
    ]);

    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const fullDaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const calendarViews = ['Month', 'Week', 'Day', 'List'];

    // Date Logic Helpers
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const daysInPrevMonth = getDaysInMonth(year, month - 1);

        const grid = [];

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            grid.push({
                date: daysInPrevMonth - i,
                month: month === 0 ? 11 : month - 1,
                year: month === 0 ? year - 1 : year,
                type: 'prev'
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push({
                date: i,
                month: month,
                year: year,
                type: 'current'
            });
        }

        // Next month days
        const remaining = 42 - grid.length;
        for (let i = 1; i <= remaining; i++) {
            grid.push({
                date: i,
                month: month === 11 ? 0 : month + 1,
                year: month === 11 ? year + 1 : year,
                type: 'next'
            });
        }

        return grid;
    }, [currentDate]);

    // Week view logic
    const weekGrid = useMemo(() => {
        const grid = [];
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            grid.push({
                date: day.getDate(),
                month: day.getMonth(),
                year: day.getFullYear(),
                type: 'current'
            });
        }
        return grid;
    }, [currentDate]);

    const handlePrev = () => {
        if (view === 'Month') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        } else if (view === 'Week') {
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() - 7);
            setCurrentDate(nextDate);
        } else { // Day or List (for day, it's previous day)
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() - 1);
            setCurrentDate(nextDate);
        }
    };

    const handleNext = () => {
        if (view === 'Month') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        } else if (view === 'Week') {
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + 7);
            setCurrentDate(nextDate);
        } else { // Day or List (for day, it's next day)
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + 1);
            setCurrentDate(nextDate);
        }
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleAddEvent = () => {
        setNewEventForm({
            ...newEventForm,
            date: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear()
        });
        setShowNewEventModal(true);
    };

    const handleQuickAdd = (item: any) => {
        setNewEventForm({
            ...newEventForm,
            date: item.date,
            month: item.month,
            year: item.year
        });
        setShowNewEventModal(true);
    };

    const handleSaveNewEvent = () => {
        if (!newEventForm.title || !newEventForm.company) return;

        const newEvent: Event = {
            id: Math.random().toString(36).substr(2, 9),
            date: newEventForm.date || currentDate.getDate(),
            month: newEventForm.month || currentDate.getMonth(),
            year: newEventForm.year || currentDate.getFullYear(),
            title: newEventForm.title,
            color: newEventForm.color || "bg-orange-50 text-[#D0771E] border-orange-100",
            company: newEventForm.company,
            location: newEventForm.location || "TBD",
            time: newEventForm.time || "10:00 AM",
            status: 'pending',
            description: newEventForm.description
        };

        setEvents([...events, newEvent]);
        setShowNewEventModal(false);
        setNewEventForm({
            title: '',
            company: '',
            location: '',
            time: '10:00 AM',
            status: 'pending',
            color: 'bg-orange-50 text-[#D0771E] border-orange-100'
        });
    };

    const nextBooking = useMemo(() => {
        // Simple logic to find the next booking in the future relative to currentDate or actual current date
        const now = new Date();
        const sortedUpcoming = [...events]
            .filter(e => new Date(e.year, e.month, e.date) >= now)
            .sort((a, b) => new Date(a.year, a.month, a.date).getTime() - new Date(b.year, b.month, b.date).getTime());

        return sortedUpcoming[0] || null;
    }, [events]);

    const renderMonthView = () => (
        <div className="grid grid-cols-7 bg-white">
            {calendarGrid.map((item, idx) => {
                const dayEvents = events.filter(e => e.date === item.date && e.month === item.month && e.year === item.year);
                const isCurrentMonth = item.type === 'current';
                const today = new Date();
                const isToday = item.date === today.getDate() && item.month === today.getMonth() && item.year === today.getFullYear();

                return (
                    <div key={idx} className={`min-h-[160px] p-4 border-r border-b border-gray-50 last:border-r-0 transition-all hover:bg-orange-50/10 group ${!isCurrentMonth ? 'bg-gray-50/30' : ''}`}>
                        <div className="flex items-center justify-between mb-4">
                            <span
                                onClick={() => isCurrentMonth && setCurrentDate(new Date(item.year, item.month, item.date))}
                                className={`text-xs font-black leading-none w-8 h-8 flex items-center justify-center rounded-2xl cursor-pointer transition-all ${isToday ? 'bg-[#1D2939] text-white shadow-xl shadow-gray-200' :
                                    isCurrentMonth ? 'text-[#1D2939] group-hover:bg-white group-hover:shadow-sm' : 'text-gray-300'
                                    }`}>
                                {item.date}
                            </span>
                            {isCurrentMonth && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleQuickAdd(item);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-[#D0771E]"
                                >
                                    <PlusIcon className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            {dayEvents.slice(0, 3).map((event) => (
                                <div
                                    key={event.id}
                                    onClick={() => setSelectedEvent(event)}
                                    className={`${event.color} px-3 py-2 rounded-xl text-[9px] font-black truncate leading-tight cursor-pointer hover:shadow-sm border transition-all active:scale-95 uppercase tracking-tight`}
                                >
                                    {event.title}
                                </div>
                            ))}
                            {dayEvents.length > 3 && (
                                <button className="text-[9px] font-black text-[#D0771E] uppercase tracking-widest hover:underline w-full text-center mt-2 py-1">
                                    + {dayEvents.length - 3} more
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderWeekView = () => (
        <div className="grid grid-cols-7 bg-white divide-x divide-gray-50">
            {weekGrid.map((item, idx) => {
                const dayEvents = events.filter(e => e.date === item.date && e.month === item.month && e.year === item.year);
                return (
                    <div key={idx} className="min-h-[600px] p-6 group hover:bg-orange-50/5">
                        <div className="text-center mb-8">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{fullDaysOfWeek[idx]}</p>
                            <span className={`text-xl font-black w-10 h-10 flex items-center justify-center mx-auto rounded-2xl ${currentDate.getDate() === item.date && currentDate.getMonth() === item.month ? 'bg-[#1D2939] text-white shadow-lg shadow-gray-200' : 'text-[#1D2939]'
                                }`}>
                                {item.date}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {dayEvents.map(event => (
                                <div
                                    key={event.id}
                                    onClick={() => setSelectedEvent(event)}
                                    className={`${event.color} p-4 rounded-2xl border cursor-pointer hover:shadow-md transition-all active:scale-95`}
                                >
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{event.time}</p>
                                    <p className="text-xs font-black uppercase tracking-tight leading-tight">{event.title}</p>
                                    <p className="text-[9px] font-medium opacity-60 mt-1">{event.company}</p>
                                </div>
                            ))}
                            <button
                                onClick={() => handleQuickAdd(item)}
                                className="w-full py-3 border border-dashed border-gray-100 rounded-2xl text-[9px] font-black text-gray-400 uppercase tracking-widest hover:border-orange-200 hover:text-orange-400 transition-all opacity-0 group-hover:opacity-100"
                            >
                                <PlusIcon className="w-4 h-4 mx-auto" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderDayView = () => {
        const dayEvents = events.filter(e => e.date === currentDate.getDate() && e.month === currentDate.getMonth() && e.year === currentDate.getFullYear());
        return (
            <div className="bg-white p-10 min-h-[600px]">
                <div className="flex items-center gap-6 mb-12">
                    <span className="text-6xl font-black text-[#1D2939] leading-none">{currentDate.getDate()}</span>
                    <div>
                        <p className="text-xl font-black text-[#1D2939] uppercase tracking-widest">{fullDaysOfWeek[currentDate.getDay()]}</p>
                        <p className="text-sm font-black text-[#D0771E] uppercase tracking-widest">{months[currentDate.getMonth()]}, {currentDate.getFullYear()}</p>
                    </div>
                </div>
                <div className="space-y-6">
                    {dayEvents.length > 0 ? dayEvents.map(event => (
                        <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`${event.color} p-8 rounded-[32px] border flex items-center justify-between hover:shadow-lg transition-all cursor-pointer`}
                        >
                            <div className="flex gap-10 items-center">
                                <div className="text-center min-w-[80px]">
                                    <p className="text-sm font-black uppercase tracking-widest">{event.time}</p>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">START</p>
                                </div>
                                <div className="h-10 w-px bg-current opacity-20"></div>
                                <div>
                                    <h4 className="text-2xl font-black uppercase tracking-tight mb-2">{event.title}</h4>
                                    <div className="flex gap-4 items-center">
                                        <p className="flex items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                                            <AdjustmentsHorizontalIcon className="w-3 h-3 mr-1" /> {event.company}
                                        </p>
                                        <p className="flex items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                                            <MapPinIcon className="w-3 h-3 mr-1" /> {event.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Button className="rounded-2xl h-12 px-8">View Details</Button>
                        </div>
                    )) : (
                        <div className="text-center py-20 border-2 border-dashed border-gray-50 rounded-[40px]">
                            <p className="text-sm font-black text-gray-300 uppercase tracking-widest">No events scheduled for today</p>
                            <Button variant="outline" className="mt-6 rounded-2xl" onClick={handleAddEvent}>Schedule Something</Button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderListView = () => {
        const sortedEvents = [...events].sort((a, b) => {
            return new Date(a.year, a.month, a.date).getTime() - new Date(b.year, b.month, b.date).getTime();
        });

        return (
            <div className="bg-white divide-y divide-gray-50">
                {sortedEvents.map(event => (
                    <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className="p-8 hover:bg-gray-50/50 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                        <div className="flex items-center gap-12">
                            <div className="text-center min-w-[60px]">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{months[event.month].substring(0, 3)}</p>
                                <p className="text-2xl font-black text-[#1D2939] leading-none">{event.date}</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-black uppercase tracking-tight mb-1">{event.title}</h4>
                                <div className="flex gap-4">
                                    <p className="flex items-center text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#D0771E] transition-colors">
                                        <ClockIcon className="w-3 h-3 mr-1" /> {event.time}
                                    </p>
                                    <p className="flex items-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                        <MapPinIcon className="w-3 h-3 mr-1" /> {event.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest ${event.color} border`}>
                                {event.status}
                            </span>
                            <Button variant="outline" className="h-10 w-10 p-0 rounded-xl group-hover:border-[#D0771E] group-hover:text-[#D0771E] transition-all">
                                <ChevronRightIcon className="w-4 h-4 mx-auto" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderModal = () => {
        if (!selectedEvent) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2939]/40 backdrop-blur-sm animate-in fade-in duration-300">
                <PremiumCard className="w-full max-w-xl p-0 overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl">
                    <div className={`${selectedEvent.color} px-10 py-12 border-b`}>
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <span className="bg-white/50 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">
                                    {selectedEvent.status}
                                </span>
                                <h3 className="text-3xl font-black uppercase tracking-tight">{selectedEvent.title}</h3>
                            </div>
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="p-3 hover:bg-black/5 rounded-2xl transition-colors"
                            >
                                <PlusIcon className="w-6 h-6 rotate-45" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Date & Time</p>
                                <p className="text-sm font-black uppercase tracking-tight">
                                    {months[selectedEvent.month]} {selectedEvent.date}, {selectedEvent.year} • {selectedEvent.time}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Location</p>
                                <p className="text-sm font-black uppercase tracking-tight">{selectedEvent.location}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-10 bg-white">
                        <div className="mb-10">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Client Details</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                                    <span className="text-xl font-black text-[#1D2939]">{selectedEvent.company[0]}</span>
                                </div>
                                <div>
                                    <h4 className="text-base font-black uppercase tracking-tight">{selectedEvent.company}</h4>
                                    <p className="text-xs text-gray-500">{selectedEvent.clientEmail || "No email provided"}</p>
                                </div>
                            </div>
                        </div>
                        {selectedEvent.description && (
                            <div className="mb-10">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Notes</p>
                                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{selectedEvent.description}</p>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="rounded-2xl h-14 uppercase text-[10px] tracking-widest border-gray-100">
                                Message Client
                            </Button>
                            <Button className="rounded-2xl h-14 uppercase text-[10px] tracking-widest shadow-orange-100">
                                Edit Details
                            </Button>
                            <Button variant="outline" className="rounded-2xl h-14 uppercase text-[10px] tracking-widest border-gray-100">
                                Reschedule
                            </Button>
                            <Button variant="destructive" className="rounded-2xl h-14 uppercase text-[10px] tracking-widest shadow-red-50">
                                Cancel Booking
                            </Button>
                        </div>
                    </div>
                </PremiumCard>
            </div>
        );
    };

    const renderNewEventModal = () => {
        if (!showNewEventModal) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2939]/40 backdrop-blur-sm animate-in fade-in duration-300">
                <PremiumCard className="w-full max-w-xl p-0 animate-in zoom-in-95 duration-300 shadow-2xl overflow-hidden">
                    <div className="px-10 py-10 bg-[#F3F0EB]/30 border-b flex justify-between items-center">
                        <h3 className="text-2xl font-black uppercase tracking-tighter">New Booking</h3>
                        <button
                            onClick={() => setShowNewEventModal(false)}
                            className="p-3 hover:bg-black/5 rounded-2xl transition-colors"
                        >
                            <PlusIcon className="w-6 h-6 rotate-45" />
                        </button>
                    </div>
                    <div className="p-10 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Event Title</label>
                            <input
                                type="text"
                                value={newEventForm.title}
                                onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                                placeholder="e.g. Wedding - Adele & John"
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black uppercase"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Client / Company</label>
                                <input
                                    type="text"
                                    value={newEventForm.company}
                                    onChange={(e) => setNewEventForm({ ...newEventForm, company: e.target.value })}
                                    placeholder="e.g. Private Client"
                                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</label>
                                <input
                                    type="text"
                                    value={newEventForm.time}
                                    onChange={(e) => setNewEventForm({ ...newEventForm, time: e.target.value })}
                                    placeholder="e.g. 12:00 PM"
                                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black uppercase"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</label>
                            <input
                                type="text"
                                value={newEventForm.location}
                                onChange={(e) => setNewEventForm({ ...newEventForm, location: e.target.value })}
                                placeholder="e.g. Lagos Event Center"
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black uppercase"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description (Optional)</label>
                            <textarea
                                value={newEventForm.description}
                                onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                                placeholder="Add notes about this booking..."
                                className="w-full h-32 p-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-medium resize-none"
                            />
                        </div>
                        <div className="pt-4 flex gap-4">
                            <Button variant="outline" className="flex-1 rounded-2xl h-14 border-gray-100" onClick={() => setShowNewEventModal(false)}>
                                Cancel
                            </Button>
                            <Button className="flex-1 rounded-2xl h-14 shadow-orange-100" onClick={handleSaveNewEvent}>
                                Save Booking
                            </Button>
                        </div>
                    </div>
                </PremiumCard>
            </div>
        );
    };

    return (
        <div className="max-w-[1600px] mx-auto px-8 py-8 flex flex-col gap-10">
            {renderModal()}
            {renderNewEventModal()}
            <PageHeader
                breadcrumb="Operations"
                title="Calendar"
                subtitle="Track bookings, inquiries, and availability"
                actions={
                    <div className="flex gap-4">
                        <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100" onClick={handleToday}>
                            Today
                        </Button>
                        <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100">
                            <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
                            Settings
                        </Button>
                        <Button className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100" onClick={handleAddEvent}>
                            <PlusIcon className="w-5 h-5 mr-2" />
                            New Event
                        </Button>
                    </div>
                }
            />

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Panel: Mini Calendar */}
                <div className="w-full lg:w-96 space-y-8">
                    <PremiumCard className="p-10">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-sm font-black text-[#1D2939] uppercase tracking-widest">
                                {months[currentDate.getMonth()].substring(0, 3)} {currentDate.getFullYear()}
                            </h2>
                            <div className="flex gap-1">
                                <button onClick={handlePrev} className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400">
                                    <ChevronLeftIcon className="w-4 h-4" />
                                </button>
                                <button onClick={handleNext} className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400">
                                    <ChevronRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-y-6 text-center">
                            {daysOfWeek.map((day, idx) => (
                                <span key={idx} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{day}</span>
                            ))}
                            {calendarGrid.map((item, idx) => (
                                <div key={idx} className="h-10 flex items-center justify-center">
                                    <span
                                        onClick={() => {
                                            setCurrentDate(new Date(item.year, item.month, item.date));
                                            if (item.type !== 'current') setView('Month');
                                        }}
                                        className={`text-xs font-black cursor-pointer rounded-2xl w-9 h-9 flex items-center justify-center transition-all ${currentDate.getDate() === item.date && currentDate.getMonth() === item.month && item.type === 'current'
                                            ? 'bg-[#1D2939] text-white shadow-xl shadow-gray-200'
                                            : item.type === 'current'
                                                ? 'text-gray-500 hover:bg-gray-50'
                                                : 'text-gray-200 opacity-50'
                                            }`}>
                                        {item.date}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </PremiumCard>

                    <PremiumCard
                        className="p-10 bg-gradient-to-br from-[#1D2939] to-[#2D3848] text-white cursor-pointer group"
                        onClick={() => nextBooking && setSelectedEvent(nextBooking)}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/10 rounded-xl">
                                <CalendarIconOutline className="w-5 h-5 text-[#D0771E]" />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-widest">Next Booking</h3>
                        </div>
                        <div className="space-y-4">
                            {nextBooking ? (
                                <>
                                    <div>
                                        <h4 className="text-xl font-black mb-1 group-hover:text-[#D0771E] transition-colors">{nextBooking.title}</h4>
                                        <p className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest opacity-90">
                                            {months[nextBooking.month].substring(0, 3)} {nextBooking.date} • {nextBooking.location}
                                        </p>
                                    </div>
                                    <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10 text-[9px] font-black uppercase tracking-widest">
                                        View Details
                                    </Button>
                                </>
                            ) : (
                                <p className="text-xs font-medium text-white/60">No upcoming bookings found.</p>
                            )}
                        </div>
                    </PremiumCard>
                </div>

                {/* Right Panel: Main Calendar */}
                <div className="flex-1">
                    <PremiumCard className="overflow-hidden">
                        {/* Calendar Sub-header */}
                        <div className="px-10 py-8 flex items-center justify-between border-b border-gray-50 bg-[#F3F0EB]/30">
                            <div className="flex items-center gap-8">
                                <h2 className="text-2xl font-black text-[#1D2939] uppercase tracking-tighter">
                                    {view === 'Month' ? `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}` :
                                        view === 'Week' ? `Week of ${currentDate.getDate()} ${months[currentDate.getMonth()].substring(0, 3)} ${currentDate.getFullYear()}` :
                                            `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
                                </h2>
                                <div className="flex bg-white rounded-2xl p-1 border border-gray-100 shadow-sm">
                                    <button onClick={handlePrev} className="p-2 hover:text-[#D0771E] transition-colors">
                                        <ChevronLeftIcon className="w-5 h-5" />
                                    </button>
                                    <div className="w-px h-6 bg-gray-50 my-auto mx-1"></div>
                                    <button onClick={handleNext} className="p-2 hover:text-[#D0771E] transition-colors">
                                        <ChevronRightIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex bg-gray-100 rounded-[20px] p-1.5 border border-gray-200 shadow-inner">
                                {calendarViews.map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => setView(v)}
                                        className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${view === v ? 'bg-white text-[#1D2939] shadow-md ring-1 ring-gray-100' : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Calendar Grid Header (Only for Month/Week) */}
                        {(view === 'Month' || view === 'Week') && (
                            <div className="grid grid-cols-7 border-b border-gray-50 bg-white">
                                {fullDaysOfWeek.map((day, idx) => (
                                    <div key={idx} className="py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-r border-gray-50 last:border-r-0">
                                        {day}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* View Content Rendering */}
                        <div className="bg-white">
                            {view === 'Month' && renderMonthView()}
                            {view === 'Week' && renderWeekView()}
                            {view === 'Day' && renderDayView()}
                            {view === 'List' && renderListView()}
                        </div>
                    </PremiumCard>
                </div>
            </div>
        </div>
    );
};

export default VendorCalendar;
