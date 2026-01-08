import { useState, useMemo, useEffect } from 'react';
import {
    PhotoIcon,
    VideoCameraIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    TrophyIcon,
    EyeIcon,
    Squares2X2Icon,
    ListBulletIcon,
    ShareIcon,
    ArrowUpTrayIcon,
    TrashIcon,
    CheckCircleIcon,
    XMarkIcon,
    ArrowLeftIcon,
    StarIcon as StarOutlineIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import PageHeader from '../../../components/ui/PageHeader';
import StatCard from '../../../components/dashboard/StatCard';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';
import PremiumTabs from '../../../components/ui/PremiumTabs';

// Initial Mock Data
const INITIAL_EVENTS = [
    { id: 1, name: 'Modern Minimalist Wedding', date: 'Oct 2024', location: 'Lagos, Nigeria', mediaCount: 24, cover: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop' },
    { id: 2, name: 'Classic Garden Ceremony', date: 'Sep 2024', location: 'Abuja, Nigeria', mediaCount: 18, cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
    { id: 3, name: 'Urban Industrial Reception', date: 'Aug 2024', location: 'Lagos, Nigeria', mediaCount: 32, cover: 'https://images.unsplash.com/photo-1465495910483-0d674b0b700e?q=80&w=800&auto=format&fit=crop' },
];

const INITIAL_MEDIA = [
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop', eventId: 1, event: 'Modern Minimalist Wedding', date: 'Oct 12, 2024', featured: true, size: 'large' },
    { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', eventId: 2, event: 'Classic Garden Ceremony', date: 'Sep 24, 2024', featured: false, size: 'small' },
    { id: 3, type: 'video', url: 'https://images.unsplash.com/photo-1465495910483-0d674b0b700e?q=80&w=800&auto=format&fit=crop', eventId: 3, event: 'Urban Industrial Reception', date: 'Aug 15, 2024', featured: true, size: 'medium' },
    { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop', eventId: 1, event: 'Modern Minimalist Wedding', date: 'Oct 15, 2024', featured: false, size: 'medium' },
    { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800&auto=format&fit=crop', eventId: 2, event: 'Classic Garden Ceremony', date: 'Sep 28, 2024', featured: false, size: 'small' },
    { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop', eventId: 3, event: 'Urban Industrial Reception', date: 'Aug 20, 2024', featured: true, size: 'large' },
];

const VendorPortfolio = () => {
    // State Management
    const [events, setEvents] = useState(INITIAL_EVENTS);
    const [media, setMedia] = useState(INITIAL_MEDIA);
    const [activeTab, setActiveTab] = useState('By Event');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    // Upload Modal States
    const [uploadStep, setUploadStep] = useState<'select' | 'details' | 'uploading' | 'success'>('select');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<{ url: string; type: string }[]>([]);
    const [newMediaDetails, setNewMediaDetails] = useState({ eventId: '', description: '', type: 'image' });

    // New Event Modal State
    const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
    const [newEventDetails, setNewEventDetails] = useState({ name: '', location: '', date: '' });

    // Management State
    const [isManagementMode, setIsManagementMode] = useState(false);
    const [selectedMediaIds, setSelectedMediaIds] = useState<Set<number>>(new Set());
    const [isPlannerView, setIsPlannerView] = useState(false);

    // Toast/Feedback state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const tabs = [
        { id: 'By Event', label: 'Events' },
        { id: 'All Media', label: 'All Media' },
        { id: 'Featured', label: 'Featured' },
    ];

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    // Derived Data
    const filteredEvents = useMemo(() => {
        return events.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [events, searchQuery]);

    const filteredMedia = useMemo(() => {
        let result = media;
        if (selectedEventId) {
            result = result.filter(m => m.eventId === selectedEventId);
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(m =>
                m.event.toLowerCase().includes(query) ||
                (events.find(e => e.id === m.eventId)?.location.toLowerCase().includes(query))
            );
        }
        if (activeTab === 'Featured') {
            result = result.filter(m => m.featured);
        }
        return result;
    }, [media, searchQuery, selectedEventId, activeTab, events]);

    // Masonry Column Calculation
    const masonryColumns = useMemo(() => {
        const cols: any[][] = [[], [], [], []]; // 4 columns for LG
        filteredMedia.forEach((item, idx) => {
            cols[idx % 4].push(item);
        });
        return cols;
    }, [filteredMedia]);

    const stats = useMemo(() => [
        { label: 'Total Events', value: events.length.toString(), icon: TrophyIcon, color: 'bg-orange-500' },
        { label: 'Media Items', value: media.length.toString(), icon: PhotoIcon, color: 'bg-blue-500' },
        { label: 'Portfolio Views', value: '1.2k', icon: EyeIcon, color: 'bg-purple-500' },
        { label: 'Featured Items', value: media.filter(m => m.featured).length.toString(), icon: StarSolidIcon, color: 'bg-rose-500' },
    ], [events, media]);

    // Handlers
    const handleToggleFeatured = (mediaId: number) => {
        setMedia(prev => prev.map(m => m.id === mediaId ? { ...m, featured: !m.featured } : m));
        const item = media.find(m => m.id === mediaId);
        setToast({ message: item?.featured ? 'Removed from featured' : 'Marked as featured', type: 'success' });
    };

    const handleDeleteMedia = (mediaId: number) => {
        if (window.confirm('Are you sure you want to delete this portfolio piece?')) {
            setMedia(prev => prev.filter(m => m.id !== mediaId));
            setToast({ message: 'Portfolio piece deleted', type: 'success' });
        }
    };

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const newFiles = Array.from(files);
        setSelectedFiles(prev => [...prev, ...newFiles]);

        const newPreviews = newFiles.map(file => ({
            url: URL.createObjectURL(file),
            type: file.type.startsWith('video') ? 'video' : 'image'
        }));
        setFilePreviews(prev => [...prev, ...newPreviews]);
        setUploadStep('details');
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    const handleStartUpload = () => {
        document.getElementById('portfolio-file-input')?.click();
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleFiles(e.dataTransfer.files);
    };

    const handleToggleSelect = (mediaId: number) => {
        const next = new Set(selectedMediaIds);
        if (next.has(mediaId)) next.delete(mediaId);
        else next.add(mediaId);
        setSelectedMediaIds(next);
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedMediaIds.size} items?`)) {
            setMedia(prev => prev.filter(m => !selectedMediaIds.has(m.id)));
            setToast({ message: `${selectedMediaIds.size} items deleted`, type: 'success' });
            setSelectedMediaIds(new Set());
            setIsManagementMode(false);
        }
    };

    const handleBulkFeature = () => {
        setMedia(prev => prev.map(m => selectedMediaIds.has(m.id) ? { ...m, featured: true } : m));
        setToast({ message: `${selectedMediaIds.size} items featured`, type: 'success' });
        setSelectedMediaIds(new Set());
        setIsManagementMode(false);
    };

    const handleUploadAction = () => {
        if (!newMediaDetails.eventId) {
            setToast({ message: 'Please select or create an event', type: 'error' });
            return;
        }
        setUploadStep('uploading');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                // Complete batch upload
                const event = events.find(e => e.id === Number(newMediaDetails.eventId));
                const newItems = filePreviews.map((preview, index) => ({
                    id: Math.max(...media.map(m => m.id), 0) + index + 1,
                    type: preview.type,
                    url: preview.url,
                    eventId: Number(newMediaDetails.eventId),
                    event: event?.name || 'Untitled Event',
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                    featured: false,
                    size: 'medium'
                }));
                setMedia(prev => [...newItems, ...prev]);
                setUploadStep('success');
            }
        }, 50);
    };

    const handleCreateEvent = () => {
        if (!newEventDetails.name || !newEventDetails.location) {
            setToast({ message: 'Please fill in event details', type: 'error' });
            return;
        }
        const newEvent = {
            id: events.length + 1,
            name: newEventDetails.name,
            location: newEventDetails.location,
            date: newEventDetails.date || 'Jan 2024',
            mediaCount: 0,
            cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop'
        };
        setEvents(prev => [...prev, newEvent]);
        setToast({ message: 'New event category created', type: 'success' });
        setIsNewEventModalOpen(false);
        setNewEventDetails({ name: '', location: '', date: '' });
    };

    const resetModal = () => {
        setIsUploadModalOpen(false);
        setUploadStep('select');
        setUploadProgress(0);
        setSelectedFiles([]);
        setFilePreviews([]);
        setNewMediaDetails({ eventId: '', description: '', type: 'image' });
    };

    const renderMediaItem = (item: any) => {
        const isSelected = selectedMediaIds.has(item.id);

        return (
            <div
                key={item.id}
                className={`group relative rounded-[32px] overflow-hidden bg-gray-100 dark:bg-gray-800 transition-all duration-500 hover:scale-[1.02] animate-in zoom-in-95 
                    ${isSelected ? 'ring-4 ring-[#D0771E] ring-offset-4 dark:ring-offset-gray-900' : ''}`}
                onClick={() => isManagementMode && handleToggleSelect(item.id)}
            >
                {item.type === 'video' ? (
                    <div className="w-full h-full aspect-[4/5] bg-black">
                        <video
                            src={item.url}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                        />
                    </div>
                ) : (
                    <img src={item.url} alt={item.event} className="w-full h-full object-cover aspect-[4/5]" />
                )}

                {/* Selection Overlay */}
                {isManagementMode && (
                    <div className="absolute top-4 right-4 z-10">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#D0771E] border-[#D0771E]' : 'bg-black/20 border-white'}`}>
                            {isSelected && <CheckCircleIcon className="w-6 h-6 text-white" />}
                        </div>
                    </div>
                )}

                {!isManagementMode && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                {item.type === 'video' ? <VideoCameraIcon className="w-4 h-4 text-white" /> : <PhotoIcon className="w-4 h-4 text-white" />}
                                <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">{item.date}</span>
                            </div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-tight leading-tight">{item.event}</h4>
                        </div>
                        <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleToggleFeatured(item.id); }}
                                    className={`transition-colors ${item.featured ? 'text-rose-500' : 'text-white hover:text-rose-500'}`}
                                >
                                    {item.featured ? <StarSolidIcon className="w-5 h-5" /> : <StarOutlineIcon className="w-5 h-5" />}
                                </button>
                                <button className="text-white hover:text-[#D0771E] transition-colors">
                                    <ShareIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteMedia(item.id); }}
                                    className="text-white/40 hover:text-red-500 transition-colors p-1"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {item.featured && !isManagementMode && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-rose-500 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg dark:shadow-none animate-in fade-in zoom-in">
                        Featured Item
                    </div>
                )}
            </div>
        );
    };

    const renderEventCard = (event: any) => (
        <PremiumCard key={event.id} className="p-0 overflow-hidden border-none shadow-none group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative h-64 overflow-hidden rounded-t-[32px]" onClick={() => { setSelectedEventId(event.id); setActiveTab('All Media'); }}>
                <img src={event.cover} alt={event.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 rounded-full text-[10px]">
                        View Media
                    </Button>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-xl border border-white/30">
                    {media.filter(m => m.eventId === event.id).length} Items
                </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-b-[32px] transition-colors">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h4 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-tight hover:text-[#D0771E] transition-colors" onClick={() => { setSelectedEventId(event.id); setActiveTab('All Media'); }}>{event.name}</h4>
                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{event.location} • {event.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </PremiumCard>
    );

    const renderUploadModal = () => {
        if (!isUploadModalOpen) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2939]/40 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-[48px] shadow-2xl dark:shadow-none overflow-hidden border border-gray-100 dark:border-gray-800">
                    <div className="p-10 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-[#F3F0EB]/30 dark:bg-gray-800/50">
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1D2939] dark:text-white">
                            {uploadStep === 'success' ? 'Upload Complete!' : 'Add Portfolio Piece'}
                        </h3>
                        <button onClick={resetModal} className="p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-colors">
                            <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    <div className="p-10">
                        {uploadStep === 'select' && (
                            <div className="space-y-8 animate-in slide-in-from-bottom-4">
                                <input
                                    type="file"
                                    id="portfolio-file-input"
                                    className="hidden"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleFileSelect}
                                />
                                <div
                                    onClick={handleStartUpload}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    className="aspect-[16/9] bg-gray-50 dark:bg-gray-800/50 rounded-[32px] border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-[#D0771E] hover:bg-[#D0771E]/5 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-3xl shadow-sm dark:shadow-none flex items-center justify-center group-hover:scale-110 group-hover:bg-[#D0771E] transition-all duration-500">
                                        <ArrowUpTrayIcon className="w-8 h-8 text-[#D0771E] group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="text-center space-y-1">
                                        <p className="text-[11px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest group-hover:text-[#D0771E] transition-colors">Select or Drop files to upload</p>
                                        <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest leading-loose">PNG, JPG, MP4 or WEBM. MAX 20MB.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {uploadStep === 'details' && (
                            <div className="space-y-10 animate-in slide-in-from-right-4">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                        Batch Preview ({filePreviews.length} items)
                                    </label>
                                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                        {filePreviews.map((preview, idx) => (
                                            <div key={idx} className="flex-shrink-0 w-32 aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative group">
                                                {preview.type === 'video' ? (
                                                    <video src={preview.url} className="w-full h-full object-cover" />
                                                ) : (
                                                    <img src={preview.url} alt="Preview" className="w-full h-full object-cover" />
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setFilePreviews(prev => prev.filter((_, i) => i !== idx));
                                                        setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
                                                        if (filePreviews.length <= 1) setUploadStep('select');
                                                    }}
                                                    className="absolute top-2 right-2 p-1.5 bg-black/40 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <XMarkIcon className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={handleStartUpload}
                                            className="flex-shrink-0 w-32 aspect-[4/5] bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-[#D0771E] transition-colors"
                                        >
                                            <PlusIcon className="w-6 h-6 text-gray-300" />
                                            <span className="text-[8px] font-black uppercase text-gray-400">Add More</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Assign Batch to Event</label>
                                            <select
                                                value={newMediaDetails.eventId}
                                                onChange={(e) => {
                                                    if (e.target.value === 'new') {
                                                        setIsNewEventModalOpen(true);
                                                    } else {
                                                        setNewMediaDetails(prev => ({ ...prev, eventId: e.target.value }));
                                                    }
                                                }}
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-xs font-black uppercase tracking-widest text-[#1D2939] dark:text-white outline-none"
                                            >
                                                <option value="">Select an event...</option>
                                                {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                                                <option value="new" className="text-[#D0771E]">+ Create New Event Category</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Global Batch Description</label>
                                            <textarea
                                                value={newMediaDetails.description}
                                                onChange={(e) => setNewMediaDetails(prev => ({ ...prev, description: e.target.value }))}
                                                placeholder="Describe these memories..."
                                                className="w-full h-24 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-medium text-[#1D2939] dark:text-white outline-none resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 h-14 rounded-2xl border-gray-100 dark:border-gray-700" onClick={() => { setUploadStep('select'); setFilePreviews([]); setSelectedFiles([]); }}>Clear Batch</Button>
                                    <Button
                                        isDisabled={!newMediaDetails.eventId}
                                        onClick={handleUploadAction}
                                        className="flex-1 h-14 rounded-2xl bg-[#D0771E] text-white disabled:opacity-50"
                                    >
                                        Publish Batch
                                    </Button>
                                </div>
                            </div>
                        )}

                        {uploadStep === 'uploading' && (
                            <div className="py-20 flex flex-col items-center justify-center gap-8 animate-in zoom-in-95">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle className="text-gray-100 dark:text-gray-800 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                                        <circle
                                            className="text-[#D0771E] stroke-current transition-all duration-300 ease-out"
                                            strokeWidth="8"
                                            strokeDasharray={251.2}
                                            strokeDashoffset={251.2 - (251.2 * uploadProgress) / 100}
                                            strokeLinecap="round"
                                            cx="50" cy="50" r="40" fill="transparent"
                                        ></circle>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-[#1D2939] dark:text-white">
                                        {uploadProgress}%
                                    </div>
                                </div>
                                <p className="text-[11px] font-black text-[#D0771E] uppercase tracking-[0.2em] animate-pulse">Uploading Media...</p>
                            </div>
                        )}

                        {uploadStep === 'success' && (
                            <div className="py-10 flex flex-col items-center justify-center gap-6 animate-in zoom-in-95">
                                <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center">
                                    <CheckCircleIcon className="w-16 h-16 text-green-500" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h4 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Showcase Updated!</h4>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest leading-loose">Your work is now live and visible to planners.</p>
                                </div>
                                <Button className="w-full h-14 rounded-2xl bg-[#1D2939] dark:bg-gray-700 text-white mt-4" onClick={resetModal}>Return to Portfolio</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8 sm:gap-10 min-h-screen">
            {renderUploadModal()}

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-bottom-10">
                    <div className="px-6 py-4 bg-[#1D2939] text-white rounded-2xl shadow-2xl flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{toast.message}</span>
                    </div>
                </div>
            )}

            <PageHeader
                breadcrumb={selectedEventId ? `Portfolio > ${events.find(e => e.id === selectedEventId)?.name}` : (isPlannerView ? "Preview Mode" : "Operations")}
                title={selectedEventId ? "Event Showcase" : (isPlannerView ? "Live Portfolio" : "Portfolio")}
                subtitle={selectedEventId ? "Comprehensive view of all media for this collaboration" : (isPlannerView ? "This is how planners see your profile" : "Curate and showcase your best event experiences")}
                actions={
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            className={`h-12 px-6 rounded-2xl border-gray-100 dark:border-gray-700 transition-all ${isPlannerView ? 'bg-[#D0771E] text-white border-[#D0771E]' : 'bg-white dark:bg-gray-800 text-[#1D2939] dark:text-white'}`}
                            onClick={() => setIsPlannerView(!isPlannerView)}
                        >
                            <EyeIcon className="w-5 h-5 mr-2" />
                            {isPlannerView ? "Back to Editor" : "Planner View"}
                        </Button>
                        {!isPlannerView && (
                            <>
                                <Button
                                    variant="outline"
                                    className={`h-12 px-6 rounded-2xl border-gray-100 dark:border-gray-700 transition-all ${isManagementMode ? 'bg-[#1D2939] text-white border-[#1D2939]' : 'bg-white dark:bg-gray-800 text-[#1D2939] dark:text-white'}`}
                                    onClick={() => {
                                        setIsManagementMode(!isManagementMode);
                                        setSelectedMediaIds(new Set());
                                    }}
                                >
                                    {isManagementMode ? <CheckCircleIcon className="w-5 h-5 mr-2" /> : <Squares2X2Icon className="w-5 h-5 mr-2" />}
                                    {isManagementMode ? "Done Managing" : "Manage Portfolio"}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-12 px-6 rounded-2xl border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1D2939] dark:text-white"
                                    onClick={() => setIsNewEventModalOpen(true)}
                                >
                                    <PlusIcon className="w-5 h-5 mr-2" strokeWidth={2.5} />
                                    New Event
                                </Button>
                                <Button className="h-12 px-8 rounded-2xl shadow-[0_12px_24px_-10px_rgba(208,119,30,0.4)] dark:shadow-none bg-[#D0771E] text-white hover:bg-[#B6681A] transition-all" onClick={() => setIsUploadModalOpen(true)}>
                                    <ArrowUpTrayIcon className="w-5 h-5 mr-2" strokeWidth={2.5} />
                                    Upload Media
                                </Button>
                            </>
                        )}
                    </div>
                }
            />

            {/* Bulk Actions Bar */}
            {isManagementMode && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-bottom-20 duration-500">
                    <div className="px-10 py-6 bg-[#1D2939] dark:bg-gray-800 text-white rounded-[40px] shadow-[0_32px_64px_-20px_rgba(0,0,0,0.4)] flex items-center gap-12 border border-white/10 backdrop-blur-xl">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Selected</span>
                            <span className="text-xl font-black">{selectedMediaIds.size} Items</span>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="flex items-center gap-6">
                            <button
                                disabled={selectedMediaIds.size === 0}
                                onClick={handleBulkFeature}
                                className="flex flex-col items-center gap-1 group disabled:opacity-30 transition-all hover:scale-110"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                                    <StarSolidIcon className="w-6 h-6" />
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-widest">Feature</span>
                            </button>
                            <button
                                disabled={selectedMediaIds.size === 0}
                                className="flex flex-col items-center gap-1 group disabled:opacity-30 transition-all hover:scale-110"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#D0771E] transition-colors">
                                    <ShareIcon className="w-6 h-6" />
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-widest">Share</span>
                            </button>
                            <button
                                disabled={selectedMediaIds.size === 0}
                                onClick={handleBulkDelete}
                                className="flex flex-col items-center gap-1 group disabled:opacity-30 transition-all hover:scale-110"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                                    <TrashIcon className="w-6 h-6" />
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-widest text-red-400 group-hover:text-white transition-colors">Delete</span>
                            </button>
                        </div>
                        <Button
                            variant="outline"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl px-8"
                            onClick={() => {
                                setIsManagementMode(false);
                                setSelectedMediaIds(new Set());
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* New Event Modal */}
            {isNewEventModalOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#1D2939]/40 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-[40px] shadow-2xl dark:shadow-none overflow-hidden border border-gray-100 dark:border-gray-800 scale-in-center">
                        <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-[#F3F0EB]/30 dark:bg-gray-800/50">
                            <h3 className="text-xl font-black uppercase tracking-tight text-[#1D2939] dark:text-white">Create Event Category</h3>
                            <button onClick={() => setIsNewEventModalOpen(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors">
                                <XMarkIcon className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Event Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Royal Wedding at The Palace"
                                    value={newEventDetails.name}
                                    onChange={(e) => setNewEventDetails(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-xs font-black uppercase text-[#1D2939] dark:text-white outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Location</label>
                                    <input
                                        type="text"
                                        placeholder="City, Country"
                                        value={newEventDetails.location}
                                        onChange={(e) => setNewEventDetails(prev => ({ ...prev, location: e.target.value }))}
                                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-xs font-black uppercase text-[#1D2939] dark:text-white outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Date</label>
                                    <input
                                        type="text"
                                        placeholder="Month Year"
                                        value={newEventDetails.date}
                                        onChange={(e) => setNewEventDetails(prev => ({ ...prev, date: e.target.value }))}
                                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-xs font-black uppercase text-[#1D2939] dark:text-white outline-none"
                                    />
                                </div>
                            </div>
                            <Button className="w-full h-14 rounded-2xl bg-[#D0771E] text-white font-black uppercase tracking-widest text-[10px]" onClick={handleCreateEvent}>
                                Create Event Category
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Performance Stats */}
            {!selectedEventId && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <StatCard
                            key={idx}
                            label={stat.label}
                            value={stat.value}
                            icon={<stat.icon className="w-5 h-5 text-white" />}
                            iconBgColor={stat.color}
                        />
                    ))}
                </div>
            )}

            <div className="space-y-8 flex-1">
                {/* Tabs & Filters */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-8">
                        <PremiumTabs
                            tabs={selectedEventId ? [{ id: 'All Media', label: 'Media Items' }] : tabs}
                            activeTab={activeTab}
                            onChange={setActiveTab}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D0771E] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search experiences..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-[11px] font-black placeholder:text-gray-400 dark:text-white focus:ring-2 focus:ring-[#D0771E]/20 focus:bg-white dark:focus:bg-gray-900 transition-all outline-none"
                            />
                        </div>
                        <div className="hidden lg:flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 text-[#D0771E] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                                <Squares2X2Icon className="w-4 h-4" />
                            </button>
                            <button onClick={() => setViewMode('masonry')} className={`p-2 rounded-xl transition-all ${viewMode === 'masonry' ? 'bg-white dark:bg-gray-700 text-[#D0771E] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                                <ListBulletIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                {activeTab === 'By Event' && !selectedEventId ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredEvents.map(event => renderEventCard(event))}
                        {filteredEvents.length === 0 && (
                            <div className="col-span-full py-20 bg-gray-50/50 dark:bg-gray-800/50 rounded-[40px] border border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                                <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm mb-6">
                                    <TrophyIcon className="w-10 h-10 text-gray-300" />
                                </div>
                                <h4 className="text-lg font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-2">No Matching Events</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Adjust your search to find specific collaborations.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={`
                        ${viewMode === 'masonry' ? 'flex flex-wrap -mx-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'}
                    `}>
                        {viewMode === 'masonry' ? (
                            masonryColumns.map((col, colIdx) => (
                                <div key={colIdx} className="w-full md:w-1/2 lg:w-1/4 px-4 space-y-8">
                                    {col.map(item => renderMediaItem(item))}
                                </div>
                            ))
                        ) : (
                            filteredMedia.map(item => renderMediaItem(item))
                        )}
                        {filteredMedia.length === 0 && (
                            <div className="col-span-full py-20 bg-gray-50/50 dark:bg-gray-800/50 rounded-[40px] border border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center w-full">
                                <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm mb-6">
                                    <PhotoIcon className="w-10 h-10 text-gray-300" />
                                </div>
                                <h4 className="text-lg font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-2">Sky looks empty</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-loose">Start uploading your best work to build your professional portfolio.</p>
                                <Button onClick={() => setIsUploadModalOpen(true)} className="mt-8 px-10 h-14 rounded-2xl bg-[#D0771E] text-white">Create First Entry</Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VendorPortfolio;
