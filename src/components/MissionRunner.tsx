import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Flame,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import {
  HEADER_MATCH_CHALLENGES,
  MISSIONS_META,
  PHISHING_CHALLENGES,
  pickRandomBossQuestions,
  SQL_CHALLENGES,
  SSL_CHALLENGES,
  URL_CHALLENGES,
  XSS_CHALLENGES,
} from '../data/missions';
import { UI_COPY } from '../data/translations';
import {
  BadgeId,
  BossQuestion,
  BossTopic,
  Difficulty,
  Language,
  MissionId,
} from '../types/game';
import { playClick, playCorrect, playHint, playVictory, playWrong } from '../utils/sound';
import {
  BADGE_DEFINITIONS,
  getDifficultyConfig,
  getMissionTopic,
  MISSION_ORDER,
} from '../utils/storage';
import { CyberBossMission } from './missions/CyberBossMission';
import { PhishingHunterMission } from './missions/PhishingHunterMission';
import { SecurityHeadersMission } from './missions/SecurityHeadersMission';
import { SqlInjectionMission } from './missions/SqlInjectionMission';
import { SslHttpsMission } from './missions/SslHttpsMission';
import { UrlDetectiveMission } from './missions/UrlDetectiveMission';
import { XssAwarenessMission } from './missions/XssAwarenessMission';

export interface MissionCompletionPayload {
  missionId: MissionId;
  earnedXp: number;
  correctCount: number;
  totalCount: number;
  accuracy: number;
  bestRunStreak: number;
  topicOutcomes: Partial<Record<BossTopic, { correct: number; total: number }>>;
}

interface MissionRunnerProps {
  missionId: MissionId;
  language: Language;
  difficulty: Difficulty;
  onCompleteMission: (payload: MissionCompletionPayload) => BadgeId[];
  onBackToHub: () => void;
  onStartNextMission: (nextId: MissionId) => void;
}

