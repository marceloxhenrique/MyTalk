import { JwtConfig } from "./../config/JwtConfig";
import ExpressAdapter from "../../adapters/ExpressAdapter";
import { WebsocketConnection } from "./socket";
import UserController from "../../application/user/UserController";
import JwtTokenService from "../services/JwtTokenService";
import ContactController from "../../application/contact/ContactContoller";
import UserDatabaseRepository from "../db/UserDatabase.Reposisotory";
import PgPromiseAdapter from "../../adapters/PgPromiseAdapter";
import ContactDatabaseRepository from "../db/ContactDatabase.Repository";
import MessageDatabaseRespository from "../db/MessageDatabase.Repository";
import SaveMessage from "../../application/message/SaveMessage.usecase";
import MessageController from "../../application/message/MessageController";

const httpServer = new ExpressAdapter();
const connection = new PgPromiseAdapter();
const jwtTokenService = new JwtTokenService(JwtConfig);

const userDatabaseRepository = new UserDatabaseRepository(connection);
const contactDatabaseRepository = new ContactDatabaseRepository(connection);
const messageDatabaseRepository = new MessageDatabaseRespository(connection);
const saveMessage = new SaveMessage(messageDatabaseRepository);
const websocketConnection = new WebsocketConnection(httpServer.serverSocket(), saveMessage);
websocketConnection.execute();

new MessageController(httpServer, messageDatabaseRepository, jwtTokenService);
new ContactController(
  contactDatabaseRepository,
  httpServer,
  jwtTokenService,
  userDatabaseRepository
);
new UserController(userDatabaseRepository, httpServer, jwtTokenService);
