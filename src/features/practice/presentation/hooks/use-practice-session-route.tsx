import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePracticeSession } from "./use-practice";

export function usePracticeSessionRoute() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const practice = usePracticeSession();

  useEffect(() => {
    if (!sessionId) return;

    void practice.loadSession(sessionId);
  }, [sessionId]);

  return practice;
}
