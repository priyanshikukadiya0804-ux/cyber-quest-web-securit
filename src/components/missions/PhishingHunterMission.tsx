import { Eye, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Language, PhishingChallenge } from '../../types/game';
import { ChallengeControls } from '../ChallengeControls';

interface PhishingHunterMissionProps {
  challenge: PhishingChallenge;
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

export function PhishingHunterMission({
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
}: PhishingHunterMissionProps) {
  const [inspectLink, setInspectLink] = useState(false);

  return (
    <div className="space-y-6">
      {/* Fictional Email / SMS Inbox Viewer */}
      <div className="rounded-2xl border border-cyan-500/25 bg-[#070d1f] overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/80 px-5 py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
            {challenge.channel === 'Email' ? (
              <Mail className="h-4 w-4" />
            ) : (
              <MessageSquare className="h-4 w-4" />
            )}
            <span>
              {challenge.channel === 'Email'
                ? language === 'en'
                  ? 'Fictional Email Message'
                  : 'કાલ્પનિક ઈમેલ સંદેશો'
                : language === 'en'
                ? 'Fictional SMS Message'
                : 'કાલ્પનિક SMS સંદેશો'}
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {language === 'en' ? 'Safe Local Simulation' : 'સુરક્ષિત લોકલ સિમ્યુલેશન'}
          </span>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid gap-2 text-xs sm:text-sm border-b border-slate-800/80 pb-3">
            <div className="flex flex-wrap gap-x-2">
              <span className="text-slate-400 font-medium">
                {language === 'en' ? 'From:' : 'મોકલનાર (From):'}
              </span>
              <span className="text-white font-semibold">{challenge.senderName}</span>
              <span className="font-mono text-cyan-300 break-all">
                &lt;{challenge.senderAddress}&gt;
              </span>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-slate-400 font-medium">
                {language === 'en' ? 'Subject:' : 'વિષય (Subject):'}
              </span>
              <span className="text-slate-100 font-medium">{challenge.subject[language]}</span>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-slate-200">
            {challenge.body[language]}
          </p>

          {/* Safe Non-Navigating Link Inspector */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-lg border border-sky-500/35 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200">
                {challenge.linkLabel}
              </span>
              <button
                type="button"
                onClick={() => setInspectLink((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:border-cyan-400/50 whitespace-nowrap shrink-0"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>
                  {inspectLink
                    ? language === 'en'
                      ? 'Hide Target URL'
                      : 'Target URL છુપાવો'
                    : language === 'en'
                    ? 'Inspect Link Destination'
                    : 'લિંકનું અસલી સરનામું જુઓ'}
                </span>
              </button>
            </div>

            {inspectLink && (
              <div className="rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-amber-300 break-all">
                {language === 'en' ? 'Link Target Preview:' : 'લિંક પ્રિવ્યૂ:'} {challenge.linkPreviewUrl}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Multiple-Choice Question */}
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
