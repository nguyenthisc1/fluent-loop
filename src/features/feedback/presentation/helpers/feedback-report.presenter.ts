import type { FeedbackReportEntity } from "../../domain/entities/feedback.entity";

export function presentFeedbackReport(report: FeedbackReportEntity | null) {
  if (!report) return null;

  return {
    id: report.id,
    userId: report.userId,
    sessionId: report.sessionId,
    status: report.status,
    score: report.score,
    strengths: report.strengths,
    corrections: report.corrections,
    betterExpressions: report.betterExpressions,
    suggestedVocabulary: report.suggestedVocabulary,
    nextSteps: report.nextSteps,
    isReviewed: report.isReviewed(),
    createdAt: report.createdAt,
    reviewedAt: report.reviewedAt,
  };
}
