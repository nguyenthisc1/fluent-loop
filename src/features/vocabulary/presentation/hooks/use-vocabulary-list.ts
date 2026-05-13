import { queryKeys } from "@/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import type { VocabularyStatus } from "../../domain/entities/vocabulary.types";
import { presentVocabularyItem } from "../helpers/vocabulary-item.presenter";
import { createVocabularyDependencies } from "../../vocabulary.container";

export function useVocabularyList(userId?: string, status?: VocabularyStatus) {
  const vocabularyContainer = createVocabularyDependencies();

  return useQuery({
    queryKey: [...queryKeys.vocabulary.list(userId ?? "anonymous"), status],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) {
        throw new Error("User id is required.");
      }

      const items = await vocabularyContainer.getVocabularyItemsUseCase.execute({
        userId,
        status,
      });

      return items.map((item) => presentVocabularyItem(item));
    },
  });
}
