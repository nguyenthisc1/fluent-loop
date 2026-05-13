import { queryKeys } from "@/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

import { createDashboardDependencies } from "../../dashboard.container";
import { presentDashboardSummary } from "../helpers/dashboard-summary.presenter";

export function useDashboardSummary(userId?: string) {
  const dashboardContainer = createDashboardDependencies();

  return useQuery({
    queryKey: userId ? queryKeys.dashboard.summary(userId) : ["dashboard", "summary", "anonymous"],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) {
        throw new Error("User id is required.");
      }

      const summary = await dashboardContainer.getDashboardSummaryUseCase.execute({ userId });
      return presentDashboardSummary(summary);
    },
  });
}
