import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCcw } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import EmotionSphereContainer from '../components/EmotionSphereContainer';
import { EmotionTag } from '../types';

const SongResonance: React.FC = () => {
  const { currentSamples, refreshSamples } = useMusic();
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionTag | null>(null);
  const [resonanceComplete, setResonanceComplete] = useState(false);
  
  const currentSample = currentSamples[currentSampleIndex];
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control audio playback
  };
  
  const handleEmotionSelected = (emotion: EmotionTag) => {
    setSelectedEmotion(emotion);
    
    // Show completion state briefly
    setTimeout(() => {
      if (currentSampleIndex < currentSamples.length - 1) {
        setCurrentSampleIndex(currentSampleIndex + 1);
        setSelectedEmotion(null);
      } else {
        setResonanceComplete(true);
      }
    }, 1000);
  };
  
  const handleRefresh = () => {
    refreshSamples();
    setCurrentSampleIndex(0);
    setSelectedEmotion(null);
    setResonanceComplete(false);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">Resonance Diagnosis</h1>
        <p className="text-gray-600">
          Tag these songs to fine-tune your emotional profile
        </p>
      </motion.div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {resonanceComplete ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 text-center"
          >
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <RefreshCcw className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Resonance Complete!</h2>
            <p className="text-gray-600 mb-6">
              Your emotional profile has been updated. Your match recommendations will now be more accurate.
            </p>
            <button
              onClick={handleRefresh}
              className="bg-violet-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-violet-700 transition-colors"
            >
              Try More Songs
            </button>
          </motion.div>
        ) : (
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSample?.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative aspect-video bg-gray-200"
              >
                <img
                  src={currentSample?.albumArt}
                  alt={currentSample?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                  <AnimatePresence>
                    {!selectedEmotion && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={handlePlayPause}
                        className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6 hover:bg-opacity-30 transition-all mb-4"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white" />
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                  
                  <h3 className="font-bold text-xl mb-1">{currentSample?.title}</h3>
                  <p className="text-white text-opacity-90 mb-2">{currentSample?.artist}</p>
                  
                  <div className="px-4 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm">
                    {currentSampleIndex + 1} of {currentSamples.length}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="p-4">
              <h3 className="text-center font-medium text-gray-800 mb-4">
                How does this song make you feel?
              </h3>
              
              <EmotionSphereContainer 
                onEmotionSelected={handleEmotionSelected} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongResonance;