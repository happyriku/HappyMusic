import React from 'react';
import { EmotionTag } from '../types';
import { motion } from 'framer-motion';

interface EmotionSphereProps {
  emotion: EmotionTag;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

const EmotionSphere: React.FC<EmotionSphereProps> = ({
  emotion,
  onClick,
  selected = false,
  className = '',
}) => {
  return (
    <motion.div
      className={`cursor-pointer flex items-center justify-center rounded-full ${selected ? 'ring-2 ring-white ring-opacity-70' : ''} ${className}`}
      style={{
        backgroundColor: emotion.color,
        width: '4rem',
        height: '4rem',
      }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="text-white text-xs font-medium text-center">
        {emotion.name}
      </span>
    </motion.div>
  );
};

export default EmotionSphere;