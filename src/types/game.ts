export type Language = 'en' | 'gu';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameView = 'TITLE' | 'HUB' | 'MISSION';

export type MissionId =
  | 'url-detective'
  | 'phishing-hunter'
  | 'sql-injection'
  | 'xss-awareness'
  | 'security-headers'
  | 'ssl-https'
  | 'cyber-boss';

export interface BilingualText {
  en: string;
  gu: string;
}

export interface UrlChallenge {
  id: string;
  url: string;
  protocol: string;
  subdomain: string;
  domain: string;
  path: string;
  isSuspicious: boolean;
  clues: BilingualText[];
  hint: BilingualText;
  explanation: BilingualText;
}

export interface PhishingOption {
  id: string;
  label: BilingualText;
}

export interface PhishingChallenge {
  id: string;
  channel: 'Email' | 'SMS';
  senderName: string;
  senderAddress: string;
  subject: BilingualText;
  body: BilingualText;
  linkLabel: string;
  linkPreviewUrl: string;
  question: BilingualText;
  options: PhishingOption[];
  correctOptionId: string;
  hint: BilingualText;
  explanation: BilingualText;
}

export interface SqlChallenge {
  id: string;
  scenarioTitle: BilingualText;
  sampleInputUsername: string;
  sampleInputPassword: string;
  unsafePattern: string;
  safePattern: string;
  question: BilingualText;
  options: { id: string; label: BilingualText }[];
  correctOptionId: string;
  hint: BilingualText;
  explanation: BilingualText;
}

export interface XssChallenge {
  id: string;
  scenarioTitle: BilingualText;
  sampleInput: string;
  unsafeRenderDescription: BilingualText;
  safeEncodedOutput: string;
  question: BilingualText;
  options: { id: string; label: BilingualText }[];
  correctOptionId: string;
  hint: BilingualText;
  explanation: BilingualText;
}

export interface HeaderMatchChallenge {
  id: string;
  scenario: BilingualText;
  threatExample: BilingualText;
  options: {
    id: string;
    headerName: string;
    headerValue: string;
  }[];
  correctHeaderId: string;
  hint: BilingualText;
  explanation: BilingualText;
}

export interface SslChallenge {
  id: string;
  siteUrl: string;
  hasPadlock: boolean;
  protocol: string;
  issuer: string;
  subjectDomain: string;
  validStatus: 'Valid' | 'Expired' | 'Domain Mismatch';
  trustNote: BilingualText;
  question: BilingualText;
  options: { id: string; label: BilingualText }[];
  correctOptionId: string;
  hint: BilingualText;
  explanation: BilingualText;
}

export type BossTopic =
  | 'URL Security'
  | 'Phishing Defense'
  | 'SQL Injection'
  | 'XSS Prevention'
  | 'Security Headers'
  | 'SSL & HTTPS';

export interface BossQuestion {
  id: string;
  topic: BossTopic;
  topicGu: string;
  snippet?: string;
  question: BilingualText;
  options: { id: string; label: BilingualText }[];
  correctOptionId: string;
  hint: BilingualText;
  explanation: BilingualText;
}

export interface MissionMeta {
  id: MissionId;
  levelNumber: number;
  title: BilingualText;
  shortTitle: BilingualText;
  subtitle: BilingualText;
  topicLabel: string;
  topicLabelGu: string;
  totalQuestions: number;
}

export interface MissionResultRecord {
  completed: boolean;
  bestScore: number;
  bestAccuracy: number;
  attempts: number;
  lastCompletedAt?: string;
}

export type BadgeId =
  | 'first-mission'
  | 'streak-3'
  | 'url-hawk'
  | 'phish-buster'
  | 'sql-guardian'
  | 'xss-shield'
  | 'header-architect'
  | 'cert-verifier'
  | 'cyber-champion';

export interface BadgeDefinition {
  id: BadgeId;
  title: BilingualText;
  description: BilingualText;
}

export interface TopicAccuracyStat {
  correct: number;
  total: number;
}

export interface PlayerProgress {
  xp: number;
  totalCorrect: number;
  totalAnswered: number;
  bestStreak: number;
  unlockedBadges: BadgeId[];
  missions: Record<MissionId, MissionResultRecord>;
  topicStats: Record<BossTopic, TopicAccuracyStat>;
  language: Language;
  difficulty: Difficulty;
  muted: boolean;
}
