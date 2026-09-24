import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, X, Bell, Trophy, HeartHandshake, Coffee, Sparkles, Sun, Smile, BookOpen, Sprout } from 'lucide-react';
import { NewsItem } from '../../types/game';
import { api } from '../../api/client';

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-5 h-5 text-amber-600" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-rose-600" />,
  Coffee: <Coffee className="w-5 h-5 text-mahalla-brown" />,
  Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />,
  Sun: <Sun className="w-5 h-5 text-amber-600" />,
  Smile: <Smile className="w-5 h-5 text-emerald-600" />,
  BookOpen: <BookOpen className="w-5 h-5 text-indigo-600" />,
  Sprout: <Sprout className="w-5 h-5 text-green-600" />
};

export const MahallaTVTicker: React.FC = () => {
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  // Fetch news periodically or on start
  const fetchNews = async () => {
    const item = await api.getRandomNews();
    setCurrentNews(item);
    setIsOpen(true);
    setHasNew(true);

    // Auto-minimize after 9 seconds if not interacted
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 9000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    // Initial news after 3 seconds
    const initialTimer = setTimeout(() => {
      fetchNews();
    }, 3500);

    // Recurring news every 35 seconds
    const interval = setInterval(() => {
      fetchNews();
    }, 35000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:max-w-md z-40 pointer-events-none">
      <AnimatePresence>
        {isOpen && currentNews && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-warm-lg border border-mahalla-gold/40 relative overflow-hidden"
          >
            {/* Top decorative banner */}
            <div className="flex items-center justify-between gap-3 pb-2.5 mb-2.5 border-b border-cream-200">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                <span className="text-xs font-bold tracking-wider uppercase text-mahalla-navy flex items-center gap-1 font-heading">
                  <Radio size={14} className="text-rose-500" />
                  Mahalla TV • Jonli Xabar
                </span>
                <span className="text-[10px] bg-cream-200 text-mahalla-brown font-semibold px-2 py-0.5 rounded-full">
                  {currentNews.category}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-mahalla-navy/40 hover:text-mahalla-navy p-1 rounded-md transition-colors"
                title="Yopish"
              >
                <X size={15} />
              </button>
            </div>

            {/* News body */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-cream-100 rounded-xl border border-cream-300 shrink-0">
                {iconMap[currentNews.icon] || <Sparkles className="w-5 h-5 text-amber-500" />}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-mahalla-navy leading-tight mb-1 font-heading">
                  {currentNews.title}
                </h4>
                <p className="text-xs text-mahalla-navy/80 leading-relaxed font-body">
                  {currentNews.content}
                </p>
                <div className="text-[10px] text-mahalla-navy/50 mt-1.5 font-medium">
                  {currentNews.time_ago}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating mini launcher icon when closed */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (!currentNews) fetchNews();
            else setIsOpen(true);
            setHasNew(false);
          }}
          className="pointer-events-auto ml-auto flex items-center gap-2 bg-gradient-to-r from-mahalla-green-deep to-mahalla-green text-white px-3.5 py-2 rounded-full shadow-warm-md hover:shadow-warm-lg border border-mahalla-gold/50 transition-all font-heading text-xs font-semibold"
        >
          <Bell size={14} className={hasNew ? "animate-bounce text-amber-300" : ""} />
          <span>Mahalla TV</span>
          {hasNew && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          )}
        </motion.button>
      )}
    </div>
  );
};
