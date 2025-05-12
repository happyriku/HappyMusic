import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';
import { useUser } from '../../context/UserContext';

const GroupChat: React.FC = () => {
  const { currentGroup, sendMessage } = useMatch();
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [currentGroup?.messages]);
  
  if (!currentGroup || !user) return null;
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };
  
  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4">
        {currentGroup.messages.length === 0 ? (
          <div className="text-center py-8 text-white opacity-70">
            <p className="mb-2">まだメッセージがありません</p>
            <p className="text-sm">カラオケの日程や場所について話し合ってみましょう</p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentGroup.messages.map((msg) => {
              const isMe = msg.userId === user.id;
              const sender = currentGroup.members.find(m => m.id === msg.userId);
              
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <div className="flex-shrink-0 mr-2">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm">
                        {sender?.nickname.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  <div className={`max-w-[70%]`}>
                    {!isMe && (
                      <div className="text-xs text-white opacity-80 mb-1 ml-1">
                        {sender?.nickname}
                      </div>
                    )}
                    
                    <div className={`rounded-lg px-3 py-2 text-sm ${
                      isMe 
                        ? 'bg-pink-500 text-white rounded-tr-none' 
                        : 'bg-purple-600 text-white rounded-tl-none'
                    }`}>
                      {msg.content}
                      <div className={`text-xs opacity-70 mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <div className="bg-purple-800 rounded-lg overflow-hidden">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white placeholder-opacity-50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-3 text-white opacity-90 hover:opacity-100 focus:outline-none disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;