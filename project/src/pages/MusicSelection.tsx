import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Music, AlignJustify as SpotifyLogo } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import { mockSongs } from '../data/mockData';
import SongCard from '../components/SongCard';

const MusicSelection: React.FC = () => {
  const navigate = useNavigate();
  const { addSong, userSongs } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter songs based on search query
  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddSong = (songId: string) => {
    const song = mockSongs.find((s) => s.id === songId);
    if (song) {
      addSong(song);
    }
  };
  
  const handleContinue = () => {
    if (userSongs.length > 0) {
      navigate('/emotion-tagging');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Add Your Favorite Songs</h1>
          <p className="text-gray-600">Pick songs that have meaning to you</p>
        </div>
        
        <div className="mb-6 flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
            <SpotifyLogo className="w-5 h-5" />
            <span>Connect Spotify</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-red-600 transition-colors">
            <Music className="w-5 h-5" />
            <span>Connect Apple Music</span>
          </button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for songs or artists"
            className="pl-10 w-full border border-gray-300 rounded-lg py-3 shadow-sm focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
        
        {userSongs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Selected Songs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userSongs.map((song) => (
                <SongCard key={song.id} song={song} showControls={false} />
              ))}
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleContinue}
                className="w-full bg-violet-600 text-white py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors"
              >
                Continue to Emotion Tagging ({userSongs.length}/10)
              </button>
            </div>
          </div>
        )}
        
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Songs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredSongs.map((song) => (
              <SongCard 
                key={song.id} 
                song={song}
                onAddSong={() => handleAddSong(song.id)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MusicSelection;