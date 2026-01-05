import React, { useState } from 'react';
import { XMarkIcon, ClipboardIcon, CheckIcon, ShareIcon, EnvelopeIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    url: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, url }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const platforms = [
        { name: 'Email', icon: EnvelopeIcon, color: 'text-blue-600 bg-blue-50' },
        { name: 'WhatsApp', icon: ChatBubbleOvalLeftEllipsisIcon, color: 'text-green-600 bg-green-50' },
        { name: 'Broadcast', icon: ShareIcon, color: 'text-purple-600 bg-purple-50' }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-[#1D2939] uppercase tracking-tighter italic">Share {title}</h2>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Spread the word about your concept</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* URL Bar */}
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Public Link</label>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-gray-50 px-6 py-4 rounded-2xl text-sm font-bold text-gray-500 truncate border border-gray-100 italic">
                                {url}
                            </div>
                            <button
                                onClick={handleCopy}
                                className={`p-4 rounded-2xl transition-all shadow-lg ${copied ? 'bg-green-500 text-white shadow-green-100' : 'bg-black text-white shadow-gray-200'}`}
                            >
                                {copied ? <CheckIcon className="w-6 h-6" /> : <ClipboardIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Social Platforms */}
                    <div className="grid grid-cols-3 gap-4">
                        {platforms.map((platform) => (
                            <button key={platform.name} className="flex flex-col items-center gap-3 p-6 rounded-3xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${platform.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                    <platform.icon className="w-7 h-7" />
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{platform.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                        <p className="text-[10px] font-medium text-orange-800 leading-relaxed italic">
                            "Note: Sharing a concept link allows anyone with the URL to view your moodboard and general event structure."
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 flex justify-between items-center">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Ariya Premium Service</span>
                    <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-[#D0771E]">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
