import { Cpu } from 'lucide-react';
import { BossQuestion, Language } from '../../types/game';
import { ChallengeControls } from '../ChallengeControls';

interface CyberBossMissionProps {
  questionItem: BossQuestion;
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

export function CyberBossMission({
  questionItem,
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
}: CyberBossMissionProps) {
  return (
    <div className="space-y-6">
      {/* Topic Context & Optional Code/URL Snippet */}
      <div className="rounded-2xl border border-violet-500/35 bg-[#090e24] p-5 space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs text-violet-300 font-medium">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>
              {language === 'en'
                ? `Topic: ${questionItem.topic}`
                : `વિષય: ${questionItem.topic} (${questionItem.topicGu})`}
            </span>
          </div>
          <span className="font-mono text-cyan-300">
            {language === 'en' ? 'Randomized Boss Encounter' : 'રેન્ડમ સાયબર બોસ પડકાર'}
          </span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
          {questionItem.question[language]}
        </h3>

        {questionItem.snippet && (
          <pre className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 font-mono text-xs sm:text-sm text-cyan-200 overflow-x-auto whitespace-pre-wrap break-all">
            {questionItem.snippet}
          </pre>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {questionItem.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isRight = opt.id === questionItem.correctOptionId;

          let cardStyle =
            'border-slate-700/90 bg-slate-900/75 text-slate-100 hover:border-violet-400/60 hover:bg-slate-800/80';
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
              <span className="font-mono text-xs uppercase text-violet-400 mr-2.5">
                [{opt.id}]
              </span>
              <span>{opt.label[language]}</span>
            </button>
          );
        })}
      </div>

      <ChallengeControls
        language={language}
        answered={answered}
        isCorrect={isCorrect}
        hintUsed={hintUsed}
        hintPenalty={hintPenalty}
        hintText={questionItem.hint}
        explanationText={questionItem.explanation}
        isLastQuestion={isLastQuestion}
        onUseHint={onUseHint}
        onNext={onNext}
      />
    </div>
  );
}
