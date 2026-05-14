import { logger } from "@/shared/lib/logger";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CompleteOnboardingDto } from "../../application/dtos/onbroading.dto";
import type { SignInDto } from "../../application/dtos/sign-in.dto";
import type { SignUpDto } from "../../application/dtos/sign-up.dto";
import type { AuthSession, AuthStatus, UpdateUserInput, User } from "../../domain/entities/user.types";
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

  const applySession = useCallback((nextSession: AuthSession | null) => {
    const nextUser = nextSession?.user ?? null;

    setSession(nextSession);
    setUser(nextUser);
    setStatus(resolveAuthStatus(nextUser));
  }, []);

  const restoreSession = useCallback(async () => {
    setStatus("checking");
    setError(null);

    try {
      const currentSession = await dependencies.restoreSessionUseCase.execute();

      applySession(currentSession);

      logger.info("Auth session restored", {
        feature: "user",
        action: "restore_session",
        authenticated: !!currentSession,
        userId: currentSession?.user.id,
      });

      return currentSession;
    } catch (caughtError) {
      applySession(null);
      setError(caughtError);

      logger.error("Auth session restore failed", {
        feature: "user",
        action: "restore_session",
        error: caughtError,
      });

      return null;
    }
  }, [applySession, dependencies]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void restoreSession();
  }, [restoreSession]);

  const signIn = useCallback(
    async (input: SignInDto) => {
      setError(null);

      try {
        const nextSession = await dependencies.userController.signIn(input);

        applySession(nextSession);

        logger.info("User signed in", {
          feature: "user",
          action: "sign_in",
          userId: nextSession.user.id,
          status: resolveAuthStatus(nextSession.user),
        });

        return nextSession;
      } catch (caughtError) {
        applySession(null);
        setError(caughtError);

        logger.error("User sign in failed", {
          feature: "user",
          action: "sign_in",
          error: caughtError,
        });

        throw caughtError;
      }
    },
    [applySession, dependencies],
  );

  const signUp = useCallback(
    async (input: SignUpDto) => {
      setError(null);

      try {
        const nextSession = await dependencies.userController.signUp(input);

        applySession(nextSession);

        logger.info("User signed up", {
          feature: "user",
          action: "sign_up",
          userId: nextSession.user.id,
          status: resolveAuthStatus(nextSession.user),
        });

        return nextSession;
      } catch (caughtError) {
        applySession(null);
        setError(caughtError);

        logger.error("User sign up failed", {
          feature: "user",
          action: "sign_up",
          error: caughtError,
        });

        throw caughtError;
      }
    },
    [applySession, dependencies],
  );

  const signOut = useCallback(async () => {
    setError(null);

    const previousUserId = user?.id;

    try {
      await dependencies.signOutUseCase.execute();

      applySession(null);

      logger.info("User signed out", {
        feature: "user",
        action: "sign_out",
        userId: previousUserId,
      });
    } catch (caughtError) {
      setError(caughtError);

      logger.error("User sign out failed", {
        feature: "user",
        action: "sign_out",
        userId: previousUserId,
        error: caughtError,
      });

      throw caughtError;
    }
  }, [applySession, dependencies, user?.id]);

  const completeOnboarding = useCallback(
    async (input: CompleteOnboardingDto) => {
      setError(null);

      try {
        const updatedUser = await dependencies.userController.completeOnboarding(input);

        setUser(updatedUser);
        setSession((current) => (current ? { ...current, user: updatedUser } : current));
        setStatus(resolveAuthStatus(updatedUser));

        logger.info("User completed onboarding", {
          feature: "user",
          action: "complete_onboarding",
          userId: updatedUser.id,
        });

        return updatedUser;
      } catch (caughtError) {
        setError(caughtError);

        logger.error("Complete onboarding failed", {
          feature: "user",
          action: "complete_onboarding",
          userId: input.userId,
          error: caughtError,
        });

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

        logger.info("User profile updated", {
          feature: "user",
          action: "update_user",
          userId: updatedUser.id,
        });

        return updatedUser;
      } catch (caughtError) {
        setError(caughtError);

        logger.error("User profile update failed", {
          feature: "user",
          action: "update_user",
          userId: input.userId,
          error: caughtError,
        });

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
