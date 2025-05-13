import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { MatchProvider } from './context/MatchContext';
import { VenueProvider } from './context/VenueContext';

import AppHeader from './components/AppHeader';
import StartScreen from './components/StartScreen';
import RegisterForm from './components/auth/RegisterForm';
import HomePage from './components/home/HomePage';
import MatchingPage from './components/matching/MatchingPage';
import GroupPage from './components/group/GroupPage';
import VenuePage from './components/venue/VenuePage';
import CheckinSuccessPage from './components/venue/CheckinSuccessPage';
import ProfilePage from './components/profile/ProfilePage';

import './styles/animations.css';

const App: React.FC = () => {
  return (
    <UserProvider>
      <MatchProvider>
        <VenueProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-gray-100">
              <Routes>
                <Route path="/" element={<StartScreen />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route 
                  path="/home" 
                  element={
                    <>
                      <AppHeader />
                      <HomePage />
                    </>
                  } 
                />
                <Route 
                  path="/matching" 
                  element={
                    <>
                      <AppHeader />
                      <MatchingPage />
                    </>
                  } 
                />
                <Route 
                  path="/group" 
                  element={<GroupPage />} 
                />
                <Route 
                  path="/venue" 
                  element={<VenuePage />} 
                />
                <Route 
                  path="/checkin-success" 
                  element={<CheckinSuccessPage />} 
                />
                <Route 
                  path="/profile" 
                  element={<ProfilePage />} 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </VenueProvider>
      </MatchProvider>
    </UserProvider>
  );
};

export default App;