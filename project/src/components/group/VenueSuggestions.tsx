import React from 'react';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { useVenue } from '../../context/VenueContext';
import { useNavigate } from 'react-router-dom';

const VenueSuggestions: React.FC = () => {
  const { venues, selectVenue } = useVenue();
  const navigate = useNavigate();
  
  const handleSelectVenue = (id: string) => {
    selectVenue(id);
    navigate('/venue');
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">近くのカラオケ店</h3>
      
      {venues.length === 0 ? (
        <div className="text-center py-8 text-white opacity-70">
          <p>カラオケ店を検索中...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {venues.map((venue) => (
            <Card 
              key={venue.id} 
              className="bg-purple-800 border border-purple-600 hover:border-pink-400 transition-colors"
              hoverable
              onClick={() => handleSelectVenue(venue.id)}
            >
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={venue.imageUrl} 
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <h4 className="font-semibold mb-1">{venue.name}</h4>
                    <div className="flex items-center text-sm mb-1">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{venue.rating}</span>
                    </div>
                    <div className="flex items-center text-xs text-white opacity-80">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{venue.address}</span>
                    </div>
                    <div className="flex items-center text-xs mt-1">
                      <span className="text-pink-300">約{venue.distance}</span>
                    </div>
                  </div>
                  <div className="flex items-center pr-3">
                    <ChevronRight className="h-5 w-5 text-white opacity-70" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-sm text-center opacity-70">
        <p>カラオケ店を選んで、グループのメンバーに提案しましょう</p>
      </div>
    </div>
  );
};

export default VenueSuggestions;