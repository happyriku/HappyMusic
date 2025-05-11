import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Song, EmotionTag } from '../types';
import { mockSongs } from '../data/mockData';

interface MusicContextType {
  userSongs: Song[];
  addSong: (song: Song) => void;
  removeSong: (songId: string) => void;
  addEmotionToSong: (songId: string, emotion: EmotionTag) => void;
  currentSamples: Song[];
  refreshSamples: () => void;
}

const MusicContext = createContext<MusicContextType>({
  userSongs: [],
  addSong: () => {},
  removeSong: () => {},
  addEmotionToSong: () => {},
  currentSamples: [],
  refreshSamples: () => {},
});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [userSongs, setUserSongs] = useState<Song[]>([]);
  const [currentSamples, setCurrentSamples] = useState<Song[]>(
    mockSongs.slice(0, 5)
  );

  const addSong = (song: Song) => {
    setUserSongs((prev) => [...prev, song]);
  };

  const removeSong = (songId: string) => {
    setUserSongs((prev) => prev.filter((song) => song.id !== songId));
  };

  const addEmotionToSong = (songId: string, emotion: EmotionTag) => {
    setUserSongs((prev) =>
      prev.map((song) => {
        if (song.id === songId) {
          return {
            ...song,
            emotions: [...song.emotions, emotion],
          };
        }
        return song;
      })
    );
  };

  const refreshSamples = () => {
    // In a real app, this would fetch from an API
    const randomSongs = [...mockSongs]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setCurrentSamples(randomSongs);
  };

  return (
    <MusicContext.Provider
      value={{
        userSongs,
        addSong,
        removeSong,
        addEmotionToSong,
        currentSamples,
        refreshSamples,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};