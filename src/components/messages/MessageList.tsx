import React from 'react';
import { Message } from '../../pages/messages/Messages';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface MessageListProps {
  messages: Message[];
  messageActions: { [key: string]: boolean };
  setMessageActions: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  handleReaction: (messageId: string, reactionType: string) => void;
  toggleMessageActions: (messageId: string) => void;
  formatTime: (timeString: string) => string;
  renderReactionIcon: (type: string) => JSX.Element;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  messageActions,
  setMessageActions,
  handleReaction,
  toggleMessageActions,
  formatTime,
  renderReactionIcon
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] bg-gray-50 px-3 py-1 rounded-full">Today, March 24</span>
      </div>

      {messages.map((msg) => (
        <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
          {msg.type === 'file' ? (
            // File message display
            <div
              className={`max-w-[70%] px-6 py-4 rounded-3xl text-sm font-medium shadow-sm relative group ${msg.sender === 'me'
                ? 'bg-[#F9FAFB] text-[#475467] rounded-tr-none border border-gray-100'
                : 'bg-orange-50 text-[#1D2939] rounded-tl-none border border-orange-100'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-sm">{msg.fileName}</div>
                  <div className="text-xs text-gray-500">{msg.fileSize}</div>
                </div>
              </div>
              {/* Message status indicator */}
              {msg.sender === 'me' && msg.status && (
                <div className="absolute -bottom-5 right-0 flex items-center gap-1">
                  {msg.status === 'sent' && <CheckCircleIcon className="w-4 h-4 text-gray-400" />}
                  {msg.status === 'delivered' && <CheckCircleIcon className="w-4 h-4 text-gray-400" />}
                  {msg.status === 'read' && <CheckCircleIcon className="w-4 h-4 text-blue-500" />}
                </div>
              )}
            </div>
          ) : (
            // Text message display
            <div
              className={`max-w-[70%] px-6 py-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm relative group ${msg.sender === 'me'
                ? 'bg-[#F9FAFB] text-[#475467] rounded-tr-none border border-gray-100'
                : 'bg-orange-50 text-[#1D2939] rounded-tl-none border border-orange-100'
                }`}
              onMouseEnter={() => setMessageActions(prev => ({ ...prev, [msg.id]: true }))}
              onMouseLeave={() => setMessageActions(prev => ({ ...prev, [msg.id]: false }))}
            >
              {msg.text}
              {/* Message status indicator */}
              {msg.sender === 'me' && msg.status && (
                <div className="absolute -bottom-5 right-0 flex items-center gap-1">
                  {msg.status === 'sent' && <CheckCircleIcon className="w-4 h-4 text-gray-400" />}
                  {msg.status === 'delivered' && <CheckCircleIcon className="w-4 h-4 text-gray-400" />}
                  {msg.status === 'read' && <CheckCircleIcon className="w-4 h-4 text-blue-500" />}
                </div>
              )}
              {/* Message actions menu */}
              {messageActions[msg.id] && (
                <div className="absolute -top-10 right-0 flex gap-2 bg-white shadow-lg rounded-lg p-2 border border-gray-200 z-10">
                  <button
                    onClick={() => handleReaction(msg.id, 'like')}
                    className="p-1.5 rounded-full hover:bg-gray-100"
                    aria-label="Like message"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                  </button>
                  <button
                    onClick={() => handleReaction(msg.id, 'love')}
                    className="p-1.5 rounded-full hover:bg-gray-100"
                    aria-label="Love message"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  </button>
                  <button
                    onClick={() => handleReaction(msg.id, 'laugh')}
                    className="p-1.5 rounded-full hover:bg-gray-100"
                    aria-label="Laugh at message"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </button>
                  <button
                    onClick={() => toggleMessageActions(msg.id)}
                    className="p-1.5 rounded-full hover:bg-gray-100"
                    aria-label="More options"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Reactions display - only for text messages */}
          {msg.reactions && msg.reactions.length > 0 && msg.type !== 'file' && (
            <div className="flex gap-1 mt-1">
              {msg.reactions.map((reaction, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    reaction.users.includes('You')
                      ? 'bg-[#D0771E] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {renderReactionIcon(reaction.type)}
                  <span>{reaction.count}</span>
                </div>
              ))}
            </div>
          )}

          <span className="text-[9px] font-bold text-gray-400 mt-2 px-2 uppercase">{formatTime(msg.time)}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;