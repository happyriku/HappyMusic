import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Heart, MessageSquare, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-violet-900 to-indigo-800 text-white">
      <motion.div 
        className="flex-grow flex flex-col items-center justify-center p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Music className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-2">SYNK</h1>
          <p className="text-xl text-violet-200 mb-8">Connect through music emotions</p>
        </motion.div>

        <div className="max-w-md w-full">
          <motion.div 
            className="grid grid-cols-2 gap-4 mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <Heart className="w-8 h-8 text-pink-400 mb-2" />
              <h2 className="font-semibold mb-1">Emotional Matching</h2>
              <p className="text-sm text-violet-200">Connect based on shared music emotions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <Music className="w-8 h-8 text-blue-400 mb-2" />
              <h2 className="font-semibold mb-1">Music Resonance</h2>
              <p className="text-sm text-violet-200">Discover your emotional connection to songs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <MessageSquare className="w-8 h-8 text-green-400 mb-2" />
              <h2 className="font-semibold mb-1">Music Missions</h2>
              <p className="text-sm text-violet-200">Complete fun activities based on shared tastes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <Users className="w-8 h-8 text-yellow-400 mb-2" />
              <h2 className="font-semibold mb-1">Privacy First</h2>
              <p className="text-sm text-violet-200">No face photos needed, just your music soul</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button 
              onClick={() => navigate('/register')}
              className="w-full py-4 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg font-bold text-lg mb-4 hover:from-violet-600 hover:to-pink-600 transition-colors shadow-lg"
            >
              Get Started
            </button>
            <p className="text-sm text-violet-300">
              Already have an account? <button className="text-white underline">Sign In</button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;