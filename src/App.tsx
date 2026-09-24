import React, { useState, useEffect } from 'react';
import { ScreenType, Stats, StatEffects, Choice, CommunityProfile, CommunityHistoryItem } from './types/game';
import { StartScreen } from './components/screens/StartScreen';
import { NameScreen } from './components/screens/NameScreen';
import { GameScreen } from './components/screens/GameScreen';
import { ResultScreen } from './components/screens/ResultScreen';
import { FinalCinematic } from './components/screens/FinalCinematic';
import { api } from './api/client';
import { PROFILES } from './data/profiles';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenType>('start');
  const [playerName, setPlayerName] = useState<string>('Hamshahri');
  const [sessionId, setSessionId] = useState<string>('');
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [stats, setStats] = useState<Stats>({
    mehr: 50,
    hamjihatlik: 50,
    hurmat: 50,
    obodlik: 50,
    ishonch: 50,
  });
  const [recentEffects, setRecentEffects] = useState<StatEffects | null>(null);
  const [profile, setProfile] = useState<CommunityProfile>(PROFILES.mehrli);
  const [history, setHistory] = useState<CommunityHistoryItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Check backend health on mount
  useEffect(() => {
    api.checkHealth();
  }, []);

  // Screen 1 -> Screen 2
  const handleStart = () => {
    setScreen('name');
  };

  // Screen 2 -> Screen 3 (Game)
  const handleNameSubmit = async (name: string) => {
    setPlayerName(name);
    const sessionData = await api.startSession(name);
    setSessionId(sessionData.sessionId);
    setStats(sessionData.stats);
    setCurrentStage(1);
    setScreen('game');
  };

  // Scene Choice Submit
  const handleChoiceSubmit = async (choice: Choice) => {
    setIsSubmitting(true);
    setRecentEffects(choice.effects);

    const res = await api.submitChoice(sessionId, `scene_${currentStage}`, choice.id, stats);
    setStats(res.stats);
    setIsSubmitting(false);

    // Clear effects after 2 seconds
    setTimeout(() => {
      setRecentEffects(null);
    }, 2000);
  };

  // Advance to next stage
  const handleAdvanceStage = () => {
    if (currentStage < 9) {
      setCurrentStage(prev => prev + 1);
    } else {
      handleFinishGame();
    }
  };

  // Finish Game & Calculate Profile
  const handleFinishGame = async () => {
    setIsSubmitting(true);
    const result = await api.finishSession(sessionId, stats, playerName);
    setProfile(result.profile);

    const hist = await api.getHistory();
    setHistory(hist);

    setIsSubmitting(false);
    setScreen('result');
  };

  // Replay
  const handlePlayAgain = () => {
    setStats({
      mehr: 50,
      hamjihatlik: 50,
      hurmat: 50,
      obodlik: 50,
      ishonch: 50,
    });
    setCurrentStage(1);
    setRecentEffects(null);
    setScreen('name');
  };

  // Proceed to Cinematic Final Reveal
  const handleProceedToCinematic = () => {
    setScreen('cinematic');
  };

  // Back to Mahalla from Cinematic
  const handleBackToMahalla = () => {
    setScreen('start');
  };

  return (
    <div className="w-full min-h-screen text-mahalla-navy font-body">
      {screen === 'start' && <StartScreen onStart={handleStart} />}

      {screen === 'name' && <NameScreen onSubmitName={handleNameSubmit} />}

      {screen === 'game' && (
        <GameScreen
          playerName={playerName}
          stats={stats}
          currentStage={currentStage}
          onChoiceSubmit={handleChoiceSubmit}
          onFinishGame={handleFinishGame}
          onAdvanceStage={handleAdvanceStage}
          isSubmitting={isSubmitting}
          recentEffects={recentEffects}
        />
      )}

      {screen === 'result' && (
        <ResultScreen
          playerName={playerName}
          stats={stats}
          profile={profile}
          history={history}
          onPlayAgain={handlePlayAgain}
          onProceedToCinematic={handleProceedToCinematic}
        />
      )}

      {screen === 'cinematic' && (
        <FinalCinematic
          onRestart={handlePlayAgain}
          onBackToMahalla={handleBackToMahalla}
        />
      )}
    </div>
  );
};

export default App;
