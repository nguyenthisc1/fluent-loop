import { useCallback, useState } from "react";
import type { AuthSession, AuthStatus, CompleteOnboardingInput, SignInInput, SignUpInput, User } from "../../domain/entities/user.types";
import { userContainer } from "../../user.container";

type UserState = {
  status: AuthStatus;
  user: User | null;
  session: AuthSession | null;
  loading: boolean;
  error: unknown;
};

function getAuthStatus(user: User | null): AuthStatus {
  if (!user) {
    return "unauthenticated";
  }

  return user.onboardingCompleted ? "authenticated" : "needs_onboarding";
}

export function useUser() {
  const [state, setState] = useState<UserState>({
    status: "idle",
    user: null,
    session: null,
    loading: false,
    error: null,
  });

  const signIn = useCallback(async (input: SignInInput) => {
    setState((current) => ({ ...current, status: "loading", loading: true, error: null }));

    try {
      const session = await userContainer.userService.signIn(input);

      setState({
        status: getAuthStatus(session.user),
        user: session.user,
        session,
        loading: false,
        error: null,
      });

      return session;
    } catch (error) {
      setState({
        status: "unauthenticated",
        user: null,
        session: null,
        loading: false,
        error,
      });

      throw error;
    }
  }, []);

  const signUp = useCallback(async (input: SignUpInput) => {
    setState((current) => ({ ...current, status: "loading", loading: true, error: null }));

    const session = await userContainer.userService.signUp(input);

    setState({
      status: getAuthStatus(session.user),
      user: session.user,
      session,
      loading: false,
      error: null,
    });

    return session;
  }, []);

  const completeOnboarding = useCallback(async (input: CompleteOnboardingInput) => {
    const user = await userContainer.userService.completeOnboarding(input);

    setState((current) => ({
      ...current,
      status: getAuthStatus(user),
      user,
      session: current.session ? { ...current.session, user } : current.session,
    }));

    return user;
  }, []);

  const signOut = useCallback(async () => {
    await userContainer.userService.signOut();

    setState({
      status: "unauthenticated",
      user: null,
      session: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    signIn,
    signUp,
    completeOnboarding,
    signOut,
  };
}
