import type { FinishPracticeSessionInput, PracticeSessionId, SendPracticeMessageInput, StartPracticeSessionInput } from "../../domain/entities/practice.types";
import type { PracticeRepository } from "../../domain/repositories/practice.repository";

export class PracticeService {
  constructor(private readonly practiceRepository: PracticeRepository) {}

  startSession(input: StartPracticeSessionInput) {
    return this.practiceRepository.startSession(input);
  }

  sendMessage(input: SendPracticeMessageInput) {
    return this.practiceRepository.sendMessage(input);
  }

  finishSession(input: FinishPracticeSessionInput) {
    return this.practiceRepository.finishSession(input);
  }

  getSession(sessionId: PracticeSessionId) {
    return this.practiceRepository.getSession(sessionId);
  }

  getHistory(userId: string) {
    return this.practiceRepository.getHistory(userId);
  }
}
