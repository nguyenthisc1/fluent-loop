import { describe, expect, it, vi } from "vitest";
import type { PracticeService } from "../../application/services/practice.service";
import { StartPracticeSessionUseCase } from "../../application/usecases/start-practice-session.usecase";
import { PracticeSessionEntity } from "../../domain/entities/practice.entity";

describe("StartPracticeSessionUseCase", () => {
  it("starts a practice session through practice service", async () => {
    const session = PracticeSessionEntity.create({
      id: "session-1",
      userId: "user-1",
      mode: "daily",
      title: "Travel",
      topic: "Travel",
      level: "B1",
      duration: 10,
      status: "active",
      messages: [],
      createdAt: new Date(),
    });

    const practiceService = {
      startSession: vi.fn().mockResolvedValue(session),
    } as unknown as PracticeService;

    const usecase = new StartPracticeSessionUseCase(practiceService);

    const result = await usecase.execute({
      userId: "user-1",
      mode: "daily",
      topic: "Travel",
      level: "B1",
      duration: 10,
    });

    expect(result).toBe(session);
    expect(practiceService.startSession).toHaveBeenCalledWith({
      userId: "user-1",
      mode: "daily",
      topic: "Travel",
      level: "B1",
      duration: 10,
    });
  });
});
