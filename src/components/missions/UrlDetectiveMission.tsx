import { AlertTriangle, Eye, Globe, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { Language, UrlChallenge } from '../../types/game';
import { ChallengeControls } from '../ChallengeControls';

interface UrlDetectiveMissionProps {
  challenge: UrlChallenge;
  language: Language;
  answered: boolean;
  isCorrect: boolean | null;
  selectedChoice: boolean | null;
  hintUsed: boolean;
  hintPenalty: number;
  isLastQuestion: boolean;
  onAnswer: (choseSuspicious: boolean) => void;
  onUseHint: () => void;
  onNext: () => void;
}

export function UrlDetectiveMission({
  challenge,
  language,
  answered,
  isCorrect,
  selectedChoice,
  hintUsed,
  hintPenalty,
  isLastQuestion,
  onAnswer,
  onUseHint,
  onNext,
}: UrlDetectiveMissionProps) {
  const [showAnatomy, setShowAnatomy] = useState(true);

  return (
    <div className="space-y-6">
      {/* Simulated Browser Address Bar */}
      <div className="rounded-2xl border border-cyan-500/25 bg-[#070d1f] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-cyan-300 font-medium">
            <Globe className="h-4 w-4" />
            <span>
              {language === 'en'
                ? 'Fictional Browser Address Bar (Do Not Visit Real Sites)'
                : 'કાલ્પનિક બ્રાઉઝર એડ્રેસ બાર (વાસ્તવિક સાઇટ નથી)'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowAnatomy((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300 hover:border-cyan-400/50 hover:text-cyan-200 whitespace-nowrap shrink-0"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>
              {showAnatomy
                ? language === 'en'
                  ? 'Hide URL Breakdown'
                  : 'URL ભાગો છુપાવો'
                : language === 'en'
                ? 'Inspect URL Segments'
                : 'URL ભાગો તપાસો'}
            </span>
          </button>
        </div>

        <div className="rounded-xl border border-slate-700/90 bg-slate-950 px-4 py-3.5 font-mono text-sm sm:text-base text-cyan-100 break-all">
          {challenge.url}
        </div>

        {showAnatomy && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Protocol (પ્રોટોકોલ)' : 'Protocol (પ્રોટોકોલ)'}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-sky-300 break-all">
                {challenge.protocol}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Subdomain (સબડોમેન)' : 'Subdomain (સબડોમેન)'}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-violet-300 break-all">
                {challenge.subdomain}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Root Domain (મુખ્ય ડોમેન)' : 'Root Domain (મુખ્ય ડોમેન)'}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-cyan-300 break-all">
                {challenge.domain}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Path (પાથ)' : 'Path (પાથ)'}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-slate-200 break-all">
                {challenge.path}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Analyst Question */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-white">
          {language === 'en'
            ? 'How should an analyst classify this fictional URL?'
            : 'સુરક્ષા વિશ્લેષક તરીકે તમે આ કાલ્પનિક URL ને કેવી રીતે વર્ગીકૃત કરશો?'}
        </h3>
        <p className="text-xs text-slate-400">
          {language === 'en'
            ? 'Note: Analysts never mark a URL 100% safe without verifying source, HTTPS, and certificate context.'
            : 'નોંધ: પૂરતા પુરાવા (સ્ત્રોત, HTTPS, સર્ટિફિકેટ) વગર કોઈપણ URL ને ૧૦૦% સુરક્ષિત માનવું નહીં.'}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={answered}
            onClick={() => onAnswer(true)}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
              answered && challenge.isSuspicious
                ? 'border-emerald-400 bg-emerald-500/15 text-white'
                : answered && selectedChoice === true && !challenge.isSuspicious
                ? 'border-rose-400 bg-rose-500/15 text-white'
                : 'border-slate-700/90 bg-slate-900/75 text-slate-100 hover:border-cyan-400/60 hover:bg-slate-800/80'
            }`}
          >
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-display font-semibold text-sm sm:text-base">
                {language === 'en' ? 'Suspicious URL' : 'શંકાસ્પદ URL (Suspicious)'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'en'
                  ? 'Contains red flags like spoofing, deceptive subdomain, or HTTP.'
                  : 'નકલી સ્પેલિંગ, છેતરપિંડીભર્યો Subdomain અથવા અસુરક્ષિત HTTP છે.'}
              </p>
            </div>
          </button>

          <button
            type="button"
            disabled={answered}
            onClick={() => onAnswer(false)}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
              answered && !challenge.isSuspicious
                ? 'border-emerald-400 bg-emerald-500/15 text-white'
                : answered && selectedChoice === false && challenge.isSuspicious
                ? 'border-rose-400 bg-rose-500/15 text-white'
                : 'border-slate-700/90 bg-slate-900/75 text-slate-100 hover:border-cyan-400/60 hover:bg-slate-800/80'
            }`}
          >
            <ShieldAlert className="h-5 w-5 text-cyan-400 shrink-0" />
            <div>
              <p className="font-display font-semibold text-sm sm:text-base">
                {language === 'en'
                  ? 'Appears Legitimate (Verify Context)'
                  : 'પ્રાથમિક રીતે યોગ્ય (સંદર્ભ ચકાસો)'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'en'
                  ? 'Clean URL structure, but still confirm sender & TLS certificate.'
                  : 'URL નું માળખું સ્વચ્છ છે, છતાં સ્ત્રોત અને સર્ટિફિકેટ ચકાસવું જરૂરી.'}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Clue breakdown after answering */}
      {answered && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
          <p className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            {language === 'en' ? 'Inspection Clues' : 'તપાસના મુદ્દા'}
          </p>
          <ul className="space-y-1.5 text-sm text-slate-300 list-disc pl-5">
            {challenge.clues.map((clue, i) => (
              <li key={i}>{clue[language]}</li>
            ))}
          </ul>
        </div>
      )}

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
