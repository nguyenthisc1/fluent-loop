import type { VocabularyItemEntity } from "../entities/vocabulary.entity";
import type { DeleteVocabularyItemInput, GetVocabularyItemsInput, MarkVocabularyLearnedInput, SaveVocabularyItemInput, UpdateVocabularyItemInput, VocabularyItemId } from "../entities/vocabulary.types";

export interface VocabularyRepository {
  saveItem(input: SaveVocabularyItemInput): Promise<VocabularyItemEntity>;
  getItem(itemId: VocabularyItemId): Promise<VocabularyItemEntity | null>;
  getItems(input: GetVocabularyItemsInput): Promise<VocabularyItemEntity[]>;
  updateItem(input: UpdateVocabularyItemInput): Promise<VocabularyItemEntity>;
  markLearned(input: MarkVocabularyLearnedInput): Promise<VocabularyItemEntity>;
  deleteItem(input: DeleteVocabularyItemInput): Promise<void>;
}
