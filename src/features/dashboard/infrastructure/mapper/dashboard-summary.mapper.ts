import type { Mapper } from "@/core/infrastructure/mapper/mapper";
import { DashboardSummaryEntity } from "../../domain/entities/dashboard-summary.entity";
import type { DashboardSummaryModel } from "../models/dashboard-summary.model";

export class DashboardSummaryMapper implements Mapper<DashboardSummaryModel, DashboardSummaryEntity> {
  toDomain(model: DashboardSummaryModel): DashboardSummaryEntity {
    return DashboardSummaryEntity.create({
      userId: model.user_id,
      displayName: model.display_name,
      englishLevel: model.english_level ?? undefined,
      learningGoal: model.learning_goal ?? undefined,
      recommendedPractice: {
        title: model.recommended_practice.title,
        description: model.recommended_practice.description,
        mode: model.recommended_practice.mode,
        estimatedMinutes: model.recommended_practice.estimated_minutes,
        focus: model.recommended_practice.focus,
      },
      progress: {
        weeklyStreak: model.progress.weekly_streak,
        sessionsCompleted: model.progress.sessions_completed,
        practiceMinutesThisWeek: model.progress.practice_minutes_this_week,
        averageScore: model.progress.average_score,
      },
      recentSessions: model.recent_sessions.map((session) => ({
        id: session.id,
        title: session.title,
        mode: session.mode,
        score: session.score ?? undefined,
        completedAt: session.completed_at ? new Date(session.completed_at) : undefined,
      })),
      vocabularyPreview: model.vocabulary_preview,
      createdAt: new Date(model.created_at),
    });
  }

  toPersistence(domain: DashboardSummaryEntity): DashboardSummaryModel {
    return {
      user_id: domain.userId,
      display_name: domain.displayName,
      english_level: domain.englishLevel ?? null,
      learning_goal: domain.learningGoal ?? null,
      recommended_practice: {
        title: domain.recommendedPractice.title,
        description: domain.recommendedPractice.description,
        mode: domain.recommendedPractice.mode,
        estimated_minutes: domain.recommendedPractice.estimatedMinutes,
        focus: domain.recommendedPractice.focus,
      },
      progress: {
        weekly_streak: domain.progress.weeklyStreak,
        sessions_completed: domain.progress.sessionsCompleted,
        practice_minutes_this_week: domain.progress.practiceMinutesThisWeek,
        average_score: domain.progress.averageScore,
      },
      recent_sessions: domain.recentSessions.map((session) => ({
        id: session.id,
        title: session.title,
        mode: session.mode,
        score: session.score ?? null,
        completed_at: session.completedAt?.toISOString() ?? null,
      })),
      vocabulary_preview: domain.vocabularyPreview,
      created_at: domain.createdAt.toISOString(),
    };
  }
}
