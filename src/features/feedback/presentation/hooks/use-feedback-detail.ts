import { queryKeys } from "@/shared/lib/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { createFeedbackDependencies } from "../../feedback.container";
import { presentFeedbackReport } from "../helpers/feedback-report.presenter";

export function useFeedbackDetail() {
  const { reportId } = useParams<{ reportId: string }>();
  const queryClient = useQueryClient();
  const feedbackContainer = createFeedbackDependencies();

  const reportQuery = useQuery({
    queryKey: reportId ? queryKeys.feedback.report(reportId) : ["feedback", "report", "empty"],
    enabled: !!reportId,
    queryFn: async () => {
      if (!reportId) {
        throw new Error("Feedback report id is required.");
      }

      const report = await feedbackContainer.getFeedbackReportUseCase.execute(reportId);
      return presentFeedbackReport(report);
    },
  });

  const markReviewedMutation = useMutation({
    mutationFn: async () => {
      if (!reportId) {
        throw new Error("Feedback report id is required.");
      }

      const report = await feedbackContainer.markFeedbackReviewedUseCase.execute({ reportId });
      return presentFeedbackReport(report);
    },
    onSuccess: () => {
      if (!reportId) return;

      queryClient.invalidateQueries({
        queryKey: queryKeys.feedback.report(reportId),
      });
    },
  });

  return {
    reportId,
    report: reportQuery.data ?? null,
    loading: reportQuery.isLoading,
    error: reportQuery.error,
    refetch: reportQuery.refetch,
    markReviewed: markReviewedMutation.mutateAsync,
    markingReviewed: markReviewedMutation.isPending,
  };
}
