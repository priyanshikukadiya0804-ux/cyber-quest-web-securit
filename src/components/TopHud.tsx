import { HelpCircle, LayoutDashboard, Volume2, VolumeX } from 'lucide-react';
import { UI_COPY } from '../data/translations';
import { Difficulty, GameView, Language } from '../types/game';
import { getPlayerLevel } from '../utils/storage';
import { CyberQuestLogo } from './CyberQuestLogo';

interface TopHudProps {
  view: GameView;
  xp: number;
  language: Language;
  difficulty: Difficulty;
  muted: boolean;
  onNavigateTitle: () => void;
  onNavigateHub: () => void;
  onToggleLanguage: (lang: Language) => void;
  onChangeDifficulty: (diff: Difficulty) => void;
  onToggleMute: () => void;
  onOpenHelp: () => void;
}

export function TopHud({
  view,
  xp,
  language,
  difficulty,
  muted,
  onNavigateTitle,
  onNavigateHub,
  onToggleLanguage,
  onChangeDifficulty,
  onToggleMute,
  onOpenHelp,
}: TopHudProps) {
  const levelInfo = getPlayerLevel(xp);

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-500/20 bg-[#050814]/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onNavigateTitle}
            className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            title={UI_COPY.backToTitle[language]}
          >
            <CyberQuestLogo compact />
          </button>

          {view !== 'HUB' && (
            <button
              type="button"
              onClick={onNavigateHub}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-cyan-200 whitespace-nowrap shrink-0"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-cyan-400" />
              <span>{UI_COPY.backToHub[language]}</span>
            </button>
          )}
        </div>

        {/* Center telemetry readouts (unboxed tabular figures) */}
        <div className="hidden md:flex items-center gap-3 text-xs text-slate-300 font-mono tabular-nums">
          <span>
            {UI_COPY.playerLevel[language]}{' '}
            <strong className="text-cyan-300 font-semibold">{levelInfo.level}</strong>
          </span>
          <span className="text-slate-600" aria-hidden="true">
            ·
          </span>
          <span>
            <strong className="text-white font-semibold">{xp.toLocaleString()}</strong> XP
          </span>
          <span className="text-slate-600" aria-hidden="true">
            ·
          </span>
          <span className="text-slate-400">
            {language === 'en' ? levelInfo.rankEn : levelInfo.rankGu}
          </span>
        </div>

        {/* Right interactive controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Difficulty Segmented Control */}
          <div
            role="group"
            aria-label={UI_COPY.difficulty[language]}
            className="hidden sm:flex items-center rounded-lg border border-slate-800 bg-slate-900/80 p-0.5"
          >
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => {
              const active = difficulty === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => onChangeDifficulty(d)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {UI_COPY.difficultyLabels[d][language]}
                </button>
              );
            })}
          </div>

          {/* Language Toggle */}
          <div
            role="group"
            aria-label="Language switch"
            className="flex items-center rounded-lg border border-slate-800 bg-slate-900/80 p-0.5"
          >
            <button
              type="button"
              onClick={() => onToggleLanguage('en')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                language === 'en'
                  ? 'bg-sky-500/25 text-sky-200 border border-sky-400/45'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onToggleLanguage('gu')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                language === 'gu'
                  ? 'bg-violet-500/25 text-violet-200 border border-violet-400/45'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              ગુજરાતી
            </button>
          </div>

          {/* Help Button */}
          <button
            type="button"
            onClick={onOpenHelp}
            aria-label={UI_COPY.howToPlay[language]}
            title={UI_COPY.howToPlay[language]}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {/* Mute Toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Unmute sound' : 'Mute sound'}
            title={muted ? 'Unmute sound' : 'Mute sound'}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
          >
            {muted ? <VolumeX className="h-4 w-4 text-slate-500" /> : <Volume2 className="h-4 w-4 text-cyan-400" />}
          </button>
        </div>
      </div>
    </header>
  );
}
