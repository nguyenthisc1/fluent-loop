import { describe, expect, it } from "vitest";
import { onboardingSchema } from "../../presentation/schemas/onboarding.schema";
import { signInSchema } from "../../presentation/schemas/sign-in.schema";
import { signUpSchema } from "../../presentation/schemas/sign-up.schema";

describe("user schemas", () => {
  it("validates sign in values", () => {
    const result = signInSchema.safeParse({
      email: "demo@fluentloop.dev",
      password: "password123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid sign in email", () => {
    const result = signInSchema.safeParse({
      email: "not-email",
      password: "password123",
    });

    expect(result.success).toBe(false);
  });

  it("rejects password mismatch on sign up", () => {
    const result = signUpSchema.safeParse({
      email: "demo@fluentloop.dev",
      password: "password123",
      confirmPassword: "different",
    });

    expect(result.success).toBe(false);
  });

  it("validates onboarding values", () => {
    const result = onboardingSchema.safeParse({
      displayName: "Thi Nguyen",
      englishLevel: "B1",
      learningGoal: "job_interview",
      practiceFocus: ["speaking_fluency"],
      nativeLanguage: "Vietnamese",
    });

    expect(result.success).toBe(true);
  });

  it("rejects onboarding without practice focus", () => {
    const result = onboardingSchema.safeParse({
      displayName: "Thi Nguyen",
      englishLevel: "B1",
      learningGoal: "job_interview",
      practiceFocus: [],
      nativeLanguage: "Vietnamese",
    });

    expect(result.success).toBe(false);
  });
});
