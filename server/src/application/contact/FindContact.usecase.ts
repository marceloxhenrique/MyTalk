import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";

export default class FindContact {
  constructor(private contactRepo: ContactRepositoryInterface) {}
  async execute(userId: string) {
    const contactList = await this.contactRepo.getAllContacts(userId);
    if (contactList) {
      return contactList;
    }
    throw new Error("No contacts found");
  }
}
