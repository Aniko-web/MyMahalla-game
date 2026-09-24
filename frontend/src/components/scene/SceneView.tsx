import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene, Choice, Stats } from '../../types/game';
import { ChoiceCard } from './ChoiceCard';
import { StoryDialogueModal } from './StoryDialogueModal';
import { ArrowRight, MapPin, Clock, MessageSquare, Sun, Trees, Heart, Users, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

interface SceneViewProps {
  scene: Scene;
  currentStats: Stats;
  onChoiceMade: (choice: Choice) => void;
  onNextScene: () => void;
  isSubmitting: boolean;
}

export const SceneView: React.FC<SceneViewProps> = ({
  scene,
  currentStats,
  onChoiceMade,
  onNextScene,
  isSubmitting,
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLoreModal, setShowLoreModal] = useState(false);

  const selectedChoice = scene.choices.find(c => c.id === selectedChoiceId);

  const handleSelect = (choice: Choice) => {
    if (selectedChoiceId || isSubmitting) return;
    setSelectedChoiceId(choice.id);
    setShowFeedback(true);
    sound.playChoiceSound();
    onChoiceMade(choice);

    if (scene.id === 'scene_4' && (choice.letter === 'A' || choice.letter === 'C') && scene.dialogue_lore) {
      setTimeout(() => {
        setShowLoreModal(true);
      }, 700);
    }
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setSelectedChoiceId(null);
    onNextScene();
  };

  const isScene9 = scene.stage_number === 9;

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4">
      {/* Scene Content Card */}
      <motion.div
        key={scene.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35 }}
        className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-warm-md border border-mahalla-gold/40 relative overflow-hidden"
      >
        {/* Subtle Background Girih Ornament */}
        <div className="absolute top-0 right-0 w-32 sm:w-44 h-32 sm:h-44 bg-gradient-to-bl from-mahalla-gold/15 to-transparent pointer-events-none rounded-bl-full" />

        {/* Scene Meta Badges */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="bg-mahalla-green text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-heading">
              {scene.stage_number}-bosqich
            </span>
            <span className="text-xs sm:text-sm font-bold text-mahalla-navy font-heading tracking-wide uppercase">
              {scene.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-mahalla-navy/70">
            <span className="flex items-center gap-1 bg-cream-200/90 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium">
              <MapPin size={11} className="text-mahalla-terracotta shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-none">{scene.location_name}</span>
            </span>
            <span className="flex items-center gap-1 bg-cream-200/90 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium">
              <Clock size={11} className="text-amber-600 shrink-0" />
              <span>{scene.time_of_day}</span>
            </span>
          </div>
        </div>

        {/* Situation Description */}
        <div className="mb-4 sm:mb-5">
          <p className="text-sm sm:text-base md:text-lg text-mahalla-navy font-body leading-relaxed">
            {scene.situation}
          </p>
        </div>

        {/* Stage 9 Special: Reactive Sunset Environment Visuals */}
        {isScene9 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-5 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-indigo-900/15 border border-mahalla-gold/50"
          >
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-mahalla-brown font-heading uppercase tracking-wider">
              <Sun size={14} className="text-amber-600 shrink-0" />
              <span>Mahallaning Oqshomgi Qiyofasi (Sizning amallaringiz aksi)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-mahalla-navy/90">
              <div className={`p-2 sm:p-2.5 rounded-xl border flex items-center gap-2 ${currentStats.obodlik >= 55 ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900' : 'bg-cream-100/90 border-cream-300'}`}>
                <Trees size={16} className="text-emerald-600 shrink-0" />
                <span className="leading-snug">{currentStats.obodlik >= 55 ? "Ko'chalar ozoda, ariqlar ravon, daraxtlar parvarishlangan va kechki chiroqlar yoniq." : "Ko'chalarda kunlik hayot sokin davom etmoqda."}</span>
              </div>
              <div className={`p-2 sm:p-2.5 rounded-xl border flex items-center gap-2 ${currentStats.mehr >= 55 ? 'bg-rose-50/90 border-rose-300 text-rose-900' : 'bg-cream-100/90 border-cream-300'}`}>
                <Heart size={16} className="text-rose-500 shrink-0" />
                <span className="leading-snug">{currentStats.mehr >= 55 ? "Qo'shnilar bir-birlariga samimiy tabassum va mehr bilan iltifot ko'rsatmoqda." : "Odamlar sekin-asta uylariga qaytmoqda."}</span>
              </div>
              <div className={`p-2 sm:p-2.5 rounded-xl border flex items-center gap-2 ${currentStats.hurmat >= 55 ? 'bg-amber-50/90 border-amber-300 text-amber-900' : 'bg-cream-100/90 border-cream-300'}`}>
                <Users size={16} className="text-amber-600 shrink-0" />
                <span className="leading-snug">{currentStats.hurmat >= 55 ? "So'rilarda nuroniylar rozi bo'lib yoshlarga ezgu duo qilmoqda." : "Choyxona atrofida sokin suhbatlar kechmoqda."}</span>
              </div>
              <div className={`p-2 sm:p-2.5 rounded-xl border flex items-center gap-2 ${currentStats.ishonch >= 55 ? 'bg-blue-50/90 border-blue-300 text-blue-900' : 'bg-cream-100/90 border-cream-300'}`}>
                <ShieldCheck size={16} className="text-blue-600 shrink-0" />
                <span className="leading-snug">{currentStats.ishonch >= 55 ? "Mahalla ahlining o'zaro birdamligi va ishonchi mustahkam." : "Tungi xotirjamlik boshlanmoqda."}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Question */}
        <div className="bg-cream-100/90 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-mahalla-gold/30 mb-4 sm:mb-5 flex items-center gap-2.5">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-mahalla-green shrink-0" />
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-mahalla-navy font-heading">
            {scene.question}
          </h3>
        </div>

        {/* Choices */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {scene.choices.map((choice) => (
            <ChoiceCard
              key={choice.id}
              choice={choice}
              isSelected={selectedChoiceId === choice.id}
              isDisabled={selectedChoiceId !== null}
              onSelect={() => handleSelect(choice)}
            />
          ))}
        </div>

        {/* Feedback Banner after choice */}
        <AnimatePresence>
          {showFeedback && selectedChoice && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-mahalla-gold/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4"
            >
              <div className="flex items-start gap-2.5">
                <span className="p-1.5 sm:p-2 bg-emerald-100 text-emerald-700 rounded-xl text-base sm:text-lg shrink-0">
                  ✨
                </span>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-mahalla-green-deep font-heading">
                    Mahalla sizning qaroringizni eslab qoldi:
                  </h4>
                  <p className="text-xs sm:text-sm text-mahalla-navy/90 font-body mt-0.5">
                    {selectedChoice.feedback}
                  </p>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-2xl bg-gradient-to-r from-mahalla-green to-mahalla-green-deep text-white font-bold font-heading text-xs sm:text-sm shadow-warm-md hover:shadow-glow-green transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
              >
                <span>{isScene9 ? "Natijalarni ko'rish" : "Keyingi vaziyat"}</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Lore Dialogue Modal if triggered */}
      {scene.dialogue_lore && (
        <StoryDialogueModal
          isOpen={showLoreModal}
          onClose={() => setShowLoreModal(false)}
          title="Salim boboning ibratli xotirasi"
          story={scene.dialogue_lore}
          author={scene.lore_author || "Salim bobo"}
        />
      )}
    </div>
  );
};
