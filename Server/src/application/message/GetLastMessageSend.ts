import Message from "../../domain/message/Message.entity";
import { MessageInterface } from "../../domain/message/Message.repository";

export default class GetLastMessageSend {
  constructor(private messageRepo: MessageInterface) {}
  async execute(senderId: string): Promise<Message[] | null> {
    if (!senderId) {
      throw new Error("SenderId can not be empty");
    }
    const res = await this.messageRepo.getLastMessage(senderId);
    const getLastMessages: Message[] = [];
    if (res) {
      for (let message of res) {
        const filtered = getLastMessages.filter(
          (item) => item.getData().senderId === message.getData().senderId
        );
        if (filtered.length === 0) {
          getLastMessages.push(message);
        }
      }
    }
    return getLastMessages;
  }
}
