import type { UseCase } from "@/core/application/usecases/usecase";
import type { AuthSession, SignUpInput } from "../../domain/entities/user.types";
import type { UserService } from "../services/user.service";

export class SignUpUseCase implements UseCase<SignUpInput, AuthSession> {
  constructor(private readonly userService: UserService) {}

  execute(input: SignUpInput): Promise<AuthSession> {
    return this.userService.signUp(input);
  }
}
