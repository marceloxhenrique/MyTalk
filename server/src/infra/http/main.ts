import { JwtConfig } from "./../config/JwtConfig";
import ExpressAdapter from "../../adapters/ExpressAdapter";
import UserInMemory from "../db/user.inmemory";
import { WebsocketConnection } from "./socket";
import UserController from "../../application/UserController";
import JwtTokenService from "../services/JwtTokenService";

const httpServer = new ExpressAdapter();
const userInMemory = new UserInMemory();

const jwtTokenService = new JwtTokenService(JwtConfig);
new UserController(userInMemory, httpServer, jwtTokenService);

const websocketConnection = new WebsocketConnection(httpServer.serverSocket());
websocketConnection.execute();
