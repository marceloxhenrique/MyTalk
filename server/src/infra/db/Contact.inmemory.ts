import Contact from "../../domain/contact/Contact.entity";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";

export default class ContactInMeory implements ContactRepositoryInterface {
  contacts: Contact[] = [];
  async addContact(contact: Contact): Promise<void> {
    this.contacts.push(contact);
    console.log("Contact in memory", this.contacts);
  }
  async findContactByEmail(email: string): Promise<Contact | null> {
    const res: Contact[] = this.contacts.filter((contact) => contact.getData().email === email);
    if (res.length === 0) {
      return null;
    }
    return res[0];
  }

  async getAllContacts(userId: string): Promise<Contact[] | undefined> {
    return this.contacts.filter((contact) => contact.getData().userId === userId);
  }
}
