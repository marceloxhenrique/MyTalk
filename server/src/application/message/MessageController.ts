import { HttpServer } from "../../adapters/HttpServer";
import { MessageInterface } from "../../domain/message/Message.repository";
import SendMessage from "./SendMessage.usecase";

export default class MessageController {
  constructor(private httpServer: HttpServer, private messageRepo: MessageInterface) {
    httpServer.on("post", "/api/message", async (req, res) => {
      try {
        const message = req.body;
        console.log(message);
        const sendMessage = new SendMessage(messageRepo);
        const result = await sendMessage.execute(message);
        res.status(201).json({ message: "Message sent" });
      } catch (error) {
        res.status(401).json(error);
      }
    });
  }
}
