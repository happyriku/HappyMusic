import React from 'react';
import { User } from '../types';
import { motion, useAnimation } from 'framer-motion';
import { useMatch } from '../contexts/MatchContext';
import { Check, X, Music } from 'lucide-react';

interface SwipeCardProps {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  user,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const controls = useAnimation();

  const handleDragEnd = async (event: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      await controls.start({ x: 500, opacity: 0 });
      onSwipeRight();
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -500, opacity: 0 });
      onSwipeLeft();
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  return (
    <motion.div
      className="absolute w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="h-64 relative"
        style={{ backgroundColor: user.profileColor }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-8xl font-bold opacity-20">
            {user.nickname.charAt(0)}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-white text-2xl font-bold">{user.nickname}</h2>
              <p className="text-white text-opacity-90">
                {user.age}, {user.location}
              </p>
            </div>
            <div className="bg-white bg-opacity-90 rounded-full px-3 py-1 flex items-center">
              <Music className="w-4 h-4 text-violet-600 mr-1" />
              <span className="text-violet-800 font-bold">{user.compatibilityScore}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-600 mb-4">
          This person shares your emotional connection to music. You both 
          feel nostalgic about similar songs and get energized by the same beats.
        </p>
        
        <div className="flex justify-center gap-8 mt-6 mb-2">
          <button
            onClick={onSwipeLeft}
            className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          >
            <X className="w-8 h-8 text-gray-600" />
          </button>
          <button
            onClick={onSwipeRight}
            className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-violet-500 to-pink-500 rounded-full hover:from-violet-600 hover:to-pink-600 transition-colors"
          >
            <Check className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;