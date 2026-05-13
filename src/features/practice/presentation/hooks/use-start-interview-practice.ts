import { useUser } from "@/features/user/presentation/hooks/use-user";
import { useNavigate } from "react-router-dom";
import type { InterviewSetupFormValues } from "../schemas/interview-setup.schema";
import { usePracticeSession } from "./use-practice";

export function useStartInterviewPractice() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { startSession, loading, error } = usePracticeSession();

  async function start(values: InterviewSetupFormValues) {
    if (!user) {
      throw new Error("User is required.");
    }

    const session = await startSession({
      userId: user.id,
      mode: "interview",
      interviewRole: values.interviewRole,
      interviewType: values.interviewType,
      difficulty: values.difficulty,
      level: values.level,
      duration: values.duration as 5 | 10 | 15,
      practiceFocus: values.practiceFocus,
    });

    navigate(`/interview/${session.id}`);
  }

  return {
    start,
    loading,
    error,
  };
}
