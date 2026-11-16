import { ServerCog } from 'lucide-react';
import { HeaderMatchChallenge, Language } from '../../types/game';
import { ChallengeControls } from '../ChallengeControls';

interface SecurityHeadersMissionProps {
  challenge: HeaderMatchChallenge;
  language: Language;
  answered: boolean;
  isCorrect: boolean | null;
  selectedHeaderId: string | null;
  hintUsed: boolean;
  hintPenalty: number;
  isLastQuestion: boolean;
  onAnswer: (headerId: string) => void;
  onUseHint: () => void;
  onNext: () => void;
}

export function SecurityHeadersMission({
  challenge,
  language,
  answered,
  isCorrect,
  selectedHeaderId,
  hintUsed,
  hintPenalty,
  isLastQuestion,
  onAnswer,
  onUseHint,
  onNext,
}: SecurityHeadersMissionProps) {
  return (
    <div className="space-y-6">
      {/* Security Defense Objective Card */}
      <div className="rounded-2xl border border-cyan-500/25 bg-[#070d1f] p-5 space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs text-cyan-300 font-medium">
          <div className="flex items-center gap-2">
            <ServerCog className="h-4 w-4" />
            <span>
              {language === 'en'
                ? 'HTTP Response Header Matching Challenge'
                : 'HTTP સુરક્ષા હેડર મેચિંગ પડકાર'}
            </span>
          </div>
          <span className="font-mono text-amber-300">{challenge.threatExample[language]}</span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
          {challenge.scenario[language]}
        </h3>
      </div>

      {/* Matching Header Cards */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-300">
          {language === 'en'
            ? 'Match this security goal to the correct HTTP Response Header:'
            : 'આ સુરક્ષા લક્ષ્ય માટે યોગ્ય HTTP Response Header પસંદ કરો:'}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {challenge.options.map((opt) => {
            const isSelected = selectedHeaderId === opt.id;
            const isRight = opt.id === challenge.correctHeaderId;

            let cardStyle =
              'border-slate-700/90 bg-slate-900/75 text-slate-100 hover:border-cyan-400/60 hover:bg-slate-800/80';
            if (answered) {
              if (isRight) {
                cardStyle = 'border-emerald-400 bg-emerald-500/15 text-white';
              } else if (isSelected && !isRight) {
                cardStyle = 'border-rose-400 bg-rose-500/15 text-white';
              } else {
                cardStyle = 'border-slate-800 bg-slate-900/40 text-slate-500';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={answered}
                onClick={() => onAnswer(opt.id)}
                className={`rounded-2xl border p-4 text-left transition-all ${cardStyle}`}
              >
                <p className="font-mono text-sm font-bold text-cyan-300">{opt.headerName}</p>
                <p className="mt-1 font-mono text-xs text-slate-300 break-all">
                  {opt.headerValue}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <ChallengeControls
        language={language}
        answered={answered}
        isCorrect={isCorrect}
        hintUsed={hintUsed}
        hintPenalty={hintPenalty}
        hintText={challenge.hint}
        explanationText={challenge.explanation}
        isLastQuestion={isLastQuestion}
        onUseHint={onUseHint}
        onNext={onNext}
      />
    </div>
  );
}
