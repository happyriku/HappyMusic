import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="bg-violet-100 rounded-full p-6 mb-6">
        <Music className="w-16 h-16 text-violet-600" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-violet-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-violet-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Go to Homepage</span>
      </button>
    </div>
  );
};

export default NotFound;