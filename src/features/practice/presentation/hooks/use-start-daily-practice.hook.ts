import { useUser } from "@/features/user/presentation/hooks/use-user";
import { useNavigate } from "react-router-dom";
import type { PracticeSetupFormValues } from "../schemas/practice-setup.schema";
import { usePracticeSession } from "./use-practice.hook";

export function useStartDailyPractice() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { startSession, loading, error } = usePracticeSession();

  async function start(values: PracticeSetupFormValues) {
    if (!user) {
      throw new Error("User is required.");
    }

    const session = await startSession({
      userId: user.id,
      mode: "daily",
      topic: values.topic,
      level: values.level,
      duration: values.duration as 5 | 10 | 15,
      practiceFocus: values.practiceFocus,
    });

    navigate(`/practice/${session.id}`);
  }

  return {
    start,
    loading,
    error,
  };
}
