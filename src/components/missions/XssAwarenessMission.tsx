import { Code2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Language, XssChallenge } from '../../types/game';
import { ChallengeControls } from '../ChallengeControls';

interface XssAwarenessMissionProps {
  challenge: XssChallenge;
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

function encodeHtmlEntities(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const SAMPLE_PRESETS = [
  'Hello team!',
  '<b>Welcome</b>',
  '<script>alert("demo")</script>',
];

export function XssAwarenessMission({
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
}: XssAwarenessMissionProps) {
  const [sandboxText, setSandboxText] = useState<string>(challenge.sampleInput);
  const encodedPreview = encodeHtmlEntities(sandboxText);
  const containsAngleBrackets = sandboxText.includes('<') || sandboxText.includes('>');

  return (
    <div className="space-y-6">
      {/* Safe Isolated Output-Encoding Simulator (Never executes HTML/JS) */}
      <div className="rounded-2xl border border-cyan-500/25 bg-[#070d1f] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
            <Code2 className="h-4 w-4" />
            <span>{challenge.scenarioTitle[language]}</span>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {language === 'en'
              ? 'Isolated Text Sandbox (Zero Script Execution)'
              : 'સુરક્ષિત ટેક્સ્ટ સેન્ડબોક્સ (સ્ક્રિપ્ટ ક્યારેય ચાલતી નથી)'}
          </span>
        </div>

        {/* Interactive Sample Input Switcher */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="xss-sandbox-input"
              className="text-xs font-medium text-slate-300"
            >
              {language === 'en'
                ? 'Try a sample input to compare Plain Text vs Encoded Output:'
                : 'Plain Text અને Encoded Output જોવા માટે નીચેનું ઉદાહરણ અજમાવો:'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSandboxText(preset)}
                  className={`rounded-lg border px-2 py-1 font-mono text-[11px] transition-colors ${
                    sandboxText === preset
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                      : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <input
            id="xss-sandbox-input"
            type="text"
            value={sandboxText}
            onChange={(e) => setSandboxText(e.target.value)}
            maxLength={120}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 font-mono text-xs sm:text-sm text-amber-200 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Side-by-Side Conceptual Comparison */}
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-rose-500/35 bg-rose-950/20 p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-300">
              <ShieldAlert className="h-4 w-4" />
              <span>
                {language === 'en'
                  ? 'Unsafe Raw HTML Sink (Conceptual Warning)'
                  : 'અસુરક્ષિત Raw HTML (સમજૂતી)'}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-rose-100/90">
              {challenge.unsafeRenderDescription[language]}
            </p>
            <p className="font-mono text-xs text-rose-300/90 pt-1">
              {containsAngleBrackets
                ? language === 'en'
                  ? 'Tag tokens (<, >) detected — unsafe innerHTML would treat them as markup!'
                  : 'ટેગ અક્ષરો (<, >) મળ્યા — અસુરક્ષિત innerHTML તેને કોડ ગણી શકે છે!'
                : language === 'en'
                ? 'Plain words only, though unsafe sinks remain risky for any special characters.'
                : 'માત્ર સાદા શબ્દો છે, છતાં અસુરક્ષિત પદ્ધતિ હંમેશા જોખમી છે.'}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/35 bg-emerald-950/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              <span>
                {language === 'en'
                  ? 'Safe Plain-Text & Output Encoding'
                  : 'સુરક્ષિત Plain-Text અને Output Encoding'}
              </span>
            </div>
            <div>
              <p className="text-[11px] text-emerald-200/75">
                {language === 'en' ? 'Encoded HTML Entities:' : 'Encoded HTML સ્વરૂપ:'}
              </p>
              <p className="mt-0.5 font-mono text-xs text-emerald-200 break-all">
                {encodedPreview}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-emerald-200/75">
                {language === 'en'
                  ? 'Safe Visible Screen Output (Plain Text Only):'
                  : 'સ્ક્રીન પર સુરક્ષિત રીતે દેખાતું પરિણામ:'}
              </p>
              <p className="mt-0.5 rounded-lg bg-slate-950/80 px-2.5 py-1.5 font-mono text-xs text-white break-all">
                {sandboxText}
              </p>
            </div>
          </div>
        </div>
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
