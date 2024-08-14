import Contact from "../../domain/contact/Contact.entity";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";
import TokenService from "../../domain/services/TokenService";

export default class AddFriendRequest {
  constructor(
    private contactRepository: ContactRepositoryInterface,
    private tokenService: TokenService
  ) {}
  async execute(contact: FriendRequestInput, token: string) {
    const isValidEmail = await this.contactRepository.findUserByEmail(contact.email);
    const contactExist = await this.contactRepository.findContactByEmail(
      contact.email,
      contact.userId
    );
    const isValidToken = this.tokenService.verifyToken(token);

    if (isValidToken && contactExist === null && isValidEmail != null) {
      const newFriendRequest = {
        email: contact.email,
        userId: contact.userId,
        userEmail: contact.userEmail,
      };

      await this.contactRepository.addFriendRequest(newFriendRequest);
      return;
    }
    throw new Error("Error while sending friend request");
  }
}

type FriendRequestInput = {
  email: string;
  userId: string;
  userEmail: string;
  id?: string;
};
