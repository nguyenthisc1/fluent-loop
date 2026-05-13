import type { VocabularyItemEntity } from "../../domain/entities/vocabulary.entity";
import type { SaveVocabularyItemInput } from "../../domain/entities/vocabulary.types";
import type { VocabularyService } from "../services/vocabulary.service";

export class SaveVocabularyItemUseCase {
  constructor(private readonly vocabularyService: VocabularyService) {}

  execute(input: SaveVocabularyItemInput): Promise<VocabularyItemEntity> {
    return this.vocabularyService.saveItem(input);
  }
}
