import type { DashboardRepository } from "../../domain/repositories/dashboard.repository";
import type { GetDashboardSummaryInput } from "../../domain/entities/dashboard.types";

export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  getSummary(input: GetDashboardSummaryInput) {
    return this.dashboardRepository.getSummary(input);
  }
}
