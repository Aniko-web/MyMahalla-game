import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

interface StoryDialogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  story: string;
  author: string;
}

export const StoryDialogueModal: React.FC<StoryDialogueModalProps> = ({
  isOpen,
  onClose,
  title,
  story,
  author,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mahalla-navy-dark/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-cream-50 rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-mahalla-gold shadow-warm-lg relative overflow-hidden"
        >
          {/* Decorative Corner Girih Elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-mahalla-gold/20 to-transparent pointer-events-none rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-mahalla-green/15 to-transparent pointer-events-none rounded-tr-full" />

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-mahalla-brown text-white flex items-center justify-center text-2xl shadow-warm-sm">
              🧓
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 tracking-wider uppercase font-heading flex items-center gap-1">
                <Sparkles size={14} className="text-amber-500" />
                Mahalla Solnomasi & Hikmat
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-mahalla-navy font-heading">
                {title}
              </h3>
            </div>
          </div>

          {/* Story Card */}
          <div className="bg-white/90 p-5 rounded-2xl border border-mahalla-gold/40 shadow-warm-sm mb-6 relative">
            <span className="text-4xl text-mahalla-gold/40 font-serif absolute top-2 left-3 select-none">
              “
            </span>
            <p className="text-sm sm:text-base text-mahalla-navy leading-relaxed font-body italic pt-2 pl-4">
              {story}
            </p>
            <div className="mt-4 text-right">
              <span className="text-xs font-bold text-mahalla-green-deep font-heading">
                — {author}
              </span>
            </div>
          </div>

          {/* Close / Acknowledge button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-mahalla-green-deep to-mahalla-green text-white font-bold font-heading shadow-warm-md hover:shadow-glow-green transition-all flex items-center justify-center gap-2"
          >
            <Heart size={18} className="text-rose-300" />
            <span>O'gitni qalbga joyladim</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
