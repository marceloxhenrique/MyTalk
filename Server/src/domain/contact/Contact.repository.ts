import Contact from "./Contact.entity";

export interface ContactRepositoryInterface {
  addContact(contact: Contact): Promise<void>;
  findContactByEmail(email: string): Promise<Contact | null>;
  getAllContacts(userId: string): Promise<Contact[] | null>;
}
