import type { Mapper } from "@/core/infrastructure/mapper/mapper";
import { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { FeedbackReport, PracticeFocus, PracticeMessage } from "../../domain/entities/practice.types";
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
      interviewType: model.interview_type ?? undefined,
      difficulty: model.difficulty ?? undefined,
      level: model.level,
      duration: model.duration,
      status: model.status,
      practiceFocus: model.practice_focus ? (model.practice_focus as PracticeFocus[]) : undefined,
      messages: model.messages.map(this.messageToDomain),
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
      interview_type: domain.interviewType ?? null,
      difficulty: domain.difficulty ?? null,
      level: domain.level,
      duration: domain.duration,
      status: domain.status,
      practice_focus: domain.practiceFocus ?? null,
      messages: domain.messages.map(this.messageToPersistence),
      feedback_report: domain.feedbackReport ? this.feedbackReportToPersistence(domain.feedbackReport) : null,
      created_at: domain.createdAt.toISOString(),
      completed_at: domain.completedAt ? domain.completedAt.toISOString() : null,
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
      score: {
        fluency: model.score.fluency,
        grammar: model.score.grammar,
        vocabulary: model.score.vocabulary,
        naturalness: model.score.naturalness,
        overall: model.score.overall,
      },
      strengths: [...model.strengths],
      corrections: model.corrections.map((c) => ({
        original: c.original,
        corrected: c.corrected,
        explanation: c.explanation,
      })),
      betterExpressions: [...model.better_expressions],
      nextSteps: [...model.next_steps],
      createdAt: new Date(model.created_at),
    };
  }

  private feedbackReportToPersistence(domain: FeedbackReport): FeedbackReportModel {
    return {
      id: domain.id,
      session_id: domain.sessionId,
      score: {
        fluency: domain.score.fluency,
        grammar: domain.score.grammar,
        vocabulary: domain.score.vocabulary,
        naturalness: domain.score.naturalness,
        overall: domain.score.overall,
      },
      strengths: [...domain.strengths],
      corrections: domain.corrections.map((c) => ({
        original: c.original,
        corrected: c.corrected,
        explanation: c.explanation,
      })),
      better_expressions: [...domain.betterExpressions],
      next_steps: [...domain.nextSteps],
      created_at: domain.createdAt.toISOString(),
    };
  }
}
