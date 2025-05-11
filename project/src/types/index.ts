export interface User {
  id: string;
  nickname: string;
  age: number;
  gender?: string;
  location: string;
  profileColor: string;
  compatibilityScore?: number;
}

export interface EmotionTag {
  id: string;
  name: string;
  color: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  previewUrl?: string;
  emotions: EmotionTag[];
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  emotion: string;
  genre: string;
  location: string;
  song: Song;
  completed: boolean;
}

export interface Match {
  id: string;
  user: User;
  createdAt: Date;
  mission: Mission;
  messages: Message[];
}