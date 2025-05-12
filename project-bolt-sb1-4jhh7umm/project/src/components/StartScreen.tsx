import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Music, Users } from 'lucide-react';
import Button from './ui/Button';
import { Card, CardContent } from './ui/Card';

const StartScreen: React.FC = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState('Tokyo');
  
  const handleStart = () => {
    navigate('/register');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white bg-opacity-10 rounded-full backdrop-blur-sm">
              <Mic className="h-16 w-16 text-pink-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">KaraMatch</h1>
          <p className="text-xl opacity-90">音楽の趣味で繋がる、カラオケ仲間マッチング</p>
        </div>
        
        <Card className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 mb-6 animate-slide-up">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">エリアを選択</h2>
            <div className="bg-purple-700 bg-opacity-50 rounded-lg p-3 mb-4">
              <select 
                value={area} 
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 text-lg"
              >
                <option value="Tokyo">東京</option>
                {/* Other areas would be disabled in MVP */}
                <option value="Osaka" disabled>大阪 (準備中)</option>
                <option value="Fukuoka" disabled>福岡 (準備中)</option>
              </select>
            </div>
            <Button 
              variant="secondary" 
              size="lg" 
              fullWidth 
              onClick={handleStart}
              className="mt-2"
            >
              始める
            </Button>
          </CardContent>
        </Card>
        
        <div className="flex justify-center space-x-8 text-center animate-fade-in delay-300">
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white bg-opacity-10 rounded-full mb-2">
              <Music className="h-6 w-6 text-pink-400" />
            </div>
            <p className="text-sm opacity-90">音楽の趣味で<br />マッチング</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white bg-opacity-10 rounded-full mb-2">
              <Users className="h-6 w-6 text-pink-400" />
            </div>
            <p className="text-sm opacity-90">2〜4人の<br />グループ形成</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;