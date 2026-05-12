import { NotFoundException } from "@/core/exceptions/exception";
import { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { FinishPracticeSessionInput, PracticeSessionId, SendPracticeMessageInput, StartPracticeSessionInput } from "../../domain/entities/practice.types";
import type { PracticeRepository } from "../../domain/repositories/practice.repository";
import { PracticeSessionMapper } from "../mapper/practice-session.mapper";
import type { PracticeSessionModel } from "../models/practice-session.model";

type SupabaseLikeClient = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: (table: string) => any;
};

export class SupabasePracticeRepository implements PracticeRepository {
  constructor(
    private readonly supabase: SupabaseLikeClient,
    private readonly mapper = new PracticeSessionMapper(),
  ) {}

  async startSession(input: StartPracticeSessionInput): Promise<PracticeSessionEntity> {
    const sessionId = crypto.randomUUID();
    const now = new Date();

    const session = PracticeSessionEntity.create({
      id: sessionId,
      userId: input.userId,
      mode: input.mode,
      title: input.mode === "interview" ? `${input.interviewRole ?? "Job"} Interview` : (input.topic ?? "Daily Practice"),
      topic: input.topic,
      interviewRole: input.interviewRole,
      level: input.level,
      duration: input.duration,
      // practiceFocus: input.practiceFocus,
      status: "active",
      messages: [
        {
          id: crypto.randomUUID(),
          sessionId,
          sender: "ai",
          content: input.mode === "interview" ? `Let's start your ${input.interviewRole ?? "job"} interview. Tell me about yourself.` : `Let's practice ${input.topic ?? "daily conversation"}. How would you start this conversation?`,
          createdAt: now,
        },
      ],
      createdAt: now,
    });

    const payload = this.mapper.toPersistence(session);

    const { data, error } = await this.supabase.from("practice_sessions").insert(payload).select().single();

    if (error) {
      throw error;
    }

    return this.mapper.toDomain(data as PracticeSessionModel);
  }

  async sendMessage(input: SendPracticeMessageInput): Promise<PracticeSessionEntity> {
    const session = await this.getRequiredSession(input.sessionId);

    const userMessage = {
      id: crypto.randomUUID(),
      sessionId: session.id,
      sender: "user" as const,
      content: input.content,
      createdAt: new Date(),
    };

    const aiMessage = {
      id: crypto.randomUUID(),
      sessionId: session.id,
      sender: "ai" as const,
      content: session.mode === "interview" ? "Good answer. Can you give me a specific example with more detail?" : "Nice. Try continuing the conversation with one more natural sentence.",
      createdAt: new Date(),
    };

    const updatedSession = session.addMessage(userMessage).addMessage(aiMessage);
    return this.save(updatedSession);
  }

  async finishSession(input: FinishPracticeSessionInput): Promise<PracticeSessionEntity> {
    const session = await this.getRequiredSession(input.sessionId);
    const completedSession = session.complete();
    return this.save(completedSession);
  }

  async getSession(sessionId: PracticeSessionId): Promise<PracticeSessionEntity | null> {
    const { data, error } = await this.supabase.from("practice_sessions").select("*").eq("id", sessionId).maybeSingle();

    if (error || !data) {
      return null;
    }

    return this.mapper.toDomain(data as PracticeSessionModel);
  }

  async getHistory(userId: string): Promise<PracticeSessionEntity[]> {
    const { data, error } = await this.supabase.from("practice_sessions").select("*").eq("user_id", userId).order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return ((data ?? []) as PracticeSessionModel[]).map((model) => this.mapper.toDomain(model));
  }

  private async getRequiredSession(sessionId: PracticeSessionId): Promise<PracticeSessionEntity> {
    const session = await this.getSession(sessionId);

    if (!session) {
      throw new NotFoundException("Practice session not found.");
    }

    return session;
  }

  private async save(session: PracticeSessionEntity): Promise<PracticeSessionEntity> {
    const payload = this.mapper.toPersistence(session);

    const { data, error } = await this.supabase.from("practice_sessions").upsert(payload).select().single();

    if (error) {
      throw error;
    }

    return this.mapper.toDomain(data as PracticeSessionModel);
  }
}
