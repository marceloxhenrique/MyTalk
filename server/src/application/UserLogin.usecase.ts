import { UserRepositoryInterface } from "../domain/User.repository";
import bcrypt from "bcrypt";

export default class UserLogin {
  constructor(private userInMemory: UserRepositoryInterface) {}
  async execute(email: string, password: string) {
    const user = await this.userInMemory.findByEmail(email);
    if (!user) {
      throw new Error("Unable to log in : Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.getPassword());
    if (!isPasswordValid) {
      throw new Error("Unable to log in: Invalid email or password");
    }
    return user.getData();
  }
}
