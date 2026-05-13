import type { PracticeSessionEntity } from "../../domain/entities/practice.entity";
import type { SendPracticeMessageInput } from "../../domain/entities/practice.types";
import type { PracticeService } from "../services/practice.service";

export class SendPracticeMessageUseCase {
  constructor(private readonly practiceService: PracticeService) {}

  execute(input: SendPracticeMessageInput): Promise<PracticeSessionEntity> {
    return this.practiceService.sendMessage(input);
  }
}
