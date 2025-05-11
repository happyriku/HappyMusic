import React from 'react';
import { Match } from '../types';
import { Music, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const navigate = useNavigate();
  
  const goToChat = () => {
    navigate(`/chat/${match.id}`);
  };
  
  const goToMission = () => {
    navigate(`/mission/${match.id}`);
  };
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4 p-4">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
          style={{ backgroundColor: match.user.profileColor }}
        >
          {match.user.nickname.charAt(0)}
        </div>
        
        <div>
          <h3 className="font-bold text-lg">{match.user.nickname}</h3>
          <p className="text-gray-600 text-sm">{match.user.age}, {match.user.location}</p>
          <div className="mt-1 flex items-center">
            <div className="bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded-full flex items-center">
              <span className="mr-1">Compatibility</span>
              <span className="font-bold">{match.user.compatibilityScore}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-2">
        <h4 className="font-semibold text-violet-800 flex items-center">
          <Music className="w-4 h-4 mr-1" />
          SYNK Mission
        </h4>
        <div className="mt-2 bg-violet-50 rounded-md p-3">
          <h5 className="font-bold">{match.mission.title}</h5>
          <p className="text-sm text-gray-700 mt-1">{match.mission.description}</p>
          
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <div className="bg-violet-200 text-violet-800 px-2 py-1 rounded-full">
              {match.mission.emotion}
            </div>
            <div className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full">
              {match.mission.genre}
            </div>
            <div className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {match.mission.location}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex border-t border-gray-100 mt-2">
        <button 
          onClick={goToMission}
          className="flex-1 py-3 text-center font-medium text-violet-700 hover:bg-violet-50 transition-colors"
        >
          View Mission
        </button>
        <button 
          onClick={goToChat}
          className="flex-1 py-3 text-center font-medium text-pink-600 hover:bg-pink-50 transition-colors border-l border-gray-100"
        >
          Message
        </button>
      </div>
    </motion.div>
  );
};

export default MatchCard;