import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Sparkles } from 'lucide-react';
import { useMatch } from '../contexts/MatchContext';
import SwipeCard from '../components/SwipeCard';
import MatchModal from '../components/MatchModal';

const Discover: React.FC = () => {
  const { potentialMatches, refreshPotentialMatches, addMatch } = useMatch();
  const [matchedUserId, setMatchedUserId] = useState<string | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleSwipeLeft = () => {
    // Reject user
    setCurrentIndex((prev) => prev + 1);
  };
  
  const handleSwipeRight = () => {
    // Like user
    if (potentialMatches[currentIndex]) {
      const userId = potentialMatches[currentIndex].id;
      addMatch(userId);
      setMatchedUserId(userId);
      setShowMatchModal(true);
    }
    setCurrentIndex((prev) => prev + 1);
  };
  
  const handleCloseMatchModal = () => {
    setShowMatchModal(false);
    setMatchedUserId(null);
  };
  
  useEffect(() => {
    if (currentIndex >= potentialMatches.length - 1) {
      // When we run out of potential matches, refresh the list
      refreshPotentialMatches();
      setCurrentIndex(0);
    }
  }, [currentIndex, potentialMatches.length, refreshPotentialMatches]);
  
  return (
    <div className="relative max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Discover</h1>
        <p className="text-gray-600">
          Find others who resonate with your music emotions
        </p>
      </motion.div>
      
      <div className="relative h-[500px] flex justify-center">
        <AnimatePresence>
          {potentialMatches.slice(currentIndex, currentIndex + 3).map((user, index) => (
            <SwipeCard
              key={user.id}
              user={user}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          ))}
        </AnimatePresence>
        
        {currentIndex >= potentialMatches.length && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <RefreshCcw className="w-12 h-12 mb-4 text-gray-400 animate-spin" />
            <p className="text-gray-600 font-medium">Loading more people...</p>
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {showMatchModal && matchedUserId && (
          <MatchModal
            userId={matchedUserId}
            onClose={handleCloseMatchModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Discover;