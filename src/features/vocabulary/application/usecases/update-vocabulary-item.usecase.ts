import type { VocabularyItemEntity } from "../../domain/entities/vocabulary.entity";
import type { UpdateVocabularyItemInput } from "../../domain/entities/vocabulary.types";
import type { VocabularyService } from "../services/vocabulary.service";

export class UpdateVocabularyItemUseCase {
  constructor(private readonly vocabularyService: VocabularyService) {}

  execute(input: UpdateVocabularyItemInput): Promise<VocabularyItemEntity> {
    return this.vocabularyService.updateItem(input);
  }
}
