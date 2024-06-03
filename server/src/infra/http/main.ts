import ExpressAdapter from "../../adapters/ExpressAdapter";
import UserInMemory from "../db/user.inmemory";
import { WebsocketConnection } from "./socket";
import UserController from "../../application/UserController";

const httpServer = new ExpressAdapter();
const userInMemory = new UserInMemory();
new UserController(userInMemory, httpServer);

const websocketConnection = new WebsocketConnection(httpServer.serverSocket());
websocketConnection.execute();
