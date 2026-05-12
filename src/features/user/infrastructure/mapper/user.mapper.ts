import type { Mapper } from "../../../../core/infrastructure/mapper/mapper";
import type { AuthSession, EnglishLevel, LearningGoal, User } from "../../domain/entities/user.types";
import type { AuthSessionModel, AuthUserModel } from "../http/v1/auth/auth.models";

export class UserMapper implements Mapper<AuthUserModel, User> {
  toDomain(model: AuthUserModel): User {
    return {
      id: model.id,
      email: model.email,
      displayName: model.display_name,
      avatarUrl: model.avatar_url ?? undefined,
      englishLevel: model.english_level as EnglishLevel | undefined,
      learningGoal: model.learning_goal as LearningGoal | undefined,
      nativeLanguage: model.native_language ?? undefined,
      timezone: model.timezone ?? undefined,
      onboardingCompleted: model.onboarding_completed,
      createdAt: new Date(model.created_at),
      updatedAt: new Date(model.updated_at),
    };
  }

  toPersistence(domain: User): AuthUserModel {
    return {
      id: domain.id,
      email: domain.email,
      display_name: domain.displayName,
      avatar_url: domain.avatarUrl ?? null,
      english_level: domain.englishLevel ?? null,
      learning_goal: domain.learningGoal ?? null,
      native_language: domain.nativeLanguage ?? null,
      timezone: domain.timezone ?? null,
      onboarding_completed: domain.onboardingCompleted,
      created_at: domain.createdAt.toISOString(),
      updated_at: domain.updatedAt.toISOString(),
    };
  }

  toSessionDomain(model: AuthSessionModel): AuthSession {
    return {
      user: this.toDomain(model.user),
      accessToken: model.access_token,
      refreshToken: model.refresh_token,
      expiresAt: model.expires_at ? new Date(model.expires_at) : undefined,
    };
  }
}
