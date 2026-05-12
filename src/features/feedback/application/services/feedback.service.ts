import type { FeedbackReportId, GetSessionFeedbackInput, MarkFeedbackReviewedInput, UserId } from "../../domain/entities/feedback.types";
import type { FeedbackRepository } from "../../domain/repositories/feedback.repository";

export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  getReport(reportId: FeedbackReportId) {
    return this.feedbackRepository.getReport(reportId);
  }

  getSessionFeedback(input: GetSessionFeedbackInput) {
    return this.feedbackRepository.getSessionFeedback(input);
  }

  getFeedbackHistory(userId: UserId) {
    return this.feedbackRepository.getFeedbackHistory(userId);
  }

  markReviewed(input: MarkFeedbackReviewedInput) {
    return this.feedbackRepository.markReviewed(input);
  }
}
