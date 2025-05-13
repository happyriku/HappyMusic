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
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-yellow-500 flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white bg-opacity-10 rounded-full backdrop-blur-sm mr-3">
              <Mic className="h-12 w-12 text-white-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">KaraMatch</h1>
        </div>
        
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
        
        <Card className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 mb-6 animate-slide-up">
          <CardContent>
            <Button 
              variant="secondary" 
              size="lg" 
              fullWidth 
              onClick={handleStart}
              className="mt-1 bg-white text-black"
            >
              はじめる
            </Button>
          </CardContent>
          <CardContent>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleStart}
              className="bg-white text-black"
              >
                ログイン
              </Button>

          </CardContent>
        </Card>
        
      </div>
    </div>
  );
};

export default StartScreen;