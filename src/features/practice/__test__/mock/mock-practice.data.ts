import { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { FeedbackReport, PracticeMessage } from "../../domain/entities/practice.types";

export const mockPracticeSessionId = "mock-practice-session-id";
export const mockPracticeUserId = "mock-user-id";

export const mockOpeningMessage: PracticeMessage = {
  id: "mock-message-ai-1",
  sessionId: mockPracticeSessionId,
  sender: "ai",
  content: "Let's practice a job interview. Tell me about yourself.",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

export const mockFeedbackReport: FeedbackReport = {
  id: "mock-feedback-report-id",
  sessionId: mockPracticeSessionId,
  score: {
    fluency: 78,
    grammar: 82,
    vocabulary: 75,
    naturalness: 80,
    overall: 79,
  },
  strengths: ["Clear intent", "Good basic structure", "Relevant answers"],
  corrections: [
    {
      original: "I am interesting in this job.",
      corrected: "I am interested in this job.",
      explanation: "Use 'interested in' to describe your feeling.",
    },
  ],
  betterExpressions: ["From my experience...", "Could you clarify...?", "I would approach it by..."],
  nextSteps: ["Practice shorter answers", "Use more specific examples", "Review interview phrases"],
  createdAt: new Date("2026-01-01T00:10:00.000Z"),
};

export const mockPracticeSession = PracticeSessionEntity.create({
  id: mockPracticeSessionId,
  userId: mockPracticeUserId,
  mode: "interview",
  title: "Frontend Developer Interview",
  interviewRole: "Frontend Developer",
  level: "B1",
  duration: 10,
  // practiceFocus: ["speaking_fluency", "interview_confidence"],
  status: "active",
  messages: [mockOpeningMessage],
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
});
