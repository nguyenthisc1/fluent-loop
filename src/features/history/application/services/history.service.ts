import type { GetHistoryItemsInput, GetRecentHistoryInput } from "../../domain/entities/history.types";
import type { HistoryRepository } from "../../domain/repositories/history.repository";

export class HistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  getItems(input: GetHistoryItemsInput) {
    return this.historyRepository.getItems(input);
  }

  getRecent(input: GetRecentHistoryInput) {
    return this.historyRepository.getRecent(input);
  }
}
