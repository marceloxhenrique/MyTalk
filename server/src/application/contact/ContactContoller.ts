import { HttpServer } from "../../adapters/HttpServer";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";
import AddContact from "./AddContact.usecase";
import FindContact from "./FindContact.usecase";

export default class ContactController {
  constructor(
    private contactInMemory: ContactRepositoryInterface,
    readonly HttpServer: HttpServer
  ) {
    HttpServer.on("post", "/api/contact", async (req, res) => {
      try {
        const addContact = new AddContact(contactInMemory);
        const newContact = await addContact.execute(req.body);
        res.status(201).json(newContact);
      } catch (error) {
        res.status(401).json({ message: "Contact email Invalid or contact already exist" });
      }
    });
    HttpServer.on("get", "/api/contact/:id", async (req, res) => {
      try {
        const userId = req.params.id;
        const findContact = new FindContact(contactInMemory);
        const contactList = await findContact.execute(userId);
        res.status(201).json(contactList);
      } catch (error) {
        res.status(401).json({ message: "Contact Invalid" });
      }
    });
  }
}
