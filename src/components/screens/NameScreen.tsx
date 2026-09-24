import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, UserCheck, Sparkles, MapPin } from 'lucide-react';
import { sound } from '../../utils/audio';

interface NameScreenProps {
  onSubmitName: (name: string) => void;
}

export const NameScreen: React.FC<NameScreenProps> = ({ onSubmitName }) => {
  const [name, setName] = useState('');
  const [isWelcoming, setIsWelcoming] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    sound.playChoiceSound();
    setIsWelcoming(true);

    setTimeout(() => {
      onSubmitName(trimmed);
    }, 1400);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-b from-[#F7EFE2] via-[#F4ECE0] to-[#EBE0CD] relative overflow-hidden">
      {/* Background Girih / Ambient elements */}
      <div className="absolute top-12 left-12 w-72 h-72 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-80 h-80 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg glass-card rounded-3xl p-6 sm:p-10 shadow-warm-lg border border-mahalla-gold/50 relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!isWelcoming ? (
            <motion.div
              key="input-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-cream-200/80 px-3.5 py-1.5 rounded-full border border-mahalla-gold/40 text-xs font-bold text-mahalla-navy font-heading mb-4">
                <MapPin size={13} className="text-mahalla-terracotta" />
                <span>Mahalla darvozasida</span>
              </div>

              {/* Title Question */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-mahalla-navy font-heading leading-tight mb-2">
                Mahallada sizni qanday chaqirishadi?
              </h2>
              <p className="text-sm text-mahalla-navy/70 font-body mb-6">
                Mahallamiz ahli sizni o‘z ismi-sharifingiz yoki aziz nomingiz bilan tanisin.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="playerNameInput" className="block text-xs font-bold uppercase tracking-wider text-mahalla-navy/80 mb-2 font-heading">
                    Ismingiz
                  </label>
                  <input
                    id="playerNameInput"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: Alijon"
                    autoFocus
                    maxLength={30}
                    className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-mahalla-gold/40 focus:border-mahalla-green focus:ring-4 focus:ring-mahalla-green/15 text-mahalla-navy font-heading text-lg outline-none transition-all placeholder:text-gray-400 shadow-inner"
                  />
                </div>

                <motion.button
                  whileHover={name.trim() ? { scale: 1.02 } : {}}
                  whileTap={name.trim() ? { scale: 0.98 } : {}}
                  type="submit"
                  disabled={!name.trim()}
                  className={`w-full py-4 px-6 rounded-2xl font-bold font-heading text-base flex items-center justify-center gap-2.5 transition-all shadow-warm-md ${
                    name.trim()
                      ? 'bg-gradient-to-r from-mahalla-green-deep to-mahalla-green text-white hover:shadow-glow-green cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                  }`}
                >
                  <span>Mahallaga kirish</span>
                  <ArrowRight size={18} />
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="welcome-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-8 text-center flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-3xl mb-4 shadow-warm-sm">
                🤝
              </div>
              <span className="text-xs font-bold tracking-widest text-mahalla-terracotta uppercase font-heading mb-1 flex items-center gap-1">
                <Sparkles size={14} className="text-amber-500" />
                Eshiklarimiz ochiq
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-mahalla-navy font-heading mb-2">
                Xush kelibsiz, <span className="text-mahalla-green">{name}!</span>
              </h2>
              <p className="text-sm text-mahalla-navy/70 font-body">
                Mahallada yangi kun boshlanmoqda...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
