import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Music, MapPin } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  
  const [formData, setFormData] = useState({
    nickname: '',
    age: '',
    gender: '',
    location: '',
    profileColor: '#8A7CFF',
  });
  
  const colors = [
    '#8A7CFF', // Purple
    '#FF5757', // Red
    '#5CE1E6', // Cyan
    '#FFB546', // Orange
    '#5EE65C', // Green
    '#FF7CE5', // Pink
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create user object
    const newUser = {
      id: `user-${Date.now()}`,
      nickname: formData.nickname,
      age: parseInt(formData.age),
      gender: formData.gender || undefined,
      location: formData.location,
      profileColor: formData.profileColor,
    };
    
    // Login the user
    login(newUser);
    
    // Navigate to music selection
    navigate('/music-selection');
  };
  
  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Create Your Profile</h1>
          <p className="text-gray-600">No photos needed, just your music identity</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
              Nickname
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                value={formData.nickname}
                onChange={handleChange}
                className="pl-10 w-full border border-gray-300 rounded-md py-3 shadow-sm focus:ring-violet-500 focus:border-violet-500"
                placeholder="Your music identity"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                required
                min="18"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-3 px-3 shadow-sm focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender (Optional)
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-3 px-3 shadow-sm focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="">Prefer not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="pl-10 w-full border border-gray-300 rounded-md py-3 shadow-sm focus:ring-violet-500 focus:border-violet-500"
                placeholder="City"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Your Profile Color
            </label>
            <div className="flex justify-between">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-full ${
                    formData.profileColor === color ? 'ring-2 ring-offset-2 ring-violet-600' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, profileColor: color })}
                />
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-md font-medium hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Continue to Music Selection
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;