export const englishLevelOptions = [
  { value: "A1", label: "A1 Beginner" },
  { value: "A2", label: "A2 Elementary" },
  { value: "B1", label: "B1 Intermediate" },
  { value: "B2", label: "B2 Upper Intermediate" },
  { value: "C1", label: "C1 Advanced" },
] as const;

export const durationOptions = [
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min" },
  { value: 15, label: "15 min" },
] as const;

export const practiceFocusOptions = [
  { value: "speaking_fluency", label: "Speaking fluency" },
  { value: "grammar_accuracy", label: "Grammar accuracy" },
  { value: "vocabulary_range", label: "Vocabulary range" },
  { value: "pronunciation", label: "Pronunciation" },
  { value: "interview_confidence", label: "Interview confidence" },
  { value: "natural_expression", label: "Natural expression" },
] as const;

export const dailyTopicOptions = ["Small talk", "Ordering coffee", "Asking for help", "Travel conversation", "Workplace conversation", "Meeting discussion", "Customer service"] as const;

export const interviewRoleOptions = ["Frontend Developer", "Backend Developer", "Product Manager", "Data Analyst", "UX Designer", "Customer Support"] as const;

export const interviewTypeOptions = [
  { value: "behavioral", label: "Behavioral" },
  { value: "technical", label: "Technical" },
  { value: "hr_screening", label: "HR screening" },
  { value: "product_thinking", label: "Product thinking" },
  { value: "mixed", label: "Mixed" },
] as const;

export const interviewDifficultyOptions = [
  { value: "friendly", label: "Friendly" },
  { value: "standard", label: "Standard" },
  { value: "challenging", label: "Challenging" },
] as const;
