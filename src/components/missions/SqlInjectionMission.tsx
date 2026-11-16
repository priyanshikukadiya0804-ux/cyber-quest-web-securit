import { Database, Lock, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Language, SqlChallenge } from '../../types/game';
import { ChallengeControls } from '../ChallengeControls';

interface SqlInjectionMissionProps {
  challenge: SqlChallenge;
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

const PRESET_INPUTS = [
  { id: 'normal', label: 'alice_dev', value: 'alice_dev' },
  { id: 'quote', label: "' OR '1'='1", value: "' OR '1'='1" },
  { id: 'comment', label: "admin'--", value: "admin'--" },
];

export function SqlInjectionMission({
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
}: SqlInjectionMissionProps) {
  const [simUsername, setSimUsername] = useState<string>(challenge.sampleInputUsername);

  const hasQuoteTrick = simUsername.includes("'") || simUsername.includes('--');

  return (
    <div className="space-y-6">
      {/* Safe Visual Login & Query Simulator */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Fictional Login Screen */}
        <div className="rounded-2xl border border-cyan-500/25 bg-[#070d1f] p-5 lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
            <Lock className="h-4 w-4" />
            <span>
              {language === 'en'
                ? 'Fictional Login Simulator (No Real Database)'
                : 'કાલ્પનિક લોગિન સિમ્યુલેટર (કોઈ વાસ્તવિક ડેટાબેઝ નથી)'}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                {language === 'en' ? 'Test Input Preset' : 'ટેસ્ટ ઇનપુટ પસંદ કરો'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_INPUTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSimUsername(p.value)}
                    className={`rounded-lg border px-2.5 py-1 font-mono text-xs transition-colors ${
                      simUsername === p.value
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                        : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
              <div>
                <span className="text-[11px] text-slate-400">Username</span>
                <div className="mt-0.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs text-amber-300 break-all">
                  {simUsername}
                </div>
              </div>
              <div>
                <span className="text-[11px] text-slate-400">Password</span>
                <div className="mt-0.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs text-slate-400">
                  {challenge.sampleInputPassword}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Comparison: Unsafe Concatenation vs Parameterized Query */}
        <div className="rounded-2xl border border-cyan-500/25 bg-[#070d1f] p-5 lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
            <Database className="h-4 w-4" />
            <span>{challenge.scenarioTitle[language]}</span>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-rose-500/35 bg-rose-950/20 p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-300">
                <ShieldAlert className="h-4 w-4" />
                <span>
                  {language === 'en'
                    ? 'Unsafe Pattern: String Concatenation'
                    : 'અસુરક્ષિત રીત: String Concatenation'}
                </span>
              </div>
              <pre className="overflow-x-auto font-mono text-xs text-rose-100 whitespace-pre-wrap break-all">
                {`SELECT id FROM users WHERE username = '${simUsername}' AND active = 1;`}
              </pre>
              <p className="text-xs text-rose-200/80">
                {hasQuoteTrick
                  ? language === 'en'
                    ? 'Notice how quotes inside input break out of the string and alter SQL logic!'
                    : 'જુઓ કેવી રીતે ઇનપુટના અવતરણ ચિહ્નો (\') SQL ક્વેરીનું લોજિક બદલી નાખે છે!'
                  : language === 'en'
                  ? 'Looks harmless with normal input, but breaks if input contains SQL quotes.'
                  : 'સામાન્ય ઇનપુટમાં સારું લાગે છે, પણ ખાસ અક્ષરો આવતા તૂટી જાય છે.'}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/35 bg-emerald-950/20 p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span>
                  {language === 'en'
                    ? 'Safe Pattern: Parameterized Query'
                    : 'સુરક્ષિત રીત: Parameterized Query'}
                </span>
              </div>
              <pre className="overflow-x-auto font-mono text-xs text-emerald-100 whitespace-pre-wrap break-all">
                {`SELECT id FROM users WHERE username = ? AND active = 1;  // bound param: "${simUsername}"`}
              </pre>
              <p className="text-xs text-emerald-200/80">
                {language === 'en'
                  ? 'Input stays strictly inside the parameter slot and is never parsed as SQL syntax.'
                  : 'ઇનપુટ માત્ર ડેટા તરીકે રહે છે અને ક્યારેય SQL કમાન્ડ તરીકે વંચાતું નથી.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Question */}
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
