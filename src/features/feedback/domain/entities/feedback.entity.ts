import { ConflictException } from "@/core/exceptions/exception";
import type { FeedbackReportProps } from "./feedback.types";

export class FeedbackReportEntity {
  private constructor(private readonly props: FeedbackReportProps) {}

  static create(props: FeedbackReportProps): FeedbackReportEntity {
    return new FeedbackReportEntity(props);
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get sessionId() {
    return this.props.sessionId;
  }

  get status() {
    return this.props.status;
  }

  get score() {
    return this.props.score;
  }

  get strengths() {
    return [...this.props.strengths];
  }

  get corrections() {
    return [...this.props.corrections];
  }

  get betterExpressions() {
    return [...this.props.betterExpressions];
  }

  get suggestedVocabulary() {
    return [...this.props.suggestedVocabulary];
  }

  get nextSteps() {
    return [...this.props.nextSteps];
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get reviewedAt() {
    return this.props.reviewedAt;
  }

  isReviewed(): boolean {
    return this.props.status === "reviewed";
  }

  markReviewed(reviewedAt = new Date()): FeedbackReportEntity {
    if (this.isReviewed()) {
      throw new ConflictException("Feedback report is already reviewed.");
    }

    return new FeedbackReportEntity({
      ...this.props,
      status: "reviewed",
      reviewedAt,
    });
  }

  toJSON(): FeedbackReportProps {
    return {
      ...this.props,
      strengths: [...this.props.strengths],
      corrections: [...this.props.corrections],
      betterExpressions: [...this.props.betterExpressions],
      suggestedVocabulary: [...this.props.suggestedVocabulary],
      nextSteps: [...this.props.nextSteps],
    };
  }
}
