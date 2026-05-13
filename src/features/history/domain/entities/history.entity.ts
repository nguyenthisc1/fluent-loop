import type { HistoryItemProps } from "./history.types";

export class HistoryItemEntity {
  private constructor(private readonly props: HistoryItemProps) {}

  static create(props: HistoryItemProps): HistoryItemEntity {
    return new HistoryItemEntity(props);
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

  get feedbackReportId() {
    return this.props.feedbackReportId;
  }

  get mode() {
    return this.props.mode;
  }

  get status() {
    return this.props.status;
  }

  get title() {
    return this.props.title;
  }

  get topic() {
    return this.props.topic;
  }

  get interviewRole() {
    return this.props.interviewRole;
  }

  get durationMinutes() {
    return this.props.durationMinutes;
  }

  get score() {
    return this.props.score;
  }

  get mainImprovementArea() {
    return this.props.mainImprovementArea;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get completedAt() {
    return this.props.completedAt;
  }

  isInterview(): boolean {
    return this.props.mode === "interview";
  }

  isDailyPractice(): boolean {
    return this.props.mode === "daily";
  }

  isCompleted(): boolean {
    return this.props.status === "completed";
  }

  hasFeedback(): boolean {
    return !!this.props.feedbackReportId;
  }

  toJSON(): HistoryItemProps {
    return { ...this.props };
  }
}
