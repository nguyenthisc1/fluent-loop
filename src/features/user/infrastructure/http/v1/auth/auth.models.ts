export type AuthUserModel = {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  english_level: string | null;
  learning_goal: string | null;
  native_language: string | null;
  timezone: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type AuthSessionModel = {
  access_token?: string;
  refresh_token?: string;
  expires_at?: string | null;
  user: AuthUserModel;
};
