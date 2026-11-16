import {
  BadgeDefinition,
  BadgeId,
  BossTopic,
  Difficulty,
  MissionId,
  PlayerProgress,
} from '../types/game';

const STORAGE_KEY = 'cyber_quest_progress_v1';

export const MISSION_ORDER: MissionId[] = [
  'url-detective',
  'phishing-hunter',
  'sql-injection',
  'xss-awareness',
  'security-headers',
  'ssl-https',
  'cyber-boss',
];

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'first-mission',
    title: { en: 'First Defense', gu: 'પ્રથમ રક્ષા (First Defense)' },
    description: {
      en: 'Complete your first security mission.',
      gu: 'તમારું પ્રથમ સુરક્ષા મિશન પૂર્ણ કરો.',
    },
  },
  {
    id: 'streak-3',
    title: { en: 'Precision Streak', gu: 'ચોકસાઈ સ્ટ્રીક (3x Streak)' },
    description: {
      en: 'Answer 3 challenges in a row without mistakes.',
      gu: 'ભૂલ વગર સળંગ ૩ પડકારોના સાચા જવાબ આપો.',
    },
  },
  {
    id: 'url-hawk',
    title: { en: 'URL Hawk', gu: 'URL તપાસક (URL Hawk)' },
    description: {
      en: 'Master Level 1: URL Detective.',
      gu: 'લેવલ ૧: URL Detective પૂર્ણ કરો.',
    },
  },
  {
    id: 'phish-buster',
    title: { en: 'Phish Buster', gu: 'ફિશિંગ શિકારી (Phish Buster)' },
    description: {
      en: 'Master Level 2: Phishing Hunter.',
      gu: 'લેવલ ૨: Phishing Hunter પૂર્ણ કરો.',
    },
  },
  {
    id: 'sql-guardian',
    title: { en: 'Query Guardian', gu: 'SQL રક્ષક (Query Guardian)' },
    description: {
      en: 'Master Level 3: SQL Injection Awareness.',
      gu: 'લેવલ ૩: SQL Injection Awareness પૂર્ણ કરો.',
    },
  },
  {
    id: 'xss-shield',
    title: { en: 'Encoding Shield', gu: 'XSS કવચ (Encoding Shield)' },
    description: {
      en: 'Master Level 4: XSS Awareness.',
      gu: 'લેવલ ૪: XSS Awareness પૂર્ણ કરો.',
    },
  },
  {
    id: 'header-architect',
    title: { en: 'Header Architect', gu: 'હેડર આર્કિટેક્ટ (Header Architect)' },
    description: {
      en: 'Master Level 5: Security Headers.',
      gu: 'લેવલ ૫: Security Headers પૂર્ણ કરો.',
    },
  },
  {
    id: 'cert-verifier',
    title: { en: 'TLS Verifier', gu: 'TLS ચકાસણીકર્તા (TLS Verifier)' },
    description: {
      en: 'Master Level 6: SSL & HTTPS Detective.',
      gu: 'લેવલ ૬: SSL & HTTPS Detective પૂર્ણ કરો.',
    },
  },
  {
    id: 'cyber-champion',
    title: { en: 'Cyber Defender', gu: 'સાયબર ચેમ્પિયન (Cyber Defender)' },
    description: {
      en: 'Conquer the Final Level: Cyber Boss.',
      gu: 'અંતિમ લેવલ: Cyber Boss સફળતાપૂર્વક પૂર્ણ કરો.',
    },
  },
];

export function createInitialProgress(): PlayerProgress {
  return {
    xp: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    bestStreak: 0,
    unlockedBadges: [],
    missions: {
      'url-detective': { completed: false, bestScore: 0, bestAccuracy: 0, attempts: 0 },
      'phishing-hunter': { completed: false, bestScore: 0, bestAccuracy: 0, attempts: 0 },
      'sql-injection': { completed: false, bestScore: 0, bestAccuracy: 0, attempts: 0 },
      'xss-awareness': { completed: false, bestScore: 0, bestAccuracy: 0, attempts: 0 },
      'security-headers': { completed: false, bestScore: 0, bestAccuracy: 0, attempts: 0 },
      'ssl-https': { completed: false, bestScore: 0, bestAccuracy: 0, attempts: 0 },
      'cyber-boss': { completed: false, bestScore: 0, bestAccuracy: 0, attempts: 0 },
    },
    topicStats: {
      'URL Security': { correct: 0, total: 0 },
      'Phishing Defense': { correct: 0, total: 0 },
      'SQL Injection': { correct: 0, total: 0 },
      'XSS Prevention': { correct: 0, total: 0 },
      'Security Headers': { correct: 0, total: 0 },
      'SSL & HTTPS': { correct: 0, total: 0 },
    },
    language: 'en',
    difficulty: 'medium',
    muted: false,
  };
}

