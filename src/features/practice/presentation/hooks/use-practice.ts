import { useCallback, useMemo, useState } from "react";
import type { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { FinishPracticeSessionInput, PracticeSessionId, SendPracticeMessageInput, StartPracticeSessionInput } from "../../domain/entities/practice.types";
import { createPracticeDependencies } from "../../practice.container";
import { presentPracticeSession } from "../helpers/practice-session.presenter";

type PracticeSessionState = {
  session: PracticeSessionEntity | null;
  loading: boolean;
  error: unknown;
};

export function usePracticeSession(initialSession?: PracticeSessionEntity | null) {
  const [state, setState] = useState<PracticeSessionState>({
    session: initialSession ?? null,
    loading: false,
    error: null,
  });
  const practiceContainer = createPracticeDependencies();

  const loadSession = useCallback(async (sessionId: PracticeSessionId) => {
    setState((current) => ({ ...current, loading: true, error: null }));

    try {
      const session = await practiceContainer.getPracticeSessionUseCase.execute(sessionId);

      setState({
        session,
        loading: false,
        error: null,
      });

      return session;
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error }));
      throw error;
    }
  }, []);

  const startSession = useCallback(async (input: StartPracticeSessionInput) => {
    setState((current) => ({ ...current, loading: true, error: null }));

    try {
      const session = await practiceContainer.startPracticeSessionUseCase.execute(input);

      setState({
        session,
        loading: false,
        error: null,
      });

      return session;
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error }));
      throw error;
    }
  }, []);

  const sendMessage = useCallback(async (input: SendPracticeMessageInput) => {
    setState((current) => ({ ...current, loading: true, error: null }));

    try {
      const session = await practiceContainer.sendPracticeMessageUseCase.execute(input);

      setState({
        session,
        loading: false,
        error: null,
      });

      return session;
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error }));
      throw error;
    }
  }, []);

  const finishSession = useCallback(async (input: FinishPracticeSessionInput) => {
    setState((current) => ({ ...current, loading: true, error: null }));

    try {
      const session = await practiceContainer.finishPracticeSessionUseCase.execute(input);

      setState({
        session,
        loading: false,
        error: null,
      });

      return session;
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error }));
      throw error;
    }
  }, []);

  const presentedSession = useMemo(() => presentPracticeSession(state.session), [state.session]);

  return {
    session: presentedSession,
    rawSession: state.session,
    loading: state.loading,
    error: state.error,
    loadSession,
    startSession,
    sendMessage,
    finishSession,
  };
}
