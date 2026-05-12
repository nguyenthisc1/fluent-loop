import type { UseCase } from "@/core/application/usecases/usecase";
import type { CompleteOnboardingInput, User } from "../../domain/entities/user.types";
import type { UserService } from "../services/user.service";

export class CompleteOnboardingUseCase implements UseCase<CompleteOnboardingInput, User> {
  constructor(private readonly userService: UserService) {}

  execute(input: CompleteOnboardingInput): Promise<User> {
    return this.userService.completeOnboarding(input);
  }
}
