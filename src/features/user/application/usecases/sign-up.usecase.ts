import type { UseCase } from "@/core/application/usecases/usecase";
import type { AuthSession, SignUpProps } from "../../domain/entities/user.types";
import type { UserRepository } from "../../domain/repositories/user.repository";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignUpCommand extends SignUpProps {}

export class SignUpUseCase implements UseCase<SignUpCommand, AuthSession> {
  constructor(private readonly userRepository: UserRepository) {}

  execute(input: SignUpCommand): Promise<AuthSession> {
    return this.userRepository.signUp(input);
  }
}
