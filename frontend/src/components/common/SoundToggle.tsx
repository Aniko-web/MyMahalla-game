import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../../utils/audio';

export const SoundToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(sound.getStatus());

  const handleToggle = () => {
    const nextState = sound.toggle();
    setEnabled(nextState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2.5 rounded-full transition-all duration-300 flex items-center gap-2 border ${
        enabled
          ? 'bg-mahalla-green text-white border-mahalla-green shadow-warm-sm hover:bg-mahalla-green-light'
          : 'bg-white/80 text-mahalla-navy/70 border-mahalla-gold/40 hover:bg-cream-200'
      }`}
      title={enabled ? "Ovozni o'chirish" : "Tabiat va mahalla mayin sadolarini yoqish"}
      aria-label="Sound Toggle"
    >
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
      <span className="text-xs font-medium hidden sm:inline">
        {enabled ? "Ovoz: Yoqiq" : "Ovoz: O'chiq"}
      </span>
    </button>
  );
};
