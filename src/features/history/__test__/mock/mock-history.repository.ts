import type { HistoryItemEntity } from "../../domain/entities/history.entity";
import type { GetHistoryItemsInput, GetRecentHistoryInput } from "../../domain/entities/history.types";
import type { HistoryRepository } from "../../domain/repositories/history.repository";
import { mockHistoryItems } from "./mock-history.data";

export class MockHistoryRepository implements HistoryRepository {
  private readonly items: HistoryItemEntity[];

  constructor(initialItems: HistoryItemEntity[] = mockHistoryItems) {
    this.items = initialItems;
  }

  async getItems(input: GetHistoryItemsInput): Promise<HistoryItemEntity[]> {
    return this.items
      .filter((item) => item.userId === input.userId)
      .filter((item) => (input.mode ? item.mode === input.mode : true))
      .filter((item) => (input.status ? item.status === input.status : true))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getRecent(input: GetRecentHistoryInput): Promise<HistoryItemEntity[]> {
    const limit = input.limit ?? 5;

    return this.items
      .filter((item) => item.userId === input.userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}
