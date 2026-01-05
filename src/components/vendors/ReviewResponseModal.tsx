import React, { useState } from 'react';
import { XMarkIcon, StarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface ReviewResponseModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: any;
    onSave?: (response: string) => void;
}

const ReviewResponseModal: React.FC<ReviewResponseModalProps> = ({ isOpen, onClose, review, onSave }) => {
    const [response, setResponse] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen || !review) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setIsSuccess(true);
            if (onSave) onSave(response);
        }, 600);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-[#1D2939] uppercase tracking-tighter italic">Review Response</h2>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Reply to {review.clientName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-all shadow-sm">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {isSuccess ? (
                        <div className="py-12 flex flex-col items-center text-center space-y-6">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 animate-pulse">
                                <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 uppercase italic">Response Published</h3>
                            <p className="text-sm text-gray-500 italic">Your reply has been sent to the client and is now visible on your profile.</p>
                            <button onClick={onClose} className="px-12 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#D0771E] transition-all">Close</button>
                        </div>
                    ) : (
                        <>
                            {/* Original Review Snippet */}
                            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 italic relative">
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIconSolid key={i} className={`w-3 h-3 ${i < review.rating ? 'text-[#D0771E]' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-3">"{review.comment}"</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-black">{review.clientName[0]}</div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{review.clientName}</span>
                                </div>
                            </div>

                            {/* Response Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Your Response</label>
                                <textarea
                                    required
                                    placeholder="Thank the client and address their feedback..."
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    className="w-full h-32 bg-white border border-gray-100 rounded-3xl p-6 text-sm font-medium focus:ring-2 focus:ring-[#D0771E] focus:outline-none transition-all placeholder:italic"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-5 bg-[#D0771E] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-orange-600 shadow-xl shadow-orange-100 transition-all"
                                >
                                    Post Response
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewResponseModal;
