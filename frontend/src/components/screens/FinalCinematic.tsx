import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Home, Sparkles } from 'lucide-react';

interface FinalCinematicProps {
  onRestart: () => void;
  onBackToMahalla: () => void;
}

export const FinalCinematic: React.FC<FinalCinematicProps> = ({
  onRestart,
  onBackToMahalla,
}) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequential text line reveals
    const timer1 = setTimeout(() => setStep(1), 1200);  // Line 1
    const timer2 = setTimeout(() => setStep(2), 3400);  // Line 2
    const timer3 = setTimeout(() => setStep(3), 5600);  // Line 3 & 4 (Big theme)
    const timer4 = setTimeout(() => setStep(4), 8000);  // Outro & Buttons

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0A1118] text-[#FDFBF7] flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden select-none">
      {/* Background Subtle Stars / Lantern Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl w-full text-center relative z-10 flex flex-col items-center gap-6">
        {/* Line 1 */}
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-lg sm:text-2xl text-[#E9DBC8]/90 font-heading font-medium tracking-wide"
          >
            “Mahalla — shunchaki uylar joylashgan hudud emas.”
          </motion.p>
        )}

        {/* Line 2 */}
        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-xl sm:text-3xl text-[#FAF6ED] font-heading font-semibold tracking-wide"
          >
            “Mahalla — insonlar bir-biriga befarq bo‘lmagan maskan.”
          </motion.p>
        )}

        {/* Line 3 & 4 (Grand Theme) */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="my-6 py-6 border-y border-[#D4A373]/30 w-full"
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#F4A261] via-[#E9C46A] to-[#D4A373] tracking-widest uppercase">
              MAHALLA — QADRIYATLAR BESHIGI
            </h1>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-heading text-[#DFE7D6] tracking-wider uppercase mt-2">
              JAMIYATNING MA’NAVIY ASOSI
            </h2>
          </motion.div>
        )}

        {/* Line 5 (Outro) */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-sm sm:text-base text-[#DCC5A9]/80 font-body italic max-w-md">
              Bir kunlik o‘yin tugadi. Ammo mahalla haqidagi mehr va yaxshilik hikoyasi hayotda davom etadi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <button
                onClick={onRestart}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold font-heading border border-white/20 shadow-warm-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw size={17} />
                <span>↻ QAYTA O‘YNASH</span>
              </button>

              <button
                onClick={onBackToMahalla}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-mahalla-green-deep to-mahalla-green text-white font-extrabold font-heading shadow-glow-green border border-emerald-400/40 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home size={18} />
                <span>🏘️ MAHALLAGA QAYTISH</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