export function loadProgress(): PlayerProgress {
  const fallback = createInitialProgress();
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PlayerProgress>;
    return {
      ...fallback,
      ...parsed,
      missions: {
        ...fallback.missions,
        ...(parsed.missions || {}),
      },
      topicStats: {
        ...fallback.topicStats,
        ...(parsed.topicStats || {}),
      },
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
    };
  } catch {
    return fallback;
  }
}

export function saveProgress(progress: PlayerProgress): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore quota errors cleanly
  }
}

export function resetProgressStorage(): PlayerProgress {
  const fresh = createInitialProgress();
  saveProgress(fresh);
  return fresh;
}

export function getPlayerLevel(xp: number): {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
  rankEn: string;
  rankGu: string;
} {
  const xpPerLevel = 450;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXp = xp % xpPerLevel;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / xpPerLevel) * 100));

  const ranks = [
    { en: 'Cadet Analyst', gu: 'કેડેટ વિશ્લેષક' },
    { en: 'Threat Scout', gu: 'થ્રેટ સ્કાઉટ' },
    { en: 'Packet Inspector', gu: 'પેકેટ નિરીક્ષક' },
    { en: 'Shield Specialist', gu: 'શીલ્ડ નિષ્ણાત' },
    { en: 'Defense Architect', gu: 'સુરક્ષા આર્કિટેક્ટ' },
    { en: 'Cyber Sentinel', gu: 'સાયબર સેન્ટિનલ' },
  ];
  const rank = ranks[Math.min(ranks.length - 1, level - 1)];

  return {
    level,
    currentLevelXp,
    nextLevelXp: xpPerLevel,
    progressPercent,
    rankEn: rank.en,
    rankGu: rank.gu,
  };
}

export function isMissionUnlocked(progress: PlayerProgress, missionId: MissionId): boolean {
  const idx = MISSION_ORDER.indexOf(missionId);
  if (idx <= 0) return true;
  const prevId = MISSION_ORDER[idx - 1];
  return Boolean(progress.missions[prevId]?.completed);
}

export function getDifficultyConfig(difficulty: Difficulty): {
  baseXp: number;
  streakBonus: number;
  hintPenalty: number;
  multiplierLabel: string;
} {
  switch (difficulty) {
    case 'easy':
      return { baseXp: 80, streakBonus: 15, hintPenalty: 10, multiplierLabel: '1.0x' };
    case 'hard':
      return { baseXp: 150, streakBonus: 35, hintPenalty: 25, multiplierLabel: '1.8x' };
    case 'medium':
    default:
      return { baseXp: 110, streakBonus: 25, hintPenalty: 15, multiplierLabel: '1.4x' };
  }
}

export function evaluateNewBadges(
  progress: PlayerProgress,
  runBestStreak: number
): BadgeId[] {
  const unlocked = new Set<BadgeId>(progress.unlockedBadges);

  const anyCompleted = Object.values(progress.missions).some((m) => m.completed);
  if (anyCompleted) unlocked.add('first-mission');
  if (progress.bestStreak >= 3 || runBestStreak >= 3) unlocked.add('streak-3');
  if (progress.missions['url-detective'].completed) unlocked.add('url-hawk');
  if (progress.missions['phishing-hunter'].completed) unlocked.add('phish-buster');
  if (progress.missions['sql-injection'].completed) unlocked.add('sql-guardian');
  if (progress.missions['xss-awareness'].completed) unlocked.add('xss-shield');
  if (progress.missions['security-headers'].completed) unlocked.add('header-architect');
  if (progress.missions['ssl-https'].completed) unlocked.add('cert-verifier');
  if (progress.missions['cyber-boss'].completed) unlocked.add('cyber-champion');

  return Array.from(unlocked);
}

export function getMissionTopic(missionId: MissionId): BossTopic | null {
  switch (missionId) {
    case 'url-detective':
      return 'URL Security';
    case 'phishing-hunter':
      return 'Phishing Defense';
    case 'sql-injection':
      return 'SQL Injection';
    case 'xss-awareness':
      return 'XSS Prevention';
    case 'security-headers':
      return 'Security Headers';
    case 'ssl-https':
      return 'SSL & HTTPS';
    default:
      return null;
  }
}
