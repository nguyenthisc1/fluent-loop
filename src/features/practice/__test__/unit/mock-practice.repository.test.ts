import { ConflictException, NotFoundException } from "@/core/exceptions/exception";
import { describe, expect, it } from "vitest";
import { MockPracticeRepository } from "../mock/mock-practice.repository";

describe("MockPracticeRepository", () => {
  it("starts a daily practice session", async () => {
    const repository = new MockPracticeRepository();

    const session = await repository.startSession({
      userId: "user-1",
      mode: "daily",
      topic: "Small talk",
      level: "B1",
      duration: 10,
      practiceFocus: ["speaking_fluency"],
    });

    expect(session.userId).toBe("user-1");
    expect(session.mode).toBe("daily");
    expect(session.title).toBe("Small talk");
    expect(session.messages).toHaveLength(1);
    expect(session.messages[0].sender).toBe("ai");
  });

  it("starts an interview practice session", async () => {
    const repository = new MockPracticeRepository();

    const session = await repository.startSession({
      userId: "user-1",
      mode: "interview",
      interviewRole: "Frontend Developer",
      interviewType: "behavioral",
      difficulty: "standard",
      level: "B1",
      duration: 10,
      practiceFocus: ["interview_confidence"],
    });

    expect(session.mode).toBe("interview");
    expect(session.title).toBe("Frontend Developer Interview");
    expect(session.interviewRole).toBe("Frontend Developer");
    expect(session.interviewType).toBe("behavioral");
    expect(session.difficulty).toBe("standard");
  });

  it("sends a message and receives a mock AI reply", async () => {
    const repository = new MockPracticeRepository();

    const session = await repository.startSession({
      userId: "user-1",
      mode: "daily",
      topic: "Travel",
      level: "B1",
      duration: 10,
    });

    const updatedSession = await repository.sendMessage({
      sessionId: session.id,
      content: "I want to check in.",
    });

    expect(updatedSession.messages).toHaveLength(3);
    expect(updatedSession.messages[1].sender).toBe("user");
    expect(updatedSession.messages[2].sender).toBe("ai");
  });

  it("throws when sending a message to a missing session", async () => {
    const repository = new MockPracticeRepository();

    await expect(
      repository.sendMessage({
        sessionId: "missing-session",
        content: "Hello",
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it("finishes a session and creates feedback", async () => {
    const repository = new MockPracticeRepository();

    const session = await repository.startSession({
      userId: "user-1",
      mode: "daily",
      topic: "Travel",
      level: "B1",
      duration: 10,
    });

    const completedSession = await repository.finishSession({
      sessionId: session.id,
    });

    expect(completedSession.isCompleted()).toBe(true);
    expect(completedSession.feedbackReport).toBeDefined();
    expect(completedSession.feedbackReport?.score.overall).toBeGreaterThan(0);
  });

  it("throws when finishing a completed session twice", async () => {
    const repository = new MockPracticeRepository();

    const session = await repository.startSession({
      userId: "user-1",
      mode: "daily",
      topic: "Travel",
      level: "B1",
      duration: 10,
    });

    await repository.finishSession({ sessionId: session.id });

    await expect(repository.finishSession({ sessionId: session.id })).rejects.toBeInstanceOf(ConflictException);
  });

  it("returns history by user", async () => {
    const repository = new MockPracticeRepository();

    await repository.startSession({
      userId: "user-1",
      mode: "daily",
      topic: "Travel",
      level: "B1",
      duration: 10,
    });

    await repository.startSession({
      userId: "user-2",
      mode: "daily",
      topic: "Small talk",
      level: "B1",
      duration: 10,
    });

    const history = await repository.getHistory("user-1");

    expect(history).toHaveLength(1);
    expect(history[0].userId).toBe("user-1");
  });
});
