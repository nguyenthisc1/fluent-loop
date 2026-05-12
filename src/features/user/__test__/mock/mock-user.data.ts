import type { AuthSession, User } from "../../domain/entities/user.types";

export const mockUser: User = {
  id: "mock-user-id",
  email: "demo@fluentloop.dev",
  displayName: "Demo User",
  englishLevel: "B1",
  learningGoal: "job_interview",
  nativeLanguage: "Vietnamese",
  timezone: "Asia/Ho_Chi_Minh",
  onboardingCompleted: true,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-01T00:00:00.000Z"),
};

export const mockNeedsOnboardingUser: User = {
  ...mockUser,
  displayName: "",
  englishLevel: undefined,
  learningGoal: undefined,
  onboardingCompleted: false,
};

export const mockSession: AuthSession = {
  user: mockUser,
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
  expiresAt: new Date("2026-01-02T00:00:00.000Z"),
};
