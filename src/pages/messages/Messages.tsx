import { useState, useEffect, useRef } from 'react';
import { useUI } from '../../contexts/UIContext';
import {
    MagnifyingGlassIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    XMarkIcon,
    VideoCameraIcon,
    PhoneIcon,
    EllipsisVerticalIcon,
    MicrophoneIcon,
    FaceSmileIcon,
    PaperAirplaneIcon,
    ShieldExclamationIcon,
    DocumentPlusIcon,
    NoSymbolIcon,
    ArchiveBoxIcon,
    ArrowUturnLeftIcon,
    LinkIcon,
    StopIcon,
    SpeakerWaveIcon
} from '@heroicons/react/24/outline';
import {
    PhotoIcon,
    PaperClipIcon,
    BookmarkIcon,
    FaceSmileIcon as FaceSmileIconSolid
} from '@heroicons/react/24/solid';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';

interface Message {
    id: string;
    sender: 'me' | 'them';
    text?: string;
    time: string; // ISO date string
    status?: 'sent' | 'delivered' | 'read';
    type?: 'text' | 'image' | 'file' | 'voice' | 'link';
    content?: string;
    fileName?: string;
    fileSize?: string;
    reactions?: { emoji: string; count: number; users: string[] }[];
    replyToId?: string;
    linkPreview?: { title: string; site: string; image: string };
}

interface Chat {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    status: 'online' | 'offline' | 'typing';
    role: string;
    isPinned?: boolean;
    isArchived?: boolean;
    type?: 'planner' | 'vendor' | 'client';
}

// Robust list of off-platform transaction terms
const FORBIDDEN_WORDS = [
    'whatsapp', 'gmail', 'instagram', 'twitter', 'linkedin', 'website',
    'facebook', 'telegram', 'phone', 'mobile', 'email', 'contact',
    'call me', 'text me', 'skype', 'zoom', 'google meet', 'teams',
    'slack', 'discord', 'pay outside', 'paypal', 'venmo', 'cashapp',
    'zelle', 'bank transfer', '.com', '.net', '.org', '@'
];

const WARNING_LIMIT = 3;
const EMOJI_REACTIONS = ['❤️', '👍', '😂', '😮', '😢', '🔥'];



const SecurityWarningModal = ({ isOpen, onClose, warningCount, flaggedWord }: { isOpen: boolean; onClose: () => void; warningCount: number; flaggedWord: string }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 max-w-md w-full shadow-2xl dark:shadow-none border-4 border-red-50 dark:border-red-900/30 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
                <div className="w-20 h-20 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                    <ShieldExclamationIcon className="w-10 h-10 text-red-500 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter mb-4">Security Alert</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                    Our AI system detected potential <strong className="text-gray-900 dark:text-white">sensitive information</strong> ("{flaggedWord}").
                    For your safety, please keep transactions within the Ariya platform.
                </p>
                <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 mb-8 text-left">
                    <p className="text-xs font-bold text-red-800 dark:text-red-400 uppercase tracking-wide mb-1">Warning {warningCount}/3</p>
                    <div className="w-full bg-red-200 dark:bg-red-900/50 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-500 dark:bg-red-600 h-full transition-all duration-500" style={{ width: `${(warningCount / 3) * 100}%` }}></div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">Edit Message</button>
                    <button onClick={() => { onClose(); /* handleSendMessage(); */ }} className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg dark:shadow-none shadow-red-500/30">Send Anyway</button>
                </div>
            </div>
        </div>
    );
};

const BlockUserModal = ({ isOpen, onClose, onConfirm, userName }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; userName?: string }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 max-w-sm w-full shadow-2xl dark:shadow-none text-center border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <NoSymbolIcon className="w-8 h-8 text-red-500 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter mb-2">Block User?</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Are you sure you want to block <strong className="text-gray-900 dark:text-white">{userName}</strong>? They will no longer be able to message you.
                </p>
                <div className="flex flex-col gap-3">
                    <button onClick={onConfirm} className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg dark:shadow-none shadow-red-500/30">Yes, Block User</button>
                    <button onClick={onClose} className="w-full py-4 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white text-xs font-black uppercase tracking-widest transition-all">Cancel</button>
                </div>
            </div>
        </div>
    );
};

