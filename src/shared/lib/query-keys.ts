export const queryKeys = {
  dashboard: {
    summary: (userId: string) => ["dashboard", "summary", userId] as const,
  },
  history: {
    list: (userId: string) => ["history", "list", userId] as const,
    recent: (userId: string) => ["history", "recent", userId] as const,
  },
  feedback: {
    report: (reportId: string) => ["feedback", "report", reportId] as const,
    session: (sessionId: string) => ["feedback", "session", sessionId] as const,
    history: (userId: string) => ["feedback", "history", userId] as const,
  },
  vocabulary: {
    list: (userId: string) => ["vocabulary", "list", userId] as const,
  },
  practice: {
    session: (sessionId: string) => ["practice", "session", sessionId] as const,
    history: (userId: string) => ["practice", "history", userId] as const,
  },
};
