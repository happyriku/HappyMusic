import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Music, Calendar, MapPin, MessageCircle, Check } from 'lucide-react';
import { useMatch } from '../contexts/MatchContext';

const Mission: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { matches } = useMatch();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const match = matches.find(m => m.id === id);
  
  if (!match) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold mb-4">Mission not found</h2>
        <button
          onClick={() => navigate('/matches')}
          className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700"
        >
          Back to Matches
        </button>
      </div>
    );
  }
  
  const { mission } = match;
  
  const handleComplete = () => {
    setIsCompleted(true);
    mission.completed = true;
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex items-center"
      >
        <button 
          onClick={() => navigate('/matches')}
          className="mr-2"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold">SYNK Mission</h1>
      </motion.div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div 
          className="h-40 relative bg-gradient-to-r from-violet-600 to-indigo-600"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="w-24 h-24 text-white opacity-20" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white border-2 border-white"
                style={{ backgroundColor: match.user.profileColor }}
              >
                {match.user.nickname.charAt(0)}
              </div>
              <div>
                <h3 className="text-white font-bold">Mission with {match.user.nickname}</h3>
                <div className="text-white text-opacity-90 text-sm flex items-center">
                  <Music className="w-4 h-4 mr-1" />
                  <span>{match.user.compatibilityScore}% compatibility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-6">
            <div className="bg-violet-50 rounded-lg p-4">
              <h2 className="text-xl font-bold text-violet-800 mb-2">{mission.title}</h2>
              <p className="text-gray-700 mb-4">{mission.description}</p>
              
              <div className="flex flex-wrap gap-2">
                <div className="bg-violet-200 text-violet-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>{mission.emotion}</span>
                </div>
                <div className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>{mission.genre}</span>
                </div>
                <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{mission.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Featured Song</h3>
            <div className="flex items-center bg-gray-50 rounded-lg p-3">
              <img 
                src={mission.song.albumArt} 
                alt={mission.song.title} 
                className="w-16 h-16 object-cover rounded mr-3"
              />
              <div>
                <h4 className="font-bold">{mission.song.title}</h4>
                <p className="text-gray-600 text-sm">{mission.song.artist}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mb-6">
            <button
              onClick={() => navigate(`/chat/${match.id}`)}
              className="flex-1 mr-2 py-3 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Message</span>
            </button>
            
            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={`flex-1 ml-2 py-3 flex items-center justify-center gap-2 rounded-lg font-medium transition-colors ${
                isCompleted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-violet-600 text-white hover:bg-violet-700'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Completed!</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          </div>
          
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
            >
              <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-bold text-green-800 mb-1">Mission Completed!</h4>
              <p className="text-green-700 text-sm">
                Great job! You've earned a new badge on your profile.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mission;