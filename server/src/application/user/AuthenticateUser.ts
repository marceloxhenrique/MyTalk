import { UserRepositoryInterface } from "./../../domain/user/User.repository";
import TokenService from "../../domain/services/TokenService";

export default class AuthenticateUser {
  constructor(
    private tokenService: TokenService,
    private userRepository: UserRepositoryInterface
  ) {}
  async execute(token: string) {
    const res = this.tokenService.verifyToken(token);
    if (res === "Unauthorized") {
      return;
    }
    const user = await this.userRepository.findById(res as string);
    return user?.getData();
  }
}
