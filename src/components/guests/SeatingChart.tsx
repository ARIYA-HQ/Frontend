import { useState, useRef, useEffect } from 'react';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    FunnelIcon,
    EyeIcon,
    TrashIcon,
    ChevronDownIcon,
    ArrowDownTrayIcon,
    ShareIcon,
    HashtagIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface Table {
    id: string;
    name: string;
    type: 'round' | 'rectangle';
    capacity: number;
    guestIds: number[];
    x: number;
    y: number;
    conflicts?: string[];
}

interface Guest {
    id: number;
    name: string;
    group: string;
    assignedTableId?: string;
    avatar?: string;
    isVIP?: boolean;
    dietary?: string;
}

interface SeatingChartProps {
    guests: Guest[];
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
    setGuests: React.Dispatch<React.SetStateAction<any[]>>;
}

const SeatingChart = ({ guests, tables, setTables, setGuests }: SeatingChartProps) => {
    const [selectedGuestId, setSelectedGuestId] = useState<number | null>(null);
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [guestSearchTerm, setGuestSearchTerm] = useState('');
    const [showSeatDropdown, setShowSeatDropdown] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [previewViewType, setPreviewViewType] = useState<'names' | 'numbers'>('names');

    // Local state for sidebar edits before saving
    const [editTableName, setEditTableName] = useState('');
    const [editCapacity, setEditCapacity] = useState(8);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [dragOverTableId, setDragOverTableId] = useState<string | null>(null);
    const [draggingTableId, setDraggingTableId] = useState<string | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const tableRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const lastPosRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const hasMovedRef = useRef(false);
    const startMousePosRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

    const seatDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const table = tables.find(t => t.id === selectedTableId);
        if (table) {
            setEditTableName(table.name);
            setEditCapacity(table.capacity);
        }
    }, [selectedTableId]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (seatDropdownRef.current && !seatDropdownRef.current.contains(e.target as Node)) {
                setShowSeatDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handlers
    const addTable = (type: 'round' | 'rectangle') => {
        const newTable: Table = {
            id: `t${Date.now()}`,
            name: `${type === 'round' ? 'Friends' : 'Colleagues'}`,
            type,
            capacity: 8,
            guestIds: [],
            x: 100,
            y: 100
        };
        setTables([...tables, newTable]);
    };


    const detectConflicts = (table: Table, allGuests: Guest[]) => {
        const tableGuests = allGuests.filter(g => table.guestIds.includes(g.id));
        const conflicts: string[] = [];

        // Rule 1: Capacity
        if (table.guestIds.length > table.capacity) {
            conflicts.push('Over capacity');
        }

        // Rule 2: Dietary Mix (Critical Warning)
        const hasAllergy = tableGuests.some(g => g.dietary?.toLowerCase().includes('allergy'));
        if (hasAllergy) {
            conflicts.push('Critical: Food Allergy at Table');
        }

        // Rule 3: VIP Status Mix
        const hasVIP = tableGuests.some(g => g.isVIP);
        const hasNonVIP = tableGuests.some(g => !g.isVIP && g.group !== 'VIP');
        if (hasVIP && hasNonVIP && table.name.toLowerCase().includes('head')) {
            conflicts.push('Non-VIP at Head Table');
        }

        return conflicts;
    };

    const updateTableConflicts = (tableList: Table[], guestList: Guest[]) => {
        return tableList.map(t => ({
            ...t,
            conflicts: detectConflicts(t, guestList)
        }));
    };

    const saveTableSettings = () => {
        setTables(prev => {
            const updated = prev.map(t =>
                t.id === selectedTableId
                    ? { ...t, name: editTableName, capacity: editCapacity }
                    : t
            );
            return updateTableConflicts(updated, guests);
        });
        setSelectedTableId(null);
    };

    const assignGuestToTable = (tableId: string, guestIdOverride?: number) => {
        const gId = guestIdOverride || selectedGuestId;
        if (gId === null) return;
        const table = tables.find(t => t.id === tableId);
        if (!table || table.guestIds.length >= table.capacity) return;

        setTables(prevTables => {
            const updated = prevTables.map(t => ({
                ...t,
                guestIds: t.guestIds.filter(id => id !== gId)
            }));

            const withNewGuest = updated.map(t =>
                t.id === tableId ? { ...t, guestIds: [...t.guestIds, gId] } : t
            );

            return updateTableConflicts(withNewGuest, guests);
        });

        setGuests(prev => prev.map(g => g.id === gId ? { ...g, assignedTableId: tableId } : g));
        setSelectedGuestId(null);
        setGuestSearchTerm('');
    };

    const unassignGuest = (guestId: number, tableId: string) => {
        setTables(prevTables => prevTables.map(t =>
            t.id === tableId ? { ...t, guestIds: t.guestIds.filter(id => id !== guestId) } : t
        ));
        setGuests(prev => prev.map(g => g.id === guestId ? { ...g, assignedTableId: undefined } : g));
    };

    const unassignedGuests = guests.filter(g => !g.assignedTableId && g.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const sidebarSearchGuests = guests.filter(g => !g.assignedTableId && g.name.toLowerCase().includes(guestSearchTerm.toLowerCase())).slice(0, 5);
    const seatedCount = guests.filter(g => g.assignedTableId).length;
    const currentTable = tables.find(t => t.id === selectedTableId);

    const handleCanvasMouseMove = (e: React.MouseEvent) => {
        if (!draggingTableId || !canvasRef.current) return;

        // Distinguish click from drag: check threshold
        if (!hasMovedRef.current) {
            const dx = Math.abs(e.clientX - startMousePosRef.current.x);
            const dy = Math.abs(e.clientY - startMousePosRef.current.y);
            if (dx > 5 || dy > 5) {
                hasMovedRef.current = true;
            }
        }

        const tableEl = tableRefs.current.get(draggingTableId);
        if (!tableEl) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - dragOffset.x;
        const y = e.clientY - rect.top - dragOffset.y;

        // Performant update: Bypass React, update DOM directly
        tableEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        lastPosRef.current = { x, y };
    };

    const handleTableMouseDown = (e: React.MouseEvent, tableId: string) => {
        // Prevent interaction if we are dragging a guest
        if (selectedGuestId) return;

        const table = tables.find(t => t.id === tableId);
        if (table) {
            lastPosRef.current = { x: table.x, y: table.y };
        }

        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });

        // Reset movement tracking
        hasMovedRef.current = false;
        startMousePosRef.current = { x: e.clientX, y: e.clientY };

        setDraggingTableId(tableId);
    };

    const handleCanvasMouseUp = () => {
        if (draggingTableId) {
            // Final synchronization: Sync DOM position back to React state
            const finalPos = lastPosRef.current;
            setTables(prev => prev.map(t =>
                t.id === draggingTableId ? { ...t, x: finalPos.x, y: finalPos.y } : t
            ));
            setDraggingTableId(null);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-auto lg:h-[800px] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border-none shadow-2xl shadow-gray-100/50 dark:shadow-none font-inter relative">

            {/* --- LEFT SIDEBAR: MANAGE QUEUE --- */}
            <div className="w-full lg:w-[340px] border-r-0 lg:border-r border-b lg:border-b-0 border-gray-50 dark:border-gray-700 flex flex-col bg-[#FCFCFC]/30 dark:bg-gray-900 shrink-0 h-[500px] lg:h-auto">
                <div className="p-6 lg:p-8 space-y-6 lg:space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search Guests"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-bold focus:ring-2 focus:ring-[#D0771E] focus:bg-white dark:focus:bg-gray-700 transition-all"
                            />
                            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                        <button className="p-4 border-none bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-orange-50/50 dark:hover:bg-gray-700 group transition-all">
                            <FunnelIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#D0771E]" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Add Tables</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => addTable('round')} className="flex items-center justify-center gap-3 px-6 py-4 border-none bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-orange-50/50 dark:hover:bg-gray-700 hover:shadow-md dark:hover:shadow-none transition-all group">
                                <div className="w-4 h-4 rounded-full bg-[#D0771E]/20 group-hover:bg-[#D0771E]/30"></div>
                                <span className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest">Round</span>
                            </button>
                            <button onClick={() => addTable('rectangle')} className="flex items-center justify-center gap-3 px-6 py-4 border-none bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-orange-50/50 dark:hover:bg-gray-700 hover:shadow-md dark:hover:shadow-none transition-all group">
                                <div className="w-5 h-3 bg-[#D0771E]/20 rounded-md group-hover:bg-[#D0771E]/30"></div>
                                <span className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest">Rect</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-8 pb-8">
                    <div className="flex items-center justify-between mb-6 mt-2">
                        <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Unassigned <span className="text-[#D0771E]">({unassignedGuests.length})</span></h3>
                    </div>
                    <div className="space-y-3">
                        {unassignedGuests.map(guest => (
                            <div
                                key={guest.id}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('guestId', guest.id.toString());
                                    e.dataTransfer.setData('type', 'guest');
                                }}
                                onClick={() => setSelectedGuestId(selectedGuestId === guest.id ? null : guest.id)}
                                className={`group p-4 border rounded-2xl flex items-center gap-4 cursor-pointer transition-all transform active:scale-95
                                    ${selectedGuestId === guest.id
                                        ? 'bg-[#1D2939] dark:bg-gray-700 border-[#1D2939] dark:border-gray-600 text-white shadow-xl dark:shadow-none translate-x-1'
                                        : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-[#D0771E] hover:shadow-md dark:hover:shadow-none'
                                    }`}
                            >
                                <div className={`w-2 h-2 rounded-full shrink-0 ${selectedGuestId === guest.id ? 'bg-[#D0771E]' : 'bg-[#E82F16]'}`}></div>
                                <div className="flex-1 min-w-0">
                                    <div className={`text-xs font-normal truncate ${selectedGuestId === guest.id ? 'text-white' : 'text-[#262626] dark:text-gray-300'}`}>{guest.name}</div>
                                </div>
                                {selectedGuestId === guest.id && <PlusIcon className="w-3.5 h-3.5 text-[#D0771E]" />}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 mb-6">
                        <p className="text-[9px] text-gray-400 dark:text-gray-500 italic font-medium">Drag and drop to add guests to table</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="text-[9px] font-black text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all uppercase tracking-widest">Previous</button>
                        <button className="text-[9px] font-black text-[#D0771E] hover:text-orange-700 transition-all uppercase tracking-widest">Next</button>
                    </div>
                </div>

                <div className="p-8 border-t border-gray-50 dark:border-gray-700 bg-white dark:bg-gray-800 h-28 flex items-center justify-around">
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-black text-gray-900 dark:text-white leading-none mb-2">{tables.length}</p>
                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Tables</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-black text-[#D0771E] leading-none mb-2">{seatedCount}</p>
                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Seated</p>
                    </div>
                </div>
            </div>

            {/* --- MAIN CANVAS: SEATING MAP --- */}
            <div className="flex-1 flex flex-col bg-[#FCFCFC] dark:bg-gray-900 overflow-hidden relative min-h-[600px] lg:min-h-0">

                {/* Canvas Toolbar Overlay */}
                <div className="absolute top-4 lg:top-8 left-4 lg:left-12 right-4 lg:right-12 z-20 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center pointer-events-none">
                    <div className="flex gap-4 lg:gap-8 pointer-events-auto w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                        <div className="flex items-center gap-2 group cursor-pointer px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 dark:border-gray-700/50 hover:border-[#D0771E]/30 transition-all shrink-0">
                            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#D0771E]" />
                            <span className="text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest">Search</span>
                        </div>
                        <div className="flex items-center gap-2 group cursor-pointer px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 dark:border-gray-700/50 hover:border-[#D0771E]/30 transition-all shrink-0">
                            <FunnelIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#D0771E]" />
                            <span className="text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest">Filter</span>
                        </div>
                    </div>

                    <div className="flex gap-2 lg:gap-4 pointer-events-auto w-full lg:w-auto">
                        <button
                            onClick={() => setIsPreviewMode(true)}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 dark:border-gray-700/50 text-xs font-black text-gray-600 dark:text-gray-300 hover:text-[#D0771E] hover:border-[#D0771E]/30 transition-all uppercase tracking-widest"
                        >
                            <EyeIcon className="w-4 h-4" /> Preview
                        </button>
                        <button className="flex-1 lg:flex-none px-8 py-3 bg-[#D0771E] text-white rounded-2xl text-xs font-black hover:bg-orange-600 transition-all shadow-lg dark:shadow-none shadow-orange-100 uppercase tracking-widest transform active:scale-95">
                            Save
                        </button>
                    </div>
                </div>

                <div
                    ref={canvasRef}
                    className="flex-1 overflow-hidden p-12 relative flex flex-col items-center select-none"
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        // Canvas drop is secondary now, but good to keep for guest assignment if we had it here
                        setDraggingTableId(null);
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

                    <div className="w-full max-w-5xl h-20 bg-[#FFE7CF] dark:bg-orange-900/20 border border-dashed border-[#D0771E] rounded-lg flex items-center justify-center mb-16 relative">
                        <span className="text-base font-normal text-[#8C8C8C] dark:text-gray-400">Head Table / Stage Area</span>
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FFE7CF] dark:bg-orange-900/20 border border-[#D0771E] rounded-full"></div>
                    </div>

                    <div className="w-full h-full relative">
                        {tables.map((table) => (
                            <div
                                key={table.id}
                                ref={(el) => {
                                    if (el) tableRefs.current.set(table.id, el);
                                    else tableRefs.current.delete(table.id);
                                }}
                                onMouseDown={(e) => handleTableMouseDown(e, table.id)}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // Highlight if we are dragging a guest
                                    if (!draggingTableId) {
                                        setDragOverTableId(table.id);
                                    }
                                }}
                                onDragLeave={() => setDragOverTableId(null)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setDragOverTableId(null);
                                    const guestId = e.dataTransfer.getData('guestId');
                                    if (guestId) {
                                        assignGuestToTable(table.id, parseInt(guestId));
                                    }
                                }}
                                onClick={() => {
                                    // Only select if the mouse hasn't moved (distinguish click from drag)
                                    if (hasMovedRef.current) return;

                                    if (selectedGuestId) {
                                        assignGuestToTable(table.id);
                                    } else {
                                        setSelectedTableId(table.id);
                                    }
                                }}
                                style={{
                                    transform: `translate3d(${table.x}px, ${table.y}px, 0)`,
                                    transition: draggingTableId === table.id ? 'none' : 'transform 0.2s ease-out, opacity 0.2s'
                                }}
                                className={`absolute left-0 top-0 group flex flex-col items-center
                                    ${draggingTableId === table.id ? 'opacity-40 scale-95 z-[100]' : 'z-10'}
                                    ${selectedGuestId ? 'cursor-pointer scale-105' : 'cursor-grab active:cursor-grabbing hover:scale-[1.02]'}`}
                            >
                                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
                                    {[...Array(table.capacity)].map((_, c) => {
                                        const isOccupied = c < table.guestIds.length;
                                        const angle = (c * (360 / table.capacity)) - 90; // Top start
                                        const radius = table.type === 'round' ? 68 : 78;

                                        // Rectangle layout logic: 4 on top, 4 on bottom
                                        let rectX = 0;
                                        let rectY = 0;
                                        if (table.type === 'rectangle') {
                                            const isBottom = c >= 4;
                                            const indexInRow = c % 4;
                                            rectX = (indexInRow * 32) - 48; // Spacing of 32
                                            rectY = isBottom ? 54 : -54;
                                        }

                                        return (
                                            <div
                                                key={c}
                                                className={`absolute w-2 h-2 rounded-full transition-all duration-500 ${isOccupied ? 'bg-[#D0771E]' : 'bg-[#D9D9D9]'}`}
                                                style={{
                                                    transform: table.type === 'round'
                                                        ? `rotate(${angle}deg) translate(${radius}px)`
                                                        : `translate(${rectX}px, ${rectY}px)`,
                                                }}
                                            />
                                        );
                                    })}
                                </div>

                                <div className={`
                                    relative z-10 transition-all duration-300 flex items-center justify-center
                                    ${table.type === 'round' ? 'w-28 h-28 rounded-full' : 'w-36 h-24 rounded-lg'}
                                    ${dragOverTableId === table.id ? 'border-4 border-[#D0771E] bg-orange-50/40 shadow-2xl scale-110' :
                                        selectedGuestId ? 'border border-dashed border-[#D0771E] bg-orange-50/20 shadow-md' :
                                            selectedTableId === table.id ? 'border-2 border-[#D0771E] bg-orange-50/5 shadow-md' :
                                                table.conflicts && table.conflicts.length > 0 ? 'border-2 border-rose-500 bg-rose-50/5 shadow-lg' :
                                                    'border border-orange-100/40 bg-white shadow-lg'}
                                `}>
                                    <div className="text-center">
                                        <p className="text-sm font-normal text-[#262626] dark:text-gray-300 truncate max-w-[80px]">{table.name}</p>
                                        {table.conflicts && table.conflicts.length > 0 && (
                                            <div className="absolute -top-2 -right-2 bg-rose-500 text-white w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                                                <ExclamationCircleIcon className="w-3.5 h-3.5" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                                        <span className="text-xs font-normal text-[#BFBFBF] dark:text-gray-500">
                                            {table.guestIds.length}/{table.capacity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDEBAR: TABLE SETTINGS --- */}
            {selectedTableId && (
                <div className="absolute inset-0 z-[100] flex justify-end animate-fade-in group">
                    <div onClick={() => setSelectedTableId(null)} className="absolute inset-0 bg-black/5 backdrop-blur-[2px]"></div>
                    <div className="w-full sm:w-[420px] bg-white dark:bg-gray-800 h-full shadow-2xl dark:shadow-none relative flex flex-col animate-slide-in-right border-l border-gray-100 dark:border-gray-700">
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Table Settings</h2>
                            <button onClick={() => setSelectedTableId(null)} className="p-2 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                                <XMarkIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {/* Conflicts Listing */}
                            {currentTable?.conflicts && currentTable.conflicts.length > 0 && (
                                <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-2xl space-y-3">
                                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                                        <ExclamationCircleIcon className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Active Table Conflicts ({currentTable.conflicts.length})</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {currentTable.conflicts.map((c, i) => (
                                            <li key={i} className="text-xs font-bold text-rose-800 dark:text-rose-300">• {c}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Table Name */}
                            <div className="space-y-2.5">
                                <label className="text-xs font-bold text-gray-900 dark:text-white block">Table Name</label>
                                <input
                                    type="text"
                                    value={editTableName}
                                    onChange={(e) => setEditTableName(e.target.value)}
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-medium dark:text-white focus:ring-1 focus:ring-orange-100 dark:focus:ring-orange-900/30 focus:border-[#D0771E] placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                    placeholder="Enter table name"
                                />
                            </div>

                            {/* Number of Seats */}
                            <div className="space-y-2.5" ref={seatDropdownRef}>
                                <label className="text-xs font-bold text-gray-900 dark:text-white block">Number of Seats</label>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowSeatDropdown(!showSeatDropdown)}
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-medium dark:text-white flex justify-between items-center hover:border-gray-300 dark:hover:border-gray-500 transition-all"
                                    >
                                        <span className="text-gray-600 dark:text-gray-300">{editCapacity} seats</span>
                                        <ChevronDownIcon className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform ${showSeatDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showSeatDropdown && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl dark:shadow-none z-20 overflow-hidden py-1 animate-scale-in">
                                            {[4, 6, 8, 10, 12].map(seat => (
                                                <button
                                                    key={seat}
                                                    onClick={() => { setEditCapacity(seat); setShowSeatDropdown(false); }}
                                                    className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-orange-50/50 dark:hover:bg-gray-700 transition-all ${editCapacity === seat ? 'text-[#D0771E] bg-orange-50/20 dark:bg-orange-900/20' : 'text-gray-500 dark:text-gray-400'}`}
                                                >
                                                    {seat} seats
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Add Guests */}
                            <div className="space-y-2.5 relative">
                                <label className="text-xs font-bold text-gray-900 dark:text-white block">Add Guests</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={guestSearchTerm}
                                        onChange={(e) => setGuestSearchTerm(e.target.value)}
                                        placeholder="Enter Guest Name"
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-medium dark:text-white focus:ring-1 focus:ring-orange-100 dark:focus:ring-orange-900/30 focus:border-[#D0771E] placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                    />
                                    {guestSearchTerm && sidebarSearchGuests.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl dark:shadow-none z-20 overflow-hidden py-1">
                                            {sidebarSearchGuests.map(g => (
                                                <button
                                                    key={g.id}
                                                    onClick={() => assignGuestToTable(selectedTableId!, g.id)}
                                                    className="w-full text-left px-4 py-3 border-b border-gray-50 dark:border-gray-700 last:border-none hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 group"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{g.name}</span>
                                                    <PlusIcon className="w-3 h-3 text-[#D0771E] ml-auto opacity-0 group-hover:opacity-100" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Assigned Guests List */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Assigned Guests ({currentTable?.guestIds.length}/{editCapacity})</label>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {currentTable?.guestIds.map(gId => {
                                        const guest = guests.find(g => g.id === gId);
                                        return (
                                            <div key={gId} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 rounded-lg text-[11px] font-bold text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-600 group">
                                                {guest?.name}
                                                <TrashIcon
                                                    onClick={() => unassignGuest(gId, selectedTableId!)}
                                                    className="w-3 h-3 text-red-300 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors"
                                                />
                                            </div>
                                        );
                                    })}
                                    {currentTable?.guestIds.length === 0 && (
                                        <p className="text-xs text-gray-300 dark:text-gray-500 italic">No guests assigned yet</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-8 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={saveTableSettings}
                                className="w-full py-4 bg-[#D0771E] text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg dark:shadow-none shadow-orange-100 hover:bg-orange-600 transition-all transform hover:scale-[1.01]"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* --- PREVIEW MODE OVERLAY --- */}
            {isPreviewMode && (
                <div className="fixed inset-0 z-[200] bg-[#F9FAFB] dark:bg-gray-900 flex flex-col overflow-y-auto animate-fade-in">
                    {/* Preview Top Header */}
                    <div className="sticky top-0 z-[210] bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-12 py-6 flex justify-between items-center shadow-sm dark:shadow-none">
                        <div className="space-y-1">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Seating Chart Preview</h1>
                            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Final layout for printing and sharing</p>
                        </div>
                        <div className="flex items-center gap-6">
                            {/* Toggle Names/Numbers */}
                            <div className="flex items-center p-1 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                                <button
                                    onClick={() => setPreviewViewType('names')}
                                    className={`px-4 py-1.5 rounded-md text-[11px] font-bold transition-all flex items-center gap-2 ${previewViewType === 'names' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm dark:shadow-none' : 'text-gray-400 dark:text-gray-500'}`}
                                >
                                    <EyeIcon className="w-3.5 h-3.5" /> Names
                                </button>
                                <button
                                    onClick={() => setPreviewViewType('numbers')}
                                    className={`px-4 py-1.5 rounded-md text-[11px] font-bold transition-all flex items-center gap-2 ${previewViewType === 'numbers' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm dark:shadow-none' : 'text-gray-400 dark:text-gray-500'}`}
                                >
                                    <HashtagIcon className="w-3.5 h-3.5" /> #
                                </button>
                            </div>
                            <button
                                onClick={() => window.print()}
                                className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                                <ArrowDownTrayIcon className="w-4 h-4" /> Download PDF
                            </button>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Preview link copied to clipboard!');
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#D0771E] text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-all shadow-md dark:shadow-none shadow-orange-100"
                            >
                                <ShareIcon className="w-4 h-4" /> Share
                            </button>
                        </div>
                    </div>

                    {/* Preview Content "The Paper" */}
                    <div className="flex-1 p-16 flex flex-col items-center">
                        <div className="w-full max-w-[1000px] bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] dark:shadow-none border border-gray-50 dark:border-gray-700 p-20 flex flex-col items-center overflow-hidden">
                            {/* Event Header */}
                            <div className="text-center space-y-3 mb-16">
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">John & Chinwe's Wedding Reception</h2>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-1">June 15, 2025 • 7:00 PM</p>
                                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">Grand Ballroom, Heritage Hotel</p>
                                </div>
                            </div>

                            {/* The Grid Canvas */}
                            <div className="w-full relative min-h-[600px] flex flex-col items-center">
                                {/* Base Grid Pattern */}
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

                                {/* Head Table Placeholder */}
                                <div className="w-full h-24 bg-orange-50/50 dark:bg-orange-900/20 border-2 border-dashed border-[#D0771E]/30 rounded-2xl flex items-center justify-center mb-24 relative">
                                    <span className="text-lg font-bold text-gray-400/80 dark:text-gray-500">Head Table / Stage Area</span>
                                </div>

                                {/* Tables Layer */}
                                <div className="w-full relative h-[500px]">
                                    {tables.map(table => (
                                        <div
                                            key={table.id}
                                            className="absolute left-0 top-0 flex flex-col items-center"
                                            style={{ transform: `translate3d(${table.x}px, ${table.y}px, 0)` }}
                                        >
                                            {/* Occupancy Indicator Above Table */}
                                            <span className="mb-4 text-[10px] font-black text-gray-200 dark:text-gray-500 uppercase tracking-widest">{table.guestIds.length}/{table.capacity}</span>

                                            <div className={`flex flex-col items-center justify-center border-2 border-gray-100 dark:border-gray-700 transition-all shadow-sm dark:shadow-none bg-white dark:bg-gray-800 relative p-4
                                                ${table.type === 'round' ? 'w-28 h-28 rounded-full' : 'w-36 h-24 rounded-2xl'}`}>

                                                {/* Labels */}
                                                {previewViewType === 'numbers' ? (
                                                    <span className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-wider">{table.name}</span>
                                                ) : (
                                                    <div className="flex flex-col items-center text-center gap-0.5">
                                                        <span className="text-[10px] font-black text-gray-800 dark:text-white uppercase tracking-widest leading-none mb-1">{table.name}</span>
                                                        <div className="max-h-[40px] overflow-hidden flex flex-col items-center">
                                                            {table.guestIds.slice(0, 3).map(gId => {
                                                                const g = guests.find(guest => guest.id === gId);
                                                                return (
                                                                    <span key={gId} className="text-[8px] font-bold text-gray-400 dark:text-gray-500 truncate w-full max-w-[80px] leading-tight font-inter">
                                                                        {g?.name}
                                                                    </span>
                                                                );
                                                            })}
                                                            {table.guestIds.length > 3 && (
                                                                <span className="text-[7px] font-black text-[#D0771E] mt-0.5">+ {table.guestIds.length - 3} MORE</span>
                                                            )}
                                                            {table.guestIds.length === 0 && (
                                                                <span className="text-[7px] font-bold text-gray-300 dark:text-gray-600 italic uppercase">Empty Table</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Dots around table (Preview Mode) */}
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    {[...Array(table.capacity)].map((_, c) => {
                                                        const radius = table.type === 'round' ? 68 : 82;
                                                        const angle = (c * (360 / table.capacity)) * (Math.PI / 180);
                                                        const dx = Math.cos(angle) * (table.type === 'round' ? radius : radius * 1.05);
                                                        const dy = Math.sin(angle) * radius;
                                                        const isOccupied = c < table.guestIds.length;
                                                        return (
                                                            <div
                                                                key={c}
                                                                className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-300 ${isOccupied ? 'bg-[#D0771E] scale-110' : 'bg-gray-200 opacity-60'}`}
                                                                style={{ transform: `translate(${dx}px, ${dy}px)` }}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Stats Grid */}
                            <div className="w-full mt-32 grid grid-cols-4 gap-8 py-10 border-t border-gray-50 dark:border-gray-700 border-double">
                                <div className="text-center space-y-1">
                                    <p className="text-xl font-black text-gray-800 dark:text-white">{tables.length}</p>
                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Tables</p>
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-xl font-black text-gray-800 dark:text-white">{seatedCount}</p>
                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Seated</p>
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-xl font-black text-gray-800 dark:text-white">{tables.reduce((acc, t) => acc + t.capacity, 0)}</p>
                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Capacity</p>
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-xl font-black text-[#D0771E]">{Math.round((seatedCount / Math.max(1, tables.reduce((acc, t) => acc + t.capacity, 0))) * 100)}%</p>
                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Occupancy</p>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-12 mt-6 pb-2">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#D0771E]"></div>
                                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Occupied Seat</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Available Seat</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#D0771E]"></div>
                                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Round Table</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-4 h-2.5 rounded-sm border-2 border-[#D0771E]"></div>
                                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Rectangle Table</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Exit Button */}
                        <div className="mt-12 mb-20 pointer-events-auto">
                            <button
                                onClick={() => setIsPreviewMode(false)}
                                className="group flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-gray-800 text-white rounded-full text-xs font-bold hover:bg-black dark:hover:bg-gray-700 transition-all shadow-2xl dark:shadow-none hover:scale-105 active:scale-95"
                            >
                                <XMarkIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-white transition-colors" />
                                Exit Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatingChart;
