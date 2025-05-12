import React, { createContext, useState, useContext, ReactNode } from 'react';
import { KaraokeVenue } from '../types';

interface VenueContextType {
  venues: KaraokeVenue[];
  selectedVenue: KaraokeVenue | null;
  isCheckedIn: boolean;
  getNearbyVenues: () => Promise<void>;
  selectVenue: (id: string) => void;
  checkIn: () => void;
  checkOut: () => void;
}

const VenueContext = createContext<VenueContextType | undefined>(undefined);

// Mock karaoke venues data
const mockVenues: KaraokeVenue[] = [
  {
    id: '1',
    name: 'カラオケの鉄人 渋谷道玄坂店',
    address: '東京都渋谷区道玄坂2-29-8',
    distance: '300m',
    rating: 4.5,
    imageUrl: 'https://images.pexels.com/photos/2239651/pexels-photo-2239651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'カラオケ館 渋谷センター街店',
    address: '東京都渋谷区宇田川町32-12',
    distance: '450m',
    rating: 4.2,
    imageUrl: 'https://images.pexels.com/photos/3265460/pexels-photo-3265460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    name: 'ビッグエコー 渋谷センター街店',
    address: '東京都渋谷区宇田川町26-3',
    distance: '500m',
    rating: 4.3,
    imageUrl: 'https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    name: 'JOYSOUND 渋谷駅前店',
    address: '東京都渋谷区宇田川町28-6',
    distance: '250m',
    rating: 4.7,
    imageUrl: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const VenueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [venues, setVenues] = useState<KaraokeVenue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<KaraokeVenue | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const getNearbyVenues = async () => {
    // In a real app, this would fetch from an API
    // For now, we'll use mock data
    setVenues(mockVenues);
    return Promise.resolve();
  };

  const selectVenue = (id: string) => {
    const venue = venues.find(v => v.id === id);
    if (venue) {
      setSelectedVenue(venue);
    }
  };

  const checkIn = () => {
    setIsCheckedIn(true);
    localStorage.setItem('checked_in', 'true');
  };

  const checkOut = () => {
    setIsCheckedIn(false);
    localStorage.removeItem('checked_in');
  };

  return (
    <VenueContext.Provider 
      value={{ 
        venues, 
        selectedVenue, 
        isCheckedIn, 
        getNearbyVenues, 
        selectVenue, 
        checkIn, 
        checkOut 
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};

export const useVenue = () => {
  const context = useContext(VenueContext);
  if (context === undefined) {
    throw new Error('useVenue must be used within a VenueProvider');
  }
  return context;
};