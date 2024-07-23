import User from "../../domain/user/User.entity";
import { UserRepositoryInterface } from "../../domain/user/User.repository";

export class UpdateUser {
  constructor(private userRepo: UserRepositoryInterface) {}
  async execute(userName: string, userId: string) {
    await this.userRepo.updateUserName(userName, userId);
  }
}
