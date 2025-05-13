import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Home } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

const CheckinSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Add confetti effect
  useEffect(() => {
    // In a real app, this would be a proper confetti animation
    // For now, we'll just use CSS animations
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-green-500 rounded-full animate-bounce-short">
            <Check className="h-16 w-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-3 animate-scale-in">
          チェックアウト成功！
        </h1>
        <p className="text-xl mb-8">
          カラオケをお楽しみいただきありがとうございました
        </p>
        
        <Card className="bg-purple-800 border border-purple-600 mb-8">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">
              +1,500 ポイント
            </h2>
            <p className="opacity-90">
              チェックイン・チェックアウト報酬
            </p>
          </CardContent>
        </Card>
        
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/home')}
          icon={<Home />}
        >
          ホームに戻る
        </Button>
      </div>
    </div>
  );
};

export default CheckinSuccessPage;