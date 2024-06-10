import Message from "../../domain/message/Message.entity";
import { MessageInterface } from "../../domain/message/Message.repository";

export default class SendMessage {
  constructor(private messageRepo: MessageInterface) {}
  async execute(input: SendMessageInput): Promise<boolean> {
    if (input.content) {
      const sendMessage = new Message(input.senderId, input.receiverId, input.content);
      const output = this.messageRepo.send(sendMessage);
      return output;
    }
    throw new Error("Message can not be empty");
  }
}

type SendMessageInput = {
  senderId: string;
  receiverId: string;
  content: string;
};
