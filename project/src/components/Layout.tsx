import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Music, Heart, MessageCircle, User, Home } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Don't show navigation on welcome and register pages
  const showNav = isAuthenticated && !['/'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-violet-800 text-white p-4 shadow-md z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Music className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold tracking-tight">SYNK</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 relative">
        {children}
      </main>

      {/* Footer Navigation */}
      {showNav && (
        <footer className="bg-white border-t border-gray-200 shadow-lg">
          <nav className="container mx-auto">
            <ul className="flex justify-around py-3">
              <li>
                <button onClick={() => navigate('/discover')} className={`flex flex-col items-center p-2 ${location.pathname === '/discover' ? 'text-violet-700' : 'text-gray-600'}`}>
                  <Heart className="w-6 h-6" />
                  <span className="text-xs mt-1">Discover</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/song-resonance')} className={`flex flex-col items-center p-2 ${location.pathname === '/song-resonance' ? 'text-violet-700' : 'text-gray-600'}`}>
                  <Music className="w-6 h-6" />
                  <span className="text-xs mt-1">Resonance</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/matches')} className={`flex flex-col items-center p-2 ${location.pathname === '/matches' ? 'text-violet-700' : 'text-gray-600'}`}>
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-xs mt-1">Matches</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/emotion-tagging')} className={`flex flex-col items-center p-2 ${location.pathname === '/emotion-tagging' ? 'text-violet-700' : 'text-gray-600'}`}>
                  <User className="w-6 h-6" />
                  <span className="text-xs mt-1">Profile</span>
                </button>
              </li>
            </ul>
          </nav>
        </footer>
      )}
    </div>
  );
};

export default Layout;