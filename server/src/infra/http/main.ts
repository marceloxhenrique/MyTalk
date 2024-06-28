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
import UserDatabaseRepository from "../db/UserDatabase.Reposisotory";
import Connection from "../../domain/services/Connection";
import PgPromiseAdapter from "../../adapters/PgPromiseAdapter";
import ContactDatabaseRepository from "../db/ContactDatabase.Repository";

const httpServer = new ExpressAdapter();
const userInMemory = new UserInMemory();
const connection = new PgPromiseAdapter();
const userDatabaseRepository = new UserDatabaseRepository(connection);
const contactDatabaseRepository = new ContactDatabaseRepository(connection);
const contactInMemory = new ContactInMeory();
const sendMessageInMemory = new MessageInMemory();
const jwtTokenService = new JwtTokenService(JwtConfig);
const websocketConnection = new WebsocketConnection(httpServer.serverSocket());
websocketConnection.execute();

new MessageController(httpServer, sendMessageInMemory);
new ContactController(
  contactDatabaseRepository,
  httpServer,
  jwtTokenService,
  userDatabaseRepository
);
new UserController(userDatabaseRepository, httpServer, jwtTokenService);
