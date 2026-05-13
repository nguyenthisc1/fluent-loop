import type { PracticeSessionEntity } from "../../domain/entities/practice.entity";

export function presentPracticeSession(session: PracticeSessionEntity | null) {
  if (!session) return null;

  return {
    id: session.id,
    userId: session.userId,
    mode: session.mode,
    title: session.title,
    topic: session.topic,
    interviewRole: session.interviewRole,
    interviewType: session.interviewType,
    difficulty: session.difficulty,
    level: session.level,
    duration: session.duration,
    practiceFocus: session.practiceFocus,
    status: session.status,
    isActive: session.isActive(),
    isCompleted: session.isCompleted(),
    messages: session.messages,
    feedbackReport: session.feedbackReport,
    createdAt: session.createdAt,
    completedAt: session.completedAt,
  };
}
