import User from "../domain/user.entity.js";
import { UserRepositoryInterface } from "../domain/user.repository.js";
import bcrypt from "bcrypt";
export class CreateUser {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(input: CreteUserInput): Promise<CreteUserOutput | string> {
    const userExist = await this.userRepo.findByEmail(input.email);
    console.log("initial", userExist);
    if (!userExist) {
      const saltRounds: number = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(input.password, salt);
      const user = new User(input.email, hashPassword);
      await this.userRepo.insert(user);
      // console.log(user.getData());
      return user.getData();
    }
    console.log("final", userExist);
    return "Something went wrong";
  }
}

type CreteUserInput = {
  userName?: string;
  email: string;
  password: string;
};

type CreteUserOutput = {
  id: string;
  email: string;
  password: string;
  userName?: string;
};
