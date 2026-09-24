import React from 'react';
import { Stats } from '../../types/game';
import { StatBar } from './StatBar';
import { SoundToggle } from '../common/SoundToggle';
import { User, Compass, Clock } from 'lucide-react';

interface GameHUDProps {
  stats: Stats;
  playerName: string;
  currentStage: number;
  totalStages: number;
  timeOfDay: string;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  stats,
  playerName,
  currentStage,
  totalStages,
  timeOfDay,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-cream-50/95 backdrop-blur-md border-b border-mahalla-gold/30 shadow-warm-sm px-2.5 sm:px-6 py-2 sm:py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Top Info Header */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Logo & Player */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-mahalla-green to-mahalla-green-deep flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-warm-sm shrink-0">
              🏘️
            </div>
            <div className="min-w-0">
              <h1 className="text-[11px] sm:text-xs md:text-sm font-extrabold tracking-wide uppercase text-mahalla-navy font-heading truncate">
                Mahalla: Bir Kun
              </h1>
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-mahalla-navy/70 truncate">
                <User size={11} className="text-mahalla-green shrink-0" />
                <span className="font-semibold text-mahalla-navy truncate">{playerName}</span>
              </div>
            </div>
          </div>

          {/* Badges & Audio */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Stage Badge */}
            <div className="flex items-center gap-1 bg-cream-200/90 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-mahalla-gold/30 text-[10px] sm:text-xs font-bold text-mahalla-navy">
              <Compass size={12} className="text-mahalla-terracotta shrink-0" />
              <span>{currentStage}/{totalStages}</span>
            </div>

            {/* Time of Day (Visible on small+ screens) */}
            <div className="hidden xs:flex items-center gap-1 bg-cream-200/90 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-mahalla-gold/30 text-[10px] sm:text-xs font-semibold text-mahalla-navy">
              <Clock size={12} className="text-amber-600 shrink-0" />
              <span>{timeOfDay}</span>
            </div>

            {/* Audio Toggle */}
            <SoundToggle />
          </div>
        </div>

        {/* 5 Core Statistics Grid (Fits seamlessly on all mobile screens without horizontal scroll) */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full">
          <StatBar
            label="Mehr"
            value={stats.mehr}
            icon="❤️"
            colorClass="text-rose-500"
            barColor="bg-gradient-to-r from-rose-400 to-rose-600"
          />
          <StatBar
            label="Birdamlik"
            value={stats.hamjihatlik}
            icon="🤝"
            colorClass="text-emerald-600"
            barColor="bg-gradient-to-r from-emerald-400 to-emerald-600"
          />
          <StatBar
            label="Hurmat"
            value={stats.hurmat}
            icon="🧓"
            colorClass="text-amber-600"
            barColor="bg-gradient-to-r from-amber-400 to-amber-600"
          />
          <StatBar
            label="Obodlik"
            value={stats.obodlik}
            icon="🌱"
            colorClass="text-green-600"
            barColor="bg-gradient-to-r from-green-400 to-lime-600"
          />
          <StatBar
            label="Ishonch"
            value={stats.ishonch}
            icon="🛡️"
            colorClass="text-blue-600"
            barColor="bg-gradient-to-r from-blue-400 to-indigo-600"
          />
        </div>
      </div>
    </header>
  );
};
