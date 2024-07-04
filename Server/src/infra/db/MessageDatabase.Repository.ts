import Message from "../../domain/message/Message.entity";
import { MessageInterface } from "../../domain/message/Message.repository";
import Connection from "../../domain/services/Connection";

export default class MessageDatabaseRespository implements MessageInterface {
  constructor(private connection: Connection) {}
  async getHistoryMessages(senderId: string, receiverId: string): Promise<Message[] | null> {
    const res = await this.connection.query(
      `SELECT * FROM public.message WHERE user_id = $1 AND contact_id = $2 UNION ALL SELECT * FROM public.message WHERE contact_id = $3 AND user_id = $4`,
      [senderId, receiverId, senderId, receiverId]
    );
    if (res.length === 0) return null;
    const allMessages: Message[] = [];
    res.map((message: MessageOutput) => {
      const newMessage = new Message(
        message.user_id,
        message.contact_id,
        message.content,
        message.id,
        message.sent_at
      );
      allMessages.push(newMessage);
    });
    return allMessages;
  }
  async saveMessage(message: Message): Promise<void> {
    this.connection.query(
      `INSERT INTO public.message (id, content, user_id, contact_id, sent_at) values ($1, $2, $3, $4, $5)`,
      [
        message.getData().id,
        message.getData().content,
        message.getData().senderId,
        message.getData().receiverId,
        message.getData().sentAt,
      ]
    );
  }

  async getLastMessage(senderId: string): Promise<Message[] | null> {
    const res = await this.connection.query(`SELECT * FROM public.message WHERE user_id = $1`, [
      senderId,
    ]);
    if (res.length === 0) return null;
    const allMessages: Message[] = [];
    res.map((message: MessageOutput) => {
      const newMessage = new Message(
        message.user_id,
        message.contact_id,
        message.content,
        message.id,
        message.sent_at
      );
      allMessages.push(newMessage);
    });
    return allMessages;
  }
}

type MessageOutput = {
  id: string;
  content: string;
  user_id: string;
  contact_id: string;
  sent_at: Date;
};
