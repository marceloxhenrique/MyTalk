import TokenService from "../../domain/services/TokenService";
import { UserRepositoryInterface } from "../../domain/user/User.repository";
import bcrypt from "bcrypt";

export default class UserLogin {
  constructor(private userInMemory: UserRepositoryInterface, private tokenService: TokenService) {}
  async execute(email: string, password: string) {
    const result = await this.userInMemory.findByEmail(email);

    if (result === null) {
      throw new Error("Unable to log in : Invalid email or password");
    }

    const isPasswordValid = bcrypt.compare(password, result?.getPassword()!);
    if (!isPasswordValid) {
      throw new Error("Unable to log in: Invalid email or password");
    }

    const output = {
      token: this.tokenService.generateToken({ sub: result?.getData().id }),
      refreshToken: this.tokenService.generateRefreshToken({ sub: result?.getData().id }),
      user: result?.getData(),
    };
    return output;
  }
}
