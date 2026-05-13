import { DashboardSummaryEntity } from "../../domain/entities/dashboard-summary.entity";
import type { GetDashboardSummaryInput } from "../../domain/entities/dashboard.types";
import type { DashboardRepository } from "../../domain/repositories/dashboard.repository";
import { mockDashboardSummary } from "./mock-dashboard.data";

export class MockDashboardRepository implements DashboardRepository {
  constructor(private readonly summary: DashboardSummaryEntity = mockDashboardSummary) {}

  async getSummary(input: GetDashboardSummaryInput): Promise<DashboardSummaryEntity> {
    if (this.summary.userId === input.userId) {
      return this.summary;
    }

    return DashboardSummaryEntity.create({
      ...this.summary.toJSON(),
      userId: input.userId,
      displayName: "New learner",
      progress: {
        weeklyStreak: 0,
        sessionsCompleted: 0,
        practiceMinutesThisWeek: 0,
        averageScore: 0,
      },
      recentSessions: [],
      vocabularyPreview: [],
      createdAt: new Date(),
    });
  }
}
