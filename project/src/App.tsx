import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { MusicProvider } from './contexts/MusicContext';
import { MatchProvider } from './contexts/MatchContext';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import MusicSelection from './pages/MusicSelection';
import EmotionTagging from './pages/EmotionTagging';
import Discover from './pages/Discover';
import SongResonance from './pages/SongResonance';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import Mission from './pages/Mission';
import NotFound from './pages/NotFound';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // Prevent pull-to-refresh
  useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
    
    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    
    return () => {
      document.body.style.overscrollBehavior = 'auto';
    };
  }, []);

  return (
    <Router>
      <UserProvider>
        <MusicProvider>
          <MatchProvider>
            <ScrollToTop />
            <div className="min-h-[100dvh] max-w-md mx-auto relative">
              <Layout>
                <Routes>
                  <Route path="/" element={<Welcome />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/music-selection" element={<MusicSelection />} />
                  <Route path="/emotion-tagging" element={<EmotionTagging />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/song-resonance" element={<SongResonance />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/chat/:id" element={<Chat />} />
                  <Route path="/mission/:id" element={<Mission />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </div>
          </MatchProvider>
        </MusicProvider>
      </UserProvider>
    </Router>
  );
}

export default App;