import { z } from "zod";

export const interviewSetupSchema = z.object({
  interviewRole: z.string().trim().min(2, "Choose or enter a target role.").max(80, "Role is too long."),
  interviewType: z.enum(["behavioral", "technical", "hr_screening", "product_thinking", "mixed"]),
  difficulty: z.enum(["friendly", "standard", "challenging"]),
  level: z.enum(["A1", "A2", "B1", "B2", "C1"]),
  duration: z.coerce.number().refine((value) => [5, 10, 15].includes(value), "Choose a valid duration."),
  practiceFocus: z
    .array(z.enum(["speaking_fluency", "grammar_accuracy", "vocabulary_range", "pronunciation", "interview_confidence", "natural_expression"]))
    .min(1, "Choose at least one focus area.")
    .max(3, "Choose up to 3 focus areas."),
});

export type InterviewSetupFormValues = z.infer<typeof interviewSetupSchema>;
