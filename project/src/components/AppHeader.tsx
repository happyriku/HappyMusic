import React from 'react';
import { Mic, Music, User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AppHeader: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-purple-900 to-purple-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center" onClick={() => navigate('/')} role="button">
          <Mic className="h-7 w-7 mr-2 text-pink-400" />
          <h1 className="text-xl font-bold">KaraMatch</h1>
        </div>
        
        {user && (
          <div className="flex items-center">
            <div className="hidden md:flex mr-4 items-center">
              <span className="font-semibold text-sm">
                {user.points.toLocaleString()} pts
              </span>
            </div>
            
            <div 
              className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;