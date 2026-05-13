import { queryKeys } from "@/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { createDashboardDependencies } from "../../dashboard.container";

export function useDashboardSummary(userId?: string) {
  const dashboardContainer = createDashboardDependencies();

  return useQuery({
    queryKey: userId ? queryKeys.dashboard.summary(userId) : ["dashboard", "summary", "anonymous"],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) {
        throw new Error("User id is required.");
      }

      return dashboardContainer.getDashboardSummaryUseCase.execute({ userId });
    },
  });
}
