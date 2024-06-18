import Message from "../../domain/message/Message.entity";
import { MessageInterface } from "../../domain/message/Message.repository";

export default class MessageInMemory implements MessageInterface {
  message: Message[] = [];
  async send(message: Message): Promise<boolean> {
    const result = this.message.push(message);
    return true;
  }
}
