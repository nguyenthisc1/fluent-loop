import { MockVocabularyRepository } from "./__test__/mock/mock-vocabulary.repository";
import { VocabularyService } from "./application/services/vocabulary.service";
import { DeleteVocabularyItemUseCase } from "./application/usecases/delete-vocabulary-item.usecase";
import { GetVocabularyItemsUseCase } from "./application/usecases/get-vocabulary-items.usecase";
import { MarkVocabularyLearnedUseCase } from "./application/usecases/mark-vocabulary-learned.usecase";
import { SaveVocabularyItemUseCase } from "./application/usecases/save-vocabulary-item.usecase";
import { UpdateVocabularyItemUseCase } from "./application/usecases/update-vocabulary-item.usecase";
import type { VocabularyRepository } from "./domain/repositories/vocabulary.repository";

export type VocabularyDependencies = {
  vocabularyRepository: VocabularyRepository;
  vocabularyService: VocabularyService;
  saveVocabularyItemUseCase: SaveVocabularyItemUseCase;
  getVocabularyItemsUseCase: GetVocabularyItemsUseCase;
  updateVocabularyItemUseCase: UpdateVocabularyItemUseCase;
  markVocabularyLearnedUseCase: MarkVocabularyLearnedUseCase;
  deleteVocabularyItemUseCase: DeleteVocabularyItemUseCase;
};

export function createVocabularyDependencies(): VocabularyDependencies {
  const vocabularyRepository = new MockVocabularyRepository();
  const vocabularyService = new VocabularyService(vocabularyRepository);

  return {
    vocabularyRepository,
    vocabularyService,
    saveVocabularyItemUseCase: new SaveVocabularyItemUseCase(vocabularyService),
    getVocabularyItemsUseCase: new GetVocabularyItemsUseCase(vocabularyService),
    updateVocabularyItemUseCase: new UpdateVocabularyItemUseCase(vocabularyService),
    markVocabularyLearnedUseCase: new MarkVocabularyLearnedUseCase(vocabularyService),
    deleteVocabularyItemUseCase: new DeleteVocabularyItemUseCase(vocabularyService),
  };
}
