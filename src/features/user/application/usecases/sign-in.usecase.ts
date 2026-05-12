import type { UseCase } from "@/core/application/usecases/usecase";
import type { AuthSession, SignInInput } from "../../domain/entities/user.types";
import type { UserService } from "../services/user.service";

export class SignInUseCase implements UseCase<SignInInput, AuthSession> {
  constructor(private readonly userService: UserService) {}

  execute(input: SignInInput): Promise<AuthSession> {
    return this.userService.signIn(input);
  }
}
