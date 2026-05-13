import { MockHistoryRepository } from "./__test__/mock/mock-history.repository";
import { HistoryService } from "./application/services/history.service";
import { GetHistoryItemsUseCase } from "./application/usecases/get-history-items.usecase";
import { GetRecentHistoryUseCase } from "./application/usecases/get-recent-history.usecase";
import type { HistoryRepository } from "./domain/repositories/history.repository";

export type HistoryDependencies = {
  historyRepository: HistoryRepository;
  historyService: HistoryService;
  getHistoryItemsUseCase: GetHistoryItemsUseCase;
  getRecentHistoryUseCase: GetRecentHistoryUseCase;
};

export function createHistoryDependencies(): HistoryDependencies {
  const historyRepository = new MockHistoryRepository();
  const historyService = new HistoryService(historyRepository);

  return {
    historyRepository,
    historyService,
    getHistoryItemsUseCase: new GetHistoryItemsUseCase(historyService),
    getRecentHistoryUseCase: new GetRecentHistoryUseCase(historyService),
  };
}
