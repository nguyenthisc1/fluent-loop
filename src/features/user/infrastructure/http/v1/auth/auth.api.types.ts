export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
};

export type CompleteOnboardingRequest = {
  displayName: string;
  englishLevel: string;
  learningGoal: string;
  nativeLanguage?: string;
  timezone?: string;
};

export type UpdateUserRequest = {
  displayName?: string;
  avatarUrl?: string;
  englishLevel?: string;
  learningGoal?: string;
  nativeLanguage?: string;
  timezone?: string;
};
