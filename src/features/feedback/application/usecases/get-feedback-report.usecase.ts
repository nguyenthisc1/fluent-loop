import type { FeedbackReportEntity } from "../../domain/entities/feedback.entity";
import type { FeedbackReportId } from "../../domain/entities/feedback.types";
import type { FeedbackService } from "../services/feedback.service";

export class GetFeedbackReportUseCase {
  constructor(private readonly feedbackService: FeedbackService) {}

  execute(reportId: FeedbackReportId): Promise<FeedbackReportEntity | null> {
    return this.feedbackService.getReport(reportId);
  }
}
