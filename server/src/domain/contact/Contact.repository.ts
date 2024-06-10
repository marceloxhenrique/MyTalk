import Contact from "./Contact.entity";

export interface ContactRepositoryInterface {
  addContact(contact: Contact): Promise<void>;
  findContactByEmail(email: string): Promise<Contact | undefined>;
  getAllContacts(userId: string): Promise<Contact[] | undefined>;
}
