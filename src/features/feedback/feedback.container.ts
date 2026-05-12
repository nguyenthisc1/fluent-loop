import { MockFeedbackRepository } from "./__test__/mock/mock-feedback.repository";
import { FeedbackService } from "./application/services/feedback.service";
import { GetFeedbackHistoryUseCase } from "./application/usecases/get-feedback-history.usecase";
import { GetFeedbackReportUseCase } from "./application/usecases/get-feedback-report.usecase";
import { GetSessionFeedbackUseCase } from "./application/usecases/get-session-feedback.usecase";
import { MarkFeedbackReviewedUseCase } from "./application/usecases/mark-feedback-reviewed.usecase";
import type { FeedbackRepository } from "./domain/repositories/feedback.repository";

export type FeedbackDependencies = {
  feedbackRepository: FeedbackRepository;
  feedbackService: FeedbackService;
  getFeedbackReportUseCase: GetFeedbackReportUseCase;
  getSessionFeedbackUseCase: GetSessionFeedbackUseCase;
  getFeedbackHistoryUseCase: GetFeedbackHistoryUseCase;
  markFeedbackReviewedUseCase: MarkFeedbackReviewedUseCase;
};

export function createFeedbackDependencies(): FeedbackDependencies {
  const feedbackRepository = new MockFeedbackRepository();
  const feedbackService = new FeedbackService(feedbackRepository);

  return {
    feedbackRepository,
    feedbackService,
    getFeedbackReportUseCase: new GetFeedbackReportUseCase(feedbackService),
    getSessionFeedbackUseCase: new GetSessionFeedbackUseCase(feedbackService),
    getFeedbackHistoryUseCase: new GetFeedbackHistoryUseCase(feedbackService),
    markFeedbackReviewedUseCase: new MarkFeedbackReviewedUseCase(feedbackService),
  };
}
