import type { HistoryItemEntity } from "../../domain/entities/history.entity";

export function presentHistoryItem(item: HistoryItemEntity | null) {
  if (!item) return null;

  return {
    id: item.id,
    userId: item.userId,
    sessionId: item.sessionId,
    feedbackReportId: item.feedbackReportId,
    mode: item.mode,
    status: item.status,
    title: item.title,
    topic: item.topic,
    interviewRole: item.interviewRole,
    durationMinutes: item.durationMinutes,
    score: item.score,
    mainImprovementArea: item.mainImprovementArea,
    createdAt: item.createdAt,
    completedAt: item.completedAt,
    isInterview: item.isInterview(),
    isDailyPractice: item.isDailyPractice(),
    isCompleted: item.isCompleted(),
    hasFeedback: item.hasFeedback(),
  };
}
