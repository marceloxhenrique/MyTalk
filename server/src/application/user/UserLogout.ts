import TokenService from "../../domain/services/TokenService";

export default class UserLogout {
  constructor(private tokenService: TokenService) {}
  execute(token: string) {
    const res = this.tokenService.verifyToken(token);
    if (res === "Unauthorized") {
      throw new Error("Unauthorized");
    }
    return res;
  }
}
