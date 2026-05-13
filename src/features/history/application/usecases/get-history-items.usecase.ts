import type { HistoryItemEntity } from "../../domain/entities/history.entity";
import type { GetHistoryItemsInput } from "../../domain/entities/history.types";
import type { HistoryService } from "../services/history.service";

export class GetHistoryItemsUseCase {
  constructor(private readonly historyService: HistoryService) {}

  execute(input: GetHistoryItemsInput): Promise<HistoryItemEntity[]> {
    return this.historyService.getItems(input);
  }
}
