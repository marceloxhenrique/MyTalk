import Contact from "../../domain/contact/Contact.entity";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";

export default class ContactInMeory implements ContactRepositoryInterface {
  contact: Contact[] = [];
  async addContact(contact: Contact): Promise<void> {
    this.contact.push(contact);
    console.log("Contact in memory", contact);
  }
  async findContactByEmail(email: string): Promise<Contact | undefined> {
    return this.contact.find((contact) => contact.getData().email === email);
  }

  async getAllContacts(userId: string): Promise<Contact[] | undefined> {
    return this.contact.filter((contact) => contact.getData().userId === userId);
  }
}
