import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EmotionTag, Song } from '../types';
import EmotionSphere from './EmotionSphere';
import { emotionTags } from '../data/mockData';
import { useMusic } from '../contexts/MusicContext';

interface EmotionSphereContainerProps {
  onEmotionSelected?: (emotion: EmotionTag) => void;
  song?: Song;
  className?: string;
}

const EmotionSphereContainer: React.FC<EmotionSphereContainerProps> = ({
  onEmotionSelected,
  song,
  className = '',
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionTag | null>(null);
  const { addEmotionToSong } = useMusic();

  const handleEmotionClick = (emotion: EmotionTag) => {
    setSelectedEmotion(emotion);
    if (onEmotionSelected) {
      onEmotionSelected(emotion);
    }
    
    if (song) {
      addEmotionToSong(song.id, emotion);
    }
  };

  // Create a random arrangement of emotions
  const emotions = emotionTags.map((emotion, index) => {
    // Create semi-random positioning
    const angle = (index / emotionTags.length) * Math.PI * 2;
    const radius = 120 + Math.random() * 40; // Random radius between 120-160px
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return { emotion, x, y };
  });

  return (
    <motion.div
      className={`relative w-full h-96 flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {song && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="bg-white rounded-lg shadow-md p-2 flex items-center gap-3 max-w-xs">
            <img 
              src={song.albumArt} 
              alt={song.title} 
              className="w-12 h-12 object-cover rounded"
            />
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm truncate">{song.title}</h3>
              <p className="text-xs text-gray-600 truncate">{song.artist}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-500/20 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-violet-800 font-medium">
              {selectedEmotion 
                ? `${selectedEmotion.name} selected!` 
                : 'Tap an emotion sphere that resonates with this song'}
            </p>
          </div>
        </div>
      </div>

      {emotions.map(({ emotion, x, y }) => (
        <motion.div
          key={emotion.id}
          className="absolute"
          style={{ left: 'calc(50% + 0px)', top: 'calc(50% + 0px)' }}
          animate={{ 
            x, 
            y,
            transition: { 
              type: 'spring',
              stiffness: 100,
              damping: 15
            }
          }}
        >
          <EmotionSphere
            emotion={emotion}
            onClick={() => handleEmotionClick(emotion)}
            selected={selectedEmotion?.id === emotion.id}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EmotionSphereContainer;