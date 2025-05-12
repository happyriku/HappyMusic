import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowLeft, Mic, LogOut, Music } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { useUser } from '../../context/UserContext';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  
  const handleBack = () => {
    navigate('/home');
  };
  
  const handleLogout = () => {
    if (window.confirm('ログアウトしますか？')) {
      logout();
      navigate('/');
    }
  };
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 text-white pb-16">
      {/* Header */}
      <div className="bg-purple-800 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="flex items-center text-white opacity-90 hover:opacity-100"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>戻る</span>
            </button>
            
            <h2 className="text-lg font-semibold">プロフィール</h2>
            
            <div className="w-6" />
          </div>
        </div>
      </div>
      
      {/* Profile */}
      <div className="container mx-auto px-4 pt-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-purple-800 border-4 border-purple-600 flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-pink-400" />
          </div>
          <h1 className="text-2xl font-bold mb-1">{user.nickname}</h1>
          <p className="text-pink-300">
            {user.area} エリア
          </p>
        </div>
        
        <Card className="bg-purple-800 border border-purple-600 mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">ポイント</h3>
              <span className="text-lg font-bold text-pink-300">
                {user.points.toLocaleString()} pts
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* Music Account */}
        <Card className="bg-purple-800 border border-purple-600 mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">音楽アカウント</h3>
            
            {user.musicAccountConnected ? (
              <div className="flex items-center">
                <div className="p-2 bg-white bg-opacity-10 rounded-full mr-3">
                  {user.musicPlatform === 'spotify' ? (
                    <Music className="h-5 w-5 text-[#1DB954]" />
                  ) : (
                    <Music className="h-5 w-5 text-[#FC3C44]" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {user.musicPlatform === 'spotify' ? 'Spotify' : 'Apple Music'}
                  </p>
                  <p className="text-sm opacity-80">接続済み</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-white bg-opacity-10 rounded-full mr-3">
                    <Music className="h-5 w-5 text-pink-400" />
                  </div>
                  <p className="opacity-80">未接続</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/home')}
                >
                  接続する
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Personal Info */}
        <Card className="bg-purple-800 border border-purple-600 mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">個人情報</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-pink-300 mb-1">ニックネーム</p>
                <p>{user.nickname}</p>
              </div>
              
              <div>
                <p className="text-sm text-pink-300 mb-1">生年月日</p>
                <p>{user.birthYear}年{user.birthMonth}月{user.birthDay}日</p>
              </div>
              
              <div>
                <p className="text-sm text-pink-300 mb-1">性別</p>
                <p>
                  {user.gender === 'male' ? '男性' : 
                   user.gender === 'female' ? '女性' : 'その他'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-pink-300 mb-1">エリア</p>
                <p>{user.area}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleLogout}
            icon={<LogOut className="h-5 w-5" />}
            className="border-white border-opacity-30"
          >
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;