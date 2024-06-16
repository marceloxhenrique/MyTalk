import User from "../../domain/user/User.entity";
import { UserRepositoryInterface } from "../../domain/user/User.repository";
import bcrypt from "bcrypt";
export class CreateUser {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(input: CreteUserInput): Promise<CreateUserOutput | string> {
    const userExist = await this.userRepo.findByEmail(input.email);
    if (this.isValidUser(userExist) && input.password.length > 5) {
      const saltRounds: number = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(input.password, salt);
      const user = new User(input.email, hashPassword, input?.userName);
      await this.userRepo.create(user);
      return user.getData();
    }

    throw new Error("Email or password invalid");
  }
  isValidUser(user: any) {
    return user.length === 0;
  }
}

type CreteUserInput = {
  userName?: string;
  email: string;
  password: string;
};

type CreateUserOutput = {
  id: string;
  email: string;
  userName?: string;
};
