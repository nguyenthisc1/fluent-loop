export type PracticeMessageModel = {
  id: string;
  session_id: string;
  sender: "user" | "ai";
  content: string;
  created_at: string;
};

export type FeedbackReportModel = {
  id: string;
  session_id: string;
  score: {
    fluency: number;
    grammar: number;
    vocabulary: number;
    naturalness: number;
    overall: number;
  };
  strengths: string[];
  corrections: Array<{
    original: string;
    corrected: string;
    explanation: string;
  }>;
  better_expressions: string[];
  next_steps: string[];
  created_at: string;
};

export type PracticeSessionModel = {
  id: string;
  user_id: string;
  mode: "daily" | "interview";
  title: string;
  topic: string | null;
  interview_role: string | null;
  level: "A1" | "A2" | "B1" | "B2" | "C1";
  duration: 5 | 10 | 15;
  // practice_focus: string[] | null;
  status: "active" | "completed";
  messages: PracticeMessageModel[];
  feedback_report: FeedbackReportModel | null;
  created_at: string;
  completed_at: string | null;
};
