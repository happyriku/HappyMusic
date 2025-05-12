import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Music } from 'lucide-react';

interface MatchingAnimationProps {
  onCancel: () => void;
}

const MatchingAnimation: React.FC<MatchingAnimationProps> = ({ onCancel }) => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="animate-fade-in text-center">
      <Card className="bg-purple-800 border border-purple-600 mb-6 overflow-hidden">
        <CardContent className="p-8 relative">
          <div className="absolute inset-0 flex justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className="h-full w-1 bg-purple-600 opacity-20 mx-1"
                style={{
                  animation: `equalizer 1.5s ease-in-out ${i * 0.1}s infinite alternate`,
                }}
              ></div>
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex p-4 rounded-full bg-purple-700 mb-4">
              <Music className="h-12 w-12 text-pink-400 animate-pulse" />
            </div>
            
            <h3 className="text-2xl font-bold mb-2">マッチング中{dots}</h3>
            <p className="text-base opacity-90 mb-8">
              あなたと音楽の趣味が近いユーザーを探しています
            </p>
            
            <div className="flex justify-center mb-4">
              <div className="relative h-2 w-64 bg-purple-700 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-pink-500"
                  style={{
                    width: '80%',
                    animation: 'progressBar 30s linear forwards',
                  }}
                ></div>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={onCancel}
              className="text-white border-white border-opacity-30 hover:bg-purple-700"
            >
              キャンセル
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm opacity-80">
        <p>他のユーザーを探しています</p>
        <p>少々お待ちください...</p>
      </div>
    </div>
  );
};

export default MatchingAnimation;