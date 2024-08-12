import { HttpServer } from "../../adapters/HttpServer";
import { ContactRepositoryInterface } from "../../domain/contact/Contact.repository";
import TokenService from "../../domain/services/TokenService";
import AddContact from "./AddContact.usecase";
import AddFriendRequest from "./AddFriendRequest.usecase";
import GetAllContacts from "./GetAllContacts.usecase";
import GetFriendRequest from "./GetFriendRequest";

export default class ContactController {
  constructor(
    private contactRepository: ContactRepositoryInterface,
    readonly httpServer: HttpServer,
    private tokenService: TokenService
  ) {
    httpServer.on("post", "/api/contact", async (req, res) => {
      try {
        const addContact = new AddContact(contactRepository, tokenService);
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
    httpServer.on("post", "/api/friendrequest", async (req, res) => {
      try {
        const friendRequest = new AddFriendRequest(contactRepository, tokenService);
        await friendRequest.execute(req.body, req.cookies.MyTalk_Token);
        res.status(201).json("Friend request successfully sent");
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Contact email Invalid or contact already exist" });
      }
    });
    httpServer.on("get", "/api/friendrequest/:userId", async (req, res) => {
      try {
        const getFriendRequest = new GetFriendRequest(contactRepository, tokenService);
        const friendRequest = await getFriendRequest.execute(
          req.params.userId,
          req.cookies.MyTalk_Token
        );
        res.status(201).json(friendRequest);
      } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Contact list is empty" });
      }
    });
  }
}
