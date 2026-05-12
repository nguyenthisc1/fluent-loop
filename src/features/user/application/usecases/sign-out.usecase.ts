import type { NoInputUseCase } from "@/core/application/usecases/usecase";
import type { UserService } from "../services/user.service";

export class SignOutUseCase implements NoInputUseCase<void> {
  constructor(private readonly userService: UserService) {}

  execute(): Promise<void> {
    return this.userService.signOut();
  }
}
