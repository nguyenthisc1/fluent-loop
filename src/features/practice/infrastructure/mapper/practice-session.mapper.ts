import type { Mapper } from "@/core/infrastructure/mapper/mapper";
import { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { FeedbackReport, PracticeMessage } from "../../domain/entities/practice.types";
import type { FeedbackReportModel, PracticeMessageModel, PracticeSessionModel } from "../models/practice-session.model";

export class PracticeSessionMapper implements Mapper<PracticeSessionModel, PracticeSessionEntity> {
  toDomain(model: PracticeSessionModel): PracticeSessionEntity {
    return PracticeSessionEntity.create({
      id: model.id,
      userId: model.user_id,
      mode: model.mode,
      title: model.title,
      topic: model.topic ?? undefined,
      interviewRole: model.interview_role ?? undefined,
      level: model.level,
      duration: model.duration,
      // practiceFocus: model.practice_focus as PracticeFocus[] | undefined,
      status: model.status,
      messages: model.messages.map((message) => this.messageToDomain(message)),
      feedbackReport: model.feedback_report ? this.feedbackReportToDomain(model.feedback_report) : undefined,
      createdAt: new Date(model.created_at),
      completedAt: model.completed_at ? new Date(model.completed_at) : undefined,
    });
  }

  toPersistence(domain: PracticeSessionEntity): PracticeSessionModel {
    return {
      id: domain.id,
      user_id: domain.userId,
      mode: domain.mode,
      title: domain.title,
      topic: domain.topic ?? null,
      interview_role: domain.interviewRole ?? null,
      level: domain.level,
      duration: domain.duration,
      // practice_focus: domain.practiceFocus ?? null,
      status: domain.status,
      messages: domain.messages.map((message) => this.messageToPersistence(message)),
      feedback_report: domain.feedbackReport ? this.feedbackReportToPersistence(domain.feedbackReport) : null,
      created_at: domain.createdAt.toISOString(),
      completed_at: domain.completedAt?.toISOString() ?? null,
    };
  }

  private messageToDomain(model: PracticeMessageModel): PracticeMessage {
    return {
      id: model.id,
      sessionId: model.session_id,
      sender: model.sender,
      content: model.content,
      createdAt: new Date(model.created_at),
    };
  }

  private messageToPersistence(domain: PracticeMessage): PracticeMessageModel {
    return {
      id: domain.id,
      session_id: domain.sessionId,
      sender: domain.sender,
      content: domain.content,
      created_at: domain.createdAt.toISOString(),
    };
  }

  private feedbackReportToDomain(model: FeedbackReportModel): FeedbackReport {
    return {
      id: model.id,
      sessionId: model.session_id,
      score: model.score,
      strengths: model.strengths,
      corrections: model.corrections,
      betterExpressions: model.better_expressions,
      nextSteps: model.next_steps,
      createdAt: new Date(model.created_at),
    };
  }

  private feedbackReportToPersistence(domain: FeedbackReport): FeedbackReportModel {
    return {
      id: domain.id,
      session_id: domain.sessionId,
      score: domain.score,
      strengths: domain.strengths,
      corrections: domain.corrections,
      better_expressions: domain.betterExpressions,
      next_steps: domain.nextSteps,
      created_at: domain.createdAt.toISOString(),
    };
  }
}
