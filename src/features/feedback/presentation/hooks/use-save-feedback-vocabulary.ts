import { useAuth } from "@/features/user/presentation/auth/use-auth";
import { useVocabularyActions } from "@/features/vocabulary/presentation/hooks/use-vocabulary-actions";
import type { SuggestedVocabulary } from "../../domain/entities/feedback.types";

type SaveFeedbackVocabularyInput = {
  sessionId: string;
  feedbackReportId: string;
  vocabulary: SuggestedVocabulary;
};

export function useSaveFeedbackVocabulary() {
  const { user } = useAuth();
  const { saveItem } = useVocabularyActions(user?.id);

  async function save(input: SaveFeedbackVocabularyInput) {
    if (!user) {
      throw new Error("User is required.");
    }

    return saveItem.mutateAsync({
      userId: user.id,
      term: input.vocabulary.term,
      meaning: input.vocabulary.meaning,
      example: input.vocabulary.example,
      source: {
        sessionId: input.sessionId,
        feedbackReportId: input.feedbackReportId,
      },
      tags: ["feedback"],
    });
  }

  return {
    save,
    saving: saveItem.isPending,
    error: saveItem.error,
  };
}
