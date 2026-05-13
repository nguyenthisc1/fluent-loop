import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/query-keys";
import { createFeedbackDependencies } from "@/features/feedback/feedback.container";

export function useFeedbackReport(reportId?: string) {
  const feedbackContainer = createFeedbackDependencies();

  return useQuery({
    queryKey: reportId ? queryKeys.feedback.report(reportId) : ["feedback", "report", "empty"],
    enabled: !!reportId,
    queryFn: async () => {
      if (!reportId) {
        throw new Error("Report id is required.");
      }

      return feedbackContainer.getFeedbackReportUseCase.execute(reportId);
    },
  });
}

export function useSessionFeedback(sessionId?: string) {
  const feedbackContainer = createFeedbackDependencies();

  return useQuery({
    queryKey: sessionId ? queryKeys.feedback.session(sessionId) : ["feedback", "session", "empty"],
    enabled: !!sessionId,
    queryFn: async () => {
      if (!sessionId) {
        throw new Error("Session id is required.");
      }

      return feedbackContainer.getSessionFeedbackUseCase.execute({ sessionId });
    },
  });
}

export function useMarkFeedbackReviewed() {
  const queryClient = useQueryClient();
  const feedbackContainer = createFeedbackDependencies();

  return useMutation({
    mutationFn: (reportId: string) => feedbackContainer.markFeedbackReviewedUseCase.execute({ reportId }),
    onSuccess: (report) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.feedback.report(report.id),
      });
    },
  });
}
