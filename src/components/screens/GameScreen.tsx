import React, { useState } from 'react';
import { Stats, StatEffects, Scene, Choice } from '../../types/game';
import { SCENES } from '../../data/scenes';
import { GameHUD } from '../hud/GameHUD';
import { MahallaMap } from '../map/MahallaMap';
import { SceneView } from '../scene/SceneView';
import { StatDeltaFloater } from '../hud/StatDeltaFloater';
import { MahallaTVTicker } from '../common/MahallaTVTicker';

interface GameScreenProps {
  playerName: string;
  stats: Stats;
  currentStage: number;
  onChoiceSubmit: (choice: Choice) => void;
  onFinishGame: () => void;
  onAdvanceStage: () => void;
  isSubmitting: boolean;
  recentEffects: StatEffects | null;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  playerName,
  stats,
  currentStage,
  onChoiceSubmit,
  onFinishGame,
  onAdvanceStage,
  isSubmitting,
  recentEffects,
}) => {
  const currentScene: Scene = SCENES.find(s => s.stage_number === currentStage) || SCENES[0];

  const handleNext = () => {
    if (currentStage >= 9) {
      onFinishGame();
    } else {
      onAdvanceStage();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F7EFE2] via-[#F4ECE0] to-[#EBE0CD] flex flex-col justify-between relative bg-girih-subtle">
      {/* Top HUD */}
      <GameHUD
        stats={stats}
        playerName={playerName}
        currentStage={currentStage}
        totalStages={9}
        timeOfDay={currentScene.time_of_day}
      />

      {/* Floating Delta Floater */}
      <StatDeltaFloater effects={recentEffects} />

      {/* Main Playing Field */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 flex-1 flex flex-col gap-6">
        {/* Top: 2D Mahalla Interactive Map */}
        <div className="w-full">
          <MahallaMap
            currentLocationId={currentScene.location_id}
            currentStage={currentStage}
            isCompact={false}
          />
        </div>

        {/* Bottom: Current Scene & Choices */}
        <div className="w-full max-w-4xl mx-auto">
          <SceneView
            scene={currentScene}
            currentStats={stats}
            onChoiceMade={onChoiceSubmit}
            onNextScene={handleNext}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>

      {/* Live Mahalla TV popup */}
      <MahallaTVTicker />

      {/* Footer */}
      <footer className="w-full py-3 text-center text-xs text-mahalla-navy/50 font-body">
        “Mahalla — insonlar bir-biriga befarq bo‘lmagan joy.”
      </footer>
    </div>
  );
};
