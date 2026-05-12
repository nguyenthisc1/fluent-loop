import type { CompleteOnboardingInput, SignInInput, SignUpInput, UpdateUserInput, UserId } from "../../domain/entities/user.types";
import type { UserRepository } from "../../domain/repositories/user.repository";

export class UserService {
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  private readonly userRepository: UserRepository;

  signIn(input: SignInInput) {
    return this.userRepository.signIn(input);
  }

  signUp(input: SignUpInput) {
    return this.userRepository.signUp(input);
  }

  signOut() {
    return this.userRepository.signOut();
  }

  getCurrentSession() {
    return this.userRepository.getCurrentSession();
  }

  getCurrentUser() {
    return this.userRepository.getCurrentUser();
  }

  getUser(userId: UserId) {
    return this.userRepository.getUser(userId);
  }

  completeOnboarding(input: CompleteOnboardingInput) {
    return this.userRepository.completeOnboarding(input);
  }

  updateUser(input: UpdateUserInput) {
    return this.userRepository.updateUser(input);
  }
}
