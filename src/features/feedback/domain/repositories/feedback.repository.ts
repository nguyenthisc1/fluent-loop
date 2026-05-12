import type { FeedbackReportEntity } from "../entities/feedback.entity";
import type { FeedbackReportId, GetSessionFeedbackInput, MarkFeedbackReviewedInput, UserId } from "../entities/feedback.types";

export interface FeedbackRepository {
  getReport(reportId: FeedbackReportId): Promise<FeedbackReportEntity | null>;
  getSessionFeedback(input: GetSessionFeedbackInput): Promise<FeedbackReportEntity | null>;
  getFeedbackHistory(userId: UserId): Promise<FeedbackReportEntity[]>;
  markReviewed(input: MarkFeedbackReviewedInput): Promise<FeedbackReportEntity>;
}
