import { useCallback, useState } from "react";

import type { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { FinishPracticeSessionInput, SendPracticeMessageInput, StartPracticeSessionInput } from "../../domain/entities/practice.types";
import { createPracticeDependencies } from "../../practice.container";

type PracticeSessionState = {
  session: PracticeSessionEntity | null;
  loading: boolean;
  error: unknown;
};

export function usePracticeSession() {
  const [state, setState] = useState<PracticeSessionState>({
    session: null,
    loading: false,
    error: null,
  });

  const practiceContainer = createPracticeDependencies();

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

  return {
    ...state,
    startSession,
    sendMessage,
    finishSession,
  };
}
