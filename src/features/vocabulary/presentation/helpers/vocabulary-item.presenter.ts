import type { VocabularyItemEntity } from "../../domain/entities/vocabulary.entity";

export function presentVocabularyItem(item: VocabularyItemEntity | null) {
  if (!item) return null;

  return {
    id: item.id,
    userId: item.userId,
    term: item.term,
    meaning: item.meaning,
    example: item.example,
    note: item.note,
    status: item.status,
    source: item.source,
    tags: item.tags,
    isLearned: item.isLearned(),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    learnedAt: item.learnedAt,
  };
}
