import { BookOpen, X } from 'lucide-react';
import { UI_COPY } from '../data/translations';
import { Language } from '../types/game';

interface HowToPlayModalProps {
  open: boolean;
  language: Language;
  onClose: () => void;
}

export function HowToPlayModal({ open, language, onClose }: HowToPlayModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
    >
      <div className="cyber-card relative w-full max-w-2xl rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 id="how-to-play-title" className="font-display text-xl font-bold text-white">
                {UI_COPY.howToPlay[language]}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{UI_COPY.subtitle[language]}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={UI_COPY.close[language]}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {UI_COPY.howToPlaySteps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800/90 bg-slate-900/55 p-4"
            >
              <h3 className="font-display text-sm font-semibold text-cyan-300">
                {step.title[language]}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                {step.body[language]}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-800 pt-4">
          <p className="text-xs text-slate-400">{UI_COPY.safetyNotice[language]}</p>
          <button
            type="button"
            onClick={onClose}
            className="cyber-glow-btn rounded-xl px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0"
          >
            {UI_COPY.close[language]}
          </button>
        </div>
      </div>
    </div>
  );
}
