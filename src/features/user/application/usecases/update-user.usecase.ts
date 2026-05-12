import type { UseCase } from "@/core/application/usecases/usecase";
import type { UpdateUserInput, User } from "../../domain/entities/user.types";
import type { UserService } from "../services/user.service";

export class UpdateUserUseCase implements UseCase<UpdateUserInput, User> {
  constructor(private readonly userService: UserService) {}

  execute(input: UpdateUserInput): Promise<User> {
    return this.userService.updateUser(input);
  }
}
