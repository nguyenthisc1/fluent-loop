import { MockPracticeRepository } from "./__test__/mock/mock-practice.repository";
import { PracticeService } from "./application/services/practice.service";
import { FinishPracticeSessionUseCase } from "./application/usecases/finish-practice-session.usecase";
import { GetPracticeHistoryUseCase } from "./application/usecases/get-practice-history.usecase";
import { GetPracticeSessionUseCase } from "./application/usecases/get-practice-session.usecase";
import { SendPracticeMessageUseCase } from "./application/usecases/send-practice-message.usecase";
import { StartPracticeSessionUseCase } from "./application/usecases/start-practice-session.usecase";

export type PracticeDependencies = {
  practiceRepository: MockPracticeRepository;
  practiceService: PracticeService;
  startPracticeSessionUseCase: StartPracticeSessionUseCase;
  sendPracticeMessageUseCase: SendPracticeMessageUseCase;
  finishPracticeSessionUseCase: FinishPracticeSessionUseCase;
  getPracticeSessionUseCase: GetPracticeSessionUseCase;
  getPracticeHistoryUseCase: GetPracticeHistoryUseCase;
};

export function createPracticeDependencies(): PracticeDependencies {
  const practiceRepository = new MockPracticeRepository();
  const practiceService = new PracticeService(practiceRepository);

  return {
    practiceRepository,
    practiceService,
    startPracticeSessionUseCase: new StartPracticeSessionUseCase(practiceService),
    sendPracticeMessageUseCase: new SendPracticeMessageUseCase(practiceService),
    finishPracticeSessionUseCase: new FinishPracticeSessionUseCase(practiceService),
    getPracticeSessionUseCase: new GetPracticeSessionUseCase(practiceService),
    getPracticeHistoryUseCase: new GetPracticeHistoryUseCase(practiceService),
  };
}
