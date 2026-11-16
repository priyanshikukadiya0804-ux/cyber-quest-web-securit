import { ArrowRight, BookOpen, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MISSIONS_META } from '../data/missions';
import { UI_COPY } from '../data/translations';
import { Difficulty, Language, PlayerProgress } from '../types/game';
import { getPlayerLevel } from '../utils/storage';
import { CyberQuestLogo } from './CyberQuestLogo';

interface TitleScreenProps {
  progress: PlayerProgress;
  onStartMission: () => void;
  onOpenHub: () => void;
  onOpenHelp: () => void;
  onChangeDifficulty: (diff: Difficulty) => void;
}

export function TitleScreen({
  progress,
  onStartMission,
  onOpenHub,
  onOpenHelp,
  onChangeDifficulty,
}: TitleScreenProps) {
  const [imgError, setImgError] = useState(false);
  const lang: Language = progress.language;
  const levelInfo = getPlayerLevel(progress.xp);
  const completedCount = MISSIONS_META.filter((m) => progress.missions[m.id]?.completed).length;
  const accuracy =
    progress.totalAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
      : 0;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        onStartMission();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onStartMission]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:py-10">
      {/* Hero Game Stage */}
      <section className="cyber-card relative overflow-hidden rounded-3xl">
        {/* Key-Art Backdrop with Safe CSS Fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#071127] via-[#0a1430] to-[#140e30]">
          {!imgError && (
            <img
              src="/src/assets/images/cyber_quest_backdrop_1794849665355.jpg"
              alt="Cyber Quest defensive operations backdrop"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover opacity-55"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#050814]/95 via-[#070d20]/82 to-[#070d20]/45"
          />
        </div>

        <div className="relative z-10 grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-12">
          <div className="lg:col-span-7 space-y-6">
            <CyberQuestLogo />

            <div className="space-y-2.5 max-w-xl">
              <p className="font-display text-xl sm:text-2xl font-semibold text-cyan-300 tracking-tight">
                {UI_COPY.subtitle[lang]}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {UI_COPY.heroDescription[lang]}
              </p>
            </div>

            {/* Difficulty selector for touch & desktop convenience */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium text-slate-400">
                {UI_COPY.difficulty[lang]}:
              </span>
              <div className="inline-flex items-center rounded-xl border border-slate-700/80 bg-slate-900/85 p-1">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => {
                  const active = progress.difficulty === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => onChangeDifficulty(d)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50'
                          : 'text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      {UI_COPY.difficultyLabels[d][lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onStartMission}
                className="cyber-glow-btn group inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-base font-bold text-white whitespace-nowrap shrink-0"
              >
                <span>{UI_COPY.startMission[lang]}</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onOpenHub}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/35 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-400 hover:bg-slate-800/90 whitespace-nowrap shrink-0"
              >
                <LayoutDashboard className="h-4 w-4 text-cyan-400" />
                <span>{UI_COPY.openDashboard[lang]}</span>
              </button>

              <button
                type="button"
                onClick={onOpenHelp}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-3.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white whitespace-nowrap shrink-0"
              >
                <BookOpen className="h-4 w-4 text-violet-400" />
                <span>{UI_COPY.howToPlay[lang]}</span>
              </button>
            </div>

            <p className="font-mono text-xs text-slate-400">
              {lang === 'en'
                ? 'Press Enter or Space to start · Switch EN / ગુજરાતી anytime'
                : 'શરૂ કરવા Enter કે Space દબાવો · ગમે ત્યારે EN / ગુજરાતી ભાષા બદલો'}
            </p>
          </div>

          {/* Right Player Progress Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-cyan-500/25 bg-[#070d1f]/90 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <p className="text-xs text-slate-400">
                    {lang === 'en' ? 'Active Defender Profile' : 'સક્રિય રક્ષક પ્રોફાઇલ'}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-white">
                    {UI_COPY.playerLevel[lang]} {levelInfo.level} ·{' '}
                    <span className="text-cyan-300">
                      {lang === 'en' ? levelInfo.rankEn : levelInfo.rankGu}
                    </span>
                  </p>
                </div>
                <ShieldCheck className="h-8 w-8 text-cyan-400 shrink-0" />
              </div>

              {/* XP Bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="text-slate-300">
                    {progress.xp.toLocaleString()} {UI_COPY.totalXp[lang]}
                  </span>
                  <span className="text-slate-400">
                    {levelInfo.currentLevelXp} / {levelInfo.nextLevelXp} XP
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 transition-transform duration-300"
                    style={{ width: `${Math.max(4, levelInfo.progressPercent)}%` }}
                  />
                </div>
              </div>

              {/* Key Telemetry Numbers */}
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-800 pt-4 text-center">
                <div>
                  <p className="font-mono text-xl font-bold text-white tabular-nums">
                    {completedCount}/7
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {lang === 'en' ? 'Missions' : 'મિશન'}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xl font-bold text-cyan-300 tabular-nums">
                    {accuracy}%
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{UI_COPY.accuracy[lang]}</p>
                </div>
                <div>
                  <p className="font-mono text-xl font-bold text-violet-300 tabular-nums">
                    {progress.unlockedBadges.length}/9
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {lang === 'en' ? 'Badges' : 'બેજ'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick How to Play & Mission Overview Strip */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {UI_COPY.howToPlaySteps.map((step, i) => (
          <div key={i} className="cyber-card rounded-2xl p-5">
            <h2 className="font-display text-sm font-bold text-cyan-300">
              {step.title[lang]}
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
              {step.body[lang]}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
