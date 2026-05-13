import type { VocabularyItemEntity } from "../../domain/entities/vocabulary.entity";
import type { MarkVocabularyLearnedInput } from "../../domain/entities/vocabulary.types";
import type { VocabularyService } from "../services/vocabulary.service";

export class MarkVocabularyLearnedUseCase {
  constructor(private readonly vocabularyService: VocabularyService) {}

  execute(input: MarkVocabularyLearnedInput): Promise<VocabularyItemEntity> {
    return this.vocabularyService.markLearned(input);
  }
}
