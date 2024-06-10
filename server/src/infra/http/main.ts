import { JwtConfig } from "./../config/JwtConfig";
import ExpressAdapter from "../../adapters/ExpressAdapter";
import UserInMemory from "../db/user.inmemory";
import { WebsocketConnection } from "./socket";
import UserController from "../../application/user/UserController";
import JwtTokenService from "../services/JwtTokenService";
import ContactInMeory from "../db/Contact.inmemory";
import ContactController from "../../application/contact/ContactContoller";
import MessageInMemory from "../db/Message.inmemory";
import MessageController from "../../application/message/MessageController";

const httpServer = new ExpressAdapter();
const userInMemory = new UserInMemory();
const contactInMemory = new ContactInMeory();
const sendMessageInMemory = new MessageInMemory();
new MessageController(httpServer, sendMessageInMemory);

const jwtTokenService = new JwtTokenService(JwtConfig);
new ContactController(contactInMemory, httpServer);
new UserController(userInMemory, httpServer, jwtTokenService);

const websocketConnection = new WebsocketConnection(httpServer.serverSocket());
websocketConnection.execute();
