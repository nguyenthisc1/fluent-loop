import type { FeedbackReportEntity } from "../../domain/entities/feedback.entity";
import type { MarkFeedbackReviewedInput } from "../../domain/entities/feedback.types";
import type { FeedbackService } from "../services/feedback.service";

export class MarkFeedbackReviewedUseCase {
  constructor(private readonly feedbackService: FeedbackService) {}

  execute(input: MarkFeedbackReviewedInput): Promise<FeedbackReportEntity> {
    return this.feedbackService.markReviewed(input);
  }
}
