import { queryKeys } from "@/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { createHistoryDependencies } from "../../history.container";
import { presentHistoryItem } from "../helpers/history-item.presenter";

export function useRecentHistory(userId?: string, limit = 5) {
  const historyContainer = createHistoryDependencies();

  return useQuery({
    queryKey: [...queryKeys.history.recent(userId ?? "anonymous"), limit],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) {
        throw new Error("User id is required.");
      }

      const items = await historyContainer.getRecentHistoryUseCase.execute({
        userId,
        limit,
      });

      return items.map((item) => presentHistoryItem(item));
    },
  });
}
