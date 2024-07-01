import User from "../../domain/user/User.entity";
import { UserRepositoryInterface } from "../../domain/user/User.repository";

export class FindUser {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(input: string): Promise<User | null> {
    const user = await this.userRepo.findById(input);
    if (user === null) throw new Error("User not found");
    return user;
  }
}
type CreateUserOutput = {
  id: string;
  email: string;
  userName?: string;
};