const CallModal = ({ isOpen, onClose, userName, type }: { isOpen: boolean; onClose: () => void; userName?: string; type: 'audio' | 'video' }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-4xl h-[80vh] bg-[#1D2939] rounded-[40px] overflow-hidden relative shadow-2xl border border-gray-800 flex flex-col">
                <div className="absolute top-8 left-8 z-10">
                    <span className="px-4 py-2 bg-black/40 backdrop-blur rounded-full text-white text-xs font-bold uppercase tracking-widest border border-white/10 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> Live Encrypted
                    </span>
                </div>
                <div className="flex-1 relative flex items-center justify-center">
                    {type === 'video' ? (
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1" alt="" className="w-full h-full object-cover opacity-80" />
                    ) : (
                        <div className="text-center">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1" alt="" className="w-40 h-40 rounded-full object-cover mx-auto mb-8 border-4 border-white/10 shadow-2xl animate-pulse-slow" />
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{userName}</h2>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Calling...</p>
                        </div>
                    )}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6">
                        <button className="p-6 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-all backdrop-blur"><MicrophoneIcon className="w-8 h-8" /></button>
                        <button onClick={onClose} className="p-8 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow-xl shadow-red-500/40 hover:scale-110"><PhoneIcon className="w-10 h-10 rotate-[135deg]" /></button>
                        <button className="p-6 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-all backdrop-blur"><VideoCameraIcon className="w-8 h-8" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Messages = () => {
    const { addNotification } = useUI();
    const [selectedChatId, setSelectedChatId] = useState<string>('1');
    const [messageInput, setMessageInput] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');
    const [searchQuery, setSearchQuery] = useState('');
    const [inChatSearchQuery, setInChatSearchQuery] = useState('');
    const [showInChatSearch, setShowInChatSearch] = useState(false);
    const [showProfilePanel, setShowProfilePanel] = useState(true);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showCallModal, setShowCallModal] = useState({ open: false, type: 'audio' as 'audio' | 'video' });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [replyTo, setReplyTo] = useState<Message | null>(null);
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
    const [warningCount, setWarningCount] = useState(0);
    const [lastFlaggedWord, setLastFlaggedWord] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const emojiRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Mock Chats State
    const [chats, setChats] = useState<Chat[]>([
        { id: '1', name: 'Oluwatobiloba Babatunde', role: 'Wedding Planner', lastMessage: 'Great! It will be a small...', time: '1:15 AM', unreadCount: 0, status: 'online', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop', isArchived: false, isPinned: true },
        { id: '2', name: 'Sarah Wilson', role: 'Floral Designer', lastMessage: 'The bouquet looks great!', time: 'Yesterday', unreadCount: 3, status: 'offline', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', isArchived: false, isPinned: false },
        { id: '3', name: 'James Carter', role: 'Venue Manager', lastMessage: 'Typing...', time: '1:15 AM', unreadCount: 0, status: 'typing', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=crop', isArchived: true, isPinned: false },
        { id: '4', name: 'Anita Desserts', role: 'Caterer', lastMessage: 'I received the payment.', time: 'Monday', unreadCount: 0, status: 'online', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop', isArchived: false, isPinned: false },
    ]);

    const [chatHistories, setChatHistories] = useState<Record<string, Message[]>>({
        '1': [
            { id: '1', sender: 'them', text: 'Hi, are you available for an event on the 23rd of this month, at Gbagada express side in Lagos.', time: '11:23 AM', status: 'read' },
            { id: '2', sender: 'them', text: 'Let me know I have an event around that side', time: '11:23 AM', status: 'read' },
            { id: '3', sender: 'me', text: 'Yes, I am available! Can you tell me more about the event requirements?', time: '11:25 AM', status: 'read' },
            { id: '4', sender: 'them', text: 'Great! It will be a small wedding for about 100 guests.', time: '11:26 AM', status: 'read' },
        ],
        '2': [
            { id: '5', sender: 'them', text: 'The bouquet looks great!', time: 'Yesterday', status: 'read', reactions: [{ emoji: '❤️', count: 1, users: ['me'] }] },
            { id: '6', sender: 'me', text: 'Thanks! Let me know if you need any adjustments.', time: 'Yesterday', status: 'read' },
        ],
        '3': [{ id: '7', sender: 'them', text: 'Can we confirm the venue setup for Saturday?', time: '9:00 AM', status: 'read' }],
        '4': [{ id: '8', sender: 'them', text: 'I received the payment for the dessert table.', time: 'Monday', status: 'read' }]
    });

    const currentChat = chats.find(c => c.id === selectedChatId);
    const messages = chatHistories[selectedChatId] || [];

    useEffect(() => {
        if (selectedChatId) {
            // Logic moved to selection sites
        }
    }, [selectedChatId]);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, selectedChatId]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            setShowProfilePanel(window.innerWidth >= 1280);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) setShowEmojiPicker(false);
            if (optionsRef.current && !optionsRef.current.contains(e.target as Node)) setShowOptionsMenu(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleRecording = () => {
        if (isRecording) {
            if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
            setIsRecording(false);
            setRecordingTime(0);
            handleSendMessage(`Voice message (${recordingTime}s)`, 'voice');
        } else {
            setIsRecording(true);
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }
    };

    const handleSendMessage = (textOverride?: string, type: 'text' | 'voice' = 'text') => {
        const finalContent = textOverride || messageInput;
        if (finalContent.trim() === '') return;

        const lowerMessage = finalContent.toLowerCase();
        const flaggedWord = FORBIDDEN_WORDS.find((word: string) => lowerMessage.includes(word.toLowerCase()));

        if (flaggedWord && type === 'text') {
            const newCount = warningCount + 1;
            setWarningCount(newCount);
            if (newCount >= WARNING_LIMIT) {
                addNotification({ message: "Security Block: Warning limit exceeded.", type: 'error' });
                handleConfirmBlock();
                return;
            }
            setLastFlaggedWord(flaggedWord);
            setShowSecurityModal(true);
            if (!textOverride) setMessageInput('');
            return;
        }

        const date = new Date();
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMessage: Message = {
            id: date.getTime().toString(),
            sender: 'me',
            text: finalContent,
            time,
            status: 'sent',
            type,
            replyToId: replyTo?.id
        };

        // Rich Link Preview Mock
        if (finalContent.includes('http')) {
            newMessage.type = 'link';
            newMessage.linkPreview = {
                title: 'Professional Event Planning Services',
                site: 'ariya.platform',
                image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format'
            };
        }

        setChatHistories(prev => ({ ...prev, [selectedChatId]: [...(prev[selectedChatId] || []), newMessage] }));
        setChats(prev => prev.map((chat: Chat) => chat.id === selectedChatId ? { ...chat, lastMessage: finalContent, time } : chat));
        if (!textOverride) setMessageInput('');
        setReplyTo(null);

        // Mock delivery updates
        setTimeout(() => {
            setChatHistories(prev => ({
                ...prev,
                [selectedChatId]: prev[selectedChatId].map((m: Message) => m.id === newMessage.id ? { ...m, status: 'delivered' } : m)
            }));
            setTimeout(() => {
                setChatHistories(prev => ({
                    ...prev,
                    [selectedChatId]: prev[selectedChatId].map((m: Message) => m.id === newMessage.id ? { ...m, status: 'read' } : m)
                }));
            }, 2000);
        }, 1000);
    };

    const handleConfirmBlock = () => {
        if (!currentChat) return;
        addNotification({ message: `${currentChat.name} has been blocked.`, type: 'warning' });
        setChats(prev => prev.filter((c: Chat) => c.id !== selectedChatId));
        setShowBlockModal(false);
        const nextChat = chats.find(c => c.id !== selectedChatId);
        const nextChatId = nextChat?.id || '';
        setSelectedChatId(nextChatId);
        if (nextChatId) {
            setChats(prev => prev.map((chat: Chat) => chat.id === nextChatId ? { ...chat, unreadCount: 0 } : chat));
        }
    };

    const handleArchiveToggle = () => {
        if (!currentChat) return;
        const newArchiveStatus = !currentChat.isArchived;
        setChats(prev => prev.map(chat =>
            chat.id === selectedChatId ? { ...chat, isArchived: newArchiveStatus } : chat
        ));
        addNotification({ message: `Chat ${newArchiveStatus ? 'archived' : 'unarchived'}.`, type: 'info' });
        setShowOptionsMenu(false);
    };

    const handlePinToggle = () => {
        if (!currentChat) return;
        setChats(prev => prev.map(chat =>
            chat.id === selectedChatId ? { ...chat, isPinned: !chat.isPinned } : chat
        ));
        addNotification({ message: `Chat ${currentChat.isPinned ? 'unpinned' : 'pinned'}.`, type: 'info' });
        setShowOptionsMenu(false);
    };

    const handleReaction = (messageId: string, emoji: string) => {
        setChatHistories(prev => ({
            ...prev,
            [selectedChatId]: prev[selectedChatId].map(m => {
                if (m.id !== messageId) return m;
                const reactions = [...(m.reactions || [])];
                const existing = reactions.find(r => r.emoji === emoji);
                if (existing) {
                    existing.count += 1;
                    existing.users.push('me');
                } else {
                    reactions.push({ emoji, count: 1, users: ['me'] });
                }
                return { ...m, reactions };
            })
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            addNotification({ message: `Uploading: ${file.name}...`, type: 'info' });
            setTimeout(() => {
                handleSendMessage(`📎 Document: ${file.name}`);
                addNotification({ message: 'Sent!', type: 'success' });
            }, 1200);
        }
    };

    const emojis = ['😊', '😂', '👋', '👍', '🙏', '❤️', '🔥', '✨', '🎉', '💡', '🥂', '📸'];

    const filteredChats = chats
        .filter(chat => {
            const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesView = viewMode === 'active' ? !chat.isArchived : chat.isArchived;
            return matchesSearch && matchesView;
        })
        .sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));

    const chatMessages = messages.filter(m =>
        !inChatSearchQuery || m.text?.toLowerCase().includes(inChatSearchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 pb-8">
            <div className="max-w-[1600px] mx-auto px-8 py-8 h-[calc(100vh-64px)] flex flex-col">
                <div className="mb-6 shrink-0">
                    <PageHeader
                        title="Messages"
                        subtitle="Secure communication with your vendors and clients"
                        breadcrumb="Messages"
                    />
                </div>

                {/* --- Modals --- */}
                <SecurityWarningModal isOpen={showSecurityModal} onClose={() => setShowSecurityModal(false)} warningCount={warningCount} flaggedWord={lastFlaggedWord} />
                <BlockUserModal isOpen={showBlockModal} onClose={() => setShowBlockModal(false)} onConfirm={handleConfirmBlock} userName={currentChat?.name} />
                <CallModal isOpen={showCallModal.open} onClose={() => setShowCallModal({ ...showCallModal, open: false })} userName={currentChat?.name} type={showCallModal.type} />

                <div className="flex-1 flex gap-6 overflow-hidden bg-white dark:bg-gray-900 rounded-[32px] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 p-6">

                    {/* --- LEFT PANE --- */}
                    <div className={`${isMobile && selectedChatId ? 'hidden' : 'flex'} w-full lg:w-[380px] flex-col overflow-hidden shrink-0 border-r border-gray-100 dark:border-gray-800 pr-6`}>
                        <div className="pb-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-widest">Inbox</h2>
                                    {warningCount > 0 && (
                                        <span className="text-[9px] bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-lg font-black uppercase tracking-widest border border-red-100 dark:border-red-800">
                                            {warningCount} Warnings
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-[#D0771E] transition-all">
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <PremiumTabs
                                tabs={[
                                    { id: 'active', label: 'Active' },
                                    { id: 'archived', label: 'Archived' }
                                ]}
                                activeTab={viewMode}
                                onChange={(id) => setViewMode(id as 'active' | 'archived')}
                                className="mb-0 w-full"
                            />

                            <div className="relative group">
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-[#D0771E] transition-colors" />
                                <input
                                    type="text"
                                    placeholder={`Search ${viewMode} messages...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-xs font-bold text-[#1D2939] dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#D0771E]/10 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
                            {filteredChats.map((chat: Chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => {
                                        setSelectedChatId(chat.id);
                                        setChats(prev => prev.map((c: Chat) => c.id === chat.id ? { ...c, unreadCount: 0 } : c));
                                    }}
                                    className={`p-4 flex items-center gap-4 cursor-pointer transition-all rounded-2xl group ${selectedChatId === chat.id ? 'bg-[#1D2939] text-white shadow-lg shadow-gray-900/10 dark:shadow-none' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-[#1D2939] dark:text-gray-100'}`}
                                >
                                    <div className="relative shrink-0">
                                        <img src={chat.avatar} alt="" className={`w-12 h-12 rounded-full object-cover border-2 ${selectedChatId === chat.id ? 'border-gray-700' : 'border-white dark:border-gray-800 shadow-sm'}`} />
                                        {chat.isPinned && (
                                            <div className="absolute -top-1 -right-1 bg-[#D0771E] text-white p-0.5 rounded-full ring-2 ring-white">
                                                <BookmarkIcon className="w-2.5 h-2.5" />
                                            </div>
                                        )}
                                        {chat.status === 'online' && (
                                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-[#1BB20E]`}></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className={`text-xs font-bold truncate ${selectedChatId === chat.id ? 'text-white' : 'text-[#1D2939] dark:text-gray-100'}`}>{chat.name}</h3>
                                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">{chat.time}</span>
                                        </div>
                                        <p className={`text-xs truncate font-medium ${chat.status === 'typing' ? 'text-[#1BB20E] italic' : selectedChatId === chat.id ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {chat.status === 'typing' ? 'Typing...' : chat.lastMessage}
                                        </p>
                                    </div>
                                    {chat.unreadCount > 0 && (
                                        <span className="min-w-[18px] h-[18px] px-1.5 bg-[#D0771E] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm shadow-orange-200 dark:shadow-none">
                                            {chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- MIDDLE PANE --- */}
                    <div className={`${isMobile && !selectedChatId ? 'hidden' : 'flex'} flex-1 flex-col overflow-hidden relative border-l border-r border-gray-50 dark:border-gray-800 px-0`}>
                        {selectedChatId ? (
                            <>
                                <div className="px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 flex items-center justify-between z-10 sticky top-0">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img src={currentChat?.avatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none" />
                                            {currentChat?.status === 'online' && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#1BB20E] border-2 border-white dark:border-gray-800 rounded-full"></div>}
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-wide">{currentChat?.name}</h2>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${currentChat?.status === 'online' ? 'bg-[#1BB20E]' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{currentChat?.status === 'online' ? 'Active' : 'Offline'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setShowInChatSearch(!showInChatSearch)} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-all"><MagnifyingGlassIcon className="w-5 h-5" /></button>
                                        <button onClick={() => setShowCallModal({ open: true, type: 'video' })} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-all"><VideoCameraIcon className="w-5 h-5" /></button>
                                        <button onClick={() => setShowCallModal({ open: true, type: 'audio' })} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-all"><PhoneIcon className="w-5 h-5" /></button>
                                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                                        <div ref={optionsRef} className="relative">
                                            <button onClick={() => setShowOptionsMenu(!showOptionsMenu)} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-all"><EllipsisVerticalIcon className="w-5 h-5" /></button>
                                            {showOptionsMenu && (
                                                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-700 p-2 z-50 animate-fade-in-up">
                                                    <button onClick={handlePinToggle} className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1D2939] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 transition-colors">
                                                        <BookmarkIcon className={`w-4 h-4 ${currentChat?.isPinned ? 'text-[#D0771E]' : 'text-gray-400 dark:text-gray-500'}`} /> {currentChat?.isPinned ? 'Unpin' : 'Pin'} Chat
                                                    </button>
                                                    <button onClick={handleArchiveToggle} className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1D2939] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 transition-colors">
                                                        <ArchiveBoxIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" /> {currentChat?.isArchived ? 'Unarchive' : 'Archive'} Chat
                                                    </button>
                                                    <div className="my-1 border-t border-gray-50 dark:border-gray-700"></div>
                                                    <button onClick={() => { setShowOptionsMenu(false); setShowBlockModal(true); }} className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl flex items-center gap-3 transition-colors">
                                                        <NoSymbolIcon className="w-4 h-4" /> Block User
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* In-Chat Search Bar */}
                                {showInChatSearch && (
                                    <div className="px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-50 dark:border-gray-800 flex items-center animate-fade-in relative z-0">
                                        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                                        <input
                                            autoFocus
                                            type="text"
                                            placeholder="Find in conversation..."
                                            className="flex-1 bg-transparent border-none text-xs focus:ring-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white font-medium"
                                            value={inChatSearchQuery}
                                            onChange={(e) => setInChatSearchQuery(e.target.value)}
                                        />
                                        <XMarkIcon onClick={() => { setShowInChatSearch(false); setInChatSearchQuery(''); }} className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
                                    </div>
                                )}

                                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth scrollbar-thin">
                                    <div className="flex flex-col items-center gap-2 py-6">
                                        <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm dark:shadow-none">
                                            <ShieldCheckIcon className="w-4 h-4 text-[#D0771E]" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white">Encrypted & Secure</span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {chatMessages.map((msg: Message) => (
                                            <div
                                                key={msg.id}
                                                className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} group relative`}
                                                onMouseEnter={() => setHoveredMessageId(msg.id)}
                                                onMouseLeave={() => setHoveredMessageId(null)}
                                            >
                                                {/* Thread Header */}
                                                {msg.replyToId && (
                                                    <div className="mb-2 flex items-center gap-1.5 px-2 opacity-50">
                                                        <ArrowUturnLeftIcon className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                                                        <span className="text-[9px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Replied</span>
                                                    </div>
                                                )}

                                                <div className="flex items-end gap-3 max-w-[80%]">
                                                    {/* Side Actions (Hover Only) */}
                                                    {msg.sender === 'them' && hoveredMessageId === msg.id && (
                                                        <div className="flex gap-2 animate-fade-in mb-3 order-last">
                                                            <button onClick={() => setReplyTo(msg)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-all"><ArrowUturnLeftIcon className="w-4 h-4" /></button>
                                                            <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-all"><FaceSmileIconSolid className="w-4 h-4" /></button>
                                                        </div>
                                                    )}

                                                    <div className={`relative px-6 py-4 rounded-[24px] text-sm leading-relaxed shadow-sm dark:shadow-none transition-all ${msg.sender === 'me'
                                                        ? 'bg-[#1D2939] text-white rounded-tr-none shadow-gray-200 dark:shadow-none'
                                                        : 'bg-[#F9FAFB] dark:bg-gray-800 text-[#1D2939] dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700'
                                                        }`}>
                                                        {/* Quoted Message */}
                                                        {msg.replyToId && (
                                                            <div className={`mb-3 p-3 rounded-xl border-l-2 text-xs truncate ${msg.sender === 'me' ? 'bg-white/10 border-white/30 text-gray-300' : 'bg-gray-100 dark:bg-gray-700 border-[#D0771E] text-gray-500 dark:text-gray-300'}`}>
                                                                {messages.find((m: Message) => m.id === msg.replyToId)?.text}
                                                            </div>
                                                        )}

                                                        {/* Message Content */}
                                                        {msg.type === 'voice' ? (
                                                            <div className="flex items-center gap-4">
                                                                <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${msg.sender === 'me' ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-[#D0771E]/10 dark:bg-[#D0771E]/20 text-[#D0771E] hover:bg-[#D0771E]/20 dark:hover:bg-[#D0771E]/30'}`}>
                                                                    <SpeakerWaveIcon className="w-4 h-4" />
                                                                </button>
                                                                <div className="flex-1 space-y-1">
                                                                    <div className={`h-1 rounded-full w-32 ${msg.sender === 'me' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                                                        <div className={`h-full rounded-full w-1/3 ${msg.sender === 'me' ? 'bg-white' : 'bg-[#D0771E]'}`}></div>
                                                                    </div>
                                                                    <span className={`text-[9px] font-bold ${msg.sender === 'me' ? 'text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>{msg.text?.split('(')[1]?.split(')')[0]}</span>
                                                                </div>
                                                            </div>
                                                        ) : msg.type === 'link' ? (
                                                            <div className="space-y-3">
                                                                <p className="font-medium">{msg.text}</p>
                                                                <div className={`rounded-2xl overflow-hidden mt-2 border ${msg.sender === 'me' ? 'bg-white/5 border-white/10' : 'bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600'}`}>
                                                                    <img src={msg.linkPreview?.image} className="w-full h-32 object-cover" />
                                                                    <div className="p-4">
                                                                        <p className={`text-xs font-bold truncate mb-1 ${msg.sender === 'me' ? 'text-white' : 'text-[#1D2939] dark:text-white'}`}>{msg.linkPreview?.title}</p>
                                                                        <div className="flex items-center gap-1.5">
                                                                            <LinkIcon className={`w-3 h-3 ${msg.sender === 'me' ? 'text-gray-400' : 'text-gray-400 dark:text-gray-500'}`} />
                                                                            <span className={`text-[9px] font-bold uppercase tracking-widest ${msg.sender === 'me' ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>{msg.linkPreview?.site}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className="block font-medium">{msg.text}</span>
                                                        )}

                                                        {/* Reactions */}
                                                        {msg.reactions && msg.reactions.length > 0 && (
                                                            <div className={`absolute -bottom-3 ${msg.sender === 'me' ? 'left-0' : 'right-0'} flex gap-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-full px-2 py-1 shadow-sm dark:shadow-none`}>
                                                                {msg.reactions.map((r: { emoji: string; count: number; users: string[] }, i: number) => (
                                                                    <span key={i} className="text-[10px] flex items-center gap-1">
                                                                        {r.emoji} <span className="text-[9px] font-bold text-gray-500">{r.count}</span>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {msg.sender === 'me' && hoveredMessageId === msg.id && (
                                                        <div className="flex gap-2 animate-fade-in mb-3 order-first">
                                                            <button onClick={() => setReplyTo(msg)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-all"><ArrowUturnLeftIcon className="w-4 h-4" /></button>
                                                            <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-all"><FaceSmileIconSolid className="w-4 h-4" /></button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Status & Time */}
                                                <div className="flex items-center gap-2 mt-2 px-2">
                                                    <span className="text-[9px] font-bold text-gray-300 dark:text-gray-500 uppercase tracking-wider">{msg.time}</span>
                                                    {msg.sender === 'me' && (
                                                        <div className="flex">
                                                            <CheckCircleIcon className={`w-3.5 h-3.5 ${msg.status === 'read' ? 'text-[#1BB20E]' : msg.status === 'delivered' ? 'text-gray-400 dark:text-gray-500' : 'text-gray-200 dark:text-gray-600'}`} />
                                                            {msg.status === 'read' && <CheckCircleIcon className="w-3.5 h-3.5 text-[#1BB20E] -ml-2" />}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Reaction Picker on Context (Mocked via click) */}
                                                {hoveredMessageId === msg.id && (
                                                    <div className={`absolute ${msg.sender === 'me' ? 'right-full mr-4' : 'left-full ml-4'} top-1/2 -translate-y-1/2 flex gap-1 bg-white dark:bg-gray-900 p-1.5 rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-700 z-50 animate-scale-in`}>
                                                        {EMOJI_REACTIONS.map((e: string) => (
                                                            <button key={e} onClick={() => handleReaction(msg.id, e)} className="hover:scale-125 transition-all p-1.5 text-lg">{e}</button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Message Composer Area */}
                                <div className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm relative z-20">
                                    {/* Reply Preview */}
                                    {replyTo && (
                                        <div className="mb-4 mx-2 p-3 bg-gray-50 dark:bg-gray-800 border-l-4 border-[#D0771E] rounded-r-xl flex items-center justify-between animate-fade-in-up shadow-sm dark:shadow-none">
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest mb-1">Replying to {replyTo.sender === 'me' ? 'yourself' : currentChat?.name.split(' ')[0]}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate font-medium">{replyTo.text}</p>
                                            </div>
                                            <button onClick={() => setReplyTo(null)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"><XMarkIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" /></button>
                                        </div>
                                    )}

                                    <div className="flex items-end gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[24px] p-2 shadow-sm dark:shadow-none focus-within:ring-2 focus-within:ring-[#D0771E]/10 focus-within:border-[#D0771E] transition-all">
                                        <div className="flex items-center gap-1 pb-2 pl-2">
                                            <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all"><DocumentPlusIcon className="w-5 h-5" /></button>
                                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                            <div ref={emojiRef} className="relative">
                                                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all"><FaceSmileIcon className="w-5 h-5" /></button>
                                                {showEmojiPicker && (
                                                    <div className="absolute left-0 bottom-14 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-700 p-3 z-[60] grid grid-cols-6 gap-2 animate-scale-in">
                                                        {emojis.map((e: string) => (
                                                            <button key={e} onClick={() => { setMessageInput(prev => prev + e); setShowEmojiPicker(false); }} className="text-xl hover:scale-125 transition-all p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">{e}</button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className={`flex-1 min-h-[48px] flex items-center py-2 px-2`}>
                                            {isRecording ? (
                                                <div className="flex-1 flex items-center gap-4">
                                                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
                                                    <span className="text-xs font-bold text-red-500 uppercase tracking-wide">Recording... {recordingTime}s</span>
                                                    <div className="flex-1 h-8 flex items-center gap-1 px-4 opacity-50">
                                                        {[...Array(24)].map((_: unknown, i: number) => (
                                                            <div key={i} className="flex-1 bg-red-400 rounded-full transition-all duration-75" style={{ height: `${20 + ((i * 13) % 80)}%` }}></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <textarea
                                                    placeholder="Type a message..."
                                                    value={messageInput}
                                                    onChange={(e) => setMessageInput(e.target.value)}
                                                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                                                    rows={1}
                                                    className="w-full bg-transparent border-none text-sm dark:text-white focus:ring-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium p-0 resize-none max-h-32"
                                                />
                                            )}
                                        </div>

                                        <div className="pb-1 pr-1 flex items-center gap-2">
                                            <div className="relative group">
                                                <button onClick={toggleRecording} className={`p-3 rounded-xl transition-all ${isRecording ? 'text-red-500 bg-red-50 dark:bg-red-900/30' : 'text-gray-400 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'}`}>
                                                    {isRecording ? <StopIcon className="w-5 h-5" /> : <MicrophoneIcon className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleSendMessage()}
                                                disabled={!isRecording && messageInput.trim() === ''}
                                                className={`p-3 rounded-xl shadow-lg dark:shadow-none transition-all ${isRecording || messageInput.trim() !== '' ? 'bg-[#1D2939] dark:bg-gray-700 text-white hover:bg-black dark:hover:bg-gray-600 hover:-translate-y-0.5' : 'bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-500'}`}
                                            >
                                                <PaperAirplaneIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-fade-in bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-50 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                                    <ShieldCheckIcon className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                                </div>
                                <h3 className="text-lg font-black text-[#1D2939] dark:text-white mb-2 uppercase tracking-wide">Secure Messages</h3>
                                <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm leading-relaxed font-medium">Select a conversation to start messaging securely with your planners and vendors.</p>
                            </div>
                        )}
                    </div>

                    {/* --- RIGHT PANE --- */}
                    {!isMobile && showProfilePanel && currentChat && (
                        <div className="w-[300px] bg-white dark:bg-gray-900 flex flex-col shrink-0 pl-6 border-l border-gray-100 dark:border-gray-800">
                            <div className="pb-6 border-b border-gray-100 dark:border-gray-800 mb-6">
                                <h2 className="text-xs font-black text-[#1D2939] dark:text-white uppercase tracking-widest text-center">Contact Details</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto flex flex-col items-center">
                                <div className="text-center w-full mb-8 relative">
                                    <img src={currentChat.avatar} alt="" className="w-24 h-24 rounded-[32px] object-cover mx-auto mb-4 border-4 border-gray-50 dark:border-gray-800 shadow-inner dark:shadow-none" />
                                    <h3 className="text-lg font-black text-[#1D2939] dark:text-white mb-1">{currentChat.name}</h3>
                                    <span className="inline-block px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest">{currentChat.role}</span>
                                </div>

                                <div className="w-full space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => setShowCallModal({ open: true, type: 'audio' })} className="py-3 bg-gray-50 dark:bg-gray-800 hover:bg-[#1D2939] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Call</button>
                                        <button className="py-3 bg-gray-50 dark:bg-gray-800 hover:bg-[#1D2939] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Profile</button>
                                    </div>

                                    <PremiumCard className="p-0 border-none shadow-none bg-transparent">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Shared Medias</h4>
                                            <button className="text-[10px] text-[#D0771E] font-bold hover:underline">View All</button>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 hover:border-[#D0771E] transition-all cursor-pointer group">
                                                <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none group-hover:scale-110 transition-transform">
                                                    <PaperClipIcon className="w-5 h-5 text-[#D0771E]" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] font-bold text-[#1D2939] dark:text-white truncate">Contract_Draft_v2.pdf</p>
                                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">2.4 MB • Oct 28</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 hover:border-[#D0771E] transition-all cursor-pointer group">
                                                <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none group-hover:scale-110 transition-transform">
                                                    <PhotoIcon className="w-5 h-5 text-indigo-500" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] font-bold text-[#1D2939] dark:text-white truncate">Venue_Photos.zip</p>
                                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">156 MB • Oct 25</p>
                                                </div>
                                            </div>
                                        </div>
                                    </PremiumCard>
                                </div>
                            </div>
                            <div className="pt-6 mt-auto">
                                <button onClick={() => setShowBlockModal(true)} className="w-full py-4 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                    <NoSymbolIcon className="w-4 h-4" /> Block User
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Messages;
