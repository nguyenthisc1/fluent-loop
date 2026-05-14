import type { NoInputUseCase } from "@/core/application/usecases/usecase";
import type { UserRepository } from "../../domain/repositories/user.repository";

export class SignOutUseCase implements NoInputUseCase<void> {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): Promise<void> {
    return this.userRepository.signOut();
  }
}
