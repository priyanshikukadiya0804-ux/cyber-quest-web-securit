import { BilingualText, Difficulty } from '../types/game';

export const UI_COPY = {
  subtitle: {
    en: 'Learn. Detect. Defend.',
    gu: 'શીખો. ઓળખો. રક્ષણ કરો.',
  },
  heroDescription: {
    en: 'Master defensive web security across 7 interactive missions. Inspect suspicious URLs, detect phishing traps, understand SQL injection & XSS safely, configure HTTP headers, and verify TLS certificates.',
    gu: '૭ ઇન્ટરેક્ટિવ મિશન દ્વારા વેબ સુરક્ષા (Web Security) શીખો. શંકાસ્પદ URL તપાસો, Phishing ઓળખો, SQL Injection અને XSS ને સુરક્ષિત રીતે સમજો, Security Headers ગોઠવો અને HTTPS સર્ટિફિકેટ ચકાસો.',
  },
  startMission: {
    en: 'Start Mission',
    gu: 'મિશન શરૂ કરો',
  },
  openDashboard: {
    en: 'Mission Hub & Dashboard',
    gu: 'મિશન હબ અને ડેશબોર્ડ',
  },
  howToPlay: {
    en: 'How to Play',
    gu: 'કેવી રીતે રમવું',
  },
  backToTitle: {
    en: 'Title Screen',
    gu: 'હોમ સ્ક્રીન',
  },
  backToHub: {
    en: 'Mission Hub',
    gu: 'મિશન હબ',
  },
  difficulty: {
    en: 'Difficulty',
    gu: 'કઠિનતા સ્તર',
  },
  difficultyLabels: {
    easy: { en: 'Easy', gu: 'સરળ' },
    medium: { en: 'Medium', gu: 'મધ્યમ' },
    hard: { en: 'Hard', gu: 'કઠિન' },
  } as Record<Difficulty, BilingualText>,
  playerLevel: {
    en: 'Level',
    gu: 'લેવલ',
  },
  totalXp: {
    en: 'Total XP',
    gu: 'કુલ XP',
  },
  completedMissions: {
    en: 'Completed Missions',
    gu: 'પૂર્ણ મિશન',
  },
  accuracy: {
    en: 'Accuracy',
    gu: 'ચોકસાઈ',
  },
  streak: {
    en: 'Streak',
    gu: 'સ્ટ્રીક',
  },
  bestStreak: {
    en: 'Best Streak',
    gu: 'શ્રેષ્ઠ સ્ટ્રીક',
  },
  badges: {
    en: 'Achievement Badges',
    gu: 'સિદ્ધિ બેજ (Badges)',
  },
  learningChart: {
    en: 'Learning Progress by Domain',
    gu: 'વિષય મુજબ પ્રગતિ ચાર્ટ',
  },
  missionSelect: {
    en: 'Web Security Missions',
    gu: 'વેબ સુરક્ષા મિશન',
  },
  lockedLabel: {
    en: 'Complete previous mission to unlock',
    gu: 'અનલૉક કરવા માટે અગાઉનું મિશન પૂર્ણ કરો',
  },
  playMission: {
    en: 'Play Mission',
    gu: 'મિશન રમો',
  },
  replayMission: {
    en: 'Replay Mission',
    gu: 'ફરીથી રમો',
  },
  useHint: {
    en: 'Use Hint',
    gu: 'સંકેત (Hint) લો',
  },
  hintUsed: {
    en: 'Hint Revealed',
    gu: 'સંકેત બતાવ્યો',
  },
  nextChallenge: {
    en: 'Next Challenge',
    gu: 'આગળનો પડકાર',
  },
  finishMission: {
    en: 'View Mission Summary',
    gu: 'મિશન પરિણામ જુઓ',
  },
  restartMission: {
    en: 'Restart Mission',
    gu: 'મિશન ફરી શરૂ કરો',
  },
  correctBanner: {
    en: 'Correct Assessment',
    gu: 'સાચું વિશ્લેષણ!',
  },
  incorrectBanner: {
    en: 'Needs Closer Inspection',
    gu: 'વધુ ધ્યાનથી તપાસ જરૂરી',
  },
  missionComplete: {
    en: 'Mission Complete',
    gu: 'મિશન પૂર્ણ થયું!',
  },
  scoreEarned: {
    en: 'XP Earned',
    gu: 'મેળવેલ XP',
  },
  missionAccuracy: {
    en: 'Mission Accuracy',
    gu: 'મિશન ચોકસાઈ',
  },
  nextMissionBtn: {
    en: 'Next Mission',
    gu: 'આગળનું મિશન',
  },
  resetProgress: {
    en: 'Reset Progress',
    gu: 'પ્રગતિ રીસેટ કરો',
  },
  confirmReset: {
    en: 'Confirm Reset',
    gu: 'રીસેટ કન્ફર્મ કરો',
  },
  cancel: {
    en: 'Cancel',
    gu: 'રદ કરો',
  },
  close: {
    en: 'Close',
    gu: 'બંધ કરો',
  },
  safetyNotice: {
    en: 'Educational Defensive Simulation · Fictional Examples Only · Local Progress Saved',
    gu: 'શૈક્ષણિક રક્ષણાત્મક સિમ્યુલેશન · માત્ર કાલ્પનિક ઉદાહરણો · પ્રગતિ લોકલ સેવ થાય છે',
  },
  howToPlaySteps: [
    {
      title: { en: '1. Select Difficulty & Language', gu: '૧. કઠિનતા અને ભાષા પસંદ કરો' },
      body: {
        en: 'Switch seamlessly between English and Gujarati (ગુજરાતી) anytime. Higher difficulties award larger XP and streak bonuses.',
        gu: 'ગમે ત્યારે English અને ગુજરાતી વચ્ચે ભાષા બદલો. ઉચ્ચ કઠિનતા (Medium/Hard) વધુ XP અને સ્ટ્રીક બોનસ આપે છે.',
      },
    },
    {
      title: { en: '2. Inspect Before Deciding', gu: '૨. નિર્ણય લેતા પહેલાં તપાસ કરો' },
      body: {
        en: 'Examine URL segments, email senders, code patterns, HTTP headers, and TLS certificate fields carefully. Never assume a URL is safe without sufficient evidence.',
        gu: 'URL ના ભાગો, ઈમેલ મોકલનાર, કોડ પેટર્ન, HTTP Headers અને TLS સર્ટિફિકેટ ધ્યાનથી તપાસો. પૂરતા પુરાવા વગર કોઈ URL ને સંપૂર્ણ સુરક્ષિત ન માનો.',
      },
    },
    {
      title: { en: '3. Earn XP, Streaks & Badges', gu: '૩. XP, સ્ટ્રીક અને બેજ મેળવો' },
      body: {
        en: 'Consecutive correct answers build a Streak Bonus. Using a Hint gives a helpful clue with a small XP deduction. Complete missions sequentially to unlock the Cyber Boss finale.',
        gu: 'સળંગ સાચા જવાબોથી Streak Bonus મળે છે. Hint વાપરવાથી થોડા XP ઓછા થાય છે. આગળના મિશન અનલૉક કરવા દરેક લેવલ પૂર્ણ કરો.',
      },
    },
    {
      title: { en: '4. 100% Safe Defensive Sandbox', gu: '૪. ૧૦૦% સુરક્ષિત શૈક્ષણિક સેન્ડબોક્સ' },
      body: {
        en: 'All login forms, text renderers, and queries run strictly inside safe local simulations using fictional examples.',
        gu: 'બધા લોગિન ફોર્મ, ટેક્સ્ટ રેન્ડરર અને ક્વેરી માત્ર સુરક્ષિત લોકલ સિમ્યુલેશન છે અને કોઈ વાસ્તવિક સિસ્ટમને અસર કરતા નથી.',
      },
    },
  ],
};
