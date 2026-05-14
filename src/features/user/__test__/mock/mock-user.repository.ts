import type { CompleteOnboardingCommand } from "../../application/usecases/complete-onbroading.usecase";
import type { SignInCommand } from "../../application/usecases/sign-in.usecase";
import type { SignUpCommand } from "../../application/usecases/sign-up.usecase";
import type { AuthSession, UpdateUserInput, User, UserId } from "../../domain/entities/user.types";
import type { UserRepository } from "../../domain/repositories/user.repository";
import { AuthInvalidCredentialsException } from "../../domain/user.exceptions";
import { mockNeedsOnboardingUser } from "./mock-user.data";

export class MockUserRepository implements UserRepository {
  private currentSession: AuthSession | null = null;
  private readonly users = new Map<UserId, User>();

  constructor(initialUser: User = mockNeedsOnboardingUser) {
    this.users.set(initialUser.id, initialUser);
  }

  async getCurrentSession(): Promise<AuthSession | null> {
    return this.currentSession;
  }

  async signIn(input: SignInCommand): Promise<AuthSession> {
    const user = Array.from(this.users.values()).find((item) => item.email === input.email);

    if (!user) {
      throw new AuthInvalidCredentialsException(undefined, {
        reason: "mock_user_not_found",
        email: input.email,
      });
    }

    this.currentSession = {
      user,
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    };

    return this.currentSession;
  }

  async signUp(input: SignUpCommand): Promise<AuthSession> {
    const user: User = {
      id: crypto.randomUUID(),
      email: input.email,
      displayName: "",
      onboardingCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.set(user.id, user);

    this.currentSession = {
      user,
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    };

    return this.currentSession;
  }

  async signOut(): Promise<void> {
    this.currentSession = null;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentSession?.user ?? null;
  }

  async getUser(userId: UserId): Promise<User | null> {
    return this.users.get(userId) ?? null;
  }

  async completeOnboarding(input: CompleteOnboardingCommand): Promise<User> {
    const user = this.users.get(input.userId);

    if (!user) {
      throw new AuthInvalidCredentialsException(undefined, {
        reason: "mock_user_not_found",
        username: input.displayName,
      });
    }

    const updatedUser: User = {
      ...user,
      displayName: input.displayName,
      englishLevel: input.englishLevel,
      learningGoal: input.learningGoal,
      nativeLanguage: input.nativeLanguage,
      timezone: input.timezone,
      onboardingCompleted: true,
      updatedAt: new Date(),
    };

    this.users.set(updatedUser.id, updatedUser);
    this.syncSessionUser(updatedUser);

    return updatedUser;
  }

  async updateUser(input: UpdateUserInput): Promise<User> {
    const user = this.users.get(input.userId);

    if (!user) {
      throw new AuthInvalidCredentialsException(undefined, {
        reason: "mock_user_not_found",
        username: input.displayName,
      });
    }

    const updatedUser: User = {
      ...user,
      ...input,
      id: user.id,
      updatedAt: new Date(),
    };

    this.users.set(updatedUser.id, updatedUser);
    this.syncSessionUser(updatedUser);

    return updatedUser;
  }

  private syncSessionUser(user: User): void {
    if (this.currentSession?.user.id !== user.id) {
      return;
    }

    this.currentSession = {
      ...this.currentSession,
      user,
    };
  }
}
