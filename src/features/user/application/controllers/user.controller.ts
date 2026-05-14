import type { CompleteOnboardingDto } from "../dtos/onbroading.dto";
import type { SignInDto } from "../dtos/sign-in.dto";
import type { SignUpDto } from "../dtos/sign-up.dto";
import type { CompleteOnboardingUseCase } from "../usecases/complete-onbroading.usecase";
import type { SignInUseCase } from "../usecases/sign-in.usecase";
import type { SignUpUseCase } from "../usecases/sign-up.usecase";

export class UserController {
  private readonly _signInUsecase: SignInUseCase;
  private readonly _signUpUsecase: SignUpUseCase;
  private readonly _completeOnboardingUseCase: CompleteOnboardingUseCase;

  constructor(signInUsecase: SignInUseCase, signUpUsecase: SignUpUseCase, completeOnboardingUseCase: CompleteOnboardingUseCase) {
    this._signInUsecase = signInUsecase;
    this._signUpUsecase = signUpUsecase;
    this._completeOnboardingUseCase = completeOnboardingUseCase;
  }

  signIn(body: SignInDto) {
    return this._signInUsecase.execute(body);
  }

  signUp(body: SignUpDto) {
    return this._signUpUsecase.execute(body);
  }

  completeOnboarding(body: CompleteOnboardingDto) {
    return this._completeOnboardingUseCase.execute(body);
  }
}
