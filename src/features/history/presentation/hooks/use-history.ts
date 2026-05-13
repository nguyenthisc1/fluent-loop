import { queryKeys } from "@/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import type { HistoryItemStatus, HistoryMode } from "../../domain/entities/history.types";
import { createHistoryDependencies } from "../../history.container";

type UseHistoryInput = {
  userId?: string;
  mode?: HistoryMode;
  status?: HistoryItemStatus;
};

export function useHistory(input: UseHistoryInput) {
  const historyContainer = createHistoryDependencies();

  return useQuery({
    queryKey: [...queryKeys.history.list(input.userId ?? "anonymous"), input.mode, input.status],
    enabled: !!input.userId,
    queryFn: async () => {
      if (!input.userId) {
        throw new Error("User id is required.");
      }

      return historyContainer.getHistoryItemsUseCase.execute({
        userId: input.userId,
        mode: input.mode,
        status: input.status,
      });
    },
  });
}

export function useRecentHistory(userId?: string, limit = 5) {
  const historyContainer = createHistoryDependencies();

  return useQuery({
    queryKey: [...queryKeys.history.recent(userId ?? "anonymous"), limit],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) {
        throw new Error("User id is required.");
      }

      return historyContainer.getRecentHistoryUseCase.execute({ userId, limit });
    },
  });
}
