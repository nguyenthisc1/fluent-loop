import type { AuthSession, CompleteOnboardingInput, SignInInput, SignUpInput, UpdateUserInput, User, UserId } from "../entities/user.types";

export interface UserRepository {
  signIn(input: SignInInput): Promise<AuthSession>;
  signUp(input: SignUpInput): Promise<AuthSession>;
  signOut(): Promise<void>;

  getCurrentSession(): Promise<AuthSession | null>;
  getCurrentUser(): Promise<User | null>;

  getUser(userId: UserId): Promise<User | null>;
  completeOnboarding(input: CompleteOnboardingInput): Promise<User>;
  updateUser(input: UpdateUserInput): Promise<User>;
}
