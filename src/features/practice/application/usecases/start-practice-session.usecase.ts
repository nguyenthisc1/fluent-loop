import type { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { StartPracticeSessionInput } from "../../domain/entities/practice.types";
import type { PracticeService } from "../services/practice.service";

export class StartPracticeSessionUseCase {
  constructor(private readonly practiceService: PracticeService) {}

  execute(input: StartPracticeSessionInput): Promise<PracticeSessionEntity> {
    return this.practiceService.startSession(input);
  }
}
