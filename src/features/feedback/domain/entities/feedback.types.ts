export type FeedbackReportId = string;
export type PracticeSessionId = string;
export type UserId = string;

export type FeedbackStatus = "new" | "reviewed";

export type FeedbackScore = {
  fluency: number;
  grammar: number;
  vocabulary: number;
  naturalness: number;
  overall: number;
};

export type FeedbackCorrection = {
  id: string;
  original: string;
  corrected: string;
  explanation: string;
};

export type BetterExpression = {
  id: string;
  original?: string;
  expression: string;
  usageNote: string;
};

export type SuggestedVocabulary = {
  id: string;
  term: string;
  meaning: string;
  example: string;
};

export type FeedbackNextStep = {
  id: string;
  title: string;
  description: string;
};

export type FeedbackReportProps = {
  id: FeedbackReportId;
  userId: UserId;
  sessionId: PracticeSessionId;
  status: FeedbackStatus;
  score: FeedbackScore;
  strengths: string[];
  corrections: FeedbackCorrection[];
  betterExpressions: BetterExpression[];
  suggestedVocabulary: SuggestedVocabulary[];
  nextSteps: FeedbackNextStep[];
  createdAt: Date;
  reviewedAt?: Date;
};

export type GetFeedbackReportInput = {
  reportId: FeedbackReportId;
};

export type GetSessionFeedbackInput = {
  sessionId: PracticeSessionId;
};

export type MarkFeedbackReviewedInput = {
  reportId: FeedbackReportId;
};
