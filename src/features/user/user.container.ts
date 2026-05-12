import { MockUserRepository } from "./__test__/mock/mock-user.repository";
import { UserService } from "./application/services/user.service";
import { CompleteOnboardingUseCase } from "./application/usecases/complete-onbroading.usecase";
import { RestoreSessionUseCase } from "./application/usecases/restore-session.usecase";
import { SignInUseCase } from "./application/usecases/sign-in.usecase";
import { SignOutUseCase } from "./application/usecases/sign-out.usecase";
import { SignUpUseCase } from "./application/usecases/sign-up.usecase";
import { UpdateUserUseCase } from "./application/usecases/update-user.usecase";
import type { UserRepository } from "./domain/repositories/user.repository";

export type UserDependencies = {
  userRepository: UserRepository;
  userService: UserService;
  restoreSessionUseCase: RestoreSessionUseCase;
  signInUseCase: SignInUseCase;
  signUpUseCase: SignUpUseCase;
  signOutUseCase: SignOutUseCase;
  completeOnboardingUseCase: CompleteOnboardingUseCase;
  updateUserUseCase: UpdateUserUseCase;
};

export function createUserDependencies(): UserDependencies {
  const userRepository = new MockUserRepository();
  const userService = new UserService(userRepository);

  return {
    userRepository,
    userService,
    restoreSessionUseCase: new RestoreSessionUseCase(userService),
    signInUseCase: new SignInUseCase(userService),
    signUpUseCase: new SignUpUseCase(userService),
    signOutUseCase: new SignOutUseCase(userService),
    completeOnboardingUseCase: new CompleteOnboardingUseCase(userService),
    updateUserUseCase: new UpdateUserUseCase(userService),
  };
}