export function MissionRunner({
  missionId,
  language,
  difficulty,
  onCompleteMission,
  onBackToHub,
  onStartNextMission,
}: MissionRunnerProps) {
  const missionMeta = MISSIONS_META.find((m) => m.id === missionId)!;
  const diffCfg = getDifficultyConfig(difficulty);

  // Randomized 10-question set for Cyber Boss (regenerated on mission restart)
  const [bossSeed, setBossSeed] = useState(0);
  const bossQuestions: BossQuestion[] = useMemo(() => {
    void bossSeed;
    return missionId === 'cyber-boss' ? pickRandomBossQuestions(10) : [];
  }, [missionId, bossSeed]);

  const totalCount = useMemo(() => {
    switch (missionId) {
      case 'url-detective':
        return URL_CHALLENGES.length;
      case 'phishing-hunter':
        return PHISHING_CHALLENGES.length;
      case 'sql-injection':
        return SQL_CHALLENGES.length;
      case 'xss-awareness':
        return XSS_CHALLENGES.length;
      case 'security-headers':
        return HEADER_MATCH_CHALLENGES.length;
      case 'ssl-https':
        return SSL_CHALLENGES.length;
      case 'cyber-boss':
        return bossQuestions.length;
    }
  }, [missionId, bossQuestions.length]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedChoiceBool, setSelectedChoiceBool] = useState<boolean | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hintUsed, setHintUsed] = useState(false);

  const [runXp, setRunXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestRunStreak, setBestRunStreak] = useState(0);
  const [topicOutcomes, setTopicOutcomes] = useState<
    Partial<Record<BossTopic, { correct: number; total: number }>>
  >({});
  const [finished, setFinished] = useState(false);
  const [newlyEarnedBadges, setNewlyEarnedBadges] = useState<BadgeId[]>([]);

  const handleRestart = () => {
    playClick();
    setCurrentIndex(0);
    setAnswered(false);
    setIsCorrect(null);
    setSelectedChoiceBool(null);
    setSelectedOptionId(null);
    setHintUsed(false);
    setRunXp(0);
    setCorrectCount(0);
    setStreak(0);
    setBestRunStreak(0);
    setTopicOutcomes({});
    setFinished(false);
    setNewlyEarnedBadges([]);
    if (missionId === 'cyber-boss') {
      setBossSeed((s) => s + 1);
    }
  };

  const recordOutcome = (correct: boolean, topic?: BossTopic | null) => {
    setAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      playCorrect();
      const nextStreak = streak + 1;
      const streakBonus = nextStreak > 1 ? (nextStreak - 1) * diffCfg.streakBonus : 0;
      const hintDeduction = hintUsed ? diffCfg.hintPenalty : 0;
      const gained = Math.max(20, diffCfg.baseXp + streakBonus - hintDeduction);

      setRunXp((x) => x + gained);
      setCorrectCount((c) => c + 1);
      setStreak(nextStreak);
      setBestRunStreak((b) => Math.max(b, nextStreak));
    } else {
      playWrong();
      setStreak(0);
      if (hintUsed) {
        setRunXp((x) => Math.max(0, x - Math.round(diffCfg.hintPenalty / 2)));
      }
    }

    if (topic) {
      setTopicOutcomes((prev) => {
        const cur = prev[topic] || { correct: 0, total: 0 };
        return {
          ...prev,
          [topic]: {
            correct: cur.correct + (correct ? 1 : 0),
            total: cur.total + 1,
          },
        };
      });
    }
  };

  const handleUseHint = () => {
    if (hintUsed || answered) return;
    playHint();
    setHintUsed(true);
  };

  const handleNext = () => {
    playClick();
    if (currentIndex + 1 >= totalCount) {
      const accuracy = Math.round((correctCount / totalCount) * 100);
      const earnedBadges = onCompleteMission({
        missionId,
        earnedXp: runXp,
        correctCount,
        totalCount,
        accuracy,
        bestRunStreak,
        topicOutcomes,
      });
      setNewlyEarnedBadges(earnedBadges);
      setFinished(true);
      playVictory();
      return;
    }

    setCurrentIndex((i) => i + 1);
    setAnswered(false);
    setIsCorrect(null);
    setSelectedChoiceBool(null);
    setSelectedOptionId(null);
    setHintUsed(false);
  };

  const currentIdxOrder = MISSION_ORDER.indexOf(missionId);
  const nextMissionId =
    currentIdxOrder >= 0 && currentIdxOrder + 1 < MISSION_ORDER.length
      ? MISSION_ORDER[currentIdxOrder + 1]
      : null;

  if (finished) {
    const accuracy = Math.round((correctCount / totalCount) * 100);
    const topicEntries = Object.entries(topicOutcomes) as [
      BossTopic,
      { correct: number; total: number }
    ][];
    const strengths = topicEntries.filter(([, s]) => s.correct / s.total >= 0.7);
    const toImprove = topicEntries.filter(([, s]) => s.correct / s.total < 0.7);

    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <motion.section
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="cyber-card rounded-3xl p-6 sm:p-10 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-violet-500/25 border border-cyan-400/40 text-cyan-300">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-cyan-300">
                  {missionMeta.title[language]}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {UI_COPY.missionComplete[language]}
                </h2>
              </div>
            </div>

            <div className="text-right font-mono tabular-nums">
              <p className="text-xs text-slate-400">{UI_COPY.scoreEarned[language]}</p>
              <p className="text-3xl font-bold text-cyan-300">+{runXp} XP</p>
            </div>
          </div>

          {/* Summary KPI Grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs text-slate-400">{UI_COPY.missionAccuracy[language]}</p>
              <p className="mt-1 font-mono text-2xl font-bold text-white tabular-nums">
                {accuracy}%
              </p>
              <p className="mt-0.5 text-xs text-slate-400 font-mono tabular-nums">
                {correctCount} / {totalCount} {language === 'en' ? 'correct' : 'સાચા'}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs text-slate-400">{UI_COPY.bestStreak[language]}</p>
              <p className="mt-1 font-mono text-2xl font-bold text-amber-300 tabular-nums">
                {bestRunStreak}x
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                {UI_COPY.difficultyLabels[difficulty][language]} ({diffCfg.multiplierLabel})
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Next Unlock Status' : 'આગળનું સ્તર'}
              </p>
              <p className="mt-1 font-display text-base font-bold text-emerald-300">
                {nextMissionId
                  ? language === 'en'
                    ? 'Next Level Unlocked'
                    : 'આગળનું લેવલ અનલૉક થયું'
                  : language === 'en'
                  ? 'All 7 Levels Completed'
                  : 'તમામ ૭ લેવલ પૂર્ણ થયા'}
              </p>
            </div>
          </div>

          {/* Newly Unlocked Badges */}
          {newlyEarnedBadges.length > 0 && (
            <div className="rounded-2xl border border-violet-500/35 bg-violet-500/10 p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-violet-200">
                <Sparkles className="h-4 w-4 text-violet-300" />
                <span>
                  {language === 'en'
                    ? 'New Achievement Badges Unlocked!'
                    : 'નવા સિદ્ધિ બેજ પ્રાપ્ત થયા!'}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {newlyEarnedBadges.map((bid) => {
                  const def = BADGE_DEFINITIONS.find((b) => b.id === bid);
                  if (!def) return null;
                  return (
                    <div
                      key={bid}
                      className="flex items-center gap-3 rounded-xl border border-violet-400/30 bg-slate-950/60 p-3"
                    >
                      <Award className="h-5 w-5 text-cyan-300 shrink-0" />
                      <div>
                        <p className="font-display text-sm font-bold text-white">
                          {def.title[language]}
                        </p>
                        <p className="text-xs text-slate-300">{def.description[language]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cyber Boss Topic Strengths & Topics to Improve */}
          {missionId === 'cyber-boss' && topicEntries.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <TrendingUp className="h-4 w-4" />
                  <span>{language === 'en' ? 'Your Strengths' : 'તમારી મજબૂત બાજુ'}</span>
                </div>
                {strengths.length > 0 ? (
                  <ul className="space-y-1.5 text-sm text-slate-200 font-mono">
                    {strengths.map(([topic, stat]) => (
                      <li key={topic} className="flex justify-between">
                        <span>{topic}</span>
                        <span className="text-emerald-300 tabular-nums">
                          {stat.correct}/{stat.total}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-300">
                    {language === 'en'
                      ? 'Keep practicing individual levels to build core strengths.'
                      : 'મજબૂત પકડ બનાવવા દરેક લેવલ ફરીથી પ્રેક્ટિસ કરો.'}
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                  <Award className="h-4 w-4" />
                  <span>
                    {language === 'en' ? 'Topics to Improve' : 'સુધારવા જેવા વિષયો'}
                  </span>
                </div>
                {toImprove.length > 0 ? (
                  <ul className="space-y-1.5 text-sm text-slate-200 font-mono">
                    {toImprove.map(([topic, stat]) => (
                      <li key={topic} className="flex justify-between">
                        <span>{topic}</span>
                        <span className="text-amber-300 tabular-nums">
                          {stat.correct}/{stat.total}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-200">
                    {language === 'en'
                      ? 'Outstanding mastery across every tested web security topic!'
                      : 'તમામ પરીક્ષિત વેબ સુરક્ષા વિષયોમાં ઉત્તમ પ્રદર્શન!'}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onBackToHub}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 hover:border-cyan-400/50 hover:text-white whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{UI_COPY.backToHub[language]}</span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 hover:border-cyan-400/50 hover:text-white whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-4 w-4" />
                <span>{UI_COPY.restartMission[language]}</span>
              </button>
            </div>

            {nextMissionId && (
              <button
                type="button"
                onClick={() => onStartNextMission(nextMissionId)}
                className="cyber-glow-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0"
              >
                <span>{UI_COPY.nextMissionBtn[language]}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.section>
      </main>
    );
  }

  const progressPercent = Math.round(((currentIndex + (answered ? 1 : 0)) / totalCount) * 100);
  const isLast = currentIndex + 1 >= totalCount;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 space-y-5">
      {/* Mission Header & Progress Bar */}
      <div className="cyber-card rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHub}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-cyan-400/50 hover:text-white whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{UI_COPY.backToHub[language]}</span>
            </button>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-white">
                {missionMeta.title[language]}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono tabular-nums">
            <span className="text-slate-300">
              {currentIndex + 1} / {totalCount}
            </span>
            <span className="text-slate-600" aria-hidden="true">
              ·
            </span>
            <span className="inline-flex items-center gap-1 text-amber-300">
              <Flame className="h-3.5 w-3.5" />
              {streak}x
            </span>
            <span className="text-slate-600" aria-hidden="true">
              ·
            </span>
            <span className="text-cyan-300 font-semibold">+{runXp} XP</span>
            <button
              type="button"
              onClick={handleRestart}
              title={UI_COPY.restartMission[language]}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-400/50 hover:text-white whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">{UI_COPY.restartMission[language]}</span>
            </button>
          </div>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 transition-all duration-200"
            style={{ width: `${Math.max(4, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Active Challenge Stage */}
      <section className="cyber-card rounded-3xl p-5 sm:p-7">
        {missionId === 'url-detective' && (
          <UrlDetectiveMission
            key={URL_CHALLENGES[currentIndex].id}
            challenge={URL_CHALLENGES[currentIndex]}
            language={language}
            answered={answered}
            isCorrect={isCorrect}
            selectedChoice={selectedChoiceBool}
            hintUsed={hintUsed}
            hintPenalty={diffCfg.hintPenalty}
            isLastQuestion={isLast}
            onAnswer={(choseSuspicious) => {
              setSelectedChoiceBool(choseSuspicious);
              recordOutcome(
                choseSuspicious === URL_CHALLENGES[currentIndex].isSuspicious,
                getMissionTopic(missionId)
              );
            }}
            onUseHint={handleUseHint}
            onNext={handleNext}
          />
        )}

        {missionId === 'phishing-hunter' && (
          <PhishingHunterMission
            key={PHISHING_CHALLENGES[currentIndex].id}
            challenge={PHISHING_CHALLENGES[currentIndex]}
            language={language}
            answered={answered}
            isCorrect={isCorrect}
            selectedOptionId={selectedOptionId}
            hintUsed={hintUsed}
            hintPenalty={diffCfg.hintPenalty}
            isLastQuestion={isLast}
            onAnswer={(optionId) => {
              setSelectedOptionId(optionId);
              recordOutcome(
                optionId === PHISHING_CHALLENGES[currentIndex].correctOptionId,
                getMissionTopic(missionId)
              );
            }}
            onUseHint={handleUseHint}
            onNext={handleNext}
          />
        )}

        {missionId === 'sql-injection' && (
          <SqlInjectionMission
            key={SQL_CHALLENGES[currentIndex].id}
            challenge={SQL_CHALLENGES[currentIndex]}
            language={language}
            answered={answered}
            isCorrect={isCorrect}
            selectedOptionId={selectedOptionId}
            hintUsed={hintUsed}
            hintPenalty={diffCfg.hintPenalty}
            isLastQuestion={isLast}
            onAnswer={(optionId) => {
              setSelectedOptionId(optionId);
              recordOutcome(
                optionId === SQL_CHALLENGES[currentIndex].correctOptionId,
                getMissionTopic(missionId)
              );
            }}
            onUseHint={handleUseHint}
            onNext={handleNext}
          />
        )}

        {missionId === 'xss-awareness' && (
          <XssAwarenessMission
            key={XSS_CHALLENGES[currentIndex].id}
            challenge={XSS_CHALLENGES[currentIndex]}
            language={language}
            answered={answered}
            isCorrect={isCorrect}
            selectedOptionId={selectedOptionId}
            hintUsed={hintUsed}
            hintPenalty={diffCfg.hintPenalty}
            isLastQuestion={isLast}
            onAnswer={(optionId) => {
              setSelectedOptionId(optionId);
              recordOutcome(
                optionId === XSS_CHALLENGES[currentIndex].correctOptionId,
                getMissionTopic(missionId)
              );
            }}
            onUseHint={handleUseHint}
            onNext={handleNext}
          />
        )}

        {missionId === 'security-headers' && (
          <SecurityHeadersMission
            key={HEADER_MATCH_CHALLENGES[currentIndex].id}
            challenge={HEADER_MATCH_CHALLENGES[currentIndex]}
            language={language}
            answered={answered}
            isCorrect={isCorrect}
            selectedHeaderId={selectedOptionId}
            hintUsed={hintUsed}
            hintPenalty={diffCfg.hintPenalty}
            isLastQuestion={isLast}
            onAnswer={(headerId) => {
              setSelectedOptionId(headerId);
              recordOutcome(
                headerId === HEADER_MATCH_CHALLENGES[currentIndex].correctHeaderId,
                getMissionTopic(missionId)
              );
            }}
            onUseHint={handleUseHint}
            onNext={handleNext}
          />
        )}

        {missionId === 'ssl-https' && (
          <SslHttpsMission
            key={SSL_CHALLENGES[currentIndex].id}
            challenge={SSL_CHALLENGES[currentIndex]}
            language={language}
            answered={answered}
            isCorrect={isCorrect}
            selectedOptionId={selectedOptionId}
            hintUsed={hintUsed}
            hintPenalty={diffCfg.hintPenalty}
            isLastQuestion={isLast}
            onAnswer={(optionId) => {
              setSelectedOptionId(optionId);
              recordOutcome(
                optionId === SSL_CHALLENGES[currentIndex].correctOptionId,
                getMissionTopic(missionId)
              );
            }}
            onUseHint={handleUseHint}
            onNext={handleNext}
          />
        )}

        {missionId === 'cyber-boss' && bossQuestions[currentIndex] && (
          <CyberBossMission
            key={bossQuestions[currentIndex].id}
            questionItem={bossQuestions[currentIndex]}
            language={language}
            answered={answered}
            isCorrect={isCorrect}
            selectedOptionId={selectedOptionId}
            hintUsed={hintUsed}
            hintPenalty={diffCfg.hintPenalty}
            isLastQuestion={isLast}
            onAnswer={(optionId) => {
              setSelectedOptionId(optionId);
              recordOutcome(
                optionId === bossQuestions[currentIndex].correctOptionId,
                bossQuestions[currentIndex].topic
              );
            }}
            onUseHint={handleUseHint}
            onNext={handleNext}
          />
        )}
      </section>
    </main>
  );
}
