import { NotFoundException } from "@/core/exceptions/exception";
import { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { PracticeRepository } from "../../domain/repositories/practice.repository";
import { mockFeedbackReport } from "./mock-practice.data";
import type { PracticeSessionId, StartPracticeSessionInput, PracticeMessage, SendPracticeMessageInput, FinishPracticeSessionInput, FeedbackReport } from "../../domain/entities/practice.types";

export class MockPracticeRepository implements PracticeRepository {
  private readonly sessions = new Map<PracticeSessionId, PracticeSessionEntity>();

  async startSession(input: StartPracticeSessionInput): Promise<PracticeSessionEntity> {
    const sessionId = crypto.randomUUID();

    const openingMessage: PracticeMessage = {
      id: crypto.randomUUID(),
      sessionId,
      sender: "ai",
      content: input.mode === "interview" ? `Let's start your ${input.interviewRole ?? "job"} interview. Tell me about yourself.` : `Let's practice ${input.topic ?? "daily conversation"}. How would you start this conversation?`,
      createdAt: new Date(),
    };

    const session = PracticeSessionEntity.create({
      id: sessionId,
      userId: input.userId,
      mode: input.mode,
      title: this.createSessionTitle(input),
      topic: input.topic,
      interviewRole: input.interviewRole,
      level: input.level,
      duration: input.duration,
      practiceFocus: input.practiceFocus,
      status: "active",
      interviewType: input.interviewType,
      difficulty: input.difficulty,
      messages: [openingMessage],
      createdAt: new Date(),
    });

    this.sessions.set(session.id, session);

    return session;
  }

  async sendMessage(input: SendPracticeMessageInput): Promise<PracticeSessionEntity> {
    const session = this.sessions.get(input.sessionId);

    if (!session) {
      throw new NotFoundException("Practice session not found.");
    }

    const userMessage: PracticeMessage = {
      id: crypto.randomUUID(),
      sessionId: session.id,
      sender: "user",
      content: input.content,
      createdAt: new Date(),
    };

    const aiMessage: PracticeMessage = {
      id: crypto.randomUUID(),
      sessionId: session.id,
      sender: "ai",
      content: session.mode === "interview" ? "Good answer. Can you give me a specific example with more detail?" : "Nice. A more natural way to say that would be slightly shorter. Try continuing the conversation.",
      createdAt: new Date(),
    };

    const updatedSession = session.addMessage(userMessage).addMessage(aiMessage);

    this.sessions.set(updatedSession.id, updatedSession);

    return updatedSession;
  }

  async finishSession(input: FinishPracticeSessionInput): Promise<PracticeSessionEntity> {
    const session = this.sessions.get(input.sessionId);

    if (!session) {
      throw new NotFoundException("Practice session not found.");
    }

    const feedbackReport: FeedbackReport = {
      ...mockFeedbackReport,
      id: crypto.randomUUID(),
      sessionId: session.id,
      createdAt: new Date(),
    };

    const completedSession = session.complete(feedbackReport);

    this.sessions.set(completedSession.id, completedSession);

    return completedSession;
  }

  async getSession(sessionId: PracticeSessionId): Promise<PracticeSessionEntity | null> {
    return this.sessions.get(sessionId) ?? null;
  }

  async getHistory(userId: string): Promise<PracticeSessionEntity[]> {
    return Array.from(this.sessions.values()).filter((session) => session.userId === userId);
  }

  private createSessionTitle(input: StartPracticeSessionInput): string {
    if (input.mode === "interview") {
      return `${input.interviewRole ?? "Job"} Interview`;
    }

    return input.topic ?? "Daily Practice";
  }
}
