import Contact from "../../domain/contact/Contact.entity";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";
import TokenService from "../../domain/services/TokenService";
import { UserRepositoryInterface } from "../../domain/user/User.repository";

export default class AddContact {
  constructor(
    private contactRepository: ContactRepositoryInterface,
    private tokenService: TokenService,
    private userRepository: UserRepositoryInterface
  ) {}

  async execute(input: CreateContactInput, token: string) {
    const isValidEmail = await this.userRepository.findByEmail(input.email);
    const contactExist = await this.contactRepository.findContactByEmail(input.email);
    const isValidToken = this.tokenService.verifyToken(token);

    if (isValidToken && contactExist === null && isValidEmail != null) {
      const contact = new Contact(
        isValidEmail?.getData().id!,
        input.email,
        input.contactName,
        input.userId
      );
      await this.contactRepository.addContact(contact);
      return;
    }
    throw new Error("Contact already exist!");
  }
}

type CreateContactInput = {
  contactId: string;
  email: string;
  contactName: string;
  userId: string;
};
