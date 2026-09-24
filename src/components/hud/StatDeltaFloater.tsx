import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatEffects } from '../../types/game';

interface StatDeltaFloaterProps {
  effects: StatEffects | null;
}

export const StatDeltaFloater: React.FC<StatDeltaFloaterProps> = ({ effects }) => {
  if (!effects) return null;

  const items: { label: string; icon: string; val: number }[] = [];
  if (effects.mehr) items.push({ label: 'Mehr', icon: '❤️', val: effects.mehr });
  if (effects.hamjihatlik) items.push({ label: 'Hamjihatlik', icon: '🤝', val: effects.hamjihatlik });
  if (effects.hurmat) items.push({ label: 'Hurmat', icon: '🧓', val: effects.hurmat });
  if (effects.obodlik) items.push({ label: 'Obodlik', icon: '🌱', val: effects.obodlik });
  if (effects.ishonch) items.push({ label: 'Ishonch', icon: '🛡️', val: effects.ishonch });

  if (items.length === 0) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-wrap gap-2 justify-center">
      <AnimatePresence>
        {items.map((item, idx) => {
          const isPositive = item.val > 0;
          return (
            <motion.div
              key={`${item.label}-${idx}`}
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: -20, scale: 1.1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-warm-md flex items-center gap-1.5 border ${
                isPositive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-400/60 shadow-glow-green'
                  : 'bg-rose-50 text-rose-800 border-rose-400/60'
              }`}
            >
              <span>{item.icon}</span>
              <span>
                {isPositive ? `+${item.val}` : item.val} {item.label}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
