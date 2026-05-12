import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthSession, AuthStatus, CompleteOnboardingInput, SignInInput, SignUpInput, UpdateUserInput, User } from "../../domain/entities/user.types";
import { useUserDependencies } from "./user-dependencies-provider";

type UserContextValue = {
  status: AuthStatus;
  user: User | null;
  session: AuthSession | null;
  loading: boolean;
  error: unknown;
  restoreSession: () => Promise<AuthSession | null>;
  signIn: (input: SignInInput) => Promise<AuthSession>;
  signUp: (input: SignUpInput) => Promise<AuthSession>;
  signOut: () => Promise<void>;
  completeOnboarding: (input: CompleteOnboardingInput) => Promise<User>;
  updateUser: (input: UpdateUserInput) => Promise<User>;
};

export const UserContext = createContext<UserContextValue | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

function getAuthStatus(user: User | null): AuthStatus {
  if (!user) return "unauthenticated";
  return user.onboardingCompleted ? "authenticated" : "needs_onboarding";
}

export function UserProvider({ children }: UserProviderProps) {
  const { userService, signOutUseCase, completeOnboardingUseCase, restoreSessionUseCase, signInUseCase, signUpUseCase, updateUserUseCase } = useUserDependencies();

  const [status, setStatus] = useState<AuthStatus>("idle");
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const restoreSession = useCallback(async () => {
    setLoading(true);
    setStatus("loading");
    setError(null);

    try {
      const currentSession = await userService.getCurrentSession();

      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setStatus(getAuthStatus(currentSession?.user ?? null));

      return currentSession;
    } catch (caughtError) {
      setSession(null);
      setUser(null);
      setStatus("unauthenticated");
      setError(caughtError);

      return null;
    } finally {
      setLoading(false);
    }
  }, [userService]);

  const signIn = useCallback(
    async (input: SignInInput) => {
      setLoading(true);
      setStatus("loading");
      setError(null);

      try {
        const nextSession = await userService.signIn(input);

        setSession(nextSession);
        setUser(nextSession.user);
        setStatus(getAuthStatus(nextSession.user));

        return nextSession;
      } catch (caughtError) {
        setSession(null);
        setUser(null);
        setStatus("unauthenticated");
        setError(caughtError);
        throw caughtError;
      } finally {
        setLoading(false);
      }
    },
    [userService],
  );

  const signUp = useCallback(
    async (input: SignUpInput) => {
      setLoading(true);
      setStatus("loading");
      setError(null);

      try {
        const nextSession = await userService.signUp(input);

        setSession(nextSession);
        setUser(nextSession.user);
        setStatus(getAuthStatus(nextSession.user));

        return nextSession;
      } catch (caughtError) {
        setSession(null);
        setUser(null);
        setStatus("unauthenticated");
        setError(caughtError);
        throw caughtError;
      } finally {
        setLoading(false);
      }
    },
    [userService],
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await signOutUseCase.execute();

      setSession(null);
      setUser(null);
      setStatus("unauthenticated");
    } finally {
      setLoading(false);
    }
  }, [signOutUseCase]);

  const completeOnboarding = useCallback(
    async (input: CompleteOnboardingInput) => {
      setLoading(true);
      setError(null);

      try {
        const updatedUser = await completeOnboardingUseCase.execute(input);

        setUser(updatedUser);
        setStatus(getAuthStatus(updatedUser));
        setSession((current) => (current ? { ...current, user: updatedUser } : current));

        return updatedUser;
      } catch (caughtError) {
        setError(caughtError);
        throw caughtError;
      } finally {
        setLoading(false);
      }
    },
    [completeOnboardingUseCase],
  );

  const updateUser = useCallback(
    async (input: UpdateUserInput) => {
      setLoading(true);
      setError(null);

      try {
        const updatedUser = await updateUserUseCase.execute(input);

        setUser(updatedUser);
        setStatus(getAuthStatus(updatedUser));
        setSession((current) => (current ? { ...current, user: updatedUser } : current));

        return updatedUser;
      } catch (caughtError) {
        setError(caughtError);
        throw caughtError;
      } finally {
        setLoading(false);
      }
    },
    [updateUserUseCase],
  );

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await restoreSession();
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [restoreSession]);

  const value = useMemo<UserContextValue>(
    () => ({
      status,
      user,
      session,
      loading,
      error,
      restoreSession,
      signIn,
      signUp,
      signOut,
      completeOnboarding,
      updateUser,
    }),
    [status, user, session, loading, error, restoreSession, signIn, signUp, signOut, completeOnboarding, updateUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
