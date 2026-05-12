export type UserId = string;

export type DashboardPracticeMode = "daily" | "interview";

export type DashboardRecommendedPractice = {
  title: string;
  description: string;
  mode: DashboardPracticeMode;
  estimatedMinutes: number;
  focus: string;
};

export type DashboardProgressOverview = {
  weeklyStreak: number;
  sessionsCompleted: number;
  practiceMinutesThisWeek: number;
  averageScore: number;
};

export type DashboardRecentSession = {
  id: string;
  title: string;
  mode: DashboardPracticeMode;
  score?: number;
  completedAt?: Date;
};

export type DashboardVocabularyPreviewItem = {
  id: string;
  term: string;
  meaning: string;
};

export type DashboardSummaryProps = {
  userId: UserId;
  displayName: string;
  englishLevel?: string;
  learningGoal?: string;
  recommendedPractice: DashboardRecommendedPractice;
  progress: DashboardProgressOverview;
  recentSessions: DashboardRecentSession[];
  vocabularyPreview: DashboardVocabularyPreviewItem[];
  createdAt: Date;
};

export type GetDashboardSummaryInput = {
  userId: UserId;
};
