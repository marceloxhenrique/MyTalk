import TokenService from "../../domain/services/TokenService";
import { UserRepositoryInterface } from "../../domain/user/User.repository";
import bcrypt from "bcrypt";

export default class UserLogin {
  constructor(private userInMemory: UserRepositoryInterface, private tokenService: TokenService) {}
  async execute(email: string, password: string) {
    const user = await this.userInMemory.findByEmail(email);
    if (!user) {
      throw new Error("Unable to log in : Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.getPassword());
    if (!isPasswordValid) {
      throw new Error("Unable to log in: Invalid email or password");
    }
    const output = {
      token: this.tokenService.generateToken({ sub: user.getData().id }),
      refreshToken: this.tokenService.generateRefreshToken({ sub: user.getData().id }),
      user: user.getData(),
    };
    return output;
  }
}
