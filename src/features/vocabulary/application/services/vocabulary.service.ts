import type { DeleteVocabularyItemInput, GetVocabularyItemsInput, MarkVocabularyLearnedInput, SaveVocabularyItemInput, UpdateVocabularyItemInput, VocabularyItemId } from "../../domain/entities/vocabulary.types";
import type { VocabularyRepository } from "../../domain/repositories/vocabulary.repository";

export class VocabularyService {
  constructor(private readonly vocabularyRepository: VocabularyRepository) {}

  saveItem(input: SaveVocabularyItemInput) {
    return this.vocabularyRepository.saveItem(input);
  }

  getItem(itemId: VocabularyItemId) {
    return this.vocabularyRepository.getItem(itemId);
  }

  getItems(input: GetVocabularyItemsInput) {
    return this.vocabularyRepository.getItems(input);
  }

  updateItem(input: UpdateVocabularyItemInput) {
    return this.vocabularyRepository.updateItem(input);
  }

  markLearned(input: MarkVocabularyLearnedInput) {
    return this.vocabularyRepository.markLearned(input);
  }

  deleteItem(input: DeleteVocabularyItemInput) {
    return this.vocabularyRepository.deleteItem(input);
  }
}
