import ExpressAdapter from "../../adapters/ExpressAdapter";
import UserInMemory from "../db/user.inmemory";
import { WebsocketConnection } from "./socket";
import UserController from "./UserController";

const expressAdapter = new ExpressAdapter();
const userInMemory = new UserInMemory();
new UserController(userInMemory, expressAdapter);

const websocketConnection = new WebsocketConnection(expressAdapter.serverSocket());
websocketConnection.execute();
