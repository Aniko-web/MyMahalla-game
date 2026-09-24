import React from 'react';
import { motion } from 'framer-motion';

interface StatBarProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
  barColor: string;
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  icon,
  colorClass,
  barColor,
}) => {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className="flex flex-col bg-white/80 backdrop-blur-md rounded-xl p-1.5 sm:p-2.5 border border-mahalla-gold/25 shadow-warm-sm transition-all hover:border-mahalla-gold/60 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-0.5 sm:gap-1 mb-1">
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-hidden">
          <span className={`text-sm sm:text-base ${colorClass} shrink-0`}>{icon}</span>
          <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-mahalla-navy/80 font-heading truncate">
            {label}
          </span>
        </div>
        <motion.span
          key={value}
          initial={{ scale: 1.3, color: '#2D6A4F' }}
          animate={{ scale: 1, color: '#0F1E2E' }}
          transition={{ duration: 0.35 }}
          className="text-xs sm:text-sm font-extrabold font-heading text-mahalla-navy"
        >
          {value}
        </motion.span>
      </div>

      {/* Progress track */}
      <div className="w-full h-1 sm:h-2 bg-cream-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', damping: 20, stiffness: 120 }}
        />
      </div>
    </div>
  );
};
