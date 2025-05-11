import React from 'react';
import { motion } from 'framer-motion';
import { X, MessageCircle, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMatch } from '../contexts/MatchContext';
import { mockUsers } from '../data/mockData';

interface MatchModalProps {
  userId: string;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ userId, onClose }) => {
  const navigate = useNavigate();
  const { matches } = useMatch();
  
  const matchedUser = mockUsers.find(user => user.id === userId);
  const match = matches.find(match => match.user.id === userId);
  
  const handleViewMission = () => {
    if (match) {
      navigate(`/mission/${match.id}`);
    }
    onClose();
  };
  
  const handleMessage = () => {
    if (match) {
      navigate(`/chat/${match.id}`);
    }
    onClose();
  };
  
  if (!matchedUser || !match) return null;
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="relative p-1">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="p-6 text-center">
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4">
                  <div className="w-full h-full blur-md bg-gradient-to-r from-violet-400 to-pink-400 rounded-full opacity-70 animate-pulse"></div>
                </div>
                <div className="relative">
                  <Music className="w-16 h-16 text-purple-600" />
                </div>
              </motion.div>
            </div>
            
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent"
            >
              SYNK COMPLETE!
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-gray-600"
            >
              You and {matchedUser.nickname} have a music compatibility of{' '}
              <span className="text-violet-700 font-bold">{matchedUser.compatibilityScore}%</span>
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-violet-50 p-4 rounded-lg mb-6"
            >
              <h3 className="font-bold text-violet-900 mb-2">New Mission Unlocked!</h3>
              <p className="text-sm text-violet-800">
                {match.mission.title}: {match.mission.description}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={handleViewMission}
                className="py-3 px-4 bg-violet-100 text-violet-700 rounded-lg font-medium hover:bg-violet-200 transition-colors flex items-center justify-center gap-2"
              >
                <Music className="w-5 h-5" />
                <span>View Mission</span>
              </motion.button>
              
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={handleMessage}
                className="py-3 px-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-pink-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Message</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MatchModal;