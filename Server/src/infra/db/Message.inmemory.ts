import Message from "../../domain/message/Message.entity";
import { MessageInterface } from "../../domain/message/Message.repository";

export default class MessageInMemory implements MessageInterface {
  async saveMessage(message: Message): Promise<void> {
    this.message.push(message);
  }
  getHistoryMessages(senderId: string, receiverId: string): Promise<Message[] | null> {
    throw new Error("Method not implemented.");
  }
  message: Message[] = [];
}
