import type { HistoryItemEntity } from "../entities/history.entity";
import type { GetHistoryItemsInput, GetRecentHistoryInput } from "../entities/history.types";

export interface HistoryRepository {
  getItems(input: GetHistoryItemsInput): Promise<HistoryItemEntity[]>;
  getRecent(input: GetRecentHistoryInput): Promise<HistoryItemEntity[]>;
}
