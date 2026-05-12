import type { VocabularyItemEntity } from "../../domain/entities/vocabulary.entity";
import type { GetVocabularyItemsInput } from "../../domain/entities/vocabulary.types";
import type { VocabularyService } from "../services/vocabulary.service";

export class GetVocabularyItemsUseCase {
  constructor(private readonly vocabularyService: VocabularyService) {}

  execute(input: GetVocabularyItemsInput): Promise<VocabularyItemEntity[]> {
    return this.vocabularyService.getItems(input);
  }
}
