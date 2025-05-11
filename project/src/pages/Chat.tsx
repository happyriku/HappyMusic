import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ChevronLeft, Music } from 'lucide-react';
import { useMatch } from '../contexts/MatchContext';
import { Message } from '../types';

const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { matches } = useMatch();
  const [messageText, setMessageText] = useState('');
  
  const match = matches.find(m => m.id === id);
  
  if (!match) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold mb-4">Match not found</h2>
        <button
          onClick={() => navigate('/matches')}
          className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700"
        >
          Back to Matches
        </button>
      </div>
    );
  }
  
  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        content: messageText,
        timestamp: new Date(),
      };
      
      // In a real app, this would update the messages state through a context
      match.messages.push(newMessage);
      
      setMessageText('');
      
      // Add a simulated response
      setTimeout(() => {
        const response: Message = {
          id: `msg-${Date.now() + 1}`,
          sender: 'match',
          content: 'I love that song too! When should we try the mission?',
          timestamp: new Date(),
        };
        match.messages.push(response);
      }, 1000);
    }
  };
  
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-sm border-b p-3 flex items-center"
      >
        <button 
          onClick={() => navigate('/matches')}
          className="mr-2"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white mr-3"
          style={{ backgroundColor: match.user.profileColor }}
        >
          {match.user.nickname.charAt(0)}
        </div>
        
        <div>
          <h3 className="font-bold">{match.user.nickname}</h3>
          <div className="text-xs text-gray-500 flex items-center">
            <Music className="w-3 h-3 mr-1" />
            <span>{match.user.compatibilityScore}% match</span>
          </div>
        </div>
      </motion.div>
      
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        {match.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="bg-violet-100 rounded-full p-4 mb-4">
              <Music className="w-8 h-8 text-violet-500" />
            </div>
            <h3 className="font-bold text-lg mb-2">Start the conversation!</h3>
            <p className="text-gray-600 max-w-xs">
              Share your thoughts about your music mission or discuss your favorite songs.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {match.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs rounded-2xl px-4 py-2 ${
                    message.sender === 'user' 
                      ? 'bg-violet-600 text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 rounded-tl-none'
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-white p-3 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow border border-gray-300 rounded-full py-2 px-4 focus:ring-violet-500 focus:border-violet-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              messageText.trim() 
                ? 'bg-violet-600 text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;