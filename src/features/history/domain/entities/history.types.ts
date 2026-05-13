export type HistoryItemId = string;
export type UserId = string;
export type PracticeSessionId = string;
export type FeedbackReportId = string;

export type HistoryMode = "daily" | "interview";

export type HistoryItemStatus = "active" | "completed";

export type HistoryScore = {
  overall: number;
  fluency?: number;
  grammar?: number;
  vocabulary?: number;
  naturalness?: number;
};

export type HistoryItemProps = {
  id: HistoryItemId;
  userId: UserId;
  sessionId: PracticeSessionId;
  feedbackReportId?: FeedbackReportId;
  mode: HistoryMode;
  status: HistoryItemStatus;
  title: string;
  topic?: string;
  interviewRole?: string;
  durationMinutes: number;
  score?: HistoryScore;
  mainImprovementArea?: string;
  createdAt: Date;
  completedAt?: Date;
};

export type GetHistoryItemsInput = {
  userId: UserId;
  mode?: HistoryMode;
  status?: HistoryItemStatus;
};

export type GetRecentHistoryInput = {
  userId: UserId;
  limit?: number;
};
