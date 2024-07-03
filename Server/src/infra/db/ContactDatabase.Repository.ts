import Contact from "../../domain/contact/Contact.entity";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";
import Connection from "../../domain/services/Connection";
import User from "../../domain/user/User.entity";

export default class ContactDatabaseRepository implements ContactRepositoryInterface {
  constructor(private connection: Connection) {}
  async findUserByEmail(email: string): Promise<User | null> {
    const res = await this.connection.query(`SELECT * FROM public.user WHERE email = $1`, [email]);

    if (res.length === 0) {
      return null;
    }
    const row = res[0];

    return new User(row.email, row.password, row.user_name, row.id);
  }
  async addContact(contact: Contact): Promise<void> {
    this.connection.query(
      `INSERT INTO public.contact (id, contact_id, email, contact_name, user_id) values ($1, $2, $3, $4, $5)`,
      [
        contact.getData().id,
        contact.getData().contactId,
        contact.getData().email,
        contact.getData().contactName,
        contact.getData().userId,
      ]
    );
  }
  async findContactByEmail(email: string, userId: string): Promise<Contact | null> {
    const res = await this.connection.query(
      `SELECT * FROM public.contact WHERE email = $1 AND user_id = $2`,
      [email, userId]
    );
    if (res.length === 0) {
      return null;
    }
    const row = res[0];
    return new Contact(row.contact_id, row.email, row.contact_name, row.user_id, row.id);
  }
  async getAllContacts(userId: string): Promise<Contact[] | null> {
    const res = await this.connection.query(`SELECT * FROM public.contact WHERE user_id = $1`, [
      userId,
    ]);
    if (res.length === 0) {
      return null;
    }
    const allContacts: Contact[] = [];
    res.map((contact: ContactInput) => {
      const newContact = new Contact(
        contact.contact_id,
        contact.email,
        contact.contact_name,
        contact.user_id,
        contact.id
      );
      allContacts.push(newContact);
    });
    return allContacts;
  }
}
type ContactInput = {
  id: string;
  contact_id: string;
  email: string;
  contact_name: string;
  user_id: string;
};
