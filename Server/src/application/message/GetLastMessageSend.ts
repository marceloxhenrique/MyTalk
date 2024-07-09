import Message from "../../domain/message/Message.entity";
import { MessageInterface } from "../../domain/message/Message.repository";

export default class GetLastMessageSend {
  constructor(private messageRepo: MessageInterface) {}
  async execute(senderId: string): Promise<any | null> {
    if (!senderId) {
      throw new Error("SenderId can not be empty");
    }
    const res = await this.messageRepo.getLastMessage(senderId);
    // console.log("RES", res);
    const getLastMessages: LastMessageOutput[] = [];
    if (res) {
      for (let message of res) {
        const filtered = getLastMessages.filter((item) => item.contact_id === message.contact_id);
        console.log("Length1", filtered.length);
        if (filtered.length === 0) {
          console.log("Length", filtered.length);
          getLastMessages.push(message);
        }
      }
      console.log("Last Message", getLastMessages);
    }
    console.log(res);
    return res;
  }
}

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
