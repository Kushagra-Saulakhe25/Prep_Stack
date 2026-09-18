export type NavTab = 'dashboard' | 'learn' | 'companies' | 'tests' | 'profile';

export type SubScreen =
  | { type: 'main' }
  | { type: 'topic-detail'; topicId: string }
  | { type: 'company-detail'; companyId: string }
  | { type: 'company-topic-breakdown'; companyId: string; topicId: string }
  | { type: 'problem-workspace'; problemId: string }
  | { type: 'mock-test'; companyId?: string };

export interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tag: string;
  accuracy: string;
  status: 'solved' | 'in-progress' | 'pending';
  companies: string[];
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  starterCode: {
    python: string;
    java: string;
    cpp: string;
  };
  solutionHint: string;
}

export interface TopicModule {
  id: string;
  title: string;
  track: 'dsa' | 'aptitude' | 'system-design' | 'core-cs';
  badge: string;
  badgeType: 'secondary' | 'primary' | 'tertiary' | 'default';
  totalProblems: number;
  completedProblems: number;
  companies: string[];
  description: string;
  estHoursRemaining: number;
  avgAccuracy: number;
  problems: Problem[];
}

export interface CompanyHiringTrack {
  id: string;
  name: string;
  logo: string;
  industry: string;
  role: string;
  difficulty: 'High' | 'Medium' | 'Very High';
  avgCtc: string;
  patternMatch: number;
  cohortMatch: number;
  description: string;
  rounds: Array<{
    number: number;
    title: string;
    type: 'completed' | 'active' | 'locked';
    scoreBadge?: string;
    currentFocusBadge?: string;
    summary: string;
    duration: string;
    statusText: string;
  }>;
  studyAssets: Array<{
    id: string;
    title: string;
    subtitle: string;
    solvedText: string;
    icon: string;
  }>;
  patternOverview?: {
    frequency: string;
    targetPace: string;
    avgDiff: string;
    questionMix: { easy: number; medium: number; hard: number };
    advisoryPill: string;
    vibePoints: Array<{
      title: string;
      description: string;
      icon: string;
      color: string;
    }>;
    testedPatterns: Array<{
      title: string;
      description: string;
      matchPercentage: number;
      problems: Array<{ title: string; diff: 'Easy' | 'Med' | 'Hard' }>;
    }>;
    recentTrend: {
      tag: string;
      body: string;
      insight: string;
    };
  };
}

export interface UserProfile {
  name: string;
  role: string;
  targetGoal: string;
  overallReadiness: number;
  dsaReadiness: number;
  systemAptitudeReadiness: number;
  solvedCount: number;
  streakDays: number;
  mocksDone: number;
  avatarUrl: string;
  email: string;
  subscriptionTier: string;
  planRenewal: string;
}
