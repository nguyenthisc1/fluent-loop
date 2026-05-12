import { DashboardSummaryEntity } from "../../domain/entities/dashboard-summary.entity";

export const mockDashboardSummary = DashboardSummaryEntity.create({
  userId: "mock-user-id",
  displayName: "Thi Nguyen",
  englishLevel: "B1",
  learningGoal: "job_interview",
  recommendedPractice: {
    title: "Frontend interview warm-up",
    description: "Practice a short self-introduction and one follow-up question.",
    mode: "interview",
    estimatedMinutes: 10,
    focus: "Interview confidence",
  },
  progress: {
    weeklyStreak: 4,
    sessionsCompleted: 12,
    practiceMinutesThisWeek: 85,
    averageScore: 79,
  },
  recentSessions: [
    {
      id: "session-1",
      title: "Frontend Developer Interview",
      mode: "interview",
      score: 79,
      completedAt: new Date("2026-01-02T10:10:00.000Z"),
    },
    {
      id: "session-2",
      title: "Small Talk Practice",
      mode: "daily",
      score: 84,
      completedAt: new Date("2026-01-01T09:05:00.000Z"),
    },
  ],
  vocabularyPreview: [
    {
      id: "vocab-1",
      term: "collaborate",
      meaning: "to work together with others",
    },
    {
      id: "vocab-2",
      term: "clarify",
      meaning: "to make something easier to understand",
    },
  ],
  createdAt: new Date("2026-01-02T12:00:00.000Z"),
});
