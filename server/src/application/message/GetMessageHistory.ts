import Message from "../../domain/message/Message.entity";
import { MessageInterface } from "../../domain/message/Message.repository";

export default class GetMessageHistory {
  constructor(private messageRepo: MessageInterface) {}
  async execute(receiverId: string, senderId: string): Promise<Message[] | null> {
    if (receiverId && senderId) {
      const res = await this.messageRepo.getHistoryMessages(senderId, receiverId);
      return res;
    }
    throw new Error("SenderId and ReceiverId can not be empty");
  }
}
