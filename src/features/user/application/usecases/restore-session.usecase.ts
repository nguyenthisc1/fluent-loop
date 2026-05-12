import type { NoInputUseCase } from "@/core/application/usecases/usecase";
import type { AuthSession } from "../../domain/entities/user.types";
import type { UserService } from "../services/user.service";

export class RestoreSessionUseCase implements NoInputUseCase<AuthSession | null> {
  constructor(private readonly userService: UserService) {}

  execute(): Promise<AuthSession | null> {
    return this.userService.getCurrentSession();
  }
}
