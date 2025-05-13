import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Group, User, MatchingOptions } from '../types';
import { useUser } from './UserContext';

interface MatchContextType {
  currentGroup: Group | null;
  matchStatus: 'idle' | 'matching' | 'matched';
  startMatching: (options: MatchingOptions) => Promise<void>;
  cancelMatching: () => void;
  leaveGroup: () => void;
  sendMessage: (content: string) => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, updatePoints } = useUser();
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [matchStatus, setMatchStatus] = useState<'idle' | 'matching' | 'matched'>('idle');

  // Load any existing match from localStorage
  useEffect(() => {
    const savedGroup = localStorage.getItem('current_group');
    if (savedGroup) {
      setCurrentGroup(JSON.parse(savedGroup));
      setMatchStatus('matched');
    }
  }, []);

  const startMatching = async (options: MatchingOptions) => {
    if (!user) return;
    
    // Deduct points for matching
    updatePoints(-500);
    
    setMatchStatus('matching');
    
    // Simulate matching process with timeout
    setTimeout(() => {
      // Generate fake matched users based on group size
      const matchedUsers: User[] = [];
      for (let i = 1; i < options.groupSize; i++) {
        matchedUsers.push({
          id: `fake-${i}`,
          nickname: `カラオケ好き${i}`,
          birthYear: Math.floor(1990 + Math.random() * 10),
          birthMonth: Math.floor(1 + Math.random() * 12),
          birthDay: Math.floor(1 + Math.random() * 28),
          gender: Math.random() > 0.5 ? 'male' : 'female',
          area: 'Tokyo',
          points: 5000,
          musicAccountConnected: true,
          musicPlatform: Math.random() > 0.5 ? 'spotify' : 'apple',
          favoriteArtists: ['YOASOBI', 'Official髭男dism', 'Kenshi Yonezu'],
          favoriteSongs: ['夜に駆ける', 'Pretender', 'Lemon'],
        });
      }
      
      // Create new group with matched users
      const newGroup: Group = {
        id: Math.random().toString(36).substring(2, 9),
        members: [user, ...matchedUsers],
        createdAt: new Date(),
        size: options.groupSize,
        status: 'matched',
        messages: [],
      };
      
      setCurrentGroup(newGroup);
      setMatchStatus('matched');
      localStorage.setItem('current_group', JSON.stringify(newGroup));
    }, 3000); // 3 seconds for demo
  };

  const cancelMatching = () => {
    if (matchStatus === 'matching') {
      setMatchStatus('idle');
    }
  };

  const leaveGroup = () => {
    setCurrentGroup(null);
    setMatchStatus('idle');
    localStorage.removeItem('current_group');
  };

  const sendMessage = (content: string) => {
    if (!currentGroup || !user) return;
    
    const newMessage = {
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      content,
      timestamp: new Date(),
    };
    
    const updatedGroup = {
      ...currentGroup,
      messages: [...currentGroup.messages, newMessage],
    };
    
    setCurrentGroup(updatedGroup);
    localStorage.setItem('current_group', JSON.stringify(updatedGroup));
    
    // Simulate responses from other group members
    if (updatedGroup.members.length > 1) {
      setTimeout(() => {
        const randomMember = updatedGroup.members.find(m => m.id !== user.id);
        if (randomMember) {
          const responseMessages = [
            'いいですね！',
            'カラオケ行きましょう！',
            '何時がいいですか？',
            'どこのお店がいいですか？',
            '土曜日は空いてますか？',
            'YOASOBI好きですか？',
            '得意な曲は何ですか？',
          ];
          
          const responseMessage = {
            id: Math.random().toString(36).substring(2, 9),
            userId: randomMember.id,
            content: responseMessages[Math.floor(Math.random() * responseMessages.length)],
            timestamp: new Date(),
          };
          
          const updatedGroupWithResponse = {
            ...updatedGroup,
            messages: [...updatedGroup.messages, responseMessage],
          };
          
          setCurrentGroup(updatedGroupWithResponse);
          localStorage.setItem('current_group', JSON.stringify(updatedGroupWithResponse));
        }
      }, 2000);
    }
  };

  return (
    <MatchContext.Provider 
      value={{ 
        currentGroup, 
        matchStatus, 
        startMatching, 
        cancelMatching, 
        leaveGroup, 
        sendMessage 
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};