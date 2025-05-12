import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, MessageSquare, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { useMatch } from '../../context/MatchContext';
import { useVenue } from '../../context/VenueContext';
import GroupChat from './GroupChat';
import VenueSuggestions from './VenueSuggestions';

const GroupPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentGroup, leaveGroup } = useMatch();
  const { isCheckedIn, getNearbyVenues } = useVenue();
  const [activeTab, setActiveTab] = useState<'chat' | 'venues'>('chat');
  
  useEffect(() => {
    if (!currentGroup) {
      navigate('/home');
      return;
    }
    
    // Load nearby venues
    getNearbyVenues();
  }, [currentGroup, navigate, getNearbyVenues]);
  
  if (!currentGroup) return null;
  
  const handleBack = () => {
    navigate('/home');
  };
  
  const handleLeaveGroup = () => {
    if (window.confirm('グループを離れますか？')) {
      leaveGroup();
      navigate('/home');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 text-white flex flex-col">
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
            
            <h2 className="text-lg font-semibold">カラオケグループ</h2>
            
            <button 
              onClick={handleLeaveGroup}
              className="text-sm text-pink-300 hover:text-pink-200"
            >
              退出
            </button>
          </div>
        </div>
      </div>
      
      {/* Group Info */}
      <div className="container mx-auto px-4 py-4">
        <Card className="bg-purple-800 border border-purple-600 mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold mb-1">グループメンバー</h3>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-1 text-pink-300" />
                  <span>{currentGroup.members.length}人のメンバー</span>
                </div>
              </div>
              
              {isCheckedIn ? (
                <div className="bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                  チェックイン中
                </div>
              ) : (
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => navigate('/venue')}
                >
                  チェックイン
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <div className="container mx-auto px-4 mb-3">
        <div className="flex border-b border-purple-600">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'chat' 
                ? 'text-white border-b-2 border-pink-500' 
                : 'text-white text-opacity-70 hover:text-opacity-100'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            <div className="flex items-center justify-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              チャット
            </div>
          </button>
          
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'venues' 
                ? 'text-white border-b-2 border-pink-500' 
                : 'text-white text-opacity-70 hover:text-opacity-100'
            }`}
            onClick={() => setActiveTab('venues')}
          >
            <div className="flex items-center justify-center">
              <MapPin className="h-5 w-5 mr-2" />
              カラオケ店
            </div>
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto pb-16">
        <div className="container mx-auto px-4">
          {activeTab === 'chat' ? (
            <GroupChat />
          ) : (
            <VenueSuggestions />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;