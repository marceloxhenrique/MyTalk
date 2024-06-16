import TokenService from "../../domain/services/TokenService";
import { UserRepositoryInterface } from "../../domain/user/User.repository";
import bcrypt from "bcrypt";

export default class UserLogin {
  constructor(private userInMemory: UserRepositoryInterface, private tokenService: TokenService) {}
  async execute(email: string, password: string) {
    const result = await this.userInMemory.findByEmail(email);
    const user = {
      id: result[0].id,
      userName: result[0].userName,
      email: result[0].email,
    };
    if (this.isValidUser(result)) {
      throw new Error("Unable to log in : Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, result[0].password);
    if (!isPasswordValid) {
      throw new Error("Unable to log in: Invalid email or password");
    }

    const output = {
      token: this.tokenService.generateToken({ sub: user.id }),
      refreshToken: this.tokenService.generateRefreshToken({ sub: user.id }),
      user: user,
    };
    return output;
  }

  isValidUser(user: any) {
    return user.length === 0;
  }
}
