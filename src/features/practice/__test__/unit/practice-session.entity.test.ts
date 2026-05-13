import { ConflictException } from "@/core/exceptions/exception";
import { describe, expect, it } from "vitest";
import { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { PracticeMessage } from "../../domain/entities/practice.types";

function createActiveSession() {
  return PracticeSessionEntity.create({
    id: "session-1",
    userId: "user-1",
    mode: "daily",
    title: "Small Talk",
    topic: "Small talk",
    level: "B1",
    duration: 10,
    practiceFocus: ["speaking_fluency"],
    status: "active",
    messages: [],
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
  });
}

describe("PracticeSessionEntity", () => {
  it("adds a message when session is active", () => {
    const session = createActiveSession();

    const message: PracticeMessage = {
      id: "message-1",
      sessionId: session.id,
      sender: "user",
      content: "Hello!",
      createdAt: new Date(),
    };

    const updatedSession = session.addMessage(message);

    expect(updatedSession.messages).toHaveLength(1);
    expect(updatedSession.messages[0]).toEqual(message);
    expect(session.messages).toHaveLength(0);
  });

  it("completes an active session", () => {
    const session = createActiveSession();

    const completedSession = session.complete();

    expect(completedSession.isCompleted()).toBe(true);
    expect(completedSession.completedAt).toBeInstanceOf(Date);
  });

  it("does not add a message to a completed session", () => {
    const session = createActiveSession().complete();

    const message: PracticeMessage = {
      id: "message-1",
      sessionId: session.id,
      sender: "user",
      content: "Hello!",
      createdAt: new Date(),
    };

    expect(() => session.addMessage(message)).toThrow(ConflictException);
  });

  it("does not complete an already completed session", () => {
    const session = createActiveSession().complete();

    expect(() => session.complete()).toThrow(ConflictException);
  });

  it("returns defensive copies of arrays", () => {
    const session = createActiveSession();

    const messages = session.messages;
    messages.push({
      id: "message-1",
      sessionId: session.id,
      sender: "user",
      content: "Mutated",
      createdAt: new Date(),
    });

    expect(session.messages).toHaveLength(0);
  });
});
