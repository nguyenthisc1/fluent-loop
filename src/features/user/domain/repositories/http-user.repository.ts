import type { AuthApi } from "../../infrastructure/http/v1/auth/auth.api";
import { UserMapper } from "../../infrastructure/mapper/user.mapper";
import type { AuthSession, CompleteOnboardingInput, SignInInput, SignUpInput, UpdateUserInput, User, UserId } from "../entities/user.types";
import type { UserRepository } from "./user.repository";

export class HttpUserRepository implements UserRepository {
  constructor(authApi: AuthApi, userMapper = new UserMapper()) {
    this.authApi = authApi;
    this.userMapper = userMapper;
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

  getCurrentSession(): Promise<AuthSession | null> {
    return this.getCurrentSession();
  }
}
