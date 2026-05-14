import { MockUserRepository } from "./__test__/mock/mock-user.repository";
import { UserController } from "./application/controllers/user.controller";
import { UserExceptionPresenter } from "./application/presenters/exception.presenter";
import { CompleteOnboardingUseCase } from "./application/usecases/complete-onbroading.usecase";
import { RestoreSessionUseCase } from "./application/usecases/restore-session.usecase";
import { SignInUseCase } from "./application/usecases/sign-in.usecase";
import { SignOutUseCase } from "./application/usecases/sign-out.usecase";
import { SignUpUseCase } from "./application/usecases/sign-up.usecase";
import { UpdateUserUseCase } from "./application/usecases/update-user.usecase";
import type { UserRepository } from "./domain/repositories/user.repository";

export type UserDependencies = {
  userRepository: UserRepository;
  userController: UserController;
  userExceptionPresenter: UserExceptionPresenter;
  restoreSessionUseCase: RestoreSessionUseCase;
  signInUseCase: SignInUseCase;
  signUpUseCase: SignUpUseCase;
  signOutUseCase: SignOutUseCase;
  completeOnboardingUseCase: CompleteOnboardingUseCase;
  updateUserUseCase: UpdateUserUseCase;
};

export function createUserDependencies(): UserDependencies {
  const userRepository = new MockUserRepository();
  const signInUseCase = new SignInUseCase(userRepository);
  const signUpUseCase = new SignUpUseCase(userRepository);
  const signOutUseCase = new SignOutUseCase(userRepository);
  const completeOnboardingUseCase = new CompleteOnboardingUseCase(userRepository);
  const restoreSessionUseCase = new RestoreSessionUseCase(userRepository);
  const updateUserUseCase = new UpdateUserUseCase(userRepository);

  const userController = new UserController(signInUseCase, signUpUseCase, completeOnboardingUseCase);
  const userExceptionPresenter = new UserExceptionPresenter();

  return {
    userRepository,
    userController,
    userExceptionPresenter,
    restoreSessionUseCase,
    signInUseCase,
    signUpUseCase,
    signOutUseCase,
    completeOnboardingUseCase,
    updateUserUseCase,
  };
}
