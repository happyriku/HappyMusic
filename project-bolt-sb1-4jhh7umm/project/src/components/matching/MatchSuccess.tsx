import React, { useEffect } from 'react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Mic, ArrowRight } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';

interface MatchSuccessProps {
  onContinue: () => void;
}

const MatchSuccess: React.FC<MatchSuccessProps> = ({ onContinue }) => {
  const { currentGroup } = useMatch();
  
  useEffect(() => {
    // Confetti effect or other celebration animation could be added here
    // For simplicity, we're just using CSS animations
  }, []);
  
  if (!currentGroup) return null;
  
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-block p-5 bg-pink-500 rounded-full mb-4 animate-bounce-short">
          <Mic className="h-16 w-16 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4 animate-scale-in">マッチング成功！</h2>
        <p className="text-lg">
          {currentGroup.members.length}人グループが作成されました
        </p>
      </div>
      
      <Card className="bg-purple-800 border border-purple-600 mb-6">
        <CardContent className="p-5">
          <h3 className="text-xl font-semibold mb-4">グループメンバー</h3>
          
          <div className="space-y-3">
            {currentGroup.members.map((member) => (
              <div key={member.id} className="flex items-center bg-purple-700 p-3 rounded-lg">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 mr-3">
                  {member.nickname.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium">{member.nickname}</h4>
                  <div className="flex text-xs text-pink-300">
                    {member.favoriteArtists && member.favoriteArtists.length > 0 && (
                      <span>好きなアーティスト: {member.favoriteArtists[0]}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-pink-600 to-purple-600 border-none mb-6 overflow-hidden relative">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-4">次のステップ</h3>
          <p className="mb-4">
            グループチャットでカラオケの予定を決めましょう
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={onContinue}
            className="bg-white text-purple-700 hover:bg-gray-100"
          >
            グループチャットへ <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-white opacity-10"></div>
          <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-white opacity-10"></div>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm opacity-80">
        <p>カラオケに行った後、チェックイン/チェックアウトで</p>
        <p>1,500ポイントを獲得できます</p>
      </div>
    </div>
  );
};

export default MatchSuccess;