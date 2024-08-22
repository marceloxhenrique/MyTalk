import Contact from "../../domain/contact/Contact.entity";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";

export default class AddDefaultContact {
  constructor(private contactRepository: ContactRepositoryInterface) {}

  async execute(email: string, id: string) {
    const { CONTACT_DEFAULT_EMAIL, CONTACT_DEFAULT_ID } = process.env;

    if (CONTACT_DEFAULT_EMAIL && CONTACT_DEFAULT_ID) {
      const addDefaultContact = new Contact(CONTACT_DEFAULT_ID, CONTACT_DEFAULT_EMAIL, id);
      const addUserContact = new Contact(id, email, CONTACT_DEFAULT_ID);
      await this.contactRepository.addContact(addUserContact);
      await this.contactRepository.addContact(addDefaultContact);
    }
  }
}
