import type { Mapper } from "@/core/infrastructure/mapper/mapper";
import { HistoryItemEntity } from "../../domain/entities/history.entity";
import type { HistoryItemModel } from "../models/history.model";

export class HistoryItemMapper implements Mapper<HistoryItemModel, HistoryItemEntity> {
  toDomain(model: HistoryItemModel): HistoryItemEntity {
    return HistoryItemEntity.create({
      id: model.id,
      userId: model.user_id,
      sessionId: model.session_id,
      feedbackReportId: model.feedback_report_id ?? undefined,
      mode: model.mode,
      status: model.status,
      title: model.title,
      topic: model.topic ?? undefined,
      interviewRole: model.interview_role ?? undefined,
      durationMinutes: model.duration_minutes,
      score: model.score ?? undefined,
      mainImprovementArea: model.main_improvement_area ?? undefined,
      createdAt: new Date(model.created_at),
      completedAt: model.completed_at ? new Date(model.completed_at) : undefined,
    });
  }

  toPersistence(domain: HistoryItemEntity): HistoryItemModel {
    return {
      id: domain.id,
      user_id: domain.userId,
      session_id: domain.sessionId,
      feedback_report_id: domain.feedbackReportId ?? null,
      mode: domain.mode,
      status: domain.status,
      title: domain.title,
      topic: domain.topic ?? null,
      interview_role: domain.interviewRole ?? null,
      duration_minutes: domain.durationMinutes,
      score: domain.score ?? null,
      main_improvement_area: domain.mainImprovementArea ?? null,
      created_at: domain.createdAt.toISOString(),
      completed_at: domain.completedAt?.toISOString() ?? null,
    };
  }
}
