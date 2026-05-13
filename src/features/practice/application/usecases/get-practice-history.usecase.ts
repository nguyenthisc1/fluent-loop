import type { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { PracticeService } from "../services/practice.service";

export class GetPracticeHistoryUseCase {
  constructor(private readonly practiceService: PracticeService) {}

  execute(userId: string): Promise<PracticeSessionEntity[]> {
    return this.practiceService.getHistory(userId);
  }
}
