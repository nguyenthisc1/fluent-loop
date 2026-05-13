import type { FeedbackReportEntity } from "../../domain/entities/feedback.entity";
import type { UserId } from "../../domain/entities/feedback.types";
import type { FeedbackService } from "../services/feedback.service";

export class GetFeedbackHistoryUseCase {
  constructor(private readonly feedbackService: FeedbackService) {}

  execute(userId: UserId): Promise<FeedbackReportEntity[]> {
    return this.feedbackService.getFeedbackHistory(userId);
  }
}
