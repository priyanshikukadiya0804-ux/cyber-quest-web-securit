import { Lock, ShieldAlert } from 'lucide-react';
import { Language, SslChallenge } from '../../types/game';
import { ChallengeControls } from '../ChallengeControls';

interface SslHttpsMissionProps {
  challenge: SslChallenge;
  language: Language;
  answered: boolean;
  isCorrect: boolean | null;
  selectedOptionId: string | null;
  hintUsed: boolean;
  hintPenalty: number;
  isLastQuestion: boolean;
  onAnswer: (optionId: string) => void;
  onUseHint: () => void;
  onNext: () => void;
}

export function SslHttpsMission({
  challenge,
  language,
  answered,
  isCorrect,
  selectedOptionId,
  hintUsed,
  hintPenalty,
  isLastQuestion,
  onAnswer,
  onUseHint,
  onNext,
}: SslHttpsMissionProps) {
  const statusColor =
    challenge.validStatus === 'Valid' ? 'text-emerald-300' : 'text-amber-300';

  return (
    <div className="space-y-6">
      {/* TLS & Certificate Inspector Card */}
      <div className="rounded-2xl border border-cyan-500/25 bg-[#070d1f] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            {challenge.hasPadlock ? (
              <Lock className="h-4 w-4 text-emerald-400" />
            ) : (
              <ShieldAlert className="h-4 w-4 text-amber-400" />
            )}
            <span className="font-mono text-sm font-semibold text-white break-all">
              {challenge.siteUrl}
            </span>
          </div>
          <span className={`font-mono text-xs font-semibold ${statusColor}`}>
            {challenge.validStatus} · {challenge.protocol}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-[11px] text-slate-400">
              {language === 'en' ? 'Certificate Issuer (CA)' : 'સર્ટિફિકેટ આપનાર (CA)'}
            </p>
            <p className="mt-1 font-mono text-xs font-semibold text-sky-300">
              {challenge.issuer}
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-[11px] text-slate-400">
              {language === 'en' ? 'Subject Domain (CN)' : 'સર્ટિફિકેટ Domain (CN)'}
            </p>
            <p className="mt-1 font-mono text-xs font-semibold text-cyan-300 break-all">
              {challenge.subjectDomain}
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-[11px] text-slate-400">
              {language === 'en' ? 'Browser Padlock' : 'બ્રાઉઝર તાળું (Padlock)'}
            </p>
            <p className="mt-1 font-mono text-xs font-semibold text-white">
              {challenge.hasPadlock
                ? language === 'en'
                  ? 'Shown (Encrypted)'
                  : 'દેખાય છે (Encrypted)'
                : language === 'en'
                ? 'Warning / Not Shown'
                : 'ચેતવણી / દેખાતું નથી'}
            </p>
          </div>
        </div>

        <p className="rounded-xl border border-slate-800 bg-slate-950/75 p-3.5 text-sm text-slate-200">
          {challenge.trustNote[language]}
        </p>
      </div>

      {/* Question */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-white">
          {challenge.question[language]}
        </h3>

        <div className="space-y-2.5">
          {challenge.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isRight = opt.id === challenge.correctOptionId;

            let cardStyle =
              'border-slate-700/90 bg-slate-900/75 text-slate-100 hover:border-cyan-400/60 hover:bg-slate-800/80';
            if (answered) {
              if (isRight) {
                cardStyle = 'border-emerald-400 bg-emerald-500/15 text-white';
              } else if (isSelected && !isRight) {
                cardStyle = 'border-rose-400 bg-rose-500/15 text-white';
              } else {
                cardStyle = 'border-slate-800 bg-slate-900/40 text-slate-400';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={answered}
                onClick={() => onAnswer(opt.id)}
                className={`w-full rounded-xl border p-4 text-left text-sm sm:text-base transition-all ${cardStyle}`}
              >
                <span className="font-mono text-xs uppercase text-cyan-400 mr-2.5">
                  [{opt.id}]
                </span>
                <span>{opt.label[language]}</span>
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
