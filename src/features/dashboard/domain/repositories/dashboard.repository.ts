import type { DashboardSummaryEntity } from "../entities/dashboard-summary.entity";
import type { GetDashboardSummaryInput } from "../entities/dashboard.types";

export interface DashboardRepository {
  getSummary(input: GetDashboardSummaryInput): Promise<DashboardSummaryEntity>;
}
