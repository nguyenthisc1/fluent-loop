export type HistoryItemModel = {
  id: string;
  user_id: string;
  session_id: string;
  feedback_report_id: string | null;
  mode: "daily" | "interview";
  status: "active" | "completed";
  title: string;
  topic: string | null;
  interview_role: string | null;
  duration_minutes: number;
  score: {
    overall: number;
    fluency?: number;
    grammar?: number;
    vocabulary?: number;
    naturalness?: number;
  } | null;
  main_improvement_area: string | null;
  created_at: string;
  completed_at: string | null;
};
