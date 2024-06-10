import Contact from "../../domain/contact/Contact.entity";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";

export default class AddContact {
  constructor(private contactRepo: ContactRepositoryInterface) {}

  async execute(input: CreateContactInput): Promise<CreateContactOutput | string> {
    const contactExist = await this.contactRepo.findContactByEmail(input.email);
    if (!contactExist) {
      const contact = new Contact(input.email, input.userId, input?.userName);
      await this.contactRepo.addContact(contact);
      return contact.getData();
    }
    throw new Error("Contact already exist!");
  }
}

type CreateContactInput = {
  email: string;
  userId: string;
  userName?: string;
};

type CreateContactOutput = {
  id: string;
  email: string;
  userId: string;
  userName?: string;
};
