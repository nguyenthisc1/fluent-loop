export type UserId = string;

export type AuthStatus = "idle" | "loading" | "unauthenticated" | "needs_onboarding" | "authenticated";

export type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export type LearningGoal = "daily_conversation" | "job_interview" | "business_english" | "travel" | "study_abroad";

export type User = {
  id: UserId;
  email: string;
  displayName: string;
  avatarUrl?: string;
  englishLevel?: EnglishLevel;
  learningGoal?: LearningGoal;
  nativeLanguage?: string;
  timezone?: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthSession = {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  email: string;
  password: string;
};

export type CompleteOnboardingInput = {
  userId: UserId;
  displayName: string;
  englishLevel: EnglishLevel;
  learningGoal: LearningGoal;
  nativeLanguage?: string;
  timezone?: string;
};

export type UpdateUserInput = {
  userId: UserId;
  displayName?: string;
  avatarUrl?: string;
  englishLevel?: EnglishLevel;
  learningGoal?: LearningGoal;
  nativeLanguage?: string;
  timezone?: string;
};
