import type { DeleteVocabularyItemInput } from "../../domain/entities/vocabulary.types";
import type { VocabularyService } from "../services/vocabulary.service";

export class DeleteVocabularyItemUseCase {
  constructor(private readonly vocabularyService: VocabularyService) {}

  execute(input: DeleteVocabularyItemInput): Promise<void> {
    return this.vocabularyService.deleteItem(input);
  }
}
