import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Match, User, Mission } from '../types';
import { mockUsers, mockMissions } from '../data/mockData';

interface MatchContextType {
  potentialMatches: User[];
  matches: Match[];
  addMatch: (userId: string) => void;
  currentMission: Mission | null;
  getMission: (matchId: string) => Mission | null;
  refreshPotentialMatches: () => void;
}

const MatchContext = createContext<MatchContextType>({
  potentialMatches: [],
  matches: [],
  addMatch: () => {},
  currentMission: null,
  getMission: () => null,
  refreshPotentialMatches: () => {},
});

export const useMatch = () => useContext(MatchContext);

export const MatchProvider = ({ children }: { children: ReactNode }) => {
  const [potentialMatches, setPotentialMatches] = useState<User[]>(
    mockUsers.slice(0, 5)
  );
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);

  const addMatch = (userId: string) => {
    const matchedUser = mockUsers.find((user) => user.id === userId);
    if (matchedUser) {
      const newMatch: Match = {
        id: `match-${Date.now()}`,
        user: matchedUser,
        createdAt: new Date(),
        mission: mockMissions[Math.floor(Math.random() * mockMissions.length)],
        messages: [],
      };
      setMatches((prev) => [...prev, newMatch]);
      setCurrentMission(newMatch.mission);
    }
  };

  const getMission = (matchId: string): Mission | null => {
    const match = matches.find((m) => m.id === matchId);
    return match ? match.mission : null;
  };

  const refreshPotentialMatches = () => {
    // In a real app, this would fetch from an API
    const randomUsers = [...mockUsers]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setPotentialMatches(randomUsers);
  };

  return (
    <MatchContext.Provider
      value={{
        potentialMatches,
        matches,
        addMatch,
        currentMission,
        getMission,
        refreshPotentialMatches,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};