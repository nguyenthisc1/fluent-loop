import { z } from "zod";

export const onboardingSchema = z.object({
  displayName: z.string().trim().min(2, "Display name must be at least 2 characters."),
  englishLevel: z.enum(["A1", "A2", "B1", "B2", "C1"]),
  learningGoal: z.enum(["daily_conversation", "job_interview", "business_english", "travel", "study_abroad"]),
  nativeLanguage: z.string().trim().optional(),
  timezone: z.string().trim().optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
