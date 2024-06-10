import Message from "./Message.entity";

export interface MessageInterface {
  send(message: Message): Promise<boolean>;
}
