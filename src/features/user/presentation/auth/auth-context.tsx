import { createContext } from "react";
import type { AuthSession, AuthStatus, CompleteOnboardingInput, SignInInput, SignUpInput, UpdateUserInput, User } from "../../domain/entities/user.types";

export type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  session: AuthSession | null;
  error: unknown;

  isChecking: boolean;
  isAuthenticated: boolean;
  needsOnboarding: boolean;
  isUnauthenticated: boolean;

  restoreSession: () => Promise<AuthSession | null>;
  signIn: (input: SignInInput) => Promise<AuthSession>;
  signUp: (input: SignUpInput) => Promise<AuthSession>;
  signOut: () => Promise<void>;
  completeOnboarding: (input: CompleteOnboardingInput) => Promise<User>;
  updateUser: (input: UpdateUserInput) => Promise<User>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
