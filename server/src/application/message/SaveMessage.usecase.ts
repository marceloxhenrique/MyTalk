import Message from "../../domain/message/Message.entity";
import { MessageInterface } from "../../domain/message/Message.repository";

export default class SaveMessage {
  constructor(private messageRepo: MessageInterface) {}
  async execute(input: SendMessageInput): Promise<void> {
    if (input.content) {
      const sendMessage = new Message(input.senderId, input.receiverId, input.content);
      await this.messageRepo.saveMessage(sendMessage);
      return;
    }
    throw new Error("Message can not be empty");
  }
}

type SendMessageInput = {
  senderId: string;
  receiverId: string;
  content: string;
};
