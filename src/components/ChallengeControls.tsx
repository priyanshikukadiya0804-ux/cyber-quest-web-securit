import { ArrowRight, CheckCircle2, Lightbulb, XCircle } from 'lucide-react';
import { UI_COPY } from '../data/translations';
import { BilingualText, Language } from '../types/game';

interface ChallengeControlsProps {
  language: Language;
  answered: boolean;
  isCorrect: boolean | null;
  hintUsed: boolean;
  hintPenalty: number;
  hintText: BilingualText;
  explanationText: BilingualText;
  isLastQuestion: boolean;
  onUseHint: () => void;
  onNext: () => void;
}

export function ChallengeControls({
  language,
  answered,
  isCorrect,
  hintUsed,
  hintPenalty,
  hintText,
  explanationText,
  isLastQuestion,
  onUseHint,
  onNext,
}: ChallengeControlsProps) {
  return (
    <div className="space-y-4">
      {/* Hint Bar */}
      {!answered && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={hintUsed}
            onClick={onUseHint}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              hintUsed
                ? 'cursor-default border-amber-500/30 bg-amber-500/10 text-amber-200'
                : 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-amber-400/50 hover:text-amber-200'
            }`}
          >
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <span>
              {hintUsed
                ? UI_COPY.hintUsed[language]
                : `${UI_COPY.useHint[language]} (-${hintPenalty} XP)`}
            </span>
          </button>
        </div>
      )}

      {hintUsed && !answered && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
          <p className="font-semibold text-amber-300 text-xs uppercase tracking-wider mb-1">
            {language === 'en' ? 'Tactical Hint' : 'મદદરૂપ સંકેત (Hint)'}
          </p>
          <p className="leading-relaxed">{hintText[language]}</p>
        </div>
      )}

      {/* Instant Answer Feedback & Next Button */}
      {answered && isCorrect !== null && (
        <div
          className={`rounded-2xl border p-5 transition-all ${
            isCorrect
              ? 'border-emerald-500/40 bg-emerald-500/10'
              : 'border-rose-500/40 bg-rose-500/10'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-6 w-6 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-2 flex-1">
              <h4
                className={`font-display text-base font-bold ${
                  isCorrect ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {isCorrect ? UI_COPY.correctBanner[language] : UI_COPY.incorrectBanner[language]}
              </h4>
              <p className="text-sm leading-relaxed text-slate-200">
                {explanationText[language]}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onNext}
              className="cyber-glow-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0"
            >
              <span>
                {isLastQuestion
                  ? UI_COPY.finishMission[language]
                  : UI_COPY.nextChallenge[language]}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
