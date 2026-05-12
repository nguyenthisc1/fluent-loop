import type { DashboardSummaryEntity } from "../../domain/entities/dashboard-summary.entity";
import type { GetDashboardSummaryInput } from "../../domain/entities/dashboard.types";
import type { DashboardService } from "../services/dashboard.service";

export class GetDashboardSummaryUseCase {
  constructor(private readonly dashboardService: DashboardService) {}

  execute(input: GetDashboardSummaryInput): Promise<DashboardSummaryEntity> {
    return this.dashboardService.getSummary(input);
  }
}
