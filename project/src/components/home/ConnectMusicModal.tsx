import React from 'react';
import { X, AlignJustify as Spotify, Music } from 'lucide-react';
import Button from '../ui/Button';
import { useUser } from '../../context/UserContext';

interface ConnectMusicModalProps {
  onClose: () => void;
}

const ConnectMusicModal: React.FC<ConnectMusicModalProps> = ({ onClose }) => {
  const { connectMusicAccount } = useUser();
  
  const handleConnect = async (platform: 'spotify' | 'apple') => {
    await connectMusicAccount(platform);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg text-gray-800 animate-fade-in-up">
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">音楽アカウントの連携</h3>
          <p className="mb-6 text-gray-600">
            あなたの音楽の好みに基づいてより良いマッチングを提供するために、音楽アカウントを連携してください。
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleConnect('spotify')}
              className="flex items-center w-full p-4 bg-[#1DB954] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Spotify className="h-6 w-6 mr-3" />
              <span className="font-semibold">Spotifyで連携する</span>
            </button>
            
            <button
              onClick={() => handleConnect('apple')}
              className="flex items-center w-full p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Music className="h-6 w-6 mr-3 text-[#FC3C44]" />
              <span className="font-semibold">Apple Musicで連携する</span>
            </button>
          </div>
          
          <p className="mt-6 text-xs text-gray-500">
            連携することで、あなたの音楽の好みに関する情報が取得されます。
            この情報は、マッチングの精度向上のためにのみ使用されます。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectMusicModal;