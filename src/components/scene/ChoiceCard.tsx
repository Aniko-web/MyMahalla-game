import React from 'react';
import { motion } from 'framer-motion';
import { Choice } from '../../types/game';
import { Check } from 'lucide-react';

interface ChoiceCardProps {
  choice: Choice;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  choice,
  isSelected,
  isDisabled,
  onSelect,
}) => {
  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.015, y: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.985 } : {}}
      onClick={onSelect}
      disabled={isDisabled}
      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-3.5 relative overflow-hidden group ${
        isSelected
          ? 'bg-mahalla-green text-white border-mahalla-green shadow-glow-green'
          : 'bg-white/90 hover:bg-cream-50 text-mahalla-navy border-mahalla-gold/30 hover:border-mahalla-gold shadow-warm-sm'
      } ${isDisabled && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {/* Letter Badge */}
      <div
        className={`w-8 h-8 rounded-xl font-heading font-bold text-sm flex items-center justify-center shrink-0 transition-colors ${
          isSelected
            ? 'bg-white text-mahalla-green'
            : 'bg-cream-200 text-mahalla-brown group-hover:bg-mahalla-green group-hover:text-white'
        }`}
      >
        {isSelected ? <Check size={16} strokeWidth={3} /> : choice.letter}
      </div>

      {/* Choice Text */}
      <div className="flex-1 pt-0.5">
        <p
          className={`text-sm sm:text-base font-semibold leading-snug font-body ${
            isSelected ? 'text-white' : 'text-mahalla-navy'
          }`}
        >
          {choice.text}
        </p>
      </div>

      {/* Subtle selection ring effect */}
      {isSelected && (
        <motion.div
          layoutId="selectionGlow"
          className="absolute inset-0 bg-white/10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};
