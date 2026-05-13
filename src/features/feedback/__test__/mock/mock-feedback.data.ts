import { FeedbackReportEntity } from "../../domain/entities/feedback.entity";

export const mockFeedbackReport = FeedbackReportEntity.create({
  id: "mock-feedback-report-id",
  userId: "mock-user-id",
  sessionId: "mock-practice-session-id",
  status: "new",
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
      id: "correction-1",
      original: "I am interesting in this job.",
      corrected: "I am interested in this job.",
      explanation: "Use 'interested in' to describe your feeling.",
    },
  ],
  betterExpressions: [
    {
      id: "expression-1",
      original: "I want this job",
      expression: "I am excited about this opportunity",
      usageNote: "This sounds more professional in interviews.",
    },
  ],
  suggestedVocabulary: [
    {
      id: "vocab-1",
      term: "collaborate",
      meaning: "to work together with others",
      example: "I collaborated with designers to improve the user experience.",
    },
  ],
  nextSteps: [
    {
      id: "next-step-1",
      title: "Practice structured answers",
      description: "Use the STAR method for behavioral interview questions.",
    },
  ],
  createdAt: new Date("2026-01-01T00:10:00.000Z"),
});
