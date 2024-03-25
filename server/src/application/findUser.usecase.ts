import User from "../domain/user.entity.js";
import { UserRepositoryInterface } from "../domain/user.repository.js";

export class FindUser {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(input: string) {
    const user = await this.userRepo.findById(input);
    if (!user) throw new Error("Id doesn't exist");
    return user;
  }
}
