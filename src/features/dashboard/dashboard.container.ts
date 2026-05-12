import { MockDashboardRepository } from "./__test__/mock/mock-dashboard.repository";
import { DashboardService } from "./application/services/dashboard.service";
import { GetDashboardSummaryUseCase } from "./application/usecases/get-dashboard-summary.usecase";
import type { DashboardRepository } from "./domain/repositories/dashboard.repository";

export type DashboardDependencies = {
  dashboardRepository: DashboardRepository;
  dashboardService: DashboardService;
  getDashboardSummaryUseCase: GetDashboardSummaryUseCase;
};

export function createDashboardDependencies(): DashboardDependencies {
  const dashboardRepository = new MockDashboardRepository();
  const dashboardService = new DashboardService(dashboardRepository);

  return {
    dashboardRepository,
    dashboardService,
    getDashboardSummaryUseCase: new GetDashboardSummaryUseCase(dashboardService),
  };
}
