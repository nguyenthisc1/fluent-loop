export type VocabularyItemId = string;
export type UserId = string;
export type PracticeSessionId = string;
export type FeedbackReportId = string;

export type VocabularyStatus = "new" | "practicing" | "learned";

export type VocabularySource = {
  sessionId?: PracticeSessionId;
  feedbackReportId?: FeedbackReportId;
};

export type VocabularyItemProps = {
  id: VocabularyItemId;
  userId: UserId;
  term: string;
  meaning: string;
  example: string;
  note?: string;
  status: VocabularyStatus;
  source?: VocabularySource;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  learnedAt?: Date;
};

export type SaveVocabularyItemInput = {
  userId: UserId;
  term: string;
  meaning: string;
  example: string;
  note?: string;
  source?: VocabularySource;
  tags?: string[];
};

export type GetVocabularyItemsInput = {
  userId: UserId;
  status?: VocabularyStatus;
};

export type UpdateVocabularyItemInput = {
  itemId: VocabularyItemId;
  term?: string;
  meaning?: string;
  example?: string;
  note?: string;
  tags?: string[];
  status?: VocabularyStatus;
};

export type MarkVocabularyLearnedInput = {
  itemId: VocabularyItemId;
};

export type DeleteVocabularyItemInput = {
  itemId: VocabularyItemId;
};
