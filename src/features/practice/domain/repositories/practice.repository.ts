import type { PracticeSessionEntity } from "../entities/practice.entity";
import type { FinishPracticeSessionInput, PracticeSessionId, SendPracticeMessageInput, StartPracticeSessionInput } from "../entities/practice.types";

export interface PracticeRepository {
  startSession(input: StartPracticeSessionInput): Promise<PracticeSessionEntity>;
  sendMessage(input: SendPracticeMessageInput): Promise<PracticeSessionEntity>;
  finishSession(input: FinishPracticeSessionInput): Promise<PracticeSessionEntity>;
  getSession(sessionId: PracticeSessionId): Promise<PracticeSessionEntity | null>;
  getHistory(userId: string): Promise<PracticeSessionEntity[]>;
}
