import React from 'react';
import { Chat } from '../../pages/messages/Messages';
import {
  VideoCameraIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface ChatHeaderProps {
  selectedChat: string;
  chats: Chat[];
  showProfilePanel: boolean;
  setShowProfilePanel: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedChat,
  chats,
  showProfilePanel,
  setShowProfilePanel,
  isMobile,
  setSelectedChat
}) => {
  return (
    <div className="px-4 sm:px-8 py-5 border-b border-gray-100 flex items-center gap-4">
      {isMobile && (
        <button 
          onClick={() => setSelectedChat('')}
          className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-[#1D2939] transition-all"
          aria-label="Back to chat list"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      )}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <img
            src={chats.find(c => c.id === selectedChat)?.avatar}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h2 className="text-base font-black text-[#1D2939] tracking-tight truncate leading-tight">
            {chats.find(c => c.id === selectedChat)?.name}
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Last seen: Just now</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-[#1D2939] transition-all">
          <VideoCameraIcon className="w-5 h-5" />
        </button>
        <button className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-[#1D2939] transition-all">
          <PhoneIcon className="w-5 h-5" />
        </button>
        <button className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-[#1D2939] transition-all">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
        {!isMobile && (
          <button 
            onClick={() => setShowProfilePanel(!showProfilePanel)}
            className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-[#1D2939] transition-all"
            aria-label={showProfilePanel ? "Hide profile panel" : "Show profile panel"}
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </button>
        )}
        {isMobile && (
          <button 
            onClick={() => setShowProfilePanel(!showProfilePanel)}
            className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-[#1D2939] transition-all"
            aria-label={showProfilePanel ? "Hide profile panel" : "Show profile panel"}
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;