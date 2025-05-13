import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Users, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { useVenue } from '../../context/VenueContext';
import { useMatch } from '../../context/MatchContext';
import { useUser } from '../../context/UserContext';

const VenuePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedVenue, venues, selectVenue, isCheckedIn, checkIn, checkOut } = useVenue();
  const { currentGroup } = useMatch();
  const { updatePoints } = useUser();
  
  useEffect(() => {
    if (!selectedVenue && venues.length > 0) {
      selectVenue(venues[0].id);
    }
    
    if (!currentGroup) {
      navigate('/home');
    }
  }, [selectedVenue, venues, selectVenue, currentGroup, navigate]);
  
  const handleBack = () => {
    navigate('/group');
  };
  
  const handleCheckIn = () => {
    checkIn();
    // Show success message or something
  };
  
  const handleCheckOut = () => {
    checkOut();
    updatePoints(1500); // Add points for completed session
    navigate('/checkin-success');
  };
  
  if (!selectedVenue) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 text-white pb-16">
      {/* Header */}
      <div 
        className="h-48 bg-center bg-cover relative"
        style={{ 
          backgroundImage: `url(${selectedVenue.imageUrl})` 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto px-4 pt-4">
            <button 
              onClick={handleBack}
              className="flex items-center text-white bg-black bg-opacity-30 rounded-full p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Venue Info */}
      <div className="container mx-auto px-4 -mt-6">
        <Card className="bg-purple-800 border border-purple-600 mb-6">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">{selectedVenue.name}</h2>
            
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="mr-3">{selectedVenue.rating}</span>
              <MapPin className="h-4 w-4 text-pink-300 mr-1" />
              <span className="text-sm">約{selectedVenue.distance}</span>
            </div>
            
            <p className="text-sm opacity-90 mb-4">
              {selectedVenue.address}
            </p>
            
            {isCheckedIn ? (
              <Button
                variant="danger"
                size="lg"
                fullWidth
                onClick={handleCheckOut}
              >
                チェックアウト
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                onClick={handleCheckIn}
              >
                チェックイン
              </Button>
            )}
            
            {isCheckedIn && (
              <p className="text-sm text-center mt-2 text-pink-300">
                カラオケが終わったらチェックアウトしてください
              </p>
            )}
          </CardContent>
        </Card>
        
        {/* Group Members */}
        <Card className="bg-purple-800 border border-purple-600 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 mr-2 text-pink-300" />
              <h3 className="font-semibold">グループメンバー</h3>
            </div>
            
            <div className="space-y-2">
              {currentGroup?.members.map(member => (
                <div key={member.id} className="flex items-center justify-between bg-purple-700 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3 text-sm">
                      {member.nickname.charAt(0)}
                    </div>
                    <span>{member.nickname}</span>
                  </div>
                  
                  {/* In a real app, we would show actual check-in status */}
                  <div className="flex items-center text-sm">
                    {Math.random() > 0.5 ? (
                      <span className="flex items-center text-green-400">
                        <CheckCircle className="h-4 w-4 mr-1" /> チェックイン済
                      </span>
                    ) : (
                      <span className="text-white opacity-60">
                        未チェックイン
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* How it works */}
        <Card className="bg-purple-800 border border-purple-600">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">チェックインの流れ</h3>
            <ol className="space-y-3">
              <li className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                  1
                </div>
                <div className="text-sm">
                  <p>カラオケ店に到着したら「チェックイン」ボタンを押してください</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                  2
                </div>
                <div className="text-sm">
                  <p>カラオケを楽しんでください</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                  3
                </div>
                <div className="text-sm">
                  <p>カラオケが終わったら「チェックアウト」ボタンを押してください</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                  4
                </div>
                <div className="text-sm">
                  <p>チェックアウト完了後、1,500ポイントが付与されます</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VenuePage;