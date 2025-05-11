import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import { Song, EmotionTag } from '../types';
import EmotionSphereContainer from '../components/EmotionSphereContainer';

const EmotionTagging: React.FC = () => {
  const navigate = useNavigate();
  const { userSongs, addEmotionToSong } = useMusic();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  
  const currentSong = userSongs[currentSongIndex];
  
  const handleEmotionSelected = (emotion: EmotionTag) => {
    if (currentSong) {
      addEmotionToSong(currentSong.id, emotion);
      if (!completed.includes(currentSong.id)) {
        setCompleted([...completed, currentSong.id]);
      }
    }
  };
  
  const goToNextSong = () => {
    if (currentSongIndex < userSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      // If we're at the last song, navigate to discover
      navigate('/discover');
    }
  };
  
  const goToPreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };
  
  if (userSongs.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold mb-4">No songs selected</h2>
        <p className="mb-6">You need to select some songs first</p>
        <button
          onClick={() => navigate('/music-selection')}
          className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700"
        >
          Add Songs
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">Tag Your Songs with Emotions</h1>
        <p className="text-gray-600">
          Drag songs to emotion spheres to create your emotional music profile
        </p>
      </motion.div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={goToPreviousSong}
            disabled={currentSongIndex === 0}
            className={`p-2 rounded-full ${
              currentSongIndex === 0
                ? 'text-gray-400 bg-gray-100'
                : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <span className="text-sm font-medium text-gray-500">
              Song {currentSongIndex + 1} of {userSongs.length}
            </span>
          </div>
          <button
            onClick={goToNextSong}
            className="p-2 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSong?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentSong && (
              <div className="flex flex-col items-center">
                <div className="mb-4 w-full flex justify-center">
                  <div className="relative w-40 h-40 mb-2">
                    <img
                      src={currentSong.albumArt}
                      alt={currentSong.title}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    {completed.includes(currentSong.id) && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-1">{currentSong.title}</h3>
                <p className="text-gray-600 mb-4">{currentSong.artist}</p>
                
                {currentSong.emotions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {currentSong.emotions.map((emotion) => (
                      <span
                        key={emotion.id}
                        className="px-3 py-1 rounded-full text-white text-sm"
                        style={{ backgroundColor: emotion.color }}
                      >
                        {emotion.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <EmotionSphereContainer
          song={currentSong}
          onEmotionSelected={handleEmotionSelected}
        />
        
        <div className="mt-6">
          <button
            onClick={goToNextSong}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-violet-700 hover:to-indigo-700 transition-colors"
          >
            {currentSongIndex < userSongs.length - 1 ? 'Next Song' : 'Finish & Discover Matches'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionTagging;