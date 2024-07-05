import Message from "../../domain/message/Message.entity";
import { MessageInterface } from "../../domain/message/Message.repository";

export default class GetLastMessageSend {
  constructor(private messageRepo: MessageInterface) {}
  async execute(senderId: string): Promise<Message[] | null> {
    if (!senderId) {
      throw new Error("SenderId can not be empty");
    }
    const res = await this.messageRepo.getLastMessage(senderId);

    return res;
  }
}
