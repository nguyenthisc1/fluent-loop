import type { SignInInput, AuthSession, SignUpInput, User, UserId, CompleteOnboardingInput, UpdateUserInput } from "../../domain/entities/user.types";
import type { UserRepository } from "../../domain/repositories/user.repository";
import type { AuthApi } from "../http/v1/auth/auth.api";
import { UserMapper } from "../mapper/user.mapper";

export class HttpUserRepository implements UserRepository {
  constructor(authApi: AuthApi, userMapper = new UserMapper()) {
    this.authApi = authApi;
  }

  private readonly authApi: AuthApi;
  private readonly userMapper = new UserMapper();

  async signIn(input: SignInInput): Promise<AuthSession> {
    const session = await this.authApi.signIn(input);
    return this.userMapper.toSessionDomain(session);
  }

  async signUp(input: SignUpInput): Promise<AuthSession> {
    const session = await this.authApi.signUp(input);
    return this.userMapper.toSessionDomain(session);
  }

  signOut(): Promise<void> {
    return this.authApi.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const user = await this.authApi.me();
    return user ? this.userMapper.toDomain(user) : null;
  }

  async getCurrentSession(): Promise<AuthSession | null> {
    const session = await this.authApi.getCurrentSession();

    if (!session) {
      return null;
    }

    return this.userMapper.toSessionDomain(session);
  }

  async getUser(_userId: UserId): Promise<User | null> {
    return this.getCurrentUser();
  }

  async completeOnboarding(input: CompleteOnboardingInput): Promise<User> {
    const user = await this.authApi.completeOnboarding({
      displayName: input.displayName,
      englishLevel: input.englishLevel,
      learningGoal: input.learningGoal,
      nativeLanguage: input.nativeLanguage,
      timezone: input.timezone,
    });

    return this.userMapper.toDomain(user);
  }

  async updateUser(input: UpdateUserInput): Promise<User> {
    const user = await this.authApi.updateUser({
      displayName: input.displayName,
      avatarUrl: input.avatarUrl,
      englishLevel: input.englishLevel,
      learningGoal: input.learningGoal,
      nativeLanguage: input.nativeLanguage,
      timezone: input.timezone,
    });

    return this.userMapper.toDomain(user);
  }
}
