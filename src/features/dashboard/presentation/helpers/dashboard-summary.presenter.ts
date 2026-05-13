import type { DashboardSummaryEntity } from "../../domain/entities/dashboard-summary.entity";

export function presentDashboardSummary(summary: DashboardSummaryEntity | null) {
  if (!summary) return null;

  return {
    userId: summary.userId,
    displayName: summary.displayName,
    englishLevel: summary.englishLevel,
    learningGoal: summary.learningGoal,
    recommendedPractice: summary.recommendedPractice,
    progress: summary.progress,
    recentSessions: summary.recentSessions,
    vocabularyPreview: summary.vocabularyPreview,
    hasRecentSessions: summary.hasRecentSessions(),
    hasVocabularyPreview: summary.hasVocabularyPreview(),
    createdAt: summary.createdAt,
  };
}
