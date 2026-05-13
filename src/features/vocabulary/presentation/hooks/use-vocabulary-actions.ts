import { queryKeys } from "@/shared/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SaveVocabularyItemInput, UpdateVocabularyItemInput } from "../../domain/entities/vocabulary.types";
import { createVocabularyDependencies } from "../../vocabulary.container";
import { presentVocabularyItem } from "../helpers/vocabulary-item.presenter";

export function useVocabularyActions(userId?: string) {
  const queryClient = useQueryClient();
  const vocabularyContainer = createVocabularyDependencies();

  const invalidateVocabulary = () => {
    if (!userId) return;

    queryClient.invalidateQueries({
      queryKey: queryKeys.vocabulary.list(userId),
    });
  };

  const saveItem = useMutation({
    mutationFn: async (input: SaveVocabularyItemInput) => {
      const item = await vocabularyContainer.saveVocabularyItemUseCase.execute(input);
      return presentVocabularyItem(item);
    },
    onSuccess: invalidateVocabulary,
  });

  const updateItem = useMutation({
    mutationFn: async (input: UpdateVocabularyItemInput) => {
      const item = await vocabularyContainer.updateVocabularyItemUseCase.execute(input);
      return presentVocabularyItem(item);
    },
    onSuccess: invalidateVocabulary,
  });

  const markLearned = useMutation({
    mutationFn: async (itemId: string) => {
      const item = await vocabularyContainer.markVocabularyLearnedUseCase.execute({ itemId });
      return presentVocabularyItem(item);
    },
    onSuccess: invalidateVocabulary,
  });

  const deleteItem = useMutation({
    mutationFn: (itemId: string) => vocabularyContainer.deleteVocabularyItemUseCase.execute({ itemId }),
    onSuccess: invalidateVocabulary,
  });

  return {
    saveItem,
    updateItem,
    markLearned,
    deleteItem,
  };
}
