export type VocabularyItemModel = {
  id: string;
  user_id: string;
  term: string;
  meaning: string;
  example: string;
  note: string | null;
  status: "new" | "practicing" | "learned";
  source_session_id: string | null;
  source_feedback_report_id: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
  learned_at: string | null;
};
