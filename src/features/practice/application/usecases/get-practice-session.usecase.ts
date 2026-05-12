import type { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { PracticeSessionId } from "../../domain/entities/practice.types";
import type { PracticeService } from "../services/practice.service";

export class GetPracticeSessionUseCase {
  constructor(private readonly practiceService: PracticeService) {}

  execute(sessionId: PracticeSessionId): Promise<PracticeSessionEntity | null> {
    return this.practiceService.getSession(sessionId);
  }
}
