import { describe, expect, it } from "vitest";
import { interviewSetupSchema } from "../../presentation/schemas/interview-setup.schema";
import { practiceSetupSchema } from "../../presentation/schemas/practice-setup.schema";

describe("practice schemas", () => {
  it("validates daily practice setup", () => {
    const result = practiceSetupSchema.safeParse({
      topic: "Small talk",
      level: "B1",
      duration: 10,
      practiceFocus: ["speaking_fluency"],
    });

    expect(result.success).toBe(true);
  });

  it("rejects daily practice setup without focus", () => {
    const result = practiceSetupSchema.safeParse({
      topic: "Small talk",
      level: "B1",
      duration: 10,
      practiceFocus: [],
    });

    expect(result.success).toBe(false);
  });

  it("validates interview setup", () => {
    const result = interviewSetupSchema.safeParse({
      interviewRole: "Frontend Developer",
      interviewType: "behavioral",
      difficulty: "standard",
      level: "B1",
      duration: 10,
      practiceFocus: ["interview_confidence"],
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid duration", () => {
    const result = interviewSetupSchema.safeParse({
      interviewRole: "Frontend Developer",
      interviewType: "behavioral",
      difficulty: "standard",
      level: "B1",
      duration: 20,
      practiceFocus: ["interview_confidence"],
    });

    expect(result.success).toBe(false);
  });
});
