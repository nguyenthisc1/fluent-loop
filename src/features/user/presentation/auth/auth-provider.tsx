import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthSession, AuthStatus, CompleteOnboardingInput, SignInInput, SignUpInput, UpdateUserInput, User } from "../../domain/entities/user.types";
import { useUserDependencies } from "../providers/user-dependencies-provider";
import { AuthContext, type AuthContextValue } from "./auth-context";

type AuthProviderProps = {
  children: ReactNode;
};

function resolveAuthStatus(user: User | null): AuthStatus {
  if (!user) {
    return "unauthenticated";
  }

  return user.onboardingCompleted ? "authenticated" : "needs_onboarding";
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dependencies = useUserDependencies();

  const [status, setStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [error, setError] = useState<unknown>(null);

  const restoreSession = useCallback(async () => {
    setStatus("checking");
    setError(null);

    try {
      const currentSession = await dependencies.restoreSessionUseCase.execute();
      const currentUser = currentSession?.user ?? null;

      setSession(currentSession);
      setUser(currentUser);
      setStatus(resolveAuthStatus(currentUser));

      return currentSession;
    } catch (caughtError) {
      setSession(null);
      setUser(null);
      setStatus("unauthenticated");
      setError(caughtError);

      return null;
    }
  }, [dependencies]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void restoreSession();
  }, [restoreSession]);

  const signIn = useCallback(
    async (input: SignInInput) => {
      setError(null);

      try {
        const nextSession = await dependencies.signInUseCase.execute(input);
        const nextUser = nextSession.user;

        setSession(nextSession);
        setUser(nextUser);
        setStatus(resolveAuthStatus(nextUser));

        return nextSession;
      } catch (caughtError) {
        setSession(null);
        setUser(null);
        setStatus("unauthenticated");
        setError(caughtError);

        throw caughtError;
      }
    },
    [dependencies],
  );

  const signUp = useCallback(
    async (input: SignUpInput) => {
      setError(null);

      try {
        const nextSession = await dependencies.signUpUseCase.execute(input);
        const nextUser = nextSession.user;

        setSession(nextSession);
        setUser(nextUser);
        setStatus(resolveAuthStatus(nextUser));

        return nextSession;
      } catch (caughtError) {
        setSession(null);
        setUser(null);
        setStatus("unauthenticated");
        setError(caughtError);

        throw caughtError;
      }
    },
    [dependencies],
  );

  const signOut = useCallback(async () => {
    setError(null);

    try {
      await dependencies.signOutUseCase.execute();

      setSession(null);
      setUser(null);
      setStatus("unauthenticated");
    } catch (caughtError) {
      setError(caughtError);
      throw caughtError;
    }
  }, [dependencies]);

  const completeOnboarding = useCallback(
    async (input: CompleteOnboardingInput) => {
      setError(null);

      try {
        const updatedUser = await dependencies.completeOnboardingUseCase.execute(input);

        setUser(updatedUser);
        setSession((current) => (current ? { ...current, user: updatedUser } : current));
        setStatus(resolveAuthStatus(updatedUser));

        return updatedUser;
      } catch (caughtError) {
        setError(caughtError);
        throw caughtError;
      }
    },
    [dependencies],
  );

  const updateUser = useCallback(
    async (input: UpdateUserInput) => {
      setError(null);

      try {
        const updatedUser = await dependencies.updateUserUseCase.execute(input);

        setUser(updatedUser);
        setSession((current) => (current ? { ...current, user: updatedUser } : current));
        setStatus(resolveAuthStatus(updatedUser));

        return updatedUser;
      } catch (caughtError) {
        setError(caughtError);
        throw caughtError;
      }
    },
    [dependencies],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      session,
      error,

      isChecking: status === "checking",
      isAuthenticated: status === "authenticated",
      needsOnboarding: status === "needs_onboarding",
      isUnauthenticated: status === "unauthenticated",

      restoreSession,
      signIn,
      signUp,
      signOut,
      completeOnboarding,
      updateUser,
    }),
    [status, user, session, error, restoreSession, signIn, signUp, signOut, completeOnboarding, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
