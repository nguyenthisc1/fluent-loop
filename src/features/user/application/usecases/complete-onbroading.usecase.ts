import type { UseCase } from "@/core/application/usecases/usecase";
import type { EnglishLevel, LearningGoal, User, UserId } from "../../domain/entities/user.types";
import type { UserRepository } from "../../domain/repositories/user.repository";

export interface CompleteOnboardingCommand {
  userId: UserId;
  displayName: string;
  englishLevel: EnglishLevel;
  learningGoal: LearningGoal;
  nativeLanguage?: string;
  timezone?: string;
}

export class CompleteOnboardingUseCase implements UseCase<CompleteOnboardingCommand, User> {
  constructor(private readonly userRepository: UserRepository) {}

  execute(input: CompleteOnboardingCommand): Promise<User> {
    return this.userRepository.completeOnboarding(input);
  }
}
