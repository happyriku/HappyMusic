import React, { useState } from 'react';
import { Song, EmotionTag } from '../types';
import { Play, Pause, Plus, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import EmotionSphere from './EmotionSphere';

interface SongCardProps {
  song: Song;
  onAddSong?: () => void;
  onLike?: () => void;
  showControls?: boolean;
  className?: string;
}

const SongCard: React.FC<SongCardProps> = ({
  song,
  onAddSong,
  onLike,
  showControls = true,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would play/pause the song preview
  };

  return (
    <motion.div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square bg-gray-200">
        <img 
          src={song.albumArt} 
          alt={`${song.title} by ${song.artist}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <button 
            onClick={togglePlay} 
            className="bg-white bg-opacity-70 rounded-full p-3 hover:bg-opacity-90 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-violet-800" />
            ) : (
              <Play className="w-6 h-6 text-violet-800" />
            )}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg tracking-tight truncate">{song.title}</h3>
        <p className="text-gray-600 truncate">{song.artist}</p>
        
        {song.emotions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {song.emotions.map((emotion) => (
              <span 
                key={emotion.id}
                className="text-xs px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: emotion.color }}
              >
                {emotion.name}
              </span>
            ))}
          </div>
        )}
        
        {showControls && (
          <div className="mt-4 flex gap-2">
            {onAddSong && (
              <button 
                onClick={onAddSong}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            )}
            
            {onLike && (
              <button 
                onClick={onLike}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Like</span>
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SongCard;