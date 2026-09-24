import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Stats, CommunityProfile, CommunityHistoryItem } from '../../types/game';
import { Sparkles, RotateCcw, ArrowRight, Heart, Users, Shield, Sprout, Award, BookOpen, Clock } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ResultScreenProps {
  playerName: string;
  stats: Stats;
  profile: CommunityProfile;
  history: CommunityHistoryItem[];
  onPlayAgain: () => void;
  onProceedToCinematic: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  playerName,
  stats,
  profile,
  history,
  onPlayAgain,
  onProceedToCinematic,
}) => {
  useEffect(() => {
    sound.playSuccessSound();
    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2D6A4F', '#D4A373', '#E07A5F', '#582F0E', '#E9C46A']
      });
    } catch {}
  }, []);

  const statItems = [
    { label: 'Mehr-oqibat', val: stats.mehr, icon: '❤️', color: 'from-rose-400 to-rose-600', textCol: 'text-rose-600' },
    { label: 'Hamjihatlik', val: stats.hamjihatlik, icon: '🤝', color: 'from-emerald-400 to-emerald-600', textCol: 'text-emerald-600' },
    { label: 'Kattalarga hurmat', val: stats.hurmat, icon: '🧓', color: 'from-amber-400 to-amber-600', textCol: 'text-amber-600' },
    { label: 'Mahalla obodligi', val: stats.obodlik, icon: '🌱', color: 'from-green-400 to-lime-600', textCol: 'text-green-600' },
    { label: 'O‘zaro ishonch', val: stats.ishonch, icon: '🛡️', color: 'from-blue-400 to-indigo-600', textCol: 'text-blue-600' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F7EFE2] via-[#F4ECE0] to-[#EBE0CD] py-8 sm:py-12 px-4 sm:px-6 relative overflow-x-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-cream-200/90 px-4 py-1.5 rounded-full border border-mahalla-gold/40 text-xs sm:text-sm font-bold text-mahalla-navy font-heading mb-3 shadow-warm-sm">
            <Sparkles size={14} className="text-amber-600" />
            <span>Kunlik Sarhisob • Sizning Mahalla Qiyofangiz</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-mahalla-navy font-heading">
            Bugun siz mahallangizni qanday o‘zgartirdingiz?
          </h2>
          <p className="text-sm sm:text-base text-mahalla-navy/70 mt-1 font-body">
            Aziz <span className="font-bold text-mahalla-green-deep">{playerName}</span>, sizning bugungi qarorlaringiz ushbu jamoaviy qiyofani shakllantirdi:
          </p>
        </motion.div>

        {/* Profile Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-mahalla-gold/60 shadow-warm-lg relative overflow-hidden text-center"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

          {/* Profile Icon / Badge */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-mahalla-green-deep to-mahalla-green text-white flex items-center justify-center text-4xl shadow-warm-md mb-4 border-2 border-white">
            {profile.id === 'mehrli' && '❤️'}
            {profile.id === 'birdam' && '🤝'}
            {profile.id === 'avlodlar' && '🧓'}
            {profile.id === 'obod' && '🌱'}
            {profile.id === 'ideal' && '🏘️'}
          </div>

          <span className="text-xs font-bold tracking-widest uppercase text-mahalla-terracotta font-heading">
            Mahalla xarakteri
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-mahalla-navy font-heading mt-1 mb-2">
            “{profile.title}”
          </h3>

          <p className="text-base sm:text-lg font-semibold text-mahalla-brown font-heading italic max-w-lg mx-auto mb-4">
            {profile.tagline}
          </p>

          <p className="text-sm sm:text-base text-mahalla-navy/85 font-body leading-relaxed max-w-2xl mx-auto">
            {profile.description}
          </p>
        </motion.div>

        {/* 5 Stats Breakdown Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-mahalla-gold/40 shadow-warm-md"
        >
          <div className="flex items-center gap-2 mb-5">
            <Award className="w-5 h-5 text-amber-600" />
            <h4 className="text-base sm:text-lg font-bold text-mahalla-navy font-heading">
              Ko‘rsatkichlar tahlili (0 dan 100 gacha)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statItems.map((st) => (
              <div
                key={st.label}
                className="bg-white/80 p-3.5 rounded-2xl border border-cream-300 shadow-warm-sm flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{st.icon}</span>
                    <span className="text-xs sm:text-sm font-bold text-mahalla-navy font-heading">
                      {st.label}
                    </span>
                  </div>
                  <span className={`text-sm sm:text-base font-extrabold font-heading ${st.textCol}`}>
                    {st.val} / 100
                  </span>
                </div>

                <div className="w-full h-2.5 bg-cream-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${st.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(0, st.val))}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mahalla Solnomasi / Xotiralari (Community Chronicle from SQLite) */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-mahalla-gold/40 shadow-warm-md"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-mahalla-green" />
              <div>
                <h4 className="text-base sm:text-lg font-bold text-mahalla-navy font-heading">
                  Mahalla Solnomasi (Boshqa hamyurtlarimiz tarixi)
                </h4>
                <p className="text-xs text-mahalla-navy/60 font-body">
                  Ushbu mahallani obod etgan boshqa qo‘shnilarimiz erishgan natijalar:
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1">
              {history.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-white/80 p-3 rounded-xl border border-cream-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-cream-200 flex items-center justify-center font-bold text-mahalla-brown">
                      #{idx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-mahalla-navy text-xs sm:text-sm font-heading">
                        {item.player_name}
                      </span>
                      <span className="text-[11px] text-mahalla-terracotta ml-2 font-semibold">
                        “{item.profile_title}”
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-mahalla-navy/70">
                    <span className="hidden sm:inline text-[10px] text-gray-500">
                      ❤️ {item.stats.mehr} | 🤝 {item.stats.hamjihatlik} | 🌱 {item.stats.obodlik}
                    </span>
                    <Clock size={12} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 pb-8"
        >
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white text-mahalla-navy font-bold font-heading border-2 border-mahalla-gold/50 shadow-warm-sm hover:bg-cream-100 transition-all flex items-center justify-center gap-2.5"
          >
            <RotateCcw size={18} className="text-mahalla-brown" />
            <span>↻ Qayta o‘ynash</span>
          </button>

          <button
            onClick={onProceedToCinematic}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-mahalla-green-deep to-mahalla-green text-white font-extrabold font-heading shadow-warm-lg hover:shadow-glow-green border border-emerald-400/40 transition-all flex items-center justify-center gap-2.5"
          >
            <span>Kinematik xulosani ko‘rish</span>
            <ArrowRight size={19} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
