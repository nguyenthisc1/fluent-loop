import { z } from "zod";

export const practiceSetupSchema = z.object({
  topic: z.string().trim().min(2, "Choose or enter a practice topic.").max(80, "Topic is too long."),
  level: z.enum(["A1", "A2", "B1", "B2", "C1"]),
  duration: z.coerce.number().refine((value) => [5, 10, 15].includes(value), "Choose a valid duration."),
  practiceFocus: z
    .array(z.enum(["speaking_fluency", "grammar_accuracy", "vocabulary_range", "pronunciation", "interview_confidence", "natural_expression"]))
    .min(1, "Choose at least one focus area.")
    .max(3, "Choose up to 3 focus areas."),
});

export type PracticeSetupFormValues = z.infer<typeof practiceSetupSchema>;
