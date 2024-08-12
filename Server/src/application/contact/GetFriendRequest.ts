import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";
import TokenService from "../../domain/services/TokenService";

export default class GetFriendRequest {
  constructor(
    private contactRepository: ContactRepositoryInterface,
    private tokenService: TokenService
  ) {}
  async execute(userEmail: string, token: string) {
    const isValidToken = this.tokenService.verifyToken(token);
    if (isValidToken) {
      const friendRequest = await this.contactRepository.getFriendRequest(userEmail);
      return friendRequest;
    }
    throw new Error("No Friend Request");
  }
}
