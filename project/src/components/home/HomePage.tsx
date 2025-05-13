import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Users, AlignJustify as Spotify, Mic } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { useUser } from '../../context/UserContext';
import ConnectMusicModal from './ConnectMusicModal';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showConnectModal, setShowConnectModal] = useState(false);
  
  const handleStartMatching = () => {
    if (!user?.musicAccountConnected) {
      setShowConnectModal(true);
      return;
    }
    
    navigate('/matching');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 text-white pb-16">
      {/* Hero Section */}
      <div className="pt-8 pb-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">こんにちは、{user?.nickname}さん</h1>
          <p className="text-xl opacity-90 mb-2">カラオケ仲間を見つけましょう</p>
          <p className="text-lg font-semibold">
            <span className="text-pink-300">{user?.points.toLocaleString()}</span> pts
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Music Account Connect Card */}
        {!user?.musicAccountConnected && (
          <Card className="bg-purple-800 border border-purple-600 mb-6 animate-pulse">
            <CardContent className="flex items-center">
              <div className="mr-4 flex-shrink-0">
                <Music className="h-10 w-10 text-pink-400" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-1">音楽アカウントを連携する</h3>
                <p className="text-sm opacity-90 mb-2">
                  趣味が近い友達とマッチングするために、音楽アカウントを連携しましょう
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => setShowConnectModal(true)}
                >
                  今すぐ連携する
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Matching Card */}
        <div className="relative overflow-hidden mb-6">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-none relative z-10">
            <CardContent className="py-8 text-center">
              <div className="p-4 bg-white bg-opacity-10 rounded-full inline-flex mb-4">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">マッチングを始める</h2>
              <p className="mb-6 opacity-90">
                あなたと音楽の趣味が合う2〜4人でマッチングします
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={handleStartMatching}
                className="shadow-lg"
              >
                マッチングする（500ポイント）
              </Button>
            </CardContent>
          </Card>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 overflow-hidden z-0">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-pink-300"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-500"></div>
          </div>
        </div>
        
        {/* Music Preferences */}
        {user?.musicAccountConnected && (
          <Card className="bg-purple-800 border border-purple-600 mb-6">
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-white bg-opacity-10 rounded-full mr-3">
                  {user.musicPlatform === 'spotify' ? (
                    <Spotify className="h-5 w-5 text-[#1DB954]" />
                  ) : (
                    <Music className="h-5 w-5 text-[#FC3C44]" />
                  )}
                </div>
                <h3 className="text-lg font-semibold">
                  {user.musicPlatform === 'spotify' ? 'Spotify' : 'Apple Music'}のお気に入り
                </h3>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-pink-300 mb-2">好きなアーティスト</h4>
                <div className="flex flex-wrap gap-2">
                  {user.favoriteArtists?.map((artist, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-700 rounded-full text-sm">
                      {artist}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-pink-300 mb-2">好きな曲</h4>
                <div className="flex flex-wrap gap-2">
                  {user.favoriteSongs?.map((song, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-700 rounded-full text-sm">
                      {song}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* How It Works */}
        <Card className="bg-purple-800 border border-purple-600">
          <CardContent>
            <h3 className="text-xl font-semibold mb-4">KaraMatchの使い方</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">音楽アカウントを連携</h4>
                  <p className="text-sm opacity-90">
                    SpotifyやApple Musicのアカウントを連携して、あなたの音楽の好みを教えてください
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">マッチングを開始</h4>
                  <p className="text-sm opacity-90">
                    マッチングボタンを押すと、音楽の趣味が合う2〜4人のグループが作られます
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">チャットでカラオケの約束</h4>
                  <p className="text-sm opacity-90">
                    グループチャットで日程や場所を決めて、実際にカラオケに行きましょう
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">チェックインでポイント獲得</h4>
                  <p className="text-sm opacity-90">
                    カラオケに到着したらチェックインして、終わったらチェックアウト。ポイントが貰えます
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Connect Music Modal */}
      {showConnectModal && (
        <ConnectMusicModal onClose={() => setShowConnectModal(false)} />
      )}
    </div>
  );
};

export default HomePage;