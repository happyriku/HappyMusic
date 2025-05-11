import React from 'react';
import { motion } from 'framer-motion';
import { useMatch } from '../contexts/MatchContext';
import MatchCard from '../components/MatchCard';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Matches: React.FC = () => {
  const { matches } = useMatch();
  const navigate = useNavigate();
  
  return (
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">Your Matches</h1>
        <p className="text-gray-600">
          People who resonate with your music emotions
        </p>
      </motion.div>
      
      {matches.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto bg-violet-100 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="w-10 h-10 text-violet-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">No Matches Yet</h2>
          <p className="text-gray-600 mb-6">
            Start swiping to find people who share your music emotions
          </p>
          <button
            onClick={() => navigate('/discover')}
            className="bg-violet-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-violet-700 transition-colors"
          >
            Discover Matches
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MatchCard match={match} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;