import { describe, expect, it, vi } from "vitest";
import { UserService } from "../../application/services/user.service";
import type { AuthSession, User } from "../../domain/entities/user.types";
import type { UserRepository } from "../../domain/repositories/user.repository";

const user: User = {
  id: "user-1",
  email: "demo@fluentloop.dev",
  displayName: "Demo User",
  onboardingCompleted: false,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-01T00:00:00.000Z"),
};

const session: AuthSession = {
  user,
  accessToken: "token",
};

function createRepositoryMock(): UserRepository {
  return {
    signIn: vi.fn().mockResolvedValue(session),
    signUp: vi.fn().mockResolvedValue(session),
    signOut: vi.fn().mockResolvedValue(undefined),
    getCurrentSession: vi.fn().mockResolvedValue(session),
    getCurrentUser: vi.fn().mockResolvedValue(user),
    getUser: vi.fn().mockResolvedValue(user),
    completeOnboarding: vi.fn().mockResolvedValue({
      ...user,
      onboardingCompleted: true,
    }),
    updateUser: vi.fn().mockResolvedValue({
      ...user,
      displayName: "Updated",
    }),
  };
}

describe("UserService", () => {
  it("delegates signIn to repository", async () => {
    const repository = createRepositoryMock();
    const service = new UserService(repository);

    await service.signIn({
      email: "demo@fluentloop.dev",
      password: "password123",
    });

    expect(repository.signIn).toHaveBeenCalledWith({
      email: "demo@fluentloop.dev",
      password: "password123",
    });
  });

  it("delegates getCurrentSession to repository", async () => {
    const repository = createRepositoryMock();
    const service = new UserService(repository);

    const result = await service.getCurrentSession();

    expect(result).toEqual(session);
    expect(repository.getCurrentSession).toHaveBeenCalledOnce();
  });

  it("delegates completeOnboarding to repository", async () => {
    const repository = createRepositoryMock();
    const service = new UserService(repository);

    await service.completeOnboarding({
      userId: "user-1",
      displayName: "Demo User",
      englishLevel: "B1",
      learningGoal: "job_interview",
    });

    expect(repository.completeOnboarding).toHaveBeenCalledWith({
      userId: "user-1",
      displayName: "Demo User",
      englishLevel: "B1",
      learningGoal: "job_interview",
      practiceFocus: ["speaking_fluency"],
    });
  });
});
