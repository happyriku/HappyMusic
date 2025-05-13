import React from 'react';
import { Users2, Users, User, Check } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface MatchingOptionsProps {
  onStartMatching: (groupSize: 2 | 3 | 4) => void;
}

const MatchingOptions: React.FC<MatchingOptionsProps> = ({ onStartMatching }) => {
  const [selectedSize, setSelectedSize] = React.useState<2 | 3 | 4>(2);
  
  return (
    <div className="animate-fade-in">
      <Card className="bg-purple-800 border border-purple-600 mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">グループサイズを選択</h3>
          <p className="text-sm opacity-90 mb-6">
            何人のグループでマッチングしたいですか？
          </p>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => setSelectedSize(2)}
              className={`p-4 rounded-lg border ${
                selectedSize === 2 
                  ? 'bg-purple-600 border-purple-500' 
                  : 'bg-purple-700 border-purple-600 hover:bg-purple-600'
              } transition-colors flex flex-col items-center`}
            >
              <User className="h-8 w-8 mb-2" />
              <span className="font-medium">2人</span>
              {selectedSize === 2 && (
                <span className="mt-2 bg-pink-500 p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </button>
            
            <button
              onClick={() => setSelectedSize(3)}
              className={`p-4 rounded-lg border ${
                selectedSize === 3
                  ? 'bg-purple-600 border-purple-500'
                  : 'bg-purple-700 border-purple-600 hover:bg-purple-600'
              } transition-colors flex flex-col items-center`}
            >
              <Users className="h-8 w-8 mb-2" />
              <span className="font-medium">3人</span>
              {selectedSize === 3 && (
                <span className="mt-2 bg-pink-500 p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </button>
            
            <button
              onClick={() => setSelectedSize(4)}
              className={`p-4 rounded-lg border ${
                selectedSize === 4
                  ? 'bg-purple-600 border-purple-500'
                  : 'bg-purple-700 border-purple-600 hover:bg-purple-600'
              } transition-colors flex flex-col items-center`}
            >
              <Users2 className="h-8 w-8 mb-2" />
              <span className="font-medium">4人</span>
              {selectedSize === 4 && (
                <span className="mt-2 bg-pink-500 p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </button>
          </div>
          
          <div className="text-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onStartMatching(selectedSize)}
              className="px-8"
            >
              マッチングを開始 (500pts)
            </Button>
            <p className="mt-3 text-sm opacity-80">
              マッチングには500ポイントが必要です
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-purple-800 border border-purple-600">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">マッチングについて</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li className="flex items-start">
              <span className="bg-pink-500 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              同じエリア（東京）にいるユーザーとマッチングします
            </li>
            <li className="flex items-start">
              <span className="bg-pink-500 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              音楽の好みが近いユーザー同士でグループを形成します
            </li>
            <li className="flex items-start">
              <span className="bg-pink-500 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              マッチング成立後、グループチャットでカラオケの約束ができます
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchingOptions;