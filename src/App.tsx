/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { DashboardHub } from './components/DashboardHub';
import { DigitalGridBackground } from './components/DigitalGridBackground';
import { HowToPlayModal } from './components/HowToPlayModal';
import { MissionCompletionPayload, MissionRunner } from './components/MissionRunner';
import { TitleScreen } from './components/TitleScreen';
import { TopHud } from './components/TopHud';
import {
  BadgeId,
  Difficulty,
  GameView,
  Language,
  MissionId,
  PlayerProgress,
} from './types/game';
import { playClick, setSoundMuted } from './utils/sound';
import {
  evaluateNewBadges,
  isMissionUnlocked,
  loadProgress,
  MISSION_ORDER,
  resetProgressStorage,
  saveProgress,
} from './utils/storage';

export default function App() {
  const [progress, setProgress] = useState<PlayerProgress>(() => loadProgress());
  const [view, setView] = useState<GameView>('TITLE');
  const [activeMissionId, setActiveMissionId] = useState<MissionId>('url-detective');
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    setSoundMuted(progress.muted);
    saveProgress(progress);
  }, [progress]);

  const handleToggleLanguage = (lang: Language) => {
    playClick();
    setProgress((prev) => ({ ...prev, language: lang }));
  };

  const handleChangeDifficulty = (diff: Difficulty) => {
    playClick();
    setProgress((prev) => ({ ...prev, difficulty: diff }));
  };

  const handleToggleMute = () => {
    setProgress((prev) => {
      const nextMuted = !prev.muted;
      setSoundMuted(nextMuted);
      if (!nextMuted) playClick();
      return { ...prev, muted: nextMuted };
    });
  };

  const handleStartFromTitle = () => {
    playClick();
    // Pick first incomplete unlocked mission, or open Hub if all completed
    const nextIncomplete = MISSION_ORDER.find(
      (id) => isMissionUnlocked(progress, id) && !progress.missions[id]?.completed
    );
    if (nextIncomplete) {
      setActiveMissionId(nextIncomplete);
      setView('MISSION');
    } else {
      setView('HUB');
    }
  };

  const handleSelectMission = (missionId: MissionId) => {
    if (!isMissionUnlocked(progress, missionId)) return;
    playClick();
    setActiveMissionId(missionId);
    setView('MISSION');
  };

  const handleCompleteMission = (payload: MissionCompletionPayload): BadgeId[] => {
    const prevBadges = progress.unlockedBadges;

    const updatedTopicStats = { ...progress.topicStats };
    for (const [topic, stat] of Object.entries(payload.topicOutcomes)) {
      if (!stat) continue;
      const key = topic as keyof typeof updatedTopicStats;
      const existing = updatedTopicStats[key] || { correct: 0, total: 0 };
      updatedTopicStats[key] = {
        correct: existing.correct + stat.correct,
        total: existing.total + stat.total,
      };
    }

    const prevRecord = progress.missions[payload.missionId];
    const nextProgress: PlayerProgress = {
      ...progress,
      xp: progress.xp + payload.earnedXp,
      totalCorrect: progress.totalCorrect + payload.correctCount,
      totalAnswered: progress.totalAnswered + payload.totalCount,
      bestStreak: Math.max(progress.bestStreak, payload.bestRunStreak),
      missions: {
        ...progress.missions,
        [payload.missionId]: {
          completed: true,
          bestScore: Math.max(prevRecord?.bestScore ?? 0, payload.earnedXp),
          bestAccuracy: Math.max(prevRecord?.bestAccuracy ?? 0, payload.accuracy),
          attempts: (prevRecord?.attempts ?? 0) + 1,
          lastCompletedAt: new Date().toISOString(),
        },
      },
      topicStats: updatedTopicStats,
    };

    const allBadges = evaluateNewBadges(nextProgress, payload.bestRunStreak);
    nextProgress.unlockedBadges = allBadges;
    setProgress(nextProgress);

    return allBadges.filter((b) => !prevBadges.includes(b));
  };

  const handleResetProgress = () => {
    playClick();
    const fresh = resetProgressStorage();
    setProgress((prev) => ({
      ...fresh,
      language: prev.language,
      muted: prev.muted,
    }));
    setActiveMissionId('url-detective');
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      <DigitalGridBackground />

      <TopHud
        view={view}
        xp={progress.xp}
        language={progress.language}
        difficulty={progress.difficulty}
        muted={progress.muted}
        onNavigateTitle={() => {
          playClick();
          setView('TITLE');
        }}
        onNavigateHub={() => {
          playClick();
          setView('HUB');
        }}
        onToggleLanguage={handleToggleLanguage}
        onChangeDifficulty={handleChangeDifficulty}
        onToggleMute={handleToggleMute}
        onOpenHelp={() => {
          playClick();
          setHelpOpen(true);
        }}
      />

      <div className="flex-1">
        {view === 'TITLE' && (
          <TitleScreen
            progress={progress}
            onStartMission={handleStartFromTitle}
            onOpenHub={() => {
              playClick();
              setView('HUB');
            }}
            onOpenHelp={() => {
              playClick();
              setHelpOpen(true);
            }}
            onChangeDifficulty={handleChangeDifficulty}
          />
        )}

        {view === 'HUB' && (
          <DashboardHub
            progress={progress}
            onSelectMission={handleSelectMission}
            onChangeDifficulty={handleChangeDifficulty}
            onResetProgress={handleResetProgress}
          />
        )}

        {view === 'MISSION' && (
          <MissionRunner
            key={activeMissionId}
            missionId={activeMissionId}
            language={progress.language}
            difficulty={progress.difficulty}
            onCompleteMission={handleCompleteMission}
            onBackToHub={() => {
              playClick();
              setView('HUB');
            }}
            onStartNextMission={(nextId) => {
              playClick();
              setActiveMissionId(nextId);
              setView('MISSION');
            }}
          />
        )}
      </div>

      <HowToPlayModal
        open={helpOpen}
        language={progress.language}
        onClose={() => {
          playClick();
          setHelpOpen(false);
        }}
      />
    </div>
  );
}
