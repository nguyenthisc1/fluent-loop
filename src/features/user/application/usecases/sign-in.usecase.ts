import type { UseCase } from "@/core/application/usecases/usecase";
import type { AuthSession } from "../../domain/entities/user.types";
import type { UserRepository } from "../../domain/repositories/user.repository";

export interface SignInCommand {
  email: string;
  password: string;
}

export class SignInUseCase implements UseCase<SignInCommand, AuthSession> {
  constructor(private readonly userRepository: UserRepository) {}

  execute(input: SignInCommand): Promise<AuthSession> {
    return this.userRepository.signIn(input);
  }
}
