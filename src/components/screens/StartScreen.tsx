import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sun, Heart, Users, Shield, Sparkles } from 'lucide-react';
import { SoundToggle } from '../common/SoundToggle';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#F7EFE2] via-[#F4ECE0] to-[#EBE0CD]">
      {/* Top Header Controls */}
      <header className="relative z-20 max-w-7xl w-full mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-mahalla-green to-mahalla-green-deep flex items-center justify-center text-white text-xl shadow-warm-sm">
            🏘️
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-mahalla-terracotta font-heading block">
              Interaktiv Hikoya O‘yini
            </span>
            <span className="text-sm font-black text-mahalla-navy font-heading tracking-wide">
              MAHALLA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SoundToggle />
        </div>
      </header>

      {/* Atmospheric Sunrise & Mahalla Silhouette Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Glowing Morning Sun */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-amber-300/40 via-amber-200/20 to-transparent blur-3xl" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-200/30 blur-2xl animate-sun-glow" />

        {/* Floating clouds */}
        <motion.div
          animate={{ x: [-40, 60, -40] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-12 w-64 h-20 bg-white/40 rounded-full blur-xl"
        />
        <motion.div
          animate={{ x: [40, -50, 40] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-36 right-20 w-80 h-24 bg-white/30 rounded-full blur-xl"
        />

        {/* Distant Flying Birds SVG */}
        <svg className="absolute top-28 left-1/3 w-32 h-16 text-mahalla-brown/30" viewBox="0 0 100 50">
          <path d="M 10,25 Q 20,10 30,25 Q 40,10 50,25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 60,35 Q 68,22 76,35 Q 84,22 92,35" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>

        {/* Traditional Village / Mahalla Skyline Silhouettes at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 opacity-25">
          <svg viewBox="0 0 1200 300" className="w-full h-full object-cover preserve-3d" preserveAspectRatio="none">
            {/* Far Trees & Roofs */}
            <path
              d="M0,300 L0,220 L60,200 L120,220 L180,180 L240,210 L320,170 L400,220 L480,190 L580,230 L660,160 L740,210 L840,180 L920,220 L1020,170 L1100,210 L1200,190 L1200,300 Z"
              fill="#2D6A4F"
            />
            {/* Closer Houses with Minarets / Guzar */}
            <path
              d="M0,300 L0,250 L80,240 L140,250 L200,220 L270,240 L350,200 L430,240 L500,230 L550,190 L600,190 L650,230 L720,220 L800,250 L900,210 L980,240 L1080,220 L1200,250 L1200,300 Z"
              fill="#1B4332"
            />
          </svg>
        </div>
      </div>

      {/* Hero Center Card */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 flex flex-col items-center text-center">
        {/* Value badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-cream-50/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-mahalla-gold/50 shadow-warm-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs sm:text-sm font-semibold text-mahalla-navy font-heading">
            Qadriyatlar beshigi, jamiyatning ma’naviy asoslari
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-3 sm:mb-4"
        >
          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-mahalla-navy font-heading tracking-tight leading-none">
            MAHALLA
          </h1>
          <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-mahalla-terracotta font-heading tracking-widest mt-1">
            BIR KUN
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-lg mx-auto mb-6 sm:mb-8"
        >
          <p className="text-base sm:text-xl font-medium text-mahalla-navy/85 font-heading italic leading-relaxed">
            “Bir kun. O‘nlab qarorlar. Bitta mahalla.”
          </p>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          onClick={onStart}
          className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-3.5 sm:py-5 rounded-2xl bg-gradient-to-r from-mahalla-green-deep via-mahalla-green to-mahalla-green-light text-white font-extrabold text-sm sm:text-lg font-heading shadow-warm-lg hover:shadow-glow-green border border-emerald-400/40 transition-all cursor-pointer"
        >
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors shrink-0">
            <Play size={14} fill="white" className="ml-0.5" />
          </span>
          <span>▶ O‘YINNI BOSHLASH</span>
          <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform shrink-0" />
        </motion.button>

        {/* Secondary Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs sm:text-sm text-mahalla-navy/60 font-medium font-body mt-4"
        >
          Sizning har bir qaroringiz mahalla hayoti va kayfiyatini o‘zgartiradi.
        </motion.p>

        {/* 4 Core Pillars Pills */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-10 max-w-2xl w-full"
        >
          <div className="bg-white/70 backdrop-blur-md p-2.5 rounded-xl border border-mahalla-gold/30 flex items-center gap-2 justify-center text-xs font-semibold text-mahalla-navy">
            <span>❤️</span> Mehr-oqibat
          </div>
          <div className="bg-white/70 backdrop-blur-md p-2.5 rounded-xl border border-mahalla-gold/30 flex items-center gap-2 justify-center text-xs font-semibold text-mahalla-navy">
            <span>🤝</span> Hamjihatlik
          </div>
          <div className="bg-white/70 backdrop-blur-md p-2.5 rounded-xl border border-mahalla-gold/30 flex items-center gap-2 justify-center text-xs font-semibold text-mahalla-navy">
            <span>🧓</span> Kattalarga hurmat
          </div>
          <div className="bg-white/70 backdrop-blur-md p-2.5 rounded-xl border border-mahalla-gold/30 flex items-center gap-2 justify-center text-xs font-semibold text-mahalla-navy">
            <span>🌱</span> Mahalla obodligi
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 max-w-7xl w-full mx-auto px-6 py-4 text-center text-xs text-mahalla-navy/50 font-body">
        O‘zbekiston Respublikasi yoshlariga bag‘ishlanadi • O‘zbekiston mahallalari ma’naviy merosi
      </footer>
    </div>
  );
};
