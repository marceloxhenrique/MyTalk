import { HttpServer } from "../../adapters/HttpServer";
import { MessageInterface } from "../../domain/message/Message.repository";
import TokenService from "../../domain/services/TokenService";
import GetMessageHistory from "./GetMessageHistory";

export default class MessageController {
  constructor(
    private httpServer: HttpServer,
    private messageRepo: MessageInterface,
    private tokenService: TokenService
  ) {
    httpServer.on("get", "/api/message/:senderId/:receiverId", async (req, res) => {
      try {
        tokenService.verifyToken(req.cookies.MyTalk_Token);
        const { senderId, receiverId } = req.params;
        const getMessageHistory = new GetMessageHistory(messageRepo);
        const result = await getMessageHistory.execute(senderId, receiverId);
        res.status(201).json(result);
      } catch (error) {
        res.status(401).json(error);
      }
    });
  }
}
