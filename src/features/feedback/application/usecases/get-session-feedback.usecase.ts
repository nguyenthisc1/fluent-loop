import type { FeedbackReportEntity } from "../../domain/entities/feedback.entity";
import type { GetSessionFeedbackInput } from "../../domain/entities/feedback.types";
import type { FeedbackService } from "../services/feedback.service";

export class GetSessionFeedbackUseCase {
  constructor(private readonly feedbackService: FeedbackService) {}

  execute(input: GetSessionFeedbackInput): Promise<FeedbackReportEntity | null> {
    return this.feedbackService.getSessionFeedback(input);
  }
}
