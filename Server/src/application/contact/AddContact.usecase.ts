import Contact from "../../domain/contact/Contact.entity";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";
import TokenService from "../../domain/services/TokenService";

export default class AddContact {
  constructor(
    private contactRepository: ContactRepositoryInterface,
    private tokenService: TokenService
  ) {}

  async execute(input: CreateContactInput, token: string) {
    const isValidEmail = await this.contactRepository.findUserByEmail(input.user_email);
    const contactExist = await this.contactRepository.findContactByEmail(
      input.user_email,
      input.contact_id
    );
    const isValidToken = this.tokenService.verifyToken(token);
    if (isValidToken && contactExist === null && isValidEmail != null) {
      const contact = new Contact(isValidEmail?.getData().id!, input.user_email, input.contact_id);
      const userContact = new Contact(input.contact_id, input.contact_email, input.user_id);
      await this.contactRepository.addContact(contact);
      await this.contactRepository.addContact(userContact);
      await this.contactRepository.deleteFriendRequest(input.contact_email, input.user_email);
      return;
    }
    throw new Error("Contact already exist!");
  }
}

type CreateContactInput = {
  contact_id: string;
  contact_email: string;
  user_email: string;
  user_id: string;
};
