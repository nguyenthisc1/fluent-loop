export type DashboardSummaryModel = {
  user_id: string;
  display_name: string;
  english_level: string | null;
  learning_goal: string | null;
  recommended_practice: {
    title: string;
    description: string;
    mode: "daily" | "interview";
    estimated_minutes: number;
    focus: string;
  };
  progress: {
    weekly_streak: number;
    sessions_completed: number;
    practice_minutes_this_week: number;
    average_score: number;
  };
  recent_sessions: Array<{
    id: string;
    title: string;
    mode: "daily" | "interview";
    score?: number | null;
    completed_at?: string | null;
  }>;
  vocabulary_preview: Array<{
    id: string;
    term: string;
    meaning: string;
  }>;
  created_at: string;
};
