import { queryKeys } from "@/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import type { HistoryItemStatus, HistoryMode } from "../../domain/entities/history.types";

import { presentHistoryItem } from "../helpers/history-item.presenter";
import { createHistoryDependencies } from "../../history.container";

type UseHistoryListInput = {
  userId?: string;
  mode?: HistoryMode;
  status?: HistoryItemStatus;
};

export function useHistoryList(input: UseHistoryListInput) {
  const historyContainer = createHistoryDependencies();

  return useQuery({
    queryKey: [...queryKeys.history.list(input.userId ?? "anonymous"), input.mode, input.status],
    enabled: !!input.userId,
    queryFn: async () => {
      if (!input.userId) {
        throw new Error("User id is required.");
      }

      const items = await historyContainer.getHistoryItemsUseCase.execute({
        userId: input.userId,
        mode: input.mode,
        status: input.status,
      });

      return items.map((item) => presentHistoryItem(item));
    },
  });
}
