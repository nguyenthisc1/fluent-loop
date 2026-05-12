import { NotFoundException } from "@/core/exceptions/exception";
import { describe, expect, it } from "vitest";
import { mockNeedsOnboardingUser } from "../mock/mock-user.data";
import { MockUserRepository } from "../mock/mock-user.repository";

describe("MockUserRepository", () => {
  it("signs in an existing user", async () => {
    const repository = new MockUserRepository(mockNeedsOnboardingUser);

    const session = await repository.signIn({
      email: mockNeedsOnboardingUser.email,
      password: "password123",
    });

    expect(session.user.id).toBe(mockNeedsOnboardingUser.id);
    expect(session.accessToken).toBe("mock-access-token");
  });

  it("throws when signing in with an unknown email", async () => {
    const repository = new MockUserRepository(mockNeedsOnboardingUser);

    await expect(
      repository.signIn({
        email: "unknown@fluentloop.dev",
        password: "password123",
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it("signs up a new user and creates a session", async () => {
    const repository = new MockUserRepository();

    const session = await repository.signUp({
      email: "new@fluentloop.dev",
      password: "password123",
    });

    expect(session.user.email).toBe("new@fluentloop.dev");
    expect(session.user.onboardingCompleted).toBe(false);
    expect(await repository.getCurrentSession()).toEqual(session);
  });

  it("returns the current user from the current session", async () => {
    const repository = new MockUserRepository();

    const session = await repository.signUp({
      email: "new@fluentloop.dev",
      password: "password123",
    });

    const user = await repository.getCurrentUser();

    expect(user).toEqual(session.user);
  });

  it("signs out and clears the current session", async () => {
    const repository = new MockUserRepository();

    await repository.signUp({
      email: "new@fluentloop.dev",
      password: "password123",
    });

    await repository.signOut();

    expect(await repository.getCurrentSession()).toBeNull();
    expect(await repository.getCurrentUser()).toBeNull();
  });

  it("completes onboarding for an existing user", async () => {
    const repository = new MockUserRepository();

    const session = await repository.signUp({
      email: "new@fluentloop.dev",
      password: "password123",
    });

    const user = await repository.completeOnboarding({
      userId: session.user.id,
      displayName: "Thi Nguyen",
      englishLevel: "B1",
      learningGoal: "job_interview",
      nativeLanguage: "Vietnamese",
      timezone: "Asia/Ho_Chi_Minh",
    });

    expect(user.onboardingCompleted).toBe(true);
    expect(user.displayName).toBe("Thi Nguyen");
    expect(user.englishLevel).toBe("B1");
    expect(user.learningGoal).toBe("job_interview");
  });

  it("updates the current session user after onboarding", async () => {
    const repository = new MockUserRepository();

    const session = await repository.signUp({
      email: "new@fluentloop.dev",
      password: "password123",
    });

    await repository.completeOnboarding({
      userId: session.user.id,
      displayName: "Thi Nguyen",
      englishLevel: "B1",
      learningGoal: "job_interview",
    });

    const currentSession = await repository.getCurrentSession();

    expect(currentSession?.user.displayName).toBe("Thi Nguyen");
    expect(currentSession?.user.onboardingCompleted).toBe(true);
  });

  it("updates a user profile", async () => {
    const repository = new MockUserRepository();

    const session = await repository.signUp({
      email: "new@fluentloop.dev",
      password: "password123",
    });

    const updatedUser = await repository.updateUser({
      userId: session.user.id,
      displayName: "Updated Name",
      englishLevel: "B2",
    });

    expect(updatedUser.displayName).toBe("Updated Name");
    expect(updatedUser.englishLevel).toBe("B2");
  });
});
