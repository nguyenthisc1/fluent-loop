import type { Mapper } from "@/core/infrastructure/mapper/mapper";
import { VocabularyItemEntity } from "../../domain/entities/vocabulary.entity";
import type { VocabularyItemModel } from "../models/vocabulary.model";

export class VocabularyItemMapper implements Mapper<VocabularyItemModel, VocabularyItemEntity> {
  toDomain(model: VocabularyItemModel): VocabularyItemEntity {
    return VocabularyItemEntity.create({
      id: model.id,
      userId: model.user_id,
      term: model.term,
      meaning: model.meaning,
      example: model.example,
      note: model.note ?? undefined,
      status: model.status,
      source:
        model.source_session_id || model.source_feedback_report_id
          ? {
              sessionId: model.source_session_id ?? undefined,
              feedbackReportId: model.source_feedback_report_id ?? undefined,
            }
          : undefined,
      tags: model.tags,
      createdAt: new Date(model.created_at),
      updatedAt: new Date(model.updated_at),
      learnedAt: model.learned_at ? new Date(model.learned_at) : undefined,
    });
  }

  toPersistence(domain: VocabularyItemEntity): VocabularyItemModel {
    return {
      id: domain.id,
      user_id: domain.userId,
      term: domain.term,
      meaning: domain.meaning,
      example: domain.example,
      note: domain.note ?? null,
      status: domain.status,
      source_session_id: domain.source?.sessionId ?? null,
      source_feedback_report_id: domain.source?.feedbackReportId ?? null,
      tags: domain.tags,
      created_at: domain.createdAt.toISOString(),
      updated_at: domain.updatedAt.toISOString(),
      learned_at: domain.learnedAt?.toISOString() ?? null,
    };
  }
}
