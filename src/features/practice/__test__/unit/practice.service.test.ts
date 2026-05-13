import { describe, expect, it, vi } from "vitest";
import { PracticeService } from "../../application/services/practice.service";
import { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { PracticeRepository } from "../../domain/repositories/practice.repository";

const session = PracticeSessionEntity.create({
  id: "session-1",
  userId: "user-1",
  mode: "daily",
  title: "Small Talk",
  topic: "Small talk",
  level: "B1",
  duration: 10,
  status: "active",
  messages: [],
  createdAt: new Date(),
});

function createRepositoryMock(): PracticeRepository {
  return {
    startSession: vi.fn().mockResolvedValue(session),
    sendMessage: vi.fn().mockResolvedValue(session),
    finishSession: vi.fn().mockResolvedValue(session.complete()),
    getSession: vi.fn().mockResolvedValue(session),
    getHistory: vi.fn().mockResolvedValue([session]),
  };
}

describe("PracticeService", () => {
  it("delegates startSession to repository", async () => {
    const repository = createRepositoryMock();
    const service = new PracticeService(repository);

    await service.startSession({
      userId: "user-1",
      mode: "daily",
      topic: "Small talk",
      level: "B1",
      duration: 10,
    });

    expect(repository.startSession).toHaveBeenCalledWith({
      userId: "user-1",
      mode: "daily",
      topic: "Small talk",
      level: "B1",
      duration: 10,
    });
  });

  it("delegates sendMessage to repository", async () => {
    const repository = createRepositoryMock();
    const service = new PracticeService(repository);

    await service.sendMessage({
      sessionId: "session-1",
      content: "Hello",
    });

    expect(repository.sendMessage).toHaveBeenCalledWith({
      sessionId: "session-1",
      content: "Hello",
    });
  });
});
