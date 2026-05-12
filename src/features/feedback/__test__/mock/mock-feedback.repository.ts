import { NotFoundException } from "@/core/exceptions/exception";
import type { FeedbackReportEntity } from "../../domain/entities/feedback.entity";
import type { FeedbackReportId, GetSessionFeedbackInput, MarkFeedbackReviewedInput, UserId } from "../../domain/entities/feedback.types";
import type { FeedbackRepository } from "../../domain/repositories/feedback.repository";
import { mockFeedbackReport } from "./mock-feedback.data";

export class MockFeedbackRepository implements FeedbackRepository {
  private readonly reports = new Map<FeedbackReportId, FeedbackReportEntity>();

  constructor(initialReports: FeedbackReportEntity[] = [mockFeedbackReport]) {
    for (const report of initialReports) {
      this.reports.set(report.id, report);
    }
  }

  async getReport(reportId: FeedbackReportId): Promise<FeedbackReportEntity | null> {
    return this.reports.get(reportId) ?? null;
  }

  async getSessionFeedback(input: GetSessionFeedbackInput): Promise<FeedbackReportEntity | null> {
    return Array.from(this.reports.values()).find((report) => report.sessionId === input.sessionId) ?? null;
  }

  async getFeedbackHistory(userId: UserId): Promise<FeedbackReportEntity[]> {
    return Array.from(this.reports.values())
      .filter((report) => report.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async markReviewed(input: MarkFeedbackReviewedInput): Promise<FeedbackReportEntity> {
    const report = this.reports.get(input.reportId);

    if (!report) {
      throw new NotFoundException("Feedback report not found.");
    }

    const updatedReport = report.markReviewed();

    this.reports.set(updatedReport.id, updatedReport);

    return updatedReport;
  }
}
