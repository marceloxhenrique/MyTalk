import Contact from "../../domain/contact/Contact.entity";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";
import TokenService from "../../domain/services/TokenService";

export default class IgnoreFriendRequest {
  constructor(
    private contactRepository: ContactRepositoryInterface,
    private tokenService: TokenService
  ) {}
  async execute(input: IgnoreContactInput, token: string) {
    const isValidToken = this.tokenService.verifyToken(token);
    if (isValidToken) {
      await this.contactRepository.deleteFriendRequest(input.contact_email, input.user_email);
      return;
    }
    throw new Error("Error while ignoring friend request");
  }
}

type IgnoreContactInput = {
  contact_id: string;
  contact_email: string;
  user_email: string;
  user_id: string;
};
