export type PracticeSessionId = string;
export type PracticeMode = "daily" | "interview";
export type PracticeStatus = "active" | "completed";
export type MessageSender = "user" | "ai";
export type PracticeDuration = 5 | 10 | 15;

export type PracticeMessage = {
  id: string;
  sessionId: PracticeSessionId;
  sender: MessageSender;
  content: string;
  createdAt: Date;
};

export type FeedbackScore = {
  fluency: number;
  grammar: number;
  vocabulary: number;
  naturalness: number;
  overall: number;
};

export type FeedbackCorrection = {
  original: string;
  corrected: string;
  explanation: string;
};

export type FeedbackReport = {
  id: string;
  sessionId: PracticeSessionId;
  score: FeedbackScore;
  strengths: string[];
  corrections: FeedbackCorrection[];
  betterExpressions: string[];
  nextSteps: string[];
  createdAt: Date;
};

export type PracticeSession = {
  id: PracticeSessionId;
  userId: string;
  mode: PracticeMode;
  title: string;
  topic?: string;
  interviewRole?: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1";
  duration: PracticeDuration;
  status: PracticeStatus;
  messages: PracticeMessage[];
  feedbackReport?: FeedbackReport;
  createdAt: Date;
  completedAt?: Date;
};

export type StartPracticeSessionInput = {
  userId: string;
  mode: PracticeMode;
  level: PracticeSession["level"];
  duration: PracticeDuration;
  topic?: string;
  interviewRole?: string;
};

export type SendPracticeMessageInput = {
  sessionId: PracticeSessionId;
  content: string;
};

export type FinishPracticeSessionInput = {
  sessionId: PracticeSessionId;
};
