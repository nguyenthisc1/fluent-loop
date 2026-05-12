import { ConflictException } from "@/core/exceptions/exception";
import type { EnglishLevel } from "@/features/user/domain/entities/user.types";
import type { FeedbackReport, PracticeDuration, PracticeMessage, PracticeMode, PracticeSessionId, PracticeStatus } from "./practice.types";

export type PracticeSessionEntityProps = {
  id: PracticeSessionId;
  userId: string;
  mode: PracticeMode;
  title: string;
  topic?: string;
  interviewRole?: string;
  level: EnglishLevel;
  duration: PracticeDuration;
  // practiceFocus?: PracticeFocus[];
  status: PracticeStatus;
  messages: PracticeMessage[];
  feedbackReport?: FeedbackReport;
  createdAt: Date;
  completedAt?: Date;
};

export class PracticeSessionEntity {
  private constructor(private readonly props: PracticeSessionEntityProps) {}

  static create(props: PracticeSessionEntityProps): PracticeSessionEntity {
    return new PracticeSessionEntity(props);
  }

  get id(): PracticeSessionId {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get mode(): PracticeMode {
    return this.props.mode;
  }

  get title(): string {
    return this.props.title;
  }

  get topic(): string | undefined {
    return this.props.topic;
  }

  get interviewRole(): string | undefined {
    return this.props.interviewRole;
  }

  get level(): EnglishLevel {
    return this.props.level;
  }

  get duration(): PracticeDuration {
    return this.props.duration;
  }

  // get practiceFocus(): PracticeFocus[] | undefined {
  //   return this.props.practiceFocus ? [...this.props.practiceFocus] : undefined;
  // }

  get status(): PracticeStatus {
    return this.props.status;
  }

  get messages(): PracticeMessage[] {
    return [...this.props.messages];
  }

  get feedbackReport(): FeedbackReport | undefined {
    return this.props.feedbackReport;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get completedAt(): Date | undefined {
    return this.props.completedAt;
  }

  isActive(): boolean {
    return this.props.status === "active";
  }

  isCompleted(): boolean {
    return this.props.status === "completed";
  }

  addMessage(message: PracticeMessage): PracticeSessionEntity {
    if (this.isCompleted()) {
      throw new ConflictException("Cannot add message to a completed practice session.");
    }

    return new PracticeSessionEntity({
      ...this.props,
      messages: [...this.props.messages, message],
    });
  }

  complete(feedbackReport?: FeedbackReport, completedAt = new Date()): PracticeSessionEntity {
    if (this.isCompleted()) {
      throw new ConflictException("Practice session is already completed.");
    }

    return new PracticeSessionEntity({
      ...this.props,
      status: "completed",
      feedbackReport: feedbackReport ?? this.props.feedbackReport,
      completedAt,
    });
  }

  toJSON(): PracticeSessionEntityProps {
    return {
      ...this.props,
      messages: [...this.props.messages],
      // practiceFocus: this.practiceFocus,
    };
  }
}
