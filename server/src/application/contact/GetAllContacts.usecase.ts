import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";
import TokenService from "../../domain/services/TokenService";

export default class GetAllContacts {
  constructor(
    private contactRepo: ContactRepositoryInterface,
    private tokenService: TokenService
  ) {}
  async execute(userId: string, token: string) {
    const isValidToken = this.tokenService.verifyToken(token);
    if (isValidToken) {
      const contactList = await this.contactRepo.getAllContacts(userId);
      return contactList;
    }

    throw new Error("No contacts found");
  }
}
