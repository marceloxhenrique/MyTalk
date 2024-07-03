import User from "../user/User.entity";
import Contact from "./Contact.entity";

export interface ContactRepositoryInterface {
  addContact(contact: Contact): Promise<void>;
  findContactByEmail(email: string, userId?: string): Promise<Contact | null>;
  getAllContacts(userId: string): Promise<Contact[] | null>;
  findUserByEmail(userEmail: string): Promise<User | null>;
}
