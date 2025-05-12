export interface User {
  id: string;
  nickname: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  gender: 'male' | 'female' | 'other';
  area: string;
  points: number;
  musicAccountConnected: boolean;
  musicPlatform?: 'spotify' | 'apple';
  favoriteArtists?: string[];
  favoriteSongs?: string[];
}

export interface Group {
  id: string;
  members: User[];
  createdAt: Date;
  size: number;
  status: 'waiting' | 'matched' | 'expired';
  messages: Message[];
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}

export interface KaraokeVenue {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  imageUrl: string;
}

export interface MatchingOptions {
  groupSize: 2 | 3 | 4;
}