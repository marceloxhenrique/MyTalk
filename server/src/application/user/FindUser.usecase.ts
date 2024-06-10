import TokenService from "../../domain/services/TokenService";
import { UserRepositoryInterface } from "../../domain/user/User.repository";

export class FindUser {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(input: string): Promise<CreateUserOutput | undefined> {
    const user = await this.userRepo.findById(input);
    if (!user) throw new Error("User not found");
    return user.getData();
  }
}
type CreateUserOutput = {
  id: string;
  email: string;
  userName?: string;
};
