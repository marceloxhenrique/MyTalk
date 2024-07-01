import Message from "./Message.entity";

export interface MessageInterface {
  saveMessage(message: Message): Promise<void>;
  getHistoryMessages(senderId: string, receiverId: string): Promise<Message[] | null>;
}
