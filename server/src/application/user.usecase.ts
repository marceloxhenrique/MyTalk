import User from "../domain/user.entity.js";
import { UserRepositoryInterface } from "../domain/user.repository.js";

export class CreateUser {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(input: CreteUserInput): Promise<CreteUserOutput> {
    const user = new User(input.userName, input.email, input.password);
    await this.userRepo.insert(user);
    console.log(user.getData());
    return user.getData();
  }
}

type CreteUserInput = {
  userName: string;
  email: string;
  password: string;
};

type CreteUserOutput = {
  id: string;
  userName: string;
  email: string;
  password: string;
};
