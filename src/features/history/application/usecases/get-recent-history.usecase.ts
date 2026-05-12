import type { HistoryItemEntity } from "../../domain/entities/history.entity";
import type { GetRecentHistoryInput } from "../../domain/entities/history.types";
import type { HistoryService } from "../services/history.service";

export class GetRecentHistoryUseCase {
  constructor(private readonly historyService: HistoryService) {}

  execute(input: GetRecentHistoryInput): Promise<HistoryItemEntity[]> {
    return this.historyService.getRecent(input);
  }
}
