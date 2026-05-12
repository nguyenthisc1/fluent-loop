import type { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { FinishPracticeSessionInput } from "../../domain/entities/practice.types";
import type { PracticeService } from "../services/practice.service";

export class FinishPracticeSessionUseCase {
  constructor(private readonly practiceService: PracticeService) {}

  execute(input: FinishPracticeSessionInput): Promise<PracticeSessionEntity> {
    return this.practiceService.finishSession(input);
  }
}
