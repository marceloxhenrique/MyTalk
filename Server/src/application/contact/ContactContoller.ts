import { HttpServer } from "../../adapters/HttpServer";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";
import TokenService from "../../domain/services/TokenService";
import { UserRepositoryInterface } from "../../domain/user/User.repository";
import AddContact from "./AddContact.usecase";
import GetAllContacts from "./GetAllContacts.usecase";

export default class ContactController {
  constructor(
    private contactRepository: ContactRepositoryInterface,
    readonly httpServer: HttpServer,
    private tokenService: TokenService,
    private userRepository: UserRepositoryInterface
  ) {
    httpServer.on("post", "/api/contact", async (req, res) => {
      try {
        const addContact = new AddContact(contactRepository, tokenService, userRepository);
        await addContact.execute(req.body, req.cookies.MyTalk_Token);
        res.status(201).json("Contact created");
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Contact email Invalid or contact already exist" });
      }
    });

    httpServer.on("get", "/api/contacts/:userId", async (req, res) => {
      try {
        const getAllContacts = new GetAllContacts(contactRepository, tokenService);
        const contactList = await getAllContacts.execute(
          req.params.userId,
          req.cookies.MyTalk_Token
        );
        res.status(201).json(contactList);
      } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Contact list is empty" });
      }
    });
  }
}
