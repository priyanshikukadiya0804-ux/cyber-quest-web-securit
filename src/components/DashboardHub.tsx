import {
  Award,
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  Shield,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { MISSIONS_META } from '../data/missions';
import { UI_COPY } from '../data/translations';
import { BossTopic, Difficulty, Language, MissionId, PlayerProgress } from '../types/game';
import { BADGE_DEFINITIONS, getPlayerLevel, isMissionUnlocked } from '../utils/storage';

interface DashboardHubProps {
  progress: PlayerProgress;
  onSelectMission: (missionId: MissionId) => void;
  onChangeDifficulty: (diff: Difficulty) => void;
  onResetProgress: () => void;
}

const TOPICS: { key: BossTopic; gu: string }[] = [
  { key: 'URL Security', gu: 'URL સુરક્ષા' },
  { key: 'Phishing Defense', gu: 'Phishing રક્ષણ' },
  { key: 'SQL Injection', gu: 'SQL Injection' },
  { key: 'XSS Prevention', gu: 'XSS નિવારણ' },
  { key: 'Security Headers', gu: 'Security Headers' },
  { key: 'SSL & HTTPS', gu: 'SSL અને HTTPS' },
];

export function DashboardHub({
  progress,
  onSelectMission,
  onChangeDifficulty,
  onResetProgress,
}: DashboardHubProps) {
  const [confirmingReset, setConfirmingReset] = useState(false);
  const lang: Language = progress.language;
  const levelInfo = getPlayerLevel(progress.xp);
  const completedCount = MISSIONS_META.filter((m) => progress.missions[m.id]?.completed).length;
  const accuracy =
    progress.totalAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
      : 0;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:py-8">
      {/* Top KPI Dashboard Strip */}
      <section aria-label="Player Statistics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="cyber-card rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">{UI_COPY.totalXp[lang]}</span>
            <Zap className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-white tabular-nums">
            {progress.xp.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-400 font-mono tabular-nums">
            {UI_COPY.bestStreak[lang]}: {progress.bestStreak}x
          </p>
        </div>

        <div className="cyber-card rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">{UI_COPY.completedMissions[lang]}</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-white tabular-nums">
            {completedCount} <span className="text-lg text-slate-500">/ 7</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {Math.round((completedCount / 7) * 100)}% {lang === 'en' ? 'Campaign Complete' : 'અભિયાન પૂર્ણ'}
          </p>
        </div>

        <div className="cyber-card rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">{UI_COPY.playerLevel[lang]}</span>
            <Shield className="h-4 w-4 text-sky-400" />
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-cyan-300 tabular-nums">
            {levelInfo.level}
          </p>
          <p className="mt-1 text-xs text-slate-300">
            {lang === 'en' ? levelInfo.rankEn : levelInfo.rankGu}
          </p>
        </div>

        <div className="cyber-card rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">{UI_COPY.accuracy[lang]}</span>
            <Target className="h-4 w-4 text-violet-400" />
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-white tabular-nums">
            {accuracy}%
          </p>
          <p className="mt-1 text-xs text-slate-400 font-mono tabular-nums">
            {progress.totalCorrect} / {progress.totalAnswered}{' '}
            {lang === 'en' ? 'correct' : 'સાચા'}
          </p>
        </div>
      </section>

      {/* Mission Selection Grid */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              {UI_COPY.missionSelect[lang]}
            </h2>
            <p className="text-sm text-slate-400">
              {lang === 'en'
                ? 'Complete each mission to unlock the next security clearance tier.'
                : 'આગળનું લેવલ અનલૉક કરવા માટે દરેક મિશન પૂર્ણ કરો.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{UI_COPY.difficulty[lang]}:</span>
            <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900/90 p-0.5">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => {
                const active = progress.difficulty === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => onChangeDifficulty(d)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/45'
                        : 'text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {UI_COPY.difficultyLabels[d][lang]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MISSIONS_META.map((mission) => {
            const unlocked = isMissionUnlocked(progress, mission.id);
            const record = progress.missions[mission.id];
            const isBoss = mission.id === 'cyber-boss';

            return (
              <div
                key={mission.id}
                className={`rounded-2xl p-5 flex flex-col justify-between gap-4 ${
                  unlocked ? 'cyber-card-interactive' : 'cyber-card opacity-70'
                } ${isBoss ? 'md:col-span-2 lg:col-span-3' : ''}`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span>
                      {lang === 'en' ? mission.topicLabel : mission.topicLabelGu} ·{' '}
                      <span className="font-mono tabular-nums">
                        {mission.totalQuestions} {lang === 'en' ? 'challenges' : 'પડકાર'}
                      </span>
                    </span>
                    {record?.completed ? (
                      <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {lang === 'en' ? 'Completed' : 'પૂર્ણ'}
                      </span>
                    ) : !unlocked ? (
                      <span className="inline-flex items-center gap-1 font-medium text-slate-400">
                        <Lock className="h-3.5 w-3.5" />
                        {lang === 'en' ? 'Locked' : 'લૉક'}
                      </span>
                    ) : (
                      <span className="font-medium text-cyan-300">
                        {lang === 'en' ? 'Ready' : 'તૈયાર'}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-bold text-white">
                    {mission.title[lang]}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-300">
                    {mission.subtitle[lang]}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/90 pt-3">
                  <div className="text-xs font-mono text-slate-400 tabular-nums">
                    {record && record.attempts > 0 ? (
                      <span>
                        {lang === 'en' ? 'Best:' : 'શ્રેષ્ઠ:'}{' '}
                        <strong className="text-cyan-300">{record.bestScore} XP</strong> ·{' '}
                        {record.bestAccuracy}%
                      </span>
                    ) : (
                      <span>
                        {unlocked
                          ? lang === 'en'
                            ? 'Not attempted yet'
                            : 'હજુ રમ્યું નથી'
                          : UI_COPY.lockedLabel[lang]}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => onSelectMission(mission.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                      !unlocked
                        ? 'cursor-not-allowed border border-slate-800 bg-slate-900 text-slate-500'
                        : record?.completed
                        ? 'border border-cyan-500/40 bg-cyan-500/15 text-cyan-200 hover:bg-cyan-500/25'
                        : 'cyber-glow-btn text-white'
                    }`}
                  >
                    {unlocked ? <Play className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                    <span>
                      {record?.completed ? UI_COPY.replayMission[lang] : UI_COPY.playMission[lang]}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom 2-Column Analytics: Learning Progress Chart + Achievement Badges */}
      <section className="grid gap-6 lg:grid-cols-12 items-stretch">
        {/* Learning Progress Chart */}
        <div className="cyber-card rounded-2xl p-6 lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
                <h2 className="font-display text-lg font-bold text-white">
                  {UI_COPY.learningChart[lang]}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                {lang === 'en' ? 'Domain Accuracy' : 'વિષય મુજબ ચોકસાઈ'}
              </span>
            </div>

            <div className="space-y-4">
              {TOPICS.map((topic) => {
                const stat = progress.topicStats[topic.key] || { correct: 0, total: 0 };
                const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                return (
                  <div key={topic.key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200">
                        {lang === 'en' ? topic.key : `${topic.key} · ${topic.gu}`}
                      </span>
                      <span className="font-mono text-slate-400 tabular-nums">
                        {stat.total > 0 ? `${pct}% (${stat.correct}/${stat.total})` : '0% (0/0)'}
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800/90">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-300"
                        style={{ width: `${stat.total > 0 ? Math.max(4, pct) : 0}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safe Reset Control */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
            <span className="text-xs text-slate-400">{UI_COPY.safetyNotice[lang]}</span>
            {!confirmingReset ? (
              <button
                type="button"
                onClick={() => setConfirmingReset(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-rose-500/50 hover:text-rose-300 whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{UI_COPY.resetProgress[lang]}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmingReset(false);
                  }}
                  className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 whitespace-nowrap shrink-0"
                >
                  {UI_COPY.confirmReset[lang]}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingReset(false)}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white whitespace-nowrap shrink-0"
                >
                  {UI_COPY.cancel[lang]}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="cyber-card rounded-2xl p-6 lg:col-span-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <Award className="h-5 w-5 text-violet-400" />
              <h2 className="font-display text-lg font-bold text-white">
                {UI_COPY.badges[lang]}
              </h2>
            </div>
            <span className="text-xs font-mono text-cyan-300 tabular-nums">
              {progress.unlockedBadges.length} / {BADGE_DEFINITIONS.length}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {BADGE_DEFINITIONS.map((badge) => {
              const earned = progress.unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl border p-3.5 transition-colors ${
                    earned
                      ? 'border-cyan-400/40 bg-cyan-500/10'
                      : 'border-slate-800/80 bg-slate-900/45 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Award
                      className={`h-5 w-5 ${earned ? 'text-cyan-300' : 'text-slate-600'}`}
                    />
                    <span className="font-mono text-[11px] text-slate-400">
                      {earned
                        ? lang === 'en'
                          ? 'Unlocked'
                          : 'પ્રાપ્ત'
                        : lang === 'en'
                        ? 'Locked'
                        : 'બાકી'}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-sm font-bold text-white">
                    {badge.title[lang]}
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-slate-300">
                    {badge.description[lang]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
