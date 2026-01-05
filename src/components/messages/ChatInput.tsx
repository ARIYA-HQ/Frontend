import React from 'react';
import {
  PhotoIcon,
  MicrophoneIcon,
  FaceSmileIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface ChatInputProps {
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  isSendingError: boolean;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  messageInput,
  setMessageInput,
  handleSendMessage,
  handleKeyPress,
  isLoading,
  isSendingError,
  handleFileUpload
}) => {
  return (
    <div className="p-4 sm:p-8 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto flex items-center gap-4 bg-gray-50/50 p-2 rounded-[28px] border border-gray-100 shadow-inner">
        <div className="flex items-center px-4">
          <label className="cursor-pointer p-2 text-gray-400 hover:text-[#1D2939] transition-all" aria-label="Attach file">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
              onClick={(e) => {
                // Reset the value to allow selecting the same file again
                (e.target as HTMLInputElement).value = '';
              }}
            />
          </label>
          <button className="p-2 text-gray-400 hover:text-[#1D2939] transition-all" aria-label="Record voice message">
            <MicrophoneIcon className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-400 hover:text-[#1D2939] transition-all" aria-label="Add emoji">
            <FaceSmileIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <textarea
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            className="w-full bg-transparent border-none focus:ring-0 text-gray-900 font-bold placeholder:text-gray-400 placeholder:font-bold py-3 resize-none"
          />
          {isLoading && (
            <div className="text-[10px] text-gray-500 font-bold">Sending...</div>
          )}
          {isSendingError && (
            <div className="text-[10px] text-red-500 font-bold flex items-center gap-1">
              <ExclamationTriangleIcon className="w-4 h-4" /> Error sending message
            </div>
          )}
        </div>
        <button 
          onClick={handleSendMessage}
          disabled={isLoading || messageInput.trim() === ''}
          className={`bg-[#D0771E] text-white p-4 rounded-2xl shadow-xl shadow-orange-100 hover:scale-[1.05] transition-all hover:bg-orange-700 ${isLoading || messageInput.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;