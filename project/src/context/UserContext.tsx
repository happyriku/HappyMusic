import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  connectMusicAccount: (platform: 'spotify' | 'apple') => Promise<void>;
  updatePoints: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('karaoke_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we're creating a mock user
    const mockUser: User = {
      id: '1',
      nickname: 'カラオケファン',
      birthYear: 1995,
      birthMonth: 5,
      birthDay: 15,
      gender: 'male',
      area: 'Tokyo',
      points: 5000,
      musicAccountConnected: false,
      favoriteArtists: [],
      favoriteSongs: [],
    };
    
    setUser(mockUser);
    localStorage.setItem('karaoke_user', JSON.stringify(mockUser));
  };

  const register = async (userData: Partial<User>) => {
    // In a real app, this would make an API call
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      nickname: userData.nickname || 'User',
      birthYear: userData.birthYear || 2000,
      birthMonth: userData.birthMonth || 1,
      birthDay: userData.birthDay || 1,
      gender: userData.gender || 'other',
      area: userData.area || 'Tokyo',
      points: 5000, // Initial points
      musicAccountConnected: false,
      favoriteArtists: [],
      favoriteSongs: [],
    };
    
    setUser(newUser);
    localStorage.setItem('karaoke_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('karaoke_user');
  };

  const connectMusicAccount = async (platform: 'spotify' | 'apple') => {
    if (!user) return;
    
    // In a real app, this would initiate OAuth flow
    const updatedUser = { 
      ...user, 
      musicAccountConnected: true,
      musicPlatform: platform,
      // Mock data for favorite artists and songs
      favoriteArtists: platform === 'spotify' 
        ? ['YOASOBI', 'Official髭男dism', 'Kenshi Yonezu'] 
        : ['Ado', 'King Gnu', 'Mrs. GREEN APPLE'],
      favoriteSongs: platform === 'spotify'
        ? ['夜に駆ける', 'Pretender', 'Lemon']
        : ['新時代', '白日', 'インフェルノ'],
    };
    
    setUser(updatedUser);
    localStorage.setItem('karaoke_user', JSON.stringify(updatedUser));
  };

  const updatePoints = (amount: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      points: user.points + amount
    };
    
    setUser(updatedUser);
    localStorage.setItem('karaoke_user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        setUser, 
        isAuthenticated, 
        login, 
        register, 
        logout, 
        connectMusicAccount,
        updatePoints
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};