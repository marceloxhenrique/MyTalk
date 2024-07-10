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

  async getLastMessage(senderId: string): Promise<any | null> {
    const res = await this.connection.query(
      `SELECT 
        m.id AS message_id,
        m.content AS message_content,
        m.user_id AS messge_user_id,
        m.contact_id AS message_contact_id,
        m.sent_at AS message_sent_at,
        c.id AS contact_id,
        c.contact_id AS contact_contact_id,
        c.email AS contact_email,
        c.contact_name AS contact_contact_name,
        c.user_id AS contact_user_id
        FROM public.message AS m 
        JOIN public.contact AS c ON m.user_id = c.user_id 
        WHERE m.user_id = $1 
        ORDER BY m.sent_at DESC;`,
      [senderId]
    );
    if (res.length === 0) return null;
    const allMessages: LastMessageOutput[] = [];
    console.log("RESULT", res);
    for (let lastMessage of res) {
      console.log(lastMessage.contact_contact_name);
    }
    return res;
  }
}

type MessageOutput = {
  id: string;
  content: string;
  user_id: string;
  contact_id: string;
  sent_at: Date;
};

type LastMessageOutput = {
  message_id: string;
  message_content: string;
  messge_user_id: string;
  message_contact_id: string;
  message_sent_at: string;
  contact_id: string;
  contact_contact_id: string;
  contact_email: string;
  contact_contact_name: string;
  contact_user_id: string;
};
