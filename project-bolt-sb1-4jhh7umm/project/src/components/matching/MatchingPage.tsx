import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, X } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { useMatch } from '../../context/MatchContext';
import MatchingOptions from './MatchingOptions';
import MatchingAnimation from './MatchingAnimation';
import MatchSuccess from './MatchSuccess';

const MatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const { matchStatus, startMatching, cancelMatching } = useMatch();
  const [showOptions, setShowOptions] = useState(true);
  
  const handleBack = () => {
    if (matchStatus === 'matching') {
      cancelMatching();
    }
    navigate('/home');
  };
  
  const handleStartMatching = (groupSize: 2 | 3 | 4) => {
    setShowOptions(false);
    startMatching({ groupSize });
  };
  
  const renderContent = () => {
    if (showOptions && matchStatus === 'idle') {
      return <MatchingOptions onStartMatching={handleStartMatching} />;
    }
    
    if (matchStatus === 'matching') {
      return <MatchingAnimation onCancel={cancelMatching} />;
    }
    
    if (matchStatus === 'matched') {
      return <MatchSuccess onContinue={() => navigate('/group')} />;
    }
    
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 text-white pt-4 pb-16 px-4">
      <div className="container mx-auto max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">マッチング</h2>
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-purple-800 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default MatchingPage;