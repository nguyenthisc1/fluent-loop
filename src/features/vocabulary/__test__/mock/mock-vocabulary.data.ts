import { VocabularyItemEntity } from "../../domain/entities/vocabulary.entity";

export const mockVocabularyItem = VocabularyItemEntity.create({
  id: "mock-vocabulary-item-id",
  userId: "mock-user-id",
  term: "collaborate",
  meaning: "to work together with others",
  example: "I collaborated with designers to improve the user experience.",
  note: "Useful for interview answers.",
  status: "new",
  source: {
    sessionId: "mock-practice-session-id",
    feedbackReportId: "mock-feedback-report-id",
  },
  tags: ["interview", "work"],
  createdAt: new Date("2026-01-01T00:15:00.000Z"),
  updatedAt: new Date("2026-01-01T00:15:00.000Z"),
});
